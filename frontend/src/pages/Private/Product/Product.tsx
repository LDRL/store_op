import { useProductContext } from "@/context";
import { ProductTable } from "./components";

import { ProductModal, Header } from "./index";

import { CustomDialog } from "@/componets/CustomDialog";


export default function Productt(){
    const {sidebarState} = useProductContext();    
    return(
        <div>

            <CustomDialog>
                <ProductModal />
            </CustomDialog>

            <div>
                <h2>Listado de productos</h2>
                <hr />
            </div>

            <div className="" style={{marginBottom:"10px"}}>
                <Header />
            </div>
            

            <div style={{width:  sidebarState.state ? "84vw" : "92vw"}}>
                <ProductTable />
            </div>
        </div>

    )
}