import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import NumberFormat from "react-number-format";
import CircularProgress from "@material-ui/core/CircularProgress";
import AnimatedNumber from "react-animated-numbers"


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
    alignContent:"center",
    marginTop:"10%"
  },
});
export default function GlobalData() {
  const classes = useStyles();
  const classesTypography = useStylesTypography();

  const [globalData, setGlobalData] = useState([]);

  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    async function fetchGlobalData() {
      setDataLoading(true);

      //https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true
      try {
        const apiResponse = await fetch(
          " https://disease.sh/v3/covid-19/all?fbclid=IwAR26DwxVAYXWQXGbmgIhPFBiB47ODqI2X6pKi8yJMKTtj1rSEqZQBkA7WDY"
        );

        const dataFromAPI = await apiResponse.json();
        console.log(dataFromAPI);
        console.log("Data returned");
        setGlobalData(dataFromAPI);
        console.log("TODAY:", dataFromAPI.todayCases);
        console.log("TODAY:", globalData.todayCases);

        setDataLoading(false);
      } catch (e) {
        console.log("Not Available");
      }
    }

    fetchGlobalData();
  }, []);

  const loading = "Loading..";

  if (dataLoading) {
    return (
      <div className={classes.root}>
        <Paper elevation={4} >
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

        <Paper elevation={4} >
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
        <Paper elevation={4} style={{backgroundColor:"#FFE3E3",  }}>
          <div className={classesTypography.root}>
            

            <Typography
              variant="h5"
              gutterBottom
              style={{ color: "red", fontWeight: "bold", }}
            >
              Cases Today
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              style={{ color: "red", fontWeight: "bold" }}
            >
              <NumberFormat
                value={
                  globalData.todayCases
                }
                displayType={"text"}
                thousandSeparator={true}
              />
            </Typography>
          </div>
        </Paper>

        <Paper elevation={4}  style={{backgroundColor:"#FFFDBE"}}>
          <div className={classesTypography.root}>
            

            <Typography
              variant="h5"
              gutterBottom
              style={{ color: "orange", fontWeight: "bold" }}
            >
              Active Cases
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              style={{ color: "orange", fontWeight: "bold" }}
            >
              <NumberFormat
                value={
                  globalData.active
                }
                displayType={"text"}
                thousandSeparator={true}
              />
            </Typography>
          </div>
        </Paper>

        <Paper elevation={4} style={{backgroundColor:"#CEFECE "}}>
          <div className={classesTypography.root}>
            

            <Typography
              variant="h5"
              gutterBottom
              style={{ color: "green", fontWeight: "bold" }}
            >
              Recover
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              style={{ color: "green", fontWeight: "bold" }}
            >
              <NumberFormat
                value={
                  globalData.recovered
                }
                displayType={"text"}
                thousandSeparator={true}
              />
            </Typography>
          </div>
        </Paper>
        <Paper elevation={4} style={{backgroundColor:"#EFEFEF"}}>
          <div className={classesTypography.root}>
            

            <Typography
              variant="h5"
              gutterBottom
              style={{ color: "black", fontWeight: "bold" }}
            >
              Deaths
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              style={{ color: "black", fontWeight: "bold" }}
            >
              <NumberFormat
                value={
                  globalData.deaths
                }
                displayType={"text"}
                thousandSeparator={true}
              />
            </Typography>
          </div>
        </Paper>
      </div>
    );
  }

