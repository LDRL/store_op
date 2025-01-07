import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductAdapter, ProductListAdapter } from "../adapter";
import { Product, ProductList, ApiProduct } from "../models";
import { useProductContext } from '@/context';
import { useEffect, useState } from 'react';
import { pageSize, PaginationModel } from '@/utils';
import clientAxios from '@/config/clientAxios';

export const productUrl = 'http://localhost:8080/api/productos/';

interface ApiResponse {
    msg: string;
    data: ApiProduct[];
    total: number;
    currentPage: number;
}

export const useProducts = (initialPage: number = 1) => {
    const {productState} = useProductContext();
    const search = productState.search;
    
    const [products, setProducts] = useState<ProductList>([]);
    const [totalProduct, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(initialPage);

    const [paginationModel, setPaginationModel] = useState<PaginationModel>({
        page: initialPage - 1,
        pageSize: pageSize,
    });

    const { data, error, isLoading } = useFetchProducts(page,search);

    useEffect(() => {
        if(data){
            const adaptedProducts = data ? ProductListAdapter(data.data) : [];
            setProducts(adaptedProducts || []);
            setTotal(data?.total || 0);
        }
    }, [data]);

    const handlePaginationModelChange = (newPaginationModel: PaginationModel) => {
        setPaginationModel(newPaginationModel);
        const newPage = newPaginationModel.page + 1;
        setPage(newPage);
    };

    return {
        products,
        totalProduct,
        isLoading,
        error,
        paginationModel,
        handlePaginationModelChange,
    };
};

// Hook para obtener un producto específico
export const useFetchProduct = (productId: string) => {
    return useQuery<Product, Error>({
        queryKey: ['product', productId], // Clave de consulta
        queryFn: async () => {
            const response = await clientAxios.get<{ producto: ApiProduct }>(`${productUrl}${productId}/`);

            if (response.status !== 200) {
                throw new Error('Error al cargar el producto');
            }

            return ProductAdapter(response.data.producto); // Adaptamos y devolvemos el producto
        },
        enabled: !!productId, // Solo se ejecuta si productId está disponible
        // onError: (error) => {
        //     console.error(`Error fetching product: ${error}`);
        // },
    });
};

// Hook para crear un nuevo producto
export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation<Product, Error, Product>({
        mutationFn: async (newProduct) => {
            const product = {
                nombre: newProduct.name,
                idcategoria: newProduct.idCategory,
                idmarca: newProduct.idBrand,
                
            };

            const response = await clientAxios.post<{ message: string, producto: ApiProduct }>(productUrl, product);

            if (response.status !== 201) {
                throw new Error('Error al crear el producto');
            }

            return ProductAdapter(response.data.producto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error) => {
            console.error(`Error creating product: ${error}`);
        },
    });
};


// Hook para actualizar un producto existente
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation<Product, Error, Product>({
        mutationFn: async (updatedProduct) => {
            const product = {
                nombre: updatedProduct.name,
                idcategoria: updatedProduct.idCategory,
                idmarca: updatedProduct.idBrand,
            };

            const response = await clientAxios.put<{ message: string, data: ApiProduct }>(`${productUrl}${updatedProduct.id}/`, product);

            if (response.status !== 200) {
                throw new Error('Error al actualizar el producto');
            }

            return ProductAdapter(response.data.data); // Adaptamos y devolvemos el producto actualizado
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error) => {
            console.error(`Error updating product: ${error}`);
        },
    });
};

export const useFetchProducts = (page: number = 1, search: string) => {
    return useQuery<ApiResponse, Error>({
        queryKey: ['products', page, search],
        queryFn: async () => {
            const response = await clientAxios.get<ApiResponse>(`${productUrl}?page=${page}&search=${search}`);
            return response.data;
            
        },
        // staleTime: 60000, // 1 minuto
        // cacheTime: 300000, // 5 minutos
    });
};