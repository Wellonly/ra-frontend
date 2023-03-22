import React, { FC } from 'react';
import {
    Edit,
    FormTab, TabbedForm,
    NumberField,
    NumberInput,
    ReferenceManyField,
    TextInput,
    useTranslate,
    Datagrid,
    TextField,
    ReferenceField,
} from 'react-admin';
import { FieldProps, User } from '../types';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

import MenuTypeInput from "./MenuTypeInput";

export const styles: Styles<Theme, any> = {
    inline: { display: 'inline-block', marginRight: 11 },
};

const useStyles = makeStyles(styles);

const UserTitle: FC<FieldProps<User>> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.users.name', { smart_count: 1 })}:
            {` ${record.username} (${record.role})`}
        </span>
    ) : null;
};

const UserEdit = (props: any) => {
    const classes = useStyles();
    console.log('zv:UserEdit props:', props);
    return (
        <Edit title={<UserTitle />} {...props}>
            <TabbedForm>
                <FormTab label="resources.users.tabs.user">
                    <TextInput source="username" formClassName={classes.inline} />
                    <MenuTypeInput formClassName={classes.inline} />
                    <NumberInput source="priority" textAlign="left" step={1}/>
                    <TextInput source="email"/>
                    <TextInput source="email2"/>
                    <TextInput source="phone"/>
                    <TextInput source="phone2"/>
                  </FormTab>
                  <FormTab path="folders" label="resources.users.tabs.folders">
                    <ReferenceManyField
                        reference="folders"
                        target="user_id"
                        sort={{ field: 'priority', order: 'ASC' }}
                        label="resources.users.fields.folders"
                    >
                        <Datagrid rowClick="edit">
                            <NumberField source="priority" className={classes.inline}/>
                            <TextField source="name" />
                            <TextField source="slug" />
                            <TextField source="icon" />
                            <TextField source="color" />
                            <TextField source="filter" />
                        </Datagrid>
                    </ReferenceManyField>
                  </FormTab>
                  <FormTab path="messages" label="resources.users.tabs.messages">
                    <ReferenceManyField
                        reference="messages"
                        target="user_id"
                        sort={{ field: 'id', order: 'ASC' }}
                        label="resources.users.fields.messages"
                    >
                        <Datagrid rowClick="edit">
                            <ReferenceField source="to_id" reference="users">
                                <TextField source="username" />
                            </ReferenceField>
                            <TextField source="title" />
                            <TextField source="sentAt" />
                            <TextField source="readAt" />
                            <TextField source="status" />
                        </Datagrid>
                    </ReferenceManyField>
                  </FormTab>
                  <FormTab path="descript" label="resources.users.tabs.descript">
                    <TextInput multiline fullWidth source="descript" label="" />
                  </FormTab>
            </TabbedForm>
        </Edit>
    );
};

export default UserEdit;
