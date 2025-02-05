export const urls = {
  home: '/',
  auth: {
    signIn: '/sign-in',
    signUp: '/sign-up',
  },
  dashboard: {
    root: '/dashboard',
    journal: '/journal',
    profile: '/profile',
    externalUserProfile: (username: string) => `/profile/${username}`,
    tracking: '/tracking',
    billing: '/billing',
  },
};
