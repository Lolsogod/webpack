import { authReducer } from "@/store/auth/authSlice";

jest.mock("@/store/auth/authSlice", () => ({
  authReducer: jest
    .fn()
    .mockImplementation((state = unauthedState.auth) => state),
}));

const unauthedState = { auth: { isAuthenticated: false, user: null } };

export const unauthed = {
  reducer: { auth: authReducer },
  preloadedState: unauthedState,
};
