<template>
  <div class="flex justify-center">
    <div
      class="flex w-[950px] h-[350px] flex-row justify-center items-center mt-[50px] bg-gray-200 rounded-xl shadow-md"
    >
      <img src="../assets/teste 1.svg" class="w-[300px] h-[200px]" />
      <form>
        <div class="flex flex-row">
          <div class="flex-col flex m-5">
            <label class="flex items-start">ID</label>
            <input
              v-model="idInput"
              class="border-b-[1px] border-black bg-transparent outline-none"
            />
          </div>
          <div class="flex-col flex m-5 w-[300px]">
            <label class="flex items-start">Title</label>
            <input
              v-model="titleInput"
              class="border-b-[1px] border-black bg-transparent outline-none"
            />
          </div>
        </div>

        <div class="flex flex-row">
          <div class="flex-col flex m-5">
            <label class="flex items-start">Date</label>
            <input
              placeholder="dd-mm-aaaa hh:mm"
              v-model="dateInput"
              class="border-b-[1px] border-black bg-transparent outline-none"
            />
          </div>
          <div class="flex-col flex m-5 w-[300px]">
            <label class="flex items-start">Description</label>
            <input
              v-model="descriptionInput"
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
              <option value="0">Pendente</option>
              <option value="1">Em Progresso</option>
              <option value="2">Concluido</option>
            </select>
          </div>

          <div class="flex-col flex m-5">
            <label class="flex items-start">Priority</label>
            <select
              v-model="selectedPriority"
              class="border-b-[1px] border-black bg-transparent outline-none"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
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

        <div class="flex justify-center flex-row gap-7">
          <button
            @click="filterTasks"
            class="flex w-[150px] justify-center items-center h-[40px] bg-blue-400 rounded-md font-bold text-white shadow-lg"
          >
            Buscar
          </button>

          <button
            @click="createTask"
            class="flex w-[150px] justify-center items-center h-[40px] bg-green-500 rounded-md font-bold text-white shadow-lg"
          >
            Create Task
          </button>

          <button
            @click="clearFilters"
            class="flex w-[150px] justify-center items-center h-[40px] bg-gray-400 rounded-md font-bold text-white shadow-lg"
          >
            Clean filters
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="flex justify-center items-center">
    <div
      class="justify-center flex items-center mt-[50px] w-full max-w-[1200px] max-y-[1000px]"
    >
      <table class="bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="py-2 px-4 border-b">ID</th>
            <th class="py-2 px-4 border-b">Título</th>
            <th class="py-2 px-4 border-b">Descrição</th>
            <th class="py-2 px-4 border-b">Responsável</th>
            <th class="py-2 px-4 border-b">Status</th>
            <th class="py-2 px-4 border-b">Priority</th>
            <th class="py-2 px-4 border-b">Deadline</th>
            <th class="py-2 px-4 border-b">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="task in filteredTasks"
            :key="task.id"
            class="hover:bg-gray-100"
          >
            <td class="py-2 px-4 border-b">{{ task.id }}</td>

            <!-- Editar Título -->
            <td
              class="max-w-[300px] w-[200px] overflow-hidden text-ellipsis whitespace-nowrap border-b"
              @click="editField('title', task)"
            >
              <input
                v-if="isEditing.title && currentEditingTask === task.id"
                v-model="task.title"
                @blur="saveEdit"
                class="max-w-[110px] border border-gray-300 p-1"
              />
              <span v-else>{{ task.title }}</span>
            </td>

            <!-- Editar Descrição -->
            <td
              class="max-w-[200px] w-[250px] overflow-hidden text-ellipsis whitespace-nowrap border-b"
              @click="editField('description', task)"
            >
              <input
                v-if="isEditing.description && currentEditingTask === task.id"
                v-model="task.description"
                @blur="saveEdit"
                class="max-w-[100px] border border-gray-300 p-1"
              />
              <span v-else>{{ task.description }}</span>
            </td>

            <td
              class="max-w-[325px] w-[100px] overflow-hidden text-ellipsis whitespace-nowrap border-b"
              @click="editField('employeeId', task)"
            >
              <select
                v-if="isEditing.employeeId && currentEditingTask === task.id"
                v-model="task.employeeId"
                @blur="saveEdit"
                class="max-w-[90px] border border-gray-300 p-1"
              >
                <!-- Supondo que `task.employees` é uma lista de objetos de funcionários -->
                <option :value="task.employeeId">
                  {{
                    task.employee?.firstName 
                  }}
                </option>

                <option
                  v-for="employee in employees"
                  :key="employee.id"
                  :value="employee.id"
                >
                  {{ employee.firstName }}
                </option>
              </select>

              <template   v-else>
                
                  {{ task.employee?.firstName }}
                </template>
                
              
            </td>

            <td
              class="max-w-[300px] w-[120px] overflow-hidden text-ellipsis whitespace-nowrap border-b"
              @click="editField('status', task)"
            >
              <select
                v-if="isEditing.status && currentEditingTask === task.id"
                v-model="task.status"
                @blur="saveEdit"
                class="max-w-[100px] border border-gray-300 p-1"
              >
                <option value="0">Pendente</option>
                <option value="1">Em Progresso</option>
                <option value="2">Concluído</option>
              </select>
              <span v-else>
                <template v-if="task.status === 1">Em progresso</template>
                <template v-else-if="task.status === 2">Concluído</template>
                <template v-else-if="task.status === 0">Pendente</template>
              </span>
            </td>

            <td
              class="max-w-[325px] w-[100px] overflow-hidden text-ellipsis whitespace-nowrap border-b"
              @click="editField('priority', task)"
            >
              <select
                v-if="isEditing.priority && currentEditingTask === task.id"
                v-model="task.priority"
                @blur="saveEdit"
                class="max-w-[90px] border border-gray-300 p-1"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <span v-else>
                <template v-if="task.priority === 'Medium'">Medium</template>
                <template v-else-if="task.priority === 'High'">High</template>
                <template v-else-if="task.priority === 'Low'">Low</template>
                <template v-else>Status desconhecido</template>
              </span>
            </td>

            <td
              class="max-w-[325px] w-[180px] overflow-hidden text-ellipsis whitespace-nowrap border-b"
              @click="editField('deadline', task)"
            >
              <input
                v-if="isEditing.deadline && currentEditingTask === task.id"
                v-model="task.deadline"
                @blur="saveEdit"
                type="datetime-local"
                class="max-w-[175px] border border-gray-300 p-1"
              />
              <span v-else>
                {{ task.deadline ? formatDate(task.deadline) : "N/A" }}
              </span>
            </td>
            <td class="py-2 px-4 border-b flex flex-row gap-3">
              <button
                v-if="task.id !== undefined"
                @click="deleteTask(task.id)"
                class="text-red-500 hover:text-red-700 ml-2"
              >
                Excluir
              </button>
              <button
                v-if="currentEditingTask !== null"
                @click="saveEdit"
                class="flex justify-center items-center font-bold shadow-lg"
              >
                <img
                  src="../assets//edit-1479-svgrepo-com (2).svg"
                  class="w-[15px]"
                  alt=""
                />
              </button>
              <button
                v-else
                :disabled="true"
                class="flex justify-center items-center font-bold shadow-lg"
              >
                <img
                  src="../assets/edit-1479-svgrepo-com (3).svg"
                  class="w-[15px]"
                  alt=""
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import { ITask } from "@/interfaces/ITask";
import { format } from "date-fns";
import { useEmployeeStore } from "@/stores/employeeStore";
import { IEmployee } from "@/interfaces/IEmployee";

const employeeStore = useEmployeeStore();

const taskStore = useTaskStore();
const tasks = ref<ITask[]>([]);
const employees = ref<IEmployee[]>([]);

const selectedOption = ref("");
const selectedProgress = ref("");
const titleInput = ref("");
const idInput = ref("");
const dateInput = ref("");
const descriptionInput = ref("");
const selectedPriority = ref("");

const filteredTasks = ref<ITask[]>([]);

const isEditing = ref({
  title: false,
  description: false,
  status: false,
  priority: false,
  deadline: false,
  employeeId: false,
});

const currentEditingTask = ref<number | null>(null);

const fetchTasks = async () => {
  await taskStore.fetchAllTasks();
  tasks.value = taskStore.tasks;
  filteredTasks.value = tasks.value;
  console.log("Tarefas:", tasks.value);
};

const fetchEmployees = async () => {
  await employeeStore.fetchAllEmployees();
  employees.value = employeeStore.employees;
  console.log(employees.value);
};

const formatDate = (dateString: string): string | null => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    console.error(`Invalid date value: ${dateString}`);
    return null;
  }
  return format(date, "dd-MM-yyyy HH:mm");
};
const filterTasks = () => {
  filteredTasks.value = tasks.value.filter((task) => {
    const matchesId = idInput.value
      ? task.id?.toString() === idInput.value
      : true;
    const matchesTitle = titleInput.value
      ? task.title.includes(titleInput.value)
      : true;
    const matchesProgress = selectedProgress.value
      ? (selectedProgress.value === "0" && task.status === 0) ||
        (selectedProgress.value === "1" && task.status === 1) ||
        (selectedProgress.value === "2" && task.status === 2)
      : true;
    const matchesEmployee = selectedOption.value
      ? task.employee && task.employee.id === selectedOption.value
      : true;

    const formattedDateInput = dateInput.value
      ? formatDate(dateInput.value)
      : null;
    const formattedTaskDeadline = task.deadline
      ? formatDate(task.deadline)
      : null;
    const matchesDate = formattedDateInput
      ? formattedTaskDeadline === formattedDateInput
      : true;

    const matchesDescription = descriptionInput.value
      ? task.description.includes(descriptionInput.value)
      : true;
    const matchesPriority = selectedPriority.value
      ? task.priority === selectedPriority.value
      : true;

    return (
      matchesId &&
      matchesTitle &&
      matchesProgress &&
      matchesEmployee &&
      matchesDate &&
      matchesDescription &&
      matchesPriority
    );
  });
};

const clearFilters = () => {
  idInput.value = "";
  titleInput.value = "";
  selectedProgress.value = "";
  selectedOption.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  selectedPriority.value = "";
};

const createTask = async () => {
  console.log("Criar nova tarefa");

  const selectedEmployee = employees.value.find(
    (employee) => employee.id === selectedOption.value
  );

  if (!selectedEmployee || !selectedEmployee.id) {
    console.error("Funcionário não encontrado ou ID inválido");
    console.log(selectedEmployee);
    return;
  }

  const employeeId = Number(selectedEmployee.id);
  console.log("Valor de dateInput:", dateInput.value);

  const dateValue = new Date(dateInput.value);

  if (isNaN(dateValue.getTime())) {
    console.error("Data inválida:", dateInput.value);
    return;
  }

  const deadlineFormatted = dateValue.toISOString();

  const newTask: ITask = {
    title: titleInput.value,
    description: descriptionInput.value,
    status: Number(selectedProgress.value),
    deadline: deadlineFormatted,
    employeeId: employeeId,
    priority: selectedPriority.value,
  };

  await taskStore.createNewTask(newTask);
  fetchTasks();
  clearFilters();
};

const deleteTask = async (id: number) => {
  try {
    console.log("Excluindo tarefa com ID:", id);
    await taskStore.deleteTaskStore(id);
    fetchTasks();
    clearFilters();
  } catch (error) {
    console.error("Erro ao excluir a tarefa:", error);
  }
};

const editField = (
  field:
    | "title"
    | "description"
    | "status"
    | "priority"
    | "deadline"
    | "employeeId",
  task: ITask
) => {
  if (task.id !== undefined) {
    currentEditingTask.value = task.id;
    isEditing.value[field] = true;
  }
};

const saveEdit = async () => {
  if (currentEditingTask.value !== null) {
    const taskId = currentEditingTask.value;
    const taskToUpdate = tasks.value.find((task) => task.id === taskId);

    if (taskToUpdate) {
      if (
        taskToUpdate.deadline === undefined ||
        taskToUpdate.deadline === null
      ) {
        console.error("Deadline está indefinido ou nulo:", taskToUpdate);
      }
      taskToUpdate.status = Number(taskToUpdate.status);
      
      await taskStore.updateTaskStore(taskToUpdate);
      console.log(`Task ${taskId} updated successfully`);
    } else {
      console.error(`Task with ID ${taskId} not found`);
    }

    isEditing.value = {
      title: false,
      description: false,
      status: false,
      deadline: false,
      priority: false,
      employeeId: false,
    };
    currentEditingTask.value = null;
    fetchTasks();
  } else {
    console.error("No current editing task");
  }
};

onMounted(() => {
  fetchTasks();
  fetchEmployees();
});
</script>
