import {
    AppBar,
    Button,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography
} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";


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

function createData(name, dateCreated, status, comments) {
    return { name, dateCreated, status, comments };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];



const OutgoingDocuments = () => {


    return (
        <div>
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
            <div>
                <h1>Исходящие</h1>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>№</StyledTableCell>
                            <StyledTableCell align="right">Наименование документа</StyledTableCell>
                            <StyledTableCell align="right">Дата создания</StyledTableCell>
                            <StyledTableCell align="right">Статус</StyledTableCell>
                            <StyledTableCell align="right">Комментарии</StyledTableCell>
                            <StyledTableCell align="right">Действия</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.name}</StyledTableCell>
                                <StyledTableCell align="right">{row.dateCreated}</StyledTableCell>
                                <StyledTableCell align="right">{row.status}</StyledTableCell>
                                <StyledTableCell align="right">{row.comments}</StyledTableCell>
                                <StyledTableCell align="right">просмотр</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default OutgoingDocuments;