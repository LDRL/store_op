
import { Navigate,  } from "react-router-dom";

import { PublicRoutes } from "../utils/routes";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import SideBar from "../componets/SideBar/SideBar";
import { useAuth } from "@/hooks/useAuth";

export const AuthGuard = () => {
    // const {auth, loading} = useContext(AuthContext);

    const { data, isError, isLoading } = useAuth()
    if(isLoading) return 'Cargando...'

    if(isError) {
        console.log(isError, "eror--")
        return  <Navigate replace to = {PublicRoutes.LOGIN} />
    }

   if(data)  return (
        <div>
            <SideBar />

            {/* <div className={styles.custom_flex_min_h}>
                <Header /> 
                <main className={styles.custom_padding_flex}>
                    <Outlet />
                </main>
            </div> */}
        </div>
    )
}

export default AuthGuard;