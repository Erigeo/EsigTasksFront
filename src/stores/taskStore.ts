import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ITask } from '@/interfaces/ITask';
import { getAllTasks, getTaskById, createTask } from '@/services/TaskService';

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

  return {
    tasks,
    task,
    loading,
    error,
    fetchAllTasks,
    fetchTaskById,
    createNewTask,
  };
});
