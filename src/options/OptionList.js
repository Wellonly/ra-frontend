import React, {Fragment} from 'react';
import {
    Datagrid,
    EditButton,
    Filter,
    List,
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
import grouptypes from './grouptypes';

const OptionFilter = (props) => (
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
    state = {};

    static getDerivedStateFromProps(props, state) {
        if (props.ids !== state[props.filterValues.group]) {
            return { ...state, [props.filterValues.group]: props.ids };
        }
        return null;
    }

    handleChange = (event, value) => {
        const { filterValues, setFilters } = this.props;
        setFilters({ ...filterValues, group: value });
    };

    render() {
        const { classes, filterValues, ...props } = this.props;
        // const translate = useTranslate();
        return (
            <Fragment>
                <Tabs
                    variant="fullWidth"
                    centered
                    value={filterValues.group}
                    indicatorColor="primary"
                    onChange={this.handleChange}
                >
                  {grouptypes.map(tab => (
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
                    ids={this.state[filterValues.group]}
                    rowClick="edit"
                  >
                    <TextField source="group" />
                    <TextField source="name" />
                    <TextField source="value" />
                    <TextField source="descript" />
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

const OptionList = ({ classes, ...props }) => {
    return (
        <List
            {...props}
            filterDefaultValues={{group: 'system'}}
            sort={{field: 'name', order: 'ASC'}}
            perPage={25}
            filters={<OptionFilter/>}
        >
            <StyledTabbedDatagrid/>
        </List>
    );
};

export default OptionList;
