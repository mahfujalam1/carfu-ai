import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FiCheckCircle } from "react-icons/fi";

export default function SupportPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="py-20 px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
          <p className="text-zinc-400">Have a question? We're here to help you.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-[#2a2a2a] p-8 rounded-3xl border border-white/10 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Full Name</label>
              <Input 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-zinc-800 border-none h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-white/20" 
                placeholder="Your Name" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Email Address</label>
              <Input 
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-zinc-800 border-none h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-white/20" 
                placeholder="Email@example.com" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Subject</label>
            <Input 
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="bg-zinc-800 border-none h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-white/20" 
              placeholder="How can we help?" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Message</label>
            <textarea 
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full min-h-[150px] bg-zinc-800 border-none rounded-2xl p-4 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 resize-none" 
              placeholder="Tell us more about your issue..."
            />
          </div>
          <Button type="submit" className="w-full h-14 bg-white text-black hover:bg-zinc-200 rounded-xl text-lg font-bold transition-all shadow-lg">
            Send Message
          </Button>
        </form>

        {/* Success Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="bg-[#1c1c1c] border-white/10 text-white rounded-3xl max-w-sm">
            <DialogHeader className="flex flex-col items-center gap-4 py-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <FiCheckCircle size={32} className="text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold">Success!</DialogTitle>
              <p className="text-zinc-400 text-center">
                Your message has been sent. We'll get back to you shortly.
              </p>
              <Button 
                onClick={() => setIsOpen(false)}
                className="mt-4 w-full bg-white text-black hover:bg-zinc-200 rounded-xl"
              >
                Done
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
