import { UserData } from 'auth0';

export interface GroupWithMembers {
    _id?: string;
    name: string;
    description: string;
    members: UserData[];
}
