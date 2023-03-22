import React, { FC } from 'react';
import { useTranslate, SelectInput } from 'react-admin';
import { InputProps } from 'ra-core';

import places from './folderPlaces';

interface Props extends Omit<InputProps, 'source'> {
    source?: string;
}

/**
 * @param props: {noOptions} if specified then it prevent change existing value (so readonly)
 */
const FolderPlaceInput: FC<Props> = (props) => {
    const translate = useTranslate();
    const { record, noOptions } = props;
    return (
        <SelectInput
            {...props}
            choices={
                places.map(menu => {
                    return (!noOptions || menu.name === record?.place) ? {
                        id: menu.id,
                        name: translate(menu.name),
                    }: undefined;
                })
            }
        />
    );
};

FolderPlaceInput.defaultProps = {
    source: 'place',
    resource: 'folders',
};

export default FolderPlaceInput;
