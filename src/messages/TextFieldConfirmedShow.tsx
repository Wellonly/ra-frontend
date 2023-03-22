import React, { FC } from 'react';
import {
  Labeled,
  RichTextField,
  useUpdate,
} from 'react-admin';

import { FieldProps, Message } from '../types';

interface ButtonAutoUpdate extends FieldProps<Message> {
  confirmField: string;
  uid?: number;
  fullWidth?: boolean;
  autoclick?: number;
}

let timer: NodeJS.Timeout | null = null;

const TextFieldConfirmedShow: FC<ButtonAutoUpdate> = ({ resource, record, confirmField, uid=0, autoclick=9, ...rest }) => {
  const isOwner = (record && parseInt(record.user_id)) === uid;
  const recordId = (record && parseInt(record.id)) || 0;
  const [update, { loading, loaded }] = useUpdate(resource, recordId, {id: recordId, [confirmField]: (new Date()).toISOString()});
  const isConfirmed = record && Reflect.has(record, confirmField) && !!record[confirmField];

  // console.log('...zv TextFieldConfirmedShow props:', isOwner, confirmField, isConfirmed, loading, loaded, recordId, timer, record);

  if (!isOwner && !isConfirmed && !loading && !loaded && !timer) {
    // console.log('...zv TextFieldConfirmedShow set timeout:', timer);
    timer = setTimeout(toConfirm, autoclick);
  }

  if (!isOwner && !isConfirmed) return null;

  return (
    <Labeled label={rest.label || " "}>
      <RichTextField resource={resource} record={record} {...rest} />
    </Labeled>
  );

  function toConfirm() {
    // console.log('...zv TextFieldConfirmedShow time is out:', isConfirmed, loading, loaded, recordId, timer);
    timer = null;
    update();
  }
}

export default TextFieldConfirmedShow;