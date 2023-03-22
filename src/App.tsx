import React, {useState, useEffect} from 'react';
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import './App.css';

import authProvider from './auth/authProvider';
import themeReducer from './themeReducer';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import customRoutes from './routes';

import visitors from './visitors';
import orders from './orders';
import products from './products';
import invoices from './invoices';
import categories from './categories';
import collections from './collections';
import reviews from './reviews';
import links from './links';
import sublinks from './sublinks';
import carriers from './carriers';
import cities from './cities';
import offices from './offices';
import paymethods from './paymethods';
import options from './options';
import users from './users';
import folders from './folders';
import messages from './messages';

import dataProviderFactory from './dataProvider';

const i18nProvider = polyglotI18nProvider(locale => {
    const localeFromList = ['en','ru'].find(e => e === locale) || 'en';
    return require('./i18n/'.concat(localeFromList)).default; //import('./i18n/'.concat(locale)).default;
}, localStorage.getItem("locale") || process.env.REACT_APP_i18n || 'ru'); //zv: ru or en or fr

const App = () => {
    const [dataProvider, setDataProvider] = useState(null as any);

    useEffect(() => {
        const fetchDataProvider = async () => {
            const dataProviderInstance = await dataProviderFactory(
                process.env.REACT_APP_DATA_PROVIDER
            );
            setDataProvider(() => dataProviderInstance);
        };
        fetchDataProvider();
    }, []);

    if (!dataProvider) {
        return (
            <div className="loader-container">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return (
        <Admin
            title={process.env.REACT_APP_WEBSITE_NAME}
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
            <Resource name="collections" {...collections} />
            <Resource name="reviews" {...reviews} />
            <Resource name="links" {...links} />
            <Resource name="sublinks" {...sublinks} />
            <Resource name="carriers" {...carriers} />
            <Resource name="cities" {...cities} />
            <Resource name="offices" {...offices} />
            <Resource name="paymethods" {...paymethods} />
            <Resource name="options" {...options} />
            <Resource name="users" {...users} />
            <Resource name="folders" {...folders} />
            <Resource name="messages" {...messages} />
        </Admin>
    );
};

export default App;
