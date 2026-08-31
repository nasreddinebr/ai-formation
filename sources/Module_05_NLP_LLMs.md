# 🎓 FORMATION IA — MODULE 5
# NLP & Large Language Models
### Comprendre en profondeur les Transformers et les LLMs modernes

> **Professeur :** Dr. IA — Formation Complète  
> **Durée estimée :** 8 semaines (1–2h par jour)  
> **Prérequis :** Module 1 (Python), Module 2 (Mathématiques), Module 4 (Deep Learning & PyTorch)

---

## 🧭 COMMENT LIRE CE MODULE

Ce module est celui où tu vas enfin comprendre **exactement** ce qui se passe quand tu discutes avec ChatGPT ou Claude. Rappelle-toi le Module 4, chapitre 4.6 : tu y as découvert pourquoi les RNN/LSTM peinent sur de longues séquences, et pourquoi les Transformers les ont largement remplacés. Ce module ouvre entièrement cette architecture Transformer, notion par notion, et te montre comment un texte brut devient, étape par étape, une réponse générée par un LLM.

**La structure de chaque chapitre reste identique aux Modules 3 et 4 :**

```
1. 📖 EXPLICATION — toutes les notions, en langage simple et avec des analogies,
                     AVANT tout code
2. 💻 MISE EN PRATIQUE — le code (souvent avec Hugging Face) qui implémente
                          ce que tu viens de comprendre
3. 🏋️ EXERCICES — 4 exercices corrigés pour ancrer la compréhension
```

**Un rappel essentiel :** tout ce que tu vas apprendre ici repose sur les mêmes fondations mathématiques que le Module 2 (produit scalaire, softmax, matrices) et les mêmes mécanismes d'entraînement que le Module 4 (Autograd, descente de gradient). Le Transformer n'invente pas de nouvelles mathématiques — il **réorganise intelligemment** ce que tu connais déjà.

---

## 📋 PLAN DU MODULE 5

| Chapitre | Sujet | Durée estimée |
|---|---|---|
| **5.1** | Tokenisation : Transformer le Texte en Nombres | 1 semaine |
| **5.2** | Les Embeddings : un Sens Géométrique pour les Mots | 1 semaine |
| **5.3** | L'Architecture Transformer et le Mécanisme d'Attention | 2 semaines |
| **5.4** | Comment un LLM Génère du Texte | 1 semaine |
| **5.5** | Pré-entraînement et Fine-Tuning des LLMs | 1.5 semaine |
| **5.6** | Applications Pratiques avec Hugging Face | 1.5 semaine |

---

---

# 📘 CHAPITRE 5.1 — TOKENISATION
## Transformer le Texte en Nombres

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Pourquoi le texte doit-il devenir des nombres ?

**🔑 Intuition**

Rappelle-toi le Module 4, chapitre 4.1 : un réseau de neurones ne manipule que des Tensors — des tableaux de nombres. Or, un ordinateur ne "comprend" pas naturellement le mot "chat" — il faut d'abord le convertir en une représentation numérique. La **tokenisation** est la toute première étape de ce processus : elle découpe un texte brut en unités plus petites, appelées **tokens**, qui seront ensuite converties en nombres.

---

### Des Approches Historiques aux Tokenizers Modernes

**🔑 Intuition — pourquoi ne pas simplement découper mot par mot ?**

L'approche la plus naïve serait de découper un texte **mot par mot**, et d'attribuer un numéro unique à chaque mot du vocabulaire. Mais cette approche pose rapidement plusieurs problèmes :

- **Un vocabulaire immense** : une langue contient des centaines de milliers de mots, en comptant toutes leurs variations (pluriels, conjugaisons...) — un vocabulaire énorme est coûteux à stocker et à calculer
- **Les mots inconnus** : que faire d'un mot jamais vu pendant l'entraînement (un nom propre rare, un néologisme, une faute de frappe) ? Avec un découpage mot par mot strict, ce mot serait simplement... invisible pour le modèle
- **Les langues sans espaces clairs** : certaines langues (comme le chinois) ne séparent pas leurs mots par des espaces, rendant le découpage mot par mot ambigu

**La solution moderne : la tokenisation en sous-mots (subword tokenization)**

Plutôt que de découper par mot entier, les tokenizers modernes découpent le texte en **fragments de mots** (sous-mots), suffisamment petits pour couvrir un vocabulaire raisonnable, mais suffisamment grands pour rester porteurs de sens. Le mot "intelligence" pourrait ainsi être découpé en `["intel", "lig", "ence"]`, et un mot inconnu pourrait toujours être reconstruit à partir de fragments déjà connus, même s'il n'a jamais été vu en entier.

```
🔑 Découpage mot par mot :
   "intelligence artificielle" → ["intelligence", "artificielle"]
   Problème : si "artificielle" n'existe pas dans le vocabulaire → mot inconnu !

🔑 Découpage en sous-mots (moderne) :
   "intelligence artificielle" → ["intel", "lig", "ence", "arti", "fic", "ielle"]
   Avantage : même un mot totalement nouveau peut presque toujours être
   reconstitué à partir de fragments déjà connus
```

### BPE (Byte Pair Encoding) : comment le vocabulaire de sous-mots est construit

**🔑 Intuition — fusionner les paires les plus fréquentes**

BPE, la technique la plus utilisée pour construire un vocabulaire de sous-mots (utilisée entre autres par GPT), fonctionne par un principe étonnamment simple :

```
🔑 Algorithme BPE (simplifié) :

1. Partir d'un vocabulaire de caractères individuels
   (a, b, c, ..., espace, ponctuation...)
2. Compter quelles PAIRES de caractères adjacents apparaissent
   le plus fréquemment dans un immense corpus de texte
3. FUSIONNER la paire la plus fréquente en un nouveau "token"
   (par exemple, "t" + "h" → "th" si c'est très fréquent en anglais)
4. Répéter les étapes 2-3 des dizaines de milliers de fois,
   en fusionnant à chaque fois la paire la plus fréquente restante
5. Le vocabulaire final contient un mélange de caractères isolés,
   de fragments de mots fréquents, et de mots entiers très courants
```

**Le résultat** : les mots très fréquents (comme "le", "de", "et") deviennent souvent un seul token entier (car ils apparaissent si souvent que leurs lettres se sont progressivement fusionnées en un seul bloc), tandis que les mots rares ou complexes restent découpés en plusieurs fragments plus petits. C'est un compromis intelligent entre un vocabulaire de taille raisonnable et une couverture complète de n'importe quel texte, même avec des mots jamais vus.

**WordPiece** (utilisé par BERT) et **SentencePiece** (utilisé par beaucoup de modèles multilingues) suivent des principes similaires, avec des variations sur la façon exacte de choisir quelles fusions effectuer.

---

### Du Token au Nombre : les Token IDs

**🔑 Intuition**

Une fois le vocabulaire de tokens construit (souvent 30 000 à 100 000+ tokens différents selon les modèles), chaque token se voit attribuer un **identifiant numérique unique** — un simple numéro dans une immense liste. C'est ce numéro (le "Token ID") qui est effectivement transmis au réseau de neurones, pas le texte lui-même.

```
🔑 Rappel du Module 0 :
   1 token ≈ 0.75 mot en anglais (un peu moins en français, à cause
   des accents et de la morphologie plus riche)
```

**💡 Pourquoi c'est important de le savoir en pratique :** les APIs des LLMs (Module 0, 6) facturent généralement **au nombre de tokens**, pas au nombre de caractères ou de mots. Comprendre approximativement combien de tokens représente ton texte t'aide à estimer les coûts et à respecter les limites de contexte d'un modèle.

---

## 💻 MISE EN PRATIQUE

```python
from transformers import AutoTokenizer

# ─────────────────────────────────────────────
# 1. CHARGER UN TOKENIZER (rappel Module 0/1 : Hugging Face)
# ─────────────────────────────────────────────

tokenizer = AutoTokenizer.from_pretrained("gpt2")

texte = "L'intelligence artificielle transforme notre monde."

# ─────────────────────────────────────────────
# 2. TOKENISER — voir le découpage en sous-mots
# ─────────────────────────────────────────────

tokens = tokenizer.tokenize(texte)
print("Tokens (sous-mots) :", tokens)
# Remarque : les mots courts/fréquents restent souvent entiers,
# les mots plus rares ou composés sont découpés en fragments

token_ids = tokenizer.encode(texte)
print("\nToken IDs (les nombres transmis au modèle) :", token_ids)
print(f"Nombre de tokens : {len(token_ids)}")

# Retour en arrière : des IDs vers le texte
texte_reconstruit = tokenizer.decode(token_ids)
print(f"\nTexte reconstruit : {texte_reconstruit}")

# ─────────────────────────────────────────────
# 3. COMPARER PLUSIEURS PHRASES — combien de tokens ?
# ─────────────────────────────────────────────

phrases = [
    "Bonjour",
    "L'anticonstitutionnalité",
    "The quick brown fox jumps over the lazy dog",
    "Intelligence artificielle générative"
]

for phrase in phrases:
    n_tokens = len(tokenizer.encode(phrase))
    print(f"'{phrase}' → {n_tokens} tokens")

# ─────────────────────────────────────────────
# 4. GÉRER UN MOT TOTALEMENT INVENTÉ (hors vocabulaire classique)
# ─────────────────────────────────────────────

mot_invente = "supercalifragilisticexpialidocious"
tokens_invente = tokenizer.tokenize(mot_invente)
print(f"\nMot inventé '{mot_invente}' découpé en : {tokens_invente}")
# Même un mot totalement absent du vocabulaire peut être reconstruit
# à partir de fragments déjà connus — c'est la force de la tokenisation
# en sous-mots par rapport à un découpage mot par mot strict
```

---

## 🏋️ EXERCICES — CHAPITRE 5.1

### Exercice 5.1.A — Pourquoi pas un découpage mot par mot ?

Explique avec tes propres mots deux problèmes concrets que poserait un tokenizer qui découpe strictement mot par mot (un token = un mot entier, jamais de fragment), en te basant sur les explications de ce chapitre.

<details>
<summary>👉 Solution</summary>

```
1. VOCABULAIRE IMMENSE : une langue contient des centaines de milliers
   de mots différents (en comptant toutes les formes conjuguées,
   déclinées, les noms propres...), ce qui nécessiterait un vocabulaire
   énorme, coûteux à stocker et à calculer (rappel Module 1 :
   la couche d'entrée/sortie devrait avoir une dimension aussi grande
   que ce vocabulaire).

2. MOTS INCONNUS : tout mot absent du vocabulaire fixé lors de la
   construction du tokenizer (un nom propre rare, un néologisme, une
   faute de frappe) deviendrait totalement "invisible" pour le modèle,
   sans aucun moyen de le représenter — contrairement à un découpage
   en sous-mots, où même un mot totalement nouveau peut être reconstruit
   à partir de fragments déjà connus.
```
</details>

### Exercice 5.1.B — Simuler une fusion BPE

Voici un mini-corpus de mots fréquents (avec leur nombre d'occurrences) : `"bas" (10 fois), "bat" (8 fois), "cas" (3 fois)`. En supposant qu'on parte de caractères isolés (b, a, s, t, c), quelle serait la toute première fusion effectuée par l'algorithme BPE décrit dans ce chapitre, et pourquoi ?

<details>
<summary>👉 Solution</summary>

```
Comptons les paires de caractères adjacents :
"bas" (×10) → paires "b-a" et "a-s", chacune comptée 10 fois
"bat" (×8)  → paires "b-a" et "a-t", chacune comptée 8 fois
"cas" (×3)  → paires "c-a" et "a-s", chacune comptée 3 fois

Fréquence totale de chaque paire :
"b-a" : 10 (dans "bas") + 8 (dans "bat") = 18
"a-s" : 10 (dans "bas") + 3 (dans "cas") = 13
"a-t" : 8 (dans "bat") = 8
"c-a" : 3 (dans "cas") = 3

La paire la plus fréquente est "b-a" (18 occurrences au total),
donc BPE fusionnerait EN PREMIER les caractères "b" et "a" en
un nouveau token "ba", conformément à l'étape 3 de l'algorithme
décrit dans ce chapitre (fusionner la paire la plus fréquente).
```
</details>

### Exercice 5.1.C — Estimer un coût en tokens

Un texte contient environ 3000 mots en français. En utilisant la règle d'approximation du Module 0 (1 token ≈ 0.75 mot en anglais, un peu moins en français), estime approximativement le nombre de tokens que représenterait ce texte, et explique pourquoi cette estimation reste approximative.

<details>
<summary>👉 Solution</summary>

```
Avec 1 token ≈ 0.75 mot, on aurait environ 3000 / 0.75 ≈ 4000 tokens
en anglais. Mais la règle indique explicitement qu'en français, le
ratio est "un peu moins favorable" (donc légèrement PLUS de tokens
par mot), à cause des accents, de la richesse morphologique
(conjugaisons, accords) et du fait que les tokenizers sont souvent
entraînés principalement sur des corpus anglophones. Une estimation
plus prudente pour du français pourrait avoisiner 4000 à 4500 tokens.

Cette estimation reste approximative car le nombre exact de tokens
dépend fortement du vocabulaire spécifique du tokenizer utilisé, du
style du texte (mots rares vs mots courants), et ne peut être connu
avec certitude qu'en tokenisant réellement le texte (comme fait dans
la Mise en Pratique de ce chapitre).
```
</details>

### Exercice 5.1.D — Tokenisation et mots composés/rares

En te basant sur le principe de BPE, prédis qualitativement si le mot rare "anticonstitutionnellement" serait probablement représenté par un seul token ou par plusieurs tokens, et pourquoi.

<details>
<summary>👉 Solution</summary>

Ce mot serait très probablement découpé en **plusieurs tokens**, car BPE fusionne en priorité les paires de caractères les plus **fréquentes** dans le corpus d'entraînement. Un mot aussi long et rare que "anticonstitutionnellement" n'apparaît que très peu de fois dans un corpus de texte typique — il n'a donc pas eu l'occasion d'être "fusionné" en un seul bloc au cours de l'algorithme BPE, contrairement à des mots très fréquents comme "le" ou "et". En revanche, ses composants plus courants (comme le préfixe "anti", ou la racine "constitution") sont probablement devenus des tokens à part entière individuellement, car eux-mêmes reviennent fréquemment dans d'autres mots — le mot entier serait donc reconstruit comme un assemblage de plusieurs de ces fragments plus courants.
</details>

---

---

# 📘 CHAPITRE 5.2 — LES EMBEDDINGS
## Donner un Sens Géométrique aux Mots

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Rappel : pourquoi un simple numéro de token ne suffit pas

**🔑 Intuition**

Le Chapitre 5.1 t'a montré comment un mot devient un **Token ID** — un simple numéro (par exemple, "chat" pourrait être le token n°4521). Mais ce numéro, en lui-même, ne porte **aucune information sur le sens du mot**. Le token 4521 ("chat") n'est ni plus proche, ni plus éloigné du token 4522 que du token 9000 — ce sont juste des étiquettes arbitraires, sans structure sémantique.

**L'embedding résout exactement ce problème** : au lieu d'utiliser directement le numéro brut, on transforme chaque Token ID en un **vecteur** (rappel Module 2, chapitre 2.1.2) de plusieurs centaines de dimensions, où **la position dans cet espace reflète le sens du mot**. Rappelle-toi le Module 0 et le Module 2, chapitre 2.1.3 : deux mots au sens proche (comme "chat" et "félin") auront des vecteurs proches dans cet espace, mesurable par la similarité cosinus.

---

### Comment les Embeddings sont-ils Appris ? L'intuition de Word2Vec

**🔑 Intuition — "on reconnaît un mot à la compagnie qu'il fréquente"**

Cette citation célèbre du linguiste John Firth résume parfaitement l'idée derrière **Word2Vec**, l'une des premières méthodes qui a démontré qu'on pouvait apprendre des embeddings de mots vraiment utiles, simplement en observant **le contexte dans lequel chaque mot apparaît**.

L'intuition : si deux mots apparaissent fréquemment dans des contextes similaires (par exemple, "chat" et "chien" apparaissent tous deux souvent près des mots "animal", "caresser", "nourrir"), alors ces deux mots doivent probablement avoir un sens proche — même sans jamais avoir défini explicitement ce qu'est un "chat" ou un "chien".

```
🔑 Principe de Word2Vec (deux variantes) :

CBOW (Continuous Bag of Words) :
   → prédire un mot À PARTIR de son contexte
   Exemple : "Le ___ dort sur le canapé" → prédire "chat"

Skip-gram :
   → prédire le contexte À PARTIR d'un mot
   Exemple : à partir de "chat" → prédire "Le", "dort", "sur", "canapé"
```

Dans les deux cas, l'entraînement suit exactement le même cycle que celui appris au Module 2 (projet de synthèse) et au Module 4 : une prédiction, une fonction de coût (Cross-Entropy, rappel Module 4, chapitre 4.2), un calcul de gradient via Autograd, et une mise à jour des poids. Les "poids" appris pendant cet entraînement, associés à chaque mot, **deviennent** ses embeddings — un sous-produit remarquable de cet entraînement, plutôt que son objectif final direct.

---

### Les Propriétés Géométriques Remarquables des Embeddings

**🔑 Intuition — l'arithmétique du sens**

Une fois les embeddings appris, une propriété fascinante émerge : les **relations sémantiques** entre les mots se traduisent en **relations géométriques** dans l'espace vectoriel, calculables par de simples additions et soustractions de vecteurs (rappel Module 2, chapitre 2.1.3) !

```
🔑 Exemple célèbre :

vecteur("Roi") - vecteur("Homme") + vecteur("Femme") ≈ vecteur("Reine")
```

Intuitivement : la "direction" qui sépare "Homme" de "Roi" dans l'espace des embeddings capture quelque chose comme "le concept de royauté". Ajouter cette même direction à "Femme" nous rapproche naturellement de "Reine". Ce phénomène, purement émergent de l'entraînement sur d'immenses quantités de texte (personne n'a explicitement programmé cette relation), illustre à quel point les embeddings capturent une structure sémantique riche et cohérente.

---

### Embeddings Statiques vs Embeddings Contextuels : la limite de Word2Vec

**🔑 Intuition — le problème du mot "banque"**

Rappelle-toi l'exemple du Module 0 : *"La banque de la rivière est boueuse"*. Le mot "banque" a ici le sens de "berge", pas d'établissement financier. Mais avec Word2Vec (et les techniques similaires), **chaque mot n'a qu'un seul vecteur d'embedding fixe, unique**, quel que soit le contexte dans lequel il apparaît — c'est un **embedding statique**. Le mot "banque" aurait donc exactement le même vecteur, qu'il s'agisse de la berge d'une rivière ou d'un établissement financier, ce qui est évidemment problématique.

**Les Transformers modernes (BERT, GPT, et tous les LLMs actuels) résolvent ce problème avec des embeddings contextuels** : le vecteur final représentant "banque" est **recalculé dynamiquement** à chaque utilisation, en tenant compte des mots environnants dans la phrase — c'est précisément le rôle du mécanisme d'**attention**, que le prochain chapitre va détailler en profondeur. C'est cette capacité à produire des représentations différentes du même mot selon son contexte qui rend les Transformers si supérieurs aux approches plus anciennes comme Word2Vec.

```
🔑 Embedding STATIQUE (Word2Vec) :
   "banque" → TOUJOURS le même vecteur, peu importe le contexte

🔑 Embedding CONTEXTUEL (Transformers, BERT, GPT) :
   "la banque de la rivière"        → vecteur A pour "banque"
   "je vais retirer de l'argent à la banque" → vecteur B, DIFFÉRENT, pour "banque"
```

---

## 💻 MISE EN PRATIQUE

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA

# ─────────────────────────────────────────────
# 1. SIMULER DES EMBEDDINGS SIMPLIFIÉS (pour visualiser l'intuition)
# ─────────────────────────────────────────────

# Embeddings fictifs à 4 dimensions, construits pour illustrer les propriétés
embeddings = {
    "roi":    np.array([0.9, 0.8, 0.1, 0.6]),
    "reine":  np.array([0.85, 0.75, 0.15, -0.4]),
    "homme":  np.array([0.9, 0.1, 0.1, 0.6]),
    "femme":  np.array([0.85, 0.1, 0.15, -0.4]),
    "chat":   np.array([0.1, 0.9, 0.8, 0.05]),
    "félin":  np.array([0.15, 0.85, 0.75, 0.1]),
    "voiture": np.array([0.05, 0.1, 0.05, 0.95]),
}

# ─────────────────────────────────────────────
# 2. VÉRIFIER L'ARITHMÉTIQUE DES EMBEDDINGS (rappel Module 2)
# ─────────────────────────────────────────────

resultat = embeddings["roi"] - embeddings["homme"] + embeddings["femme"]
print("roi - homme + femme =", np.round(resultat, 3))
print("reine               =", embeddings["reine"])

similarite = cosine_similarity([resultat], [embeddings["reine"]])[0][0]
print(f"\nSimilarité cosinus entre le résultat et 'reine' : {similarite:.4f}")
# Une similarité proche de 1 confirme que l'arithmétique fonctionne !

# ─────────────────────────────────────────────
# 3. COMPARER LES SIMILARITÉS ENTRE PLUSIEURS MOTS
# ─────────────────────────────────────────────

print("\nSimilarités cosinus (rappel Module 2, chapitre 2.1.3) :")
paires = [("chat", "félin"), ("chat", "voiture"), ("roi", "reine"), ("roi", "voiture")]
for mot1, mot2 in paires:
    sim = cosine_similarity([embeddings[mot1]], [embeddings[mot2]])[0][0]
    print(f"  {mot1:10s} vs {mot2:10s} : {sim:.3f}")

# ─────────────────────────────────────────────
# 4. VISUALISER LES EMBEDDINGS EN 2D AVEC PCA (rappel Module 3, chapitre 3.5)
# ─────────────────────────────────────────────

mots = list(embeddings.keys())
vecteurs = np.array(list(embeddings.values()))

pca = PCA(n_components=2)
vecteurs_2d = pca.fit_transform(vecteurs)

plt.figure(figsize=(9, 7))
plt.scatter(vecteurs_2d[:, 0], vecteurs_2d[:, 1], s=100, color="steelblue")
for i, mot in enumerate(mots):
    plt.annotate(mot, (vecteurs_2d[i, 0], vecteurs_2d[i, 1]),
                 fontsize=12, xytext=(5, 5), textcoords="offset points")
plt.title("Embeddings de Mots Projetés en 2D (via PCA, Module 3)")
plt.xlabel("Composante 1"); plt.ylabel("Composante 2")
plt.grid(alpha=0.3)
plt.show()

# ─────────────────────────────────────────────
# 5. EMBEDDINGS CONTEXTUELS RÉELS AVEC UN VRAI TRANSFORMER (BERT)
# ─────────────────────────────────────────────

from transformers import AutoTokenizer, AutoModel
import torch

tokenizer = AutoTokenizer.from_pretrained("bert-base-multilingual-cased")
modele = AutoModel.from_pretrained("bert-base-multilingual-cased")

def obtenir_embedding_contextuel(phrase, mot_cible):
    """Extrait l'embedding CONTEXTUEL d'un mot dans une phrase donnée."""
    inputs = tokenizer(phrase, return_tensors="pt")
    with torch.no_grad():
        outputs = modele(**inputs)
    # outputs.last_hidden_state contient un vecteur PAR TOKEN, contextuel
    tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
    for i, token in enumerate(tokens):
        if mot_cible.lower() in token.lower():
            return outputs.last_hidden_state[0, i].numpy()
    return None

emb_banque_riviere = obtenir_embedding_contextuel("La banque de la rivière est boueuse", "banque")
emb_banque_argent = obtenir_embedding_contextuel("Je retire de l'argent à la banque", "banque")

similarite_contextuelle = cosine_similarity([emb_banque_riviere], [emb_banque_argent])[0][0]
print(f"\nSimilarité entre les DEUX embeddings CONTEXTUELS de 'banque' : {similarite_contextuelle:.4f}")
print("(Une similarité plus faible que 1.0 confirme que le Transformer produit")
print(" bien des représentations DIFFÉRENTES selon le contexte, contrairement à Word2Vec)")
```

---

## 🏋️ EXERCICES — CHAPITRE 5.2

### Exercice 5.2.A — Calcul manuel de similarité cosinus sur des embeddings

Reprends la formule de similarité cosinus du Module 2 (chapitre 2.1.3). Avec `chat = [0.1, 0.9]` et `félin = [0.15, 0.85]`, calcule à la main leur similarité cosinus (arrondis à 3 décimales).

<details>
<summary>👉 Solution</summary>

```
Produit scalaire : (0.1×0.15) + (0.9×0.85) = 0.015 + 0.765 = 0.78

Norme de chat  : √(0.1² + 0.9²) = √(0.01+0.81) = √0.82 ≈ 0.9055
Norme de félin : √(0.15² + 0.85²) = √(0.0225+0.7225) = √0.745 ≈ 0.8631

Similarité cosinus = 0.78 / (0.9055 × 0.8631) = 0.78 / 0.7815 ≈ 0.998
```

Une similarité de 0.998, extrêmement proche de 1, confirme que ces deux embeddings représentent des concepts quasiment identiques — exactement ce qu'on attend pour "chat" et "félin".
</details>

### Exercice 5.2.B — CBOW ou Skip-gram ?

Pour chacune des tâches d'entraînement suivantes, indique s'il s'agit du principe CBOW ou Skip-gram :

1. À partir du mot "ordinateur", prédire les mots environnants "mon", "portable", "est", "rapide"
2. À partir des mots environnants "le", "___", "aboie", "fort", prédire le mot manquant "chien"

<details>
<summary>👉 Solution</summary>

```
1. SKIP-GRAM — on prédit le CONTEXTE à partir d'UN SEUL mot central
   ("ordinateur" → prédire les mots autour)

2. CBOW (Continuous Bag of Words) — on prédit UN SEUL mot à partir
   de son CONTEXTE ("le ___ aboie fort" → prédire "chien")
```
</details>

### Exercice 5.2.C — Statique ou contextuel ?

Pour chacun des scénarios suivants, indique si un embedding statique (type Word2Vec) serait suffisant, ou si un embedding contextuel (type Transformer) serait nécessaire :

1. Distinguer "avocat" (le fruit) de "avocat" (le métier juridique) dans deux phrases différentes
2. Construire un dictionnaire fixe de synonymes approximatifs, sans tenir compte du contexte des phrases
3. Comprendre le mot "vol" dans "le vol de l'oiseau" par opposition à "le vol du bijou"

<details>
<summary>👉 Solution</summary>

```
1. CONTEXTUEL nécessaire — le sens de "avocat" change radicalement selon
   la phrase, un embedding statique attribuerait le même vecteur aux
   deux sens complètement différents

2. STATIQUE suffisant — un dictionnaire de synonymes approximatifs,
   sans besoin de distinguer un contexte précis, correspond bien à
   l'usage typique des embeddings statiques comme Word2Vec

3. CONTEXTUEL nécessaire — même situation qu'en 1 : "vol" a deux sens
   très différents (voler dans les airs vs dérober), qui ne peuvent
   être distingués qu'en tenant compte du contexte de la phrase
```
</details>

### Exercice 5.2.D — Interpréter l'arithmétique des embeddings

Si `vecteur("Paris") - vecteur("France") + vecteur("Italie") ≈ vecteur("Rome")`, explique en une phrase quelle relation sémantique cette arithmétique vient de capturer, en te basant sur l'exemple "roi/reine" de ce chapitre.

<details>
<summary>👉 Solution</summary>

Cette arithmétique capture la relation sémantique **"capitale de"** : la direction qui sépare "France" de "Paris" dans l'espace des embeddings représente le concept abstrait "être la capitale de ce pays". Appliquer cette même direction à "Italie" nous rapproche logiquement de "Rome", sa capitale — exactement le même principe que la relation "royauté" capturée entre "Homme" et "Roi" dans l'exemple du chapitre, appliquée ici à une relation géographique plutôt que de genre/statut social.
</details>

---

---

# 📘 CHAPITRE 5.3 — L'ARCHITECTURE TRANSFORMER ET LE MÉCANISME D'ATTENTION

## Durée : 2 semaines

---

## 📖 EXPLICATION

### Rappel : pourquoi les RNN/LSTM ne suffisaient pas

Rappelle-toi le Module 4, chapitre 4.6 : les RNN et LSTM traitent une séquence **étape par étape**, ce qui pose deux problèmes majeurs — l'impossibilité de paralléliser le calcul sur un GPU (chaque étape dépend de la précédente), et la difficulté à capturer des dépendances entre des mots très éloignés dans une longue séquence (le gradient qui disparaît). L'architecture **Transformer**, présentée en 2017, résout ces deux problèmes avec une idée radicalement différente : au lieu de faire circuler l'information séquentiellement, **chaque mot regarde directement tous les autres mots simultanément**, via un mécanisme appelé **attention**.

---

### L'Intuition du Mécanisme d'Attention

**🔑 Intuition — une salle de classe qui pose des questions**

Imagine une salle de classe où chaque élève (chaque mot de la phrase) doit comprendre son propre rôle dans le contexte global. Pour cela, chaque élève **pose une question** ("Qui, dans cette classe, a de l'information pertinente pour moi ?"), et chaque élève **peut répondre** en indiquant ce qu'il "sait" et ce qu'il "propose comme information".

Le mécanisme d'attention formalise exactement ce processus avec trois rôles pour chaque mot, calculés à partir de son embedding (Chapitre 5.2) :

```
🔑 Query (Q)  : "Ce que je cherche" — la question que pose ce mot
🔑 Key (K)    : "Ce que je suis"    — comment ce mot se présente aux autres
🔑 Value (V)  : "Ce que je contiens" — l'information que ce mot peut apporter
```

**Comment sont calculés Q, K et V ?** Simplement en multipliant l'embedding de chaque mot par trois matrices de poids **apprises** pendant l'entraînement (`W_Q`, `W_K`, `W_V`) — exactement une multiplication matricielle, comme celle que tu as apprise au Module 2, chapitre 2.1.5 !

---

### Le Calcul de l'Attention, Étape par Étape

**🔑 Intuition — comment un mot "regarde" les autres**

Pour déterminer combien d'attention un mot doit accorder à chaque autre mot de la phrase, on compare la **Query** de ce mot avec la **Key** de chaque autre mot, en utilisant... le produit scalaire (Module 2, chapitre 2.1.3) ! Rappelle-toi : le produit scalaire mesure à quel point deux vecteurs "pointent dans la même direction" — plus il est élevé, plus la Query et la Key sont "compatibles", et plus ce mot devrait recevoir d'attention.

```
🔑 Les étapes du calcul de l'Attention :

1. Calculer les scores : Query · Key (produit scalaire, pour chaque paire de mots)
2. Mettre à l'échelle : diviser par √(dimension des vecteurs) pour stabiliser
   les calculs (évite que les scores deviennent trop grands)
3. Appliquer Softmax (rappel Module 1 et 2, chapitre 2.3.6) sur ces scores,
   pour les transformer en "poids d'attention" qui somment à 1
4. Calculer une SOMME PONDÉRÉE des Values, en utilisant ces poids d'attention
   comme coefficients
```

**📐 La formule complète (pour information, tu as déjà compris chaque composant séparément)**

```
Attention(Q, K, V) = softmax(Q · K^T / √dk) · V
```

Chaque symbole t'est déjà familier : `Q · K^T` est un produit matriciel (Module 2, 2.1.5), `√dk` est une simple mise à l'échelle, `softmax` transforme des scores en probabilités (Module 1, 1.2 ; Module 2, 2.3.6), et la multiplication finale par `V` est encore un produit matriciel.

---

### Un Exemple Calculé à la Main, Complet

**🔑 Calculons l'attention pour un mot, pas à pas**

Prenons une phrase ultra-simplifiée : "Le chat dort", avec des embeddings volontairement réduits à 2 dimensions pour que le calcul reste faisable à la main, et en simplifiant `W_Q = W_K = W_V = Identité` (donc `Q = K = V` = l'embedding lui-même — dans un vrai Transformer, ces matrices sont apprises, mais cette simplification nous permet de nous concentrer sur le mécanisme d'attention lui-même).

```
Embeddings :
"Le"   = [1, 0]
"chat" = [0, 1]
"dort" = [1, 1]
```

**Calculons l'attention pour le mot "chat"** (donc `Query_chat = [0, 1]`), envers tous les mots de la phrase (leurs `Keys`).

**Étape 1 — Scores bruts (produit scalaire Query · Key)**

```
score(chat, Le)   = [0,1] · [1,0] = (0×1)+(1×0) = 0
score(chat, chat) = [0,1] · [0,1] = (0×0)+(1×1) = 1
score(chat, dort) = [0,1] · [1,1] = (0×1)+(1×1) = 1
```

**Étape 2 — Mise à l'échelle** (division par `√dk`, ici `dk=2`, donc `√2 ≈ 1.414`)

```
score_échelle(chat, Le)   = 0 / 1.414 = 0
score_échelle(chat, chat) = 1 / 1.414 ≈ 0.707
score_échelle(chat, dort) = 1 / 1.414 ≈ 0.707
```

**Étape 3 — Softmax** (rappel Module 2, chapitre 2.3.6)

```
exp(0) = 1
exp(0.707) ≈ 2.028
exp(0.707) ≈ 2.028

Somme = 1 + 2.028 + 2.028 = 5.056

poids(Le)   = 1 / 5.056 ≈ 0.198
poids(chat) = 2.028 / 5.056 ≈ 0.401
poids(dort) = 2.028 / 5.056 ≈ 0.401
```

**Étape 4 — Somme pondérée des Values**

```
sortie(chat) = 0.198×[1,0] + 0.401×[0,1] + 0.401×[1,1]
             = [0.198, 0] + [0, 0.401] + [0.401, 0.401]
             = [0.599, 0.802]
```

**💡 Interprétation du résultat :** le mot "chat" accorde presque deux fois plus d'attention à lui-même et à "dort" (poids ≈0.401 chacun) qu'au mot "Le" (poids ≈0.198) — ce qui correspond bien à l'intuition : l'article "Le" porte peu d'information sémantique utile pour comprendre "chat" dans son contexte, contrairement au verbe "dort" qui lui est directement lié.

**Ce nouveau vecteur `[0.599, 0.802]` remplace l'ancien embedding "brut" de "chat"** — c'est maintenant un embedding **contextuel** (rappel Chapitre 5.2), qui a "absorbé" de l'information des autres mots de la phrase.

---

### Multi-Head Attention : plusieurs "regards" simultanés

**🔑 Intuition**

Pourquoi se contenter d'un seul calcul d'attention ? Un mot peut avoir plusieurs types de relations pertinentes simultanément avec les autres mots — une relation grammaticale (sujet/verbe), une relation sémantique (synonymes, thèmes proches), une relation de proximité positionnelle. La **Multi-Head Attention** effectue **plusieurs calculs d'attention en parallèle** (typiquement 8, 16, voire plus selon les modèles), chacun avec ses propres matrices `W_Q`, `W_K`, `W_V` apprises séparément — un peu comme demander à plusieurs experts différents d'analyser la même phrase, chacun avec une perspective légèrement différente, puis combiner leurs analyses.

---

### Le Positional Encoding : réintroduire la notion d'ordre

**🔑 Intuition — le problème du "sac de mots"**

Voici un détail crucial et souvent surprenant : le mécanisme d'attention, tel que décrit ci-dessus, **traite tous les mots simultanément, sans aucune notion native d'ordre** ! Si on mélangeait l'ordre des mots d'une phrase, le calcul d'attention entre chaque paire de mots donnerait exactement le même résultat — le Transformer serait incapable, par défaut, de distinguer "le chat mange la souris" de "la souris mange le chat" !

**La solution : le Positional Encoding.** On ajoute à chaque embedding un vecteur supplémentaire, spécifique à la **position** du mot dans la séquence (1er mot, 2e mot, 3e mot...), avant même de calculer l'attention. Cette information positionnelle, combinée à l'embedding sémantique du mot, permet au Transformer de "savoir" où se situe chaque mot dans la phrase, tout en conservant les avantages de la parallélisation totale du calcul de l'attention.

---

### L'Architecture Complète : Encoder, Decoder, et leurs Variantes

**🔑 Intuition**

Le Transformer original (2017) comportait deux grands blocs : un **Encoder** (qui lit et comprend l'entrée entière) et un **Decoder** (qui génère la sortie mot par mot, en s'appuyant sur ce que l'Encoder a compris) — utile par exemple pour la traduction automatique.

```
🔑 Architecture ENCODER-DECODER (ex: traduction) :
   Texte source → [ENCODER : comprend le texte entier] →
   → [DECODER : génère la traduction mot par mot] → Texte traduit

🔑 Architecture ENCODER-ONLY (ex: BERT, Module 0) :
   Utilisée pour COMPRENDRE un texte (classification, extraction
   d'information) — pas pour en générer un nouveau

🔑 Architecture DECODER-ONLY (ex: GPT, Claude — tous les LLMs génératifs modernes) :
   Utilisée pour GÉNÉRER du texte, un token à la fois, en se basant
   uniquement sur les tokens déjà générés précédemment (rappel Module 0)
```

**💡 Pourquoi la majorité des LLMs modernes (GPT, Claude, Mistral...) utilisent une architecture Decoder-only ?** Parce que leur objectif principal est la **génération de texte** — prédire le prochain token, encore et encore (approfondi au Chapitre 5.4). Cette architecture simplifiée s'est révélée remarquablement efficace et facile à faire monter en échelle (scaler) vers des tailles gigantesques.

---

## 💻 MISE EN PRATIQUE

```python
import torch
import torch.nn as nn
import numpy as np
import matplotlib.pyplot as plt

# ─────────────────────────────────────────────
# 1. IMPLÉMENTER L'ATTENTION FROM SCRATCH — retrouver notre calcul à la main !
# ─────────────────────────────────────────────

def self_attention(Q, K, V):
    """Implémente exactement la formule Attention(Q,K,V) = softmax(QK^T/√dk)V"""
    dk = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(dk)              # Étapes 1-2 : scores + mise à l'échelle
    poids = torch.softmax(torch.tensor(scores), dim=-1).numpy()   # Étape 3 : softmax
    sortie = poids @ V                           # Étape 4 : somme pondérée
    return sortie, poids

# Nos embeddings de l'exemple à la main
embeddings = np.array([
    [1, 0],   # "Le"
    [0, 1],   # "chat"
    [1, 1],   # "dort"
])

# Simplification : Q = K = V = embeddings (comme dans notre calcul à la main)
sortie, poids_attention = self_attention(embeddings, embeddings, embeddings)

print("Poids d'attention (chaque LIGNE = un mot, chaque COLONNE = attention portée à) :")
print(np.round(poids_attention, 3))
print(f"\nVérification : pour 'chat', poids ≈ {np.round(poids_attention[1], 3)}")
print("(doit retrouver environ [0.198, 0.401, 0.401], notre calcul à la main !)")

print(f"\nSortie contextuelle pour 'chat' : {np.round(sortie[1], 3)}")
print("(doit retrouver environ [0.599, 0.802])")

# ─────────────────────────────────────────────
# 2. VISUALISER LA MATRICE D'ATTENTION
# ─────────────────────────────────────────────

mots = ["Le", "chat", "dort"]
plt.figure(figsize=(6, 5))
plt.imshow(poids_attention, cmap="Blues")
plt.xticks(range(3), mots); plt.yticks(range(3), mots)
plt.xlabel("Mots ATTENDUS (Key)"); plt.ylabel("Mots QUI REGARDENT (Query)")
plt.title("Matrice d'Attention")
for i in range(3):
    for j in range(3):
        plt.text(j, i, f"{poids_attention[i,j]:.2f}", ha="center", va="center")
plt.colorbar(label="Poids d'attention")
plt.tight_layout()
plt.show()

# ─────────────────────────────────────────────
# 3. UTILISER nn.MultiheadAttention DE PYTORCH (rappel Module 4)
# ─────────────────────────────────────────────

embed_dim, n_heads = 8, 2
attention_layer = nn.MultiheadAttention(embed_dim=embed_dim, num_heads=n_heads, batch_first=True)

# Une séquence de 5 tokens, embeddings de dimension 8
sequence = torch.rand(1, 5, embed_dim)  # (batch, longueur_sequence, dimension)
sortie, poids = attention_layer(sequence, sequence, sequence)  # Q=K=V=sequence (self-attention)

print(f"\nForme de la sortie : {sortie.shape}")   # (1, 5, 8) — même forme que l'entrée !
print(f"Forme des poids d'attention : {poids.shape}")  # (1, 5, 5) — attention entre chaque paire

# ─────────────────────────────────────────────
# 4. EXPLORER L'ATTENTION D'UN VRAI TRANSFORMER (BERT)
# ─────────────────────────────────────────────

from transformers import AutoTokenizer, AutoModel

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
modele = AutoModel.from_pretrained("bert-base-uncased", output_attentions=True)

phrase = "The cat sat on the mat"
inputs = tokenizer(phrase, return_tensors="pt")
with torch.no_grad():
    outputs = modele(**inputs)

# outputs.attentions contient les poids d'attention de CHAQUE couche et CHAQUE tête
attention_derniere_couche = outputs.attentions[-1][0, 0].numpy()  # 1ère tête, dernière couche
tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])

plt.figure(figsize=(7, 6))
plt.imshow(attention_derniere_couche, cmap="viridis")
plt.xticks(range(len(tokens)), tokens, rotation=45)
plt.yticks(range(len(tokens)), tokens)
plt.title("Attention Réelle dans BERT (dernière couche, 1ère tête)")
plt.colorbar()
plt.tight_layout()
plt.show()
```

---

## 🏋️ EXERCICES — CHAPITRE 5.3

### Exercice 5.3.A — Calculer l'attention à la main pour un autre mot

En reprenant exactement l'exemple à la main de ce chapitre (`"Le"=[1,0]`, `"chat"=[0,1]`, `"dort"=[1,1]`, `W_Q=W_K=W_V=Identité`), calcule cette fois l'attention pour le mot **"dort"** (donc `Query_dort = [1,1]`) envers tous les mots de la phrase, en suivant les 4 étapes détaillées dans ce chapitre.

<details>
<summary>👉 Solution</summary>

```
Étape 1 — Scores bruts (Query_dort · Key) :
score(dort, Le)   = [1,1]·[1,0] = 1
score(dort, chat) = [1,1]·[0,1] = 1
score(dort, dort) = [1,1]·[1,1] = 2

Étape 2 — Mise à l'échelle (÷√2 ≈ 1.414) :
score_échelle(dort, Le)   = 1/1.414 ≈ 0.707
score_échelle(dort, chat) = 1/1.414 ≈ 0.707
score_échelle(dort, dort) = 2/1.414 ≈ 1.414

Étape 3 — Softmax :
exp(0.707) ≈ 2.028
exp(0.707) ≈ 2.028
exp(1.414) ≈ 4.113
Somme = 2.028 + 2.028 + 4.113 = 8.169

poids(Le)   = 2.028/8.169 ≈ 0.248
poids(chat) = 2.028/8.169 ≈ 0.248
poids(dort) = 4.113/8.169 ≈ 0.504

Étape 4 — Somme pondérée des Values :
sortie(dort) = 0.248×[1,0] + 0.248×[0,1] + 0.504×[1,1]
             = [0.248,0] + [0,0.248] + [0.504,0.504]
             = [0.752, 0.752]
```

Sans surprise, "dort" accorde plus de la moitié de son attention (0.504) à lui-même, et une attention égale (0.248 chacun) à "Le" et "chat".
</details>

### Exercice 5.3.B — Pourquoi le Positional Encoding ?

Explique pourquoi le mécanisme d'attention seul (sans Positional Encoding) donnerait exactement le même résultat pour "le chat mange la souris" et "la souris mange le chat", et pourquoi c'est problématique.

<details>
<summary>👉 Solution</symmary>

Le mécanisme d'attention calcule les scores entre chaque paire de mots via un produit scalaire entre leurs vecteurs Query et Key, **indépendamment de leur position** dans la séquence — il traite l'ensemble des mots un peu comme un "sac de mots" où seule l'identité de chaque mot compte, pas son emplacement. Si on permute l'ordre des mots dans "le chat mange la souris" pour obtenir "la souris mange le chat", les MÊMES mots sont présents, donc les MÊMES scores d'attention seraient calculés entre chaque paire — le Transformer ne pourrait alors pas distinguer ces deux phrases, alors qu'elles ont un sens radicalement différent (qui mange qui !). C'est précisément pour résoudre ce problème que le Positional Encoding ajoute une information spécifique à la position de chaque mot, permettant au modèle de différencier ces deux phrases.
</details>

### Exercice 5.3.C — Encoder-only, Decoder-only, ou Encoder-Decoder ?

Pour chacune des tâches suivantes, indique quelle architecture de Transformer serait la plus adaptée :

1. Classifier un avis client comme positif ou négatif
2. Traduire un texte de l'anglais vers le français
3. Générer la suite d'une histoire à partir de son introduction

<details>
<summary>👉 Solution</summary>

```
1. ENCODER-ONLY (type BERT) — il s'agit de COMPRENDRE un texte entier
   pour en extraire une classification, pas de générer du nouveau texte

2. ENCODER-DECODER — architecture historiquement conçue précisément
   pour la traduction : l'Encoder comprend le texte source dans son
   intégralité, le Decoder génère la traduction mot par mot

3. DECODER-ONLY (type GPT/Claude) — génération de texte séquentielle,
   token par token, en s'appuyant sur ce qui a déjà été généré —
   exactement le cas d'usage principal des LLMs génératifs modernes
```
</details>

### Exercice 5.3.D — L'intérêt du Multi-Head Attention

Explique avec tes propres mots pourquoi utiliser 8 "têtes" d'attention en parallèle peut capturer plus d'information qu'une seule tête d'attention, en te référant à l'analogie de ce chapitre.

<details>
<summary>👉 Solution</summary>

Une seule tête d'attention n'apprend qu'un seul "type de relation" entre les mots (par exemple, uniquement des relations de proximité sémantique). Or, une phrase peut contenir simultanément plusieurs types de relations pertinentes entre ses mots — grammaticales (sujet/verbe), sémantiques (synonymes, thèmes), positionnelles (mots proches physiquement). En utilisant plusieurs têtes d'attention en parallèle, chacune avec ses propres matrices `W_Q`, `W_K`, `W_V` apprises indépendamment, le modèle peut apprendre à capturer **plusieurs de ces relations différentes simultanément** — un peu comme consulter plusieurs experts qui analysent chacun la même phrase sous un angle différent, puis combiner toutes leurs analyses pour obtenir une compréhension plus riche et plus complète que ce qu'un seul "regard" pourrait fournir.
</details>

---

---

# 📘 CHAPITRE 5.4 — COMMENT UN LLM GÉNÈRE DU TEXTE

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Rappel : la Distribution de Probabilité sur le Prochain Token

Rappelle-toi le Module 2, chapitre 2.3.6 : à chaque étape, un LLM (architecture Decoder-only, Chapitre 5.3) ne "choisit" pas directement un mot — il calcule d'abord, via Softmax, une **distribution de probabilité complète** sur l'ensemble de son vocabulaire de tokens (Chapitre 5.1). Ce chapitre détaille **comment** cette distribution est ensuite utilisée pour effectivement sélectionner le prochain token, et comment ce processus se répète pour générer un texte entier.

---

### La Génération Autorégressive : un token à la fois

**🔑 Intuition**

Le terme "autorégressif" signifie simplement que **chaque nouveau token généré dépend de tous les tokens précédemment générés** (y compris le prompt initial). Le processus complet ressemble à ceci :

```
🔑 Cycle de génération autorégressive :

1. Le modèle reçoit le prompt (+ les tokens déjà générés, s'il y en a)
2. Il calcule une distribution de probabilité sur le prochain token
3. Une stratégie de sélection (voir ci-dessous) choisit UN token
4. Ce token est ajouté à la séquence
5. On retourne à l'étape 1, avec cette séquence désormais plus longue
6. On répète jusqu'à un token de fin, ou une longueur maximale atteinte
```

C'est ce cycle, répété potentiellement des centaines ou milliers de fois, qui produit une réponse complète, token après token — et c'est également pourquoi les LLMs génèrent souvent leur réponse "progressivement", visible à l'écran (le "streaming" mentionné au Module 0 et 6).

---

### Les Stratégies de Sélection du Prochain Token

**🔑 Intuition — comment choisir parmi la distribution de probabilité**

Une fois la distribution de probabilité calculée, il existe plusieurs stratégies différentes pour effectivement choisir le token suivant, chacune avec ses avantages et inconvénients.

**Greedy Search (recherche gourmande) — toujours le plus probable**

La stratégie la plus simple : choisir systématiquement le token ayant la probabilité la plus élevée. Rapide et déterministe (toujours la même réponse pour un même prompt), mais peut produire des textes répétitifs ou peu naturels — le choix "localement optimal" à chaque étape n'est pas toujours celui qui mène à la meilleure phrase globale.

**Beam Search (recherche en faisceau) — explorer plusieurs pistes simultanément**

Plutôt que de ne considérer qu'un seul chemin (le token le plus probable à chaque étape), le Beam Search maintient plusieurs séquences candidates simultanément (par exemple, les 5 séquences les plus prometteuses), et ne garde à la fin que celle avec la probabilité globale la plus élevée sur l'ensemble de la séquence générée. Cela évite certains pièges du Greedy Search (un bon choix immédiat qui mène pourtant à une impasse plus loin), mais reste coûteux en calcul et peut aussi produire des textes génériques et peu créatifs.

**Sampling (échantillonnage) — introduire de l'aléatoire**

Plutôt que de toujours choisir le token le plus probable, on **tire au sort** le prochain token selon la distribution de probabilité elle-même — un token avec 30% de probabilité a 30% de chances d'être choisi, un token à 5% a 5% de chances, etc. (rappel Module 2, chapitre 2.3.2 : les variables aléatoires). Cela introduit de la variété et de la créativité, mais aussi un risque de choisir occasionnellement un token peu probable, menant potentiellement à des incohérences.

**Top-k Sampling — limiter le tirage aux k choix les plus probables**

Un compromis : on ne tire au sort que parmi les **k tokens les plus probables** (par exemple, les 50 tokens en tête), en ignorant complètement la longue traîne des tokens peu probables. Cela conserve de la variété tout en évitant les choix trop improbables et incohérents.

**Top-p / Nucleus Sampling — un seuil dynamique**

Plutôt qu'un nombre fixe de candidats (Top-k), le Top-p sélectionne le plus petit ensemble de tokens dont la somme des probabilités atteint un seuil `p` (par exemple, 90%). C'est plus adaptatif : si la distribution est très "pointue" (un token domine largement), peu de candidats seront considérés ; si elle est plus "plate" (plusieurs tokens ont des probabilités comparables), davantage de candidats seront inclus — le nombre de candidats s'ajuste dynamiquement à chaque étape, contrairement au Top-k qui garde toujours le même nombre fixe.

---

### La Température : rappel et approfondissement du Module 2

Rappelle-toi le Module 2, chapitre 2.3.6 et le Module 0 : la **température** modifie la distribution de probabilité **avant** l'application de ces stratégies de sélection, en "aplatissant" ou en "accentuant" les différences entre les probabilités.

```
🔑 Rappel de la formule (Module 2) :
   probabilité_ajustée = softmax(logits / température)

Température BASSE (proche de 0) → distribution très "pointue"
   → le token le plus probable domine encore plus fortement
   → réponses plus déterministes et cohérentes, mais potentiellement répétitives

Température HAUTE (proche de 1 ou plus) → distribution plus "plate"
   → les tokens moins probables ont une chance plus significative d'être choisis
   → réponses plus créatives et variées, mais risque accru d'incohérences
   ou d'hallucinations (rappel Module 0)
```

**💡 En pratique :** la température et les stratégies de sélection (Top-k, Top-p) se combinent souvent ensemble — par exemple, une température modérée combinée à un Top-p de 0.9 est une configuration très courante dans les APIs de LLMs (Module 0, 6), offrant un bon compromis entre cohérence et créativité.

---

## 💻 MISE EN PRATIQUE

```python
import torch
import numpy as np
import matplotlib.pyplot as plt
from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("gpt2")
modele = AutoModelForCausalLM.from_pretrained("gpt2")
modele.eval()

prompt = "The future of artificial intelligence is"
inputs = tokenizer(prompt, return_tensors="pt")

# ─────────────────────────────────────────────
# 1. VISUALISER LA DISTRIBUTION DE PROBABILITÉ DU PROCHAIN TOKEN
# ─────────────────────────────────────────────

with torch.no_grad():
    outputs = modele(**inputs)
    logits = outputs.logits[0, -1, :]     # logits du DERNIER token de la séquence
    probas = torch.softmax(logits, dim=-1)

top_10_indices = torch.topk(probas, 10).indices
top_10_probas = torch.topk(probas, 10).values
top_10_tokens = [tokenizer.decode([idx]) for idx in top_10_indices]

plt.figure(figsize=(10, 5))
plt.bar(top_10_tokens, top_10_probas.numpy(), color="steelblue")
plt.title(f"Distribution de Probabilité du Prochain Token\nPrompt: '{prompt}'")
plt.ylabel("Probabilité")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# ─────────────────────────────────────────────
# 2. COMPARER GREEDY, SAMPLING ET TEMPÉRATURE
# ─────────────────────────────────────────────

print("=== GREEDY SEARCH (déterministe) ===")
sortie_greedy = modele.generate(**inputs, max_new_tokens=20, do_sample=False)
print(tokenizer.decode(sortie_greedy[0], skip_special_tokens=True))

print("\n=== SAMPLING avec température BASSE (0.3) ===")
sortie_temp_basse = modele.generate(**inputs, max_new_tokens=20, do_sample=True,
                                     temperature=0.3, top_k=50)
print(tokenizer.decode(sortie_temp_basse[0], skip_special_tokens=True))

print("\n=== SAMPLING avec température ÉLEVÉE (1.5) ===")
sortie_temp_haute = modele.generate(**inputs, max_new_tokens=20, do_sample=True,
                                     temperature=1.5, top_k=50)
print(tokenizer.decode(sortie_temp_haute[0], skip_special_tokens=True))

# ─────────────────────────────────────────────
# 3. COMPARER TOP-K ET TOP-P (NUCLEUS SAMPLING)
# ─────────────────────────────────────────────

print("\n=== TOP-K SAMPLING (k=10) ===")
sortie_topk = modele.generate(**inputs, max_new_tokens=20, do_sample=True,
                              top_k=10, temperature=0.8)
print(tokenizer.decode(sortie_topk[0], skip_special_tokens=True))

print("\n=== TOP-P / NUCLEUS SAMPLING (p=0.9) ===")
sortie_topp = modele.generate(**inputs, max_new_tokens=20, do_sample=True,
                              top_p=0.9, temperature=0.8)
print(tokenizer.decode(sortie_topp[0], skip_special_tokens=True))

# ─────────────────────────────────────────────
# 4. IMPLÉMENTER TOP-K FROM SCRATCH (pour bien comprendre le mécanisme)
# ─────────────────────────────────────────────

def top_k_sampling(probas, k=10):
    """Sélectionne un token parmi les k plus probables, selon leurs probabilités relatives."""
    top_k_probas, top_k_indices = torch.topk(probas, k)
    top_k_probas_normalisees = top_k_probas / top_k_probas.sum()  # renormaliser pour sommer à 1
    choix = torch.multinomial(top_k_probas_normalisees, num_samples=1)
    return top_k_indices[choix].item()

token_choisi = top_k_sampling(probas, k=10)
print(f"\nToken choisi par notre Top-K from scratch : '{tokenizer.decode([token_choisi])}'")
```

---

## 🏋️ EXERCICES — CHAPITRE 5.4

### Exercice 5.4.A — Comparer les stratégies de génération

Pour chacun des cas d'usage suivants, recommande une stratégie de génération (Greedy, Sampling avec température basse, ou Sampling avec température élevée), en justifiant :

1. Générer du code informatique, où la précision syntaxique est critique
2. Écrire un poème créatif et original
3. Répondre à une question factuelle simple ("Quelle est la capitale de la France ?")

<details>
<summary>👉 Solution</summary>

```
1. GREEDY (ou température très basse) — le code doit être syntaxiquement
   précis et cohérent ; la créativité n'est pas souhaitable ici, on
   veut la réponse la plus "sûre" et probable à chaque étape

2. SAMPLING avec température ÉLEVÉE — la créativité et l'originalité
   sont explicitement recherchées pour un poème, on accepte le risque
   de choix moins probables pour obtenir plus de variété et de surprise

3. GREEDY (ou température très basse) — une question factuelle a
   généralement UNE bonne réponse, on veut la réponse la plus fiable
   et cohérente, sans risquer d'introduire de variation inutile ou
   d'erreur par excès de créativité
```
</details>

### Exercice 5.4.B — Top-k vs Top-p

Explique la différence fondamentale entre Top-k Sampling et Top-p (Nucleus) Sampling, et donne un exemple de situation où cette différence aurait un impact concret sur les tokens considérés.

<details>
<summary>👉 Solution</summary>

Top-k sélectionne toujours un **nombre fixe** de candidats (par exemple, toujours les 10 tokens les plus probables), peu importe la forme de la distribution de probabilité. Top-p sélectionne un **nombre variable** de candidats, déterminé dynamiquement par le plus petit ensemble dont la somme des probabilités atteint le seuil `p`.

**Exemple concret :** si la distribution est très "pointue" (un seul token a 95% de probabilité, tous les autres se partagent les 5% restants), Top-p=0.9 ne sélectionnerait probablement qu'un seul token (déjà au-dessus du seuil de 90%), tandis que Top-k=10 inclurait quand même 10 tokens, dont plusieurs auraient des probabilités quasi-nulles et peu pertinentes — Top-p s'adapte donc mieux à la "forme" réelle de la distribution à chaque étape, contrairement à Top-k qui reste rigide.
</details>

### Exercice 5.4.C — Calcul de température

Rappelle-toi l'exercice du Module 2, chapitre 2.3.6. Avec des logits `[3.0, 1.0, 0.5]`, calcule la distribution softmax résultante avec une température de 0.5, puis avec une température de 2.0 (arrondis à 3 décimales). Que remarques-tu ?

<details>
<summary>👉 Solution</summary>

```python
import numpy as np

def softmax_temperature(logits, temp):
    logits = np.array(logits) / temp
    exp_logits = np.exp(logits - np.max(logits))
    return exp_logits / exp_logits.sum()

print("Température 0.5:", np.round(softmax_temperature([3.0, 1.0, 0.5], 0.5), 3))
print("Température 2.0:", np.round(softmax_temperature([3.0, 1.0, 0.5], 2.0), 3))
```

```
Température 0.5 : [0.947, 0.048, 0.005]  → distribution très CONCENTRÉE
Température 2.0 : [0.596, 0.242, 0.163]  → distribution plus PLATE/étalée
```

Avec une température basse (0.5), le token le plus probable (0.947) domine encore plus fortement qu'avec les logits d'origine. Avec une température haute (2.0), les probabilités sont beaucoup plus proches les unes des autres (0.596, 0.242, 0.163) — les tokens moins probables ont une chance nettement plus significative d'être sélectionnés, confirmant exactement l'intuition présentée dans ce chapitre.
</details>

### Exercice 5.4.D — Comprendre la génération autorégressive

Explique pourquoi une erreur commise tôt dans une génération autorégressive (par exemple, un token peu pertinent choisi à la 3e position) peut avoir un impact sur toute la suite du texte généré.

<details>
<summary>👉 Solution</summary>

Dans la génération autorégressive, chaque nouveau token est calculé en se basant sur **tous** les tokens précédemment générés, y compris ceux ajoutés par le modèle lui-même à chaque étape antérieure. Si un token peu pertinent ou incohérent est choisi tôt dans la séquence, tous les tokens suivants seront générés en tenant compte de ce choix "défaillant", potentiellement en essayant de justifier ou de poursuivre logiquement à partir de cette erreur initiale — un effet parfois appelé "dérive" ou "effet boule de neige" dans la génération de texte. C'est une des raisons pour lesquelles les stratégies comme le Beam Search (qui explore plusieurs pistes simultanément plutôt qu'un seul chemin) peuvent parfois éviter ce genre de piège, en évaluant la cohérence globale de plusieurs séquences candidates plutôt que de s'engager irrémédiablement sur un seul chemin dès le début.
</details>

---

---

# 📘 CHAPITRE 5.5 — PRÉ-ENTRAÎNEMENT ET FINE-TUNING DES LLMS

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### Rappel : le Pré-entraînement, en profondeur

Rappelle-toi le Module 0 : un LLM est d'abord **pré-entraîné** sur d'immenses quantités de texte, avant d'être éventuellement spécialisé par Fine-Tuning (Module 0, 6). Ce chapitre détaille précisément **ce que le modèle apprend concrètement** pendant cette phase, et **comment** on peut ensuite l'adapter efficacement à des besoins spécifiques.

**🔑 Intuition de l'objectif du pré-entraînement (architecture Decoder-only, GPT-like)**

Le pré-entraînement d'un LLM génératif comme GPT repose sur une tâche étonnamment simple, mais extraordinairement puissante à grande échelle : **prédire le prochain token**, encore et encore, sur des milliards de phrases. Pour chaque texte du corpus d'entraînement, le modèle voit un fragment et doit prédire le mot suivant — exactement le mécanisme de génération vu au Chapitre 5.4, mais utilisé ici comme **signal d'entraînement** plutôt que comme objectif final.

```
🔑 Exemple d'exemple d'entraînement :

Texte : "Le chat dort sur le canapé"

Exemple 1 : "Le" → prédire "chat"
Exemple 2 : "Le chat" → prédire "dort"
Exemple 3 : "Le chat dort" → prédire "sur"
Exemple 4 : "Le chat dort sur" → prédire "le"
Exemple 5 : "Le chat dort sur le" → prédire "canapé"
```

**💡 Pourquoi cette tâche apparemment simple produit-elle des modèles si capables ?** Parce que pour bien prédire le mot suivant dans **n'importe quel** contexte possible, le modèle doit implicitement développer une compréhension profonde de la grammaire, des faits du monde, du raisonnement logique, voire du code informatique — toute information utile pour anticiper correctement la suite d'un texte. C'est en s'entraînant sur des milliards de ces exemples, à travers d'immenses quantités de texte variées, que ces capacités émergent progressivement, sans jamais avoir été explicitement programmées.

**BERT (architecture Encoder-only, Chapitre 5.3)** utilise un objectif de pré-entraînement légèrement différent, le **Masked Language Modeling** : certains mots du texte sont aléatoirement masqués, et le modèle doit deviner quel mot manquant a été retiré, en s'appuyant sur le contexte **des deux côtés** du mot masqué (avant ET après) — ce qui en fait un modèle particulièrement adapté aux tâches de compréhension, plutôt que de génération pure.

---

### Le Fine-Tuning Classique : rappel et coût

Rappelle-toi le Module 0 : le Fine-Tuning consiste à poursuivre l'entraînement d'un modèle déjà pré-entraîné, sur un jeu de données spécifique à une tâche ou un domaine (rappel Module 4, chapitre 4.5 : exactement le même principe que le Transfer Learning appliqué aux CNN !).

**Le problème du Full Fine-Tuning classique** : réentraîner **tous** les paramètres d'un LLM (qui peut en compter des dizaines de milliards) nécessite une quantité de mémoire GPU absolument considérable, souvent hors de portée pour la plupart des entreprises ou des particuliers.

---

### LoRA et QLoRA : le Fine-Tuning Efficace en Profondeur

**🔑 Intuition — pourquoi ajuster TOUS les poids n'est pas nécessaire**

Rappelle-toi le Module 2, chapitre 2.1.8 : les matrices de poids d'un réseau peuvent souvent être décrites efficacement par un nombre de "directions importantes" bien plus petit que leur taille totale (l'intuition derrière les valeurs propres et la PCA du Module 3). **LoRA (Low-Rank Adaptation)** exploite une intuition similaire pour le Fine-Tuning : au lieu de modifier directement les immenses matrices de poids originales du modèle, on ajoute, à côté de chaque matrice de poids importante, **deux petites matrices supplémentaires**, dont le produit approxime les ajustements nécessaires pour la nouvelle tâche.

```
🔑 Principe de LoRA :

Poids originaux du modèle (GELÉS, jamais modifiés) : matrice W, immense
Nouvel ajustement appris : deux PETITES matrices A et B, telles que
  A × B ≈ l'ajustement nécessaire à W pour la nouvelle tâche

Pendant l'inférence : sortie = (W + A×B) × entrée
```

**💡 Pourquoi c'est si efficace :** si `W` est une matrice de taille 4096×4096 (environ 16.7 millions de paramètres), les matrices `A` et `B` de LoRA peuvent être, par exemple, de taille 4096×8 et 8×4096 — soit seulement environ 65 000 paramètres à entraîner, **moins de 0.4% du nombre de paramètres originaux** ! Rappelle-toi l'exemple concret déjà donné au Module 0 : fine-tuner Mistral-7B avec LoRA ne nécessite d'entraîner que 0.11% des paramètres totaux du modèle.

**QLoRA** pousse cette efficacité encore plus loin en combinant LoRA avec la **quantification** : les poids originaux du modèle (gelés) sont stockés en précision réduite (4 bits au lieu des 16 ou 32 bits habituels, rappel Module 2, chapitre 2.1.1 sur les dtypes), ce qui réduit encore drastiquement l'empreinte mémoire nécessaire, permettant de fine-tuner des modèles de plusieurs milliards de paramètres sur un simple GPU grand public.

---

### RLHF : Aligner un Modèle sur les Préférences Humaines

**🔑 Intuition**

Après le pré-entraînement (qui apprend à prédire le texte "probable") et éventuellement un Fine-Tuning classique, une étape supplémentaire, appelée **RLHF (Reinforcement Learning from Human Feedback)**, affine le comportement du modèle pour qu'il produise des réponses **utiles, honnêtes et sûres**, pas seulement statistiquement plausibles.

```
🔑 Principe simplifié du RLHF :

1. Le modèle génère plusieurs réponses différentes à un même prompt
2. Des humains classent ces réponses de la meilleure à la pire,
   selon des critères d'utilité, de sécurité, d'honnêteté
3. Un modèle de "récompense" est entraîné pour prédire ce classement
   humain à partir des réponses (un modèle qui apprend à imiter
   le jugement humain)
4. Le LLM principal est ensuite ajusté pour maximiser la récompense
   prédite par ce modèle de récompense, via des techniques
   d'apprentissage par renforcement (rappel Module 0)
```

**💡 Pourquoi c'est nécessaire :** un modèle uniquement pré-entraîné sur "prédire le texte le plus probable" pourrait très bien reproduire fidèlement des biais, des informations fausses, ou un ton inapproprié présents dans son corpus d'entraînement, simplement parce que c'était "statistiquement probable" dans les données. Le RLHF réoriente le modèle vers ce que des humains **jugent réellement souhaitable**, ce qui explique en grande partie la différence de comportement entre un modèle de langage "brut" (juste pré-entraîné) et un assistant conversationnel poli, utile et prudent comme ceux que tu utilises au quotidien.

---

## 💻 MISE EN PRATIQUE

```python
# ─────────────────────────────────────────────
# 1. FINE-TUNING AVEC LoRA — code complet (rappel et approfondissement Module 0)
# ─────────────────────────────────────────────

from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments
from peft import LoraConfig, get_peft_model, TaskType
from datasets import load_dataset

nom_modele = "gpt2"  # modèle plus petit pour la démonstration pédagogique
tokenizer = AutoTokenizer.from_pretrained(nom_modele)
tokenizer.pad_token = tokenizer.eos_token
modele = AutoModelForCausalLM.from_pretrained(nom_modele)

# ─────────────────────────────────────────────
# 2. CONFIGURER LoRA
# ─────────────────────────────────────────────

config_lora = LoraConfig(
    r=8,                    # rang des matrices A et B (rappel : plus petit = moins de paramètres)
    lora_alpha=16,           # facteur de mise à l'échelle de l'ajustement
    target_modules=["c_attn"],  # quelles couches recevoir l'adaptation LoRA (ici : les couches d'attention !)
    lora_dropout=0.1,        # rappel Module 4, chapitre 4.3
    task_type=TaskType.CAUSAL_LM   # rappel : architecture Decoder-only, Chapitre 5.3
)

modele_lora = get_peft_model(modele, config_lora)

# Vérifier concrètement la réduction du nombre de paramètres entraînables
modele_lora.print_trainable_parameters()
# Exemple de sortie typique :
# trainable params: 147,456 || all params: 124,587,264 || trainable%: 0.1184

# ─────────────────────────────────────────────
# 3. COMPARER LA MÉMOIRE THÉORIQUE : FULL FINE-TUNING vs LoRA
# ─────────────────────────────────────────────

params_totaux = sum(p.numel() for p in modele.parameters())
params_lora = sum(p.numel() for p in modele_lora.parameters() if p.requires_grad)

print(f"\nParamètres totaux du modèle    : {params_totaux:,}")
print(f"Paramètres entraînés avec LoRA : {params_lora:,}")
print(f"Ratio                          : {params_lora/params_totaux:.4%}")
print(f"\n→ Économie mémoire théorique pour les gradients/optimiseur :")
print(f"  Full Fine-Tuning : besoin de gradients pour {params_totaux:,} paramètres")
print(f"  LoRA             : besoin de gradients pour seulement {params_lora:,} paramètres")

# ─────────────────────────────────────────────
# 4. PRÉPARER UN DATASET SIMPLE POUR FINE-TUNING
# ─────────────────────────────────────────────

textes_exemple = [
    "L'intelligence artificielle transforme le monde du travail.",
    "Le Deep Learning repose sur des réseaux de neurones profonds.",
    "Les LLMs génèrent du texte token par token."
]

def tokeniser_fonction(exemples):
    return tokenizer(exemples["text"], truncation=True, padding="max_length", max_length=32)

from datasets import Dataset
dataset = Dataset.from_dict({"text": textes_exemple})
dataset_tokenise = dataset.map(tokeniser_fonction, batched=True)

print(f"\n✅ Dataset prêt : {len(dataset_tokenise)} exemples, prêts pour l'entraînement LoRA")
print("(la boucle d'entraînement elle-même reprend exactement le Trainer de Hugging Face,")
print(" détaillé au Chapitre 5.6)")
```

---

## 🏋️ EXERCICES — CHAPITRE 5.5

### Exercice 5.5.A — Comprendre l'objectif du pré-entraînement

Pour le texte "L'IA révolutionne le monde", écris manuellement les paires (contexte → mot à prédire) que le modèle verrait pendant le pré-entraînement, en suivant le principe expliqué dans ce chapitre.

<details>
<summary>👉 Solution</summary>

```
"L'"                              → prédire "IA"
"L'IA"                            → prédire "révolutionne"
"L'IA révolutionne"               → prédire "le"
"L'IA révolutionne le"            → prédire "monde"
```

Chacune de ces paires constitue un exemple d'entraînement individuel où le modèle doit prédire le token suivant à partir de tout ce qui précède — c'est en répétant ce processus sur des milliards de phrases similaires que le modèle apprend progressivement la grammaire, les faits, et le raisonnement.
</details>

### Exercice 5.5.B — Calculer l'économie de paramètres avec LoRA

Une couche d'attention d'un LLM a une matrice de poids de taille 2048×2048. Avec LoRA, on utilise un rang `r=4`, donc deux matrices A (2048×4) et B (4×2048). Calcule le nombre de paramètres de la matrice originale, puis celui des matrices LoRA, et le pourcentage d'économie réalisée.

<details>
<summary>👉 Solution</summary>

```
Matrice originale W : 2048 × 2048 = 4 194 304 paramètres

Matrice LoRA A : 2048 × 4 = 8 192 paramètres
Matrice LoRA B : 4 × 2048 = 8 192 paramètres
Total LoRA     : 8 192 + 8 192 = 16 384 paramètres

Pourcentage entraîné avec LoRA : 16 384 / 4 194 304 ≈ 0.39%

→ On entraîne moins de 0.4% du nombre de paramètres original,
tout en préservant la capacité d'ajuster le comportement de cette
couche, exactement l'ordre de grandeur mentionné pour Mistral-7B
dans ce chapitre (0.11% sur l'ensemble du modèle).
```
</details>

### Exercice 5.5.C — Pré-entraînement, Fine-Tuning classique, ou RLHF ?

Pour chacune des étapes suivantes de la vie d'un LLM, indique s'il s'agit du Pré-entraînement, du Fine-Tuning classique, ou du RLHF :

1. Le modèle apprend, sur des milliards de pages web, à prédire le mot suivant
2. Des humains classent plusieurs réponses générées par le modèle, de la meilleure à la pire
3. Le modèle est spécialisé sur un corpus de documents juridiques français pour une entreprise spécifique

<details>
<summary>👉 Solution</summary>

```
1. PRÉ-ENTRAÎNEMENT — apprentissage initial massif sur d'immenses
   quantités de texte, avec l'objectif de prédiction du prochain
   token (ou masked language modeling pour BERT)

2. RLHF — collecte de préférences humaines pour entraîner un modèle
   de récompense qui va ensuite guider l'alignement du comportement
   du LLM

3. FINE-TUNING CLASSIQUE (potentiellement avec LoRA/QLoRA) —
   spécialisation du modèle déjà pré-entraîné sur un domaine et
   un corpus spécifiques (documents juridiques), typique d'un
   cas d'usage d'entreprise
```
</details>

### Exercice 5.5.D — Pourquoi le RLHF est nécessaire même après un bon pré-entraînement

Explique pourquoi un modèle uniquement pré-entraîné (sans RLHF) pourrait produire des réponses statistiquement "plausibles" mais indésirables, en te basant sur l'objectif même du pré-entraînement décrit dans ce chapitre.

<details>
<summary>👉 Solution</summary>

L'objectif du pré-entraînement est uniquement de prédire le token **le plus statistiquement probable** en fonction du contexte, sur la base de tout ce qui a été observé dans l'immense corpus d'entraînement — ce corpus, provenant en grande partie d'Internet, contient inévitablement des biais, des informations fausses, du contenu inapproprié, ou des tons peu souhaitables. Un modèle purement pré-entraîné n'a **aucune notion explicite** de ce qui est "souhaitable" ou "utile" pour un humain — il reproduit fidèlement les patterns statistiques de son corpus, qu'ils soient bons ou mauvais. Le RLHF introduit précisément cette dimension manquante : un signal d'apprentissage basé directement sur le jugement humain de ce qui constitue une "bonne" réponse (utile, honnête, sûre), plutôt que simplement une réponse "statistiquement probable" selon les données d'entraînement brutes.
</details>

---

---

# 📘 CHAPITRE 5.6 — APPLICATIONS PRATIQUES AVEC HUGGING FACE

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### Rappel : l'Écosystème Hugging Face

Rappelle-toi le Module 0 et le Module 1 : Hugging Face est devenu le "GitHub de l'IA" — une plateforme centralisant des milliers de modèles pré-entraînés, prêts à être réutilisés directement (rappel Chapitre 5.5 : le Fine-Tuning s'appuie précisément sur ces modèles pré-entraînés). Ce chapitre te montre comment appliquer concrètement tout ce que tu as appris dans ce module — tokenisation (5.1), embeddings (5.2), Transformers (5.3), génération (5.4), fine-tuning (5.5) — à travers les outils pratiques de cet écosystème, sur des tâches NLP réelles.

---

### La Classe Pipeline : la Façon la Plus Simple d'Utiliser un Modèle

**🔑 Intuition**

`pipeline()` de Hugging Face encapsule **automatiquement** toutes les étapes nécessaires pour utiliser un modèle — le tokenizer approprié (Chapitre 5.1), le modèle lui-même (Chapitre 5.3), et le post-traitement des résultats (par exemple, appliquer softmax et interpréter les probabilités). C'est l'interface la plus simple pour tester rapidement un modèle sur une tâche standard, sans avoir à gérer manuellement chaque étape.

---

### Les Tâches NLP Classiques, Reliées à ce que Tu as Appris

**🔑 Classification de Texte (Analyse de Sentiment)**

Utilise une architecture Encoder-only (Chapitre 5.3, type BERT) : le texte entier est encodé en une représentation contextuelle, puis une couche de classification finale (rappel Module 3, chapitre 3.3 : régression logistique/softmax) prédit la catégorie (positif/négatif/neutre).

**🔑 NER (Named Entity Recognition — Reconnaissance d'Entités Nommées)**

Identifie et catégorise automatiquement les entités importantes d'un texte (personnes, lieux, organisations, dates). Techniquement, c'est une classification effectuée **token par token** (chaque token du Chapitre 5.1 reçoit sa propre étiquette), plutôt qu'une seule classification pour la phrase entière.

**🔑 Question Answering (Réponse à des Questions)**

Étant donné un contexte (un paragraphe) et une question, le modèle doit identifier précisément **où, dans le contexte, se trouve la réponse** — techniquement, il prédit la position de début et de fin de la réponse au sein du texte, en s'appuyant sur l'attention (Chapitre 5.3) entre la question et chaque partie du contexte.

**🔑 Résumé de Texte (Summarization)**

Utilise typiquement une architecture Encoder-Decoder (Chapitre 5.3) : l'Encoder comprend le texte long dans son intégralité, le Decoder génère un résumé plus court, token par token (rappel Chapitre 5.4 : génération autorégressive), en se basant sur cette compréhension globale.

**🔑 Traduction Automatique**

Également une architecture Encoder-Decoder classique — exactement le cas d'usage historique pour lequel le Transformer a été initialement conçu en 2017 (rappel Chapitre 5.3).

---

### Le Trainer de Hugging Face : Fine-Tuner sans Réinventer la Boucle d'Entraînement

**🔑 Intuition**

Rappelle-toi la boucle d'entraînement manuelle du Module 4, chapitre 4.2 (`zero_grad()`, forward, `backward()`, `step()`). La classe `Trainer` de Hugging Face **automatise entièrement cette boucle**, tout en gérant également des aspects pratiques supplémentaires : la sauvegarde périodique du modèle, l'évaluation régulière sur un ensemble de validation (rappel Module 3, chapitre 3.1), la gestion du GPU, et bien plus — tu n'as qu'à définir le modèle, les données, et quelques paramètres d'entraînement (rappel Module 2 : learning rate, nombre d'epochs...).

---

## 💻 MISE EN PRATIQUE

```python
from transformers import pipeline

# ─────────────────────────────────────────────
# 1. ANALYSE DE SENTIMENT — rappel Module 3, classification
# ─────────────────────────────────────────────

classificateur = pipeline("sentiment-analysis",
                          model="nlptown/bert-base-multilingual-uncased-sentiment")

textes = [
    "Ce cours sur les LLMs est absolument fantastique !",
    "Je suis déçu par la qualité de ce produit.",
]
for texte in textes:
    resultat = classificateur(texte)
    print(f"'{texte}' → {resultat}")

# ─────────────────────────────────────────────
# 2. NER — RECONNAISSANCE D'ENTITÉS NOMMÉES
# ─────────────────────────────────────────────

ner = pipeline("ner", grouped_entities=True)
texte_ner = "Emmanuel Macron a rencontré Sundar Pichai à Paris en janvier 2026."
entites = ner(texte_ner)
for entite in entites:
    print(f"  {entite['word']:20s} → {entite['entity_group']} (confiance: {entite['score']:.2%})")

# ─────────────────────────────────────────────
# 3. QUESTION ANSWERING
# ─────────────────────────────────────────────

qa = pipeline("question-answering")
contexte = """
Le Transformer a été introduit en 2017 dans l'article "Attention is All You Need".
Il repose sur un mécanisme d'attention qui permet de traiter tous les mots d'une
séquence simultanément, contrairement aux RNN qui les traitent séquentiellement.
"""
question = "En quelle année le Transformer a-t-il été introduit ?"
reponse = qa(question=question, context=contexte)
print(f"\nQuestion : {question}")
print(f"Réponse  : {reponse['answer']} (confiance: {reponse['score']:.2%})")

# ─────────────────────────────────────────────
# 4. RÉSUMÉ DE TEXTE (Encoder-Decoder, rappel Chapitre 5.3)
# ─────────────────────────────────────────────

resumeur = pipeline("summarization", model="facebook/bart-large-cnn")
texte_long = """
Artificial intelligence has transformed numerous industries over the past decade.
From healthcare diagnostics to autonomous vehicles, machine learning models now
assist in decision-making processes that were once exclusively human domains.
The rise of large language models has further accelerated this transformation,
enabling natural language interfaces for complex systems. However, this rapid
progress also raises important questions about safety, bias, and the societal
implications of increasingly capable AI systems.
"""
resume = resumeur(texte_long, max_length=50, min_length=20, do_sample=False)
print(f"\nRésumé : {resume[0]['summary_text']}")

# ─────────────────────────────────────────────
# 5. FINE-TUNER UN MODÈLE AVEC LE TRAINER (rappel Chapitre 4.2 et 5.5)
# ─────────────────────────────────────────────

from transformers import (AutoModelForSequenceClassification, AutoTokenizer,
                          TrainingArguments, Trainer)
from datasets import Dataset
import numpy as np

# Dataset minimal pour la démonstration (classification binaire)
donnees = {
    "text": ["J'adore ce produit", "Service décevant", "Excellent travail",
              "Très mauvaise expérience", "Je recommande vivement"],
    "label": [1, 0, 1, 0, 1]   # 1=positif, 0=négatif
}
dataset = Dataset.from_dict(donnees)

tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")
modele = AutoModelForSequenceClassification.from_pretrained("distilbert-base-uncased", num_labels=2)

def tokeniser(exemples):
    return tokenizer(exemples["text"], truncation=True, padding="max_length", max_length=32)

dataset_tokenise = dataset.map(tokeniser, batched=True)

# Configuration de l'entraînement (rappel Module 2 : learning_rate, epochs)
arguments_entrainement = TrainingArguments(
    output_dir="./resultats",
    num_train_epochs=3,               # rappel Module 2, chapitre 2.4.4
    per_device_train_batch_size=2,     # rappel Module 2 : batch size
    learning_rate=2e-5,                 # rappel Module 2, chapitre 2.4.3
    logging_steps=1,
    save_strategy="no"
)

# Le Trainer encapsule TOUTE la boucle du Module 4, chapitre 4.2
trainer = Trainer(
    model=modele,
    args=arguments_entrainement,
    train_dataset=dataset_tokenise,
)

# trainer.train()  # décommenter pour lancer l'entraînement réel
print("\n✅ Trainer configuré — appeler trainer.train() pour fine-tuner le modèle")
print("(La boucle d'entraînement gère automatiquement zero_grad(), forward, backward(), step()")
print(" exactement comme au Module 4, chapitre 4.2, mais entièrement automatisée)")
```

---

## 🏋️ EXERCICES — CHAPITRE 5.6

### Exercice 5.6.A — Associer tâche et architecture

Pour chacune des tâches Hugging Face suivantes, indique quelle architecture Transformer (Encoder-only, Decoder-only, ou Encoder-Decoder — rappel Chapitre 5.3) est la plus naturellement adaptée :

1. `pipeline("sentiment-analysis")`
2. `pipeline("summarization")`
3. `pipeline("text-generation")`
4. `pipeline("translation")`

<details>
<summary>👉 Solution</summary>

```
1. sentiment-analysis → ENCODER-ONLY (type BERT) — comprendre le texte
   entier pour le classifier, pas générer de nouveau texte

2. summarization       → ENCODER-DECODER (type BART/T5) — comprendre
   un texte long, puis générer un résumé plus court

3. text-generation      → DECODER-ONLY (type GPT) — génération pure,
   autorégressive, token par token (rappel Chapitre 5.4)

4. translation           → ENCODER-DECODER — cas d'usage historique
   original du Transformer, comprendre le texte source puis générer
   la traduction
```
</details>

### Exercice 5.6.B — Interpréter un résultat de NER

Pour la phrase "Sundar Pichai dirige Google depuis Mountain View", quelles entités et catégories t'attendrais-tu à voir extraites par un modèle NER, en te basant sur l'exemple de ce chapitre ?

<details>
<summary>👉 Solution</summary>

```
"Sundar Pichai"  → PERSONNE (PER)
"Google"          → ORGANISATION (ORG)
"Mountain View"   → LIEU (LOC)
```

Un modèle NER performant identifierait typiquement ces trois entités avec leurs catégories respectives, en s'appuyant sur le contexte de la phrase entière (rappel Chapitre 5.3 : les embeddings contextuels permettent de distinguer, par exemple, "Google" l'entreprise de tout autre usage possible du mot dans un contexte différent).
</details>

### Exercice 5.6.C — Concevoir les paramètres d'un TrainingArguments

Tu disposes d'un dataset de fine-tuning de 10 000 exemples, avec un batch size de 16. Combien d'itérations (pas de gradient) seront effectuées par epoch, et combien au total si tu entraînes pendant 5 epochs (rappel Module 2, chapitre 2.4.4) ?

<details>
<summary>👉 Solution</summary>

```
Pas par epoch = 10 000 / 16 = 625 pas

Pas total sur 5 epochs = 625 × 5 = 3 125 pas de gradient au total

(Rappel direct du Module 2, chapitre 2.4.4 : chaque "pas" correspond
à un cycle complet zero_grad() → forward → backward() → step(),
appliqué ici automatiquement par le Trainer de Hugging Face plutôt
que manuellement comme au Module 4, chapitre 4.2)
```
</details>

### Exercice 5.6.D — Choisir le bon pipeline pour un besoin métier

Une entreprise veut automatiquement extraire, à partir de milliers d'avis clients, (1) si l'avis est positif ou négatif, et (2) les noms de produits spécifiquement mentionnés dans chaque avis. Quels pipelines Hugging Face utiliserais-tu pour chacun de ces deux besoins ?

<details>
<summary>👉 Solution</summary>

```
1. Sentiment positif/négatif → pipeline("sentiment-analysis")
   (classification de texte, Encoder-only)

2. Extraction des noms de produits mentionnés → pipeline("ner")
   (reconnaissance d'entités nommées, éventuellement avec un modèle
   NER fine-tuné spécifiquement sur des noms de produits si les
   modèles NER génériques ne les catégorisent pas assez précisément
   par défaut — un cas d'usage typique de Fine-Tuning, Chapitre 5.5)
```
</details>

---

---

# ✅ QUIZ DE VALIDATION — MODULE 5

> Réponds sans regarder le cours. Objectif : 16/20 minimum avant de passer au Module 6.

**1.** Pourquoi la tokenisation en sous-mots (BPE) est-elle préférable à un découpage strict mot par mot ?
**2.** Sur quel principe fondamental BPE construit-il progressivement son vocabulaire ?
**3.** Quelle est la différence entre un embedding statique (Word2Vec) et un embedding contextuel (Transformer) ?
**4.** Que représentent Query, Key et Value dans le mécanisme d'attention ?
**5.** Quelle opération mathématique du Module 2 calcule les scores d'attention entre deux mots ?
**6.** Pourquoi le Positional Encoding est-il nécessaire dans un Transformer ?
**7.** Quelle est la différence entre une architecture Encoder-only, Decoder-only et Encoder-Decoder ?
**8.** Pourquoi la majorité des LLMs génératifs modernes utilisent-ils une architecture Decoder-only ?
**9.** Qu'est-ce que la génération autorégressive ?
**10.** Quelle est la différence entre Greedy Search et Sampling ?
**11.** Comment la température modifie-t-elle la distribution de probabilité du prochain token ?
**12.** Quelle est la différence entre Top-k et Top-p (Nucleus) Sampling ?
**13.** Quel est l'objectif d'entraînement du pré-entraînement d'un modèle Decoder-only comme GPT ?
**14.** Quel est l'objectif d'entraînement de BERT (Masked Language Modeling), et en quoi diffère-t-il de celui de GPT ?
**15.** Quelle est l'intuition derrière LoRA pour rendre le Fine-Tuning plus efficace ?
**16.** Que fait QLoRA en plus de LoRA ?
**17.** Quel est le rôle du RLHF, et pourquoi est-il nécessaire même après un bon pré-entraînement ?
**18.** À quoi sert la classe `pipeline()` de Hugging Face ?
**19.** Quelle architecture Transformer est la plus adaptée à une tâche de résumé de texte, et pourquoi ?
**20.** À quoi sert la classe `Trainer` de Hugging Face, en lien avec la boucle d'entraînement du Module 4 ?

---

### 📝 Corrigé

**1.** Elle évite un vocabulaire immense tout en permettant de représenter n'importe quel mot, même inconnu, en le décomposant en fragments déjà présents dans le vocabulaire.
**2.** BPE fusionne itérativement la paire de caractères (ou de fragments) la plus fréquente dans le corpus d'entraînement, construisant ainsi progressivement un vocabulaire de sous-mots optimisé pour la fréquence d'usage réelle de la langue.
**3.** Un embedding statique attribue toujours le même vecteur à un mot, peu importe le contexte ; un embedding contextuel recalcule dynamiquement le vecteur d'un mot en fonction des mots environnants, permettant de distinguer différents sens d'un même mot.
**4.** Query représente "ce que ce mot cherche", Key représente "comment ce mot se présente aux autres", et Value représente "l'information que ce mot peut apporter" — trois vecteurs calculés à partir de l'embedding de chaque mot via des matrices de poids apprises.
**5.** Le produit scalaire (Module 2, chapitre 2.1.3), qui mesure la compatibilité entre la Query d'un mot et la Key d'un autre mot.
**6.** Parce que le mécanisme d'attention seul ne tient compte d'aucune notion d'ordre entre les mots — sans Positional Encoding, le modèle ne pourrait pas distinguer deux phrases contenant les mêmes mots dans un ordre différent.
**7.** Encoder-only comprend un texte entier (utile pour la classification) ; Decoder-only génère du texte token par token (utile pour la génération) ; Encoder-Decoder combine les deux (utile pour la traduction ou le résumé).
**8.** Parce que leur objectif principal est la génération de texte, et cette architecture simplifiée s'est révélée particulièrement efficace et facile à faire monter en échelle vers des tailles de modèle très importantes.
**9.** Le processus par lequel chaque nouveau token généré est calculé en tenant compte de tous les tokens précédemment générés (y compris ceux déjà produits par le modèle lui-même), un token à la fois.
**10.** Greedy Search choisit toujours le token le plus probable, de façon déterministe ; Sampling tire au sort le prochain token selon la distribution de probabilité elle-même, introduisant de la variabilité et de la créativité.
**11.** Une température basse concentre davantage la distribution sur les tokens les plus probables (réponses plus déterministes) ; une température élevée aplatit la distribution, donnant plus de chances aux tokens moins probables (réponses plus variées et créatives).
**12.** Top-k sélectionne toujours un nombre fixe de candidats les plus probables ; Top-p sélectionne un nombre variable de candidats, déterminé dynamiquement par le plus petit ensemble dont la somme des probabilités atteint un seuil donné.
**13.** Prédire le prochain token à partir de tout le contexte précédent, répété sur d'immenses quantités de texte.
**14.** BERT masque aléatoirement certains mots et doit les deviner en s'appuyant sur le contexte des deux côtés (avant et après) ; GPT prédit uniquement le mot suivant en se basant sur le contexte précédent uniquement, ce qui le rend adapté à la génération plutôt qu'à la compréhension bidirectionnelle.
**15.** Plutôt que de modifier directement les immenses matrices de poids originales, on ajoute de petites matrices supplémentaires (de rang réduit) dont le produit approxime l'ajustement nécessaire, réduisant drastiquement le nombre de paramètres à entraîner.
**16.** QLoRA combine LoRA avec la quantification des poids originaux (stockés en précision réduite, par exemple 4 bits), réduisant encore davantage l'empreinte mémoire nécessaire pour le Fine-Tuning.
**17.** Le RLHF aligne le comportement du modèle sur les préférences humaines réelles (utilité, honnêteté, sécurité), car le pré-entraînement seul ne fait qu'apprendre à reproduire des patterns statistiquement probables, qui peuvent inclure des biais ou des contenus indésirables présents dans le corpus d'entraînement.
**18.** Elle encapsule automatiquement toutes les étapes nécessaires (tokenizer, modèle, post-traitement) pour utiliser facilement un modèle pré-entraîné sur une tâche standard, sans avoir à gérer manuellement chaque composant.
**19.** Encoder-Decoder, car la tâche nécessite à la fois de comprendre pleinement un texte long (rôle de l'Encoder) et de générer un texte plus court de façon cohérente (rôle du Decoder).
**20.** Le `Trainer` automatise entièrement la boucle d'entraînement manuelle du Module 4 (zero_grad, forward, backward, step), tout en ajoutant la gestion de la sauvegarde, de l'évaluation périodique, et du matériel de calcul (GPU).

---

---

# 📊 RÉCAPITULATIF DU MODULE 5

## Ce que tu as maîtrisé

| Compétence | Notion clé | Niveau attendu |
|---|---|---|
| Transformer du texte en représentation numérique | Tokenisation, BPE | ⭐⭐⭐⭐☆ |
| Comprendre le sens géométrique des mots | Embeddings statiques et contextuels | ⭐⭐⭐⭐☆ |
| Comprendre l'architecture qui a révolutionné l'IA | Attention, Multi-Head, Positional Encoding | ⭐⭐⭐⭐⭐ |
| Comprendre comment un LLM produit du texte | Génération autorégressive, sampling, température | ⭐⭐⭐⭐☆ |
| Comprendre l'entraînement des LLMs | Pré-entraînement, LoRA/QLoRA, RLHF | ⭐⭐⭐⭐☆ |
| Utiliser des Transformers en pratique | Pipelines Hugging Face, Trainer, tâches NLP | ⭐⭐⭐⭐☆ |

## Prochaine étape

**Module 6 — IA Générative** : tu vas maintenant élargir ce que tu as appris sur les LLMs textuels vers l'ensemble de l'écosystème de l'IA générative moderne — les APIs des grands modèles (OpenAI, Anthropic), les modèles de génération d'image (Stable Diffusion), le prompting avancé, et les modèles exécutés localement avec Ollama.

---

## ⚠️ ERREURS FRÉQUENTES DU MODULE 5

| Erreur | Conséquence | Solution |
|---|---|---|
| Croire qu'un LLM "comprend" le texte comme un humain | Attentes irréalistes sur ses capacités et limites | Se rappeler qu'un LLM manipule des distributions de probabilité sur des tokens, apprises statistiquement |
| Confondre embeddings statiques et contextuels | Mauvais choix d'outil pour une tâche de désambiguïsation | Utiliser un Transformer (contextuel) dès que le sens dépend du contexte |
| Utiliser une température de 0 pour toute tâche créative | Réponses répétitives et peu intéressantes | Adapter la température (et Top-k/Top-p) au type de tâche visé |
| Tenter un Full Fine-Tuning sur un LLM sans ressources GPU suffisantes | Erreurs "out of memory", entraînement infaisable | Utiliser LoRA ou QLoRA pour réduire drastiquement les besoins en mémoire |
| Oublier que le pré-entraînement seul ne garantit pas un comportement souhaitable | Réponses biaisées, inappropriées ou peu alignées | Comprendre le rôle complémentaire du RLHF dans l'alignement du modèle |
| Choisir une architecture Encoder-only pour une tâche de génération | Le modèle n'est pas conçu pour produire du texte de façon autorégressive | Utiliser une architecture Decoder-only ou Encoder-Decoder pour la génération |
| Ignorer le coût en tokens d'un prompt trop long | Dépassement de la limite de contexte, coûts API imprévus | Estimer le nombre de tokens avant l'envoi, notamment pour de longs documents |

---

*Module 5 terminé ✅ — Durée totale : 8 semaines*  
*Formation IA Complète — Module suivant : Module 6 — IA Générative*
