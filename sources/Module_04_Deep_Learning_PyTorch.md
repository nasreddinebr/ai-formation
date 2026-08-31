# 🎓 FORMATION IA — MODULE 4
# Deep Learning & PyTorch
### Comprendre et construire des réseaux de neurones profonds

> **Professeur :** Dr. IA — Formation Complète  
> **Durée estimée :** 8 semaines (1–2h par jour)  
> **Prérequis :** Module 1 (Python, POO), Module 2 (Mathématiques), Module 3 (Machine Learning)

---

## 🧭 COMMENT LIRE CE MODULE

Ce module est celui où **tout ce que tu as appris converge**. Le neurone que tu as construit à la main au Module 2 (produit scalaire + biais + activation), la boucle d'entraînement par descente de gradient, la validation rigoureuse du Module 3 — tout cela va maintenant s'assembler pour former de vrais réseaux de neurones **profonds**, capables de reconnaître des images, comprendre du texte, et bien plus.

**La structure de chaque chapitre reste la même que le Module 3 :**

```
1. 📖 EXPLICATION — toutes les notions, en langage simple et avec des analogies,
                     AVANT tout code
2. 💻 MISE EN PRATIQUE — le code PyTorch qui implémente ce que tu viens de comprendre
3. 🏋️ EXERCICES — 4 exercices corrigés pour ancrer la compréhension
```

**Un rappel important :** le Deep Learning n'est pas une discipline différente du Machine Learning — c'est une **famille particulière** de modèles ML (les réseaux de neurones), qui suit exactement la même méthodologie de validation, d'évaluation et de lutte contre le surapprentissage que tu as apprise au Module 3. Ne perds jamais cela de vue : tu ne repars pas de zéro, tu **spécialises** ce que tu sais déjà.

---

## 📋 PLAN DU MODULE 4

| Chapitre | Sujet | Durée estimée |
|---|---|---|
| **4.1** | Introduction au Deep Learning et Premiers Pas avec PyTorch | 1 semaine |
| **4.2** | Construire et Entraîner un Réseau de Neurones | 1.5 semaine |
| **4.3** | Bien Entraîner un Réseau : Régularisation et Bonnes Pratiques | 1 semaine |
| **4.4** | Réseaux de Neurones Convolutifs (CNN) | 1.5 semaine |
| **4.5** | Transfer Learning et Modèles Pré-entraînés | 1 semaine |
| **4.6** | Données Séquentielles : RNN et LSTM | 1 semaine |

---

---

# 📘 CHAPITRE 4.1 — INTRODUCTION AU DEEP LEARNING ET PREMIERS PAS AVEC PYTORCH

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Pourquoi le Deep Learning, quand on a déjà le Machine Learning ?

Au Module 3, tu as appris des algorithmes puissants (Random Forest, Gradient Boosting...) qui fonctionnent remarquablement bien sur des données **structurées** — des tableaux avec des colonnes clairement définies (âge, salaire, ancienneté). Mais que se passe-t-il face à une **image** (des millions de pixels), un **texte** (une séquence de mots de longueur variable), ou un **son** ?

**🔑 Intuition — le tailleur vs la machine qui apprend à couper**

Imagine un tailleur qui confectionne un vêtement sur-mesure. Il doit **lui-même** décider où placer chaque couture, chaque mesure — c'est un travail manuel et expert. C'est exactement ce que fait le **Feature Engineering** du Module 3 (chapitre 3.7) : un humain décide manuellement quelles variables créer et comment les transformer.

Le Deep Learning, lui, ressemble davantage à une machine qui **apprend elle-même**, à force d'observer des milliers d'exemples, comment "couper le tissu" — c'est-à-dire comment extraire automatiquement les caractéristiques pertinentes des données brutes (pixels, mots), sans qu'un humain ait besoin de les définir à l'avance.

```
🔑 Machine Learning classique (Module 3) :
   Données brutes → [Feature Engineering MANUEL par un humain] → Algorithme → Prédiction

🔑 Deep Learning :
   Données brutes → [Le réseau apprend LUI-MÊME les features utiles] → Prédiction
```

**Quand privilégier le Deep Learning ?**
- Données non-structurées : images, texte, audio, vidéo
- Grandes quantités de données disponibles (le DL a généralement besoin de beaucoup d'exemples pour bien apprendre)
- Relations très complexes et non-linéaires entre les données

**Quand le Machine Learning classique (Module 3) reste préférable ?**
- Données structurées (tableaux), en quantité modeste
- Besoin d'interprétabilité forte (rappelle-toi : la régression logistique du Module 3 explique ses décisions, un réseau de neurones profond est beaucoup plus "boîte noire")
- Contraintes de temps de calcul ou de simplicité de déploiement

---

### Pourquoi PyTorch ?

PyTorch et TensorFlow sont les deux grandes bibliothèques de Deep Learning. Sans entrer dans une guerre de religion, voici pourquoi ce module utilise PyTorch : son fonctionnement est **"pythonique"** — le code ressemble à du Python classique, il s'exécute étape par étape (contrairement à l'approche historique de TensorFlow, qui construisait d'abord un plan de calcul complet avant de l'exécuter), ce qui le rend **beaucoup plus facile à déboguer et à apprendre**. C'est aussi devenu la bibliothèque dominante dans la recherche et sur Hugging Face (Module 0), donc l'écosystème le plus riche pour la suite de la formation.

---

### Le Tensor : la généralisation des Vecteurs et Matrices du Module 2

**🔑 Intuition**

Rappelle-toi le Module 2, chapitre 2.1 : tu as appris les scalaires (un nombre), les vecteurs (une liste de nombres, 1 dimension), et les matrices (un tableau de nombres, 2 dimensions). Un **Tensor** est simplement la généralisation de ces concepts à **n'importe quel nombre de dimensions**.

```
🔑 Scalaire  = Tensor à 0 dimension    → un seul nombre : 5
🔑 Vecteur   = Tensor à 1 dimension    → [1, 2, 3]
🔑 Matrice   = Tensor à 2 dimensions   → [[1,2],[3,4]]
🔑 Tensor 3D = Tensor à 3 dimensions   → une image couleur : (hauteur, largeur, 3 couleurs)
🔑 Tensor 4D = Tensor à 4 dimensions   → un LOT (batch) d'images : (nombre_images, hauteur, largeur, 3)
```

**Pourquoi cette généralisation est-elle nécessaire ?** Parce qu'une seule image couleur nécessite déjà 3 dimensions (hauteur × largeur × couleurs), et qu'en entraînement, on traite des **lots** (batchs, rappel Module 2, chapitre 2.4.4) d'images simultanément — d'où une 4e dimension. Pour de la vidéo, on ajouterait même une 5e dimension (le temps) !

**💡 Le point crucial :** tout ce que tu as appris sur les vecteurs et matrices au Module 2 (produit scalaire, multiplication matricielle, broadcasting du Module 1) **s'applique exactement de la même façon** aux tensors — ce sont juste des tableaux à plus de dimensions. PyTorch manipule ces tensors avec une syntaxe presque identique à NumPy.

---

### Autograd : la Différentiation Automatique — le concept le plus important de ce chapitre

**🔑 Intuition**

Rappelle-toi le projet de synthèse du Module 2 : tu as calculé **à la main** la dérivée de l'erreur par rapport aux poids, en appliquant la règle de la chaîne (chapitre 2.2.6), maillon par maillon. C'était instructif, mais imagine devoir faire ce calcul à la main pour un réseau avec des millions de paramètres et des dizaines de couches — ce serait humainement impossible.

**Autograd** (pour "differentiation automatique") est le mécanisme de PyTorch qui fait **exactement ce calcul à ta place, automatiquement, pour n'importe quelle fonction, aussi complexe soit-elle.**

**Comment ça marche, intuitivement ?**

Imagine que tu conduis une voiture avec un GPS qui **enregistre chaque virage** que tu prends pendant ton trajet aller. Au retour, le GPS peut automatiquement recalculer l'itinéraire inverse, virage par virage, sans que tu aies besoin de le refaire de mémoire.

Autograd fonctionne pareil : pendant le **forward pass** (le calcul "aller" — de l'entrée du réseau jusqu'à la prédiction), PyTorch construit silencieusement un **graphe de calcul** qui enregistre chaque opération effectuée (chaque "virage"). Ensuite, quand tu appelles `.backward()`, PyTorch **remonte automatiquement ce graphe**, en appliquant la règle de la chaîne à chaque étape — exactement comme tu l'as fait à la main au Module 2, mais de façon totalement automatisée, même sur des millions d'opérations enchaînées.

```
🔑 Sans Autograd (ce que tu as fait à la main au Module 2) :
   Calculer manuellement dL/dw pour chaque poids, en appliquant
   la règle de la chaîne maillon par maillon

🔑 Avec Autograd (ce que PyTorch fait pour toi) :
   1. tu effectues le calcul normalement (forward pass)
   2. tu appelles loss.backward()
   3. PyTorch a automatiquement calculé TOUS les gradients,
      pour TOUS les paramètres, en une seule instruction
```

**💡 Pourquoi c'est révolutionnaire :** sans la différentiation automatique, il serait impossible d'entraîner des réseaux avec des millions ou des milliards de paramètres (comme les LLMs du Module 0) — personne ne pourrait dériver ces calculs à la main. Autograd est ce qui rend le Deep Learning moderne concrètement réalisable.

---

### Le GPU : rappel et mise en pratique

Rappelle-toi le Module 0 : les GPU excellent dans les calculs matriciels parallèles. PyTorch permet de déplacer très simplement tes tensors et ton modèle vers un GPU (s'il est disponible) pour accélérer drastiquement les calculs — souvent d'un facteur 10 à 100 par rapport à un CPU classique pour l'entraînement de réseaux profonds.

---

## 💻 MISE EN PRATIQUE

```python
import torch
import numpy as np

# ─────────────────────────────────────────────
# 1. CRÉER DES TENSORS — exactement comme NumPy (Module 1)
# ─────────────────────────────────────────────

scalaire = torch.tensor(5.0)
vecteur = torch.tensor([1.0, 2.0, 3.0])
matrice = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
tensor_3d = torch.rand(3, 224, 224)   # ex: une image couleur (canaux, hauteur, largeur)
tensor_4d = torch.rand(32, 3, 224, 224)  # un batch de 32 images

print(f"Scalaire  : shape={scalaire.shape}, valeur={scalaire.item()}")
print(f"Vecteur   : shape={vecteur.shape}")
print(f"Matrice   : shape={matrice.shape}")
print(f"Tensor 3D : shape={tensor_3d.shape}  (canaux, hauteur, largeur)")
print(f"Tensor 4D : shape={tensor_4d.shape}  (batch, canaux, hauteur, largeur)")

# Passerelle directe avec NumPy (Module 1)
array_numpy = np.array([1, 2, 3])
tensor_depuis_numpy = torch.from_numpy(array_numpy)
retour_numpy = tensor_depuis_numpy.numpy()

# Opérations — identiques à NumPy (Module 1, chapitre 1.2)
A = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
B = torch.tensor([[5.0, 6.0], [7.0, 8.0]])
print("\nProduit matriciel (rappel Module 2) :")
print(A @ B)          # exactement la même notation qu'en NumPy

# ─────────────────────────────────────────────
# 2. AUTOGRAD — vérifions qu'il retrouve NOS calculs à la main du Module 2 !
# ─────────────────────────────────────────────

# Rappel du projet de synthèse Module 2 :
# w=1, b=2, x=3, y_vrai=14
# On avait calculé à la main : dL/dw = -54, dL/db = -18

w = torch.tensor(1.0, requires_grad=True)  # requires_grad=True : "surveille ce paramètre"
b = torch.tensor(2.0, requires_grad=True)
x = torch.tensor(3.0)
y_vrai = torch.tensor(14.0)

y_pred = w * x + b                    # forward pass (2.1.7)
loss = (y_pred - y_vrai) ** 2         # fonction de coût (2.4.1)

loss.backward()                        # ← LA MAGIE : calcule TOUS les gradients automatiquement

print(f"\nGradient calculé automatiquement par Autograd :")
print(f"  dL/dw = {w.grad.item()}")   # doit afficher -54.0, EXACTEMENT notre calcul à la main !
print(f"  dL/db = {b.grad.item()}")   # doit afficher -18.0

# ─────────────────────────────────────────────
# 3. GPU — vérifier la disponibilité et déplacer un tensor
# ─────────────────────────────────────────────

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"\nDevice utilisé : {device}")

tensor_test = torch.rand(1000, 1000)
tensor_test = tensor_test.to(device)   # déplace le tensor sur le GPU (s'il existe)
print(f"Tensor maintenant sur : {tensor_test.device}")
```

---

## 🏋️ EXERCICES — CHAPITRE 4.1

### Exercice 4.1.A — Identifier les dimensions d'un Tensor

Pour chacune des données suivantes, indique la forme (shape) du tensor correspondant :

1. Une photo en noir et blanc de 128×128 pixels
2. Un batch de 64 photos couleur de 64×64 pixels
3. Une séquence de 50 mots, chacun représenté par un embedding de 300 dimensions (rappel Module 0)
4. Un seul nombre représentant une température

<details>
<summary>👉 Solution</summary>

```
1. (128, 128) → tensor 2D (hauteur, largeur) — pas de dimension "couleur"
   car noir et blanc = 1 seul canal, souvent omis ou explicite (1, 128, 128)

2. (64, 3, 64, 64) → tensor 4D (batch, canaux_couleur, hauteur, largeur)

3. (50, 300) → tensor 2D (nombre_de_mots, dimensions_embedding)

4. () ou (1,) → tensor 0D (scalaire) — juste un nombre seul
```
</details>

### Exercice 4.1.B — Vérifier Autograd avec un calcul à la main

Reprends l'exercice 2.4.A du Module 2 : `f(x) = (x-3)²`, point de départ `x=8`. Calcule `f'(8)` à la main, puis vérifie ta réponse avec Autograd en PyTorch.

<details>
<summary>👉 Solution</summary>

```
Calcul à la main : f'(x) = 2(x-3)
f'(8) = 2×(8-3) = 2×5 = 10
```

```python
import torch
x = torch.tensor(8.0, requires_grad=True)
f = (x - 3) ** 2
f.backward()
print(f.grad if hasattr(f, 'grad') else x.grad)  # doit afficher 10.0
```
</details>

### Exercice 4.1.C — Comprendre requires_grad

Explique en une phrase ce qui se passerait si on oubliait de mettre `requires_grad=True` sur un tensor avant d'appeler `.backward()` dessus (ou sur une valeur qui en dépend).

<details>
<summary>👉 Solution</summary>

Sans `requires_grad=True`, PyTorch ne construit **pas** de graphe de calcul pour ce tensor — il le traite comme une simple donnée fixe, pas comme un paramètre à optimiser. Appeler `.backward()` produirait une erreur (`RuntimeError`), car PyTorch n'aurait enregistré aucune opération à "remonter" pour calculer un gradient par rapport à ce tensor. C'est pour cela qu'on active systématiquement `requires_grad=True` sur les **poids et biais** d'un réseau (les paramètres qu'on veut ajuster), mais jamais sur les données d'entrée brutes elles-mêmes.
</details>

### Exercice 4.1.D — Machine Learning classique ou Deep Learning ?

Pour chacun des scénarios suivants, indique s'il est plus pertinent d'utiliser le Machine Learning classique (Module 3) ou le Deep Learning, et pourquoi :

1. Prédire le prix d'un appartement à partir de 8 variables tabulaires (surface, nombre de pièces...), avec 2000 exemples disponibles
2. Classifier automatiquement 500 000 photos de produits e-commerce en catégories
3. Détecter une fraude bancaire où l'interprétabilité de chaque décision doit être fournie au régulateur

<details>
<summary>👉 Solution</summary>

```
1. MACHINE LEARNING CLASSIQUE — données tabulaires structurées, quantité
   modeste d'exemples (2000) : un Random Forest ou Gradient Boosting
   (Module 3) sera probablement au moins aussi performant, plus rapide
   à entraîner, et plus facile à interpréter.

2. DEEP LEARNING — données non-structurées (images) en grande quantité
   (500 000), un cas d'usage typique des CNN (Chapitre 4.4), où le
   réseau apprend lui-même à extraire les caractéristiques visuelles
   pertinentes, une tâche très difficile à faire manuellement.

3. MACHINE LEARNING CLASSIQUE — l'exigence forte d'interprétabilité
   pour justifier chaque décision auprès d'un régulateur favorise
   des modèles comme la régression logistique (Module 3), dont les
   poids ont un sens direct et explicable, contrairement à un réseau
   de neurones profond, plus "boîte noire".
```
</details>

---

---

# 📘 CHAPITRE 4.2 — CONSTRUIRE ET ENTRAÎNER UN RÉSEAU DE NEURONES

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### Anatomie d'un Réseau de Neurones : l'empilement de couches

**🔑 Intuition**

Rappelle-toi le Module 2, chapitre 2.1.7 : tu as construit **un seul neurone**, qui calcule `sortie = activation(w · x + b)`. Un réseau de neurones "profond" (Deep Learning) n'est rien d'autre que **plusieurs couches de ces neurones, empilées les unes après les autres** — la sortie d'une couche devient l'entrée de la suivante.

```
Entrée (x) → [Couche 1 : plusieurs neurones] → [Couche 2] → [Couche 3] → Sortie

Chaque flèche "→" représente une multiplication matricielle + biais + activation,
exactement comme au Module 2, mais répétée pour chaque couche et chaque neurone.
```

**Pourquoi empiler plusieurs couches (pourquoi "profond") ?** Chaque couche apprend à détecter des motifs de plus en plus **abstraits et complexes**, en se basant sur ce que la couche précédente a déjà détecté. Pour une image de visage par exemple : la première couche pourrait détecter des contours simples, la deuxième couche combine ces contours pour détecter des formes (yeux, nez), une couche plus profonde combine ces formes pour reconnaître un visage entier. C'est cette **hiérarchie de représentations**, apprise automatiquement, qui fait la puissance du Deep Learning (rappel Module 0).

---

### Les Fonctions d'Activation : pourquoi la non-linéarité est absolument indispensable

**🔑 Intuition — l'expérience de pensée cruciale**

Voici un fait mathématique fondamental que tu dois absolument comprendre : **si on empile plusieurs couches purement linéaires (sans fonction d'activation non-linéaire entre elles), le résultat final est mathématiquement équivalent à une seule couche linéaire.** Empiler 100 couches linéaires n'apporterait strictement **aucune puissance de calcul supplémentaire** par rapport à une seule couche !

**Pourquoi ?** Parce qu'une transformation linéaire suivie d'une autre transformation linéaire reste... une transformation linéaire (rappel Module 2 : multiplier des matrices entre elles donne toujours une matrice, le résultat final reste une simple combinaison linéaire des entrées). C'est **la fonction d'activation non-linéaire, insérée entre chaque couche**, qui "casse" cette linéarité et permet au réseau d'apprendre des relations complexes et non-linéaires entre les données — exactement comme la régression polynomiale du Module 3 avait besoin d'ajouter des termes non-linéaires (`x²`, `x³`) pour capturer des courbes.

**Les fonctions d'activation les plus utilisées :**

**ReLU (Rectified Linear Unit) — la plus utilisée aujourd'hui**

```
ReLU(x) = max(0, x)
```

Intuition ultra-simple : **si la valeur est positive, on la garde telle quelle ; si elle est négative, on la met à zéro.** C'est étonnamment simple, mais extrêmement efficace en pratique, et rapide à calculer.

```
     ReLU(x)
        │        ╱
        │      ╱
        │    ╱
────────┼──────────── x
        │
```

**Sigmoïde — rappel direct du Module 2 et 3**

Tu la connais déjà (Module 2, chapitre 2.1.7 ; Module 3, chapitre 3.3) : elle "écrase" n'importe quel nombre entre 0 et 1. Utilisée principalement en **sortie** d'un réseau pour la classification binaire, où on veut interpréter la sortie comme une probabilité.

**Softmax — rappel direct du Module 1**

Tu l'as déjà rencontrée au Module 1 (chapitre 1.2.3, régression logistique multi-classe du Module 3) : elle transforme un ensemble de scores bruts en probabilités qui somment à 1. Utilisée en **sortie** pour la classification multi-classe (par exemple, choisir parmi 10 catégories d'objets).

**Tanh (tangente hyperbolique)**

Similaire à la sigmoïde, mais "écrase" les valeurs entre -1 et 1 plutôt qu'entre 0 et 1. Moins utilisée aujourd'hui dans les couches cachées (ReLU lui est généralement préféré), mais on la retrouve encore dans certaines architectures spécifiques (notamment les LSTM, vus au Chapitre 4.6).

```
🔑 Règle pratique généralement suivie :
   Couches CACHÉES (intermédiaires)  → ReLU (ou variantes)
   Couche de SORTIE, classification binaire → Sigmoïde
   Couche de SORTIE, classification multi-classe → Softmax
   Couche de SORTIE, régression → Aucune activation (valeur brute)
```

---

### nn.Module : structurer un réseau en PyTorch — rappel direct de la POO du Module 1

**🔑 Intuition**

Rappelle-toi le Module 1, chapitre 1.1.6 : tu as appris la Programmation Orientée Objet (classes, héritage, `__init__`, méthodes). PyTorch utilise **exactement ce même principe** pour définir un réseau de neurones : on crée une **classe** qui hérite de `nn.Module`, on définit les couches dans `__init__` (le constructeur), et on définit comment les données circulent à travers ces couches dans une méthode `forward`.

C'est la continuité directe de ce que tu as appris avec la classe `ModeleIA` du Module 1 — sauf que maintenant, les "couches" sont de vrais objets PyTorch qui savent calculer leurs propres gradients automatiquement (grâce à Autograd, Chapitre 4.1).

---

### Les Fonctions de Perte : rappel et approfondissement

Rappelle-toi le Module 2 (chapitre 2.4.1) et le Module 3 (chapitre 3.6) : la fonction de perte (loss) mesure l'erreur du modèle. En Deep Learning, deux fonctions de perte dominent largement :

**MSE (Mean Squared Error)** — pour la régression, exactement comme au Module 2 et 3 : mesure l'écart au carré entre la prédiction et la vraie valeur.

**Cross-Entropy Loss** — pour la classification, une fonction que tu n'as pas encore rencontrée en détail. Elle mesure **l'écart entre la distribution de probabilité prédite par le modèle et la distribution réelle** (rappel Module 2, chapitre 2.3.2 : les distributions de probabilité).

**🔑 Intuition de la Cross-Entropy**

Imagine que le modèle prédit `[0.7, 0.2, 0.1]` pour trois classes possibles (chat, chien, oiseau), alors que la vraie réponse est "chat" (donc la distribution réelle est `[1, 0, 0]`). La Cross-Entropy pénalise le modèle **d'autant plus fortement qu'il était confiant dans une mauvaise réponse**. Si le modèle avait prédit `[0.99, 0.005, 0.005]` pour "chat" (très confiant et correct), la perte serait très faible. S'il avait prédit `[0.1, 0.8, 0.1]` (confiant mais incorrect), la perte serait beaucoup plus élevée. C'est une mesure directement issue de la théorie de l'information, mais tu peux simplement retenir : **elle récompense la confiance quand elle est justifiée, et pénalise sévèrement la confiance quand elle est déplacée.**

---

### Les Optimiseurs : SGD et Adam

Rappelle-toi le Module 2, chapitre 2.4.2-2.4.3 : la descente de gradient de base met à jour les paramètres avec `nouveau_poids = poids - learning_rate × gradient`. C'est ce qu'on appelle **SGD** (Stochastic Gradient Descent) en PyTorch.

**🔑 Intuition d'Adam — l'optimiseur le plus utilisé aujourd'hui**

Adam ("Adaptive Moment Estimation") améliore SGD avec deux idées intuitives :

**1. L'inertie (momentum)** : imagine une boule qui roule sur une pente. Elle ne s'arrête pas immédiatement à chaque petite bosse — elle garde de l'**élan** de ses mouvements précédents. Adam fait pareil : il "mémorise" une moyenne des gradients récents, ce qui l'aide à traverser les petites irrégularités locales de la fonction de coût sans s'y bloquer, et à converger plus rapidement et plus stablement.

**2. Un learning rate adaptatif, par paramètre** : au lieu d'utiliser le même learning rate fixe pour tous les paramètres (comme le SGD basique), Adam **ajuste automatiquement** la taille du pas pour chaque paramètre individuellement, selon l'historique de ses gradients — les paramètres qui ont eu de gros gradients récemment reçoivent des pas plus petits (plus de prudence), et inversement.

```
🔑 SGD  : simple, prévisible, mais peut être lent et sensible au choix du learning rate
🔑 Adam : plus rapide à converger en général, s'adapte automatiquement,
          c'est le choix par défaut recommandé dans la grande majorité des cas
```

---

### La Boucle d'Entraînement Complète : le cycle du Module 2, à grande échelle

**🔑 Intuition**

C'est exactement le cycle que tu as implémenté à la main dans le projet de synthèse du Module 2 — mais formalisé avec les outils PyTorch (Autograd, optimiseurs) :

```
🔑 Pour chaque epoch (Module 2, chapitre 2.4.4) :
   Pour chaque batch de données (Module 2, chapitre 2.4.4) :
   
      1. FORWARD PASS   : calculer la prédiction du réseau (2.1.7)
      2. CALCUL DE LA PERTE : comparer prédiction et vérité (2.4.1)
      3. BACKWARD PASS  : loss.backward() → Autograd calcule TOUS les gradients (4.1)
      4. MISE À JOUR    : optimizer.step() → ajuste tous les poids (2.4.2)
      5. REMISE À ZÉRO  : optimizer.zero_grad() → prépare le prochain calcul
```

**⚠️ Point technique important : pourquoi `zero_grad()` ?** Par défaut, PyTorch **accumule** les gradients à chaque appel de `.backward()` (utile dans certains cas avancés), plutôt que de les remplacer. Si on oublie de les remettre à zéro avant chaque nouveau batch, les gradients des batchs précédents s'additionneraient aux nouveaux, faussant complètement l'entraînement. C'est une des erreurs les plus fréquentes chez les débutants en PyTorch.

---

## 💻 MISE EN PRATIQUE

```python
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# ─────────────────────────────────────────────
# 1. DÉFINIR UN RÉSEAU AVEC nn.Module (rappel POO, Module 1)
# ─────────────────────────────────────────────

class ReseauClassification(nn.Module):
    def __init__(self, n_features, n_classes):
        super().__init__()  # rappel Module 1, chapitre 1.1.6 : appelle le constructeur parent
        self.couche1 = nn.Linear(n_features, 32)   # produit scalaire + biais (2.1.7)
        self.activation1 = nn.ReLU()
        self.couche2 = nn.Linear(32, 16)
        self.activation2 = nn.ReLU()
        self.couche_sortie = nn.Linear(16, n_classes)
    
    def forward(self, x):
        x = self.activation1(self.couche1(x))
        x = self.activation2(self.couche2(x))
        x = self.couche_sortie(x)   # pas d'activation ici : CrossEntropyLoss l'inclut déjà
        return x

# ─────────────────────────────────────────────
# 2. PRÉPARER LES DONNÉES (rappel Module 3 : train/test, StandardScaler)
# ─────────────────────────────────────────────

X, y = make_classification(n_samples=1000, n_features=10, n_classes=3,
                            n_informative=6, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Convertir en Tensors PyTorch
X_train_t = torch.FloatTensor(X_train)
y_train_t = torch.LongTensor(y_train)
X_test_t = torch.FloatTensor(X_test)
y_test_t = torch.LongTensor(y_test)

# ─────────────────────────────────────────────
# 3. INITIALISER LE MODÈLE, LA PERTE ET L'OPTIMISEUR
# ─────────────────────────────────────────────

modele = ReseauClassification(n_features=10, n_classes=3)
fonction_perte = nn.CrossEntropyLoss()          # rappel : classification multi-classe
optimiseur = optim.Adam(modele.parameters(), lr=0.01)  # rappel Module 2 : learning_rate

# ─────────────────────────────────────────────
# 4. LA BOUCLE D'ENTRAÎNEMENT — exactement le cycle du Module 2 !
# ─────────────────────────────────────────────

n_epochs = 100
historique_loss_train = []
historique_loss_test = []

for epoch in range(n_epochs):
    # --- ENTRAÎNEMENT ---
    modele.train()  # mode entraînement (active dropout etc., voir Chapitre 4.3)
    
    optimiseur.zero_grad()                       # ÉTAPE 5 (remise à zéro AVANT)
    predictions = modele(X_train_t)               # ÉTAPE 1 : forward pass (2.1.7)
    loss = fonction_perte(predictions, y_train_t) # ÉTAPE 2 : calcul de la perte (2.4.1)
    loss.backward()                                # ÉTAPE 3 : backward pass (Autograd, 4.1)
    optimiseur.step()                              # ÉTAPE 4 : mise à jour des poids (2.4.2)
    
    historique_loss_train.append(loss.item())
    
    # --- ÉVALUATION (sans calculer de gradient, pour économiser du calcul) ---
    modele.eval()
    with torch.no_grad():   # désactive Autograd temporairement (2.1) — plus rapide
        predictions_test = modele(X_test_t)
        loss_test = fonction_perte(predictions_test, y_test_t)
        historique_loss_test.append(loss_test.item())
    
    if epoch % 20 == 0:
        print(f"Epoch {epoch:3d} : Train Loss={loss.item():.4f}, Test Loss={loss_test.item():.4f}")

# ─────────────────────────────────────────────
# 5. ÉVALUER LA PERFORMANCE FINALE (rappel Module 3)
# ─────────────────────────────────────────────

modele.eval()
with torch.no_grad():
    predictions_finales = modele(X_test_t)
    classes_predites = torch.argmax(predictions_finales, dim=1)  # softmax implicite
    accuracy = (classes_predites == y_test_t).float().mean()

print(f"\nAccuracy finale sur le test : {accuracy.item():.2%}")

# Visualiser la convergence
plt.figure(figsize=(9, 5))
plt.plot(historique_loss_train, label="Train Loss")
plt.plot(historique_loss_test, label="Test Loss")
plt.xlabel("Epoch"); plt.ylabel("Loss (Cross-Entropy)")
plt.title("Convergence de l'Entraînement")
plt.legend(); plt.grid(alpha=0.3)
plt.show()
```

---

## 🏋️ EXERCICES — CHAPITRE 4.2

### Exercice 4.2.A — Pourquoi la non-linéarité ?

Démontre par le calcul que deux couches linéaires empilées SANS fonction d'activation entre elles équivalent à une seule couche linéaire. Utilise `couche1(x) = 2x + 1` et `couche2(x) = 3x - 2`.

<details>
<summary>👉 Solution</summary>

```
Empiler les deux couches : couche2(couche1(x))

= 3 × (2x + 1) - 2
= 6x + 3 - 2
= 6x + 1

C'est de la forme "a×x + b" (avec a=6, b=1) — EXACTEMENT la même forme
qu'une seule couche linéaire ! Peu importe combien de couches linéaires
on empile sans activation non-linéaire entre elles, le résultat final
reste toujours réductible à une seule transformation linéaire équivalente.

C'est pour cela qu'une fonction d'activation NON-LINÉAIRE (ReLU, sigmoïde...)
est absolument indispensable entre les couches pour que le réseau puisse
apprendre des relations plus complexes qu'une simple droite.
```
</details>

### Exercice 4.2.B — Choisir la bonne fonction d'activation de sortie

Pour chacun des problèmes suivants, quelle fonction d'activation utiliserais-tu en couche de SORTIE ?

1. Prédire le prix d'une maison (régression)
2. Classifier un email en "spam" ou "non-spam" (classification binaire)
3. Classifier une image parmi 10 catégories d'animaux (classification multi-classe)

<details>
<summary>👉 Solution</summary>

```
1. AUCUNE activation (sortie brute/linéaire) — une régression doit pouvoir
   produire n'importe quelle valeur numérique, sans être bornée

2. SIGMOÏDE — transforme le score en une probabilité entre 0 et 1,
   parfaitement adaptée à une décision binaire

3. SOFTMAX — transforme les scores en une distribution de probabilité
   sur les 10 classes, qui somme à 1, permettant de choisir la classe
   la plus probable (rappel Module 1, chapitre 1.2.3)
```
</details>

### Exercice 4.2.C — Tracer la boucle d'entraînement

Remets dans le bon ordre les étapes suivantes d'une itération de la boucle d'entraînement PyTorch, et explique brièvement le rôle de chacune :

```
A. loss.backward()
B. optimiseur.step()
C. predictions = modele(X)
D. optimiseur.zero_grad()
E. loss = fonction_perte(predictions, y)
```

<details>
<summary>👉 Solution</summary>

```
Ordre correct : D → C → E → A → B

D. optimiseur.zero_grad() : remet les gradients à zéro AVANT tout calcul,
   pour éviter qu'ils ne s'accumulent avec ceux du batch précédent

C. predictions = modele(X) : le FORWARD PASS, calcule la prédiction
   actuelle du réseau (2.1.7)

E. loss = fonction_perte(predictions, y) : calcule l'erreur entre la
   prédiction et la vraie valeur (2.4.1)

A. loss.backward() : le BACKWARD PASS, Autograd calcule automatiquement
   tous les gradients de la perte par rapport à tous les paramètres (4.1)

B. optimiseur.step() : met à jour tous les poids du réseau en utilisant
   les gradients calculés, selon la règle de la descente de gradient (2.4.2)
```
</details>

### Exercice 4.2.D — Comparer SGD et Adam

Un data scientist entraîne le même réseau avec SGD (learning rate fixe) et avec Adam. Il observe que la courbe de loss avec SGD progresse très lentement et de façon irrégulière, tandis qu'avec Adam, la convergence est rapide et régulière. Explique ce comportement en te référant aux mécanismes internes des deux optimiseurs.

<details>
<summary>👉 Solution</summary>

Ce comportement s'explique par les deux mécanismes propres à Adam absents du SGD basique :

1. **L'inertie (momentum)** : Adam moyenne les gradients récents, ce qui lisse sa trajectoire de descente et évite les oscillations erratiques que peut provoquer un SGD "brut", particulièrement sensible au bruit d'un batch à l'autre.

2. **Le learning rate adaptatif** : Adam ajuste automatiquement la taille des pas pour chaque paramètre selon son historique de gradients, alors qu'avec SGD à learning rate fixe, un même taux peut être trop grand pour certains paramètres (provoquant des oscillations) et trop petit pour d'autres (provoquant une lenteur), sans possibilité d'ajustement automatique.

C'est précisément pour ces raisons qu'Adam est devenu l'optimiseur par défaut recommandé dans la grande majorité des projets de Deep Learning modernes.
</details>

---

---

# 📘 CHAPITRE 4.3 — BIEN ENTRAÎNER UN RÉSEAU
## Régularisation et Bonnes Pratiques

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Rappel : pourquoi l'overfitting est encore plus critique en Deep Learning

Rappelle-toi le compromis biais-variance du Module 3 (chapitre 3.1). Un réseau de neurones profond peut avoir des **millions, voire des milliards de paramètres** — bien plus que n'importe quel modèle de Machine Learning classique vu jusqu'ici. Cette immense flexibilité rend les réseaux de neurones particulièrement **sujets au surapprentissage** : sans précautions spécifiques, ils peuvent littéralement mémoriser leurs données d'entraînement plutôt que d'apprendre à généraliser. Ce chapitre présente les techniques spécifiques au Deep Learning pour lutter contre ce risque.

---

### Le Dropout : forcer la redondance et la robustesse

**🔑 Intuition — l'équipe de sport sans joueur indispensable**

Imagine une équipe de sport où, à chaque entraînement, on retire **aléatoirement** certains joueurs (un tiers de l'équipe, disons). Au début, cela semble contre-productif — comment s'améliorer avec une équipe incomplète ? Mais avec le temps, cette contrainte force **chaque joueur restant à devenir polyvalent et fiable**, sans pouvoir compter excessivement sur un coéquipier précis qui pourrait être absent la prochaine fois. L'équipe entière devient ainsi plus robuste et moins dépendante de quelques individus clés.

**Le Dropout applique exactement ce principe aux neurones d'un réseau** : pendant l'entraînement, à chaque itération, on **désactive aléatoirement un certain pourcentage de neurones** (souvent 20% à 50%) dans une couche donnée. Cela force le réseau à ne pas trop dépendre d'un petit groupe de neurones spécifiques pour faire ses prédictions, et l'encourage à développer des représentations plus **redondantes et généralisables**.

```
🔑 Point crucial : le Dropout n'est actif QUE pendant l'entraînement
   (modele.train()). Pendant l'évaluation (modele.eval()), TOUS les
   neurones sont utilisés — c'est pour cela que le code du Chapitre 4.2
   appelle explicitement modele.train() et modele.eval() à chaque étape.
```

---

### Batch Normalization : stabiliser l'entraînement entre les couches

**🔑 Intuition**

Rappelle-toi le Module 1 : tu normalisais les données d'entrée avec `StandardScaler` (moyenne 0, écart-type 1) avant de les donner à un modèle. **Batch Normalization applique cette même idée, mais À L'INTÉRIEUR du réseau**, entre les couches, plutôt que seulement sur les données brutes d'entrée.

**Pourquoi c'est utile ?** Au fil de l'entraînement, la distribution des valeurs qui circulent entre les couches peut évoluer de façon instable (un phénomène parfois appelé "internal covariate shift"). Batch Normalization renormalise ces valeurs à chaque couche, ce qui **stabilise et accélère considérablement l'entraînement**, tout en ayant également un léger effet régularisateur (elle rend le réseau moins sensible aux échelles spécifiques d'un batch donné).

---

### Early Stopping : arrêter au bon moment — rappel direct du Module 0 et 1

Tu as déjà rencontré ce concept dans les courbes d'apprentissage du Module 1 (chapitre 1.4.1). **Early Stopping** consiste à **surveiller la loss de validation** pendant l'entraînement, et à **arrêter automatiquement** dès qu'elle cesse de s'améliorer (ou commence à se dégrader) pendant un certain nombre d'epochs consécutifs — même si la loss d'entraînement, elle, continue de baisser.

```
🔑 Rappel visuel (Module 1) :

Loss
  │  Train Loss  ↘︎↘︎↘︎↘︎↘︎↘︎↘︎↘︎↘︎↘︎↘︎  (continue de baisser)
  │  Val Loss     ↘︎↘︎↘︎↘︎___╱╱╱╱   (remonte après un certain point)
  │                        ↑
  │                   ARRÊTER ICI (Early Stopping)
  └────────────────────────────────── Epoch
```

C'est une des techniques de régularisation les plus simples et les plus efficaces : elle ne nécessite aucune modification de l'architecture du réseau, juste une surveillance rigoureuse pendant l'entraînement.

---

### Learning Rate Scheduling : adapter la taille des pas au fil de l'entraînement

**🔑 Intuition — retour au randonneur du Module 2**

Rappelle-toi l'analogie du randonneur dans le brouillard (Module 2, chapitre 2.4.0). Au début de la descente, quand on est encore loin du minimum, de **grands pas** permettent de progresser rapidement. Mais à mesure qu'on se rapproche du minimum, de grands pas risquent de le "dépasser" à répétition (rappel : learning rate trop élevé, Module 2, chapitre 2.4.3) — il vaut mieux **réduire progressivement la taille des pas** pour affiner précisément la position finale.

**Le Learning Rate Scheduling automatise cette intuition** : au lieu d'utiliser un learning rate fixe pendant tout l'entraînement, on le fait **diminuer progressivement** selon une stratégie prédéfinie (par exemple, le diviser par 10 tous les 30 epochs, ou le réduire en douceur selon une formule mathématique).

---

### Initialisation des Poids : pourquoi ne jamais initialiser à zéro

**🔑 Intuition — le problème de symétrie**

Il peut sembler naturel d'initialiser tous les poids d'un réseau à zéro (une valeur "neutre"). **C'est en réalité une erreur catastrophique.** Si tous les poids d'une couche partent de zéro, tous les neurones de cette couche calculent exactement la même chose, et reçoivent exactement le même gradient lors de la rétropropagation — ils resteront **identiques entre eux pour toujours**, quel que soit le nombre d'itérations d'entraînement. C'est ce qu'on appelle le "problème de symétrie" : le réseau se comporte comme s'il n'avait qu'un seul neurone par couche, gaspillant toute sa capacité.

**La solution** : initialiser les poids avec de **petites valeurs aléatoires** (rappel Module 1 et 2 : `np.random.randn`), ce qui "brise" la symétrie dès le départ et permet à chaque neurone d'apprendre quelque chose de différent. PyTorch applique automatiquement des stratégies d'initialisation intelligentes (comme l'initialisation de He ou Xavier, adaptées à chaque fonction d'activation) par défaut sur ses couches `nn.Linear` — tu n'as généralement pas besoin d'y penser manuellement, mais il est important de comprendre pourquoi ce n'est jamais laissé à zéro.

---

## 💻 MISE EN PRATIQUE

```python
import torch
import torch.nn as nn
import torch.optim as optim
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

X, y = make_classification(n_samples=500, n_features=20, n_informative=8,
                            n_redundant=5, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
scaler = StandardScaler()
X_train = torch.FloatTensor(scaler.fit_transform(X_train))
X_test = torch.FloatTensor(scaler.transform(X_test))
y_train = torch.LongTensor(y_train)
y_test = torch.LongTensor(y_test)

# ─────────────────────────────────────────────
# 1. RÉSEAU AVEC DROPOUT ET BATCH NORMALIZATION
# ─────────────────────────────────────────────

class ReseauRegularise(nn.Module):
    def __init__(self, n_features, n_classes, taux_dropout=0.3):
        super().__init__()
        self.couche1 = nn.Linear(n_features, 64)
        self.bn1 = nn.BatchNorm1d(64)             # Batch Normalization
        self.dropout1 = nn.Dropout(taux_dropout)   # Dropout
        self.couche2 = nn.Linear(64, 32)
        self.bn2 = nn.BatchNorm1d(32)
        self.dropout2 = nn.Dropout(taux_dropout)
        self.sortie = nn.Linear(32, n_classes)
    
    def forward(self, x):
        x = torch.relu(self.bn1(self.couche1(x)))
        x = self.dropout1(x)
        x = torch.relu(self.bn2(self.couche2(x)))
        x = self.dropout2(x)
        return self.sortie(x)

# ─────────────────────────────────────────────
# 2. ENTRAÎNEMENT AVEC EARLY STOPPING ET LEARNING RATE SCHEDULING
# ─────────────────────────────────────────────

modele = ReseauRegularise(n_features=20, n_classes=2, taux_dropout=0.3)
fonction_perte = nn.CrossEntropyLoss()
optimiseur = optim.Adam(modele.parameters(), lr=0.01)

# Scheduler : réduit le LR de moitié tous les 30 epochs
scheduler = optim.lr_scheduler.StepLR(optimiseur, step_size=30, gamma=0.5)

meilleure_loss_val = float("inf")
patience = 15          # nombre d'epochs sans amélioration avant d'arrêter
compteur_patience = 0
n_epochs_max = 200
historique = {"train": [], "val": [], "lr": []}

for epoch in range(n_epochs_max):
    modele.train()
    optimiseur.zero_grad()
    pred_train = modele(X_train)
    loss_train = fonction_perte(pred_train, y_train)
    loss_train.backward()
    optimiseur.step()
    
    modele.eval()
    with torch.no_grad():
        pred_val = modele(X_test)
        loss_val = fonction_perte(pred_val, y_test)
    
    historique["train"].append(loss_train.item())
    historique["val"].append(loss_val.item())
    historique["lr"].append(optimiseur.param_groups[0]["lr"])
    
    scheduler.step()  # met à jour le learning rate selon le planning
    
    # Early Stopping
    if loss_val.item() < meilleure_loss_val:
        meilleure_loss_val = loss_val.item()
        compteur_patience = 0
        meilleurs_poids = modele.state_dict()  # sauvegarder le meilleur modèle
    else:
        compteur_patience += 1
    
    if compteur_patience >= patience:
        print(f"⏹️  Early Stopping déclenché à l'epoch {epoch}")
        break

modele.load_state_dict(meilleurs_poids)  # restaurer le meilleur modèle trouvé
print(f"✅ Meilleure loss de validation : {meilleure_loss_val:.4f}")

# Visualisation
fig, axes = plt.subplots(1, 2, figsize=(13, 5))
axes[0].plot(historique["train"], label="Train")
axes[0].plot(historique["val"], label="Validation")
axes[0].set_title("Convergence avec Régularisation")
axes[0].legend(); axes[0].grid(alpha=0.3)

axes[1].plot(historique["lr"], color="green")
axes[1].set_title("Évolution du Learning Rate (Scheduler)")
axes[1].set_yscale("log")
axes[1].grid(alpha=0.3)
plt.tight_layout()
plt.show()
```

---

## 🏋️ EXERCICES — CHAPITRE 4.3

### Exercice 4.3.A — Diagnostic à partir des courbes de loss

Un réseau affiche les résultats suivants après 100 epochs : Train Loss = 0.05, Validation Loss = 0.68 (et qui remonte depuis l'epoch 40). Quelles techniques de ce chapitre recommanderais-tu, et pourquoi ?

<details>
<summary>👉 Solution</summary>

Ce profil (train loss très faible, validation loss élevée et qui remonte) est un cas classique de **surapprentissage sévère** (rappel Module 3, chapitre 3.1). Recommandations :

1. **Ajouter du Dropout** (ou augmenter son taux s'il est déjà présent) — pour forcer le réseau à ne pas trop dépendre de neurones spécifiques
2. **Mettre en place l'Early Stopping** — puisque la validation loss remonte dès l'epoch 40, on devrait arrêter l'entraînement à ce moment précis plutôt que de continuer jusqu'à l'epoch 100
3. Envisager de **réduire la taille du réseau** (moins de neurones/couches) si le problème persiste, puisqu'un réseau trop grand par rapport à la quantité de données disponibles favorise le surapprentissage
</details>

### Exercice 4.3.B — Pourquoi ne pas initialiser les poids à zéro ?

Explique avec tes propres mots pourquoi initialiser tous les poids d'un réseau à zéro empêcherait l'entraînement de fonctionner correctement, même après de nombreuses itérations de descente de gradient.

<details>
<summary>👉 Solution</summary>

Si tous les poids partent de zéro, tous les neurones d'une même couche effectuent exactement le même calcul (puisqu'ils ont les mêmes poids), donc ils produisent la même sortie et reçoivent le même gradient lors de la rétropropagation (Chapitre 4.1, Autograd). Ils seront donc mis à jour de façon **identique** à chaque itération, restant parfaitement symétriques entre eux pour toujours — quel que soit le nombre d'epochs. Le réseau se comporte alors comme s'il n'avait qu'un seul neurone utile par couche, perdant toute la capacité de représentation supplémentaire que les autres neurones auraient dû apporter. Une initialisation aléatoire "casse" cette symétrie dès le départ, permettant à chaque neurone de suivre une trajectoire d'apprentissage différente.
</details>

### Exercice 4.3.C — Effet du taux de Dropout

Un data scientist teste 3 taux de Dropout sur le même réseau : 0.0 (aucun), 0.3, et 0.9. Prédis qualitativement ce qui va se passer dans chaque cas, en te basant sur l'intuition de ce chapitre.

<details>
<summary>👉 Solution</summary>

```
Dropout = 0.0 (aucun)  → Aucune protection contre le surapprentissage ;
                          risque élevé de surapprentissage si le réseau
                          est suffisamment grand par rapport aux données

Dropout = 0.3           → Un taux modéré, typique en pratique ; bon
                          compromis entre régularisation et capacité
                          d'apprentissage préservée

Dropout = 0.9           → Un taux extrême : 90% des neurones sont
                          désactivés à chaque itération ! Le réseau
                          perd une trop grande partie de sa capacité
                          effective à chaque passage, ce qui risque de
                          provoquer un SOUS-apprentissage (le réseau
                          n'arrive plus à apprendre correctement, même
                          sur les données d'entraînement) — retour au
                          compromis biais-variance du Module 3 !
```
</details>

### Exercice 4.3.D — train() vs eval()

Explique pourquoi le code du Chapitre 4.2 et 4.3 appelle systématiquement `modele.train()` avant la phase d'entraînement et `modele.eval()` avant la phase d'évaluation, en te basant sur le fonctionnement du Dropout et de la Batch Normalization.

<details>
<summary>👉 Solution</summary>

Le Dropout et la Batch Normalization se comportent **différemment** selon qu'on est en entraînement ou en évaluation :

- **Dropout** : actif uniquement en mode `train()` (désactive aléatoirement des neurones) ; complètement désactivé en mode `eval()` (tous les neurones sont utilisés, pour obtenir une prédiction stable et déterministe)
- **Batch Normalization** : utilise les statistiques (moyenne, écart-type) du batch courant en mode `train()`, mais utilise des statistiques **globales accumulées** pendant tout l'entraînement en mode `eval()`, pour garantir des prédictions cohérentes même sur un seul exemple isolé (où on ne peut pas calculer de statistiques de "batch")

Oublier d'appeler `modele.eval()` avant l'évaluation est une erreur très fréquente qui fausserait silencieusement les résultats, sans forcément produire d'erreur explicite — un piège classique à connaître.
</details>

---

---

# 📘 CHAPITRE 4.4 — RÉSEAUX DE NEURONES CONVOLUTIFS (CNN)

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### Pourquoi pas simplement des couches denses pour les images ?

**🔑 Intuition — le problème du nombre de paramètres**

Les couches `nn.Linear` vues jusqu'ici (couches "denses" ou "fully connected") connectent **chaque neurone d'entrée à chaque neurone de sortie**. Voyons pourquoi c'est totalement impraticable pour des images.

Une image couleur de taille modeste, 224×224 pixels, contient `224 × 224 × 3 = 150 528` valeurs (3 pour les canaux rouge/vert/bleu). Si on connectait cette image directement à une seule couche dense de "seulement" 1000 neurones, cela nécessiterait déjà `150 528 × 1000 = 150 millions de paramètres`, **rien que pour la première couche** ! Non seulement c'est un nombre astronomique de paramètres à entraîner (risque énorme de surapprentissage, rappel Module 3 et 4.3), mais cela ignore aussi complètement une information cruciale : **la structure spatiale de l'image** — deux pixels voisins sont généralement liés (ils font souvent partie du même objet ou de la même texture), une information qu'une couche dense classique ignore totalement, puisqu'elle traite chaque pixel indépendamment.

### La Convolution : détecter des motifs locaux avec une "loupe" glissante

**🔑 Intuition**

Imagine que tu explores une grande image avec une petite loupe rectangulaire (par exemple 3×3 pixels), que tu fais glisser progressivement sur toute la surface de l'image. À chaque position, cette loupe effectue un petit calcul (rappel Module 2 : une multiplication terme à terme suivie d'une somme — très proche du produit scalaire) entre les pixels qu'elle recouvre et un ensemble de poids appris, appelé **filtre** (ou kernel).

```
🔑 Principe de la convolution :

1. Un petit filtre (ex: 3×3 pixels) glisse sur toute l'image
2. À chaque position, il calcule une valeur unique (une somme pondérée
   des pixels sous le filtre)
3. L'ensemble de ces valeurs, une par position, forme une nouvelle
   "carte" appelée FEATURE MAP (carte de caractéristiques)
```

**Le point crucial : un même filtre est réutilisé à toutes les positions de l'image** (on appelle ça le "partage de poids"). Cela réduit drastiquement le nombre de paramètres par rapport à une couche dense (un filtre 3×3 n'a que 9 poids, peu importe la taille de l'image), et cela permet au réseau de détecter un même motif (par exemple, un bord vertical) **où qu'il apparaisse** dans l'image — une propriété très désirable appelée "invariance par translation".

**Que détectent concrètement les filtres ?** Les premiers filtres d'un CNN apprennent typiquement à détecter des motifs très simples — des bords horizontaux, verticaux, des changements de couleur. Les couches suivantes combinent ces détections simples pour reconnaître des motifs plus complexes — des textures, des formes géométriques, puis finalement des objets entiers (yeux, roues, visages). C'est exactement la hiérarchie de représentations évoquée au Module 0 et au Chapitre 4.2.

---

### Le Pooling : réduire la taille en gardant l'essentiel

**🔑 Intuition**

Après une convolution, on veut souvent **réduire la taille spatiale** de la feature map obtenue, pour diminuer le nombre de calculs nécessaires dans les couches suivantes, et pour rendre le réseau légèrement plus robuste à de petites variations de position.

Le **Max Pooling**, la technique la plus courante, découpe la feature map en petites zones (souvent 2×2), et ne garde **que la valeur maximale de chaque zone**. Intuition : si un filtre a détecté un motif fort quelque part dans cette petite zone, c'est cette détection la plus forte qu'on veut conserver, peu importe sa position exacte au sein de la zone — l'information précise de localisation à ce niveau de détail devient moins importante que la présence du motif lui-même.

```
Feature Map 4×4          Après Max Pooling 2×2 → Résultat 2×2

[ 1  3  2  4 ]
[ 5  6  1  2 ]     →     [ 6  4 ]
[ 0  1  8  3 ]           [ 3  9 ]
[ 2  1  9  0 ]

(on garde le max de chaque zone 2×2 : max(1,3,5,6)=6, max(2,4,1,2)=4, etc.)
```

---

### L'Architecture Typique d'un CNN

**🔑 Intuition**

Un CNN classique enchaîne plusieurs blocs "Convolution → Activation (ReLU) → Pooling", répétés plusieurs fois, ce qui permet au réseau d'apprendre progressivement des caractéristiques de plus en plus abstraites tout en réduisant la taille spatiale des données. À la toute fin, les feature maps obtenues sont "aplaties" (flatten, rappel Module 1, `.flatten()`) en un vecteur, puis passées à travers une ou plusieurs couches denses classiques (comme celles du Chapitre 4.2) pour produire la prédiction finale.

```
Image (224×224×3)
    ↓ Conv + ReLU + Pool
Feature Maps (112×112×32)
    ↓ Conv + ReLU + Pool
Feature Maps (56×56×64)
    ↓ Conv + ReLU + Pool
Feature Maps (28×28×128)
    ↓ Flatten (Module 1 !)
Vecteur (28×28×128 = 100 352 valeurs)
    ↓ Couches Denses (Chapitre 4.2)
Prédiction finale (ex: Softmax sur 10 classes)
```

---

## 💻 MISE EN PRATIQUE

```python
import torch
import torch.nn as nn
import torch.optim as optim
import matplotlib.pyplot as plt
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

# ─────────────────────────────────────────────
# 1. DÉFINIR UN CNN SIMPLE AVEC nn.Module
# ─────────────────────────────────────────────

class CNNSimple(nn.Module):
    def __init__(self, n_classes=10):
        super().__init__()
        # Bloc 1 : Convolution + ReLU + Pooling
        self.conv1 = nn.Conv2d(in_channels=1, out_channels=16, kernel_size=3, padding=1)
        self.pool1 = nn.MaxPool2d(kernel_size=2, stride=2)
        
        # Bloc 2
        self.conv2 = nn.Conv2d(in_channels=16, out_channels=32, kernel_size=3, padding=1)
        self.pool2 = nn.MaxPool2d(kernel_size=2, stride=2)
        
        # Couches denses finales (rappel Chapitre 4.2)
        self.fc1 = nn.Linear(32 * 7 * 7, 128)   # 28x28 → 14x14 → 7x7 après 2 poolings
        self.fc2 = nn.Linear(128, n_classes)
        self.dropout = nn.Dropout(0.3)           # rappel Chapitre 4.3
    
    def forward(self, x):
        x = self.pool1(torch.relu(self.conv1(x)))
        x = self.pool2(torch.relu(self.conv2(x)))
        x = x.flatten(start_dim=1)                # rappel Module 1 : "aplatir" le tensor
        x = torch.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        return x

# ─────────────────────────────────────────────
# 2. CHARGER LE DATASET MNIST (chiffres manuscrits)
# ─────────────────────────────────────────────

transform = transforms.Compose([transforms.ToTensor()])
train_dataset = datasets.MNIST(root="./data", train=True, download=True, transform=transform)
test_dataset = datasets.MNIST(root="./data", train=False, download=True, transform=transform)

train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=1000, shuffle=False)

print(f"Nombre d'images d'entraînement : {len(train_dataset)}")
print(f"Taille d'une image : {train_dataset[0][0].shape}")  # (1, 28, 28)

# ─────────────────────────────────────────────
# 3. ENTRAÎNER LE CNN
# ─────────────────────────────────────────────

modele_cnn = CNNSimple(n_classes=10)
fonction_perte = nn.CrossEntropyLoss()
optimiseur = optim.Adam(modele_cnn.parameters(), lr=0.001)

n_epochs = 3  # MNIST converge vite, quelques epochs suffisent pour une démo
for epoch in range(n_epochs):
    modele_cnn.train()
    perte_totale = 0
    for images, labels in train_loader:
        optimiseur.zero_grad()
        predictions = modele_cnn(images)
        loss = fonction_perte(predictions, labels)
        loss.backward()
        optimiseur.step()
        perte_totale += loss.item()
    
    print(f"Epoch {epoch+1}/{n_epochs} : Loss moyenne = {perte_totale/len(train_loader):.4f}")

# ─────────────────────────────────────────────
# 4. ÉVALUER ET VISUALISER LES PRÉDICTIONS
# ─────────────────────────────────────────────

modele_cnn.eval()
with torch.no_grad():
    images_test, labels_test = next(iter(test_loader))
    predictions = modele_cnn(images_test)
    classes_predites = torch.argmax(predictions, dim=1)
    accuracy = (classes_predites == labels_test).float().mean()

print(f"\nAccuracy sur le test : {accuracy.item():.2%}")

fig, axes = plt.subplots(2, 5, figsize=(12, 5))
for i, ax in enumerate(axes.flat):
    ax.imshow(images_test[i][0], cmap="gray")
    couleur = "green" if classes_predites[i] == labels_test[i] else "red"
    ax.set_title(f"Prédit: {classes_predites[i].item()}", color=couleur)
    ax.axis("off")
plt.suptitle("Prédictions du CNN sur MNIST")
plt.tight_layout()
plt.show()
```

---

## 🏋️ EXERCICES — CHAPITRE 4.4

### Exercice 4.4.A — Calculer le nombre de paramètres

Compare le nombre de paramètres nécessaires pour connecter une image de 100×100 pixels en noir et blanc (1 canal) à une couche de 500 neurones, en utilisant (1) une couche dense classique, et (2) un filtre de convolution 5×5 avec 500 en réutilisant le même filtre partout.

<details>
<summary>👉 Solution</summary>

```
1. COUCHE DENSE :
   Chaque pixel de l'image connecté à chaque neurone de sortie
   Nombre de paramètres = (100 × 100) × 500 = 10 000 × 500 = 5 000 000 paramètres
   (+ 500 biais, négligeable en comparaison)

2. FILTRE DE CONVOLUTION 5×5 (un seul filtre appliqué partout) :
   Nombre de paramètres = 5 × 5 × 1 canal = 25 paramètres (+ 1 biais = 26)
   
   Même avec 500 filtres différents (équivalent à 500 "détecteurs" différents) :
   Nombre de paramètres = 500 × 26 = 13 000 paramètres

CONCLUSION : la convolution utilise environ 385 FOIS MOINS de paramètres
(13 000 contre 5 000 000) pour un pouvoir de détection comparable,
grâce au partage de poids (le même filtre est réutilisé à toutes les
positions de l'image) — un gain absolument déterminant pour la
faisabilité pratique du Deep Learning sur les images.
```
</details>

### Exercice 4.4.B — Calculer la taille après pooling

Une feature map de taille 64×64 passe par un Max Pooling avec un kernel de 2×2 et un stride de 2, puis par un second Max Pooling identique. Quelle est la taille finale ?

<details>
<summary>👉 Solution</summary>

```
Feature map initiale : 64×64

Après 1er Max Pooling (2×2, stride 2) : 64/2 = 32 → 32×32

Après 2e Max Pooling (2×2, stride 2)  : 32/2 = 16 → 16×16

Taille finale : 16×16
```

*(Chaque Max Pooling 2×2 avec stride 2 divise systématiquement chaque dimension spatiale par 2 — c'est exactement le calcul utilisé dans l'exemple de code de ce chapitre pour passer de 28×28 à 7×7 en deux poolings successifs.)*
</details>

### Exercice 4.4.C — Interpréter la hiérarchie de features

Explique, avec tes propres mots et en te référant à l'intuition de ce chapitre, pourquoi les premières couches d'un CNN entraîné sur des photos d'animaux détectent généralement des bords et des textures simples, tandis que les couches profondes détectent des concepts comme "oreille de chat" ou "visage entier".

<details>
<summary>👉 Solution</summary>

Chaque couche convolutive construit ses détections **à partir des détections de la couche précédente**. La première couche, directement connectée aux pixels bruts, ne peut détecter que des motifs très simples et locaux (bords, changements de couleur) car c'est tout ce qui est visible à ce niveau. La deuxième couche reçoit en entrée les détections de bords de la première couche, et peut donc les **combiner** pour reconnaître des motifs plus complexes (textures, coins, courbes simples). En répétant ce processus sur plusieurs couches, chaque niveau combine les concepts du niveau précédent pour construire des représentations de plus en plus abstraites, jusqu'à ce que les couches profondes puissent reconnaître des concepts complexes comme "une oreille pointue" ou "un visage", qui sont eux-mêmes des combinaisons de nombreux motifs plus simples détectés en amont.
</details>

### Exercice 4.4.D — CNN ou couche dense classique ?

Pour chacun des scénarios suivants, indique s'il est préférable d'utiliser un CNN ou si une couche dense classique (Chapitre 4.2) suffirait :

1. Classifier des radiographies pulmonaires pour détecter une pneumonie
2. Prédire le risque de churn à partir de 15 variables tabulaires (âge, ancienneté, solde...)
3. Reconnaître des chiffres manuscrits sur des chèques scannés

<details>
<summary>👉 Solution</summary>

```
1. CNN — image médicale, la structure spatiale (formes, textures dans
   les poumons) est directement pertinente pour le diagnostic

2. COUCHE DENSE CLASSIQUE — données tabulaires structurées sans
   structure spatiale à exploiter ; d'ailleurs, un modèle de Machine
   Learning classique (Module 3, Random Forest ou Gradient Boosting)
   serait même probablement préférable ici à un réseau de neurones

3. CNN — reconnaissance de chiffres manuscrits sur image, exactement
   le cas d'usage démontré dans la Mise en Pratique de ce chapitre
   (dataset MNIST)
```
</details>

---

---

# 📘 CHAPITRE 4.5 — TRANSFER LEARNING ET MODÈLES PRÉ-ENTRAÎNÉS

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Pourquoi repartir de zéro est souvent une mauvaise idée

**🔑 Intuition — le chef cuisinier qui change de spécialité**

Imagine un chef cuisinier expert en cuisine française, qui souhaite maintenant se spécialiser en cuisine japonaise. Il n'a **absolument pas besoin de réapprendre depuis zéro** les techniques de base (couper, assaisonner, gérer la cuisson, dresser une assiette) — ces compétences fondamentales sont **transférables** d'une cuisine à l'autre. Il n'a besoin d'apprendre que les spécificités propres à la cuisine japonaise (nouveaux ingrédients, nouvelles techniques particulières).

**Le Transfer Learning applique exactement cette idée aux réseaux de neurones.** Un CNN entraîné sur des millions d'images très diverses (comme le célèbre dataset ImageNet, 1.2 million d'images, 1000 catégories) a déjà appris, dans ses premières couches, à détecter des caractéristiques visuelles **génériques et universelles** — bords, textures, formes simples — qui sont utiles pour **quasiment n'importe quelle tâche de vision par ordinateur**, pas seulement celle sur laquelle il a été initialement entraîné.

**💡 Pourquoi c'est si précieux en pratique :** entraîner un grand CNN depuis zéro nécessite d'énormes quantités de données (souvent des millions d'images) et des ressources de calcul considérables (rappel Module 0 : GPU puissants pendant des jours). En réutilisant un modèle déjà pré-entraîné, on peut obtenir d'excellentes performances sur sa propre tâche spécifique avec **beaucoup moins de données** (parfois seulement quelques centaines d'exemples) et **beaucoup moins de temps de calcul**.

---

### Feature Extraction vs Fine-Tuning : deux stratégies de réutilisation

**🔑 Intuition**

Il existe deux grandes façons d'exploiter un modèle pré-entraîné, selon le degré de "réadaptation" qu'on lui applique.

**Feature Extraction (extraction de caractéristiques)** : on **gèle** (on "fige", `requires_grad=False`, rappel Chapitre 4.1) toutes les couches du modèle pré-entraîné, sauf la toute dernière couche, qu'on remplace par une nouvelle couche adaptée à notre nombre de classes spécifique, et qu'on entraîne seule. C'est comme utiliser le chef cuisinier français pour ses techniques de base **sans jamais les modifier**, en lui demandant simplement d'apprendre la présentation finale spécifique à la cuisine japonaise.

**Fine-Tuning (affinage)** : on **dégèle** tout ou partie des couches du modèle pré-entraîné, et on continue l'entraînement sur ces couches avec un **learning rate très faible** (rappel Module 2, chapitre 2.4.3 — on veut ajuster finement, pas bouleverser ce qui a déjà été appris), en plus d'entraîner la nouvelle couche finale. C'est comme laisser le chef cuisinier **légèrement ajuster** certaines de ses techniques de base pour mieux les adapter aux spécificités des ingrédients japonais, plutôt que de les garder totalement figées.

```
🔑 FEATURE EXTRACTION :
   Couches pré-entraînées : GELÉES (aucun apprentissage)
   Nouvelle couche finale  : entraînée normalement
   → Rapide, nécessite peu de données, risque de surapprentissage réduit

🔑 FINE-TUNING :
   Couches pré-entraînées : dégelées, entraînées avec un TRÈS petit learning rate
   Nouvelle couche finale  : entraînée normalement (learning rate normal)
   → Plus lent, nécessite davantage de données, mais peut donner de
     meilleures performances si la nouvelle tâche diffère significativement
     de la tâche d'origine
```

**Comment choisir entre les deux ?**

```
🔑 Peu de données disponibles, tâche similaire à celle d'origine
   → FEATURE EXTRACTION (risque de surapprentissage sinon, rappel 4.3)

🔑 Beaucoup de données disponibles, ou tâche assez différente
   de celle d'origine
   → FINE-TUNING (le réseau peut se permettre de s'adapter davantage)
```

---

### Les Architectures Pré-entraînées Courantes — rappel du Module 0

Tu as déjà croisé ces noms au Module 0 : **ResNet**, **VGG**, **EfficientNet** sont des architectures de CNN devenues célèbres pour leurs excellentes performances sur ImageNet, et sont directement disponibles, déjà entraînées, dans la bibliothèque `torchvision` de PyTorch — prêtes à être réutilisées en quelques lignes de code pour du Transfer Learning.

---

## 💻 MISE EN PRATIQUE

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models, transforms

# ─────────────────────────────────────────────
# 1. CHARGER UN MODÈLE PRÉ-ENTRAÎNÉ (ResNet18 sur ImageNet)
# ─────────────────────────────────────────────

modele = models.resnet18(weights="IMAGENET1K_V1")  # déjà entraîné sur 1.2M images !
print(f"Le modèle a été entraîné pour {modele.fc.out_features} classes (ImageNet)")

# ─────────────────────────────────────────────
# 2. FEATURE EXTRACTION — geler toutes les couches sauf la dernière
# ─────────────────────────────────────────────

for parametre in modele.parameters():
    parametre.requires_grad = False   # rappel Chapitre 4.1 : "ne pas calculer de gradient"

# Remplacer la dernière couche pour NOTRE tâche (ex: 3 classes de fleurs)
n_classes_notre_tache = 3
n_features_entree = modele.fc.in_features   # nombre de features avant la dernière couche
modele.fc = nn.Linear(n_features_entree, n_classes_notre_tache)
# ⚠️ Une nouvelle couche créée ainsi a requires_grad=True PAR DÉFAUT — elle seule s'entraînera

# Vérification : combien de paramètres sont réellement entraînables ?
params_entrainables = sum(p.numel() for p in modele.parameters() if p.requires_grad)
params_total = sum(p.numel() for p in modele.parameters())
print(f"\nParamètres entraînables : {params_entrainables:,} sur {params_total:,} au total")
print(f"({params_entrainables/params_total:.2%} seulement du réseau sera réellement entraîné)")

# ─────────────────────────────────────────────
# 3. FINE-TUNING — dégeler certaines couches avec un petit learning rate
# ─────────────────────────────────────────────

# On dégèle par exemple la dernière "couche" de blocs convolutifs (layer4)
for parametre in modele.layer4.parameters():
    parametre.requires_grad = True

# Deux groupes de paramètres avec des learning rates différents
optimiseur = optim.Adam([
    {"params": modele.layer4.parameters(), "lr": 1e-5},  # très petit LR — on ajuste finement
    {"params": modele.fc.parameters(), "lr": 1e-3}         # LR normal — nouvelle couche
])

print(f"\nStratégie Fine-Tuning : layer4 dégelée (LR=1e-5), fc entraînée normalement (LR=1e-3)")

# ─────────────────────────────────────────────
# 4. PRÉTRAITEMENT DES IMAGES — respecter le format attendu par ResNet
# ─────────────────────────────────────────────

# ImageNet a été normalisé avec ces valeurs précises — il faut les reproduire
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

print("\n✅ Modèle prêt pour l'entraînement sur la nouvelle tâche")
print("(la boucle d'entraînement est ensuite identique à celle du Chapitre 4.2)")
```

---

## 🏋️ EXERCICES — CHAPITRE 4.5

### Exercice 4.5.A — Choisir entre Feature Extraction et Fine-Tuning

Pour chacun des scénarios suivants, recommande Feature Extraction ou Fine-Tuning, en justifiant :

1. Tu disposes de seulement 200 photos de radiographies pour détecter une maladie rare
2. Tu disposes de 50 000 photos de produits e-commerce très différents des images d'ImageNet (objets stylisés, arrière-plans blancs)
3. Tu disposes de 500 photos de chats et chiens (une tâche très proche des catégories déjà présentes dans ImageNet)

<details>
<summary>👉 Solution</summary>

```
1. FEATURE EXTRACTION — très peu de données (200 images), le risque
   de surapprentissage avec du Fine-Tuning serait élevé ; on préfère
   geler les couches pré-entraînées et n'entraîner que la couche finale

2. FINE-TUNING — quantité de données conséquente (50 000 images) ET
   tâche assez différente du contenu typique d'ImageNet (photos
   naturelles) ; le réseau peut se permettre d'ajuster ses couches
   profondes pour mieux s'adapter à ce nouveau style d'images

3. FEATURE EXTRACTION (voire un Fine-Tuning très léger) — la tâche
   est très proche des catégories déjà présentes dans ImageNet (qui
   contient déjà de nombreuses races de chats et chiens), donc les
   features déjà apprises sont probablement déjà très pertinentes
   telles quelles, même avec peu de données (500 images)
```
</details>

### Exercice 4.5.B — Calculer les paramètres entraînables

Un modèle ResNet18 pré-entraîné a 11 millions de paramètres au total. En Feature Extraction, seule la dernière couche (qui passe de 512 à 5 classes) est entraînée. Calcule approximativement le nombre de paramètres entraînables (rappel : `nn.Linear(in, out)` a `in × out + out` paramètres).

<details>
<summary>👉 Solution</summary>

```
nn.Linear(512, 5) :
Poids  = 512 × 5 = 2 560
Biais  = 5
Total  = 2 565 paramètres entraînables

Sur les 11 000 000 de paramètres totaux, seuls 2 565 seront réellement
entraînés — soit environ 0.023% du réseau ! C'est ce qui rend le
Feature Extraction si rapide et si économe en données : on n'a besoin
d'apprendre qu'une infime fraction des paramètres totaux, le reste
ayant déjà été appris sur ImageNet.
```
</details>

### Exercice 4.5.C — Pourquoi un learning rate différent pour le Fine-Tuning ?

Explique pourquoi on utilise généralement un learning rate **beaucoup plus petit** pour les couches pré-entraînées dégelées que pour la nouvelle couche finale, lors d'un Fine-Tuning (comme dans l'exemple de code de ce chapitre).

<details>
<summary>👉 Solution</summary>

Les couches pré-entraînées contiennent déjà des poids **soigneusement optimisés** sur des millions d'images — on veut les **ajuster finement**, pas les bouleverser (rappel Module 2, chapitre 2.4.3 : un learning rate trop élevé peut faire "sauter" les paramètres loin de leur bon réglage actuel, voire faire diverger l'entraînement). Un learning rate très faible sur ces couches permet des ajustements progressifs et prudents. À l'inverse, la nouvelle couche finale part de zéro (poids initialisés aléatoirement, rappel Chapitre 4.3), elle a donc besoin d'un learning rate plus classique pour apprendre efficacement depuis cet état initial peu informatif.
</details>

### Exercice 4.5.D — Le prétraitement des images en Transfer Learning

Pourquoi est-il indispensable d'appliquer exactement la même normalisation (`mean` et `std` spécifiques) que celle utilisée lors de l'entraînement original sur ImageNet, plutôt qu'une normalisation calculée sur son propre dataset (comme on le ferait habituellement avec `StandardScaler`, Module 1) ?

<details>
<summary>👉 Solution</summary>

Le modèle pré-entraîné a appris ses poids en s'attendant à recevoir des données dans une distribution numérique **spécifique** — celle produite par la normalisation utilisée pendant son entraînement original sur ImageNet. Si on lui fournit des données normalisées différemment (par exemple avec les statistiques de son propre dataset), les valeurs numériques d'entrée seraient dans une échelle inattendue pour le réseau, ce qui perturberait significativement toutes les couches pré-entraînées, dont les poids ont été calibrés pour cette distribution précise — un peu comme donner des instructions en centimètres à quelqu'un qui les attend en pouces. Utiliser exactement les mêmes statistiques de normalisation garantit que les données d'entrée "ressemblent", numériquement, à ce que le réseau a appris à traiter.
</details>

---

---

# 📘 CHAPITRE 4.6 — DONNÉES SÉQUENTIELLES : RNN ET LSTM

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Pourquoi les CNN et couches denses ne suffisent pas pour les séquences

**🔑 Intuition**

Rappelle-toi le Module 0 : le texte, la parole, les séries temporelles sont des données **séquentielles** — l'ordre des éléments compte fondamentalement, et la longueur de la séquence varie d'un exemple à l'autre (une phrase de 5 mots, une autre de 50 mots). Les architectures vues jusqu'ici (couches denses du Chapitre 4.2, CNN du Chapitre 4.4) sont conçues pour des entrées de **taille fixe**, et ne "mémorisent" pas naturellement d'information d'un élément de la séquence au suivant.

### Le RNN (Réseau de Neurones Récurrent) : une mémoire qui se transmet

**🔑 Intuition — lire une phrase en gardant le contexte en tête**

Quand tu lis une phrase mot par mot, tu ne traites pas chaque mot de façon totalement isolée — tu gardes en tête ce que tu as lu **précédemment**, pour interpréter correctement chaque nouveau mot dans son contexte. Par exemple, dans "la banque de la rivière", le mot "banque" ne prend son sens correct (une berge, pas un établissement financier) qu'en tenant compte du mot "rivière" qui suit — et inversement, pour comprendre "rivière" pleinement dans ce contexte, il aide d'avoir déjà lu "banque".

**Un RNN reproduit cette idée de mémoire séquentielle** : à chaque étape (chaque mot), il combine l'entrée actuelle avec un **état caché** (hidden state) qui résume tout ce qu'il a "vu" jusqu'ici dans la séquence, et produit un nouvel état caché mis à jour, transmis à l'étape suivante.

```
🔑 Principe du RNN :

mot 1 → [RNN] → état caché 1 ─┐
                                ├→ mot 2 → [RNN] → état caché 2 ─┐
                                                                   ├→ mot 3 → [RNN] → état caché 3
                                                                   
Chaque étape reçoit : le mot actuel + l'état caché de l'étape précédente
Chaque étape produit : une sortie + un nouvel état caché, transmis à la suite
```

Le même bloc de calcul (les mêmes poids) est réutilisé à chaque étape de la séquence — un peu comme le partage de poids d'un filtre de convolution (Chapitre 4.4), mais appliqué dans le temps plutôt que dans l'espace.

---

### Le Problème du Gradient qui Explose ou Disparaît

**🔑 Intuition — retour à la règle de la chaîne du Module 2**

Rappelle-toi le Module 2, chapitre 2.2.6 : la règle de la chaîne calcule un gradient en **multipliant** les dérivées à chaque étape de la chaîne. Dans un RNN traitant une longue séquence (imagine un texte de 100 mots), le calcul du gradient doit remonter à travers **100 étapes successives**, ce qui revient à multiplier ensemble une centaine de valeurs.

**Voici le problème mathématique fondamental :**

```
🔑 Si les valeurs multipliées sont systématiquement < 1 :
   0.5 × 0.5 × 0.5 × ... (100 fois) → un nombre absolument minuscule,
   proche de zéro → le GRADIENT DISPARAÎT (vanishing gradient)
   → les premières étapes de la séquence n'apprennent presque plus rien

🔑 Si les valeurs multipliées sont systématiquement > 1 :
   1.5 × 1.5 × 1.5 × ... (100 fois) → un nombre absolument gigantesque
   → le GRADIENT EXPLOSE (exploding gradient)
   → l'entraînement devient instable, voire diverge complètement
```

C'est une limitation sérieuse des RNN "simples" (vanilla RNN) : ils ont beaucoup de mal à **apprendre des dépendances à long terme** — se souvenir d'une information vue très tôt dans une longue séquence pour l'utiliser beaucoup plus tard.

---

### Le LSTM (Long Short-Term Memory) : des "portes" pour décider quoi garder

**🔑 Intuition — le carnet de notes sélectif**

Imagine que tu prends des notes pendant une longue réunion, mais avec un carnet un peu spécial : à chaque nouvelle information, tu dois **activement décider** trois choses : qu'est-ce que je dois **oublier** de mes notes précédentes (car devenu inutile ou obsolète) ? qu'est-ce que je dois **ajouter** de nouveau à mes notes ? et qu'est-ce que je dois **communiquer** à quelqu'un maintenant, à partir de ce que j'ai noté ?

**Le LSTM formalise exactement cette idée avec trois "portes" apprises** :

```
🔑 Porte d'OUBLI (forget gate)  : décide quelle partie de la mémoire
                                    précédente doit être effacée
🔑 Porte d'ENTRÉE (input gate)  : décide quelle nouvelle information
                                    doit être ajoutée à la mémoire
🔑 Porte de SORTIE (output gate): décide quelle partie de la mémoire
                                    doit être communiquée à cette étape
```

Ces portes, elles-mêmes de petits réseaux de neurones (avec une activation sigmoïde, rappel Module 2 — pour produire une valeur entre 0 et 1, interprétée comme "à quel point on garde/laisse passer cette information"), permettent au LSTM de **maintenir une mémoire stable sur de très longues séquences**, en évitant le problème du gradient qui explose ou disparaît — la mémoire peut être préservée sans dégradation à travers de nombreuses étapes, précisément parce que la porte d'oubli peut apprendre à "laisser passer" l'information importante sans l'atténuer à chaque étape (contrairement au RNN simple, qui la retraite et l'atténue systématiquement à chaque étape).

**Le GRU (Gated Recurrent Unit)** est une variante plus simple du LSTM (moins de portes, donc moins de paramètres), qui obtient souvent des performances comparables avec un coût de calcul réduit.

---

### Vers le Module 5 : pourquoi les Transformers ont largement remplacé les RNN/LSTM

**🔑 Intuition**

Rappelle-toi le Module 0 : les Transformers (2017) ont révolutionné le traitement des séquences, notamment pour le texte. **Comprendre pourquoi les RNN/LSTM ont des limites t'aide à comprendre pourquoi les Transformers ont représenté une telle avancée** :

```
🔑 Limite des RNN/LSTM : traitement SÉQUENTIEL, étape par étape
   → impossible de paralléliser le calcul sur un GPU pour une seule
     séquence (chaque étape dépend du résultat de la précédente) →
     entraînement lent sur de longues séquences

🔑 Avantage des Transformers (Module 0, et approfondi au Module 5) :
   le mécanisme d'attention permet de traiter TOUS les éléments
   d'une séquence SIMULTANÉMENT, en parallèle → exploitation bien
   plus efficace de la puissance de calcul des GPU, entraînement
   sur des séquences bien plus longues, à bien plus grande échelle
```

C'est cette parallélisation massive, combinée à la capacité du mécanisme d'attention à directement relier n'importe quels deux éléments d'une séquence (même très éloignés), sans passer par une chaîne d'étapes intermédiaires comme le LSTM, qui a permis l'émergence des grands modèles de langage (LLMs) que tu connais aujourd'hui. Le Module 5 approfondira en détail cette architecture.

---

## 💻 MISE EN PRATIQUE

```python
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import matplotlib.pyplot as plt

# ─────────────────────────────────────────────
# 1. UN RNN SIMPLE — prédire le prochain point d'une série temporelle
# ─────────────────────────────────────────────

class RNNSimple(nn.Module):
    def __init__(self, taille_entree=1, taille_cachee=32):
        super().__init__()
        self.rnn = nn.RNN(input_size=taille_entree, hidden_size=taille_cachee, batch_first=True)
        self.sortie = nn.Linear(taille_cachee, 1)
    
    def forward(self, x):
        sortie_rnn, dernier_etat_cache = self.rnn(x)
        # On utilise seulement la sortie de la DERNIÈRE étape de la séquence
        derniere_sortie = sortie_rnn[:, -1, :]
        return self.sortie(derniere_sortie)

# ─────────────────────────────────────────────
# 2. UN LSTM — même tâche, mémoire plus robuste
# ─────────────────────────────────────────────

class LSTMSimple(nn.Module):
    def __init__(self, taille_entree=1, taille_cachee=32):
        super().__init__()
        self.lstm = nn.LSTM(input_size=taille_entree, hidden_size=taille_cachee, batch_first=True)
        self.sortie = nn.Linear(taille_cachee, 1)
    
    def forward(self, x):
        sortie_lstm, (dernier_h, dernier_c) = self.lstm(x)
        derniere_sortie = sortie_lstm[:, -1, :]
        return self.sortie(derniere_sortie)

# ─────────────────────────────────────────────
# 3. GÉNÉRER UNE SÉRIE TEMPORELLE SIMPLE (une sinusoïde bruitée)
# ─────────────────────────────────────────────

np.random.seed(42)
temps = np.linspace(0, 100, 1000)
serie = np.sin(temps * 0.3) + np.random.normal(0, 0.1, 1000)

def creer_sequences(serie, longueur_sequence=20):
    X, y = [], []
    for i in range(len(serie) - longueur_sequence):
        X.append(serie[i:i+longueur_sequence])
        y.append(serie[i+longueur_sequence])
    return np.array(X), np.array(y)

longueur_sequence = 20
X, y = creer_sequences(serie, longueur_sequence)

# Format attendu par PyTorch : (batch, longueur_sequence, taille_entree)
X = torch.FloatTensor(X).unsqueeze(-1)   # rappel Module 2 : ajouter une dimension
y = torch.FloatTensor(y).unsqueeze(-1)

split = int(0.8 * len(X))
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

# ─────────────────────────────────────────────
# 4. ENTRAÎNER LE LSTM (boucle identique au Chapitre 4.2)
# ─────────────────────────────────────────────

modele = LSTMSimple(taille_entree=1, taille_cachee=32)
fonction_perte = nn.MSELoss()   # rappel : régression, pas classification
optimiseur = optim.Adam(modele.parameters(), lr=0.01)

historique = []
for epoch in range(100):
    modele.train()
    optimiseur.zero_grad()
    predictions = modele(X_train)
    loss = fonction_perte(predictions, y_train)
    loss.backward()
    optimiseur.step()
    historique.append(loss.item())
    if epoch % 20 == 0:
        print(f"Epoch {epoch} : Loss = {loss.item():.5f}")

# Visualiser les prédictions sur le test
modele.eval()
with torch.no_grad():
    predictions_test = modele(X_test)

plt.figure(figsize=(11, 5))
plt.plot(y_test.numpy(), label="Vraies valeurs", color="steelblue")
plt.plot(predictions_test.numpy(), label="Prédictions LSTM", color="tomato", linestyle="--")
plt.title("Prédiction de Série Temporelle avec LSTM")
plt.legend()
plt.grid(alpha=0.3)
plt.show()
```

---

## 🏋️ EXERCICES — CHAPITRE 4.6

### Exercice 4.6.A — Comprendre le gradient qui disparaît

Une séquence de 50 étapes fait intervenir, lors de la rétropropagation, une multiplication répétée de 50 facteurs valant chacun 0.8. Calcule approximativement le résultat de cette multiplication, et explique le lien avec le problème du gradient qui disparaît.

<details>
<summary>👉 Solution</summary>

```python
resultat = 0.8 ** 50
print(resultat)  # ≈ 0.0000014 (environ 1.4 × 10⁻⁵)
```

Un facteur de 0.8, répété 50 fois, donne un résultat quasiment nul (environ 0.000014, soit 70 000 fois plus petit que le facteur initial). C'est exactement le phénomène du **gradient qui disparaît** : même une atténuation modeste à chaque étape (0.8, soit une réduction de "seulement" 20%) devient catastrophique une fois répétée sur de nombreuses étapes successives, rendant le gradient final quasiment nul pour les premières étapes de la séquence — elles n'apprennent alors presque plus rien, quelle que soit la quantité d'entraînement.
</details>

### Exercice 4.6.B — Le rôle des trois portes du LSTM

Associe chaque porte du LSTM à sa fonction :

```
Portes :        A. Porte d'oubli    B. Porte d'entrée    C. Porte de sortie

Fonctions :
1. Décide quelle nouvelle information ajouter à la mémoire
2. Décide quelle partie de la mémoire communiquer à cette étape
3. Décide quelle partie de la mémoire précédente effacer
```

<details>
<summary>👉 Solution</summary>

```
A (Porte d'oubli)  → 3 (décide quelle partie de la mémoire précédente effacer)
B (Porte d'entrée) → 1 (décide quelle nouvelle information ajouter à la mémoire)
C (Porte de sortie)→ 2 (décide quelle partie de la mémoire communiquer à cette étape)
```
</details>

### Exercice 4.6.C — RNN simple ou LSTM ?

Pour chacun des scénarios suivants, indique s'il est préférable d'utiliser un RNN simple ou un LSTM, en te basant sur la longueur des dépendances à capturer :

1. Prédire le mot suivant à partir des 3 derniers mots seulement
2. Résumer un article de 2000 mots en tenant compte de l'introduction pour générer une conclusion cohérente
3. Analyser le sentiment d'un tweet de 20 mots

<details>
<summary>👉 Solution</symmary>

```
1. RNN SIMPLE peut suffire — dépendance très courte (3 mots), le
   problème du gradient qui disparaît est peu susceptible de poser
   problème sur une séquence aussi brève

2. LSTM fortement recommandé — dépendance très longue (2000 mots,
   avec un lien entre le tout début et la toute fin), exactement le
   genre de situation où un RNN simple échouerait à cause du
   gradient qui disparaît sur une si longue séquence

3. RNN SIMPLE ou LSTM conviennent tous les deux raisonnablement —
   séquence courte (20 mots), mais en pratique, le LSTM (ou plus
   simplement encore, un Transformer, Module 5) reste le choix par
   défaut le plus robuste dans la plupart des cas modernes
```
</details>

### Exercice 4.6.D — Pourquoi les Transformers permettent la parallélisation

Explique en une ou deux phrases pourquoi un RNN ne peut pas traiter tous les mots d'une phrase simultanément sur un GPU, alors qu'un Transformer le peut, en te référant à l'intuition de ce chapitre.

<details>
<summary>👉 Solution</summary>

Un RNN calcule son état caché à l'étape *t* en se basant **directement** sur l'état caché de l'étape *t-1* — chaque étape dépend séquentiellement du résultat de la précédente, il est donc impossible de calculer l'étape 10 avant d'avoir calculé les étapes 1 à 9. Un Transformer, à travers son mécanisme d'attention (Module 0, approfondi au Module 5), calcule les relations entre **tous les mots simultanément**, sans dépendance séquentielle stricte d'une étape à l'autre — ce qui permet d'exploiter pleinement le calcul massivement parallèle des GPU (rappel Module 0), et explique en grande partie pourquoi les Transformers ont pu être entraînés à une échelle bien supérieure aux RNN/LSTM.
</details>

---

---

# 🎯 PROJET DE SYNTHÈSE DU MODULE 4
## Construire, Régulariser et Évaluer un CNN Complet — de A à Z

**🔑 Pourquoi ce projet réunit tout le module**

Ce projet enchaîne, sur un seul problème concret, absolument toutes les briques apprises dans ce module : les tensors et Autograd (4.1), la construction et l'entraînement d'un réseau (4.2), la régularisation pour éviter le surapprentissage (4.3), l'architecture convolutive adaptée aux images (4.4) — le tout en appliquant rigoureusement la méthodologie de validation apprise au Module 3.

```python
import torch
import torch.nn as nn
import torch.optim as optim
import matplotlib.pyplot as plt
from torchvision import datasets, transforms
from torch.utils.data import DataLoader, random_split

# ─────────────────────────────────────────────
# 1. DONNÉES — Fashion-MNIST (vêtements, plus complexe que MNIST)
# ─────────────────────────────────────────────
transform = transforms.Compose([transforms.ToTensor()])
dataset_complet = datasets.FashionMNIST(root="./data", train=True, download=True, transform=transform)
dataset_test = datasets.FashionMNIST(root="./data", train=False, download=True, transform=transform)

# Division Train/Validation rigoureuse (rappel Module 3, chapitre 3.1)
taille_train = int(0.85 * len(dataset_complet))
taille_val = len(dataset_complet) - taille_train
dataset_train, dataset_val = random_split(dataset_complet, [taille_train, taille_val])

train_loader = DataLoader(dataset_train, batch_size=64, shuffle=True)
val_loader = DataLoader(dataset_val, batch_size=256, shuffle=False)
test_loader = DataLoader(dataset_test, batch_size=256, shuffle=False)

noms_classes = ["T-shirt", "Pantalon", "Pull", "Robe", "Manteau",
                "Sandale", "Chemise", "Basket", "Sac", "Bottine"]

# ─────────────────────────────────────────────
# 2. ARCHITECTURE CNN AVEC RÉGULARISATION (4.4 + 4.3)
# ─────────────────────────────────────────────
class CNNFashion(nn.Module):
    def __init__(self, n_classes=10):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, padding=1)
        self.bn1 = nn.BatchNorm2d(32)                    # 4.3
        self.pool1 = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.bn2 = nn.BatchNorm2d(64)                     # 4.3
        self.pool2 = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.dropout = nn.Dropout(0.4)                    # 4.3
        self.fc2 = nn.Linear(128, n_classes)
    
    def forward(self, x):
        x = self.pool1(torch.relu(self.bn1(self.conv1(x))))
        x = self.pool2(torch.relu(self.bn2(self.conv2(x))))
        x = x.flatten(start_dim=1)
        x = torch.relu(self.fc1(x))
        x = self.dropout(x)
        return self.fc2(x)

modele = CNNFashion()
fonction_perte = nn.CrossEntropyLoss()
optimiseur = optim.Adam(modele.parameters(), lr=0.001)
scheduler = optim.lr_scheduler.StepLR(optimiseur, step_size=5, gamma=0.5)   # 4.3

# ─────────────────────────────────────────────
# 3. ENTRAÎNEMENT AVEC EARLY STOPPING (4.2 + 4.3)
# ─────────────────────────────────────────────
meilleure_loss_val = float("inf")
patience, compteur = 3, 0
historique = {"train": [], "val": []}

for epoch in range(15):
    modele.train()
    perte_train = 0
    for images, labels in train_loader:
        optimiseur.zero_grad()
        loss = fonction_perte(modele(images), labels)
        loss.backward()
        optimiseur.step()
        perte_train += loss.item()
    
    modele.eval()
    perte_val = 0
    with torch.no_grad():
        for images, labels in val_loader:
            perte_val += fonction_perte(modele(images), labels).item()
    
    perte_train /= len(train_loader)
    perte_val /= len(val_loader)
    historique["train"].append(perte_train)
    historique["val"].append(perte_val)
    scheduler.step()
    
    print(f"Epoch {epoch+1:2d} : Train={perte_train:.4f}, Val={perte_val:.4f}")
    
    if perte_val < meilleure_loss_val:
        meilleure_loss_val, compteur = perte_val, 0
        meilleurs_poids = modele.state_dict()
    else:
        compteur += 1
        if compteur >= patience:
            print(f"⏹️  Early Stopping à l'epoch {epoch+1}")
            break

modele.load_state_dict(meilleurs_poids)

# ─────────────────────────────────────────────
# 4. ÉVALUATION FINALE RIGOUREUSE SUR LE TEST (rappel Module 3, chapitre 3.6)
# ─────────────────────────────────────────────
from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay

modele.eval()
toutes_preds, tous_labels = [], []
with torch.no_grad():
    for images, labels in test_loader:
        preds = torch.argmax(modele(images), dim=1)
        toutes_preds.extend(preds.tolist())
        tous_labels.extend(labels.tolist())

print("\n" + classification_report(tous_labels, toutes_preds, target_names=noms_classes))

fig, axes = plt.subplots(1, 2, figsize=(15, 6))
axes[0].plot(historique["train"], label="Train")
axes[0].plot(historique["val"], label="Validation")
axes[0].set_title("Convergence de l'Entraînement"); axes[0].legend()

cm = confusion_matrix(tous_labels, toutes_preds)
ConfusionMatrixDisplay(cm, display_labels=noms_classes).plot(ax=axes[1], cmap="Blues", xticks_rotation=45)
axes[1].set_title("Matrice de Confusion — Test Final")
plt.tight_layout()
plt.savefig("synthese_module4.png", dpi=150, bbox_inches="tight")
plt.show()
```

| Étape du projet | Chapitre mobilisé |
|---|---|
| Division Train/Validation/Test | 4.1 (Tensors) + Module 3, 3.1 |
| `nn.Module`, forward pass | 4.2 |
| `BatchNorm2d`, `Dropout`, LR Scheduler, Early Stopping | 4.3 |
| `Conv2d`, `MaxPool2d`, architecture CNN | 4.4 |
| Boucle d'entraînement (`.backward()`, `.step()`) | 4.1 (Autograd) + 4.2 |
| `classification_report`, matrice de confusion | Module 3, 3.6 |

---

---

# ✅ QUIZ DE VALIDATION — MODULE 4

> Réponds sans regarder le cours. Objectif : 16/20 minimum avant de passer au Module 5.

**1.** Qu'est-ce qu'un Tensor, en lien avec les vecteurs et matrices du Module 2 ?
**2.** Que fait concrètement `loss.backward()` en PyTorch ?
**3.** Pourquoi ne peut-on pas empiler plusieurs couches linéaires sans fonction d'activation entre elles ?
**4.** Quelle fonction d'activation utiliser en sortie pour une classification à 5 classes ?
**5.** À quoi sert `optimiseur.zero_grad()`, et que se passerait-il si on l'oubliait ?
**6.** Quelle est l'intuition du Dropout ?
**7.** Pourquoi appelle-t-on `modele.eval()` avant l'évaluation, en lien avec Dropout et Batch Normalization ?
**8.** Pourquoi ne faut-il jamais initialiser tous les poids d'un réseau à zéro ?
**9.** Quel est le principal avantage d'une couche convolutive par rapport à une couche dense sur des images ?
**10.** Que fait le Max Pooling ?
**11.** Qu'est-ce que le Transfer Learning, en une phrase ?
**12.** Quelle est la différence entre Feature Extraction et Fine-Tuning ?
**13.** Pourquoi utilise-t-on un learning rate plus faible sur les couches pré-entraînées en Fine-Tuning ?
**14.** Pourquoi un RNN simple peine-t-il à apprendre des dépendances à très long terme ?
**15.** Quelles sont les trois portes d'un LSTM, et leur rôle général ?
**16.** Pourquoi les Transformers se parallélisent-ils mieux que les RNN ?
**17.** Quelle est la différence entre MSE et Cross-Entropy, et quand utilise-t-on chacune ?
**18.** Qu'apporte l'optimiseur Adam par rapport au SGD basique ?
**19.** Pourquoi normalise-t-on les images en Transfer Learning avec les statistiques d'ImageNet plutôt qu'avec les siennes propres ?
**20.** Quel est le rôle d'Early Stopping, et sur quelle courbe se base-t-il ?

---

### 📝 Corrigé

**1.** Un Tensor est la généralisation d'un vecteur (1D) et d'une matrice (2D) à n'importe quel nombre de dimensions — un scalaire est un Tensor 0D, une image couleur un Tensor 3D, un batch d'images un Tensor 4D.
**2.** Il déclenche le calcul automatique de tous les gradients de la perte par rapport à tous les paramètres du réseau (`requires_grad=True`), en appliquant automatiquement la règle de la chaîne à travers le graphe de calcul enregistré pendant le forward pass.
**3.** Parce que la composition de plusieurs transformations linéaires reste toujours mathématiquement équivalente à une seule transformation linéaire — sans non-linéarité, empiler des couches n'apporte aucune puissance de calcul supplémentaire.
**4.** Softmax, qui transforme les scores bruts en une distribution de probabilité sur les 5 classes, sommant à 1.
**5.** Il remet à zéro les gradients accumulés avant un nouveau calcul ; sans lui, les gradients des batchs précédents s'additionneraient à ceux du nouveau batch, faussant complètement l'entraînement.
**6.** Désactiver aléatoirement un pourcentage de neurones à chaque itération d'entraînement, pour forcer le réseau à développer des représentations redondantes et moins dépendantes de neurones spécifiques.
**7.** Parce que Dropout et Batch Normalization se comportent différemment en entraînement et en évaluation : Dropout doit être désactivé (utiliser tous les neurones) et Batch Normalization doit utiliser des statistiques globales stables plutôt que celles du batch courant, pour garantir des prédictions cohérentes.
**8.** Parce que tous les neurones d'une même couche calculeraient alors exactement la même chose et recevraient le même gradient, restant identiques entre eux pour toujours (problème de symétrie), gaspillant toute la capacité du réseau.
**9.** Le partage de poids (le même filtre est réutilisé sur toute l'image), qui réduit drastiquement le nombre de paramètres et exploite la structure spatiale de l'image, contrairement à une couche dense qui traiterait chaque pixel indépendamment.
**10.** Il réduit la taille spatiale d'une feature map en ne conservant que la valeur maximale de chaque petite zone, diminuant le nombre de calculs et apportant une légère robustesse aux variations de position.
**11.** Réutiliser un modèle déjà entraîné sur une grande quantité de données pour une nouvelle tâche, en s'appuyant sur les caractéristiques génériques qu'il a déjà apprises, plutôt que de repartir de zéro.
**12.** En Feature Extraction, on gèle toutes les couches pré-entraînées et on n'entraîne que la nouvelle couche finale ; en Fine-Tuning, on dégèle tout ou partie des couches pré-entraînées et on continue de les entraîner avec un learning rate très faible.
**13.** Pour ajuster finement les poids déjà bien optimisés sans les bouleverser — un learning rate trop élevé risquerait de détruire les caractéristiques utiles déjà apprises.
**14.** À cause du problème du gradient qui disparaît (ou explose) : la règle de la chaîne multiplie de nombreuses dérivées successives sur une longue séquence, ce qui rend le gradient quasiment nul (ou instable) pour les étapes les plus anciennes.
**15.** La porte d'oubli (décide quoi effacer de la mémoire), la porte d'entrée (décide quoi ajouter à la mémoire), et la porte de sortie (décide quoi communiquer à cette étape).
**16.** Parce qu'un Transformer calcule les relations entre tous les éléments d'une séquence simultanément (via l'attention), sans dépendance séquentielle stricte, contrairement à un RNN où chaque étape dépend directement du résultat de la précédente.
**17.** MSE mesure l'écart au carré entre une prédiction et une vraie valeur numérique, utilisée pour la régression ; Cross-Entropy mesure l'écart entre une distribution de probabilité prédite et la vraie classe, utilisée pour la classification.
**18.** Adam ajoute une inertie (moyenne des gradients récents pour lisser la trajectoire) et un learning rate adaptatif par paramètre, ce qui accélère généralement la convergence et réduit la sensibilité au choix initial du learning rate, par rapport au SGD basique à taux fixe.
**19.** Parce que le réseau pré-entraîné a appris ses poids en s'attendant à une distribution numérique d'entrée spécifique ; utiliser une normalisation différente perturberait le fonctionnement de toutes les couches pré-entraînées, calibrées pour cette distribution précise.
**20.** Il surveille la loss de validation, et arrête automatiquement l'entraînement dès qu'elle cesse de s'améliorer pendant un certain nombre d'epochs consécutifs, même si la loss d'entraînement continue de baisser — évitant ainsi le surapprentissage.

---

---

# 📊 RÉCAPITULATIF DU MODULE 4

## Ce que tu as maîtrisé

| Compétence | Notion clé | Niveau attendu |
|---|---|---|
| Manipuler des données multi-dimensionnelles | Tensors PyTorch | ⭐⭐⭐⭐☆ |
| Comprendre la différentiation automatique | Autograd | ⭐⭐⭐⭐⭐ |
| Construire un réseau de neurones | nn.Module, activations, forward pass | ⭐⭐⭐⭐⭐ |
| Entraîner un réseau correctement | Boucle d'entraînement, Adam | ⭐⭐⭐⭐⭐ |
| Éviter le surapprentissage en DL | Dropout, BatchNorm, Early Stopping | ⭐⭐⭐⭐☆ |
| Traiter des images | Convolution, Pooling, architecture CNN | ⭐⭐⭐⭐☆ |
| Réutiliser des modèles existants | Transfer Learning, Fine-Tuning | ⭐⭐⭐☆☆ |
| Comprendre les données séquentielles | RNN, LSTM, portes | ⭐⭐⭐☆☆ |

## Prochaine étape

**Module 5 — NLP & Large Language Models** : tu vas maintenant approfondir tout particulièrement le traitement du texte — la tokenisation, l'architecture Transformer (dont tu comprends déjà pourquoi elle a surpassé les RNN/LSTM), les embeddings, et le fine-tuning de vrais LLMs avec Hugging Face.

---

## ⚠️ ERREURS FRÉQUENTES DU MODULE 4

| Erreur | Conséquence | Solution |
|---|---|---|
| Oublier `optimiseur.zero_grad()` | Les gradients s'accumulent entre batchs, entraînement complètement faussé | Toujours l'appeler avant chaque nouveau `.backward()` |
| Oublier `modele.eval()` avant l'évaluation | Dropout reste actif, Batch Normalization utilise de mauvaises statistiques | Toujours basculer explicitement entre `train()` et `eval()` |
| Utiliser une couche dense directement sur une image sans convolution | Nombre de paramètres explosif, perte de la structure spatiale | Utiliser des couches `Conv2d` pour les données d'image |
| Fine-tuner avec le même learning rate partout | Risque de détruire les features pré-entraînées utiles | Utiliser un learning rate très faible sur les couches pré-entraînées |
| Ignorer la normalisation spécifique du modèle pré-entraîné | Performances dégradées, le réseau reçoit des données hors distribution | Toujours utiliser les statistiques de normalisation d'origine (ex: ImageNet) |
| Utiliser un RNN simple sur de très longues séquences | Gradient qui disparaît, dépendances à long terme non apprises | Préférer un LSTM/GRU, ou un Transformer (Module 5) |
| Réseau trop profond/large pour peu de données | Surapprentissage sévère | Ajouter Dropout, réduire la taille du réseau, ou envisager le Transfer Learning |

---

*Module 4 terminé ✅ — Durée totale : 8 semaines*  
*Formation IA Complète — Module suivant : Module 5 — NLP & Large Language Models*
