import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
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

export default function SideBar() {
  const theme = useTheme();
  const {sidebarState, createSidebar,updateSidebar} = useProductContext();

  const [subnav, setSubnav] = useState(false);

  const navigate = useNavigate();

  const showSidebar = () =>{
    updateSidebar({state: !sidebarState.state});
    if(sidebarState.state){
      setSubnav(false);
    }
  }

  const showSubnav = () => {
    if (!subnav && sidebarState.state) {
      console.log("texto - p");
    } else {
      createSidebar({state: !sidebarState.state});
    }
    setSubnav(prevSubnav => !prevSubnav);
  };

  

  const handleDrawerClose = () => {
    updateSidebar({state: !sidebarState.state});
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={sidebarState.state}>
        <Toolbar>
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
          <Typography variant="h6" noWrap component="div">
            
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={sidebarState.state}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            {LinksArray.map(({icon, label, to}, index) => (
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
      <Box component="main" sx={{ flexGrow: 1, paddingTop: 7, paddingX:3  }}>
        <Outlet />
      </Box>
    </Box>
  );
}
