import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, HeartHandshake, Sparkles, Star } from 'lucide-react';
import { HERO_IMAGE, HERO_STATS, StatItem } from '../data/petShopData';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroSectionProps {
  onContactClick: () => void;
}

function CountUpStat({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let rafId = 0;
    const duration = 1100;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(stat.value * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, stat.value]);

  const formatted = displayValue.toLocaleString('pt-BR');

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-border bg-surface px-6 py-5 shadow-card transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="font-display text-3xl sm:text-4xl font-bold text-primary tabular-nums tracking-tight">
        {formatted}
        <span className="text-secondary">{stat.suffix}</span>
      </div>
      <div className="mt-1 text-sm font-extrabold text-foreground">{stat.label}</div>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{stat.detail}</p>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function HeroSection({ onContactClick }: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className="relative pt-24 pb-14 lg:pt-28 lg:pb-20 bg-hero-glow grain-overlay overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch min-h-[calc(100vh-13rem)]">
          {/* Coluna de texto */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-6"
          >
            <motion.p
              variants={itemVariants}
              className="text-sm font-bold text-primary tracking-wide flex flex-wrap items-center gap-2"
            >
              <span>Banho botânico</span>
              <span aria-hidden="true" className="text-secondary">·</span>
              <span>Creche acolhedora</span>
              <span aria-hidden="true" className="text-secondary">·</span>
              <span>Boutique natural</span>
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="mt-4 font-display text-[clamp(2.85rem,5.4vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.03em] text-foreground [text-wrap:balance]"
            >
              Cuidado sob medida para cada{' '}
              <span className="text-primary">patinha</span>{' '}
              <span className="text-secondary">feliz.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
            >
              No <strong className="font-extrabold text-foreground">Jr Pet</strong>,
              cada banho, tosa e escolha nutricional nasce do respeito ao ritmo do seu pet — em um espaço
              iluminado, silencioso e cheio de carinho.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-primary px-7 py-4 text-base font-bold text-primary-foreground shadow-card hover:bg-primary-bright hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span>Entrar em contato</span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>

              <a
                href="#produtos"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#produtos')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-6 py-4 text-base font-bold text-foreground hover:border-primary/40 hover:bg-pastel-green/50 transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>Explorar boutique</span>
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-semibold text-muted-foreground"
            >
              <span>Atendimento com hora marcada</span>
              <span aria-hidden="true">·</span>
              <span>Secagem silenciosa sem gaiolas</span>
              <span aria-hidden="true">·</span>
              <span>Cães e gatos</span>
            </motion.div>
          </motion.div>

          {/* Coluna de imagem com badges flutuantes */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-stretch"
          >
            <div className="relative w-full min-h-[340px] sm:min-h-[420px] lg:min-h-[500px] overflow-hidden rounded-[2rem] border border-border bg-surface-warm shadow-card">
              <ImageWithFallback
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                loading="eager"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />

              {/* Badge flutuante superior esquerdo */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
                className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-3 rounded-2xl border border-border/80 bg-surface/95 backdrop-blur-md px-4 py-3 shadow-float"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pastel-green text-primary shrink-0">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-xs font-bold text-muted-foreground">Cosmética Natural</div>
                  <div className="text-sm font-extrabold text-foreground">Banho 100% Hipoalergênico</div>
                </div>
              </motion.div>

              {/* Badge flutuante inferior direito */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-3 rounded-2xl border border-border/80 bg-surface/95 backdrop-blur-md px-4 py-3 shadow-float"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pastel-rose text-secondary shrink-0">
                  <HeartHandshake className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="flex items-center gap-1 text-sm font-extrabold text-foreground tabular-nums">
                    <span>4,9</span>
                    <Star className="h-3.5 w-3.5 fill-secondary text-secondary" aria-hidden="true" />
                    <span className="text-muted-foreground font-semibold">· Tutores locais</span>
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground">
                    Ambiente calmo e acolhedor
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Faixa de métricas em largura total abaixo da divisão hero */}
        <div className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {HERO_STATS.map((stat) => (
            <CountUpStat key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
