import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import authReducer, {
  authenticate,
  register,
  logout,
} from "@/store/auth/authSlice";
import { AppDispatch, RootState } from "@/store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

jest.mock("axios");

describe("auth reducer", () => {
  let store: ToolkitStore<RootState["auth"]>;
  let dispatch: AppDispatch;
  beforeEach(() => {
    store = configureStore({
      reducer: authReducer,
    });
    dispatch = store.dispatch;
  });

  test("should handle initial state", () => {
    const expected = {
      isAuthenticated: false,
      user: null,
    };
    expect(store.getState()).toEqual(expected);
  });

  test("should handle authenticate.fulfilled", async () => {
    const mockUser = { login: "TEST1", password: "123456789" };
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [mockUser] });
    await dispatch(authenticate(mockUser));
    expect(store.getState()).toEqual({ isAuthenticated: true, user: mockUser });
  });

  test("should handle logout", () => {
    dispatch(logout());
    expect(store.getState()).toEqual({ isAuthenticated: false, user: null });
  });

  test("should handle register.rejected when user already exists", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: [{ id: "1", login: "User 1" }],
    });

    try {
      await dispatch(
        register({
          email: "test@test.com",
          login: "User 1",
          password: "password",
        })
      );
    } catch (error: any) {
      expect(error.message).toBe("User already exists");
    }
  });

  test("should handle register.fulfilled when registration is successful", async () => {
    const mockUser = {
      email: "test@test.com",
      login: "USER1",
      password: "123456789",
    };
    const mockResponse = { id: "1", ...mockUser };
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
  });

  test("should handle authenticate.rejected when incorrect login or password", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    try {
      await dispatch(
        authenticate({ login: "User 1", password: "wrong password" })
      );
    } catch (error: any) {
      expect(error.message).toBe("Incorect login or password");
    }
  });
});
