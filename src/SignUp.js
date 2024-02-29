import React, { useEffect, useState } from 'react';
import {set, useForm} from 'react-hook-form';
import {
    Container,
    Typography
} from '@mui/material';
import RutokenWrapper from "./plugins/RutokenWrapper";

const SignupPage = () => {


    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Sign Up
            </Typography>
            <RutokenWrapper buttonName="Signup"/>
        </Container>
    );
};

export default SignupPage;