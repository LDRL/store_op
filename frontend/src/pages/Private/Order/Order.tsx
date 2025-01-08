import { useProductContext } from "@/context";
import { OrderTable } from "./components";
import { Header } from "./components/Header";

export default function Order(){
    const {sidebarState} = useProductContext();
    
    return(
        <div>
            <div>
                <h2>Listado de pedidos</h2>
                <hr />
            </div>

            <div className="" style={{marginBottom:"10px", marginTop:"10px", marginRight: "20px"}}>
                <Header /> 
            </div>
            
            <div style={{width:  sidebarState.state ? "86vw" : "94vw"}}>
                <OrderTable />
            </div>
        </div>

    )
}