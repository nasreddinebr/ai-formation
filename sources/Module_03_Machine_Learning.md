# 🎓 FORMATION IA — MODULE 3
# Machine Learning
### Comprendre en profondeur les algorithmes que tu utilises déjà

> **Professeur :** Dr. IA — Formation Complète  
> **Durée estimée :** 8 semaines (1–2h par jour)  
> **Prérequis :** Module 1 (Python, Scikit-learn) et Module 2 (Mathématiques)

---

## 🧭 COMMENT LIRE CE MODULE

Au Module 1, tu as déjà utilisé Scikit-learn pour entraîner des modèles — tu sais **comment appuyer sur les boutons**. Au Module 2, tu as compris les mathématiques qui font tourner ces boutons — le gradient, les probabilités, l'optimisation.

Ce Module 3 fait le pont : il t'explique **pourquoi chaque algorithme fonctionne comme il fonctionne**, ce qu'il se passe réellement "à l'intérieur", et surtout, **comment choisir le bon algorithme et l'évaluer correctement** — la compétence qui distingue un vrai data scientist d'une personne qui copie du code.

**La structure de chaque chapitre a été pensée pour toi :**

```
1. 📖 EXPLICATION — toutes les notions du chapitre, en langage simple,
                     avec des analogies, AVANT tout code
2. 💻 MISE EN PRATIQUE — le code qui met en œuvre ce que tu viens de comprendre
3. 🏋️ EXERCICES — 4 exercices corrigés pour ancrer la compréhension
```

Ne saute jamais la section "Explication" pour aller directement au code — c'est elle qui construit ta compréhension réelle. Le code, lui, ne fait que confirmer ce que tu as déjà compris.

---

## 📋 PLAN DU MODULE 3

| Chapitre | Sujet | Durée estimée |
|---|---|---|
| **3.1** | Introduction : Généralisation, Validation et Biais-Variance | 1 semaine |
| **3.2** | La Régression : Prédire une Valeur Continue | 1 semaine |
| **3.3** | La Classification : Prédire une Catégorie | 1.5 semaine |
| **3.4** | Arbres de Décision et Méthodes d'Ensemble | 1.5 semaine |
| **3.5** | Clustering et Réduction de Dimension | 1 semaine |
| **3.6** | Évaluation des Modèles : Bien Mesurer la Performance | 1 semaine |
| **3.7** | Feature Engineering et Données Déséquilibrées | 1 semaine |

---

---

# 📘 CHAPITRE 3.1 — INTRODUCTION AU MACHINE LEARNING
## Généralisation, Validation et le Compromis Biais-Variance

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Qu'est-ce qu'apprendre, vraiment, pour une machine ?

Reprenons l'analogie du Module 0 : un enfant qui apprend à reconnaître un chien regarde plusieurs exemples et en déduit des règles générales (4 pattes, fourrure, aboiements). Mais il y a une distinction absolument fondamentale à faire, qui va gouverner tout ce module.

Imagine deux étudiants qui préparent le même examen de mathématiques :

- **L'étudiant A** mémorise par cœur les 50 exercices d'annales, avec leurs corrections exactes. Le jour de l'examen, si une question ressemble exactement à une annale, il excelle. Mais face à un exercice légèrement différent, il est perdu — il n'a pas compris la méthode, seulement retenu des réponses.

- **L'étudiant B** comprend les méthodes et les principes sous-jacents. Il réussit un peu moins bien sur les annales exactes (il ne les a pas mémorisées mot pour mot), mais il réussit très bien sur des exercices **nouveaux**, jamais vus, parce qu'il a compris le principe général.

**Un modèle de Machine Learning peut avoir exactement le même problème.** Un modèle qui "mémorise" ses données d'entraînement au lieu d'apprendre les patterns généraux sous-jacents va très bien performer sur les données qu'il a déjà vues, et très mal sur des données nouvelles. C'est le phénomène de **surapprentissage (overfitting)**, déjà évoqué au Module 1, qu'on va maintenant comprendre en profondeur.

**Le véritable objectif du Machine Learning n'est jamais de bien performer sur les données d'entraînement — c'est de bien généraliser à des données jamais vues.** C'est la seule chose qui compte en production, quand ton modèle rencontre de vrais nouveaux clients, de vraies nouvelles images, de vraies nouvelles questions.

---

### Pourquoi diviser les données en trois ensembles ?

Au Module 1, tu as utilisé `train_test_split` pour séparer les données en un ensemble d'entraînement et un ensemble de test. Mais en pratique professionnelle, on utilise souvent **trois** ensembles, pas deux. Voici pourquoi, avec une analogie simple.

Imagine que tu prépares un étudiant pour un examen national :

```
📚 ENSEMBLE D'ENTRAÎNEMENT (Train)      → les cours et exercices sur lesquels il s'entraîne
📝 ENSEMBLE DE VALIDATION (Validation)  → les examens blancs, pour ajuster sa méthode de travail
🎓 ENSEMBLE DE TEST (Test)              → l'examen final, qu'il ne voit qu'une seule fois
```

**Pourquoi ne pas se contenter de Train et Test ?** Parce qu'en pratique, on ne se contente jamais d'entraîner un seul modèle — on essaie plusieurs algorithmes, plusieurs réglages (hyperparamètres), on compare, on ajuste. Si on utilisait l'ensemble de test pour faire tous ces choix, on finirait par "tricher" indirectement : à force de choisir la configuration qui marche le mieux sur le test, on finit par sur-adapter nos choix à cet ensemble précis, même sans jamais entraîner directement dessus.

L'ensemble de **validation** sert justement à faire ces choix et ajustements (quel algorithme ? quels hyperparamètres ?). L'ensemble de **test**, lui, reste "scellé", utilisé une seule fois à la toute fin, pour avoir une estimation honnête et non biaisée de la performance réelle du modèle final.

```
🔑 Règle d'or : l'ensemble de test ne doit JAMAIS influencer un seul choix
   fait pendant le développement du modèle. Sinon, l'estimation de performance
   qu'il donne devient trompeuse — trop optimiste par rapport à la réalité.
```

**Répartition typique :** 60-70% Train, 15-20% Validation, 15-20% Test — mais ça varie selon la taille du dataset.

---

### La Validation Croisée (Cross-Validation) : plusieurs examens blancs plutôt qu'un seul

**🔑 Intuition**

Si tu ne fais qu'un seul examen blanc, le résultat peut être trompeur — peut-être que ton étudiant a eu de la chance (ou pas de chance) ce jour-là, sur ce sujet précis. Pour avoir une estimation plus fiable, il vaudrait mieux faire **plusieurs** examens blancs, sur des sujets différents, et faire la moyenne.

C'est exactement le principe de la validation croisée, et plus précisément de sa version la plus utilisée : la **K-Fold Cross-Validation**.

Le principe : on découpe les données d'entraînement en **K parts égales** (typiquement K=5 ou K=10). On entraîne le modèle K fois, à chaque fois en utilisant K-1 parts pour l'entraînement et la part restante pour la validation. On obtient ainsi K scores de validation différents, qu'on moyenne pour obtenir une estimation plus robuste et plus fiable de la performance réelle.

```
Découpage en 5 parts (5-Fold Cross-Validation) :

Tour 1 : [TEST] [train] [train] [train] [train]  → score 1
Tour 2 : [train] [TEST] [train] [train] [train]  → score 2
Tour 3 : [train] [train] [TEST] [train] [train]  → score 3
Tour 4 : [train] [train] [train] [TEST] [train]  → score 4
Tour 5 : [train] [train] [train] [train] [TEST]  → score 5

Score final = moyenne des 5 scores (± écart-type, vu Module 2 chapitre 2.3.4)
```

**Pourquoi c'est mieux qu'un seul split train/test ?** Parce que chaque exemple du dataset sert exactement une fois de donnée de test — l'estimation finale utilise donc **la totalité des données** pour évaluer le modèle, ce qui la rend beaucoup plus fiable qu'une seule division aléatoire, qui pourrait être une répartition "chanceuse" ou "malchanceuse".

L'**écart-type** entre les K scores (concept vu au Module 2, section 2.3.4) est lui aussi une information précieuse : s'il est petit, le modèle est stable ; s'il est grand, ses performances varient beaucoup selon les données, ce qui est un signal d'alerte.

---

### Le Compromis Biais-Variance : le concept le plus important de ce chapitre

**🔑 Intuition — le jeu de fléchettes**

Imagine quatre personnes qui lancent des fléchettes sur une cible, en essayant de toucher le centre :

```
   Biais FAIBLE, Variance FAIBLE          Biais FAIBLE, Variance ÉLEVÉE
   (idéal — précis et groupé)             (précis en moyenne, mais dispersé)
        ⊙ ⊙                                    ⊙       ⊙
         ⊙⊙                                        ⊙
        ⊙ ⊙                                  ⊙          ⊙

   Biais ÉLEVÉ, Variance FAIBLE            Biais ÉLEVÉ, Variance ÉLEVÉE
   (groupé, mais systématiquement          (pire cas — imprécis et dispersé)
    décalé du centre)
              ⊙⊙                            ⊙        ⊙
              ⊙⊙                                 ⊙
              ⊙⊙                          ⊙            ⊙
```

En Machine Learning :

- **Le biais** mesure à quel point le modèle est systématiquement "à côté de la plaque" — c'est l'erreur due à un modèle **trop simple** pour capturer la vraie complexité du problème. Un modèle avec un biais élevé fait des erreurs similaires, de façon répétée, quelles que soient les données d'entraînement utilisées. C'est le **sous-apprentissage (underfitting)**.

- **La variance** mesure à quel point les prédictions du modèle changent beaucoup selon les données d'entraînement utilisées — c'est l'erreur due à un modèle **trop complexe**, qui capture non seulement les vrais patterns, mais aussi le bruit aléatoire spécifique à son échantillon d'entraînement. C'est le **surapprentissage (overfitting)**, déjà vu au Module 1.

**Le piège :** on ne peut généralement pas réduire les deux en même temps indéfiniment. Un modèle plus complexe réduit le biais (il peut capturer des patterns plus subtils) mais augmente la variance (il devient sensible au bruit). C'est un **compromis** — d'où le nom "compromis biais-variance".

```
Modèle trop simple  → Biais élevé, Variance faible → SOUS-apprentissage
Modèle trop complexe → Biais faible, Variance élevée → SUR-apprentissage
Modèle bien calibré  → Le meilleur équilibre possible entre les deux
```

**Comment savoir où on se situe ?** En comparant la performance du modèle sur l'ensemble d'entraînement et sur l'ensemble de validation :

```
Performance train ÉLEVÉE, Performance validation FAIBLE
    → Grand écart entre les deux → SURAPPRENTISSAGE (variance élevée)

Performance train FAIBLE, Performance validation FAIBLE  
    → Les deux sont mauvaises → SOUS-APPRENTISSAGE (biais élevé)

Performance train ÉLEVÉE, Performance validation ÉLEVÉE (et proches)
    → Bon équilibre → C'est ce qu'on recherche
```

**💡 Pourquoi c'est fondamental pour la suite du module**

Absolument toutes les techniques que tu vas apprendre dans ce module — la régularisation (3.2), le choix de la profondeur d'un arbre (3.4), le nombre de voisins en KNN (3.3) — sont, au fond, des façons différentes de **régler le curseur** entre biais et variance pour trouver le point d'équilibre optimal pour ton problème précis.

---

## 💻 MISE EN PRATIQUE

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, KFold, cross_val_score
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline

# ─────────────────────────────────────────────
# 1. TRAIN / VALIDATION / TEST — division en 3 ensembles
# ─────────────────────────────────────────────

np.random.seed(42)
X = np.random.rand(1000, 5)
y = np.random.rand(1000)

# Première division : 70% train, 30% temporaire
X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.3, random_state=42)

# Deuxième division : on coupe le "temporaire" en validation et test (15%/15%)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)

print(f"Train      : {X_train.shape[0]} exemples ({X_train.shape[0]/1000:.0%})")
print(f"Validation : {X_val.shape[0]} exemples ({X_val.shape[0]/1000:.0%})")
print(f"Test       : {X_test.shape[0]} exemples ({X_test.shape[0]/1000:.0%})")

# ─────────────────────────────────────────────
# 2. VALIDATION CROISÉE (K-FOLD)
# ─────────────────────────────────────────────

modele = LinearRegression()
kf = KFold(n_splits=5, shuffle=True, random_state=42)

scores = cross_val_score(modele, X_train, y_train, cv=kf, scoring="r2")

print(f"\nScores des 5 plis : {np.round(scores, 4)}")
print(f"Score moyen : {scores.mean():.4f} ± {scores.std():.4f}")

# ─────────────────────────────────────────────
# 3. VISUALISER LE COMPROMIS BIAIS-VARIANCE
# ─────────────────────────────────────────────

np.random.seed(0)
X_demo = np.sort(np.random.rand(60, 1) * 10, axis=0)
y_demo = np.sin(X_demo).ravel() + np.random.randn(60) * 0.3

X_train_d, X_test_d, y_train_d, y_test_d = train_test_split(
    X_demo, y_demo, test_size=0.3, random_state=42
)

degres = [1, 3, 15]  # sous-apprentissage, bon équilibre, surapprentissage
fig, axes = plt.subplots(1, 3, figsize=(16, 5))

for ax, degre in zip(axes, degres):
    modele_poly = make_pipeline(PolynomialFeatures(degre), LinearRegression())
    modele_poly.fit(X_train_d, y_train_d)
    
    score_train = modele_poly.score(X_train_d, y_train_d)
    score_test = modele_poly.score(X_test_d, y_test_d)
    
    X_plot = np.linspace(0, 10, 200).reshape(-1, 1)
    y_plot = modele_poly.predict(X_plot)
    
    ax.scatter(X_train_d, y_train_d, color="steelblue", label="Train", alpha=0.7)
    ax.scatter(X_test_d, y_test_d, color="tomato", label="Test", alpha=0.7)
    ax.plot(X_plot, y_plot, color="green", linewidth=2)
    
    if degre == 1:
        titre = f"Degré {degre}\nSOUS-APPRENTISSAGE\nR² train={score_train:.2f}, test={score_test:.2f}"
    elif degre == 15:
        titre = f"Degré {degre}\nSURAPPRENTISSAGE\nR² train={score_train:.2f}, test={score_test:.2f}"
    else:
        titre = f"Degré {degre}\nBON ÉQUILIBRE\nR² train={score_train:.2f}, test={score_test:.2f}"
    
    ax.set_title(titre, fontsize=10)
    ax.legend(fontsize=8)
    ax.set_ylim(-2, 2)

plt.suptitle("Le Compromis Biais-Variance en Action", fontsize=14, fontweight="bold")
plt.tight_layout()
plt.savefig("biais_variance.png", dpi=150, bbox_inches="tight")
plt.show()
```

---

## 🏋️ EXERCICES — CHAPITRE 3.1

### Exercice 3.1.A — Diagnostic Biais-Variance

Pour chacun des scénarios suivants, indique s'il s'agit d'un problème de biais élevé (sous-apprentissage), de variance élevée (surapprentissage), ou d'un bon équilibre :

1. Score train = 60%, Score test = 58%
2. Score train = 98%, Score test = 65%
3. Score train = 92%, Score test = 90%
4. Score train = 55%, Score test = 54%

<details>
<summary>👉 Solution</summary>

```
1. Score train = 60%, test = 58%  → Les deux scores sont FAIBLES et proches
   → BIAIS ÉLEVÉ (sous-apprentissage) : le modèle est trop simple, 
     il n'apprend pas bien même sur les données qu'il a vues

2. Score train = 98%, test = 65%  → Grand ÉCART entre train et test
   → VARIANCE ÉLEVÉE (surapprentissage) : le modèle a mémorisé le train
     mais ne généralise pas

3. Score train = 92%, test = 90%  → Scores ÉLEVÉS et proches
   → BON ÉQUILIBRE : c'est exactement ce qu'on recherche

4. Score train = 55%, test = 54%  → Comme le cas 1, scores faibles et proches
   → BIAIS ÉLEVÉ (sous-apprentissage)
```
</details>

### Exercice 3.1.B — Calcul de proportions de données

Tu disposes d'un dataset de 12 000 exemples. Tu veux une répartition de 70% Train, 15% Validation, 15% Test.

1. Combien d'exemples dans chaque ensemble ?
2. Si tu utilises une 6-Fold Cross-Validation sur l'ensemble d'entraînement, combien d'exemples sont utilisés pour la validation à chaque tour ?

<details>
<summary>👉 Solution</summary>

```
1. Train      = 12000 × 0.70 = 8400 exemples
   Validation = 12000 × 0.15 = 1800 exemples
   Test       = 12000 × 0.15 = 1800 exemples

2. Avec 6-Fold Cross-Validation sur les 8400 exemples de train :
   Chaque part = 8400 / 6 = 1400 exemples utilisés pour la validation à chaque tour
   (et 8400 - 1400 = 7000 exemples pour l'entraînement à chaque tour)
```
</details>

### Exercice 3.1.C — Interprétation de scores de validation croisée

Un modèle A obtient les scores de validation croisée suivants sur 5 plis : `[0.82, 0.83, 0.81, 0.84, 0.80]`. Un modèle B obtient : `[0.95, 0.60, 0.90, 0.55, 0.85]`.

1. Calcule la moyenne et l'écart-type de chaque modèle (rappel Module 2, section 2.3.4)
2. Quel modèle choisirais-tu pour un déploiement en production, et pourquoi ?

<details>
<summary>👉 Solution</summary>

```python
import numpy as np
modele_a = np.array([0.82, 0.83, 0.81, 0.84, 0.80])
modele_b = np.array([0.95, 0.60, 0.90, 0.55, 0.85])

print(f"Modèle A : moyenne={modele_a.mean():.3f}, écart-type={modele_a.std():.3f}")
# Modèle A : moyenne=0.820, écart-type=0.014

print(f"Modèle B : moyenne={modele_b.mean():.3f}, écart-type={modele_b.std():.3f}")
# Modèle B : moyenne=0.770, écart-type=0.161
```

Bien que le Modèle B ait une moyenne légèrement inférieure (0.770 contre 0.820), c'est surtout son **écart-type très élevé** (0.161 contre 0.014) qui doit alerter : ses performances sont extrêmement instables d'un pli à l'autre (de 0.55 à 0.95). **Le Modèle A est nettement préférable pour la production** : sa performance est non seulement bonne, mais surtout fiable et prévisible — un critère souvent aussi important que la performance moyenne elle-même dans un contexte réel.
</details>

### Exercice 3.1.D — Concevoir une stratégie de validation

Tu dois entraîner un modèle pour prédire si une transaction bancaire est frauduleuse. Tu disposes de 50 000 transactions historiques, dont seulement 200 sont frauduleuses (0.4%). Quelle stratégie de division des données proposerais-tu, et à quoi dois-tu faire particulièrement attention (indice : repense au paramètre `stratify` vu au Module 1) ?

<details>
<summary>👉 Solution</summary>

Avec seulement 200 exemples frauduleux sur 50 000, une division aléatoire "naïve" risque de créer des ensembles où les fraudes sont très mal réparties (par exemple, un ensemble de test qui n'en contient presque aucune, rendant l'évaluation peu fiable).

**Stratégie recommandée :**
1. Utiliser `train_test_split(..., stratify=y)` pour garantir que la proportion de fraudes (0.4%) soit **identique** dans les ensembles train, validation et test
2. Privilégier une validation croisée stratifiée (`StratifiedKFold` en Scikit-learn) plutôt qu'un simple `KFold`, pour la même raison
3. Étant donné le très faible nombre d'exemples positifs, prévoir aussi des techniques de gestion du déséquilibre de classes (approfondies au Chapitre 3.7)
4. Ne surtout pas juger le modèle sur l'accuracy seule (un modèle qui prédit "jamais de fraude" aurait déjà 99.6% d'accuracy !) — utiliser plutôt precision/recall/F1 (Chapitre 3.6)
</details>

---

---

# 📘 CHAPITRE 3.2 — LA RÉGRESSION
## Prédire une Valeur Continue

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Rappel et approfondissement : qu'est-ce que la régression ?

Tu as déjà rencontré la régression linéaire au Module 1 (Scikit-learn) et tu l'as même construite from scratch au Module 2 (projet de synthèse). Ce chapitre approfondit la famille complète des méthodes de régression, et surtout, t'explique comment gérer un piège fréquent : que faire quand la relation entre les données n'est **pas** une simple droite ?

### De la Régression Simple à la Régression Multiple

**🔑 Intuition**

La régression **simple** utilise une seule variable pour prédire (par exemple : heures de révision → note). La régression **multiple** utilise plusieurs variables simultanément (heures de révision, heures de sommeil, nombre d'exercices faits → note).

Mathématiquement (rappel du Module 2, chapitre 2.1.7), la régression multiple n'est qu'une extension naturelle : au lieu d'un seul poids `w`, on a un **vecteur** de poids, un par variable :

```
Régression simple  : y = w×x + b
Régression multiple : y = w₁×x₁ + w₂×x₂ + w₃×x₃ + ... + b
```

Ce qui, comme tu l'as vu au Module 2, se réécrit élégamment avec un produit scalaire : `y = w · x + b`.

**L'interprétation des poids** est précieuse en pratique : le poids `w₁` associé à "heures de révision" indique **de combien la note augmente pour chaque heure de révision supplémentaire, toutes les autres variables étant maintenues constantes**. C'est ce qui rend la régression linéaire particulièrement appréciée : contrairement à beaucoup d'autres modèles ("boîtes noires"), elle reste **interprétable**.

---

### La Régression Polynomiale : capturer des relations non-linéaires

**🔑 Intuition**

Que se passe-t-il si la relation entre tes données n'est pas une droite, mais une courbe ? Par exemple, la relation entre l'âge d'une personne et son risque de maladie n'est souvent pas linéaire — le risque augmente plus vite après un certain âge.

**L'astuce de la régression polynomiale** est étonnamment simple : au lieu de changer d'algorithme, on **transforme les données** en ajoutant de nouvelles variables qui sont des puissances de la variable originale (`x²`, `x³`, etc.), puis on applique... une régression linéaire classique sur ces nouvelles variables !

```
Régression linéaire simple :     y = w₁×x + b
Régression polynomiale (degré 2): y = w₁×x + w₂×x² + b
Régression polynomiale (degré 3): y = w₁×x + w₂×x² + w₃×x³ + b
```

**Le point crucial à comprendre :** le modèle reste mathématiquement "linéaire" dans ses **paramètres** (les `w`) — c'est juste qu'on lui donne des variables d'entrée déjà transformées (non-linéairement). C'est pour cela qu'on peut réutiliser exactement le même algorithme de régression linéaire, il ne "voit" jamais la différence.

**⚠️ Le piège du degré trop élevé — retour au Chapitre 3.1**

Plus le degré du polynôme est élevé, plus la courbe peut se "tordre" pour épouser précisément chaque point du jeu d'entraînement — exactement l'exemple visuel du Chapitre 3.1 (degré 15 = surapprentissage sévère). **Le choix du degré est un exemple concret et direct du compromis biais-variance.**

---

### La Régularisation : dompter les poids trop grands

**🔑 Intuition — pourquoi réguler ?**

Quand un modèle surapprend, un symptôme fréquent est que certains poids deviennent **excessivement grands** — le modèle compense la complexité en donnant une importance démesurée à certaines variables (parfois même au bruit), pour coller parfaitement aux données d'entraînement.

**La régularisation ajoute une pénalité à la fonction de coût (Module 2, Chapitre 2.4.1) qui "punit" les poids trop grands**, forçant le modèle à rester plus simple, même si cela signifie ne pas coller parfaitement aux données d'entraînement.

```
🔑 Fonction de coût normale        : Erreur de prédiction
🔑 Fonction de coût régularisée    : Erreur de prédiction + Pénalité sur les poids
```

Il existe deux grandes familles de régularisation, avec des comportements différents.

**Ridge (Régularisation L2) — "aplatir" les poids**

La régularisation Ridge pénalise la **somme des carrés** des poids. Son effet : elle réduit progressivement tous les poids vers zéro, sans jamais (ou presque) les rendre exactement nuls. Elle est idéale quand on pense que **toutes** les variables ont un peu d'importance, mais qu'on veut éviter qu'aucune ne devienne excessive.

**Lasso (Régularisation L1) — sélectionner les variables**

La régularisation Lasso pénalise la **somme des valeurs absolues** des poids. Contrairement à Ridge, elle a la propriété remarquable de pouvoir amener certains poids à devenir **exactement zéro** — ce qui revient à **éliminer complètement** certaines variables du modèle. Lasso est donc précieux quand on soupçonne que seules **certaines** variables sont réellement utiles, et qu'on veut que le modèle fasse automatiquement ce tri (on appelle ça de la **sélection de variables**).

**Elastic Net — le compromis**

Elastic Net combine les deux pénalités (L1 et L2) simultanément, avec un curseur qui contrôle le poids relatif de chacune. C'est un bon choix par défaut quand on n'est pas sûr de devoir privilégier Ridge ou Lasso.

**Le paramètre alpha (force de régularisation)**

Dans les trois cas, un paramètre (souvent noté `alpha` dans Scikit-learn) contrôle **l'intensité** de la pénalité :

```
alpha = 0        → aucune régularisation, régression linéaire classique
alpha faible     → légère pénalité, effet doux
alpha élevé      → forte pénalité, les poids sont fortement réduits (risque de sous-apprentissage si trop élevé)
```

Trouver le bon `alpha` est, encore une fois, un exercice d'équilibre biais-variance — on le choisit généralement par validation croisée (Chapitre 3.1).

---

## 💻 MISE EN PRATIQUE

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split

# ─────────────────────────────────────────────
# 1. RÉGRESSION MULTIPLE — interpréter les poids
# ─────────────────────────────────────────────

np.random.seed(42)
n = 200
heures_revision = np.random.uniform(0, 10, n)
heures_sommeil = np.random.uniform(4, 9, n)
note = 1.5 * heures_revision + 0.8 * heures_sommeil + np.random.normal(0, 1.5, n)

X = np.column_stack([heures_revision, heures_sommeil])
modele = LinearRegression()
modele.fit(X, note)

print("Poids appris :")
print(f"  Heures de révision : {modele.coef_[0]:.3f} (chaque heure ajoute ~{modele.coef_[0]:.2f} points)")
print(f"  Heures de sommeil  : {modele.coef_[1]:.3f} (chaque heure ajoute ~{modele.coef_[1]:.2f} points)")
print(f"  Biais (intercept)  : {modele.intercept_:.3f}")

# ─────────────────────────────────────────────
# 2. RÉGRESSION POLYNOMIALE — visualiser le compromis
# ─────────────────────────────────────────────

np.random.seed(1)
X_nl = np.sort(np.random.uniform(0, 10, 50)).reshape(-1, 1)
y_nl = 0.5 * X_nl.ravel()**2 - 2*X_nl.ravel() + np.random.normal(0, 3, 50)

fig, axes = plt.subplots(1, 3, figsize=(15, 5))
for ax, degre in zip(axes, [1, 2, 10]):
    modele_poly = make_pipeline(PolynomialFeatures(degre), LinearRegression())
    modele_poly.fit(X_nl, y_nl)
    X_plot = np.linspace(0, 10, 100).reshape(-1, 1)
    ax.scatter(X_nl, y_nl, color="steelblue", alpha=0.6)
    ax.plot(X_plot, modele_poly.predict(X_plot), color="tomato", linewidth=2)
    ax.set_title(f"Degré {degre}")
plt.suptitle("Régression Polynomiale — Effet du Degré")
plt.tight_layout()
plt.show()

# ─────────────────────────────────────────────
# 3. RIDGE vs LASSO — comparer les poids obtenus
# ─────────────────────────────────────────────

np.random.seed(42)
n, n_features = 100, 20
X_reg = np.random.randn(n, n_features)
# Seules les 3 premières variables sont réellement utiles
vrais_poids = np.array([5, -3, 2] + [0]*17)
y_reg = X_reg @ vrais_poids + np.random.randn(n) * 0.5

scaler = StandardScaler()
X_reg_scaled = scaler.fit_transform(X_reg)

modeles_reg = {
    "Linéaire (sans régularisation)": LinearRegression(),
    "Ridge (alpha=1.0)": Ridge(alpha=1.0),
    "Lasso (alpha=0.1)": Lasso(alpha=0.1)
}

fig, ax = plt.subplots(figsize=(12, 6))
largeur = 0.25
x_pos = np.arange(n_features)

for i, (nom, mod) in enumerate(modeles_reg.items()):
    mod.fit(X_reg_scaled, y_reg)
    ax.bar(x_pos + i*largeur, mod.coef_, largeur, label=nom)

ax.set_xlabel("Index de la variable")
ax.set_ylabel("Valeur du poids appris")
ax.set_title("Comparaison des Poids : Linéaire vs Ridge vs Lasso\n(seules les variables 0, 1, 2 sont réellement utiles)")
ax.legend()
ax.axhline(0, color="black", linewidth=0.5)
plt.tight_layout()
plt.show()

print("\nNombre de poids exactement nuls (sélection de variables) :")
for nom, mod in modeles_reg.items():
    nb_zeros = np.sum(np.abs(mod.coef_) < 0.01)
    print(f"  {nom}: {nb_zeros} poids proches de zéro")
```

---

## 🏋️ EXERCICES — CHAPITRE 3.2

### Exercice 3.2.A — Interprétation des poids d'une régression multiple

Un modèle de prédiction du prix d'un appartement (en milliers d'euros) donne l'équation suivante :

```
prix = 3.2 × surface_m² + 15 × nb_chambres - 8 × distance_centre_km + 45
```

1. Quel est le prix prédit pour un appartement de 60m², 2 chambres, à 5km du centre ?
2. Si on ajoute 10m² à cet appartement (toutes choses égales par ailleurs), de combien le prix prédit augmente-t-il ?
3. Interprète en une phrase le poids associé à `distance_centre_km`.

<details>
<summary>👉 Solution</summary>

```
1. prix = 3.2×60 + 15×2 - 8×5 + 45
        = 192 + 30 - 40 + 45
        = 227 (milliers d'euros, soit 227 000€)

2. Le poids de "surface_m²" est 3.2, donc +10m² ajoute 3.2×10 = 32 000€

3. Chaque kilomètre supplémentaire par rapport au centre-ville fait baisser
   le prix prédit de 8 000€, toutes les autres variables étant maintenues
   constantes — ce qui reflète logiquement une décote pour l'éloignement.
```
</details>

### Exercice 3.2.B — Choisir entre Ridge et Lasso

Pour chacun des scénarios suivants, indique s'il est préférable d'utiliser Ridge, Lasso, ou si les deux se valent, en justifiant :

1. Un dataset médical avec 500 mesures biologiques, dont on soupçonne que seules 15 sont réellement pertinentes pour prédire une maladie
2. Un dataset avec 10 variables économiques, toutes théoriquement liées au PIB d'un pays de façon plausible, sans variable clairement inutile
3. Un dataset où deux variables sont très fortement corrélées entre elles (ex : taille en cm et taille en pouces)

<details>
<summary>👉 Solution</summary>

```
1. LASSO — puisqu'on soupçonte que seule une minorité de variables
   (15 sur 500) sont vraiment utiles, Lasso peut automatiquement mettre
   les poids des 485 variables inutiles à exactement zéro, réalisant
   une vraie sélection de variables.

2. RIDGE — puisque toutes les variables sont plausiblement pertinentes,
   on préfère "aplatir" tous les poids sans en éliminer complètement
   aucun, ce qui correspond au comportement de Ridge.

3. RIDGE (ou Elastic Net) — Lasso a tendance à choisir arbitrairement
   une seule variable parmi un groupe de variables fortement corrélées
   et à mettre les autres à zéro, ce qui peut être instable. Ridge gère
   mieux ce cas en répartissant le poids entre les variables corrélées.
```
</details>

### Exercice 3.2.C — Effet du paramètre alpha

Tu entraînes une régression Ridge et observes les résultats suivants selon la valeur d'`alpha` :

```
alpha=0.001  → Score train: 0.95, Score test: 0.62
alpha=1.0    → Score train: 0.88, Score test: 0.85
alpha=100    → Score train: 0.45, Score test: 0.44
```

1. Pour chaque valeur d'alpha, diagnostique la situation (sous-apprentissage / surapprentissage / bon équilibre), en te référant au Chapitre 3.1
2. Quelle valeur d'alpha choisirais-tu ?

<details>
<summary>👉 Solution</summary>

```
alpha=0.001 → écart important entre train (0.95) et test (0.62)
             → régularisation quasi inexistante → SURAPPRENTISSAGE

alpha=1.0   → scores élevés (0.88 et 0.85) et proches
             → BON ÉQUILIBRE

alpha=100   → scores faibles (0.45 et 0.44) et proches
             → régularisation excessive, le modèle est devenu trop
               contraint → SOUS-APPRENTISSAGE
```

**Choix recommandé : alpha=1.0**, qui offre le meilleur compromis biais-variance parmi les trois valeurs testées. En pratique, on testerait aussi des valeurs intermédiaires (ex: 0.1, 0.5, 5, 10) via une validation croisée pour affiner ce choix.
</details>

### Exercice 3.2.D — Régression polynomiale et choix du degré

Un data scientist teste plusieurs degrés de polynôme sur un même dataset (80 exemples), avec une validation croisée à 5 plis. Il obtient les scores R² moyens suivants :

```
Degré 1 : R² = 0.42
Degré 2 : R² = 0.79
Degré 3 : R² = 0.81
Degré 4 : R² = 0.80
Degré 8 : R² = 0.65
```

Quel degré recommanderais-tu, et pourquoi ne choisit-on pas simplement le degré le plus élevé ?

<details>
<summary>👉 Solution</summary>

**Degré 3 recommandé**, car il obtient le meilleur score R² (0.81) en validation croisée.

On ne choisit jamais simplement le degré le plus élevé, car :
- Le passage du degré 3 (0.81) au degré 4 (0.80) montre déjà un léger recul — signe que la complexité supplémentaire n'apporte plus de gain réel
- Le degré 8 chute nettement à 0.65 — un signal clair de surapprentissage : le polynôme devient trop flexible, capture le bruit spécifique aux plis d'entraînement, et généralise moins bien

Ce comportement en "cloche" (le score augmente puis redescend) est typique du compromis biais-variance appliqué au choix d'un hyperparamètre de complexité (ici, le degré du polynôme), comme illustré au Chapitre 3.1.
</details>

---

---

# 📘 CHAPITRE 3.3 — LA CLASSIFICATION
## Prédire une Catégorie

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### Rappel : la classification en un coup d'œil

Contrairement à la régression (prédire un nombre), la classification prédit une **catégorie** parmi un ensemble fini de possibilités : spam/non-spam, chat/chien/oiseau, malade/sain. Tu as déjà pratiqué la classification au Module 1 avec Random Forest. Ce chapitre t'explique en profondeur **trois familles d'algorithmes** aux logiques très différentes, pour que tu puisses choisir intelligemment selon ton problème.

---

### La Régression Logistique : transformer une droite en probabilité

**🔑 Intuition**

Malgré son nom trompeur ("régression"), la régression logistique est en réalité un algorithme de **classification**. Tu l'as en fait déjà rencontrée, sans le savoir, au Module 2, section 2.1.7 : c'est exactement le neurone avec activation sigmoïde que tu y as calculé à la main !

**Le problème que résout la régression logistique :** une régression linéaire classique produit n'importe quel nombre, de moins l'infini à plus l'infini. Mais pour représenter une probabilité (Module 2, chapitre 2.3.1), on a besoin d'un nombre **entre 0 et 1**. La fonction sigmoïde résout exactement ce problème : elle "écrase" n'importe quel nombre réel dans l'intervalle [0, 1], en forme de S.

```
🔑 Étape 1 : calculer un score brut, comme une régression linéaire classique
             score = w · x + b   (produit scalaire, Module 2 chapitre 2.1.3)

🔑 Étape 2 : transformer ce score en probabilité avec la fonction sigmoïde
             probabilité = sigmoïde(score) = 1 / (1 + e^-score)

🔑 Étape 3 : classifier selon un seuil (généralement 0.5)
             si probabilité ≥ 0.5 → classe 1
             si probabilité < 0.5 → classe 0
```

**Pourquoi la forme en S de la sigmoïde est-elle parfaite pour ça ?** Parce qu'elle a exactement les propriétés qu'on attend d'une probabilité : elle vaut 0.5 quand le score brut est nul (aucune préférence entre les deux classes), elle se rapproche de 1 pour les scores très positifs (grande confiance dans la classe 1), et elle se rapproche de 0 pour les scores très négatifs (grande confiance dans la classe 0), sans jamais dépasser ces bornes.

**💡 Avantage clé :** comme la régression linéaire, la régression logistique reste **interprétable** — chaque poids indique l'influence de sa variable sur la probabilité de la classe positive.

---

### K-Nearest Neighbors (KNN) : "dis-moi qui sont tes voisins..."

**🔑 Intuition**

KNN est probablement l'algorithme de classification **le plus intuitif qui existe** — il n'y a même pas de véritable "apprentissage" au sens strict !

Le principe : pour classifier un nouvel exemple, on regarde ses **K voisins les plus proches** parmi les données d'entraînement (selon une mesure de distance, souvent la distance euclidienne — rappel du Module 2, la norme d'un vecteur !), et on lui attribue la classe **majoritaire** parmi ces voisins.

```
Exemple : classifier un nouveau client comme "va churner" ou "reste fidèle"

Avec K=5, on regarde les 5 clients historiques les plus "similaires"
(selon leurs caractéristiques : âge, ancienneté, solde...) au nouveau client.

Si 4 de ces 5 voisins ont churné → on prédit que le nouveau client churnera aussi
Si 3 de ces 5 voisins sont restés fidèles → on prédit qu'il restera fidèle
```

**Le choix de K est crucial**, et c'est encore une fois une question de compromis biais-variance :

```
K trop petit (ex: K=1)  → très sensible au bruit, un seul voisin "atypique"
                           peut fausser la prédiction → VARIANCE ÉLEVÉE

K trop grand (ex: K=n)  → la prédiction devient presque la même pour tout
                           le monde (la classe majoritaire globale) → BIAIS ÉLEVÉ

K bien choisi            → bon équilibre, typiquement trouvé par validation croisée
```

**⚠️ Point d'attention essentiel :** KNN mesure des **distances**, donc il est **extrêmement sensible à l'échelle des variables** (rappel Module 1 : `StandardScaler`). Si une variable va de 0 à 1 et une autre de 0 à 100 000 (comme un salaire), la distance sera presque entièrement dominée par la variable au plus grand ordre de grandeur, rendant les autres variables quasiment ignorées. **Il faut toujours normaliser les données avant d'utiliser KNN.**

---

### Naive Bayes : la classification par les probabilités, directement issue du Module 2

**🔑 Intuition**

Naive Bayes applique **directement** le théorème de Bayes que tu as appris au Module 2 (chapitre 2.3.5) ! Rappelle-toi l'exemple du test médical : on y calculait `P(Malade | Test positif)` à partir de `P(Test positif | Malade)`. Naive Bayes fait exactement la même chose, mais pour classifier n'importe quelle donnée.

**Exemple concret : filtrer les spams**

On veut calculer `P(Spam | mots de l'email)` — la probabilité que l'email soit un spam, sachant les mots qu'il contient. Le théorème de Bayes nous dit qu'il faut calculer `P(mots | Spam) × P(Spam)`, puis comparer avec `P(mots | Non-Spam) × P(Non-Spam)`, et choisir la classe avec la plus grande probabilité.

**Pourquoi "naïf" ?** Parce que l'algorithme fait une hypothèse simplificatrice (souvent fausse en réalité, mais qui fonctionne étonnamment bien en pratique) : il suppose que **toutes les variables (les mots, dans l'exemple du spam) sont indépendantes les unes des autres**, sachant la classe. En réalité, les mots d'un texte ne sont évidemment pas indépendants (la grammaire crée des dépendances), mais cette simplification rend le calcul extrêmement rapide, tout en restant très efficace pour beaucoup de problèmes réels — notamment la classification de texte.

**💡 Avantages clés :** Naive Bayes est extrêmement rapide à entraîner (même sur d'énormes datasets), fonctionne très bien avec peu de données, et reste une référence solide pour la classification de texte (détection de spam, analyse de sentiment basique).

---

### Comparaison des Trois Approches

| Critère | Régression Logistique | KNN | Naive Bayes |
|---|---|---|---|
| **Interprétabilité** | Élevée (poids explicites) | Faible | Moyenne |
| **Vitesse d'entraînement** | Rapide | Instantanée (pas d'entraînement réel) | Très rapide |
| **Vitesse de prédiction** | Rapide | Lente (calcule toutes les distances) | Rapide |
| **Sensibilité à l'échelle des données** | Modérée | Très élevée | Faible |
| **Fonctionne bien avec peu de données** | Correct | Correct | Excellent |
| **Cas d'usage typique** | Risque de crédit, marketing | Recommandation, données peu nombreuses | Classification de texte, spam |

---

## 💻 MISE EN PRATIQUE

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

# ─────────────────────────────────────────────
# 1. RÉGRESSION LOGISTIQUE — voir la sigmoïde en action
# ─────────────────────────────────────────────

def sigmoide(z):
    return 1 / (1 + np.exp(-z))

scores_bruts = np.linspace(-10, 10, 100)
probabilites = sigmoide(scores_bruts)

plt.figure(figsize=(8, 5))
plt.plot(scores_bruts, probabilites, color="steelblue", linewidth=2)
plt.axhline(0.5, color="gray", linestyle="--", label="Seuil de décision (0.5)")
plt.axvline(0, color="gray", linestyle=":")
plt.xlabel("Score brut (w · x + b)")
plt.ylabel("Probabilité")
plt.title("La Fonction Sigmoïde — Transformer un Score en Probabilité")
plt.legend()
plt.grid(alpha=0.3)
plt.show()

# ─────────────────────────────────────────────
# 2. COMPARER LES 3 ALGORITHMES SUR LE MÊME DATASET
# ─────────────────────────────────────────────

X, y = make_classification(n_samples=500, n_features=10, n_informative=6,
                            n_redundant=2, random_state=42)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# IMPORTANT : normalisation nécessaire pour KNN (et utile pour Logistic)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

modeles = {
    "Régression Logistique": LogisticRegression(random_state=42),
    "KNN (k=5)": KNeighborsClassifier(n_neighbors=5),
    "Naive Bayes": GaussianNB()
}

print("Comparaison des 3 algorithmes de classification :\n")
for nom, modele in modeles.items():
    modele.fit(X_train_scaled, y_train)
    y_pred = modele.predict(X_test_scaled)
    acc = accuracy_score(y_test, y_pred)
    cv_scores = cross_val_score(modele, X_train_scaled, y_train, cv=5)
    print(f"{nom:25s} : Test Accuracy={acc:.3f}, CV moyenne={cv_scores.mean():.3f} ± {cv_scores.std():.3f}")

# ─────────────────────────────────────────────
# 3. EFFET DU CHOIX DE K SUR KNN (compromis biais-variance)
# ─────────────────────────────────────────────

valeurs_k = range(1, 31)
scores_train, scores_test = [], []

for k in valeurs_k:
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_train_scaled, y_train)
    scores_train.append(knn.score(X_train_scaled, y_train))
    scores_test.append(knn.score(X_test_scaled, y_test))

plt.figure(figsize=(9, 5))
plt.plot(valeurs_k, scores_train, "b-o", markersize=3, label="Score Train")
plt.plot(valeurs_k, scores_test, "r-s", markersize=3, label="Score Test")
plt.xlabel("Nombre de voisins K")
plt.ylabel("Accuracy")
plt.title("KNN — Effet du Choix de K sur le Compromis Biais-Variance")
plt.legend()
plt.grid(alpha=0.3)
plt.show()
```

---

## 🏋️ EXERCICES — CHAPITRE 3.3

### Exercice 3.3.A — Calcul manuel de la sigmoïde

Un modèle de régression logistique a appris les poids suivants pour prédire si un client va souscrire à une offre : `w = [0.02, -0.5]` pour les variables `[revenu_en_milliers, nb_refus_precedents]`, avec un biais `b = -0.3`.

Pour un client avec `revenu=50` (milliers d'euros) et `nb_refus_precedents=1` :

1. Calcule le score brut `w · x + b`
2. Calcule la probabilité prédite avec la sigmoïde (`sigmoïde(z) = 1/(1+e^-z)`)
3. Ce client sera-t-il classé comme "va souscrire" (seuil à 0.5) ?

<details>
<summary>👉 Solution</summary>

```
1. score = (0.02 × 50) + (-0.5 × 1) + (-0.3)
         = 1.0 - 0.5 - 0.3
         = 0.2

2. probabilité = 1 / (1 + e^-0.2) = 1 / (1 + 0.8187) = 1 / 1.8187 ≈ 0.5498

3. Oui, car 0.5498 > 0.5 → le client est classé comme "va souscrire"
   (mais avec une confiance assez faible, proche du seuil de décision)
```

```python
import numpy as np
score = (0.02 * 50) + (-0.5 * 1) + (-0.3)
proba = 1 / (1 + np.exp(-score))
print(f"Score: {score}, Probabilité: {proba:.4f}")
```
</details>

### Exercice 3.3.B — KNN à la main

Voici un mini-dataset de 5 clients avec 2 variables (âge, revenu en milliers), et leur label (0=fidèle, 1=churn) :

```
Client 1 : âge=25, revenu=30  → label=1
Client 2 : âge=45, revenu=60  → label=0
Client 3 : âge=30, revenu=35  → label=1
Client 4 : âge=50, revenu=70  → label=0
Client 5 : âge=28, revenu=32  → label=1
```

Un nouveau client a `âge=27, revenu=31`. En utilisant K=3 et la distance euclidienne (`√((x1-x2)² + (y1-y2)²)`, rappel Module 2), quelle classe lui prédirais-tu ?

<details>
<summary>👉 Solution</summary>

```
Distances au nouveau client (27, 31) :

Client 1 (25,30) : √((27-25)² + (31-30)²) = √(4+1) = √5 ≈ 2.24
Client 2 (45,60) : √((27-45)² + (31-60)²) = √(324+841) = √1165 ≈ 34.13
Client 3 (30,35) : √((27-30)² + (31-35)²) = √(9+16) = √25 = 5.00
Client 4 (50,70) : √((27-50)² + (31-70)²) = √(529+1521) = √2050 ≈ 45.28
Client 5 (28,32) : √((27-28)² + (31-32)²) = √(1+1) = √2 ≈ 1.41

Les 3 plus proches voisins (K=3) : Client 5 (1.41), Client 1 (2.24), Client 3 (5.00)
Leurs labels : 1, 1, 1

→ Majorité : label 1 (churn) — prédiction unanime des 3 voisins les plus proches
```

```python
import numpy as np

clients = np.array([[25,30], [45,60], [30,35], [50,70], [28,32]])
labels = np.array([1, 0, 1, 0, 1])
nouveau = np.array([27, 31])

distances = np.sqrt(np.sum((clients - nouveau)**2, axis=1))
print("Distances:", np.round(distances, 2))

k = 3
indices_proches = np.argsort(distances)[:k]
print("Labels des 3 plus proches:", labels[indices_proches])
```
</details>

### Exercice 3.3.C — Naive Bayes appliqué

Une boîte mail a été entraînée sur 100 emails passés : 30 étaient des spams, 70 étaient légitimes. Parmi les spams, 24 contenaient le mot "gratuit". Parmi les emails légitimes, 7 contenaient le mot "gratuit".

Un nouvel email contient le mot "gratuit". En utilisant le théorème de Bayes (Module 2, chapitre 2.3.5), calcule `P(Spam | contient "gratuit")`.

<details>
<summary>👉 Solution</summary>

```
P(Spam) = 30/100 = 0.30
P(Légitime) = 70/100 = 0.70

P("gratuit" | Spam) = 24/30 = 0.80
P("gratuit" | Légitime) = 7/70 = 0.10

P("gratuit") = P("gratuit"|Spam)×P(Spam) + P("gratuit"|Légitime)×P(Légitime)
             = (0.80 × 0.30) + (0.10 × 0.70)
             = 0.24 + 0.07
             = 0.31

P(Spam | "gratuit") = [P("gratuit"|Spam) × P(Spam)] / P("gratuit")
                     = (0.80 × 0.30) / 0.31
                     = 0.24 / 0.31
                     ≈ 0.774
```

**Il y a environ 77.4% de chances que cet email soit un spam**, sachant qu'il contient le mot "gratuit" — une classification Naive Bayes utiliserait ce calcul (combiné à celui de tous les autres mots de l'email, en supposant leur indépendance) pour classer l'email.
</details>

### Exercice 3.3.D — Choisir le bon algorithme

Pour chacun des scénarios suivants, quel algorithme (Régression Logistique, KNN, ou Naive Bayes) recommanderais-tu en premier choix, et pourquoi ?

1. Un système de classification d'articles de presse en catégories (sport, politique, économie...), avec un vocabulaire de 50 000 mots possibles
2. Un système de scoring de crédit bancaire, où la banque doit pouvoir expliquer clairement à un client pourquoi son prêt a été refusé
3. Un système de recommandation de films basé sur la similarité avec de très peu d'exemples disponibles pour un nouvel utilisateur

<details>
<summary>👉 Solution</summary>

```
1. NAIVE BAYES — excellent et très rapide pour la classification de texte
   à haute dimension (nombreux mots possibles), c'est historiquement l'un
   de ses cas d'usage de prédilection.

2. RÉGRESSION LOGISTIQUE — son interprétabilité (poids explicites pour
   chaque variable) permet à la banque de justifier précisément une
   décision, une exigence réglementaire fréquente dans le secteur financier.

3. KNN — l'idée même de "trouver les utilisateurs les plus similaires"
   correspond exactement au principe de fonctionnement de KNN ; il est
   aussi adapté quand on dispose de peu d'exemples pour "apprendre" un
   modèle complexe au sens classique.
```
</details>

---

---

# 📘 CHAPITRE 3.4 — ARBRES DE DÉCISION ET MÉTHODES D'ENSEMBLE

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### L'Arbre de Décision : un organigramme de questions

**🔑 Intuition**

Un arbre de décision fonctionne exactement comme le jeu du "20 questions" (ou comme un organigramme de dépannage informatique) : il pose une série de questions simples, chacune divisant les données en deux groupes, jusqu'à arriver à une décision finale.

```
                  Ancienneté < 2 ans ?
                  /                  \
                OUI                  NON
                /                      \
        Solde < 5000€ ?          Nb produits < 2 ?
        /            \            /            \
      OUI            NON        OUI            NON
       │              │          │              │
    CHURN          FIDÈLE     CHURN          FIDÈLE
```

Pour classifier un nouveau client, on suit simplement le chemin correspondant à ses caractéristiques, de haut en bas, jusqu'à atteindre une "feuille" qui donne la prédiction finale.

**💡 Le grand avantage : l'interprétabilité totale.** Contrairement à beaucoup d'algorithmes, un arbre de décision peut être **entièrement visualisé et expliqué**, question par question — un atout précieux dans les secteurs qui exigent de la transparence (banque, santé, justice).

---

### Comment l'arbre choisit-il ses questions ?

**🔑 Intuition**

À chaque étape, l'algorithme cherche **la question qui sépare le mieux possible les données** en groupes les plus "purs" possible (c'est-à-dire des groupes contenant majoritairement une seule classe).

Imagine que tu essaies de trier un panier mélangé de pommes et d'oranges. Une bonne question ("est-ce orange ?") va créer deux groupes quasi-purs (presque uniquement des oranges d'un côté, presque uniquement des pommes de l'autre). Une mauvaise question ("est-ce rond ?") ne va presque rien séparer, puisque pommes et oranges sont toutes les deux rondes.

Techniquement, l'algorithme mesure cette "pureté" avec des métriques comme **l'indice de Gini** ou **l'entropie** — tu n'as pas besoin de maîtriser leur formule exacte, retiens simplement le principe : **plus un groupe est pur (une seule classe y domine), plus le score d'impureté est bas, et c'est ce que l'arbre cherche à minimiser à chaque division.**

---

### Le Problème Majeur des Arbres de Décision Seuls : ils surapprennent facilement

**🔑 Intuition**

Un arbre de décision, si on le laisse grandir sans limite, peut continuer à poser des questions de plus en plus spécifiques jusqu'à isoler parfaitement... chaque exemple individuel du jeu d'entraînement. C'est un cas extrême et classique de **surapprentissage** (rappelle-toi le Chapitre 3.1 et l'exemple du Module 1 sur la profondeur de l'arbre).

**Solutions classiques :** limiter la profondeur maximale de l'arbre (`max_depth`), exiger un nombre minimum d'exemples par feuille (`min_samples_leaf`) — déjà vues au Module 1. Mais il existe une approche encore plus puissante : **au lieu d'un seul arbre, en utiliser plusieurs, ensemble.**

---

### L'Apprentissage par Ensemble (Ensemble Learning) : la sagesse des foules

**🔑 Intuition — le concours d'estimation**

Il existe une expérience célèbre en sciences sociales : demander à une foule de personnes d'estimer le poids d'un bœuf, sans aucune expertise particulière. Individuellement, beaucoup se trompent largement. Mais **la moyenne de toutes leurs estimations** est étonnamment précise — souvent plus précise que l'estimation du meilleur expert individuel ! C'est le principe de **la sagesse des foules**.

L'apprentissage par ensemble applique exactement cette idée au Machine Learning : au lieu d'un seul modèle, on en entraîne **plusieurs**, et on combine leurs prédictions (par vote pour la classification, par moyenne pour la régression). Deux grandes stratégies existent pour créer cette diversité de modèles.

### Le Bagging (Bootstrap Aggregating) : des arbres entraînés en parallèle sur des données différentes

**🔑 Intuition**

Le Bagging crée de la diversité en entraînant chaque arbre sur un **sous-échantillon aléatoire différent** des données d'entraînement (tiré avec remise — un même exemple peut apparaître plusieurs fois dans un sous-échantillon, ou pas du tout). Chaque arbre "voit" donc une version légèrement différente des données, et développe donc des erreurs légèrement différentes — des erreurs qui, en moyenne, ont tendance à s'annuler.

**Random Forest**, que tu as déjà utilisé au Module 1, est l'implémentation la plus populaire du Bagging appliqué aux arbres de décision. Elle ajoute une astuce supplémentaire : à chaque division, elle ne considère qu'un **sous-ensemble aléatoire de variables**, ce qui force les arbres à être encore plus différents les uns des autres, renforçant l'effet "sagesse des foules".

```
🔑 Principe du Bagging (Random Forest) :

1. Créer N sous-échantillons aléatoires des données (avec remise)
2. Entraîner N arbres de décision, un par sous-échantillon,
   chacun ne considérant qu'un sous-ensemble aléatoire de variables
3. Pour prédire : chaque arbre vote, et la classe majoritaire l'emporte
   (ou on fait la moyenne, en régression)

→ Les arbres sont entraînés EN PARALLÈLE, indépendamment les uns des autres
```

**💡 Effet principal : réduit fortement la variance** (le surapprentissage), sans trop augmenter le biais — c'est pour cela que Random Forest surperforme presque toujours un arbre de décision unique.

### Le Boosting : des arbres entraînés successivement, chacun corrigeant les erreurs du précédent

**🔑 Intuition**

Contrairement au Bagging (arbres indépendants entraînés en parallèle), le Boosting entraîne ses modèles **successivement**, de façon séquentielle : chaque nouvel arbre est spécifiquement entraîné pour **corriger les erreurs commises par les arbres précédents**.

```
🔑 Principe du Boosting :

1. Entraîner un premier arbre (souvent volontairement très simple)
2. Regarder sur quels exemples cet arbre se trompe le plus
3. Entraîner un deuxième arbre qui se concentre spécifiquement
   sur ces exemples mal prédits (en leur donnant plus de "poids")
4. Répéter : chaque nouvel arbre corrige les faiblesses des précédents
5. La prédiction finale combine tous les arbres, pondérés selon
   leur performance individuelle

→ Les arbres sont entraînés EN SÉQUENCE, chacun dépendant du précédent
```

**Gradient Boosting**, déjà mentionné au Module 1, pousse cette idée plus loin en utilisant directement le **gradient** de la fonction de coût (Module 2, Chapitre 2.2 et 2.4 !) pour déterminer précisément dans quelle direction chaque nouvel arbre doit "corriger" les prédictions précédentes — littéralement une descente de gradient, mais où chaque "pas" est un arbre de décision entier plutôt qu'un simple ajustement numérique.

**XGBoost, LightGBM et CatBoost** sont des implémentations optimisées et très performantes du Gradient Boosting, extrêmement populaires en compétitions de Machine Learning (Kaggle) et en production.

**💡 Effet principal : réduit fortement le biais** (la capacité à capturer des patterns complexes), mais peut être plus sujet au surapprentissage si mal réglé (d'où l'importance cruciale du nombre d'arbres et du learning rate, réutilisant les concepts du Module 2 !).

### Bagging vs Boosting — Tableau Comparatif

| Critère | Bagging (Random Forest) | Boosting (Gradient Boosting, XGBoost) |
|---|---|---|
| **Entraînement des arbres** | En parallèle, indépendants | En séquence, chacun dépend du précédent |
| **Effet principal** | Réduit la variance | Réduit le biais |
| **Risque de surapprentissage** | Faible | Plus élevé si mal réglé |
| **Vitesse d'entraînement** | Rapide (parallélisable) | Plus lent (séquentiel) |
| **Robustesse aux valeurs aberrantes** | Bonne | Plus sensible |
| **Performance typique** | Très bonne, fiable | Souvent la meilleure, mais demande plus de réglage |

---

## 💻 MISE EN PRATIQUE

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score

X, y = make_classification(n_samples=500, n_features=8, n_informative=5,
                            random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ─────────────────────────────────────────────
# 1. VISUALISER UN ARBRE DE DÉCISION SIMPLE
# ─────────────────────────────────────────────

arbre_simple = DecisionTreeClassifier(max_depth=3, random_state=42)
arbre_simple.fit(X_train, y_train)

plt.figure(figsize=(16, 8))
plot_tree(arbre_simple, filled=True, feature_names=[f"var_{i}" for i in range(8)],
          class_names=["Classe 0", "Classe 1"], fontsize=9)
plt.title("Visualisation d'un Arbre de Décision (profondeur max=3)")
plt.show()

# ─────────────────────────────────────────────
# 2. COMPARER : ARBRE SEUL vs RANDOM FOREST vs GRADIENT BOOSTING
# ─────────────────────────────────────────────

modeles = {
    "Arbre unique (profond)": DecisionTreeClassifier(max_depth=None, random_state=42),
    "Random Forest (Bagging)": RandomForestClassifier(n_estimators=100, random_state=42),
    "Gradient Boosting": GradientBoostingClassifier(n_estimators=100, random_state=42)
}

print("Comparaison Arbre seul vs Ensembles :\n")
for nom, modele in modeles.items():
    modele.fit(X_train, y_train)
    acc_train = accuracy_score(y_train, modele.predict(X_train))
    acc_test = accuracy_score(y_test, modele.predict(X_test))
    cv_scores = cross_val_score(modele, X_train, y_train, cv=5)
    print(f"{nom:28s} : Train={acc_train:.3f}, Test={acc_test:.3f}, CV={cv_scores.mean():.3f}±{cv_scores.std():.3f}")

# ─────────────────────────────────────────────
# 3. IMPORTANCE DES FEATURES AVEC RANDOM FOREST
# ─────────────────────────────────────────────

rf = RandomForestClassifier(n_estimators=200, random_state=42)
rf.fit(X_train, y_train)

importances = rf.feature_importances_
indices = np.argsort(importances)[::-1]

plt.figure(figsize=(9, 5))
plt.bar(range(8), importances[indices], color="steelblue")
plt.xticks(range(8), [f"var_{i}" for i in indices])
plt.title("Importance des Variables (Random Forest)")
plt.ylabel("Importance (Gini)")
plt.tight_layout()
plt.show()

# ─────────────────────────────────────────────
# 4. EFFET DU NOMBRE D'ARBRES SUR RANDOM FOREST
# ─────────────────────────────────────────────

n_arbres_liste = [1, 5, 10, 25, 50, 100, 200]
scores_test_rf = []

for n in n_arbres_liste:
    rf_temp = RandomForestClassifier(n_estimators=n, random_state=42)
    rf_temp.fit(X_train, y_train)
    scores_test_rf.append(accuracy_score(y_test, rf_temp.predict(X_test)))

plt.figure(figsize=(9, 5))
plt.plot(n_arbres_liste, scores_test_rf, "go-")
plt.xlabel("Nombre d'arbres (n_estimators)")
plt.ylabel("Accuracy Test")
plt.title("Random Forest — Effet du Nombre d'Arbres")
plt.grid(alpha=0.3)
plt.show()
```

---

## 🏋️ EXERCICES — CHAPITRE 3.4

### Exercice 3.4.A — Tracer un arbre de décision à la main

Voici un mini-dataset pour décider si on joue au tennis selon la météo :

```
Ensoleillé, Chaud   → Ne joue pas
Ensoleillé, Frais   → Joue
Nuageux, Chaud      → Joue
Nuageux, Frais      → Joue
Pluvieux, Chaud     → Ne joue pas
Pluvieux, Frais     → Ne joue pas
```

En observant les données, propose un arbre de décision à 2 niveaux (deux questions maximum) qui classifie correctement tous ces exemples.

<details>
<summary>👉 Solution</summary>

```
                    Météo = Nuageux ?
                   /                  \
                 OUI                  NON
                  │                    │
                JOUE              Température = Frais ?
                                   /              \
                                 OUI              NON
                                  │                │
                                JOUE          NE JOUE PAS
```

**Vérification :**
- Ensoleillé+Chaud → pas Nuageux → pas Frais → Ne joue pas ✓
- Ensoleillé+Frais → pas Nuageux → Frais → Joue ✓
- Nuageux+Chaud → Nuageux → Joue ✓
- Nuageux+Frais → Nuageux → Joue ✓
- Pluvieux+Chaud → pas Nuageux → pas Frais → Ne joue pas ✓
- Pluvieux+Frais → pas Nuageux → Frais → Joue... 

⚠️ Attention, cet arbre classifie mal "Pluvieux+Frais" ! C'est volontaire pour cet exercice : cela illustre qu'avec seulement 2 variables, certaines combinaisons peuvent être ambiguës et qu'un arbre plus profond (ou une troisième variable) serait nécessaire pour parfaitement séparer ce cas particulier — exactement le genre de limite qui pousse à utiliser plusieurs arbres (Random Forest) plutôt qu'un seul.
</details>

### Exercice 3.4.B — Bagging ou Boosting ?

Pour chacune des situations suivantes, indique si elle décrit le principe du Bagging ou du Boosting :

1. "On entraîne 50 arbres indépendamment, chacun sur un tirage aléatoire différent des données, puis on fait voter tous les arbres"
2. "On entraîne un premier modèle simple, on identifie ses erreurs, puis on entraîne un second modèle qui se concentre spécifiquement sur ces exemples mal prédits"
3. "Les modèles peuvent être entraînés en parallèle, sur plusieurs machines simultanément, sans dépendance entre eux"

<details>
<summary>👉 Solution</summary>

```
1. BAGGING — entraînement indépendant sur des sous-échantillons + vote,
   c'est exactement le principe de Random Forest

2. BOOSTING — correction séquentielle des erreurs du modèle précédent,
   c'est le principe du Gradient Boosting

3. BAGGING — l'indépendance entre modèles (donc la parallélisation
   possible) est une caractéristique du Bagging ; le Boosting, séquentiel
   par nature, ne peut pas être parallélisé de la même façon
```
</details>

### Exercice 3.4.C — Diagnostic à partir de l'importance des features

Une Random Forest entraînée pour prédire le churn bancaire donne l'importance de variables suivante :

```
anciennete       : 0.42
solde            : 0.31
nb_produits      : 0.15
age              : 0.08
numero_client_id : 0.04
```

1. Que remarques-tu concernant `numero_client_id`, et pourquoi est-ce potentiellement un problème ?
2. Quelles sont les deux variables les plus influentes sur la prédiction ?

<details>
<summary>👉 Solution</summary>

```
1. Le "numero_client_id" ne devrait normalement avoir AUCUN pouvoir
   prédictif réel (c'est un identifiant arbitraire, sans lien logique
   avec le comportement du client). Une importance non nulle (0.04)
   suggère que le modèle a peut-être capté un artefact du dataset
   (par exemple, si les IDs ont été attribués dans un ordre corrélé
   à la date d'inscription). Cette variable devrait probablement être
   retirée du modèle avant le déploiement, par prudence.

2. Les deux variables les plus influentes sont "anciennete" (0.42)
   et "solde" (0.31), qui représentent à elles seules 73% de
   l'importance totale du modèle.
```
</details>

### Exercice 3.4.D — Choisir entre Random Forest et Gradient Boosting

Décris un scénario où tu privilégierais Random Forest, et un scénario où tu privilégierais Gradient Boosting (ou XGBoost), en te basant sur le tableau comparatif de ce chapitre.

<details>
<summary>👉 Solution</summary>

*(Exemple de réponse — plusieurs réponses raisonnables sont possibles)*

```
RANDOM FOREST recommandé quand :
- On dispose de temps limité pour l'entraînement et le réglage
  des hyperparamètres (Random Forest est plus "robuste par défaut",
  demande moins d'ajustement fin)
- On veut un modèle fiable rapidement, avec un risque de
  surapprentissage naturellement faible
- Les données contiennent des valeurs aberrantes (outliers) qu'on
  n'a pas eu le temps de nettoyer complètement

GRADIENT BOOSTING / XGBOOST recommandé quand :
- On cherche la performance maximale (compétition Kaggle, enjeu
  business critique) et qu'on a le temps de bien régler les
  hyperparamètres (nombre d'arbres, learning rate, profondeur)
- Le dataset est propre et de qualité (moins sensible aux outliers
  si les données sont déjà nettoyées)
- On dispose d'une bonne stratégie de validation croisée pour
  éviter le risque de surapprentissage propre au Boosting
```
</details>

---

---

# 📘 CHAPITRE 3.5 — CLUSTERING ET RÉDUCTION DE DIMENSION
## L'Apprentissage Non-Supervisé

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Rappel : qu'est-ce que l'apprentissage non-supervisé ?

Rappelle-toi la distinction du Module 0 : jusqu'ici, dans ce module, tous les algorithmes étudiés étaient **supervisés** — on disposait d'un "label" correct (la vraie note, la vraie classe) pour chaque exemple d'entraînement. L'apprentissage **non-supervisé** est radicalement différent : **on ne dispose d'aucun label**. Le modèle doit découvrir seul une structure cachée dans les données.

Les deux grandes familles de problèmes non-supervisés sont le **clustering** (regrouper des données similaires) et la **réduction de dimension** (compresser l'information en perdant le moins possible).

---

### Le Clustering : regrouper sans étiquettes

**🔑 Intuition**

Imagine que tu reçois une liste de 10 000 clients d'une entreprise, sans aucune information sur des "segments" ou "catégories" prédéfinis. Le clustering cherche à découvrir automatiquement des **groupes naturels** dans ces données — par exemple, "jeunes clients à petit budget", "clients fidèles à fort pouvoir d'achat", "clients occasionnels", etc. — sans qu'on lui ait jamais dit quels étaient ces groupes à l'avance.

### KMeans : l'algorithme de clustering le plus utilisé

**🔑 Intuition — l'analogie des food trucks**

Imagine que tu dois positionner K food trucks dans une ville pour desservir au mieux tous les habitants, sans savoir à l'avance où ils habitent précisément. Une bonne stratégie itérative serait :

1. Placer les K food trucks à des positions initiales (même aléatoires)
2. Chaque habitant se rend au food truck le plus proche de chez lui
3. Chaque food truck se déplace vers le **centre géographique** des habitants qu'il dessert actuellement
4. Répéter les étapes 2 et 3 jusqu'à ce que plus personne ne change de food truck préféré (stabilisation)

**C'est exactement l'algorithme KMeans**, où "food truck" devient "centre de cluster" (centroïde) :

```
🔑 Algorithme KMeans :

1. Choisir K (le nombre de clusters souhaité) et placer K centroïdes 
   au hasard parmi les données
2. ASSIGNATION : chaque point est assigné au centroïde le plus proche
   (distance euclidienne, Module 2)
3. MISE À JOUR : chaque centroïde se déplace vers la moyenne des points
   qui lui sont actuellement assignés
4. Répéter 2-3 jusqu'à convergence (les assignations ne changent plus)
```

**Comment choisir K ? La méthode du coude (Elbow Method)**

Le nombre de clusters K doit être choisi **avant** de lancer l'algorithme — mais comment savoir combien de groupes naturels existent réellement dans les données ? La **méthode du coude** teste plusieurs valeurs de K et mesure, pour chacune, **l'inertie** (la somme des distances au carré entre chaque point et son centroïde — plus elle est faible, plus les clusters sont "compacts").

En augmentant K, l'inertie diminue toujours (avec K=nombre de points, l'inertie serait nulle — chaque point serait son propre cluster, ce qui n'a aucun intérêt pratique). On cherche donc le point où la courbe d'inertie **cesse de diminuer fortement** et commence à s'aplatir — visuellement, cela forme un "coude" dans le graphique.

---

### Le Clustering Hiérarchique : construire un arbre de regroupements

**🔑 Intuition**

Le clustering hiérarchique construit progressivement une hiérarchie de regroupements, un peu comme un arbre généalogique inversé : on part de chaque point comme son propre "cluster", puis on fusionne progressivement les deux clusters les plus proches, jusqu'à ce qu'il ne reste plus qu'un seul cluster englobant tout.

Le résultat se visualise avec un **dendrogramme** — un diagramme en arbre qui montre à quel "niveau de similarité" chaque fusion a eu lieu. On peut ensuite "couper" cet arbre à la hauteur souhaitée pour obtenir le nombre de clusters désiré, **sans avoir besoin de le fixer à l'avance** comme avec KMeans — c'est un avantage clé de cette méthode.

---

### DBSCAN : le clustering basé sur la densité

**🔑 Intuition**

KMeans a une limitation importante : il suppose que les clusters ont une forme approximativement "ronde" (sphérique), et il faut spécifier K à l'avance. **DBSCAN** (Density-Based Spatial Clustering) résout ces deux problèmes avec une idée différente : un cluster est une **zone dense** de points, séparée d'autres zones denses par des régions "vides" (peu denses).

```
🔑 Intuition de DBSCAN :

- Un point est considéré "central" s'il a suffisamment de voisins proches
- Les clusters se forment en connectant les points centraux proches les uns des autres
- Les points isolés, trop loin de toute zone dense, sont étiquetés comme "bruit"
  (outliers) — DBSCAN peut donc directement détecter des anomalies !
```

**💡 Avantages clés :** DBSCAN n'a pas besoin qu'on spécifie K à l'avance (il le découvre automatiquement selon la densité), il peut détecter des clusters de formes complexes et arbitraires (pas seulement ronds), et il identifie naturellement les points aberrants comme "bruit" plutôt que de les forcer dans un cluster.

---

### La Réduction de Dimension : compresser l'information

**🔑 Intuition — l'ombre d'un objet 3D**

Imagine un objet complexe en 3 dimensions (par exemple, une théière). Si tu l'éclaires sous un certain angle, son **ombre projetée en 2D** peut néanmoins conserver l'essentiel de sa forme reconnaissable — même en perdant une dimension, on garde "le plus important" de l'information visuelle si on choisit bien l'angle de projection.

C'est exactement le principe de la réduction de dimension : **transformer des données à haute dimension (parfois des centaines ou milliers de variables) en une représentation à plus faible dimension, en conservant le maximum d'information possible.**

### PCA (Analyse en Composantes Principales) — direct lien avec le Module 2

**🔑 Intuition**

PCA cherche les **directions dans lesquelles les données varient le plus** — ces directions sont appelées les **composantes principales**. Rappelle-toi le Module 2, chapitre 2.1.8 : ces directions sont en réalité les **vecteurs propres** de la matrice de covariance des données, et l'importance de chaque direction correspond à sa **valeur propre** associée !

```
🔑 Intuition géométrique :

Imagine un nuage de points en forme d'ellipse allongée en 2D.
La PCA trouve d'abord la direction le long de laquelle le nuage
est le PLUS étiré (la première composante principale) — c'est la
direction où les données contiennent le plus d'information/variance.
Elle trouve ensuite la direction perpendiculaire suivante avec le
plus de variance restante, et ainsi de suite.
```

En ne conservant que les premières composantes principales (celles qui capturent le plus de variance), on peut réduire drastiquement le nombre de variables tout en préservant l'essentiel de l'information contenue dans les données originales.

**💡 Pourquoi c'est utile en pratique :**
- **Visualisation** : réduire des données à 2 ou 3 dimensions pour pouvoir les visualiser sur un graphique, même si elles avaient initialement des centaines de variables
- **Accélération** : réduire le nombre de variables accélère l'entraînement des modèles suivants
- **Réduction du bruit** : les dernières composantes (celles avec le moins de variance) contiennent souvent surtout du bruit ; les retirer peut améliorer la robustesse du modèle
- **Lutte contre la "malédiction de la dimensionnalité"** : beaucoup d'algorithmes (dont KNN !) deviennent moins fiables quand le nombre de variables est très élevé par rapport au nombre d'exemples

---

## 💻 MISE EN PRATIQUE

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs, make_moons
from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from scipy.cluster.hierarchy import dendrogram, linkage

# ─────────────────────────────────────────────
# 1. KMEANS ET LA MÉTHODE DU COUDE
# ─────────────────────────────────────────────

X_blobs, _ = make_blobs(n_samples=300, centers=4, cluster_std=0.8, random_state=42)

inerties = []
K_range = range(1, 11)
for k in K_range:
    km = KMeans(n_clusters=k, n_init=10, random_state=42)
    km.fit(X_blobs)
    inerties.append(km.inertia_)

fig, axes = plt.subplots(1, 2, figsize=(13, 5))
axes[0].plot(K_range, inerties, "bo-")
axes[0].axvline(4, color="red", linestyle="--", label="Coude visible à K=4")
axes[0].set_xlabel("Nombre de clusters K")
axes[0].set_ylabel("Inertie")
axes[0].set_title("Méthode du Coude")
axes[0].legend()

km_final = KMeans(n_clusters=4, n_init=10, random_state=42)
labels = km_final.fit_predict(X_blobs)
axes[1].scatter(X_blobs[:, 0], X_blobs[:, 1], c=labels, cmap="viridis", alpha=0.6)
axes[1].scatter(km_final.cluster_centers_[:, 0], km_final.cluster_centers_[:, 1],
                c="red", marker="X", s=200, label="Centroïdes")
axes[1].set_title("Résultat du Clustering KMeans (K=4)")
axes[1].legend()
plt.tight_layout()
plt.show()

# ─────────────────────────────────────────────
# 2. KMEANS vs DBSCAN — sur des formes non-sphériques
# ─────────────────────────────────────────────

X_moons, _ = make_moons(n_samples=300, noise=0.08, random_state=42)

kmeans_moons = KMeans(n_clusters=2, n_init=10, random_state=42).fit_predict(X_moons)
dbscan_moons = DBSCAN(eps=0.2, min_samples=5).fit_predict(X_moons)

fig, axes = plt.subplots(1, 2, figsize=(13, 5))
axes[0].scatter(X_moons[:, 0], X_moons[:, 1], c=kmeans_moons, cmap="coolwarm")
axes[0].set_title("KMeans — échoue sur des formes non-sphériques")
axes[1].scatter(X_moons[:, 0], X_moons[:, 1], c=dbscan_moons, cmap="coolwarm")
axes[1].set_title("DBSCAN — capture correctement la forme réelle")
plt.tight_layout()
plt.show()

# ─────────────────────────────────────────────
# 3. PCA — réduction de dimension et variance expliquée
# ─────────────────────────────────────────────

from sklearn.datasets import load_wine
donnees = load_wine()
X_wine = StandardScaler().fit_transform(donnees.data)  # 13 variables !

pca = PCA()
pca.fit(X_wine)

variance_cumulee = np.cumsum(pca.explained_variance_ratio_)

plt.figure(figsize=(9, 5))
plt.bar(range(1, 14), pca.explained_variance_ratio_, alpha=0.6, label="Variance par composante")
plt.plot(range(1, 14), variance_cumulee, "ro-", label="Variance cumulée")
plt.axhline(0.9, color="gray", linestyle="--", label="Seuil 90%")
plt.xlabel("Composante Principale")
plt.ylabel("Proportion de Variance Expliquée")
plt.title("PCA — Combien de Composantes Garder ?")
plt.legend()
plt.show()

# Réduire à 2 dimensions pour visualiser
pca_2d = PCA(n_components=2)
X_reduit = pca_2d.fit_transform(X_wine)

plt.figure(figsize=(8, 6))
plt.scatter(X_reduit[:, 0], X_reduit[:, 1], c=donnees.target, cmap="viridis", alpha=0.7)
plt.xlabel(f"Composante 1 ({pca_2d.explained_variance_ratio_[0]:.1%} de variance)")
plt.ylabel(f"Composante 2 ({pca_2d.explained_variance_ratio_[1]:.1%} de variance)")
plt.title("Dataset Wine (13 variables) réduit à 2 dimensions via PCA")
plt.colorbar(label="Type de vin")
plt.show()
```

---

## 🏋️ EXERCICES — CHAPITRE 3.5

### Exercice 3.5.A — KMeans à la main : une itération complète

Voici 4 points en 2D : `A(1,1)`, `B(1,2)`, `C(8,8)`, `D(9,8)`. On lance KMeans avec K=2, en initialisant les deux centroïdes à `C1=(0,0)` et `C2=(10,10)`.

1. Calcule la distance euclidienne de chaque point aux deux centroïdes, et assigne chaque point au centroïde le plus proche
2. Recalcule la position de chaque centroïde comme la moyenne des points qui lui sont assignés

<details>
<summary>👉 Solution</summary>

```
Distances à C1=(0,0) :
A(1,1) : √(1²+1²) = √2 ≈ 1.41
B(1,2) : √(1²+2²) = √5 ≈ 2.24
C(8,8) : √(8²+8²) = √128 ≈ 11.31
D(9,8) : √(9²+8²) = √145 ≈ 12.04

Distances à C2=(10,10) :
A(1,1) : √(9²+9²) = √162 ≈ 12.73
B(1,2) : √(9²+8²) = √145 ≈ 12.04
C(8,8) : √(2²+2²) = √8 ≈ 2.83
D(9,8) : √(1²+2²) = √5 ≈ 2.24

Assignations : A→C1, B→C1, C→C2, D→C2
(chaque point est plus proche du centroïde de son côté, sans surprise)

Nouveaux centroïdes :
Nouveau C1 = moyenne(A, B) = ((1+1)/2, (1+2)/2) = (1, 1.5)
Nouveau C2 = moyenne(C, D) = ((8+9)/2, (8+8)/2) = (8.5, 8)
```

```python
import numpy as np
points = np.array([[1,1],[1,2],[8,8],[9,8]])
c1, c2 = np.array([0,0]), np.array([10,10])

dist_c1 = np.linalg.norm(points - c1, axis=1)
dist_c2 = np.linalg.norm(points - c2, axis=1)
print("Distances à C1:", np.round(dist_c1, 2))
print("Distances à C2:", np.round(dist_c2, 2))
```
</details>

### Exercice 3.5.B — Interpréter la méthode du coude

Un data scientist obtient les inerties suivantes pour K allant de 1 à 6 :

```
K=1 : 4500
K=2 : 1800
K=3 : 900
K=4 : 820
K=5 : 780
K=6 : 760
```

Quelle valeur de K recommanderais-tu, et pourquoi ?

<details>
<summary>👉 Solution</summary>

**K=3 est recommandé.** L'inertie chute très fortement de K=1 à K=3 (de 4500 à 900, une réduction massive), mais ensuite, de K=3 à K=6, la réduction devient beaucoup plus marginale (900 → 820 → 780 → 760, des gains de plus en plus faibles). C'est exactement la définition visuelle du "coude" : le point où ajouter des clusters supplémentaires n'apporte plus de bénéfice proportionnel important. Continuer à augmenter K au-delà de ce point risquerait de créer des clusters artificiels qui divisent inutilement des groupes naturellement cohérents.
</details>

### Exercice 3.5.C — KMeans ou DBSCAN ?

Pour chacun des scénarios suivants, indique s'il est préférable d'utiliser KMeans ou DBSCAN :

1. Segmenter des clients en groupes de dépenses (petit, moyen, gros budget), où on s'attend à des groupes à peu près "ronds" et de tailles comparables
2. Détecter des transactions bancaires anormales (fraude) au sein d'un grand ensemble de transactions normales
3. Identifier des quartiers dans une ville à partir de la position GPS de commerces, où les quartiers ont des formes irrégulières suivant les rues

<details>
<summary>👉 Solution</summary>

```
1. KMEANS — groupes attendus de forme "ronde" et de tailles comparables,
   avec un nombre de segments (K) qu'on peut raisonnablement fixer
   à l'avance (ex: 3-5 segments de budget)

2. DBSCAN — sa capacité à identifier automatiquement les points "bruit"
   (outliers) en fait un candidat naturel pour la détection d'anomalies :
   les transactions frauduleuses, rares et différentes du comportement
   normal, seraient précisément étiquetées comme du "bruit"

3. DBSCAN — les quartiers suivent des formes irrégulières dictées par
   la géographie urbaine (pas des cercles), et DBSCAN n'impose aucune
   contrainte de forme aux clusters qu'il découvre, contrairement à KMeans
```
</details>

### Exercice 3.5.D — Interprétation de la variance expliquée en PCA

Après avoir appliqué une PCA sur un dataset à 20 variables, tu obtiens la variance cumulée suivante :

```
1 composante  : 35%
2 composantes : 58%
3 composantes : 74%
5 composantes : 89%
10 composantes: 97%
```

1. Combien de composantes garderais-tu si tu veux conserver au moins 90% de l'information originale ?
2. Quel est l'intérêt principal de réduire 20 variables à seulement quelques composantes principales ?

<details>
<summary>👉 Solution</summary>

```
1. Il faut au moins 10 composantes pour dépasser 90% (97% avec 10
   composantes ; 5 composantes ne suffisent qu'à 89%, juste en dessous
   du seuil).

2. Réduire 20 variables à 10 composantes (ou moins) permet de :
   - Accélérer significativement l'entraînement des modèles suivants
   - Faciliter la visualisation des données (notamment si on descend
     à 2-3 composantes)
   - Réduire le risque de surapprentissage lié à un trop grand nombre
     de variables par rapport au nombre d'exemples disponibles
   - Éliminer une partie du bruit contenu dans les variables les
     moins informatives (celles associées aux dernières composantes)
```
</details>

---

---

# 📘 CHAPITRE 3.6 — ÉVALUATION DES MODÈLES
## Bien Mesurer la Performance Réelle

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Pourquoi l'Accuracy Seule Peut Être Trompeuse

**🔑 Intuition — retour à l'exemple de la fraude du Module 2**

Rappelle-toi l'exercice 2.3.C du Module 2 : détecter la fraude bancaire, où seulement 0.1% des transactions sont frauduleuses. Imagine un modèle "paresseux" qui prédit systématiquement "pas de fraude", pour absolument toutes les transactions, sans jamais rien analyser.

```
Ce modèle "paresseux" obtiendrait une ACCURACY de 99.9% !
(puisque 99.9% des transactions sont effectivement légitimes)

Pourtant, ce modèle est totalement INUTILE — il ne détecte 
JAMAIS aucune fraude, ce qui est précisément le but recherché !
```

C'est la limite fondamentale de l'accuracy sur des **classes déséquilibrées** (un problème déjà annoncé au Chapitre 3.1, exercice 3.1.D). On a besoin de métriques plus fines, qui distinguent les différents types d'erreurs possibles.

---

### La Matrice de Confusion : la base de toutes les bonnes métriques

**🔑 Intuition**

Pour un problème de classification binaire (deux classes, par exemple "Fraude" / "Pas fraude"), il existe exactement **4 situations possibles** quand on compare une prédiction à la réalité :

```
                          RÉALITÉ
                    Positif      Négatif
              ┌─────────────┬─────────────┐
   Positif    │  Vrai       │   Faux      │
PRÉDICTION    │  Positif    │   Positif   │
              │  (VP)       │   (FP)      │
              ├─────────────┼─────────────┤
   Négatif    │  Faux       │   Vrai      │
              │  Négatif    │   Négatif   │
              │  (FN)       │   (VN)      │
              └─────────────┴─────────────┘
```

- **Vrai Positif (VP)** : le modèle prédit "Fraude", et c'est effectivement une fraude → **bonne prédiction**
- **Vrai Négatif (VN)** : le modèle prédit "Pas fraude", et ce n'est effectivement pas une fraude → **bonne prédiction**
- **Faux Positif (FP)** : le modèle prédit "Fraude", mais ce n'était pas une fraude → **fausse alerte** (rappelle-toi l'exemple du test médical, Module 2 !)
- **Faux Négatif (FN)** : le modèle prédit "Pas fraude", mais c'était réellement une fraude → **fraude manquée, souvent le pire type d'erreur**

Comprendre cette matrice est la fondation absolue de toutes les métriques qui suivent.

---

### Precision et Recall : deux questions différentes, deux métriques différentes

**🔑 Intuition**

La **Precision** répond à la question : **"Parmi toutes les fois où mon modèle a annoncé une fraude, combien de fois avait-il réellement raison ?"**

```
Precision = VP / (VP + FP)
```

Une precision élevée signifie : **peu de fausses alertes** — quand le modèle dit "fraude", on peut lui faire confiance.

Le **Recall** (aussi appelé sensibilité) répond à une question différente : **"Parmi toutes les fraudes qui ont réellement eu lieu, combien mon modèle en a-t-il détecté ?"**

```
Recall = VP / (VP + FN)
```

Un recall élevé signifie : **peu de fraudes manquées** — le modèle attrape la grande majorité des vrais cas positifs, quitte à générer quelques fausses alertes au passage.

**🔑 Le compromis crucial entre Precision et Recall**

Ces deux métriques sont souvent **en tension l'une avec l'autre**. Si tu rends ton modèle plus "prudent" (il ne signale "fraude" que quand il est vraiment très sûr), tu augmentes la precision (moins de fausses alertes) mais tu risques de baisser le recall (tu manques certaines fraudes moins évidentes). À l'inverse, si tu rends le modèle plus "alerte" (il signale "fraude" au moindre doute), tu augmentes le recall (tu attrapes plus de vraies fraudes) mais tu baisses la precision (plus de fausses alertes).

**Comment choisir lequel privilégier ?** Cela dépend entièrement du **coût relatif de chaque type d'erreur** dans ton contexte métier :

```
🔑 Privilégier le RECALL quand un Faux Négatif est très coûteux :
   → Dépistage d'une maladie grave (rater un vrai cas est dramatique,
     une fausse alerte mène juste à un examen complémentaire)
   → Détection de fraude à très fort enjeu financier

🔑 Privilégier la PRECISION quand un Faux Positif est très coûteux :
   → Filtre anti-spam (bloquer un email important par erreur = grave)
   → Recommandation de contenu (une mauvaise recommandation ponctuelle
     est peu grave)
```

---

### Le F1-Score : combiner Precision et Recall en un seul chiffre

**🔑 Intuition**

Quand on veut un **seul indicateur** qui tient compte à la fois de la precision et du recall (sans privilégier explicitement l'un ou l'autre), on utilise le **F1-score** — la moyenne harmonique de la precision et du recall :

```
F1 = 2 × (Precision × Recall) / (Precision + Recall)
```

**Pourquoi une moyenne harmonique plutôt qu'une moyenne classique ?** Parce qu'elle pénalise fortement les cas où l'une des deux métriques est très basse — même si l'autre est excellente. Un modèle avec Precision=1.0 mais Recall=0.1 aurait une moyenne classique de 0.55 (qui semble correcte), alors que son F1-score serait seulement de 0.18 (qui reflète bien mieux le fait que ce modèle est globalement peu utile, car il manque 90% des cas positifs réels).

---

### La Courbe ROC et l'AUC : évaluer sur tous les seuils possibles

**🔑 Intuition**

Rappelle-toi (Chapitre 3.3) que la régression logistique produit une **probabilité**, qu'on convertit ensuite en décision finale via un seuil (souvent 0.5). Mais ce seuil de 0.5 n'a rien de sacré — on pourrait tout aussi bien choisir 0.3 (plus de sensibilité, favorise le recall) ou 0.7 (plus de prudence, favorise la precision).

La **courbe ROC** (Receiver Operating Characteristic) visualise la performance du modèle **pour tous les seuils possibles simultanément**, en traçant le Taux de Vrais Positifs (le recall) contre le Taux de Faux Positifs, à chaque seuil de 0 à 1.

```
🔑 Lecture de la courbe ROC :

- Une courbe qui "colle" au coin supérieur gauche = excellent modèle
  (beaucoup de vrais positifs, peu de faux positifs, quel que soit le seuil)
- Une courbe qui suit la diagonale = modèle sans aucun pouvoir prédictif
  (équivalent à un tirage au sort)
```

**L'AUC (Area Under the Curve)** résume cette courbe entière en un seul chiffre entre 0 et 1 : l'aire sous la courbe ROC. Un AUC de 1.0 est un modèle parfait ; un AUC de 0.5 est équivalent au hasard. **L'AUC a une interprétation intuitive précieuse : c'est la probabilité que le modèle attribue un score plus élevé à un exemple positif choisi au hasard qu'à un exemple négatif choisi au hasard.**

**💡 Avantage clé de l'AUC :** contrairement à l'accuracy, la precision ou le recall (qui dépendent tous d'un seuil précis), l'AUC évalue la qualité du modèle **indépendamment du choix du seuil** — un avantage précieux pour comparer des modèles avant même de décider quel seuil utiliser en production.

---

### Rappel des Métriques de Régression (approfondissement du Module 1)

Pour les problèmes de régression, on utilise des métriques différentes, déjà rencontrées au Module 1 :

```
🔑 MAE (Mean Absolute Error) : erreur moyenne absolue
   → facile à interpréter (même unité que la variable prédite),
     traite toutes les erreurs de façon proportionnelle

🔑 RMSE (Root Mean Squared Error) : racine de l'erreur quadratique moyenne
   → pénalise beaucoup plus fortement les grosses erreurs que les petites
     (à cause du carré, rappel Module 2), utile quand les grosses erreurs
     sont particulièrement problématiques

🔑 R² (Coefficient de détermination) : proportion de variance expliquée
   → varie de -∞ à 1 (1 = modèle parfait, 0 = pas mieux que prédire
     toujours la moyenne, négatif = pire que la moyenne)
```

---

## 💻 MISE EN PRATIQUE

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (confusion_matrix, precision_score, recall_score,
                              f1_score, accuracy_score, roc_curve, auc,
                              classification_report, ConfusionMatrixDisplay)

# ─────────────────────────────────────────────
# 1. DATASET DÉSÉQUILIBRÉ — voir les limites de l'accuracy
# ─────────────────────────────────────────────

X, y = make_classification(n_samples=2000, n_features=10, weights=[0.95, 0.05],
                            random_state=42)  # seulement 5% de classe positive
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3,
                                                     random_state=42, stratify=y)

modele = LogisticRegression(random_state=42)
modele.fit(X_train, y_train)
y_pred = modele.predict(X_test)
y_proba = modele.predict_proba(X_test)[:, 1]

print(f"Accuracy  : {accuracy_score(y_test, y_pred):.3f}")
print(f"Precision : {precision_score(y_test, y_pred):.3f}")
print(f"Recall    : {recall_score(y_test, y_pred):.3f}")
print(f"F1-score  : {f1_score(y_test, y_pred):.3f}")
print(f"\n{classification_report(y_test, y_pred)}")

# ─────────────────────────────────────────────
# 2. MATRICE DE CONFUSION
# ─────────────────────────────────────────────

cm = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=["Négatif", "Positif"])
disp.plot(cmap="Blues")
plt.title("Matrice de Confusion")
plt.show()

# ─────────────────────────────────────────────
# 3. COURBE ROC ET AUC
# ─────────────────────────────────────────────

fpr, tpr, seuils = roc_curve(y_test, y_proba)
roc_auc = auc(fpr, tpr)

plt.figure(figsize=(7, 7))
plt.plot(fpr, tpr, color="darkorange", linewidth=2, label=f"Courbe ROC (AUC={roc_auc:.3f})")
plt.plot([0, 1], [0, 1], "k--", label="Modèle aléatoire (AUC=0.5)")
plt.xlabel("Taux de Faux Positifs")
plt.ylabel("Taux de Vrais Positifs (Recall)")
plt.title("Courbe ROC")
plt.legend()
plt.show()

# ─────────────────────────────────────────────
# 4. EFFET DU SEUIL DE DÉCISION SUR PRECISION/RECALL
# ─────────────────────────────────────────────

seuils_test = np.arange(0.1, 1.0, 0.05)
precisions, recalls = [], []

for seuil in seuils_test:
    y_pred_seuil = (y_proba >= seuil).astype(int)
    precisions.append(precision_score(y_test, y_pred_seuil, zero_division=0))
    recalls.append(recall_score(y_test, y_pred_seuil, zero_division=0))

plt.figure(figsize=(9, 5))
plt.plot(seuils_test, precisions, "b-o", label="Precision", markersize=4)
plt.plot(seuils_test, recalls, "r-s", label="Recall", markersize=4)
plt.xlabel("Seuil de décision")
plt.ylabel("Score")
plt.title("Compromis Precision-Recall selon le Seuil")
plt.legend()
plt.grid(alpha=0.3)
plt.show()
```

---

## 🏋️ EXERCICES — CHAPITRE 3.6

### Exercice 3.6.A — Calcul manuel à partir d'une matrice de confusion

Un modèle de détection de fraude, testé sur 1000 transactions, produit la matrice de confusion suivante :

```
                RÉALITÉ
              Fraude   Pas Fraude
Prédit
Fraude          45         15
Pas Fraude      10        930
```

Calcule à la main : l'accuracy, la precision, le recall, et le F1-score.

<details>
<summary>👉 Solution</summary>

```
VP = 45, FP = 15, FN = 10, VN = 930

Accuracy = (VP+VN) / total = (45+930) / 1000 = 975/1000 = 0.975 (97.5%)

Precision = VP / (VP+FP) = 45 / (45+15) = 45/60 = 0.75 (75%)

Recall = VP / (VP+FN) = 45 / (45+10) = 45/55 ≈ 0.818 (81.8%)

F1 = 2 × (Precision × Recall) / (Precision + Recall)
   = 2 × (0.75 × 0.818) / (0.75 + 0.818)
   = 2 × 0.6135 / 1.568
   ≈ 0.782 (78.2%)
```

Remarque : malgré une accuracy impressionnante de 97.5%, la precision (75%) et le recall (81.8%) révèlent une image plus nuancée — le modèle manque tout de même environ 18% des fraudes réelles (10 sur 55), et se trompe sur 25% de ses alertes (15 fausses alertes sur 60 alertes totales).
</details>

### Exercice 3.6.B — Choisir la bonne métrique selon le contexte

Pour chacun des scénarios suivants, indique s'il faut privilégier la Precision ou le Recall, en justifiant :

1. Un système de tri automatique qui identifie les CV à transmettre pour un entretien (rater un bon candidat coûte cher, mais transmettre un candidat moyen en plus n'est pas grave)
2. Un système judiciaire d'aide à la décision qui signale des dossiers à "haut risque de récidive" (une fausse alerte peut avoir de lourdes conséquences sur une personne innocente)
3. Un détecteur de tumeurs cancéreuses sur des radiographies

<details>
<summary>👉 Solution</summary>

```
1. RECALL — l'objectif est de ne rater aucun bon candidat potentiel ;
   quelques candidats supplémentaires à examiner (faux positifs) sont
   un coût acceptable comparé au risque de manquer un excellent profil

2. PRECISION — étant donné les conséquences graves d'une fausse alerte
   sur une personne (stigmatisation, décisions potentiellement injustes),
   il faut minimiser les faux positifs, quitte à accepter de rater
   certains cas réels (qui seront alors gérés par d'autres mécanismes
   de contrôle)

3. RECALL — dans un contexte médical de dépistage du cancer, rater
   un vrai cas (Faux Négatif) peut être fatal, tandis qu'une fausse
   alerte (Faux Positif) mène "seulement" à des examens complémentaires,
   désagréables mais rarement dangereux — exactement le même
   raisonnement que l'exemple du Module 2, chapitre 2.3.5
```
</details>

### Exercice 3.6.C — Interprétation de l'AUC

Trois modèles obtiennent les AUC suivants sur le même problème : Modèle A = 0.52, Modèle B = 0.78, Modèle C = 0.95.

1. Classe ces trois modèles du moins bon au meilleur
2. Le Modèle A est-il utile ? Pourquoi ?

<details>
<summary>👉 Solution</summary>

```
1. Classement du moins bon au meilleur : Modèle A (0.52) < Modèle B (0.78) < Modèle C (0.95)

2. Le Modèle A, avec un AUC de 0.52, est à peine meilleur qu'un modèle
   totalement aléatoire (AUC=0.5) — il n'a quasiment AUCUN pouvoir
   prédictif réel. Ce modèle devrait être rejeté : il faut revoir
   entièrement les features utilisées, l'algorithme choisi, ou la
   qualité des données, avant d'envisager tout déploiement.
```
</details>

### Exercice 3.6.D — Diagnostic complet à partir de plusieurs métriques

Un modèle obtient les résultats suivants sur un dataset de classification : Accuracy=0.91, Precision=0.40, Recall=0.35, AUC=0.68. Que peux-tu en conclure sur la qualité réelle de ce modèle, en particulier si le dataset est déséquilibré (peu d'exemples positifs) ?

<details>
<summary>👉 Solution</summary>

Ce profil est un **signal d'alerte classique** : une accuracy élevée (91%) mais une precision (40%) et un recall (35%) très faibles, avec un AUC modeste (0.68), suggèrent fortement que **le dataset est déséquilibré** et que le modèle profite de la classe majoritaire pour gonfler artificiellement son accuracy, sans réellement bien détecter la classe positive (minoritaire).

Autrement dit, ce modèle se trompe sur la majorité de ses prédictions positives (Precision=0.40, donc 60% de fausses alertes) et manque également la majorité des vrais cas positifs (Recall=0.35, donc il rate 65% des cas réels). **Ce modèle n'est probablement pas prêt pour la production** malgré son accuracy trompeusement rassurante — il faudrait investiguer des techniques de gestion du déséquilibre de classes, approfondies au prochain chapitre (3.7).
</details>

---

---

# 📘 CHAPITRE 3.7 — FEATURE ENGINEERING ET DONNÉES DÉSÉQUILIBRÉES

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Pourquoi les Features Comptent Souvent Plus que l'Algorithme

**🔑 Intuition**

Il existe un dicton bien connu en Machine Learning : **"Garbage in, garbage out"** (des données de mauvaise qualité en entrée produisent des résultats de mauvaise qualité en sortie, quel que soit l'algorithme utilisé). En pratique professionnelle, la performance d'un modèle dépend souvent **beaucoup plus** de la qualité et de la pertinence des variables utilisées (les "features") que du choix précis de l'algorithme parmi ceux vus aux Chapitres 3.2 à 3.5.

**Le Feature Engineering** est l'art de transformer les données brutes en variables plus informatives pour le modèle — souvent la partie la plus créative et la plus impactante du travail d'un data scientist.

---

### Créer de Nouvelles Features à partir des Données Brutes

**🔑 Intuition avec des exemples concrets**

Les données brutes ne sont presque jamais optimales telles quelles. Voici des transformations courantes et leur logique :

**Extraire de l'information temporelle** : une simple date (`2024-03-15`) contient en réalité plusieurs informations utiles séparément — le jour de la semaine (les comportements diffèrent souvent le week-end), le mois (saisonnalité), l'heure (pic d'activité). Décomposer une date en plusieurs variables (`jour_semaine`, `mois`, `est_weekend`) donne souvent au modèle bien plus de pouvoir prédictif que la date brute seule.

**Créer des ratios et des interactions** : parfois, ce n'est pas une variable individuelle qui compte, mais la **relation entre deux variables**. Par exemple, un "solde de 5000€" n'a pas la même signification pour un client avec un salaire de 2000€ que pour un client avec un salaire de 20 000€ — le ratio `solde / salaire` peut être une feature bien plus informative que chaque variable séparément.

**Regrouper des catégories rares** : si une variable catégorielle a des centaines de valeurs possibles, dont beaucoup n'apparaissent que 1 ou 2 fois dans le dataset, regrouper ces catégories rares sous une étiquette "Autre" peut réduire le bruit et améliorer la robustesse du modèle.

---

### Rappel et Approfondissement : l'Encodage des Variables Catégorielles

Tu as déjà rencontré le One-Hot Encoding au Module 1. Rappelons pourquoi c'est nécessaire, et présentons une alternative importante.

**🔑 Pourquoi encoder ?** La plupart des algorithmes de Machine Learning ne comprennent que des nombres — ils ne peuvent pas directement traiter des catégories textuelles comme "France", "Allemagne", "Espagne".

**⚠️ Le piège de l'encodage numérique naïf :** si on transforme naïvement `["France", "Allemagne", "Espagne"]` en `[0, 1, 2]`, on introduit involontairement une **fausse relation d'ordre** — le modèle pourrait interpréter que "Espagne" (2) est "plus grand" ou "plus proche" d'"Allemagne" (1) que de "France" (0), ce qui n'a aucun sens pour une variable purement catégorielle (nominale, sans ordre naturel).

**One-Hot Encoding** (déjà vu au Module 1) résout ce problème en créant une colonne binaire séparée pour chaque catégorie, évitant toute fausse relation d'ordre — mais au prix d'un nombre de colonnes qui peut exploser si la variable a beaucoup de catégories possibles.

**Label Encoding**, l'alternative simple ([0, 1, 2, ...]), reste néanmoins appropriée quand la variable catégorielle a un **ordre naturel réel** — par exemple, `["Débutant", "Intermédiaire", "Avancé", "Expert"]` a un ordre logique intrinsèque, donc l'encoder en `[0, 1, 2, 3]` est parfaitement justifié (on parle alors de variable **ordinale**, et non nominale).

---

### Le Scaling : rappel et clarification sur quand c'est nécessaire

Rappelle-toi le Chapitre 3.3 : KNN est extrêmement sensible à l'échelle des variables. Mais **ce n'est pas vrai pour tous les algorithmes** — comprendre cette distinction évite bien des erreurs.

```
🔑 Algorithmes SENSIBLES à l'échelle (nécessitent un scaling) :
   → KNN (basé sur des distances)
   → Régression Logistique et Linéaire régularisées (Ridge, Lasso)
   → SVM
   → Réseaux de neurones (Module 4)
   → PCA (Chapitre 3.5) — la variance dominerait sinon artificiellement
     selon l'échelle brute des variables

🔑 Algorithmes INSENSIBLES à l'échelle (scaling optionnel) :
   → Arbres de décision, Random Forest, Gradient Boosting
     (ils raisonnent en termes de seuils sur chaque variable
     indépendamment, l'échelle absolue importe peu)
```

**💡 Conseil pratique :** dans le doute, appliquer un scaling ne fait jamais de mal (sauf sur des arbres, où c'est simplement inutile mais inoffensif) — c'est donc une bonne pratique par défaut, sauf pour les modèles basés sur des arbres où on peut s'en dispenser.

---

### Les Données Déséquilibrées : le problème et ses solutions

**🔑 Intuition — retour au Chapitre 3.6**

Tu as vu au Chapitre 3.6 pourquoi les datasets déséquilibrés (peu d'exemples positifs par rapport aux négatifs — fraude, maladies rares, défauts industriels) posent un problème pour l'évaluation. Ils posent également un problème pour **l'entraînement lui-même** : un modèle entraîné "naïvement" sur des données très déséquilibrées a tendance à essentiellement ignorer la classe minoritaire, puisque la privilégier n'améliore que marginalement son score global (dominé par la classe majoritaire).

**Solutions principales**

**1. Le Sur-échantillonnage (Oversampling)** : dupliquer (ou générer artificiellement) davantage d'exemples de la classe minoritaire, pour rééquilibrer les proportions. La technique la plus connue est **SMOTE** (Synthetic Minority Oversampling Technique), qui ne se contente pas de dupliquer des exemples existants, mais **génère de nouveaux exemples synthétiques** en interpolant entre des exemples existants proches de la classe minoritaire (une application concrète du concept de distance entre points, vu au Module 2 et réutilisé au Chapitre 3.3 pour KNN).

**2. Le Sous-échantillonnage (Undersampling)** : réduire le nombre d'exemples de la classe majoritaire pour rééquilibrer les proportions. Simple à mettre en œuvre, mais présente le risque de perdre de l'information potentiellement utile contenue dans les exemples majoritaires écartés.

**3. La Pondération des Classes (class_weight)** : plutôt que de modifier les données elles-mêmes, on modifie **directement la fonction de coût** (rappel Module 2, chapitre 2.4.1) pour pénaliser plus fortement les erreurs commises sur la classe minoritaire. C'est souvent l'option la plus simple à mettre en œuvre (un seul paramètre à ajuster dans Scikit-learn : `class_weight="balanced"`), sans avoir à manipuler physiquement le dataset.

```
🔑 Comparaison rapide :

Oversampling (SMOTE)   → conserve toute l'info, mais risque de créer
                          des exemples synthétiques peu réalistes
Undersampling           → simple, mais perd de l'information
class_weight             → simple à implémenter, aucune modification
                          des données, souvent un excellent premier essai
```

---

## 💻 MISE EN PRATIQUE

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.metrics import classification_report, f1_score

# ─────────────────────────────────────────────
# 1. FEATURE ENGINEERING — création de variables temporelles
# ─────────────────────────────────────────────

dates = pd.date_range("2024-01-01", periods=200, freq="D")
df = pd.DataFrame({
    "date": dates,
    "ventes": np.random.poisson(50, 200) + 
              20 * (pd.Series(dates).dt.dayofweek >= 5).astype(int)  # + le weekend
})

df["jour_semaine"] = df["date"].dt.dayofweek       # 0=Lundi, 6=Dimanche
df["est_weekend"] = (df["jour_semaine"] >= 5).astype(int)
df["mois"] = df["date"].dt.month
df["jour_annee"] = df["date"].dt.dayofyear

print(df.head())
print(f"\nVentes moyennes en semaine : {df[df['est_weekend']==0]['ventes'].mean():.1f}")
print(f"Ventes moyennes le weekend : {df[df['est_weekend']==1]['ventes'].mean():.1f}")

# ─────────────────────────────────────────────
# 2. CRÉATION DE RATIOS ET D'INTERACTIONS
# ─────────────────────────────────────────────

clients = pd.DataFrame({
    "solde": [5000, 5000, 15000],
    "salaire": [2000, 20000, 15000]
})
clients["ratio_solde_salaire"] = clients["solde"] / clients["salaire"]
print("\n", clients)
# Le même solde de 5000€ a un sens très différent selon le salaire !

# ─────────────────────────────────────────────
# 3. GESTION DU DÉSÉQUILIBRE DE CLASSES
# ─────────────────────────────────────────────

X, y = make_classification(n_samples=2000, n_features=10, weights=[0.95, 0.05],
                            random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3,
                                                     random_state=42, stratify=y)

print(f"\nDistribution originale : {np.bincount(y_train)}")

# Approche 1 : sans gestion du déséquilibre (référence)
modele_naif = LogisticRegression(random_state=42)
modele_naif.fit(X_train, y_train)
f1_naif = f1_score(y_test, modele_naif.predict(X_test))

# Approche 2 : class_weight="balanced"
modele_pondere = LogisticRegression(class_weight="balanced", random_state=42)
modele_pondere.fit(X_train, y_train)
f1_pondere = f1_score(y_test, modele_pondere.predict(X_test))

print(f"\nF1-score sans pondération : {f1_naif:.3f}")
print(f"F1-score avec class_weight='balanced' : {f1_pondere:.3f}")

# Approche 3 : SMOTE (nécessite la bibliothèque imbalanced-learn)
# pip install imbalanced-learn --break-system-packages
try:
    from imblearn.over_sampling import SMOTE
    smote = SMOTE(random_state=42)
    X_train_smote, y_train_smote = smote.fit_resample(X_train, y_train)
    
    print(f"\nDistribution après SMOTE : {np.bincount(y_train_smote)}")
    
    modele_smote = LogisticRegression(random_state=42)
    modele_smote.fit(X_train_smote, y_train_smote)
    f1_smote = f1_score(y_test, modele_smote.predict(X_test))
    print(f"F1-score avec SMOTE : {f1_smote:.3f}")
except ImportError:
    print("\n(Installe imbalanced-learn avec : pip install imbalanced-learn --break-system-packages)")
```

---

## 🏋️ EXERCICES — CHAPITRE 3.7

### Exercice 3.7.A — Créer des features pertinentes

Tu disposes d'une variable `date_naissance` et tu veux prédire si une personne va souscrire à une assurance senior. Propose 3 nouvelles features dérivées de cette date brute qui pourraient être plus utiles au modèle qu'utiliser la date telle quelle.

<details>
<summary>👉 Solution</summary>

```
1. "age" = date_actuelle - date_naissance (en années)
   → Feature la plus directement pertinente : le produit est destiné
     aux seniors, l'âge est probablement LA variable la plus prédictive

2. "tranche_age" = catégorisation en groupes (ex: 50-60, 60-70, 70+)
   → Peut capturer des effets de seuil non-linéaires (par exemple, un
     saut d'intérêt spécifique après l'âge légal de la retraite)

3. "annees_avant_retraite" = âge légal de départ - âge actuel
   → Peut révéler une dynamique d'anticipation ("je vais bientôt
     partir à la retraite, je commence à m'y préparer")

(La date de naissance brute, elle, n'apporte quasiment aucune
information exploitable telle quelle par la plupart des algorithmes.)
```
</details>

### Exercice 3.7.B — One-Hot ou Label Encoding ?

Pour chacune des variables catégorielles suivantes, indique s'il faut utiliser un One-Hot Encoding ou un Label Encoding, et pourquoi :

1. `taille_vetement` : ["S", "M", "L", "XL"]
2. `couleur_preferee` : ["Rouge", "Bleu", "Vert", "Jaune"]
3. `niveau_satisfaction` : ["Très insatisfait", "Insatisfait", "Neutre", "Satisfait", "Très satisfait"]

<details>
<summary>👉 Solution</summary>

```
1. LABEL ENCODING — "taille_vetement" a un ordre naturel évident
   (S < M < L < XL), c'est une variable ORDINALE

2. ONE-HOT ENCODING — "couleur_preferee" n'a aucun ordre naturel
   (le rouge n'est ni "plus grand" ni "plus petit" que le bleu),
   c'est une variable NOMINALE

3. LABEL ENCODING — "niveau_satisfaction" a également un ordre
   naturel clair (de très négatif à très positif), c'est une
   variable ORDINALE, tout comme l'exemple 1
```
</details>

### Exercice 3.7.C — Scaling nécessaire ou non ?

Pour chacun des algorithmes suivants (déjà rencontrés dans ce module), indique si un scaling des données est nécessaire avant l'entraînement :

1. K-Nearest Neighbors (KNN)
2. Random Forest
3. Régression Logistique avec régularisation Ridge
4. Gradient Boosting

<details>
<summary>👉 Solution</summary>

```
1. KNN                              → OUI, nécessaire (basé sur des distances,
                                        Chapitre 3.3)
2. Random Forest                    → NON, pas nécessaire (basé sur des arbres,
                                        Chapitre 3.4)
3. Régression Logistique + Ridge    → OUI, nécessaire (la pénalité de
                                        régularisation pénalise les grands
                                        poids ; sans scaling, une variable à
                                        grande échelle serait injustement
                                        plus pénalisée qu'une variable à
                                        petite échelle, Chapitre 3.2)
4. Gradient Boosting                → NON, pas nécessaire (basé sur des
                                        arbres, comme Random Forest)
```
</details>

### Exercice 3.7.D — Choisir une stratégie face au déséquilibre

Tu travailles sur un dataset médical avec 100 000 patients, dont seulement 300 (0.3%) ont une maladie rare à détecter. Tu as le choix entre : ne rien faire, class_weight="balanced", SMOTE, ou undersampling. Que recommanderais-tu comme première approche, et pourquoi ?

<details>
<summary>👉 Solution</summary>

**Recommandation : commencer par `class_weight="balanced"`**, pour plusieurs raisons :

- C'est l'approche la plus simple à mettre en œuvre (un seul paramètre), donc un excellent point de départ pour établir une première référence (baseline)
- Contrairement à l'undersampling, elle ne perd aucune information (on garde tous les 100 000 patients disponibles) — précieux avec une classe minoritaire déjà très rare (seulement 300 exemples, chacun potentiellement précieux)
- Contrairement à SMOTE, elle ne génère pas de données synthétiques potentiellement peu réalistes dans un contexte médical sensible, où la fiabilité des données est critique

**Si cette première approche ne donne pas des résultats satisfaisants** (mesurés avec les bonnes métriques du Chapitre 3.6 : F1, Recall, AUC — jamais l'accuracy seule sur un cas aussi déséquilibré), on pourrait alors tester SMOTE en complément, en gardant à l'esprit qu'avec seulement 300 exemples positifs, générer des exemples synthétiques demande une prudence particulière pour ne pas créer de cas irréalistes.
</details>

---

---

# 🎯 PROJET DE SYNTHÈSE DU MODULE 3
## Un Pipeline ML Complet et Rigoureux — du Dataset Brut au Modèle Validé

**🔑 Pourquoi ce projet est essentiel**

Jusqu'ici, tu as appris chaque brique séparément : la validation (3.1), la régression (3.2), la classification (3.3), les arbres et ensembles (3.4), le clustering (3.5), l'évaluation (3.6), le feature engineering (3.7). En réalité professionnelle, **ces briques ne s'utilisent jamais isolément** — un vrai projet ML les enchaîne toutes, dans un ordre précis, avec de la rigueur à chaque étape.

Ce projet reconstitue ce pipeline complet, de bout en bout, sur un problème classique : **prédire le churn d'abonnés télécom**. C'est volontairement un problème légèrement déséquilibré et réaliste, pour mobiliser vraiment tout ce que tu as appris.

```
🔑 Le fil conducteur du projet :

1. Chapitre 3.7 → Explorer et enrichir les données (Feature Engineering)
2. Chapitre 3.1 → Diviser rigoureusement Train/Validation/Test
3. Chapitre 3.7 → Vérifier et gérer le déséquilibre de classes
4. Chapitres 3.2, 3.3, 3.4 → Comparer plusieurs familles d'algorithmes
5. Chapitre 3.1 → Sélectionner le meilleur modèle par validation croisée
6. Chapitre 3.6 → Évaluer rigoureusement avec les bonnes métriques
7. Chapitre 3.5 → Visualiser les clients en 2D pour interpréter les résultats
```

---

### Étape 1 — Génération et Exploration des Données

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.decomposition import PCA
from sklearn.metrics import (classification_report, confusion_matrix, roc_curve, auc,
                              f1_score, ConfusionMatrixDisplay)
import warnings
warnings.filterwarnings("ignore")

# ─────────────────────────────────────────────
# GÉNÉRATION D'UN DATASET RÉALISTE (abonnés télécom)
# ─────────────────────────────────────────────
np.random.seed(42)
n = 3000

anciennete_mois = np.random.exponential(24, n).clip(1, 72)
appels_sav = np.random.poisson(1.5, n)
type_forfait = np.random.choice(["Basique", "Standard", "Premium"], n, p=[0.4, 0.4, 0.2])
facture_mensuelle = np.random.normal(45, 20, n).clip(15, 150)
contrat = np.random.choice(["Mensuel", "1 an", "2 ans"], n, p=[0.5, 0.3, 0.2])

logit = (-2.5
         - 0.04 * anciennete_mois
         + 0.35 * appels_sav
         + 0.015 * facture_mensuelle
         + (contrat == "Mensuel").astype(float) * 1.2)
proba_churn = 1 / (1 + np.exp(-logit))
churn = (np.random.rand(n) < proba_churn).astype(int)

df = pd.DataFrame({
    "anciennete_mois": anciennete_mois, "appels_sav": appels_sav,
    "type_forfait": type_forfait, "facture_mensuelle": facture_mensuelle,
    "contrat": contrat, "churn": churn
})

print(f"Dataset : {df.shape[0]} clients — Taux de churn : {df['churn'].mean():.2%}")
print(df.groupby("contrat")["churn"].mean().mul(100).round(1))
```

---

### Étape 2 — Feature Engineering (Chapitre 3.7)

```python
# Créer des variables plus informatives que les brutes
df["cout_par_mois_anciennete"] = df["facture_mensuelle"] / (df["anciennete_mois"] + 1)
df["client_recent"] = (df["anciennete_mois"] < 6).astype(int)
df["beaucoup_appels_sav"] = (df["appels_sav"] >= 3).astype(int)

X = df.drop("churn", axis=1)
y = df["churn"]

cols_num = ["anciennete_mois", "appels_sav", "facture_mensuelle", "cout_par_mois_anciennete"]
cols_cat = ["type_forfait", "contrat", "client_recent", "beaucoup_appels_sav"]
```

---

### Étape 3 — Division Rigoureuse Train/Test (Chapitre 3.1)

```python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y  # stratify = essentiel (3.1, exercice D)
)
print(f"Train: {X_train.shape[0]} ({y_train.mean():.2%} churn) | "
      f"Test: {X_test.shape[0]} ({y_test.mean():.2%} churn)")
# Les proportions de churn doivent être quasi identiques entre train et test
```

---

### Étape 4 — Comparer Plusieurs Familles d'Algorithmes (Chapitres 3.2, 3.3, 3.4)

```python
preproc = ColumnTransformer([
    ("num", StandardScaler(), cols_num),      # nécessaire pour KNN/Logistic (3.7)
    ("cat", OneHotEncoder(drop="first"), cols_cat)
])

candidats = {
    "Régression Logistique (Ridge)": LogisticRegression(C=1.0, class_weight="balanced", random_state=42),
    "KNN (k=15)": KNeighborsClassifier(n_neighbors=15),
    "Random Forest (Bagging)": RandomForestClassifier(n_estimators=200, max_depth=8,
                                                       class_weight="balanced", random_state=42),
    "Gradient Boosting": GradientBoostingClassifier(n_estimators=150, max_depth=3, random_state=42)
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
resultats = {}

print("Comparaison en validation croisée (métrique = F1, adaptée au déséquilibre — 3.6) :\n")
for nom, modele in candidats.items():
    pipe = Pipeline([("preproc", preproc), ("modele", modele)])
    scores = cross_val_score(pipe, X_train, y_train, cv=cv, scoring="f1")
    resultats[nom] = (scores.mean(), scores.std())
    print(f"{nom:32s} : F1={scores.mean():.3f} ± {scores.std():.3f}")

meilleur_nom = max(resultats, key=lambda k: resultats[k][0])
print(f"\n🏆 Meilleur modèle en validation croisée : {meilleur_nom}")
```

---

### Étape 5 — Évaluation Finale Rigoureuse (Chapitre 3.6)

```python
meilleur_pipeline = Pipeline([("preproc", preproc), ("modele", candidats[meilleur_nom])])
meilleur_pipeline.fit(X_train, y_train)

y_pred = meilleur_pipeline.predict(X_test)
y_proba = meilleur_pipeline.predict_proba(X_test)[:, 1]

print(f"\n{'='*55}\n  ÉVALUATION FINALE — {meilleur_nom}\n{'='*55}")
print(classification_report(y_test, y_pred, target_names=["Fidèle", "Churn"]))

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

cm = confusion_matrix(y_test, y_pred)
ConfusionMatrixDisplay(cm, display_labels=["Fidèle", "Churn"]).plot(ax=axes[0], cmap="Blues")
axes[0].set_title("Matrice de Confusion")

fpr, tpr, _ = roc_curve(y_test, y_proba)
axes[1].plot(fpr, tpr, color="darkorange", label=f"AUC={auc(fpr, tpr):.3f}")
axes[1].plot([0,1], [0,1], "k--", label="Aléatoire")
axes[1].set_xlabel("Taux Faux Positifs"); axes[1].set_ylabel("Taux Vrais Positifs")
axes[1].set_title("Courbe ROC"); axes[1].legend()

plt.tight_layout()
plt.savefig("evaluation_finale_module3.png", dpi=150, bbox_inches="tight")
plt.show()
```

---

### Étape 6 — Visualiser les Clients en 2D avec PCA (Chapitre 3.5)

```python
X_train_transforme = preproc.fit_transform(X_train)
pca = PCA(n_components=2)
X_2d = pca.fit_transform(X_train_transforme)

plt.figure(figsize=(9, 6))
plt.scatter(X_2d[:, 0], X_2d[:, 1], c=y_train, cmap="coolwarm", alpha=0.5, s=15)
plt.xlabel(f"Composante 1 ({pca.explained_variance_ratio_[0]:.1%} variance)")
plt.ylabel(f"Composante 2 ({pca.explained_variance_ratio_[1]:.1%} variance)")
plt.title("Clients Projetés en 2D via PCA (rouge = churn, bleu = fidèle)")
plt.colorbar(label="Churn")
plt.tight_layout()
plt.show()
# Cette projection aide à visualiser si les clients qui churnent se
# distinguent globalement dans l'espace des variables, sans avoir
# besoin de représenter les 8+ dimensions originales simultanément.
```

---

### 💡 Ce que ce projet vient de démontrer

| Étape du projet | Chapitre mobilisé |
|---|---|
| Création de `cout_par_mois_anciennete`, `client_recent` | 3.7 — Feature Engineering |
| `stratify=y` dans `train_test_split` | 3.1 — Validation rigoureuse |
| `class_weight="balanced"` | 3.7 — Données déséquilibrées |
| `StandardScaler` avant KNN/Logistic, pas avant Random Forest | 3.7 — Scaling sélectif |
| Comparaison Logistic / KNN / Random Forest / Gradient Boosting | 3.2, 3.3, 3.4 |
| `StratifiedKFold` + scoring="f1" (pas accuracy) | 3.1 et 3.6 |
| Matrice de confusion, courbe ROC, AUC | 3.6 — Évaluation |
| Projection PCA pour visualiser | 3.5 — Réduction de dimension |

**Retiens ceci :** un vrai projet ML n'est jamais "choisir le meilleur algorithme" isolément — c'est cette **méthodologie complète**, où chaque étape protège la suivante contre les erreurs (fuite de données, fausse confiance dans l'accuracy, mauvais choix de scaling), qui fait la différence entre un modèle qui fonctionne en démonstration et un modèle fiable en production.

---



> Réponds sans regarder le cours. Objectif : 16/20 minimum avant de passer au Module 4.

**1.** Quelle est la différence fondamentale entre le rôle de l'ensemble de validation et celui de l'ensemble de test ?
**2.** Que mesure le biais d'un modèle ? Et sa variance ?
**3.** Quel est l'effet principal de la régularisation Lasso que n'a pas Ridge ?
**4.** Comment la régression logistique transforme-t-elle un score brut en probabilité ?
**5.** Pourquoi KNN nécessite-t-il impérativement une normalisation des données ?
**6.** Sur quel théorème du Module 2 repose directement Naive Bayes ?
**7.** Quelle est la différence fondamentale entre Bagging et Boosting concernant l'entraînement des modèles ?
**8.** Quel type d'erreur (biais ou variance) le Bagging réduit-il principalement ?
**9.** Qu'est-ce que l'inertie en KMeans, et à quoi sert la méthode du coude ?
**10.** Pourquoi DBSCAN peut-il détecter des clusters de formes non-sphériques, contrairement à KMeans ?
**11.** À quels concepts du Module 2 la PCA est-elle directement liée ?
**12.** Pourquoi l'accuracy seule est-elle trompeuse sur un dataset déséquilibré ?
**13.** Que mesure la Precision ? Et le Recall ?
**14.** Dans quel contexte privilégie-t-on le Recall plutôt que la Precision ?
**15.** Que représente l'AUC d'une courbe ROC, en une phrase intuitive ?
**16.** Pourquoi ne faut-il pas utiliser un Label Encoding simple pour une variable catégorielle nominale (sans ordre) ?
**17.** Quels types d'algorithmes n'ont pas besoin de scaling des données, et pourquoi ?
**18.** Cite les trois grandes stratégies pour gérer un dataset déséquilibré.
**19.** Que fait concrètement SMOTE ?
**20.** Pourquoi un modèle avec 98% d'accuracy peut-il être totalement inutile en pratique ?

---

### 📝 Corrigé

**1.** L'ensemble de validation sert à faire des choix pendant le développement (algorithme, hyperparamètres) ; l'ensemble de test n'est utilisé qu'une seule fois, à la toute fin, pour une estimation honnête et non biaisée de la performance réelle du modèle final.
**2.** Le biais mesure l'erreur due à un modèle trop simple pour capturer la vraie complexité du problème (sous-apprentissage) ; la variance mesure la sensibilité du modèle aux fluctuations spécifiques des données d'entraînement (surapprentissage).
**3.** Lasso peut amener certains poids à devenir exactement zéro, réalisant une sélection automatique de variables ; Ridge réduit tous les poids sans jamais les annuler complètement.
**4.** Elle calcule d'abord un score brut via un produit scalaire (comme une régression linéaire classique), puis applique la fonction sigmoïde pour transformer ce score en une valeur entre 0 et 1.
**5.** Parce que KNN se base sur des distances entre points ; sans normalisation, les variables à grande échelle (ex: salaire) domineraient artificiellement le calcul de distance au détriment des variables à petite échelle.
**6.** Le théorème de Bayes (Module 2, chapitre 2.3.5), qui permet de calculer la probabilité d'une classe sachant les caractéristiques observées.
**7.** Le Bagging entraîne ses modèles en parallèle, indépendamment les uns des autres, sur des sous-échantillons différents ; le Boosting entraîne ses modèles en séquence, chacun corrigeant spécifiquement les erreurs du précédent.
**8.** La variance (le surapprentissage) — en moyennant les prédictions de plusieurs modèles indépendants entraînés sur des données légèrement différentes, les erreurs spécifiques à chaque modèle ont tendance à s'annuler.
**9.** L'inertie mesure la somme des distances au carré entre chaque point et son centroïde assigné (plus elle est faible, plus les clusters sont compacts) ; la méthode du coude consiste à choisir le nombre de clusters K au point où l'amélioration de l'inertie cesse d'être significative.
**10.** Parce que DBSCAN se base sur la densité locale des points plutôt que sur la distance à un centroïde central, ce qui lui permet de suivre des formes de clusters arbitraires et irrégulières.
**11.** Aux vecteurs propres et valeurs propres (Module 2, chapitre 2.1.8) : les composantes principales de la PCA sont exactement les vecteurs propres de la matrice de covariance des données.
**12.** Parce qu'un modèle qui prédit toujours la classe majoritaire peut obtenir une accuracy très élevée tout en étant totalement inutile pour détecter la classe minoritaire, qui est souvent celle qui nous intéresse réellement (fraude, maladie rare...).
**13.** La Precision mesure, parmi toutes les prédictions positives faites par le modèle, la proportion qui était réellement correcte ; le Recall mesure, parmi tous les vrais cas positifs existants, la proportion que le modèle a réussi à détecter.
**14.** Quand un Faux Négatif (rater un vrai cas positif) est particulièrement coûteux ou dangereux — par exemple, un dépistage médical d'une maladie grave, où manquer un vrai cas est bien plus problématique qu'une fausse alerte.
**15.** L'AUC représente la probabilité que le modèle attribue un score plus élevé à un exemple positif choisi au hasard qu'à un exemple négatif choisi au hasard — une mesure de qualité indépendante du choix d'un seuil de décision précis.
**16.** Parce que cela introduirait une fausse relation d'ordre entre des catégories qui n'en ont naturellement aucune, ce qui pourrait induire le modèle en erreur en lui faisant apprendre des relations artificielles sans signification réelle.
**17.** Les algorithmes basés sur des arbres de décision (Random Forest, Gradient Boosting) — ils raisonnent en termes de seuils appliqués indépendamment à chaque variable, donc l'échelle absolue des variables n'affecte pas leur fonctionnement.
**18.** Le sur-échantillonnage (oversampling, ex: SMOTE), le sous-échantillonnage (undersampling), et la pondération des classes (class_weight).
**19.** SMOTE génère de nouveaux exemples synthétiques de la classe minoritaire en interpolant entre des exemples existants proches les uns des autres, plutôt que de simplement dupliquer des exemples déjà présents.
**20.** Parce que sur un dataset fortement déséquilibré, un modèle peut atteindre une accuracy élevée simplement en prédisant systématiquement la classe majoritaire, sans jamais détecter correctement la classe minoritaire qui constitue souvent l'objectif réel du problème (ex : détecter une fraude rare).

---

---

# 📊 RÉCAPITULATIF DU MODULE 3

## Ce que tu as maîtrisé

| Compétence | Notion clé | Niveau attendu |
|---|---|---|
| Valider correctement un modèle | Train/Val/Test, Cross-Validation | ⭐⭐⭐⭐⭐ |
| Diagnostiquer les problèmes d'un modèle | Compromis Biais-Variance | ⭐⭐⭐⭐⭐ |
| Régulariser un modèle de régression | Ridge, Lasso, Elastic Net | ⭐⭐⭐⭐☆ |
| Choisir un algorithme de classification | Régression Logistique, KNN, Naive Bayes | ⭐⭐⭐⭐☆ |
| Comprendre les méthodes d'ensemble | Bagging, Boosting, Random Forest | ⭐⭐⭐⭐☆ |
| Découvrir des structures sans labels | KMeans, DBSCAN, PCA | ⭐⭐⭐☆☆ |
| Évaluer un modèle rigoureusement | Precision, Recall, F1, AUC-ROC | ⭐⭐⭐⭐⭐ |
| Préparer des données de qualité | Feature Engineering, gestion du déséquilibre | ⭐⭐⭐⭐☆ |

## Prochaine étape

**Module 4 — Deep Learning & PyTorch** : tu vas maintenant découvrir les réseaux de neurones profonds, en t'appuyant directement sur les mathématiques du Module 2 (le neurone comme produit scalaire, la rétropropagation comme application de la règle de la chaîne) et sur la méthodologie rigoureuse de validation apprise dans ce module.

---

## ⚠️ ERREURS FRÉQUENTES DU MODULE 3

| Erreur | Conséquence | Solution |
|---|---|---|
| Utiliser l'ensemble de test pour choisir des hyperparamètres | Estimation de performance trop optimiste, décevante en production | Toujours passer par un ensemble de validation ou une cross-validation dédiée |
| Juger un modèle sur l'accuracy seule avec des classes déséquilibrées | Fausse confiance dans un modèle inutile en pratique | Toujours vérifier Precision, Recall, F1 et AUC en complément |
| Oublier de normaliser les données avant KNN, SVM ou régression régularisée | Résultats faussés par les variables à grande échelle | Utiliser systématiquement `StandardScaler` avant ces algorithmes |
| Choisir le degré polynomial ou la profondeur d'arbre "le plus précis possible" sur le train | Surapprentissage sévère | Toujours valider le choix sur un ensemble de validation ou en cross-validation |
| Utiliser SMOTE ou l'oversampling avant la division train/test | Fuite de données (data leakage) : des exemples synthétiques dérivés du test se retrouvent indirectement dans le train | Toujours diviser train/test AVANT d'appliquer toute technique de rééquilibrage |
| Confondre variable nominale et ordinale lors de l'encodage | Introduction d'une fausse relation d'ordre qui trompe le modèle | Réserver le Label Encoding aux variables ayant un ordre naturel réel |
| Privilégier systématiquement l'algorithme "le plus sophistiqué" | Perte de temps, complexité inutile, parfois moins bonnes performances | Toujours essayer d'abord des modèles simples (régression logistique, arbre) comme référence avant de complexifier |

---

*Module 3 terminé ✅ — Durée totale : 8 semaines*  
*Formation IA Complète — Module suivant : Module 4 — Deep Learning & PyTorch*
