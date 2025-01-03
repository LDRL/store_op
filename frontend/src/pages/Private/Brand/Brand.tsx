import { useProductContext } from "@/context";
import { BrandTable } from "./components";
import { Header } from "./components/Header";

export default function Brand(){
    const {sidebarState} = useProductContext();
    
    return(
        <div>

            {/* <CustomDialog>
                <ProductModal />
            </CustomDialog> */}

            <div>
                <h2>Listado de marcas</h2>
                <hr />
            </div>

            <div className="" style={{marginBottom:"10px", marginTop:"10px", marginRight: "20px"}}>
                <Header /> 
            </div>
            
            {/* 94 */}
            <div style={{width:  sidebarState.state ? "86vw" : "94vw"}}>
                <BrandTable />
            </div>
        </div>

    )
}