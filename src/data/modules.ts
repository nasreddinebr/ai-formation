export interface Section {
  id: string;
  title: string;
  level: number;
}

export interface Module {
  id: number;
  title: string;
  slug: string;
  description: string;
  difficulty: "debutant" | "intermediaire" | "avance" | "expert";
  icon: string;
  estimatedTime: string;
  sections: Section[];
}

export const modules: Module[] = [
  {
    id: 0,
    title: "Comprendre l'IA — Les Fondamentaux",
    slug: "comprendre-l-ia",
    description:
      "Decouvrez ce qu'est l'intelligence artificielle, ses branches principales et les concepts essentiels.",
    difficulty: "debutant",
    icon: "\ud83d\udd30",
    estimatedTime: "2 semaines",
    sections: [
      { id: "qu-est-ce-que-l-ia", title: "Qu'est-ce que l'Intelligence Artificielle ?", level: 3 },
      { id: "la-carte-mentale", title: "La Carte Mentale de l'IA", level: 3 },
      { id: "definitions", title: "Les Definitions Essentielles", level: 3 },
      { id: "reseaux-de-neurones", title: "Les Reseaux de Neurones", level: 3 },
      { id: "transformers", title: "Les Transformers", level: 3 },
      { id: "llm", title: "Les LLM", level: 3 },
      { id: "fine-tuning", title: "Le Fine-Tuning", level: 3 },
      { id: "embeddings", title: "Les Embeddings", level: 3 },
      { id: "agents-ia", title: "Les Agents IA", level: 3 },
      { id: "rag", title: "Les Systemes RAG", level: 3 },
      { id: "prompting", title: "Le Prompting", level: 3 },
      { id: "hallucinations", title: "Les Hallucinations", level: 3 },
      { id: "inference-entrainement", title: "Inference vs Entrainement", level: 3 },
      { id: "gpu", title: "Le Role des GPU", level: 3 },
      { id: "pipelines", title: "Les Pipelines IA", level: 3 },
      { id: "ethique", title: "Ethique & Biais", level: 3 },
    ],
  },
  {
    id: 1,
    title: "Python & Outils de Base",
    slug: "python-outils-base",
    description:
      "Maitrisez Python pour la data science : NumPy, Pandas, Matplotlib, Scikit-learn, Git et Docker.",
    difficulty: "debutant",
    icon: "\ud83d\udce6",
    estimatedTime: "8 semaines",
    sections: [
      { id: "python", title: "Python", level: 3 },
      { id: "numpy", title: "NumPy", level: 3 },
      { id: "pandas", title: "Pandas", level: 3 },
      { id: "matplotlib-seaborn", title: "Matplotlib & Seaborn", level: 3 },
      { id: "scikit-learn", title: "Scikit-learn", level: 3 },
      { id: "git-github", title: "Git & GitHub", level: 3 },
      { id: "docker", title: "Docker", level: 3 },
    ],
  },
  {
    id: 2,
    title: "Mathematiques pour l'IA",
    slug: "mathematiques-ia",
    description:
      "Comprenez les fondements mathematiques : algebre lineaire, calcul differentiel, probabilites.",
    difficulty: "intermediaire",
    icon: "\ud83d\udcd0",
    estimatedTime: "8 semaines",
    sections: [
      { id: "algebre-lineaire", title: "Algebre Lineaire", level: 3 },
      { id: "calcul-differentiel", title: "Calcul Differentiel", level: 3 },
      { id: "probabilites-statistiques", title: "Probabilites & Statistiques", level: 3 },
      { id: "optimisation", title: "Optimisation", level: 3 },
    ],
  },
  {
    id: 3,
    title: "Machine Learning",
    slug: "machine-learning",
    description:
      "Comprenez les algorithmes ML classiques, choisissez le bon algorithme et maitrisez le cycle complet.",
    difficulty: "intermediaire",
    icon: "\ud83e\udd16",
    estimatedTime: "6 semaines",
    sections: [
      { id: "types-problemes", title: "Types de Problemes ML", level: 3 },
      { id: "cycle-ml", title: "Le Cycle ML Complet", level: 3 },
      { id: "overfitting", title: "Eviter l'Overfitting", level: 3 },
      { id: "metriques", title: "Metriques d'Evaluation", level: 3 },
      { id: "projets-ml", title: "Projets Reels ML", level: 3 },
    ],
  },
  {
    id: 4,
    title: "Deep Learning & PyTorch",
    slug: "deep-learning-pytorch",
    description:
      "Maitrisez PyTorch, creez des CNN, RNN et utilisez le Transfer Learning.",
    difficulty: "avance",
    icon: "\ud83e\udde0",
    estimatedTime: "8 semaines",
    sections: [
      { id: "pytorch-vs-tensorflow", title: "PyTorch vs TensorFlow", level: 3 },
      { id: "bases-pytorch", title: "Les Bases de PyTorch", level: 3 },
      { id: "cnn", title: "CNN (Convolutional Neural Networks)", level: 3 },
      { id: "transfer-learning", title: "Architectures Pre-entrainees", level: 3 },
      { id: "projets-dl", title: "Projets Deep Learning", level: 3 },
    ],
  },
  {
    id: 5,
    title: "NLP & Large Language Models",
    slug: "nlp-llm",
    description:
      "Comprenez le NLP, maitrisez Hugging Face et fine-tunez des LLMs.",
    difficulty: "avance",
    icon: "\ud83d\udcac",
    estimatedTime: "8 semaines",
    sections: [
      { id: "evolution-nlp", title: "Evolution du NLP", level: 3 },
      { id: "tokenisation", title: "Tokenisation", level: 3 },
      { id: "hugging-face", title: "Hugging Face", level: 3 },
      { id: "architecture-transformer", title: "L'Architecture Transformer", level: 3 },
      { id: "fine-tuning-lora", title: "Fine-Tuning avec LoRA/QLoRA", level: 3 },
      { id: "projets-nlp", title: "Projets NLP", level: 3 },
    ],
  },
  {
    id: 6,
    title: "IA Generative",
    slug: "ia-generative",
    description:
      "Maitrisez les APIs des grands LLMs, les modeles de diffusion et le prompting avance.",
    difficulty: "intermediaire",
    icon: "\u2728",
    estimatedTime: "6 semaines",
    sections: [
      { id: "comparaison-llm", title: "Les Grands LLMs en Comparaison", level: 3 },
      { id: "openai-api", title: "OpenAI API", level: 3 },
      { id: "anthropic-api", title: "Anthropic API (Claude)", level: 3 },
      { id: "ollama", title: "Ollama — LLMs en Local", level: 3 },
      { id: "generation-images", title: "Generation d'Images", level: 3 },
      { id: "prompting-avance", title: "Prompting Avance", level: 3 },
      { id: "no-code-vs-code", title: "IA No-Code vs IA avec Code", level: 3 },
    ],
  },
  {
    id: 7,
    title: "Computer Vision",
    slug: "computer-vision",
    description:
      "Creez des systemes de reconnaissance d'images, detection d'objets et segmentation.",
    difficulty: "avance",
    icon: "\ud83d\udc41\ufe0f",
    estimatedTime: "6 semaines",
    sections: [
      { id: "taches-cv", title: "Taches de Computer Vision", level: 3 },
      { id: "yolo", title: "YOLO (Detection temps reel)", level: 3 },
      { id: "projets-cv", title: "Projets Computer Vision", level: 3 },
    ],
  },
  {
    id: 8,
    title: "Agents IA & Systemes RAG",
    slug: "agents-rag",
    description:
      "Creez des agents IA autonomes et implementez un systeme RAG complet avec LangChain.",
    difficulty: "avance",
    icon: "\ud83e\udd16",
    estimatedTime: "8 semaines",
    sections: [
      { id: "langchain", title: "LangChain", level: 3 },
      { id: "systeme-rag", title: "Systeme RAG Complet", level: 3 },
      { id: "bases-vectorielles", title: "Bases Vectorielles", level: 3 },
      { id: "agents-autonomes", title: "Agents IA Autonomes", level: 3 },
      { id: "projets-agents", title: "Projets Agents & RAG", level: 3 },
    ],
  },
  {
    id: 9,
    title: "Deploiement & MLOps",
    slug: "deploiement-mlops",
    description:
      "Deployez des modeles IA en production, creez des APIs robustes et mettez en place le monitoring.",
    difficulty: "avance",
    icon: "\ud83d\ude80",
    estimatedTime: "8 semaines",
    sections: [
      { id: "fastapi", title: "FastAPI pour les APIs IA", level: 3 },
      { id: "deploiement-cloud", title: "Deploiement Cloud", level: 3 },
      { id: "mlops", title: "MLOps", level: 3 },
      { id: "monitoring", title: "Monitoring en Production", level: 3 },
    ],
  },
  {
    id: 10,
    title: "Cursus Ingenieur IA",
    slug: "cursus-ingenieur-ia",
    description:
      "Les competences recherchees, les metiers de l'IA et les certifications utiles.",
    difficulty: "expert",
    icon: "\ud83c\udf93",
    estimatedTime: "En continu",
    sections: [
      { id: "metiers-ia", title: "Les Metiers de l'IA", level: 3 },
      { id: "certifications", title: "Certifications Utiles", level: 3 },
      { id: "sujets-avances", title: "Sujets Avances", level: 3 },
      { id: "projets-portfolio", title: "Projets Portfolio", level: 3 },
    ],
  },
  {
    id: 11,
    title: "Creer son Modele, Chatbot, SaaS IA",
    slug: "creer-modele-chatbot-saas",
    description:
      "Construisez un chatbot IA de A a Z et lancez votre propre SaaS IA.",
    difficulty: "avance",
    icon: "\ud83c\udfd7\ufe0f",
    estimatedTime: "Variable",
    sections: [
      { id: "chatbot-ia", title: "Creer un Chatbot IA de A a Z", level: 3 },
      { id: "saas-ia", title: "Creer un SaaS IA", level: 3 },
    ],
  },
  {
    id: 12,
    title: "Portfolio, Emploi & Freelance IA",
    slug: "portfolio-emploi-freelance",
    description:
      "Construisez votre portfolio, decrochez votre premier emploi ou lancez-vous en freelance.",
    difficulty: "intermediaire",
    icon: "\ud83d\udcbc",
    estimatedTime: "Variable",
    sections: [
      { id: "portfolio", title: "Construire un Portfolio IA Solide", level: 3 },
      { id: "premier-emploi", title: "Decrocher son Premier Emploi", level: 3 },
      { id: "freelancer", title: "Freelancer avec l'IA", level: 3 },
    ],
  },
  {
    id: 13,
    title: "Erreurs Frequentes & Apprendre Efficacement",
    slug: "erreurs-apprendre-efficacement",
    description:
      "Les 10 erreurs qui bloquent et la methode Learn, Build, Teach.",
    difficulty: "debutant",
    icon: "\u26a0\ufe0f",
    estimatedTime: "Continu",
    sections: [
      { id: "10-erreurs", title: "Les 10 Erreurs qui Bloquent", level: 3 },
      { id: "methode-efficace", title: "Comment Apprendre Efficacement", level: 3 },
      { id: "tendances", title: "Tendances IA des Prochaines Annees", level: 3 },
    ],
  },
];

export function getModuleById(id: number): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}
