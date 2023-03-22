import React, { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Customer, FieldProps } from '../types';

interface Props extends FieldProps<Customer> {
    className?: string;
    size?: string;
}
const AvatarField: FC<Props> = ({ record, size, className }) =>
    record ? (
        <Avatar
            src={`${(typeof record.avatar === 'string' && record.avatar.substr(0, 4) === 'http') ? "": process.env.REACT_APP_MEDIA_HOST_URL}${record.avatar}?size=${size}x${size}`}
            sizes={size}
            style={{ width: size, height: size }}
            className={className}
        />
    ) : null;

AvatarField.defaultProps = {
    size: '25',
};

export default AvatarField;
