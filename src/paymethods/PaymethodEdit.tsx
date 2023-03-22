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

import { FieldProps, Link } from '../types';
import {ImagesWithContent} from "../lib/ImagesWithContent";
import Separator from '../lib/Separator';

export const styles: Styles<Theme, any> = {
    label: { display: 'inline-block' },
    icon: { display: 'inline-block' },
};

const useStyles = makeStyles(styles);

const LinkTitle: FC<FieldProps<Link>> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.paymethods.name', { smart_count: 1 })}:
            &quot;{record.title}&quot;
        </span>
    ) : null;
};

const PaymethodEdit = (props: any) => {
    const classes = useStyles();
    // const translate = useTranslate();
    return (
        <Edit title={<LinkTitle />} {...props}>
            <TabbedForm>
                <FormTab label="resources.links.tabs.link">
                    <TextInput source="title" />
                    <TextInput source="slug" />
                    <NumberInput
                        source="priority"
                        textAlign="left"
                        step={1}
                    />
                    <TextInput source="icon" formClassName={classes.icon}/>
                    <Separator />
                </FormTab>
                <FormTab path="description" label="resources.paymethods.tabs.description">
                    <TextInput multiline fullWidth source="descript" label="" />
                </FormTab>
                <FormTab path="calc" label="resources.paymethods.tabs.calc">
                    <TextInput multiline fullWidth source="calc" label="" />
                </FormTab>
                <FormTab path="content" label="resources.links.tabs.content">
                    <ImagesWithContent imagesSource="images" contentSource="content"/>
                </FormTab>
                <FormTab path="template" label="resources.links.tabs.template">
                    <TextInput multiline fullWidth source="template" label="" />
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

export default PaymethodEdit;
