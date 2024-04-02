

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
    Paper, Dialog, DialogContent, Button, DialogTitle, DialogActions,
} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {getDocument} from "../store/documents/action";
import {BASE_URL} from "../common/requester";
import {statuses} from "../Outgouing";
import {PinDialog} from "../components/CreateDocumentForm";
import {shareDocument, signDocument} from "../store/documents/outgoing/action";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CopyLinkDialog = ({ onClose, open, documentId }) => {
    const [copied, setCopied] = useState(false);
    const {link} = useSelector(state => state.shareDocumentReducer);
    const dispatch = useDispatch();

    const handleCopy = () => {
        navigator.clipboard.writeText("http://176.126.164.136:3006/view/shared/" + link.linkId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        if(documentId) {
            dispatch(shareDocument({id: documentId}));
        }
    },[documentId])

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Поделиться ссылкой</DialogTitle>
            <DialogContent>
                <p>Ссылка: http://176.126.164.136:3006/view/shared/{link.linkId}</p>
            </DialogContent>
            <DialogActions>
                <Tooltip title={copied ? 'Скопировано!' : 'Скопировать'} arrow>
                    <IconButton onClick={handleCopy} style={{ color: 'primary' }}>
                        <ContentCopyIcon />
                    </IconButton>
                </Tooltip>
                <Button onClick={onClose} color="primary">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
};


const ViewDocument = ({id}) => {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.viewDocumentReducer);

    const [open, setOpen] = useState(false);
    const [pinDialogOpen, setPinDialogOpen] = useState(false);

    const [shareLinkDialogOpen, setShareLinkDialogOpen] = useState(false);

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
        dispatch(signDocument({data: signedData})).then(() => {
            setPinDialogOpen(false);
            dispatch(getDocument(id));
        })
    }


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
                {data.status === "NEW" ?
                    (
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
                    ) : ""}
            </Box>
            <Box>
                <CopyLinkDialog open={shareLinkDialogOpen} onClose={() => setShareLinkDialogOpen(false)} documentId={data.id}/>
                <Button
                    sx={{mt:3}}
                    variant="contained"
                    color="primary"
                    onClick={() => setShareLinkDialogOpen(true)}
                >
                    Поделиться ссылкой
                </Button>
            </Box>
        </Box>
    );
};

export default ViewDocument;