import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Check, Plus, ShoppingBag } from 'lucide-react';
import { PRODUCTS, ProductCategory, ProductItem } from '../data/petShopData';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductsSectionProps {
  onAddToCart: (product: ProductItem) => void;
  onContactClick: () => void;
}

const CATEGORIES: ProductCategory[] = [
  'Todos',
  'Alimentação',
  'Brinquedos',
  'Conforto',
  'Higiene',
];

function formatPriceBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function ProductsSection({ onAddToCart, onContactClick }: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Todos');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todos') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleAdd = (product: ProductItem) => {
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 1500);
  };

  return (
    <section id="produtos" className="py-16 sm:py-24 bg-background grain-overlay">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-secondary">Boutique selecionada</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground [text-wrap:balance]">
              Produtos naturais e acessórios que aprovamos no dia a dia
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Adicione à sacola para reservar na loja ou pedir entrega combinada pelo nosso contato.
            </p>
          </div>

          {/* Controles de filtro interativos */}
          <div
            role="group"
            aria-label="Filtrar produtos por categoria"
            className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl border border-border bg-surface p-1.5 shadow-xs self-start lg:self-auto"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    active
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground hover:bg-surface-warm'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => {
            const isAdded = recentlyAddedId === product.id;
            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.06, ease: 'easeOut' }}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-surface-warm">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <span className="text-primary">{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.spec}</span>
                    </div>

                    <h3 className="mt-2 font-display text-xl font-bold leading-snug text-foreground">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 flex flex-col gap-3">
                  <div className="flex items-baseline justify-between border-t border-border/70 pt-4">
                    <span className="text-xs font-bold text-muted-foreground">Valor unitário</span>
                    <span className="font-display text-2xl font-bold text-foreground tabular-nums">
                      {formatPriceBRL(product.price)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(product)}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isAdded
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-pastel-green text-primary hover:bg-primary hover:text-primary-foreground'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" />
                        <span>Adicionado à sacola</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        <span>Adicionar à sacola</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-border bg-surface px-6 py-5 shadow-card">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pastel-rose text-secondary shrink-0">
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm sm:text-base font-extrabold text-foreground">
                Precisa de ajuda para escolher a ração ou o tamanho da cama?
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Nossa equipe orienta você pelo porte, idade e preferência do seu pet.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onContactClick}
            className="inline-flex items-center justify-center rounded-2xl bg-secondary px-5 py-3 text-sm font-bold text-secondary-foreground hover:opacity-95 transition-opacity whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            Entrar em contato
          </button>
        </div>
      </div>
    </section>
  );
}
