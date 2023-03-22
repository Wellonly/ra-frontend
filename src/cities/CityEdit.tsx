import React, { FC } from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    NumberField,
    NumberInput,
    ReferenceManyField,
    SimpleForm,
    TextInput,
    TextField,
    useTranslate,
} from 'react-admin';

import {Styles} from "@material-ui/styles/withStyles";
import {makeStyles, Theme} from "@material-ui/core/styles";

import OfficeRefField from '../offices/OfficeRefField';
import { FieldProps, City } from '../types';
import Separator from "../lib/Separator";

export const styles: Styles<Theme, any> = {
    inline: {display: 'inline-block', marginRight: 11},
};

const useStyles = makeStyles(styles);

const CityTitle: FC<FieldProps<City>> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.cities.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
        </span>
    ) : null;
};

const CityEdit = (props: any) => {
    const translate = useTranslate();
    const classes = useStyles();
    return (
        <Edit title={<CityTitle/>} {...props}>
            <SimpleForm>
                <TextInput source="name" fullWidth/>
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
                <ReferenceManyField
                    reference="offices"
                    target="city_id"
                    label="resources.cities.fields.offices"
                    perPage={5}
                    fullWidth
                >
                    <Datagrid>
                        <NumberField source="priority"/>
                        <OfficeRefField source="title" label={translate('resources.offices.fields.title')}/>
                        <TextField source="address"/>
                        <TextField source="worktime"/>
                        <TextField source="phone"/>
                        <EditButton/>
                    </Datagrid>
                </ReferenceManyField>
            </SimpleForm>
        </Edit>
    );
};

export default CityEdit;
