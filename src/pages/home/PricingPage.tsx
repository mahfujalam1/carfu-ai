import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { FiCheck } from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const plans = [
    {
      name: "Carfu Basic",
      price: "$10",
      description: "Perfect for getting started with AI video generation.",
      features: ["5 Videos per month", "Standard Voice quality", "720p Export", "Community Support"],
    },
    {
      name: "Carfu Pro",
      price: "$25",
      description: "Advanced features for creators and professionals.",
      features: ["Unlimited Videos", "Ultra HD Voice quality", "4K Export", "Priority Support", "Custom Voice Cloning"],
      popular: true,
    },
  ];

  return (
    <div className="py-20 px-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-zinc-400 mb-12">Start creating amazing AI-powered videos today.</p>

        <div className="grid md:grid-cols-2 gap-8 w-full">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={cn(
                "bg-[#2a2a2a] border rounded-3xl p-8 flex flex-col relative",
                plan.popular ? "border-white" : "border-white/10"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </span>
              )}
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-zinc-500 text-sm">/month</span>
              </div>
              <p className="text-zinc-400 mb-8 text-sm">{plan.description}</p>
              
              <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <FiCheck className="text-white" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                to="/auth/signup" 
                className={cn(
                  buttonVariants({ variant: plan.popular ? "default" : "outline" }),
                  "w-full h-12 rounded-xl font-bold transition-all",
                  plan.popular ? "bg-white text-black hover:bg-zinc-200" : "border-white/10 text-white hover:bg-white/5"
                )}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
