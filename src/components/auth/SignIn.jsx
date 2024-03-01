import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography
} from '@mui/material';
import RutokenWrapper from "../../plugins/RutokenWrapper";
import {useDispatch, useSelector} from "react-redux";
import {login, register, startAuthentication} from "../../store/auth/action";
import {useNavigate} from "react-router-dom";

const SignInPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error, isLoading, data} = useSelector(state => state.authReducer);

    const submit = (sign) => {
        const request = {
            key: data.key,
            sign: sign
        }
        dispatch(login(request));
        navigate("/")
    }

    useEffect(() => {
        dispatch(startAuthentication());
    }, []);





    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Sign In
            </Typography>
            <RutokenWrapper buttonName="Signin" submit={submit} data={data.randomToken}/>
        </Container>
    );
};

export default SignInPage;