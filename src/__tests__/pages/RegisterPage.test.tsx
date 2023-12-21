import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import RegisterPage from '@/pages/RegisterPage';
import { BrowserRouter } from 'react-router-dom';

describe('<RegisterPage>', () => {
  beforeEach(() => {
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
});