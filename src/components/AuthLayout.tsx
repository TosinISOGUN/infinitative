import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  switchUI?: boolean;
  children: ReactNode;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  switchUI = false,
}) => {
  const navigate = useNavigate();

  return (
    <section className="relative">

      <Button onClick={() => navigate(-1)} className="m-10 rounded-full absolute bg-slate-100 text-primary hover:bg-white">
        <ArrowLeft />
      </Button>
    <div
      className={`min-h-screen flex ${switchUI ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        {children}
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-md"
        >
          <div className="h-20 w-20 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-8">
            <span className="text-3xl font-bold text-accent">∞</span>
          </div>
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Start Selling Today
          </h2>
          <p className="text-primary-foreground/70">
            Join thousands of vendors on our platform and grow your business
            with powerful tools and analytics.
          </p>
        </motion.div>
      </div>
    </div>
      </section>
  );
};

export default AuthLayout;
