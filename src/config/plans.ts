enum PlanType {
  FREE = 'Free',
  PRO = 'Pro',
}

export const PLANS = {
  free: {
    name: PlanType.FREE,
    slug: PlanType.FREE.toLocaleLowerCase(),
    features: {
      voices: 3,
      noOfEntriesPerDay: 1,
      lengthOfJournals: 2000,
    },
    price: {
      amount: 0,
      priceIds: {
        test: '',
        production: '',
      },
    },
  },
  pro: {
    name: PlanType.PRO,
    slug: PlanType.PRO.toLowerCase(),
    features: {
      voices: 6,
      noOfEntriesPerDay: 3,
      lengthOfJournals: 10000,
    },
    price: {
      amount: 10,
      priceIds: {
        test: 'price_1PREPSJFkp5qgE0OHrqLOf9R',
        production: '',
      },
    },
  },
};
