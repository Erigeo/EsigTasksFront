<template>
  <div
    v-if="!showSignUp"
    class="flex flex-col items-center justify-center bg-gray-100 rounded-xl w-[450px] h-[500px] shadow-md"
  >
    <img src="../assets/teste 1.svg" class="w-[300px] h-[200px]" />
    <form @submit.prevent="handleLogin">
      <div class="flex-col flex m-5 w-[300px]">
        <label class="flex items-start">Email</label>
        <input
          v-model="email"
          type="email"
          
          required
          class="border-b-[1px] border-black bg-transparent outline-none"
        />
      </div>
      <div class="flex-col flex m-5">
        <label class="flex items-start">Password</label>
        <input
          v-model="password"
          type="password"
          
          required
          class="border-b-[1px] border-black bg-transparent outline-none"
        />
      </div>

      <button
        type="submit"
        class="items-center justify-center w-[300px] h-[50px] bg-red-600 rounded-md font-bold text-white"
      >
        Sign in
      </button>
    </form>
    <div class="flex items-center mt-5">
      <h3>Don't have an account yet?</h3>
      <h3
        @click="showSignUp = true"
        class="ml-2 text-blue-500 underline cursor-pointer"
      >
        Sign up
      </h3>
    </div>
  </div>

  <div
    v-if="showSignUp"
    class="flex flex-col items-center justify-center bg-gray-100 rounded-xl w-[450px] h-[500px] shadow-md"
  >
    <div class="flex text-left px-10">
      <h1 class="text-2xl">Get Started</h1>
    </div>

    <form @submit.prevent="handleRegister">
      <div class="flex-col flex m-5">
        <label class="flex items-start">Email</label>
        <input
          v-model="employee.email"
          type="email"
          
          required
          class="border-b-[1px] border-black bg-transparent outline-none"
        />
      </div>
      <div class="flex-col flex m-5">
        <label class="flex items-start">First Name</label>
        <input
          v-model="employee.firstName"
         
         
          required
          class="border-b-[1px] border-black bg-transparent outline-none"
        />
      </div>
      <div class="flex-col flex m-5">
        <label class="flex items-start">Last Name</label>
        <input
          v-model="employee.lastName"
          
          
          required
          class="border-b-[1px] border-black bg-transparent outline-none"
        />
      </div>
      <div class="flex-col flex m-5">
        <label class="flex items-start">Password</label>
        <input
          v-model="employee.password"
           type="password"
          
          
          required
          class="border-b-[1px] border-black bg-transparent outline-none"
        />
      </div>

      <div class="flex px-[100px]  flex-row gap-2 mb-2 ">
        <label class="flex items-center cursor-pointer">
      <input
        type="radio"
        @click="updateSelectedOption(1)"
        class="form-radio h-4 w-4 text-blue-600"
      />
      <span class="ml-2 text-gray-700">Employee</span>
    </label>

    <label class="flex items-center cursor-pointer">
      <input
        type="radio"
      
        @click="updateSelectedOption(0)"
        class="form-radio h-4 w-4 text-blue-600"
      />
      <span class="ml-2 text-gray-700">Manager</span>
    </label>
      </div>

      <button
        type="submit"
        class="items-center justify-center w-[300px] h-[50px] bg-red-600 rounded-md font-bold text-white"
      >
        Sign up
      </button>
    </form>
    <div class="flex items-center mt-5">
      <h3>Already have an account?</h3>
      <h3
        @click="showSignUp = false"
        class="ml-2 text-blue-500 underline cursor-pointer"
      >
        Sign in
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { IEmployee } from "@/interfaces/IEmployee";

export default {
  name: "LoginComponent",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const fname = ref("");
    const lname = ref("");
    const errorMessage = ref<string | null>(null); 

    const selectedOption = ref<number>(0);
    const showSignUp = ref(false);  

    const updateSelectedOption = (value: number) => {
  selectedOption.value = value;
  employee.value.role = value; // Atualiza o role no objeto employee
};
    
    const employee = ref<IEmployee>({
      
      firstName: '',
      email: '',
      password: '',
      lastName: '',
      role: selectedOption.value
    });


    const handleLogin = async () => {
      errorMessage.value = null; 

      try {
        await authStore.login(email.value, password.value);

        if (authStore.tokenResponse?.role == "Employee") {
            
          router.push("/EmployeePage"); 
        } 
        else if (authStore.tokenResponse?.role == "Manager") {
            
            router.push("/ManagerPage"); 
          } 
        else {
          errorMessage.value = "Login falhou. Por favor, tente novamente.";
        }
      } catch (error) {
        errorMessage.value = "Ocorreu um erro durante o login.";
      }
    };


    const handleRegister = async () => {
      errorMessage.value = null; 

      try {
        console.log(employee)
        await authStore.register(employee.value);
        await authStore.login(employee.value.email, employee.value.password);
        
        if (authStore.token && employee.value.role == 1) {
          router.push("/EmployeePage"); 
        } 
        else if (authStore.token && employee.value.role == 0) {
          router.push("/ManagerPage"); 
        }
        
        else {
          errorMessage.value = "Login falhou. Por favor, tente novamente.";
        }
      } catch (error) {
        errorMessage.value = "Ocorreu um erro durante o login.";
      }
    };

    return {
      email,
      password,
      errorMessage, 
      handleLogin,
      showSignUp,
      selectedOption,
      fname,
      lname,
      handleRegister,
      employee,
      updateSelectedOption
    };
  },
};
</script>
