export enum status {
    Completed, InProgress, Pending
}


export interface ITask {
    id: number,
    title: string,
    description: string,
    priority: string,
    status: status,
    deadline: Date
}