import { ApiUser, User} from "../models";

export const UserAdapter = (user: ApiUser): User => {
    return{
        id: user.id_usuario,
        email: user.correo_electronico,
        date:user.fecha_nacimiento,
        name: user.nombre,
        status: user.estado,
        rol: user.rol,
        idClient: user.id_cliente
    }
}

export function UserListAdapter(apiUserList: ApiUser[]): User[] {
    return apiUserList.map(UserAdapter);
}
