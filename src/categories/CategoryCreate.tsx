import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    useTranslate,
    required,
} from 'react-admin';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';
import Separator from '../lib/Separator';

export const styles: Styles<Theme, any> = {
    name: { display: 'inline-block' },
    // slug: { display: 'inline-block' },
};

const useStyles = makeStyles(styles);

export const validateForm = ({name}: { name: string; }) => {
    const errors = {} as any;
    if (!name || name.trim() === '') {
        errors.name = [
            'resources.categories.empty',
        ];
    }
    return errors;
};

const CategoryCreate = (props: any) => {
    const classes = useStyles();

    return (
        <Create {...props}>
            <SimpleForm validate={validateForm}>
                <SectionTitle label="resources.categories.name" />
                <TextInput
                    autoFocus
                    source="name"
                    formClassName={classes.name}
                    validate={requiredValidate}
                />
                <TextInput
                    source="slug"
                    // formClassName={classes.slug}
                />
                <NumberInput
                    source="priority"
                    textAlign="left"
                    step={1}
                />
                <Separator />
            </SimpleForm>
        </Create>
    );
};

const requiredValidate = [required()];

const SectionTitle = ({ label }: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label, { smart_count: 1 })}
        </Typography>
    );
};

export default CategoryCreate;
