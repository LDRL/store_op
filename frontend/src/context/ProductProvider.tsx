import { useState, useEffect, createContext, ReactNode, useReducer, useContext } from "react";
import { clearLocalStorage, persistLocalStorage } from "../utils/localStorage.utility";
import { Category, CategoryState, EmptyCategoryState } from '@/pages/Private/Category';
import { Brand, BrandState, EmptyBrandState } from "@/pages/Private/Brand";
// import { editCategory, clearCategory } from '@/redux/categorySlice';
import { EmptyProductState, Product, ProductState } from '@/pages/Private/Product';


interface SidebarInfo{
    state: boolean
}

const EmptySidebarState: SidebarInfo = {
    state: false
}

export const sidebarKey = 'sidebar'

interface ContextProps {
    sidebarState: SidebarInfo;
    createSidebar: (state: SidebarInfo) => void;
    updateSidebar: (state: SidebarInfo) => void;
    resetSidebar: () => void;
    categoryState: CategoryState;
    editCategory: (category: Category | null) => void;
    clearCategory: () => void;
    setSearchCategory: (search: string) => void;

    brandState: BrandState;
    editBrand: (category: Category | null) => void;
    clearBrand: () => void;
    setSearchBrand: (search: string) => void;

    productState: ProductState;
    editProduct: (category: Product | null) => void;
    clearProduct: () => void;
    setSearchProduct: (search: string) => void;
}




// const ProductContext = createContext<ContextType>({
//     sidebarState: EmptySidebarState,
//     createSidebar: () => {},
//     updateSidebar: () => {},
//     resetSidebar:() => {},

// });

const ProductContext = createContext<ContextProps | undefined>(undefined);

interface ProviderProps {
    children: ReactNode;
}

const ProductProvider = ({children}: ProviderProps) => {
    const [sidebarState, setSidebarState] = useState<SidebarInfo>(()=>{
        const saveState = localStorage.getItem(sidebarKey);
        return saveState ? JSON.parse(saveState): EmptySidebarState;
    });

    const [categoryState, setCategoryState] = useState<CategoryState>(EmptyCategoryState);
    const [brandState, setBrandState] = useState<BrandState>(EmptyBrandState);
    const [productState, setProductState] = useState<ProductState>(EmptyProductState);


    useEffect(() => {
        persistLocalStorage<SidebarInfo>(sidebarKey, sidebarState);
    },[sidebarState])

    const createSidebar = (sidebarInfo: SidebarInfo)=>{
        setSidebarState(sidebarInfo);  
    }

    const updateSidebar = (sidebarInfo: SidebarInfo)=>{
        setSidebarState((prevState) => ({...prevState, ...sidebarInfo}))
    }

    const resetSidebar = () => {
        clearLocalStorage(sidebarKey);
        setSidebarState(EmptySidebarState);
    }


    const editCategory = (category: Category | null) => {
        setCategoryState(prevState => ({
            ...prevState,
            currentCategory: category,
        }));
    };
    
    const clearCategory = () => {
        setCategoryState(prevState => ({
            ...prevState,
            currentCategory: null,
        }));
    };
    
    const setSearchCategory = (search: string) => {
        setCategoryState(prevState => ({
            ...prevState,
            search,
        }));
    };

    const editBrand = (brand: Brand | null) => {
        setBrandState(prevState => ({
            ...prevState,
            currentBrand: brand,
        }));
    };
    
    const clearBrand = () => {
        setBrandState(prevState => ({
            ...prevState,
            currentBrand: null,
        }));
    };
    
    const setSearchBrand = (search: string) => {
        setBrandState(prevState => ({
            ...prevState,
            search,
        }));
    };

    const editProduct = (product: Product | null) => {
        setProductState(prevState => ({
            ...prevState,
            currentProduct: product,
        }));
    };
    
    const clearProduct = () => {
        setProductState(prevState => ({
            ...prevState,
            currentProduct: null,
        }));
    };
    
    const setSearchProduct = (search: string) => {
        setProductState(prevState => ({
            ...prevState,
            search,
        }));
    };


    return (
        <ProductContext.Provider value={{ sidebarState, createSidebar, updateSidebar, resetSidebar,
            categoryState,editCategory,clearCategory,setSearchCategory,
            brandState,editBrand,clearBrand,setSearchBrand,
            productState, editProduct, clearProduct, setSearchProduct
        }}>
            {children}
        </ProductContext.Provider>
    );
}

export { ProductProvider };
export default ProductContext;


export const useProductContext = (): ContextProps => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("ha ocurrido un error");
    }
    return context;
};