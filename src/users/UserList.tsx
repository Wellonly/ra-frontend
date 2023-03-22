import React from 'react';
import { Datagrid, List, TextField } from 'react-admin';

import LinkToRelatedFolders from './LinkToRelatedFolders';
import LinkToRelatedMessages from './LinkToRelatedMessages';

const UserList = (props: any) => (
    <List {...props} sort={{ field: 'priority', order: 'ASC' }}>
        <Datagrid rowClick="edit">
            <TextField source="priority" />
            <TextField source="username" />
            <TextField source="role" />
            <TextField source="email" />
            <TextField source="phone" />
            <LinkToRelatedFolders />
            <LinkToRelatedMessages />
        </Datagrid>
    </List>
);

export default UserList;
