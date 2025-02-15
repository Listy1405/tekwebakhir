import React, {useState}from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {Button, TableHead} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Details } from '@material-ui/icons';
import QuestionDetailsModal from './QuestionDetailsModal'
 
const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    );
}

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});


function QuestionTable(props) {

    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [open,setOpen] = useState(false)
    const [createModalOpen, setCreateModalOpen] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const {rows, columns} = props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const {
        handlePageChange, handleRowsPerPageChange, count, isOperation,
        handleDelete, handleVisible, handleUpdate, hiddenIndexes
    } = props;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        handlePageChange(newPage);
    };
    const getDetailsQuestion = (id) =>{
        setOpen(true);
    }
    const handleCreateModalClose = ()=> {
        setOpen(false);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        handlePageChange(0);
        handleRowsPerPageChange(parseInt(event.target.value, 10));
    };

    return (<TableContainer component={Paper}>
        <QuestionDetailsModal open= {open} handleClose={handleCreateModalClose}/>

        <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
                <TableRow>
                    {columns.map((col, index) => <TableCell key={index} align={"left"}>{col}&nbsp;</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {(rowsPerPage > 0
                    && rows
                ).map((row, index) => (

                    <TableRow key={index}>
                        {Object.keys(row).map((item, i) => (
                            !hiddenIndexes.includes(i) && <TableCell key={i} align={"left"}> {row[item]}</TableCell>
                        ))}
                        {isOperation && <TableCell
                            align={"left"}>
                            <Button  onClick={() => getDetailsQuestion(row.id)} style={{backgroundColor:'#44e45e',color:'white'}}>Detay</Button> &nbsp;&nbsp;
                            </TableCell>
                        }
                    </TableRow>
                ))}

                {emptyRows > 0 && (
                    <TableRow style={{height: 53 * emptyRows}}>
                        <TableCell colSpan={6}/>
                    </TableRow>
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, {label: 'Hepsi', value: -1}]}
                        colSpan={3}
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {'aria-label': 'Sayfa başına gösterim'},
                            native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    </TableContainer>)
}

export default QuestionTable;