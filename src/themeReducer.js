import { CHANGE_THEME } from './configuration/actions';

export default (previousState = localStorage.getItem('theme') || 'light', { type, payload }) => {
    if (type === CHANGE_THEME) {
        localStorage.setItem('theme', payload);
        return payload;
    }
    return previousState;
};
