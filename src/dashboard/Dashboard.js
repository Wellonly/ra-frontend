import React, { useState, useEffect, useCallback } from 'react';
import { useVersion, useDataProvider } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

import Welcome from './Welcome';
import MonthlyRevenue from './MonthlyRevenue';
import NbNewOrders from './NbNewOrders';
import PendingOrders from './PendingOrders';
import PendingReviews from './PendingReviews';
import NewCustomers from './NewCustomers';
import config from '../config';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

const Dashboard = () => {
    const [state, setState] = useState({});
    const version = useVersion();
    const dataProvider = useDataProvider();
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const fetchOrders = useCallback(async () => {
        const aMonthAgo = new Date();
        aMonthAgo.setDate(aMonthAgo.getDate() - 30);
        const { data: recentOrders } = await dataProvider.getList('commands', {
            filter: { date_gte: aMonthAgo.toISOString() },
            sort: { field: 'date', order: 'DESC' },
            pagination: { page: 1, perPage: 50 },
        });
        const aggregations = recentOrders
            .filter(order => order.status !== 'cancelled')
            .reduce(
                (stats, order) => {
                    if (order.status !== 'cancelled') {
                        stats.revenue += order.total;
                        stats.nbNewOrders++;
                    }
                    if (order.status === 'ordered') {
                        stats.pendingOrders.push(order);
                    }
                    return stats;
                },
                {
                    revenue: 0,
                    nbNewOrders: 0,
                    pendingOrders: [],
                }
            );
        setState(state => ({
            ...state,
            revenue: aggregations.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: config.currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            nbNewOrders: aggregations.nbNewOrders,
            pendingOrders: aggregations.pendingOrders,
        }));
        const { data: customers } = await dataProvider.getMany('customers', {
            ids: aggregations.pendingOrders.map(order => order.customer_id),
        });
        setState(state => ({
            ...state,
            pendingOrdersCustomers: customers.reduce((prev, customer) => {
                prev[customer.id] = customer; // eslint-disable-line no-param-reassign
                return prev;
            }, {}),
        }));
    }, [dataProvider]);

    const fetchReviews = useCallback(async () => {
        const { data: reviews } = await dataProvider.getList('reviews', {
            filter: { status: 'pending' },
            sort: { field: 'date', order: 'DESC' },
            pagination: { page: 1, perPage: 100 },
        });
        const nbPendingReviews = reviews.reduce(nb => ++nb, 0);
        const pendingReviews = reviews.slice(0, Math.min(10, reviews.length));
        setState(state => ({ ...state, pendingReviews, nbPendingReviews }));
        const { data: customers } = await dataProvider.getMany('customers', {
            ids: pendingReviews.map(review => review.customer_id),
        });
        setState(state => ({
            ...state,
            pendingReviewsCustomers: customers.reduce((prev, customer) => {
                prev[customer.id] = customer; // eslint-disable-line no-param-reassign
                return prev;
            }, {}),
        }));
    }, [dataProvider]);

    useEffect(() => {
        fetchOrders();
        fetchReviews();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    const {
        nbNewOrders,
        nbPendingReviews,
        pendingOrders,
        pendingOrdersCustomers,
        pendingReviews,
        pendingReviewsCustomers,
        revenue,
    } = state;
    return isXSmall ? (
        <div>
            <div style={styles.flexColumn}>
                <div style={{ marginBottom: '2em' }}>
                    <Welcome />
                </div>
                <div style={styles.flex}>
                    <MonthlyRevenue value={revenue} />
                    <NbNewOrders value={nbNewOrders} />
                </div>
                <div style={styles.singleCol}>
                    <PendingOrders
                        orders={pendingOrders}
                        customers={pendingOrdersCustomers}
                    />
                </div>
            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn}>
            <div style={styles.singleCol}>
                <Welcome />
            </div>
            <div style={styles.flex}>
                <MonthlyRevenue value={revenue} />
                <NbNewOrders value={nbNewOrders} />
            </div>
            <div style={styles.singleCol}>
                <PendingOrders
                    orders={pendingOrders}
                    customers={pendingOrdersCustomers}
                />
            </div>
        </div>
    ) : (
        <div style={styles.flex}>
            <div style={styles.leftCol}>
                <div style={styles.flex}>
                    <MonthlyRevenue value={revenue} />
                    <NbNewOrders value={nbNewOrders} />
                </div>
                <div style={styles.singleCol}>
                    <Welcome />
                </div>
                <div style={styles.singleCol}>
                    <PendingOrders
                        orders={pendingOrders}
                        customers={pendingOrdersCustomers}
                    />
                </div>
            </div>
            <div style={styles.rightCol}>
                <div style={styles.flex}>
                    <PendingReviews
                        nb={nbPendingReviews}
                        reviews={pendingReviews}
                        customers={pendingReviewsCustomers}
                    />
                    <NewCustomers />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
