import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

interface SearchEntry {
  id: string;
  moduleId: number;
  moduleTitle: string;
  sectionId: string;
  sectionTitle: string;
  snippet: string;
}

function stripMarkdown(md: string): string {
  return md
    .replace(/<a name="[^"]*"><\/a>\s*/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^[-#>]\s*/gm, "")
    .replace(/\|[-| ]+\|/g, "")
    .replace(/\|/g, "")
    .replace(/\n+/g, " ")
    .trim();
}

const ANCHORS: Record<number, string> = {
  0: "module-0", 1: "module-1", 2: "module-2", 3: "module-3",
  4: "module-4", 5: "module-5", 6: "module-6", 7: "module-7",
  8: "module-8", 9: "module-9", 10: "module-10", 11: "creation",
  12: "carriere", 13: "erreurs",
};

const MODULE_TITLES: Record<number, string> = {
  0: "Comprendre l'IA — Les Fondamentaux",
  1: "Python & Outils de Base",
  2: "Mathematiques pour l'IA",
  3: "Machine Learning",
  4: "Deep Learning & PyTorch",
  5: "NLP & Large Language Models",
  6: "IA Generative",
  7: "Computer Vision",
  8: "Agents IA & Systemes RAG",
  9: "Deploiement & MLOps",
  10: "Cursus Ingenieur IA",
  11: "Creer son Modele, Chatbot, SaaS IA",
  12: "Portfolio, Emploi & Freelance IA",
  13: "Erreurs Frequentes & Apprendre Efficacement",
};

const SECTION_TITLES: Record<number, Record<string, string>> = {
  0: {
    "qu-est-ce-que-l-ia": "Qu'est-ce que l'Intelligence Artificielle ?",
    "la-carte-mentale": "La Carte Mentale de l'IA",
    "definitions": "Les Definitions Essentielles",
    "reseaux-de-neurones": "Les Reseaux de Neurones",
    "transformers": "Les Transformers",
    "llm": "Les LLM",
    "fine-tuning": "Le Fine-Tuning",
    "embeddings": "Les Embeddings",
    "agents-ia": "Les Agents IA",
    "rag": "Les Systemes RAG",
    "prompting": "Le Prompting",
    "hallucinations": "Les Hallucinations",
    "inference-entrainement": "Inference vs Entrainement",
    "gpu": "Le Role des GPU",
    "pipelines": "Les Pipelines IA",
    "ethique": "Ethique & Biais",
  },
  1: {
    "python": "Python",
    "numpy": "NumPy",
    "pandas": "Pandas",
    "matplotlib-seaborn": "Matplotlib & Seaborn",
    "scikit-learn": "Scikit-learn",
    "git-github": "Git & GitHub",
    "docker": "Docker",
  },
  2: {
    "algebre-lineaire": "Algebre Lineaire",
    "calcul-differentiel": "Calcul Differentiel",
    "probabilites-statistiques": "Probabilites & Statistiques",
    "optimisation": "Optimisation",
  },
  3: {
    "types-problemes": "Types de Problemes ML",
    "cycle-ml": "Le Cycle ML Complet",
    "overfitting": "Eviter l'Overfitting",
    "metriques": "Metriques d'Evaluation",
    "projets-ml": "Projets Reels ML",
  },
  4: {
    "pytorch-vs-tensorflow": "PyTorch vs TensorFlow",
    "bases-pytorch": "Les Bases de PyTorch",
    "cnn": "CNN (Convolutional Neural Networks)",
    "transfer-learning": "Architectures Pre-entrainees",
    "projets-dl": "Projets Deep Learning",
  },
  5: {
    "evolution-nlp": "Evolution du NLP",
    "tokenisation": "Tokenisation",
    "hugging-face": "Hugging Face",
    "architecture-transformer": "L'Architecture Transformer",
    "fine-tuning-lora": "Fine-Tuning avec LoRA/QLoRA",
    "projets-nlp": "Projets NLP",
  },
  6: {
    "comparaison-llm": "Les Grands LLMs en Comparaison",
    "openai-api": "OpenAI API",
    "anthropic-api": "Anthropic API (Claude)",
    "ollama": "Ollama — LLMs en Local",
    "generation-images": "Generation d'Images",
    "prompting-avance": "Prompting Avance",
    "no-code-vs-code": "IA No-Code vs IA avec Code",
  },
  7: {
    "taches-cv": "Taches de Computer Vision",
    "yolo": "YOLO (Detection temps reel)",
    "projets-cv": "Projets Computer Vision",
  },
  8: {
    "langchain": "LangChain",
    "systeme-rag": "Systeme RAG Complet",
    "bases-vectorielles": "Bases Vectorielles",
    "agents-autonomes": "Agents IA Autonomes",
    "projets-agents": "Projets Agents & RAG",
  },
  9: {
    "fastapi": "FastAPI pour les APIs IA",
    "deploiement-cloud": "Deploiement Cloud",
    "mlops": "MLOps",
    "monitoring": "Monitoring en Production",
  },
  10: {
    "metiers-ia": "Les Metiers de l'IA",
    "certifications": "Certifications Utiles",
    "sujets-avances": "Sujets Avances",
    "projets-portfolio": "Projets Portfolio",
  },
  11: {
    "chatbot-ia": "Creer un Chatbot IA de A a Z",
    "saas-ia": "Creer un SaaS IA",
  },
  12: {
    "portfolio": "Construire un Portfolio IA Solide",
    "premier-emploi": "Decrocher son Premier Emploi",
    "freelancer": "Freelancer avec l'IA",
  },
  13: {
    "10-erreurs": "Les 10 Erreurs qui Bloquent",
    "methode-efficace": "Comment Apprendre Efficacement",
    "tendances": "Tendances IA des Prochaines Annees",
  },
};

function buildSearchIndex(): SearchEntry[] {
  const filePath = join(process.cwd(), "content", "formation-ia-complete.md");
  const content = readFileSync(filePath, "utf-8");
  const entries: SearchEntry[] = [];

  for (const [moduleIdStr, anchor] of Object.entries(ANCHORS)) {
    const moduleId = parseInt(moduleIdStr, 10);
    const moduleTitle = MODULE_TITLES[moduleId] || `Module ${moduleId}`;
    const sectionTitles = SECTION_TITLES[moduleId] || {};

    const startPattern = new RegExp(`<a name="${anchor}">`, "i");
    const startMatch = startPattern.exec(content);
    if (!startMatch) continue;

    const startIdx = startMatch.index;
    const allAnchors = Array.from(
      content.matchAll(/<a name="([^"]+)">/gi)
    ).map((m) => ({ name: m[1], index: m.index! }));

    const nextAnchor = allAnchors.find((a) => a.index > startIdx);
    const endIdx = nextAnchor ? nextAnchor.index : content.length;

    const moduleContent = content.slice(startIdx, endIdx);

    // Extract sections by ### headings
    const sectionRegex = /^### (.+)$/gm;
    let sectionMatch;
    const sections: { title: string; content: string; startIndex: number }[] = [];

    while ((sectionMatch = sectionRegex.exec(moduleContent)) !== null) {
      sections.push({
        title: sectionMatch[1].trim(),
        content: "",
        startIndex: sectionMatch.index,
      });
    }

    // Fill section content
    for (let i = 0; i < sections.length; i++) {
      const start = sections[i].startIndex + sections[i].title.length + 5; // "### ".length
      const end = i + 1 < sections.length ? sections[i + 1].startIndex : moduleContent.length;
      sections[i].content = moduleContent.slice(start, end);
    }

    // Create search entries for each section
    for (const section of sections) {
      const sectionId = Object.entries(sectionTitles).find(
        ([, title]) => title === section.title
      )?.[0] || section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      const plainText = stripMarkdown(section.content);
      const snippet = plainText.slice(0, 200) + (plainText.length > 200 ? "..." : "");

      entries.push({
        id: `${moduleId}-${sectionId}`,
        moduleId,
        moduleTitle,
        sectionId,
        sectionTitle: section.title,
        snippet,
      });
    }
  }

  return entries;
}

const entries = buildSearchIndex();
const outputPath = join(process.cwd(), "public", "search-index.json");
writeFileSync(outputPath, JSON.stringify(entries, null, 2), "utf-8");
console.log(`Generated search index with ${entries.length} entries at ${outputPath}`);
