# 🎓 MODULE 1 — Python & Outils Essentiels pour l'Intelligence Artificielle
 
> **Durée estimée :** 9 semaines (1–2h par jour)  
> **Prérequis :** Zéro prérequis. Ce module part de zéro.  
> **Objectifs pédagogiques :** Maîtriser tous les outils de base avant d'aborder l'IA
    - Maîtriser Python pour la data science et l'IA
    - Savoir manipuler, analyser et visualiser des données
    - Comprendre l'écosystème d'outils IA

---

## Difficulté : ⭐☆☆☆☆ → ⭐⭐☆☆☆

---

## 📋 PLAN DU MODULE 1

| Chapitre | Sujet | Durée estimée |
|---|---|---|
| **1.1** | Python — Fondations absolues | 3 semaines |
| **1.2** | NumPy — Le calcul vectoriel | 1 semaine |
| **1.3** | Pandas — La manipulation de données | 1 semaine |
| **1.4** | Matplotlib & Seaborn — La visualisation | 1 semaine |
| **1.5** | Scikit-learn — Premier contact avec le ML | 2 semaines |
| **1.6** | Git & GitHub — Versionner son travail | 3 jours |
| **1.7** | Docker — Encapsuler son environnement | 1 semaine |

---

## 🎯 OBJECTIFS DU MODULE

À la fin de ce module, tu seras capable de :

1. Écrire des programmes Python structurés et lisibles
2. Manipuler des matrices et vecteurs avec NumPy
3. Charger, nettoyer et analyser des données avec Pandas
4. Créer des visualisations professionnelles avec Matplotlib
5. Entraîner tes premiers modèles ML avec Scikit-learn
6. Versionner ton code et collaborer via GitHub
7. Conteneuriser une application avec Docker

---

## ⚙️ INSTALLATION DE L'ENVIRONNEMENT

Avant de commencer, installe les outils indispensables.

### Étape 1 — Installer Python

Télécharge **Python 3.11 ou supérieur** depuis [python.org](https://python.org).

**Vérifie l'installation :**
```bash
python --version
# Python 3.11.7
```

### Étape 2 — Installer un éditeur de code

**Recommandation : Visual Studio Code (VS Code)**  
Gratuit, léger, extensible. Installe les extensions :
- **Python** (Microsoft)
- **Jupyter** (Microsoft)
- **Pylance** (autocomplétion intelligente)

### Étape 3 — Créer un environnement virtuel

Un environnement virtuel isole les dépendances de chaque projet. C'est une bonne pratique indispensable.

```bash
# Créer un dossier pour ta formation
mkdir formation-ia
cd formation-ia

# Créer un environnement virtuel
python -m venv venv

# Activer l'environnement
# Sur Windows :
venv\Scripts\activate
# Sur macOS/Linux :
source venv/bin/activate

# Le prompt affiche maintenant (venv) devant
(venv) $
```

### Étape 4 — Installer les bibliothèques

```bash
pip install numpy pandas matplotlib seaborn scikit-learn jupyter
```

### Étape 5 — Lancer Jupyter Notebook

```bash
jupyter notebook
```

Jupyter ouvre un navigateur. C'est l'environnement interactif idéal pour apprendre : tu écris du code, tu l'exécutes immédiatement, tu vois le résultat.

---

---

# 📘 CHAPITRE 1.1 — PYTHON : FONDATIONS ABSOLUES

## Durée : 3 semaines

---

## Pourquoi Python pour l'IA ?

Python est devenu **la langue universelle de l'IA** pour plusieurs raisons :

- **Lisibilité** : le code Python ressemble à du pseudo-code, facile à lire et écrire
- **Bibliothèques** : NumPy, PyTorch, TensorFlow, Hugging Face — tout l'écosystème IA est en Python
- **Communauté** : la plus grande communauté scientifique et IA au monde
- **Interactivité** : Jupyter Notebooks pour explorer et visualiser

> **Philosophie Python :** "Readability counts" — le code est lu plus souvent qu'il n'est écrit. Python t'oblige à écrire proprement.

---

## SEMAINE 1 — Les Bases du Langage

### 1.1.1 — Variables et Types de Données

En Python, une variable est une **étiquette qui pointe vers une valeur**. Pas besoin de déclarer son type — Python le détecte automatiquement.

```python
# Les types de base
nom = "Nasreddine"        # str  → chaîne de caractères
age = 28                  # int  → entier
taille = 1.78             # float → nombre décimal
est_etudiant = True       # bool → booléen (True/False)
rien = None               # NoneType → absence de valeur

# Vérifier le type
print(type(nom))          # <class 'str'>
print(type(age))          # <class 'int'>
print(type(taille))       # <class 'float'>
```

**Les opérations de base :**

```python
# Arithmétique
a, b = 10, 3
print(a + b)   # 13    → addition
print(a - b)   # 7     → soustraction
print(a * b)   # 30    → multiplication
print(a / b)   # 3.333 → division réelle
print(a // b)  # 3     → division entière (quotient)
print(a % b)   # 1     → modulo (reste)
print(a ** b)  # 1000  → puissance (10^3)

# Comparaisons → renvoient True ou False
print(a > b)   # True
print(a == b)  # False
print(a != b)  # True
print(a >= b)  # True
```

**Les chaînes de caractères en détail :**

```python
# Créer une chaîne
phrase = "L'intelligence artificielle est fascinante"

# Longueur
print(len(phrase))      # 43

# Accéder à un caractère (indexation commence à 0)
print(phrase[0])        # 'L'
print(phrase[-1])       # 'e' (dernier caractère)

# Slicing : extraire une portion
print(phrase[0:14])     # "L'intelligence"
print(phrase[15:])      # "artificielle est fascinante"
print(phrase[:14])      # "L'intelligence"

# Méthodes utiles
texte = "  bonjour le monde  "
print(texte.strip())          # "bonjour le monde" (enlève espaces)
print(texte.upper())          # "  BONJOUR LE MONDE  "
print(texte.replace("monde", "monde IA"))  # remplace
print("monde" in texte)       # True (recherche)
mots = texte.strip().split()  # ["bonjour", "le", "monde"]

# f-strings → la façon moderne de formater (très utilisée en IA)
nom = "Claude"
score = 0.9523
print(f"Le modèle {nom} a obtenu un score de {score:.2%}")
# "Le modèle Claude a obtenu un score de 95.23%"
print(f"Score : {score:.4f}")  # "Score : 0.9523"
```

---

### 1.1.2 — Structures de Données

Les structures de données sont les **conteneurs** dans lesquels on stocke les données. Comprendre leurs différences est crucial.

#### Les Listes — séquences ordonnées et modifiables

```python
# Créer une liste
fruits = ["pomme", "banane", "cerise"]
nombres = [1, 2, 3, 4, 5]
mixte = [1, "texte", 3.14, True, None]  # Python accepte des types mixtes

# Accéder aux éléments
print(fruits[0])    # "pomme"
print(fruits[-1])   # "cerise"
print(fruits[1:])   # ["banane", "cerise"]

# Modifier une liste
fruits.append("mangue")           # Ajouter à la fin
fruits.insert(1, "fraise")        # Insérer à l'index 1
fruits.remove("banane")           # Supprimer par valeur
element = fruits.pop(0)           # Supprimer et retourner par index
fruits.sort()                     # Trier

# Informations
print(len(fruits))                # Longueur
print("pomme" in fruits)          # True/False
print(fruits.index("cerise"))     # Position

# Opérations
liste1 = [1, 2, 3]
liste2 = [4, 5, 6]
combinee = liste1 + liste2        # [1, 2, 3, 4, 5, 6]
repetee = liste1 * 3              # [1, 2, 3, 1, 2, 3, 1, 2, 3]
```

**List comprehension** — syntaxe élégante très utilisée en Python/IA :

```python
# Façon classique
carres = []
for n in range(10):
    carres.append(n ** 2)

# Façon pythonique (list comprehension) — 10x plus lisible
carres = [n ** 2 for n in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Avec condition
pairs = [n for n in range(20) if n % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Transformer une liste de texte
mots = ["intelligence", "artificielle", "python"]
majuscules = [mot.upper() for mot in mots]
# ["INTELLIGENCE", "ARTIFICIELLE", "PYTHON"]

# Exemple typique en data science
scores = [0.85, 0.92, 0.73, 0.95, 0.68]
bons_scores = [s for s in scores if s > 0.8]
# [0.85, 0.92, 0.95]
```

#### Les Dictionnaires — paires clé:valeur

```python
# Créer un dictionnaire
modele = {
    "nom": "GPT-4",
    "parametres": 1_700_000_000_000,   # 1.7 trillion
    "contexte_max": 128_000,           # tokens
    "open_source": False,
    "performances": [0.87, 0.92, 0.95]  # liste dans dict
}

# Accéder aux valeurs
print(modele["nom"])                    # "GPT-4"
print(modele.get("auteur", "inconnu")) # valeur par défaut si absent

# Modifier
modele["version"] = "v1.0"             # Ajouter
modele["contexte_max"] = 200_000       # Modifier
del modele["open_source"]              # Supprimer

# Itérer
for cle in modele:
    print(f"{cle}: {modele[cle]}")

for cle, valeur in modele.items():
    print(f"{cle} = {valeur}")

# Vérifier
print("nom" in modele)                 # True

# Dict comprehension (très utilisée pour transformer des données)
scores = {"Alice": 85, "Bob": 92, "Charlie": 78, "Diana": 95}
bons_etudiants = {nom: s for nom, s in scores.items() if s >= 90}
# {"Bob": 92, "Diana": 95}
```

#### Les Tuples — séquences ordonnées et IMMUABLES

```python
# Un tuple ne peut pas être modifié après création
point = (3.14, 2.71)       # coordonnées
rgb = (255, 128, 0)        # couleur orange en RGB
dimensions = (1920, 1080)  # résolution

# Déballage (unpacking) — très courant en data science
x, y = point               # x=3.14, y=2.71
r, g, b = rgb              # r=255, g=128, b=0
largeur, hauteur = dimensions

# Utile pour les fonctions retournant plusieurs valeurs
def analyser_texte(texte):
    nb_mots = len(texte.split())
    nb_chars = len(texte)
    return nb_mots, nb_chars  # retourne un tuple

mots, chars = analyser_texte("Bonjour le monde")  # déballage
```

#### Les Ensembles (Sets) — valeurs uniques

```python
# Un set élimine automatiquement les doublons
langages = {"Python", "Python", "Java", "JavaScript", "Python"}
print(langages)  # {"Python", "Java", "JavaScript"} — 1 seul Python

# Opérations mathématiques sur les ensembles
a = {1, 2, 3, 4, 5}
b = {3, 4, 5, 6, 7}

print(a & b)   # {3, 4, 5}         → intersection
print(a | b)   # {1, 2, 3, 4, 5, 6, 7} → union
print(a - b)   # {1, 2}            → différence

# Cas d'usage : trouver les valeurs uniques dans une liste
labels = ["chien", "chat", "chien", "oiseau", "chat", "chien"]
labels_uniques = set(labels)   # {"chien", "chat", "oiseau"}
print(f"{len(labels_uniques)} classes différentes")  # 3
```

---

### 1.1.3 — Contrôle du Flux

#### Conditions (if/elif/else)

```python
score = 87.5

if score >= 90:
    mention = "Très bien"
elif score >= 80:
    mention = "Bien"
elif score >= 70:
    mention = "Assez bien"
elif score >= 60:
    mention = "Passable"
else:
    mention = "Insuffisant"

print(f"Score: {score} → Mention: {mention}")
# "Score: 87.5 → Mention: Bien"

# Opérateurs logiques
age = 25
possede_diplome = True

if age >= 18 and possede_diplome:
    print("Éligible")

if age < 18 or possede_diplome:
    print("Cas particulier")

if not possede_diplome:
    print("Pas de diplôme")

# Condition ternaire (sur une ligne)
statut = "adulte" if age >= 18 else "mineur"
```

#### Boucles

**La boucle `for` :**

```python
# Itérer sur une liste
modeles = ["GPT-4", "Claude", "Gemini", "Mistral"]
for modele in modeles:
    print(f"Modèle: {modele}")

# Itérer avec l'index (enumerate)
for i, modele in enumerate(modeles, start=1):
    print(f"{i}. {modele}")
# 1. GPT-4
# 2. Claude
# 3. Gemini
# 4. Mistral

# range() → générer une séquence de nombres
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 10):   # 2, 3, 4, 5, 6, 7, 8, 9
    print(i)

for i in range(0, 10, 2):  # 0, 2, 4, 6, 8 (pas=2)
    print(i)

# zip() → itérer sur plusieurs listes simultanément
noms = ["Alice", "Bob", "Charlie"]
scores = [92, 85, 78]

for nom, score in zip(noms, scores):
    print(f"{nom}: {score}/100")
```

**La boucle `while` :**

```python
# Répète tant que la condition est vraie
tentatives = 0
max_tentatives = 5

while tentatives < max_tentatives:
    print(f"Tentative {tentatives + 1}")
    tentatives += 1

# break → sortir immédiatement de la boucle
for i in range(100):
    if i == 5:
        break  # Arrête à i=5
    print(i)

# continue → passer à l'itération suivante
for i in range(10):
    if i % 2 == 0:
        continue  # Saute les pairs
    print(i)  # Affiche seulement les impairs : 1, 3, 5, 7, 9
```

---

### 1.1.4 — Fonctions

Une fonction est un **bloc de code réutilisable** avec un nom. C'est la base de tout code organisé.

```python
# Définition d'une fonction
def saluer(nom):
    """Affiche un message de bienvenue.
    
    Arguments:
        nom (str): Le prénom de la personne
    
    Returns:
        str: Le message formaté
    """
    message = f"Bonjour, {nom} ! Bienvenue dans la formation IA."
    return message

# Appel de la fonction
resultat = saluer("Nasreddine")
print(resultat)

# Paramètres par défaut
def creer_modele(nom, parametres=7_000_000_000, open_source=True):
    return {
        "nom": nom,
        "parametres": parametres,
        "open_source": open_source
    }

# Différentes façons d'appeler
m1 = creer_modele("Mistral")
m2 = creer_modele("GPT-4", parametres=1_700_000_000_000, open_source=False)
m3 = creer_modele(nom="LLaMA", open_source=True, parametres=70_000_000_000)

# *args → nombre variable d'arguments positionnels
def additionner(*nombres):
    total = 0
    for n in nombres:
        total += n
    return total

print(additionner(1, 2))           # 3
print(additionner(1, 2, 3, 4, 5)) # 15

# **kwargs → nombre variable d'arguments nommés
def configurer_modele(**parametres):
    for cle, valeur in parametres.items():
        print(f"  {cle}: {valeur}")

configurer_modele(
    temperature=0.7,
    max_tokens=1000,
    top_p=0.95,
    stream=True
)
```

**Fonctions lambda** — fonctions anonymes en une ligne :

```python
# Fonction normale
def doubler(x):
    return x * 2

# Fonction lambda équivalente
doubler = lambda x: x * 2

# Utilisation typique : trier par critère complexe
modeles = [
    {"nom": "GPT-4", "score": 0.92},
    {"nom": "Mistral", "score": 0.87},
    {"nom": "Claude", "score": 0.94}
]

# Trier par score
modeles_tries = sorted(modeles, key=lambda m: m["score"], reverse=True)
for m in modeles_tries:
    print(f"{m['nom']}: {m['score']}")
# Claude: 0.94
# GPT-4: 0.92
# Mistral: 0.87

# map() et filter() avec lambda
nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
carres = list(map(lambda x: x**2, nombres))
pairs = list(filter(lambda x: x % 2 == 0, nombres))
```

---

### 1.1.5 — Gestion des Fichiers

La data science commence toujours par lire des fichiers.

```python
# Écrire dans un fichier
with open("donnees.txt", "w", encoding="utf-8") as f:
    f.write("Ligne 1 : Introduction à l'IA\n")
    f.write("Ligne 2 : Python pour la data science\n")
    f.write("Ligne 3 : Machine Learning\n")

# Lire un fichier entier
with open("donnees.txt", "r", encoding="utf-8") as f:
    contenu = f.read()
    print(contenu)

# Lire ligne par ligne (économique en mémoire)
with open("donnees.txt", "r", encoding="utf-8") as f:
    for ligne in f:
        print(ligne.strip())  # strip() enlève \n

# Travailler avec CSV
import csv

# Écrire un CSV
donnees = [
    ["nom", "score", "niveau"],
    ["Alice", 92, "avancé"],
    ["Bob", 78, "intermédiaire"],
    ["Charlie", 65, "débutant"]
]

with open("etudiants.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(donnees)

# Lire un CSV
with open("etudiants.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for ligne in reader:
        print(f"{ligne['nom']}: {ligne['score']} pts")

# Travailler avec JSON (format omniprésent en IA)
import json

modele_info = {
    "nom": "Mistral-7B",
    "parametres": 7_000_000_000,
    "langues": ["français", "anglais", "espagnol"],
    "config": {
        "temperature": 0.7,
        "max_tokens": 4096
    }
}

# Sauvegarder en JSON
with open("modele.json", "w", encoding="utf-8") as f:
    json.dump(modele_info, f, indent=2, ensure_ascii=False)

# Charger un JSON
with open("modele.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    print(data["nom"])      # "Mistral-7B"
    print(data["config"])   # {"temperature": 0.7, "max_tokens": 4096}

# JSON string ↔ dict
json_str = '{"cle": "valeur", "nombre": 42}'
dico = json.loads(json_str)     # str → dict
retour = json.dumps(dico)       # dict → str
```

---

## SEMAINE 2 — Programmation Orientée Objet

### 1.1.6 — Classes et Objets

La POO est **indispensable** pour comprendre PyTorch, Scikit-learn et presque toutes les bibliothèques IA.

**Concept :** Une classe est un **moule**. Un objet est une **instance** créée à partir de ce moule.

```
Classe : Modele_IA
    → propriétés (attributes) : nom, taille, accuracy
    → comportements (methods) : entraîner(), prédire(), sauvegarder()

Objet : mon_modele = Modele_IA("GPT", 7B)
```

```python
class ModeleIA:
    """Représente un modèle d'intelligence artificielle."""
    
    # Attribut de classe (partagé par toutes les instances)
    nombre_modeles = 0
    
    def __init__(self, nom, nb_parametres, precision=0.0):
        """Constructeur — appelé à la création de l'objet.
        
        Arguments:
            nom (str): Nom du modèle
            nb_parametres (int): Nombre de paramètres
            precision (float): Précision initiale (0.0 à 1.0)
        """
        # Attributs d'instance (propres à chaque objet)
        self.nom = nom
        self.nb_parametres = nb_parametres
        self.precision = precision
        self.est_entraine = False
        self.historique_entrainement = []
        
        # Incrémenter le compteur de classe
        ModeleIA.nombre_modeles += 1
    
    def entrainer(self, donnees, epochs=10):
        """Simule l'entraînement du modèle."""
        print(f"🚀 Entraînement de {self.nom} sur {len(donnees)} exemples...")
        
        for epoch in range(epochs):
            # Simulation : la précision augmente
            amelioration = 0.05 * (1 - self.precision)  # diminue progressivement
            self.precision = min(self.precision + amelioration, 0.99)
            self.historique_entrainement.append(round(self.precision, 4))
            print(f"  Epoch {epoch+1}/{epochs}: précision = {self.precision:.4f}")
        
        self.est_entraine = True
        print(f"✅ Entraînement terminé ! Précision finale: {self.precision:.2%}")
    
    def predire(self, texte):
        """Génère une prédiction."""
        if not self.est_entraine:
            raise ValueError(f"Le modèle {self.nom} n'est pas encore entraîné !")
        
        return f"[{self.nom}] Analyse de: '{texte}' → Positif (confiance: {self.precision:.1%})"
    
    def afficher_info(self):
        """Affiche les informations du modèle."""
        print(f"╔══════════════════════════════════╗")
        print(f"  Modèle     : {self.nom}")
        print(f"  Paramètres : {self.nb_parametres:,}")
        print(f"  Précision  : {self.precision:.2%}")
        print(f"  Entraîné   : {'Oui' if self.est_entraine else 'Non'}")
        print(f"╚══════════════════════════════════╝")
    
    # Méthode spéciale : représentation en string
    def __str__(self):
        return f"ModeleIA(nom='{self.nom}', params={self.nb_parametres:,}, précision={self.precision:.2%})"
    
    def __repr__(self):
        return f"ModeleIA('{self.nom}', {self.nb_parametres}, {self.precision})"
    
    # Méthode de classe
    @classmethod
    def compter(cls):
        return f"Nombre total de modèles créés: {cls.nombre_modeles}"
    
    # Méthode statique (n'a pas accès à self ni cls)
    @staticmethod
    def taille_lisible(nb_params):
        if nb_params >= 1_000_000_000:
            return f"{nb_params / 1_000_000_000:.1f}B"
        elif nb_params >= 1_000_000:
            return f"{nb_params / 1_000_000:.1f}M"
        return f"{nb_params:,}"


# Créer des instances
mistral = ModeleIA("Mistral-7B", 7_000_000_000)
gpt = ModeleIA("GPT-4", 1_700_000_000_000, precision=0.92)

# Utiliser les méthodes
mistral.afficher_info()

# Entraîner
donnees_factices = list(range(1000))  # simulation
mistral.entrainer(donnees_factices, epochs=5)

# Prédire
print(mistral.predire("Ce film est absolument magnifique !"))

# Méthodes spéciales
print(str(gpt))
print(repr(mistral))
print(ModeleIA.compter())
print(ModeleIA.taille_lisible(7_000_000_000))  # "7.0B"
```

**Héritage — extends et spécialise une classe :**

```python
class LLM(ModeleIA):
    """Large Language Model — spécialisation de ModeleIA."""
    
    def __init__(self, nom, nb_parametres, contexte_max, tokenizer):
        # Appeler le constructeur parent
        super().__init__(nom, nb_parametres)
        
        # Attributs spécifiques aux LLMs
        self.contexte_max = contexte_max
        self.tokenizer = tokenizer
        self.nb_tokens_traites = 0
    
    def generer_texte(self, prompt, max_tokens=100):
        """Génère du texte à partir d'un prompt."""
        if not self.est_entraine:
            raise ValueError("Modèle non entraîné !")
        
        # Simulation de génération
        self.nb_tokens_traites += len(prompt.split()) + max_tokens
        return f"[{self.nom}] {prompt} ... [texte généré ici]"
    
    def afficher_info(self):
        # Appeler la méthode parent + ajouter des infos
        super().afficher_info()
        print(f"  Contexte   : {self.contexte_max:,} tokens")
        print(f"  Tokenizer  : {self.tokenizer}")


# Créer un LLM
claude = LLM("Claude-3", 70_000_000_000, 200_000, "SentencePiece")
claude.est_entraine = True  # Forcer pour la démo
claude.precision = 0.95

claude.afficher_info()
print(claude.generer_texte("Explique-moi l'IA en 3 mots"))

# Polymorphisme : isinstance() et issubclass()
print(isinstance(claude, LLM))       # True
print(isinstance(claude, ModeleIA))  # True aussi ! (héritage)
```

---

## SEMAINE 3 — Python Avancé pour la Data Science

### 1.1.7 — Gestion des Erreurs (Exceptions)

```python
def diviser(a, b):
    try:
        resultat = a / b
        return resultat
    except ZeroDivisionError:
        print("❌ Erreur : Division par zéro !")
        return None
    except TypeError as e:
        print(f"❌ Erreur de type : {e}")
        return None
    finally:
        # S'exécute TOUJOURS, même s'il y a une erreur
        print("✓ Opération terminée")

print(diviser(10, 2))   # 5.0
print(diviser(10, 0))   # Erreur + None
print(diviser(10, "a")) # Erreur + None

# Lever ses propres exceptions
def valider_precision(precision):
    if not 0 <= precision <= 1:
        raise ValueError(f"La précision doit être entre 0 et 1. Reçu: {precision}")
    return precision

try:
    valider_precision(1.5)
except ValueError as e:
    print(f"Valeur invalide: {e}")
```

### 1.1.8 — Modules et Packages

```python
# Importer un module
import math
print(math.pi)       # 3.14159...
print(math.sqrt(16)) # 4.0
print(math.log(100, 10)) # 2.0

# Importer avec alias (indispensable en data science)
import numpy as np          # convention universelle
import pandas as pd         # convention universelle
import matplotlib.pyplot as plt  # convention universelle

# Importer des fonctions spécifiques
from math import pi, sqrt, factorial
from collections import Counter, defaultdict

# collections.Counter — très utile pour analyser les données
texte = "le chat mange le poisson et le chien mange l'os"
mots = texte.split()
compteur = Counter(mots)
print(compteur.most_common(3))
# [('le', 3), ('mange', 2), ('chat', 1)]

# collections.defaultdict
from collections import defaultdict

groupes = defaultdict(list)
etudiants = [("Alice", "IA"), ("Bob", "ML"), ("Charlie", "IA"), ("Diana", "ML")]
for nom, groupe in etudiants:
    groupes[groupe].append(nom)

print(dict(groupes))
# {"IA": ["Alice", "Charlie"], "ML": ["Bob", "Diana"]}
```

### 1.1.9 — Itérateurs et Générateurs

Les générateurs sont essentiels pour traiter de **grandes quantités de données** sans saturer la mémoire.

```python
# Générateur avec yield
def charger_dataset_par_batch(dataset, taille_batch):
    """Génère des batchs de données sans charger tout en mémoire."""
    for i in range(0, len(dataset), taille_batch):
        batch = dataset[i:i + taille_batch]
        yield batch

# Simulation d'un dataset de 1000 exemples
dataset = list(range(1000))

# Traiter batch par batch (efficient en mémoire)
for batch in charger_dataset_par_batch(dataset, taille_batch=32):
    print(f"Traitement de {len(batch)} exemples...")
    # Ici on entraînerait le modèle sur ce batch
    break  # On arrête après le premier pour la démo

# Generator expression (comme list comprehension mais lazy)
nombres_carres = (n**2 for n in range(1_000_000))  # Ne calcule pas tout de suite !
# On accède aux valeurs une par une
print(next(nombres_carres))  # 0
print(next(nombres_carres))  # 1
print(next(nombres_carres))  # 4
```

---

## 🏋️ EXERCICES — CHAPITRE 1.1

### Exercice 1.1.A — Calcul de statistiques

Écris une fonction `statistiques(liste_nombres)` qui retourne un dictionnaire contenant : la moyenne, la médiane, le min, le max, et l'écart-type. N'utilise pas NumPy — fais tout à la main.

```python
def statistiques(nombres):
    # Ta solution ici
    pass

# Test
resultats = statistiques([85, 92, 78, 95, 68, 87, 74, 91])
print(resultats)
# Attendu: {'moyenne': 83.75, 'médiane': 86.0, 'min': 68, 'max': 95, 'écart_type': ...}
```

**Solution commentée :**

```python
def statistiques(nombres):
    """Calcule les statistiques descriptives d'une liste de nombres."""
    if not nombres:
        raise ValueError("La liste ne peut pas être vide")
    
    n = len(nombres)
    
    # Moyenne
    moyenne = sum(nombres) / n
    
    # Médiane (tri + sélection du milieu)
    tries = sorted(nombres)
    if n % 2 == 0:  # pair → moyenne des 2 du milieu
        mediane = (tries[n//2 - 1] + tries[n//2]) / 2
    else:           # impair → valeur du milieu
        mediane = tries[n//2]
    
    # Écart-type = racine carrée de la variance
    variance = sum((x - moyenne)**2 for x in nombres) / n
    ecart_type = variance ** 0.5
    
    return {
        "n": n,
        "moyenne": round(moyenne, 4),
        "médiane": mediane,
        "min": min(nombres),
        "max": max(nombres),
        "étendue": max(nombres) - min(nombres),
        "écart_type": round(ecart_type, 4)
    }

# Test
resultats = statistiques([85, 92, 78, 95, 68, 87, 74, 91])
for cle, val in resultats.items():
    print(f"  {cle}: {val}")
```

---

### Exercice 1.1.B — Analyseur de texte

Écris une classe `AnalyseurTexte` qui prend un texte en entrée et fournit des méthodes pour : compter les mots, trouver les 5 mots les plus fréquents, compter les phrases, calculer la "lisibilité" approximative (mots par phrase).

```python
from collections import Counter

class AnalyseurTexte:
    def __init__(self, texte):
        self.texte = texte
        self.mots = self._tokeniser()
    
    def _tokeniser(self):
        """Découpe le texte en mots propres."""
        import re
        mots_bruts = re.findall(r'\b[a-zàâçéèêëîïôùûüÿæœA-ZÀÂÇÉÈÊËÎÏÔÙÛÜŸÆŒ]+\b', 
                                self.texte.lower())
        return mots_bruts
    
    def nb_mots(self):
        return len(self.mots)
    
    def mots_frequents(self, n=5):
        # Exclure les mots vides
        mots_vides = {"le", "la", "les", "un", "une", "des", "de", "du", 
                      "et", "en", "à", "au", "est", "que", "qui"}
        mots_filtres = [m for m in self.mots if m not in mots_vides]
        return Counter(mots_filtres).most_common(n)
    
    def nb_phrases(self):
        import re
        phrases = re.split(r'[.!?]+', self.texte.strip())
        return len([p for p in phrases if p.strip()])
    
    def score_lisibilite(self):
        """Mots par phrase — plus le score est bas, plus c'est lisible."""
        nb_p = self.nb_phrases()
        if nb_p == 0:
            return 0
        return round(self.nb_mots() / nb_p, 1)
    
    def rapport(self):
        print("═" * 40)
        print(" RAPPORT D'ANALYSE DU TEXTE")
        print("═" * 40)
        print(f"  Mots totaux   : {self.nb_mots()}")
        print(f"  Phrases       : {self.nb_phrases()}")
        print(f"  Mots/phrase   : {self.score_lisibilite()}")
        print(f"  Mots fréquents:")
        for mot, count in self.mots_frequents():
            print(f"    - {mot}: {count} fois")
        print("═" * 40)

# Test
texte_test = """
L'intelligence artificielle révolutionne notre monde. Les modèles de langage 
comme GPT et Claude transforment la façon dont nous travaillons. L'IA générative 
permet de créer du texte, des images et du code automatiquement. Cette révolution 
technologique ouvre de nouvelles possibilités dans tous les domaines.
"""

analyseur = AnalyseurTexte(texte_test)
analyseur.rapport()
```

---

### 🎯 MINI-PROJET 1.1 — Système de Suivi de Formation IA

Crée un programme complet de suivi de formation avec :
- Une classe `Etudiant` avec nom, modules complétés, scores
- Une classe `Module` avec titre, durée, exercices
- Une classe `Formation` qui gère les étudiants et modules
- Sauvegarde et chargement en JSON
- Affichage d'un rapport de progression

```python
import json
import datetime
from collections import defaultdict

class Module:
    def __init__(self, id, titre, duree_semaines, prerequis=None):
        self.id = id
        self.titre = titre
        self.duree_semaines = duree_semaines
        self.prerequis = prerequis or []
    
    def __str__(self):
        return f"Module {self.id}: {self.titre} ({self.duree_semaines} semaines)"


class Etudiant:
    def __init__(self, nom, date_debut=None):
        self.nom = nom
        self.date_debut = date_debut or datetime.date.today().isoformat()
        self.modules_completes = {}   # {module_id: score}
        self.notes = []               # Notes personnelles
    
    def completer_module(self, module_id, score):
        """Marque un module comme complété avec un score (0-100)."""
        if not 0 <= score <= 100:
            raise ValueError("Le score doit être entre 0 et 100")
        self.modules_completes[module_id] = {
            "score": score,
            "date": datetime.date.today().isoformat()
        }
    
    def moyenne(self):
        """Calcule la moyenne des scores."""
        if not self.modules_completes:
            return 0
        scores = [m["score"] for m in self.modules_completes.values()]
        return round(sum(scores) / len(scores), 1)
    
    def ajouter_note(self, note):
        self.notes.append({
            "texte": note,
            "date": datetime.date.today().isoformat()
        })
    
    def to_dict(self):
        return {
            "nom": self.nom,
            "date_debut": self.date_debut,
            "modules_completes": self.modules_completes,
            "notes": self.notes
        }
    
    @classmethod
    def from_dict(cls, data):
        etudiant = cls(data["nom"], data["date_debut"])
        etudiant.modules_completes = data["modules_completes"]
        etudiant.notes = data["notes"]
        return etudiant


class Formation:
    def __init__(self, titre):
        self.titre = titre
        self.modules = {}
        self.etudiants = {}
    
    def ajouter_module(self, module):
        self.modules[module.id] = module
    
    def inscrire_etudiant(self, etudiant):
        self.etudiants[etudiant.nom] = etudiant
    
    def sauvegarder(self, fichier="formation.json"):
        data = {
            "titre": self.titre,
            "modules": {
                id: {"titre": m.titre, "duree": m.duree_semaines}
                for id, m in self.modules.items()
            },
            "etudiants": {
                nom: e.to_dict()
                for nom, e in self.etudiants.items()
            }
        }
        with open(fichier, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"✅ Formation sauvegardée dans {fichier}")
    
    def rapport(self, nom_etudiant=None):
        print(f"\n{'═'*50}")
        print(f"  {self.titre.upper()}")
        print(f"{'═'*50}")
        
        etudiants = ([self.etudiants[nom_etudiant]] 
                     if nom_etudiant else self.etudiants.values())
        
        for etudiant in etudiants:
            progression = len(etudiant.modules_completes) / max(len(self.modules), 1)
            barre = "█" * int(progression * 20) + "░" * (20 - int(progression * 20))
            
            print(f"\n  👤 {etudiant.nom}")
            print(f"  📅 Début: {etudiant.date_debut}")
            print(f"  📊 Progression: [{barre}] {progression:.0%}")
            print(f"  ⭐ Moyenne: {etudiant.moyenne()}/100")
            
            if etudiant.modules_completes:
                print(f"  ✅ Modules complétés:")
                for mod_id, info in etudiant.modules_completes.items():
                    nom_module = self.modules.get(mod_id, type('', (), {'titre': 'Inconnu'})()).titre
                    mention = "🥇" if info['score'] >= 90 else ("🥈" if info['score'] >= 75 else "🥉")
                    print(f"     {mention} {nom_module}: {info['score']}/100")
        
        print(f"{'═'*50}")


# --- Utilisation ---
# Créer la formation
formation = Formation("Formation IA — De Zéro à Expert")

# Ajouter les modules
modules = [
    Module("M1", "Python & Outils", 9),
    Module("M2", "Mathématiques pour l'IA", 8, ["M1"]),
    Module("M3", "Machine Learning", 6, ["M1", "M2"]),
    Module("M4", "Deep Learning", 8, ["M3"]),
    Module("M5", "NLP & LLMs", 6, ["M4"]),
]
for m in modules:
    formation.ajouter_module(m)

# Inscrire des étudiants
etudiant1 = Etudiant("Nasreddine")
etudiant1.completer_module("M1", 87)
etudiant1.completer_module("M2", 79)
etudiant1.ajouter_note("Excellent cours de maths, je dois revoir les probabilités")

etudiant2 = Etudiant("Aïcha")
etudiant2.completer_module("M1", 95)

formation.inscrire_etudiant(etudiant1)
formation.inscrire_etudiant(etudiant2)

# Afficher le rapport
formation.rapport()

# Sauvegarder
formation.sauvegarder()
```

---

---

# 📘 CHAPITRE 1.2 — NUMPY : LE CALCUL VECTORIEL

## Durée : 1 semaine

---

## Pourquoi NumPy est-il indispensable ?

Toute l'IA repose sur des **opérations matricielles** :
- Les données = matrices (tableaux de chiffres)
- Les poids d'un réseau de neurones = matrices
- Les embeddings = vecteurs
- La multiplication de couches = produits matriciels

NumPy exécute ces opérations **en C compilé**, 50 à 100 fois plus vite que Python pur.

```python
import time
import numpy as np

# Comparer Python pur vs NumPy
taille = 1_000_000

# Python pur
liste = list(range(taille))
debut = time.time()
carre_python = [x**2 for x in liste]
print(f"Python: {time.time() - debut:.3f}s")

# NumPy
array = np.arange(taille)
debut = time.time()
carre_numpy = array ** 2
print(f"NumPy: {time.time() - debut:.3f}s")

# NumPy est ~50x plus rapide !
```

---

### 1.2.1 — Créer des Arrays

```python
import numpy as np

# Depuis une liste Python
vecteur = np.array([1, 2, 3, 4, 5])
matrice = np.array([[1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]])

print(vecteur.shape)   # (5,)    → vecteur à 5 éléments
print(matrice.shape)   # (3, 3)  → matrice 3x3
print(vecteur.dtype)   # int64   → type des données
print(vecteur.ndim)    # 1       → 1 dimension
print(matrice.ndim)    # 2       → 2 dimensions
print(matrice.size)    # 9       → nombre total d'éléments

# Fonctions de création
zeros = np.zeros((3, 4))          # Matrice 3x4 de zéros
uns = np.ones((2, 3))             # Matrice 2x3 de uns
identite = np.eye(4)              # Matrice identité 4x4
aleatoire = np.random.rand(3, 3) # Valeurs aléatoires U[0,1]
normal = np.random.randn(3, 3)   # Distribution normale N(0,1)
intervalle = np.arange(0, 10, 2) # [0, 2, 4, 6, 8]
lineaire = np.linspace(0, 1, 5)  # [0, 0.25, 0.5, 0.75, 1] — 5 pts équidistants
```

**Les dtypes — le type des données stockées :**

```python
# En IA, le dtype est crucial pour la mémoire et la performance
entiers = np.array([1, 2, 3], dtype=np.int32)     # 4 octets par élément
flottants = np.array([1.0, 2.0], dtype=np.float32) # 4 octets (PyTorch par défaut)
doubles = np.array([1.0, 2.0], dtype=np.float64)   # 8 octets (NumPy par défaut)
bool_arr = np.array([True, False, True], dtype=bool)

# Convertir
x = np.array([1, 2, 3])
x_float = x.astype(np.float32)

# Mémoire utilisée
print(f"float32: {np.zeros((1000, 1000), dtype=np.float32).nbytes / 1e6:.1f} MB")
print(f"float64: {np.zeros((1000, 1000), dtype=np.float64).nbytes / 1e6:.1f} MB")
# float32: 4.0 MB → float64: 8.0 MB
# (C'est pour ça que les modèles IA utilisent float32 ou même float16 !)
```

---

### 1.2.2 — Indexation et Slicing

```python
# Vecteur
v = np.array([10, 20, 30, 40, 50, 60, 70, 80, 90])

print(v[0])       # 10  → premier élément
print(v[-1])      # 90  → dernier élément
print(v[2:6])     # [30, 40, 50, 60]
print(v[::2])     # [10, 30, 50, 70, 90] → un sur deux
print(v[::-1])    # [90, 80, ... 10]     → inversé

# Matrice (2D)
M = np.array([[1,  2,  3,  4],
              [5,  6,  7,  8],
              [9,  10, 11, 12]])

print(M[0])        # [1, 2, 3, 4]    → première ligne
print(M[:, 0])     # [1, 5, 9]       → première colonne
print(M[1, 2])     # 7               → ligne 1, colonne 2
print(M[0:2, 1:3]) # [[2,3],[6,7]]   → sous-matrice

# Indexation booléenne — TRÈS utilisée en data science
scores = np.array([85, 92, 73, 95, 68, 88, 79])
bons_scores = scores[scores >= 80]  # [85, 92, 95, 88]
print(bons_scores)

# Où sont les bons scores ?
indices = np.where(scores >= 80)    # (array([0, 1, 3, 5]),)
print(scores[indices])

# Indexation avancée : sélectionner des lignes spécifiques
data = np.random.rand(10, 4)       # 10 exemples, 4 features
indices_voulus = [0, 3, 7, 9]
subset = data[indices_voulus]      # 4 exemples sélectionnés
```

---

### 1.2.3 — Opérations Mathématiques

```python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Opérations élémentaires (element-wise)
print(A + B)    # [[6,8],[10,12]]  → addition terme à terme
print(A * B)    # [[5,12],[21,32]] → multiplication terme à terme
print(A ** 2)   # [[1,4],[9,16]]   → carré terme à terme

# Produit matriciel (DOT PRODUCT) — LA base du Deep Learning
print(A @ B)           # Notation moderne (Python 3.5+)
print(np.dot(A, B))    # Alternative

# Résultat :
# [[1*5+2*7, 1*6+2*8], = [[19, 22],
#  [3*5+4*7, 3*6+4*8]]    [43, 50]]

# Opérations sur les axes
data = np.array([[1, 2, 3],
                 [4, 5, 6],
                 [7, 8, 9]])

print(data.sum())          # 45   → somme de tous les éléments
print(data.sum(axis=0))    # [12, 15, 18] → somme par colonne
print(data.sum(axis=1))    # [6, 15, 24]  → somme par ligne
print(data.mean(axis=0))   # [4., 5., 6.] → moyenne par colonne
print(data.std(axis=1))    # écart-type par ligne

# Fonctions universelles (ufuncs) — appliquées élément par élément
x = np.array([0, np.pi/4, np.pi/2, np.pi])
print(np.sin(x))           # [0, 0.707, 1, 0]
print(np.exp([0, 1, 2]))   # [1, 2.718, 7.389]
print(np.log([1, np.e]))   # [0, 1]
print(np.sqrt([4, 9, 16])) # [2, 3, 4]
print(np.abs([-3, -1, 2])) # [3, 1, 2]

# Softmax (très utilisé en IA)
def softmax(x):
    """Convertit des scores en probabilités qui somment à 1."""
    e_x = np.exp(x - np.max(x))  # Stabilité numérique (soustraction du max)
    return e_x / e_x.sum()

logits = np.array([2.0, 1.0, 0.1])  # Scores bruts d'un modèle
probas = softmax(logits)
print(probas)              # [0.659, 0.242, 0.099]
print(probas.sum())        # 1.0 — elles somment à 1 !
```

---

### 1.2.4 — Broadcasting — La Magie de NumPy

Le broadcasting permet d'effectuer des opérations entre tableaux de **formes différentes** sans copier les données.

```python
# Normaliser un dataset (centrer et réduire)
# Sans broadcasting, il faudrait écrire des boucles
data = np.array([[1, 2, 3],
                 [4, 5, 6],
                 [7, 8, 9]], dtype=float)

# Calculer la moyenne et l'écart-type par colonne
moyenne = data.mean(axis=0)   # [4., 5., 6.]
std = data.std(axis=0)        # [2.449, 2.449, 2.449]

# Broadcasting : moyenne a shape (3,), data a shape (3,3)
# NumPy "étire" automatiquement moyenne pour qu'elle corresponde
data_normalisee = (data - moyenne) / std
print(data_normalisee)
# [[-1.22, -1.22, -1.22],
#  [ 0.  ,  0.  ,  0.  ],
#  [ 1.22,  1.22,  1.22]]

# Exemple : ajouter un biais à toutes les lignes
W = np.random.randn(4, 3)  # Matrice poids : 4 neurones, 3 features
b = np.array([0.1, 0.2, 0.3, 0.4])  # Biais : 1 par neurone

# Sans broadcasting : on devrait faire une boucle sur les lignes
# Avec broadcasting : automatique !
X = np.random.randn(100, 3)  # 100 exemples, 3 features
sortie = X @ W.T + b         # shape: (100, 4) — une couche neuronale !
```

---

### 1.2.5 — Algèbre Linéaire avec NumPy

```python
from numpy import linalg as LA

A = np.array([[4, 2], [2, 3]])

# Opérations fondamentales
print(LA.det(A))        # Déterminant = 8.0
print(LA.inv(A))        # Matrice inverse
print(LA.norm(A))       # Norme de Frobenius

# Transposée
print(A.T)
print(A.transpose())    # Identique

# Valeurs propres et vecteurs propres (utiles pour PCA)
valeurs, vecteurs = LA.eig(A)
print("Valeurs propres:", valeurs)
print("Vecteurs propres:", vecteurs)

# Résolution de système linéaire Ax = b
# Exemple : trouver x tel que Ax = b
b = np.array([8, 5])
x = LA.solve(A, b)
print(f"Solution: {x}")
print(f"Vérification: {A @ x}")  # Doit être égal à b

# Décomposition SVD (utilisée en compression et recommandation)
U, S, Vt = LA.svd(A)
# Reconstruction : A ≈ U @ np.diag(S) @ Vt
```

---

### 1.2.6 — Manipulation de Formes

```python
# reshape — changer la forme sans copier les données
x = np.arange(12)         # [0, 1, 2, ..., 11]
print(x.shape)            # (12,)

M = x.reshape(3, 4)       # Matrice 3x4
print(M.shape)            # (3, 4)

cube = x.reshape(2, 2, 3) # Tenseur 3D (2, 2, 3)
print(cube.shape)         # (2, 2, 3)

# -1 dans reshape → NumPy calcule automatiquement
M2 = x.reshape(-1, 4)     # (3, 4) → -1 est inféré comme 3
M3 = x.reshape(3, -1)     # (3, 4) → -1 est inféré comme 4

# flatten() → met tout en 1D (crée une copie)
print(M.flatten().shape)  # (12,)

# ravel() → met en 1D (vue si possible)
print(M.ravel().shape)    # (12,)

# Ajouter/supprimer des dimensions
v = np.array([1, 2, 3])
print(v.shape)                    # (3,)

v_colonne = v[:, np.newaxis]      # (3, 1) → vecteur colonne
v_ligne = v[np.newaxis, :]        # (1, 3) → vecteur ligne

# Équivalent avec expand_dims
v_colonne2 = np.expand_dims(v, axis=1)   # (3, 1)
v_squeeze = np.squeeze(v_colonne)        # Enlève les dims de taille 1 → (3,)

# Concaténer des arrays
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

horizontal = np.hstack([A, B])           # [[1,2,5,6],[3,4,7,8]] → (2,4)
vertical = np.vstack([A, B])             # [[1,2],[3,4],[5,6],[7,8]] → (4,2)
concat0 = np.concatenate([A, B], axis=0) # Identique à vstack
concat1 = np.concatenate([A, B], axis=1) # Identique à hstack
```

---

### 1.2.7 — Nombres Aléatoires et Reproductibilité

La **graine aléatoire** (seed) est essentielle en IA pour reproduire tes expériences.

```python
# Fixer la seed → résultats reproductibles
np.random.seed(42)  # Le 42 est la convention, mais n'importe quel entier marche

# Distributions
uniforme = np.random.rand(5)          # U[0, 1]
normal = np.random.randn(5)           # N(0, 1)
entiers = np.random.randint(0, 10, 5) # Entiers aléatoires entre 0 et 9
choix = np.random.choice([1,2,3,4,5], size=3, replace=False)  # Choisir sans remise

# Mélanger un array
data = np.arange(10)
np.random.shuffle(data)  # Mélange sur place
print(data)              # Résultat reproductible avec seed=42

# Générateur moderne (recommandé)
rng = np.random.default_rng(seed=42)
X = rng.normal(loc=0, scale=1, size=(100, 10))  # 100 exemples, 10 features

# Créer un dataset synthétique
def creer_dataset(n_exemples, n_features, n_classes):
    np.random.seed(42)
    X = np.random.randn(n_exemples, n_features)
    y = np.random.randint(0, n_classes, n_exemples)
    return X, y

X, y = creer_dataset(1000, 10, 3)
print(f"Dataset: {X.shape} exemples, {len(np.unique(y))} classes")
```

---

## 🏋️ EXERCICES — CHAPITRE 1.2

### Exercice 1.2.A — Régression Linéaire from Scratch avec NumPy

Implémente la régression linéaire avec la formule analytique :
`θ = (X^T · X)^-1 · X^T · y`

```python
import numpy as np
import matplotlib.pyplot as plt

def regression_lineaire(X, y):
    """
    Calcule les paramètres optimaux de régression linéaire.
    
    Formule des moindres carrés ordinaires (OLS) :
    θ = (X^T X)^{-1} X^T y
    
    Arguments:
        X: array (n_exemples, n_features)
        y: array (n_exemples,)
    
    Returns:
        theta: paramètres optimaux (n_features,)
    """
    # Ajouter une colonne de 1 pour le biais (intercept)
    n = X.shape[0]
    X_augmente = np.hstack([np.ones((n, 1)), X.reshape(-1, 1)])
    
    # Formule analytique
    theta = np.linalg.inv(X_augmente.T @ X_augmente) @ X_augmente.T @ y
    
    return theta

def predire(X, theta):
    """Prédit les valeurs avec les paramètres theta."""
    n = len(X)
    X_aug = np.hstack([np.ones((n, 1)), X.reshape(-1, 1)])
    return X_aug @ theta

def rmse(y_vrai, y_pred):
    """Root Mean Squared Error."""
    return np.sqrt(np.mean((y_vrai - y_pred) ** 2))

# Générer des données synthétiques
np.random.seed(42)
n = 100
X = np.linspace(0, 10, n)
y = 3 * X + 7 + np.random.randn(n) * 2  # y = 3x + 7 + bruit

# Diviser en train/test
split = int(0.8 * n)
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

# Entraîner
theta = regression_lineaire(X_train, y_train)
print(f"Paramètres trouvés : intercept={theta[0]:.2f}, pente={theta[1]:.2f}")
print(f"Vrais paramètres   : intercept=7.00, pente=3.00")

# Évaluer
y_pred_train = predire(X_train, theta)
y_pred_test = predire(X_test, theta)
print(f"RMSE train : {rmse(y_train, y_pred_train):.4f}")
print(f"RMSE test  : {rmse(y_test, y_pred_test):.4f}")

# Visualiser
plt.figure(figsize=(10, 6))
plt.scatter(X_train, y_train, alpha=0.5, label="Train", color="blue")
plt.scatter(X_test, y_test, alpha=0.5, label="Test", color="green")
x_plot = np.linspace(0, 10, 100)
plt.plot(x_plot, predire(x_plot, theta), "r-", linewidth=2, label="Régression")
plt.legend()
plt.title("Régression Linéaire from Scratch avec NumPy")
plt.xlabel("X")
plt.ylabel("y")
plt.grid(True, alpha=0.3)
plt.show()
```

---

---

# 📘 CHAPITRE 1.3 — PANDAS : LA MANIPULATION DE DONNÉES

## Durée : 1 semaine

---

## Philosophie de Pandas

Pandas est le couteau suisse de la data science. Son objet central, le **DataFrame**, est une table de données similaire à une feuille Excel, mais programmable, ultra-rapide et capable de gérer des millions de lignes.

**Deux structures principales :**
- `Series` → une colonne (1D)
- `DataFrame` → une table entière (2D)

---

### 1.3.1 — Créer et Charger des DataFrames

```python
import pandas as pd
import numpy as np

# Créer depuis un dictionnaire
df = pd.DataFrame({
    "nom": ["Alice", "Bob", "Charlie", "Diana", "Eve"],
    "age": [28, 34, 22, 45, 31],
    "niveau": ["avancé", "intermédiaire", "débutant", "expert", "intermédiaire"],
    "score": [92.5, 78.3, 65.1, 97.8, 81.2],
    "completé": [True, True, False, True, True]
})

print(df)
print(df.shape)       # (5, 5) → 5 lignes, 5 colonnes
print(df.dtypes)      # Types de chaque colonne
print(df.info())      # Résumé complet
print(df.describe())  # Statistiques descriptives des colonnes numériques

# Charger depuis un fichier (les plus courants)
# CSV
df_csv = pd.read_csv("données.csv", sep=",", encoding="utf-8")

# Excel
df_excel = pd.read_excel("données.xlsx", sheet_name="Feuille1")

# JSON
df_json = pd.read_json("données.json")

# Options importantes de read_csv
df_complet = pd.read_csv(
    "données.csv",
    sep=";",                     # Séparateur (virgule par défaut)
    encoding="utf-8",            # Encodage
    header=0,                    # Ligne des en-têtes (0 = première)
    index_col="id",              # Colonne à utiliser comme index
    usecols=["nom", "score"],    # Seulement ces colonnes
    nrows=1000,                  # Seulement les 1000 premières lignes
    na_values=["N/A", "?", ""]  # Valeurs considérées comme NaN
)
```

---

### 1.3.2 — Exploration des Données (EDA)

L'EDA (Exploratory Data Analysis) est **la première étape obligatoire** sur tout nouveau dataset.

```python
# Aperçu
print(df.head())         # 5 premières lignes (par défaut)
print(df.tail(3))        # 3 dernières lignes
print(df.sample(3))      # 3 lignes aléatoires

# Structure
print(df.shape)          # (nb_lignes, nb_colonnes)
print(df.columns.tolist()) # Liste des colonnes
print(df.index)          # Index (souvent 0,1,2,...)
print(df.dtypes)         # Type de chaque colonne

# Statistiques
print(df.describe())     # count, mean, std, min, 25%, 50%, 75%, max
print(df.describe(include="all"))  # Include aussi les catégorielles

# Valeurs manquantes (TRÈS important !)
print(df.isnull().sum())  # Nombre de NaN par colonne
print(df.isnull().mean()) # % de NaN par colonne

# Valeurs uniques
print(df["niveau"].unique())   # Valeurs uniques de la colonne
print(df["niveau"].value_counts())  # Fréquence de chaque valeur
print(df["niveau"].nunique())  # Nombre de valeurs uniques

# Corrélations (entre colonnes numériques)
print(df.corr())
print(df[["age", "score"]].corr())
```

---

### 1.3.3 — Sélection et Filtrage

```python
# Sélectionner une colonne → retourne une Series
ages = df["age"]
print(type(ages))   # <class 'pandas.core.series.Series'>

# Sélectionner plusieurs colonnes → retourne un DataFrame
subset = df[["nom", "score"]]

# loc[] → sélection par labels (nom de ligne/colonne)
# iloc[] → sélection par position (entiers)
print(df.loc[0])               # Ligne avec index 0
print(df.loc[0:2, "nom":"score"])  # Lignes 0 à 2, colonnes "nom" à "score"
print(df.iloc[0])              # Première ligne (position 0)
print(df.iloc[0:3, 0:3])       # 3 premières lignes, 3 premières colonnes
print(df.iloc[-1])             # Dernière ligne

# Filtrage booléen
adultes = df[df["age"] >= 30]
avances = df[df["niveau"] == "avancé"]
bons_et_jeunes = df[(df["score"] > 80) & (df["age"] < 35)]
plusieurs_niveaux = df[df["niveau"].isin(["avancé", "expert"])]

# Méthode query (plus lisible pour des filtres complexes)
resultat = df.query("score > 80 and age < 40")
resultat2 = df.query("niveau in ['avancé', 'expert']")
```

---

### 1.3.4 — Nettoyage des Données

Le nettoyage de données représente **60 à 80% du travail réel** en data science.

```python
# Simuler un dataset sale
df_sale = pd.DataFrame({
    "nom": ["Alice", "Bob", None, "Diana", "Bob"],
    "age": [28, -5, 22, 150, 34],      # -5 et 150 sont invalides
    "salaire": [50000, None, 30000, 80000, None],
    "email": ["alice@mail.fr", "bob@mail.com", "invalide", "diana@mail.fr", "bob@mail.com"]
})

# ── VALEURS MANQUANTES ──────────────────────────────

# Identifier
print(df_sale.isnull().sum())

# Supprimer les lignes avec des NaN
df_propre = df_sale.dropna()

# Supprimer seulement si certaines colonnes sont NaN
df_propre2 = df_sale.dropna(subset=["nom"])

# Remplir avec une valeur fixe
df_sale["salaire"].fillna(0)

# Remplir avec la médiane (recommandé pour les numériques)
mediane_salaire = df_sale["salaire"].median()
df_sale["salaire"] = df_sale["salaire"].fillna(mediane_salaire)

# Remplir avec la valeur précédente (pour des séries temporelles)
df_sale["salaire"] = df_sale["salaire"].fillna(method="ffill")

# ── DOUBLONS ────────────────────────────────────────

# Identifier
print(df_sale.duplicated())         # Ligne dupliquée ?
print(df_sale.duplicated(subset=["nom"]))  # Doublon sur la colonne "nom"

# Supprimer
df_sans_doublons = df_sale.drop_duplicates()
df_sans_doublons2 = df_sale.drop_duplicates(subset=["email"], keep="first")

# ── VALEURS ABERRANTES ──────────────────────────────

# Méthode 1 : Filtrage direct
df_sale = df_sale[(df_sale["age"] >= 0) & (df_sale["age"] <= 120)]

# Méthode 2 : IQR (Interquartile Range)
def supprimer_aberrants(df, colonne):
    Q1 = df[colonne].quantile(0.25)
    Q3 = df[colonne].quantile(0.75)
    IQR = Q3 - Q1
    borne_inf = Q1 - 1.5 * IQR
    borne_sup = Q3 + 1.5 * IQR
    return df[(df[colonne] >= borne_inf) & (df[colonne] <= borne_sup)]

# ── TYPES DE DONNÉES ─────────────────────────────────

# Convertir en numérique (avec gestion des erreurs)
df_sale["age"] = pd.to_numeric(df_sale["age"], errors="coerce")

# Convertir en catégorie (économise la mémoire pour peu de valeurs uniques)
df["niveau"] = df["niveau"].astype("category")

# Convertir en datetime
# df["date"] = pd.to_datetime(df["date"], format="%d/%m/%Y")
```

---

### 1.3.5 — Transformation et Ingénierie de Features

```python
# apply() → appliquer une fonction à chaque élément
df["nom_majuscule"] = df["nom"].apply(str.upper)
df["score_lettre"] = df["score"].apply(lambda s: "A" if s >= 90 else ("B" if s >= 80 else "C"))

# map() → remplacer des valeurs selon un dictionnaire
correspondances = {"débutant": 1, "intermédiaire": 2, "avancé": 3, "expert": 4}
df["niveau_num"] = df["niveau"].map(correspondances)

# Créer de nouvelles colonnes
df["age_groupe"] = pd.cut(df["age"],
                          bins=[0, 25, 35, 50, 100],
                          labels=["jeune", "adulte", "senior", "vétéran"])

df["score_normalise"] = (df["score"] - df["score"].min()) / (df["score"].max() - df["score"].min())

# Opérations sur les chaînes (Series.str)
df["prenom"] = df["nom"].str.lower().str.strip()
df["longueur_nom"] = df["nom"].str.len()
df["contient_a"] = df["nom"].str.contains("a", case=False)

# Groupby → INCONTOURNABLE pour analyser des sous-groupes
groupes = df.groupby("niveau")
print(groupes["score"].mean())       # Moyenne par niveau
print(groupes["score"].agg(["mean", "std", "count"]))  # Plusieurs stats

# Groupby sur plusieurs colonnes
stats = df.groupby(["niveau", "completé"]).agg({
    "score": ["mean", "std"],
    "age": "mean"
}).round(2)

# Pivot table (comme Excel)
pivot = df.pivot_table(
    values="score",
    index="niveau",
    columns="completé",
    aggfunc="mean"
)
```

---

### 1.3.6 — Merge et Join (Fusionner des DataFrames)

```python
# Deux tables liées
etudiants = pd.DataFrame({
    "etudiant_id": [1, 2, 3, 4, 5],
    "nom": ["Alice", "Bob", "Charlie", "Diana", "Eve"],
    "formation_id": [101, 102, 101, 103, 102]
})

formations = pd.DataFrame({
    "formation_id": [101, 102, 103, 104],
    "titre": ["IA Débutant", "ML Avancé", "Deep Learning", "NLP Expert"],
    "duree_semaines": [8, 12, 16, 10]
})

# INNER JOIN → seulement les correspondances
inner = pd.merge(etudiants, formations, on="formation_id", how="inner")

# LEFT JOIN → tous les étudiants, même sans formation
left = pd.merge(etudiants, formations, on="formation_id", how="left")

# Concaténer des DataFrames (empiler)
batch1 = pd.DataFrame({"val": [1, 2, 3]})
batch2 = pd.DataFrame({"val": [4, 5, 6]})
total = pd.concat([batch1, batch2], ignore_index=True)
```

---

### 1.3.7 — Pipeline Complet : Analyse du Dataset Titanic

Le Titanic est le dataset de référence pour apprendre la data science.

```python
import pandas as pd
import numpy as np

# Tu peux télécharger ce dataset sur Kaggle ou depuis l'URL suivante :
# URL fictive — en pratique, utilise le dataset Kaggle Titanic

# Simulation du dataset Titanic (structure réelle)
np.random.seed(42)
n = 891

df = pd.DataFrame({
    "PassengerId": range(1, n+1),
    "Survived": np.random.randint(0, 2, n),
    "Pclass": np.random.choice([1, 2, 3], n, p=[0.24, 0.21, 0.55]),
    "Name": [f"Passenger_{i}" for i in range(n)],
    "Sex": np.random.choice(["male", "female"], n, p=[0.65, 0.35]),
    "Age": np.where(np.random.rand(n) > 0.2,
                    np.random.normal(30, 15, n).clip(1, 80),
                    np.nan),
    "SibSp": np.random.randint(0, 5, n),
    "Parch": np.random.randint(0, 4, n),
    "Fare": np.random.exponential(30, n),
    "Embarked": np.random.choice(["C", "Q", "S", None], n, p=[0.19, 0.09, 0.72, 0.005])
})

print("="*50)
print("1. EXPLORATION INITIALE")
print("="*50)
print(f"Dimensions: {df.shape}")
print(f"\nAperçu:\n{df.head()}")
print(f"\nValeurs manquantes:\n{df.isnull().sum()}")
print(f"\nStatistiques:\n{df.describe()}")

print("\n" + "="*50)
print("2. NETTOYAGE")
print("="*50)
# Remplir l'âge avec la médiane par classe
df["Age"] = df.groupby("Pclass")["Age"].transform(lambda x: x.fillna(x.median()))
df["Embarked"] = df["Embarked"].fillna("S")  # Mode
print(f"NaN restants: {df.isnull().sum().sum()}")

print("\n" + "="*50)
print("3. FEATURE ENGINEERING")
print("="*50)
df["FamilleSize"] = df["SibSp"] + df["Parch"] + 1  # Taille de la famille
df["Seul"] = (df["FamilleSize"] == 1).astype(int)   # Est-il seul ?
df["Age_groupe"] = pd.cut(df["Age"],
                          bins=[0, 12, 18, 35, 60, 100],
                          labels=["enfant", "ado", "adulte", "mûr", "senior"])

# Encoder le sexe
df["Sex_num"] = (df["Sex"] == "female").astype(int)  # 1=femme, 0=homme

print(df[["Age_groupe", "Seul", "FamilleSize"]].head(10))

print("\n" + "="*50)
print("4. ANALYSE PAR GROUPES")
print("="*50)
print("\nTaux de survie par classe:")
print(df.groupby("Pclass")["Survived"].mean().mul(100).round(1).astype(str) + "%")

print("\nTaux de survie par sexe:")
print(df.groupby("Sex")["Survived"].mean().mul(100).round(1).astype(str) + "%")

print("\nTaux de survie par tranche d'âge:")
print(df.groupby("Age_groupe")["Survived"].mean().mul(100).round(1))
```

---

## 🏋️ EXERCICES — CHAPITRE 1.3

### Exercice 1.3.A — Analyse d'un Dataset IA

Crée un DataFrame représentant 50 modèles IA avec : nom, nb_paramètres, date_sortie, score_mmlu, score_humaneval, open_source, entreprise.

Effectue :
1. Les statistiques descriptives
2. Le taux de modèles open-source
3. La corrélation entre paramètres et performance
4. Le classement des 10 meilleurs modèles par score MMLU
5. La performance moyenne par entreprise

**Solution commentée :**

```python
import numpy as np
import pandas as pd

np.random.seed(42)
n = 50

entreprises = ["OpenAI", "Anthropic", "Google", "Meta", "Mistral AI"]
dataset = pd.DataFrame({
    "nom": [f"Modele-{i:02d}" for i in range(n)],
    "nb_parametres_B": np.round(np.random.exponential(30, n), 1).clip(1, 500),
    "date_sortie": pd.to_datetime(
        np.random.choice(pd.date_range("2022-01-01", "2026-01-01"), n)
    ),
    "score_mmlu": np.round(np.random.normal(0.75, 0.1, n).clip(0.4, 0.98), 3),
    "score_humaneval": np.round(np.random.normal(0.65, 0.15, n).clip(0.2, 0.95), 3),
    "open_source": np.random.choice([True, False], n, p=[0.4, 0.6]),
    "entreprise": np.random.choice(entreprises, n)
})

# 1. Statistiques descriptives
print("1. STATISTIQUES DESCRIPTIVES")
print(dataset.describe(numeric_only=True).round(3))

# 2. Taux de modèles open-source
taux_os = dataset["open_source"].mean()
print(f"\n2. Taux open-source : {taux_os:.1%}")

# 3. Corrélation paramètres ↔ performance
corr = dataset[["nb_parametres_B", "score_mmlu", "score_humaneval"]].corr()
print(f"\n3. Corrélation paramètres/MMLU : {corr.loc['nb_parametres_B','score_mmlu']:.3f}")
print(corr.round(3))

# 4. Top 10 par score MMLU
top10 = dataset.nlargest(10, "score_mmlu")[["nom", "entreprise", "score_mmlu", "nb_parametres_B"]]
print("\n4. TOP 10 MODÈLES (MMLU) :")
print(top10.to_string(index=False))

# 5. Performance moyenne par entreprise
perf_entreprise = dataset.groupby("entreprise").agg(
    score_mmlu_moyen=("score_mmlu", "mean"),
    score_humaneval_moyen=("score_humaneval", "mean"),
    nb_modeles=("nom", "count")
).round(3).sort_values("score_mmlu_moyen", ascending=False)
print("\n5. PERFORMANCE PAR ENTREPRISE :")
print(perf_entreprise)
```

---

---

# 📘 CHAPITRE 1.4 — MATPLOTLIB & SEABORN : LA VISUALISATION

## Durée : 1 semaine

---

## Pourquoi visualiser ?

> "A picture is worth a thousand words" — mais une bonne visualisation de données peut valoir des millions en IA.

Visualiser sert à :
- **Comprendre** la distribution et la structure des données
- **Détecter** les anomalies, biais, valeurs aberrantes
- **Communiquer** les résultats aux parties prenantes
- **Valider** que le modèle apprend correctement (courbes d'entraînement)

---

### 1.4.1 — Matplotlib : La Base

```python
import matplotlib.pyplot as plt
import numpy as np

# Structure d'une figure Matplotlib
fig, ax = plt.subplots(figsize=(10, 6))  # Figure + Axes (subplots)

# La bonne façon de faire : plt.subplots()
# ├── fig : la figure entière (feuille de papier)
# └── ax  : l'axe (le système de coordonnées sur lequel on dessine)

# Graphe en ligne — courbe d'apprentissage (très utilisée en IA)
epochs = range(1, 21)
train_loss = [1.8, 1.4, 1.1, 0.9, 0.75, 0.63, 0.55, 0.48, 0.43, 0.39,
              0.36, 0.33, 0.31, 0.29, 0.28, 0.27, 0.26, 0.25, 0.245, 0.24]
val_loss = [1.9, 1.5, 1.2, 1.0, 0.85, 0.75, 0.69, 0.65, 0.63, 0.61,
            0.60, 0.60, 0.61, 0.62, 0.64, 0.65, 0.67, 0.68, 0.70, 0.72]

ax.plot(epochs, train_loss, "b-o", linewidth=2, markersize=5, label="Train Loss")
ax.plot(epochs, val_loss, "r-s", linewidth=2, markersize=5, label="Validation Loss")

# Annotations
ax.axvline(x=12, color="gray", linestyle="--", alpha=0.7, label="Début overfitting")
ax.annotate("Meilleur modèle\n(early stopping)", 
             xy=(12, 0.60), xytext=(14, 0.8),
             arrowprops=dict(arrowstyle="->", color="black"),
             fontsize=10)

# Style
ax.set_xlabel("Époque", fontsize=12)
ax.set_ylabel("Perte (Loss)", fontsize=12)
ax.set_title("Courbes d'Apprentissage — Détection de l'Overfitting", fontsize=14, fontweight="bold")
ax.legend(fontsize=11)
ax.grid(True, alpha=0.3)
ax.set_ylim(0, 2)

plt.tight_layout()
plt.savefig("courbe_apprentissage.png", dpi=150, bbox_inches="tight")
plt.show()
```

**Les types de graphiques essentiels :**

```python
fig, axes = plt.subplots(2, 3, figsize=(15, 10))

# 1. Histogramme — distribution d'une variable
np.random.seed(42)
scores = np.random.normal(75, 12, 500)
axes[0, 0].hist(scores, bins=30, color="steelblue", edgecolor="white", alpha=0.8)
axes[0, 0].set_title("Distribution des Scores")
axes[0, 0].axvline(scores.mean(), color="red", linestyle="--", label=f"Moyenne={scores.mean():.1f}")
axes[0, 0].legend()

# 2. Scatter plot — relation entre 2 variables
taille_modele = np.random.uniform(1, 100, 50)  # milliards de paramètres
performance = 0.6 + 0.3 * np.log(taille_modele) + np.random.randn(50) * 0.05
axes[0, 1].scatter(taille_modele, performance, alpha=0.6, c=performance, cmap="viridis", s=80)
axes[0, 1].set_xlabel("Paramètres (B)")
axes[0, 1].set_ylabel("Score MMLU")
axes[0, 1].set_title("Taille vs Performance")

# 3. Diagramme en barres
categories = ["GPT-4o", "Claude 3", "Gemini", "Mistral", "LLaMA 3"]
scores_bar = [0.91, 0.89, 0.87, 0.82, 0.80]
couleurs = ["gold" if s == max(scores_bar) else "steelblue" for s in scores_bar]
axes[0, 2].bar(categories, scores_bar, color=couleurs, edgecolor="black", linewidth=0.5)
axes[0, 2].set_title("Benchmark MMLU — Comparaison LLMs")
axes[0, 2].set_ylim(0.7, 0.95)
for i, (cat, score) in enumerate(zip(categories, scores_bar)):
    axes[0, 2].text(i, score + 0.002, f"{score:.2f}", ha="center", fontsize=9)

# 4. Boxplot — distribution et outliers
data_boxplot = [np.random.normal(loc, 5, 100) for loc in [60, 70, 75, 85]]
axes[1, 0].boxplot(data_boxplot, labels=["Débutant", "Inter.", "Avancé", "Expert"])
axes[1, 0].set_title("Distribution des Scores par Niveau")
axes[1, 0].set_ylabel("Score")

# 5. Heatmap de corrélation
features = np.random.randn(100, 5)
import pandas as pd
df_corr = pd.DataFrame(features, columns=["Score", "Params", "Data", "GPU", "Temps"])
corr_matrix = df_corr.corr()
im = axes[1, 1].imshow(corr_matrix, cmap="coolwarm", vmin=-1, vmax=1)
axes[1, 1].set_xticks(range(len(corr_matrix.columns)))
axes[1, 1].set_yticks(range(len(corr_matrix.columns)))
axes[1, 1].set_xticklabels(corr_matrix.columns, rotation=45)
axes[1, 1].set_yticklabels(corr_matrix.columns)
plt.colorbar(im, ax=axes[1, 1])
axes[1, 1].set_title("Matrice de Corrélation")

# 6. Diagramme circulaire
taches_ia = ["Données (60%)", "Modélisation (20%)", "Déploiement (10%)", "Monitoring (10%)"]
pourcentages = [60, 20, 10, 10]
axes[1, 2].pie(pourcentages, labels=taches_ia, autopct="%1.0f%%",
               colors=["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
               explode=[0.05, 0, 0, 0])
axes[1, 2].set_title("Répartition du Temps d'un Data Scientist")

plt.suptitle("Visualisations Essentielles pour la Data Science", 
             fontsize=16, fontweight="bold", y=1.02)
plt.tight_layout()
plt.savefig("visualisations_completes.png", dpi=150, bbox_inches="tight")
plt.show()
```

---

### 1.4.2 — Seaborn : La Visualisation Statistique

Seaborn est construit sur Matplotlib et offre des graphiques statistiques avancés avec moins de code.

```python
import seaborn as sns
import pandas as pd
import numpy as np

# Charger un dataset intégré (iris — le dataset ML classique)
iris = sns.load_dataset("iris")
titanic = sns.load_dataset("titanic")

# Style global
sns.set_style("whitegrid")
sns.set_palette("husl")

fig, axes = plt.subplots(2, 3, figsize=(16, 10))

# 1. Distribution avec KDE
sns.histplot(iris["sepal_length"], kde=True, bins=20, ax=axes[0, 0], color="steelblue")
axes[0, 0].set_title("Distribution Longueur Sépale")

# 2. Distribution par catégorie
sns.boxplot(x="species", y="petal_length", data=iris, ax=axes[0, 1], palette="Set2")
axes[0, 1].set_title("Longueur Pétale par Espèce")

# 3. Relations pairwise (excellent pour l'EDA)
# (En dehors de la grille pour éviter la complexité)
# sns.pairplot(iris, hue="species")  → génère une figure séparée

# 4. Scatter avec régression
sns.regplot(x="sepal_length", y="petal_length", data=iris, ax=axes[0, 2], 
            scatter_kws={"alpha": 0.5})
axes[0, 2].set_title("Longueur Sépale vs Pétale")

# 5. Heatmap de corrélation (plus beau qu'avec Matplotlib)
corr = iris.drop("species", axis=1).corr()
sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm", 
            center=0, ax=axes[1, 0], square=True)
axes[1, 0].set_title("Corrélations (Dataset Iris)")

# 6. Violin plot — distribution + boxplot
sns.violinplot(x="species", y="sepal_width", data=iris, ax=axes[1, 1], palette="muted")
axes[1, 1].set_title("Distribution Largeur Sépale")

# 7. Count plot — fréquence d'une catégorie
sns.countplot(x="pclass", hue="survived", data=titanic, ax=axes[1, 2], palette="Set1")
axes[1, 2].set_title("Survie par Classe (Titanic)")
axes[1, 2].legend(["Décédé", "Survivant"])

plt.tight_layout()
plt.show()
```

---

### 1.4.3 — Visualisations Spécifiques à l'IA

```python
# Matrice de Confusion (évaluation d'un classifieur)
def plot_matrice_confusion(y_vrai, y_pred, classes):
    from sklearn.metrics import confusion_matrix
    
    cm = confusion_matrix(y_vrai, y_pred)
    
    fig, ax = plt.subplots(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
                xticklabels=classes, yticklabels=classes,
                ax=ax, linewidths=1, linecolor="white")
    
    ax.set_xlabel("Prédiction", fontsize=12)
    ax.set_ylabel("Vrai label", fontsize=12)
    ax.set_title("Matrice de Confusion", fontsize=14, fontweight="bold")
    
    # Accuracy
    accuracy = cm.diagonal().sum() / cm.sum()
    ax.text(0.5, -0.1, f"Accuracy globale: {accuracy:.2%}",
            ha="center", transform=ax.transAxes, fontsize=11)
    
    plt.tight_layout()
    plt.show()

# Courbe ROC-AUC
def plot_roc_curve(y_vrai, y_proba):
    from sklearn.metrics import roc_curve, auc
    
    fpr, tpr, thresholds = roc_curve(y_vrai, y_proba)
    roc_auc = auc(fpr, tpr)
    
    plt.figure(figsize=(7, 7))
    plt.plot(fpr, tpr, color="darkorange", linewidth=2,
             label=f"Courbe ROC (AUC = {roc_auc:.3f})")
    plt.plot([0, 1], [0, 1], "k--", linewidth=1, label="Classificateur aléatoire")
    plt.xlim([0.0, 1.0])
    plt.ylim([0.0, 1.05])
    plt.xlabel("Taux de Faux Positifs (FPR)")
    plt.ylabel("Taux de Vrais Positifs (TPR)")
    plt.title("Courbe ROC — Receiver Operating Characteristic")
    plt.legend(loc="lower right")
    plt.grid(True, alpha=0.3)
    plt.show()

# Importance des features
def plot_feature_importance(feature_names, importances, titre="Importance des Features"):
    indices = np.argsort(importances)[::-1]  # Trier par importance décroissante
    
    plt.figure(figsize=(10, max(4, len(feature_names) * 0.4)))
    plt.barh(range(len(feature_names)),
             importances[indices],
             align="center",
             color=plt.cm.RdYlGn(importances[indices] / importances.max()))
    
    plt.yticks(range(len(feature_names)), [feature_names[i] for i in indices])
    plt.xlabel("Importance (Gini)")
    plt.title(titre)
    plt.tight_layout()
    plt.show()
```

---

## 🏋️ EXERCICES — CHAPITRE 1.4

### Exercice 1.4.A — Dashboard de Suivi d'Entraînement

Un modèle a été entraîné sur 30 époques. Crée un dashboard à 4 graphiques (2×2) montrant : la courbe de loss (train/val), la courbe d'accuracy (train/val), la distribution finale des erreurs de prédiction, et l'évolution du learning rate.

```python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
epochs = np.arange(1, 31)

# Simulation de courbes réalistes
train_loss = 2.0 * np.exp(-epochs / 8) + np.random.normal(0, 0.02, 30)
val_loss = 2.0 * np.exp(-epochs / 8) + 0.05 + np.random.normal(0, 0.04, 30)
val_loss[18:] += np.linspace(0, 0.15, 12)  # overfitting après époque 18

train_acc = 1 - train_loss / 2.5
val_acc = 1 - val_loss / 2.5

erreurs = np.random.normal(0, 1, 500)  # erreurs résiduelles du meilleur modèle
lr = 0.01 * (0.95 ** epochs)  # decay exponentiel

fig, axes = plt.subplots(2, 2, figsize=(13, 9))

# Loss
axes[0, 0].plot(epochs, train_loss, label="Train", color="steelblue")
axes[0, 0].plot(epochs, val_loss, label="Validation", color="tomato")
axes[0, 0].axvline(18, color="gray", linestyle="--", alpha=0.6, label="Overfitting")
axes[0, 0].set_title("Courbe de Perte (Loss)")
axes[0, 0].set_xlabel("Époque"); axes[0, 0].set_ylabel("Loss")
axes[0, 0].legend(); axes[0, 0].grid(alpha=0.3)

# Accuracy
axes[0, 1].plot(epochs, train_acc, label="Train", color="steelblue")
axes[0, 1].plot(epochs, val_acc, label="Validation", color="tomato")
axes[0, 1].set_title("Courbe d'Accuracy")
axes[0, 1].set_xlabel("Époque"); axes[0, 1].set_ylabel("Accuracy")
axes[0, 1].legend(); axes[0, 1].grid(alpha=0.3)

# Distribution des erreurs
axes[1, 0].hist(erreurs, bins=30, color="mediumseagreen", edgecolor="white")
axes[1, 0].axvline(0, color="black", linestyle="--")
axes[1, 0].set_title("Distribution des Erreurs Résiduelles")
axes[1, 0].set_xlabel("Erreur"); axes[1, 0].set_ylabel("Fréquence")

# Learning rate
axes[1, 1].plot(epochs, lr, color="purple", marker="o", markersize=3)
axes[1, 1].set_title("Évolution du Learning Rate")
axes[1, 1].set_xlabel("Époque"); axes[1, 1].set_ylabel("Learning Rate")
axes[1, 1].set_yscale("log"); axes[1, 1].grid(alpha=0.3)

plt.suptitle("Dashboard de Suivi d'Entraînement", fontsize=15, fontweight="bold")
plt.tight_layout()
plt.savefig("dashboard_entrainement.png", dpi=150, bbox_inches="tight")
plt.show()
```

### Exercice 1.4.B — Comparaison Visuelle de Modèles (Seaborn)

En utilisant le dataset de l'exercice 1.3.A (modèles IA), crée un `pairplot` Seaborn coloré par `open_source`, puis un graphique en barres horizontales trié montrant le score MMLU par entreprise avec barres d'erreur (écart-type).

```python
import seaborn as sns
import matplotlib.pyplot as plt

# (dataset issu de l'exercice 1.3.A)
sns.set_style("whitegrid")

# Pairplot
g = sns.pairplot(
    dataset[["nb_parametres_B", "score_mmlu", "score_humaneval", "open_source"]],
    hue="open_source", palette={True: "seagreen", False: "indianred"},
    diag_kind="kde", height=2.2
)
g.fig.suptitle("Relations entre Variables par Statut Open-Source", y=1.02)
plt.show()

# Barres avec écart-type
stats_entreprise = dataset.groupby("entreprise")["score_mmlu"].agg(["mean", "std"]).sort_values("mean")

plt.figure(figsize=(9, 5))
plt.barh(stats_entreprise.index, stats_entreprise["mean"],
         xerr=stats_entreprise["std"], color="steelblue",
         edgecolor="black", capsize=5, alpha=0.85)
plt.xlabel("Score MMLU moyen (± écart-type)")
plt.title("Performance MMLU par Entreprise")
plt.tight_layout()
plt.show()
```

---

---

# 📘 CHAPITRE 1.5 — SCIKIT-LEARN : PREMIER CONTACT AVEC LE ML

## Durée : 2 semaines

---

## Philosophie de Scikit-learn

Scikit-learn a une **API unifiée** : tous les modèles ont les mêmes méthodes.

```
model.fit(X_train, y_train)    ← Entraîner
model.predict(X_test)          ← Prédire
model.score(X_test, y_test)    ← Évaluer
model.get_params()             ← Paramètres
```

Cette consistance permet de **changer de modèle en changeant une seule ligne**.

---

### 1.5.1 — Le Pipeline ML Complet

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import (accuracy_score, f1_score, classification_report,
                              confusion_matrix, roc_auc_score)
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
import warnings
warnings.filterwarnings("ignore")

# ─────────────────────────────────────────────────
# ÉTAPE 1 : PRÉPARER LES DONNÉES
# ─────────────────────────────────────────────────

# Dataset synthétique de classification binaire
np.random.seed(42)
n = 1000

X = pd.DataFrame({
    "age": np.random.normal(35, 10, n).clip(18, 80),
    "salaire": np.random.normal(40000, 15000, n).clip(15000, 150000),
    "anciennete": np.random.normal(5, 4, n).clip(0, 40),
    "score_credit": np.random.normal(650, 100, n).clip(300, 850),
    "nb_produits": np.random.randint(1, 6, n),
    "region": np.random.choice(["Nord", "Sud", "Est", "Ouest"], n)
})

# Cible : probabilité de churn (simplifiée)
proba_churn = 0.2 + 0.1 * (X["anciennete"] < 2) - 0.05 * (X["nb_produits"] > 2)
y = (np.random.rand(n) < proba_churn).astype(int)

print(f"Dataset: {X.shape}")
print(f"Distribution: {pd.Series(y).value_counts(normalize=True).round(3).to_dict()}")

# ─────────────────────────────────────────────────
# ÉTAPE 2 : DIVISER EN TRAIN / TEST
# ─────────────────────────────────────────────────

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,       # 20% pour le test
    random_state=42,     # Reproductibilité
    stratify=y           # Même distribution de classes dans train et test
)

print(f"Train: {X_train.shape}, Test: {X_test.shape}")

# ─────────────────────────────────────────────────
# ÉTAPE 3 : PRÉTRAITEMENT
# ─────────────────────────────────────────────────

# Encodage de la variable catégorielle "region"
X_train_enc = X_train.copy()
X_test_enc = X_test.copy()

# One-Hot Encoding (le bon pour les catégorielles nominales)
region_dummies_train = pd.get_dummies(X_train["region"], prefix="region")
region_dummies_test = pd.get_dummies(X_test["region"], prefix="region")

# Aligner les colonnes (important pour le test)
region_dummies_test = region_dummies_test.reindex(
    columns=region_dummies_train.columns, fill_value=0
)

X_train_enc = X_train_enc.drop("region", axis=1).join(region_dummies_train)
X_test_enc = X_test_enc.drop("region", axis=1).join(region_dummies_test)

# Normalisation des variables numériques
# IMPORTANT : fit SEULEMENT sur train, transform sur train ET test
scaler = StandardScaler()
num_colonnes = ["age", "salaire", "anciennete", "score_credit", "nb_produits"]

X_train_enc[num_colonnes] = scaler.fit_transform(X_train_enc[num_colonnes])
X_test_enc[num_colonnes] = scaler.transform(X_test_enc[num_colonnes])  # PAS fit_transform !
```

**Pourquoi ne pas fit le scaler sur le test ?**

```
❌ MAUVAIS (data leakage) :
   scaler.fit_transform(X_train) → OK
   scaler.fit_transform(X_test)  → FAUX ! On utilise les stats du test pour normaliser

✅ BON :
   scaler.fit_transform(X_train)  → Calcule moyenne/std sur train, puis normalise
   scaler.transform(X_test)       → Utilise la moyenne/std de train pour normaliser le test
   
En production, on n'a pas accès aux données futures : on utilise toujours
les statistiques apprises sur l'ensemble d'entraînement.
```

```python
# ─────────────────────────────────────────────────
# ÉTAPE 4 : ENTRAÎNER PLUSIEURS MODÈLES
# ─────────────────────────────────────────────────

modeles = {
    "Régression Logistique": LogisticRegression(max_iter=1000, random_state=42),
    "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
    "Gradient Boosting": GradientBoostingClassifier(n_estimators=100, random_state=42),
    "SVM": SVC(probability=True, random_state=42)
}

resultats = {}

for nom, model in modeles.items():
    # Cross-validation (5 plis) — meilleure estimation que train/test simple
    cv_scores = cross_val_score(model, X_train_enc, y_train, cv=5, scoring="f1")
    
    # Entraîner sur tout le train
    model.fit(X_train_enc, y_train)
    
    # Évaluer sur le test
    y_pred = model.predict(X_test_enc)
    y_proba = model.predict_proba(X_test_enc)[:, 1]
    
    resultats[nom] = {
        "cv_f1_mean": cv_scores.mean(),
        "cv_f1_std": cv_scores.std(),
        "test_accuracy": accuracy_score(y_test, y_pred),
        "test_f1": f1_score(y_test, y_pred),
        "test_auc": roc_auc_score(y_test, y_proba)
    }

# Comparer
df_resultats = pd.DataFrame(resultats).T.round(4)
print("\n📊 COMPARAISON DES MODÈLES:")
print(df_resultats.sort_values("test_auc", ascending=False).to_string())
```

---

### 1.5.2 — Pipeline Scikit-learn (Production Ready)

Un `Pipeline` encapsule le prétraitement ET le modèle en un seul objet. C'est **la bonne pratique en production**.

```python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer

# Définir les colonnes par type
colonnes_num = ["age", "salaire", "anciennete", "score_credit", "nb_produits"]
colonnes_cat = ["region"]

# Prétraitement pour les numériques
preproc_num = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),   # Remplir les NaN
    ("scaler", StandardScaler())                      # Normaliser
])

# Prétraitement pour les catégorielles
preproc_cat = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),  # Remplir les NaN
    ("encoder", OneHotEncoder(drop="first", sparse_output=False))  # Encoder
])

# Combiner les deux prétraitements
preprocesseur = ColumnTransformer([
    ("num", preproc_num, colonnes_num),
    ("cat", preproc_cat, colonnes_cat)
])

# Pipeline complet : prétraitement + modèle
pipeline_complet = Pipeline([
    ("prétraitement", preprocesseur),
    ("modèle", RandomForestClassifier(n_estimators=100, random_state=42))
])

# Entraîner → tout est géré automatiquement
pipeline_complet.fit(X_train, y_train)

# Prédire sur des données brutes (pas besoin de prétraiter manuellement)
y_pred = pipeline_complet.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")

# Optimisation des hyperparamètres avec le pipeline
param_grid = {
    "modèle__n_estimators": [50, 100, 200],
    "modèle__max_depth": [5, 10, None],
    "modèle__min_samples_leaf": [1, 2, 4]
}

grid_search = GridSearchCV(
    pipeline_complet,
    param_grid,
    cv=5,
    scoring="f1",
    n_jobs=-1,    # Utiliser tous les cœurs CPU
    verbose=1
)
grid_search.fit(X_train, y_train)

print(f"\n🏆 Meilleurs paramètres: {grid_search.best_params_}")
print(f"Meilleur score CV: {grid_search.best_score_:.4f}")

# Évaluer le meilleur modèle
meilleur_modele = grid_search.best_estimator_
y_pred_final = meilleur_modele.predict(X_test)
print(f"\n📊 RAPPORT FINAL:")
print(classification_report(y_test, y_pred_final, target_names=["Fidèle", "Churn"]))
```

---

### 1.5.3 — Comprendre l'Overfitting et le Underfitting

```python
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=500, n_features=20, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

train_scores = []
test_scores = []
profondeurs = range(1, 25)

for depth in profondeurs:
    model = DecisionTreeClassifier(max_depth=depth, random_state=42)
    model.fit(X_train, y_train)
    train_scores.append(model.score(X_train, y_train))
    test_scores.append(model.score(X_test, y_test))

# Visualiser la courbe bias-variance
plt.figure(figsize=(10, 6))
plt.plot(profondeurs, train_scores, "b-o", label="Score Train")
plt.plot(profondeurs, test_scores, "r-s", label="Score Test")
plt.axvline(profondeurs[test_scores.index(max(test_scores))], 
            color="green", linestyle="--", 
            label=f"Profondeur optimale = {profondeurs[test_scores.index(max(test_scores))]}")

plt.fill_between(profondeurs, train_scores, test_scores, alpha=0.1, color="red", label="Overfitting zone")
plt.xlabel("Profondeur de l'Arbre (Complexité)")
plt.ylabel("Accuracy")
plt.title("Compromis Biais-Variance\nUnderfitting ← Optimal → Overfitting")
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

print("ANALYSE:")
print("  Profondeur 1-3 : Underfitting (modèle trop simple)")
print("  Profondeur 5-8 : Zone optimale")
print("  Profondeur 15+ : Overfitting (mémorise le train)")
```

---

### 🎯 PROJET FINAL MODULE 1.5 — Prédiction de Churn Bancaire

```python
"""
PROJET : Système de Prédiction de Churn Bancaire
Objectif : Identifier les clients susceptibles de quitter la banque
Dataset : Synthétique (représentatif d'un vrai dataset bancaire)
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import (accuracy_score, f1_score, roc_auc_score,
                              classification_report, confusion_matrix)
import warnings
warnings.filterwarnings("ignore")

# ══════════════════════════════════════════════════════════════
# 1. GÉNÉRATION DU DATASET
# ══════════════════════════════════════════════════════════════

np.random.seed(42)
n = 5000

# Facteurs influençant le churn
age = np.random.normal(40, 12, n).clip(18, 80)
anciennete = np.random.normal(5, 4, n).clip(0, 30)
solde = np.random.exponential(25000, n)
nb_produits = np.random.randint(1, 5, n)
a_carte_credit = np.random.randint(0, 2, n)
est_actif = np.random.randint(0, 2, n)
salaire = np.random.normal(50000, 20000, n).clip(10000, 200000)
pays = np.random.choice(["France", "Allemagne", "Espagne"], n, p=[0.5, 0.25, 0.25])
sexe = np.random.choice(["Homme", "Femme"], n)
score_credit = np.random.normal(650, 100, n).clip(300, 850)

# Cible (inspirée de la réalité)
logit = (-5
         + 0.02 * (age - 40)
         - 0.1 * anciennete
         - 0.5 * est_actif
         + 0.3 * (nb_produits == 1).astype(float)
         - 0.2 * a_carte_credit
         + 0.0001 * (solde - 25000))

proba_churn = 1 / (1 + np.exp(-logit))
churn = (np.random.rand(n) < proba_churn).astype(int)

dataset = pd.DataFrame({
    "age": age, "anciennete": anciennete, "solde": solde,
    "nb_produits": nb_produits, "carte_credit": a_carte_credit,
    "actif": est_actif, "salaire": salaire, "pays": pays,
    "sexe": sexe, "score_credit": score_credit, "churn": churn
})

print("═" * 55)
print(f"  DATASET BANCAIRE : {dataset.shape}")
print(f"  Taux de churn    : {churn.mean():.2%}")
print("═" * 55)

# ══════════════════════════════════════════════════════════════
# 2. EDA (EXPLORATION)
# ══════════════════════════════════════════════════════════════

fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Taux de churn par pays
churn_pays = dataset.groupby("pays")["churn"].mean() * 100
churn_pays.sort_values().plot(kind="barh", ax=axes[0, 0], color="coral")
axes[0, 0].set_title("Taux de Churn par Pays")
axes[0, 0].set_xlabel("Taux de Churn (%)")

# Distribution de l'âge par churn
for label, groupe in dataset.groupby("churn"):
    axes[0, 1].hist(groupe["age"], bins=30, alpha=0.6, 
                    label=f"{'Churn' if label else 'Fidèle'}")
axes[0, 1].set_title("Distribution de l'Âge")
axes[0, 1].legend()

# Taux de churn par nb de produits
dataset.groupby("nb_produits")["churn"].mean().mul(100).plot(
    kind="bar", ax=axes[1, 0], color="steelblue"
)
axes[1, 0].set_title("Taux de Churn par Nb Produits")
axes[1, 0].set_ylabel("Taux de Churn (%)")
axes[1, 0].set_xlabel("Nombre de Produits")

# Solde vs Score crédit
scatter_colors = ["red" if c else "blue" for c in dataset["churn"]]
axes[1, 1].scatter(dataset["score_credit"], dataset["solde"], 
                   c=scatter_colors, alpha=0.3, s=10)
axes[1, 1].set_xlabel("Score Crédit")
axes[1, 1].set_ylabel("Solde (€)")
axes[1, 1].set_title("Segmentation Clients (rouge=churn)")

plt.suptitle("Analyse Exploratoire — Prédiction de Churn Bancaire", fontsize=14)
plt.tight_layout()
plt.savefig("eda_churn.png", dpi=150, bbox_inches="tight")
plt.show()

# ══════════════════════════════════════════════════════════════
# 3. PRÉTRAITEMENT & MODÉLISATION
# ══════════════════════════════════════════════════════════════

X = dataset.drop("churn", axis=1)
y = dataset["churn"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

cols_num = ["age", "anciennete", "solde", "nb_produits", "salaire", "score_credit"]
cols_cat = ["pays", "sexe", "carte_credit", "actif"]

preproc = ColumnTransformer([
    ("num", Pipeline([("imp", SimpleImputer(strategy="median")),
                      ("sc", StandardScaler())]), cols_num),
    ("cat", Pipeline([("imp", SimpleImputer(strategy="most_frequent")),
                      ("enc", OneHotEncoder(drop="first", sparse_output=False))]), cols_cat)
])

modeles_finaux = {
    "Random Forest": RandomForestClassifier(n_estimators=200, max_depth=10,
                                            min_samples_leaf=5, random_state=42, n_jobs=-1),
    "Gradient Boosting": GradientBoostingClassifier(n_estimators=200, max_depth=5,
                                                     learning_rate=0.1, random_state=42)
}

meilleur_auc = 0
meilleur_pipeline = None
meilleur_nom = ""

for nom, modele in modeles_finaux.items():
    pipe = Pipeline([("preproc", preproc), ("modele", modele)])
    
    # Cross-validation
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_auc = cross_val_score(pipe, X_train, y_train, cv=cv, scoring="roc_auc", n_jobs=-1)
    
    pipe.fit(X_train, y_train)
    y_pred = pipe.predict(X_test)
    y_proba = pipe.predict_proba(X_test)[:, 1]
    test_auc = roc_auc_score(y_test, y_proba)
    
    print(f"\n{'─'*45}")
    print(f"  Modèle : {nom}")
    print(f"  CV AUC : {cv_auc.mean():.4f} ± {cv_auc.std():.4f}")
    print(f"  Test AUC : {test_auc:.4f}")
    print(f"  Test F1  : {f1_score(y_test, y_pred):.4f}")
    
    if test_auc > meilleur_auc:
        meilleur_auc = test_auc
        meilleur_pipeline = pipe
        meilleur_nom = nom

# ══════════════════════════════════════════════════════════════
# 4. ÉVALUATION FINALE
# ══════════════════════════════════════════════════════════════

print(f"\n{'═'*55}")
print(f"  🏆 MEILLEUR MODÈLE : {meilleur_nom}")
print(f"  AUC : {meilleur_auc:.4f}")
print("═" * 55)

y_pred_final = meilleur_pipeline.predict(X_test)
y_proba_final = meilleur_pipeline.predict_proba(X_test)[:, 1]

print("\n📊 Rapport de Classification:")
print(classification_report(y_test, y_pred_final, target_names=["Fidèle", "Churn"]))

# ══════════════════════════════════════════════════════════════
# 5. IMPORTANCE DES FEATURES
# ══════════════════════════════════════════════════════════════

# Récupérer l'importance des features
feature_names_num = cols_num
feature_names_cat = (meilleur_pipeline.named_steps["preproc"]
                     .named_transformers_["cat"].named_steps["enc"]
                     .get_feature_names_out(cols_cat).tolist())
all_features = feature_names_num + feature_names_cat

importances = meilleur_pipeline.named_steps["modele"].feature_importances_
indices = np.argsort(importances)[-10:]  # Top 10

plt.figure(figsize=(10, 6))
plt.barh(range(10), importances[indices], align="center", color="steelblue")
plt.yticks(range(10), [all_features[i] for i in indices])
plt.xlabel("Importance")
plt.title(f"Top 10 Features — {meilleur_nom}")
plt.tight_layout()
plt.savefig("feature_importance.png", dpi=150, bbox_inches="tight")
plt.show()
```

---

---

# 📘 CHAPITRE 1.6 — GIT & GITHUB

## Durée : 3 jours

---

## Pourquoi Git est Indispensable ?

Git est un **système de contrôle de version** : il enregistre l'historique complet de ton code. C'est comme les "révisions" de Google Docs, mais pour le code, en mieux, et sous ton contrôle.

**Scénarios réels :**
- "Mon modèle fonctionnait hier, qu'est-ce qui a changé ?" → Git log
- "Je veux essayer une nouvelle architecture sans casser ce qui marche" → Git branch
- "Mon équipe de 3 développeurs travaille en parallèle" → Git merge/PR

---

### 1.6.1 — Concepts Fondamentaux

```
Repository (dépôt) : Le dossier git — contient tout l'historique
Working Directory  : Tes fichiers actuels
Staging Area       : Zone de préparation avant commit
Commit             : Une "photo" de l'état du code à un instant T
Branch             : Une ligne de développement parallèle
Remote             : Le dépôt distant (GitHub, GitLab)
```

---

### 1.6.2 — Commandes Essentielles

```bash
# ── INITIALISATION ────────────────────────────────
git init                        # Créer un nouveau dépôt
git clone https://github.com/user/repo.git  # Copier un dépôt existant

# ── CONFIGURATION (une seule fois) ───────────────
git config --global user.name "Ton Nom"
git config --global user.email "ton@email.com"
git config --global core.editor "code --wait"  # VS Code comme éditeur

# ── CYCLE DE BASE ─────────────────────────────────
git status                      # Voir l'état actuel
git add fichier.py              # Ajouter un fichier au staging
git add .                       # Ajouter TOUS les fichiers modifiés
git commit -m "feat: ajouter le modèle Random Forest"  # Sauvegarder
git log --oneline               # Voir l'historique condensé
git log --oneline --graph       # Voir l'historique avec branches

# ── BRANCHES ──────────────────────────────────────
git branch                      # Lister les branches
git branch feature/nouveau-modele  # Créer une branche
git checkout feature/nouveau-modele  # Aller sur la branche
git checkout -b feature/new     # Créer ET aller sur la branche (raccourci)
git merge feature/nouveau-modele   # Fusionner dans la branche actuelle
git branch -d feature/nouveau-modele  # Supprimer la branche

# ── REMOTE (GitHub) ──────────────────────────────
git remote add origin https://github.com/user/repo.git
git push origin main            # Envoyer sur GitHub
git pull origin main            # Récupérer depuis GitHub
git fetch                       # Récupérer sans merger

# ── CORRECTIONS ──────────────────────────────────
git diff                        # Voir les changements non stagés
git diff --staged               # Voir les changements stagés
git restore fichier.py          # Annuler les modifications d'un fichier
git restore --staged fichier.py # Déstaguer un fichier
git revert HEAD                 # Annuler le dernier commit (proprement)
git stash                       # Mettre de côté les modifications temporairement
git stash pop                   # Récupérer les modifications mises de côté
```

---

### 1.6.3 — Conventions de Commit

Les bons commits racontent l'histoire de ton projet. Convention **Conventional Commits** :

```
<type>: <description courte>

[corps optionnel]

[footer optionnel]
```

**Types courants :**
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation uniquement
- `style:` Formatage (pas de changement logique)
- `refactor:` Refactoring sans nouvelle feature ni bug fix
- `test:` Ajout ou modification de tests
- `chore:` Maintenance (dépendances, config...)

**Exemples :**
```bash
git commit -m "feat: ajouter le module d'entraînement du Random Forest"
git commit -m "fix: corriger le calcul du F1-score pour les classes déséquilibrées"
git commit -m "docs: ajouter les instructions d'installation dans le README"
git commit -m "refactor: extraire la fonction de prétraitement dans utils.py"
```

---

### 1.6.4 — Le .gitignore — Ce qu'on ne versionne PAS

```gitignore
# Fichier .gitignore pour un projet IA/Python

# Environnement Python
venv/
.venv/
env/
__pycache__/
*.pyc
*.pyo
*.egg-info/
dist/
build/

# Jupyter
.ipynb_checkpoints/
*.ipynb_checkpoints

# Données (souvent trop lourdes pour Git)
data/raw/
data/processed/
*.csv
*.xlsx
*.parquet
*.h5

# Modèles (très lourds)
models/
*.pkl
*.joblib
*.pt
*.pth
*.safetensors

# Variables d'environnement (SÉCURITÉ !)
.env
.env.local
secrets.yaml

# Divers
.DS_Store
*.log
wandb/
mlruns/
```

---

### 1.6.5 — Workflow Professionnel

```bash
# Workflow quotidien recommandé pour un projet solo
git pull                        # Récupérer les dernières modifications
git checkout -b feature/ma-tache  # Nouvelle branche pour la tâche

# ... travail ...

git add .
git commit -m "feat: implémenter le fine-tuning LoRA"

# ... plus de travail ...

git add src/train.py
git commit -m "fix: corriger le calcul de la perte après les changements de la semaine"

git push origin feature/ma-tache  # Pousser la branche
# Sur GitHub : créer une Pull Request pour revoir le code
```

---

## 🏋️ EXERCICE — CHAPITRE 1.6

### Exercice 1.6.A — Scénario de Collaboration

Simule ce scénario en ligne de commande (dans un dossier de test) :

1. Initialise un dépôt Git et fais un premier commit avec un fichier `train.py` vide
2. Crée une branche `feature/preprocessing` et ajoute une fonction de nettoyage de données ; commit
3. Reviens sur `main`, crée une branche `feature/model` et ajoute une fonction d'entraînement ; commit
4. Fusionne les deux branches dans `main`, dans le bon ordre
5. Affiche l'historique sous forme de graphe (`git log --oneline --graph --all`)

**Solution (commandes) :**

```bash
mkdir projet-git-exercice && cd projet-git-exercice
git init
echo "# Entraînement du modèle" > train.py
git add train.py
git commit -m "chore: initialiser le projet"

git checkout -b feature/preprocessing
echo "def nettoyer(df): return df.dropna()" >> train.py
git add train.py
git commit -m "feat: ajouter la fonction de nettoyage des données"

git checkout main
git checkout -b feature/model
echo "def entrainer(X, y): pass  # TODO" >> train.py
git add train.py
git commit -m "feat: ajouter le squelette de la fonction d'entraînement"

git checkout main
git merge feature/preprocessing -m "merge: intégrer le prétraitement"
git merge feature/model -m "merge: intégrer l'entraînement"

git log --oneline --graph --all
```

> **Point d'attention :** en fusionnant deux branches créées à partir du même point sur `main`, tu peux rencontrer un **conflit** si les deux branches modifient les mêmes lignes de `train.py`. Résous-le en éditant le fichier (Git marque les zones avec `<<<<<<<`, `=======`, `>>>>>>>`), puis `git add train.py` et `git commit`.

---

---

# 📘 CHAPITRE 1.7 — DOCKER

## Durée : 1 semaine

---

## Pourquoi Docker en IA ?

**Le problème :** "Ça marche sur ma machine, mais pas sur le serveur de production."

**La cause :** Les dépendances Python, les versions de CUDA, les variables d'environnement diffèrent entre machines.

**La solution :** Docker crée un **conteneur** — un environnement isolé et reproductible qui contient tout ce dont l'application a besoin pour fonctionner.

```
Sans Docker : "Installe Python 3.11, puis torch 2.1.0, puis cuda 11.8, puis..."
Avec Docker : "Lance 'docker run mon-app-ia' → fonctionne partout"
```

---

### 1.7.1 — Concepts Clés

```
Image Docker   : Le moule (comme une photo de l'environnement)
Conteneur      : Une instance en cours d'exécution de l'image
Dockerfile     : Le fichier de recette pour construire l'image
Registry       : Dépôt d'images (Docker Hub, GitHub Container Registry)
Volume         : Dossier partagé entre le host et le conteneur
Port mapping   : Relier un port du conteneur à un port de la machine
```

---

### 1.7.2 — Ton Premier Dockerfile

```dockerfile
# Dockerfile pour une API IA Python

# 1. Image de base (Python officiel, version slim = légère)
FROM python:3.11-slim

# 2. Métadonnées
LABEL maintainer="ton.email@exemple.com"
LABEL description="API de prédiction de churn bancaire"

# 3. Répertoire de travail dans le conteneur
WORKDIR /app

# 4. Copier et installer les dépendances D'ABORD
# (layer caching : si requirements.txt ne change pas, Docker réutilise ce layer)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copier le code de l'application
COPY . .

# 6. Variables d'environnement
ENV MODEL_PATH=/app/models/churn_model.pkl
ENV API_PORT=8000

# 7. Exposer le port
EXPOSE 8000

# 8. Commande de démarrage
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**requirements.txt :**
```
fastapi==0.109.0
uvicorn==0.27.0
scikit-learn==1.4.0
pandas==2.1.0
numpy==1.26.0
pydantic==2.5.0
```

---

### 1.7.3 — L'API FastAPI à Dockeriser

```python
# main.py — API de prédiction

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import pickle
import pandas as pd
import numpy as np
import os

app = FastAPI(
    title="API Prédiction de Churn Bancaire",
    description="Prédit si un client va quitter la banque",
    version="1.0.0"
)

# Charger le modèle au démarrage
MODEL_PATH = os.getenv("MODEL_PATH", "models/churn_model.pkl")

@app.on_event("startup")
async def charger_modele():
    global modele
    try:
        with open(MODEL_PATH, "rb") as f:
            modele = pickle.load(f)
        print(f"✅ Modèle chargé depuis {MODEL_PATH}")
    except FileNotFoundError:
        print(f"⚠️  Modèle non trouvé à {MODEL_PATH}")
        modele = None

# Schéma d'entrée
class DonneesClient(BaseModel):
    age: float = Field(..., ge=18, le=100, description="Âge du client")
    anciennete: float = Field(..., ge=0, le=50, description="Années d'ancienneté")
    solde: float = Field(..., ge=0, description="Solde du compte (€)")
    nb_produits: int = Field(..., ge=1, le=10, description="Nombre de produits souscrits")
    carte_credit: int = Field(..., ge=0, le=1, description="Possède une carte crédit (0/1)")
    actif: int = Field(..., ge=0, le=1, description="Client actif (0/1)")
    salaire: float = Field(..., ge=0, description="Salaire estimé (€)")
    pays: str = Field(..., description="Pays: France, Allemagne, Espagne")
    sexe: str = Field(..., description="Sexe: Homme, Femme")
    score_credit: float = Field(..., ge=300, le=850, description="Score de crédit")

class PredictionResultat(BaseModel):
    client_id: str
    probabilite_churn: float
    risque: str
    recommandation: str

@app.get("/")
async def accueil():
    return {"message": "API Churn Bancaire v1.0", "status": "opérationnel"}

@app.get("/health")
async def health():
    return {"status": "ok", "modele_charge": modele is not None}

@app.post("/predire", response_model=PredictionResultat)
async def predire(data: DonneesClient, client_id: str = "client_001"):
    if modele is None:
        raise HTTPException(status_code=503, detail="Modèle non disponible")
    
    # Convertir en DataFrame
    df = pd.DataFrame([data.model_dump()])
    
    # Prédiction
    proba = modele.predict_proba(df)[0, 1]
    
    # Classification du risque
    if proba < 0.3:
        risque = "FAIBLE"
        recommandation = "Client stable. Maintenir la relation standard."
    elif proba < 0.6:
        risque = "MODÉRÉ"
        recommandation = "Proposer une offre personnalisée pour fidéliser."
    else:
        risque = "ÉLEVÉ"
        recommandation = "Action urgente : contacter le client pour une offre de rétention."
    
    return PredictionResultat(
        client_id=client_id,
        probabilite_churn=round(float(proba), 4),
        risque=risque,
        recommandation=recommandation
    )

@app.post("/predire/batch")
async def predire_batch(clients: list[DonneesClient]):
    """Prédit pour plusieurs clients en une seule requête."""
    if modele is None:
        raise HTTPException(status_code=503, detail="Modèle non disponible")
    
    df = pd.DataFrame([c.model_dump() for c in clients])
    probas = modele.predict_proba(df)[:, 1]
    
    return {
        "nb_clients": len(clients),
        "taux_churn_moyen": round(float(probas.mean()), 4),
        "clients_a_risque": int((probas > 0.6).sum()),
        "probas": [round(float(p), 4) for p in probas]
    }
```

---

### 1.7.4 — Construire et Lancer le Conteneur

```bash
# ── CONSTRUIRE L'IMAGE ────────────────────────────
docker build -t api-churn-ia:v1.0 .
# -t : tag (nom:version)
# .  : contexte de build (dossier courant)

# Voir les images disponibles
docker images

# ── LANCER LE CONTENEUR ───────────────────────────
docker run -d \
    --name mon-api-ia \
    -p 8000:8000 \
    -v $(pwd)/models:/app/models \
    -e MODEL_PATH=/app/models/churn_model.pkl \
    api-churn-ia:v1.0

# -d         : mode détaché (en arrière-plan)
# --name     : donner un nom au conteneur
# -p 8000:8000 : port hôte:port conteneur
# -v         : volume (dossier partagé)
# -e         : variable d'environnement

# ── GÉRER ─────────────────────────────────────────
docker ps                          # Voir les conteneurs en cours
docker ps -a                       # Voir TOUS les conteneurs (arrêtés aussi)
docker logs mon-api-ia             # Voir les logs
docker logs -f mon-api-ia          # Suivre les logs en temps réel
docker exec -it mon-api-ia bash    # Entrer dans le conteneur
docker stop mon-api-ia             # Arrêter
docker start mon-api-ia            # Redémarrer
docker rm mon-api-ia               # Supprimer

# ── TESTER L'API ──────────────────────────────────
curl http://localhost:8000/health
# {"status": "ok", "modele_charge": true}

curl -X POST http://localhost:8000/predire \
     -H "Content-Type: application/json" \
     -d '{
       "age": 35, "anciennete": 3, "solde": 25000,
       "nb_produits": 1, "carte_credit": 1, "actif": 0,
       "salaire": 45000, "pays": "France",
       "sexe": "Homme", "score_credit": 620
     }'
```

---

### 1.7.5 — Docker Compose — Orchestrer plusieurs services

En IA, une application complète nécessite souvent plusieurs services : l'API, une base de données, un système de monitoring, etc.

```yaml
# docker-compose.yml

version: "3.9"

services:
  # Notre API IA
  api:
    build: .
    image: api-churn-ia:v1.0
    container_name: api_ia
    ports:
      - "8000:8000"
    volumes:
      - ./models:/app/models
      - ./logs:/app/logs
    environment:
      - MODEL_PATH=/app/models/churn_model.pkl
      - LOG_LEVEL=INFO
    depends_on:
      - db
    restart: unless-stopped

  # Base de données pour stocker les prédictions
  db:
    image: postgres:15-alpine
    container_name: db_predictions
    environment:
      POSTGRES_DB: predictions
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: motdepasse_securise
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  # Interface de documentation/exploration
  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@formation-ia.fr
      PGADMIN_DEFAULT_PASSWORD: admin123
    ports:
      - "5050:80"
    depends_on:
      - db

volumes:
  postgres_data:
```

```bash
# Lancer tous les services
docker-compose up -d

# Arrêter tous les services
docker-compose down

# Voir les logs de tous les services
docker-compose logs -f

# Reconstruire une image
docker-compose build api
docker-compose up -d api
```

---

## 🏋️ EXERCICE FINAL MODULE 1 — Projet Complet "End-to-End"

### Objectif

Construire un projet IA complet, versionné et dockerisé :

1. **Entraîner** un modèle de classification sur le dataset Titanic (Scikit-learn)
2. **Créer** une API FastAPI pour servir le modèle
3. **Versionner** le code avec Git (commits conventionnels)
4. **Dockeriser** l'application
5. **Documenter** avec un README professionnel

**Structure du projet :**
```
projet-titanic-ia/
├── data/
│   └── titanic.csv
├── models/
│   └── (modèle sauvegardé ici)
├── src/
│   ├── train.py          ← Entraînement et sauvegarde du modèle
│   ├── evaluate.py       ← Évaluation détaillée
│   └── utils.py          ← Fonctions utilitaires
├── app/
│   └── main.py           ← API FastAPI
├── notebooks/
│   └── exploration.ipynb ← EDA
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .gitignore
└── README.md
```

Ce projet constitue **ta première entrée de portfolio** — soigne le README !

---

---

# ✅ QUIZ DE VALIDATION — MODULE 1

> Réponds sans regarder le cours, puis vérifie avec le corrigé. Objectif : 16/20 minimum avant de passer au Module 2.

**1.** Que retourne `[x**2 for x in range(5) if x % 2 == 0]` ?
**2.** Quelle est la différence entre une liste et un tuple ?
**3.** Que fait `df.groupby("colonne")["valeur"].mean()` ?
**4.** Pourquoi utilise-t-on `super().__init__()` dans une classe fille ?
**5.** Quelle est la forme (shape) du résultat de `np.array([[1,2],[3,4]]) @ np.array([[5,6],[7,8]])` ?
**6.** Pourquoi ne faut-il jamais faire `scaler.fit_transform()` sur les données de test ?
**7.** Que signifie l'option `stratify=y` dans `train_test_split` ?
**8.** Quelle est la différence entre `.loc[]` et `.iloc[]` en Pandas ?
**9.** Qu'est-ce que le broadcasting en NumPy ? Donne un exemple.
**10.** Pourquoi utiliser `float32` plutôt que `float64` en Deep Learning ?
**11.** Quelle est la différence entre `git merge` et `git pull` ?
**12.** À quoi sert un fichier `.gitignore` ?
**13.** Que fait la ligne `EXPOSE 8000` dans un Dockerfile ?
**14.** Quelle est la différence entre une image Docker et un conteneur Docker ?
**15.** Comment détecte-t-on visuellement l'overfitting sur une courbe train/validation ?
**16.** Que retourne `Counter(["a","b","a","c","a"]).most_common(1)` ?
**17.** Pourquoi utiliser un `Pipeline` Scikit-learn plutôt que des étapes manuelles ?
**18.** Quelle est la complexité (avantage) de NumPy par rapport à des boucles Python pures ?
**19.** Que fait `pd.get_dummies()` et pourquoi l'utilise-t-on ?
**20.** Dans un `Dockerfile`, pourquoi copie-t-on `requirements.txt` et installe-t-on les dépendances AVANT de copier le reste du code ?

---

### 📝 Corrigé

**1.** `[0, 4, 16]` — carrés des nombres pairs entre 0 et 4.
**2.** Une liste est modifiable (mutable), un tuple est immuable ; les tuples sont utilisés pour des données fixes (ex. coordonnées).
**3.** Calcule la moyenne de `valeur` pour chaque groupe distinct de `colonne`.
**4.** Pour appeler le constructeur de la classe parente et initialiser correctement ses attributs avant d'ajouter les spécificités de la classe fille.
**5.** `(2, 2)` — produit matriciel de deux matrices 2×2.
**6.** Cela provoquerait une fuite de données (data leakage) : le modèle "verrait" indirectement les statistiques du test, biaisant l'évaluation de façon trop optimiste.
**7.** Garantit que la proportion de chaque classe de `y` est la même dans les ensembles train et test — essentiel pour les données déséquilibrées.
**8.** `.loc[]` sélectionne par **labels** (noms d'index/colonnes) ; `.iloc[]` sélectionne par **position entière**.
**9.** Mécanisme permettant à NumPy d'appliquer une opération entre tableaux de formes différentes en "étirant" virtuellement le plus petit (ex. soustraire un vecteur `(3,)` à une matrice `(3,3)` ligne par ligne).
**10.** `float32` divise par 2 l'usage mémoire par rapport à `float64`, ce qui accélère les calculs et permet d'entraîner des modèles plus grands sur le même GPU, avec une perte de précision négligeable en pratique.
**11.** `git merge` fusionne une branche locale dans une autre ; `git pull` = `git fetch` + `git merge`, il récupère ET fusionne les changements distants.
**12.** Il liste les fichiers/dossiers à exclure du versionnement (environnements virtuels, données lourdes, secrets, fichiers temporaires).
**13.** Documente que le conteneur écoute sur le port 8000 (à but informatif ; le mapping réel se fait avec `-p` au lancement).
**14.** L'image est le modèle statique (la "recette figée") ; le conteneur est une instance en cours d'exécution de cette image.
**15.** Quand la courbe de perte (loss) de validation remonte ou stagne pendant que celle du train continue de baisser — l'écart qui se creuse est le signe caractéristique.
**16.** `[('a', 3)]` — l'élément "a" apparaît 3 fois, c'est le plus fréquent.
**17.** Il encapsule prétraitement + modèle en un seul objet, évite les erreurs de fuite de données, simplifie le déploiement et la recherche d'hyperparamètres (`GridSearchCV`).
**18.** NumPy exécute les opérations en code C vectorisé et compilé, évitant l'overhead de l'interpréteur Python à chaque itération — gain de 10× à 100×.
**19.** Convertit une variable catégorielle en plusieurs colonnes binaires (One-Hot Encoding) ; nécessaire car la plupart des algorithmes ML ne comprennent que des nombres.
**20.** Grâce au système de cache par couches (layers) de Docker : si le code change mais pas les dépendances, Docker réutilise la couche `pip install` déjà construite, ce qui accélère considérablement les rebuilds.

---

# 📊 RÉCAPITULATIF DU MODULE 1

## Ce que tu as maîtrisé

| Compétence | Outil | Niveau atteint |
|---|---|---|
| Programmation Python | Python 3.11 | ⭐⭐⭐⭐☆ |
| Calcul matriciel | NumPy | ⭐⭐⭐⭐☆ |
| Manipulation de données | Pandas | ⭐⭐⭐⭐☆ |
| Visualisation | Matplotlib + Seaborn | ⭐⭐⭐☆☆ |
| Machine Learning classique | Scikit-learn | ⭐⭐⭐☆☆ |
| Versionning | Git + GitHub | ⭐⭐⭐☆☆ |
| Conteneurisation | Docker | ⭐⭐☆☆☆ |

## Prochaine étape

**Module 2 — Mathématiques pour l'IA** : algèbre linéaire, calcul différentiel, probabilités et optimisation. Les fondements mathématiques qui te permettront de comprendre pourquoi les algorithmes fonctionnent, et pas seulement comment les utiliser.

---

## ⚠️ ERREURS FRÉQUENTES DU MODULE 1

| Erreur | Conséquence | Solution |
|---|---|---|
| `fit_transform` sur le test | Data leakage → résultats optimistes biaisés | Toujours `transform` sur test |
| Pas d'environnement virtuel | Conflits de versions entre projets | `python -m venv venv` dès le début |
| Commits trop gros et rares | Historique illisible, revenir en arrière impossible | Petits commits fréquents et descriptifs |
| Copier-coller les erreurs StackOverflow sans comprendre | Code fragile qu'on ne sait pas débugger | Comprendre chaque ligne de code |
| Ignorer les warnings Python | Accumulation de bugs silencieux | Lire et comprendre chaque warning |
| DataFrames modifiés en place accidentellement | Effets de bord difficiles à tracer | Utiliser `.copy()` avant modification |
| Mélanger train et test dans la normalisation | Métriques trop optimistes | Pipeline Scikit-learn pour éviter ça |

---

*Module 1 terminé ✅ — Durée totale : 9 semaines*  
*Formation IA Complète — Module suivant : Module 2 — Mathématiques pour l'IA*
