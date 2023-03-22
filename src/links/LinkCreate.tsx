import React from 'react';
import {
    Create,
    TabbedForm,
    FormTab,
    TextInput,
    NumberInput,
    /*useTranslate,*/
    required,
} from 'react-admin';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

import MenuTypeInput from './MenuTypeInput';
import {ImagesWithContent} from "../lib/ImagesWithContent";

export const styles: Styles<Theme, any> = {
    label: { display: 'inline-block' },
    icon: { display: 'inline-block' },
    component: { display: 'inline-block' },
};

const useStyles = makeStyles(styles);

const LinkCreate = (props: any) => {
    const classes = useStyles();
    return (
        <Create {...props}>
            <TabbedForm>
                <FormTab label="resources.links.tabs.link">
                    <MenuTypeInput />
                    <TextInput
                        autoFocus
                        source="label"
                        formClassName={classes.label}
                        validate={requiredValidate}
                    />
                    <TextInput source="slug"/>
                    <NumberInput
                        source="priority"
                        textAlign="left"
                        step={1}
                    />
                    <TextInput source="icon" formClassName={classes.icon}/>
                    <TextInput source="component" formClassName={classes.component}/>
                </FormTab>
                <FormTab path="content" label="resources.links.tabs.content">
                    <ImagesWithContent imagesSource="images" contentSource="content"/>
                </FormTab>
                <FormTab path="template" label="resources.links.tabs.template">
                    <TextInput multiline fullWidth source="template" label="" />
                </FormTab>
            </TabbedForm>
        </Create>
    );
};

const requiredValidate = [required()];

export default LinkCreate;
