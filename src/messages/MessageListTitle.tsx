import React, { FC } from 'react';
import {
    useListContext,
} from 'react-admin';

import { FieldProps, Message } from '../types';
import { MessageFolderAsTitle } from './MessageFolderAsTitle';
import { PLACE } from '../folders/commonFolders';

interface MessageListTitleProps extends FieldProps<Message> {
  search?: string;
  subdata?: Message;
}

/**
 * update messages list upon creatMessage subscription event
 * @param search
 * @param subdata
 */
export const MessageListTitle: FC<MessageListTitleProps> = (props) => {
  const { subdata, ...rest } = props;
  const {data: messages, ids, filterValues } = useListContext();
  // console.log('..zv: MessageListTitle:', subdata, filterValues, messages, ids);
  if (subdata && !subdata._added) {
    const place = +filterValues.folder;
    const sent_lte = filterValues.sentAt_lte;
    if ((!place || place === PLACE.inbox) && !sent_lte) {
      ids.unshift(subdata.id); //unshift===insert(top)
      messages[+subdata.id] = Object.assign({}, subdata);
    }
    subdata._added = 1;
  }
  return (<MessageFolderAsTitle {...rest} />);
}
