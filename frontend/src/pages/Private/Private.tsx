import { Navigate, Route } from 'react-router-dom'
import { PrivateRoutes } from '../../utils/routes'
import RoutersWitNotFound from '../../utils/routers-with-not-found.utility'
// import { RoutesWithNotFound } from '@/utils';
import React, { lazy, useContext, useEffect } from 'react'
import { CategoryCreate } from './Category'
import { BrandCreate } from './Brand'
import { ProductCreate } from './Product'
import { Checkout } from './Buy'
import AuthContext from '@/context/AuthProvider'
import { useAuth } from '@/hooks/useAuth'
import { COrderShow } from './ClientOrder'
import { OrderShow } from './Order'
import { ClientCreate } from './Client'
import { UserCreate } from './User'
// import { ClientCreate } from './Client/components/ClientCreate'
// import Order from './Order/Order';



const Dashboard = lazy(() => import('./Dashboard/Dashboard'))
const Category = lazy(()=> import('../Private/Category/Category'))
const Brand = lazy(() => import('../Private/Brand/Brand'))
const Product = lazy(()=> import('../Private/Product/Product'))
const Order = lazy(() => import('../Private/Order/Order'))
const Client = lazy(() => import('../Private/Client/Client'))

const User = lazy(() => import('../Private/User/User'))



const Buy = lazy(() => import('../Private/Buy/Buy'))
const ClientOrder = lazy(() => import('../Private/ClientOrder/ClientOrder'))



function Private() {
  const { data: user, isLoading: authLoading } = useAuth()
  console.log(user, "--iniicio private")


  let routes = (
    <>
      {user?.id_rol !== 3 && (
        <>
         <Route path="/" element={<Navigate to={PrivateRoutes.PRODUCT} />} />
         <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />

          <Route path={PrivateRoutes.CATEGORY} element={<Category />} />
          <Route path={PrivateRoutes.CATEGORY_CREATE} element={<CategoryCreate />} />
          <Route path={PrivateRoutes.CATEGORY_EDIT} element={<CategoryCreate />} />
          
          <Route path={PrivateRoutes.BRAND} element={<Brand />} />
          <Route path={PrivateRoutes.BRAND_CREATE} element={<BrandCreate />} />
          <Route path={PrivateRoutes.BRAND_EDIT} element={<BrandCreate />} />
          
          <Route path={PrivateRoutes.PRODUCT} element={<Product />} />
          <Route path={PrivateRoutes.PRODUCT_CREATE} element={<ProductCreate />} />
          <Route path={PrivateRoutes.PRODUCT_EDIT} element={<ProductCreate />} />

          <Route path={PrivateRoutes.SALE} element={<Order />} />
          <Route path={PrivateRoutes.SALE_SHOW} element={<OrderShow />} />


          <Route path={PrivateRoutes.CLIENT} element={<Client />} />
          <Route path={PrivateRoutes.CLIENT_CREATE} element={<ClientCreate />} />
          <Route path={PrivateRoutes.CLIENT_EDIT} element={<ClientCreate />} />

          <Route path={PrivateRoutes.USER} element={<User />} />
          <Route path={PrivateRoutes.USER_CREATE} element={<UserCreate />} />
          <Route path={PrivateRoutes.USER_EDIT} element={<UserCreate />} />
        </>
      )}
    </>
  );

  let routes_client = (
    <>
      {user?.id_rol === 3 && (
        
        <>
        <Route path="/" element={<Navigate to={PrivateRoutes.BUY} />} />
        <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
        <Route path={PrivateRoutes.BUY} element={<Buy />} />
        <Route path={PrivateRoutes.BUY_CHECKOUT} element={<Checkout />} />
        <Route path={PrivateRoutes.BUY_ORDER} element={<ClientOrder />} />
    
        <Route path={PrivateRoutes.BUY_ORDER_SHOW} element={<COrderShow />} />
        </>
      )}
    </>
  )
  return (
    <RoutersWitNotFound>
        
    {routes} 
    {routes_client}
    

        
    </RoutersWitNotFound>
    
  )
}

export default Private