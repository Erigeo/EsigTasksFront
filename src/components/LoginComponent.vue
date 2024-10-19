<template>
    <div class="flex flex-col items-center justify-center bg-gray-100 rounded-xl w-[450px] h-[500px] shadow-md ">
        <img src="../assets/teste 1.svg" class="w-[300px] h-[200px]">
        <form @submit.prevent="handleLogin"   >
            <div class="flex-col flex m-5 w-[300px]">
                <label class="flex items-start">Email</label>
                <input v-model="email" type="email" placeholder="Email" required class="  border-b-[1px] border-black bg-transparent outline-none">
            </div>
            <div class="flex-col flex m-5  ">
                <label class="flex items-start">Password</label>
                <input v-model="password" type="password" placeholder="Password" required class="  border-b-[1px] border-black bg-transparent outline-none">
                
            </div>

            <button type="submit" class="items-center justify-center w-[300px] h-[50px] bg-red-600 rounded-md font-bold text-white">Sign in</button>
           
            
        </form>
        <div class="flex items-center mt-5">
                <h3>Don't have an account yet?</h3>
                <h3 @click="showSignUp = true" class="ml-2 text-blue-500 underline cursor-pointer">Sign up</h3>
            </div>
        
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore'; 

export default {
  name: 'LoginComponent',
  setup() {
        const authStore = useAuthStore();
        const router = useRouter();

        const email = ref('');
        const password = ref('');
        const errorMessage = ref<string | null>(null); // Define a variável errorMessage

        const handleLogin = async () => {
            errorMessage.value = null; // Limpa mensagens de erro anteriores

            try {
                await authStore.login(email.value, password.value);
                
                if (authStore.token) {
                    router.push('/EmployeePage'); // Altere para a rota desejada
                } else {
                    errorMessage.value = 'Login falhou. Por favor, tente novamente.';
                }
            } catch (error) {
                errorMessage.value = 'Ocorreu um erro durante o login.';
            }
        };

        return {
            email,
            password,
            errorMessage, // Retorna a variável errorMessage
            handleLogin,
        };
    },
};
</script>