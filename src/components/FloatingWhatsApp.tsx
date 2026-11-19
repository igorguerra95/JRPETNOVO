import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data/petShopData';

export function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.phoneDigits}?text=${encodeURIComponent(
    `Olá! Gostaria de entrar em contato com ${CONTACT_INFO.businessName}.`
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Conversar no WhatsApp pelo número ${CONTACT_INFO.phoneDisplay}`}
        title={`WhatsApp · ${CONTACT_INFO.phoneDisplay}`}
        className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-float hover:bg-primary-bright transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-primary-bright/35 animate-ping [animation-duration:2.6s]"
        />
        <MessageCircle className="relative h-6 w-6" aria-hidden="true" />
      </a>
    </div>
  );
}
