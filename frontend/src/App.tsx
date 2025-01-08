
import React, { lazy, Suspense } from 'react';
import './App.css'
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import RoutersWitNotFound from './utils/routers-with-not-found.utility';
import { PrivateRoutes, PublicRoutes } from './utils/routes';
import AuthGuard from './guards/auth.guard';
import {AuthProvider} from './context/AuthProvider';
import { ProductProvider } from './context/ProductProvider';
import { ToastContainer } from 'react-toastify'



const Login = lazy(() => import('./pages/public/Login/Login'))
const Private = lazy(() => import('./pages/Private/Private'))


function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Suspense fallback={<>Cargando</>}>
      <AuthProvider>
        <ProductProvider>
          <BrowserRouter>
            <RoutersWitNotFound>
              <Route path="/" element={<Navigate to ={PrivateRoutes.PRIVATE} />} />
              <Route path="*" element={<>Not found</>}/>
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route element={<AuthGuard />}>
                <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
              </Route>
            </RoutersWitNotFound>
          </BrowserRouter>
        </ProductProvider>

        <ToastContainer 
         pauseOnHover={false}
         pauseOnFocusLoss={false}/>
      </AuthProvider>
      </Suspense>

    </React.Fragment>
  );
  
}

export default App
