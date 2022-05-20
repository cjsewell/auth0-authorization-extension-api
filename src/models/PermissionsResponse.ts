import { Permission } from './Permission';

export interface PermissionsResponse {
    permissions: Permission[];
    total: number;
}
