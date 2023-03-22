import { stringify } from 'query-string';
import {fetchUtils, DataProvider} from 'ra-core';

const resultCheck = (callFrom: string, result: any): any => {
    console.log("...zv", callFrom, "result:", result);
    if (!result || !result.json) throw new Error("httpClient error");
    if (result.json.message) throw new Error(`Server error:${result.json.statusCode}; ${result.json.message}`);
};

/**
 * Maps react-admin queries to a simple REST API
 *
 * This REST dialect is similar to the one of FakeRest
 *
 * @see https://github.com/marmelab/FakeRest
 *
 * @example
 *
 * getList     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * getOne      => GET http://my.api.url/posts/123
 * getMany     => GET http://my.api.url/posts?filter={id:[123,456,789]}
 * update      => PUT http://my.api.url/posts/123
 * create      => POST http://my.api.url/posts
 * delete      => DELETE http://my.api.url/posts/123
 *
 * @example
 *
 * import React from 'react';
 * import { Admin, Resource } from 'react-admin';
 * import simpleRestProvider from 'ra-data-simple-rest';
 *
 * import { PostList } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={simpleRestProvider('http://path.to.my.api/')}>
 *         <Resource name="posts" list={PostList} />
 *     </Admin>
 * );
 *
 * export default App;
 */
export default (apiUrl: string, httpClient = fetchUtils.fetchJson): DataProvider => ({
    getList: (resource, params) => {
        console.log(`zv getList(${resource}, params):`, params);
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: `{"${field}":"${order.toLowerCase()}"}`,
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then((result) => {
            resultCheck("getList()", result);
            return {
                data: result.json.data,
                total: result.json.total
            };
        });
    },

    getOne: (resource, params) => {
        console.log(`zv getOne(${resource}, params):`, params);
        return httpClient(`${apiUrl}/${resource}/${params.id}`).then((result) => {
            resultCheck(`getOne(${params.id})`, result);
            return {
                data: result.json.data,
            };
        });
    },

    getMany: (resource, params) => {
        console.log(`zv getMany(${resource}, params):`, params);
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then((result) => {
            resultCheck(`getMany(${stringify(params.ids)})`, result);
            return {
                data: result.json.data
            };
        });
    },

    getManyReference: (resource, params) => {
        console.log(`zv getManyReference(${resource}, params):`, params);
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: `{"${field}":"${order.toLowerCase()}"}`,
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then((result) => {
            resultCheck("getManyReference()", result);
            return {
                data: result.json.data,
                total: result.json.total
            };
        });
    },

    update: (resource, params) => {
        console.log(`zv update(${resource}, params):`, params);
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then((result) => { //data: json
            resultCheck(`update(${params.id})`, result);
            return {
                data: result.json.data
            };
        });
    },

    // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
    updateMany: (resource, params) => {
        console.log(`zv updateMany(${resource}, params):`, params);
        return Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                })
            )
        ).then(responses => {
            console.log("zv updateMany(responses):", responses);
            return {
                data: responses.map((result) => {
                    resultCheck("updateMany()", result);
                    return result.json.data;
                })
            };
        });
    },

    create: (resource, params) => {
        console.log(`zv create(${resource}, params):`, params);
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then((result) => {
            resultCheck("create()", result);
            return {data: result.json.data};
        });
    },

    delete: (resource, params) => {
        console.log(`zv delete(${resource}, params):`, params);
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then((result) => {
            resultCheck(`delete(${params.id})`, result);
            return {
                data: result.json.data
            };
        });
    },

    // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    deleteMany: (resource, params) => {
        console.log(`zv deleteMany(${resource}, params):`, params);
        return Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                })
            )
        ).then(responses => { //old: id returns
            console.log("zv deleteMany(responses):", responses);
            return {
                data: responses.map((result) => {
                    resultCheck("deleteMany()", result);
                    return result.json.data;
                })
            }
        });
    },
});
