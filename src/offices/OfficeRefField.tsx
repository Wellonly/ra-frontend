import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { FieldProps, Office } from '../types';

const OfficeRefField: FC<FieldProps<Office>> = ({ record }) =>
    record ? (
        <Link to={`/offices/${record.id}`}>{record.title}</Link>
    ) : null;

OfficeRefField.defaultProps = {
    source: 'id',
    label: 'Reference',
};

export default OfficeRefField;
