import React, { FC } from 'react';
import {
    useTranslate,
    useQueryWithStore
} from 'react-admin';
import { FieldProps, Message } from '../types';
import { parse } from 'query-string'; 

import { INBOX_FIELD_NAME, OUTBOX_FIELD_NAME } from '../folders/commonFolders';

interface MessageFolderTitleProps extends FieldProps<Message> {
  search?: string;
  uid?: number;
}

/**
 * MessageFolderTitle receive record from MessageEdit & MessageView, so we use the record first!
 * MessageFolderTitle does not receive record from MessageListTitle, so for this we parse the search(page query string) filter parameter
 * @param param0 
 */
export const MessageFolderAsTitle: FC<MessageFolderTitleProps> = (props) => {
  const translate = useTranslate();
  const { record, search, uid=0 } = props;
  let foldIds: number[] = [];
  if (record) {
    const recOwner = parseInt(record?.user_id) || 0;
    const searchField = (recOwner === uid) ? OUTBOX_FIELD_NAME: INBOX_FIELD_NAME;
    foldIds.push((uid && recOwner && parseInt(Reflect.get(record, searchField))) || 0);
  }
  else {
    const searchParsed = search ? parse(search): undefined;
    const filter = searchParsed && searchParsed?.filter;
    typeof filter === 'string' && [INBOX_FIELD_NAME, OUTBOX_FIELD_NAME].forEach(name => {
      const fieldIdx = filter.indexOf(name);
      if (fieldIdx) {
        const isQuote = filter.charAt(fieldIdx + name.length +2) === '"';
        const fid = parseInt(filter.substr(fieldIdx + name.length + (isQuote ? 3:2)));
        if (!isNaN(fid)) foldIds.push(fid);
      }
    });
  }
  // console.log('..zv: MessageFolderAsTitle props:', foldIds, props);
  const { loaded, error, data } = useQueryWithStore({
    type: 'getList',
    resource: 'folders',
    payload: { filter: {ids: foldIds} },
  });

  const foldNames = !loaded ? '...'
    : (error || !data) ? '--'
    : (Array.isArray(data)) ? data.map(fld => fld?.name || '').join(', ')
    : '';
  const title = translate('resources.messages.name', { smart_count: record ? 1: 2 }).concat(' ', foldNames);

  return (<span>{title}</span>);
}
