import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import {
    FaFacebookSquare,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
} from 'react-icons/fa';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/styles';
import Style from '../styles/component/contactForm';

const useStyles = makeStyles(theme => {
    return {
        textField: {
            margin: theme.spacing,
            width: '100%',
        },
        margin: {
            margin: '20px 0',
        },
    };
});

const ContactForm = ({ classes }) => {
    const muiClasses = useStyles();
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: '',
        response: '',
    });
    return (
        <div className={classes.wrapper}>
            <form className={classes.form}>
                <p>Get in touch with me</p>
                <p>{values.response}</p>
                <TextField
                    id="outlined-name"
                    label="Name"
                    className={muiClasses.textField}
                    value={values.name}
                    onChange={e => {
                        setValues({ ...values, name: e.target.value });
                    }}
                    margin="normal"
                    variant="outlined"
                    type="email"
                />
                <TextField
                    id="outlined-name"
                    label="Email"
                    className={muiClasses.textField}
                    value={values.email}
                    onChange={e => {
                        setValues({ ...values, email: e.target.value });
                    }}
                    margin="normal"
                    variant="outlined"
                    type="email"
                />
                <TextField
                    id="outlined-name"
                    label="Message"
                    className={muiClasses.textField}
                    multiline
                    rows="6"
                    value={values.message}
                    onChange={e => {
                        setValues({ ...values, message: e.target.value });
                    }}
                    margin="normal"
                    variant="outlined"
                />
                <div className={classes.footer}>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={muiClasses.margin}
                        onClick={() => {
                            const dataForm = new FormData();
                            dataForm.append('email', values.email);
                            dataForm.append('name', values.name);
                            dataForm.append('message', values.name);

                            fetch(
                                `http://deeppanchal.com/php/mail_get.php?name=${encodeURI(
                                    values.name,
                                )}&email=${encodeURI(
                                    values.email,
                                )}&message=${encodeURI(values.message)}`,
                            )
                                .then(response => {
                                    return response.json();
                                })
                                .then(data => {
                                    setValues({
                                        ...values,
                                        response: data.msg,
                                    });
                                });
                        }}
                    >
                        Send
                    </Button>
                    <div>
                        <IconButton
                            aria-label="twitter"
                            className={classes.margin}
                            onClick={() => {
                                return window.open(
                                    'http://twitter.com/deeprpanchal/',
                                    '_blank',
                                );
                            }}
                        >
                            <FaTwitter />
                        </IconButton>
                        <IconButton
                            aria-label="twitter"
                            className={classes.margin}
                            onClick={() => {
                                return window.open(
                                    'http://linkedin.com/in/deeprpanchal/',
                                    '_blank',
                                );
                            }}
                        >
                            <FaLinkedin />
                        </IconButton>
                        <IconButton
                            aria-label="Facebook"
                            className={classes.margin}
                            onClick={() => {
                                return window.open(
                                    'http://fb.me/deeprpanchal/',
                                    '_blank',
                                );
                            }}
                        >
                            <FaFacebookSquare />
                        </IconButton>
                        <IconButton
                            aria-label="Instagram"
                            className={classes.margin}
                            onClick={() => {
                                return window.open(
                                    'http://instagram.com/deeprpanchal/',
                                    '_blank',
                                );
                            }}
                        >
                            <FaInstagram />
                        </IconButton>
                    </div>
                </div>
            </form>
        </div>
    );
};

ContactForm.propTypes = {
    classes: PropTypes.objectOf(PropTypes.any),
};

export default withStyles(Style)(ContactForm);
