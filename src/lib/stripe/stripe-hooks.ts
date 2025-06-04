import { useEffect } from 'react';
import { useSupabase } from '../supabase/SupabaseProvider';
import { useSubscriptionStore } from './stripe-store';
import { products } from './stripe-config';

export function useSubscription() {
  const { supabase } = useSupabase();
  const setSubscription = useSubscriptionStore((state) => state.setSubscription);
  const subscription = useSubscriptionStore((state) => ({
    status: state.status,
    priceId: state.priceId,
    currentPeriodEnd: state.currentPeriodEnd,
    cancelAtPeriodEnd: state.cancelAtPeriodEnd,
  }));

  useEffect(() => {
    const channel = supabase
      .channel('stripe_subscription_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stripe_subscriptions',
        },
        (payload) => {
          if (payload.new) {
            setSubscription({
              status: payload.new.status,
              priceId: payload.new.price_id,
              currentPeriodEnd: payload.new.current_period_end,
              cancelAtPeriodEnd: payload.new.cancel_at_period_end,
            });
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setSubscription]);

  useEffect(() => {
    async function getInitialSubscription() {
      const { data: subscription } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .maybeSingle();

      if (subscription) {
        setSubscription({
          status: subscription.subscription_status,
          priceId: subscription.price_id,
          currentPeriodEnd: subscription.current_period_end,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        });
      }
    }

    getInitialSubscription();
  }, [supabase, setSubscription]);

  const plan = subscription.priceId
    ? Object.entries(products).find(([_, product]) => product.priceId === subscription.priceId)?.[0]
    : null;

  return {
    ...subscription,
    plan,
    isActive: subscription.status === 'active',
    isTrialing: subscription.status === 'trialing',
    isPastDue: subscription.status === 'past_due',
    isCanceled: subscription.status === 'canceled',
    isNotStarted: subscription.status === 'not_started',
  };
}