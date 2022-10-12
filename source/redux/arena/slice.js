import {createSlice} from '@reduxjs/toolkit';
import countryList from 'react-select-country-list';

const countries = countryList().getData();
const randomizedData = [...Array(countries.length).keys()].sort( () => 0.5 - Math.random() );

const initialState = {
  dataJSON: countries,
  optionsArray: [],
  answerObject: {},
  levelInt: 0,
  pointsInt: 0,
};

export const arenaSlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setRound: (state, action) => {
      let len = state.dataJSON.length;

      let start = Math.floor(Math.random() * len);
      let choices = [];

      for (let i = 0; i < 8; ++i) {
        let n = (start + i) % len;
        choices.push(state.dataJSON[n]);
      }

      state.optionsArray = [...choices];

      state.answerObject =
        state.optionsArray[
          Math.floor(Math.random() * state.optionsArray.length)
        ];
    },
    increaseLevel: (state, action) => {
      state.levelInt += 1;
    },
    increasePoints: (state, action) => {
      state.pointsInt += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setRound, increaseLevel, increasePoints} = arenaSlice.actions;

export default arenaSlice.reducer;
