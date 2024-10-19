import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login as loginService, register as registerService } from '../services/AuthService';
import { IEmployee } from '../interfaces/IEmployee';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { ITokenResponse } from '@/interfaces/ITokenResponse';


export const useAuthStore = defineStore('auth', () => {
    const user = ref<IEmployee | null>(null);
    const token = ref<string | null>(null);
    const errorMessage = ref<string | null>(null);
    const tokenResponse = ref<ITokenResponse | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const response: ILoginResponse = await loginService(email, password);
            token.value = response.token;
            errorMessage.value = null;

            if (token.value) {
                const decodedToken = jwtDecode(token.value) as { sub: string; id: string; role: string };
                
                tokenResponse.value = {
                    email: decodedToken.sub,
                    id: decodedToken.id,
                    role: decodedToken.role,
                     
                };
            }


        } catch (error) {
            user.value = null;

            // Verificação de tipo
            if (axios.isAxiosError(error) && error.response) {
                errorMessage.value = error.response.data?.message || 'Erro ao fazer login';
            } else {
                errorMessage.value = 'Erro desconhecido ao fazer login';
            }
        }
    };

    const register = async (registerData: IEmployee) => {
        try {
            await registerService(registerData);
            errorMessage.value = null; // Limpa mensagens de erro após o registro bem-sucedido
            // Aqui você pode optar por redirecionar o usuário para a página de login
        } catch (error) {
            user.value = null;

            // Verificação de tipo
            if (axios.isAxiosError(error) && error.response) {
                errorMessage.value = error.response.data?.message || 'Erro ao fazer login';
            } else {
                errorMessage.value = 'Erro desconhecido ao fazer login';
            }
        }
    };

    const logout = () => {
        user.value = null;
        token.value = null;
    };

    return {
        user,
        token,
        errorMessage,
        tokenResponse,
        login,
        register,
        logout,
    };
});
