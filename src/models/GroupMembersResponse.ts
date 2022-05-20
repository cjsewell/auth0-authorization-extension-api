import { UserData } from 'auth0';

export interface GroupMembersResponse {
    users: UserData[];
    total: number;
}
