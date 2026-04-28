export default function TermsPage() {
  return (
    <div className="py-20 px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms & Conditions</h1>

        <div className="space-y-8 text-zinc-400">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to Carfu AI. By accessing or using our services, you agree to be bound by these terms and conditions. Please read them carefully before using the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Use of Service</h2>
            <p className="leading-relaxed">
              You agree to use our service only for lawful purposes. You are responsible for all content generated using your account and must ensure it does not violate any copyright or local laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Privacy Policy</h2>
            <p className="relaxed">
              Your privacy is important to us. We collect and use your data in accordance with our Privacy Policy. By using Carfu AI, you consent to such processing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Modifications</h2>
            <p className="relaxed">
              We reserve the right to modify or terminate the service for any reason, without notice, at any time. We also reserve the right to change these Terms of Service at any time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
