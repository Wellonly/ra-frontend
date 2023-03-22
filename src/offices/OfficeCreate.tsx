import React from 'react';
import {
    Create,
    FormTab, TabbedForm,
    TextInput,
    NumberInput,
    useTranslate,
    required,
} from 'react-admin';
import {Typography} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';
import {ImagesWithContent} from "../lib/ImagesWithContent";
import Separator from '../lib/Separator';

export const styles: Styles<Theme, any> = {
    inline: {display: 'inline-block', marginRight: 11},
};

const useStyles = makeStyles(styles);

const OfficeCreate = (props: any) => {
    const classes = useStyles();
    // const translate = useTranslate();
    return (
        <Create {...props}>
            <TabbedForm>
                <FormTab label="resources.offices.tabs.office">
                    <SectionTitle label="resources.offices.newlabel" />
                    <TextInput
                        autoFocus
                        source="title"
                        formClassName={classes.label}
                        validate={requiredValidate}
                        fullWidth
                    />
                    <TextInput source="address" fullWidth/>
                    <TextInput source="slug" fullWidth/>
                    <NumberInput source="priority" textAlign="left" step={1} formClassName={classes.inline}/>
                    <NumberInput source="services" textAlign="left" step={1} formClassName={classes.inline}/>
                    <Separator/>
                    <TextInput source="worktime" formClassName={classes.inline}/>
                    <TextInput source="phone" formClassName={classes.inline}/>
                    <Separator/>
                    <NumberInput source="latitude" textAlign="left" step={1} formClassName={classes.inline}/>
                    <NumberInput source="longitude" textAlign="left" step={1} formClassName={classes.inline}/>
                    <Separator/>
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

export default OfficeCreate;
