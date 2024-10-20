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


  export const createTask = async (newTask: ITask): Promise<ITask | null> => {
    
  
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