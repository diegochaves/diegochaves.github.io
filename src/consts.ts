export const SITE = {
  title: 'diegochav.es',
  author: 'Diego Chaves',
  role: 'Engenheiro de Computação',
  description:
    'Portfólio e blog de Diego Chaves — o que construo, os problemas que deram trabalho e um pouco da rotina.',
  bio: 'Escrevo sobre o que construo, os problemas que deram trabalho — e como foram resolvidos — e um pouco da rotina.',
  /** Avatar text: sidebar, mobile top bar and post sidebar. */
  initials: 'DC',
  /** X (Twitter) handle for link previews. */
  twitter: '@diegochaves',
};

/** Home page heading. */
export const HOME = {
  eyebrow: 'caderno de bordo',
  title: 'Anotações sobre construir software — e sobre o resto do dia.',
};

/** About page (/sobre). Each paragraph is plain text; a link needs editing sobre.astro. */
export const ABOUT = {
  description: 'Sobre Diego Chaves — engenheiro de software.',
  title: 'Olá!',
  paragraphs: [
    'Sou Diego Chaves, engenheiro de software apaixonado por tecnologia e pelo processo de construir coisas que funcionam bem. Tenho experiência com desenvolvimento de produtos digitais, desde a concepção até a entrega.',
    'Neste blog escrevo sobre o que aprendo, uso e me instiga no dia a dia — desde ferramentas e técnicas de desenvolvimento até reflexões sobre carreira e tecnologia em geral.',
  ],
  stack: ['TypeScript', 'Python', 'React', 'Node.js', 'Docker', 'PostgreSQL', 'AWS', 'Git'],
};

// Brasília time (UTC-3, no DST). Post timestamps are written in it and all dates
// are shown in it, since the site is built on UTC machines.
export const TIME_ZONE = 'America/Sao_Paulo';

export const NAV_LINKS = [
  { href: '/', label: 'Início' },
  { href: '/blog', label: 'Blog' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/agora', label: 'Agora' },
  { href: '/sobre', label: 'Sobre' },
];

// `label` is what the sidebar shows; `name` is the accessible name.
export const SOCIAL_LINKS = [
  { href: 'https://github.com/diegochaves', label: 'github', name: 'GitHub' },
  { href: 'https://twitter.com/diegochaves', label: 'x', name: 'X (Twitter)' },
  { href: 'https://www.linkedin.com/in/diegochav-es/', label: 'linkedin', name: 'LinkedIn' },
  { href: 'https://www.instagram.com/diegochav.es', label: 'instagram', name: 'Instagram' },
  { href: 'mailto:eu@diegochav.es', label: 'email', name: 'eu@diegochav.es' },
  { href: '/rss.xml', label: 'rss', name: 'RSS' },
];

// GoatCounter (https://www.goatcounter.com): cookieless, aggregated page views and click events.
export const GOATCOUNTER_ENDPOINT = 'https://diegochaves.goatcounter.com/count';

/** GoatCounter event name for a SOCIAL_LINKS entry. */
export const socialEvent = (label: string) => (label === 'rss' ? 'rss' : `social/${label}`);

export const CATEGORIES = ['dev', 'carreira', 'curiosidades', 'pessoal'] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_INFO: Record<Category, { label: string; description: string }> = {
  dev: { label: 'Dev', description: 'Linguagens, frameworks, arquitetura e boas práticas.' },
  carreira: { label: 'Carreira', description: 'Reflexões sobre o trabalho, gestão e aprendizado contínuo.' },
  curiosidades: { label: 'Curiosidades', description: 'Descobertas, links úteis, configurações e dicas.' },
  pessoal: { label: 'Pessoal', description: 'Experiências e reflexões mais abertas.' },
};
