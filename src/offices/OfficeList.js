import React from 'react';
import { Datagrid, EditButton, List, TextField} from 'react-admin';

const SublinkList = (props) => (
  <List {...props} sort={{ field: 'priority', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="priority" />
      <TextField source="services" />
      <TextField source="title" />
      <TextField source="slug" />
      <TextField source="address" />
      <TextField source="worktime" />
      <TextField source="phone" />
      <EditButton />
    </Datagrid>
  </List>
);

export default SublinkList;
