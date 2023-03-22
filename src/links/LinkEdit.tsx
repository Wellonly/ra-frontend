import React, { FC } from 'react';
import {
    Edit,
    FormTab, TabbedForm,
    NumberField,
    NumberInput,
    ReferenceManyField,
    TextInput,
    useTranslate,
    Datagrid,
    TextField,
} from 'react-admin';
import { FieldProps, Link } from '../types';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

import MenuTypeInput from "./MenuTypeInput";
import {ImagesWithContent} from "../lib/ImagesWithContent";

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
            {translate(`resources.links.menu.${record.menu}`)}.
            {translate('resources.links.name', { smart_count: 1 })}:
            &quot;{record.label}&quot;
        </span>
    ) : null;
};

const LinkEdit = (props: any) => {
    const classes = useStyles();
    return (
        <Edit title={<LinkTitle />} {...props}>
            <TabbedForm>
                <FormTab label="resources.links.tabs.link">
                    <MenuTypeInput />
                    <TextInput source="label" />
                    <TextInput source="slug" />
                    <NumberInput
                      source="priority"
                      textAlign="left"
                      step={1}
                    />
                    <TextInput source="icon" formClassName={classes.icon}/>
                    <TextInput source="component" formClassName={classes.component}/>
                    <ReferenceManyField
                      reference="sublinks"
                      target="link_id"
                      sort={{ field: 'priority', order: 'ASC' }}
                      label="resources.links.fields.sublinks"
                    >
                      <Datagrid rowClick="edit">
                        <NumberField source="priority" className={classes.total}/>
                        <TextField source="label" />
                        <TextField source="icon" />
                        <TextField source="slug" />
                        <TextField source="component" />
                      </Datagrid>
                    </ReferenceManyField>
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

export default LinkEdit;
