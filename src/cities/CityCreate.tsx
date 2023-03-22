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
    inline: {display: 'inline-block', marginRight: 11},
};

const useStyles = makeStyles(styles);

export const validateForm = ({name}: { name: string; }) => {
    const errors = {} as any;
    if (!name || name.trim() === '') {
        errors.name = [
            'resources.cities.empty',
        ];
    }
    return errors;
};

const CityCreate = (props: any) => {
    const classes = useStyles();

    return (
        <Create {...props}>
            <SimpleForm validate={validateForm}>
                <SectionTitle label="resources.cities.name" />
                <TextInput autoFocus source="name" validate={requiredValidate} fullWidth />
                <TextInput source="area" fullWidth/>
                <TextInput source="countryCode"/>
                <Separator />
                <NumberInput source="phone" textAlign="left" step={1} formClassName={classes.inline}/>
                <NumberInput source="postal" textAlign="left" step={1} formClassName={classes.inline}/>
                <Separator />
                <NumberInput source="latitude" textAlign="left" step={1} formClassName={classes.inline}/>
                <NumberInput source="longitude" textAlign="left" step={1} formClassName={classes.inline}/>
                <Separator />
                <NumberInput source="rating" textAlign="left" step={100000} formClassName={classes.inline}/>
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

export default CityCreate;
