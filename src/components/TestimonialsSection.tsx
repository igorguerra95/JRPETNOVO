import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { PastelTone, TESTIMONIALS } from '../data/petShopData';

const TONE_SURFACE: Record<PastelTone, string> = {
  green: 'bg-pastel-green/50',
  rose: 'bg-pastel-rose/50',
  blue: 'bg-pastel-blue/50',
  yellow: 'bg-pastel-yellow/55',
  lavender: 'bg-pastel-lavender/55',
  coral: 'bg-pastel-coral/50',
};

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl mb-12"
        >
          <p className="text-sm font-bold text-secondary">Depoimentos</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground [text-wrap:balance]">
            Histórias reais de tutores que confiam quem amam à nossa equipe
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
              className={`flex flex-col justify-between rounded-3xl border border-border ${TONE_SURFACE[item.tone]} p-7 shadow-card transition-transform duration-200 hover:-translate-y-1`}
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1" aria-label="Avaliação 5 de 5 estrelas">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-4 w-4 fill-secondary text-secondary"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-primary/60" aria-hidden="true" />
                </div>

                <p className="mt-4 text-xs font-extrabold text-primary">{item.outcome}</p>

                <blockquote className="mt-3 text-base leading-relaxed text-foreground">
                  “{item.quote}”
                </blockquote>
              </div>

              <footer className="mt-6 border-t border-border/70 pt-4">
                <div className="font-display text-lg font-bold text-foreground">
                  {item.tutorName}
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <span>{item.neighborhood}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.petInfo}</span>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
