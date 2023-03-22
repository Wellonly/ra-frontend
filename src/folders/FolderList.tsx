import React from 'react';
import { Datagrid, List, TextField, ReferenceField, useTranslate } from 'react-admin';
import { PLACE } from './commonFolders';
import places from './folderPlaces';

const FolderList = (props) => {
  // console.log('..zv: FolderList:', props);
  return (
    <List {...props} sort={{ field: 'priority', order: 'ASC' }} filter={{place_gt: PLACE.trash}}>
      <Datagrid rowClick="edit">
        <ReferenceField label="resources.folders.fields.user_id" source="user_id" reference="users">
          <TextField source="username" />
        </ReferenceField>
        <TextField source="priority" />
        <TextField source="name" />
        <PlaceName source="place" />
        <TextField source="slug" />
        <TextField source="icon" />
        <TextField source="color" />
        <TextField source="filter" />
      </Datagrid>
    </List>
  );
}
export default FolderList;

const PlaceName = (props) => {
  const translate = useTranslate();
  // console.log('..PlaceName: props:', props);
  const { record } = props;
  const place = record ? places.find(p => p.id === record.place): undefined;
  return (<span>{translate(place?.name)}</span>);
}
