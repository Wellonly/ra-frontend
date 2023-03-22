import React, { FC } from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    NumberField,
    NumberInput,
    ReferenceManyField,
    SimpleForm,
    TextInput,
    useTranslate,
} from 'react-admin';

import ThumbnailField from '../products/ThumbnailField';
import ProductRefField from '../products/ProductRefField';
import { FieldProps, Category } from '../types';
import config from '../config';

const CategoryTitle: FC<FieldProps<Category>> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.categories.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
        </span>
    ) : null;
};

const CategoryEdit = (props: any) => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="slug" />
            <NumberInput
                source="priority"
                textAlign="left"
                step={1}
            />
            <ReferenceManyField
                reference="products"
                target="category_id"
                label="resources.categories.fields.products"
                perPage={5}
            >
                <Datagrid>
                    <ThumbnailField />
                    <ProductRefField source="sku" />
                    <NumberField
                        source="price"
                        options={{ style: 'currency', currency: config.currency }}
                    />
                    <NumberField
                        source="optprice"
                        options={{ minimumFractionDigits: 2 }}
                    />
                    <NumberField
                        source="highprice"
                        options={{ minimumFractionDigits: 2 }}
                    />
                    <NumberField source="stock" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleForm>
    </Edit>
);

export default CategoryEdit;
