import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import { ApiDetail, Total } from "../models";
import { ApiOrder, Order, OrderList } from '../models/order.type';
import { OrderAdapter, OrderListAdapter } from "../adapter";
import clientAxios from "@/config/clientAxios";

export const fetchBuyList = async (url: string, page: number, search: string): Promise<[Error?, OrderList?, Total?]> => {
    const params: { page: number; search?: string } = { page };
    if (search !== "") params.search = search;

    const config: AxiosRequestConfig = {
        params
    };
    
    try {
        const response: AxiosResponse<{ compras: ApiOrder[], total: number }> = await axios.get(url, config);

        if (response.statusText !== 'OK') return [new Error(`Error fetching buys: ${response.statusText}`)];

        const {compras, total} = response.data

        return [undefined, OrderListAdapter(compras), total];
    } catch (error) {
        if (error instanceof Error) return [error];
        return [new Error(`Error fetching buys:`)];
    }
};


export const fetchBuy = async (url: string): Promise<[Error?, Order?]> => {    
    try {
        const response: AxiosResponse<{ data:ApiOrder }> = await axios.get(url);
        
        if (response.statusText !== 'OK') return [new Error(`Error fetching buys: ${response.statusText}`)];

        const {data} = response.data
        return [undefined, OrderAdapter(data)];

    } catch (error) {
        throw new Error(`Error fetching buys: ${error}`);
    }
};


// CREATE
export const fetchOrderCreate = async (url: string, buyN: Order):  Promise<[Error?, Order?, any?]> => {
    try {
        const detalles: ApiDetail[] = [];

        if (Array.isArray(buyN.detail) && buyN.detail.length > 0) {
            buyN.detail.forEach(d => {
                detalles.push({
                    cantidad: d.amount,
                    precio: d.price,
                    subtotal: d.subtotal,
                    id_producto: d.id
                });
            });
        }

        const buy: Omit<ApiOrder, "id_orden" | "fecha_creacion" | "estado" > = {
            // fecha: buyN.date.toISOString(), // Convertir la fecha a formato ISO
            nombre: buyN.name,
            direccion: buyN.address,
            telefono: buyN.phone,
            correo_electronico: buyN.email,
            fecha_entrega: buyN.deliveryDate,
            detalle: detalles,
            total_orden: buyN.totalOrder,
        };

        const response: AxiosResponse<{message: string, data: ApiOrder}> = await clientAxios.post(url, buy);
        const {data} = response.data
        
        return [undefined, OrderAdapter(data), response]

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Server responded with a status other than 2xx
            throw new Error(`Error creating buy: ${error.response.data}`);
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error(`Error creating buy: ${error}`);
        }
    }
};


export const fetchOrderUpdate = async (url: string, buyN: Order):  Promise<[Error?, Order?, any?]> => {
    try {
        const detalles: ApiDetail[] = [];

        if (Array.isArray(buyN.detail) && buyN.detail.length > 0) {
            buyN.detail.forEach(d => {
                detalles.push({
                    cantidad: d.amount,
                    precio: d.price,
                    subtotal: d.subtotal,
                    id_producto: d.id
                });
            });
        }

        const buy: Omit<ApiOrder,"fecha_creacion" > = {
            // fecha: buyN.date.toISOString(), // Convertir la fecha a formato ISO
            nombre: buyN.name,
            direccion: buyN.address,
            telefono: buyN.phone,
            correo_electronico: buyN.email,
            fecha_entrega: buyN.deliveryDate,
            detalle: detalles,
            total_orden: buyN.totalOrder,
            estado: buyN.status,
            id_orden: buyN.id
        };

        const response: AxiosResponse<{message: string, data: ApiOrder}> = await clientAxios.put(url, buy);
        const {data} = response.data
        
        return [undefined, OrderAdapter(data), response]

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Server responded with a status other than 2xx
            throw new Error(`Error creating buy: ${error.response.data}`);
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error(`Error creating buy: ${error}`);
        }
    }
};

