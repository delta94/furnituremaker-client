export type RoleType = 'root' | 'authenticated';

export interface Role {
    readonly id?: string;
    readonly description: string;
    readonly name: string;
    readonly type: RoleType;
}