import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import RegisterPage from '@/pages/RegisterPage';
import { BrowserRouter } from 'react-router-dom';
import { register, authenticate, authReducer } from '@/store/auth/authSlice';
import { toast } from 'react-toastify';
import { configureStore } from '@reduxjs/toolkit';
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));
jest.mock('@/store/auth/authSlice', () => ({
  register: jest.fn(() => ({ type: 'auth/register' })),
}));
describe('<RegisterPage>', () => {
  let store: any;
  
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
    store.dispatch = jest.fn().mockReturnValue(Promise.resolve());
    render(
      <Provider store={store}>
        <BrowserRouter>
        <RegisterPage />
        </BrowserRouter>
      </Provider>
    );
  });

  test('renders registration form', () => {
    const emailInput = screen.getByPlaceholderText('email');
    const loginInput = screen.getByPlaceholderText('login');
    const passwordInput = screen.getByPlaceholderText('password');
    const repeatPasswordInput = screen.getByPlaceholderText('repeat password');
    const submitButton = screen.getByRole('button', { name: /register/i });

    expect(emailInput).toBeInTheDocument();
    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(repeatPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('updates form fields on change', () => {
    const emailInput: HTMLInputElement = screen.getByPlaceholderText('email');
    const loginInput: HTMLInputElement = screen.getByPlaceholderText('login');
    const passwordInput: HTMLInputElement = screen.getByPlaceholderText('password');
    const repeatPasswordInput: HTMLInputElement = screen.getByPlaceholderText('repeat password');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(loginInput, { target: { value: 'TESTUSER' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'password' } });

    expect(emailInput.value).toBe('test@test.com');
    expect(loginInput.value).toBe('TESTUSER');
    expect(passwordInput.value).toBe('password');
    expect(repeatPasswordInput.value).toBe('password');
  });

  test('submits form on register', async () => {
    const emailInput: HTMLInputElement = screen.getByPlaceholderText('email');
    const loginInput: HTMLInputElement = screen.getByPlaceholderText('login');
    const passwordInput: HTMLInputElement = screen.getByPlaceholderText('password');
    const repeatPasswordInput: HTMLInputElement = screen.getByPlaceholderText('repeat password');
    const submitButton = screen.getByRole('button', { name: /register/i });
  
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(loginInput, { target: { value: 'TESTUSER' } });
    fireEvent.change(passwordInput, { target: { value: '123456789' } });
    fireEvent.change(repeatPasswordInput, { target: { value: '123456789' } });
  
    fireEvent.click(submitButton);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, register({ email: 'test@test.com', login: 'TESTUSER', password: '123456789' }))
  });
  
  test('shows error toast when form has errors', () => {
    const emailInput: HTMLInputElement = screen.getByPlaceholderText('email');
    const loginInput: HTMLInputElement = screen.getByPlaceholderText('login');
    const passwordInput: HTMLInputElement = screen.getByPlaceholderText('password');
    const repeatPasswordInput: HTMLInputElement = screen.getByPlaceholderText('repeat password');
    const submitButton = screen.getByRole('button', { name: /register/i });
  
    fireEvent.change(emailInput, { target: { value: 'invalid email' } }); 
    fireEvent.change(loginInput, { target: { value: 'testuser' } }); 
    fireEvent.change(passwordInput, { target: { value: 'pass' } }); 
    fireEvent.change(repeatPasswordInput, { target: { value: 'password' } }); 
  
    fireEvent.click(submitButton);
  
    expect(toast.error).toHaveBeenCalledWith('Fix all errors before submitting');
  });
  
  test('shows error toast when form is incomplete', () => {
    const submitButton = screen.getByRole('button', { name: /register/i });
  
    fireEvent.click(submitButton);
  
    expect(toast.error).toHaveBeenCalledWith('Fill in all fields before submitting');
  });
});