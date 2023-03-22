import React from 'react';
import { Datagrid, EditButton, List, TextField } from 'react-admin';

import LinkToRelatedOffices from './LinkToRelatedOffices';

const CityList = (props: any) => (
    <List {...props} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="area" />
            <TextField source="countryCode" />
            <TextField source="phone" />
            <TextField source="postal" />
            <TextField source="rating" />
            <LinkToRelatedOffices />
            <EditButton />
        </Datagrid>
    </List>
);

export default CityList;
