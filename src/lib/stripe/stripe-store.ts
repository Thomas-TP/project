import { create } from 'zustand';

export type SubscriptionStatus =
  | 'not_started'
  | 'incomplete'
  | 'incomplete_expired'
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | 'paused';

interface SubscriptionState {
  status: SubscriptionStatus;
  priceId: string | null;
  currentPeriodEnd: number | null;
  cancelAtPeriodEnd: boolean;
  setSubscription: (subscription: {
    status: SubscriptionStatus;
    priceId: string | null;
    currentPeriodEnd: number | null;
    cancelAtPeriodEnd: boolean;
  }) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  status: 'not_started',
  priceId: null,
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
  setSubscription: (subscription) => set(subscription),
}));