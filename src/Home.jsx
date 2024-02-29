import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import {Link} from "react-router-dom";

const addsignReactName = 'AddSign ';

const menuItems = [
    {
        name: 'Входящие',
        path: '/incoming',
    },
    {
        name: 'Исходящие',
        path: '/outgoing',
    },
];

const Home = () => {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className="grow">
                    {addsignReactName}
                </Typography>
                {menuItems.map((item) => (
                    <Button key={item.path} color="inherit" component={Link} to={item.path}>
                        {item.name}
                    </Button>
                ))}
            </Toolbar>
        </AppBar>
    );
}

export default Home;