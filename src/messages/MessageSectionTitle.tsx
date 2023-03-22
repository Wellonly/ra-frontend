import React, { FC } from 'react';
import {
    useTranslate,
    useQueryWithStore
} from 'react-admin';
import { Typography } from '@material-ui/core';
import { FieldProps, Message, User} from '../types';

interface MessageSectionTitleProps extends FieldProps<Message> {
    uid?: number;
}

function uid2name(loaded, error, data: User[], id: number) {
    if (!loaded) return '...';
    if (error || !data) return '--';
    const user = Array.isArray(data) && data.find(v => parseInt(v.id) === id);
    return (user && user?.username) || '';
}

export const MessageSectionTitle: FC<MessageSectionTitleProps> = (props) => {
    const { record, uid=0 } = props;
    const translate = useTranslate();
    const ownerId = (record && parseInt(record.user_id)) || 0;
    const destId = (record && parseInt(record.to_id)) || 0;
    const userIds: number[] = [ownerId];
    if (destId) userIds.push(destId);

    const { loaded, error, data } = useQueryWithStore({
      type: 'getList',
      resource: 'users',
      payload: { filter: {ids: userIds} },
    });

    const ownerName = uid2name(loaded, error, data, ownerId);
    const destName = uid2name(loaded, error, data, destId);

    const title = translate(`resources.messages.fields.user_id`)
                    .concat(': ', ownerId === uid ? `${translate('spell.fromMe')} (${ownerName})`: ownerName)
                    .concat('; ', translate(`resources.messages.fields.to_id`))
                    .concat(': ', destId === uid ? `${translate('spell.toMe')} (${destName})`: destName);
    // console.log('...zv: show MessageSectionTitle props:', props, loaded, error, data, ownerName, ownerId, destName, destId, userIds);
    return (
        <Typography variant="h6" gutterBottom>
            {title}
        </Typography>
    );
};
