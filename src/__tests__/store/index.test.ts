import { store } from '@/store/index';

test('store is configured with the correct reducers', () => {
  const state = store.getState();
  expect(state).toHaveProperty('movies');
  expect(state).toHaveProperty('auth');
});
