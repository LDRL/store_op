import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiOrder, ApiResponse, Order, OrderList } from "../models";
import { fetchOrderCreate, fetchOrderUpdate } from "../services/order";
import clientAxios from "@/config/clientAxios";
import { useProductContext } from "@/context";
import { useEffect, useState } from "react";
import { pageSize, PaginationModel } from "@/utils";
import { OrderAdapter, OrderListAdapter } from "../adapter";

const apiUrl = import.meta.env.VITE_API_URL;

export const useFetchOrders = (page: number = 1, search: string) => {
    return useQuery<ApiResponse, Error>({
        queryKey: ['orders', page, search],
        queryFn: async () => {
            const response = await clientAxios.get<ApiResponse>(`${apiUrl}ordenes/?page=${page}&search=${search}`);
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
            const response = await clientAxios.get<{ data: ApiOrder }>(`${apiUrl}ordenes/${orderId}/`);

            if (response.status !== 200) {
                throw new Error('Error al cargar el producto');
            }

            return OrderAdapter(response.data.data); // Adaptamos y devolvemos el producto
        },
    });
};



export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation<Order, Error, Order>({
        mutationFn: async (newBuy) => {

            // const response = await axios.post<{ message: string, producto: ApiBuy }>(`${apiUrl}compras`, buy);
            const [error, producto] = await fetchOrderCreate(`${apiUrl}ordenes`,newBuy);

            if (error){
                throw new Error('Error al crear el producto');
            }

            if (!producto) {
                throw new Error('Producto no creado');
            }

            return producto;


            // return BuyAdapter(response.data.producto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['buys'] });
        },
        onError: (error) => {
            console.error(`Error creating product: ${error}`);
        },
    });
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation<Order, Error, Order>({
        mutationFn: async (updatedOrder) => {

            // const response = await axios.post<{ message: string, producto: ApiBuy }>(`${apiUrl}compras`, buy);
            const [error, producto] = await fetchOrderUpdate(`${apiUrl}ordenes/${updatedOrder.id}`,updatedOrder);

            if (error){
                throw new Error('Error al actualizar el producto');
            }

            if (!producto) {
                throw new Error('Producto no creado');
            }

            return producto;


            // return BuyAdapter(response.data.producto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['buys'] });
        },
        onError: (error) => {
            console.error(`Error creating product: ${error}`);
        },
    });
};