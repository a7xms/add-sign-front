

import React, {useEffect} from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {getDocument} from "../store/documents/action";
import {BASE_URL} from "../common/requester";
import {Link} from "react-router-dom";

const ViewDocument = ({id}) => {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.viewDocumentReducer);


    useEffect(() => {
        dispatch(getDocument(id));

    }, []);

    return (
        <Box sx={{mt: 2}}>
            <Box display={'flex'} sx={{ mb: 2 }}>
                <Typography variant={'body1'} sx={{fontWeight: "bold"}}>Наименование документа:</Typography>
                <Typography variant={'body1'} sx={{ ml: 2 }}>{data.name}</Typography>
            </Box>
            <Box display={'flex'} sx={{ mb: 2 }}>
                <Typography variant={'body1'} sx={{fontWeight: "bold"}}>Файл:</Typography>
                <Typography variant={'body1'} sx={{ ml: 2 }} component={"a"} href={BASE_URL + "/attachment?id=" + data.document.id}>{data.document.name}</Typography>
            </Box>
            <Box display={'flex'} sx={{ mb: 2 }}>
                <Typography variant={'body1'} sx={{fontWeight: "bold"}}>Комментарий:</Typography>
                <Typography variant={'body1'} sx={{ ml: 2 }}>{data.comment}</Typography>
            </Box>
            <Box display={'flex'} sx={{ mb: 2 }}>
                <Typography variant={'body1'} sx={{fontWeight: "bold"}}>Дата создания:</Typography>
                <Typography variant={'body1'} sx={{ ml: 2 }}>
                    {data.createdAt}
                </Typography>
            </Box>
            <Box display={'flex'} sx={{ mb: 2 }}>
                <Typography variant={'body1'} sx={{fontWeight: "bold"}}>Подписи:</Typography>
            </Box>
            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ФИО</TableCell>
                                <TableCell>Дата подписи</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.signatures.map((signature, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Typography variant={'body1'} component={"a"} href={BASE_URL + "/attachment?id=" + signature.certificate.id}>{signature.fullName}</Typography>
                                    </TableCell>
                                    <TableCell>{signature.createdAt}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default ViewDocument;