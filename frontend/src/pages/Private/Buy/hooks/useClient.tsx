
import { useQuery,  } from '@tanstack/react-query';
import clientAxios from '@/config/clientAxios';
import { ApiClient,  Client } from '../models';
import { ClientAdapter } from '../adapter/client.adapter';

const apiUrl = import.meta.env.VITE_API_URL;

export const useGetClient = () => {
    return useQuery<Client, Error>({
        queryKey: ['client_checkout'], // Clave de consulta
        queryFn: async () => {
            const response = await clientAxios.get<{ data: ApiClient }>(`${apiUrl}clientes/checkout/`);

            if (response.status !== 200) {
                throw new Error('Error al cargar el producto');
            }

            return ClientAdapter(response.data.data); // Adaptamos y devolvemos el producto
        },
    });
};


