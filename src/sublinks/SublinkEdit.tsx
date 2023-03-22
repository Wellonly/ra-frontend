import React, { FC } from 'react';
import {
    Edit,
    NumberInput,
    FormTab, TabbedForm,
    TextInput,
    useTranslate,
    ReferenceInput,
    SelectInput,
} from 'react-admin';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

import { FieldProps, Link } from '../types';
import {ImagesWithContent} from "../lib/ImagesWithContent";
import Separator from '../lib/Separator';
// import menutypes from "../links/menutypes";

export const styles: Styles<Theme, any> = {
    label: { display: 'inline-block' },
    icon: { display: 'inline-block' },
    component: { display: 'inline-block' },
};

const useStyles = makeStyles(styles);

const LinkTitle: FC<FieldProps<Link>> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.sublinks.name', { smart_count: 1 })}:
            &quot;{record.label}&quot;
        </span>
    ) : null;
};

const SublinkEdit = (props: any) => {
    const classes = useStyles();
    const translate = useTranslate();
    const parentLinkName = (choice:any) => `${translate("resources.links.menu.".concat(choice.menu))}. ${choice.label}`;
    return (
        <Edit title={<LinkTitle />} {...props}>
            <TabbedForm>
                <FormTab label="resources.links.tabs.link">
                    <ReferenceInput label="resources.sublinks.fields.link_id" source="link_id" reference="links">
                        <SelectInput optionText={parentLinkName} />
                    </ReferenceInput>
                    <TextInput source="label" />
                    <TextInput source="slug" />
                    <NumberInput
                        source="priority"
                        textAlign="left"
                        step={1}
                    />
                    <TextInput source="icon" formClassName={classes.icon}/>
                    <TextInput source="component" formClassName={classes.component}/>
                    <Separator />
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

export default SublinkEdit;
