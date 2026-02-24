import { motion } from "framer-motion";
import { Users, Target, ShieldCheck, Zap } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Happy Customers", value: "50K+" },
    { label: "Trusted Vendors", value: "2K+" },
    { label: "Products Available", value: "100K+" },
    { label: "Orders Delivered", value: "200K+" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>

        <div className="container relative z-10 text-center text-primary-foreground">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Redefining High-End <br />
            <span className="text-gradient">Marketplaces</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
          >
            Infinitative connects visionary vendors with discerning customers,
            creating a seamless e-commerce experience built on trust and excellence.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b bg-card">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Behind every order and every vendor partnership, these principles drive our decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8 text-accent" />,
                title: "Community First",
                desc: "We empower local vendors and build strong buyer relationships."
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-accent" />,
                title: "Verified Trust",
                desc: "Every vendor and product is vetted to ensure premium quality standards."
              },
              {
                icon: <Zap className="h-8 w-8 text-accent" />,
                title: "Fastest Delivery",
                desc: "Logistics optimized to get your products home in record time."
              },
              {
                icon: <Target className="h-8 w-8 text-accent" />,
                title: "Visionary Tech",
                desc: "Using cutting-edge AI and global infrastructure to simplify commerce."
              },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-card border hover:border-accent/50 transition-colors group"
              >
                <div className="mb-4 p-3 rounded-xl bg-accent/10 w-fit group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
                  alt="Our Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-48 w-48 rounded-full bg-accent/20 blur-3xl -z-10" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2026, Infinitative was born out of a simple idea: that modern commerce
                  should be as beautiful as the products it showcases. We saw a gap between
                  functional marketplaces and premium user experiences.
                </p>
                <p>
                  Our mission is to provide an infinitely scalable platform that supports
                  micro-entrepreneurs and established brands alike, giving them the tools
                  to reach a global audience without sacrificing their unique brand identity.
                </p>
                <p className="font-semibold text-foreground">
                  Infinitative is more than just a marketplace; it's a movement towards
                  conscious, high-quality trade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
