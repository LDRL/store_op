import { ApiClient, Client} from "../models";

export const ClientAdapter = (client: ApiClient): Client => {
    return{
        id: client.id_cliente,
        name: client.nombre_comercial,
        razon: client.razon_social,
        phone: client.telefono,
        address: client.direccion_entrega,
        email: client.email,
    }
}

export function ClientListAdapter(apiClientList: ApiClient[]): Client[] {
    return apiClientList.map(ClientAdapter);
}
