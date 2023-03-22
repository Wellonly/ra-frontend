import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    required,
} from 'react-admin';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

import MenuGroupInput from './MenuGroupInput';
import MenuDatatypeInput from './MenuDatatypeInput';

export const styles: Styles<Theme, any> = {
    name: { display: 'inline-block' },
};

const useStyles = makeStyles(styles);

const OptionCreate = (props: any) => {
    const classes = useStyles();
    return (
        <Create {...props}>
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
        </Create>
    );
};

const requiredValidate = [required()];

export default OptionCreate;
