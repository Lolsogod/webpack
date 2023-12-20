import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { register, authenticate } from './authSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios');

describe('authSlice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('creates auth/register fulfilled when registration has been done', async () => {
    const regPayload = {
      email: 'test@test.com',
      login: 'testuser',
      password: 'testpassword',
    };

    (axios.post as jest.Mock).mockResolvedValueOnce({ data: regPayload });

    const expectedActions = [
      { type: 'auth/register/pending' },
      { type: 'auth/register/fulfilled', payload: regPayload }
    ];
    const store = mockStore({ auth: { isAuthenticated: false, user: null } });

    await store.dispatch(register(regPayload));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('creates auth/authenticate fulfilled when authentication has been done', async () => {
    const authPayload = {
      login: 'testuser',
      password: 'testpassword',
    };

    axios.post.mockResolvedValueOnce({ data: authPayload });

    const expectedActions = [
      { type: 'auth/authenticate/pending' },
      { type: 'auth/authenticate/fulfilled', payload: authPayload }
    ];
    const store = mockStore({ auth: { isAuthenticated: false, user: null } });

    await store.dispatch(authenticate(authPayload));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

