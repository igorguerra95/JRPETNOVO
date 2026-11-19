import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Dog, Menu, ShoppingBag, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onContactClick: () => void;
}

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contato', href: '#contato' },
];

export function Navbar({ cartCount, onOpenCart, onContactClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    if (mobileOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavJump = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 h-16 border-b border-border/80 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 lg:gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zona 1: Marca (linha única) */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavJump('#inicio');
            }}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Dog className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-display text-base sm:text-lg font-bold tracking-tight text-foreground">
              Jr Pet
            </span>
          </a>

          {/* Zona 2: Links de navegação */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-6 lg:gap-7"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavJump(link.href);
                }}
                className="relative py-1 text-sm font-bold text-foreground/80 hover:text-primary transition-colors whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zona 3: Ação principal + Sacola */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Abrir sacola de compras (${cartCount} ${cartCount === 1 ? 'item' : 'itens'})`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:border-primary/40 hover:bg-pastel-green/60 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ShoppingBag className="h-4.5 w-4.5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[11px] font-extrabold text-secondary-foreground tabular-nums shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onContactClick}
              className="hidden sm:inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary-bright transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Entrar em contato
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu de navegação"
              className="inline-flex md:hidden h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:bg-surface-warm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Sheet / Drawer Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu mobile">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-foreground/40 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-background border-l border-border p-6 flex flex-col justify-between shadow-float"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-border">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Dog className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-base font-bold text-foreground">
                      Jr Pet
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Fechar menu"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-foreground cursor-pointer"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav className="mt-6 flex flex-col gap-2" aria-label="Links do menu mobile">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavJump(link.href);
                      }}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-bold text-foreground hover:bg-pastel-green transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-border flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenCart();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-5 py-3.5 text-sm font-bold text-foreground cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  <span>Ver sacola ({cartCount})</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onContactClick();
                  }}
                  className="flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3.5 text-base font-bold text-primary-foreground shadow-sm cursor-pointer"
                >
                  Entrar em contato
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
