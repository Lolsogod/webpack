import { store } from "@/store/index";

test("store is configured with the movies reducer", () => {
  const state = store.getState();
  expect(state).toHaveProperty("movies");
});

test("store is configured with the auth reducer", () => {
  const state = store.getState();
  expect(state).toHaveProperty("auth");
});
