import React from 'react';
import {
    Create,
    TabbedForm,
    FormTab,
    NumberInput,
    ReferenceInput,
    SelectInput,
    TextInput,
    required,
    /*useTranslate,*/
} from 'react-admin';
import {InputAdornment} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';
import ImagesInput from "../layout/ImagesInput";
import {imagesFieldFormatter} from "../lib/formatter";
import {ImagesWithContent} from "../lib/ImagesWithContent";

export const styles = {
    priority: { width: '9em' },
    price: { width: '9em' },
    highprice: { width: '9em' },
    optprice: { width: '9em' },
    optfrom: { width: '10em' },
    stock: { width: '7em' },
    specFields: { width: '7em' },
    priorityFormGroup: { display: 'inline-block' },
    variantFormGroup: { display: 'inline-block', marginLeft: 12 },
    priceFormGroup: { display: 'inline-block' },
    highpriceFormGroup: { display: 'inline-block', marginLeft: 12 },
    optpriceFormGroup: { display: 'inline-block', marginLeft: 12 },
    optfromFormGroup: { display: 'inline-block', marginLeft: 12 },
    specFormGroup: { display: 'inline-block', marginLeft: 10 },
};

const useStyles = makeStyles(styles);

const ProductCreate = props => {
    const classes = useStyles();
    return (
        <Create {...props}>
            <TabbedForm>
                <FormTab label="resources.products.tabs.image">
                    <TextInput source="video" fullWidth />
                    <TextInput source="images" format={imagesFieldFormatter} fullWidth />
                    <ImagesInput source="images" />
                </FormTab>
                <FormTab label="resources.products.tabs.details" path="details">
                    <TextInput source="title" validate={required()} />
                    <TextInput source="sku" validate={required()} />
                    <TextInput source="slug" validate={required()} />
                    <NumberInput
                        source="priority"
                        className={classes.priority}
                        formClassName={classes.priorityFormGroup}
                    />
                    <TextInput source="variant" formClassName={classes.variantFormGroup} />
                    <ReferenceInput source="category_id" reference="categories" allowEmpty>
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
                    <NumberInput
                        source="stock"
                        validate={required()}
                        className={classes.stock}
                    />
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
            </TabbedForm>
        </Create>
    );
};

export default ProductCreate;
