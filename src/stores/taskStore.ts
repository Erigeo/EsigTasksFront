import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ITask } from '@/interfaces/ITask';
import { getAllTasks, getTaskById, createTask, deleteTask } from '@/services/TaskService';

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<ITask[]>([]);
  const task = ref<ITask | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchAllTasks = async () => {
    loading.value = true;
    error.value = null;

    try {
      const fetchedTasks = await getAllTasks();
      if (fetchedTasks) {
        tasks.value = fetchedTasks;
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = `Erro ao buscar todas as tasks: ${err.message}`;
      } else {
        error.value = 'Erro desconhecido ao buscar todas as tasks';
      }
      console.error(error.value, err);
    } finally {
      loading.value = false;
    }
  };

  const fetchTaskById = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const fetchedTask = await getTaskById(id);
      if (fetchedTask) {
        task.value = fetchedTask;
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = `Erro ao buscar task com ID ${id}: ${err.message}`;
      } else {
        error.value = 'Erro desconhecido ao buscar task';
      }
      console.error(error.value, err);
    } finally {
      loading.value = false;
    }
  };

  const createNewTask = async (newTask: ITask) => {
    loading.value = true;
    error.value = null;
    console.log("entrei no store")
    try {
      const createdTask = await createTask(newTask);
      if (createdTask) {
        tasks.value.push(createdTask);
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = `Erro ao criar nova task: ${err.message}`;
      } else {
        error.value = 'Erro desconhecido ao criar nova task';
      }
      console.error(error.value, err);
    } finally {
      loading.value = false;
    }
  };

  const deleteTaskStore = async (id: number) => {
    loading.value = true; // Supondo que você tenha uma variável `loading`
    error.value = null; // Limpa qualquer erro anterior
  
    try {
      const deletedTask: boolean = await deleteTask(id); // Chame a função e espere pelo resultado
  
      if (deletedTask) {
        // Se a tarefa foi deletada com sucesso, remova-a da lista
        
      } else {
        // Caso a tarefa não tenha sido deletada
        error.value = 'Falha ao excluir a tarefa.';
      }
  
    } catch (err) {
      if (err instanceof Error) {
        error.value = `Erro ao apagar task: ${err.message}`;
      } else {
        error.value = 'Erro desconhecido ao apagar task';
      }
      console.error(error.value, err);
    } finally {
      loading.value = false; // Finaliza o loading
    }
  };




  return {
    tasks,
    task,
    loading,
    error,
    fetchAllTasks,
    fetchTaskById,
    createNewTask,
    deleteTaskStore
  };
});
