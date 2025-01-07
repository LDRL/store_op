
export interface ApiClient {
    id_cliente: number;
    razon_social: string;
    nombre_comercial: string;
    direccion_entrega: string;
    telefono: number;
    email: string;
}

export interface Client {
    id: number;
    razon: string;
    name: string;
    address: string;
    phone: number;
    email: string;
}


export const ClientEmptyState: Client = {
    id: 0,
    razon: '',
    name: '',
    address: '',
    phone: 0,
    email: '',
}

export type ClientList = Array<Client>

export type ClientTotal = {
    total: number
};

type Total = number;


// export type Data = Array<Record<string, string>>

export type ApiResponseC = {
    msg: string,
    data: ApiClient[],
    total: number,
    currentPage: number
}


export type ApiResponseClient = {
    msg: string,
    data: Client,
}

/// Context
export interface ClientState {
    currentClient: Client | null;
    search: string;
}

export const EmptyClientState: ClientState = {
    currentClient: null,
    search: ''
};