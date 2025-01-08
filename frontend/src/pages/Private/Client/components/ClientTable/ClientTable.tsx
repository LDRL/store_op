import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, useMediaQuery,useTheme} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Client } from '../../models';

import { totalPagesMovile } from '@/utils';
import TableMovil from '../TableMovil/TableMovil';
import { useClient } from '../../hooks/useClient';
import { useProductContext } from '@/context';
import Loading from '@/componets/Loading';

const ListOfClients: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const {editClient} = useProductContext();

    // const [loading , setLoading] = useState<boolean>(false);

    const {
        clients,
        totalClient,
        isLoading,
        paginationModel,
        handlePaginationModelChange,
    } = useClient();

    const handleEditClient = (client: Client) => {
        editClient(client);
        navigate(`${client.id}/editar`)
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
            headerName: 'Producto',
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
                    color="success"
                    onClick={() => handleEditClient(params.row as Client)}
                >
                    Editar
                </Button>
            ),
        },
    ];


    if (isLoading) {
        return <Loading loading={isLoading}/>;
    }

    return (
        <div style={{paddingRight: isMobile ? "40px": "" }}>
            {isMobile ? (
                <TableMovil
                    clients={clients}
                    totalClient={totalClient}
                    paginationModel={paginationModel}
                    handleEditClient={handleEditClient}
                    handlePaginationModelChange={handlePaginationModelChange}
                    totalPagesMobile={totalPagesMovile}
                />
                
            ) : (
                <DataGrid
                    rows={clients}
                    rowCount={totalClient}
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
                    getRowId={(row: any) => row.id}
                    paginationMode="server"
                />
            )}
        </div>
    );
};

export default ListOfClients;