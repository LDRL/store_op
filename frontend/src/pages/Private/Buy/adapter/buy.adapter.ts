import { ApiBuy, Buy } from "../models";

export const BuyAdapter = (product: ApiBuy): Buy => {
    return{
        id: product.id_producto,
        code: product.codigo,
        name: product.nombre,
        price: product.precio,
        stock: product.stock,
        idState: product.id_estado,
        state: product.estado,
        photo_url: product.foto
    }
}

export function BuyListAdapter(apiBuyList: ApiBuy[]): Buy[] {
    return apiBuyList.map(BuyAdapter);
}