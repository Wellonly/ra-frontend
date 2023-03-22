import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    ReferenceInput,
    useTranslate,
    // required,
} from 'react-admin';
import { Typography } from '@material-ui/core';
import { User } from '../types';
import MessageSaveToolbar from './MessageSaveToolbar';

const userName = (choice:User) => `${choice.username}`;

const MessageCreate = (props: any) => {
    console.log('zv MessageCreate: props', props);

    return (
        <Create {...props}>
            <SimpleForm toolbar={<MessageSaveToolbar/>}>
                <SectionTitle label="resources.messages.name" />
                <ReferenceInput source="to_id" reference="users">
                    <SelectInput optionText={userName} />
                </ReferenceInput>
                <TextInput autoFocus source="title" /* validate={requiredValidate} */ fullWidth/>
                <TextInput multiline fullWidth source="text" />
            </SimpleForm>
        </Create>
    );
};

// const requiredValidate = [required()];

const SectionTitle = ({ label }: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label, { smart_count: 1 })}
        </Typography>
    );
};

export default MessageCreate;
