export const API_ROUTES = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    profile: "/auth/profile",
  },
  bookings: {
    list: "/bookings",
    create: "/bookings",
  },
  catalog: {
    list: "/catalog",
    detail: (id: string) => `/catalog/${id}`,
  },
};