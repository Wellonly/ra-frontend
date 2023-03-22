import React from 'react';
import { Datagrid, EditButton, List, TextField, ReferenceField } from 'react-admin';

const FolderList = (props) => (
  <List {...props} sort={{ field: 'priority', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <ReferenceField label="resources.folders.fields.user_id" source="user_id" reference="users">
        <TextField source="username" />
      </ReferenceField>
      <TextField source="priority" />
      <TextField source="name" />
      <TextField source="slug" />
      <TextField source="icon" />
      <TextField source="color" />
      <TextField source="filter" />
      <EditButton />
    </Datagrid>
  </List>
);

export default FolderList;
