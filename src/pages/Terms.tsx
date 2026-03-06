import { motion } from "framer-motion";
import { Shield, Lock, FileText, Globe } from "lucide-react";

const Terms = () => {
  const sections = [
    {
      icon: <FileText className="h-5 w-5 text-accent" />,
      title: "Terms of Service",
      content: [
        "Welcome to Infinitative. By accessing our platform, you agree to be bound by these terms.",
        "Our marketplace facilitates transactions between independent vendors and customers. Infinitative acts as an intermediary for payment and logistics management.",
        "Users are responsible for maintaining account confidentiality. Unauthorized use of accounts must be reported immediately.",
      ],
    },
    {
      icon: <Lock className="h-5 w-5 text-accent" />,
      title: "Privacy Policy",
      content: [
        "We collect only the necessary information to process orders and improve your shopping experience.",
        "Your data is used for fulfillment, communication, and personalized product recommendations.",
        "Personal information is never sold to third parties. We use industry-standard encryption for all data storage.",
      ],
    },
    {
      icon: <Shield className="h-5 w-5 text-accent" />,
      title: "Intellectual Property",
      content: [
        "All content, logos, and software on Infinitative are the property of Infinitative or its content suppliers.",
        "Users may not reproduce, duplicate, or exploit any portion of the service without express written permission.",
      ],
    },
    {
      icon: <Globe className="h-5 w-5 text-accent" />,
      title: "Governing Law",
      content: [
        "These terms are governed by and construed in accordance with the laws of the jurisdiction in which our headquarters is located.",
        "Any disputes shall be resolved in the appropriate courts within said jurisdiction.",
      ],
    },
  ];

  return (
    <div className="container py-20 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Legal & Privacy</h1>
        <p className="text-muted-foreground text-lg">
          Clear, transparent rules for a better shopping experience.
        </p>
      </motion.div>

      <div className="space-y-12">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold">{section.title}</h2>
            </div>

            <div className="space-y-4 bg-card p-8 rounded-2xl border border-transparent group-hover:border-accent/10 transition-all shadow-sm">
              {section.content.map((text, idx) => (
                <p key={idx} className="text-muted-foreground leading-relaxed">
                  {text}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 p-8 rounded-2xl bg-primary text-primary-foreground text-center">
        <h3 className="text-xl font-bold mb-2">Have questions?</h3>
        <p className="text-primary-foreground/70 mb-6">
          If you have any questions regarding these terms, our support team is here to help.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-accent text-accent-foreground px-8 py-3 rounded-full font-bold hover:bg-accent/90 transition-colors"
        >
          Contact Support
        </motion.button>
      </div>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        Last updated: February 24, 2026
      </p>
    </div>
  );
};

export default Terms;
