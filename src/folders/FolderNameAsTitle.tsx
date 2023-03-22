import React, { FC } from 'react';
import {
    useTranslate,
    useQueryWithStore
} from 'react-admin';
import { FieldProps, Folder } from '../types';
import { PLACE } from './commonFolders';

export const FolderNameAsTitle: FC<FieldProps<Folder>> = ({ record }) => {
    const translate = useTranslate();
    const result = useQueryWithStore({ type: 'getOne', resource: 'users', payload: { id: record ? record.user_id : 0 } });
    return record ? (
        <span>
            {`${translate('resources.folders.fields.place')}: ${translate(`pos.menu.${PLACE[record.place]}`)}; `}
            {translate('resources.folders.name', { smart_count: 1 })}:
            &quot;{record.name}&quot;
            {`; ${translate('resources.folders.fields.user_id')}: `}
            {`${!result ? '' : (result.loaded && !result.error) ? result.data?.username : '...loading'}`}
        </span>
    ) : null;
};
