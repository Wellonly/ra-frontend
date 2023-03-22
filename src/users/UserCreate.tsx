import React from 'react';
import {
    Create,
    TabbedForm,
    FormTab,
    TextInput,
    NumberInput,
    required,
} from 'react-admin';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

import MenuTypeInput from './MenuTypeInput';

export const styles: Styles<Theme, any> = {
    label: { display: 'inline-block' },
};

const useStyles = makeStyles(styles);

const UserCreate = (props: any) => {
    const classes = useStyles();
    return (
        <Create {...props}>
            <TabbedForm>
                <FormTab label="resources.users.tabs.user">
                    <MenuTypeInput />
                    <TextInput
                        autoFocus
                        source="username"
                        formClassName={classes.label}
                        validate={requiredValidate}
                    />
                    <NumberInput source="priority" textAlign="left" step={1}/>
                    <TextInput source="email"/>
                    <TextInput source="email2"/>
                    <TextInput source="phone"/>
                    <TextInput source="phone2"/>
                </FormTab>
                <FormTab path="descript" label="resources.users.tabs.descript">
                    <TextInput multiline fullWidth source="descript" label="" />
                </FormTab>
            </TabbedForm>
        </Create>
    );
};

const requiredValidate = [required()];

export default UserCreate;
