export interface Project {
  name: string;
  description: string;
  href: string;
  stack: string[];
  /** Shown on the home page. */
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    name: 'diegochav.es',
    description: 'Este site: portfólio e blog estático, escrito em Markdown.',
    href: 'https://github.com/diegochaves/diegochaves.github.io',
    stack: ['astro', 'tailwind', 'actions'],
    featured: true,
  },
];
