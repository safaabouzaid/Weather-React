import "./App.css";
import { useTranslation } from "react-i18next";

import Typography from "@mui/material/Typography";
////REACT
import { useEffect, useState } from "react";
///MATERIAL UI
import { createTheme, ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
////EXTERNAL LIBRARY
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
let cancelAxioas = null;
function App() {
  const { t, i18n } = useTranslation();
  //////======== States  =======/////
  const [dateAndTime, setdateAndTime] = useState("");

  const [locale, setlocale] = useState("ar");

  console.log("the time is " + dateAndTime);
  console.log("renderinng the component {mounting}");
  const [temp, settemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });

  //////======== Event Handeler =======/////
  function handelLanguageClick() {
    if (locale === "en") {
      setlocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setlocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setdateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));

    //i18n.changeLanguage("en");
  }
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, []);
  useEffect(() => {
    setdateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=d41bbfd350396cfcb6173f7eaa4bbfb1",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxioas = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const responsetemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;
        console.log(response);
        settemp({
          number: responsetemp,
          min: min,
          max: max,
          description: description,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      console.log("cancaling");
      cancelAxioas();
    };
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" style={{}}>
          {/*CONTENT CONTENER*/}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/*Card */}
            <div
              dir={locale === "ar" ? "rtl" : "ltr"}
              style={{
                width: "100%",
                background: "rgb(28 52 91 /36% )",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {" "}
              {/*Content */}
              <div>
                {/*city and time*/}
                <div
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                >
                  <Typography variant="h2" marginRight="20px" fontWeight="600">
                    {t("london")}
                  </Typography>
                  <Typography variant="h5" marginRight="20px">
                    {dateAndTime}
                  </Typography>
                </div>
                {/*city and time*/}
                <hr />
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/*Degree and content*/}
                  <div>
                    {/*Degree*/}
                    {/*CONTENT OF DEGREE +CLOUD ICON*/}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>
                      <img src={temp.icon} />
                    </div>
                    {/*Degree*/}
                    <Typography variant="h16">{t(temp.description)}</Typography>
                    {/*Min & Max*/}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {t("min")} : {temp.min}
                      </h5>
                      <h5 style={{ margin: "0px 5px" }}> | </h5>

                      <h5>
                        {t("max")} : {temp.max}
                      </h5>
                    </div>
                    {/*Min & Max*/}
                  </div>
                  {/*Degree and content*/}
                  <CloudIcon style={{ fontSize: "200px" }} />
                </div>
                {/*CONTENT OF DEGREE +CLOUD ICON*/}
              </div>
              {/*Content */}
            </div>
            {/*Card */}
            <div
              dir={locale === "ar" ? "rtl" : "ltr"}
              style={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Button
                onClick={handelLanguageClick}
                style={{ color: "white" }}
                variant="text"
              >
                {locale === "en" ? "Arabic" : "انجليزي"}
              </Button>
            </div>
          </div>
          {/*CONTENT CONTENER*/}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
