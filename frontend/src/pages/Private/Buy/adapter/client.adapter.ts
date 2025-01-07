import { ApiClient, Client } from "../models";

export const ClientAdapter = (client: ApiClient): Client => {
    return{
        id: client.id_cliente,
        razon: client.razon_social,
        name: client.nombre_comercial,
        address: client.direccion_entrega,
        phone: client.telefono,
        email: client.email,
    }
}

export function ClientListAdapter(apiClientList: ApiClient[]): Client[] {
    return apiClientList.map(ClientAdapter);
}