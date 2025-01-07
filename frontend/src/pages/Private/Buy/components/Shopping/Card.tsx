import React, { useEffect, useState } from 'react';
import { Box, Button, Grid2, IconButton, TextField, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useProductContext } from '@/context'; // Asegúrate de que el contexto esté importado

interface CardProps {
    id: number;
    name: string;
    price: number;
    stock: number;
    photo_url: string;
    children?: React.ReactNode;
}

function Card({ id, name, price, stock, photo_url }: CardProps) {
    const { cartProducts, setCartProducts } = useProductContext(); // Obtenemos el estado y el setter del carrito
    const [selectedQuantity, setSelectedQuantity] = useState<{ [key: number]: number }>({});
    const [isAddingToCart, setIsAddingToCart] = useState<{ [key: number]: boolean }>({}); // Para saber si estamos agregando el producto al carrito

    const isOutOfStock = stock === 0;
    const quantity = selectedQuantity[id] || 0; // Si no hay cantidad seleccionada, se asigna 0

    useEffect(() => {
        // Verificar si el producto está en localStorage y obtener la cantidad
        const savedProduct = localStorage.getItem('cartProducts');
        console.log(savedProduct)
        if (savedProduct) {
            const parsedProducts = JSON.parse(savedProduct);
            const productInCart = parsedProducts.find((product: { id: number }) => product.id === id);
            if (productInCart) {
                // Si el producto está en el carrito, actualizar la cantidad
                setSelectedQuantity((prev) => ({
                    ...prev,
                    [id]: productInCart.cantidad, // Se coloca la cantidad almacenada
                }));
                setIsAddingToCart((prev) => ({
                    ...prev,
                    [id]: true, // Si está en localStorage, significa que ya está en el carrito
                }));
            }
        }
    }, [id]);

    const handleIncrease = (productId: number) => {
        setSelectedQuantity((prev) => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }));

        setCartProducts((prev) =>
            prev.map((product) =>
                product.id === productId
                    ? {
                        ...product,
                        cantidad: product.cantidad + 1,
                        sub_total: (product.cantidad + 1) * product.price,
                    }
                    : product
            )
        );
    };

    const handleDecrease = (productId: number) => {
        setSelectedQuantity((prev) => {
            const newQuantity = Math.max(0, (prev[productId] || 0) - 1);
            return {
                ...prev,
                [productId]: newQuantity,
            };
        });

        setCartProducts((prev) => {
            const updatedCart = prev
                .map((product) =>
                    product.id === productId
                        ? {
                            ...product,
                            cantidad: Math.max(0, product.cantidad - 1),
                            sub_total: Math.max(0, (product.cantidad - 1)) * product.price,
                        }
                        : product
                )
                .filter((product) => product.cantidad > 0); // Filtramos productos con cantidad > 0

            console.log(updatedCart, "----")

            const filterProductoId = updatedCart.filter((product) => product.id === productId)
            console.log(filterProductoId);

            
            if(filterProductoId.length ===0)
            {
                setIsAddingToCart((prev) => ({
                    ...prev,
                    [productId]: false, // Esto hace que el botón "Agregar al carrito" se muestre nuevamente
                }));
            }
            
               
            return updatedCart;
        });

        
        // setIsAddingToCart((prev) => ({
        //     ...prev,
        //     [productId]: false, // Esto hace que el botón "Agregar al carrito" se muestre nuevamente
        // }));

        
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, productId: number) => {
        const value = Math.max(0, Number(event.target.value));
        setSelectedQuantity((prev) => ({
            ...prev,
            [productId]: value,
        }));

        // cuando el valor tiene a cer 0
        console.log(value, '---')
        if (value === 0) {
            setIsAddingToCart((prev) => ({
                ...prev,
                [productId]: false, // Esto hará que el botón "Agregar al carrito" se muestre nuevamente
            }));
        }

        // Actualizamos el carrito y el subtotal cuando el usuario cambia la cantidad manualmente
        setCartProducts((prev) => {
            const updatedCart = prev
                .map((product) =>
                    product.id === productId
                        ? {
                            ...product,
                            cantidad: value,
                            sub_total: value * product.price,
                        }
                        : product
                )
                .filter((product) => product.cantidad > 0); // Filtramos productos con cantidad > 0
            return updatedCart;
        });
    };

    const handleAddToCart = (productId: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation(); // Evita que el clic pase al Link

        // Si no se ha especificado una cantidad, se establece en 1
        if (!selectedQuantity[productId] || selectedQuantity[productId] === 0) {
            setSelectedQuantity((prev) => ({
                ...prev,
                [productId]: 1,
            }));
        }

        // Actualizamos el estado del carrito
        const existingProduct = cartProducts.find((product) => product.id === productId);

        if (existingProduct) {
            // Si el producto ya está en el carrito, actualizamos la cantidad y el subtotal
            setCartProducts((prev) =>
                prev.map((product) =>
                    product.id === productId
                        ? {
                            ...product,
                            cantidad: product.cantidad + selectedQuantity[productId],
                            sub_total: (product.cantidad + selectedQuantity[productId]) * product.price,
                        }
                        : product
                )
            );
        } else {
            // Si el producto no está en el carrito, lo agregamos
            setCartProducts((prev) => [
                ...prev,
                {
                    id: productId,
                    name,
                    price,
                    stock: 0,
                    photo_url,
                    cantidad: selectedQuantity[productId] || 1, // Se asegura de que la cantidad no sea cero
                    sub_total: (selectedQuantity[productId] || 1) * price, // Se calcula el subtotal
                },
            ]);
        }


        // interface ProductCard {
        //     id: number;
        //     name: string;
        //     price: number;
        //     stock: number;
        //     photo_url: string;
        //     cantidad: number;
        //     sub_total: number;
        // }

        // Establecemos que estamos agregando al carrito
        setIsAddingToCart((prev) => ({
            ...prev,
            [productId]: true,
        }));
    };

    return (
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={id}>
            <Box
                sx={{
                    height: '322px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s ease',
                    '&:hover': {
                        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.2)',
                    },
                }}
            >
                <Box
                    sx={{
                        height: '200px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <img
                        srcSet={`${photo_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${photo_url}?w=248&fit=crop&auto=format`}
                        alt={name}
                        loading="lazy"
                        style={{
                            height: '100%',
                        }}
                    />
                </Box>

                <Box sx={{ padding: '8px', flexGrow: 1 }}>
                    <Box sx={{ paddingX: '8px' }}>
                        <Typography>{name}</Typography>
                        <Typography>Precio: Q{price}</Typography>
                        <Typography>Stock: {stock}</Typography>
                    </Box>

                    {isOutOfStock ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{
                                marginTop: '10px',
                                width: '100%',
                                backgroundColor: '#B0BEC5', // Color gris si no hay stock
                                cursor: 'not-allowed', // Cursor deshabilitado
                            }}
                            disabled
                        >
                            Sin stock
                        </Button>
                    ) : (
                        isAddingToCart[id] ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: '10px',
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <IconButton
                                    onClick={() => handleDecrease(id)}
                                    disabled={quantity === 0}
                                >
                                    <Remove />
                                </IconButton>
                                <TextField
                                    value={quantity}
                                    onChange={(e) => handleQuantityChange(e, id)}
                                    type="number"
                                    inputProps={{
                                        min: 0,
                                        style: { textAlign: 'center' },
                                    }}
                                    sx={{ width: '60px' }}
                                />
                                <IconButton onClick={() => handleIncrease(id)}>
                                    <Add />
                                </IconButton>
                            </Box>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={(e) => handleAddToCart(id, e)}
                                sx={{
                                    marginTop: '10px',
                                    width: '100%',
                                }}
                            >
                                Agregar al carrito
                            </Button>
                        )
                    )}
                </Box>
            </Box>
        </Grid2>
    );
}

export default Card;
