import React from 'react';
import {
    Datagrid,
    DateField,
    Edit,
    EditButton,
    FormTab,
    NumberInput,
    Pagination,
    ReferenceInput,
    ReferenceManyField, required,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
    /*useTranslate,*/
} from 'react-admin';
import {InputAdornment} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';

import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from '../reviews/StarRatingField';
// import Poster from './Poster';
import { styles as createStyles } from './ProductCreate';
import ImagesInput from "../layout/ImagesInput";
import {imagesFieldFormatter} from "../lib/formatter";
import {ImagesWithContent} from "../lib/ImagesWithContent";

const ProductTitle = ({ record }) => <span>Goods #{record.sku}</span>;

const styles = {
    ...createStyles,
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

const useStyles = makeStyles(styles);

const ProductEdit = props => {
    const classes = useStyles();
    // console.log("zv imgs:", imgs, props.record);
    return (
        <Edit {...props} title={<ProductTitle />}>
            <TabbedForm>
                <FormTab label="resources.products.tabs.image">
                    {/*<Poster />*/}
                    <TextInput source="video" fullWidth />
                    <TextInput source="images" format={imagesFieldFormatter} fullWidth />
                    <ImagesInput source="images" />
                </FormTab>
                <FormTab label="resources.products.tabs.details" path="details">
                    <TextInput source="title" />
                    <TextInput source="sku" />
                    <TextInput source="slug" validate={required()} />
                    <NumberInput
                        source="priority"
                        className={classes.priority}
                        formClassName={classes.priorityFormGroup}
                    />
                    <TextInput source="variant" formClassName={classes.variantFormGroup} />
                    <ReferenceInput source="category_id" reference="categories">
                        <SelectInput source="name" />
                    </ReferenceInput>
                    <NumberInput
                        source="price"
                        validate={required()}
                        className={classes.price}
                        formClassName={classes.priceFormGroup}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    ₽{/* ₽ unicode: U+20BD */}
                                </InputAdornment>
                            ),
                        }}
                    />
                    <NumberInput
                        source="highprice"
                        validate={required()}
                        className={classes.highprice}
                        formClassName={classes.highpriceFormGroup}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    ₽{/* ₽ unicode: U+20BD */}
                                </InputAdornment>
                            ),
                        }}
                    />
                    <NumberInput
                        source="optprice"
                        className={classes.optprice}
                        formClassName={classes.optpriceFormGroup}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    ₽{/* ₽ unicode: U+20BD */}
                                </InputAdornment>
                            ),
                        }}
                    />
                    <NumberInput
                        source="optfrom"
                        className={classes.optfrom}
                        formClassName={classes.optfromFormGroup}
                    />
                    <NumberInput source="stock" className={classes.stock} />
                </FormTab>
                <FormTab path="description" label="resources.products.tabs.description">
                    <RichTextInput source="description" label="" />
                </FormTab>
                <FormTab path="spec" label="resources.products.tabs.spec">
                    <NumberInput source="weight" className={classes.specFields} formClassName={classes.specFormGroup} />
                    <NumberInput source="length" className={classes.specFields} formClassName={classes.specFormGroup} />
                    <NumberInput source="width" className={classes.specFields} formClassName={classes.specFormGroup} />
                    <NumberInput source="height" className={classes.specFields} formClassName={classes.specFormGroup} />
                    <TextInput source="spec" multiline fullWidth label="" />
                </FormTab>
                <FormTab path="article" label="resources.products.tabs.article">
                  <ImagesWithContent imagesSource="artimages" contentSource="article"/>
                </FormTab>
                <FormTab label="resources.products.tabs.reviews" path="reviews">
                    <ReferenceManyField
                        reference="reviews"
                        target="product_id"
                        addLabel={false}
                        pagination={<Pagination />}
                        fullWidth
                    >
                        <Datagrid>
                            <DateField source="date" />
                            <CustomerReferenceField />
                            <StarRatingField />
                            <TextField source="comment" cellClassName={classes.comment}/>
                            <TextField source="status" />
                            <EditButton />
                        </Datagrid>
                    </ReferenceManyField>
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

export default ProductEdit;
