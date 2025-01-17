import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Outlet, useNavigate } from 'react-router-dom';
import { LinksArray } from '../../utils/dataEstatica';
import { useState } from 'react';
import  { useProductContext } from '../../context/ProductProvider';
import { Menu, MenuItem } from '@mui/material';

import MoreIcon from '@mui/icons-material/MoreVert';
import { AccountCircle } from '@mui/icons-material';
import { PublicRoutes } from '@/utils/routes';


interface User{
  nombre: string;
  correo_electronico: string;
  id_usuario: number;
  id_rol:number;
}

interface SidebarProps{
  user: User
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function SideBar({user}: SidebarProps) {

  ///Estados del sidebar
  const theme = useTheme();
  const {sidebarState,updateSidebar} = useProductContext();

  const navigate = useNavigate();
  
  //// Estados para el dropdown del user
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  ///// Filtrar por roles
  const getFilteredLinks = () => {
      return LinksArray.filter(permiso => permiso.role.includes(user.id_rol));
  };

  const showSidebar = () =>{
    updateSidebar({state: !sidebarState.state});
  }

  const handleDrawerClose = () => {
    updateSidebar({state: !sidebarState.state});
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logout = () =>{
    localStorage.removeItem('cartProducts')
    localStorage.removeItem('AUTH_TOKEN')
    navigate(`${PublicRoutes.LOGIN}`, {replace:true})
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={logout}>cerrar sesión</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    
    <Box>
      <CssBaseline />
      <AppBar position="fixed" open={sidebarState.state} >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={showSidebar}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              sidebarState.state && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMenu}
      {renderMobileMenu}
      <Drawer variant="permanent" open={sidebarState.state}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            {getFilteredLinks().map(({icon, label, to}, index) => (
                <ListItem key={index} disablePadding sx={{display: "block"}} onClick={()=>{navigate(to)}}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: sidebarState.state ? 'initial': 'center',
                            px:2.5
                        }} 
                    >
                        <ListItemIcon
                        sx={{
                            minHeight: 0,
                            mr: sidebarState.state ? 3: 'auto',
                            justifyContent: 'center'
                        }}>
                            {icon}
                        </ListItemIcon>
                        <ListItemText primary={label} sx={{opacity: sidebarState.state ? 1: 0}} />
                        
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
      
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, paddingTop: 7, paddingX:10}}>
      {/* sx={{ flexGrow: 1, paddingTop: 7, paddingX:3  }} */}
        <Outlet />
      </Box>
    </Box>
  );
}
