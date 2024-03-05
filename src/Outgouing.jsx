import {
    AppBar,
    Button, Container,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography
} from "@mui/material";
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import NavBar from "./components/NavBar";
import {useDispatch, useSelector} from "react-redux";
import {getOutgoingDocuments} from "./store/documents/outgoing/action";
import Box from "@mui/material/Box";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




const OutgoingDocuments = () => {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.outgoingDocumentsReducer);

    useEffect(() => {
        dispatch(getOutgoingDocuments());
    }, []);

    return (
        <div>
            <NavBar/>
            <Container sx={{mt: 2}} maxWidth={"xl"}>
                <Box display={"flex"} sx={{mb: 2, justifyContent: "space-between"}}>
                    <Typography variant={"h4"}>Исходящие</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={"/new/doc"}
                    >
                        Создать документ
                    </Button>

                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>№</StyledTableCell>
                                <StyledTableCell align="right">Наименование документа</StyledTableCell>
                                <StyledTableCell align="right">Дата создания</StyledTableCell>
                                <StyledTableCell align="right">Комментарии</StyledTableCell>
                                <StyledTableCell align="right">Действия</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.name}</StyledTableCell>
                                    <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
                                    <StyledTableCell align="right">{row.comment}</StyledTableCell>
                                    <StyledTableCell align="right"><Link to={"/view/doc/" + row.id}>просмотр</Link></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

        </div>
    )
}

export default OutgoingDocuments;