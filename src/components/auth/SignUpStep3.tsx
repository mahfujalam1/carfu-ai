import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, X, Check, CreditCard, Lock } from "lucide-react";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Step3Props {
  onFinish: () => void;
}

type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isFree?: boolean;
};

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "/7days",
    description: "Start free trial for 7 days",
    features: ["Get less access to our most intelligent model.", "Generate 1 video daily (60secs duration)"],
    isFree: true,
  },
  {
    id: "basic",
    name: "Carfu AI Basic",
    price: "$10",
    period: "/month",
    description: "Get more access to new and powerful features to boost your productivity and creativity",
    features: ["Get more access to our most intelligent model.", "Generate 10 video daily (2min duration)"],
  },
  {
    id: "pro",
    name: "Carfu AI Pro",
    price: "$25",
    period: "/month",
    description: "Get highest access to new and powerful features to boost your productivity and creativity",
    features: ["Get the highest access to our most intelligent model.", "Generate 20 video daily (2min duration)"],
  },
];

export default function Step3({ onFinish }: Step3Props) {
  const navigate = useNavigate();
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });

  const handleFinish = () => {
    setShowPricingModal(true);
  };

  const handleSelectPlan = (plan: Plan) => {
    if (plan.isFree) {
      Cookies.set("demo_token", "demo-val-123", { expires: 7 });
      setShowPricingModal(false);
      onFinish();
      navigate("/chat");
    } else {
      setSelectedPlan(plan);
      setShowPricingModal(false);
      setShowPaymentModal(true);
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      Cookies.set("demo_token", "demo-val-123", { expires: 7 });
      setIsProcessing(false);
      setShowPaymentModal(false);
      onFinish();
      navigate("/chat");
    }, 1500);
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (value: string) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(.{2})/, "$1/");
  };

  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); handleFinish(); }} className="flex flex-col gap-6 text-center lg:text-left">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 font-sans">Carfu AI</h1>
          <div className="h-8" />
          <h2 className="text-4xl font-semibold tracking-tight text-zinc-900">Set up profile</h2>
        </div>

        <div className="flex justify-center mt-4">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-white shadow-sm">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <button type="button" className="absolute bottom-0 right-0 bg-black text-white p-1.5 rounded-full border-2 border-white shadow-sm">
              <Camera size={14} />
            </button>
          </div>
        </div>

        <div className="grid gap-4 mt-4">
          <Input
            placeholder="Enter your name"
            className="h-12 bg-zinc-50 border border-zinc-100 rounded-2xl px-4 focus-visible:ring-zinc-200 transition-all text-black"
            required
          />
          <Button
            type="submit"
            className="h-14 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-lg font-medium mt-4 cursor-pointer"
          >
            Finish
          </Button>
        </div>
      </form>

      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowPricingModal(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-3xl font-bold text-center text-zinc-900 mb-8">Choose your plan</h2>

            {/* Free Plan - Wide Banner */}
            <div
              onClick={() => handleSelectPlan(plans[0])}
              className="flex items-center justify-between border border-zinc-200 rounded-2xl px-6 py-4 mb-4 cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 transition-all group"
            >
              <div>
                <p className="font-semibold text-zinc-900 text-lg">Free</p>
                <p className="text-sm text-zinc-500">Start free trial for 7 days</p>
              </div>
              <button className="border cursor-pointer border-zinc-300 text-zinc-800 text-sm font-medium px-5 py-2 rounded-full group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 transition-all">
                Start
              </button>
            </div>

            {/* Paid Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plans.slice(1).map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => handleSelectPlan(plan)}
                  className="border border-zinc-200 rounded-2xl p-6 cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 transition-all flex flex-col gap-3"
                >
                  <div>
                    <p className="font-semibold text-zinc-900 text-lg">{plan.name}</p>
                    <div className="flex items-baseline gap-0.5 mt-1">
                      <span className="text-2xl font-bold text-zinc-900">{plan.price}</span>
                      <span className="text-sm text-zinc-400">{plan.period}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{plan.description}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 mb-2">Featured</p>
                    <ul className="space-y-1.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-zinc-600">
                          <span className="text-zinc-900 mt-0.5">✦</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="mt-auto cursor-pointer w-full bg-zinc-900 text-white text-sm font-medium py-3 rounded-xl hover:bg-zinc-700 transition-colors">
                    Get {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setShowPricingModal(true);
              }}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Plan Summary */}
            <div className="flex items-center justify-between mb-6 bg-zinc-50 rounded-2xl px-5 py-4">
              <div>
                <p className="font-semibold text-zinc-900">{selectedPlan.name}</p>
                <p className="text-sm text-zinc-500">Billed monthly</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-zinc-900">{selectedPlan.price}</p>
                <p className="text-xs text-zinc-400">{selectedPlan.period}</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-zinc-900 mb-5 flex items-center gap-2">
              <CreditCard size={20} />
              Payment Details
            </h3>

            <div className="grid gap-4">
              <div>
                <label className="text-xs font-medium text-zinc-500 mb-1.5 block">Cardholder Name</label>
                <Input
                  placeholder="John Doe"
                  value={cardData.name}
                  onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                  className="h-12 bg-zinc-50 border border-zinc-200 rounded-xl px-4 text-black focus-visible:ring-zinc-300"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-500 mb-1.5 block">Card Number</label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                  className="h-12 bg-zinc-50 border border-zinc-200 rounded-xl px-4 text-black focus-visible:ring-zinc-300"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-zinc-500 mb-1.5 block">Expiry Date</label>
                  <Input
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                    className="h-12 bg-zinc-50 border border-zinc-200 rounded-xl px-4 text-black focus-visible:ring-zinc-300"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-500 mb-1.5 block">CVC</label>
                  <Input
                    placeholder="123"
                    value={cardData.cvc}
                    onChange={(e) => setCardData({ ...cardData, cvc: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                    className="h-12 bg-zinc-50 border border-zinc-200 rounded-xl px-4 text-black focus-visible:ring-zinc-300"
                    maxLength={3}
                  />
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="h-14 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-base font-medium mt-2 cursor-pointer disabled:opacity-70"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Check size={18} />
                    Pay {selectedPlan.price}
                  </span>
                )}
              </Button>

              <p className="text-xs text-zinc-400 text-center flex items-center justify-center gap-1.5">
                <Lock size={11} />
                Secured by Stripe. Your card info is never stored.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}