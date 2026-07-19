# 🎓 FORMATION INTELLIGENCE ARTIFICIELLE — DE ZÉRO À INGÉNIEUR IA
### Parcours complet, progressif et professionnalisant

---

> **À qui s'adresse cette formation ?**
> À toute personne partant de zéro qui veut comprendre l'IA en profondeur, maîtriser les outils modernes, créer ses propres modèles et devenir ingénieur IA ou entrepreneur IA.

---

## 📋 TABLE DES MATIÈRES

1. [Comprendre l'IA — Les Fondamentaux](#module-0)
2. [Roadmap Globale par Niveau](#roadmap)
3. [Module 1 — Python & Outils de Base](#module-1)
4. [Module 2 — Mathématiques pour l'IA](#module-2)
5. [Module 3 — Machine Learning](#module-3)
6. [Module 4 — Deep Learning & Réseaux de Neurones](#module-4)
7. [Module 5 — NLP & Large Language Models](#module-5)
8. [Module 6 — IA Générative](#module-6)
9. [Module 7 — Computer Vision](#module-7)
10. [Module 8 — Agents IA & Systèmes RAG](#module-8)
11. [Module 9 — Déploiement & MLOps](#module-9)
12. [Module 10 — Cursus Ingénieur IA](#module-10)
13. [Créer son Modèle, son Chatbot, son SaaS IA](#creation)
14. [Portfolio, Emploi & Freelance IA](#carriere)
15. [Erreurs fréquentes & Comment apprendre efficacement](#erreurs)
16. [Ressources Complètes par Module](#ressources)

---

<a name="module-0"></a>
## 🔰 MODULE 0 — COMPRENDRE L'IA : LES FONDAMENTAUX ABSOLUS

### Qu'est-ce que l'Intelligence Artificielle ?

L'IA est un **ensemble de techniques permettant à une machine d'imiter certaines capacités cognitives humaines** : comprendre du texte, reconnaître des images, prendre des décisions, générer du contenu.

**Analogie simple :** Imagine qu'un enfant apprend à reconnaître un chien. On lui montre 1 000 photos de chiens. Son cerveau identifie des patterns (4 pattes, fourrure, museau). Un modèle IA fait exactement pareil, mais avec des millions d'exemples et des calculs mathématiques à la place des neurones biologiques.

---

### 🗺️ La Carte Mentale de l'IA

```
Intelligence Artificielle (IA)
│
├── Machine Learning (ML) — Apprendre à partir de données
│   ├── Apprentissage supervisé  → données + labels
│   ├── Apprentissage non supervisé → données sans labels
│   └── Apprentissage par renforcement → récompenses/punitions
│
├── Deep Learning (DL) — Réseaux de neurones profonds
│   ├── CNN (images)
│   ├── RNN / LSTM (séquences)
│   └── Transformers (texte, son, image…)
│
└── IA Générative — Créer du contenu nouveau
    ├── LLMs (texte) → GPT-4, Claude, Gemini, Mistral
    ├── Diffusion (image) → Stable Diffusion, DALL-E
    └── Multimodaux → GPT-4o, Gemini Ultra
```

---

### Les Définitions Essentielles Expliquées Simplement

#### 🤖 IA vs Machine Learning vs Deep Learning vs IA Générative

| Concept | Définition simple | Exemple concret |
|---|---|---|
| **IA** | Toute machine simulant l'intelligence | Filtres spam d'email |
| **Machine Learning** | La machine apprend des données sans être explicitement programmée | Netflix qui prédit ce que tu vas regarder |
| **Deep Learning** | ML avec des couches de neurones artificiels | Reconnaissance faciale de ton téléphone |
| **IA Générative** | Créer du contenu nouveau (texte, image, son…) | ChatGPT qui rédige un email |

#### 🧠 Comment un modèle apprend ?

1. On lui donne des **données** (inputs) et les **réponses correctes** (labels)
2. Il fait une **prédiction** → compare avec la bonne réponse → calcule l'**erreur**
3. Il **ajuste ses paramètres** (poids) via la **rétropropagation** (backpropagation)
4. Il répète millions de fois → il s'améliore → c'est l'**entraînement**

#### 📊 Le rôle des données

Les données sont le **carburant de l'IA**. Un modèle sans données de qualité, c'est comme un étudiant qui révise sur de mauvais cours. Principes clés :
- **Quantité** : plus de données = meilleur modèle (en général)
- **Qualité** : données propres, cohérentes, sans biais
- **Diversité** : représenter tous les cas possibles
- **Étiquetage** : pour l'apprentissage supervisé, les labels doivent être corrects

#### 🔗 Les Réseaux de Neurones

Un réseau de neurones artificiel s'inspire du cerveau humain :
- **Neurone** = une unité qui reçoit des valeurs, les combine, applique une fonction d'activation, produit une sortie
- **Couche d'entrée** → plusieurs **couches cachées** → **couche de sortie**
- Plus le réseau a de couches = plus il est "profond" = Deep Learning
- Chaque connexion a un **poids** (weight) — c'est là que le savoir est stocké

**Exemple :** Pour reconnaître un chat, le réseau analyse pixel par pixel, détecte des bords, puis des formes (oreilles, yeux), puis "chat".

#### 🌐 Les Transformers

Architecture révolutionnaire introduite en 2017 par Google ("Attention is All You Need"). C'est la base de tous les LLMs modernes.

Principe clé : le mécanisme d'**attention**. Le modèle ne lit pas le texte mot par mot (comme les RNN), mais analyse **toutes les relations entre tous les mots simultanément**.

> Phrase : *"La banque de la rivière est boueuse"*
> Le Transformer comprend que "banque" ici = berge (pas banque financière) grâce au contexte "rivière".

#### 🗣️ Les LLM (Large Language Models)

Un LLM est un **réseau Transformer entraîné sur des milliards de mots** pour prédire le prochain token (morceau de mot). Par répétition, il apprend la grammaire, les faits, le raisonnement, le code…

- GPT-4 : ~1 700 milliards de paramètres (estimé)
- Chaque paramètre = un poids dans le réseau
- Plus de paramètres ≠ forcément meilleur, mais souvent plus capable

#### ⚙️ Le Fine-Tuning

Prendre un LLM pré-entraîné et l'entraîner sur des données spécifiques pour le spécialiser.

**Exemple :** Tu prends Mistral (modèle généraliste) et tu le fine-tunes sur des conversations médicales → il devient un assistant médical spécialisé.

Types de fine-tuning :
- **Full fine-tuning** : ajuste tous les paramètres (coûteux)
- **LoRA / QLoRA** : ajuste seulement quelques paramètres-clés (économique)
- **RLHF** : utilisé par OpenAI pour aligner les réponses sur les préférences humaines

#### 🔢 Les Embeddings

Un embedding transforme du texte (ou des images…) en **vecteur numérique** (liste de nombres) dans un espace mathématique où la **proximité = similarité sémantique**.

> "Chat" et "félin" auront des vecteurs proches.
> "Chat" et "voiture" auront des vecteurs éloignés.

Utilisés pour : moteurs de recherche sémantique, systèmes de recommandation, RAG.

#### 🤖 Les Agents IA

Un agent IA est un LLM équipé d'**outils** (recherche web, exécution de code, appels API) qui peut **planifier et exécuter** des tâches complexes de façon autonome.

**Exemple :** "Trouve les 3 meilleures offres d'emploi IA à Paris, envoie-moi un résumé par email et mets un rappel dans mon calendrier."

Un agent va : 1) chercher sur le web → 2) filtrer → 3) envoyer l'email → 4) créer le rappel.

#### 🔍 Les Systèmes RAG (Retrieval-Augmented Generation)

Problème des LLMs : ils ont une date de coupure et ne connaissent pas **tes documents privés**.

RAG résout ça :
1. Tu charges tes documents → convertis en embeddings → stockés dans une **base vectorielle**
2. L'utilisateur pose une question
3. Le système cherche les passages pertinents
4. Le LLM répond en s'appuyant sur ces passages

C'est comme donner un moteur de recherche + mémoire au LLM.

#### 💬 Le Prompting

L'art de formuler des instructions pour obtenir les meilleures réponses d'un LLM.

Techniques clés :
- **Zero-shot** : demander directement sans exemple
- **Few-shot** : donner des exemples dans le prompt
- **Chain-of-Thought** : demander au modèle de "penser étape par étape"
- **System prompt** : définir le rôle et le contexte du modèle

#### 👻 Les Hallucinations

Quand un LLM invente des faits qui n'existent pas avec une totale assurance. C'est la limite principale des LLMs.

**Pourquoi ?** Le modèle prédit les mots les plus probables, pas les mots les plus vrais.

**Solutions :** RAG, grounding sur des sources, vérification humaine, outils de recherche réelle.

#### ⚡ L'Inférence vs L'Entraînement

| | Entraînement | Inférence |
|---|---|---|
| **Quoi** | Apprendre sur les données | Utiliser le modèle appris |
| **Quand** | Une fois (ou périodiquement) | À chaque utilisation |
| **Coût** | Très élevé (GPU pendant des jours) | Beaucoup moins élevé |
| **Exemple** | OpenAI entraîne GPT-4 | Toi qui utilises ChatGPT |

#### 🖥️ Le rôle des GPU

Les GPU (cartes graphiques) ont des milliers de petits processeurs capables de faire des **calculs matriciels en parallèle** — exactement ce dont les réseaux de neurones ont besoin.

- CPU : excellent pour les tâches séquentielles (quelques cœurs puissants)
- GPU : excellent pour les calculs parallèles massifs (milliers de petits cœurs)
- TPU : puces spécialisées de Google pour le Deep Learning

#### 🔄 Les Pipelines IA

Un pipeline est une **chaîne d'étapes automatisées** : collecte données → nettoyage → entraînement → évaluation → déploiement → monitoring.

#### ⚖️ Éthique & Biais de l'IA

Les biais viennent des données. Un modèle entraîné sur des données biaisées reproduit et amplifie ces biais.

Exemples de biais réels :
- Algorithmes de recrutement discriminant les femmes
- Reconnaissance faciale moins précise sur les peaux sombres
- Assistants IA reproduisant des stéréotypes culturels

Principes éthiques : transparence, explicabilité, équité, respect de la vie privée, sécurité.

---

<a name="roadmap"></a>
## 🗺️ ROADMAP COMPLÈTE — 4 NIVEAUX

### Vue d'ensemble temporelle

```
DÉBUTANT (0 → 3 mois)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Python · Maths de base · Notions IA · Premiers modèles ML

INTERMÉDIAIRE (3 → 9 mois)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Deep Learning · PyTorch · NLP · Hugging Face · Projets réels

AVANCÉ (9 → 18 mois)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LLMs · Fine-tuning · Agents · RAG · APIs · Déploiement

EXPERT / INGÉNIEUR IA (18 → 36 mois)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Architecture IA · MLOps · Cloud · Recherche · Leadership
```

---

### 🟢 NIVEAU DÉBUTANT (0–3 mois)

**Objectif :** Comprendre l'IA, programmer en Python, créer ses premiers modèles.

| Compétence | Technologie | Temps estimé |
|---|---|---|
| Bases de Python | Python 3, Jupyter | 3 semaines |
| Maths fondamentales | Algèbre linéaire, stats basiques | 2 semaines |
| Manipulation de données | NumPy, Pandas | 2 semaines |
| Visualisation | Matplotlib, Seaborn | 1 semaine |
| Premier modèle ML | Scikit-learn | 2 semaines |
| Notions IA générales | Lectures, MOOCs | En continu |

**Projets débutant :**
- Analyser un dataset Titanic (survie/mort)
- Prédire le prix de maisons (régression)
- Classifier des emails spam (classification)
- Visualiser des données COVID

**Objectifs professionnels atteignables :** Stage data analyst, assistant en data science, formateur IA no-code.

---

### 🔵 NIVEAU INTERMÉDIAIRE (3–9 mois)

**Objectif :** Maîtriser le Deep Learning, le NLP, et livrer des projets concrets.

| Compétence | Technologie | Temps estimé |
|---|---|---|
| Deep Learning | PyTorch | 4 semaines |
| Vision par ordinateur | CNN, torchvision | 3 semaines |
| NLP basique | NLTK, spaCy | 2 semaines |
| Hugging Face | Transformers, Datasets | 4 semaines |
| APIs IA | OpenAI API, Anthropic API | 2 semaines |
| Versionnement | Git/GitHub | 1 semaine |
| Conteneurisation | Docker bases | 1 semaine |

**Projets intermédiaires :**
- Chatbot basique avec Hugging Face
- Classificateur d'images (chiens vs chats)
- Analyse de sentiment de tweets
- Résumé automatique d'articles

**Objectifs professionnels :** Développeur ML junior, data scientist, consultant IA.

---

### 🟠 NIVEAU AVANCÉ (9–18 mois)

**Objectif :** Créer des systèmes IA complets, fine-tuner des LLMs, déployer en production.

| Compétence | Technologie | Temps estimé |
|---|---|---|
| Fine-tuning LLMs | LoRA, QLoRA, PEFT | 4 semaines |
| Systèmes RAG | LangChain, ChromaDB, Pinecone | 3 semaines |
| Agents IA | LangChain Agents, AutoGen | 3 semaines |
| Déploiement | FastAPI, Docker, Kubernetes | 4 semaines |
| Cloud IA | AWS/GCP/Azure bases | 3 semaines |
| MLOps | MLflow, DVC, Weights & Biases | 3 semaines |
| Bases vectorielles | Pinecone, Weaviate, Qdrant | 2 semaines |

**Projets avancés :**
- Chatbot RAG sur tes propres documents
- Agent IA autonome pour la recherche web
- Fine-tuning de Mistral/LLaMA sur données custom
- API IA déployée sur le cloud
- SaaS IA simple (analyse de documents)

**Objectifs professionnels :** ML Engineer, LLM Engineer, AI Engineer, consultant senior IA.

---

### 🔴 NIVEAU EXPERT / INGÉNIEUR IA (18–36 mois)

**Objectif :** Architecture de systèmes IA à grande échelle, recherche, leadership technique.

| Compétence | Technologie | Temps estimé |
|---|---|---|
| Architecture IA avancée | Transformers from scratch | 6 semaines |
| Optimisation modèles | Quantization, Pruning, Distillation | 4 semaines |
| Infrastructure ML | Kubernetes, Kubeflow, Ray | 6 semaines |
| Recherche IA | Papers, expérimentations | En continu |
| Sécurité IA | Red teaming, adversarial attacks | 3 semaines |
| Leadership IA | Architecture décisions, équipes | En continu |

**Projets expert :**
- Créer un LLM from scratch (petit)
- Système multi-agents complexe
- Architecture MLOps complète en production
- Contribution à un projet open-source IA
- Recherche et publication d'un paper

---

<a name="module-1"></a>
## 📦 MODULE 1 — PYTHON & OUTILS DE BASE

### Objectifs pédagogiques
- Maîtriser Python pour la data science et l'IA
- Savoir manipuler, analyser et visualiser des données
- Comprendre l'écosystème d'outils IA

### Prérequis
Aucun. Ce module part de zéro.

### Difficulté : ⭐☆☆☆☆ → ⭐⭐☆☆☆

---

### 1.1 — Python

**Temps estimé : 3 semaines**

**Notions théoriques à maîtriser :**
- Variables, types, conditions, boucles
- Fonctions, classes, modules
- Listes, dictionnaires, tuples, sets
- Gestion des fichiers (CSV, JSON)
- Environnements virtuels (venv, conda)
- Jupyter Notebooks

**Mini-projet :** Analyseur de notes scolaires — calcule moyenne, médiane, meilleure/pire note, affiche un rapport textuel.

**Erreurs fréquentes :**
- Mélanger Python 2 et Python 3
- Ignorer les environnements virtuels
- Commencer par apprendre trop de syntaxe avant de pratiquer

**Ressources :**
- [Python.org (officiel)](https://docs.python.org/fr/3/tutorial/)
- [FUN MOOC — Python 3](https://www.fun-mooc.fr/fr/)
- [Kaggle Python Course](https://www.kaggle.com/learn/python) (en anglais, gratuit)

---

### 1.2 — NumPy

**Temps estimé : 1 semaine**

NumPy est la bibliothèque de calcul numérique. Toutes les opérations ML/DL passent par des matrices et vecteurs — NumPy est la base.

**Concepts clés :**
- Arrays N-dimensionnels (ndarray)
- Opérations vectorisées (plus rapides que les boucles Python)
- Broadcasting
- Indexation et slicing

```python
import numpy as np

# Créer une matrice 3x3
A = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# Multiplication matricielle (essentielle en DL)
B = np.dot(A, A.T)

# Opérations vectorisées (rapide)
moyennes = A.mean(axis=0)  # Moyenne par colonne
```

**Mini-projet :** Implémenter une régression linéaire from scratch avec NumPy uniquement.

---

### 1.3 — Pandas

**Temps estimé : 1 semaine**

Pandas = Excel dans Python. Manipulation de tableaux de données (DataFrames).

**Concepts clés :**
- DataFrames et Series
- Lecture CSV, Excel, JSON
- Nettoyage des données (valeurs manquantes, doublons)
- Groupby, merge, pivot
- Filtrage et sélection

```python
import pandas as pd

df = pd.read_csv("titanic.csv")
print(df.describe())  # Statistiques descriptives
print(df.isnull().sum())  # Valeurs manquantes

# Nettoyer
df['Age'].fillna(df['Age'].median(), inplace=True)
df = df.dropna()

# Analyser
survie_par_classe = df.groupby('Pclass')['Survived'].mean()
```

**Mini-projet :** Analyse complète du dataset Titanic : nettoyage, statistiques, visualisation, conclusions.

---

### 1.4 — Matplotlib & Seaborn

**Temps estimé : 1 semaine**

Visualiser = comprendre. Les données non visualisées cachent des insights essentiels.

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Distribution
sns.histplot(df['Age'], bins=20)
plt.title("Distribution des âges")
plt.show()

# Corrélation
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
```

---

### 1.5 — Scikit-learn

**Temps estimé : 2 semaines**

La bibliothèque ML de référence. Interface simple, modèles nombreux.

**Modèles à connaître :**
- Régression linéaire / logistique
- Arbres de décision
- Random Forest
- SVM
- K-Nearest Neighbors
- KMeans (clustering)

**Pipeline type Scikit-learn :**

```python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler

# 1. Séparer données
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. Normaliser
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 3. Entraîner
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 4. Évaluer
y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2%}")
print(classification_report(y_test, y_pred))
```

**Projet réel :** Système de détection de fraude bancaire.

---

### 1.6 — Git & GitHub

**Temps estimé : 3 jours**

Indispensable pour tout développeur. Git = versionner ton code. GitHub = partager ton code.

**Commandes essentielles :**
```bash
git init                    # Initialiser un dépôt
git add .                   # Ajouter tous les fichiers
git commit -m "message"     # Sauvegarder une version
git push origin main        # Envoyer sur GitHub
git pull                    # Récupérer les dernières modifications
git branch nouvelle-feature # Créer une branche
git merge nouvelle-feature  # Fusionner
```

---

### 1.7 — Docker

**Temps estimé : 1 semaine**

Docker permet d'empaqueter ton application et ses dépendances dans un **conteneur** portable. "Ça marche sur ma machine" devient "ça marche partout".

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["python", "app.py"]
```

```bash
docker build -t mon-app-ia .
docker run -p 8000:8000 mon-app-ia
```

---

<a name="module-2"></a>
## 📐 MODULE 2 — MATHÉMATIQUES POUR L'IA

### Objectifs pédagogiques
Comprendre les fondements mathématiques sans lesquels l'IA reste une boîte noire.

### Difficulté : ⭐⭐⭐☆☆

### Prérequis
Lycée (terminale scientifique ou équivalent)

---

### 2.1 — Algèbre Linéaire

**Temps estimé : 3 semaines**

C'est le langage des données et des réseaux de neurones.

**Concepts essentiels :**

| Concept | Utilité en IA | Exemple |
|---|---|---|
| Vecteurs | Représenter des données | [2.5, 1.0, 0.8] = caractéristiques d'un utilisateur |
| Matrices | Poids d'un réseau | W ∈ ℝ^(768×768) dans un Transformer |
| Produit matriciel | Transformation des données | Couche linéaire = X · W + b |
| Transposée | Calcul du gradient | W^T |
| Déterminant | Inversibilité | Résoudre des systèmes linéaires |
| Valeurs propres | PCA, compression | Réduire la dimension des données |

**Ressource incontournable :** [3Blue1Brown — Essence of Linear Algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab) (YouTube, en anglais, visualisations magnifiques)

---

### 2.2 — Calcul Différentiel

**Temps estimé : 2 semaines**

La **descente de gradient** (comment un modèle apprend) repose sur les dérivées.

**Concepts clés :**
- Dérivées et dérivées partielles
- Gradient : vecteur de toutes les dérivées partielles
- Règle de chaîne : base de la rétropropagation
- Optimisation : trouver le minimum d'une fonction de coût

**Intuition :** Imagine que tu es perdu dans un brouillard sur une montagne. Pour descendre (minimiser l'erreur), tu tâtes le sol autour de toi et tu avances dans la direction qui descend le plus vite. C'est la descente de gradient.

```python
# Descente de gradient simple
learning_rate = 0.01
for epoch in range(1000):
    prediction = model(X)
    loss = loss_function(prediction, y)
    gradient = compute_gradient(loss)
    weights -= learning_rate * gradient  # On descend le gradient
```

---

### 2.3 — Probabilités & Statistiques

**Temps estimé : 2 semaines**

**Concepts clés :**
- Probabilité conditionnelle (P(A|B))
- Loi normale (distribution gaussienne)
- Théorème de Bayes
- Espérance, variance, écart-type
- Corrélation vs causalité
- Tests d'hypothèse

**Application directe :** Les LLMs produisent une distribution de probabilité sur le vocabulaire pour chaque prochain token. "La prochaine lettre est 'é' avec 73% de probabilité."

---

### 2.4 — Optimisation

**Temps estimé : 1 semaine**

**Algorithmes d'optimisation clés :**

| Algorithme | Description | Usage |
|---|---|---|
| SGD | Stochastic Gradient Descent | Base de tout |
| Adam | Adaptive moment estimation | Standard en DL |
| RMSprop | Learning rate adaptatif | RNNs |
| Adagrad | Bonne pour données sparses | NLP |

**Hyperparamètres d'optimisation :**
- **Learning rate** : trop grand = divergence, trop petit = convergence lente
- **Batch size** : nombre d'exemples par mise à jour
- **Epochs** : nombre de passages sur toutes les données

**Ressource :** [Khan Academy Maths](https://fr.khanacademy.org/) — excellent pour réviser les bases en français.

---

<a name="module-3"></a>
## 🤖 MODULE 3 — MACHINE LEARNING

### Objectifs pédagogiques
- Comprendre les algorithmes ML classiques
- Savoir choisir le bon algorithme selon le problème
- Maîtriser le cycle complet : données → modèle → évaluation

### Difficulté : ⭐⭐☆☆☆ → ⭐⭐⭐☆☆

### Prérequis
Modules 1 et 2

---

### 3.1 — Types de problèmes ML

| Type | Données | Objectif | Algorithmes |
|---|---|---|---|
| **Classification** | X + labels catégoriels | Prédire une catégorie | RF, SVM, LR |
| **Régression** | X + labels numériques | Prédire une valeur | Ridge, Lasso, GBM |
| **Clustering** | X seulement | Grouper des points | KMeans, DBSCAN |
| **Réduction de dimension** | X haute dimension | Compresser | PCA, UMAP, t-SNE |
| **Anomalie** | X avec peu d'anomalies | Détecter les outliers | Isolation Forest |

---

### 3.2 — Le Cycle ML Complet

```
1. DÉFINIR LE PROBLÈME
   └── Classification ? Régression ? Quelles métriques ?

2. COLLECTER LES DONNÉES
   └── Sources, quantité, qualité

3. EXPLORER LES DONNÉES (EDA)
   └── Statistiques, visualisations, corrélations

4. PRÉPARER LES DONNÉES
   ├── Nettoyage (valeurs manquantes, doublons)
   ├── Feature engineering (créer de nouvelles features)
   └── Normalisation / Encodage

5. ENTRAÎNER LE MODÈLE
   ├── Choisir l'algorithme
   ├── Séparer train/validation/test
   └── Ajuster les hyperparamètres

6. ÉVALUER LE MODÈLE
   └── Accuracy, F1, AUC-ROC, RMSE…

7. DÉPLOYER
   └── API, application web

8. MONITORER
   └── Data drift, performance en production
```

---

### 3.3 — Éviter l'Overfitting

L'overfitting = modèle qui "mémorise" les données d'entraînement au lieu d'apprendre les patterns généraux.

**Signes :** accuracy très élevée sur train, basse sur test.

**Solutions :**
- Plus de données d'entraînement
- Régularisation (L1/L2)
- Dropout (pour les réseaux de neurones)
- Cross-validation
- Early stopping
- Simplifier le modèle

---

### 3.4 — Métriques d'évaluation

**Pour la classification :**
- **Accuracy** : % de bonnes prédictions (attention aux classes déséquilibrées !)
- **Precision** : parmi les prédictions positives, combien sont vraiment positives ?
- **Recall** : parmi les vrais positifs, combien ont été détectés ?
- **F1-score** : moyenne harmonique de precision et recall
- **AUC-ROC** : performance globale du classifieur

**Pour la régression :**
- **MAE** (Mean Absolute Error) : erreur moyenne absolue
- **RMSE** (Root Mean Squared Error) : pénalise les grandes erreurs
- **R²** : % de variance expliquée par le modèle

---

### 3.5 — Projets réels ML

1. **Prédiction du churn client** — quel client va résilier son abonnement ?
2. **Détection de fraude bancaire** — transactions anormales
3. **Système de recommandation** — films, produits
4. **Prédiction immobilière** — prix d'une maison selon ses caractéristiques
5. **Segmentation client** — clustering pour le marketing

**Ressources :**
- [Kaggle Learn — Intro to Machine Learning](https://www.kaggle.com/learn/intro-to-machine-learning)
- [Scikit-learn documentation officielle](https://scikit-learn.org/stable/user_guide.html)
- [ML Course — Andrew Ng (Coursera)](https://www.coursera.org/browse/data-science/machine-learning)

---

<a name="module-4"></a>
## 🧠 MODULE 4 — DEEP LEARNING & PYTORCH

### Objectifs pédagogiques
- Comprendre les réseaux de neurones profonds
- Maîtriser PyTorch (framework de référence)
- Créer des CNN, RNN, et architectures custom

### Difficulté : ⭐⭐⭐☆☆ → ⭐⭐⭐⭐☆

### Prérequis
Modules 1, 2, 3

---

### 4.1 — Pourquoi PyTorch plutôt que TensorFlow ?

| | PyTorch | TensorFlow |
|---|---|---|
| **Popularité recherche** | ★★★★★ | ★★★☆☆ |
| **Popularité entreprise** | ★★★★☆ | ★★★★☆ |
| **Courbe d'apprentissage** | Plus facile | Plus difficile |
| **Debugging** | Pythonique et intuitif | Moins intuitif |
| **Hugging Face** | 95% des modèles | ≈5% des modèles |
| **Recommandation** | ✅ Commencer par PyTorch | Apprendre après |

---

### 4.2 — Les Bases de PyTorch

```python
import torch
import torch.nn as nn
import torch.optim as optim

# Tensors = tableaux multi-dimensionnels (comme NumPy, mais sur GPU)
x = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
x = x.cuda()  # Envoyer sur GPU

# Créer un réseau de neurones
class MonReseau(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 256)   # Couche 1 : 784 → 256
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(256, 10)    # Couche 2 : 256 → 10
    
    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

# Entraîner
model = MonReseau()
optimizer = optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

for epoch in range(10):
    optimizer.zero_grad()
    output = model(X_train)
    loss = criterion(output, y_train)
    loss.backward()   # Rétropropagation
    optimizer.step()  # Mise à jour des poids
```

---

### 4.3 — CNN (Convolutional Neural Networks)

Spécialisés pour les **images**. L'idée : scanner l'image avec des filtres pour détecter des patterns locaux (bords, textures, formes…).

```python
class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3)   # 32 filtres 3x3
        self.pool = nn.MaxPool2d(2, 2)                  # Réduire de moitié
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3)
        self.fc1 = nn.Linear(64 * 6 * 6, 128)
        self.fc2 = nn.Linear(128, 10)
    
    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 64 * 6 * 6)
        x = F.relu(self.fc1(x))
        return self.fc2(x)
```

---

### 4.4 — Architectures pré-entraînées (Transfer Learning)

Au lieu de partir de zéro, **utiliser un modèle déjà entraîné sur ImageNet** (1.2M images) et l'adapter à ton problème.

```python
from torchvision import models

# Charger ResNet50 pré-entraîné
model = models.resnet50(pretrained=True)

# Remplacer la dernière couche (1000 classes → tes classes)
model.fc = nn.Linear(model.fc.in_features, nb_classes)

# Optionnel : geler les couches de base
for param in model.parameters():
    param.requires_grad = False
model.fc.requires_grad_(True)  # Seulement la dernière couche s'entraîne
```

**Architectures importantes :**
- ResNet, VGG, EfficientNet → classification d'images
- YOLO → détection d'objets en temps réel
- U-Net → segmentation médicale

---

### 4.5 — Projets Deep Learning

1. Classification d'images (chats vs chiens)
2. Reconnaissance de chiffres manuscrits (MNIST)
3. Détection de tumeurs dans des images médicales
4. Classification de plantes malades
5. Style Transfer (transformer une photo en tableau)

**Ressources :**
- [fast.ai — Practical Deep Learning](https://course.fast.ai/) (gratuit, excellent)
- [PyTorch Documentation officielle](https://pytorch.org/docs/stable/index.html)
- [DeepLearning.AI Specialization](https://www.deeplearning.ai)

---

<a name="module-5"></a>
## 💬 MODULE 5 — NLP & LARGE LANGUAGE MODELS

### Objectifs pédagogiques
- Comprendre comment les machines traitent le langage
- Maîtriser Hugging Face
- Utiliser et fine-tuner des LLMs

### Difficulté : ⭐⭐⭐☆☆ → ⭐⭐⭐⭐⭐

### Prérequis
Modules 1, 2, 3, 4

---

### 5.1 — Evolution du NLP

```
Années 90-2000 : Règles manuelles (RegEx, dictionnaires)
         ↓
Années 2000-2013 : Statistiques (bag of words, TF-IDF)
         ↓
2013 : Word2Vec (premiers vrais embeddings)
         ↓
2017 : Transformers (révolution)
         ↓
2018 : BERT (compréhension bidirectionnelle)
         ↓
2019 : GPT-2 (génération de texte convaincante)
         ↓
2020 : GPT-3 (175B paramètres, few-shot learning)
         ↓
2022 : ChatGPT (RLHF + interface conversationnelle)
         ↓
2023+ : GPT-4, Claude, Gemini, Mistral, LLaMA…
```

---

### 5.2 — Tokenisation

Avant qu'un LLM puisse traiter du texte, il le convertit en **tokens** (morceaux de mots).

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-v0.1")

texte = "L'intelligence artificielle est fascinante."
tokens = tokenizer.encode(texte)
print(tokens)
# [1, 28758, 12363, 1464, 14657, 349, 1929, 13]

# "L'" = 1 token, "intelligence" = 1 token, "fascinante" peut être 2 tokens
print(tokenizer.decode(tokens))
# L'intelligence artificielle est fascinante.
```

**Règle pratique :** 1 token ≈ 0.75 mot en anglais, un peu moins en français.

---

### 5.3 — Hugging Face

Hugging Face = le GitHub de l'IA. Des milliers de modèles pré-entraînés, datasets, et outils.

**Les bibliothèques clés :**
- `transformers` : modèles pré-entraînés (BERT, GPT, T5, Mistral…)
- `datasets` : datasets prêts à l'emploi
- `peft` : fine-tuning efficace (LoRA)
- `evaluate` : métriques d'évaluation
- `accelerate` : entraînement multi-GPU

```python
from transformers import pipeline

# Pipeline prêt à l'emploi
classifier = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")
result = classifier("Ce produit est absolument génial !")
# [{'label': '5 stars', 'score': 0.89}]

# Génération de texte
generator = pipeline("text-generation", model="mistralai/Mistral-7B-Instruct-v0.2")
output = generator("La révolution IA va", max_length=100)

# Question-Réponse
qa = pipeline("question-answering")
qa(question="Où est la tour Eiffel ?", context="La tour Eiffel est à Paris, France.")
```

---

### 5.4 — L'Architecture Transformer en Détail

**Composants principaux :**

1. **Tokenisation + Embedding** → texte converti en vecteurs numériques
2. **Positional Encoding** → indiquer la position de chaque mot
3. **Self-Attention** → chaque mot "regarde" tous les autres et pèse leur importance
4. **Feed-Forward Network** → transformation non-linéaire
5. **Normalisation + Connexions résiduelles** → stabiliser l'entraînement

**Le mécanisme d'attention (simplifié) :**
```
Pour chaque mot, on calcule :
- Query (Q) : "Ce que je cherche"
- Key (K) : "Ce que je suis"
- Value (V) : "Ce que je contiens"

Attention(Q, K, V) = softmax(Q·K^T / √dk) · V
```

---

### 5.5 — Fine-Tuning avec LoRA/QLoRA

LoRA (Low-Rank Adaptation) permet de fine-tuner un LLM de 7B paramètres sur un GPU de 16GB au lieu de nécessiter des centaines de GB.

```python
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments
from peft import LoraConfig, get_peft_model, TaskType
from trl import SFTTrainer

# Charger le modèle de base
model = AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-v0.1",
    load_in_4bit=True,  # QLoRA : quantification 4-bit
    device_map="auto"
)

# Configuration LoRA
lora_config = LoraConfig(
    r=16,            # Rang (taille des matrices ajoutées)
    lora_alpha=32,   # Facteur de scaling
    target_modules=["q_proj", "v_proj"],  # Quelles couches adapter
    lora_dropout=0.05,
    task_type=TaskType.CAUSAL_LM
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# trainable params: 4,194,304 || all params: 3,756,843,008 → 0.11%
# On n'entraîne que 0.11% des paramètres !
```

---

### 5.6 — Projets NLP

1. Analyse de sentiment de commentaires clients
2. Résumé automatique d'articles (abstractive summarization)
3. Traduction automatique
4. Extraction d'informations (NER)
5. Chatbot basé sur BERT/Mistral
6. Classificateur de fake news

**Ressources :**
- [Hugging Face Course](https://huggingface.co/learn) — THE référence, gratuit
- [NLP avec Python — NLTK book](https://www.nltk.org/book/) (en anglais, gratuit)
- [Stanford CS224N NLP with Deep Learning](https://web.stanford.edu/class/cs224n/)

---

<a name="module-6"></a>
## ✨ MODULE 6 — IA GÉNÉRATIVE

### Objectifs pédagogiques
- Maîtriser les APIs des grands LLMs
- Comprendre les modèles de diffusion
- Créer des applications IA génératives

### Difficulté : ⭐⭐☆☆☆ → ⭐⭐⭐⭐☆

---

### 6.1 — Les Grands LLMs en Comparaison

| Modèle | Créateur | Forces | Accès |
|---|---|---|---|
| **GPT-4o** | OpenAI | Multimodal, très capable | API payante |
| **Claude 3.7** | Anthropic | Sécurité, long contexte, raisonnement | API payante |
| **Gemini Ultra** | Google | Multimodal natif, Google intégration | API |
| **Mistral Large** | Mistral AI | Excellent français, open-source partiel | API + local |
| **LLaMA 3** | Meta | Open-source complet, fine-tunable | Gratuit/local |
| **Qwen 2.5** | Alibaba | Multilingual, très performant | Gratuit/local |

---

### 6.2 — OpenAI API

```python
from openai import OpenAI

client = OpenAI(api_key="sk-...")

# Chat Completion
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "Tu es un expert en marketing digital."},
        {"role": "user", "content": "Écris un slogan pour une startup IA."}
    ],
    temperature=0.7,  # Créativité : 0 (déterministe) → 2 (très créatif)
    max_tokens=200
)
print(response.choices[0].message.content)

# Streaming (réponse progressive)
with client.chat.completions.stream(model="gpt-4o", messages=[...]) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)

# Vision (image + texte)
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Que vois-tu sur cette image ?"},
            {"type": "image_url", "image_url": {"url": "https://..."}}
        ]
    }]
)
```

---

### 6.3 — Anthropic API (Claude)

```python
import anthropic

client = anthropic.Anthropic(api_key="sk-ant-...")

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    system="Tu es un assistant expert en code Python.",
    messages=[
        {"role": "user", "content": "Explique la récursivité avec un exemple."}
    ]
)
print(message.content[0].text)
```

---

### 6.4 — Ollama — LLMs en Local

Ollama permet de faire tourner des LLMs directement sur ta machine, **gratuitement et sans envoyer tes données sur internet**.

```bash
# Installation (macOS/Linux)
curl -fsSL https://ollama.ai/install.sh | sh

# Télécharger et lancer un modèle
ollama pull mistral        # Modèle 7B (~4GB)
ollama pull llama3.2       # Meta LLaMA 3.2
ollama pull phi3           # Microsoft Phi-3 (léger)

# Lancer une conversation
ollama run mistral
```

```python
import ollama

response = ollama.chat(
    model='mistral',
    messages=[{'role': 'user', 'content': 'Explique les réseaux de neurones'}]
)
print(response['message']['content'])
```

---

### 6.5 — Génération d'Images

**Stable Diffusion (open-source) :**

```python
from diffusers import StableDiffusionPipeline
import torch

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")

image = pipe(
    prompt="Un paysage montagneux au coucher de soleil, style peinture à l'huile, très détaillé",
    negative_prompt="flou, mauvaise qualité, distorsion",
    num_inference_steps=30,  # Plus = meilleur mais plus lent
    guidance_scale=7.5       # Fidélité au prompt
).images[0]

image.save("output.png")
```

**Plateformes en ligne :**
- **Midjourney** : meilleure qualité artistique
- **DALL-E 3** : intégré à ChatGPT
- **Stable Diffusion** : open-source, local
- **Adobe Firefly** : pour les professionnels créatifs

---

### 6.6 — Prompting Avancé

**Techniques de prompting :**

```
1. ZERO-SHOT
"Traduis ce texte en anglais : [texte]"

2. FEW-SHOT
"Traduis ces textes en anglais :
FR: Bonjour → EN: Hello
FR: Merci → EN: Thank you
FR: Au revoir → EN: ?"

3. CHAIN-OF-THOUGHT
"Résous ce problème étape par étape.
Problème : [problème complexe]
Raisonnement : Pense d'abord à [étape 1], puis..."

4. SYSTEM PROMPT
system: "Tu es un expert juridique français. Tu répondras uniquement
en te basant sur le droit français, de manière précise et professionnelle."

5. ROLE PROMPTING
"Tu es Sherlock Holmes. Analyse ce mystère avec ta méthode déductive."

6. STRUCTURED OUTPUT
"Réponds uniquement en JSON avec cette structure :
{
  "sentiment": "positif/negatif/neutre",
  "score": 0-10,
  "raison": "explication"
}"
```

---

### 6.7 — IA No-Code vs IA avec Code

| | IA No-Code | IA avec Code |
|---|---|---|
| **Exemples** | Zapier, Make, n8n, Voiceflow | Python, LangChain, API directe |
| **Vitesse** | ✅ Très rapide | ❌ Plus long |
| **Flexibilité** | ❌ Limitée | ✅ Illimitée |
| **Coût** | ❌ Abonnements | ✅ Moins cher à long terme |
| **Personnalisation** | ❌ Faible | ✅ Totale |
| **Pour qui ?** | Entrepreneurs, marketeurs | Développeurs, ingénieurs |

**Recommandation :** Apprends à coder. Les outils no-code sont utiles pour prototyper rapidement, mais pour créer des produits sérieux, le code est indispensable.

---

<a name="module-7"></a>
## 👁️ MODULE 7 — COMPUTER VISION

### Objectifs pédagogiques
- Créer des systèmes de reconnaissance d'images
- Implémenter la détection d'objets
- Faire de la segmentation sémantique

### Difficulté : ⭐⭐⭐☆☆ → ⭐⭐⭐⭐☆

---

### 7.1 — Tâches de Computer Vision

| Tâche | Description | Modèle type |
|---|---|---|
| **Classification** | "C'est un chat" | ResNet, EfficientNet |
| **Détection** | "Il y a un chat à (x,y,w,h)" | YOLO, DETR |
| **Segmentation** | Délimiter pixel par pixel | U-Net, SAM |
| **Pose estimation** | Position des articulations | MediaPipe, OpenPose |
| **OCR** | Lire du texte dans une image | Tesseract, EasyOCR |
| **Face recognition** | Identifier une personne | FaceNet, DeepFace |

---

### 7.2 — YOLO (Détection temps réel)

```python
from ultralytics import YOLO
import cv2

# Charger YOLO pré-entraîné
model = YOLO('yolov8n.pt')  # nano (rapide), s, m, l, x (précis)

# Détection sur image
results = model.predict(source='image.jpg', conf=0.5)
for box in results[0].boxes:
    print(f"Classe: {box.cls}, Confiance: {box.conf:.2f}, Bbox: {box.xyxy}")

# Détection en temps réel (webcam)
results = model.predict(source=0, stream=True, show=True)
```

---

### 7.3 — Projets Computer Vision

1. Reconnaissance de plantes malades
2. Comptage de véhicules sur une autoroute (YOLO)
3. Détection d'EPI sur chantier (casques, gilets)
4. Lecture automatique de documents (OCR)
5. Détection de défauts industriels

---

<a name="module-8"></a>
## 🤖 MODULE 8 — AGENTS IA & SYSTÈMES RAG

### Objectifs pédagogiques
- Créer des agents IA autonomes
- Implémenter un système RAG complet
- Maîtriser LangChain et les bases vectorielles

### Difficulté : ⭐⭐⭐⭐☆

### Prérequis
Modules 1, 5, 6

---

### 8.1 — LangChain

LangChain est le framework principal pour créer des applications LLM complexes.

```python
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain

# LLM
llm = ChatOpenAI(model="gpt-4o", temperature=0)

# Prompt template
prompt = ChatPromptTemplate.from_messages([
    ("system", "Tu es un expert en {domaine}. Réponds de manière concise."),
    ("user", "{question}")
])

# Chain
chain = prompt | llm

response = chain.invoke({
    "domaine": "finance",
    "question": "Explique le P/E ratio"
})
print(response.content)
```

---

### 8.2 — Système RAG Complet

```python
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA

# 1. Charger les documents
loader = PyPDFLoader("mon_document.pdf")
documents = loader.load()

# 2. Découper en chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,    # Taille des morceaux
    chunk_overlap=200   # Chevauchement pour ne pas perdre de contexte
)
chunks = splitter.split_documents(documents)

# 3. Créer les embeddings et les stocker
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(
    chunks,
    embeddings,
    persist_directory="./chroma_db"
)

# 4. Créer le retriever
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# 5. Créer la chaîne RAG
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4o"),
    retriever=retriever,
    return_source_documents=True
)

# 6. Poser une question
result = qa_chain.invoke({"query": "Quelles sont les conclusions de ce document ?"})
print(result["result"])
```

---

### 8.3 — Bases Vectorielles

| Base vectorielle | Forces | Usage recommandé |
|---|---|---|
| **ChromaDB** | Simple, open-source, local | Dev/prototypage |
| **Pinecone** | Cloud, scalable, managed | Production |
| **Weaviate** | Hybride (vecteur + filtre) | Recherche complexe |
| **Qdrant** | Performant, open-source | Production self-hosted |
| **FAISS** | Ultra-rapide, Meta | Grandes échelles |
| **pgvector** | Extension PostgreSQL | Si tu utilises déjà Postgres |

---

### 8.4 — Agents IA Autonomes

Un agent a :
- **Un LLM** (cerveau)
- **Des outils** (capacités)
- **Une mémoire** (contexte)
- **Un objectif** (tâche)

```python
from langchain_openai import ChatOpenAI
from langchain.agents import create_react_agent, AgentExecutor
from langchain_community.tools import DuckDuckGoSearchRun, WikipediaQueryRun
from langchain.tools import tool

# Outils
search = DuckDuckGoSearchRun()
wiki = WikipediaQueryRun()

@tool
def calculer(expression: str) -> str:
    """Évalue une expression mathématique Python."""
    return str(eval(expression))

tools = [search, wiki, calculer]

# Agent ReAct (Reasoning + Acting)
llm = ChatOpenAI(model="gpt-4o", temperature=0)
agent = create_react_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

result = executor.invoke({
    "input": "Quelle est la population de Paris en 2024 ? "
             "Calcule 5% de ce nombre."
})
```

**L'agent va automatiquement :**
1. Chercher la population de Paris
2. Extraire le chiffre
3. Calculer 5% avec l'outil calculer
4. Synthétiser la réponse

---

### 8.5 — Projets Agents & RAG

1. **Assistant personnel RAG** sur tes propres notes Obsidian
2. **Chatbot support client** sur la documentation d'un produit
3. **Agent de recherche** qui lit des papers académiques et fait un résumé
4. **Agent trader** qui suit le cours de cryptomonnaies (simulation)
5. **Assistant juridique** sur le code du travail français

---

<a name="module-9"></a>
## 🚀 MODULE 9 — DÉPLOIEMENT & MLOPS

### Objectifs pédagogiques
- Déployer un modèle IA en production
- Créer des APIs IA robustes
- Mettre en place le monitoring

### Difficulté : ⭐⭐⭐☆☆ → ⭐⭐⭐⭐☆

---

### 9.1 — FastAPI pour les APIs IA

FastAPI est le standard pour créer des APIs Python modernes et performantes.

```python
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI(title="Mon API IA")

# Charger le modèle au démarrage
classifier = pipeline("sentiment-analysis")

class TextRequest(BaseModel):
    texte: str

class SentimentResponse(BaseModel):
    sentiment: str
    score: float

@app.post("/analyser", response_model=SentimentResponse)
async def analyser_sentiment(request: TextRequest):
    result = classifier(request.texte)[0]
    return SentimentResponse(
        sentiment=result['label'],
        score=result['score']
    )

@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Lancer : uvicorn main:app --reload
```

---

### 9.2 — Déploiement Cloud

**Options de déploiement :**

| Platform | Prix | Facilité | Scalabilité |
|---|---|---|---|
| **Hugging Face Spaces** | Gratuit (limité) | ⭐⭐⭐⭐⭐ | Moyen |
| **Railway** | ~5$/mois | ⭐⭐⭐⭐☆ | Bon |
| **Render** | Gratuit (limité) | ⭐⭐⭐⭐☆ | Bon |
| **AWS EC2/ECS** | Variable | ⭐⭐⭐☆☆ | Excellent |
| **Google Cloud Run** | Pay-as-you-go | ⭐⭐⭐⭐☆ | Excellent |
| **Modal** | Pay-as-you-go | ⭐⭐⭐⭐☆ | Excellent GPU |
| **Replicate** | Pay-as-you-go | ⭐⭐⭐⭐☆ | Excellent |

---

### 9.3 — MLOps — Gérer les Modèles en Production

MLOps = DevOps appliqué au Machine Learning.

**Outils MLOps essentiels :**

| Outil | Usage | Gratuit ? |
|---|---|---|
| **MLflow** | Tracking des expériences, versionning modèles | ✅ |
| **Weights & Biases** | Tracking avancé, visualisation | ✅ (limité) |
| **DVC** | Versionning des données | ✅ |
| **Airflow** | Orchestration des pipelines | ✅ |
| **Prometheus + Grafana** | Monitoring en production | ✅ |

```python
import mlflow

with mlflow.start_run():
    mlflow.log_param("model_type", "random_forest")
    mlflow.log_param("n_estimators", 100)
    
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    
    mlflow.log_metric("accuracy", accuracy)
    mlflow.sklearn.log_model(model, "model")
```

---

### 9.4 — Monitoring en Production

Surveiller un modèle IA en production pour détecter :
- **Data drift** : les données d'entrée changent par rapport à l'entraînement
- **Concept drift** : la relation input-output change
- **Dégradation des performances** : le modèle se trompe plus souvent

---

<a name="module-10"></a>
## 🎓 MODULE 10 — CURSUS INGÉNIEUR IA

### Compétences recherchées sur le marché en 2025

**Hard skills (techniques) :**
- Python avancé (classes, async, optimisation)
- PyTorch / TensorFlow
- Architecture LLMs et fine-tuning
- MLOps (MLflow, Docker, Kubernetes, CI/CD)
- Cloud (AWS/GCP/Azure)
- Bases vectorielles et RAG
- Systèmes distribués
- SQL et bases de données

**Soft skills :**
- Communication (expliquer l'IA à des non-techniques)
- Gestion de projet agile
- Pensée critique et scientifique
- Veille technologique

---

### Les Métiers de l'IA

| Métier | Salaire FR (junior) | Salaire FR (senior) | Compétences clés |
|---|---|---|---|
| **Data Scientist** | 40–50k€ | 65–90k€ | Stats, ML, Python, viz |
| **ML Engineer** | 45–55k€ | 70–100k€ | MLOps, déploiement, scale |
| **AI/LLM Engineer** | 50–65k€ | 80–120k€ | LLMs, RAG, agents, APIs |
| **Data Engineer** | 42–52k€ | 65–85k€ | Spark, SQL, pipelines |
| **AI Researcher** | 50–70k€ | 80–150k€ | Maths, publications, PhD |
| **NLP Engineer** | 48–60k€ | 75–110k€ | Transformers, fine-tuning |
| **Computer Vision Engineer** | 45–58k€ | 70–100k€ | CNN, YOLO, OpenCV |
| **AI Product Manager** | 50–65k€ | 80–120k€ | IA + Produit + Business |

---

### Certifications Utiles

| Certification | Organisme | Valeur marché | Coût |
|---|---|---|---|
| **AWS Certified ML Specialty** | Amazon | ★★★★☆ | ~300$ |
| **Google Professional ML Engineer** | Google | ★★★★☆ | ~200$ |
| **DeepLearning.AI Specialization** | Coursera | ★★★☆☆ | ~50$/mois |
| **Hugging Face Certification** | Hugging Face | ★★★☆☆ | Gratuit |
| **TensorFlow Developer Certificate** | Google | ★★★☆☆ | ~100$ |
| **Azure AI Engineer Associate** | Microsoft | ★★★★☆ | ~165$ |

---

### Sujets Avancés Ingénieur IA

**Data Engineering :**
- Apache Spark (traitement de données à grande échelle)
- Apache Kafka (streaming de données)
- dbt (transformation de données)
- Data Lakes et Data Warehouses

**Cloud IA :**
- AWS : SageMaker, Bedrock, Lambda, S3
- GCP : Vertex AI, BigQuery ML, Cloud Storage
- Azure : Azure ML, Azure OpenAI Service

**Architecture IA Avancée :**
- Mixture of Experts (MoE)
- RLHF et Constitutional AI
- Quantization (GPTQ, AWQ)
- Model compression (pruning, distillation)

**Sécurité IA :**
- Prompt injection attacks
- Jailbreaking et red teaming
- Données d'entraînement poisoning
- Confidentialité différentielle

---

### Les Meilleurs Projets Portfolio pour l'Emploi

1. **RAG complet déployé** — Chatbot sur une base de connaissances, API FastAPI, déployé sur cloud
2. **Fine-tuning LLM** — Mistral ou LLaMA fine-tuné sur un domaine spécifique, avec évaluation
3. **Système de détection** — Computer Vision en production (YOLO + API)
4. **Pipeline MLOps** — Entraînement → évaluation → déploiement automatisé
5. **Agent IA** — Agent autonome avec plusieurs outils, mémoire, interface web

---

<a name="creation"></a>
## 🏗️ CRÉER SON MODÈLE, SON CHATBOT, SON SAAS IA

### Créer un Chatbot IA de A à Z

```
ARCHITECTURE D'UN CHATBOT IA MODERNE

Frontend (Streamlit / Next.js)
    ↕ HTTP/WebSocket
Backend (FastAPI)
    ├── Gestion de session / historique
    ├── Système de prompts
    ├── Appel LLM (OpenAI / Ollama / Mistral)
    └── RAG (si nécessaire)
         ├── Base vectorielle (ChromaDB / Pinecone)
         └── Embeddings
```

**Stack minimale recommandée :**

```python
# backend/main.py
from fastapi import FastAPI
from openai import OpenAI
from pydantic import BaseModel

app = FastAPI()
client = OpenAI()

conversations = {}  # Simple mémoire en RAM (Redis en production)

class Message(BaseModel):
    session_id: str
    message: str

@app.post("/chat")
async def chat(msg: Message):
    # Récupérer l'historique
    history = conversations.get(msg.session_id, [])
    history.append({"role": "user", "content": msg.message})
    
    # Appel LLM
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Tu es un assistant utile."},
            *history
        ]
    )
    
    assistant_message = response.choices[0].message.content
    history.append({"role": "assistant", "content": assistant_message})
    conversations[msg.session_id] = history[-20:]  # Garder 20 derniers messages
    
    return {"response": assistant_message}
```

---

### Créer un SaaS IA

**Structure d'un SaaS IA :**

```
1. IDÉE & VALIDATION
   └── Quel problème résous-tu ? Qui paie ?

2. STACK TECHNIQUE
   ├── Frontend : Next.js / React
   ├── Backend : FastAPI / Node.js
   ├── Base de données : PostgreSQL + pgvector
   ├── Auth : Clerk / Supabase Auth
   ├── Paiement : Stripe
   └── IA : OpenAI / Anthropic / Mistral

3. MVP EN 2 SEMAINES
   ├── 1 feature principale
   ├── Interface simple
   └── Paiement fonctionnel

4. PRICING MODÈLE
   ├── Freemium (X requêtes gratuites/mois)
   ├── Subscription (9-49$/mois)
   └── Pay-as-you-go (payer selon usage)

5. LANCEMENT
   ├── Product Hunt
   ├── Reddit (subreddits pertinents)
   ├── Twitter/X
   └── LinkedIn
```

**Idées de SaaS IA rentables :**
- Générateur de contenu pour e-commerce
- Outil d'analyse de contrats juridiques
- Assistant IA pour comptables
- Chatbot de support client personnalisé
- Outil de résumé de réunions
- Générateur de rapports automatiques

---

<a name="carriere"></a>
## 💼 PORTFOLIO, EMPLOI & FREELANCE IA

### Construire un Portfolio IA Solide

**Ce que les recruteurs veulent voir :**

1. **Du code propre sur GitHub** — README clair, structure logique, commentaires
2. **Des projets déployés** — pas juste dans un notebook, mais en ligne
3. **Des vrais problèmes résolus** — pas juste des tutoriels copiés
4. **Ta démarche** — articles de blog, vidéos, explications

**Structure idéale du portfolio GitHub :**
```
github.com/tonnom/
├── rag-chatbot/          ← Projet phare, bien documenté
├── llm-finetuning/       ← Fine-tuning démontré
├── cv-detection-app/     ← Computer vision déployée
├── ml-projects/          ← Collection de projets ML
└── ai-articles/          ← Tes écrits sur l'IA
```

---

### Décrocher son Premier Emploi en IA

**Timeline recommandée :**

```
Mois 1-3   : Apprendre Python + ML (Module 1-3)
Mois 4-6   : Deep Learning + NLP (Module 4-5)
Mois 6-8   : Projets portfolio + GitHub actif
Mois 8-10  : LLMs + déploiement (Module 6-9)
Mois 10-12 : Stage / alternance / premiers emplois
```

**Où chercher des emplois IA en France :**
- LinkedIn (filtre "Intelligence Artificielle", "Machine Learning")
- Welcome to the Jungle
- Malt (pour le freelance)
- Glassdoor
- AFJV (Jeux Vidéo avec IA)
- Talent.io

**Comment se démarquer :**
- Contributions open-source (Hugging Face Hub, GitHub)
- Articles techniques (Medium, Dev.to, ton blog)
- Présence sur X (Twitter) dans la communauté IA
- Participer à des Kaggle competitions

---

### Freelancer avec l'IA

**Services IA très demandés en freelance :**

| Service | Tarif journalier | Difficulté |
|---|---|---|
| Chatbot RAG sur mesure | 400–800€/jour | Intermédiaire |
| Fine-tuning LLM | 600–1200€/jour | Avancé |
| Automatisation IA (n8n + LLM) | 300–600€/jour | Débutant+ |
| Analyse de données + ML | 400–700€/jour | Intermédiaire |
| Formation IA en entreprise | 1000–2000€/jour | Variable |
| Audit IA / Conseil stratégique | 800–1500€/jour | Expert |

**Plateformes pour trouver des clients :**
- Malt (France, recommandé)
- Upwork (international)
- Toptal (haut de gamme, rigoureux)
- LinkedIn (direct)
- ComeUp (France)

---

<a name="erreurs"></a>
## ⚠️ ERREURS FRÉQUENTES & COMMENT APPRENDRE EFFICACEMENT

### Les 10 Erreurs qui Bloquent la Progression

1. **Trop de théorie, pas assez de pratique** — Coder 70%, lire 30%
2. **Suivre trop de cours en même temps** — Un seul cours à la fois, jusqu'au bout
3. **Copier-coller sans comprendre** — Toujours retaper le code, jamais copier
4. **Ignorer les mathématiques** — Comprendre les maths rend tout plus clair et durable
5. **Pas de projets personnels** — Les tutoriels ne remplacent pas les vrais projets
6. **Changer de framework en permanence** — Maîtriser PyTorch avant d'apprendre TF
7. **Ne pas lire les messages d'erreur** — Les erreurs sont tes meilleurs professeurs
8. **Isolement** — Rejoindre des communautés, se challenger avec d'autres
9. **Perfectionnisme** — Déployer un MVP imparfait vaut mieux que ne rien finir
10. **Ne pas versionner son code** — Git dès le premier jour

### Comment Apprendre Efficacement l'IA

**Méthode recommandée : Learn → Build → Teach**

```
1. APPRENDRE (30%) 
   → Cours, lectures, vidéos
   → Maximum 1-2h par session
   → Prendre des notes structurées

2. CONSTRUIRE (60%)
   → Coder les exemples du cours
   → Modifier, casser, débugger
   → Créer un mini-projet connexe

3. ENSEIGNER (10%)
   → Écrire un article sur ce que tu as appris
   → Expliquer à quelqu'un (ou à toi-même)
   → Partager sur LinkedIn/GitHub
```

**Rythme optimal :**
- 1-2 heures de pratique par jour > 8 heures le weekend
- La régularité bat l'intensité
- Faire des pauses (le cerveau consolide pendant le repos)

---

### Tendances IA des Prochaines Années

**Court terme (2025-2026) :**
- Agents IA autonomes dans les entreprises
- Multimodalité généralisée (texte + image + son + vidéo)
- IA embarquée (on-device, smartphones)
- LLMs spécialisés par domaine

**Moyen terme (2026-2028) :**
- IA dans la robotique
- Raisonnement IA niveau humain sur des domaines spécifiques
- Génération vidéo professionnelle
- IA médicale (diagnostic, drug discovery)

**Long terme (2028+) :**
- AGI (Artificial General Intelligence) — débat ouvert
- Automation massive de tâches cognitives
- Fusion IA + biologie
- IA quantique

---

<a name="ressources"></a>
## 📚 RESSOURCES COMPLÈTES PAR MODULE

### 🌟 Ressources Fondamentales (Toujours Utiles)

| Ressource | Langue | Niveau | Gratuit |
|---|---|---|---|
| [Elements of AI](https://www.elementsofai.com/fr/) | 🇫🇷 Français | Débutant | ✅ |
| [FUN MOOC IA](https://www.fun-mooc.fr/fr/) | 🇫🇷 Français | Débutant-Inter | ✅ |
| [MOOC IAI Inria/Class'Code](https://www.francenum.gouv.fr/formations/decouvrir-et-comprendre-lintelligence-artificielle-avec-le-mooc-classcode-iai) | 🇫🇷 Français | Débutant | ✅ |
| [DeepLearning.AI](https://www.deeplearning.ai) | 🇬🇧 Anglais | Tous niveaux | Partiel |
| [Kaggle Learn](https://www.kaggle.com/learn) | 🇬🇧 Anglais | Débutant-Inter | ✅ |
| [Coursera ML Specialization](https://www.coursera.org/browse/data-science/machine-learning) | 🇬🇧 Anglais | Inter | Audit ✅ |
| [Hugging Face Courses](https://huggingface.co/learn) | 🇬🇧 Anglais | Inter-Avancé | ✅ |
| [OpenAI Academy](https://academy.openai.com) | 🇬🇧 Anglais | Inter-Avancé | ✅ |
| [Microsoft Learn IA](https://learn.microsoft.com/fr-fr/training/browse/?subjects=artificial-intelligence) | 🇫🇷 Français | Tous niveaux | ✅ |
| [fast.ai](https://course.fast.ai) | 🇬🇧 Anglais | Inter | ✅ |

---

### Ressources par Module

**Module 1 — Python & Outils**
- [Python.org tutoriel officiel FR](https://docs.python.org/fr/3/tutorial/)
- [Kaggle Python Course](https://www.kaggle.com/learn/python)
- [NumPy Quickstart](https://numpy.org/doc/stable/user/quickstart.html)
- [Pandas Documentation FR](https://pandas.pydata.org/docs/user_guide/index.html)
- [Git — The Simple Guide](https://rogerdudler.github.io/git-guide/index.fr.html)

**Module 2 — Mathématiques**
- [Khan Academy FR](https://fr.khanacademy.org/) — Algèbre linéaire, probas
- [3Blue1Brown Essence of Linear Algebra](https://www.youtube.com/c/3blue1brown) — Visualisations magnifiques
- [Cours ML Mila/IVADO](https://sites.google.com/view/ivado-ml/) — Québec, français
- [Gilbert Strang Linear Algebra MIT](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)

**Module 3 — Machine Learning**
- [Scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html)
- [ML Course Andrew Ng — Coursera](https://www.coursera.org/browse/data-science/machine-learning)
- [Kaggle ML Courses](https://www.kaggle.com/learn/intro-to-machine-learning)
- [Hands-On Machine Learning (Aurélien Géron)](https://github.com/ageron/handson-ml3) — Notebooks gratuits

**Module 4 — Deep Learning**
- [PyTorch Tutorials officiels](https://pytorch.org/tutorials/)
- [fast.ai Practical Deep Learning](https://course.fast.ai/)
- [DeepLearning.AI Deep Learning Specialization](https://www.deeplearning.ai)
- [NYU Deep Learning (Yann LeCun)](https://atcold.github.io/NYU-DLFL22/) — Cours gratuit

**Module 5 — NLP & LLMs**
- [Hugging Face NLP Course](https://huggingface.co/learn/nlp-course) — THE référence
- [Stanford CS224N](https://web.stanford.edu/class/cs224n/)
- [LLM University (Cohere)](https://university.cohere.com/)
- [Andrej Karpathy — Let's build GPT](https://www.youtube.com/watch?v=kCc8FmEb1nY) — Incontournable

**Module 6 — IA Générative**
- [OpenAI Cookbook](https://cookbook.openai.com/)
- [Anthropic Documentation](https://docs.anthropic.com/)
- [LangChain Documentation](https://python.langchain.com/docs/)
- [Ollama GitHub](https://github.com/ollama/ollama)

**Module 7 — Computer Vision**
- [Ultralytics YOLO Docs](https://docs.ultralytics.com/)
- [PyTorch Vision Tutorials](https://pytorch.org/vision/stable/index.html)
- [Roboflow Blog](https://blog.roboflow.com/) — Tutoriels pratiques

**Module 8 — Agents & RAG**
- [LangChain RAG Tutorial](https://python.langchain.com/docs/use_cases/question_answering/)
- [LlamaIndex Documentation](https://docs.llamaindex.ai/)
- [Chroma Documentation](https://docs.trychroma.com/)

**Module 9 — Déploiement & MLOps**
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [MLflow Documentation](https://mlflow.org/docs/latest/index.html)
- [Weights & Biases Tutorials](https://docs.wandb.ai/)
- [Docker Get Started](https://docs.docker.com/get-started/)

**Module 10 — Ingénieur IA**
- [AWS ML Learning Path](https://aws.amazon.com/training/learn-about/machine-learning/)
- [Google Cloud AI Learning](https://cloud.google.com/learn/training/machinelearning-ai)
- [Papers With Code](https://paperswithcode.com/) — Derniers papiers + code
- [Arxiv Sanity](https://arxiv-sanity-lite.com/) — Veille recherche IA

---

### Communautés Francophones IA

- **Reddit r/intelligence_artificielle** — Communauté française active
- **Discord DataScientest** — Entraide en français
- **Slack Latitudes** — IA pour le bien commun
- **LinkedIn Groupes** — "Intelligence Artificielle France", "Data Science France"
- **Meetup** — Chercher "IA" ou "Machine Learning" dans ta ville

---

## 🏁 PLANNING D'APPRENTISSAGE RECOMMANDÉ

### Planning sur 12 mois (1-2h/jour)

| Mois | Contenu | Objectif |
|---|---|---|
| **1** | Python + NumPy + Pandas | Programmer confortablement |
| **2** | Scikit-learn + projets ML | Premiers modèles ML |
| **3** | Maths IA + visualisation | Comprendre les fondamentaux |
| **4** | PyTorch + Deep Learning bases | Créer des réseaux |
| **5** | CNN + Transfer Learning | Computer Vision |
| **6** | NLP + Hugging Face | Travailler avec du texte |
| **7** | LLMs + APIs (OpenAI, Anthropic) | Construire avec les LLMs |
| **8** | RAG + LangChain + Agents | Systèmes IA avancés |
| **9** | FastAPI + Déploiement | Mise en production |
| **10** | MLOps + Docker + Cloud | Pipeline complet |
| **11** | Fine-tuning + Optimisation | Spécialisation |
| **12** | Portfolio + Projets finaux | Prêt pour l'emploi |

---

> 💡 **Conseil final :** L'IA évolue à une vitesse folle. Les outils changeront, mais les fondamentaux (maths, programmation, pensée algorithmique) restent. Investis dans les fondamentaux, et tu t'adapteras facilement aux nouvelles technologies.
>
> **La meilleure formation IA ? Celle que tu termines.**
>
> Commence aujourd'hui. 🚀

---

*Formation créée avec ❤️ — Mise à jour : Mai 2026*
*Ressources vérifiées et actives au moment de la rédaction*
