import { products, type ProductId } from './stripe-config';

export async function createCheckoutSession(
  productId: ProductId,
  successUrl: string,
  cancelUrl: string,
  accessToken: string,
) {
  const product = products[productId];

  if (!product) {
    throw new Error(`Invalid product ID: ${productId}`);
  }

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      price_id: product.priceId,
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: product.mode,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create checkout session');
  }

  const { url } = await response.json();

  if (!url) {
    throw new Error('No checkout URL returned');
  }

  return url;
}