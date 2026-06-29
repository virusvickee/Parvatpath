export default function CancellationPolicyPage() {
  return (
    <div className="bg-bg-primary text-text-primary min-h-screen pb-20 font-body max-w-4xl mx-auto px-6 py-12 space-y-6">
      <h1 className="font-heading text-3xl md:text-4xl font-extrabold border-b border-border pb-4">
        Cancellation & Refund Policy
      </h1>
      <p className="text-text-secondary leading-relaxed">
        We understand that travel plans can change due to various unforeseen high altitude weather adjustments or personal reasons. Our policy aims to balance the costs incurred by prep work while keeping refunds fair for trekkers.
      </p>

      <h2 className="font-heading text-xl font-bold pt-4 text-text-primary">Refund Milestones</h2>
      <ul className="list-disc pl-5 space-y-2 text-text-secondary text-sm">
        <li><strong>Cancellation 30+ Days Before Departure:</strong> 100% refund of the trek fees or fully reusable voucher credit with 1-year validity.</li>
        <li><strong>Cancellation 15-30 Days Before Departure:</strong> 50% refund of the total trek fees, or 100% voucher credit with 6-month validity.</li>
        <li><strong>Cancellation under 15 Days Before Departure:</strong> No refund or vouchers. You can request to transfer the booking slot to a qualified family/friend.</li>
      </ul>

      <h2 className="font-heading text-xl font-bold pt-4 text-text-primary">How to Cancel</h2>
      <p className="text-text-secondary text-sm leading-relaxed">
        Send an email directly with your Booking ID to <a href="mailto:bookings@parvatpath.com" className="text-accent hover:underline">bookings@parvatpath.com</a>. Cancellations are processed within 5-7 business days back to the original source bank accounts.
      </p>
    </div>
  );
}
