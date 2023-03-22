import { AuthProvider } from 'ra-core';
import {authLogin, authLogout, getUserData} from "./authLogin";
import { authLogger } from "./authLogger";

const authProvider: AuthProvider = {
    login: async (args) => { // { username }
        // sessionStorage.setItem('username', args.username);
        // console.log("zv authProvider login args: ", { ...args});
        // return Promise.resolve(); // Promise.resolve(): accept username/password combination
        try {
            return authLogin({...args});
        } catch (err) {
            return await authLogger('login', err.message);
        }
    },
    logout: async (args) => {
        // console.log("zv authProvider logout args: ", { ...args});
        try {
            return authLogout(args);
        } catch (err) {
            return await authLogger('logout', err.message);
        }
    },
    checkError: (error) => {
        console.log("zv authProvider checkError args: status:", error.status, { ...error});
        // const status = error.status;
        // if (status === 401 || status === 403) {
        //     localStorage.removeItem('token');
        //     return Promise.reject();
        // }
        return authLogger('checkError', error.message, true); // return Promise.resolve();
    },
    checkAuth: (args) => { // args: { route: "dashboard" }
        // console.log("zv authProvider checkAuth args: ", { ...args});
        const uname = sessionStorage.getItem('username');
        if (!uname) {
            return Promise.reject(); // { redirectTo: '/no-access' }
        }
        return Promise.resolve();
    },
    getPermissions: (args) => {
        // console.log("zv authProvider getPermissions args: ", { ...args});
        const roleAndId = getUserData();
        if (!roleAndId) {
            return Promise.reject('zv: something wrong'); // { redirectTo: '/no-access' }
        }
        return Promise.resolve(roleAndId);
    },
};

export default authProvider;
