import React from 'react';
import {
    Create,
    FormTab, TabbedForm,
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    useTranslate,
    required,
} from 'react-admin';
import {Typography} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';
import {ImagesWithContent} from "../lib/ImagesWithContent";
import Separator from '../lib/Separator';

export const styles: Styles<Theme, any> = {
    label: { display: 'inline-block' },
    slug: { display: 'inline-block' },
    icon: { display: 'inline-block' },
    component: { display: 'inline-block' },
};

const useStyles = makeStyles(styles);

const SublinkCreate = (props: any) => {
    const classes = useStyles();
    const translate = useTranslate();
    const parentLinkName = (choice:any) => `${translate("resources.links.menu.".concat(choice.menu))}. ${choice.label}`;
    return (
        <Create {...props}>
            <TabbedForm>
                <FormTab label="resources.links.tabs.link">
                    <SectionTitle label="resources.sublinks.newlabel" />
                    <ReferenceInput label="resources.sublinks.fields.link_id" source="link_id" reference="links">
                        <SelectInput optionText={parentLinkName} />
                    </ReferenceInput>
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
                    <Separator/>
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

const SectionTitle = ({ label }: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label, { smart_count: 1 })}
        </Typography>
    );
};

export default SublinkCreate;
