import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./state/Auth/reducer";

export const store = configureStore({ reducer: { auth: authReducer } });
