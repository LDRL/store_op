import { Navigate, Route } from 'react-router-dom'
import { PrivateRoutes } from '../../utils/routes'
import RoutersWitNotFound from '../../utils/routers-with-not-found.utility'
// import { RoutesWithNotFound } from '@/utils';
import React, { lazy } from 'react'
import { CategoryCreate } from './Category'
import { BrandCreate } from './Brand'
import { ProductCreate } from './Product'
import { Checkout } from './Buy'



const Dashboard = lazy(() => import('./Dashboard/Dashboard'))
const Category = lazy(()=> import('../Private/Category/Category'))
const Brand = lazy(() => import('../Private/Brand/Brand'))
const Product = lazy(()=> import('../Private/Product/Product'))

const Buy = lazy(() => import('../Private/Buy/Buy'))


function Private() {
  return (
    <RoutersWitNotFound>
        <Route path = "/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
        <Route path ={PrivateRoutes.DASHBOARD} element={<Dashboard />} />

        <Route path = {PrivateRoutes.CATEGORY} element={<Category />} />
        <Route path = {PrivateRoutes.CATEGORY_CREATE} element={<CategoryCreate />} />
        <Route path = {PrivateRoutes.CATEGORY_EDIT} element={<CategoryCreate />} />


        <Route path = {PrivateRoutes.BRAND} element={<Brand />} />
        <Route path = {PrivateRoutes.BRAND_CREATE} element={<BrandCreate />} />
        <Route path = {PrivateRoutes.BRAND_EDIT} element={<BrandCreate />} />

        <Route path = {PrivateRoutes.PRODUCT} element={<Product />} />
        <Route path = {PrivateRoutes.PRODUCT_CREATE} element={<ProductCreate />} />
        <Route path = {PrivateRoutes.PRODUCT_EDIT} element={<ProductCreate />} />
      
        {/* Buy */}

        <Route path = {PrivateRoutes.BUY} element={<Buy />} />
        <Route path = {PrivateRoutes.BUY_CHECKOUT} element={<Checkout />} />
        
    </RoutersWitNotFound>
    
  )
}

export default Private