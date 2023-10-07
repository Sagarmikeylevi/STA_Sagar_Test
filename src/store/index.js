import { configureStore } from "@reduxjs/toolkit";

import studentSlice from "./student-slice";

const store = configureStore({
  reducer: { student: studentSlice.reducer },
});

export default store;
