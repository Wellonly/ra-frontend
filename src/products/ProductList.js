import React from 'react';
import {
    Filter,
    List,
    NumberInput,
    ReferenceInput,
    SearchInput,
    SelectInput,
    useTranslate,
} from 'react-admin';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import GridList from './GridList';

const useQuickFilterStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(3),
    },
}));

const QuickFilter = ({ label }) => {
    const translate = useTranslate();
    const classes = useQuickFilterStyles();
    return <Chip className={classes.root} label={translate(label)} />;
};

export const ProductFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <ReferenceInput
            source="category_id"
            reference="categories"
            sort={{ field: 'id', order: 'ASC' }}
        >
            <SelectInput source="name" />
        </ReferenceInput>
        <ReferenceInput
            source="collection"
            reference="collections"
            sort={{ field: 'id', order: 'ASC' }}
        >
            <SelectInput source="name" />
        </ReferenceInput>
        <NumberInput source="price_gte" />
        <NumberInput source="price_lte" />
        <QuickFilter
            label="resources.products.fields.stock_lte"
            source="stock_lte"
            defaultValue={10}
        />
    </Filter>
);

const ProductList = props => (
    <List
        {...props}
        filters={<ProductFilter />}
        perPage={10 /*zv rem 20; available: 5,10,25 */}
        sort={{ field: 'id', order: 'ASC' }}
    >
        <GridList />
    </List>
);

export default ProductList;
