import { IEmployee } from "./IEmployee";
import { ITask } from "./ITask";

export interface IEmployeeTasks {
    idEmployee: number,
    idTask: number,
    Task: ITask,
    Employee: IEmployee
}