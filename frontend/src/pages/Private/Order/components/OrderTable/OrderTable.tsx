import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Order } from '../../models';
import TableMovil from '../TableMovil/TableMovil';
import { useProductContext } from '@/context';
import Loading from '@/componets/Loading';
import { totalPagesMovile } from '@/utils';
import { useOrder } from '../../hooks/useOrder';

const ListOfCategories: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { showCOrder } = useProductContext();

    const {
        orders,
        totalOrder,
        isLoading,
        paginationModel,
        handlePaginationModelChange,
    } = useOrder();
    console.log(orders, "--")

    const handleShow = (order: Order) => {
        showCOrder(order);
        navigate(`${order.id}/show`);
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Codigo',
            sortable:false,
            flex: 1,
            minWidth: 150,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => (
                <div style={{ display: isMobile ? 'block' : 'inline' }}>{params.value}</div>
            ),
        },
        {
            field: 'name',
            headerName: 'Nombre',
            sortable:false,
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => (
                <div style={{ display: isMobile ? 'block' : 'inline' }}>{params.value}</div>
            ),
        },
        {
            field: 'address',
            headerName: 'Dirección',
            sortable:false,
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => (
                <div style={{ display: isMobile ? 'block' : 'inline' }}>{params.value}</div>
            ),
        },
        {
            field: 'deliveryDate',
            headerName: 'Fecha de entrega',
            sortable:false,
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => (
                <div style={{ display: isMobile ? 'block' : 'inline' }}>{params.value}</div>
            ),
        },
        {
            field: 'totalOrder',
            headerName: 'Total',
            sortable:false,
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => (
                <div style={{ display: isMobile ? 'block' : 'inline' }}>{`Q ${params.value}`}</div>
            ),
        },
        {
            field: 'status',
            headerName: 'Estado',
            sortable:false,
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => (
                <div style={{ display: isMobile ? 'block' : 'inline' }}>{params.value}</div>
            ),
        },
        {
            field: 'actions',
            type: 'actions',
            sortable: false,
            headerName: 'Actions',
            width: 200,
            renderCell: (params: GridRenderCellParams) => (
                <Button
                    variant="contained"
                    color="info"
                    onClick={() => handleShow(params.row as Order)}
                >
                    Detalle
                </Button>
            ),
        },
    ];

    if (isLoading) {
        return <Loading loading={isLoading} />;
    }

    return (
        <div style={{ paddingRight: isMobile ? '40px' : '' }}>
            {isMobile ? (
                <TableMovil
                    categories={orders}
                    totalCategory={totalOrder}
                    paginationModel={paginationModel}
                    handleEditCategory={handleShow}
                    handlePaginationModelChange={handlePaginationModelChange}
                    totalPagesMobile={totalPagesMovile}
                />
            ) : (
                <DataGrid
                    rows={orders}
                    rowCount={totalOrder}
                    columns={columns}
                    disableColumnSelector
                    disableRowSelectionOnClick
                    autoHeight
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: paginationModel.pageSize,
                                page: paginationModel.page,
                            },
                        },
                    }}
                    onPaginationModelChange={handlePaginationModelChange}
                    pageSizeOptions={[paginationModel.pageSize]}
                    getRowId={(row: Order) => row.id}  // Asegúrate de que `row.id` sea único
                    paginationMode="server"
                />
            )}
        </div>
    );
};

export default ListOfCategories;
