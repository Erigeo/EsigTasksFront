
export enum Role {
    Employee, Manager
}

export interface IEmployee {
    id: number,
    fname: string,
    lname: string,
    email: string,
    password: string,
    role: Role

}