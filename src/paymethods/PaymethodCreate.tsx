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
    title: { display: 'inline-block' },
    slug: { display: 'inline-block' },
    icon: { display: 'inline-block' },
    calc: { display: 'inline-block' },
};

const useStyles = makeStyles(styles);

const PaymethodCreate = (props: any) => {
    const classes = useStyles();
    // const translate = useTranslate();
    return (
        <Create {...props}>
            <TabbedForm>
                <FormTab label="resources.paymethods.tabs.paymethod">
                    <SectionTitle label="resources.paymethods.newlabel" />
                    <TextInput
                        autoFocus
                        source="title"
                        formClassName={classes.label}
                        validate={requiredValidate}
                    />
                    <NumberInput
                        source="priority"
                        textAlign="left"
                        step={1}
                    />
                    <TextInput source="slug"/>
                    <TextInput source="icon" formClassName={classes.icon}/>
                    <Separator/>
                </FormTab>
                <FormTab path="description" label="resources.paymethods.tabs.description">
                    <TextInput multiline fullWidth source="descript" label="" />
                </FormTab>
                <FormTab path="calc" label="resources.paymethods.tabs.calc">
                    <TextInput multiline fullWidth source="calc" label="" />
                </FormTab>
                <FormTab path="content" label="resources.paymethods.tabs.content">
                    <ImagesWithContent imagesSource="images" contentSource="content"/>
                </FormTab>
                <FormTab path="template" label="resources.paymethods.tabs.template">
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

export default PaymethodCreate;
