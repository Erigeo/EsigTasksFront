import { ILoginResponse } from "@/interfaces/ILoginResponse";
import { Api } from "./Api"
import { IEmployee } from "@/interfaces/IEmployee";



export const login = async (email: string, password: string): Promise<ILoginResponse> => {
    const response = await Api.post<ILoginResponse>('login', { email, password });
    return response.data;
};

export const register = async (employee: IEmployee ): Promise<void> => {
     await Api.post('register', employee);
}