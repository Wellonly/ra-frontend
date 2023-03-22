import React from 'react';
import { ImageField } from 'react-admin';
import {mediaPath} from "../lib/media";

const ImageFieldFixed = ( { record, source, className, title } ) => { //record here != record of db
    if (title !== 'title') throw new Error('zv: prop title must have value "title" (used by parent: < ImageInput />)');
    let props = { source, className };
    const newRecord = {};
    if (typeof record === 'string') {
        newRecord[source] = record ? record.split(',').map(v => { return {url:mediaPath(v), title: v};}): undefined;
    }
    else {
        newRecord[source] = [{url:record[source], title: record.title}];
    }
    return (<ImageField { ...props } record={newRecord} src="url" title="title" />);
};

export default ImageFieldFixed;
