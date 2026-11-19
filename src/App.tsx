import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { ProductItem } from './data/petShopData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ProductsSection } from './components/ProductsSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PawCtaBanner } from './components/PawCtaBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer, CartEntry } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const cartCount = cartItems.reduce((total, entry) => total + entry.quantity, 0);

  const scrollToContact = () => {
    const contactEl = document.querySelector('#contato');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
    window.setTimeout(() => {
      const nameInput = document.querySelector<HTMLInputElement>('#tutor-name');
      nameInput?.focus({ preventScroll: true });
    }, 500);
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    scrollToContact();
  };

  const handleAddToCart = (product: ProductItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleProceedFromCart = () => {
    setCartOpen(false);
    setSelectedService('Pedido de Produtos da Loja');
    scrollToContact();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-pastel-green selection:text-primary">
        <Navbar
          cartCount={cartCount}
          onOpenCart={() => setCartOpen(true)}
          onContactClick={scrollToContact}
        />

        <main className="flex-1">
          <HeroSection onContactClick={scrollToContact} />
          <ServicesSection onSelectService={handleSelectService} />
          <ProductsSection
            onAddToCart={handleAddToCart}
            onContactClick={scrollToContact}
          />
          <GallerySection onContactClick={scrollToContact} />
          <TestimonialsSection />
          <PawCtaBanner onContactClick={scrollToContact} />
          <ContactSection
            selectedService={selectedService}
            cartItems={cartItems}
            onClearSelectedService={() => setSelectedService('')}
          />
        </main>

        <Footer onSelectService={handleSelectService} />

        <CartDrawer
          open={cartOpen}
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onProceedToContact={handleProceedFromCart}
        />

        <FloatingWhatsApp />
      </div>
    </MotionConfig>
  );
}
