// Info about an User in the API
export interface ApiUser {
    id_usuario: number;
    correo_electronico:string;
    fecha_nacimiento:Date;
    nombre:string;
    estado:string;
    rol: string;
    id_cliente?: number;
}

export interface ApiResponse {
    msg: string;
    data: ApiUser[]; //Todo cambiar a data cuando en la api mande data en ves de marcas
    total: number;
    currentPage: number;
}

/// Manejo en el frontend
export interface User {
    id:number;
    email: string;
    date: Date;
    name: string;
    status: string;
    rol: string;
    idClient?: number;
    idRol?:number;
    password?:string;
    phone?:string;
}

export const UserEmptyState: User = {
    id: 0,
    email: '',
    date: new Date(0),
    name: '',
    status: '',
    rol: '',
}

export type UserList = Array<User>

/// Slice 
export interface UserState {
    currentUser: User | null;
    search: string;
}

export const EmptyUserState: UserState = {
    currentUser: null,
    search: ''
};