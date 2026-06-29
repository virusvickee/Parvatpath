export default function PrivacyPolicyPage() {
  return (
    <div className="bg-bg-primary text-text-primary min-h-screen pb-20 font-body max-w-4xl mx-auto px-6 py-12 space-y-6">
      <h1 className="font-heading text-3xl md:text-4xl font-extrabold border-b border-border pb-4">
        Privacy Policy
      </h1>
      <p className="text-text-secondary leading-relaxed">
        Parvatpath.com is dedicated to protecting your personal information. This privacy policy explains how we collect and use your details during bookings.
      </p>

      <h2 className="font-heading text-xl font-bold pt-4 text-text-primary">Data We Collect</h2>
      <p className="text-text-secondary text-sm leading-relaxed">
        During yatra registrations, we collect names, age parameters, gender inputs, emergency contact info, email addresses, and phone numbers.
      </p>

      <h2 className="font-heading text-xl font-bold pt-4 text-text-primary">Medical Compliance Data</h2>
      <p className="text-text-secondary text-sm leading-relaxed">
        Altitude health disclosures are kept strictly confidential and shared only with our expedition leaders and attending medical support crews for safety compliance.
      </p>
    </div>
  );
}
