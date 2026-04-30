import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SignUpBusinessStepProps {
  onNext: () => void;
}

export default function SignUpBusinessStep({ onNext }: SignUpBusinessStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-center lg:text-left">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Carfu AI</h1>
        <div className="h-8" />
        <h2 className="text-4xl font-semibold tracking-tight text-zinc-900">Business Details</h2>
        <p className="text-sm text-zinc-500">
          Tell us about your business
        </p>
      </div>

      <div className="grid gap-4 mt-4">
        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-zinc-700">What type of business do you have?</label>
          <Input
            type="text"
            placeholder="e.g. Technology, Retail"
            className="h-12 bg-zinc-50 border border-zinc-100 rounded-2xl px-4 focus-visible:ring-zinc-200 transition-all text-black"
            required
          />
        </div>
        
        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-zinc-700">How long have you been in business?</label>
          <Input
            type="text"
            placeholder="e.g. 2 years, Just started"
            className="h-12 bg-zinc-50 border border-zinc-100 rounded-2xl px-4 focus-visible:ring-zinc-200 transition-all text-black"
            required
          />
        </div>

        <div className="space-y-1.5 text-left">
          <label className="text-sm font-medium text-zinc-700">How many employees do you have?</label>
          <select
            className="w-full h-12 bg-zinc-50 border border-zinc-100 rounded-2xl px-4 focus-visible:ring-zinc-200 transition-all text-black focus:outline-none focus:ring-2 focus:ring-zinc-200"
            required
            defaultValue=""
          >
            <option value="" disabled>Select an option</option>
            <option value="solo">Solo Entrepreneur</option>
            <option value="1-10">1-10 Employees</option>
            <option value="11-50">11-50 Employees</option>
            <option value="51-200">51-200 Employees</option>
            <option value="201+">201+ Employees</option>
          </select>
        </div>

        <Button 
          type="submit"
          className="h-14 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-lg font-medium mt-4"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}
