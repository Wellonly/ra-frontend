import React, {Fragment} from 'react';
import {
    Datagrid,
    EditButton,
    Filter,
    List,
    NumberField,
    SearchInput,
    TextField,
    useTranslate,
} from 'react-admin';
import {
    makeStyles,
    Divider,
    Tabs,
    Tab,
} from '@material-ui/core';
import menutypes from './menutypes';

const LinkFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
);

const useDatagridStyles = makeStyles({
    total: { fontWeight: 'bold' },
});

const TabLabel = ({name}) => {
  const translate = useTranslate();
  return (
    <span> {translate(name)}</span>
  );
};

class TabbedDatagrid extends React.Component {

    state = {}; // state = { top: [], left: [], bottom: [] };

    static getDerivedStateFromProps(props, state) {
        if (props.ids !== state[props.filterValues.menu]) {
            return { ...state, [props.filterValues.menu]: props.ids };
        }
        return null;
    }

    handleChange = (event, value) => {
        const { filterValues, setFilters } = this.props;
        setFilters({ ...filterValues, menu: value });
    };

    render() {
        const { classes, filterValues, ...props } = this.props;
        // const translate = useTranslate();
        return (
            <Fragment>
                <Tabs
                    variant="fullWidth"
                    centered
                    value={filterValues.menu}
                    indicatorColor="primary"
                    onChange={this.handleChange}
                >
                  {menutypes.map(tab => (
                    <Tab
                      key={tab.id}
                      label={<TabLabel name={tab.name}/>}
                      value={tab.id}
                    />
                  ))}
                </Tabs>
                <Divider />
                <div>
                  <Datagrid
                    {...props}
                    ids={this.state[filterValues.menu]}
                    rowClick="edit"
                  >
                    <NumberField source="priority" className={classes.total}/>
                    <TextField source="label" />
                    <TextField source="slug" />
                    <TextField source="icon" />
                    <TextField source="component" />
                    <EditButton />
                  </Datagrid>
                </div>
            </Fragment>
        );
    }
}

const StyledTabbedDatagrid = (props) => {
    const classes = useDatagridStyles();
    return <TabbedDatagrid classes={classes} {...props} />;
};

const LinkList = ({ classes, ...props }) => {
    return (
        <List
            {...props}
            filterDefaultValues={{menu: 'top'}}
            sort={{field: 'priority', order: 'ASC'}}
            perPage={25}
            filters={<LinkFilter/>}
        >
            <StyledTabbedDatagrid/>
        </List>
    );
};

export default LinkList;
