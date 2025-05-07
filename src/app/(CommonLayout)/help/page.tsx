'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Camera,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  CreditCard,
  HelpCircle,
  Mail,
  MessageSquare,
  RefreshCw,
  Search,
  Shield,
  ShoppingBag,
  Tag,
  Truck,
  UserPlus,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

// FAQ categories with their respective questions
const faqCategories = [
  {
    id: 'account',
    icon: <UserPlus size={20} />,
    name: 'Account & Registration',
    description: 'Creating and managing your SwapNest account',
    questions: [
      {
        question: 'How do I create a SwapNest account?',
        answer: `To create a SwapNest account:
        1. Click "Sign Up" in the top right corner
        2. Enter your email address and create a password
        3. Verify your email address through the confirmation link
        4. Complete your profile with name and basic information`,
      },
      {
        question: 'How do I reset my password?',
        answer: `To reset your password:
        1. Click "Sign In" in the navigation menu
        2. Select "Forgot Password"
        3. Enter your email address
        4. Follow the instructions in the password reset email`,
      },
      {
        question: 'Can I change my username/display name?',
        answer:
          "Yes, you can change your display name in your account settings. Go to your profile, select 'Edit Profile,' and update your name information.",
      },
    ],
  },
  {
    id: 'buying',
    icon: <ShoppingBag size={20} />,
    name: 'Buying Items',
    description: 'Searching, purchasing and collecting items',
    questions: [
      {
        question: "How do I find items I'm interested in?",
        answer:
          'You can browse categories on the homepage, use the search bar, or apply filters in the Marketplace to narrow down listings by category, price, condition, and more.',
      },
      {
        question: 'How do I purchase an item?',
        answer: `To purchase an item:
        1. Navigate to the item's details page
        2. Click the "Purchase" button 
        3. Complete checkout with your payment information
        4. Arrange delivery or pickup with the seller`,
      },
      {
        question: 'What payment methods are accepted?',
        answer:
          'SwapNest accepts major credit/debit cards, PayPal, and bank transfers. All transactions are securely processed through our trusted payment gateways.',
      },
    ],
  },
  {
    id: 'selling',
    icon: <Tag size={20} />,
    name: 'Selling Items',
    description: 'Creating listings and managing sales',
    questions: [
      {
        question: 'How do I list an item for sale?',
        answer: `To create a listing:
        1. Click "Sell" in the navigation menu
        2. Fill out the listing form with title, description, price, etc.
        3. Upload clear photos of your item
        4. Set your preferred payment and delivery methods
        5. Submit for review`,
      },
      {
        question: 'What are the fees for selling on SwapNest?',
        answer:
          'SwapNest charges a 5% commission on successful sales. There are no listing fees, so you only pay when your item sells.',
      },
      {
        question: 'How do I take good photos for my listing?',
        answer:
          'Use good lighting, clean backgrounds, and multiple angles. Show any flaws honestly. Include size references and original packaging if available.',
      },
    ],
  },
  {
    id: 'shipping',
    icon: <Truck size={20} />,
    name: 'Shipping & Delivery',
    description: 'Sending and receiving purchases',
    questions: [
      {
        question: 'Who is responsible for shipping costs?',
        answer:
          'Sellers set their shipping policies and costs. Some offer free shipping, while others charge based on location and item size. Shipping details are listed on each product page.',
      },
      {
        question: 'How long does delivery take?',
        answer:
          'Delivery times vary by seller location and shipping method. Most domestic deliveries take 3-7 business days. International shipments may take 1-4 weeks.',
      },
      {
        question: 'Can I arrange local pickup instead of shipping?',
        answer:
          'Yes, many sellers offer local pickup options. This can be arranged through the messaging system after purchase. Always meet in a safe, public location.',
      },
    ],
  },
  {
    id: 'safety',
    icon: <Shield size={20} />,
    name: 'Safety & Security',
    description: 'Staying safe while using SwapNest',
    questions: [
      {
        question: 'How does SwapNest protect my personal information?',
        answer:
          'We use industry-standard encryption and security measures to protect your data. We never share your personal information with other users without your consent.',
      },
      {
        question: 'What should I do if I receive a damaged item?',
        answer:
          "If you receive an item that doesn't match the description or is damaged, open a dispute within 48 hours of delivery. Provide photos and details for our support team to review.",
      },
      {
        question: 'How can I spot and avoid potential scams?',
        answer: `Look out for warning signs:
        • Sellers refusing to use our secure payment system
        • Prices that seem too good to be true
        • Sellers pushing for rushed decisions
        • Requests for payment via wire transfer or gift cards
        
        Always keep communication within SwapNest's messaging system.`,
      },
    ],
  },
  {
    id: 'returns',
    icon: <RefreshCw size={20} />,
    name: 'Returns & Refunds',
    description: 'Policies for returning items',
    questions: [
      {
        question: "What is SwapNest's return policy?",
        answer:
          "Return policies are set by individual sellers. Check the listing details for specific return information before purchasing. SwapNest encourages sellers to accept returns if items don't match their descriptions.",
      },
      {
        question: 'How do I request a refund?',
        answer: `To request a refund:
        1. Go to your purchase history
        2. Select the order in question
        3. Click "Request Refund"
        4. Provide the reason for your refund request
        5. Submit supporting evidence (photos if applicable)`,
      },
      {
        question: 'How long do refunds take to process?',
        answer:
          'Once approved, refunds typically take 3-5 business days to appear in your original payment method. Processing times may vary depending on your bank or payment provider.',
      },
    ],
  },
]

// Popular questions that appear at the top
const popularQuestions = [
  {
    question: 'How do I create a listing?',
    categoryId: 'selling',
    questionIndex: 0,
  },
  {
    question: 'What payment methods are accepted?',
    categoryId: 'buying',
    questionIndex: 2,
  },
  {
    question: 'How does SwapNest protect my personal information?',
    categoryId: 'safety',
    questionIndex: 0,
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('account')
  const [searchResults, setSearchResults] = useState<
    Array<{ categoryId: string; questionIndex: number }>
  >([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [messageFormData, setMessageFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Search functionality - Client-side implementation
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const results: Array<{ categoryId: string; questionIndex: number }> = []

      faqCategories.forEach((category) => {
        category.questions.forEach((question, qIndex) => {
          const questionText = question.question.toLowerCase()
          const answerText = question.answer.toLowerCase()
          const searchLower = searchQuery.toLowerCase()

          if (
            questionText.includes(searchLower) ||
            answerText.includes(searchLower)
          ) {
            results.push({ categoryId: category.id, questionIndex: qIndex })
          }
        })
      })

      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    // Scroll to category
    if (categoryRefs.current[categoryId]) {
      categoryRefs.current[categoryId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const handleMessageInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setMessageFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Show success message and toast
    setShowSuccessMessage(true)
    toast.success("Message sent successfully! We'll get back to you soon.", {
      duration: 5000,
      icon: '🎉',
    })

    // Reset the form after showing success message
    setTimeout(() => {
      setMessageFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      setShowSuccessMessage(false)
    }, 3000)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-background -z-10"></div>

        {/* Animated shapes */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute bottom-10 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex justify-center mb-4"
            >
              <Badge
                variant="outline"
                className="px-4 py-1 border-primary/20 bg-primary/5 text-primary"
              >
                Help Center
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-extrabold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              How can we <span className="text-primary">help you</span>?
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Find answers to common questions or contact our support team
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="max-w-xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search for answers..."
                  className="pl-10 h-12 rounded-full border-primary/20 focus:border-primary focus-visible:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && searchResults.length > 0 && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-50 max-h-80 overflow-y-auto">
                    <div className="p-4">
                      <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                        Found {searchResults.length} results
                      </h3>
                      {searchResults.map((result, index) => {
                        const category = faqCategories.find(
                          (cat) => cat.id === result.categoryId,
                        )
                        const question =
                          category?.questions[result.questionIndex]
                        if (!question) return null

                        return (
                          <div
                            key={index}
                            className="py-3 px-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md cursor-pointer transition-colors"
                            onClick={() => {
                              setActiveCategory(result.categoryId)
                              setExpandedQuestion(
                                `${result.categoryId}-${result.questionIndex}`,
                              )
                              setSearchQuery('')
                              // Scroll to the question after a small delay to ensure rendering
                              setTimeout(() => {
                                const el = document.getElementById(
                                  `question-${result.categoryId}-${result.questionIndex}`,
                                )
                                if (el)
                                  el.scrollIntoView({ behavior: 'smooth' })
                              }, 100)
                            }}
                          >
                            <h4 className="text-sm font-medium">
                              {question.question}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Category: {category?.name}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {searchQuery.trim().length > 2 &&
                  searchResults.length === 0 && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-50">
                      <div className="p-4 text-center">
                        <p className="text-muted-foreground">
                          No results found for `{searchQuery}`
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="py-10 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-2xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Popular Questions
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {popularQuestions.map((item, i) => {
              const category = faqCategories.find(
                (cat) => cat.id === item.categoryId,
              )
              const question = category?.questions[item.questionIndex]

              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeIn}
                  className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="p-2 rounded-full bg-primary/10 w-fit mb-4">
                    <HelpCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    {question?.question}
                  </h3>
                  <Button
                    variant="ghost"
                    className="text-sm text-primary flex items-center mt-2 p-0 h-auto"
                    onClick={() => {
                      setActiveCategory(item.categoryId)
                      setExpandedQuestion(
                        `${item.categoryId}-${item.questionIndex}`,
                      )
                      // Scroll to the question
                      setTimeout(() => {
                        const el = document.getElementById(
                          `question-${item.categoryId}-${item.questionIndex}`,
                        )
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }, 100)
                    }}
                  >
                    View answer <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.h3
                  className="text-xl font-bold mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Help Topics
                </motion.h3>

                <motion.div
                  className="space-y-2"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {faqCategories.map((category, i) => (
                    <motion.button
                      key={category.id}
                      custom={i}
                      variants={fadeIn}
                      className={cn(
                        'w-full flex items-center gap-2 p-3 rounded-lg text-left transition-colors',
                        activeCategory === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800',
                      )}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <span
                        className={cn(
                          'p-1.5 rounded-md',
                          activeCategory === category.id
                            ? 'bg-white/20'
                            : 'bg-primary/10',
                        )}
                      >
                        {category.icon}
                      </span>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs opacity-80">
                          {category.description}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>

                {/* Contact Support Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="mt-8"
                >
                  <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 p-6 rounded-xl">
                    <div className="bg-white dark:bg-slate-900 rounded-lg p-4 text-center">
                      <Mail className="h-6 w-6 mx-auto mb-3 text-primary" />
                      <h4 className="font-bold">Need more help?</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Can&apos;t find what you&apos;re looking for?
                      </p>
                      <Link href="#contact-form">
                        <Button size="sm" className="w-full">
                          Contact Support
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* FAQ Content Area */}
            <div className="lg:col-span-3">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-12"
              >
                {faqCategories.map((category, catIndex) => (
                  <motion.div
                    key={category.id}
                    ref={(el) => {
                      categoryRefs.current[category.id] = el
                    }}
                    id={category.id}
                    custom={catIndex}
                    variants={fadeIn}
                    className="scroll-mt-24"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-full bg-primary/10">
                        {category.icon}
                      </div>
                      <h2 className="text-2xl font-bold">{category.name}</h2>
                    </div>

                    <div className="space-y-4">
                      {category.questions.map((item, qIndex) => (
                        <div
                          key={qIndex}
                          id={`question-${category.id}-${qIndex}`}
                          className={cn(
                            'border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden transition-all duration-300',
                            expandedQuestion === `${category.id}-${qIndex}`
                              ? 'shadow-md'
                              : '',
                          )}
                        >
                          <button
                            className="w-full flex justify-between items-center p-5 text-left bg-white dark:bg-slate-800"
                            onClick={() =>
                              setExpandedQuestion(
                                expandedQuestion === `${category.id}-${qIndex}`
                                  ? null
                                  : `${category.id}-${qIndex}`,
                              )
                            }
                          >
                            <h3 className="font-medium pr-4">
                              {item.question}
                            </h3>
                            <ChevronDown
                              className={cn(
                                'h-5 w-5 text-muted-foreground transition-transform',
                                expandedQuestion === `${category.id}-${qIndex}`
                                  ? 'transform rotate-180'
                                  : '',
                              )}
                            />
                          </button>

                          {expandedQuestion === `${category.id}-${qIndex}` && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="p-5 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700"
                            >
                              <div className="whitespace-pre-line text-muted-foreground">
                                {item.answer}
                              </div>

                              <div className="mt-4 flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">
                                  Was this helpful?
                                </span>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      toast.success('Thanks for your feedback!')
                                    }
                                  >
                                    Yes
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      toast(
                                        "Thanks for your feedback. We'll improve this answer.",
                                        {
                                          icon: '🔄',
                                        },
                                      )
                                      // Smooth scroll to contact form
                                      document
                                        .getElementById('contact-form')
                                        ?.scrollIntoView({
                                          behavior: 'smooth',
                                        })
                                    }}
                                  >
                                    No
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form - Creative Redesign */}
      <section
        id="contact-form"
        className="py-16 relative overflow-hidden scroll-mt-24"
      >
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-950"></div>

        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <motion.div
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-40 right-10 w-80 h-80 rounded-full bg-purple-500/5 dark:bg-purple-500/10"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.4, 0.6],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
          <motion.div
            className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-primary/5 dark:bg-primary/10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </div>

        {/* Floating icons */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {[
            {
              icon: <Mail className="h-6 w-6" />,
              top: '10%',
              left: '5%',
              duration: 15,
            },
            {
              icon: <MessageSquare className="h-4 w-4" />,
              top: '20%',
              left: '80%',
              duration: 12,
            },
            {
              icon: <HelpCircle className="h-5 w-5" />,
              top: '85%',
              left: '10%',
              duration: 18,
            },
            {
              icon: <CheckCircle className="h-4 w-4" />,
              top: '70%',
              left: '85%',
              duration: 14,
            },
            {
              icon: <Mail className="h-4 w-4" />,
              top: '45%',
              left: '5%',
              duration: 20,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/20 dark:text-primary/30"
              style={{ top: item.top, left: item.left }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 1.5,
              }}
            >
              {item.icon}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <div className="mb-8 inline-flex items-center justify-center">
  <div className="relative w-24 h-24">
    {/* Outer spinning rings with gradient effect */}
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-full h-full rounded-full border-2 border-dashed border-primary/30 opacity-70"></div>
    </motion.div>
    
    <motion.div
      className="absolute inset-[2px]"
      animate={{ rotate: -360 }}
      transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-full h-full rounded-full border border-purple-500/20 opacity-90"></div>
    </motion.div>
    
    {/* Pulsing middle circle */}
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        boxShadow: [
          "0 0 0 0 rgba(99, 102, 241, 0.1)",
          "0 0 0 10px rgba(99, 102, 241, 0)",
          "0 0 0 0 rgba(99, 102, 241, 0)"
        ]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-[6px] bg-gradient-to-br from-slate-100/80 to-white dark:from-slate-800/80 dark:to-slate-900 rounded-full shadow-xl flex items-center justify-center"
    >
      {/* Animated mail icon with floating particles */}
      <div className="relative">
        <motion.div 
          className="absolute -inset-2 bg-primary/10 rounded-full blur-md"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* Particle effects */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary"
            style={{
              top: `${-5 + Math.random() * 30}px`,
              left: `${-5 + Math.random() * 30}px`,
              opacity: 0.6
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, Math.random() * 8 - 4, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
        
        <motion.div 
          className="relative z-10"
          whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {/* Envelope back */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-primary p-3 rounded-xl text-white shadow-lg"
            >
              <Mail className="h-8 w-8" />
            </motion.div>
            
            {/* Animated message notification */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.6, 
                type: "spring",
                bounce: 0.5,
                duration: 0.6
              }}
              className="absolute -top-2 -right-2"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg"
              >
                1
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
    
    {/* Decorative orbit elements */}
    <motion.div
      className="absolute w-3 h-3 bg-purple-500 rounded-full shadow-lg"
      style={{ left: "75%", top: "15%" }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    
    <motion.div
      className="absolute w-2 h-2 bg-primary rounded-full shadow-sm"
      style={{ left: "20%", top: "85%" }}
      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.9, 0.6] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    />
    
    <motion.div
      className="absolute w-1.5 h-1.5 bg-amber-500 rounded-full"
      style={{ left: "25%", top: "25%" }}
      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    />
  </div>
</div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                >
                  Still have questions?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-muted-foreground max-w-2xl mx-auto"
                >
                  Our support team is ready to help you with any questions you
                  might have
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Form */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="rounded-3xl overflow-hidden relative">
              {/* Card with 3D effect */}
              <motion.div
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: 'spring' }}
                whileHover={{
                  translateY: -5,
                  boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
                }}
                className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50"
              >
                {/* Top gradient bar */}
                <div className="h-2 bg-gradient-to-r from-primary via-purple-500 to-blue-500"></div>

                <AnimatePresence mode="wait">
                  {showSuccessMessage ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        transition: { duration: 0.2 },
                      }}
                      transition={{
                        duration: 0.5,
                        type: 'spring',
                        bounce: 0.4,
                      }}
                      className="py-20 px-8"
                    >
                      <div className="flex flex-col items-center justify-center text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.1,
                            type: 'spring',
                            bounce: 0.6,
                          }}
                          className="relative mb-6"
                        >
                          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md scale-110"></div>
                          <motion.div
                            className="relative bg-gradient-to-br from-green-500 to-emerald-600 text-white w-20 h-20 rounded-full flex items-center justify-center"
                            animate={{
                              boxShadow: [
                                '0 0 0 0 rgba(34, 197, 94, 0.4)',
                                '0 0 0 20px rgba(34, 197, 94, 0)',
                                '0 0 0 0 rgba(34, 197, 94, 0)',
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: 1,
                              ease: 'easeOut',
                            }}
                          >
                            <motion.div
                              animate={{ rotate: [0, 15, 0, -15, 0] }}
                              transition={{
                                delay: 0.2,
                                duration: 0.6,
                                type: 'spring',
                              }}
                            >
                              <CheckCircle
                                className="h-10 w-10"
                                strokeWidth={2.5}
                              />
                            </motion.div>
                          </motion.div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                            Message Sent!
                          </h3>
                          <p className="text-muted-foreground text-lg max-w-md mx-auto">
                            Thanks for reaching out. We&apos;ll get back to you
                            as soon as possible.
                          </p>

                          {/* Timeline */}
                          <div className="mt-8 max-w-xs mx-auto">
                            <div className="relative flex items-center">
                              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center z-10">
                                <CheckCircle className="h-6 w-6 text-primary" />
                              </div>
                              <div className="flex-1 ml-4">
                                <h4 className="font-medium text-left">
                                  Message received
                                </h4>
                                <p className="text-sm text-muted-foreground text-left">
                                  Just now
                                </p>
                              </div>
                            </div>
                            <div className="w-0.5 h-6 bg-primary/20 ml-6 my-1"></div>
                            <div className="relative flex items-center opacity-60">
                              <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center z-10">
                                <MessageSquare className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                              </div>
                              <div className="flex-1 ml-4">
                                <h4 className="font-medium text-left">
                                  Team review
                                </h4>
                                <p className="text-sm text-muted-foreground text-left">
                                  Within 24 hours
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="p-8 md:p-10"
                    >
                      <motion.form
                        onSubmit={handleContactSubmit}
                        className="space-y-8"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: {},
                          visible: {
                            transition: { staggerChildren: 0.12 },
                          },
                        }}
                      >
                        {/* Top fields with chat bubble style */}
                        <motion.div
                          className="flex flex-col md:flex-row gap-6"
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.5 },
                            },
                          }}
                        >
                          <div className="relative flex-1 group">
                            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/50 to-purple-500/50 opacity-0 group-focus-within:opacity-100 transition-opacity blur"></div>
                            <div className="relative bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700 h-full">
                              <label
                                htmlFor="name"
                                className="inline-flex items-center gap-2 text-sm font-medium mb-2"
                              >
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <svg
                                    className="h-4 w-4 text-primary"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                  </svg>
                                </div>
                                Your Name
                              </label>
                              <Input
                                id="name"
                                name="name"
                                value={messageFormData.name}
                                onChange={handleMessageInputChange}
                                placeholder="John Doe"
                                required
                                className="border-0 bg-slate-50 dark:bg-slate-800/50 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 pl-4"
                              />
                            </div>
                          </div>

                          <div className="relative flex-1 group">
                            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500/50 to-blue-500/50 opacity-0 group-focus-within:opacity-100 transition-opacity blur"></div>
                            <div className="relative bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700 h-full">
                              <label
                                htmlFor="email"
                                className="inline-flex items-center gap-2 text-sm font-medium mb-2"
                              >
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Mail className="h-4 w-4 text-primary" />
                                </div>
                                Email Address
                              </label>
                              <Input
                                id="email"
                                name="email"
                                value={messageFormData.email}
                                onChange={handleMessageInputChange}
                                type="email"
                                placeholder="johndoe@example.com"
                                required
                                className="border-0 bg-slate-50 dark:bg-slate-800/50 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 pl-4"
                              />
                            </div>
                          </div>
                        </motion.div>

                        {/* Subject field */}
                        <motion.div
                          className="relative group"
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.5 },
                            },
                          }}
                        >
                          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500/50 to-primary/50 opacity-0 group-focus-within:opacity-100 transition-opacity blur"></div>
                          <div className="relative bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                            <label
                              htmlFor="subject"
                              className="inline-flex items-center gap-2 text-sm font-medium mb-2"
                            >
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="h-4 w-4 text-primary" />
                              </div>
                              Subject
                            </label>
                            <Input
                              id="subject"
                              name="subject"
                              value={messageFormData.subject}
                              onChange={handleMessageInputChange}
                              placeholder="What is your question about?"
                              required
                              className="border-0 bg-slate-50 dark:bg-slate-800/50 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 pl-4"
                            />
                          </div>
                        </motion.div>

                        {/* Message field */}
                        <motion.div
                          className="relative group"
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.5 },
                            },
                          }}
                        >
                          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/50 to-purple-500/50 opacity-0 group-focus-within:opacity-100 transition-opacity blur"></div>
                          <div className="relative bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                            <label
                              htmlFor="message"
                              className="inline-flex items-center gap-2 text-sm font-medium mb-3"
                            >
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <HelpCircle className="h-4 w-4 text-primary" />
                              </div>
                              Your Question
                            </label>
                            <div className="relative">
                              <textarea
                                id="message"
                                name="message"
                                value={messageFormData.message}
                                onChange={handleMessageInputChange}
                                placeholder="Please provide as much detail as possible about your question..."
                                rows={5}
                                required
                                className="w-full rounded-lg border-0 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:outline-none focus:ring-0"
                              />

                              {/* Character count and indicator */}
                              <div className="absolute bottom-3 right-3 flex items-center text-xs text-slate-400">
                                <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mr-2">
                                  <motion.div
                                    className="h-full bg-primary"
                                    animate={{
                                      width: `${Math.min(100, messageFormData.message.length / 10)}%`,
                                    }}
                                  />
                                </div>
                                {messageFormData.message.length}/500
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Submit button */}
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.5 },
                            },
                          }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.02, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              type="submit"
                              className="w-full h-12 rounded-xl text-base bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                            >
                              <motion.span
                                className="flex items-center gap-2"
                                initial={{ opacity: 1 }}
                                whileHover={{
                                  scale: 1.05,
                                  transition: {
                                    duration: 0.2,
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                  },
                                }}
                              >
                                Send Message
                                <ArrowRight className="h-5 w-5" />
                              </motion.span>
                            </Button>
                          </motion.div>

                          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                              <CheckCircle className="h-3 w-3" />
                            </div>
                            We typically respond within 24 hours during business
                            days
                          </div>
                        </motion.div>
                      </motion.form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold">Helpful Resources</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Tag className="h-6 w-6" />,
                title: 'Seller Guidelines',
                description: 'Learn how to create effective listings',
                link: '/resources/seller-guidelines',
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: 'Safety Tips',
                description: 'Stay safe when trading second-hand goods',
                link: '/resources/safety-tips',
              },
              {
                icon: <Camera className="h-6 w-6" />,
                title: 'Photography Guide',
                description: 'Take better photos of your items',
                link: '/resources/photography-guide',
              },
              {
                icon: <CreditCard className="h-6 w-6" />,
                title: 'Payment FAQ',
                description: 'Common payment questions answered',
                link: '/resources/payment-faq',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">{item.icon}</div>
                </div>
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>
                <Link href={item.link}>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
