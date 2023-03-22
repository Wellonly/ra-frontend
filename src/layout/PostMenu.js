import React from 'react';
import SubMenu from './SubMenu';

export default function (props) {


  return (
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
  );
}