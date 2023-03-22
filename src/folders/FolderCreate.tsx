import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    useTranslate,
    required,
} from 'react-admin';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

import { User } from '../types';
import FolderPlaceInput from './FolderPlaceInput';

export const styles: Styles<Theme, any> = {
    name: { display: 'inline-block' },
    inline: {display: 'inline-block', marginRight: 11},
};

const useStyles = makeStyles(styles);

export const validateForm = (props: any) => { //{name}: { name: string; }
    // console.log('zv FolderCreate.validateForm:', props);
    const {name}: { name: string; } = props;
    const errors = {} as any;
    if (!name || name.trim() === '') {
        errors.name = [
            'resources.folders.empty',
        ];
    }
    return errors;
};

const FolderCreate = (props: any) => {
    const classes = useStyles();
    const userName = (choice: User) => `${choice.username}`;
    console.log('zv: FolderCreate:', props);
    return (
        <Create {...props}>
            <SimpleForm validate={validateForm}>
                <SectionTitle name="resources.folders.name" />
                <FolderPlaceInput/>
                <ReferenceInput label="resources.folders.fields.user_id" source="user_id" reference="users">
                    <SelectInput optionText={userName} />
                </ReferenceInput>
                <NumberInput source="priority" textAlign="left" step={1} />
                <TextInput
                    autoFocus
                    source="name"
                    formClassName={classes.name}
                    validate={requiredValidate}
                />
                <TextInput source="icon" formClassName={classes.inline} />
                <TextInput source="color" formClassName={classes.inline} />
                <TextInput source="slug" /* formClassName={classes.slug}*/ />
                <TextInput source="filter" fullWidth />
            </SimpleForm>
        </Create>
    );
};

const requiredValidate = [required()];

const SectionTitle = ({ name }: { name: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(name, { smart_count: 1 })}
        </Typography>
    );
};

export default FolderCreate;
