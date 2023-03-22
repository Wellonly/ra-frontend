import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import LabelIcon from '@material-ui/icons/Label';
import TuneIcon from '@material-ui/icons/Tune';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import { useMediaQuery, Theme } from '@material-ui/core';
import { useTranslate, DashboardMenuItem, MenuItemLink, usePermissions } from 'react-admin';

import visitors from '../visitors';
import orders from '../orders';
import invoices from '../invoices';
import products from '../products';
import categories from '../categories';
import collections from '../collections';
import reviews from '../reviews';
import links from '../links';
import sublinks from '../sublinks';
import carriers from '../carriers';
import cities from '../cities';
import offices from '../offices';
import paymethods from '../paymethods';
import options from '../options';
import users from '../users';
import folders from '../folders';
import messages from '../messages';

import SubMenu from './SubMenu';
import { AppState } from '../types';
import MenuMail from './MenuMail';
import { PLACE } from '../folders/commonFolders';

type MenuName = 'menuCatalog' | 'menuSales' | 'menuCustomers' | 'menuInfo' | 'menuOptions' | 'menuMail' | 'mailInbox' | 'mailOutbox';

interface Props {
    dense: boolean;
    logout: () => void;
    onMenuClick: () => void;
}

const Menu: FC<Props> = (props) => {
    const { onMenuClick, dense, logout } = props;
    const { permissions } = usePermissions();
    console.log('..zv: menu:', permissions/* , props */);
    const [state, setState] = useState({
        menuCatalog: false,
        menuSales: false,
        menuCustomers: false,
        menuInfo: false,
        menuOptions: false,
        menuMail: true,
        mailInbox: false,
        mailOutbox: false,
    });
    const translate = useTranslate();
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <div>
            {' '}
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            <SubMenu
                handleToggle={() => handleToggle('menuSales')}
                isOpen={state.menuSales}
                sidebarIsOpen={open}
                name="pos.menu.sales"
                icon={<orders.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/commands`}
                    primaryText={translate(`resources.commands.name`, {smart_count: 2})}
                    leftIcon={<orders.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/invoices`}
                    primaryText={translate(`resources.invoices.name`, {smart_count: 2})}
                    leftIcon={<invoices.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuCatalog')}
                isOpen={state.menuCatalog}
                sidebarIsOpen={open}
                name="pos.menu.catalog"
                icon={<products.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/products`}
                    primaryText={translate(`resources.products.name`, {smart_count: 2})}
                    leftIcon={<products.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/categories`}
                    primaryText={translate(`resources.categories.name`, {smart_count: 2})}
                    leftIcon={<categories.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/collections`}
                    primaryText={translate(`resources.collections.name`, {smart_count: 2})}
                    leftIcon={<collections.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuCustomers')}
                isOpen={state.menuCustomers}
                sidebarIsOpen={open}
                name="pos.menu.customers"
                icon={<visitors.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/customers`}
                    primaryText={translate(`resources.customers.name`, {smart_count: 2})}
                    leftIcon={<visitors.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/segments`}
                    primaryText={translate(`resources.segments.name`, {smart_count: 2})}
                    leftIcon={<LabelIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuInfo')}
                isOpen={state.menuInfo}
                sidebarIsOpen={open}
                name="pos.menu.info"
                icon={<links.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/links`}
                    primaryText={translate(`resources.links.name`, {smart_count: 2})}
                    leftIcon={<links.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/sublinks`}
                    primaryText={translate(`resources.sublinks.name`, {smart_count: 2})}
                    leftIcon={<sublinks.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/cities`}
                    primaryText={translate(`resources.cities.name`, { smart_count: 2})}
                    leftIcon={<cities.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/offices`}
                    primaryText={translate(`resources.offices.name`, { smart_count: 2})}
                    leftIcon={<offices.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/carriers`}
                    primaryText={translate(`resources.carriers.name`, {smart_count: 2})}
                    leftIcon={<carriers.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/paymethods`}
                    primaryText={translate(`resources.paymethods.name`, {smart_count: 2})}
                    leftIcon={<paymethods.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuMail')}
                isOpen={state.menuMail}
                sidebarIsOpen={open}
                name="pos.menu.mail"
                icon={<messages.icon />}
                dense={dense}
            >
                <SubMenu
                    handleToggle={() => handleToggle('mailOutbox')}
                    isOpen={state.mailOutbox}
                    sidebarIsOpen={open}
                    name="pos.menu.outbox"
                    icon={<ArrowUpward/>}
                    dense={dense}
                >
                    <MenuMail place={PLACE.outbox} dense={dense} sidebarIsOpen={open} onMenuClick={onMenuClick} />
                </SubMenu>
                <SubMenu
                    handleToggle={() => handleToggle('mailInbox')}
                    isOpen={state.mailInbox}
                    sidebarIsOpen={open}
                    name="pos.menu.inbox"
                    icon={<ArrowDownward/>}
                    dense={dense}
                >
                    <MenuMail place={PLACE.inbox} dense={dense} sidebarIsOpen={open} onMenuClick={onMenuClick} />
                </SubMenu>
            </SubMenu>
            <MenuItemLink
                to={`/reviews`}
                primaryText={translate(`resources.reviews.name`, {smart_count: 2})}
                leftIcon={<reviews.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            <SubMenu
                handleToggle={() => handleToggle('menuOptions')}
                isOpen={state.menuOptions}
                sidebarIsOpen={open}
                name="pos.menu.options"
                icon={<TuneIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/options`}
                    primaryText={translate(`resources.options.name`, {smart_count: 2})}
                    leftIcon={<options.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/users`}
                    primaryText={translate(`resources.users.name`, {smart_count: 2})}
                    leftIcon={<users.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/folders`}
                    primaryText={translate(`resources.folders.name`, {smart_count: 2})}
                    leftIcon={<folders.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/messages?filter=${JSON.stringify({folder: PLACE.inbox})}`} // to={`/messages`}
                    primaryText={translate(`resources.messages.name`, {smart_count: 2})}
                    leftIcon={<messages.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            {isXSmall && (
                <MenuItemLink
                    to="/configuration"
                    primaryText={translate('pos.configuration')}
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            )}
            {isXSmall && logout}
        </div>
    );
};

export default Menu;
