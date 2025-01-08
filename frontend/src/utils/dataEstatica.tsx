import HomeIcon from '@mui/icons-material/Home';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CategoryIcon from '@mui/icons-material/Category';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import StoreIcon from '@mui/icons-material/Store';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';

export const DesplegableUser = [
  {
    text: "Mi perfil",
    icono: "",
    tipo: "miperfil",
  },
  {
    text: "Configuracion",
    icono: "",
    tipo: "configuracion",
  },
  {
    text: "Cerrar sesión",
    icono: "",
    tipo: "cerrarsesion",
  },
];



//data SIDEBAR
export const LinksArray = [
  // {
  //   label: "Home",
  //   icon: <HomeIcon />,
  //   to: "#",
  //   path:"",
  //   iconOpened:"",
  //   iconClosed:"",
  //   subNav: [
  //     {
  //         title: "Productos",
  //         path: "/private/product",
  //         // icon: <IoIcons.IoIosPaper />,
  //     },
  //     {
  //         title: "nuevo producto",
  //         path: "/productos/crear-producto",
  //         // icon: <IoIcons.IoIosPaper />,
  //     },
  //   ],
  // },
  {
    label: "Home",
    icon: <HomeIcon />,
    to: "/private/dashboard",
    path: "/private/dashboard",
    role: [1,2,3]
  },
  {
    label: "Producto",
    icon: <ProductionQuantityLimitsIcon />,
    to: "/private/product",
    path: "/private/product",
    role: [1,2]
  },
  {
    label: "Categorias",
    icon: <CategoryIcon />,
    to: "/private/category",
    path: "/private/category",
    role: [1,2]
  },
  {
    label: "Marcas",
    icon: <ProductionQuantityLimitsIcon />,
    to: "/private/brand",
    path: "/private/brand",
    role: [1,2]
  },
  {
    label: "Presentaciones",
    icon: <ProductionQuantityLimitsIcon />,
    to: "/private/presentation",
    path: "/private/presentation",
    role: [1,2]
  },
  {
    label: "Ventas",
    icon: <PointOfSaleIcon />,
    to: "/private/sale",
    path: "/private/sale",
    role: [1,2]
  },
  {
    label: "Compras",
    icon: <ShoppingBagIcon />,
    to: "/private/buy",
    path: "/private/buy",
    role: [3]
  },
  {
    label: "Pedidos",
    icon: <StoreIcon />,
    to: "/private/client/order",
    path: "/private/client/order",
    role: [3]
  },

  {
    label: "Clientes",
    icon: <ManageAccountsIcon />,
    to: "/private/client",
    path: "/private/client",
    role: [1,2]
  },

  {
    label: "Usuarios",
    icon: <PersonIcon />,
    to: "/private/user",
    path: "/private/user",
    role: [1,2]
  },

  {
    label: "Reportes",
    icon: <SummarizeIcon/>,
    to: "/reportes",
    role: [1,2]
  },
 
];
export const SecondarylinksArray = [
  {
    label: "Configuración",
    icon: "",
    to: "/configurar",
    role: [1,2,3]
  },

];
