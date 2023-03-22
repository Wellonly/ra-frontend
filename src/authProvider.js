export default {
    login: ({ username, password }) => {
        console.log("zv:", username, password); //Debug only
        if (username === 'well' && password === '123' ) {
            localStorage.setItem('username', username);
            return Promise.resolve();
        }
        localStorage.removeItem('username');
        return Promise.reject();
    },
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.reject('Unknown method'),
};
