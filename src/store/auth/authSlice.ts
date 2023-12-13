import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import axios from "axios";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

interface User {
  id: string;
  login: string;
}

interface AuthPayload {
  login: string;
  password: string;
}
interface RegPayload {
  email: string;
  login: string;
  password: string;
}
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (payload: RegPayload) => {
    return axios
      .post("http://localhost:5000/users", payload)
      .then((res: any) => res.data);
  }
);
export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (payload: AuthPayload, thunkAPI) => {
    return axios
      .get("http://localhost:5000/users", {
        params: payload,
      })
      .then((res: any) => {
        if (res.data && res.data.length > 0) {
          return res.data[0];
        } 
        return thunkAPI.rejectWithValue("Incorect login or password")
      })
  })

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (_, action) => {
      console.log("register fulfilled", action.payload);
    });
    builder.addCase(authenticate.fulfilled, (state, action) => {
      console.log("authenticate fulfilled", action.payload);
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(authenticate.rejected, (_, action) => {
      console.log("authenticate rejected", action.payload);
      throw new Error(action.payload as string);
    });
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const {  logout } = authSlice.actions;

export default persistedAuthReducer;

