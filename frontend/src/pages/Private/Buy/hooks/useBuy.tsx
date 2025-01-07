import axios from 'axios';
// import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { PaginationModel, pageSize } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useProductContext } from '@/context/ProductProvider';
import clientAxios from '@/config/clientAxios';
import { ApiBuy, ApiResponse, Buy, BuyList } from '../models';
import { BuyAdapter, BuyListAdapter } from '../adapter';


const apiUrl = import.meta.env.VITE_API_URL;

export const useFetchBuies = (page: number = 1, search: string) => {
    return useQuery<ApiResponse, Error>({
        queryKey: ['buies', page, search],
        queryFn: async () => {
            const response = await clientAxios.get<ApiResponse>(`${apiUrl}productos/?page=${page}&search=${search}`);
            return response.data;
        }
    });
};


export const useBuy = (initialPage: number = 1) => {

    const {buyState} = useProductContext();
    const search = buyState.search;

    const [buies, setBuies] = useState<BuyList>([]);
    const [totalBuy, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(initialPage);

    const [paginationModel, setPaginationModel] = useState<PaginationModel>({
        page: initialPage - 1,
        pageSize: pageSize,
    });

    const { data, error, isLoading } = useFetchBuies(page,search);

    useEffect(() => {
        if(data){
            const adaptedBuies = data ? BuyListAdapter(data.data) : [];
            setBuies(adaptedBuies || []);
            setTotal(data?.total || 0);
        }
    }, [data]);

    const handlePaginationModelChange = (newPaginationModel: PaginationModel) => {
        setPaginationModel(newPaginationModel);
        const newPage = newPaginationModel.page + 1;
        setPage(newPage);
    };

    return {
        buies,
        totalBuy,
        isLoading,
        error,
        paginationModel,
        handlePaginationModelChange,
    };
};

export const useGetBuy = (buyId: string) => {
    return useQuery<Buy, Error>({
        queryKey: ['buy', buyId], // Clave de consulta
        queryFn: async () => {
            const response = await clientAxios.get<{ data: ApiBuy }>(`${apiUrl}compras/${buyId}/`);

            if (response.status !== 200) {
                throw new Error('Error al cargar el producto');
            }

            return BuyAdapter(response.data.data); // Adaptamos y devolvemos el producto
        },
    });
};


export const useCreateBuy = () => {
    const queryClient = useQueryClient();

    return useMutation<Buy, Error, Buy>({
        mutationFn: async (newBuy) => {
            const buy = {
                nombre: newBuy.name,
            };

            const response = await clientAxios.post<{ message: string, data: ApiBuy }>(`${apiUrl}compras/`, buy);

            if (response.status !== 201) {
                throw new Error('Error al crear la orden');
            }

            return BuyAdapter(response.data.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['buies'] });
        },
        onError: (error) => {
            alert(`Error al crear la orden: ${error.message}`);
            // TODO:  Considerar usar un componente de notificación en lugar de alert
            console.error(`Error al crear orden: ${error}`);
        },
    });
};

// Hook para actualizar un producto existente
export const useUpdateBuy = () => {
    const queryClient = useQueryClient();

    return useMutation<Buy, Error, Buy>({
        mutationFn: async (updatedBuy) => {
            const buy = {
                nombre: updatedBuy.name,
            };

            const response = await clientAxios.put<{ message: string, data: ApiBuy }>(`${apiUrl}compras/${updatedBuy.id}/`, buy);

            if (response.status !== 201) {
                throw new Error('Error al actualizar la orden');
            }

            return BuyAdapter(response.data.data); // Se adpata la orden y se retorna actualizado
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['buies'] });
        },
        onError: (error) => {
            console.error(`Error al actualizar la orden: ${error}`);
        },
    });
};