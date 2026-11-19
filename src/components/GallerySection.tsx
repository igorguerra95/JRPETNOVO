import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Expand, X } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/petShopData';
import { ImageWithFallback } from './ImageWithFallback';

interface GallerySectionProps {
  onContactClick: () => void;
}

export function GallerySection({ onContactClick }: GallerySectionProps) {
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhoto(null);
    };
    if (activePhoto) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [activePhoto]);

  return (
    <section id="galeria" className="py-16 sm:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-primary">Galeria de fotos</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground [text-wrap:balance]">
              Um espaço claro, acolhedor e pensado para zero estresse
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-muted-foreground">
            Clique em qualquer momento da nossa rotina para ampliar e conhecer de perto os detalhes do atendimento.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[240px] sm:auto-rows-[260px] gap-5">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setActivePhoto(item)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.05, ease: 'easeOut' }}
              className={`group relative overflow-hidden rounded-3xl border border-border bg-surface-warm text-left shadow-card cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${item.spanClass}`}
            >
              <ImageWithFallback
                src={item.image}
                alt={item.imageAlt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />

              <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl bg-surface/90 text-foreground opacity-90 transition-transform duration-200 group-hover:scale-105">
                <Expand className="h-4 w-4" aria-hidden="true" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="text-xs font-bold text-pastel-green">{item.petTag}</div>
                <h3 className="mt-1 font-display text-lg sm:text-xl font-bold text-primary-foreground">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm text-primary-foreground/85 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox acessível */}
      <AnimatePresence>
        {activePhoto && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="fixed inset-0 bg-foreground/75 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-surface shadow-float"
            >
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                aria-label="Fechar visualização"
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-surface/95 text-foreground shadow-sm hover:bg-pastel-rose cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="aspect-[16/10] w-full bg-surface-warm">
                <ImageWithFallback
                  src={activePhoto.image}
                  alt={activePhoto.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-primary">{activePhoto.petTag}</div>
                  <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
                    {activePhoto.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{activePhoto.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActivePhoto(null);
                    onContactClick();
                  }}
                  className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary-bright transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Entrar em contato
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
