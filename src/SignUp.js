import React, { useEffect, useState } from 'react';
import {set, useForm} from 'react-hook-form';
import {
    Container,
    Typography,
    TextField,
    Button,
    FormControl,
    FormLabel,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    Select,
    MenuItem,
} from '@mui/material';
import RutokenWrapper from "./plugins/RutokenWrapper";

const SignupPage = () => {
    const [devices, setDevices] = useState([]);
    const [device, setDevice] = useState("");
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const rutoken = RutokenWrapper();

    const handleChange = (event) => {
        setDevice(event.target.value);
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    useEffect(() => {
        if(rutoken) {
            rutoken.enumerateDevices().then((devices) => {
                if(devices.length > 0) {
                    devices.map((device) => {
                        rutoken.getDeviceLabel(device).then((label) => {
                            setDevices();
                        });
                    })
                }
                else {
                    console.log("Could not detect rutoken ecp;")
                }
            })
        }
    }, [rutoken]);

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth error={Boolean(errors.pinCode)}>
                    <InputLabel id="demo-simple-select-helper-label">Devices</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={device}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {devices.map((device, index) => <MenuItem value={device} key={index}>{device}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl fullWidth error={Boolean(errors.pinCode)}>
                    <InputLabel htmlFor="pin-code">Pin Code</InputLabel>
                    <OutlinedInput
                        id="pin-code"
                        type="number"
                        {...register('pinCode', { required: 'Pin code is required' })}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        error={Boolean(errors.pinCode)}
                        endAdornment={
                            <InputLabel htmlFor="pin-code" shrink error={Boolean(errors.pinCode)}>
                                {errors.pinCode && 'Pin code is required'}
                            </InputLabel>
                        }
                    />
                    {errors.pinCode && <FormHelperText>{errors.pinCode.message}</FormHelperText>}
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Sign Up
                </Button>
            </form>
        </Container>
    );
};

export default SignupPage;