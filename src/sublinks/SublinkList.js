import React from 'react';
import { Datagrid, EditButton, List, TextField, ReferenceField } from 'react-admin';

const SublinkList = (props) => (
  <List {...props} sort={{ field: 'link_id', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <ReferenceField label="resources.sublinks.fields.link_id" source="link_id" reference="links">
        <TextField source="label" />
      </ReferenceField>
      <TextField source="priority" />
      <TextField source="label" />
      <TextField source="slug" />
      <TextField source="icon" />
      <TextField source="component" />
      <EditButton />
    </Datagrid>
  </List>
);

export default SublinkList;
