// import React, { useState, useEffect } from 'react';
import React from 'react';
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import './App.css';

import authProvider from './authProvider';
import themeReducer from './themeReducer';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import customRoutes from './routes';
import englishMessages from './i18n/en';

import visitors from './visitors';
import orders from './orders';
import products from './products';
import invoices from './invoices';
import categories from './categories';
import reviews from './reviews';

import { fetchUtils } from 'ra-core';
import restDataProvider from './dataProvider/RestDataProvider';
//import dataProviderFactory from './dataProvider';
// import fakeServerFactory from './fakeServer';
// import jsonServerProvider from 'ra-data-json-server';

const i18nProvider = polyglotI18nProvider(locale => {
        if (locale === 'fr') {
            return import('./i18n/fr').then(messages => messages.default);
        }
        // Always fallback on english
        return englishMessages;
    }
, 'en');

const App = () => {
    // const [dataProvider, setDataProvider] = useState(null);
    //
    // useEffect(() => {
    //     let restoreFetch;
    //
    //     const fetchDataProvider = async () => {
    //         restoreFetch = await fakeServerFactory(
    //             process.env.REACT_APP_DATA_PROVIDER
    //         );
    //
    //         setDataProvider(
    //             await dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER)
    //         );
    //     };
    //
    //     fetchDataProvider();
    //
    //     return restoreFetch;
    // }, []);

//next from package.json...
    //        "data-generator-retail": "^3.0.0",
    //         "fakerest": "~2.1.0",
    //         "ra-data-fakerest": "^3.0.0",
    //         "ra-data-simple-rest": "^3.0.0",

    const fetchJson = (url, options = {}) => {
        options.user = {
            authenticated: true,
            token: 'SRTRDFVESGNJYTUKTYTHRG'
        };
        return fetchUtils.fetchJson(url, options);
    };

    const dataProvider = restDataProvider('http://localhost:5000', fetchJson);

    if (!dataProvider) {
        return (
            <div className="loader-container">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return (
        <Admin
            title=""
            dataProvider={dataProvider}
            customReducers={{ theme: themeReducer }}
            customRoutes={customRoutes}
            authProvider={authProvider}
            dashboard={Dashboard}
            loginPage={Login}
            layout={Layout}
            i18nProvider={i18nProvider}
        >
            <Resource name="customers" {...visitors} />
            <Resource
                name="commands"
                {...orders}
                options={{ label: 'Orders' }}
            />
            <Resource name="invoices" {...invoices} />
            <Resource name="products" {...products} />
            <Resource name="categories" {...categories} />
            <Resource name="reviews" {...reviews} />
        </Admin>
    );
};

export default App;
