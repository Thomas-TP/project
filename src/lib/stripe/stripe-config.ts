export const products = {
  annual: {
    id: 'prod_SQqA3NZxlcefnE',
    priceId: 'price_1RVyTnE9C1mra3ET7P16oKX0',
    description: 'Abonement annuel',
    mode: 'subscription' as const,
  },
  monthly: {
    id: 'prod_SQq9HQ6Df15rjM',
    priceId: 'price_1RVyT8E9C1mra3ETTh0YgKiE',
    description: 'Abonnement mensuel',
    mode: 'subscription' as const,
  },
} as const;

export type ProductId = keyof typeof products;