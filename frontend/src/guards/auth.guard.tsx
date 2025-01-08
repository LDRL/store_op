
import { Navigate,  } from "react-router-dom";

import { PublicRoutes } from "../utils/routes";

import SideBar from "../componets/SideBar/SideBar";
import { useAuth } from "@/hooks/useAuth";

export const AuthGuard = () => {

    const { data, isError, isLoading } = useAuth()


    if(isLoading) return 'Cargando...'

    if(isError) {
        console.log(isError, "eror--")
        return  <Navigate replace to = {PublicRoutes.LOGIN} />
    }

   if(data)  {
    return (
    
        <div>
            <SideBar
            user={data}
            />
        </div>
    )}

    return null;
}

export default AuthGuard;