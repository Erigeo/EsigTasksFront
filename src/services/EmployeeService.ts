
import { Api } from "./Api"
import { IEmployee } from "@/interfaces/IEmployee";



const token = localStorage.getItem('token');

export const getEmployeeById = async (id: string): Promise<IEmployee | null> => {
  

    if (!token) {
        console.error('Token não encontrado. Usuário não autenticado.');
        return null; 
      }
  
    try {
      
      const response = await Api.get<IEmployee>(`/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  

      return response.data;
      
    } catch (error) {
      console.error(`Erro ao buscar empregado com ID ${id}:`, error);
      return null; 
    }
  };


  export const getAllEmployees = async (): Promise<IEmployee[] | null> => {
    
  
    if (!token) {
      console.error('Token não encontrado. Usuário não autenticado.');
      return null; 
    }
  
    try {
      const response = await Api.get<IEmployee[]>('employees', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
     
      return response.data;
  
    } catch (error) {
      console.error('Erro ao buscar empregados:', error);
      return null; 
    }
  };
