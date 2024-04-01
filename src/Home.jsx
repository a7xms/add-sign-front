import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import NavBar from "./components/NavBar";
import Container from "@mui/material/Container";
import PublicNavBar from "./PublicNavBar";

const Home = () => {
    return (
        <Container>
            <PublicNavBar/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom>
                        AddSign - ваш надежный партнер в подписании документов онлайн в Кыргызстане
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                        <Typography variant="h5" gutterBottom>
                            Основные функциональности AddSign:
                        </Typography>
                        <ul>
                            <li>Электронные Цифровые Подписи (ЭЦП)</li>
                            <li>Безопасное Хранение Данных</li>
                            <li>Устранение Бумажной Рутины</li>
                        </ul>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                        <Typography variant="h5" gutterBottom>
                            Преимущества Интеграции:
                        </Typography>
                        <ul>
                            <li>Интеграция с Существующими Системами</li>
                            <li>Юридическая Действительность Подписей</li>
                            <li>Быстрый и Безопасный Процесс</li>
                        </ul>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                        <Typography variant="h5" gutterBottom>
                            Бизнес-процессы в Кыргызстане:
                        </Typography>
                        <ul>
                            <li>Современное Развитие</li>
                            <li>Экологическая Оптимизация</li>
                        </ul>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>Контакты:</Typography>
                    <Typography>Телефон: +996 (553) 120 399</Typography>
                    <Typography>Электронная почта: addtechkg@gmail.com</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
