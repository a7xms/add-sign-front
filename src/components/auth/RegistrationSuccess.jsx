import React from 'react';
import {CheckCircleOutlined} from "@mui/icons-material"
import {Button, Container, Icon, Typography} from "@mui/material";
import {useSelector} from "react-redux";

const RegistrationSuccess = () => {
    const userData = useSelector(state => state.authReducer.userData);

    return (
        <Container maxWidth="sm">
            <Typography component="h1" variant="h5" align="center" gutterBottom>
                Registration Successful
            </Typography>
            <Icon color="primary" fontSize="large">
                <CheckCircleOutlined />
            </Icon>
            <Typography variant="body1" align="center" gutterBottom>
                Congratulations, {userData.fullName}, your registration is complete! You can now log in to your account.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                href="/signin"
            >
                Go to Login
            </Button>
        </Container>
    );
};

export default RegistrationSuccess;