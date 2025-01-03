import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ILogin } from '../models';

const apiUrl = import.meta.env.VITE_API_URL;

export const useCreateLogin = () => {
    const queryClient = useQueryClient();

    return useMutation<ILogin, Error, ILogin>({
        mutationFn: async (newLogin) => {
            const login = {
                email: newLogin.email,
                contraseña: newLogin.password,
            };

            const response = await axios.post(`${apiUrl}auth/login`, login);

            // guardar en el storage
            const {data} = await response.data;
            console.log(response.data.data, "response data mutation")
            await localStorage.setItem('AUTH_TOKEN',data)

            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['login'] });
        },
        onError: (error)=>{
            console.error(`Error para ingresar : ${error}`);
        }
    });
}