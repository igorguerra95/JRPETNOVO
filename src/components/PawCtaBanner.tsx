import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, PawPrint } from 'lucide-react';

interface PawCtaBannerProps {
  onContactClick: () => void;
}

const FLOATING_PAWS = [
  { top: '12%', left: '6%', rotate: -18, size: 34, delay: 0 },
  { top: '68%', left: '11%', rotate: 14, size: 26, delay: 0.4 },
  { top: '18%', right: '8%', rotate: 22, size: 38, delay: 0.2 },
  { top: '70%', right: '14%', rotate: -12, size: 28, delay: 0.6 },
  { top: '42%', left: '22%', rotate: 8, size: 22, delay: 0.8 },
  { top: '38%', right: '24%', rotate: -24, size: 24, delay: 0.5 },
];

export function PawCtaBanner({ onContactClick }: PawCtaBannerProps) {
  return (
    <section className="py-10 sm:py-14 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[2.25rem] bg-cta-gradient px-6 py-14 sm:px-12 sm:py-16 text-center shadow-float"
        >
          {/* Patinhas flutuantes decorativas (compositor transform/opacity) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {FLOATING_PAWS.map((paw, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.16, y: 0 }}
                animate={{
                  opacity: [0.14, 0.26, 0.14],
                  y: [-6, 8, -6],
                }}
                transition={{
                  duration: 4.5 + index * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: paw.delay,
                }}
                style={{
                  position: 'absolute',
                  top: paw.top,
                  left: paw.left,
                  right: paw.right,
                  transform: `rotate(${paw.rotate}deg)`,
                }}
                className="text-primary-foreground"
              >
                <PawPrint style={{ width: paw.size, height: paw.size }} />
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="text-sm font-bold text-primary-foreground/90 tracking-wide">
              Agenda aberta para banho, tosa e pedidos da loja
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground [text-wrap:balance]">
              Pronto para ver seu pet voltar cheiroso, calmo e radiante?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/90 leading-relaxed">
              Reserve um horário exclusivo ou monte seu pedido de rações, camas e brinquedos com atendimento direto da nossa equipe.
            </p>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-surface px-8 py-4 text-base font-extrabold text-primary shadow-float hover:scale-[1.02] transition-transform duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface"
              >
                <span>Entrar em contato</span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
