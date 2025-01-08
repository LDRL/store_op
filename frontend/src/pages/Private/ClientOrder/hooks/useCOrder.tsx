import axios from 'axios';
// import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { PaginationModel, pageSize } from '@/utils';
import { OrderAdapter, OrderListAdapter } from '../adapter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderList, ApiResponse, Order, ApiOrder } from '../models';
import { useProductContext } from '@/context/ProductProvider';
import clientAxios from '@/config/clientAxios';


const apiUrl = import.meta.env.VITE_API_URL;

export const useFetchOrders = (page: number = 1, search: string) => {
    return useQuery<ApiResponse, Error>({
        queryKey: ['corders', page, search],
        queryFn: async () => {
            const response = await clientAxios.get<ApiResponse>(`${apiUrl}clientes/order/?page=${page}&search=${search}`);
            return response.data;
        }
    });
};

//Hook for list categories and search for name

export const useOrder = (initialPage: number = 1) => {
    // const search = useSelector((state:any) => state.category.search);
    const {categoryState} = useProductContext();
    const search = categoryState.search;

    const [orders, setOrders] = useState<OrderList>([]);
    const [totalOrder, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(initialPage);


    const [paginationModel, setPaginationModel] = useState<PaginationModel>({
        page: initialPage - 1,
        pageSize: pageSize,
    });

    const { data, error, isLoading } = useFetchOrders(page,search);

    useEffect(() => {
        if(data){
            const adaptedOrders = data ? OrderListAdapter(data.data) : [];
            setOrders(adaptedOrders || []);
            setTotal(data?.total || 0);
        }
    }, [data]);

    const handlePaginationModelChange = (newPaginationModel: PaginationModel) => {
        setPaginationModel(newPaginationModel);
        const newPage = newPaginationModel.page + 1;
        setPage(newPage);
    };

    return {
        orders,
        totalOrder,
        isLoading,
        error,
        paginationModel,
        handlePaginationModelChange,
    };
};

// Hook for get an category for id
export const useGetOrder = (orderId: string) => {
    return useQuery<Order, Error>({
        queryKey: ['corder', orderId], // Clave de consulta
        queryFn: async () => {
            const response = await clientAxios.get<{ data: ApiOrder }>(`${apiUrl}clientes/order/${orderId}/`);

            if (response.status !== 200) {
                throw new Error('Error al cargar el producto');
            }

            return OrderAdapter(response.data.data); // Adaptamos y devolvemos el producto
        },
    });
};