import React from 'react';
import { ImageInput, useTranslate } from 'react-admin';
import ImageFieldFixed from "./ImageFieldFixed";

const ImagesInput = (props) => { //source="images"
    const { record, source, ...rest } = props;
    const translate = useTranslate();
    // const imgs = record && record[source]; //RA fix it!!!
    // if (typeof imgs === 'string' && !!imgs) {
    //     record[source] = imgs.split(',');
    // }
    return (
        <ImageInput source={source} {...rest} multiple={true} label="spell.images" accept="image/*" placeholder={translate('ra.input.file.upload_several')}>
            <ImageFieldFixed source="preview" title="title" />
        </ImageInput>
    );
};

export default ImagesInput;
