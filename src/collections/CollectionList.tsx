import React from 'react';
import { Datagrid, EditButton, List, TextField } from 'react-admin';

import LinkToRelatedProducts from './LinkToRelatedProducts';

const CollectionList = (props: any) => (
    <List {...props} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid>
            <TextField source="priority" />
            <TextField source="name" />
            <TextField source="slug" />
            <LinkToRelatedProducts />
            <EditButton />
        </Datagrid>
    </List>
);

export default CollectionList;
