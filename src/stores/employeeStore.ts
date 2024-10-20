// src/stores/employeeStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue'; // Importando ref
import { getAllEmployees, getEmployeeById } from '../services/EmployeeService'; // Importe as funções do seu service
import { IEmployee } from '@/interfaces/IEmployee';


export const useEmployeeStore = defineStore('employee', () => {
  // Usando ref para criar referências reativas
  const employees = ref<IEmployee[]>([]); // Armazena todos os empregados
  const employee = ref<IEmployee | null>(null); // Armazena um empregado específico

 
  // Função para buscar todos os empregados
  const fetchAllEmployees = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token não encontrado. Usuário não autenticado.');
      return null; 
    }

    try {
      const response = await getAllEmployees();
      if (response) {
        employees.value = response; // Atualiza o estado com os empregados
      }
    } catch (error) {
      console.error('Erro ao buscar empregados:', error);
    }
  };

  // Função para buscar um empregado por ID
  const fetchEmployeeById = async (id: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token não encontrado. Usuário não autenticado.');
      return null; 
    }

    try {
      const response = await getEmployeeById(id);
      if (response) {
        employee.value = response; // Atualiza o estado com o empregado específico
      }
    } catch (error) {
      console.error(`Erro ao buscar empregado com ID ${id}:`, error);
    }
  };

  // Retorna os estados e as ações
  return {
    employees,
    employee,
    fetchAllEmployees,
    fetchEmployeeById,
  };
});
