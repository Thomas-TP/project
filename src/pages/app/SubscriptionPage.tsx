import React, { useState } from 'react';
import { Check, X, CreditCard, ArrowRight, Crown, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { toast } from 'sonner';
import { createCheckoutSession } from '../../lib/stripe/stripe-client';
import { useSubscription } from '../../lib/stripe/stripe-hooks';
import { products } from '../../lib/stripe/stripe-config';
import type { ProductId } from '../../lib/stripe/stripe-config';
import { useSupabase } from '../../lib/supabase/SupabaseProvider';

const SubscriptionPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');
  const [isLoading, setIsLoading] = useState(false);
  const subscription = useSubscription();
  const { supabase } = useSupabase();
  
  const handleSubscribe = async (productId: ProductId) => {
    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session found');
      }
      
      const successUrl = `${window.location.origin}/app/subscription?success=true`;
      const cancelUrl = `${window.location.origin}/app/subscription?canceled=true`;
      
      const checkoutUrl = await createCheckoutSession(
        productId,
        successUrl,
        cancelUrl,
        session.access_token
      );
      
      window.location.href = checkoutUrl;
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast.error(error.message || 'Failed to start subscription');
      setIsLoading(false);
    }
  };

  // Feature list for comparison
  const features = [
    {
      name: 'Daily mental wellness tests',
      free: 'Limited',
      premium: 'Unlimited',
      description: 'Assess your mental state with our comprehensive questionnaires'
    },
    {
      name: 'Breathing exercises',
      free: '3 exercises',
      premium: 'All exercises',
      description: 'Guided breathing techniques for stress reduction and relaxation'
    },
    {
      name: 'Meditation sessions',
      free: '3 sessions',
      premium: 'All sessions',
      description: 'Access to guided meditation practices for mindfulness and peace'
    },
    {
      name: 'History and analytics',
      free: '7 days',
      premium: 'Unlimited',
      description: 'Track your mental wellness journey over time with detailed insights'
    },
    {
      name: 'Detailed reports',
      free: false,
      premium: true,
      description: 'Get comprehensive reports on your mental wellness progress'
    },
    {
      name: 'Personalized recommendations',
      free: 'Basic',
      premium: 'Advanced',
      description: 'Receive tailored suggestions based on your mental wellness profile'
    },
    {
      name: 'Export data',
      free: false,
      premium: true,
      description: 'Download your wellness data in various formats'
    },
    {
      name: 'Priority support',
      free: false,
      premium: true,
      description: 'Get faster responses from our support team'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">Choose Your Plan</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upgrade to Premium to unlock all features and take your mental wellness journey to the next level.
        </p>
      </div>

      {/* Plan toggle */}
      <div className="mb-12">
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setSelectedPlan('monthly')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedPlan === 'monthly'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setSelectedPlan('annual')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
              selectedPlan === 'annual'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground'
            }`}
          >
            Annual
            <span className="ml-2 bg-success text-success-foreground text-xs px-2 py-0.5 rounded-full">
              Save 25%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        {/* Free Plan */}
        <div className="card p-6 flex flex-col h-full border-muted">
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Free Plan</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-muted-foreground ml-2">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Basic features to start your wellness journey
            </p>
          </div>
          
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
              <p className="ml-3 text-sm">
                <span className="font-medium">Daily tests</span> - Limited access
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
              <p className="ml-3 text-sm">
                <span className="font-medium">3 breathing exercises</span>
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
              <p className="ml-3 text-sm">
                <span className="font-medium">3 meditation sessions</span>
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
              <p className="ml-3 text-sm">
                <span className="font-medium">7-day history</span>
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-muted-foreground">
                <X className="h-5 w-5" />
              </div>
              <p className="ml-3 text-sm text-muted-foreground">
                <span className="font-medium">Detailed reports</span>
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-muted-foreground">
                <X className="h-5 w-5" />
              </div>
              <p className="ml-3 text-sm text-muted-foreground">
                <span className="font-medium">Export data</span>
              </p>
            </li>
          </ul>
          
          <Button variant="outline" disabled>
            {subscription.isNotStarted ? 'Current Plan' : 'Free Plan'}
          </Button>
        </div>

        {/* Premium Plan */}
        <div className="card p-6 flex flex-col h-full border-primary border-2 relative">
          <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground text-sm font-medium px-4 py-1 rounded-full flex items-center">
            <Crown className="h-4 w-4 mr-1" /> Premium
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Premium Plan</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">
                ${selectedPlan === 'monthly' ? '9.99' : '89.99'}
              </span>
              <span className="text-muted-foreground ml-2">
                /{selectedPlan === 'monthly' ? 'month' : 'year'}
              </span>
            </div>
            {selectedPlan === 'annual' && (
              <div className="mt-1 text-sm text-success">
                Save $29.89 compared to monthly
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              Full access to all premium features
            </p>
          </div>
          
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
              <p className="ml-3 text-sm">
                <span className="font-medium">Unlimited daily tests</span>
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
              <p className="ml-3 text-sm">
                <span className="font-medium">All breathing exercises</span>
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
              <p className="ml-3 text-sm">
                <span className="font-medium">All meditation sessions</span>
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
              <p className="ml-3 text-sm">
                <span className="font-medium">Unlimited history</span>
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
              <p className="ml-3 text-sm">
                <span className="font-medium">Detailed analytics & reports</span>
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
              <p className="ml-3 text-sm">
                <span className="font-medium">Data export</span>
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
              <p className="ml-3 text-sm">
                <span className="font-medium">Priority support</span>
              </p>
            </li>
          </ul>
          
          {subscription.isActive ? (
            <Button variant="outline" disabled>
              Current Plan
            </Button>
          ) : (
            <Button 
              onClick={() => handleSubscribe(selectedPlan)} 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Subscribe Now
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Feature comparison */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Compare Features</h2>
          <p className="card-description">
            A detailed comparison of what's included in each plan
          </p>
        </div>
        <div className="card-content overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 pl-4 pr-8 font-medium">Feature</th>
                <th className="px-4 py-4 text-center font-medium">Free</th>
                <th className="px-4 py-4 text-center font-medium">Premium</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className={index < features.length - 1 ? 'border-b' : ''}>
                  <td className="py-4 pl-4 pr-8">
                    <div>
                      <p className="font-medium">{feature.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {typeof feature.free === 'boolean' ? (
                      feature.free ? (
                        <Check className="h-5 w-5 text-success mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )
                    ) : (
                      <span className="text-sm">{feature.free}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {typeof feature.premium === 'boolean' ? (
                      feature.premium ? (
                        <Check className="h-5 w-5 text-success mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )
                    ) : (
                      <span className="text-sm font-medium">{feature.premium}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            {
              question: "Can I cancel my subscription anytime?",
              answer: "Yes, you can cancel your premium subscription at any time. You'll continue to have access until the end of your billing period."
            },
            {
              question: "How do I upgrade to premium?",
              answer: "Simply click the 'Subscribe Now' button, enter your payment details, and you'll get immediate access to all premium features."
            },
            {
              question: "Is there a free trial for premium?",
              answer: "We currently don't offer a free trial, but you can try our free plan to get a taste of what SereniTest offers."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit cards, including Visa, MasterCard, American Express, and Discover."
            }
          ].map((faq, index) => (
            <div key={index} className="card p-6">
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to enhance your mental wellness journey?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Upgrade to premium today and unlock all the tools you need to achieve greater mental well-being.
        </p>
        {subscription.isActive ? (
          <Button size="lg" variant="outline" disabled>
            <Crown className="mr-2 h-5 w-5" />
            Current Plan
          </Button>
        ) : (
          <Button 
            size="lg" 
            onClick={() => handleSubscribe(selectedPlan)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Crown className="mr-2 h-5 w-5" />
                Upgrade to Premium <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;