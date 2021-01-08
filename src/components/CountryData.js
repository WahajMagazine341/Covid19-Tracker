import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import NumberFormat from "react-number-format";

import Typography from "@material-ui/core/Typography";

//tableeeee
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

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
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CountryData() {
  const classes = useStyles2();
  const [countryData, setCountryData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, countryData.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    async function fetchCountryData() {
      //setDataLoading(true);

      //https://disease.sh/v3/covid-19/countries/?fbclid=IwAR2ijGt-nstFTRCSt2BW-loQI42Yu7HNcHA0eaBTmiiUdVlNUo-JSq_cEMo
      try {
        const apiResponse = await fetch(
          "https://disease.sh/v3/covid-19/countries/?fbclid=IwAR2ijGt-nstFTRCSt2BW-loQI42Yu7HNcHA0eaBTmiiUdVlNUo-JSq_cEMo"
        );

        const dataFromAPI = await apiResponse.json();
        console.log(dataFromAPI);
        console.log("Data returned");
        setCountryData(dataFromAPI);
        //setGlobalData(dataFromAPI);
        //console.log("TODAY:", dataFromAPI.todayCases);
        //console.log("TODAY:", globalData.todayCases);

        //setDataLoading(false);
      } catch (e) {
        console.log("Not Available");
      }
    }

    fetchCountryData();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead style={{backgroundColor:"#469EFC"}}>
            <TableRow>
              <TableCell align="left"><h2>Country</h2></TableCell>
              <TableCell  align="left"><h2>Flag</h2></TableCell>
              <TableCell  align="left"><h2>Active Cases</h2></TableCell>
              <TableCell  align="left"><h2>Deaths</h2></TableCell>
              <TableCell  align="left"><h2>Recovered</h2></TableCell>
              <TableCell  align="left"><h2>Total Cases</h2></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? countryData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : countryData
            ).map((obj) => (
              <TableRow key={obj.name}>
                <TableCell component="th" scope="row">
                  {obj.country}
                </TableCell>
                <TableCell component="th" scope="row">
                  <img width="20" height="20" src={obj.countryInfo.flag} alt={obj.country} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {obj.active}
                </TableCell>
                <TableCell component="th" scope="row">
                  {obj.deaths}
                </TableCell>
                <TableCell component="th" scope="row">
                  {obj.recovered}
                </TableCell>
                <TableCell component="th" scope="row">
                  {obj.cases}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={countryData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
