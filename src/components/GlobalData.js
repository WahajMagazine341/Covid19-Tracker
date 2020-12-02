import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import NumberFormat from "react-number-format";
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
      height: theme.spacing(16),
    },
  },
}));

const useStylesTypography = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
});
export default function GlobalData() {
  const classes = useStyles();
  const classesTypography = useStylesTypography();

  const [globalData, setGlobalData] = useState();

  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    async function fetchGlobalData() {
      setDataLoading(true);
      try{
      const apiResponse = await fetch(
        "https://api.thevirustracker.com/free-api?global=stats" , { mode: 'no-cors'}
      );

      const dataFromAPI = await apiResponse.json();
      console.log(dataFromAPI);
      console.log("Data returned");
      setGlobalData(dataFromAPI);
      setDataLoading(false) ;

    }
    catch(e){console.log("Not Available")}
    }

    fetchGlobalData();
  }, []);
  

  const loading = "Loading..";

  if (dataLoading) {
    return (
      <div className={classes.root}>
        <Paper elevation={4}>
          <div className={classesTypography.root}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ color: "red", fontWeight: "bold" }}
            >
            <CircularProgress color="red" />
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              style={{ color: "red", fontWeight: "bold" }}
            >
              Global
            </Typography>
          </div>
        </Paper>

        <Paper elevation={4}>
          <div className={classesTypography.root}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ color: "orange", fontWeight: "bold" }}
            >
              <CircularProgress color="orange" />
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              style={{ color: "orange", fontWeight: "bold" }}
            >
              Active
            </Typography>
          </div>
        </Paper>

        <Paper elevation={4}>
          <div className={classesTypography.root}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ color: "green", fontWeight: "bold" }}
            >
              <CircularProgress color="green" />
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              style={{ color: "green", fontWeight: "bold" }}
            >
              Recovered
            </Typography>
          </div>
        </Paper>
        <Paper elevation={4}>
          <div className={classesTypography.root}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ color: "black", fontWeight: "bold" }}
            >
              <CircularProgress color="black" />
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              style={{ color: "black", fontWeight: "bold" }}
            >
              Deaths
            </Typography>
          </div>
        </Paper>
      </div>
    );
  }


  return (
    <div className={classes.root}>
      <Paper elevation={4}>
        <div className={classesTypography.root}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ color: "red", fontWeight: "bold" }}
          >
            <NumberFormat
              value={
                globalData &&
                globalData.results &&
                globalData.results[0].total_cases
              }
              displayType={"text"}
              thousandSeparator={true}
            />
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            style={{ color: "red", fontWeight: "bold" }}
          >
            Global Data as of Today
          </Typography>
        </div>
      </Paper>

      <Paper elevation={4}>
        <div className={classesTypography.root}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ color: "orange", fontWeight: "bold" }}
          >
            <NumberFormat
              value={
                globalData &&
                globalData.results &&
                globalData.results[0].total_active_cases
              }
              displayType={"text"}
              thousandSeparator={true}
            />
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            style={{ color: "orange", fontWeight: "bold" }}
          >
            Active Cases
          </Typography>
        </div>
      </Paper>

      <Paper elevation={4}>
        <div className={classesTypography.root}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ color: "green", fontWeight: "bold" }}
          >
            <NumberFormat
              value={
                globalData &&
                globalData.results &&
                globalData.results[0].total_recovered
              }
              displayType={"text"}
              thousandSeparator={true}
            />
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            style={{ color: "green", fontWeight: "bold" }}
          >
            Recovered 
          </Typography>
        </div>
      </Paper>
      <Paper elevation={4}>
        <div className={classesTypography.root}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ color: "black", fontWeight: "bold" }}
          >
            <NumberFormat
              value={
                globalData &&
                globalData.results &&
                globalData.results[0].total_deaths
              }
              displayType={"text"}
              thousandSeparator={true}
            />
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            style={{ color: "black", fontWeight: "bold" }}
          >
            Deaths
          </Typography>
        </div>
      </Paper>
    </div>
  );
}
