import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, MapPin, MessageCircle, Phone, Send, ShoppingBag } from 'lucide-react';
import { CONTACT_INFO, SERVICES } from '../data/petShopData';
import { CartEntry } from './CartDrawer';

interface ContactSectionProps {
  selectedService: string;
  cartItems: CartEntry[];
  onClearSelectedService: () => void;
}

interface FormState {
  tutorName: string;
  phone: string;
  petDetails: string;
  subject: string;
  message: string;
}

interface FormErrors {
  tutorName?: string;
  phone?: string;
  petDetails?: string;
}

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function ContactSection({
  selectedService,
  cartItems,
  onClearSelectedService,
}: ContactSectionProps) {
  const [form, setForm] = useState<FormState>({
    tutorName: '',
    phone: '',
    petDetails: '',
    subject: selectedService || 'Agendamento de Banho & Tosa',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedOrderId, setSubmittedOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedService) {
      setForm((prev) => ({
        ...prev,
        subject: selectedService,
      }));
    }
  }, [selectedService]);

  const cartTotal = cartItems.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    let masked = digits;
    if (digits.length > 2) {
      masked = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }
    if (digits.length > 7) {
      masked = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
    setForm((prev) => ({ ...prev, phone: masked }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (form.tutorName.trim().length < 2) {
      nextErrors.tutorName = 'Informe seu nome para podermos responder.';
    }
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      nextErrors.phone = 'Informe um telefone ou WhatsApp válido com DDD.';
    }
    if (form.petDetails.trim().length < 2) {
      nextErrors.petDetails = 'Conte o nome, espécie ou porte do seu pet.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const protocol = `AR-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedOrderId(protocol);
  };

  const buildWhatsAppHref = () => {
    const cartSummary =
      cartItems.length > 0
        ? `\nItens da sacola: ${cartItems
            .map((i) => `${i.quantity}x ${i.product.name}`)
            .join(', ')} (Subtotal ${formatBRL(cartTotal)})`
        : '';
    const text = `Olá! Gostaria de falar com a ${CONTACT_INFO.businessName}.\nNome: ${
      form.tutorName || 'Tutor(a)'
    }\nPet: ${form.petDetails || 'Não informado'}\nAssunto: ${form.subject}${cartSummary}${
      form.message ? `\nMensagem: ${form.message}` : ''
    }`;
    return `https://wa.me/${CONTACT_INFO.phoneDigits}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contato" className="py-16 sm:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Coluna esquerda: Informações diretas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <p className="text-sm font-bold text-primary">Atendimento direto</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground [text-wrap:balance]">
                Vamos cuidar do seu pet juntos
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Agende um horário de banho, tosa ou creche, ou envie sua lista de produtos para
                retirada rápida e entrega combinada.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-3xl border border-border bg-pastel-green/45 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface text-primary shadow-xs shrink-0">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-xs font-bold text-muted-foreground">Endereço</div>
                  <div className="mt-0.5 text-base font-extrabold text-foreground">
                    {CONTACT_INFO.address}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-3xl border border-border bg-pastel-rose/45 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface text-secondary shadow-xs shrink-0">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-xs font-bold text-muted-foreground">Telefone e WhatsApp</div>
                  <a
                    href={`tel:+${CONTACT_INFO.phoneDigits}`}
                    className="mt-0.5 block text-base font-extrabold text-foreground hover:text-primary transition-colors tabular-nums"
                  >
                    {CONTACT_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-3xl border border-border bg-pastel-yellow/55 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface text-foreground shadow-xs shrink-0">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-xs font-bold text-muted-foreground">Horário de atendimento</div>
                  <div className="mt-0.5 text-base font-extrabold text-foreground">
                    {CONTACT_INFO.hours}
                  </div>
                </div>
              </div>
            </div>

            <a
              href={buildWhatsAppHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border border-primary/30 bg-pastel-green px-6 py-4 text-base font-extrabold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              <span>Conversar pelo WhatsApp · {CONTACT_INFO.phoneDisplay}</span>
            </a>
          </motion.div>

          {/* Coluna direita: Formulário de pedido e agendamento */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-7 rounded-[2rem] border border-border bg-background p-6 sm:p-8 lg:p-10 shadow-card"
          >
            {submittedOrderId ? (
              <div className="py-6 text-center sm:text-left space-y-5">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-pastel-green text-primary">
                  <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary tabular-nums">
                    Solicitação #{submittedOrderId}
                  </p>
                  <h3 className="mt-1 font-display text-3xl font-bold text-foreground">
                    Recebemos seu contato, {form.tutorName}!
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">
                    Nossa equipe já registrou os dados para <strong>{form.petDetails}</strong> sobre{' '}
                    <strong>{form.subject}</strong> e responderá no número{' '}
                    <span className="tabular-nums font-bold text-foreground">{form.phone}</span>.
                  </p>
                </div>

                {cartItems.length > 0 && (
                  <div className="rounded-2xl border border-border bg-surface p-4 text-left">
                    <div className="text-xs font-bold text-muted-foreground mb-2">
                      Resumo dos produtos da sacola
                    </div>
                    <ul className="space-y-1 text-sm font-semibold text-foreground">
                      {cartItems.map((entry) => (
                        <li key={entry.product.id} className="flex justify-between gap-4">
                          <span>
                            {entry.quantity}x {entry.product.name}
                          </span>
                          <span className="tabular-nums">
                            {formatBRL(entry.product.price * entry.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-2 border-t border-border flex justify-between font-extrabold text-primary">
                      <span>Total estimado</span>
                      <span className="tabular-nums">{formatBRL(cartTotal)}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={buildWhatsAppHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary-bright transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Enviar também no WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedOrderId(null);
                      onClearSelectedService();
                    }}
                    className="inline-flex items-center justify-center rounded-2xl border border-border bg-surface px-5 py-3.5 text-sm font-bold text-foreground hover:bg-surface-warm transition-colors cursor-pointer"
                  >
                    Fazer nova solicitação
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                    Entrar em contato ou fazer pedido
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Preencha os campos abaixo para confirmar horário, tirar dúvidas ou finalizar sua sacola.
                  </p>
                </div>

                {cartItems.length > 0 && (
                  <div className="rounded-2xl border border-primary/25 bg-pastel-green/50 p-4">
                    <div className="flex items-center justify-between gap-2 text-sm font-extrabold text-primary">
                      <span className="flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                        <span>
                          Sacola anexada ({cartItems.reduce((s, i) => s + i.quantity, 0)} itens)
                        </span>
                      </span>
                      <span className="tabular-nums">{formatBRL(cartTotal)}</span>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-foreground/80">
                      {cartItems.map((i) => `${i.quantity}x ${i.product.name}`).join(' · ')}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="tutor-name"
                      className="block text-sm font-bold text-foreground mb-1.5"
                    >
                      Seu nome
                    </label>
                    <input
                      id="tutor-name"
                      type="text"
                      value={form.tutorName}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, tutorName: e.target.value }));
                        if (errors.tutorName)
                          setErrors((prev) => ({ ...prev, tutorName: undefined }));
                      }}
                      placeholder="Ex.: Mariana Silva"
                      className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {errors.tutorName && (
                      <p className="mt-1.5 text-xs font-bold text-secondary">{errors.tutorName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="tutor-phone"
                      className="block text-sm font-bold text-foreground mb-1.5"
                    >
                      Telefone / WhatsApp
                    </label>
                    <input
                      id="tutor-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="(00) 00000-0000"
                      className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground/70 tabular-nums focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs font-bold text-secondary">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="pet-details"
                      className="block text-sm font-bold text-foreground mb-1.5"
                    >
                      Nome e porte do pet
                    </label>
                    <input
                      id="pet-details"
                      type="text"
                      value={form.petDetails}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, petDetails: e.target.value }));
                        if (errors.petDetails)
                          setErrors((prev) => ({ ...prev, petDetails: undefined }));
                      }}
                      placeholder="Ex.: Thor · Golden porte grande"
                      className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {errors.petDetails && (
                      <p className="mt-1.5 text-xs font-bold text-secondary">{errors.petDetails}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-bold text-foreground mb-1.5"
                    >
                      Serviço ou pedido
                    </label>
                    <select
                      id="contact-subject"
                      value={form.subject}
                      onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                      className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="Agendamento de Banho & Tosa">
                        Agendamento de Banho & Tosa
                      </option>
                      <option value="Pedido de Produtos da Loja">Pedido de Produtos da Loja</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Dúvidas Gerais">Dúvidas Gerais</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-bold text-foreground mb-1.5"
                  >
                    Observações ou preferência de dia
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Conte se seu pet tem pele sensível, prefere horários tranquilos ou se precisa de Táxi Pet."
                    className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-primary px-7 py-4 text-base font-extrabold text-primary-foreground shadow-card hover:bg-primary-bright transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Send className="h-4.5 w-4.5" aria-hidden="true" />
                  <span>Entrar em contato</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
