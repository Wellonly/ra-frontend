import React/* , { FC } */ from 'react';
import {
  SaveButton, /* Button, */
  Toolbar,
} from 'react-admin';

import Separator from '../lib/Separator';
import { PLACE } from '../folders/commonFolders';
import { Message} from '../types';

const MessageSaveToolbar = props => {
 
  console.log('...zv MessageSaveToolbar props:', props);
  return (
    <Toolbar {...props}>
        <SaveButton
          label="spell.send"
          submitOnEnter={true}
          transform={saveAndSend}
          redirect="list"
        />
        <Separator orientation="vertical" style={{marginRight: 11 }} />
        <SaveButton
          label="spell.saveAsDraft"
          transform={saveAsDraft}
          submitOnEnter={false}
          redirect="list"
        />
    </Toolbar>
  );
  function saveAndSend(data: Message) {
    console.log('...zv MessageSaveToolbar.saveAndSend() click props:', props, data);
    data.folder_id = PLACE.outbox.toString();
    data.inbox_id = PLACE.inbox.toString();
    data.sentAt = new Date().toISOString();
    return data;
  }
  function saveAsDraft(data: Message) {
    console.log('...zv MessageSaveToolbar.saveAsDraft() click props:', props, data);
    data.folder_id = PLACE.draft.toString();
    data.sentAt = null;
    return data;
  }
};

export default MessageSaveToolbar;
