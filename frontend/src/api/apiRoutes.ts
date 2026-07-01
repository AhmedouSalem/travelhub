export const API_ROUTES = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    profile: "/auth/profile",
  },
  bookings: {
    list: "/bookings",
    create: "/bookings",
    me: "/bookings/me",
    cancel: (id: string) => `/bookings/${id}/cancel`
  },
  catalog: {
    list: "/catalog",
    detail: (id: string) => `/catalog/${id}`,
  },
};