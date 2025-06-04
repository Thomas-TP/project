import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, ArrowRight, Activity, Sparkles, Shield, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useSupabase } from '../lib/supabase/SupabaseProvider';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const { user } = useSupabase();

  const features = [
    {
      icon: <Activity className="h-6 w-6 text-primary" />,
      title: 'Daily Mental Wellness Tests',
      description: 'Quick, adaptive assessments that help you understand your mental state.'
    },
    {
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      title: 'Guided Meditation Sessions',
      description: 'Variety of meditation techniques for different needs and experience levels.'
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: 'Breathing Exercises',
      description: 'Interactive breathing techniques to reduce stress and improve focus.'
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: 'Progress Tracking',
      description: 'Visualize your wellness journey with detailed analytics and insights.'
    }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Your Daily Mental <span className="text-primary">Wellness</span> Companion
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Track your mental state, practice guided meditation, and follow breathing 
                exercises to improve your overall well-being.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            >
              {user ? (
                <Link to="/app/dashboard">
                  <Button size="lg\" className="w-full sm:w-auto">
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/auth/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto mt-4 sm:mt-0">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 md:mt-20"
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="SereniTest Dashboard Preview" 
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Features to Enhance Your Mental Wellness
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive tools designed to support your daily mental health journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Pricing Plans</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the plan that fits your mental wellness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="card p-6 flex flex-col border-border"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Free</h3>
                <div className="mt-4 flex justify-center">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground ml-2 self-end">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
                  <p className="ml-3 text-sm">Limited daily tests</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
                  <p className="ml-3 text-sm">Basic breathing exercises</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
                  <p className="ml-3 text-sm">2 meditation sessions</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
                  <p className="ml-3 text-sm">7-day history</p>
                </li>
              </ul>
              <Link to="/auth/register">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Link>
            </motion.div>

            {/* Monthly Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="card p-6 flex flex-col relative border-primary border-2"
            >
              <div className="absolute top-0 right-0 transform translate-y-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-bl-md">
                Popular
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Monthly</h3>
                <div className="mt-4 flex justify-center">
                  <span className="text-4xl font-bold">$9.99</span>
                  <span className="text-muted-foreground ml-2 self-end">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
                  <p className="ml-3 text-sm">Unlimited daily tests</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
                  <p className="ml-3 text-sm">All breathing exercises</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
                  <p className="ml-3 text-sm">All meditation sessions</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
                  <p className="ml-3 text-sm">Unlimited history</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
                  <p className="ml-3 text-sm">Detailed analytics</p>
                </li>
              </ul>
              <Link to="/auth/register">
                <Button className="w-full">Subscribe Monthly</Button>
              </Link>
            </motion.div>

            {/* Annual Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="card p-6 flex flex-col"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Annual</h3>
                <div className="mt-4 flex flex-col items-center">
                  <div className="flex justify-center">
                    <span className="text-4xl font-bold">$89.99</span>
                    <span className="text-muted-foreground ml-2 self-end">/year</span>
                  </div>
                  <div className="mt-1 text-sm text-success">
                    Save 25% ($29.89)
                  </div>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
                  <p className="ml-3 text-sm">Everything in Monthly</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
                  <p className="ml-3 text-sm">Priority support</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
                  <p className="ml-3 text-sm">Early access to new features</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-success">✓</div>
                  <p className="ml-3 text-sm">Downloadable reports</p>
                </li>
              </ul>
              <Link to="/auth/register">
                <Button variant="outline" className="w-full">
                  Subscribe Yearly
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">What Our Users Say</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Hear from people who have improved their mental wellness with SereniTest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "SereniTest helped me establish a daily mental wellness routine that has significantly improved my anxiety levels.",
                name: "Sarah J.",
                title: "Teacher"
              },
              {
                quote: "The breathing exercises are so simple yet effective. I use them throughout my workday to stay centered.",
                name: "Michael T.",
                title: "Software Engineer"
              },
              {
                quote: "I love being able to track my mental wellness progress over time and see how far I've come.",
                name: "Elena K.",
                title: "Healthcare Professional"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-primary">
                    {"★".repeat(5)}
                  </div>
                  <blockquote className="flex-grow">
                    <p className="text-foreground italic">"{testimonial.quote}"</p>
                  </blockquote>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to start your wellness journey?</h2>
            <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of users who have improved their mental well-being with SereniTest.
            </p>
            <div className="mt-8">
              <Link to="/auth/register">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-primary hover:bg-secondary/90"
                >
                  Start Your Free Trial Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;