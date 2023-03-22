import { gql } from '@apollo/client';
import {
    /*availableCurvesTest,*/
    getPublicKey,
    decryptTextByPubKeys,
    encryptTextByPubKeys,
    salt2iterations, pkeAlgo, pkeSaltLength,/*, testHell*/
    encryptText,
    decryptText,
} from './pkelib';
import { getClient, setWebSocketLink } from '../lib/apollo';
import { authLogger } from "./authLogger";

let crypto; //

const invalid_user_name_or_password = 'auth.invalid_user_name_or_password';

const getServerToken = gql`query getServerToken($id: ID!) {
                            func(id: $id) {
                                token
                            }
                        }`;

const getUserToken = gql`mutation getUserToken($id: ID!, $login: String!, $password: String!) {
                            signIn(id: $id, login: $login, password: $password) {
                                token
                            }
                        }`;

const updateUserToken = gql`mutation updateUserToken($id: ID!, $data: String!) {
                            update(id: $id, data: $data) {
                                token
                            }
                        }`;

const logoutToken = gql`mutation logoutToken($id: ID!) {
                            logout(id: $id) {
                                token
                            }
                        }`;

export const authLogin = async ({username, password}) => { //must return: Promise<any>
    sessionStorage.clear();
    // console.log("zv authLogin login args: ", username, password);
    if (!crypto) {
        try {
            crypto = require('crypto');
        } catch (err) {
            return await authLogger('login', `Browser: crypto support disabled! ${err.message}`);
        }
    }
    // testHell();
    let errMessage;
    const cpk = getPublicKey();
    // const dn = Date.now();
    const client = getClient();
    const serverResult = await client.query({
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
        query: getServerToken,
        variables: { id: cpk},
    }).then(result => {
        // console.log("zv apolloClient query result:", {...result.data});
        return result.data;
    }).catch(err => {
        errMessage = err.message;
        // console.log("zv apolloClient query error:", err.message);
    });

    const bobPubKey = (serverResult && serverResult.func && serverResult.func.token) || null;
    // console.log("zv bobPubKey:", bobPubKey);

    if (!bobPubKey || typeof bobPubKey !== 'string' || bobPubKey.length < cpk.length) {
        return await authLogger('login:server error', errMessage ? errMessage: 'server fault');
    }

    const { hashedName, password: pass, servPubKey, salt } = getHashedVars(cpk, bobPubKey, username, password);
    password= pass;

    if (!hashedName || !password) {
        return await authLogger('login', "Browser doesn't support stable cryptography");
    }

    const netUserToken = await client.mutate({
        fetchPolicy: 'no-cache', /*zv: mutations network-only not supports*/
        errorPolicy: 'all',
        mutation: getUserToken,
        variables: { id: cpk, login: hashedName, password },
    }).then(result => {
        // console.log("zv apolloClient mutate result:", {...result.data});
        return result.data;
    }).catch(async err => {
        errMessage = err.message;
        console.log("zv apolloClient mutate error:", err.message);
    });

    if (typeof errMessage === 'string') {
        return await authLogger('login:getUserToken error', errMessage);
    }

    const userToken = (netUserToken && netUserToken.signIn && netUserToken.signIn.token) || null;

    if (typeof userToken !== 'string') {
        return await authLogger('login:error', invalid_user_name_or_password); //no need logger
    }

    if (userToken.length < 4) { //server 403 response...
        return Promise.reject(invalid_user_name_or_password);
    }

    const userAndRole = decryptTextByPubKeys(userToken, cpk, servPubKey, salt);

    if (!userAndRole) {
        return await authLogger('login:norole', invalid_user_name_or_password);
    }

    if (userAndRole.indexOf(username)) {
        return await authLogger(`login:wrong: ${userAndRole.toString()}`, invalid_user_name_or_password);
    }

    const roleAndId = userAndRole.substr(username.length);
    const roleAndIdArr = roleAndId.split('.');
    if (roleAndIdArr.length !== 2 || !roleAndIdArr[0] || !roleAndIdArr[1]) {
        return await authLogger(`cargo:wrong: ${userAndRole.toString()}`, invalid_user_name_or_password);
    }
    //all ok...
    setWebSocketLink(cpk);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('id', cpk); 
    sessionStorage.setItem('ids', bobPubKey);
    sessionStorage.setItem('id0', encryptData(roleAndId, cpk, "".concat(bobPubKey.substring(7,cpk.length-username.length))));
    // console.log("zv login ok: (username,role,id):", username, userAndRole.substr(username.length), cpk);
    return Promise.resolve(); // or Promise.reject();
};

const getHashedVars = (cpk, bobPubKey, username, password) => {
    let salt = bobPubKey.substring(cpk.length);
    const servPubKey = bobPubKey.substring(0, cpk.length);
    salt = decryptTextByPubKeys(salt, cpk, servPubKey);
    const hashedName = encryptTextByPubKeys(username, cpk, servPubKey, salt);
    password = crypto.pbkdf2Sync(password, salt, salt2iterations(salt), pkeSaltLength(), pkeAlgo()).toString('hex'); // encryptTextByPubKeys(password, cpk, bobPubKey, salt);
    return { hashedName, password, servPubKey, salt };
};

const encryptData = (data, cpk, bpk) => {
    let result;
    try {
        result = encryptText(data, cpk, bpk);
    } catch (error) {
        console.log('..zv: some error: e1');
    }
    return result;
};
const decryptData = (data, cpk, bpk) => {
    let result;
    try {
        result = decryptText(data, cpk, bpk);
    } catch (error) {
        console.log('..zv: some error: d2');
    }
    return result;
};

export const getUserData = () => {
    const cpk = sessionStorage.getItem('id');
    const bobPK = sessionStorage.getItem('ids');
    const username = sessionStorage.getItem('username') || 'anonim';
    const roleAndId = (!!cpk && !!bobPK) ? decryptData(sessionStorage.getItem('id0') || '--', cpk, "".concat(bobPK.substring(7,cpk.length-username.length))): null;
    const roleId = roleAndId ? roleAndId.split('.') : null;
    if (!roleId || roleId.length !== 2 || !roleId[0] || !roleId[1]) {
        return ;
    }
    return {username, role: roleId[0], id: parseInt(roleId[1]) || 0};
}

export const changePass = async (oldPass, newPass) => {
    const user = sessionStorage.getItem('username');
    const cpk = sessionStorage.getItem('id');
    const ids = sessionStorage.getItem('ids');
    if (cpk && ids && user && oldPass && newPass) {
        const { hashedName, password, servPubKey, salt } = getHashedVars(cpk, ids, user, oldPass);
        oldPass = password;
        if (!hashedName || !password || oldPass !== password) return false;
        let errMessage;
        const client = getClient();
        const netUserToken = await client.mutate({
            fetchPolicy: 'no-cache', /*zv: mutations network-only not supports*/
            errorPolicy: 'all',
            mutation: getUserToken,
            variables: { id: cpk, login: hashedName, password },
        }).then(result => {
            return result.data;
        }).catch(async err => {
            errMessage = err.message;
            console.log("zv apolloClient mutate error:", err.message);
        });
        if (typeof errMessage === 'string') {
            return false;
        }
        const userToken = (netUserToken && netUserToken.signIn && netUserToken.signIn.token) || null;
        if (typeof userToken !== 'string' || userToken.length < 4) {
            return false;
        }
        const userAndTicket = decryptTextByPubKeys(userToken, cpk, servPubKey, salt);
        if (!userAndTicket || userAndTicket.indexOf(user) || userAndTicket.length < user.length+16) {
            return false;
        }
        const data = encryptTextByPubKeys(newPass, cpk, servPubKey, userAndTicket.substr(user.length));
        newPass = password; if (newPass !== password) return false;

        const netUpdateUserToken = await client.mutate({
            fetchPolicy: 'no-cache', /*zv: mutations network-only not supports*/
            errorPolicy: 'all',
            mutation: updateUserToken,
            variables: { id: cpk, data },
        }).then(result => {
            return result.data;
        }).catch(async err => {
            errMessage = err.message;
            console.log("zv apolloClient mutate error:", err.message);
        });
        if (typeof errMessage === 'string') return false;
        const userUpdatedToken = (netUpdateUserToken && netUpdateUserToken.update && netUpdateUserToken.update.token) || null;
        return (typeof userUpdatedToken === 'string' && userUpdatedToken.length > 4);
    }
    return false;
};

export const authLogout = async (args) => { //must return: Promise<any>
    const id = sessionStorage.getItem('id');
    sessionStorage.clear();
    if (id) {
        const client = getClient();
        client.mutate({
            fetchPolicy: 'no-cache', /*zv: mutations network-only not supports*/
            errorPolicy: 'all',
            mutation: logoutToken,
            variables: { id },
        }).then(result => {
            return result;
        }).catch(async err => {
            console.log("zv apolloClient logout mutate error:", err.message);
        });
    }
    return Promise.resolve();
};
