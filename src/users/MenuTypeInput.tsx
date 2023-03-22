import React, { FC } from 'react';
import { SelectInput } from 'react-admin';
import { InputProps } from 'ra-core';

import menutypes from './menutypes';

interface Props extends Omit<InputProps, 'source'> {
    source?: string;
}

const MenuTypeInput: FC<Props> = (props) => {

    return (
        <SelectInput
            {...props}
            choices={menutypes.map(menutype => ({
                id: menutype.id,
                name: menutype.name,
            }))}
        />
    );
};

MenuTypeInput.defaultProps = {
    source: 'role',
    resource: 'users',
};

export default MenuTypeInput;
