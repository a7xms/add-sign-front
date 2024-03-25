

import React, {useEffect, useState} from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper, Dialog, DialogContent, Button,
} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {BASE_URL} from "../common/requester";
import {statuses} from "../Outgouing";
import {PinDialog} from "../components/CreateDocumentForm";
import {getSharedDocument, signSharedDocument} from "../store/documents/outgoing/action";

const SharedDocument = ({link}) => {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.shareDocumentReducer);

    const [open, setOpen] = useState(false);
    const [pinDialogOpen, setPinDialogOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSignSubmit = (sign) => {
        const signedData = {
            documentId: data.id,
            cms: sign
        }
        dispatch(signSharedDocument({data: signedData})).then(() => {
            setPinDialogOpen(false);
            dispatch(getSharedDocument({id: link}));
        })
    }


    useEffect(() => {
        dispatch(getSharedDocument({id: link}));

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
                <Typography variant={'body1'} sx={{fontWeight: "bold"}}>Статус:</Typography>
                <Typography variant={'body1'} sx={{ ml: 2 }}>
                    {statuses.get(data.status)}
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
                                <TableCell>Подпись</TableCell>
                                <TableCell>Сертификат</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.signatures.map((signature, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {signature.fullName}
                                    </TableCell>
                                    <TableCell>{signature.createdAt}</TableCell>
                                    <TableCell>
                                        {signature.cms.substring(0, 30)}
                                        <span style={{textDecoration: 'underline', cursor: 'pointer'}}
                                              onClick={handleClickOpen}>
                                                ...more
                                        </span>
                                    </TableCell>
                                    <Dialog open={open} onClose={handleClose}>
                                        <DialogContent>{signature.cms}</DialogContent>
                                    </Dialog>
                                    <TableCell>
                                        <Typography variant={'body1'} component={"a"} href={BASE_URL + "/attachment?id=" + signature.certificate.id}>Скачать</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box>
                <PinDialog
                    open={pinDialogOpen}
                    onSignSubmit={onSignSubmit}
                    data={data.document.data}
                    onClose={() => setPinDialogOpen(false)}
                />
                <Button
                    sx={{mt:3}}
                    variant="contained"
                    color="primary"
                    onClick={() => setPinDialogOpen(true)}
                >
                    Подписать
                </Button>
            </Box>
        </Box>
    );
};

export default SharedDocument;