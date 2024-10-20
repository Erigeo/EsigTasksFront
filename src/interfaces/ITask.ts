import { IEmployee } from "./IEmployee"

export enum status {
    Completed, InProgress, Pending
}


export interface ITask {
    id?: number,
    title: string,
    description: string,
    priority: string,
    status: number,
    deadline: string | null;
    employeeId: number,
    employee?: IEmployee
}