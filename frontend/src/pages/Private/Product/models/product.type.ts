
export interface ApiProduct {
    id_producto: number;
    codigo: number;
    nombre: string;
    precio: number;
    stock: number;
    id_marca: number;
    marca: string;
    id_categoria_producto: number;
    categoria: string;
    foto: string;
    id_estado: number;
    estado: string;
    image?: File;

    // updatedAt: Date
    //Datos para guardar catalgos
}

export interface Product {
    id: number;
    code: number;
    name: string;
    price: number;
    stock: number;
    brand: string;
    category: string;
    idBrand: number;
    idCategory: number;
    photo_url: string;
    idState: number;
    state: string
    image?: File;
}




export const ProductEmptyState: Product = {
    id: 0,
    code: 0,
    name: '',
    price: 0,
    stock: 0,
    brand: '',
    category: '',
    idBrand: 0,
    idCategory: 0,
    photo_url: '',
    idState: 0,
    state: ''
}

export type ProductList = Array<Product>

export type ProductTotal = {
    total: number
};

export type Total = number;


export type Data = Array<Record<string, string>>

export type ApiResponse = {
    message: string,
    data: ProductList,
    total: number
}

export type ApiResponseProduct = {
    message: string,
    data: Product,
}

// Info about an Brand in the API



/// Slice 
export interface ProductState {
    currentProduct: Product | null;
    search: string;
}

export const EmptyProductState: ProductState = {
    currentProduct: null,
    search: ''
};