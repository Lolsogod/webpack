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
describe('RegisterPage', () => {
  let store: any;
  let elements: {
    emailInput: HTMLInputElement;
    loginInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
    repeatPasswordInput: HTMLInputElement;
    submitButton: HTMLElement;
  };
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
    elements = {
      emailInput: screen.getByPlaceholderText('email'), 
      loginInput: screen.getByPlaceholderText('login'),
      passwordInput: screen.getByPlaceholderText('password'),
      repeatPasswordInput: screen.getByPlaceholderText('repeat password'),
      submitButton: screen.getByRole('button', { name: /register/i }),
    };
  });

  test('renders registration form', () => {
    expect(elements.emailInput).toBeInTheDocument();
    expect(elements.loginInput).toBeInTheDocument();
    expect(elements.passwordInput).toBeInTheDocument();
    expect(elements.repeatPasswordInput).toBeInTheDocument();
    expect(elements.submitButton).toBeInTheDocument();
  });

  test('updates form fields on change', () => {
    fireEvent.change(elements.emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(elements.loginInput, { target: { value: 'TESTUSER' } });
    fireEvent.change(elements.passwordInput, { target: { value: 'password' } });
    fireEvent.change(elements.repeatPasswordInput, { target: { value: 'password' } });

    expect(elements.emailInput.value).toBe('test@test.com');
    expect(elements.loginInput.value).toBe('TESTUSER');
    expect(elements.passwordInput.value).toBe('password');
    expect(elements.repeatPasswordInput.value).toBe('password');
  });

  test('submits form on register', async () => {
    fireEvent.change(elements.emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(elements.loginInput, { target: { value: 'TESTUSER' } });
    fireEvent.change(elements.passwordInput, { target: { value: '123456789' } });
    fireEvent.change(elements.repeatPasswordInput, { target: { value: '123456789' } });

    fireEvent.click(elements.submitButton);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, register({ email: 'test@test.com', login: 'TESTUSER', password: '123456789' }))
  });

  test('shows error toast when form has errors', () => {
    fireEvent.change(elements.emailInput, { target: { value: 'invalid email' } });
    fireEvent.change(elements.loginInput, { target: { value: 'testuser' } });
    fireEvent.change(elements.passwordInput, { target: { value: 'pass' } });
    fireEvent.change(elements.repeatPasswordInput, { target: { value: 'password' } });

    fireEvent.click(elements.submitButton);

    expect(toast.error).toHaveBeenCalledWith('Fix all errors before submitting');
  });

  test('shows error toast when form is incomplete', () => {
    fireEvent.click(elements.submitButton);

    expect(toast.error).toHaveBeenCalledWith('Fill in all fields before submitting');
  });
});