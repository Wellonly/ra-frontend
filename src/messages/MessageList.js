import React from 'react';
import { Datagrid, EditButton, List, TextField/* , ReferenceField */ } from 'react-admin';

const MessageList = (props) => {
  console.log('..zv MessageList props:', props);
  return (
    <List {...props} sort={{ field: 'id', order: 'ASC' }}>
      <Datagrid rowClick="show">
        <TextField source="createdAt" />
        <TextField source="readAt" />
        <TextField source="status" />
        <TextField source="title" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default MessageList;
