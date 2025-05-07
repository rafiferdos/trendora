"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Phone, 
  CheckCircle2, 
  Calendar, 
  HelpCircle, 
  Truck,
  Star,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    toast.success("Message sent! We'll get back to you as soon as possible.");
    
    // Reset form after animation completes
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setFormSubmitted(false);
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.1, 
        duration: 0.6,
        ease: "easeOut" 
      },
    }),
  };

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    transition: { 
      repeat: Infinity, 
      repeatType: "reverse" as const,
      duration: 2 
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: { 
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section with modern glass morphic effect */}
      <div className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          {/* Animated floating elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full opacity-20 ${
                i % 2 === 0 ? 'bg-primary' : 'bg-purple-500'
              }`}
              style={{
                width: `${Math.random() * 8 + 4}rem`,
                height: `${Math.random() * 8 + 4}rem`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, Math.random() * 10 - 5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 5 + 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 mx-auto py-12 px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="inline-block mb-6"
            >
              <div className="relative inline-flex p-1.5 rounded-full bg-gradient-to-r from-primary via-purple-500 to-blue-500">
                <div className="bg-background dark:bg-slate-900 rounded-full px-6 py-2">
                  <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Need help? We&apos;re here for you
                  </span>
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="inline-block">
                <span className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 text-transparent bg-clip-text">
                  Get in Touch
                </span>
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10"
            >
              Have questions about Trendora or need assistance with your
              second-hand shopping experience? We&apos;re here to help you every step of the way!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/20"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full border-primary/20 px-8 backdrop-blur-sm hover:bg-primary/5"
                onClick={() => document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View FAQs
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="relative h-24 -mt-24">
        <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 24.6841C277.5 -8.22803 554.5 -8.22803 832 24.6841C1109.5 57.5962 1387 57.5962 1664.5 24.6841L1664.5 74H0V24.6841Z" 
            className="fill-background dark:fill-slate-900" />
        </svg>
      </div>

      <div className="relative bg-background dark:bg-slate-900">
        <div className="container mx-auto py-12 px-4 md:px-6">
          {/* Contact Info Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 -mt-12 relative z-10"
          >
            {[
              {
                icon: <Phone className="h-6 w-6" />,
                title: "Call Us",
                details: "+1 (555) 123-4567",
                color: "from-rose-500 to-pink-600",
                description: "Available Monday-Friday, 9am-5pm PST",
              },
              {
                icon: <Mail className="h-6 w-6" />,
                title: "Email Us",
                details: "support@Trendora.com",
                color: "from-violet-500 to-purple-600",
                description: "We usually respond within 24 hours",
              },
              {
                icon: <MapPin className="h-6 w-6" />,
                title: "Visit Our Office",
                details: "123 Market Street, San Francisco, CA 94105",
                color: "from-blue-500 to-cyan-500",
                description: "Open for appointments Monday-Friday",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <div className="group h-full overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="h-2 bg-gradient-to-r w-full" style={{ 
                    backgroundImage: `linear-gradient(to right, var(--${item.color.split('-')[1]}/80), var(--${item.color.split('-')[3]}/80))` 
                  }}></div>
                  <div className="bg-white dark:bg-slate-800 h-full p-8">
                    <div className="mb-5 relative">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center",
                        "bg-slate-100 dark:bg-slate-700 group-hover:scale-110 transition-transform duration-300"
                      )}>
                        <div className="text-gradient bg-gradient-to-br from-primary to-purple-600">
                          {item.icon}
                        </div>
                      </div>
                      <motion.div 
                        className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-xs font-bold"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        {i + 1}
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-xl mb-3 font-medium text-primary">{item.details}</p>
                    <p className="text-slate-500 dark:text-slate-400">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Contact Section - Updated with new design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
            {/* Contact Form - Glass morphic style */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              id="contact-form"
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-blue-500/20 rounded-3xl transform rotate-3 scale-[1.02] blur-sm"></div>
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-blue-500"></div>
                
                <div className="p-8 md:p-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                      <MessageSquare className="h-7 w-7" />
                      Send Us a Message
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">
                      Fill out the form and our team will get back to you within 24 hours.
                    </p>
                    
                    <AnimatePresence>
                      {formSubmitted ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center py-16 text-center"
                        >
                          <motion.div 
                            animate={{ scale: [0.8, 1.2, 1], rotate: [0, 10, 0] }}
                            transition={{ duration: 0.7 }}
                            className="relative"
                          >
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
                            <div className="relative text-primary">
                              <CheckCircle2 className="h-20 w-20" />
                            </div>
                          </motion.div>
                          <h3 className="text-2xl font-bold mt-6 mb-2">Thank You!</h3>
                          <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                            Your message has been sent successfully. We&apos;ll get back to you soon.
                          </p>
                        </motion.div>
                      ) : (
                        <motion.form 
                          onSubmit={handleSubmit} 
                          className="space-y-5"
                          initial="hidden"
                          animate="visible"
                          variants={containerVariants}
                        >
                          <motion.div variants={itemVariants}>
                            <label htmlFor="name" className="text-sm font-medium mb-1 block">Your Name</label>
                            <Input
                              id="name"
                              placeholder="John Doe"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="border-slate-200 dark:border-slate-700 h-12 rounded-xl focus-visible:ring-primary"
                            />
                          </motion.div>
                          
                          <motion.div variants={itemVariants}>
                            <label htmlFor="email" className="text-sm font-medium mb-1 block">Email Address</label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="border-slate-200 dark:border-slate-700 h-12 rounded-xl focus-visible:ring-primary"
                            />
                          </motion.div>
                          
                          <motion.div variants={itemVariants}>
                            <label htmlFor="subject" className="text-sm font-medium mb-1 block">Subject</label>
                            <Input
                              id="subject"
                              placeholder="How can we help you?"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="border-slate-200 dark:border-slate-700 h-12 rounded-xl focus-visible:ring-primary"
                            />
                          </motion.div>
                          
                          <motion.div variants={itemVariants}>
                            <label htmlFor="message" className="text-sm font-medium mb-1 block">Your Message</label>
                            <Textarea
                              id="message"
                              placeholder="Type your message here..."
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              required
                              className="min-h-[150px] border-slate-200 dark:border-slate-700 rounded-xl focus-visible:ring-primary bg-accent/10"
                            />
                          </motion.div>
                          
                          <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              type="submit"
                              size="lg"
                              className="w-full rounded-xl flex items-center justify-center gap-2 mt-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                            >
                              Send Message
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Map & Contact Info - Redesigned with layered effect */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0952660915477!2d-122.40052722396792!3d37.78774771161758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858062c0f366e7%3A0x7bed2e47efecf503!2sMarket%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1715032099798!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Trendora Office Location"
                  className="w-full"
                ></iframe>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                  <h3 className="font-medium text-sm">Trendora Headquarters</h3>
                  <p className="text-xs opacity-90">123 Market Street, San Francisco, CA 94105</p>
                </div>
              </motion.div>

              {/* Business Hours - Redesigned with card effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-3xl p-8 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-primary" />
                  Our Business Hours
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      day: "Monday - Friday",
                      hours: "9:00 AM - 6:00 PM",
                      icon: <Calendar className="h-5 w-5 text-primary" />
                    },
                    {
                      day: "Saturday",
                      hours: "10:00 AM - 4:00 PM",
                      icon: <Calendar className="h-5 w-5 text-primary" />
                    },
                    {
                      day: "Sunday",
                      hours: "Closed",
                      icon: <Calendar className="h-5 w-5 text-primary" />
                    },
                    {
                      day: "Email Response Time",
                      hours: "Within 24 Hours",
                      icon: <Mail className="h-5 w-5 text-primary" />
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-1 bg-primary/10 p-2 rounded-full">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium">{item.day}</p>
                        <p className="text-slate-500 dark:text-slate-400">{item.hours}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Service commitment - Updated with subtle animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg bg-white dark:bg-slate-800 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <motion.div
                        className="absolute -inset-4 rounded-full bg-primary/10 blur-md"
                        animate={floatingAnimation}
                      />
                      <motion.div 
                        className="relative bg-gradient-to-br from-primary to-purple-600 p-3 rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        <CheckCircle2 className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Our Promise to You</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md">
                      We&apos;re committed to providing excellent customer service and will respond to all inquiries as quickly as possible.
                    </p>
                    
                    {/* Testimonial mini */}
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 w-full">
                      <div className="flex items-center justify-center">
                        <div className="flex gap-1 text-amber-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm italic text-slate-500 dark:text-slate-400">
                        &ldquo;Trendora&apos;s customer service is outstanding. They responded to my inquiry within hours!&rdquo;
                      </p>
                      <p className="text-xs mt-2 font-medium">— Sarah T., Happy Customer</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-4"
              >
                Why Choose <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Trendora</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }} 
                className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
              >
                Our dedicated team ensures your second-hand shopping experience is seamless from start to finish
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Community Support",
                  description: "Join a growing community of eco-conscious buyers and sellers dedicated to sustainable shopping."
                },
                {
                  icon: <CheckCircle2 className="h-8 w-8" />,
                  title: "Verified Listings",
                  description: "All listings undergo a verification process to ensure quality and accuracy of descriptions."
                },
                {
                  icon: <Truck className="h-8 w-8" />,
                  title: "Secure Transactions",
                  description: "Our platform facilitates safe payments and shipping, protecting both buyers and sellers."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 p-8 bg-white dark:bg-slate-800 shadow-lg"
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section - Redesigned with new interaction */}
          <motion.div
            id="faqs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24 relative"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <motion.div 
                className="absolute top-20 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
                animate={{
                  x: [0, -30, 0],
                  y: [0, -30, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 20
                }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
                animate={{
                  x: [0, 30, 0],
                  y: [0, 20, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 15,
                  delay: 5
                }}
              />
            </div>
            
            <div className="text-center mb-12">
              <div className="inline-block p-1.5 rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 mb-4">
                <div className="bg-white dark:bg-slate-800 rounded-full px-6 py-1.5">
                  <span className="text-sm font-medium text-primary">Got Questions?</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                Find quick answers to common questions about our marketplace
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <HelpCircle className="h-5 w-5" />,
                  q: "How do I list items for sale?",
                  a: "To list an item, log into your account, click on 'Sell' in the navigation menu, fill out the product details form, upload photos, set your price, and submit. Your listing will be reviewed and published within 24 hours.",
                },
                {
                  icon: <CheckCircle2 className="h-5 w-5" />,
                  q: "What payment methods do you accept?",
                  a: "We accept major credit and debit cards, PayPal, and bank transfers. All payments are securely processed through our trusted payment gateways.",
                },
                {
                  icon: <Truck className="h-5 w-5" />,
                  q: "How is shipping handled?",
                  a: "Sellers are responsible for shipping items to buyers. When creating a listing, sellers can specify shipping costs or offer free shipping. We recommend using tracked shipping methods for security.",
                },
                {
                  icon: <HelpCircle className="h-5 w-5" />,
                  q: "What if I receive a damaged item?",
                  a: "If you receive an item that's different from the description or damaged, you can open a dispute within 48 hours of delivery. Provide photos and details, and our support team will help resolve the issue.",
                },
                {
                  icon: <HelpCircle className="h-5 w-5" />,
                  q: "How long does delivery take?",
                  a: "Delivery times depend on the seller's location and the shipping method they've chosen. Most domestic shipments arrive within 3-7 business days. International shipments may take 1-4 weeks.",
                },
                {
                  icon: <CheckCircle2 className="h-5 w-5" />,
                  q: "Are there any seller fees?",
                  a: "Trendora charges a 5% commission on successful sales. There's no listing fee, so you only pay when your item sells. Premium listing features are available for additional fees.",
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 } 
                  }}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden transition-all duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-primary/10">
                        <div className="text-primary">
                          {faq.icon}
                        </div>
                      </div>
                      {faq.q}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400">{faq.a}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section - Modernized design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl mb-12"
          >
            {/* Gradient layers */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 opacity-90"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent"></div>
              <motion.div 
                className="absolute top-0 left-0 w-96 h-96 bg-primary opacity-20 rounded-full blur-[100px]"
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 15,
                  ease: "easeInOut",
                }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-[100px]"
                animate={{
                  x: [0, -100, 0],
                  y: [0, -50, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 18,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-10 md:p-16 text-white">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                  <div className="space-y-6 md:max-w-lg">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-4xl font-bold"
                    >
                      Join Our Community Today
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="text-slate-300"
                    >
                      Be part of our growing community of conscious consumers and sellers.
                      Start buying and selling pre-loved items today!
                    </motion.p>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="default"
                        size="lg"
                        className="font-semibold rounded-full px-10 bg-white hover:bg-white/90 text-slate-900"
                      >
                        Sign Up Now
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline" 
                        size="lg"
                        className="font-semibold rounded-full border-white text-black dark:text-white hover:bg-white/20 px-10"
                      >
                        Learn More
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}