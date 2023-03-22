import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    required,
} from 'react-admin';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

import { FolderNameAsTitle } from './FolderNameAsTitle';
// import FolderPlaceInput from './FolderPlaceInput';

export const styles: Styles<Theme, any> = {
    inline: {display: 'inline-block', marginRight: 11},
};

const useStyles = makeStyles(styles);

const FolderEdit = (props: any) => {
    const classes = useStyles();
    console.log('zv: FolderEdit props:', props);
    return (
        <Edit title={<FolderNameAsTitle />} {...props}>
            <SimpleForm>
                <NumberInput source="priority" textAlign="left" step={1} />
                <TextInput
                    autoFocus
                    source="name"
                    formClassName={classes.inline}
                    validate={requiredValidate}
                />
                <TextInput source="icon" formClassName={classes.inline} />
                <TextInput source="color" formClassName={classes.inline} />
                <TextInput source="slug" /* formClassName={classes.slug}*/ />
                <TextInput source="filter" fullWidth />
            </SimpleForm>
        </Edit>
    );
};

const requiredValidate = [required()];

export default FolderEdit;
