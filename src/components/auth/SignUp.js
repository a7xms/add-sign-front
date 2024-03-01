import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography
} from '@mui/material';
import RutokenWrapper from "../../plugins/RutokenWrapper";
import {useDispatch, useSelector} from "react-redux";
import {register, startAuthentication} from "../../store/auth/action";
import {useNavigate} from "react-router-dom";

const SignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error, isLoading, data} = useSelector(state => state.authReducer);

    const submit = (sign) => {
        const request = {
            registrationKey: data.key,
            sign: sign
        }
        dispatch(register(request));
        navigate("/registrationSuccess")
    }

    useEffect(() => {
        dispatch(startAuthentication());
    }, []);





    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Sign Up
            </Typography>
            <RutokenWrapper buttonName="Signup" submit={submit} data={data.randomToken}/>
        </Container>
    );
};

export default SignupPage;