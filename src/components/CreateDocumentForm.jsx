

import React, { useState } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Typography,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Upload as UploadIcon } from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {createDocument, signDocument, uploadFile} from "../store/documents/outgoing/action";
import RutokenWrapper from "../plugins/RutokenWrapper";
import {useNavigate} from "react-router-dom";

const FileUploadDialog = ({ onClose, open }) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUploadFile = () => {
        let formData = new FormData();
        formData.append("file", file);
        dispatch(uploadFile({formData}));
    }

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Загрузить PDF</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Выберите PDF файл.
                </DialogContentText>
                <input
                    accept="application/pdf"
                    type="file"
                    onChange={handleFileChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Отмена
                </Button>
                <Button
                    onClick={() => {
                        onClose();
                        handleUploadFile();
                    }}
                    color="primary"
                    variant="contained"
                    startIcon={<UploadFileIcon />}
                    disabled={!file}
                >
                    Загрузить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export const PinDialog = ({ onClose, open, data, onSignSubmit }) => {

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Подписать</DialogTitle>
            <DialogContent>
                <RutokenWrapper data={data} submit={onSignSubmit} buttonName={"Подписать"} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Отмена
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const CreateDocumentForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const {attachment} = useSelector(state => state.createDocumentReducer);
    const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);
    const [pinDialogOpen, setPinDialogOpen] = useState(false);
    const [documentId, setDocumentId] = useState(null);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    const onSignSubmit = (sign) => {
        const data = {
            documentId: documentId,
            cms: sign
        }
        dispatch(signDocument({data})).then(() => {
            navigate("/outgoing");
        })
    }

    const handleCreateDocument = () => {
        const data = {
            name: name,
            attachmentId: attachment.id,
            comment: comment
        }
        dispatch(createDocument({data})).then((data) => {
            navigate("/outgoing");
        })
        
    }

    const handleCreateAndSignDocument = () => {
        const data = {
            name: name,
            attachmentId: attachment.id,
            comment: comment
        }
        dispatch(createDocument({data})).then((data) => {
            setDocumentId(data.payload.id);
            setPinDialogOpen(true);
        });

    }

    return (
        <>
            <TextField
                id="name"
                label="Наименование документа"
                margin="normal"
                fullWidth
                onChange={handleNameChange}
            />
            <Button
                variant="contained"
                component="label"
                startIcon={<UploadIcon />}
                onClick={() => setFileUploadDialogOpen(true)}
            >
                Загрузить PDF
            </Button>
            <Typography>
                {attachment.name}
            </Typography>
            <TextField
                id="comment"
                label="Комментарий"
                multiline
                rows={4}
                margin="normal"
                fullWidth
                onChange={handleCommentChange}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateAndSignDocument}
            >
                Создать и Подписать
            </Button>
            <FileUploadDialog
                open={fileUploadDialogOpen}
                onClose={() => setFileUploadDialogOpen(false)}
            />
            <PinDialog
                open={pinDialogOpen}
                onSignSubmit={onSignSubmit}
                data={attachment.data}
                onClose={() => setPinDialogOpen(false)}
            />

            <Button
                sx={{ml: 2}}
                variant="contained"
                color="primary"
                onClick={handleCreateDocument}
            >
                Создать
            </Button>
        </>
    );
};

export default CreateDocumentForm;