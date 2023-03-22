import React from 'react';
import {
    Card,
    CardContent,
    Button,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
} from '@material-ui/core';
import { useTranslate, useNotify } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import {Visibility, VisibilityOff, Person} from "@material-ui/icons";
import {changePass} from "../auth/authLogin";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: 200,
    },
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
}));

interface State {
    oldPassword: string;
    newPassword: string;
    showOldPassword: boolean;
    showNewPassword: boolean;
}
const ConfigSecurity = () => {
    const notify = useNotify();

    const updatePass = async () => {
        const op = "".concat(values.oldPassword);
        const np = "".concat(values.newPassword);
        setValues({ ...values, oldPassword: '', newPassword: '' });
        if (await changePass(op, np)) {
            notify('config.password_changed', 'message');
        } else {
            notify('auth.invalid_user_name_or_password', 'warning');
        }
    };
    const translate = useTranslate();
    const classes = useStyles();
    const [values, setValues] = React.useState<State>({
        oldPassword: '',
        newPassword: '',
        showOldPassword: false,
        showNewPassword: false,
    });
    const handleChange = (prop:string) => (event:any) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = (prop: string) => () => {
        // @ts-ignore
        setValues({ ...values, [prop]: !values[prop] });
    };
    const handleMouseDownPassword = (event:any) => {
        event.preventDefault();
    };
    return (
        <Card>
            <CardContent>
                <IconButton className={classes.root}>
                    <Person/>
                </IconButton>
                <div className={classes.label}>
                    {sessionStorage.getItem('username')}
                </div>
            </CardContent>
            <CardContent>
                <FormControl variant="outlined" >
                    <InputLabel>{translate('config.current_password')}</InputLabel>
                    <Input
                        type={values.showOldPassword ? 'text' : 'password'}
                        value={values.oldPassword}
                        onChange={handleChange('oldPassword')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword('showOldPassword')}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showOldPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </CardContent>
            <CardContent>
                <FormControl variant="outlined" >
                    <InputLabel>{translate('config.new_password')}</InputLabel>
                    <Input
                        type={values.showNewPassword ? 'text' : 'password'}
                        value={values.newPassword}
                        onChange={handleChange('newPassword')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword('showNewPassword')}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showNewPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </CardContent>
            <CardContent>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => updatePass()}
                >
                    {translate('config.change_password')}
                </Button>
            </CardContent>
        </Card>
    );
};

export default ConfigSecurity;
/*
                <TextField
                    variant="outlined"
                    // id="current-password-input"
                    value={values.oldPassword}
                    onChange={handleChange("oldPassword")}
                    label={translate('config.current_password')}
                    type={values.showOldPassword ? 'text' : 'password'}
                />
 */