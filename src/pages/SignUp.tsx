import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/AuthLayout";
import { z } from "zod";
import { registrationSchema } from "@/schema/validationSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

type CreateAccountType = z.infer<typeof registrationSchema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateAccountType>({
    resolver: zodResolver(registrationSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: CreateAccountType) => {
    try {
      // Mock registration logic
      console.log("Registration data:", data);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    }
  };

  return (
    <>
      <AuthLayout switchUI={true}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
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
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  {...register("firstName")}
                  className="w-full h-11 px-4 rounded-md border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  {...register("lastName")}
                  className="w-full h-11 px-4 rounded-md border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

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
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+234..."
                  {...register("phoneNumber")}
                  className="w-full h-11 px-4 rounded-md border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Country Code
                </label>
                <input
                  type="text"
                  placeholder="NG"
                  {...register("countryCode")}
                  className="w-full h-11 px-4 rounded-md border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                {errors.countryCode && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.countryCode.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Address
              </label>
              <input
                type="text"
                placeholder="123 Street Name"
                {...register("address")}
                className="w-full h-11 px-4 rounded-md border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              {errors.address && (
                <p className="text-sm text-destructive mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Lagos"
                  {...register("city")}
                  className="w-full h-11 px-4 rounded-md border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                {errors.city && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Region
                </label>
                <input
                  type="text"
                  placeholder="Lagos State"
                  {...register("region")}
                  className="w-full h-11 px-4 rounded-md border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                {errors.region && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.region.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Postal Code
                </label>
                <input
                  type="text"
                  placeholder="100001"
                  {...register("postalCode")}
                  className="w-full h-11 px-4 rounded-md border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                {errors.postalCode && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <p className="text-sm text-destructive mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                  className="w-full h-11 px-4 rounded-md border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold mt-2"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-accent hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </AuthLayout>
    </>
  );
};

export default SignUp;
