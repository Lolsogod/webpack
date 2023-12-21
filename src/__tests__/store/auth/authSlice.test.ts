import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import authReducer, { authenticate, register, logout } from '@/store/auth/authSlice';
import { AppDispatch, RootState } from '@/store';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

jest.mock('axios');

describe('auth reducer', () => {
  let store: ToolkitStore<RootState["auth"]>;

  beforeEach(() => {
    store = configureStore({
      reducer: authReducer,
    });
  });

  it('should handle initial state', () => {
    const expected = {
      isAuthenticated: false,
      user: null,
    };
    expect(store.getState()).toEqual(expected);
  });

  it('should handle authenticate.fulfilled', async () => {
    const mockUser = { login: 'TEST1', password: '123456789' };
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [mockUser] });
    const dispatch: AppDispatch = store.dispatch;
    await dispatch(authenticate(mockUser));
    expect(store.getState()).toEqual({ isAuthenticated: true, user: mockUser });
  });

  it('should handle logout', () => {
    const dispatch: AppDispatch = store.dispatch;
    dispatch(logout());
    expect(store.getState()).toEqual({ isAuthenticated: false, user: null });
  });
});