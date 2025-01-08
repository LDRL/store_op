import { useState, useEffect } from 'react';
import { PaginationModel, pageSize } from '@/utils';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useProductContext } from '@/context';
import { ApiUser, ApiResponse, User, UserList } from '../models';
import { UserAdapter, UserListAdapter } from '../adapter';
import clientAxios from '@/config/clientAxios';

const apiUrl = import.meta.env.VITE_API_URL;

export const useFetchUsers = (page: number = 1, search: string) => {
    return useQuery<ApiResponse, Error>({
        queryKey: ['users', page, search],
        queryFn: async () => {
            const response = await clientAxios.get<ApiResponse>(`${apiUrl}usuarios/?page=${page}&search=${search}`);
            return response.data;   
        }
    });
};

//Hook for list users and search for name

export const useUser = (initialPage: number = 1) => {
    const {userState} = useProductContext();
    const search = userState.search;

    const [users, setUsers] = useState<UserList>([]);
    const [totalUser, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(initialPage);


    const [paginationModel, setPaginationModel] = useState<PaginationModel>({
        page: initialPage - 1,
        pageSize: pageSize,
    });

    const { data, error, isLoading } = useFetchUsers(page,search);

    useEffect(() => {
        if(data){
            const adaptedProducts = data ? UserListAdapter(data.data) : []; // Todo cambiar a data cuando en la api mande data en ves de marcas
            setUsers(adaptedProducts || []);
            setTotal(data?.total || 0);
        }
    }, [data]);

    const handlePaginationModelChange = (newPaginationModel: PaginationModel) => {
        setPaginationModel(newPaginationModel);
        const newPage = newPaginationModel.page + 1;
        setPage(newPage);
    };

    return {
        users,
        totalUser,
        isLoading,
        error,
        paginationModel,
        handlePaginationModelChange,
    };
};

// Hook for get an Client for id
export const useGetUser = (Id: string) => {
    return useQuery<User, Error>({
        queryKey: ['user', Id], // Clave de consulta
        queryFn: async () => {
            const response = await clientAxios.get<{ data: ApiUser }>(`${apiUrl}usuarios/${Id}/`);

            if (response.status !== 200) {
                throw new Error('Error al cargar la marca');
            }

            return UserAdapter(response.data.data); // Adaptamos y devolvemos el producto
        },
    });
};


// Hook for create new Client
export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation<string, Error, User>({
        mutationFn: async (newUser) => {
            const user = {
                email: newUser.email,
                nombre: newUser.name,
                contraseña: newUser.password,
                telefono: newUser.phone,
                fecha_nacimiento: newUser.date,
                id_rol: newUser.idRol,
                id_cliente: newUser.idClient,
            };

            const response = await clientAxios.post<{ message: string, data: ApiUser }>(`${apiUrl}usuarios/`, user);

            if (response.status !== 201) {
                throw new Error('Error al crear la marca');
            }
            return response.data.message
            // return UserAdapter(response.data.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            alert(`Error al crear el usuario: ${error.message}`);
            // TODO:  Considerar usar un componente de notificación en lugar de alert
            console.error(`Error al crear usuario: ${error}`);
        },
    });
};

// Hook para actualizar un producto existente
export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation<User, Error, User>({
        mutationFn: async (updatedUser) => {
            const user = {
                correo_electronico: updatedUser.email,
                nombre: updatedUser.name,
                password: updatedUser.password,
                telefono: updatedUser.phone,
                fecha_nacimiento: updatedUser.date,
                id_rol: updatedUser.idRol,
                id_cliente: updatedUser.idClient,
            };

            const response = await clientAxios.put<{ message: string, data: ApiUser }>(`${apiUrl}usuarios/${updatedUser.id}/`, user);

            if (response.status !== 201) {
                throw new Error('Error al actualizar la marca');
            }

            return UserAdapter(response.data.data); 
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.error(`Error updating User: ${error}`);
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation<string, Error, number>({
        mutationFn: async (userId) => {
            
            const response = await clientAxios.put<{ message: string }>(`${apiUrl}usuarios/${userId}/`);

            if (response.status !== 201) {
                throw new Error('Error al eliminar el usuario');
            }

            return response.data.message; 
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.error(`Error updating User: ${error}`);
        },
    });
};