export const SITE = {
  title: 'diegochav.es',
  author: 'Diego Chaves',
  role: 'Engenheiro de software',
  description:
    'Portfólio e blog de Diego Chaves — o que construo, os problemas que deram trabalho e um pouco da rotina.',
  bio: 'Escrevo sobre o que construo, os problemas que deram trabalho — e como foram resolvidos — e um pouco da rotina.',
};

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
  { href: 'https://www.linkedin.com/in/diegochaves', label: 'linkedin', name: 'LinkedIn' },
  { href: 'https://www.instagram.com/diegochaves', label: 'instagram', name: 'Instagram' },
  { href: 'mailto:eu@diegochav.es', label: 'email', name: 'eu@diegochav.es' },
  { href: '/rss.xml', label: 'rss', name: 'RSS' },
];

export const CATEGORIES = ['dev', 'carreira', 'curiosidades', 'pessoal'] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_INFO: Record<Category, { label: string; description: string }> = {
  dev: { label: 'Dev', description: 'Linguagens, frameworks, arquitetura e boas práticas.' },
  carreira: { label: 'Carreira', description: 'Reflexões sobre o trabalho, gestão e aprendizado contínuo.' },
  curiosidades: { label: 'Curiosidades', description: 'Descobertas, links úteis, configurações e dicas.' },
  pessoal: { label: 'Pessoal', description: 'Experiências e reflexões mais abertas.' },
};
