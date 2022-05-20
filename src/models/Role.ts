export interface Role {
    _id?: string;
    name: string;
    description: string;
    applicationType: string;
    applicationId: string;
    permissions: string[];
}
