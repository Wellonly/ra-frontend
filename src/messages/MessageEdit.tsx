import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    // required,
} from 'react-admin';

import { User } from '../types';
import { MessageFolderAsTitle } from './MessageFolderAsTitle';
import { MessageSectionTitle } from './MessageSectionTitle';
import MessageSaveToolbar from './MessageSaveToolbar';

const userName = (choice: User) => `${choice.username}`;

/**
 * Called only for FOLDER_DRAFT
 * @param props 
 */
const MessageEdit = (props: any) => { 
    const uid = props?.permissions?.id;
    // const classes = useStyles();
    // const translate = useTranslate();
    console.log('zv: MessageEdit:', props);
    return (
        <Edit title={<MessageFolderAsTitle uid={uid} />} {...props}>
            <SimpleForm toolbar={<MessageSaveToolbar/>}>
                <MessageSectionTitle uid={uid} />
                <ReferenceInput source="to_id" reference="users" allowEmpty>
                    <SelectInput optionText={userName} allowEmpty resettable />
                </ReferenceInput>
                <TextInput autoFocus fullWidth source="title" /* validate={requiredValidate} */ />
                <TextInput multiline fullWidth source="text" label="" />
            </SimpleForm>
        </Edit>
    );
};

// const requiredValidate = [required()];

export default MessageEdit;
