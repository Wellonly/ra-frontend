import React, { FC } from 'react';
import {
    Edit,
    NumberInput,
    FormTab, TabbedForm,
    TextInput,
    useTranslate,
} from 'react-admin';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

import { FieldProps, Office } from '../types';
import {ImagesWithContent} from "../lib/ImagesWithContent";
import Separator from '../lib/Separator';

export const styles: Styles<Theme, any> = {
    inline: {display: 'inline-block', marginRight: 11},
};

const useStyles = makeStyles(styles);

const OfficeTitle: FC<FieldProps<Office>> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.offices.name', { smart_count: 1 })}:
            &quot;{record.title}&quot;
        </span>
    ) : null;
};

const OfficeEdit = (props: any) => {
    const classes = useStyles();
    // const translate = useTranslate();
    return (
        <Edit title={<OfficeTitle />} {...props}>
            <TabbedForm>
                <FormTab label="resources.offices.tabs.office">
                    <TextInput source="title" fullWidth />
                    <TextInput source="address" fullWidth />
                    <TextInput source="slug" fullWidth />
                    <NumberInput source="priority" textAlign="left" step={1} formClassName={classes.inline}/>
                    <NumberInput source="services" textAlign="left" step={1} formClassName={classes.inline}/>
                    <Separator />
                    <TextInput source="worktime" formClassName={classes.inline}/>
                    <TextInput source="phone" formClassName={classes.inline}/>
                    <Separator />
                    <NumberInput source="latitude" textAlign="left" step={1} formClassName={classes.inline}/>
                    <NumberInput source="longitude" textAlign="left" step={1} formClassName={classes.inline}/>
                    <Separator />
                </FormTab>
                <FormTab path="description" label="resources.offices.tabs.description">
                    <TextInput multiline fullWidth source="descript" label="" />
                </FormTab>
                <FormTab path="content" label="resources.offices.tabs.content">
                    <ImagesWithContent imagesSource="images" contentSource="content"/>
                </FormTab>
                <FormTab path="template" label="resources.offices.tabs.template">
                    <TextInput multiline fullWidth source="template" label="" />
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

export default OfficeEdit;
