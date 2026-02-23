import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/AuthLayout";
import { z } from "zod";
import { registrationSchema } from "@/schema/registerationSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Role = "customer" | "vendor" | "admin";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>("customer");
  const navigate = useNavigate();

  type CreateAccountType = z.infer<typeof registrationSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateAccountType>({
    resolver: zodResolver(registrationSchema),
    mode: "onBlur",
  });

  const submit = (data: CreateAccountType) => {};

  return (
    <>
      <AuthLayout switchUI={true}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="text-2xl font-bold text-foreground mb-2 inline-block"
          >
            Infinitative
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Create your account
          </h1>
          <p className="text-muted-foreground mb-8">
            Join us today and start selling your products to a wide audience.
            It's quick and easy to get started!
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(submit);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="w-full h-11 px-4 rounded-md border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              {errors.email && (
                <p style={{ color: "red" }} className="text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register('password')}
                  className="w-full h-11 px-4 pr-10 rounded-md border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p style={{ color: "red" }} className="text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-input" />
                Remember me
              </label>
              <a href="#" className="text-accent hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold mt-2"
            >
              Create Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Button
              variant="ghost"
              onClick={() => {
                navigate("/login");
              }}
              className="text-accent hover:underline font-medium"
            >
              Login
            </Button>
          </p>
        </motion.div>
      </AuthLayout>
    </>
  );
};

export default SignUp;
