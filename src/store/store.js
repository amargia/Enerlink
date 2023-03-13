import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./reducers/tasks/tasksSlice";

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
});

export default store;