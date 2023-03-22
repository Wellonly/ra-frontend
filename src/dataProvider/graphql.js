import buildApolloClient, {
    buildQuery as buildQueryFactory,
} from './ra-data-graphql-simple/src';
import { DELETE } from 'ra-core';
import gql from 'graphql-tag';
import pluralize from 'pluralize';
import {fileBlobToString64} from "./utils";
import { getClient } from '../lib/apollo';

/**
 * transform strings from: "cities" to "City"
 * @param {*} resource 
 */
function getGqlResource(resource) {
    const res = pluralize.singular(resource);
    return "".concat(res.charAt(0).toUpperCase(), res.substr(1)); 
};

const customBuildQuery = introspectionResults => {
    const buildQuery = buildQueryFactory(introspectionResults);

    return (type, resource, params) => {
        if (type === DELETE) {
            return {
                query: gql`mutation remove${resource}($id: ID!) {
                    remove${resource}(id: $id)
                }`,
                variables: { id: params.id },
                parseResponse: ({ data }) => {
                    if (data[`remove${resource}`]) {
                        return { data: { id: params.id } };
                    }

                    throw new Error(`Could not delete ${resource}`);
                },
            };
        }

        return buildQuery(type, resource, params);
    };
};

export default () => {
    return buildApolloClient({
        client: getClient(),
        introspection: {
            operationNames: {
                [DELETE]: resource => `remove${resource.name}`,
            },
        },
        buildQuery: customBuildQuery,
    }).then(dataProvider => async (type, resource, params) => {
        // console.log("zv: check dataProvider(", type, resource, params, ")");
        if (typeof dataProvider !== 'function') {
            throw new Error("Data provider problems...");
        }
        if ((type === 'CREATE' || type === 'UPDATE') &&
            (resource === 'products'
             || resource === 'links'
             || resource === 'sublinks'
             || resource === 'carriers'
             || resource === 'offices'
             || resource === 'paymethods'
            )) { //...above for resources with images field that we need to handle
              await manageImages(params, 'images');
              if (resource === 'products') await manageImages(params, 'artimages');
        }
        return dataProvider(type, getGqlResource(resource), params);

        async function manageImages(params, field = 'images') {
            if (params && params.data && Array.isArray(params.data[field])) { //transform images data array for send...
                // console.log("...zv:", type, resource, "; input params:", params); //WARN:browser show updated by next promise values!!!
                await Promise.all(params.data[field].map(img => {
                    if (typeof img === 'string') {
                        return {name: img};
                    }
                    return fileBlobToString64(img.rawFile).then(data => {
                        const base64 = data.indexOf(';base64,');
                        return {name: img.title, data: data.substring(base64+8)};
                    }).catch(err => {
                        return {name: img.title, data: "error:".concat(err.message)};
                    });
                })).then(arr => {
                    params.data[field] = arr;
                }).catch(err => {
                    throw new Error(err.message);
                });
            }
            else {
                params.data[field] = [{name: params.data[field]}];
            }
        }
    }).catch(err => console.log("..zv catch in buildApolloClient:", err));
};
