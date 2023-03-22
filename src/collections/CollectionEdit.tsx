import React, { FC } from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    TextField,
    NumberField,
    ReferenceArrayInput,
    ReferenceManyField,
    SelectArrayInput,
    NumberInput,
    SimpleForm,
    TextInput,
    useTranslate,
} from 'react-admin';

import ThumbnailField from '../products/ThumbnailField';
import ProductRefField from '../products/ProductRefField';
import { FieldProps, Collection, Product } from '../types';
import config from '../config';
import { makeStyles } from '@material-ui/core/styles';
// import {gold} from "color-name";

const useStyles = makeStyles({
    popup: { background: 0 },
    priority: { display: 'flex' },
});

const CollectionTitle: FC<FieldProps<Collection>> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.collections.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
        </span>
    ) : null;
};

//TODO: it...
const selectRenderer = (record: Product) => {
    return (<span>
                <ThumbnailField record={record}/>
                <p>{record.title}</p>
            </span>
            );
};

//label="resources.collections.fields.products"
const CollectionEdit = (props: any) => {
    const classes = useStyles();
    return (
        <Edit title={<CollectionTitle />} {...props}>
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="slug" />
                <NumberInput
                    source="priority"
                    textAlign="left"
                    step={1}
                    className={classes.priority}
                />
                <ReferenceArrayInput
                    reference="products"
                    source="collection"
                    label=""
                    fullWidth
                    className={classes.popup}
                >
                    <SelectArrayInput
                        optionText={selectRenderer}
                        translateChoice={false}
                        options={{ fullWidth: true, autoWidth: true }}
                    >
                    </SelectArrayInput>
                </ReferenceArrayInput>
                <ReferenceManyField
                    reference="products"
                    target="collection"
                    label="resources.collections.fields.products"
                    perPage={9}
                >
                    <Datagrid>
                        <ThumbnailField />
                        <ProductRefField />
                        <TextField source="title"/>
                        <NumberField
                            source="price"
                            options={{ style: 'currency', currency: config.currency }}
                        />
                        <NumberField
                            source="highprice"
                            options={{ minimumFractionDigits: 2 }}
                        />
                        <NumberField
                            source="optprice"
                            options={{ minimumFractionDigits: 2 }}
                        />
                        <NumberField source="stock" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </SimpleForm>
        </Edit>
    );
};

export default CollectionEdit;
