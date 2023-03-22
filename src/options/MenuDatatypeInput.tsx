import React, { FC } from 'react';
import { useTranslate, SelectInput } from 'react-admin';
import { InputProps } from 'ra-core';

import datatypes from './datatypes';

interface Props extends Omit<InputProps, 'source'> {
    source?: string;
}

const MenuGroupInput: FC<Props> = ({ addField, ...rest }) => {
    const translate = useTranslate();
    return (
        <SelectInput
            {...rest}
            choices={datatypes.map(menutype => ({
                id: menutype.id,
                name: translate(menutype.name),
            }))}
        />
    );
};

MenuGroupInput.defaultProps = {
    addField: true,
    source: 'datatype',
    resource: 'options',
};

export default MenuGroupInput;
