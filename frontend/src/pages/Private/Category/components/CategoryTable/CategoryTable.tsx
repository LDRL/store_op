import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Category } from '../../models';
import { useCategory } from '../../hooks/useCategory';
import TableMovil from '../TableMovil/TableMovil';
import { useProductContext } from '@/context';
import Loading from '@/componets/Loading';
import { totalPagesMovile } from '@/utils';

const ListOfCategories: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { editCategory } = useProductContext();

    const {
        categories,
        totalCategory,
        isLoading,
        paginationModel,
        handlePaginationModelChange,
    } = useCategory();

    console.log(categories, "------- categories");

    const handleEditCategory = (category: Category) => {
        editCategory(category);
        navigate(`${category.id}/editar`);
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Codigo',
            flex: 1,
            minWidth: 150,
            renderCell: (params: GridRenderCellParams) => (
                <div style={{ display: isMobile ? 'block' : 'inline' }}>{params.value}</div>
            ),
        },
        {
            field: 'name',
            headerName: 'Producto',
            flex: 1,
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
                    color="success"
                    onClick={() => handleEditCategory(params.row as Category)}
                >
                    Editar
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
                    categories={categories}
                    totalCategory={totalCategory}
                    paginationModel={paginationModel}
                    handleEditCategory={handleEditCategory}
                    handlePaginationModelChange={handlePaginationModelChange}
                    totalPagesMobile={totalPagesMovile}
                />
            ) : (
                <DataGrid
                    rows={categories}
                    rowCount={totalCategory}
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
                    getRowId={(row: Category) => row.id}  // Asegúrate de que `row.id` sea único
                    paginationMode="server"
                />
            )}
        </div>
    );
};

export default ListOfCategories;
