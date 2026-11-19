import React from 'react';
import { Dog, MapPin, Phone, Clock } from 'lucide-react';
import { CONTACT_INFO, SERVICES } from '../data/petShopData';

interface FooterProps {
  onSelectService: (serviceTitle: string) => void;
}

export function Footer({ onSelectService }: FooterProps) {
  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-footer-bg text-footer-fg border-t border-border/15">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Coluna 1: Marca */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Dog className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-bold tracking-wide text-footer-fg">
                {CONTACT_INFO.businessName}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-footer-muted tracking-wide max-w-sm">
              Pet shop dedicado ao bem-estar de cães e gatos, combinando banho botânico, estética
              gentil, creche acolhedora e produtos selecionados.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-base font-bold tracking-wide text-footer-fg">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-sm text-footer-muted">
              <li>
                <a
                  href="#inicio"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#inicio');
                  }}
                  className="hover:text-footer-fg transition-colors"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#servicos');
                  }}
                  className="hover:text-footer-fg transition-colors"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="#produtos"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#produtos');
                  }}
                  className="hover:text-footer-fg transition-colors"
                >
                  Produtos
                </a>
              </li>
              <li>
                <a
                  href="#galeria"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#galeria');
                  }}
                  className="hover:text-footer-fg transition-colors"
                >
                  Galeria
                </a>
              </li>
              <li>
                <a
                  href="#depoimentos"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#depoimentos');
                  }}
                  className="hover:text-footer-fg transition-colors"
                >
                  Depoimentos
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#contato');
                  }}
                  className="hover:text-footer-fg transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Serviços */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-base font-bold tracking-wide text-footer-fg">
              Serviços
            </h3>
            <ul className="space-y-2.5 text-sm text-footer-muted">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="text-left hover:text-footer-fg transition-colors cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-base font-bold tracking-wide text-footer-fg">
              Contato
            </h3>
            <ul className="space-y-3 text-sm text-footer-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary-bright shrink-0 mt-0.5" aria-hidden="true" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary-bright shrink-0" aria-hidden="true" />
                <a
                  href={`tel:+${CONTACT_INFO.phoneDigits}`}
                  className="hover:text-footer-fg transition-colors tabular-nums"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-primary-bright shrink-0" aria-hidden="true" />
                <span>Horário: {CONTACT_INFO.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-footer-fg/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-footer-muted">
          <p>
            © {new Date().getFullYear()} {CONTACT_INFO.businessName}. Todos os direitos reservados.
          </p>
          <p>Feito com carinho para cães, gatos e seus tutores no Brasil.</p>
        </div>
      </div>
    </footer>
  );
}
