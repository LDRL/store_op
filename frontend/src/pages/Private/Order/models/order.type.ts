// Info about an order in the API
export interface ApiOrder {
    id_orden: number;
    fecha_creacion: string;
    nombre:string;
    direccion: string;
    telefono: string;
    correo_electronico: string;
    fecha_entrega: Date | string;
    total_orden: number;
    estado: number;
    detalle?: ApiDetail[];
}

export interface ApiDetail {
    cantidad: number,
    precio: number,
    subtotal: number,
    id_producto?: number,
    id_orden_detalle?: number,
    nombre?: string,
    foto?:string,
}

export interface Detail{
    amount: number,
    price: number, 
    subtotal: number,
    idProducto?: number,
    id?:number,
    name?: string,
    photo_url?: string,
}

export interface ApiResponse {
    msg: string;
    data: ApiOrder[];
    total: number;
    currentPage: number;
}

/// Manejo en el frontend
export interface Order {
    id: number;
    creationDate: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    deliveryDate: Date | string;
    totalOrder: number;
    status: number;
    detail?: Detail[];
}

export const OrderEmptyState: Order = {
    id: 0,
    creationDate: "", 
    name: "", 
    address: "", 
    phone: "", 
    email: "", 
    deliveryDate: new Date(0), 
    totalOrder: 0, 
    status: 0,
    detail: []
}

export type OrderList = Array<Order>

/// Slice 
export interface OrderState {
    currentOrder: Order | null;
    search: string;
}
  
export const EmptyOrderState: OrderState = {
    currentOrder: null,
    search: ''
};
export type Total = number;