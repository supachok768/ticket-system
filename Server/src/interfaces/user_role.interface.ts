export interface IUserRole{
    userId:number,
    roleId:number,
    isActive?:boolean
}

export interface IUserRoleNested{
    userId?:number,
    roleId:number,
    isActive?:boolean
}