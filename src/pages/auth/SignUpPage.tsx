import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1 from "@/components/auth/SignUpStep1";
import Step2 from "@/components/auth/SignUpStep2";
import Step3 from "@/components/auth/SignUpStep3";

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => setStep((s) => s + 1);
  const finish = () => navigate("/chat");

  return (
    <div className="w-full">
      {step === 1 && <Step1 onNext={nextStep} />}
      {step === 2 && <Step2 onNext={nextStep} />}
      {step === 3 && <Step3 onFinish={finish} />}
    </div>
  );
}
