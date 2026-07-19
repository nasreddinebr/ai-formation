export interface Resource {
  title: string;
  url: string;
  language: "fr" | "en";
  type: "course" | "documentation" | "tool" | "community";
}

export interface ModuleResources {
  moduleId: number;
  links: Resource[];
}

export const moduleResources: ModuleResources[] = [
  {
    moduleId: 0,
    links: [
      { title: "Elements of AI", url: "https://www.elementsofai.com/fr/", language: "fr", type: "course" },
      { title: "FUN MOOC IA", url: "https://www.fun-mooc.fr/fr/", language: "fr", type: "course" },
      { title: "DeepLearning.AI", url: "https://www.deeplearning.ai", language: "en", type: "course" },
      { title: "Kaggle Learn", url: "https://www.kaggle.com/learn", language: "en", type: "course" },
    ],
  },
  {
    moduleId: 1,
    links: [
      { title: "Python.org tutoriel officiel", url: "https://docs.python.org/fr/3/tutorial/", language: "fr", type: "documentation" },
      { title: "Kaggle Python Course", url: "https://www.kaggle.com/learn/python", language: "en", type: "course" },
      { title: "NumPy Quickstart", url: "https://numpy.org/doc/stable/user/quickstart.html", language: "en", type: "documentation" },
      { title: "Pandas Documentation", url: "https://pandas.pydata.org/docs/user_guide/index.html", language: "en", type: "documentation" },
      { title: "Git — The Simple Guide", url: "https://rogerdudler.github.io/git-guide/index.fr.html", language: "fr", type: "documentation" },
    ],
  },
  {
    moduleId: 2,
    links: [
      { title: "Khan Academy FR", url: "https://fr.khanacademy.org/", language: "fr", type: "course" },
      { title: "3Blue1Brown — Linear Algebra", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", language: "en", type: "course" },
      { title: "Gilbert Strang — MIT Linear Algebra", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", language: "en", type: "course" },
    ],
  },
  {
    moduleId: 3,
    links: [
      { title: "Scikit-learn User Guide", url: "https://scikit-learn.org/stable/user_guide.html", language: "en", type: "documentation" },
      { title: "ML Course Andrew Ng — Coursera", url: "https://www.coursera.org/browse/data-science/machine-learning", language: "en", type: "course" },
      { title: "Kaggle ML Courses", url: "https://www.kaggle.com/learn/intro-to-machine-learning", language: "en", type: "course" },
    ],
  },
  {
    moduleId: 4,
    links: [
      { title: "PyTorch Tutorials officiels", url: "https://pytorch.org/tutorials/", language: "en", type: "documentation" },
      { title: "fast.ai Practical Deep Learning", url: "https://course.fast.ai/", language: "en", type: "course" },
      { title: "DeepLearning.AI Specialization", url: "https://www.deeplearning.ai", language: "en", type: "course" },
    ],
  },
  {
    moduleId: 5,
    links: [
      { title: "Hugging Face NLP Course", url: "https://huggingface.co/learn/nlp-course", language: "en", type: "course" },
      { title: "Stanford CS224N", url: "https://web.stanford.edu/class/cs224n/", language: "en", type: "course" },
      { title: "Andrej Karpathy — Let's build GPT", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", language: "en", type: "course" },
    ],
  },
  {
    moduleId: 6,
    links: [
      { title: "OpenAI Cookbook", url: "https://cookbook.openai.com/", language: "en", type: "documentation" },
      { title: "Anthropic Documentation", url: "https://docs.anthropic.com/", language: "en", type: "documentation" },
      { title: "LangChain Documentation", url: "https://python.langchain.com/docs/", language: "en", type: "documentation" },
      { title: "Ollama GitHub", url: "https://github.com/ollama/ollama", language: "en", type: "tool" },
    ],
  },
  {
    moduleId: 7,
    links: [
      { title: "Ultralytics YOLO Docs", url: "https://docs.ultralytics.com/", language: "en", type: "documentation" },
      { title: "PyTorch Vision Tutorials", url: "https://pytorch.org/vision/stable/index.html", language: "en", type: "documentation" },
      { title: "Roboflow Blog", url: "https://blog.roboflow.com/", language: "en", type: "course" },
    ],
  },
  {
    moduleId: 8,
    links: [
      { title: "LangChain RAG Tutorial", url: "https://python.langchain.com/docs/use_cases/question_answering/", language: "en", type: "documentation" },
      { title: "LlamaIndex Documentation", url: "https://docs.llamaindex.ai/", language: "en", type: "documentation" },
      { title: "Chroma Documentation", url: "https://docs.trychroma.com/", language: "en", type: "documentation" },
    ],
  },
  {
    moduleId: 9,
    links: [
      { title: "FastAPI Documentation", url: "https://fastapi.tiangolo.com/", language: "en", type: "documentation" },
      { title: "MLflow Documentation", url: "https://mlflow.org/docs/latest/index.html", language: "en", type: "documentation" },
      { title: "Docker Get Started", url: "https://docs.docker.com/get-started/", language: "en", type: "documentation" },
    ],
  },
  {
    moduleId: 10,
    links: [
      { title: "AWS ML Learning Path", url: "https://aws.amazon.com/training/learn-about/machine-learning/", language: "en", type: "course" },
      { title: "Google Cloud AI Learning", url: "https://cloud.google.com/learn/training/machinelearning-ai", language: "en", type: "course" },
      { title: "Papers With Code", url: "https://paperswithcode.com/", language: "en", type: "tool" },
    ],
  },
  {
    moduleId: 11,
    links: [],
  },
  {
    moduleId: 12,
    links: [
      { title: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/", language: "fr", type: "tool" },
      { title: "Welcome to the Jungle", url: "https://www.welcometothejungle.com/fr", language: "fr", type: "tool" },
      { title: "Malt", url: "https://www.malt.fr/", language: "fr", type: "tool" },
    ],
  },
  {
    moduleId: 13,
    links: [
      { title: "Khan Academy FR", url: "https://fr.khanacademy.org/", language: "fr", type: "course" },
    ],
  },
];

export function getResourcesByModuleId(moduleId: number): Resource[] {
  const found = moduleResources.find((r) => r.moduleId === moduleId);
  return found?.links ?? [];
}
