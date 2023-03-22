import React, { FC } from 'react';
import { useTranslate, SelectInput } from 'react-admin';
import { InputProps } from 'ra-core';

import menutypes from './menutypes';

interface Props extends Omit<InputProps, 'source'> {
    source?: string;
}

const MenuTypeInput: FC<Props> = ({ addField, ...rest }) => {
    const translate = useTranslate();
    return (
        <SelectInput
            {...rest}
            choices={menutypes.map(menutype => ({
                id: menutype.id,
                name: translate(menutype.name),
            }))}
        />
    );
};

MenuTypeInput.defaultProps = {
    addField: true,
    source: 'menu',
    resource: 'links',
};

export default MenuTypeInput;
