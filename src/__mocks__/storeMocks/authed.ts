export const authed = {
  auth: {
    isAuthenticated: true,
    user: {
      id: "1",
      login: "JOE1",
    },
  },
  movies: {
    list: { data: [], pending: false },
    current: { data: null, pending: false },
    sort: { type: "name", asc: true },
    search: { type: "name", query: "" },
  },
};
