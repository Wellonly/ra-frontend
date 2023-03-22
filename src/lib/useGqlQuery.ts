import { useEffect } from 'react';
import {DocumentNode} from "graphql";
import { useSafeSetState } from './hooks';
import { getClient } from "./apollo";

/**
 * Call the data provider on mount
 *
 * The return value updates according to the request state:
 * - start: { loading: true, loaded: false }
 * - success: { data: [data from response], total: [total from response], loading: false, loaded: true }
 * - error: { error: [error from response], loading: false, loaded: true }
 *
 * @param {Object} query
 * @param {string} query.type The method called on the data provider, e.g. 'getList', 'getOne'. Can also be a custom method if the dataProvider supports is.
 * @param {string} query.resource A resource name, e.g. 'posts', 'comments'
 * @param {Object} query.payload The payload object, e.g; { post_id: 12 }
 * @param {Object} options
 * @param {string} options.action Redux action type
 * @param {Function} options.onSuccess Side effect function to be executed upon success of failure, e.g. { onSuccess: response => refresh() } }
 * @param {Function} options.onFailure Side effect function to be executed upon failure, e.g. { onFailure: error => notify(error.message) } }
 *
 * @returns The current request state. Destructure as { data, total, error, loading, loaded }.
 *
 * @example
 *
 * import { useGqlQuery } from '../lib/useGqlQuery';
 * const UserProfile = () => {
 *     const { data, loading, error } = useGqlQuery(gql, vars);
 *     if (loading) { return <Loading />; }
 *     if (error) { return <p>ERROR</p>; }
 *     return <div>User {data.username}</div>;
 * };
 *
 */
const useGqlQuery = (query: DocumentNode, variables?: object, options: QueryOptions = {}): UseQueryValue => {
    const { onSuccess, onError, ...rest } = options;
    const requestSignature = JSON.stringify({ query, variables, options: rest});
    const [state, setState] = useSafeSetState<UseQueryValue>({
        data: undefined,
        error: null,
        loading: true,
        loaded: false,
    });
    const client = getClient(); //    const dataProvider = useDataProvider();

    useEffect(() => {
        setState(prevState => ({ ...prevState, loading: true }));
        client.query({
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
          query,
          variables,
          ...rest
        }).then((response: any) => {
          console.log('..zv: client.query.response:', response);
          onSuccess && onSuccess(response);
          setState({
              data: response.data,
              loading: false,
              loaded: true,
          });
        }).catch(error => {
          setState({
              error,
              loading: false,
              loaded: false,
          });
        });
    }, [ client, query, variables, rest, setState, onSuccess, onError, requestSignature ]);
    return state;
};

export interface QueryOptions {
    onSuccess?: (response: any) => any | Object;
    onError?: (error?: any) => any | Object;
    [key: string]: any;
}

export type UseQueryValue = {
    data?: any;
    error?: any;
    loading: boolean;
    loaded: boolean;
};

export default useGqlQuery;
