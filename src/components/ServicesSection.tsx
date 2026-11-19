import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Bath, Car, Check, Heart, Salad, Scissors, Sparkles } from 'lucide-react';
import { PastelTone, SERVICES, ServiceItem } from '../data/petShopData';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

const TONE_MAP: Record<PastelTone, { cardBg: string; iconBg: string; iconColor: string }> = {
  green: {
    cardBg: 'bg-pastel-green/55',
    iconBg: 'bg-pastel-green',
    iconColor: 'text-primary',
  },
  rose: {
    cardBg: 'bg-pastel-rose/55',
    iconBg: 'bg-pastel-rose',
    iconColor: 'text-secondary',
  },
  blue: {
    cardBg: 'bg-pastel-blue/55',
    iconBg: 'bg-pastel-blue',
    iconColor: 'text-primary',
  },
  yellow: {
    cardBg: 'bg-pastel-yellow/60',
    iconBg: 'bg-pastel-yellow',
    iconColor: 'text-foreground',
  },
  lavender: {
    cardBg: 'bg-pastel-lavender/55',
    iconBg: 'bg-pastel-lavender',
    iconColor: 'text-foreground',
  },
  coral: {
    cardBg: 'bg-pastel-coral/55',
    iconBg: 'bg-pastel-coral',
    iconColor: 'text-secondary',
  },
};

function ServiceIcon({ name }: { name: ServiceItem['iconName'] }) {
  switch (name) {
    case 'bath':
      return <Bath className="h-6 w-6" aria-hidden="true" />;
    case 'scissors':
      return <Scissors className="h-6 w-6" aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles className="h-6 w-6" aria-hidden="true" />;
    case 'heart':
      return <Heart className="h-6 w-6" aria-hidden="true" />;
    case 'car':
      return <Car className="h-6 w-6" aria-hidden="true" />;
    case 'salad':
      return <Salad className="h-6 w-6" aria-hidden="true" />;
  }
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="servicos" className="py-16 sm:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12"
        >
          <div className="lg:col-span-7">
            <p className="text-sm font-bold text-primary">Nossos serviços</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground [text-wrap:balance]">
              Rotinas pensadas para o bem-estar físico e emocional do seu pet
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-muted-foreground">
              Cada atendimento acontece com horário reservado, equipe treinada em manejo gentil e
              produtos dermatologicamente seguros para cães e gatos.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const tone = TONE_MAP[service.tone];
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: 'easeOut' }}
                className={`group flex flex-col justify-between rounded-3xl border border-border ${tone.cardBg} p-7 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-surface ${tone.iconColor} shadow-xs`}
                    >
                      <ServiceIcon name={service.iconName} />
                    </span>
                    <span className="text-sm font-extrabold text-primary tabular-nums">
                      {service.price}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <span className="tabular-nums">{service.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{service.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{service.duration}</span>
                  </div>

                  <h3 className="mt-2 font-display text-2xl font-bold text-foreground tracking-tight">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-border/70 pt-4">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-foreground/90">
                        <Check className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-5 py-3 text-sm font-bold text-foreground group-hover:border-primary/50 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span>Entrar em contato</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
