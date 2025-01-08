import { ApiDetail, ApiOrder, Detail, Order} from "../models";

export const OrderAdapter = (order: ApiOrder): Order => {
    return{
        id: order.id_orden,
        name: order.nombre,
        creationDate: order.fecha_creacion,
        address: order.direccion,
        phone: order.telefono,
        email: order.correo_electronico,
        deliveryDate: order.fecha_entrega,
        totalOrder: order.total_orden,
        status: order.estado,

        detail: order.detalle && order.detalle.length > 0
        ? order.detalle.map((d: ApiDetail): Detail => ({
            amount: d.cantidad,
            price: d.precio,
            subtotal: d.subtotal,
            idProducto: d.id_producto,
            id: d.id_orden_detalle,
            name: d.nombre,
            photo_url: d.foto,
        }))
        : []
    }
}


export function OrderListAdapter(apiOrderList: ApiOrder[]): Order[] {
    return apiOrderList.map(OrderAdapter);
}
