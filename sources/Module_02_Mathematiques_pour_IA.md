# 🎓 FORMATION IA — MODULE 2
# Mathématiques pour l'Intelligence Artificielle
### Version accessible — conçue pour les non-matheux

> **Professeur :** Dr. IA — Formation Complète  
> **Durée estimée :** 8 semaines (1–2h par jour)  
> **Niveau :** Aucun prérequis mathématique avancé  
> **Prérequis :** Module 1 (Python, NumPy)

---

## 🧭 AVANT DE COMMENCER — COMMENT LIRE CE MODULE

Je sais que le mot "mathématiques" peut faire peur. Beaucoup de gens qui réussissent très bien en IA n'étaient pas "bons en maths" à l'école — ils ont simplement appris ces notions **différemment**, avec du sens plutôt que par cœur.

**La méthode que je vais utiliser dans tout ce module :**

```
1. 🔑 INTUITION      → Je t'explique l'idée avec une image mentale simple, sans formule
2. 📐 FORMULE         → Je te montre la notation mathématique, décomposée symbole par symbole
3. 🧮 EXEMPLE À LA MAIN → Je calcule un exemple numérique complet, étape par étape
4. 💻 CODE PYTHON     → Je vérifie avec NumPy que le calcul est juste
5. 💡 POURQUOI EN IA  → Je relie explicitement la notion à un usage réel en IA
```

**Une règle d'or :** si un passage ne te semble pas clair, ce n'est presque jamais parce que "tu n'es pas fait pour les maths" — c'est que l'explication doit être reformulée. Relis l'exemple à la main avant de passer à la suite : c'est lui qui ancre la compréhension, pas la formule.

**Tu n'as pas besoin de savoir résoudre des équations complexes.** Tu as besoin de comprendre ce que représentent les objets mathématiques (vecteurs, dérivées, probabilités) et pourquoi l'IA les utilise. Le calcul, l'ordinateur le fait pour toi.

---

## 📋 PLAN DU MODULE 2

| Chapitre | Sujet | Durée estimée |
|---|---|---|
| **2.1** | Algèbre Linéaire — le langage des données | 3 semaines |
| **2.2** | Calcul Différentiel — comment un modèle apprend | 2 semaines |
| **2.3** | Probabilités & Statistiques — raisonner dans l'incertain | 2 semaines |
| **2.4** | Optimisation — trouver le meilleur modèle possible | 1 semaine |

---

## 🎯 OBJECTIFS DU MODULE

À la fin de ce module, tu seras capable de :

1. Comprendre ce qu'est un vecteur et une matrice, et pourquoi les données IA sont stockées ainsi
2. Effectuer et interpréter une multiplication matricielle à la main
3. Comprendre intuitivement ce qu'est une dérivée et un gradient
4. Expliquer avec tes propres mots comment un modèle "apprend" via la descente de gradient
5. Comprendre les probabilités de base et la loi normale
6. Expliquer pourquoi un LLM produit des probabilités plutôt que des réponses fixes
7. Comprendre le rôle du learning rate et des fonctions de coût

---

---

# 📘 CHAPITRE 2.1 — ALGÈBRE LINÉAIRE
## Le langage dans lequel "parlent" les données et les modèles

## Durée : 3 semaines

---

## 2.1.0 — Pourquoi apprendre l'algèbre linéaire ?

**🔑 Intuition**

Imagine que tu dois décrire une personne à quelqu'un qui ne l'a jamais vue. Tu pourrais dire : "elle mesure 1m70, pèse 65kg, a 28 ans". Tu viens de transformer une personne en une **liste de nombres** : `[1.70, 65, 28]`.

C'est exactement ce que fait l'IA. Une image, un mot, un son, un client de banque — tout est transformé en **liste de nombres**. L'algèbre linéaire est simplement la discipline mathématique qui étudie **comment manipuler des listes de nombres** (et des tableaux de listes de nombres) de façon cohérente.

Sans algèbre linéaire, il n'y a pas de réseau de neurones, pas de LLM, pas d'image générée. C'est la fondation absolue.

**💡 Pourquoi en IA**

- Une photo de 224×224 pixels en couleur = un tableau de **150 528 nombres**
- Un mot dans un LLM = un vecteur de **768 à 12 288 nombres** (selon le modèle)
- Les "poids" d'un réseau de neurones (ce qu'il a appris) = des millions ou milliards de nombres organisés en tableaux
- Chaque calcul qu'un modèle IA effectue pour produire une réponse = une succession de multiplications de ces tableaux de nombres

---

## 2.1.1 — Le Scalaire : le nombre tout seul

**🔑 Intuition**

Un **scalaire**, c'est juste un nombre seul, isolé. `5`, `3.14`, `-2` sont des scalaires. Rien de nouveau ici — c'est le nom mathématique qu'on donne à "un nombre" pour le distinguer des objets plus complexes qu'on va voir juste après.

**💡 Pourquoi en IA**

La température dans le prompting (`temperature=0.7`), le taux d'apprentissage (`learning_rate=0.001`), un seul poids dans un réseau — ce sont tous des scalaires.

---

## 2.1.2 — Le Vecteur : une liste ordonnée de nombres

**🔑 Intuition**

Reprends l'exemple de la personne : `[1.70, 65, 28]`. C'est un **vecteur** — une liste ordonnée de nombres où **l'ordre compte**. `[1.70, 65, 28]` (taille, poids, âge) n'est pas la même chose que `[65, 1.70, 28]` (poids, taille, âge) même si ce sont les mêmes trois nombres !

On peut aussi imaginer un vecteur comme une **flèche dans l'espace**. En 2D, le vecteur `[3, 2]` est une flèche qui part de l'origine (0,0) et va 3 pas à droite, 2 pas en haut.

```
        y
        │
      2 ┤        ● (3, 2)
        │      ╱
      1 ┤    ╱
        │  ╱
      0 ┼──────────── x
        0  1  2  3
```

**📐 Formule / Notation**

Un vecteur à *n* dimensions s'écrit :

```
v = [v₁, v₂, v₃, ..., vₙ]
```

- **v** (en gras ou avec une flèche : v⃗) = le nom du vecteur
- **n** = le nombre de dimensions (la longueur de la liste)
- **vᵢ** = la i-ème composante (le i-ème nombre de la liste)

**🧮 Exemple à la main**

Le vecteur `v = [4, 3]` représente un point à 4 pas horizontaux et 3 pas verticaux de l'origine.

**Calculer sa longueur (norme)** — c'est simplement le théorème de Pythagore que tu connais du collège :

```
||v|| = √(v₁² + v₂²) = √(4² + 3²) = √(16 + 9) = √25 = 5
```

Le vecteur `[4, 3]` a une longueur de **5**.

**💻 Code Python**

```python
import numpy as np

v = np.array([4, 3])
print("Vecteur:", v)
print("Longueur (norme):", np.linalg.norm(v))  # 5.0
```

**💡 Pourquoi en IA**

- Un **embedding** de mot (vu au Module 0) est un vecteur : le mot "chat" pourrait devenir `[0.2, -0.5, 0.8, ...]` (souvent 768 nombres ou plus)
- Une ligne de ton dataset Pandas (Module 1) est un vecteur : `[age, salaire, ancienneté]`
- La longueur d'un vecteur sert à mesurer "l'intensité" d'un signal

---

## 2.1.3 — Opérations sur les Vecteurs

### Addition et soustraction de vecteurs

**🔑 Intuition**

Additionner deux vecteurs, c'est enchaîner deux déplacements. Si tu marches selon la flèche `[3, 1]` puis selon la flèche `[1, 2]`, tu arrives au même endroit que si tu avais marché directement selon `[4, 3]`.

```
        y
      3 ┤              ● (4, 3)
        │           ╱
      2 ┤        ╱ [1,2]
        │     ╱
      1 ┤  ● (3,1)
        │╱  
      0 ┼──[3,1]────────── x
        0  1  2  3  4
```

**📐 Formule**

```
[a₁, a₂] + [b₁, b₂] = [a₁+b₁, a₂+b₂]
```

On additionne (ou soustrait) composante par composante — **jamais** en croisant les positions.

**🧮 Exemple à la main**

```
[3, 1] + [1, 2] = [3+1, 1+2] = [4, 3]
[5, 8] - [2, 3] = [5-2, 8-3] = [3, 5]
```

**💻 Code Python**

```python
a = np.array([3, 1])
b = np.array([1, 2])
print(a + b)  # [4 3]
print(a - b)  # [2 -1]
```

### Multiplication par un scalaire

**🔑 Intuition**

Multiplier un vecteur par un scalaire, c'est étirer ou raccourcir la flèche sans changer sa direction (sauf si le scalaire est négatif — la flèche s'inverse alors).

**🧮 Exemple à la main**

```
2 × [3, 1] = [6, 2]     → la flèche est deux fois plus longue, même direction
-1 × [3, 1] = [-3, -1]  → la flèche pointe dans la direction opposée
```

### Le Produit Scalaire (Dot Product) — LE plus important pour l'IA

**🔑 Intuition**

C'est l'opération vectorielle **la plus utilisée en IA**, alors prenons le temps de bien la comprendre.

Imagine que tu évalues à quel point deux personnes ont des goûts similaires. Chaque personne note 3 films sur 10 :

```
Alice : [8, 3, 9]   (note pour Film A, Film B, Film C)
Bob   : [7, 2, 8]
```

Le produit scalaire multiplie chaque paire de notes correspondantes, puis additionne le tout — cela donne **un seul nombre** qui résume "à quel point ces deux vecteurs vont dans la même direction".

**📐 Formule**

```
a · b = a₁×b₁ + a₂×b₂ + a₃×b₃ + ... + aₙ×bₙ
```

Le résultat est **toujours un scalaire** (un seul nombre), jamais un vecteur.

**🧮 Exemple à la main**

```
Alice · Bob = (8×7) + (3×2) + (9×8)
            = 56 + 6 + 72
            = 134
```

Ce chiffre 134 seul ne veut pas dire grand-chose — c'est en le comparant à d'autres produits scalaires (normalisés) qu'on obtient une vraie mesure de similarité (voir "similarité cosinus" plus bas).

**💻 Code Python**

```python
alice = np.array([8, 3, 9])
bob = np.array([7, 2, 8])

produit_scalaire = np.dot(alice, bob)
print(produit_scalaire)  # 134

# Autre notation, identique
print(alice @ bob)  # 134
```

**💡 Pourquoi en IA — LE concept clé**

Le produit scalaire est **partout** :
- Un neurone artificiel calcule un produit scalaire entre ses entrées et ses poids
- La **similarité cosinus**, utilisée pour comparer deux embeddings (donc pour la recherche sémantique et les systèmes RAG vus au Module 0), est un produit scalaire normalisé
- Le mécanisme d'**attention** des Transformers (qui a révolutionné l'IA) calcule des produits scalaires entre le "Query" et les "Key" pour savoir quels mots regarder

**🧮 Exemple à la main — Similarité Cosinus**

La similarité cosinus divise le produit scalaire par les longueurs des deux vecteurs, pour obtenir un score entre -1 (opposés) et 1 (identiques), indépendant de la longueur des vecteurs :

```
similarité_cosinus(a, b) = (a · b) / (||a|| × ||b||)
```

```python
def similarite_cosinus(a, b):
    produit = np.dot(a, b)
    norme_a = np.linalg.norm(a)
    norme_b = np.linalg.norm(b)
    return produit / (norme_a * norme_b)

chat = np.array([0.9, 0.1, 0.2])
felin = np.array([0.85, 0.15, 0.25])   # sens proche de "chat"
voiture = np.array([0.1, 0.9, 0.8])     # sens éloigné de "chat"

print(f"chat vs félin   : {similarite_cosinus(chat, felin):.3f}")   # proche de 1
print(f"chat vs voiture : {similarite_cosinus(chat, voiture):.3f}") # proche de 0 ou négatif
```

> **❌ Erreur courante :** confondre la multiplication élément par élément (`[1,2] * [3,4] = [3,8]`, qui donne un **vecteur**) avec le produit scalaire (`[1,2] · [3,4] = 11`, qui donne **un seul nombre**). Ce sont deux opérations différentes !

---

## 2.1.4 — La Matrice : un tableau de nombres

**🔑 Intuition**

Si un vecteur est **une seule ligne** de nombres, une matrice est **un tableau entier** — exactement comme une feuille Excel, avec des lignes et des colonnes.

```
        Film A  Film B  Film C
Alice [   8       3       9   ]
Bob   [   7       2       8   ]
Chloé [   5       9       4   ]
```

C'est une matrice à 3 lignes et 3 colonnes (on dit "3×3").

**📐 Formule / Notation**

Une matrice de *m* lignes et *n* colonnes se note :

```
        [ a₁₁  a₁₂  a₁₃ ]
A(m×n) = [ a₂₁  a₂₂  a₂₃ ]
        [ a₃₁  a₃₂  a₃₃ ]
```

- **aᵢⱼ** = l'élément à la ligne *i*, colonne *j*
- **La convention est toujours "lignes × colonnes"** — une matrice 3×2 a 3 lignes et 2 colonnes, pas l'inverse

**💻 Code Python**

```python
notes = np.array([
    [8, 3, 9],   # Alice
    [7, 2, 8],   # Bob
    [5, 9, 4]    # Chloé
])

print(notes.shape)     # (3, 3) → 3 lignes, 3 colonnes
print(notes[0])        # [8 3 9] → ligne d'Alice
print(notes[:, 0])     # [8 7 5] → colonne du Film A
print(notes[1, 2])     # 8 → note de Bob pour Film C
```

**💡 Pourquoi en IA**

- Un dataset entier (comme le Titanic vu au Module 1) est une matrice : chaque ligne = un exemple, chaque colonne = une caractéristique (feature)
- Une image en noir et blanc de 28×28 pixels est une matrice 28×28 où chaque nombre représente l'intensité de gris d'un pixel
- Les **poids** de chaque couche d'un réseau de neurones sont stockés dans une matrice

---

## 2.1.5 — La Multiplication Matricielle : LE calcul central de l'IA

C'est probablement **le concept le plus important** de ce chapitre. Prenons tout notre temps.

**🔑 Intuition — pourquoi multiplier des matrices ?**

Imagine une petite épicerie qui vend 2 produits (pommes, bananes) à 3 clients différents. Chaque client achète une certaine quantité :

```
              Pommes  Bananes
Client 1  [     3        2    ]
Client 2  [     1        4    ]
Client 3  [     5        0    ]
```

Les prix sont : Pomme = 2€, Banane = 1€, soit le vecteur `[2, 1]`.

**Question :** combien chaque client doit-il payer au total ?

Pour le Client 1 : `3 pommes × 2€ + 2 bananes × 1€ = 6 + 2 = 8€`

C'est exactement... un produit scalaire ! (la ligne du client, multipliée terme à terme avec le vecteur des prix, puis sommée)

**La multiplication matricielle, c'est simplement calculer ce produit scalaire pour CHAQUE ligne de la matrice, d'un coup.**

**📐 Formule**

Pour multiplier une matrice A (m×n) par une matrice B (n×p), le résultat C (m×p) a pour chaque élément :

```
C[i,j] = (ligne i de A) · (colonne j de B)
```

**Règle absolue à retenir :** le nombre de **colonnes** de A doit être égal au nombre de **lignes** de B. Sinon, la multiplication est impossible.

```
A(m × n)  ×  B(n × p)  =  C(m × p)
      └────┴────┘
    doivent être égaux
```

**🧮 Exemple à la main — Calcul complet, étape par étape**

Calculons `Clients × Prix` :

```
              Pommes  Bananes
Client 1  [     3        2    ]     [ 2 ]  ← Prix Pomme
Client 2  [     1        4    ]  ×  [ 1 ]  ← Prix Banane
Client 3  [     5        0    ]
```

C'est une matrice (3×2) multipliée par une matrice (2×1). Le résultat sera (3×1).

```
Total Client 1 = (3 × 2) + (2 × 1) = 6 + 2 = 8€
Total Client 2 = (1 × 2) + (4 × 1) = 2 + 4 = 6€
Total Client 3 = (5 × 2) + (0 × 1) = 10 + 0 = 10€
```

**Résultat :**
```
[ 8 ]
[ 6 ]
[ 10 ]
```

**Maintenant, un exemple matrice × matrice complet**, pour bien voir le mécanisme :

```
     [ 1  2 ]        [ 5  6 ]
A =  [ 3  4 ]    B = [ 7  8 ]
```

A est 2×2, B est 2×2 → le résultat sera 2×2.

```
C[0,0] = (ligne 0 de A) · (colonne 0 de B) = (1×5) + (2×7) = 5 + 14 = 19
C[0,1] = (ligne 0 de A) · (colonne 1 de B) = (1×6) + (2×8) = 6 + 16 = 22
C[1,0] = (ligne 1 de A) · (colonne 0 de B) = (3×5) + (4×7) = 15 + 28 = 43
C[1,1] = (ligne 1 de A) · (colonne 1 de B) = (3×6) + (4×8) = 18 + 32 = 50
```

**Résultat :**
```
     [ 19  22 ]
C =  [ 43  50 ]
```

> **🔑 Truc pour ne jamais se tromper :** pose ton doigt gauche sur une ligne de A, ton doigt droit sur une colonne de B, et parcours les deux en même temps en multipliant et additionnant. C'est TOUJOURS "ligne de A" rencontre "colonne de B".

**💻 Code Python — Vérifions notre calcul à la main**

```python
A = np.array([[1, 2],
              [3, 4]])
B = np.array([[5, 6],
              [7, 8]])

C = A @ B          # notation moderne recommandée
C2 = np.dot(A, B)  # notation alternative, identique

print(C)
# [[19 22]
#  [43 50]]
```

> **❌ Erreur courante n°1 :** `A @ B` n'est **PAS égal** à `B @ A` en général ! Contrairement à la multiplication de nombres classiques, l'ordre compte dans la multiplication matricielle.

> **❌ Erreur courante n°2 :** confondre `A @ B` (produit matriciel) avec `A * B` (multiplication élément par élément, appelée produit de Hadamard). Ce sont deux opérations totalement différentes en NumPy !

```python
print(A * B)   # Élément par élément : [[5, 12], [21, 32]]
print(A @ B)   # Produit matriciel   : [[19, 22], [43, 50]]
```

**💡 Pourquoi en IA — le calcul qui se répète des milliards de fois**

Chaque couche d'un réseau de neurones effectue exactement ce calcul :

```
sortie = X @ W + b
```

- **X** = les données d'entrée (une matrice : chaque ligne est un exemple)
- **W** = les poids appris par le réseau (une matrice)
- **b** = le biais (un vecteur ajouté à chaque ligne, via broadcasting — vu au Module 1)
- **sortie** = ce que la couche transmet à la couche suivante

Quand tu poses une question à un LLM, **des milliards** de ces multiplications matricielles s'enchaînent, couche après couche, jusqu'à produire la réponse. C'est littéralement le calcul qui fait tourner toute l'IA moderne — c'est pour cela que les GPU (excellents en calcul matriciel parallèle, vu au Module 0) sont indispensables.

---

## 2.1.6 — Transposée, Matrice Identité, Matrice Inverse

### La Transposée

**🔑 Intuition**

Transposer une matrice, c'est simplement **faire pivoter le tableau** : les lignes deviennent des colonnes, et les colonnes deviennent des lignes.

**🧮 Exemple à la main**

```
     [ 1  2  3 ]                [ 1  4 ]
A =  [ 4  5  6 ]      A^T  =    [ 2  5 ]
                                 [ 3  6 ]
```

A est 2×3, sa transposée A^T est 3×2.

**💻 Code Python**

```python
A = np.array([[1, 2, 3], [4, 5, 6]])
print(A.T)
# [[1 4]
#  [2 5]
#  [3 6]]
```

**💡 Pourquoi en IA**

On utilise très souvent la transposée pour que les dimensions "s'accordent" avant une multiplication matricielle (rappelle-toi la règle : colonnes de A = lignes de B).

### La Matrice Identité

**🔑 Intuition**

La matrice identité est l'équivalent matriciel du nombre **1**. Tout comme `5 × 1 = 5`, on a `A × I = A`. C'est une matrice carrée avec des 1 sur la diagonale et des 0 partout ailleurs.

```
    [ 1  0  0 ]
I = [ 0  1  0 ]
    [ 0  0  1 ]
```

```python
I = np.eye(3)
A = np.array([[2, 5, 1], [7, 3, 9], [4, 8, 6]])
print(A @ I)  # Résultat identique à A
```

### La Matrice Inverse

**🔑 Intuition**

L'inverse d'une matrice A, notée A⁻¹, est l'équivalent matriciel de "diviser par A". Tout comme `5 × (1/5) = 1`, on a `A × A⁻¹ = I` (la matrice identité).

**💡 Pourquoi en IA**

L'inverse sert à **résoudre des équations matricielles** — par exemple, pour retrouver directement la solution optimale d'une régression linéaire sans passer par un entraînement itératif (formule vue en Module 1, section régression linéaire from scratch).

> **⚠️ Attention :** toutes les matrices n'ont pas d'inverse (seules les matrices carrées et "non-dégénérées" en ont une). En pratique, tu n'auras presque jamais à calculer un inverse à la main — NumPy le fait :

```python
A = np.array([[4, 2], [2, 3]])
A_inv = np.linalg.inv(A)
print(A_inv)

# Vérification : A @ A_inv doit redonner (presque) la matrice identité
print(np.round(A @ A_inv, 5))  # [[1. 0.] [0. 1.]]
```

---

## 2.1.7 — Application Concrète : un Neurone Artificiel, Expliqué avec l'Algèbre Linéaire

Maintenant que tu maîtrises vecteurs, matrices et produit scalaire, tu peux comprendre **exactement** ce qui se passe dans un neurone artificiel.

**🔑 Intuition**

Un neurone reçoit plusieurs entrées (par exemple : âge, salaire, ancienneté d'un client), et calcule une seule sortie. Il fait ça en :
1. Multipliant chaque entrée par un "poids" (l'importance qu'il accorde à cette entrée)
2. Additionnant tout (+ un biais)
3. Appliquant une fonction pour "activer" ou non le neurone

**🧮 Exemple à la main**

```
Entrées (x)  : âge=35, salaire=45000, ancienneté=3
Poids (w)    : 0.01,   0.00002,       0.15
Biais (b)    : -0.5

Calcul = (35 × 0.01) + (45000 × 0.00002) + (3 × 0.15) + (-0.5)
       = 0.35 + 0.9 + 0.45 - 0.5
       = 1.20
```

Ce calcul, `(x · w) + b`, est **exactement** un produit scalaire suivi d'une addition — ce que tu as appris section 2.1.3 !

Ensuite, une fonction d'activation (comme la fonction sigmoïde) transforme ce 1.20 en une probabilité entre 0 et 1.

**💻 Code Python**

```python
x = np.array([35, 45000, 3])          # entrées du client
w = np.array([0.01, 0.00002, 0.15])   # poids appris par le modèle
b = -0.5                               # biais

z = np.dot(x, w) + b
print(f"Résultat avant activation: {z}")  # 1.2

# Fonction d'activation sigmoïde
def sigmoide(z):
    return 1 / (1 + np.exp(-z))

sortie = sigmoide(z)
print(f"Sortie du neurone (probabilité): {sortie:.4f}")  # ≈0.7685
```

**💡 Pourquoi en IA**

Un réseau de neurones entier, aussi complexe que GPT-4, n'est finalement qu'un **empilement massif** de ce calcul basique : produit scalaire + biais + activation, répété des milliards de fois en parallèle grâce aux matrices. Tu viens de comprendre la brique fondamentale de tout le Deep Learning.

---

## 2.1.8 — Valeurs Propres et Vecteurs Propres (notions essentielles, sans complexité inutile)

**🔑 Intuition**

C'est la notion la plus abstraite du chapitre — on va rester à un niveau intuitif, sans t'en donner plus que ce dont tu as besoin.

Imagine une matrice comme une **machine à transformer des flèches** (des vecteurs) : elle peut les faire tourner, les étirer, les compresser. Pour la plupart des flèches, la transformation change à la fois leur longueur ET leur direction.

Mais pour certaines flèches très spéciales, la matrice **ne change que leur longueur**, jamais leur direction — elle les étire ou les rétrécit, mais sans les faire pivoter. Ces flèches spéciales sont les **vecteurs propres**, et le facteur d'étirement associé est la **valeur propre**.

```
🔑 Vecteur propre  = une direction qui reste stable sous la transformation
🔑 Valeur propre   = le facteur d'étirement dans cette direction stable
```

**📐 Formule**

```
A × v = λ × v
```

- **A** = la matrice (la transformation)
- **v** = le vecteur propre
- **λ** (lambda) = la valeur propre associée

**💡 Pourquoi en IA**

Tu n'auras presque jamais à calculer ça à la main, mais comprendre le concept t'aide à saisir :
- **La PCA (Analyse en Composantes Principales)** : une technique de réduction de dimension qui trouve les "directions" (vecteurs propres) où les données varient le plus, pour compresser l'information en perdant le moins possible
- **La stabilité de l'entraînement** des réseaux de neurones profonds dépend en partie des valeurs propres des matrices de poids

```python
A = np.array([[4, 2], [1, 3]])
valeurs_propres, vecteurs_propres = np.linalg.eig(A)
print("Valeurs propres:", valeurs_propres)
print("Vecteurs propres:\n", vecteurs_propres)
```

> **En résumé pour cette section :** retiens juste l'idée — "certaines directions restent stables sous une transformation, et ça sert à trouver les axes les plus importants dans des données". Ne te bloque pas sur le calcul manuel.

---

## 🏋️ EXERCICES — CHAPITRE 2.1

### Exercice 2.1.A — Calcul à la main (fais-le sur papier avant de vérifier)

Soit `a = [2, 5]` et `b = [1, -3]`.

1. Calcule `a + b`
2. Calcule `3 × a`
3. Calcule le produit scalaire `a · b`
4. Calcule la norme de `a` (arrondis à 2 décimales)

<details>
<summary>👉 Solution (clique pour révéler)</summary>

```
1. a + b = [2+1, 5+(-3)] = [3, 2]
2. 3 × a = [6, 15]
3. a · b = (2×1) + (5×-3) = 2 - 15 = -13
4. ||a|| = √(2² + 5²) = √(4+25) = √29 ≈ 5.39
```

```python
a = np.array([2, 5])
b = np.array([1, -3])
print(a + b)                    # [3 2]
print(3 * a)                    # [6 15]
print(np.dot(a, b))             # -13
print(round(np.linalg.norm(a), 2))  # 5.39
```
</details>

### Exercice 2.1.B — Multiplication matricielle à la main

```
     [ 2  0 ]        [ 1  4 ]
A =  [ 1  3 ]    B = [ 2  1 ]
```

Calcule `A @ B` entièrement à la main, puis vérifie avec NumPy.

<details>
<summary>👉 Solution</summary>

```
C[0,0] = (2×1)+(0×2) = 2
C[0,1] = (2×4)+(0×1) = 8
C[1,0] = (1×1)+(3×2) = 7
C[1,1] = (1×4)+(3×1) = 7

     [ 2  8 ]
C =  [ 7  7 ]
```

```python
A = np.array([[2, 0], [1, 3]])
B = np.array([[1, 4], [2, 1]])
print(A @ B)  # [[2 8] [7 7]]
```
</details>

### Exercice 2.1.C — Application IA : similarité entre embeddings

Trois mots ont été transformés en embeddings (vecteurs) simplifiés à 3 dimensions :

```
roi    = [0.9, 0.8, 0.1]
reine  = [0.85, 0.75, 0.15]
banane = [0.05, 0.1, 0.9]
```

Calcule la similarité cosinus entre "roi" et "reine", puis entre "roi" et "banane". Le résultat confirme-t-il l'intuition ?

<details>
<summary>👉 Solution</summary>

```python
def similarite_cosinus(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

roi = np.array([0.9, 0.8, 0.1])
reine = np.array([0.85, 0.75, 0.15])
banane = np.array([0.05, 0.1, 0.9])

print(f"roi vs reine  : {similarite_cosinus(roi, reine):.4f}")   # ≈0.997 → très proche
print(f"roi vs banane : {similarite_cosinus(roi, banane):.4f}")  # ≈0.28  → éloigné
```

Oui : "roi" et "reine" ont une similarité proche de 1 (concepts proches), tandis que "roi" et "banane" sont beaucoup plus éloignés — exactement ce qu'on attend d'un bon espace d'embeddings.
</details>

---

---

# 📘 CHAPITRE 2.2 — CALCUL DIFFÉRENTIEL
## Comment un modèle sait dans quelle direction s'améliorer

## Durée : 2 semaines

---

## 2.2.0 — Pourquoi le calcul différentiel ?

**🔑 Intuition**

Rappelle-toi le Module 0 : un modèle apprend en **ajustant ses paramètres pour réduire son erreur**. Mais comment sait-il dans quelle direction ajuster chaque paramètre ? C'est exactement le rôle de la **dérivée** : elle indique, à un instant donné, **dans quelle direction et à quelle vitesse une quantité change**.

Le calcul différentiel n'est pas une discipline abstraite ici — c'est littéralement le **GPS** qui guide un modèle IA vers de meilleures performances.

---

## 2.2.1 — Qu'est-ce qu'une fonction ? (rappel simple)

**🔑 Intuition**

Une fonction est une machine : tu lui donnes une entrée, elle te donne une sortie, toujours selon la même règle.

```
f(x) = x²

f(2) = 4
f(3) = 9
f(5) = 25
```

En IA, une fonction typique pourrait être : "la perte (erreur) du modèle, en fonction de la valeur d'un poids". Plus le poids est mal réglé, plus l'erreur (la sortie de la fonction) est grande.

---

## 2.2.2 — La Dérivée = la Pente Locale

**🔑 Intuition — l'exemple de la voiture**

Imagine que tu conduis une voiture. Ta **position** change au fil du temps. Ta **vitesse**, c'est justement la rapidité à laquelle ta position change à un instant donné.

La dérivée, c'est exactement ça, mais généralisée à n'importe quelle fonction : **la dérivée mesure la rapidité de changement d'une fonction, à un point donné**.

Visuellement, si tu traces le graphe d'une fonction, la dérivée en un point est **la pente de la ligne tangente** à la courbe en ce point :

```
     f(x)
      │           ╱  ← tangente très pentue = dérivée grande
      │        ╱
      │     ╱
      │  ╱  ← tangente presque plate = dérivée proche de 0
      │╱________________ x
```

- Dérivée **positive** → la fonction monte (si x augmente, f(x) augmente)
- Dérivée **négative** → la fonction descend
- Dérivée **nulle (= 0)** → la fonction est à un point plat : un minimum, un maximum, ou un palier

**📐 Formule (juste pour la culture — tu n'auras pas besoin de la manier à la main souvent)**

```
f'(x) = lim (h→0) [f(x+h) - f(x)] / h
```

Ne panique pas devant cette formule : elle dit juste "regarde de combien f(x) change quand x change d'un tout petit peu, et divise par ce petit changement". C'est la définition formelle de "la pente locale".

**🧮 Exemple à la main — la fonction la plus simple : f(x) = x²**

Il existe des règles pour calculer les dérivées sans repasser par la définition à chaque fois (section suivante). Pour `f(x) = x²`, la règle donne :

```
f'(x) = 2x
```

Donc :
```
En x=1 : f'(1) = 2×1 = 2   → la courbe monte avec une pente de 2
En x=3 : f'(3) = 2×3 = 6   → la courbe monte plus fort, pente de 6
En x=0 : f'(0) = 2×0 = 0   → la courbe est plate (c'est le minimum de x²)
En x=-2: f'(-2) = 2×-2 = -4 → la courbe descend (pente négative)
```

Cela colle parfaitement à l'intuition : `x²` a son minimum en `x=0` (la courbe forme un "U" appelé parabole), donc la pente est nulle exactement à ce point, négative avant, positive après.

**💻 Code Python — visualiser la dérivée**

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-4, 4, 100)
f = x**2
f_prime = 2*x  # dérivée de x²

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

axes[0].plot(x, f, color="steelblue")
axes[0].scatter([1, -2], [1, 4], color="red", zorder=5)
axes[0].set_title("f(x) = x²")
axes[0].grid(alpha=0.3)

axes[1].plot(x, f_prime, color="tomato")
axes[1].axhline(0, color="gray", linestyle="--")
axes[1].scatter([1, -2], [2, -4], color="red", zorder=5)
axes[1].set_title("f'(x) = 2x (la dérivée)")
axes[1].grid(alpha=0.3)

plt.tight_layout()
plt.show()
```

**💡 Pourquoi en IA**

Si `f(x)` représente l'erreur du modèle en fonction d'un paramètre `x`, alors `f'(x)` (la dérivée) indique **dans quelle direction ajuster x pour réduire l'erreur**. C'est le cœur de tout entraînement de modèle IA.

---

## 2.2.3 — Les Règles de Dérivation de Base

Tu n'as pas besoin de mémoriser des dizaines de règles. Voici les seules qui reviennent constamment en IA :

| Fonction f(x) | Dérivée f'(x) | Exemple |
|---|---|---|
| Constante : `c` | `0` | dérivée de `5` = `0` |
| `x` | `1` | la pente de la droite y=x est constante = 1 |
| `x^n` | `n × x^(n-1)` | dérivée de `x³` = `3x²` |
| `c × f(x)` | `c × f'(x)` | dérivée de `5x²` = `5 × 2x` = `10x` |
| `f(x) + g(x)` | `f'(x) + g'(x)` | on dérive chaque terme séparément |
| `e^x` | `e^x` | seule fonction égale à sa propre dérivée ! |
| `ln(x)` | `1/x` | logarithme naturel |

**🧮 Exemples à la main**

```
f(x) = 3x² + 2x + 5
f'(x) = 3×(2x) + 2×(1) + 0
      = 6x + 2

f(x) = x³ - 4x
f'(x) = 3x² - 4
```

**💻 Vérification avec Python (calcul symbolique)**

```python
import sympy as sp

x = sp.Symbol('x')
f = 3*x**2 + 2*x + 5
f_prime = sp.diff(f, x)
print(f_prime)  # 6*x + 2
```

---

## 2.2.4 — Dérivées Partielles : quand il y a plusieurs variables

**🔑 Intuition — l'analogie de la montagne**

Imagine que tu es sur une colline, et que ton altitude dépend de deux coordonnées : ta position Nord-Sud (x) et ta position Est-Ouest (y). Ton altitude est donc une fonction de DEUX variables : `f(x, y)`.

Si tu veux savoir "à quelle vitesse je monte si j'avance vers le Nord SANS bouger vers l'Est", tu calcules la **dérivée partielle par rapport à x** : tu traites y comme une constante fixe, et tu dérives seulement par rapport à x.

**📐 Notation**

```
∂f/∂x   → dérivée partielle de f par rapport à x (y reste fixe)
∂f/∂y   → dérivée partielle de f par rapport à y (x reste fixe)
```

Le symbole **∂** (appelé "d rond") remplace juste le "d" habituel pour indiquer "il y a d'autres variables, mais je n'en fais varier qu'une seule à la fois".

**🧮 Exemple à la main**

```
f(x, y) = x² + 3xy + y²

Pour ∂f/∂x : on traite y comme une constante
∂f/∂x = 2x + 3y     (le terme y² disparaît car sa dérivée par rapport à x est 0)

Pour ∂f/∂y : on traite x comme une constante
∂f/∂y = 3x + 2y     (le terme x² disparaît car sa dérivée par rapport à y est 0)
```

**Calcul numérique au point (x=2, y=1) :**
```
∂f/∂x = 2(2) + 3(1) = 4 + 3 = 7
∂f/∂y = 3(2) + 2(1) = 6 + 2 = 8
```

**💡 Pourquoi en IA**

Un modèle IA n'a pas 2 paramètres, mais des **millions ou des milliards**. Pour chacun, on calcule sa dérivée partielle : "si je bouge CE paramètre précis, et seulement lui, comment l'erreur change-t-elle ?". C'est en répétant cette question pour chaque paramètre qu'on sait comment ajuster le modèle entier.

---

## 2.2.5 — Le Gradient : la boussole vers la meilleure direction

**🔑 Intuition**

Reprends l'analogie de la montagne. Le **gradient**, c'est simplement le rassemblement de TOUTES les dérivées partielles dans un seul vecteur. Ce vecteur pointe **dans la direction où la fonction augmente le plus rapidement**.

```
🔑 Le gradient = une flèche qui pointe "vers le haut de la colline le plus raide"
```

En IA, on ne veut pas monter mais **descendre** (minimiser l'erreur) — on va donc systématiquement avancer dans la direction **opposée** au gradient. C'est tout le principe de la "descente de gradient" qu'on approfondit au Chapitre 2.4.

**📐 Formule**

Pour une fonction à deux variables `f(x, y)`, le gradient est le vecteur :

```
∇f(x, y) = [∂f/∂x, ∂f/∂y]
```

Le symbole **∇** (nabla) désigne le gradient.

**🧮 Exemple à la main**

Reprenons `f(x, y) = x² + 3xy + y²` au point `(2, 1)` calculé plus haut :

```
∇f(2, 1) = [7, 8]
```

Ce vecteur `[7, 8]` indique : "pour monter le plus vite possible depuis le point (2,1), avance principalement dans la direction y (composante 8, la plus grande), un peu moins dans la direction x (composante 7)".

**💻 Code Python**

```python
import numpy as np

def f(x, y):
    return x**2 + 3*x*y + y**2

def gradient_numerique(f, x, y, h=1e-5):
    """Calcule le gradient par différences finies (approximation numérique)."""
    df_dx = (f(x+h, y) - f(x-h, y)) / (2*h)
    df_dy = (f(x, y+h) - f(x, y-h)) / (2*h)
    return np.array([df_dx, df_dy])

grad = gradient_numerique(f, 2, 1)
print(f"Gradient en (2,1): {grad}")  # ≈ [7, 8]
```

**💡 Pourquoi en IA**

Le gradient est LE concept qui donne son nom à la "descente de gradient" (gradient descent), l'algorithme d'entraînement utilisé par pratiquement tous les modèles IA. Retiens bien : **le gradient pointe vers le pire endroit possible (la montée la plus raide) ; le modèle avance donc toujours dans la direction opposée au gradient.**

---

## 2.2.6 — La Règle de la Chaîne : le secret de la rétropropagation

**🔑 Intuition — l'analogie des engrenages**

Imagine trois engrenages connectés : quand le premier tourne, il fait tourner le deuxième, qui fait tourner le troisième. Si tu veux savoir "de combien tourne le troisième engrenage quand je tourne le premier d'un cran", tu dois multiplier les effets en chaîne : effet du 1er sur le 2e, multiplié par l'effet du 2e sur le 3e.

C'est exactement la **règle de la chaîne** : si une fonction dépend d'une autre fonction, qui dépend elle-même d'une autre variable, on calcule la dérivée totale en **multipliant les dérivées de chaque maillon de la chaîne**.

**📐 Formule**

Si `y = f(u)` et `u = g(x)` (donc `y` dépend de `x` via `u`) :

```
dy/dx = dy/du × du/dx
```

**🧮 Exemple à la main**

```
Soit y = (3x + 1)²

On pose u = 3x + 1, donc y = u²

dy/du = 2u          (dérivée de u² par rapport à u)
du/dx = 3            (dérivée de 3x+1 par rapport à x)

dy/dx = dy/du × du/dx = 2u × 3 = 6u = 6(3x+1) = 18x + 6
```

**Vérification numérique en x=1 :**
```
y = (3×1+1)² = 4² = 16
dy/dx en x=1 = 18×1 + 6 = 24
```

```python
import sympy as sp
x = sp.Symbol('x')
y = (3*x + 1)**2
dy_dx = sp.diff(y, x)
print(sp.expand(dy_dx))  # 18*x + 6
```

**💡 Pourquoi en IA — LE mécanisme de la rétropropagation**

Un réseau de neurones est **une chaîne de fonctions empilées** : la sortie de la couche 1 devient l'entrée de la couche 2, qui devient l'entrée de la couche 3, etc. Quand on veut savoir "comment ajuster un poids tout au début du réseau pour réduire l'erreur finale", on doit littéralement **remonter la chaîne**, couche par couche, en multipliant les dérivées à chaque étape.

C'est exactement ce que fait l'algorithme de **rétropropagation** (backpropagation, vu au Module 0) : il applique la règle de la chaîne, couche après couche, en partant de la sortie du réseau et en remontant vers l'entrée, pour calculer la contribution de chaque poids à l'erreur finale. Sans la règle de la chaîne, il serait impossible d'entraîner un réseau de neurones à plusieurs couches.

```
Erreur finale
     ↑ (règle de la chaîne)
Couche de sortie
     ↑ (règle de la chaîne)
Couche cachée 2
     ↑ (règle de la chaîne)
Couche cachée 1
     ↑ (règle de la chaîne)
Entrée
```

> **En résumé pour cette section :** la règle de la chaîne permet de "propager" l'information d'erreur à travers toutes les couches d'un réseau, une par une, en multipliant les pentes locales. C'est ce petit mécanisme mathématique, répété des milliards de fois, qui permet à un modèle comme GPT-4 d'apprendre.

---

## 🏋️ EXERCICES — CHAPITRE 2.2

### Exercice 2.2.A — Dérivées de base

Calcule les dérivées des fonctions suivantes :

1. `f(x) = 5x³ + 2x - 7`
2. `f(x) = x⁴ - 3x²`
3. `f(x, y) = 2x²y + y³` → calcule `∂f/∂x` et `∂f/∂y`

<details>
<summary>👉 Solution</summary>

```
1. f'(x) = 15x² + 2
2. f'(x) = 4x³ - 6x
3. ∂f/∂x = 4xy       (y traité comme constante)
   ∂f/∂y = 2x² + 3y²  (x traité comme constante)
```
</details>

### Exercice 2.2.B — Calcul du gradient et interprétation

Pour `f(x, y) = x² + y²` (un "bol" parfaitement symétrique dont le minimum est en (0,0)), calcule le gradient aux points `(3, 4)`, `(1, 1)`, et `(0, 0)`. Que remarques-tu au point (0,0) ?

<details>
<summary>👉 Solution</summary>

```
∇f(x,y) = [2x, 2y]

∇f(3,4) = [6, 8]   → grande pente, loin du minimum
∇f(1,1) = [2, 2]   → pente modérée
∇f(0,0) = [0, 0]   → gradient NUL → on est exactement au minimum !
```

C'est exactement le comportement attendu : à mesure qu'on se rapproche du minimum d'une fonction, la norme du gradient diminue, jusqu'à devenir nulle exactement au minimum. C'est ainsi qu'un algorithme d'entraînement "sait" qu'il est arrivé (ou presque) à un bon point.
</details>

---

---

# 📘 CHAPITRE 2.3 — PROBABILITÉS & STATISTIQUES
## Raisonner quand on n'est sûr de rien

## Durée : 2 semaines

---

## 2.3.0 — Pourquoi les probabilités en IA ?

**🔑 Intuition**

L'IA vit dans un monde d'incertitude. Un modèle ne "sait" jamais avec une certitude absolue qu'une image contient un chat — il estime une **probabilité** ("95% de chances que ce soit un chat"). Un LLM ne "sait" pas avec certitude quel sera le mot suivant — il calcule une **distribution de probabilités** sur tout son vocabulaire, et choisit (ou tire au sort) selon ces probabilités.

Comprendre les probabilités, c'est comprendre **le langage natif dans lequel un modèle IA "pense"**.

---

## 2.3.1 — Qu'est-ce qu'une Probabilité ?

**🔑 Intuition**

Une probabilité est un nombre entre **0 et 1** (ou entre 0% et 100%) qui mesure à quel point un événement est susceptible de se produire.

```
0    = impossible (ne se produira jamais)
0.5  = 50% de chance (aussi probable que pas)
1    = certain (se produira toujours)
```

**Exemple simple : une pièce de monnaie**

```
P(pile) = 0.5   (50% de chances)
P(face) = 0.5   (50% de chances)
P(pile) + P(face) = 1   (la somme de toutes les possibilités = 1, toujours)
```

**Exemple simple : un dé à 6 faces**

```
P(obtenir un 4) = 1/6 ≈ 0.167
P(obtenir un nombre pair) = P(2) + P(4) + P(6) = 3/6 = 0.5
```

> **🔑 Règle fondamentale à retenir :** la somme des probabilités de TOUS les résultats possibles fait toujours exactement **1** (ou 100%).

**💡 Pourquoi en IA**

Quand un modèle de classification d'images dit "Chat: 87%, Chien: 10%, Oiseau: 3%", ces trois nombres somment à 100% — c'est exactement la fonction **softmax** vue au Module 1 (section NumPy) qui garantit cette propriété.

---

## 2.3.2 — Variables Aléatoires et Distributions

**🔑 Intuition**

Une **variable aléatoire** est simplement un résultat qu'on ne connaît pas à l'avance, mais dont on peut décrire les valeurs possibles et leurs probabilités. Le résultat d'un lancer de dé est une variable aléatoire.

Une **distribution de probabilité** est la "carte complète" de toutes les valeurs possibles et de leur probabilité associée. Pour un dé équilibré :

```
Valeur:       1     2     3     4     5     6
Probabilité: 1/6   1/6   1/6   1/6   1/6   1/6
```

On peut visualiser ça comme un histogramme :

```
P
│ ▓▓  ▓▓  ▓▓  ▓▓  ▓▓  ▓▓
│ ▓▓  ▓▓  ▓▓  ▓▓  ▓▓  ▓▓
└──1───2───3───4───5───6──→ valeur
```

**💡 Pourquoi en IA**

Quand un LLM génère du texte, à chaque étape il produit une distribution de probabilité sur TOUT son vocabulaire (souvent 50 000 à 200 000 tokens possibles). Le "prochain mot" est une variable aléatoire, et le modèle décrit sa distribution complète.

```python
# Simulation simplifiée d'une distribution de probabilité sur le prochain mot
vocabulaire = ["chat", "chien", "voiture", "maison", "soleil"]
probabilites = [0.45, 0.30, 0.10, 0.10, 0.05]

print(sum(probabilites))  # 1.0 → toujours !

import numpy as np
mot_choisi = np.random.choice(vocabulaire, p=probabilites)
print(f"Mot généré: {mot_choisi}")
```

---

## 2.3.3 — La Loi Normale (la fameuse "courbe en cloche")

**🔑 Intuition**

La loi normale (aussi appelée gaussienne) est **la distribution la plus fréquente dans la nature et en IA**. Elle décrit des phénomènes où la plupart des valeurs se regroupent autour d'une moyenne, avec de moins en moins de valeurs à mesure qu'on s'en éloigne.

**Exemple concret :** la taille des adultes. La plupart des gens mesurent autour de 1m70, très peu mesurent 1m40 ou 2m10 — et la distribution est symétrique autour de la moyenne.

```
        Fréquence
            │      ___
            │    ╱     ╲
            │  ╱         ╲
            │╱             ╲
            └────────┬────────── Taille
                   moyenne
```

**📐 Formule (juste pour la reconnaître, pas pour la mémoriser)**

Une loi normale est entièrement caractérisée par 2 paramètres :
- **μ** (mu) = la moyenne (le centre de la cloche)
- **σ** (sigma) = l'écart-type (la largeur de la cloche — voir section suivante)

**💻 Code Python**

```python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
tailles = np.random.normal(loc=170, scale=8, size=10000)  # moyenne=170cm, écart-type=8cm

plt.figure(figsize=(9, 5))
plt.hist(tailles, bins=50, color="steelblue", edgecolor="white", density=True)
plt.axvline(170, color="red", linestyle="--", label="Moyenne (170cm)")
plt.title("Distribution de la Taille — Loi Normale")
plt.xlabel("Taille (cm)")
plt.ylabel("Densité")
plt.legend()
plt.show()
```

**💡 Pourquoi en IA**

- On initialise souvent les poids d'un réseau de neurones en tirant des valeurs aléatoires selon une loi normale (`np.random.randn` vu au Module 1)
- Le bruit ajouté dans les modèles de diffusion (génération d'images, vu au Module 0) suit une loi normale
- Beaucoup de méthodes statistiques utilisées pour évaluer et comparer des modèles supposent que les erreurs suivent (approximativement) une loi normale

---

## 2.3.4 — Espérance, Variance, Écart-type : décrire une distribution avec 2 nombres

**🔑 Intuition**

Si on te donne des centaines de valeurs, comment les résumer simplement ? Avec deux nombres :
- **La moyenne** (espérance) : où est "le centre" des données ?
- **L'écart-type** : à quel point les données sont-elles dispersées autour de ce centre ?

**Exemple concret — deux classes d'élèves avec la même moyenne**

```
Classe A : 78, 80, 79, 81, 82   → moyenne = 80, très regroupé
Classe B : 40, 95, 100, 60, 105 → moyenne = 80, TRÈS dispersé
```

Les deux classes ont la même moyenne (80), mais des situations complètement différentes. L'écart-type capture cette différence.

**📐 Formules**

```
Moyenne (μ)      = (somme de toutes les valeurs) / (nombre de valeurs)

Variance (σ²)    = moyenne des (écarts à la moyenne)²

Écart-type (σ)   = √(variance)
```

**🧮 Exemple à la main — Classe A**

```
Valeurs : 78, 80, 79, 81, 82
Moyenne = (78+80+79+81+82) / 5 = 400/5 = 80

Écarts à la moyenne : -2, 0, -1, 1, 2
Écarts au carré     :  4, 0,  1, 1, 4

Variance = (4+0+1+1+4) / 5 = 10/5 = 2
Écart-type = √2 ≈ 1.41
```

**🧮 Exemple à la main — Classe B**

```
Valeurs : 40, 95, 100, 60, 105
Moyenne = (40+95+100+60+105) / 5 = 400/5 = 80

Écarts à la moyenne : -40, 15, 20, -20, 25
Écarts au carré     : 1600, 225, 400, 400, 625

Variance = (1600+225+400+400+625) / 5 = 3250/5 = 650
Écart-type = √650 ≈ 25.5
```

Un écart-type de 1.41 (Classe A) contre 25.5 (Classe B) confirme numériquement ce qu'on voyait intuitivement : la Classe B est beaucoup plus dispersée.

**💻 Code Python**

```python
classe_a = np.array([78, 80, 79, 81, 82])
classe_b = np.array([40, 95, 100, 60, 105])

print(f"Classe A - Moyenne: {classe_a.mean()}, Écart-type: {classe_a.std():.2f}")
print(f"Classe B - Moyenne: {classe_b.mean()}, Écart-type: {classe_b.std():.2f}")
```

**💡 Pourquoi en IA**

- La **normalisation des données** (StandardScaler, vue au Module 1) soustrait la moyenne et divise par l'écart-type — c'est directement l'application de ces deux formules
- Comparer les performances de deux modèles nécessite de regarder pas seulement leur score moyen, mais aussi la variance de ce score (un modèle "stable" a une faible variance entre différents essais)

---

## 2.3.5 — Probabilité Conditionnelle et Théorème de Bayes

**🔑 Intuition — l'analogie du test médical**

C'est l'une des notions les plus utiles et les plus mal comprises en général — prenons un exemple concret.

Imagine un test de dépistage pour une maladie rare (1 personne sur 1000 en est atteinte). Le test est fiable à 95% (il détecte correctement 95% des malades, et se trompe sur seulement 5% des personnes saines en les déclarant "positives" à tort).

**Question piège :** si ton test est positif, quelle est la probabilité que tu sois réellement malade ?

**La plupart des gens répondent "95%". C'est faux !**

**🔑 Intuition de la bonne réponse**

Le théorème de Bayes nous dit qu'il faut aussi tenir compte de **combien de personnes sont malades au départ** (la rareté de la maladie). Comme la maladie est très rare, même avec un test fiable, la plupart des résultats positifs viennent en réalité des nombreuses personnes saines mal diagnostiquées (les "faux positifs"), simplement parce qu'elles sont bien plus nombreuses au départ.

**📐 Formule**

```
P(A|B) = [P(B|A) × P(A)] / P(B)
```

- **P(A|B)** = probabilité de A sachant que B est vrai ("probabilité a posteriori")
- **P(B|A)** = probabilité de B sachant que A est vrai
- **P(A)** = probabilité de A "à priori" (avant toute observation)
- **P(B)** = probabilité totale de B

**🧮 Exemple à la main — résolvons le test médical**

```
P(Malade) = 0.001  (1 sur 1000)
P(Sain) = 0.999

P(Test+ | Malade) = 0.95   (le test détecte 95% des vrais malades)
P(Test+ | Sain) = 0.05     (5% de faux positifs chez les sains)

On veut : P(Malade | Test+)

D'abord, calculons P(Test+) — la probabilité totale d'être testé positif,
qu'on soit malade ou sain :

P(Test+) = P(Test+|Malade)×P(Malade) + P(Test+|Sain)×P(Sain)
         = (0.95 × 0.001) + (0.05 × 0.999)
         = 0.00095 + 0.04995
         = 0.0509

Maintenant, Bayes :
P(Malade | Test+) = [P(Test+|Malade) × P(Malade)] / P(Test+)
                   = (0.95 × 0.001) / 0.0509
                   = 0.00095 / 0.0509
                   ≈ 0.0187
```

**Résultat : seulement 1.87% de chances d'être réellement malade, même avec un test positif !**

C'est très contre-intuitif, mais mathématiquement certain : comme la maladie est rare, il y a énormément plus de personnes saines que de malades, donc même un petit taux d'erreur (5%) sur cette immense population saine génère plus de faux positifs que de vrais positifs issus de la petite population malade.

```python
p_malade = 0.001
p_sain = 1 - p_malade
p_test_pos_si_malade = 0.95
p_test_pos_si_sain = 0.05

p_test_pos = (p_test_pos_si_malade * p_malade) + (p_test_pos_si_sain * p_sain)
p_malade_si_test_pos = (p_test_pos_si_malade * p_malade) / p_test_pos

print(f"P(Test positif) = {p_test_pos:.4f}")
print(f"P(Malade | Test positif) = {p_malade_si_test_pos:.4f}")  # ≈0.0187
```

**💡 Pourquoi en IA**

- Le théorème de Bayes est la fondation des **classificateurs bayésiens naïfs**, utilisés notamment pour la détection de spam
- Il explique pourquoi il faut être très prudent en interprétant les résultats d'un modèle sur des événements rares (fraude bancaire, maladies rares, défauts industriels) : même un excellent modèle peut générer beaucoup de faux positifs si l'événement recherché est rare
- Il sous-tend une grande partie du raisonnement statistique utilisé pour évaluer la fiabilité des systèmes IA

> **En résumé pour cette section :** avant de faire confiance à "95% de fiabilité", demande-toi toujours : "et quelle est la fréquence de base de ce que je cherche à détecter ?"

---

## 2.3.6 — Lien Direct avec les LLMs : la Distribution de Probabilité sur le Prochain Token

**🔑 Intuition**

Reprenons ce qui a été dit au Module 0. Un LLM ne "choisit" pas directement le mot suivant — il calcule d'abord une distribution de probabilité complète sur l'ensemble de son vocabulaire (généralement des dizaines de milliers de tokens), puis un mécanisme de sélection choisit le token final.

**🧮 Exemple simplifié**

```
Prompt : "Le chat mange la ___"

Distribution de probabilité calculée par le modèle (extrait) :
souris    : 0.35
nourriture: 0.28
pâtée     : 0.15
viande    : 0.10
chaise    : 0.02
lune      : 0.001
...
```

Le paramètre `temperature` (vu au Module 0 et 6) **modifie cette distribution avant la sélection** :
- Température basse (proche de 0) → la distribution devient très "pointue", le modèle choisit presque toujours le mot le plus probable → réponses déterministes et répétitives
- Température haute (proche de 1 ou plus) → la distribution s'aplatit, des mots moins probables ont plus de chances d'être choisis → réponses plus créatives mais aussi plus risquées (hallucinations)

```python
import numpy as np

def softmax_avec_temperature(logits, temperature=1.0):
    logits = np.array(logits) / temperature
    exp_logits = np.exp(logits - np.max(logits))  # stabilité numérique
    return exp_logits / exp_logits.sum()

logits_bruts = [2.0, 1.5, 1.0, 0.5, 0.1]  # scores bruts du modèle

for temp in [0.1, 1.0, 2.0]:
    probas = softmax_avec_temperature(logits_bruts, temp)
    print(f"Température={temp}: {np.round(probas, 3)}")

# Température=0.1: distribution très concentrée sur le premier choix
# Température=1.0: distribution "normale"
# Température=2.0: distribution beaucoup plus étalée
```

**💡 Pourquoi c'est fondamental**

Comprendre que "un LLM produit des probabilités, pas des certitudes" explique directement le phénomène des **hallucinations** (Module 0) : le modèle peut, avec une probabilité non nulle, générer une suite de mots qui forme une affirmation fausse mais grammaticalement et statistiquement plausible.

---

## 🏋️ EXERCICES — CHAPITRE 2.3

### Exercice 2.3.A — Calculs de probabilité de base

Un modèle de classification d'emails donne les probabilités suivantes pour un email :
```
P(Spam) = 0.72
P(Important) = 0.18
P(Normal) = 0.10
```

1. Vérifie que ces probabilités sont valides
2. Si le seuil de classification "spam" est fixé à 0.5, cet email sera-t-il classé comme spam ?

<details>
<summary>👉 Solution</summary>

```
1. 0.72 + 0.18 + 0.10 = 1.00 → valide, la somme fait bien 1
2. Oui, car P(Spam) = 0.72 > 0.5
```
</details>

### Exercice 2.3.B — Moyenne et écart-type

Les scores de précision de 5 entraînements successifs du même modèle (avec des seeds différentes) sont : `[0.87, 0.85, 0.91, 0.86, 0.88]`.

1. Calcule la moyenne à la main
2. Calcule l'écart-type à la main
3. Qu'est-ce qu'un écart-type faible te dit sur la stabilité du modèle ?

<details>
<summary>👉 Solution</summary>

```
Moyenne = (0.87+0.85+0.91+0.86+0.88)/5 = 4.37/5 = 0.874

Écarts : -0.004, -0.024, 0.036, -0.014, 0.006
Écarts² : 0.000016, 0.000576, 0.001296, 0.000196, 0.000036

Variance = (0.000016+0.000576+0.001296+0.000196+0.000036)/5 = 0.00212/5 ≈ 0.000424
Écart-type = √0.000424 ≈ 0.0206
```

Un écart-type faible (≈0.02, soit 2 points de pourcentage) indique que le modèle produit des performances **stables et reproductibles** d'un entraînement à l'autre — c'est rassurant. Un écart-type élevé indiquerait un modèle instable, sensible au hasard de l'initialisation.

```python
scores = np.array([0.87, 0.85, 0.91, 0.86, 0.88])
print(f"Moyenne: {scores.mean():.4f}")
print(f"Écart-type: {scores.std():.4f}")
```
</details>

### Exercice 2.3.C — Bayes appliqué à la détection de fraude

Une banque détecte la fraude avec un modèle IA. Sur toutes les transactions, seulement 0.1% sont frauduleuses. Le modèle détecte 98% des fraudes réelles, mais génère aussi 2% de fausses alertes sur les transactions légitimes. Si une transaction déclenche une alerte, quelle est la probabilité qu'elle soit réellement frauduleuse ?

<details>
<summary>👉 Solution</summary>

```python
p_fraude = 0.001
p_legitime = 1 - p_fraude
p_alerte_si_fraude = 0.98
p_alerte_si_legitime = 0.02

p_alerte = (p_alerte_si_fraude * p_fraude) + (p_alerte_si_legitime * p_legitime)
p_fraude_si_alerte = (p_alerte_si_fraude * p_fraude) / p_alerte

print(f"P(Alerte) = {p_alerte:.4f}")
print(f"P(Fraude | Alerte) = {p_fraude_si_alerte:.4f}")  # ≈0.0468
```

Seulement **4.68%** des alertes correspondent à une vraie fraude, malgré un modèle qui semble très performant (98% de détection) ! C'est le même phénomène que l'exemple médical : la rareté de l'événement recherché (0.1%) domine le calcul. **C'est pour cela qu'en pratique, les systèmes anti-fraude combinent plusieurs signaux et qu'un humain vérifie souvent les alertes avant blocage.**
</details>

---

---

# 📘 CHAPITRE 2.4 — OPTIMISATION
## Comment trouver le meilleur modèle possible

## Durée : 1 semaine

---

## 2.4.0 — Qu'est-ce qu'optimiser ? (rappel et approfondissement du Module 0)

**🔑 Intuition — le randonneur dans le brouillard, en détail**

Ce chapitre relie tout ce que tu as appris dans ce module. Rappelle-toi l'image du Module 0 : tu es un randonneur perdu dans un épais brouillard sur une montagne, et tu veux descendre le plus vite possible dans la vallée (minimiser l'erreur). Tu ne vois rien autour de toi, mais tu peux **sentir la pente sous tes pieds**.

- La **pente que tu sens** = le gradient (Chapitre 2.2)
- **Avancer dans la direction opposée à la pente montante** = la descente de gradient
- **La taille de tes pas** = le learning rate
- **Ta position actuelle** = les valeurs actuelles des paramètres du modèle
- **L'altitude** = la fonction de coût (loss) — l'erreur du modèle

Optimiser un modèle IA, c'est exactement ce processus, répété des milliers ou millions de fois, mais avec des millions de "directions" possibles simultanément (une par paramètre du modèle) au lieu de 2 (Nord-Sud, Est-Ouest).

---

## 2.4.1 — La Fonction de Coût (Loss) : donner un objectif chiffré au modèle

**🔑 Intuition**

Un modèle ne peut s'améliorer que s'il existe **un nombre unique qui résume à quel point il se trompe**. Ce nombre, c'est la fonction de coût (aussi appelée "loss" ou fonction de perte).

**Exemple concret : erreur quadratique moyenne (MSE)**

Si un modèle prédit des prix de maison, et qu'on compare ses prédictions aux vrais prix :

```
Vrais prix      : [200 000, 350 000, 150 000]
Prix prédits    : [210 000, 320 000, 180 000]

Erreurs         : [-10 000, 30 000, -30 000]
Erreurs²        : [100 000 000, 900 000 000, 900 000 000]

MSE = moyenne des erreurs² = (100M + 900M + 900M) / 3 ≈ 633 333 333
```

On met les erreurs au carré pour deux raisons : (1) éliminer les signes négatifs (une erreur de -30 000 est aussi grave qu'une erreur de +30 000), et (2) pénaliser plus fortement les grosses erreurs que les petites.

**📐 Formule**

```
MSE = (1/n) × Σ(y_réel - y_prédit)²
```

- **Σ** (sigma majuscule) = "somme de" — additionne tous les termes qui suivent
- **n** = nombre d'exemples

**💻 Code Python**

```python
import numpy as np

y_vrai = np.array([200000, 350000, 150000])
y_pred = np.array([210000, 320000, 180000])

mse = np.mean((y_vrai - y_pred) ** 2)
print(f"MSE: {mse:,.0f}")

rmse = np.sqrt(mse)  # racine carrée du MSE = revient à la même unité que les prix
print(f"RMSE: {rmse:,.0f}€")  # plus interprétable : "erreur moyenne d'environ X euros"
```

**💡 Pourquoi en IA**

Chaque type de problème utilise une fonction de coût adaptée :
- **Régression** (prédire un nombre) → MSE, MAE (vues au Module 1)
- **Classification** (prédire une catégorie) → Cross-Entropy (basée sur les probabilités du Chapitre 2.3 !)
- Le **choix de la fonction de coût** détermine complètement ce que le modèle va apprendre à optimiser — un mauvais choix de fonction de coût peut faire "bien apprendre la mauvaise chose".

---

## 2.4.2 — La Descente de Gradient, Étape par Étape

**🔑 Intuition**

Maintenant qu'on a le gradient (Chapitre 2.2) et la fonction de coût (section précédente), on peut assembler l'algorithme complet.

```
🔑 Algorithme de descente de gradient :

1. Choisir un point de départ (valeurs initiales aléatoires des paramètres)
2. Calculer le gradient de la fonction de coût à ce point
3. Avancer dans la direction OPPOSÉE au gradient (car on veut descendre, pas monter)
4. Répéter les étapes 2 et 3 jusqu'à ce que le gradient soit proche de zéro
   (= on est arrivé, ou presque, au minimum)
```

**📐 Formule de mise à jour**

```
nouveau_paramètre = ancien_paramètre - (learning_rate × gradient)
```

**🧮 Exemple à la main — trouvons le minimum de f(x) = x² pas à pas**

On sait déjà (section 2.2.2) que `f'(x) = 2x`. Le minimum de `x²` est évidemment en `x=0`, mais faisons semblant de ne pas le savoir, et laissons l'algorithme le découvrir.

```
Point de départ : x = 5
Learning rate   : 0.3

Étape 1 :
  gradient = f'(5) = 2×5 = 10
  nouveau x = 5 - (0.3 × 10) = 5 - 3 = 2

Étape 2 :
  gradient = f'(2) = 2×2 = 4
  nouveau x = 2 - (0.3 × 4) = 2 - 1.2 = 0.8

Étape 3 :
  gradient = f'(0.8) = 2×0.8 = 1.6
  nouveau x = 0.8 - (0.3 × 1.6) = 0.8 - 0.48 = 0.32

Étape 4 :
  gradient = f'(0.32) = 0.64
  nouveau x = 0.32 - (0.3 × 0.64) = 0.32 - 0.192 = 0.128

...
```

On voit que `x` se rapproche progressivement de 0 (le vrai minimum), et que le gradient diminue également à chaque étape (rappel de l'exercice 2.2.B : gradient nul = on est au minimum).

**💻 Code Python — implémentons la descente de gradient complète**

```python
import numpy as np
import matplotlib.pyplot as plt

def f(x):
    return x**2

def f_prime(x):
    return 2*x

x = 5.0             # point de départ
learning_rate = 0.3
historique = [x]

for etape in range(15):
    gradient = f_prime(x)
    x = x - learning_rate * gradient
    historique.append(x)
    print(f"Étape {etape+1}: x={x:.4f}, f(x)={f(x):.4f}, gradient={gradient:.4f}")

# Visualiser la convergence
plt.figure(figsize=(10, 6))
x_range = np.linspace(-6, 6, 100)
plt.plot(x_range, f(x_range), label="f(x) = x²", color="steelblue")
plt.scatter(historique, [f(xi) for xi in historique], color="red", zorder=5,
            label="Trajectoire de la descente de gradient")
plt.plot(historique, [f(xi) for xi in historique], "r--", alpha=0.5)
plt.legend()
plt.title("Descente de Gradient — Convergence vers le Minimum")
plt.xlabel("x"); plt.ylabel("f(x)")
plt.grid(alpha=0.3)
plt.show()
```

**💡 Pourquoi en IA**

C'est exactement cet algorithme, appliqué non pas à un seul paramètre `x` mais à des millions ou des milliards de paramètres simultanément (les poids du réseau), qui entraîne tous les modèles de Deep Learning modernes, y compris les LLMs comme GPT-4 ou Claude.

---

## 2.4.3 — Le Learning Rate : la taille des pas

**🔑 Intuition**

Le learning rate contrôle **à quel point on ajuste les paramètres à chaque étape**. C'est un des réglages les plus critiques (et les plus délicats) de tout entraînement IA.

```
🔑 Learning rate TROP GRAND :
   → on prend des pas trop larges
   → on risque de "sauter" par-dessus le minimum, voire de diverger complètement
   
🔑 Learning rate TROP PETIT :
   → on prend des pas minuscules
   → l'entraînement est très lent, ou reste bloqué dans un minimum local médiocre
   
🔑 Learning rate BIEN CHOISI :
   → convergence rapide et stable vers un bon minimum
```

**🧮 Exemple à la main — learning rate trop grand**

Reprenons `f(x) = x²`, mais avec un learning rate de 1.1 (trop grand) :

```
x = 5
gradient = 2×5 = 10
nouveau x = 5 - (1.1 × 10) = 5 - 11 = -6

x = -6
gradient = 2×(-6) = -12
nouveau x = -6 - (1.1 × -12) = -6 + 13.2 = 7.2

x = 7.2 ...
```

Au lieu de se rapprocher de 0, `x` oscille de plus en plus violemment — l'algorithme **diverge**.

```python
import matplotlib.pyplot as plt
import numpy as np

def f(x): return x**2
def f_prime(x): return 2*x

fig, axes = plt.subplots(1, 3, figsize=(16, 5))
lr_configs = [(0.01, "Trop petit"), (0.3, "Bien choisi"), (1.1, "Trop grand")]

for ax, (lr, titre) in zip(axes, lr_configs):
    x = 5.0
    historique = [x]
    for _ in range(15):
        x = x - lr * f_prime(x)
        historique.append(x)
        if abs(x) > 100:  # éviter l'explosion numérique dans le graphique
            break
    
    x_range = np.linspace(-8, 8, 100)
    ax.plot(x_range, f(x_range), color="lightblue", zorder=1)
    ax.plot(historique, [f(xi) for xi in historique], "ro-", markersize=4, zorder=2)
    ax.set_title(f"LR={lr} ({titre})")
    ax.set_ylim(-5, 60)
    ax.grid(alpha=0.3)

plt.tight_layout()
plt.show()
```

**💡 Pourquoi en IA**

Le choix du learning rate (vu au Module 1, section 2.4 de la formation d'origine ; et déjà mentionné au Module 0) est l'un des **hyperparamètres les plus importants à régler** lors de l'entraînement d'un modèle. Beaucoup de techniques modernes (comme les schedulers de learning rate, ou les optimiseurs adaptatifs comme Adam) existent précisément pour ajuster automatiquement la taille des pas au fil de l'entraînement.

---

## 2.4.4 — Batch, Mini-Batch et Epoch : comment on utilise les données pendant l'entraînement

**🔑 Intuition**

Imagine que tu as 10 000 exemples pour entraîner ton modèle. Faut-il calculer le gradient sur les 10 000 exemples d'un coup avant de faire un seul pas ? Ou sur un seul exemple à la fois ? Ni l'un ni l'autre en général — la pratique standard est un compromis : les **mini-batchs**.

```
🔑 Batch complet (Batch Gradient Descent)
   → calcule le gradient sur TOUTES les données avant chaque pas
   → très précis, mais très lent et gourmand en mémoire pour de gros datasets

🔑 Un seul exemple à la fois (Stochastic Gradient Descent, SGD)
   → calcule le gradient sur 1 SEUL exemple avant chaque pas
   → très rapide par pas, mais très "bruité" et instable

🔑 Mini-batch (le compromis standard utilisé partout)
   → calcule le gradient sur un petit groupe (ex: 32, 64, 128 exemples) avant chaque pas
   → bon équilibre vitesse / stabilité — c'est LA méthode utilisée en pratique
```

**📐 Vocabulaire à retenir**

```
Batch size = nombre d'exemples utilisés pour calculer un seul pas de gradient
Epoch      = un passage complet à travers TOUT le dataset d'entraînement
```

**🧮 Exemple à la main**

Si tu as 10 000 exemples et un batch size de 100 :

```
Nombre de "pas" (itérations) par epoch = 10 000 / 100 = 100 pas

Si tu entraînes pendant 20 epochs :
Nombre total de pas de gradient = 100 × 20 = 2000 pas
```

```python
n_exemples = 10_000
batch_size = 100
n_epochs = 20

pas_par_epoch = n_exemples // batch_size
pas_total = pas_par_epoch * n_epochs

print(f"Pas par epoch : {pas_par_epoch}")
print(f"Pas total sur {n_epochs} epochs : {pas_total}")
```

**💡 Pourquoi en IA**

Le choix du batch size influence directement :
- **La vitesse d'entraînement** (les gros batchs exploitent mieux le parallélisme des GPU, vu au Module 0)
- **La stabilité** (les petits batchs ajoutent du "bruit" utile qui peut aider à éviter certains pièges de l'optimisation)
- **La mémoire GPU nécessaire** (un batch trop gros peut ne pas tenir dans la mémoire du GPU — erreur "out of memory" très courante en pratique)

---

## 🏋️ EXERCICES — CHAPITRE 2.4

### Exercice 2.4.A — Descente de gradient à la main

Pour `f(x) = (x-3)²` (minimum en x=3), avec un point de départ x=8 et un learning rate de 0.4, calcule les 3 premières étapes de la descente de gradient à la main.

*Indice : la dérivée de `(x-3)²` est `2(x-3)`, par la règle de la chaîne (Chapitre 2.2.6).*

<details>
<summary>👉 Solution</summary>

```
f'(x) = 2(x-3)

Étape 1 :
  x = 8
  gradient = 2(8-3) = 10
  nouveau x = 8 - 0.4×10 = 8 - 4 = 4

Étape 2 :
  x = 4
  gradient = 2(4-3) = 2
  nouveau x = 4 - 0.4×2 = 4 - 0.8 = 3.2

Étape 3 :
  x = 3.2
  gradient = 2(3.2-3) = 0.4
  nouveau x = 3.2 - 0.4×0.4 = 3.2 - 0.16 = 3.04
```

On voit que `x` converge rapidement vers 3 (le vrai minimum), et que le gradient se rapproche de 0.

```python
def f_prime(x): return 2*(x-3)
x = 8.0
lr = 0.4
for i in range(3):
    grad = f_prime(x)
    x = x - lr * grad
    print(f"Étape {i+1}: x={x:.4f}")
```
</details>

### Exercice 2.4.B — Diagnostic de learning rate

Un ingénieur observe que la courbe de loss de son modèle oscille violemment et augmente au fil des epochs au lieu de diminuer. Quelle est la cause la plus probable, et que doit-il faire ?

<details>
<summary>👉 Solution</summary>

Le comportement décrit (oscillations violentes, loss qui augmente) est le signe caractéristique d'un **learning rate trop élevé** (voir section 2.4.3) : l'algorithme "saute" par-dessus le minimum à chaque pas au lieu de converger, un peu comme dans l'exemple à la main avec LR=1.1.

**Solution recommandée :** réduire le learning rate (par exemple, le diviser par 10), et éventuellement utiliser un scheduler qui réduit progressivement le learning rate au fil de l'entraînement.
</details>

---

---

# 🎯 PROJET DE SYNTHÈSE DU MODULE 2
## Construire et Entraîner un Neurone from Scratch — Là où Toutes les Maths se Rencontrent

**🔑 Pourquoi ce projet est le plus important du module**

Jusqu'ici, tu as appris l'algèbre linéaire, les dérivées, les probabilités et l'optimisation **séparément**, chapitre par chapitre. Ce projet a un seul but : te montrer que ce sont en réalité **les mêmes 4 briques, assemblées ensemble**, qui font fonctionner absolument tous les modèles d'IA, du plus simple au plus grand LLM.

On va construire, entièrement à la main (sans Scikit-learn), un modèle qui prédit **la note d'examen d'un étudiant en fonction de son nombre d'heures de révision**. C'est volontairement le problème le plus simple possible, pour que tu puisses suivre chaque calcul sans te perdre.

```
🔑 Le fil conducteur :

1. Chapitre 2.1 (Algèbre linéaire) → représenter les données et faire la prédiction
2. Chapitre 2.4 (Optimisation)     → mesurer l'erreur avec une fonction de coût
3. Chapitre 2.2 (Calcul différentiel) → calculer le gradient de cette erreur (via la règle de la chaîne)
4. Chapitre 2.4 (Optimisation)     → ajuster les paramètres avec la descente de gradient
5. On répète 2→4 jusqu'à ce que le modèle soit bon
```

C'est exactement ce cycle, répété des milliards de fois sur des milliards de paramètres, qui entraîne un modèle comme Claude ou GPT-4.

---

### Étape 1 — Le Modèle (Chapitre 2.1 : Algèbre Linéaire)

**Nos données :** 5 étudiants, avec leurs heures de révision et leur note obtenue (sur 20).

```
Heures de révision (x) :  1,   2,   3,   4,   5
Note obtenue (y)        :  6,   9,   12,  14,  17
```

Notre modèle est **un seul neurone** (vu section 2.1.7) : il prédit la note avec la formule

```
note_prédite = w × heures_révision + b
```

- **w** (poids) = combien chaque heure de révision "vaut" en points
- **b** (biais) = la note de base, même sans réviser

Au départ, le modèle ne sait rien : on initialise `w = 1` et `b = 2` **au hasard**.

---

### Étape 2 — Mesurer l'Erreur (Chapitre 2.4 : Fonction de Coût)

Concentrons-nous d'abord sur **un seul étudiant** pour bien voir le calcul : celui qui a révisé `x = 3` heures et obtenu `y_vrai = 14`.

```
Prédiction actuelle : y_pred = w×x + b = 1×3 + 2 = 5

Le modèle prédit 5, alors que la vraie note est 14 — il se trompe beaucoup !

Erreur (fonction de coût MSE simplifiée, Chapitre 2.4.1) :
L = (y_pred - y_vrai)² = (5 - 14)² = (-9)² = 81
```

Notre objectif : ajuster `w` et `b` pour faire diminuer ce `L`.

---

### Étape 3 — Calculer le Gradient (Chapitre 2.2 : la Règle de la Chaîne en Action)

C'est ici que la règle de la chaîne (section 2.2.6) entre en jeu. Notre erreur `L` dépend de `y_pred`, qui dépend lui-même de `w` et `b`. Pour savoir comment ajuster `w`, on doit "remonter la chaîne" :

```
L dépend de y_pred     →     y_pred dépend de w
   (1er maillon)                (2e maillon)
```

**🧮 Calcul à la main, maillon par maillon**

```
Maillon 1 — dérivée de L par rapport à y_pred :
   L = (y_pred - y_vrai)²
   dL/dy_pred = 2 × (y_pred - y_vrai) = 2 × (5 - 14) = -18

Maillon 2 — dérivée de y_pred par rapport à w :
   y_pred = w×x + b
   dy_pred/dw = x = 3

Règle de la chaîne — on multiplie les deux maillons :
   dL/dw = (dL/dy_pred) × (dy_pred/dw) = -18 × 3 = -54
```

Et de la même façon pour le biais `b` (dont la dérivée par rapport à lui-même vaut simplement 1) :

```
dL/db = (dL/dy_pred) × (dy_pred/db) = -18 × 1 = -18
```

**On vient de calculer le gradient de l'erreur : `[dL/dw, dL/db] = [-54, -18]`** — exactement le vecteur gradient du Chapitre 2.2.5, mais appliqué à un vrai modèle !

---

### Étape 4 — Ajuster les Paramètres (Chapitre 2.4.2 : Descente de Gradient)

On applique la formule de mise à jour vue section 2.4.2, avec un learning rate de `0.01` :

```
nouveau w = w - (learning_rate × dL/dw) = 1 - (0.01 × -54) = 1 + 0.54 = 1.54
nouveau b = b - (learning_rate × dL/db) = 2 - (0.01 × -18) = 2 + 0.18 = 2.18
```

**Vérifions que ça marche :** avec ces nouveaux paramètres, la prédiction pour ce même étudiant devient :

```
y_pred = 1.54×3 + 2.18 = 4.62 + 2.18 = 6.80
```

On est passé d'une prédiction de **5** à une prédiction de **6.80** — plus proche de la vraie note (14) qu'avant ! Un seul pas de descente de gradient, et le modèle s'est déjà amélioré. Il suffit de répéter ce processus des centaines de fois, sur tous les étudiants, pour que le modèle devienne précis.

---

### Étape 5 — Le Code Complet, from Scratch

Maintenant que tu as vu et recalculé chaque étape à la main, voici l'implémentation complète en Python, qui répète ce cycle automatiquement sur les 5 étudiants, pendant plusieurs centaines d'itérations.

```python
import numpy as np
import matplotlib.pyplot as plt

# ─────────────────────────────────────────────
# ÉTAPE 1 : LES DONNÉES (vecteurs, Chapitre 2.1)
# ─────────────────────────────────────────────
x = np.array([1, 2, 3, 4, 5])      # heures de révision
y_vrai = np.array([6, 9, 12, 14, 17])  # notes réelles

# ─────────────────────────────────────────────
# INITIALISATION DU MODÈLE
# ─────────────────────────────────────────────
w = 1.0   # poids initial (au hasard)
b = 2.0   # biais initial (au hasard)
learning_rate = 0.01
n_iterations = 500

historique_loss = []

# ─────────────────────────────────────────────
# BOUCLE D'ENTRAÎNEMENT — le cœur de tout modèle IA
# ─────────────────────────────────────────────
for iteration in range(n_iterations):
    
    # ÉTAPE 1 (2.1) : Prédiction — produit scalaire + biais
    y_pred = w * x + b
    
    # ÉTAPE 2 (2.4.1) : Fonction de coût (MSE sur les 5 étudiants)
    loss = np.mean((y_pred - y_vrai) ** 2)
    historique_loss.append(loss)
    
    # ÉTAPE 3 (2.2.6) : Gradient via la règle de la chaîne
    # (moyenne sur tous les exemples, comme en Chapitre 2.4.4)
    dL_dw = np.mean(2 * (y_pred - y_vrai) * x)
    dL_db = np.mean(2 * (y_pred - y_vrai))
    
    # ÉTAPE 4 (2.4.2) : Mise à jour par descente de gradient
    w = w - learning_rate * dL_dw
    b = b - learning_rate * dL_db
    
    if iteration % 100 == 0:
        print(f"Itération {iteration:3d} : w={w:.3f}, b={b:.3f}, loss={loss:.3f}")

print(f"\n✅ Modèle final : note_prédite = {w:.2f} × heures + {b:.2f}")

# ─────────────────────────────────────────────
# VISUALISATION
# ─────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(13, 5))

# Convergence de la loss
axes[0].plot(historique_loss, color="tomato")
axes[0].set_title("Diminution de l'Erreur au Fil de l'Entraînement")
axes[0].set_xlabel("Itération"); axes[0].set_ylabel("Loss (MSE)")
axes[0].grid(alpha=0.3)

# Le modèle appris vs les vraies données
axes[1].scatter(x, y_vrai, color="steelblue", s=80, label="Notes réelles", zorder=3)
x_ligne = np.linspace(0, 6, 50)
axes[1].plot(x_ligne, w * x_ligne + b, color="tomato", label=f"Modèle appris (w={w:.2f}, b={b:.2f})")
axes[1].set_title("Le Modèle Appris")
axes[1].set_xlabel("Heures de révision"); axes[1].set_ylabel("Note")
axes[1].legend(); axes[1].grid(alpha=0.3)

plt.tight_layout()
plt.savefig("synthese_module2.png", dpi=150, bbox_inches="tight")
plt.show()
```

**Ce que tu devrais observer :**
- La courbe de loss (gauche) décroît rapidement puis se stabilise — exactement le comportement attendu de la descente de gradient (Chapitre 2.4.2)
- La droite apprise (droite) se rapproche de plus en plus des points réels au fil de l'entraînement
- Le modèle final devrait converger vers environ `w ≈ 2.7`, `b ≈ 3.5` (les valeurs exactes dépendent du nombre d'itérations)

---

### Étape 6 — Vérification avec Scikit-learn

On confirme que notre implémentation "from scratch" retrouve bien le même résultat qu'un outil professionnel (Module 1, Chapitre 1.5) :

```python
from sklearn.linear_model import LinearRegression

modele_sklearn = LinearRegression()
modele_sklearn.fit(x.reshape(-1, 1), y_vrai)

print(f"Notre modèle   : w={w:.3f}, b={b:.3f}")
print(f"Scikit-learn   : w={modele_sklearn.coef_[0]:.3f}, b={modele_sklearn.intercept_:.3f}")
```

Les deux résultats doivent être très proches — la seule différence est que Scikit-learn utilise la formule analytique exacte (Module 1, section 1.2.7 régression linéaire), tandis que nous avons trouvé la solution **progressivement**, par petits pas de gradient. **C'est exactement cette approche progressive, et non la formule analytique, qui est utilisée pour entraîner les grands réseaux de neurones** — parce qu'avec des milliards de paramètres, il n'existe pas de formule analytique directe : la descente de gradient est la seule méthode qui fonctionne à cette échelle.

---

### 💡 Ce que ce projet vient de démontrer

| Concept du Module 2 | Où il apparaît dans ce projet |
|---|---|
| Vecteurs (2.1.2) | `x` et `y_vrai` sont des vecteurs (5 étudiants) |
| Produit scalaire / neurone (2.1.7) | `y_pred = w * x + b` |
| Fonction de coût (2.4.1) | `loss = np.mean((y_pred - y_vrai)**2)` |
| Dérivée (2.2.2) | `dL_dw`, `dL_db` |
| Règle de la chaîne (2.2.6) | Le calcul en deux "maillons" de `dL_dw` |
| Gradient (2.2.5) | Le vecteur `[dL_dw, dL_db]` |
| Descente de gradient (2.4.2) | La ligne `w = w - learning_rate * dL_dw` |
| Learning rate (2.4.3) | La variable `learning_rate = 0.01` |
| Epoch (2.4.4) | Chaque tour de la boucle `for iteration in range(...)` |

**Retiens ceci :** un LLM de plusieurs centaines de milliards de paramètres utilise très exactement cette même boucle — prédiction, erreur, gradient via la règle de la chaîne, mise à jour — simplement répétée à une échelle absolument massive, avec des millions de couches de neurones interconnectées au lieu d'une seule. Le principe mathématique, lui, ne change pas.

---



> Réponds sans regarder le cours. Objectif : 16/20 minimum avant de passer au Module 3.

**1.** Quelle est la différence entre un scalaire, un vecteur et une matrice ?
**2.** Que retourne le produit scalaire de deux vecteurs : un nombre ou un vecteur ?
**3.** Quelle est la règle sur les dimensions pour pouvoir multiplier deux matrices A(m×n) et B(p×q) ?
**4.** À quoi sert la similarité cosinus, et de quelle opération vectorielle dérive-t-elle ?
**5.** Que représente concrètement une dérivée, en une phrase simple ?
**6.** Que signifie un gradient nul en un point ?
**7.** Dans quelle direction avance-t-on lors de la descente de gradient, par rapport au gradient ?
**8.** À quoi sert la règle de la chaîne dans un réseau de neurones ?
**9.** Que se passe-t-il si le learning rate est trop élevé ?
**10.** Quelle est la différence entre une epoch et un batch ?
**11.** Pourquoi met-on les erreurs au carré dans le calcul du MSE ?
**12.** Que signifie "P(A|B)" en notation de probabilité ?
**13.** Pourquoi un test médical fiable à 95% peut-il donner un résultat trompeur pour une maladie rare ?
**14.** Que contrôle le paramètre "temperature" dans la génération de texte d'un LLM, en lien avec les probabilités ?
**15.** Quelle est la différence entre la moyenne et l'écart-type ?
**16.** Quelle est la somme totale des probabilités dans une distribution valide ?
**17.** Pourquoi les GPU sont-ils particulièrement adaptés au calcul matriciel ?
**18.** Qu'est-ce qu'un vecteur propre, en intuition simple ?
**19.** Quelle est la formule de mise à jour des paramètres dans la descente de gradient ?
**20.** Pourquoi utilise-t-on des mini-batchs plutôt que le dataset entier ou un seul exemple à la fois ?

---

### 📝 Corrigé

**1.** Un scalaire est un nombre seul ; un vecteur est une liste ordonnée de nombres (1 dimension) ; une matrice est un tableau de nombres organisé en lignes et colonnes (2 dimensions).
**2.** Un nombre (un scalaire) — c'est ce qui le distingue de la multiplication élément par élément, qui retourne un vecteur.
**3.** Le nombre de colonnes de A (n) doit être égal au nombre de lignes de B (p) ; le résultat aura la forme (m×q).
**4.** Elle mesure à quel point deux vecteurs (souvent des embeddings) pointent dans la même direction, indépendamment de leur longueur ; elle dérive du produit scalaire, normalisé par les normes des deux vecteurs.
**5.** La dérivée mesure la rapidité (et la direction) à laquelle une fonction change en un point donné — c'est la pente locale de sa courbe.
**6.** Que la fonction est à un point "plat" localement — un minimum, un maximum, ou un point-selle ; en pratique lors de l'entraînement, un gradient proche de zéro signale qu'on approche d'un minimum.
**7.** Dans la direction **opposée** au gradient, car le gradient pointe vers la montée la plus raide et on cherche à minimiser (descendre).
**8.** Elle permet de calculer, couche par couche en remontant depuis la sortie, la contribution de chaque poids à l'erreur finale, en multipliant les dérivées locales de chaque couche entre elles.
**9.** L'algorithme peut "sauter" par-dessus le minimum à chaque pas, entraînant des oscillations et potentiellement une divergence (l'erreur augmente au lieu de diminuer).
**10.** Un batch est un sous-ensemble d'exemples utilisé pour calculer un seul pas de gradient ; une epoch est un passage complet à travers l'intégralité du dataset d'entraînement (donc plusieurs batchs).
**11.** Pour éliminer les signes négatifs (une sous-estimation et une surestimation sont toutes deux des erreurs) et pénaliser plus fortement les grosses erreurs que les petites.
**12.** La probabilité que l'événement A se produise, sachant que l'événement B s'est déjà produit (probabilité conditionnelle).
**13.** Parce que le nombre de faux positifs générés parmi la (très nombreuse) population saine peut dépasser le nombre de vrais positifs issus de la (très rare) population malade — c'est le théorème de Bayes appliqué.
**14.** Il modifie la "netteté" de la distribution de probabilité sur le prochain token : une température basse concentre la probabilité sur les choix les plus probables (réponses déterministes), une température haute étale la distribution (réponses plus variées/créatives).
**15.** La moyenne indique le centre (la valeur typique) des données ; l'écart-type indique leur dispersion (à quel point elles s'éloignent en moyenne du centre).
**16.** Toujours exactement 1 (ou 100%).
**17.** Parce qu'ils possèdent des milliers de cœurs capables d'effectuer des calculs matriciels (les produits scalaires ligne × colonne) en parallèle, contrairement à un CPU classique qui les ferait plutôt séquentiellement.
**18.** Une direction qui, sous une transformation matricielle donnée, n'est qu'étirée ou compressée mais jamais pivotée — sa direction reste stable.
**19.** `nouveau_paramètre = ancien_paramètre - (learning_rate × gradient)`
**20.** Pour un bon compromis entre vitesse (exploiter le parallélisme du GPU sans devoir attendre tout le dataset) et stabilité (éviter le bruit excessif d'un seul exemple à la fois) — c'est aussi ce qui permet d'entraîner sur des datasets trop gros pour tenir en mémoire d'un coup.

---

---

# 📊 RÉCAPITULATIF DU MODULE 2

## Ce que tu as maîtrisé

| Compétence | Notion clé | Niveau attendu |
|---|---|---|
| Représenter des données | Vecteurs, matrices | ⭐⭐⭐⭐☆ |
| Calculer une similarité | Produit scalaire, similarité cosinus | ⭐⭐⭐⭐☆ |
| Comprendre les calculs d'un réseau | Multiplication matricielle | ⭐⭐⭐☆☆ |
| Comprendre l'apprentissage | Dérivée, gradient | ⭐⭐⭐⭐☆ |
| Comprendre la rétropropagation | Règle de la chaîne | ⭐⭐⭐☆☆ |
| Raisonner dans l'incertain | Probabilités, loi normale | ⭐⭐⭐⭐☆ |
| Interpréter les résultats d'un modèle | Théorème de Bayes | ⭐⭐⭐☆☆ |
| Comprendre l'entraînement d'un modèle | Descente de gradient, learning rate | ⭐⭐⭐⭐☆ |

> **Rassure-toi :** tu n'as pas besoin de tout retenir par cœur. L'objectif de ce module était de construire une **intuition solide** — savoir ce que représentent ces objets et pourquoi ils comptent. Les bibliothèques (NumPy, PyTorch, Scikit-learn) font les calculs à ta place ; ton rôle est de comprendre ce qu'elles font et pourquoi, pour prendre de bonnes décisions et déboguer intelligemment.

## Prochaine étape

**Module 3 — Machine Learning** : tu vas maintenant appliquer concrètement toutes ces notions mathématiques — vecteurs, gradient, probabilités, fonction de coût — pour comprendre en profondeur comment fonctionnent les algorithmes de Machine Learning que tu as déjà manipulés au Module 1 avec Scikit-learn.

---

## ⚠️ ERREURS FRÉQUENTES DU MODULE 2

| Erreur | Conséquence | Solution |
|---|---|---|
| Confondre `A @ B` et `A * B` en NumPy | Résultats complètement faux sans message d'erreur clair | Toujours vérifier : produit matriciel = `@`, élément par élément = `*` |
| Croire qu'un gradient élevé est "mauvais" | Mauvaise interprétation du comportement du modèle | Un gradient élevé signifie juste "on est loin du minimum" — normal en début d'entraînement |
| Choisir un learning rate au hasard | Divergence ou entraînement extrêmement lent | Commencer avec des valeurs standards (0.001, 0.01) et ajuster selon les courbes de loss |
| Interpréter une probabilité de test sans tenir compte de la fréquence de base | Fausse confiance dans un modèle de détection d'événements rares | Toujours appliquer le raisonnement de Bayes (fréquence de base + fiabilité du test) |
| Vouloir tout calculer "à la main" en production | Perte de temps, risque d'erreur | Comprendre le concept, laisser NumPy/PyTorch faire le calcul réel |
| Se bloquer sur la notation mathématique (∇, ∂, Σ) | Découragement face à des concepts en réalité simples | Toujours relier chaque symbole à son intuition ; ce sont des raccourcis d'écriture, pas des obstacles |

---

*Module 2 terminé ✅ — Durée totale : 8 semaines*  
*Formation IA Complète — Module suivant : Module 3 — Machine Learning*
