import React, { FC } from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    useTranslate,
    required,
} from 'react-admin';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

import { FieldProps, Option } from '../types';
import MenuGroupInput from "./MenuGroupInput";
import MenuDatatypeInput from "./MenuDatatypeInput";

export const styles: Styles<Theme, any> = {
    name: { display: 'inline-block' },
};

const useStyles = makeStyles(styles);

const OptionTitle: FC<FieldProps<Option>> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate(`resources.options.group.${record.group}`)}.
            {translate('resources.options.name', {smart_count: 1 })}:
            &quot;{record.name}&quot;
        </span>
    ) : null;
};

const OptionEdit = (props: any) => {
    const classes = useStyles();
    return (
        <Edit title={<OptionTitle />} {...props}>
            <SimpleForm>
                <MenuGroupInput />
                <TextInput
                    autoFocus
                    source="name"
                    formClassName={classes.name}
                    validate={requiredValidate}
                />
                <MenuDatatypeInput/>
                <TextInput source="value" multiline fullWidth/>
                <TextInput source="descript" multiline fullWidth/>
            </SimpleForm>
        </Edit>
    );
};

const requiredValidate = [required()];

export default OptionEdit;
