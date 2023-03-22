import React, { FC } from 'react';
import {
    useTranslate,
    useQueryWithStore
} from 'react-admin';
import { FieldProps } from '../types';
// import { parse } from 'query-string'; 

const queryPrefix = '?filter={%22folder_id%22:'; //?filter={"folder_id":1} //1: inbox

interface MessageFolderTitleProps extends FieldProps<any> {
  search?: string;
  smart_count?: number;
}

export const MessageFolderTitle: FC<MessageFolderTitleProps> = ({ record, search = '', smart_count = 1 }) => {
  const translate = useTranslate();
  // console.log('..zv: MessageFolderTitle record:', search, smart_count, record );
  const folderId = parseInt((record && record?.folder_id) || '') || (search.startsWith(queryPrefix) && parseInt(search.substr(queryPrefix.length))) || -1;
  const { loaded, error, data } = useQueryWithStore({
    type: 'getOne',
    resource: 'folders',
    payload: { id: Math.abs(folderId) },
  });

  const foldName = !loaded ? '...': (error || !data) ? '--': folderId > 0 ? data?.name: '';
  const title = translate('resources.messages.name', { smart_count }).concat(' ', foldName);

  return (<span>{title}</span>);
}
