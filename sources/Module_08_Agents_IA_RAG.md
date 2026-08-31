# 🎓 FORMATION IA — MODULE 8
# Agents IA & Systèmes RAG
### Donner une mémoire externe et de l'autonomie à un LLM

> **Professeur :** Dr. IA — Formation Complète  
> **Durée estimée :** 7 semaines (1–2h par jour)  
> **Prérequis :** Module 3 (Machine Learning), Module 5 (NLP & LLMs), Module 6 (IA Générative)

---

## 🧭 COMMENT LIRE CE MODULE

Ce module répond à deux limites fondamentales d'un LLM "brut", que tu as déjà identifiées dans les modules précédents : il **ne connaît pas tes documents privés** (Module 0, 5), et il **ne peut qu'écrire du texte**, sans agir sur le monde (Module 6, Function Calling). Les systèmes RAG résolvent la première limite ; les Agents IA résolvent la seconde. Les deux s'appuient directement sur tout ce que tu as déjà appris.

**La structure de chaque chapitre reste identique aux modules précédents :**

```
1. 📖 EXPLICATION — toutes les notions, en langage simple et avec des analogies,
                     AVANT tout code
2. 💻 MISE EN PRATIQUE — le code (souvent avec LangChain) qui implémente
                          ce que tu viens de comprendre
3. 🏋️ EXERCICES — 4 exercices corrigés pour ancrer la compréhension
```

---

## 📋 PLAN DU MODULE 8

| Chapitre | Sujet | Durée estimée |
|---|---|---|
| **8.1** | Les Systèmes RAG : une Mémoire Externe pour un LLM | 1.5 semaine |
| **8.2** | Les Bases de Données Vectorielles | 1 semaine |
| **8.3** | Construire un RAG Complet avec LangChain | 1.5 semaine |
| **8.4** | Les Agents IA : le Pattern ReAct | 1.5 semaine |
| **8.5** | Construire des Agents avec des Outils | 1 semaine |
| **8.6** | Combiner RAG et Agents : Systèmes Avancés | 0.5 semaine |

---

---

# 📘 CHAPITRE 8.1 — LES SYSTÈMES RAG
## Une Mémoire Externe pour un LLM

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### Rappel : Pourquoi un LLM a Besoin d'une Mémoire Externe

Rappelle-toi le Module 0 et le Module 5, chapitre 5.5 : un LLM est pré-entraîné à une date donnée, sur un corpus figé — il ne connaît **ni tes documents privés** (contrats, notes personnelles, base de connaissances d'entreprise), **ni les événements survenus après sa date de coupure**. Rappelle-toi également le Module 6, chapitre 6.2 : chaque requête API est traitée indépendamment, sans mémoire persistante entre deux appels.

**Le RAG (Retrieval-Augmented Generation) répond exactement à ce problème** : plutôt que de compter uniquement sur ce que le modèle a mémorisé pendant son entraînement, on lui fournit, **au moment de la question**, les passages de texte les plus pertinents extraits d'une base de documents externe — comme si on donnait un dossier de recherche à un expert avant de lui poser une question, plutôt que de compter uniquement sur sa mémoire.

```
🔑 Sans RAG : LLM ← question de l'utilisateur
   → répond UNIQUEMENT à partir de ce qu'il a appris pendant l'entraînement

🔑 Avec RAG : LLM ← question de l'utilisateur + passages pertinents
                     extraits automatiquement d'une base documentaire
   → répond en s'appuyant sur ces passages, potentiellement inconnus
     de lui pendant son entraînement (documents privés, récents...)
```

---

### Le Pipeline RAG Complet, Étape par Étape

**🔑 Intuition — deux phases distinctes**

Un système RAG fonctionne en deux grandes phases : une phase de **préparation** (effectuée une fois, en amont), et une phase de **requête** (effectuée à chaque question de l'utilisateur).

```
🔑 PHASE 1 — PRÉPARATION (une seule fois, ou à chaque mise à jour des documents) :

1. CHARGER les documents (PDF, pages web, notes texte...)
2. DÉCOUPER chaque document en petits morceaux (CHUNKS)
3. CONVERTIR chaque chunk en EMBEDDING (rappel Module 5, chapitre 5.2)
4. STOCKER ces embeddings dans une base de données vectorielle
   (approfondi au Chapitre 8.2)

🔑 PHASE 2 — REQUÊTE (à chaque question posée) :

5. CONVERTIR la question de l'utilisateur en embedding (même méthode qu'à l'étape 3)
6. RECHERCHER, dans la base vectorielle, les chunks dont l'embedding
   est le plus SIMILAIRE à celui de la question (rappel Module 5,
   chapitre 5.2 : similarité cosinus)
7. INJECTER ces chunks pertinents dans le prompt envoyé au LLM
   (rappel Module 6, chapitre 6.2 : structure des messages)
8. Le LLM GÉNÈRE sa réponse, en s'appuyant sur ces passages fournis
```

---

### Le Chunking : Pourquoi et Comment Découper les Documents

**🔑 Intuition — pourquoi ne pas simplement envoyer le document entier ?**

Deux raisons empêchent d'envoyer un document entier au LLM à chaque question :

```
🔑 LIMITE DE CONTEXTE (rappel Module 5, chapitre 5.1) : un LLM a
   une limite maximale de tokens qu'il peut traiter en une seule
   requête. Un document de 500 pages dépasserait largement cette limite.

🔑 PRÉCISION DE LA RECHERCHE : si on compare l'embedding de la
   question à l'embedding d'un document ENTIER (contenant des
   centaines de sujets différents), la similarité serait diluée et
   peu précise. En comparant à des PETITS morceaux ciblés, chacun
   sur un sujet plus homogène, la recherche devient bien plus précise.
```

**Les deux paramètres clés du chunking :**

```
🔑 chunk_size (taille du chunk) : le nombre de caractères (ou tokens)
   par morceau. Trop petit → perte de contexte au sein d'un chunk.
   Trop grand → retour aux problèmes évoqués ci-dessus.

🔑 chunk_overlap (chevauchement) : le nombre de caractères partagés
   entre deux chunks consécutifs, pour éviter qu'une information
   importante ne soit "coupée en deux" pile à la frontière entre
   deux chunks, la rendant difficile à retrouver dans son intégralité.
```

**🧮 Exemple illustré**

```
Texte original : "Le RAG permet à un LLM d'accéder à des documents
externes. Il combine recherche d'information et génération de texte."

Avec chunk_size=50, chunk_overlap=10 :

Chunk 1 : "Le RAG permet à un LLM d'accéder à des documents"
Chunk 2 : "des documents externes. Il combine recherche d'inform"
                └── les 10 derniers caractères du Chunk 1 réapparaissent
                    ici, garantissant qu'aucune coupure nette ne
                    perde d'information à la frontière
```

---

### Le Retrieval : Retrouver les Chunks les Plus Pertinents

**🔑 Intuition — rappel direct et complet du Module 5, chapitre 5.2**

C'est ici que tout ce que tu as appris sur les embeddings prend tout son sens pratique. La question de l'utilisateur est transformée en embedding (exactement comme les mots au Module 5), puis on calcule la **similarité cosinus** (Module 5, chapitre 5.2 ; Module 2, chapitre 2.1.3) entre cet embedding de question et l'embedding de **chaque chunk** stocké — les chunks avec la similarité la plus élevée sont considérés comme les plus pertinents pour répondre à la question.

**🧮 Exemple calculé — retrouvons le bon chunk parmi plusieurs**

```
Question : "Comment fonctionne un système RAG ?"
Embedding de la question (simplifié, 3 dimensions) : [0.8, 0.6, 0.1]

Chunk A : "Le RAG combine recherche et génération..."
Embedding A : [0.75, 0.65, 0.15]   → très proche de la question

Chunk B : "La recette de la tarte aux pommes nécessite..."
Embedding B : [0.05, 0.1, 0.9]     → très éloigné de la question

Chunk C : "Les modèles de diffusion génèrent des images..."
Embedding C : [0.3, 0.5, 0.4]      → moyennement éloigné
```

Le système calculerait la similarité cosinus entre l'embedding de la question et chacun des 3 chunks (exactement le calcul du Module 5, exercice 5.2.A), et retiendrait le **Chunk A** comme le plus pertinent, avec une similarité proche de 1, tandis que le Chunk B (sur un sujet totalement différent) obtiendrait une similarité très faible.

**Le paramètre `k`** contrôle combien de chunks sont retenus (par exemple, `k=4` récupère les 4 chunks les plus similaires) — un compromis entre fournir suffisamment de contexte au LLM et éviter de le noyer sous des informations excessives ou hors-sujet.

---

## 💻 MISE EN PRATIQUE

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# ─────────────────────────────────────────────
# 1. RETROUVER NOTRE CALCUL À LA MAIN — retrieval simplifié
# ─────────────────────────────────────────────

embedding_question = np.array([0.8, 0.6, 0.1])
chunks_embeddings = {
    "Chunk A (RAG)": np.array([0.75, 0.65, 0.15]),
    "Chunk B (tarte aux pommes)": np.array([0.05, 0.1, 0.9]),
    "Chunk C (diffusion)": np.array([0.3, 0.5, 0.4]),
}

print("Similarités avec la question :")
for nom_chunk, embedding_chunk in chunks_embeddings.items():
    similarite = cosine_similarity([embedding_question], [embedding_chunk])[0][0]
    print(f"  {nom_chunk:30s} : {similarite:.4f}")

# ─────────────────────────────────────────────
# 2. CHUNKING D'UN VRAI TEXTE AVEC LANGCHAIN
# ─────────────────────────────────────────────

from langchain.text_splitter import RecursiveCharacterTextSplitter

texte = """
Le RAG (Retrieval-Augmented Generation) permet à un LLM d'accéder à des 
documents externes au moment de la génération. Il combine une étape de 
recherche d'information (retrieval) et une étape de génération de texte.
Cette approche résout deux limites majeures des LLMs : leur date de 
coupure des connaissances, et leur incapacité native à accéder à des 
documents privés non inclus dans leur entraînement.
"""

splitter = RecursiveCharacterTextSplitter(
    chunk_size=100,      # rappel : compromis contexte/précision
    chunk_overlap=20      # rappel : éviter de couper une info importante
)
chunks = splitter.split_text(texte)

for i, chunk in enumerate(chunks):
    print(f"\nChunk {i+1} ({len(chunk)} caractères) :\n{chunk}")

# ─────────────────────────────────────────────
# 3. PIPELINE RAG MINIMAL, ENTIÈREMENT FROM SCRATCH
# ─────────────────────────────────────────────

from openai import OpenAI

client = OpenAI(api_key="sk-...")

def obtenir_embedding(texte):
    """Rappel Module 5 : transformer du texte en vecteur."""
    reponse = client.embeddings.create(model="text-embedding-3-small", input=texte)
    return np.array(reponse.data[0].embedding)

# Base de connaissances simplifiée (en pratique : une vraie base vectorielle, Chapitre 8.2)
base_documents = [
    "Le RAG combine recherche d'information et génération de texte.",
    "Les modèles de diffusion génèrent des images à partir de bruit.",
    "Python est un langage de programmation très utilisé en IA.",
]
embeddings_base = [obtenir_embedding(doc) for doc in base_documents]

def rag_simple(question, k=1):
    embedding_q = obtenir_embedding(question)
    
    # ÉTAPE : RETRIEVAL — trouver le(s) chunk(s) le(s) plus pertinent(s)
    similarites = [cosine_similarity([embedding_q], [emb])[0][0] for emb in embeddings_base]
    indices_top_k = np.argsort(similarites)[::-1][:k]
    contexte = "\n".join([base_documents[i] for i in indices_top_k])
    
    # ÉTAPE : GÉNÉRATION — le LLM répond en s'appuyant sur le contexte trouvé
    prompt = f"""Réponds à la question en te basant UNIQUEMENT sur ce contexte :

Contexte : {contexte}

Question : {question}"""
    
    reponse = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )
    return reponse.choices[0].message.content, contexte

reponse, contexte_utilise = rag_simple("Qu'est-ce que le RAG ?")
print(f"\nContexte utilisé : {contexte_utilise}")
print(f"Réponse du LLM : {reponse}")
```

---

## 🏋️ EXERCICES — CHAPITRE 8.1

### Exercice 8.1.A — Retrouver le bon chunk à la main

Une question a pour embedding `[0.2, 0.9]`. Trois chunks ont pour embeddings : `Chunk 1 = [0.9, 0.1]`, `Chunk 2 = [0.15, 0.95]`, `Chunk 3 = [0.5, 0.5]`. Calcule la similarité cosinus entre la question et chaque chunk (rappel Module 2, chapitre 2.1.3), et détermine lequel serait récupéré avec `k=1`.

<details>
<summary>👉 Solution</summary>

```
Norme(question) = √(0.2²+0.9²) = √(0.04+0.81) = √0.85 ≈ 0.922

Chunk 1 : produit = (0.2×0.9)+(0.9×0.1) = 0.18+0.09 = 0.27
          Norme(C1) = √(0.81+0.01) = √0.82 ≈ 0.906
          Similarité = 0.27/(0.922×0.906) ≈ 0.324

Chunk 2 : produit = (0.2×0.15)+(0.9×0.95) = 0.03+0.855 = 0.885
          Norme(C2) = √(0.0225+0.9025) = √0.925 ≈ 0.962
          Similarité = 0.885/(0.922×0.962) ≈ 0.998

Chunk 3 : produit = (0.2×0.5)+(0.9×0.5) = 0.1+0.45 = 0.55
          Norme(C3) = √(0.25+0.25) = √0.5 ≈ 0.707
          Similarité = 0.55/(0.922×0.707) ≈ 0.844
```

Avec `k=1`, le système récupérerait le **Chunk 2** (similarité ≈0.998, la plus élevée), largement devant le Chunk 3 (≈0.844) et le Chunk 1 (≈0.324).
</details>

### Exercice 8.1.B — Diagnostiquer un mauvais chunking

Un système RAG utilise `chunk_size=2000` et `chunk_overlap=0` sur des documents juridiques denses. Les utilisateurs se plaignent que le système "perd le fil" et rate parfois des clauses importantes situées à cheval sur deux chunks. Propose un ajustement des paramètres pour améliorer la situation.

<details>
<summary>👉 Solution</summary>

Le problème vient de `chunk_overlap=0` : sans aucun chevauchement, une clause importante située exactement à la frontière entre deux chunks se retrouve **coupée en deux**, et aucun des deux chunks pris isolément ne contient l'information complète — rendant cette clause difficile, voire impossible, à retrouver correctement par le retrieval.

**Ajustement recommandé :** introduire un `chunk_overlap` significatif (par exemple, 200 à 400 caractères sur un `chunk_size` de 2000), garantissant qu'une clause proche d'une frontière de chunk apparaisse **entièrement** dans au moins un des deux chunks concernés, résolvant ce problème de perte d'information aux frontières.
</details>

### Exercice 8.1.C — Pourquoi ne pas envoyer le document entier ?

Explique les deux raisons principales, présentées dans ce chapitre, pour lesquelles on découpe les documents en chunks plutôt que d'envoyer le document entier au LLM à chaque question.

<details>
<summary>👉 Solution</summary>

```
1. LIMITE DE CONTEXTE — un LLM a un nombre maximal de tokens qu'il
   peut traiter en une seule requête (rappel Module 5, chapitre 5.1) ;
   un document long pourrait tout simplement dépasser cette limite.

2. PRÉCISION DE LA RECHERCHE — comparer l'embedding d'une question à
   l'embedding d'un document entier (couvrant potentiellement de
   nombreux sujets différents) dilue la similarité et rend la
   recherche moins précise, comparé à des chunks plus petits et
   ciblés sur un sujet plus homogène.
```
</details>

### Exercice 8.1.D — Tracer le pipeline RAG complet

Remets dans le bon ordre les étapes suivantes du pipeline RAG (rappel de ce chapitre) :

```
A. Le LLM génère sa réponse en s'appuyant sur les chunks fournis
B. La question de l'utilisateur est convertie en embedding
C. Les documents sont découpés en chunks
D. Les chunks les plus similaires à la question sont recherchés
E. Chaque chunk est converti en embedding et stocké
```

<details>
<summary>👉 Solution</summary>

```
Ordre correct (en distinguant Phase 1 - Préparation, et Phase 2 - Requête) :

PHASE 1 (préparation, une fois) :
C. Les documents sont découpés en chunks
E. Chaque chunk est converti en embedding et stocké

PHASE 2 (à chaque question) :
B. La question de l'utilisateur est convertie en embedding
D. Les chunks les plus similaires à la question sont recherchés
A. Le LLM génère sa réponse en s'appuyant sur les chunks fournis
```
</details>

---

---

# 📘 CHAPITRE 8.2 — LES BASES DE DONNÉES VECTORIELLES

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Pourquoi une Base de Données Spécialisée pour les Vecteurs ?

**🔑 Intuition**

Rappelle-toi le Chapitre 8.1 : le retrieval nécessite de calculer la similarité entre l'embedding d'une question et **chaque** embedding stocké. Avec seulement 3 documents (comme dans l'exemple du Chapitre 8.1), comparer un par un ne pose aucun problème. Mais imagine une base de connaissances contenant **10 millions de chunks** — comparer la question à chacun des 10 millions d'embeddings, un par un (une recherche dite "exhaustive" ou "brute force"), deviendrait extrêmement lent, rendant le système inutilisable en pratique pour des applications à grande échelle.

**Les bases de données vectorielles résolvent précisément ce problème de passage à l'échelle**, grâce à des structures d'index spécialisées qui permettent de retrouver rapidement les vecteurs les plus similaires, sans devoir comparer exhaustivement à chaque vecteur stocké.

---

### La Recherche Approximative des Plus Proches Voisins (ANN)

**🔑 Intuition — un lien direct avec KNN du Module 3 !**

Rappelle-toi le Module 3, chapitre 3.3 : l'algorithme KNN trouve les K voisins les plus proches d'un point, en calculant la distance à **chaque** point du dataset — exactement le même principe "exhaustif" que la recherche brute évoquée ci-dessus, avec la même limite de passage à l'échelle.

Les bases vectorielles utilisent des algorithmes de **recherche approximative des plus proches voisins** (ANN — Approximate Nearest Neighbors), qui **sacrifient une petite quantité de précision pour un gain de vitesse considérable**. Plutôt que de garantir de trouver EXACTEMENT les k voisins les plus proches (ce qui nécessiterait une comparaison exhaustive), ces algorithmes organisent intelligemment les vecteurs en structures (comme des graphes ou des arbres) qui permettent de converger très rapidement vers des voisins **très probablement** parmi les plus proches, sans garantie absolue de perfection — un compromis largement acceptable en pratique, puisque récupérer 3 des 4 meilleurs chunks (au lieu des 4 exacts) affecte rarement significativement la qualité de la réponse finale du LLM.

```
🔑 Recherche EXHAUSTIVE (brute force, comme KNN classique, Module 3) :
   → Garantit les résultats EXACTS, mais devient très lente à grande échelle

🔑 Recherche ANN (utilisée par les bases vectorielles) :
   → Résultats APPROXIMATIFS mais très proches de l'optimal,
     avec une vitesse considérablement supérieure sur de grands volumes
```

---

### Comparer les Bases Vectorielles (rappel enrichi du fichier de base)

**🔑 Intuition**

Chaque base vectorielle fait des compromis différents entre simplicité, performance, et scalabilité — le choix dépend directement du contexte d'usage, exactement comme le choix d'un modèle IA au Module 6, chapitre 6.1.

```
🔑 ChromaDB    : simple, locale, idéale pour le PROTOTYPAGE et le
   développement — installation en une ligne, pas d'infrastructure
   à gérer

🔑 FAISS (Meta) : bibliothèque ultra-rapide, optimisée pour des
   volumes TRÈS importants, mais nécessite davantage de gestion
   manuelle (pas une base de données complète en elle-même)

🔑 Pinecone     : solution CLOUD entièrement managée, pensée pour
   la PRODUCTION à grande échelle, sans infrastructure à gérer soi-même

🔑 Weaviate     : combine recherche vectorielle ET filtres classiques
   (par exemple, "chunks similaires ET publiés après telle date") —
   utile pour des besoins de recherche hybride complexes

🔑 Qdrant       : performante, open-source, adaptée à un déploiement
   en PRODUCTION tout en gardant le contrôle total de l'infrastructure
   (self-hosted)

🔑 pgvector     : une EXTENSION de PostgreSQL — pertinent si
   l'infrastructure utilise déjà PostgreSQL, évitant d'introduire
   un nouveau système de base de données séparé
```

**💡 Comment choisir en pratique ?** Pour du prototypage rapide et de l'apprentissage (comme dans ce module) : ChromaDB. Pour une application en production à grande échelle sans vouloir gérer d'infrastructure : Pinecone. Pour une production avec contrôle total de l'infrastructure : Qdrant ou Weaviate. Si l'entreprise utilise déjà PostgreSQL : pgvector, pour limiter la complexité de l'infrastructure globale.

---

## 💻 MISE EN PRATIQUE

```python
import chromadb
from chromadb.utils import embedding_functions

# ─────────────────────────────────────────────
# 1. CRÉER UNE BASE VECTORIELLE AVEC CHROMADB
# ─────────────────────────────────────────────

client_chroma = chromadb.PersistentClient(path="./ma_base_vectorielle")

fonction_embedding = embedding_functions.OpenAIEmbeddingFunction(
    api_key="sk-...", model_name="text-embedding-3-small"
)

collection = client_chroma.get_or_create_collection(
    name="documentation_produit",
    embedding_function=fonction_embedding
)

# ─────────────────────────────────────────────
# 2. AJOUTER DES CHUNKS À LA BASE (Phase 1 du Chapitre 8.1)
# ─────────────────────────────────────────────

chunks = [
    "Le produit XYZ se réinitialise en maintenant le bouton 5 secondes.",
    "La garantie du produit XYZ couvre 2 ans à partir de l'achat.",
    "Pour contacter le support, écrivez à support@exemple.com.",
]

collection.add(
    documents=chunks,
    ids=["chunk_1", "chunk_2", "chunk_3"],
    metadatas=[{"source": "manuel.pdf", "page": 1},
               {"source": "manuel.pdf", "page": 3},
               {"source": "faq.pdf", "page": 1}]
)

# ─────────────────────────────────────────────
# 3. RECHERCHER LES CHUNKS LES PLUS PERTINENTS (Phase 2 du Chapitre 8.1)
# ─────────────────────────────────────────────

resultats = collection.query(
    query_texts=["Comment réinitialiser mon appareil ?"],
    n_results=2   # rappel : le paramètre k du Chapitre 8.1
)

for doc, distance, metadata in zip(resultats["documents"][0],
                                    resultats["distances"][0],
                                    resultats["metadatas"][0]):
    print(f"Chunk trouvé : {doc}")
    print(f"  Distance : {distance:.4f} | Source : {metadata}")

# ─────────────────────────────────────────────
# 4. COMPARER VITESSE : RECHERCHE EXHAUSTIVE vs ANN (illustration conceptuelle)
# ─────────────────────────────────────────────

import numpy as np
import time

n_vecteurs = 100_000
dimension = 384
base_simulee = np.random.rand(n_vecteurs, dimension)
requete = np.random.rand(dimension)

# Recherche EXHAUSTIVE (brute force, comme KNN classique)
debut = time.time()
distances = np.linalg.norm(base_simulee - requete, axis=1)
top_5_exhaustif = np.argsort(distances)[:5]
duree_exhaustive = time.time() - debut

print(f"\nRecherche exhaustive sur {n_vecteurs:,} vecteurs : {duree_exhaustive*1000:.1f} ms")
print("(Une vraie base vectorielle avec index ANN serait significativement plus rapide")
print(" à cette échelle, et l'écart se creuse encore davantage à des millions de vecteurs)")
```

---

## 🏋️ EXERCICES — CHAPITRE 8.2

### Exercice 8.2.A — Pourquoi l'approximation est acceptable

Explique pourquoi accepter des résultats "approximatifs" (ANN) plutôt qu'exacts est généralement un compromis raisonnable pour un système RAG, en pensant à l'usage final de ces chunks récupérés.

<details>
<summary>👉 Solution</summary>

Les chunks récupérés servent uniquement à fournir du **contexte utile** au LLM pour générer sa réponse finale (rappel Chapitre 8.1) — si la recherche ANN récupère, par exemple, le 4ème chunk le plus pertinent à la place du 5ème "exact", cette différence marginale affecte rarement la qualité de la réponse finale du LLM, puisque les deux chunks sont probablement très proches en pertinence. En revanche, le gain de vitesse offert par l'approximation est souvent déterminant pour la viabilité pratique du système à grande échelle (rappel : une recherche exhaustive sur des millions de vecteurs serait trop lente pour une utilisation interactive en temps réel). Le compromis précision/vitesse penche donc largement en faveur de l'approximation dans ce contexte d'usage.
</details>

### Exercice 8.2.B — Choisir une base vectorielle

Pour chacun des scénarios suivants, recommande une base vectorielle parmi celles présentées dans ce chapitre, en justifiant :

1. Un développeur teste rapidement un prototype de chatbot RAG sur son ordinateur personnel
2. Une entreprise déploie un système RAG en production à grande échelle, sans vouloir gérer d'infrastructure serveur
3. Une entreprise utilise déjà PostgreSQL comme base de données principale et veut limiter la complexité de son infrastructure

<details>
<summary>👉 Solution</summary>

```
1. CHROMADB — simple, locale, aucune infrastructure à configurer,
   idéale pour un prototypage rapide sur machine personnelle

2. PINECONE — solution cloud entièrement managée, conçue
   spécifiquement pour la production à grande échelle sans gestion
   d'infrastructure de la part de l'entreprise

3. PGVECTOR — extension directement intégrée à PostgreSQL, évitant
   d'introduire un système de base de données supplémentaire et
   distinct dans l'infrastructure déjà existante
```
</details>

### Exercice 8.2.C — Le lien avec KNN

Explique en une ou deux phrases le lien conceptuel entre la recherche dans une base vectorielle et l'algorithme KNN du Module 3, chapitre 3.3.

<details>
<summary>👉 Solution</summary>

Les deux reposent sur le même principe fondamental : trouver les points (ou vecteurs) les plus proches d'un point de référence donné, selon une mesure de distance ou de similarité (rappel Module 2, chapitre 2.1.3). KNN classifie un nouvel exemple en regardant ses K voisins les plus proches parmi des données d'entraînement ; le retrieval d'un système RAG retrouve les K chunks les plus proches (les plus similaires) d'une question posée. La différence principale est que les bases vectorielles utilisent des algorithmes de recherche APPROXIMATIVE (ANN) pour rester rapides à très grande échelle, alors que KNN, tel que vu au Module 3, effectue typiquement une recherche exhaustive, adaptée à des volumes de données plus modestes.
</details>

### Exercice 8.2.D — Recherche exhaustive vs ANN à grande échelle

Explique pourquoi l'écart de vitesse entre une recherche exhaustive et une recherche ANN se creuse de plus en plus à mesure que le nombre de vecteurs stockés augmente (par exemple, de 100 000 à 100 millions de vecteurs).

<details>
<summary>👉 Solution</symmary>

Une recherche exhaustive doit comparer le vecteur de requête à **chacun** des vecteurs stockés, un par un — son temps de calcul augmente donc de façon linéairement proportionnelle au nombre total de vecteurs (10× plus de vecteurs = environ 10× plus de temps de calcul). Une recherche ANN, grâce à ses structures d'index intelligentes (graphes, arbres), peut converger vers de bons résultats en n'examinant qu'une **petite fraction** des vecteurs totaux, sans avoir besoin de tous les comparer explicitement — son temps de calcul augmente donc beaucoup plus lentement à mesure que le volume de données grandit. C'est précisément cette différence de comportement à l'échelle (croissance linéaire vs croissance beaucoup plus modérée) qui explique pourquoi l'écart de performance entre les deux approches devient de plus en plus significatif à mesure que la base de vecteurs grandit.
</details>

---

---

# 📘 CHAPITRE 8.3 — CONSTRUIRE UN RAG COMPLET AVEC LANGCHAIN

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### LangChain : Pourquoi un Framework Plutôt que du Code from Scratch ?

**🔑 Intuition**

Au Chapitre 8.1, tu as construit un pipeline RAG entièrement "from scratch" — c'était précieux pour comprendre chaque mécanisme en profondeur. Mais en pratique professionnelle, reconstruire manuellement chaque brique (chargement de documents, découpage, gestion de la base vectorielle, orchestration des appels LLM) pour chaque nouveau projet serait répétitif et source d'erreurs. **LangChain** est un framework qui fournit des **briques réutilisables et standardisées** pour chacune de ces étapes, exactement comme Scikit-learn (Module 3) fournit une interface unifiée pour de nombreux algorithmes de Machine Learning différents.

---

### Les Chains : Enchaîner des Étapes de Façon Déclarative

**🔑 Intuition**

Une "Chain" LangChain représente une **séquence d'opérations** connectées entre elles, où la sortie d'une étape devient l'entrée de la suivante — rappelle-toi le Module 6, chapitre 6.6, où tu avais déjà manuellement enchaîné plusieurs appels LLM dans un workflow (résumer puis classifier). LangChain formalise et simplifie l'écriture de ces chaînes avec une syntaxe déclarative concise.

```
🔑 Composants typiques d'une Chain RAG :

Prompt Template  → structure le prompt avec des variables (rappel
                    Module 6, chapitre 6.5 : Structured Prompting)
LLM               → le modèle qui génère la réponse (rappel Module 6, 6.2)
Retriever         → récupère les chunks pertinents (Chapitre 8.1, 8.2)
Output Parser      → structure la sortie du LLM (rappel Module 6, chapitre 6.5)
```

---

### Le RetrievalQA : la Chain RAG Prête à l'Emploi

**🔑 Intuition**

`RetrievalQA` est une Chain LangChain qui encapsule **automatiquement** tout le pipeline RAG que tu as construit manuellement au Chapitre 8.1 : recevoir une question, interroger le retriever (connecté à une base vectorielle, Chapitre 8.2), injecter les chunks trouvés dans un prompt, et appeler le LLM pour générer la réponse finale — le tout en quelques lignes de code, plutôt que d'orchestrer manuellement chaque étape.

---

### Évaluer un Système RAG : rappel direct du Module 3

**🔑 Intuition**

Comment savoir si un système RAG fonctionne réellement bien, plutôt que de se fier à une impression subjective sur quelques exemples ? Rappelle-toi le Module 3, chapitre 3.1 et 3.6 : une évaluation rigoureuse nécessite des **métriques objectives**, mesurées sur un ensemble de test représentatif.

```
🔑 Dimensions à évaluer dans un système RAG :

RETRIEVAL (la recherche) :
   → Les chunks récupérés sont-ils réellement PERTINENTS pour la
     question posée ? (rappel Module 3, chapitre 3.6 : precision/recall,
     appliqués ici à la pertinence des chunks plutôt qu'à une classification)

GÉNÉRATION (la réponse finale) :
   → La réponse du LLM est-elle FIDÈLE aux chunks fournis (pas
     d'hallucination, rappel Module 0), et RÉPOND-elle réellement
     à la question posée ?
```

**💡 Un piège classique à éviter :** un système RAG peut sembler fonctionner sur quelques exemples testés manuellement, tout en échouant silencieusement sur des cas moins évidents — exactement le même risque que juger un modèle ML uniquement "à l'œil" plutôt qu'avec une validation rigoureuse (rappel Module 3, chapitre 3.1). Une évaluation systématique, sur un ensemble de questions représentatives avec des réponses attendues connues, reste indispensable avant tout déploiement sérieux.

---

## 💻 MISE EN PRATIQUE

```python
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.prompts import ChatPromptTemplate

# ─────────────────────────────────────────────
# 1. PIPELINE RAG COMPLET AVEC LANGCHAIN (rappel du fichier de base, détaillé)
# ─────────────────────────────────────────────

# ÉTAPE 1 (Chapitre 8.1) : Charger les documents
loader = PyPDFLoader("documentation_produit.pdf")
documents = loader.load()

# ÉTAPE 2 (Chapitre 8.1) : Découper en chunks
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = splitter.split_documents(documents)
print(f"Document découpé en {len(chunks)} chunks")

# ÉTAPE 3 (Chapitre 8.1, 8.2) : Créer les embeddings et les stocker
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings, persist_directory="./chroma_db")

# ÉTAPE 4 : Créer le retriever (rappel : le paramètre k du Chapitre 8.1)
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# ÉTAPE 5 : Créer la Chain RAG complète
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4o", temperature=0),
    retriever=retriever,
    return_source_documents=True   # pour la traçabilité des sources
)

# ÉTAPE 6 : Poser une question
resultat = qa_chain.invoke({"query": "Quelle est la procédure de réinitialisation ?"})
print(f"\nRéponse : {resultat['result']}")
print(f"\nSources utilisées :")
for doc in resultat["source_documents"]:
    print(f"  - Page {doc.metadata.get('page', '?')}: {doc.page_content[:80]}...")

# ─────────────────────────────────────────────
# 2. UTILISER LES CHAINS AVEC LA SYNTAXE MODERNE LCEL (rappel du fichier de base)
# ─────────────────────────────────────────────

llm = ChatOpenAI(model="gpt-4o", temperature=0)
prompt = ChatPromptTemplate.from_messages([
    ("system", "Tu es un expert en {domaine}. Réponds de manière concise."),
    ("user", "{question}")
])

chain = prompt | llm   # syntaxe déclarative : "prompt PUIS llm"

reponse = chain.invoke({"domaine": "finance", "question": "Explique le P/E ratio"})
print(f"\n{reponse.content}")

# ─────────────────────────────────────────────
# 3. ÉVALUER LE SYSTÈME RAG (rappel Module 3, chapitre 3.6)
# ─────────────────────────────────────────────

questions_test = [
    {"question": "Comment réinitialiser l'appareil ?",
     "reponse_attendue": "maintenir le bouton 5 secondes"},
    {"question": "Quelle est la durée de garantie ?",
     "reponse_attendue": "2 ans"},
]

def evaluer_rag(questions_test, qa_chain):
    resultats_evaluation = []
    for item in questions_test:
        resultat = qa_chain.invoke({"query": item["question"]})
        reponse_generee = resultat["result"]
        
        # Vérification simplifiée : la réponse attendue apparaît-elle dans la réponse générée ?
        contient_bonne_info = item["reponse_attendue"].lower() in reponse_generee.lower()
        resultats_evaluation.append({
            "question": item["question"],
            "correct": contient_bonne_info,
            "reponse_generee": reponse_generee
        })
    
    taux_reussite = sum(r["correct"] for r in resultats_evaluation) / len(resultats_evaluation)
    print(f"\nTaux de réussite du RAG : {taux_reussite:.1%}")
    return resultats_evaluation

# evaluer_rag(questions_test, qa_chain)  # décommenter pour lancer l'évaluation
```

---

## 🏋️ EXERCICES — CHAPITRE 8.3

### Exercice 8.3.A — Identifier les composants d'une Chain

Dans le code `chain = prompt | llm` de ce chapitre, identifie ce que représente chaque composant, et explique ce que fait l'opérateur `|` de façon intuitive.

<details>
<summary>👉 Solution</summary>

```
prompt : le PromptTemplate, qui structure le message envoyé au LLM
         avec des variables (rappel Module 6, chapitre 6.5)
llm    : le modèle de langage qui génère effectivement la réponse
         (rappel Module 6, chapitre 6.2)

L'opérateur | (LCEL - LangChain Expression Language) enchaîne les
composants de façon déclarative : la SORTIE du composant à gauche
devient l'ENTRÉE du composant à droite. Ici, le prompt formaté
(avec les variables remplies) devient l'entrée envoyée au LLM —
exactement le même principe d'enchaînement que le workflow manuel
du Module 6, chapitre 6.6, mais avec une syntaxe plus concise et
standardisée.
```
</details>

### Exercice 8.3.B — Diagnostiquer un système RAG défaillant

Un système RAG répond systématiquement de façon vague ou incorrecte à des questions dont la réponse est pourtant clairement présente dans les documents sources. En te basant sur la distinction Retrieval/Génération de ce chapitre, propose deux hypothèses différentes pour expliquer ce problème, et comment les distinguer.

<details>
<summary>👉 Solution</summary>

```
Hypothèse 1 — PROBLÈME DE RETRIEVAL : le retriever ne récupère
   probablement PAS les bons chunks contenant l'information pertinente
   (peut-être un chunk_size mal réglé, rappel Chapitre 8.1, ou un k
   trop faible qui exclut le bon chunk).
   → Pour vérifier : examiner directement les chunks récupérés
     (comme dans le code de ce chapitre, via source_documents) pour
     voir s'ils contiennent réellement l'information recherchée.

Hypothèse 2 — PROBLÈME DE GÉNÉRATION : le retriever fonctionne
   correctement et récupère bien les bons chunks, mais le LLM
   n'exploite pas correctement cette information fournie dans le
   contexte (peut-être un prompt mal formulé, rappel Module 6,
   chapitre 6.5).
   → Pour vérifier : si les bons chunks sont bien présents dans
     source_documents, mais que la réponse reste incorrecte, le
     problème vient probablement de la GÉNÉRATION plutôt que du RETRIEVAL.

Cette distinction, directement issue de la section "Évaluer un
Système RAG" de ce chapitre, permet de cibler précisément où
investiguer et corriger le problème, plutôt que de chercher au hasard.
```
</details>

### Exercice 8.3.C — Pourquoi return_source_documents est important

Explique pourquoi l'option `return_source_documents=True`, utilisée dans le code de ce chapitre, est particulièrement importante pour la confiance des utilisateurs dans un système RAG déployé en production.

<details>
<summary>👉 Solution</summary>

Cette option permet d'afficher, en plus de la réponse générée, les **passages sources exacts** qui ont été utilisés par le LLM pour construire sa réponse — offrant une forme de **traçabilité et de vérifiabilité**. Rappelle-toi le Module 0 : les LLMs peuvent halluciner, produisant des affirmations plausibles mais fausses. En affichant les sources précises utilisées, un utilisateur peut lui-même vérifier que la réponse est bien fondée sur les documents réels, plutôt que de devoir faire une confiance aveugle au système — une pratique essentielle pour des applications à enjeux réels (juridique, médical, financier), où la vérifiabilité des affirmations est cruciale.
</details>

### Exercice 8.3.D — Concevoir un ensemble de test pour évaluer un RAG

En t'inspirant de la fonction `evaluer_rag` de ce chapitre, décris (sans code) comment tu concevrais un ensemble de test rigoureux pour évaluer un système RAG destiné à répondre aux questions des employés sur le règlement intérieur d'une entreprise.

<details>
<summary>👉 Solution</summary>

*(Exemple de réponse)*

```
1. Sélectionner un ÉCHANTILLON REPRÉSENTATIF de questions réalistes
   que les employés pourraient poser (congés, télétravail, horaires,
   procédures disciplinaires...), couvrant différentes sections du
   règlement intérieur

2. Pour CHAQUE question, définir MANUELLEMENT la réponse correcte
   attendue, en se référant au document source original — ces
   réponses de référence serviront de "vérité terrain" (rappel
   Module 3 : labels connus pour l'évaluation)

3. Inclure aussi des questions PIÈGES, dont la réponse n'est PAS
   présente dans le règlement intérieur, pour vérifier que le
   système reconnaît honnêtement son incapacité à répondre plutôt
   que d'halluciner une réponse plausible mais inventée

4. Exécuter le système RAG sur l'ensemble de ces questions, comparer
   automatiquement (ou manuellement pour des cas subtils) les
   réponses générées aux réponses de référence, et calculer un taux
   de réussite global, exactement comme le taux_reussite calculé
   dans le code de ce chapitre
```
</details>

---

---

# 📘 CHAPITRE 8.4 — LES AGENTS IA : LE PATTERN REACT

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### Rappel : du Function Calling à l'Agent Autonome

Rappelle-toi le Module 6, chapitre 6.2 : le Function Calling permet à un LLM de "demander" l'exécution d'un outil externe, en un seul cycle (demande → exécution → réponse). Un **Agent IA** généralise cette idée : plutôt qu'un unique appel d'outil isolé, l'agent peut **enchaîner plusieurs appels d'outils successifs**, en **raisonnant** à chaque étape sur ce qu'il doit faire ensuite, jusqu'à disposer de suffisamment d'informations pour répondre complètement à la demande initiale.

---

### Les Quatre Composants d'un Agent (rappel enrichi du fichier de base)

```
🔑 Un LLM (le "cerveau") : raisonne sur la tâche, décide des actions
   à entreprendre (rappel Module 5, chapitre 5.3 : le modèle génère
   du texte via son mécanisme d'attention et sa génération autorégressive)

🔑 Des Outils (les "capacités") : des fonctions externes que l'agent
   peut appeler (recherche web, calculatrice, base de données, API...)
   — exactement le Function Calling du Module 6, chapitre 6.2

🔑 Une Mémoire (le "contexte") : l'historique des étapes précédentes
   de raisonnement et d'action au sein de la tâche en cours — rappel
   Module 6, chapitre 6.2 : la mémoire n'existe QUE parce qu'on
   renvoie systématiquement l'historique complet au LLM

🔑 Un Objectif (la "tâche") : la demande initiale de l'utilisateur,
   que l'agent doit accomplir, potentiellement à travers plusieurs
   étapes intermédiaires
```

---

### Le Pattern ReAct : Reasoning + Acting

**🔑 Intuition — combiner le Chain-of-Thought et le Function Calling**

**ReAct** (Reasoning + Acting) est le pattern le plus utilisé pour construire des agents IA. Son intuition centrale : combiner directement deux techniques que tu maîtrises déjà — le **Chain-of-Thought** (Module 6, chapitre 6.5 : "réfléchir étape par étape") et le **Function Calling** (Module 6, chapitre 6.2 : "utiliser des outils") — en une boucle répétée.

```
🔑 Le cycle ReAct, répété autant de fois que nécessaire :

THOUGHT (Pensée)     : le LLM raisonne à voix haute sur ce qu'il
                         sait déjà, et ce dont il a encore besoin
ACTION (Action)       : le LLM décide d'utiliser un outil spécifique,
                         avec des arguments précis
OBSERVATION           : le résultat réel de cet outil est renvoyé au LLM
   ↓ (retour à THOUGHT, avec cette nouvelle information disponible)
...jusqu'à ce que le LLM ait assez d'informations pour conclure
FINAL ANSWER (Réponse finale) : la réponse complète à la demande initiale
```

**🧮 Exemple tracé, étape par étape (reprise du fichier de base, détaillée)**

Reprenons l'exemple du fichier de base : "Quelle est la population de Paris en 2024 ? Calcule 5% de ce nombre."

```
THOUGHT 1 : "Je dois d'abord trouver la population de Paris en 2024.
             Je ne connais pas ce chiffre avec certitude à jour,
             je vais utiliser l'outil de recherche."
ACTION 1   : search(query="population Paris 2024")
OBSERVATION 1 : "Paris compte environ 2 145 000 habitants en 2024."

THOUGHT 2 : "J'ai maintenant la population : 2 145 000. Je dois
             calculer 5% de ce nombre. Je vais utiliser l'outil
             calculer plutôt que de risquer une erreur de calcul
             mental (rappel Module 0 : les LLMs peuvent faire des
             erreurs arithmétiques sur de grands nombres)."
ACTION 2   : calculer(expression="2145000 * 0.05")
OBSERVATION 2 : "107250"

THOUGHT 3 : "J'ai maintenant toutes les informations nécessaires
             pour répondre complètement à la question."
FINAL ANSWER : "La population de Paris en 2024 est d'environ
                2 145 000 habitants. 5% de ce nombre représente
                107 250 personnes."
```

**💡 Pourquoi cette approche fonctionne-t-elle si bien ?** Rappelle-toi le Module 6, chapitre 6.5 : le Chain-of-Thought améliore les performances car chaque étape de raisonnement enrichit le contexte disponible pour la suite (génération autorégressive, Module 5, chapitre 5.4). ReAct pousse cette idée plus loin : au lieu de se contenter de "réfléchir", le modèle peut **agir concrètement sur le monde réel** (rechercher, calculer, consulter une base de données) entre chaque étape de réflexion, enrichissant son contexte avec des informations **réelles et vérifiées**, plutôt que de devoir tout déduire uniquement de ses connaissances internes (potentiellement obsolètes ou fausses, rappel Module 0 : les hallucinations).

---

### Pourquoi Préférer un Outil "Calculer" plutôt que le Calcul Mental du LLM ?

**🔑 Intuition — rappel du Module 5, chapitre 5.4**

Rappelle-toi la génération autorégressive : un LLM génère du texte token par token, en prédisant le token le plus **statistiquement probable**, pas en exécutant un véritable algorithme de calcul arithmétique rigoureux. Sur de petits calculs simples, cette approche fonctionne généralement bien (les patterns arithmétiques simples étant très présents dans les données d'entraînement), mais sur des calculs plus complexes ou avec de grands nombres, les LLMs peuvent produire des erreurs — exactement le type de situation où déléguer le calcul à un **véritable outil externe** (une fonction Python exécutant un calcul exact, comme dans l'exemple ci-dessus) devient nettement plus fiable que de laisser le LLM "deviner" statistiquement le résultat.

---

## 💻 MISE EN PRATIQUE

```python
from langchain_openai import ChatOpenAI
from langchain.agents import create_react_agent, AgentExecutor
from langchain.tools import tool
from langchain import hub

# ─────────────────────────────────────────────
# 1. DÉFINIR DES OUTILS PERSONNALISÉS (rappel Module 6, Function Calling)
# ─────────────────────────────────────────────

@tool
def calculer(expression: str) -> str:
    """Évalue une expression mathématique. Utilise cet outil pour tout calcul,
    plutôt que de calculer mentalement, pour garantir l'exactitude."""
    try:
        return str(eval(expression))
    except Exception as e:
        return f"Erreur de calcul : {e}"

@tool
def rechercher_population(ville: str) -> str:
    """Simule une recherche de la population d'une ville."""
    donnees_simulees = {"Paris": "2 145 000 habitants", "Lyon": "520 000 habitants"}
    return donnees_simulees.get(ville, f"Données non trouvées pour {ville}")

outils = [calculer, rechercher_population]

# ─────────────────────────────────────────────
# 2. CRÉER L'AGENT REACT
# ─────────────────────────────────────────────

llm = ChatOpenAI(model="gpt-4o", temperature=0)
prompt_react = hub.pull("hwchase17/react")   # template ReAct standard de LangChain

agent = create_react_agent(llm, outils, prompt_react)
executor = AgentExecutor(agent=agent, tools=outils, verbose=True, max_iterations=5)

# ─────────────────────────────────────────────
# 3. EXÉCUTER L'AGENT — observer le cycle ReAct dans les logs
# ─────────────────────────────────────────────

resultat = executor.invoke({
    "input": "Quelle est la population de Paris ? Calcule 5% de ce nombre."
})
print(f"\nRéponse finale : {resultat['output']}")

# Avec verbose=True, la console affiche exactement le cycle Thought/Action/
# Observation décrit dans ce chapitre, étape par étape

# ─────────────────────────────────────────────
# 4. IMPLÉMENTER UNE BOUCLE REACT SIMPLIFIÉE, FROM SCRATCH
# ─────────────────────────────────────────────

def agent_react_simplifie(question, outils_disponibles, max_etapes=5):
    """Version pédagogique simplifiée du cycle ReAct, sans LangChain."""
    from openai import OpenAI
    client = OpenAI(api_key="sk-...")
    
    historique = [{"role": "user", "content": question}]
    
    for etape in range(max_etapes):
        reponse = client.chat.completions.create(
            model="gpt-4o", messages=historique, tools=outils_disponibles, temperature=0
        )
        message = reponse.choices[0].message
        
        if message.tool_calls:
            # ACTION : le modèle demande à utiliser un outil
            historique.append(message)
            for appel in message.tool_calls:
                nom_fonction = appel.function.name
                print(f"THOUGHT/ACTION (étape {etape+1}) : appel de {nom_fonction}")
                # OBSERVATION : exécuter réellement l'outil (simplifié ici)
                resultat_outil = "résultat simulé de l'outil"
                historique.append({
                    "role": "tool", "tool_call_id": appel.id, "content": resultat_outil
                })
        else:
            # FINAL ANSWER : le modèle a assez d'informations
            print(f"FINAL ANSWER (étape {etape+1}) : {message.content}")
            return message.content
    
    return "Nombre maximal d'étapes atteint sans réponse finale."
```

---

## 🏋️ EXERCICES — CHAPITRE 8.4

### Exercice 8.4.A — Tracer un cycle ReAct

Pour la question "Quel est le double de la population de Lyon ?", trace le cycle ReAct complet attendu (Thought/Action/Observation, répété jusqu'à Final Answer), en t'inspirant de l'exemple détaillé de ce chapitre et des outils du code de la Mise en Pratique.

<details>
<summary>👉 Solution</summary>

```
THOUGHT 1 : "Je dois d'abord trouver la population de Lyon. Je vais
             utiliser l'outil de recherche de population."
ACTION 1   : rechercher_population(ville="Lyon")
OBSERVATION 1 : "520 000 habitants"

THOUGHT 2 : "J'ai la population : 520 000. Je dois maintenant
             calculer le double de ce nombre. Je vais utiliser
             l'outil calculer pour garantir l'exactitude."
ACTION 2   : calculer(expression="520000 * 2")
OBSERVATION 2 : "1040000"

THOUGHT 3 : "J'ai maintenant toutes les informations nécessaires."
FINAL ANSWER : "La population de Lyon est de 520 000 habitants.
                Le double de ce nombre est 1 040 000."
```
</details>

### Exercice 8.4.B — Pourquoi déléguer le calcul à un outil ?

Explique, en te référant explicitement au Module 5, chapitre 5.4, pourquoi il est plus fiable qu'un agent utilise un outil `calculer` externe plutôt que de laisser le LLM effectuer lui-même un calcul arithmétique complexe "de tête".

<details>
<summary>👉 Solution</summary>

Rappelle-toi le Module 5, chapitre 5.4 : un LLM génère chaque token en prédisant statistiquement le token **le plus probable** selon son entraînement, plutôt qu'en exécutant un algorithme de calcul arithmétique rigoureux et garanti exact. Sur des calculs simples et fréquents (comme "2+2"), cette approche statistique fonctionne généralement bien car ces patterns sont abondamment présents dans les données d'entraînement. Mais sur des calculs plus complexes ou avec de grands nombres inhabituels, le modèle peut produire une réponse plausible mais **incorrecte** — un risque d'erreur que l'utilisation d'un véritable outil de calcul externe (exécutant un vrai calcul exact via du code, comme dans l'exemple de ce chapitre) élimine complètement, puisque ce calcul est alors garanti mathématiquement exact plutôt que statistiquement probable.
</details>

### Exercice 8.4.C — Identifier les quatre composants d'un agent

Pour un agent conçu pour répondre à des questions sur la météo et convertir automatiquement des devises, identifie ce qui jouerait le rôle de chacun des quatre composants d'un agent présentés dans ce chapitre.

<details>
<summary>👉 Solution</summary>

```
LLM (cerveau)     : le modèle qui interprète la question de
                     l'utilisateur et décide quels outils utiliser

Outils (capacités) : une fonction "obtenir_meteo(ville)" et une
                       fonction "convertir_devise(montant, de, vers)"

Mémoire (contexte)  : l'historique des messages de la conversation
                       en cours, incluant les résultats déjà obtenus
                       des appels d'outils précédents dans la même tâche

Objectif (tâche)    : la question initiale de l'utilisateur, par
                       exemple "Quelle est la météo à Tokyo, et
                       combien vaut 100€ en yens ?"
```
</details>

### Exercice 8.4.D — Limiter le nombre d'itérations

Le code de la Mise en Pratique de ce chapitre utilise `max_iterations=5` pour l'AgentExecutor. Explique pourquoi cette limite est une précaution importante à intégrer dans un système d'agent en production.

<details>
<summary>👉 Solution</summary>

Sans limite sur le nombre d'itérations (le nombre de cycles Thought/Action/Observation successifs), un agent pourrait potentiellement se retrouver dans une **boucle infinie** ou très longue — par exemple, s'il interprète mal un résultat d'outil et continue indéfiniment à chercher une information déjà obtenue, ou s'il rencontre une tâche mal formulée qu'il ne parvient jamais à résoudre complètement. Une telle situation entraînerait des coûts API potentiellement très élevés (chaque itération impliquant un nouvel appel au LLM, rappel Module 6, chapitre 6.2 : facturation au token) et une latence excessive pour l'utilisateur final, sans jamais aboutir à une réponse utile. La limite `max_iterations` agit comme un **garde-fou** de sécurité, garantissant que l'agent s'arrête proprement (même sans avoir totalement résolu la tâche) après un nombre raisonnable de tentatives, plutôt que de continuer indéfiniment.
</details>

---

---

# 📘 CHAPITRE 8.5 — CONSTRUIRE DES AGENTS AVEC DES OUTILS

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Concevoir de Bons Outils pour un Agent

**🔑 Intuition — l'importance cruciale de la description**

Rappelle-toi le Module 6, chapitre 6.2 : pour le Function Calling, on décrit chaque outil au modèle (son nom, sa description, ses paramètres attendus). Cette **description** est absolument déterminante pour qu'un agent utilise correctement l'outil : le LLM ne "voit" jamais le code réel de la fonction — il décide **uniquement** sur la base de cette description textuelle si et quand utiliser cet outil.

```
🔑 Une MAUVAISE description d'outil :
   "obtenir_donnees(x)" → trop vague, le LLM ne sait pas dans quel
   contexte utiliser cet outil, ni ce que représente le paramètre x

🔑 Une BONNE description d'outil :
   "obtenir_stock_produit(id_produit: str) -> int : Retourne la
   quantité actuellement en stock pour un produit donné, identifié
   par son ID. Utilise cet outil chaque fois qu'un utilisateur
   demande la disponibilité d'un produit spécifique."
```

**💡 Le point clé :** rédiger de bonnes descriptions d'outils est en réalité une forme de **prompt engineering** (rappel Module 6, chapitre 6.5) — la clarté et la précision de cette description influencent directement la fiabilité avec laquelle l'agent choisira et utilisera correctement l'outil au bon moment.

---

### Gérer la Mémoire Conversationnelle d'un Agent

**🔑 Intuition — rappel et extension du Module 6, chapitre 6.2**

Rappelle-toi le Module 6 : la mémoire d'une conversation n'existe que parce que l'historique complet est renvoyé à chaque appel. Pour un agent, cette mémoire doit inclure **non seulement** les messages de la conversation avec l'utilisateur, **mais aussi** l'historique des actions déjà entreprises (les appels d'outils précédents et leurs résultats) au sein de la tâche en cours — rappelle-toi l'exemple ReAct tracé au Chapitre 8.4 : chaque `OBSERVATION` doit rester disponible dans le contexte pour les étapes de raisonnement suivantes.

```
🔑 Deux niveaux de mémoire pour un agent :

MÉMOIRE À COURT TERME (au sein d'une seule tâche) :
   → l'historique Thought/Action/Observation de la tâche EN COURS
     (rappel Chapitre 8.4), généralement effacée une fois la tâche
     terminée

MÉMOIRE À LONG TERME (entre plusieurs conversations/sessions) :
   → des informations persistantes sur l'utilisateur ou le contexte,
     conservées d'une session à l'autre — souvent implémentée via
     une base de données (potentiellement une base vectorielle,
     Chapitre 8.2, pour retrouver des souvenirs pertinents par similarité)
```

---

### Les Systèmes Multi-Agents : Faire Collaborer Plusieurs Agents

**🔑 Intuition — la spécialisation, comme dans une équipe humaine**

Plutôt que de demander à un seul agent généraliste de tout gérer, les systèmes **multi-agents** répartissent une tâche complexe entre **plusieurs agents spécialisés**, chacun avec un rôle et des outils spécifiques — un peu comme une équipe humaine où un chef de projet coordonne des spécialistes différents (un rédacteur, un analyste de données, un vérificateur de faits), plutôt qu'une seule personne censée tout maîtriser.

```
🔑 Exemple de système multi-agents pour la rédaction d'un rapport :

Agent CHERCHEUR    : recherche des informations pertinentes (outils
                       de recherche web, RAG sur une base documentaire)
Agent RÉDACTEUR      : structure et rédige le rapport à partir des
                       informations trouvées par le Chercheur
Agent VÉRIFICATEUR   : relit le rapport rédigé, vérifie la cohérence
                       et la fidélité aux sources originales

Un agent COORDINATEUR orchestre l'ensemble, décidant quel agent
intervient à quel moment, et transmettant les résultats entre eux.
```

**💡 Pourquoi cette spécialisation aide-t-elle ?** Chaque agent, avec un rôle plus restreint et ciblé, bénéficie d'un prompt système plus précis et adapté à sa tâche spécifique (rappel Module 6, chapitre 6.5 : les System Prompts), réduisant les risques de confusion ou de dérive qu'un agent généraliste unique, devant tout gérer simultanément, pourrait rencontrer sur des tâches longues et complexes.

---

## 💻 MISE EN PRATIQUE

```python
from langchain.tools import tool
from langchain_openai import ChatOpenAI
from langchain.agents import create_react_agent, AgentExecutor
from langchain.memory import ConversationBufferMemory
from langchain import hub

# ─────────────────────────────────────────────
# 1. CONCEVOIR DE BONS OUTILS — descriptions précises et claires
# ─────────────────────────────────────────────

@tool
def obtenir_stock_produit(id_produit: str) -> str:
    """Retourne la quantité actuellement en stock pour un produit donné,
    identifié par son ID (ex: 'PROD-123'). Utilise cet outil chaque fois
    qu'un utilisateur demande si un produit est disponible ou en stock."""
    stock_simule = {"PROD-123": 45, "PROD-456": 0}
    quantite = stock_simule.get(id_produit, "ID produit inconnu")
    return f"Stock pour {id_produit} : {quantite} unités"

@tool
def creer_ticket_support(sujet: str, description: str) -> str:
    """Crée un ticket de support client avec un sujet et une description.
    Utilise cet outil UNIQUEMENT quand l'utilisateur signale explicitement
    un problème nécessitant une intervention humaine."""
    return f"Ticket créé : '{sujet}' — sera traité sous 24h."

outils_support = [obtenir_stock_produit, creer_ticket_support]

# ─────────────────────────────────────────────
# 2. AJOUTER UNE MÉMOIRE CONVERSATIONNELLE PERSISTANTE
# ─────────────────────────────────────────────

memoire = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

llm = ChatOpenAI(model="gpt-4o", temperature=0)
prompt_react = hub.pull("hwchase17/react-chat")   # variante ReAct avec support de mémoire

agent = create_react_agent(llm, outils_support, prompt_react)
executor = AgentExecutor(agent=agent, tools=outils_support, memory=memoire, verbose=True)

# Deux tours de conversation successifs — la mémoire persiste entre les deux
resultat1 = executor.invoke({"input": "Le produit PROD-123 est-il en stock ?"})
print(f"Réponse 1 : {resultat1['output']}")

resultat2 = executor.invoke({"input": "Et le PROD-456 ?"})   # référence implicite au contexte précédent
print(f"Réponse 2 : {resultat2['output']}")

# ─────────────────────────────────────────────
# 3. UN SYSTÈME MULTI-AGENTS SIMPLIFIÉ (orchestration manuelle)
# ─────────────────────────────────────────────

def agent_chercheur(sujet):
    """Simule un agent spécialisé dans la recherche d'information."""
    llm_local = ChatOpenAI(model="gpt-4o", temperature=0.3)
    reponse = llm_local.invoke(f"Liste 3 points clés factuels sur : {sujet}")
    return reponse.content

def agent_redacteur(points_cles):
    """Simule un agent spécialisé dans la rédaction structurée."""
    llm_local = ChatOpenAI(model="gpt-4o", temperature=0.7)
    reponse = llm_local.invoke(f"Rédige un court paragraphe structuré à partir de ces points : {points_cles}")
    return reponse.content

def agent_verificateur(texte_redige, points_cles_originaux):
    """Simule un agent spécialisé dans la vérification de cohérence."""
    llm_local = ChatOpenAI(model="gpt-4o", temperature=0)
    prompt_verif = f"""Vérifie que ce texte est fidèle aux points originaux.
    Texte : {texte_redige}
    Points originaux : {points_cles_originaux}
    Réponds par 'COHÉRENT' ou explique les écarts trouvés."""
    reponse = llm_local.invoke(prompt_verif)
    return reponse.content

# Orchestration : le COORDINATEUR (le code Python lui-même, ici) enchaîne les agents
sujet_rapport = "les avantages du RAG pour les entreprises"

points = agent_chercheur(sujet_rapport)
print(f"\n[CHERCHEUR] Points trouvés :\n{points}")

redaction = agent_redacteur(points)
print(f"\n[RÉDACTEUR] Texte rédigé :\n{redaction}")

verification = agent_verificateur(redaction, points)
print(f"\n[VÉRIFICATEUR] Résultat :\n{verification}")
```

---

## 🏋️ EXERCICES — CHAPITRE 8.5

### Exercice 8.5.A — Améliorer une description d'outil

Voici une description d'outil mal rédigée : `"traiter(donnees)"`. Réécris une meilleure description pour un outil qui calcule la remise applicable sur une commande selon son montant total, en t'inspirant des exemples de ce chapitre.

<details>
<summary>👉 Solution</summary>

*(Exemple de réponse — plusieurs formulations correctes possibles)*

```
"calculer_remise_commande(montant_total: float) -> float :
Calcule le pourcentage de remise applicable à une commande, selon
son montant total en euros. Utilise cet outil chaque fois qu'un
utilisateur demande le montant final après remise pour une commande,
ou souhaite connaître les seuils de remise applicables."
```

Cette description précise le nom explicite de l'outil, le type et le sens du paramètre attendu, le type de retour, ET surtout dans QUEL contexte précis l'agent devrait choisir d'utiliser cet outil — répondant exactement aux critères d'une bonne description énoncés dans ce chapitre.
</details>

### Exercice 8.5.B — Mémoire à court terme ou à long terme ?

Pour chacun des éléments suivants, indique s'il relève de la mémoire à court terme ou à long terme d'un agent, selon la distinction de ce chapitre :

1. Le résultat d'un appel d'outil effectué il y a 2 messages, dans la même conversation
2. Le fait qu'un utilisateur ait indiqué, lors d'une conversation la semaine dernière, préférer être appelé par son prénom
3. Le résultat d'une recherche effectuée à l'étape précédente du cycle ReAct en cours

<details>
<summary>👉 Solution</summary>

```
1. MÉMOIRE À COURT TERME — appartient à l'historique de la
   conversation EN COURS, généralement effacée une fois la
   session terminée

2. MÉMOIRE À LONG TERME — une information persistante sur
   l'utilisateur, qui doit être conservée D'UNE SESSION À L'AUTRE,
   au-delà de la conversation actuelle

3. MÉMOIRE À COURT TERME — fait partie du cycle Thought/Action/
   Observation de la TÂCHE EN COURS (rappel Chapitre 8.4), pas une
   information destinée à persister au-delà de cette tâche précise
```
</details>

### Exercice 8.5.C — Concevoir un système multi-agents

Décris (sans code) une répartition de rôles en système multi-agents pour un assistant qui aide à planifier un voyage : recherche de vols, recherche d'hôtels, et création d'un itinéraire final cohérent.

<details>
<summary>👉 Solution</symmary>

*(Exemple de réponse)*

```
Agent RECHERCHE VOLS    : spécialisé dans la recherche et la
                            comparaison d'options de vols, avec accès
                            à un outil de recherche de vols

Agent RECHERCHE HÔTELS  : spécialisé dans la recherche et la
                            comparaison d'hôtels selon des critères
                            (budget, localisation, dates), avec un
                            outil de recherche d'hébergements

Agent PLANIFICATEUR      : reçoit les résultats des deux agents
                            précédents et construit un itinéraire
                            cohérent et optimisé (dates compatibles,
                            budget global respecté)

Un agent COORDINATEUR orchestrerait ces trois agents spécialisés :
d'abord solliciter les agents Vols et Hôtels en parallèle (ou en
séquence), puis transmettre leurs résultats combinés à l'agent
Planificateur pour produire la proposition finale de voyage.
```
</details>

### Exercice 8.5.D — Pourquoi spécialiser plutôt qu'un seul agent généraliste ?

Explique, en te référant à l'intuition de ce chapitre sur les System Prompts (rappel Module 6, chapitre 6.5), pourquoi un système multi-agents spécialisés peut être plus fiable qu'un seul agent généraliste chargé de toutes les tâches simultanément.

<details>
<summary>👉 Solution</summary>

Un agent unique, chargé de gérer simultanément la recherche, la rédaction, ET la vérification (par exemple), doit suivre un System Prompt unique tentant de couvrir toutes ces responsabilités différentes à la fois — un prompt nécessairement plus complexe et potentiellement moins précis pour chacune des tâches individuelles qu'il doit accomplir. Rappelle-toi le Module 6, chapitre 6.5 : un System Prompt bien ciblé, définissant un rôle précis et restreint, oriente plus efficacement le comportement du modèle qu'une instruction générale couvrant de multiples responsabilités disparates. En répartissant les responsabilités entre plusieurs agents spécialisés, chacun avec son propre System Prompt ciblé sur SA tâche spécifique (rechercher, rédiger, ou vérifier), chaque agent peut se concentrer pleinement sur son rôle précis, réduisant les risques de confusion ou de dérive que rencontrerait un agent généraliste unique sur des tâches longues et multiformes.
</details>

---

---

# 📘 CHAPITRE 8.6 — COMBINER RAG ET AGENTS : SYSTÈMES AVANCÉS

## Durée : 0.5 semaine

---

## 📖 EXPLICATION

### Le RAG comme un Outil parmi d'Autres pour un Agent

**🔑 Intuition — dépasser la chaîne RAG fixe**

Rappelle-toi le Chapitre 8.3 : la Chain `RetrievalQA` suit un pipeline **fixe et systématique** — pour chaque question, elle interroge automatiquement la base vectorielle, sans jamais se demander si c'est réellement nécessaire. Un **Agentic RAG** (RAG agentique) va plus loin : plutôt qu'une chaîne fixe, le retrieval devient **un outil parmi d'autres**, que l'agent (rappel Chapitre 8.4, 8.5) **décide lui-même d'utiliser ou non**, selon son propre raisonnement sur la question posée.

```
🔑 RAG classique (Chaîne fixe, Chapitre 8.3) :

Question → TOUJOURS interroger la base vectorielle → Générer la réponse
(même pour une question qui ne nécessite pas de recherche documentaire,
comme "Bonjour, comment vas-tu ?")

🔑 Agentic RAG (le retrieval comme outil, Chapitre 8.4) :

Question → l'AGENT RAISONNE : "Cette question nécessite-t-elle de
consulter la base documentaire, ou puis-je répondre directement ?"
   → SI nécessaire : ACTION = rechercher_dans_documents(question)
   → SI pas nécessaire : répondre directement, sans recherche inutile
```

**💡 L'avantage de cette flexibilité :** un système Agentic RAG peut également **enchaîner plusieurs recherches successives** si une seule ne suffit pas à répondre complètement (par exemple, rechercher d'abord une information générale, puis affiner sa recherche selon ce qu'il a trouvé), exactement comme le cycle ReAct du Chapitre 8.4 permet d'enchaîner plusieurs actions successives — une flexibilité impossible avec une chaîne RAG fixe à une seule étape de retrieval systématique.

---

### Considérations de Production : Garde-fous et Fiabilité

**🔑 Intuition**

Rappelle-toi les erreurs fréquentes déjà évoquées dans plusieurs modules précédents : un système combinant RAG et Agents, déployé en production, doit intégrer plusieurs garde-fous pour rester fiable et sûr.

```
🔑 Limiter les hallucinations (rappel Module 0, Chapitre 8.3) :
   → Instruire explicitement le LLM de ne répondre QUE sur la base
     des chunks fournis, et d'indiquer honnêtement quand
     l'information n'est pas disponible plutôt que d'inventer une réponse

🔑 Citer systématiquement les sources (rappel Chapitre 8.3,
   exercice 8.3.C) :
   → Permettre une vérifiabilité et une confiance accrue de l'utilisateur

🔑 Limiter le nombre d'itérations de l'agent (rappel Chapitre 8.4,
   exercice 8.4.D) :
   → Éviter les boucles excessives, coûteuses et potentiellement infinies

🔑 Valider les actions à fort impact avant exécution :
   → Pour des outils aux conséquences réelles importantes (envoyer
     un email, effectuer un paiement, modifier une base de données),
     prévoir une étape de confirmation humaine avant l'exécution
     effective, plutôt que de laisser l'agent agir en autonomie totale
     sur des actions irréversibles ou sensibles
```

---

## 💻 MISE EN PRATIQUE

```python
from langchain.tools import tool
from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.agents import create_react_agent, AgentExecutor
from langchain import hub

# ─────────────────────────────────────────────
# 1. TRANSFORMER LE RETRIEVAL EN OUTIL POUR UN AGENT (Agentic RAG)
# ─────────────────────────────────────────────

embeddings = OpenAIEmbeddings()
vectorstore = Chroma(persist_directory="./chroma_db", embedding_function=embeddings)

@tool
def rechercher_documentation(question: str) -> str:
    """Recherche dans la base documentaire de l'entreprise les passages
    pertinents pour répondre à une question précise. Utilise cet outil
    UNIQUEMENT quand la question porte sur des informations spécifiques
    à l'entreprise, PAS pour des questions générales de conversation."""
    resultats = vectorstore.similarity_search(question, k=3)
    return "\n---\n".join([doc.page_content for doc in resultats])

@tool
def calculer(expression: str) -> str:
    """Évalue une expression mathématique."""
    return str(eval(expression))

outils_agentic_rag = [rechercher_documentation, calculer]

# ─────────────────────────────────────────────
# 2. CRÉER L'AGENT AGENTIC RAG — le retrieval devient optionnel
# ─────────────────────────────────────────────

llm = ChatOpenAI(model="gpt-4o", temperature=0)
prompt_react = hub.pull("hwchase17/react")

agent = create_react_agent(llm, outils_agentic_rag, prompt_react)
executor = AgentExecutor(agent=agent, tools=outils_agentic_rag, verbose=True, max_iterations=5)

# Question 1 : nécessite le RAG
resultat1 = executor.invoke({"input": "Quelle est la procédure de remboursement de notre entreprise ?"})
print(f"Réponse 1 (avec RAG) : {resultat1['output']}")

# Question 2 : ne nécessite PAS le RAG — l'agent devrait répondre directement
resultat2 = executor.invoke({"input": "Bonjour, comment vas-tu ?"})
print(f"\nRéponse 2 (sans RAG) : {resultat2['output']}")
print("(Observer dans les logs verbose que l'agent n'appelle PAS")
print(" rechercher_documentation pour cette question conversationnelle simple)")

# ─────────────────────────────────────────────
# 3. AJOUTER DES GARDE-FOUS DE PRODUCTION
# ─────────────────────────────────────────────

@tool
def envoyer_email(destinataire: str, contenu: str) -> str:
    """Envoie un email. ATTENTION : action à fort impact, nécessite
    une confirmation avant exécution réelle."""
    # Garde-fou : demander une confirmation avant toute action irréversible
    print(f"\n⚠️  CONFIRMATION REQUISE : envoyer un email à {destinataire} ?")
    print(f"Contenu prévu : {contenu[:100]}...")
    confirmation = input("Confirmer l'envoi ? (oui/non) : ")
    
    if confirmation.lower() == "oui":
        return f"✅ Email envoyé à {destinataire}"
    else:
        return "❌ Envoi annulé par l'utilisateur"

# Prompt système avec instruction anti-hallucination (rappel Chapitre 8.3)
instruction_anti_hallucination = """
Réponds UNIQUEMENT en te basant sur les informations trouvées via
les outils disponibles. Si tu ne trouves pas l'information demandée,
indique-le honnêtement plutôt que d'inventer une réponse plausible.
"""
```

---

## 🏋️ EXERCICES — CHAPITRE 8.6

### Exercice 8.6.A — RAG fixe ou Agentic RAG ?

Pour chacun des scénarios suivants, indique s'il est préférable d'utiliser une Chain RAG fixe (Chapitre 8.3) ou un Agentic RAG (ce chapitre), en justifiant :

1. Un chatbot de FAQ simple, où chaque question porte systématiquement sur la documentation produit
2. Un assistant polyvalent qui doit à la fois répondre à des questions documentaires ET tenir une conversation générale avec l'utilisateur

<details>
<summary>👉 Solution</summary>

```
1. CHAIN RAG FIXE — si TOUTES les questions nécessitent
   systématiquement une recherche documentaire, la simplicité et la
   prévisibilité d'une chaîne fixe (Chapitre 8.3) suffisent largement,
   sans besoin de la flexibilité supplémentaire (et de la complexité
   ajoutée) d'un agent

2. AGENTIC RAG — la nécessité de distinguer dynamiquement les
   questions nécessitant une recherche documentaire de celles relevant
   d'une conversation générale correspond exactement au cas d'usage
   central de l'Agentic RAG présenté dans ce chapitre, où l'agent
   décide lui-même quand utiliser l'outil de recherche
```
</details>

### Exercice 8.6.B — Identifier une action nécessitant confirmation

Parmi les outils suivants, identifie ceux qui nécessiteraient probablement une confirmation humaine avant exécution (rappel des garde-fous de ce chapitre), et ceux qui pourraient être exécutés en autonomie complète par l'agent :

```
A. rechercher_documentation(question)
B. supprimer_compte_utilisateur(id_utilisateur)
C. calculer(expression)
D. effectuer_paiement(montant, destinataire)
```

<details>
<summary>👉 Solution</summary>

```
AUTONOMIE COMPLÈTE (pas de confirmation nécessaire) :
A. rechercher_documentation(question) — action de LECTURE seule,
   sans conséquence irréversible
C. calculer(expression) — action purement computationnelle, sans
   effet sur le monde extérieur

CONFIRMATION HUMAINE NÉCESSAIRE (actions à fort impact/irréversibles) :
B. supprimer_compte_utilisateur(id_utilisateur) — action destructive
   et irréversible, potentiellement lourde de conséquences pour
   l'utilisateur concerné
D. effectuer_paiement(montant, destinataire) — action financière à
   conséquence réelle et généralement difficile à annuler

Cette distinction illustre le principe des garde-fous de ce chapitre :
les actions de LECTURE ou de CALCUL pur peuvent généralement être
automatisées en autonomie, tandis que les actions qui MODIFIENT
réellement un état (suppression, paiement, envoi de communications)
justifient une étape de validation humaine avant exécution effective.
```
</details>

### Exercice 8.6.C — Pourquoi préciser explicitement "n'invente pas de réponse" ?

Explique pourquoi l'instruction explicite "si tu ne trouves pas l'information, indique-le honnêtement plutôt que d'inventer une réponse" (présente dans le code de ce chapitre) est particulièrement importante pour un système combinant RAG et Agents, en te référant au Module 0.

<details>
<summary>👉 Solution</symmary>

Rappelle-toi le Module 0 : un LLM génère du texte en produisant la suite de mots **statistiquement la plus probable**, sans distinction intrinsèque entre "je sais cette information avec certitude" et "je génère une réponse plausible mais non vérifiée" — c'est précisément le mécanisme des hallucinations. Dans un système RAG, si les chunks récupérés ne contiennent pas réellement l'information demandée (par exemple, une question sur un sujet absent de la base documentaire), le LLM pourrait, sans instruction explicite contraire, générer une réponse plausible en s'appuyant sur ses connaissances générales internes plutôt que sur les documents fournis — donnant l'illusion trompeuse d'une réponse fondée sur la base documentaire, alors qu'elle ne l'est pas réellement. L'instruction explicite guide le modèle à reconnaître et signaler honnêtement cette absence d'information, une précaution essentielle pour maintenir la fiabilité et la confiance dans un système déployé en production.
</details>

### Exercice 8.6.D — Synthèse : relier RAG et Agents

En une ou deux phrases, explique comment les Chapitres 8.1-8.3 (RAG) et 8.4-8.5 (Agents) se rejoignent dans ce chapitre final, en identifiant précisément quel concept de chaque partie est réutilisé.

<details>
<summary>👉 Solution</summary>

Le RAG (Chapitres 8.1-8.3, avec son pipeline de chunking, embeddings, et retrieval) est transformé en un simple **outil** (Chapitre 8.4-8.5 : le concept d'outil pour un agent), que l'agent peut choisir d'utiliser ou non selon son propre raisonnement (le pattern ReAct, Chapitre 8.4), plutôt que de suivre systématiquement une chaîne fixe comme au Chapitre 8.3 — combinant ainsi la richesse informationnelle du RAG (accès à des documents externes) avec la flexibilité décisionnelle des agents (choisir quand et comment utiliser cette capacité), pour un système final plus adaptable qu'une simple chaîne RAG isolée ou qu'un agent sans accès à une base de connaissances externe.
</details>

---

---

# 🎯 PROJET DE SYNTHÈSE DU MODULE 8
## Un Assistant d'Entreprise Complet — RAG, Outils et Agent, de Bout en Bout

**🔑 Pourquoi ce projet réunit tout le module**

Ce projet construit un assistant de support client complet, qui mobilise **chaque** chapitre de ce module dans un seul système cohérent : le RAG pour interroger la documentation produit (8.1-8.2), une Chain LangChain évaluée rigoureusement (8.3), un agent suivant le pattern ReAct (8.4), des outils personnalisés bien décrits avec mémoire conversationnelle (8.5), et enfin la transformation du RAG en outil optionnel, avec des garde-fous de production (8.6).

```
🔑 Le fil conducteur :

1. Chapitre 8.1-8.2 → préparer la base documentaire (chunking, embeddings, ChromaDB)
2. Chapitre 8.3     → évaluer la qualité du retrieval avant de le déployer
3. Chapitre 8.4     → transformer le RAG en OUTIL, pas une chaîne fixe
4. Chapitre 8.5     → ajouter un outil de calcul ET un outil à fort impact (ticket)
5. Chapitre 8.6     → garde-fous : confirmation humaine, anti-hallucination, limite d'itérations
```

---

### Étape 1 — Préparer la Base Documentaire (Chapitres 8.1-8.2)

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# Documentation simulée de l'entreprise
documents_bruts = [
    "Le produit XYZ se réinitialise en maintenant le bouton d'alimentation "
    "pendant 5 secondes, jusqu'à ce que le voyant clignote deux fois.",
    "La garantie standard du produit XYZ couvre 2 ans à partir de la date "
    "d'achat. Une extension de garantie à 4 ans est disponible en option.",
    "Les remboursements sont traités sous 14 jours ouvrés après réception "
    "du produit retourné, via le mode de paiement original.",
]

# Chunking (8.1) — chunk_size réduit ici car les documents sont déjà courts
splitter = RecursiveCharacterTextSplitter(chunk_size=150, chunk_overlap=30)
chunks = splitter.create_documents(documents_bruts)
print(f"Documentation découpée en {len(chunks)} chunks")

# Embeddings + stockage vectoriel (8.2)
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings, persist_directory="./chroma_support")
```

---

### Étape 2 — Évaluer le Retrieval Avant de le Déployer (Chapitre 8.3)

```python
def evaluer_retrieval(vectorstore, questions_test, k=2):
    """Rappel 8.3 : ne jamais déployer un RAG sans l'avoir évalué."""
    resultats = []
    for item in questions_test:
        chunks_trouves = vectorstore.similarity_search(item["question"], k=k)
        contient_bonne_info = any(
            item["mot_cle_attendu"].lower() in c.page_content.lower() for c in chunks_trouves
        )
        resultats.append(contient_bonne_info)
    taux = sum(resultats) / len(resultats)
    print(f"Taux de retrieval correct : {taux:.1%}")
    return taux

questions_test = [
    {"question": "Comment réinitialiser l'appareil ?", "mot_cle_attendu": "5 secondes"},
    {"question": "Combien de temps pour un remboursement ?", "mot_cle_attendu": "14 jours"},
]
evaluer_retrieval(vectorstore, questions_test)
# Un taux bas alerterait AVANT le déploiement — jamais après, sur de vrais utilisateurs
```

---

### Étape 3 — Transformer le RAG en Outil pour un Agent (Chapitres 8.4, 8.6)

```python
from langchain.tools import tool
from langchain_openai import ChatOpenAI
from langchain.agents import create_react_agent, AgentExecutor
from langchain.memory import ConversationBufferMemory
from langchain import hub

@tool
def rechercher_documentation(question: str) -> str:
    """Recherche dans la documentation produit de l'entreprise (garantie,
    réinitialisation, remboursements). Utilise cet outil UNIQUEMENT pour
    des questions spécifiques au produit, jamais pour du calcul ou de la
    conversation générale."""
    resultats = vectorstore.similarity_search(question, k=2)
    if not resultats:
        return "Aucune information trouvée dans la documentation."
    return "\n---\n".join([doc.page_content for doc in resultats])

@tool
def calculer(expression: str) -> str:
    """Évalue une expression mathématique. Utilise cet outil pour tout
    calcul, plutôt que de calculer mentalement (rappel 8.4)."""
    try:
        return str(eval(expression))
    except Exception as e:
        return f"Erreur : {e}"

@tool
def creer_ticket_support(sujet: str, description: str) -> str:
    """Crée un ticket de support. ACTION À FORT IMPACT (8.6) : nécessite
    une confirmation avant exécution réelle."""
    print(f"\n⚠️  CONFIRMATION REQUISE — Créer un ticket '{sujet}' ?")
    confirmation = input("Confirmer ? (oui/non) : ")
    if confirmation.lower() == "oui":
        return f"✅ Ticket '{sujet}' créé, traitement sous 24h."
    return "❌ Création annulée."

outils = [rechercher_documentation, calculer, creer_ticket_support]
```

---

### Étape 4 — Assembler l'Agent avec Mémoire et Garde-fous (Chapitres 8.5, 8.6)

```python
memoire = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

llm = ChatOpenAI(model="gpt-4o", temperature=0)
prompt_react = hub.pull("hwchase17/react-chat")

# Instruction anti-hallucination (8.6) injectée dans le prompt système
instruction_fiabilite = (
    "Réponds UNIQUEMENT à partir des résultats des outils. Si l'information "
    "n'est pas disponible, dis-le honnêtement plutôt que d'inventer une réponse."
)

agent = create_react_agent(llm, outils, prompt_react)
executor = AgentExecutor(
    agent=agent, tools=outils, memory=memoire,
    verbose=True, max_iterations=5   # garde-fou 8.4/8.6 : limite d'itérations
)

# ─────────────────────────────────────────────
# TEST 1 : question nécessitant le RAG
# ─────────────────────────────────────────────
r1 = executor.invoke({"input": "Combien de temps dure la garantie, et si j'en prends "
                                "le double avec l'extension, ça fait combien d'années ?"})
print(f"\nRéponse : {r1['output']}")
# Cycle ReAct attendu : ACTION rechercher_documentation → OBSERVATION "2 ans, extension 4 ans"
#                       → ACTION calculer("2*2") → OBSERVATION "4" → FINAL ANSWER

# ─────────────────────────────────────────────
# TEST 2 : question conversationnelle (PAS de RAG nécessaire, Agentic RAG, 8.6)
# ─────────────────────────────────────────────
r2 = executor.invoke({"input": "Merci, bonne journée !"})
print(f"\nRéponse : {r2['output']}")
# L'agent ne devrait PAS appeler rechercher_documentation ici

# ─────────────────────────────────────────────
# TEST 3 : action à fort impact (confirmation attendue, 8.6)
# ─────────────────────────────────────────────
r3 = executor.invoke({"input": "Mon produit ne se réinitialise pas même en suivant "
                                "la procédure, crée un ticket de support."})
print(f"\nRéponse : {r3['output']}")
```

---

### 💡 Ce que ce projet vient de démontrer

| Étape du projet | Chapitre mobilisé |
|---|---|
| `RecursiveCharacterTextSplitter`, `chunk_overlap=30` | 8.1 — Chunking |
| `Chroma.from_documents` | 8.2 — Base vectorielle |
| `evaluer_retrieval()` avant tout déploiement | 8.3 — Évaluation rigoureuse |
| `rechercher_documentation` comme **outil**, pas une chaîne fixe | 8.4 — Agentic RAG / ReAct |
| Description précise de chaque `@tool` | 8.5 — Conception d'outils |
| `ConversationBufferMemory` | 8.5 — Mémoire conversationnelle |
| Confirmation avant `creer_ticket_support` | 8.6 — Garde-fou action à fort impact |
| `max_iterations=5` + instruction anti-hallucination | 8.6 — Garde-fous de production |

**Retiens ceci :** un système RAG isolé (Chapitre 8.3) répond bien à des questions documentaires, mais ne sait ni calculer, ni agir, ni décider quand chercher. Un agent isolé (Chapitre 8.4) peut raisonner et agir, mais n'a accès à aucune connaissance spécifique à l'entreprise sans RAG. C'est exactement leur combinaison — le RAG comme un outil parmi d'autres, encadré par des garde-fous — qui donne naissance aux assistants IA réellement utilisables en production.

---

---

# ✅ QUIZ DE VALIDATION — MODULE 8

> Réponds sans regarder le cours. Objectif : 16/20 minimum avant de passer au module suivant.

**1.** Pourquoi un LLM a-t-il besoin d'un système RAG, malgré son pré-entraînement massif ?
**2.** Décris les deux phases du pipeline RAG.
**3.** Pourquoi découpe-t-on les documents en chunks plutôt que de les envoyer entiers ?
**4.** À quoi sert le `chunk_overlap` ?
**5.** Sur quel mécanisme du Module 5 repose le retrieval d'un système RAG ?
**6.** Pourquoi les bases de données vectorielles sont-elles nécessaires à grande échelle plutôt qu'une simple recherche exhaustive ?
**7.** Qu'est-ce que la recherche ANN, et quel compromis fait-elle ?
**8.** Cite trois bases de données vectorielles et leur usage recommandé.
**9.** Que fait la Chain `RetrievalQA` de LangChain ?
**10.** Quelles sont les deux dimensions à évaluer dans un système RAG ?
**11.** Quels sont les quatre composants d'un agent IA ?
**12.** Décris le cycle du pattern ReAct.
**13.** Pourquoi un agent devrait-il utiliser un outil "calculer" plutôt que de calculer mentalement ?
**14.** Pourquoi la description d'un outil est-elle si importante pour un agent ?
**15.** Quelle est la différence entre mémoire à court terme et mémoire à long terme d'un agent ?
**16.** Qu'est-ce qu'un système multi-agents, et pourquoi peut-il être plus fiable qu'un agent généraliste unique ?
**17.** Quelle est la différence entre une Chain RAG fixe et un Agentic RAG ?
**18.** Cite deux garde-fous importants pour un système RAG/Agent en production.
**19.** Pourquoi certaines actions d'un agent nécessitent-elles une confirmation humaine avant exécution ?
**20.** Explique le lien entre le pattern ReAct et le Chain-of-Thought du Module 6.

---

### 📝 Corrigé

**1.** Parce qu'un LLM ne connaît ni les documents privés non inclus dans son entraînement, ni les événements survenus après sa date de coupure de connaissances.
**2.** Phase 1 (préparation) : charger, découper, vectoriser et stocker les documents. Phase 2 (requête) : convertir la question en embedding, rechercher les chunks similaires, les injecter dans le prompt, générer la réponse.
**3.** Pour respecter la limite de contexte maximale du LLM, et pour améliorer la précision de la recherche en comparant à des morceaux ciblés plutôt qu'à des documents entiers couvrant de nombreux sujets.
**4.** Il garantit qu'une information importante située à la frontière entre deux chunks ne soit pas coupée en deux, en la faisant apparaître intégralement dans au moins un des deux chunks.
**5.** Les embeddings et la similarité cosinus (Module 5, chapitre 5.2), qui mesurent la proximité sémantique entre l'embedding de la question et celui de chaque chunk stocké.
**6.** Parce qu'une recherche exhaustive nécessite de comparer la requête à chaque vecteur stocké un par un, un temps de calcul devenant trop lent à mesure que le nombre de vecteurs grandit (des millions, voire plus).
**7.** La recherche ANN (Approximate Nearest Neighbors) sacrifie une petite quantité de précision pour un gain de vitesse considérable, en utilisant des structures d'index qui évitent une comparaison exhaustive.
**8.** Par exemple : ChromaDB (prototypage local), Pinecone (production cloud managée), pgvector (si l'infrastructure utilise déjà PostgreSQL).
**9.** Elle encapsule automatiquement tout le pipeline RAG (interroger le retriever, injecter les chunks dans un prompt, appeler le LLM) en une seule Chain prête à l'emploi.
**10.** Le Retrieval (les chunks récupérés sont-ils pertinents ?) et la Génération (la réponse est-elle fidèle aux chunks et répond-elle réellement à la question ?).
**11.** Un LLM (le cerveau), des Outils (les capacités), une Mémoire (le contexte), et un Objectif (la tâche à accomplir).
**12.** Thought (raisonnement sur ce qui est nécessaire) → Action (appel d'un outil) → Observation (résultat de l'outil) → retour à Thought, jusqu'à une Final Answer.
**13.** Parce qu'un LLM génère du texte en prédisant statistiquement le token le plus probable, plutôt qu'en exécutant un calcul arithmétique garanti exact, ce qui peut mener à des erreurs sur des calculs complexes.
**14.** Parce que le LLM ne voit jamais le code de la fonction — il décide uniquement d'utiliser un outil sur la base de sa description textuelle, qui doit donc être précise et claire sur son usage attendu.
**15.** La mémoire à court terme concerne l'historique de la tâche/conversation en cours, généralement effacée après ; la mémoire à long terme conserve des informations persistantes entre plusieurs sessions distinctes.
**16.** Un système où plusieurs agents spécialisés collaborent, chacun avec un rôle et des outils précis ; il peut être plus fiable car chaque agent bénéficie d'un System Prompt ciblé sur sa tâche spécifique, plutôt qu'un unique prompt tentant de couvrir toutes les responsabilités à la fois.
**17.** Une Chain RAG fixe interroge systématiquement la base vectorielle pour chaque question ; un Agentic RAG traite le retrieval comme un outil optionnel, que l'agent décide lui-même d'utiliser ou non selon son raisonnement.
**18.** Par exemple : limiter les hallucinations par une instruction explicite de ne répondre que sur la base des documents fournis, et citer systématiquement les sources utilisées pour permettre la vérifiabilité.
**19.** Parce que certaines actions ont des conséquences réelles, potentiellement irréversibles ou sensibles (suppression de données, paiement, envoi de communications), et une erreur de raisonnement de l'agent pourrait avoir des impacts significatifs sans validation humaine préalable.
**20.** Le pattern ReAct combine directement le Chain-of-Thought (le raisonnement explicite étape par étape, qui enrichit le contexte disponible pour la génération suivante) avec le Function Calling (l'action concrète sur le monde réel), en alternant les deux dans une boucle répétée jusqu'à obtenir une réponse complète.

---

---

# 📊 RÉCAPITULATIF DU MODULE 8

## Ce que tu as maîtrisé

| Compétence | Notion clé | Niveau attendu |
|---|---|---|
| Donner une mémoire externe à un LLM | Chunking, embeddings, retrieval | ⭐⭐⭐⭐⭐ |
| Passer à l'échelle la recherche sémantique | Bases vectorielles, recherche ANN | ⭐⭐⭐⭐☆ |
| Construire un RAG professionnel | LangChain, Chains, évaluation | ⭐⭐⭐⭐☆ |
| Comprendre le raisonnement autonome d'un LLM | Pattern ReAct, cycle Thought/Action/Observation | ⭐⭐⭐⭐⭐ |
| Construire des agents fiables | Conception d'outils, mémoire, multi-agents | ⭐⭐⭐⭐☆ |
| Déployer des systèmes avancés en sécurité | Agentic RAG, garde-fous de production | ⭐⭐⭐☆☆ |

## Prochaine étape

Selon le plan de la formation, le module suivant est le **Module 9 — Déploiement & MLOps**, qui t'apprendra à faire passer ces systèmes RAG et Agents (ainsi que tous les modèles des modules précédents) d'un prototype fonctionnel à une application robuste, surveillée et fiable en production.

---

## ⚠️ ERREURS FRÉQUENTES DU MODULE 8

| Erreur | Conséquence | Solution |
|---|---|---|
| Chunk_overlap à zéro | Informations coupées aux frontières de chunks, perdues pour le retrieval | Toujours prévoir un chevauchement raisonnable entre chunks |
| Ne pas évaluer rigoureusement un système RAG | Fausse confiance, échecs silencieux sur des cas non testés | Construire un ensemble de test avec réponses de référence connues |
| Description d'outil vague ou incomplète | L'agent utilise le mauvais outil, ou au mauvais moment | Rédiger des descriptions précises indiquant clairement quand utiliser l'outil |
| Laisser un LLM calculer mentalement des opérations complexes | Erreurs arithmétiques silencieuses | Toujours déléguer les calculs à un outil externe exact |
| Aucune limite sur le nombre d'itérations d'un agent | Boucles excessives, coûts et latence incontrôlés | Toujours fixer un `max_iterations` raisonnable |
| Laisser un agent exécuter des actions irréversibles sans confirmation | Conséquences potentiellement graves d'une erreur de raisonnement | Ajouter une étape de confirmation humaine pour les actions à fort impact |
| Ne pas instruire explicitement le modèle contre l'invention de réponses | Hallucinations qui semblent fondées sur les documents mais ne le sont pas | Toujours inclure une instruction explicite d'honnêteté sur les limites de l'information disponible |

---

*Module 8 terminé ✅ — Durée totale : 7 semaines*  
*Formation IA Complète — Module suivant : Module 9 — Déploiement & MLOps*
