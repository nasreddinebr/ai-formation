import type { CurriculumChapter, CurriculumSection } from "../lib/curriculum";
import { CURRICULUM } from "./curriculum.gen";

export type Section = CurriculumSection;

export type Difficulty = "debutant" | "intermediaire" | "avance" | "expert";

export interface Module {
  id: number;
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  icon: string;
  estimatedTime: string;
  readingMinutes: number;
  chapters: CurriculumChapter[];
  sections: Section[];
}

interface ModuleMeta extends Omit<Module, "title" | "readingMinutes" | "chapters" | "sections"> {
  fallbackTitle: string;
}

const MODULE_META: ModuleMeta[] = [
  {
    id: 0,
    fallbackTitle: "Comprendre l'IA — Les Fondamentaux",
    slug: "comprendre-l-ia",
    description:
      "Decouvrez ce qu'est l'intelligence artificielle, ses branches principales et les concepts essentiels.",
    difficulty: "debutant",
    icon: "\ud83d\udd30",
    estimatedTime: "2 semaines",
  },
  {
    id: 1,
    fallbackTitle: "Python & Outils de Base",
    slug: "python-outils-base",
    description:
      "Maitrisez Python pour la data science : NumPy, Pandas, Matplotlib, Scikit-learn, Git et Docker.",
    difficulty: "debutant",
    icon: "\ud83d\udce6",
    estimatedTime: "8 semaines",
  },
  {
    id: 2,
    fallbackTitle: "Mathematiques pour l'IA",
    slug: "mathematiques-ia",
    description:
      "Comprenez les fondements mathematiques : algebre lineaire, calcul differentiel, probabilites.",
    difficulty: "intermediaire",
    icon: "\ud83d\udcd0",
    estimatedTime: "8 semaines",
  },
  {
    id: 3,
    fallbackTitle: "Machine Learning",
    slug: "machine-learning",
    description:
      "Comprenez les algorithmes ML classiques, choisissez le bon algorithme et maitrisez le cycle complet.",
    difficulty: "intermediaire",
    icon: "\ud83e\udd16",
    estimatedTime: "6 semaines",
  },
  {
    id: 4,
    fallbackTitle: "Deep Learning & PyTorch",
    slug: "deep-learning-pytorch",
    description:
      "Maitrisez PyTorch, creez des CNN, RNN et utilisez le Transfer Learning.",
    difficulty: "avance",
    icon: "\ud83e\udde0",
    estimatedTime: "8 semaines",
  },
  {
    id: 5,
    fallbackTitle: "NLP & Large Language Models",
    slug: "nlp-llm",
    description:
      "Comprenez le NLP, maitrisez Hugging Face et fine-tunez des LLMs.",
    difficulty: "avance",
    icon: "\ud83d\udcac",
    estimatedTime: "8 semaines",
  },
  {
    id: 6,
    fallbackTitle: "IA Generative",
    slug: "ia-generative",
    description:
      "Maitrisez les APIs des grands LLMs, les modeles de diffusion et le prompting avance.",
    difficulty: "intermediaire",
    icon: "\u2728",
    estimatedTime: "6 semaines",
  },
  {
    id: 7,
    fallbackTitle: "Computer Vision",
    slug: "computer-vision",
    description:
      "Creez des systemes de reconnaissance d'images, detection d'objets et segmentation.",
    difficulty: "avance",
    icon: "\ud83d\udc41\ufe0f",
    estimatedTime: "6 semaines",
  },
  {
    id: 8,
    fallbackTitle: "Agents IA & Systemes RAG",
    slug: "agents-rag",
    description:
      "Creez des agents IA autonomes et implementez un systeme RAG complet avec LangChain.",
    difficulty: "avance",
    icon: "\ud83e\udd16",
    estimatedTime: "8 semaines",
  },
  {
    id: 9,
    fallbackTitle: "Deploiement & MLOps",
    slug: "deploiement-mlops",
    description:
      "Deployez des modeles IA en production, creez des APIs robustes et mettez en place le monitoring.",
    difficulty: "avance",
    icon: "\ud83d\ude80",
    estimatedTime: "8 semaines",
  },
  {
    id: 10,
    fallbackTitle: "Cursus Ingenieur IA",
    slug: "cursus-ingenieur-ia",
    description:
      "Les competences recherchees, les metiers de l'IA et les certifications utiles.",
    difficulty: "expert",
    icon: "\ud83c\udf93",
    estimatedTime: "En continu",
  },
  {
    id: 11,
    fallbackTitle: "Creer son Modele, Chatbot, SaaS IA",
    slug: "creer-modele-chatbot-saas",
    description:
      "Construisez un chatbot IA de A a Z et lancez votre propre SaaS IA.",
    difficulty: "avance",
    icon: "\ud83c\udfd7\ufe0f",
    estimatedTime: "Variable",
  },
  {
    id: 12,
    fallbackTitle: "Portfolio, Emploi & Freelance IA",
    slug: "portfolio-emploi-freelance",
    description:
      "Construisez votre portfolio, decrochez votre premier emploi ou lancez-vous en freelance.",
    difficulty: "intermediaire",
    icon: "\ud83d\udcbc",
    estimatedTime: "Variable",
  },
  {
    id: 13,
    fallbackTitle: "Erreurs Frequentes & Apprendre Efficacement",
    slug: "erreurs-apprendre-efficacement",
    description:
      "Les 10 erreurs qui bloquent et la methode Learn, Build, Teach.",
    difficulty: "debutant",
    icon: "\u26a0\ufe0f",
    estimatedTime: "Continu",
  },
];

export const modules: Module[] = MODULE_META.map((meta) => {
  const data = CURRICULUM[meta.id];
  return {
    ...meta,
    title: data?.title || meta.fallbackTitle,
    readingMinutes: data?.readingMinutes ?? 1,
    chapters:
      data?.chapters ?? [
        { id: `module-${meta.id}`, title: meta.fallbackTitle, sections: [] },
      ],
    sections: data?.sections ?? [],
  };
});

export function getModuleById(id: number): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}