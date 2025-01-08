import { useState, useEffect } from 'react';
import { PaginationModel, pageSize } from '@/utils';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useProductContext } from '@/context';
import { ApiClient, ApiResponse, Client, ClientList } from '../models';
import { ClientAdapter, ClientListAdapter } from '../adapter';
import clientAxios from '@/config/clientAxios';

const apiUrl = import.meta.env.VITE_API_URL;

export const useFetchClients = (page: number = 1, search: string) => {
    return useQuery<ApiResponse, Error>({
        queryKey: ['clients', page, search],
        queryFn: async () => {
            const response = await clientAxios.get<ApiResponse>(`${apiUrl}clientes/?page=${page}&search=${search}`);
            return response.data;   
        }
    });
};

//Hook for list clients and search for name

export const useClient = (initialPage: number = 1) => {
    const {brandState} = useProductContext();
    const search = brandState.search;

    const [clients, setClients] = useState<ClientList>([]);
    const [totalClient, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(initialPage);


    const [paginationModel, setPaginationModel] = useState<PaginationModel>({
        page: initialPage - 1,
        pageSize: pageSize,
    });

    const { data, error, isLoading } = useFetchClients(page,search);

    useEffect(() => {
        if(data){
            const adaptedProducts = data ? ClientListAdapter(data.data) : []; // Todo cambiar a data cuando en la api mande data en ves de marcas
            setClients(adaptedProducts || []);
            setTotal(data?.total || 0);
        }
    }, [data]);

    const handlePaginationModelChange = (newPaginationModel: PaginationModel) => {
        setPaginationModel(newPaginationModel);
        const newPage = newPaginationModel.page + 1;
        setPage(newPage);
    };

    return {
        clients,
        totalClient,
        isLoading,
        error,
        paginationModel,
        handlePaginationModelChange,
    };
};

// Hook for get an Client for id
export const useGetClient = (Id: string) => {
    return useQuery<Client, Error>({
        queryKey: ['client', Id], // Clave de consulta
        queryFn: async () => {
            const response = await clientAxios.get<{ data: ApiClient }>(`${apiUrl}clientes/${Id}/`);

            if (response.status !== 200) {
                throw new Error('Error al cargar la marca');
            }

            return ClientAdapter(response.data.data); // Adaptamos y devolvemos el producto
        },
    });
};


// Hook for create new Client
export const useCreateClient = () => {
    const queryClient = useQueryClient();

    return useMutation<Client, Error, Client>({
        mutationFn: async (newClient) => {
            const client = {
                razon_social: newClient.razon,
                nombre_comercial: newClient.name,
                telefono: newClient.phone,
                direccion_entrega: newClient.address,
                email: newClient.email
            };

            const response = await clientAxios.post<{ message: string, data: ApiClient }>(`${apiUrl}clientes/`, client);

            if (response.status !== 201) {
                throw new Error('Error al crear la marca');
            }

            return ClientAdapter(response.data.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
        },
        onError: (error) => {
            alert(`Error al crear el cliente: ${error.message}`);
            // TODO:  Considerar usar un componente de notificación en lugar de alert
            console.error(`Error al crear cliente: ${error}`);
        },
    });
};

// Hook para actualizar un producto existente
export const useUpdateClient = () => {
    const queryClient = useQueryClient();

    return useMutation<Client, Error, Client>({
        mutationFn: async (updatedClient) => {
            const client = {
                razon_social: updatedClient.razon,
                nombre_comercial: updatedClient.name,
                telefono: updatedClient.phone,
                direccion_entrega: updatedClient.address,
                email: updatedClient.email,
            };

            const response = await clientAxios.put<{ message: string, data: ApiClient }>(`${apiUrl}clientes/${updatedClient.id}/`, client);

            if (response.status !== 201) {
                throw new Error('Error al actualizar la marca');
            }

            return ClientAdapter(response.data.data); 
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
        },
        onError: (error) => {
            console.error(`Error updating Client: ${error}`);
        },
    });
};

export const useDeleteClient = () => {
    const queryClient = useQueryClient();

    return useMutation<string, Error, number>({
        mutationFn: async (clientId) => {
            
            const response = await clientAxios.put<{ message: string }>(`${apiUrl}clientes/${clientId}/`);

            if (response.status !== 201) {
                throw new Error('Error al actualizar la marca');
            }

            return response.data.message; 
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
        },
        onError: (error) => {
            console.error(`Error updating Client: ${error}`);
        },
    });
};