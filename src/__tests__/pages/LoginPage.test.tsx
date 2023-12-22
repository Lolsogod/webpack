import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import LoginPage from '@/pages/LoginPage';
import { BrowserRouter } from 'react-router-dom';

describe('<LoginPage>', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter><LoginPage /></BrowserRouter>
      </Provider>
    );
  });

  test('renders login form', () => {
    const loginInput = screen.getByPlaceholderText('login');
    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('updates login and password fields on change', () => {
    const loginInput: HTMLInputElement = screen.getByPlaceholderText('login');
    const passwordInput: HTMLInputElement = screen.getByPlaceholderText('password');

    fireEvent.change(loginInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(loginInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
  });
});