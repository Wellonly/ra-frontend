import React from 'react';
import { Datagrid, EditButton, List, TextField} from 'react-admin';

const CarrierList = (props) => (
  <List {...props} sort={{ field: 'priority', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="priority" />
      <TextField source="title" />
      <TextField source="slug" />
      <TextField source="icon" />
      <EditButton />
    </Datagrid>
  </List>
);

export default CarrierList;
