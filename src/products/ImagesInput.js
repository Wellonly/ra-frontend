import React from 'react';
import { ImageInput } from 'react-admin';
import ImageFieldFixed from "./ImageFieldFixed";
import { useTranslate } from 'react-admin';

const ImagesInput = ({ record, ...rest }) => { //source="images"
    const translate = useTranslate();
    const imgs = record && record.images;
    if (typeof imgs === 'string') {
        record.images = imgs.split(',');
    }
    return (
        <ImageInput {...rest} multiple={true} label="Image" accept="image/*" placeholder={translate('ra.input.file.upload_several')}>
            <ImageFieldFixed source="preview" title="title" />
        </ImageInput>
    );
};

export default ImagesInput;
