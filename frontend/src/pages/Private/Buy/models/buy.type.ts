
export interface ApiBuy {
    id_producto: number;
    codigo: number;
    nombre: string;
    precio: number;
    stock: number;
    foto: string;
    id_estado: number;
    estado: string;
    image?: File;
}

export interface Buy {
    id: number;
    code: number;
    name: string;
    price: number;
    stock: number;
    photo_url: string;
    idState: number;
    state: string
    image?: File;
}


export const BuyEmptyState: Buy = {
    id: 0,
    code: 0,
    name: '',
    price: 0,
    stock: 0,
    photo_url: '',
    idState: 0,
    state: ''
}

export type BuyList = Array<Buy>

export type BuyTotal = {
    total: number
};

export type Total = number;


export type Data = Array<Record<string, string>>

export type ApiResponse = {
    msg: string,
    data: ApiBuy[],
    total: number,
    currentPage: number
}


export type ApiResponseBuy = {
    msg: string,
    data: Buy,
}

/// Context
export interface BuyState {
    currentProduct: Buy | null;
    search: string;
}

export const EmptyProductState: BuyState = {
    currentProduct: null,
    search: ''
};