import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { ProductItem } from '../data/petShopData';
import { ImageWithFallback } from './ImageWithFallback';

export interface CartEntry {
  product: ProductItem;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  items: CartEntry[];
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToContact: () => void;
}

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function CartDrawer({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onProceedToContact,
}: CartDrawerProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const subtotal = items.reduce((acc, entry) => acc + entry.product.price * entry.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Sacola de compras"
          className="fixed inset-0 z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/45 backdrop-blur-xs"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background border-l border-border shadow-float flex flex-col"
          >
            {/* Cabeçalho da sacola */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5 bg-surface">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pastel-green text-primary">
                  <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">Sua sacola</h2>
                  <p className="text-xs font-semibold text-muted-foreground tabular-nums">
                    {items.reduce((sum, item) => sum + item.quantity, 0)} itens selecionados
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar sacola"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground hover:bg-surface-warm cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Lista de itens */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-pastel-yellow text-foreground">
                    <ShoppingBag className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                    Sua sacola ainda está vazia
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    Explore nossa seleção de rações naturais, brinquedos e camas para montar seu pedido.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      document.querySelector('#produtos')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-6 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground cursor-pointer"
                  >
                    Ver produtos
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map(({ product, quantity }) => (
                    <li
                      key={product.id}
                      className="flex gap-4 rounded-2xl border border-border bg-surface p-3.5 shadow-xs"
                    >
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-warm">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-primary">{product.category}</p>
                            <h3 className="text-sm font-extrabold text-foreground truncate">
                              {product.name}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(product.id)}
                            aria-label={`Remover ${product.name}`}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-secondary hover:bg-pastel-rose/60 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between gap-3">
                          <div className="inline-flex items-center rounded-xl border border-border bg-background">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(product.id, -1)}
                              aria-label={`Diminuir quantidade de ${product.name}`}
                              className="flex h-8 w-8 items-center justify-center text-foreground hover:bg-surface-warm rounded-l-xl cursor-pointer"
                            >
                              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                            <span className="w-8 text-center text-xs font-extrabold tabular-nums text-foreground">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(product.id, 1)}
                              aria-label={`Aumentar quantidade de ${product.name}`}
                              className="flex h-8 w-8 items-center justify-center text-foreground hover:bg-surface-warm rounded-r-xl cursor-pointer"
                            >
                              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                          </div>

                          <span className="text-sm font-extrabold text-foreground tabular-nums">
                            {formatBRL(product.price * quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Rodapé da sacola */}
            {items.length > 0 && (
              <div className="border-t border-border bg-surface p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-muted-foreground">Subtotal estimado</span>
                  <span className="font-display text-2xl font-bold text-foreground tabular-nums">
                    {formatBRL(subtotal)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Envie seu pedido pelo formulário de contato para combinarmos retirada ou entrega.
                </p>
                <button
                  type="button"
                  onClick={onProceedToContact}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-sm hover:bg-primary-bright transition-colors cursor-pointer"
                >
                  <span>Entrar em contato</span>
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
