import {createSlice} from '@reduxjs/toolkit';
import countryList from 'react-select-country-list';

const initialState = {
  dataJSON: countryList().getData(),
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

      state.optionsArray = [
        state.dataJSON[Math.floor(Math.random() * len)],
        state.dataJSON[Math.floor(Math.random() * len)],
        state.dataJSON[Math.floor(Math.random() * len)],
        state.dataJSON[Math.floor(Math.random() * len)],
        state.dataJSON[Math.floor(Math.random() * len)],
        state.dataJSON[Math.floor(Math.random() * len)],
        state.dataJSON[Math.floor(Math.random() * len)],
        state.dataJSON[Math.floor(Math.random() * len)],
      ];
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
