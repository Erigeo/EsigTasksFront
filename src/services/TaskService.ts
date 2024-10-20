import { Api } from "./Api"
import { ITask } from "@/interfaces/ITask";


const token = localStorage.getItem('token');

export const getAllTasks = async (): Promise<ITask[] | null> => {
    

  
    if (!token) {
      console.error('Token não encontrado. Usuário não autenticado.');
      return null; 
    }
  
    try {
      const response = await Api.get<ITask[]>('task', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
     
      return response.data;
  
    } catch (error) {
      console.error('Erro ao buscar tasks:', error);
      return null; 
    }
  };

  export const getTaskById = async (id: string): Promise<ITask | null> => {
    
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token não encontrado. Usuário não autenticado.');
        return null; 
      }
  
    try {
      
      const response = await Api.get<ITask>(`task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  

      return response.data;
      
    } catch (error) {
      console.error(`Erro ao buscar Task com ID ${id}:`, error);
      return null; 
    }
  };


  export const deleteTask = async (id: number): Promise<boolean> => {
    if (!token) {
      console.error('Token não encontrado. Usuário não autenticado.');
      return false; 
    }
  
    try {
      await Api.delete<ITask>(`task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
      });
  
      return true;
  
    } catch (error) {
      
        console.error('Erro ao excluir a tarefa:', error);
      
      return false; 
    }
  };
  


  export const createTask = async (newTask: ITask): Promise<ITask | null> => {

    
      console.log(newTask)
    if (!token) {
      console.error('Token não encontrado. Usuário não autenticado.');
      return null; 
    }
  
    try {
      
      const response = await Api.post<ITask>('task', newTask, {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
      });
  
     
      return response.data;
  
    } catch (error) {
      console.error('Erro ao criar a nova task:', error);
      return null; 
    }
  };

 

  export const updateTask = async (task: ITask): Promise<void> => {
    if (!token) {
      console.error('Token não encontrado. Usuário não autenticado.'); 
    }
    try {
      console.log(task)
      console.log("employee id ", task.employeeId)
       await Api.put<ITask>(`task/${task.id}`, task, {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
      });
  
  
    } catch (error) {
      
        console.error('Erro ao editar a tarefa:', error);
      
    }
  };