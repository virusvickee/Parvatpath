'use client';

import { useState } from 'react';

interface WhatsAppButtonProps {
  trekName?: string;
}

export default function WhatsAppButton({ trekName }: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const baseText = trekName
    ? `Hi Parvatpath! I want to know more about the ${trekName} trek.`
    : 'Hi Parvatpath! I want to know more about your Himalayan treks and tours.';

  const encodedText = encodeURIComponent(baseText);
  const whatsappUrl = `https://wa.me/919634923602?text=${encodedText}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {/* Tooltip */}
      <div
        className={`bg-bg-card border border-border text-text-primary px-3 py-1.5 rounded-lg text-xs font-body shadow-xl transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        Chat with us
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-transform duration-300 hover:scale-110 active:scale-95 group"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-green-500/40 animate-ping opacity-75"></span>
        <span className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse"></span>

        {/* WhatsApp Icon (using custom SVG for WhatsApp logo) */}
        <svg
          className="w-7 h-7 fill-current z-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.588 1.45 5.616 1.451 5.393 0 9.778-4.383 9.782-9.77.002-2.612-1.012-5.066-2.857-6.912C17.29 2.078 14.84 1.063 12.228 1.063c-5.396 0-9.786 4.385-9.79 9.772-.001 2.031.529 4.018 1.536 5.76l-.426 1.554.426.252 1.58-.292.05-.03zm10.702-7.37c-.3-.15-1.774-.875-2.048-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.49-.893-.797-1.496-1.783-1.67-2.083-.175-.3-.018-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.492-.51-.675-.52-.172-.007-.368-.008-.567-.008-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.27.495 1.7.632.718.228 1.37.195 1.886.118.574-.085 1.775-.725 2.025-1.425.25-.7.25-1.3 0-1.425-.05-.125-.2-.2-.5-.35z" />
        </svg>
      </a>
    </div>
  );
}
