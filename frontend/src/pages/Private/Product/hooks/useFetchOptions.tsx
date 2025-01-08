import clientAxios from '@/config/clientAxios';
import {useQuery} from '@tanstack/react-query'

interface Option{
    value: number;
    label: string;
}

interface Categoria {
    id_categoria_producto: number;
    nombre: string;
    estado: string | null;
}

interface Marca {
    id_marca: number;
    nombre: string;
    estado: string | null;
}

interface Role {
    id_rol: number;
    nombre: string;
}



interface ApiResponse {
    msg: string;
    data: Categoria[];
}

interface ApiMarcaResponse{
    msg: string;
    data: Marca[];
}

interface ApiRoleResponse{
    msg: string;
    data: Role[];
}



const apiUrl = import.meta.env.VITE_API_URL;

export const useFetchOptions = () => {
    return useQuery<Option[], Error>({
        queryKey: ['dropdownOptions'], // Se maneja como un objeto dentro de useQueryOptions para el uso de TypeScript 
        queryFn: async() => { // queryFn especifica la funcion para el consumo de la api
            // const response = await fetch(apiUrl+"categorias/");
            const response = await clientAxios.get(`${apiUrl}categorias`);

            if(response.status !== 200){
                throw new Error('Error al cargar las opciones')
            }

            console.log(response.data)
            const data: ApiResponse = await response.data;
            console.log(data, "-data")
            return categoriasAdapter(data.data);
        }
    });
};

const categoriasAdapter = (categorias: Categoria[]): Option[] => {
    return categorias.map(categoria => ({
        value: categoria.id_categoria_producto,
        label: categoria.nombre,
    }));
};

export const useFetchMarcaOptions = () => {
    return useQuery<Option[], Error>({
        queryKey: ['dropdownMarca'], // Se maneja como un objeto dentro de useQueryOptions para el uso de TypeScript 
        queryFn: async() => { // queryFn especifica la funcion para el consumo de la api
            const response = await clientAxios.get(`${apiUrl}marcas`);
            if(response.status !== 200){
                throw new Error('Errr al cargar las opciones')
            }

            const data: ApiMarcaResponse = await response.data;
            return MarcasAdapter(data.data);
        }
    });
};

const MarcasAdapter = (marcas: Marca[]): Option[] => {
    return marcas.map(marca => ({
        value: marca.id_marca,
        label: marca.nombre,
    }));
};

export const useFetchRolOptions = () => {
    return useQuery<Option[], Error>({
        queryKey: ['dropdownRole'], // Se maneja como un objeto dentro de useQueryOptions para el uso de TypeScript 
        queryFn: async() => { // queryFn especifica la funcion para el consumo de la api
            const response = await clientAxios.get(`${apiUrl}roles`);
            if(response.status !== 200){
                throw new Error('Error al cargar las opciones')
            }

            const data: ApiRoleResponse = await response.data;
            return RolesAdapter(data.data);
        }
    });
};


const RolesAdapter = (roles: Role[]): Option[] => {
    return roles.map(role => ({
        value: role.id_rol,
        label: role.nombre,
    }));
};
