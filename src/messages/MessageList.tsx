import React, {FC} from 'react';
import { 
  Datagrid,
  List,
  TextField,
  useQueryWithStore,
  useNotify,
} from 'react-admin';
import { Card as MuiCard, CardContent, withStyles } from '@material-ui/core';
import { gql, useSubscription } from '@apollo/client';
import {getClient} from "../lib/apollo";

import { Folder, Message } from '../types';
import { PLACE, BOT_UID } from '../folders/commonFolders';
import { MessageListTitle } from './MessageListTitle';
import { MessageListUserField } from './MessageListUserField';

import { DateOfCreateFilter, UserFilter, FolderFilter } from './MessageFilters';

const MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageCreated($forId: ID!) {
    messageCreated(forId: $forId) {
      id
      user_id
      folder_id
      to_id
      inbox_id
      title
      text
      sentAt
      readAt
    }
  }
`;

const Card = withStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            order: -1, // display on the left rather than on the right of the list
            width: '15em',
            marginRight: '1em',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}))(MuiCard);

interface FilterSidebarProps {
  folders: Folder[];
  data?: Message[];
  filterValues?: object;
}

const FilterSidebar: FC<FilterSidebarProps> = (props) => {
  const { folders, data: messages/* , filterValues */ } = props;
  const userIds = (messages && Object.keys(messages).reduce((acc: number[], key) => {
    const message = messages[key];
    const uid = message.user_id;
    const toid = message.to_id;
    const toadd: number[] = [];
    if (uid && !acc.includes(uid)) toadd.push(uid);
    if (toid && !acc.includes(toid)) toadd.push(toid);
    return [...acc, ...toadd];
  }, [])) || [];
  const { data: users } = useQueryWithStore({
    type: 'getList',
    resource: 'users',
    payload: {
      filter: {
          ids: userIds,
      },
    },
  });

  // console.log('..zv FilterSidebar props:', props, folders, userIds, users);
  return (
    <Card>
        <CardContent>
            <DateOfCreateFilter />
            <FolderFilter folders={folders} />
            <UserFilter users={users} /* filterValues={filterValues} */ />
        </CardContent>
    </Card>
  );
};

const MessageList = (props) => {
  // const notify = useNotify();
  const uid = props?.permissions?.id || 0;
  console.log('..zv MessageList props:', props);
  const { data: folders }: {data: Folder[]} = useQueryWithStore({
    type: 'getList',
    resource: 'folders',
    payload: {
      filter: {
          priority_gt: 0,
          place_gt: PLACE.trash,
          user_id_or: [BOT_UID, uid],
      },
    },
  });
  const notify = useNotify();
  const sub = useSubscription(MESSAGE_SUBSCRIPTION, {
    client: getClient(),
    skip: !uid,
    variables: {forId: uid},
    onSubscriptionComplete: () => console.log('..zv: MessageList.useSubscription.onSubscriptionComplete'),
    onSubscriptionData: (props) => {
      // console.log('..zv: MessageList.useSubscription.onSubscriptionData props:', props);
      const mess: Message = props?.subscriptionData?.data?.messageCreated;
      mess && notify('resources.messages.new_message', 'info', {from: mess.user_id || '', title: mess.title || ''});
    },
  });
  console.log('..zv: MessageList: useSubscription result:', sub);
  //backend default sort: {{field: 'id', order: 'DESC'}} so we may leave it empty
  return (
    <List {...props} aside={<FilterSidebar folders={folders}/>} title={<MessageListTitle search={props?.location?.search} subdata={sub?.data?.messageCreated} />} sort={{field: '', order: ''}} >
      <Datagrid rowClick={postRowClick}>
        <MessageListUserField label="spell.direction" uid={uid} />
        <TextField source="title" />
        <TextField source="sentAt" />
        <TextField source="readAt" />
      </Datagrid>
    </List>
  );

  function postRowClick(id, basePath, record) {
    const isSent = record?.sentAt;
    return !isSent ? 'edit' : 'show';
  }
};

export default MessageList;
