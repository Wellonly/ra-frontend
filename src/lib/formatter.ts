
export function imagesFieldFormatter(value: any) {
    if (Array.isArray(value)) {
        return value.reduce((acc, value) => {
            const ret = (typeof value === 'object' && value?.title) || value;
            return ret ? acc.concat(ret, ','): acc;
        },'');
    }
    return value || '';
}
