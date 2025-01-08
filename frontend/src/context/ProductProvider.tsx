import { useState, useEffect, createContext, ReactNode, useContext } from "react";
import { clearLocalStorage, persistLocalStorage } from "../utils/localStorage.utility";
import { Category, CategoryState, EmptyCategoryState } from '@/pages/Private/Category';
import { Brand, BrandState, EmptyBrandState } from "@/pages/Private/Brand";
import { EmptyProductState, Product, ProductState } from '@/pages/Private/Product';
import { Order } from "@/pages/Private/Order";
import { EmptyOrderState, OrderState, Order as COrder } from "@/pages/Private/ClientOrder";
import { Client, ClientState, EmptyClientState } from "@/pages/Private/Client";
import { EmptyUserState, User, UserState } from "@/pages/Private/User";

interface SidebarInfo{
    state: boolean
}

const EmptySidebarState: SidebarInfo = {
    state: false
}

interface ProductCard {
    id: number;
    name: string;
    price: number;
    stock: number;
    photo_url: string;
    amount: number;
    subtotal: number;
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

    // shoping card
    count: number;
    cartProducts: ProductCard[];
    setCartProducts: React.Dispatch<React.SetStateAction<ProductCard[]>>;

    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;

    //client orders

    cOrderState: OrderState;
    showCOrder: (detail: COrder | null) => void;
    clearCOrder: () => void;
    setSearchCOrder: (search: string) => void;

    // Client
    clientState: ClientState;
    editClient: (client: Client | null) => void;
    clearClient: () => void;
    setSearchClient: (search: string) => void;

    // User
    userState: UserState;
    editUser: (client: User | null) => void;
    clearUser: () => void;
    setSearchUser: (search: string) => void;
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
    const [clientState, setClientState] = useState<ClientState>(EmptyClientState);
    const [userState, setUserState] = useState<UserState>(EmptyUserState);



    const [count, setCount] = useState(0);
    const [total, setTotal] = useState<number>(0);

    const [cOrderState, setCOrderState] = useState<OrderState>(EmptyOrderState);

    const calculateTotal = (updatedRows: ProductCard[]) => {
        const newTotal = updatedRows.reduce((acc, row) => acc + (row.subtotal ?? 0), 0);
        setTotal(newTotal);
    };

 

    const [cartProducts, setCartProducts] = useState<ProductCard[]>(()=>{
        const saveState = localStorage.getItem('cartProducts');
        const newSaveState = saveState ? JSON.parse(saveState): [];
        calculateTotal(newSaveState)
        return newSaveState;
    });

    // Shooping cart - Order
    const [order, setOrder] = useState([]);


    useEffect(() => {
        persistLocalStorage<SidebarInfo>(sidebarKey, sidebarState);
    },[sidebarState])


    // useEffect(() => {
    //     setCount(cartProducts.length); // Actualiza el contador cuando cambian los productos en el carrito
    // }, [cartProducts]);

    useEffect(() => {
        setCount(cartProducts.length);
        calculateTotal(cartProducts);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }, [cartProducts]);

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

    // : Order | null
    const showCOrder = (product: COrder | null) => {
        setCOrderState(prevState => ({
            ...prevState,
            currentOrder: product,
        }));
    };

    
    const clearCOrder = () => {
        setCOrderState(prevState => ({
            ...prevState,
            currentProduct: null,
        }));
    };
    
    const setSearchCOrder = (search: string) => {
        setCOrderState(prevState => ({
            ...prevState,
            search,
        }));
    };


    const editClient = (client: Client | null) => {
        setClientState(prevState => ({
            ...prevState,
            currentClient: client,
        }));
    };
    
    const clearClient = () => {
        setClientState(prevState => ({
            ...prevState,
            currentClient: null,
        }));
    };
    
    const setSearchClient = (search: string) => {
        setClientState(prevState => ({
            ...prevState,
            search,
        }));
    };


    const editUser = (user: User | null) => {
        setUserState(prevState => ({
            ...prevState,
            currentUser: user,
        }));
    };
    
    const clearUser = () => {
        setUserState(prevState => ({
            ...prevState,
            setUserState: null,
        }));
    };
    
    const setSearchUser = (search: string) => {
        setUserState(prevState => ({
            ...prevState,
            search,
        }));
    };


    return (
        <ProductContext.Provider value={{ sidebarState, createSidebar, updateSidebar, resetSidebar,
            categoryState,editCategory,clearCategory,setSearchCategory,
            brandState,editBrand,clearBrand,setSearchBrand,
            productState, editProduct, clearProduct, setSearchProduct,
            count, cartProducts, setCartProducts,
            total, 
            cOrderState, setTotal, showCOrder,clearCOrder,setSearchCOrder,
            clientState, editClient,clearClient,setSearchClient,
            userState, editUser,clearUser,setSearchUser
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