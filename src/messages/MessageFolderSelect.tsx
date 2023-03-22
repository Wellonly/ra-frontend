import React, { FC } from 'react';
import {
  ReferenceInput,
  SelectInput,
} from 'react-admin';

import { PLACE, OUTBOX_FIELD_NAME, INBOX_FIELD_NAME } from '../folders/commonFolders';
import { FieldProps, Folder, Message } from '../types';

const foldName = (fold: Folder) => `${fold.name}`;

const outwardFilter = { place_or: [PLACE.outbox, PLACE.basket, PLACE.trash], priority_gt: 0};
const inwardFilter  = { place_or: [PLACE.inbox,  PLACE.basket, PLACE.trash], priority_gt: 0};
const draftFilter   = { place_or: [PLACE.draft,  PLACE.basket, PLACE.trash], priority_gt: 0};

interface MessageFolderSelectProps extends FieldProps<Message> {
    uid?: number;
}
export const MessageFolderSelect: FC<MessageFolderSelectProps> = (props) => {
    const { record, uid=0 } = props;
    const isOwner = record && uid && parseInt(record?.user_id) === uid;
    const searchField = isOwner ? OUTBOX_FIELD_NAME: INBOX_FIELD_NAME;
    const place = record ? parseInt(isOwner ? record.folder_id: record.inbox_id): 0; //NOTE: place derived from a folder id; true if draft exclusive folder
    const filter = place === PLACE.draft ? draftFilter: isOwner ? outwardFilter: inwardFilter;
    console.log('...zv: show MessageFolderSelect props:', props, isOwner, searchField, filter);

    return record ? (
      <ReferenceInput label="resources.folders.name" source={searchField} reference="folders" filter={filter}>
        <SelectInput optionText={foldName} />
      </ReferenceInput>
    ): (<span>...</span>);
}