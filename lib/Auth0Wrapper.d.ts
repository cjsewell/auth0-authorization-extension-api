import { Permission, ShortPermission, Role, ShortRole, Group } from './Auth0Types';
export interface Auth0WrapperSettings {
    auth0ClientId: string;
    auth0ClientSecret: string;
    auth0Url: string;
    auth0AuthExtensionUrl: string;
}
export declare class Auth0Wrapper {
    private token;
    private apiUrl;
    readonly isAuthenticated: boolean;
    getToken(): string;
    private createOptions;
    authenticateToken(token: string, apiIUrl: string): Promise<void>;
    authenticate(settings: Auth0WrapperSettings): Promise<void>;
    private get;
    private post;
    private put;
    private patch;
    private delete;
    getPermissions(): Promise<Permission[]>;
    getPermission(id: string): Promise<ShortPermission>;
    createPermission(permission: Permission): Promise<Permission>;
    updatePermission(permission: Permission): Promise<Permission>;
    deletePermission(permission: Permission): Promise<void>;
    deletePermission(permissionId: string): Promise<void>;
    getRoles(): Promise<Role[]>;
    getRole(id: string): Promise<ShortRole>;
    createRole(role: Role): Promise<Role>;
    updateRole(role: Role): Promise<Role>;
    deleteRole(id: string): Promise<void>;
    getUserRoles(id: string): Promise<ShortRole[]>;
    addRoleForUser(id: string, roles: string | string[]): Promise<{}>;
    removeRoleFromUser(id: string, roles: string | string[]): Promise<{}>;
    getUserGroups(id: string): Promise<Group[]>;
    addGroupForUser(id: string, groups: string | string[]): Promise<{}>;
    removeGroupFromUser(id: string, group: string): Promise<{}>;
    getGroups(): Promise<Group[]>;
    getGroup(id: string): Promise<Group>;
    createGroup(group: Group): Promise<Group>;
    updateGroup(group: Group): Promise<Group>;
    deleteGroup(id: string): Promise<void>;
}
