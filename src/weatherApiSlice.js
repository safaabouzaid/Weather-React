import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk(
  "weatherApi/fetchweather",
  async () => {
    console.log("calling fechweather");
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=d41bbfd350396cfcb6173f7eaa4bbfb1"
    );
    const responsetemp = Math.round(response.data.main.temp - 272.15);
    const min = Math.round(response.data.main.temp_min - 272.15);
    const max = Math.round(response.data.main.temp_max - 272.15);
    const description = response.data.weather[0].description;
    const responseIcon = response.data.weather[0].icon;
    console.log(response);
  }
);

const weatherApiSlice = createSlice({
  name: "weatherApi",

  initialState: {
    result: "empty",
    weather: {},
    isloading: false,
  },

  reducers: {
    changeResult: (state, action) => {
      state.result = "changed";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isloading = false;
      });
  },
});

///عم صدر الاكشن لحتى استفيد منو بعدين
//طبعاا استخرجتو من الفانكشن قبل ماصدرو
export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
