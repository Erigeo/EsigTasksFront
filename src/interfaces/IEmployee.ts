import { ITask } from "./ITask";



export interface IEmployee {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: number,
    tasks?: ITask[];

}