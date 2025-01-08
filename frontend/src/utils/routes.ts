export const PublicRoutes = {
    LOGIN: 'login'
}

export const PrivateRoutes = {
    PRIVATE: 'private',
    DASHBOARD: 'dashboard',
    HOME: 'home',
    PRODUCT: 'product',
    PRODUCT_CREATE: 'product/create',
    PRODUCT_EDIT: 'product/:id/editar',
    CATEGORY: 'category',
    CATEGORY_CREATE: 'category/create',
    CATEGORY_EDIT: 'category/:id/editar',
    BRAND: 'brand',
    BRAND_CREATE: 'brand/create',
    BRAND_EDIT: 'brand/:id/editar',
    PRESENTATION: 'presentation',
    PRESENTATION_CREATE: 'presentation/create',
    PRESENTATION_EDIT: 'presentation/:id/editar',
    BUY: 'buy',
    BUY_CREATE: 'buy/create',
    BUY_CHECKOUT:'buy/checkout',
    BUY_ORDER:'client/order',
    BUY_ORDER_SHOW:'client/order/:id/show',

    SALE: 'sale',
    SALE_SHOW: 'sale/:id/show',


    CLIENT: 'client',
    CLIENT_CREATE: 'client/create',
    CLIENT_EDIT: 'client/:id/editar',


    USER: 'user',
    USER_CREATE: 'user/create',
    USER_EDIT: 'user/:id/editar',

}