import { ApiProduct, Product } from "../models";

export const ProductAdapter = (product: ApiProduct): Product => {
    return{
        id: product.id_producto,
        name: product.nombre,
        price: product.precio,
        stock: product.stock,
        brand: product.marca,
        category: product.categoria, 
        idBrand: product.id_marca,
        idCategory: product.id_categoria_producto,
        code: product.codigo,
        idState: product.id_estado,
        state: product.estado,
        photo_url: product.foto
    }
}

export function ProductListAdapter(apiProductList: ApiProduct[]): Product[] {
    return apiProductList.map(ProductAdapter);
}