import { ApiCategory, Category} from "../models";

export const CategoryAdapter = (category: ApiCategory): Category => {
    return{
        id: category.id_categoria_producto,
        name: category.nombre,
    }
}

export function CategoryListAdapter(apiCategoryList: ApiCategory[]): Category[] {
    return apiCategoryList.map(CategoryAdapter);
}
