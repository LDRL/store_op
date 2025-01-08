import { useProductContext } from "@/context";
import { UserTable } from "./components";
import { Header } from "./components/Header";

export default function User(){
    const {sidebarState} = useProductContext();
    
    return(
        <div>
            <div>
                <h2>Listado de clientes</h2>
                <hr />
            </div>

            <div className="" style={{marginBottom:"10px", marginTop:"10px", marginRight: "20px"}}>
                <Header /> 
            </div>
            
            {/* 94 */}
            <div style={{width:  sidebarState.state ? "86vw" : "94vw"}}>
                <UserTable />
            </div>
        </div>

    )
}