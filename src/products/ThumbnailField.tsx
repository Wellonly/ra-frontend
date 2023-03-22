import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FieldProps, Product } from '../types';
import { mediaPath } from '../lib/media';

const useStyles = makeStyles({
    root: { width: 25, maxWidth: 25, maxHeight: 25 },
});

const ThumbnailField: FC<FieldProps<Product>> = ({ record }) => {
    const classes = useStyles();
    return record ? (
        <img
            src={mediaPath(record.images /*.thumbnail*/)}
            className={classes.root}
            alt=""
        />
    ) : null;
};

export default ThumbnailField;
