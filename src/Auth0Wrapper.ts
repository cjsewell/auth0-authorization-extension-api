import { TokenResponse, UserData } from 'auth0';
import fetch, { RequestInit } from 'node-fetch';
import VError from 'verror';
import { Config, Group, GroupMembersResponse, GroupResponse, Message, Permission, PermissionsResponse, Role, RoleResponse, ShortPermission, ShortRole } from './models';

export class Auth0Wrapper {
    private readonly config: Config;
    private token?: TokenResponse & { expires: Date };
    private readonly apiUrl: string;

    constructor(config: Config) {
        this.config = config;
        this.apiUrl = this.config.auth0AuthExtensionUrl;
    }

    get isAuthenticated(): boolean {
        return Boolean(this.token?.expires && this.token.expires > new Date());
    }

    async authenticate(): Promise<void> {
        const url = new URL('/oauth/token', this.config.auth0Url);
        const result: TokenResponse = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: this.config.auth0ClientId,
                client_secret: this.config.auth0ClientSecret,
                audience: 'urn:auth0-authz-api',
            }).toString(),
        }).then((r) => r.json());
        this.token = {
            ...result,
            expires: new Date(Date.now() + result.expires_in),
        };
        if (!this.isAuthenticated) {
            throw new Error('API Not authenticated');
        }
    }

    // PERMISSIONS
    async getPermissions() {
        return (await this.get<PermissionsResponse>('api/permissions')).permissions;
    }

    async getPermission(id: string) {
        return await this.get<ShortPermission>(`api/permissions/${id}`);
    }

    async createPermission(permission: Permission): Promise<Permission> {
        return this.post<Permission>('api/permissions', {
            name: permission.name,
            description: permission.description,
            applicationType: permission.applicationType,
            applicationId: permission.applicationId,
        });
    }

    async updatePermission(permission: Permission): Promise<Permission> {
        return this.put<Permission>(`api/permissions/${permission._id}`, {
            name: permission.name,
            description: permission.description,
            applicationType: permission.applicationType,
            applicationId: permission.applicationId,
        });
    }

    async deletePermission(permission: Permission): Promise<void>;

    async deletePermission(permissionId: string): Promise<void>;

    async deletePermission(permission: Permission | string) {
        const permissionId = typeof permission === 'string' ? permission : permission._id;
        return this.delete<void>(`api/permissions/${permissionId}`);
    }

    // ROLES
    async getRoles(): Promise<Role[]> {
        return (await this.get<RoleResponse>('api/roles')).roles;
    }

    async getRole(id: string): Promise<ShortRole> {
        return await this.get<Role>(`api/roles/${id}`);
    }

    async createRole(role: Role): Promise<Role> {
        return await this.post<Role>('api/roles', {
            name: role.name,
            description: role.description,
            applicationType: role.applicationType,
            applicationId: role.applicationId,
            permissions: role.permissions,
        });
    }

    async updateRole(role: Role): Promise<Role> {
        return await this.put<Role>(`api/roles/${role._id}`, {
            name: role.name,
            description: role.description,
            applicationType: role.applicationType,
            applicationId: role.applicationId,
            permissions: role.permissions,
        });
    }

    async deleteRole(id: string) {
        return this.delete<void>(`api/roles/${id}`);
    }

    async getUserRoles(id: string) {
        return this.get<ShortRole[]>(`api/users/${id}/roles`);
    }

    async addRoleForUser(id: string, roles: string | string[]) {
        if (typeof roles === 'string') roles = [roles];
        return this.patch(`api/users/${id}/roles`, roles);
    }

    async removeRoleFromUser(id: string, roles: string | string[]) {
        if (typeof roles === 'string') roles = [roles];
        return this.delete(`api/users/${id}/roles`, roles);
    }

    async getUserGroups(id: string) {
        return this.get<Group[]>(`api/users/${id}/groups`);
    }

    async addGroupForUser(id: string, groups: string | string[]) {
        if (typeof groups === 'string') groups = [groups];
        return this.patch(`api/users/${id}/groups`, groups);
    }

    async removeGroupFromUser(id: string, group: string) {
        return this.delete(`api/groups/${group}/members`, [id]);
    }

    // GROUPS
    async getGroups(): Promise<Group[]> {
        return (await this.get<GroupResponse>('api/groups')).groups;
    }

    async getGroup(id: string): Promise<Group> {
        return await this.get<Group>(`api/groups/${id}`);
    }

    async getGroupMembers(id: string): Promise<UserData[]> {
        return (await this.get<GroupMembersResponse>(`api/groups/${id}/members`)).users;
    }

    async createGroup(group: Group): Promise<Group> {
        return await this.post<Group>('api/groups', {
            name: group.name,
            description: group.description,
        });
    }

    async updateGroup(group: Group): Promise<Group> {
        return await this.put<Group>(`api/groups/${group._id}`, {
            name: group.name,
            description: group.description,
        });
    }

    async deleteGroup(id: string) {
        return this.delete<void>(`api/groups/${id}`);
    }

    private async fetch<T>(path: string, init?: RequestInit): Promise<T> {
        if (!this.isAuthenticated) {
            await this.authenticate();
        }
        const result = {
            ...init,
            headers: {
                ...init?.headers,
                Authorization: `Bearer ${this.token?.access_token}`,
            },
        };

        const url = new URL(path, this.apiUrl);
        return fetch(url.toString(), result)
            .then(async (r) => {
                if (r.status !== 200) {
                    const error = (await r.json()) as Message;
                    throw new VError(
                        {
                            name: 'auth0-authorisation-api-error',
                            info: {
                                request: {
                                    url: r.url,
                                    init,
                                },
                                response: r,
                            },
                        },
                        `Error [${error.error}]:${error.message ? ` ${error.message}` : ''} while calling ${r.url}`,
                    );
                }
                return r;
            })
            .then((r) => r.json() as Promise<T>)
            .catch((e) => {
                throw new VError(
                    {
                        name: 'auth0-authorisation-api-error',
                        cause: e,
                        info: {
                            request: {
                                url,
                                init,
                            },
                        },
                    },
                    `Unexpected error with fetching ${url}`,
                );
            });
    }

    // PRIVATE HELPERS
    private async get<T>(url: string): Promise<T> {
        return this.fetch(url, { method: 'GET' });
    }

    private async post<T>(url: string, body?: unknown): Promise<T> {
        return this.fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            ...(body ? { body: JSON.stringify(body) } : null),
        });
    }

    private async put<T>(url: string, body?: unknown): Promise<T> {
        return this.fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            ...(body ? { body: JSON.stringify(body) } : null),
        });
    }

    private async patch<T>(url: string, body?: unknown): Promise<T> {
        return this.fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            ...(body ? { body: JSON.stringify(body) } : null),
        });
    }

    private async delete<T>(url: string, body?: unknown): Promise<T> {
        return this.fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            ...(body ? { body: JSON.stringify(body) } : null),
        });
    }
}
