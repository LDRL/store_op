// Info about an Client in the API
export interface ApiClient {
    id_cliente: number;
    razon_social:string;
    nombre_comercial:string;
    telefono:string;
    direccion_entrega:string;
    email: string;
}

export interface ApiResponse {
    msg: string;
    data: ApiClient[]; //Todo cambiar a data cuando en la api mande data en ves de marcas
    total: number;
    currentPage: number;
}

/// Manejo en el frontend
export interface Client {
    id:number;
    razon: string;
    name: string;
    phone: string;
    address: string;
    email: string;
}

export const ClientEmptyState: Client = {
    id: 0,
    name: '',
    razon: '',
    phone: '',
    address: '',
    email: '',
}

export type ClientList = Array<Client>

/// Slice 
export interface ClientState {
    currentClient: Client | null;
    search: string;
}

export const EmptyClientState: ClientState = {
    currentClient: null,
    search: ''
};