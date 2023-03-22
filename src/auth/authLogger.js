// import { gql } from 'apollo-boost';
import { gql } from '@apollo/client';
import { getClient } from '../lib/apollo';

const logMutate = gql`mutation Log($id: ID!, $path: String, $message: String) {
                                createLog(id: $id, path: $path, message: $message) {
                                    token
                                }
                            }`;

export const authLogger = async (path, message, resolveOrReject = false) => { //must return: Promise.resolve(); or Promise.reject();
    const id = sessionStorage.getItem('id') || '0';
    const client = getClient();

    await client.mutate({
        fetchPolicy: 'no-cache', /*zv: mutations network-only not supports*/
        errorPolicy: 'all',
        mutation: logMutate,
        variables: { id, path: "".concat('front.',path), message },
    }).then(result => {
        // console.log("zv apolloClient mutate result:", {...result.data});
        // return result.data;
    }).catch(err => {
        // console.log("zv apolloClient mutate error:", err.message);
    });

    if (resolveOrReject) {
        return Promise.resolve();
    }
    return Promise.reject(message);
};