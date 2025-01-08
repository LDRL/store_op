import { useProductContext } from "@/context";
import { Box, Button, Grid2, ImageListItemBar, Stack } from "@mui/material";
import { useProducts } from "../Product/hooks/useProductOption";
import { Link } from "react-router-dom";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { CustomDialog, dialogOpenSubject$ } from "@/componets/CustomDialog";
import Modal from "./components/Shopping/Modal";
import Card from "./components/Shopping/Card";
export default function Buy() {
  const {
    products,
    totalProduct,
    isLoading,
    paginationModel,
    handlePaginationModelChange,
  } = useProducts();
  const { sidebarState, cartProducts } = useProductContext();

  const handleClick = () => {
    dialogOpenSubject$.setSubject = true;
  };

  return (
    <div>
      <CustomDialog>
        <Modal/>
      </CustomDialog>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <div>
        <h2>Compra</h2>

        </div>
        <Stack direction="row" spacing={2} sx={{padding:'20px'}}>
          <Button variant="outlined" 
          sx={{
            color: 'inherit',
            borderRadius: '50%',
            borderColor: 'inherit',
            minWidth: '40px', 
            height: '40px',   
            display: 'flex',  
            justifyContent: 'center', 
            alignItems: 'center',     
            padding: 0, 
          }}
          onClick={handleClick}
          >
            <ShoppingCartIcon /> 
            

          </Button>
          {cartProducts.length}
          
          <Button variant="outlined"
          sx={{
            color: 'inherit',
            borderRadius: '50%',
            borderColor: 'inherit',
            minWidth: '40px', 
            height: '40px', 
            display: 'flex',  
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: 0,
          }}
          >
          <SearchIcon sx={{fontSize:24}} />
          </Button>
        </Stack>
      </div>

      <hr />

      <div className="" style={{ marginBottom: "10px" }}>
        {/* <Header /> */}
      </div>

      <div style={{ width: sidebarState.state ? "84vw" : "92vw" }}>
        <Box
          sx={{
            flexGrow: 1,
            paddingX: "15px",
            marginX: "auto",
            width: {
                xs: "100%",   // Para pantallas pequeñas (menos de 768px), ancho completo
                sm: "750px",  // Para pantallas medianas (min-width: 768px), 750px
                md: "970px",  // Para pantallas grandes (min-width: 992px), 970px
                lg: "1170px", // Para pantallas extra grandes (min-width: 1200px), 1170px
              },
          }}
        >
          <Grid2 container spacing={4}>
            {products.map((item, index) => (
              <Card 
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                stock={item.stock}
                photo_url={item.photo_url}
              />
            ))}
          </Grid2>
        </Box>
      </div>
    </div>
  );
}
