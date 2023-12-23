import { render, fireEvent, screen } from '@testing-library/react';
import LoginPage from '@/pages/LoginPage';
import { toast } from 'react-toastify';
import { configureStore } from '@reduxjs/toolkit';
import { TestWrapper } from '@/__mocks__/TestWrapper';
import { unauthed } from '@/__mocks__/storeMocks';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));
describe('<LoginPage>', () => {
  let store: any;
  let elements: {
    loginInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
    submitButton: HTMLElement;
  };
  beforeEach(() => {
    store = configureStore(unauthed);
    store.dispatch = jest.fn().mockReturnValue(Promise.resolve());
    render(
      <TestWrapper store={store}>
        <LoginPage />
      </TestWrapper>
    );
    elements = {
      loginInput: screen.getByPlaceholderText('login'),
      passwordInput: screen.getByPlaceholderText('password'),
      submitButton: screen.getByRole('button', { name: /login/i }),
    };
  });


  test('renders login form', () => {
    expect(elements.loginInput).toBeInTheDocument();
    expect(elements.passwordInput).toBeInTheDocument();
    expect(elements.submitButton).toBeInTheDocument();
  });

  test('updates login and password fields on change', () => {
    fireEvent.change(elements.loginInput, { target: { value: 'testuser' } });
    fireEvent.change(elements.passwordInput, { target: { value: 'testpassword' } });

    expect(elements.loginInput.value).toBe('testuser');
    expect(elements.passwordInput.value).toBe('testpassword');
  });
  test('should show error toast when form has errors', async () => {
    fireEvent.change(elements.loginInput, { target: { value: 'invalid login' } });
    fireEvent.change(elements.passwordInput, { target: { value: 'short' } });

    fireEvent.click(elements.submitButton);

    expect(toast.error).toHaveBeenCalledWith('Fix all errors before submitting');
  });

  test('should show error toast when form is not filled', async () => {
    fireEvent.click(elements.submitButton);

    expect(toast.error).toHaveBeenCalledWith('Fill in all fields before submitting');
  });

  test('should dispatch authenticate action when form is valid', async () => {
    fireEvent.change(elements.loginInput, { target: { value: 'VALIDLOGIN' } });
    fireEvent.change(elements.passwordInput, { target: { value: '123456789' } });

    fireEvent.click(elements.submitButton);

    expect(store.dispatch).toHaveBeenCalled();
  });
});