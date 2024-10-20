<template>
  <div class="flex justify-center">
    <div
      class="flex w-[950px] h-[300px] flex-row justify-center items-center mt-[50px] bg-gray-200 rounded-xl shadow-md"
    >
      <img src="../assets/teste 1.svg" class="w-[300px] h-[200px]" />
      <form >
        <div class="flex flex-row">
          <div class="flex-col flex m-5">
            <label class="flex items-start">ID</label>
            <input
              v-model="idInput"
              class="border-b-[1px] border-black bg-transparent outline-none"
            />
          </div>
          <div class="flex-col flex m-5 w-[300px]">
            <label class="flex items-start">Title/Description</label>
            <input
              v-model="titleInput"
              
              class="border-b-[1px] border-black bg-transparent outline-none"
            />
          </div>
        </div>

        <div class="flex flex-row gap-8">
          <div class="flex-col flex m-5">
            <label class="flex items-start">Progress</label>
            <select
              v-model="selectedProgress"
              class="border-b-[1px] border-black bg-transparent outline-none"
            >
              
              <option value="option1">Pendente</option>
              <option value="option2">Em Progresso</option>
              <option value="option3">Concluido</option>
            </select>
          </div>

          <div class="flex-col flex m-5">
            <label class="flex items-start">Employee</label>
            <select
              v-model="selectedOption"
              class="border-b-[1px] border-black bg-transparent outline-none"
            >
              <option
                v-for="employee in employees"
                :key="employee.id"
                :value="employee.id"
              >
                {{ employee.firstName }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex flex-row gap-5">
          <button
            @click="filterTasks"
            class="flex w-[200px] justify-center items-center h-[40px] bg-blue-400 rounded-md font-bold text-white shadow-lg"
          >
            Buscar
          </button>

          <button
            @click="createTask"
            class="flex w-[200px] justify-center items-center h-[40px] bg-green-500 rounded-md font-bold text-white shadow-lg"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="overflow-x-auto justify-center flex items-center mt-[50px]">
    <table class="bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-200 text-gray-700">
          <th class="py-2 px-4 border-b">ID</th>
          <th class="py-2 px-4 border-b">Título</th>
          <!-- Mudando para exibir título -->
          <th class="py-2 px-4 border-b">Descrição</th>
          <!-- Adicionando descrição -->
          <th class="py-2 px-4 border-b">Responsável</th>
          <th class="py-2 px-4 border-b">Status</th>
          <!-- Adicionando status -->
          <th class="py-2 px-4 border-b">Deadline</th>
          <th class="py-2 px-4 border-b">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id" class="hover:bg-gray-100">
          <td class="py-2 px-4 border-b">{{ task.id }}</td>
          <td class="py-2 px-4 border-b">{{ task.title }}</td>
          <!-- Alterando para exibir título -->

          <td class="py-2 px-4 border-b">{{ task.description }}</td>
          <td class="py-2 px-4 border-b">
            {{ task.employee ? task.employee.firstName : "N/A" }}
          </td>
          <!-- Alterando para exibir descrição -->
          <td class="py-2 px-4 border-b">
            <template v-if="task.status === 1"> Em progresso </template>
            <template v-else-if="task.status === 2"> Concluído </template>
            <template v-else-if="task.status === 0"> Pendente </template>
            <template v-else> Status desconhecido </template>
          </td>
          <!-- Alterando para exibir status -->
          <td class="py-2 px-4 border-b">{{ formatDate(task.deadline) }}</td>
          <td class="py-2 px-4 border-b">
            <button
              @click="editTask(task.id)"
              class="text-gay-500 hover:text-blue-700"
            >
              Editar
            </button>
            <button
              @click="deleteTask(task.id)"
              class="text-red-500 hover:text-red-700 ml-2"
            >
              Excluir
            </button>

            <button
              @click="exibirTask(task.id)"
              class="text-blue-500 hover:text-green-700 ml-2"
            >
              Exibir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>



  <div class="overflow-x-auto justify-center flex items-center mt-[50px]">
    <table class="bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-200 text-gray-700">
          <th class="py-2 px-4 border-b">ID</th>
          <th class="py-2 px-4 border-b">Título</th>
          <th class="py-2 px-4 border-b">Descrição</th>
          <th class="py-2 px-4 border-b">Responsável</th>
          <th class="py-2 px-4 border-b">Status</th>
          <th class="py-2 px-4 border-b">Deadline</th>
          <th class="py-2 px-4 border-b">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in filteredTasks" :key="task.id" class="hover:bg-gray-100">
          <td class="py-2 px-4 border-b">{{ task.id }}</td>
          <td class="py-2 px-4 border-b">{{ task.title }}</td>
          <td class="py-2 px-4 border-b">{{ task.description }}</td>
          <td class="py-2 px-4 border-b">{{ task.employee ? task.employee.firstName : "N/A" }}</td>
          <td class="py-2 px-4 border-b">
            <template v-if="task.status === 1"> Em progresso </template>
            <template v-else-if="task.status === 2"> Concluído </template>
            <template v-else-if="task.status === 0"> Pendente </template>
            <template v-else> Status desconhecido </template>
          </td>
          <td class="py-2 px-4 border-b">{{ formatDate(task.deadline) }}</td>
          <td class="py-2 px-4 border-b">
            <button @click="editTask(task.id)" class="text-gay-500 hover:text-blue-700">Editar</button>
            <button @click="deleteTask(task.id)" class="text-red-500 hover:text-red-700 ml-2">Excluir</button>
            <button @click="exibirTask(task.id)" class="text-blue-500 hover:text-green-700 ml-2">Exibir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTaskStore } from "@/stores/taskStore"; // Importando o store para tasks
import { ITask } from "@/interfaces/ITask";
import { format } from "date-fns";
import { useEmployeeStore } from "@/stores/employeeStore";
import { IEmployee } from "@/interfaces/IEmployee";

const employeeStore = useEmployeeStore();


// Usando o store para gerenciar tarefas
const taskStore = useTaskStore();
const tasks = ref<ITask[]>([]); // Estado para as tarefas
const employees = ref<IEmployee[]>([]);

const selectedOption = ref(null);
const selectedProgress = ref("");
const titleInput = ref("");
const idInput = ref("");

const filteredTasks = ref<ITask[]>([]);

const fetchTasks = async () => {
  await taskStore.fetchAllTasks(); // Chamando a função para buscar todas as tarefas
  tasks.value = taskStore.tasks; // Atualizando o estado com as tarefas do store
  console.log("Tarefas:", tasks.value);
};

const fetchEmployees = async () => {
  await employeeStore.fetchAllEmployees();
  employees.value = employeeStore.employees;
  console.log(employees.value);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "dd-MM-yyyy HH:mm");
};

const filterTasks = () => {
  filteredTasks.value = tasks.value.filter((task) => {
    const matchesId = idInput.value ? task.id.toString() === idInput.value : true;
    const matchesTitle = titleInput.value ? task.title.includes(titleInput.value) : true;
    const matchesProgress = selectedProgress.value
      ? (selectedProgress.value === "option1" && task.status === 0) ||
        (selectedProgress.value === "option2" && task.status === 1) ||
        (selectedProgress.value === "option3" && task.status === 2)
      : true;
    const matchesEmployee = selectedOption.value
      ? task.employee && task.employee.id === selectedOption.value
      : true;

    return matchesId && matchesTitle && matchesProgress && matchesEmployee;
  });
};

const createTask = () => {
  console.log("Criar nova tarefa");
  // Lógica para criar nova tarefa
};

const editTask = (id: number) => {
  console.log("Editando tarefa com ID:", id);
  // Lógica para editar a tarefa
};

const deleteTask = (id: number) => {
  console.log("Excluindo tarefa com ID:", id);
  // Lógica para excluir a tarefa
};
const exibirTask = (id: number) => {
  console.log("Excluindo tarefa com ID:", id);
  // Lógica para excluir a tarefa
};

// Carregar tarefas ao montar o componente
onMounted(() => {
  fetchTasks();
  fetchEmployees();
});
</script>
