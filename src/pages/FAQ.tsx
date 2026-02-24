import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, HelpCircle, ShoppingBag, CreditCard, Truck } from "lucide-react";

const faqData = [
  {
    category: "Shopping",
    icon: <ShoppingBag className="h-5 w-5" />,
    questions: [
      {
        q: "How do I place an order?",
        a: "Browse our products, add your favorites to the cart, and proceed to checkout. You'll receive a confirmation email once the order is placed.",
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled within 1 hour of placement. After that, they may have already entered the shipping process.",
      },
    ],
  },
  {
    category: "Payment",
    icon: <CreditCard className="h-5 w-5" />,
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, PayPal, and Apple Pay for a secure checkout experience.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes, we use industry-standard SSL encryption and never store your full payment details on our servers.",
      },
    ],
  },
  {
    category: "Shipping",
    icon: <Truck className="h-5 w-5" />,
    questions: [
      {
        q: "How long does shipping take?",
        a: "Delivery typically takes 3-5 business days for domestic orders and 7-14 days for international shipping.",
      },
      {
        q: "Do you offer free shipping?",
        a: "We offer free standard shipping on all orders over $100 within the continental US.",
      },
    ],
  },
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group hover:text-accent transition-colors"
      >
        <span className="font-semibold text-lg">{question}</span>
        <div className={`p-1 rounded-full bg-secondary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  return (
    <div className="container py-20 max-w-4xl">
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-4"
        >
          <HelpCircle className="h-4 w-4" />
          Support Center
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-lg">
          Everything you need to know about shopping on Infinitative.
        </p>
      </div>

      <div className="space-y-12">
        {faqData.map((category, i) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6 pb-2 border-b-2 border-accent/20 w-fit">
              <span className="text-accent">{category.icon}</span>
              <h2 className="text-xl font-bold uppercase tracking-widest">{category.category}</h2>
            </div>

            <div className="bg-card rounded-2xl border px-6 shadow-sm">
              {category.questions.map((item) => (
                <FAQItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-primary to-primary/90 text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <h3 className="text-2xl font-bold mb-4 relative z-10">Still have questions?</h3>
        <p className="text-primary-foreground/70 mb-8 relative z-10 max-w-md mx-auto">
          Can't find the answer you're looking for? Please chat with our friendly team.
        </p>
        <button className="bg-accent text-accent-foreground px-10 py-4 rounded-full font-bold hover:bg-accent/90 transition-all hover:scale-105 active:scale-95 shadow-lg relative z-10">
          Get in Touch
        </button>
      </div>
    </div>
  );
};

export default FAQ;
