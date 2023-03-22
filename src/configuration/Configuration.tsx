import React from 'react';
import { Paper, Tabs, Tab, Typography, Box } from '@material-ui/core';
import {useTranslate, Title } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ConfigInterface from "./ConfigInterface";
import ConfigSecurity from "./ConfigSecurity";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
}));

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const Configuration = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };
    const translate = useTranslate();
    return (
        <div className={classes.root}>
            <Title title={translate('pos.configuration')} />
            <Paper square>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="config tabs"
                >
                    <Tab label={translate("config.interface")} />
                    <Tab label={translate("config.security")} />
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                <ConfigInterface />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ConfigSecurity/>
            </TabPanel>
        </div>
    );
};

export default Configuration;
