import React from 'react';
import { Button, Card, CardContent, Pagination } from '@mui/material';
import { Client } from '../../models';

interface ClientListProps {
    clients: Client[];
    totalClient: number;
    paginationModel: { page: number; pageSize: number };
    handleEditClient: (category: Client) => void;
    handlePaginationModelChange: (newPaginationModel: { page: number; pageSize: number }) => void;
    totalPagesMobile: number;
}

const TableMovil: React.FC<ClientListProps> = ({
    clients,
    totalClient,
    paginationModel,
    handleEditClient,
    handlePaginationModelChange,
    totalPagesMobile,
}) => {
    return (
        <>
            {clients.map((client) => (
                <Card key={client.id} style={{ marginBottom: '16px' }}>
                    <CardContent>
                        <h3>{client.name}</h3>
                        <p>Código: {client.id}</p>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleEditClient(client)}
                        >
                            Editar
                        </Button>
                    </CardContent>
                </Card>
            ))}
            <Pagination
                count={Math.ceil(totalClient / totalPagesMobile)}
                page={paginationModel.page + 1}
                onChange={(event, value) =>
                    handlePaginationModelChange({ page: value - 1, pageSize: paginationModel.pageSize })
                }
                color="primary"
                style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
                siblingCount={0}
                variant="outlined"
            />
        </>
    );
};

export default TableMovil;
