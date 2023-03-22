import React, { FC } from 'react';
import {
  ReferenceField,
} from 'react-admin';
import { Typography } from '@material-ui/core';

import { FieldProps, Message, User } from '../types';

interface MessageListUserFieldProps extends FieldProps<Message> {
    uid?: number;
}
export const MessageListUserField: FC<MessageListUserFieldProps> = (props) => {
    const { uid=0, ...rest } = props;
    const record = props.record;
    const isOwner = record && parseInt(record.user_id) === uid;
    // console.log('...zv: show MessageListUserField isOwner, props:', isOwner, props);

    return record ? (
      <ReferenceField source={isOwner ? "to_id": "user_id"} reference="users" link="show" {...rest}>
        <MessageUserField isOwner={isOwner} />
      </ReferenceField>
    ): (<span>...</span>);
}

interface MessageUserFieldProps extends FieldProps<User> {
  isOwner?: boolean;
}
const MessageUserField: FC<MessageUserFieldProps> = ({isOwner, record}) => {
  return (
      <Typography variant="body1" gutterBottom>
          {`${isOwner ? '-> ':'<- ' } ${record?.username}`}
      </Typography>
  );
};
