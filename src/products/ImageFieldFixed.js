import React from 'react';
import { ImageField } from 'react-admin';
import {mediaPath} from "../dashboard/Welcome";

const ImageFieldFixed = ( { record, source, title, className } ) => {
    if (title !== 'title') throw new Error('zv: title must already have "title" string in props(used by parent and by dataProvider)');
    let pr = { source, className };
    const newRecord = {};
    if (typeof record === 'string') {
        newRecord[source] = record.split(',').map(v => { return {url:mediaPath(v), title: v};});
    }
    else {
        newRecord[source] = [{url:record[source], title: record.title}];
    }
    return (<ImageField { ...pr } record={newRecord} src="url" title="title" />);
};

export default ImageFieldFixed;
