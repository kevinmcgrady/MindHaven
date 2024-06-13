enum PlanType {
  FREE = 'Free',
  PRO = 'Pro',
}

export const PLANS = {
  free: {
    name: PlanType.FREE,
    slug: PlanType.FREE.toLocaleLowerCase(),
    voices: 2,
    noOfEntriesPerDay: 1,
    lengthOfJournals: 2000,
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
    voices: 8,
    noOfEntriesPerDay: 'unlimited',
    lengthOfJournals: 'unlimited',
    price: {
      amount: 10,
      priceIds: {
        test: 'price_1PREPSJFkp5qgE0OHrqLOf9R',
        production: '',
      },
    },
  },
};
