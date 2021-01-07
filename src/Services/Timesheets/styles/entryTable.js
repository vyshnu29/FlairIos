import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableRow, TableCell, TableContainer, TableHead, Paper, TextField } from '@material-ui/core'

export const CustomTableCell = withStyles((theme) =>
  createStyles({
    head: {
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

export const HolidayCustomTableCell = withStyles((theme) =>
  createStyles({
    head: {
      backgroundColor: "black",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

export const CustomTableRow = withStyles((theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);


export const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

