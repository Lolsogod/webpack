import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import LoginPage from '@/pages/LoginPage';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth/authSlice';
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));
describe('<LoginPage>', () => {
  
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
    store.dispatch = jest.fn().mockReturnValue(Promise.resolve());
  });


  test('renders login form', () => {
    render(
      <Provider store={store}>
        <BrowserRouter><LoginPage /></BrowserRouter>
      </Provider>
    );
    const loginInput = screen.getByPlaceholderText('login');
    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('updates login and password fields on change', () => {
    render(
      <Provider store={store}>
        <BrowserRouter><LoginPage /></BrowserRouter>
      </Provider>
    );
    const loginInput: HTMLInputElement = screen.getByPlaceholderText('login');
    const passwordInput: HTMLInputElement = screen.getByPlaceholderText('password');

    fireEvent.change(loginInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(loginInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
  });
  it('should show error toast when form has errors', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <Provider store={store}>
        <BrowserRouter><LoginPage /></BrowserRouter>
      </Provider>
    );

    fireEvent.change(getByPlaceholderText('login'), { target: { value: 'invalid login' } });
    fireEvent.change(getByPlaceholderText('password'), { target: { value: 'short' } });

    fireEvent.click(getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Fix all errors before submitting');
    });
  });

  it('should show error toast when form is not filled', async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter><LoginPage /></BrowserRouter>
      </Provider>
    );

    fireEvent.click(getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Fill in all fields before submitting');
    });
  });

  it('should dispatch authenticate action when form is valid', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <Provider store={store}>
        <BrowserRouter><LoginPage /></BrowserRouter>
      </Provider>
    );

    fireEvent.change(getByPlaceholderText('login'),  { target: { value: 'VALIDLOGIN' } });
    fireEvent.change(getByPlaceholderText('password'), { target: { value: '123456789' } });

    fireEvent.click(getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});