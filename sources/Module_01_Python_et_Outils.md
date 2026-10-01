# 📦 MODULE 1 — Python & Outils Essentiels pour l'Intelligence Artificielle

> **Durée estimée :** 13 semaines (1 à 2 h par jour) — dont ≈ 2 semaines de contenus optionnels marqués 🔸
> **Prérequis :** aucun. Ce module part de zéro : il faut seulement un ordinateur, une connexion Internet et de la curiosité.
> **Public :** personnes en reconversion, avec des niveaux techniques hétérogènes. Chaque notion est expliquée pas à pas ; les passages plus techniques sont isolés dans des encadrés « 🔍 Sous le capot » que tu peux relire plus tard.
> **Objectif général :** maîtriser les outils de base de l'ingénieur IA avant d'aborder les mathématiques, le Machine Learning et le Deep Learning.

---

## Difficulté : ⭐☆☆☆☆ → ⭐⭐⭐☆☆

---

## 📋 PLAN DU MODULE 1

| Chapitre | Sujet | Durée estimée |
|---|---|---|
| **1.0** | Démarrer — Terminal, Python et environnement de travail | 0,5 semaine |
| **1.1** | Python — Fondations absolues | 3,5 semaines |
| **1.2** | NumPy — Le calcul vectoriel | 1,5 semaine |
| **1.3** | Pandas — La manipulation de données | 1,5 semaine |
| **1.4** | Matplotlib & Seaborn — La visualisation | 1 semaine |
| **1.5** | Scikit-learn — Premier contact avec le ML | 2 semaines |
| **1.6** | Git & GitHub — Versionner son travail | 0,5 semaine |
| **1.7** | Docker — Encapsuler son environnement (et servir un modèle par API) | 1 semaine |
| **Projet global** | « De la donnée brute à l'API conteneurisée » | 1,5 semaine |
| **Fin de module** | Quiz de validation (40 questions), glossaire, aide-mémoire | — |

---

## 🎯 OBJECTIFS DU MODULE

À la fin de ce module, tu seras capable de :

1. Utiliser un terminal et configurer un environnement de travail Python reproductible.
2. Écrire des programmes Python structurés, testés et lisibles (fonctions, classes, exceptions, modules).
3. Manipuler des vecteurs et des matrices avec NumPy, sans boucles inutiles.
4. Charger, nettoyer, explorer et transformer des données avec Pandas.
5. Créer des visualisations honnêtes et lisibles avec Matplotlib et Seaborn.
6. Entraîner, évaluer et comparer tes premiers modèles de Machine Learning avec Scikit-learn, en évitant les erreurs classiques (fuite de données, mauvaise métrique).
7. Versionner ton code avec Git, collaborer via GitHub et résoudre un conflit.
8. Exposer un modèle via une API web et le conteneuriser avec Docker.
9. Assembler tout cela dans un projet de portfolio complet.

---

## 🧭 COMMENT UTILISER CE MODULE

Chaque notion suit le même schéma :

| Symbole | Signification |
|---|---|
| 🎯 | **Objectif** : ce que tu sauras faire après la section |
| 💡 | **Intuition** : une analogie ou un schéma pour comprendre avant de formaliser |
| 🔍 | **Sous le capot** : ce qui se passe réellement (à lire quand tu es à l'aise) |
| ⚠️ | **Piège fréquent** : une erreur classique de débutant |
| 🏋️ | **Pratique immédiate** : un petit exercice à faire *tout de suite* dans un notebook |
| ✅ | **Checklist** : « je sais… » pour t'auto-évaluer |
| 🔸 | **Optionnel** : pour aller plus loin, à faire si tu as du temps |

**Règle d'or : tape le code toi-même.** Copier-coller donne l'illusion de comprendre. Pour chaque exemple : *prédis* le résultat, *exécute*, puis *modifie* une valeur pour voir ce qui change.

**Les solutions** des exercices sont repliées sous « Solution » : essaie vraiment pendant 10 minutes avant de les ouvrir.

**Fin de chaque chapitre :** un quiz, des exercices progressifs (⭐ facile, ⭐⭐ moyen, ⭐⭐⭐ difficile) et un mini-projet qui alimente le projet global du module.

> 📌 **Convention de code.** Les exemples utilisent des noms de variables en français pour la lisibilité. Dans le monde professionnel, on écrit souvent le code en anglais : c'est un choix d'équipe, pas une règle du langage. Les noms de bibliothèques et de méthodes restent en anglais.

---

# 📘 CHAPITRE 1.0 — DÉMARRER : TERMINAL, PYTHON ET ENVIRONNEMENT DE TRAVAIL

**Durée : 0,5 semaine**

> 🎯 **Objectifs du chapitre.** Naviguer dans ton ordinateur avec le terminal, installer Python, créer un environnement virtuel, installer des bibliothèques et lancer ton premier notebook. À la fin, un script de vérification t'affichera « ✅ Environnement prêt ».

Beaucoup d'abandons en formation surviennent ici, pas à cause de la difficulté, mais parce qu'un message d'erreur d'installation décourage. Prends ton temps : ce chapitre est un investissement.

---

## 1.0.1 — Le terminal : parler à ton ordinateur avec du texte

### 💡 Intuition

Tu connais l'explorateur de fichiers (Finder, Explorateur Windows) : tu cliques sur des dossiers. Le **terminal** fait la même chose, mais en écrivant des commandes. Pourquoi s'en soucier ? Parce que tous les outils de ce module (Python, pip, Git, Docker) se pilotent au terminal, et parce qu'une commande est **reproductible** : on peut l'écrire dans un README, la partager et l'automatiser.

Un terminal affiche une **invite** (prompt) qui attend ta commande. Elle indique généralement où tu te trouves :

```text
nasreddine@laptop:~/formation-ia$
        │            │
   utilisateur    dossier courant (~ = ton dossier personnel)
```

| Système | Terminal recommandé |
|---|---|
| **Windows** | *PowerShell* (ou *Terminal Windows*). Option avancée : **WSL** (Linux dans Windows) |
| **macOS** | *Terminal* (application par défaut) |
| **Linux** | *Terminal* |

Le terminal intégré de VS Code (menu *Terminal → Nouveau terminal*) fonctionne sur les trois systèmes.

### Les commandes de navigation

| Action | macOS / Linux | Windows (PowerShell) |
|---|---|---|
| Où suis-je ? | `pwd` | `pwd` (ou `Get-Location`) |
| Lister les fichiers | `ls` | `ls` (ou `dir`) |
| Entrer dans un dossier | `cd dossier` | `cd dossier` |
| Remonter d'un niveau | `cd ..` | `cd ..` |
| Aller au dossier personnel | `cd ~` | `cd ~` |
| Créer un dossier | `mkdir nom` | `mkdir nom` |
| Créer un fichier vide | `touch fichier.txt` | `New-Item fichier.txt` |
| Afficher un fichier | `cat fichier.txt` | `cat fichier.txt` |
| Effacer l'écran | `clear` | `cls` |

```bash
pwd                      # /home/nasreddine
mkdir formation-ia       # crée un dossier
cd formation-ia          # on entre dedans
pwd                      # /home/nasreddine/formation-ia
cd ..                    # on remonte
```

### Chemins absolus et relatifs

Un **chemin absolu** part de la racine du disque (`/home/nasreddine/formation-ia` ou `C:\Users\Nasreddine\formation-ia`). Un **chemin relatif** part du dossier courant (`formation-ia/data`, `../autre-dossier`). `.` désigne « ici » et `..` « le dossier parent ».

### ⚠️ Pièges fréquents

- **Les espaces dans les noms** : `cd Mon Dossier` échoue (le terminal lit deux mots). Écris `cd "Mon Dossier"`, ou mieux, évite les espaces et les accents dans les noms de dossiers de projet.
- **Se tromper de dossier** : beaucoup d'erreurs « fichier introuvable » viennent d'un `pwd` qu'on n'a pas vérifié.
- **Tab pour compléter** : appuie sur `Tab` pour compléter un nom ; les flèches ↑ ↓ rappellent les commandes précédentes. Cela évite les fautes de frappe.
- `rm` (suppression) **ne passe pas par la corbeille**. Ne l'utilise jamais avec `-rf` sans être certain du chemin.

> 🏋️ **Pratique immédiate 1.0.1**
> Depuis ton dossier personnel, crée un dossier `formation-ia`, entre dedans, crée-y un sous-dossier `module1`, puis affiche le chemin complet de l'endroit où tu es.
>
> <details><summary>Solution</summary>
>
> ```bash
> cd ~
> mkdir formation-ia
> cd formation-ia
> mkdir module1
> cd module1
> pwd
> ```
> </details>

✅ **Je sais** : me déplacer, créer un dossier, distinguer chemin absolu et relatif.

---

## 1.0.2 — Python : que se passe-t-il quand on « lance » du code ?

### 💡 Intuition

Python est un **langage interprété** : un programme appelé *interpréteur* lit ton code ligne par ligne et l'exécute. Tu peux l'utiliser de quatre manières :

| Mode | Comment | Quand l'utiliser |
|---|---|---|
| **REPL** (mode interactif) | taper `python` dans le terminal | tester une ligne, faire un calcul rapide |
| **Script** | `python mon_script.py` | programme complet, automatisation, production |
| **Notebook** (Jupyter) | cellules exécutables une à une | explorer des données, apprendre, montrer des résultats |
| **IDE / éditeur** | VS Code | écrire du code structuré (projets, modules) |

```text
>>> 2 + 3
5
>>> nom = "IA"
>>> nom * 3
'IAIAIA'
>>> exit()
```

Le `>>>` est l'invite du REPL. Pour le quitter : `exit()` ou `Ctrl+D` (`Ctrl+Z` puis Entrée sous Windows).

**Notebook vs script : la différence qui compte.** Un notebook garde ses variables **en mémoire entre les cellules**, dans l'ordre où *tu* les as exécutées, pas forcément de haut en bas. C'est puissant pour explorer, mais dangereux : un notebook peut « marcher » parce qu'une vieille cellule a laissé une variable en mémoire. **Bonne pratique : avant de partager un notebook, fais *Restart Kernel & Run All*** pour vérifier qu'il s'exécute de haut en bas.

✅ **Je sais** : distinguer REPL, script et notebook, et dire quand utiliser chacun.

---

## 1.0.3 — Installer Python

**Version recommandée : Python 3.11 ou supérieur** (3.12 convient très bien). Toutes les bibliothèques du cursus la supportent.

- **Windows / macOS** : télécharge l'installeur depuis [python.org](https://www.python.org/downloads/). **Sous Windows, coche impérativement « Add python.exe to PATH »** dans la première fenêtre de l'installeur.
- **Linux** : Python est généralement préinstallé. Sur Debian/Ubuntu : `sudo apt install python3 python3-venv python3-pip`.

**Vérifie l'installation :**

```bash
python --version        # sous Windows
python3 --version       # sur macOS/Linux (la commande 'python' peut ne pas exister)
# Python 3.12.3
```

> 🔍 **Sous le capot : le PATH.** Quand tu tapes `python`, le terminal cherche un programme de ce nom dans une liste de dossiers appelée `PATH`. Si Python est installé mais que son dossier n'est pas dans le `PATH`, le terminal répond « commande introuvable ». C'est la cause n°1 des problèmes d'installation sous Windows (d'où la case à cocher).

**Alternative sans installation : Google Colab.** Colab (colab.research.google.com) offre des notebooks Jupyter dans le navigateur, avec Python et les bibliothèques déjà installés. Excellent pour dépanner ou tester, mais tu dois **apprendre à installer un environnement local** : c'est ce que font les ingénieurs, et Git/Docker (chapitres 1.6 et 1.7) l'exigent.

---

## 1.0.4 — Installer un éditeur de code : VS Code

**Recommandation : Visual Studio Code** — gratuit, léger, extensible. Après installation, ajoute les extensions :

- **Python** (Microsoft) : coloration, exécution, débogage
- **Jupyter** (Microsoft) : notebooks dans VS Code
- **Pylance** : autocomplétion et détection d'erreurs

**Sélectionner l'interpréteur Python** : `Ctrl+Shift+P` (ou `Cmd+Shift+P`) → *Python: Select Interpreter* → choisis celui de ton environnement virtuel (`venv`, voir ci-dessous). Si VS Code n'utilise pas le bon interpréteur, tes bibliothèques installées seront « introuvables ».

---

## 1.0.5 — L'environnement virtuel : un atelier propre par projet

### 💡 Intuition

Imagine que chaque projet est un atelier avec ses propres outils. Si tous les projets partagent le même atelier, un outil mis à jour pour l'un casse l'autre. Un **environnement virtuel** (*virtual environment*, `venv`) est un dossier contenant **une copie isolée de Python et de ses bibliothèques**, propre à un projet.

```text
Sans venv :   Projet A (numpy 1.24)  ┐
              Projet B (numpy 2.0)   ├── un seul numpy partagé → conflit !
                                     ┘
Avec venv :   Projet A → venv_A (numpy 1.24)
              Projet B → venv_B (numpy 2.0)      ✅ isolés
```

```bash
# 1) Créer un dossier de projet et y entrer
mkdir formation-ia
cd formation-ia

# 2) Créer l'environnement virtuel (un dossier nommé "venv" est créé)
python -m venv venv          # macOS/Linux : python3 -m venv venv

# 3) L'activer
# Windows (PowerShell) :
venv\Scripts\Activate.ps1
# Windows (cmd) :
venv\Scripts\activate.bat
# macOS/Linux :
source venv/bin/activate

# Le prompt affiche maintenant (venv) devant :
# (venv) $
```

### 🔍 Sous le capot : que fait « activer » ?

L'activation ne « démarre » rien. Elle modifie **temporairement le `PATH`** de ton terminal pour que la commande `python` (et `pip`) pointe vers ceux du dossier `venv/`. Tu peux le vérifier :

```bash
which python        # macOS/Linux  → .../formation-ia/venv/bin/python
where python        # Windows      → ...\formation-ia\venv\Scripts\python.exe
deactivate          # revenir à l'environnement global
```

### ⚠️ Pièges fréquents

- **PowerShell bloque l'activation** (« l'exécution de scripts est désactivée ») : lance une fois `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, ou utilise `activate.bat` dans `cmd`.
- **Oublier d'activer** : tu installes alors les bibliothèques globalement. Vérifie le `(venv)` dans l'invite avant tout `pip install`.
- **Versionner le dossier `venv/`** : ne le fais jamais (il est lourd et propre à ta machine). Tu apprendras à l'exclure avec `.gitignore` au chapitre 1.6.

---

## 1.0.6 — pip et requirements.txt : installer des bibliothèques de façon reproductible

`pip` est le gestionnaire de paquets de Python : il télécharge des bibliothèques depuis le dépôt public **PyPI**.

```bash
pip install numpy pandas matplotlib seaborn scikit-learn jupyter   # installer
pip list                                                           # voir ce qui est installé
pip show numpy                                                     # détails d'un paquet
pip install --upgrade pip                                          # mettre pip à jour
```

Pour que quelqu'un d'autre (ou toi dans six mois, ou un conteneur Docker) puisse recréer **exactement** ton environnement, on fige les versions dans un fichier `requirements.txt` :

```bash
pip freeze > requirements.txt       # écrire la liste des paquets et versions
pip install -r requirements.txt     # recréer l'environnement ailleurs
```

Exemple de contenu :

```text
numpy==2.1.3
pandas==2.2.3
scikit-learn==1.5.2
```

`==` fixe une version précise. C'est la **reproductibilité** : la même entrée doit produire le même résultat, sur ta machine comme sur un serveur.

> 🏋️ **Pratique immédiate 1.0.6**
> Dans ton environnement activé, installe `numpy`, affiche sa version avec `pip show numpy`, puis génère un `requirements.txt` et ouvre-le. Combien de lignes contient-il ?
>
> <details><summary>Solution</summary>
>
> ```bash
> pip install numpy
> pip show numpy
> pip freeze > requirements.txt
> cat requirements.txt      # Windows : type requirements.txt
> ```
> Avec un `venv` neuf, il n'y a qu'une ligne (`numpy==...`) : NumPy n'a pas de dépendances. Sans `venv`, la liste serait beaucoup plus longue — preuve de l'intérêt de l'isolation.
> </details>

---

## 1.0.7 — Jupyter : l'environnement interactif

```bash
pip install jupyter
jupyter notebook          # ouvre un navigateur
```

Tu peux aussi créer un fichier `.ipynb` directement dans VS Code (extension Jupyter). Un notebook est composé de **cellules** :

- **Cellule de code** : `Maj+Entrée` l'exécute et affiche le résultat sous la cellule.
- **Cellule Markdown** : pour écrire du texte et des titres. Utilise-la pour documenter tes analyses.

**Le piège de l'état caché** (voir 1.0.2) : *Kernel → Restart & Run All* avant de conclure que « ça marche ».

---

## 1.0.8 — Vérifier son installation : le script `check_env.py`

Crée le fichier `check_env.py` dans `formation-ia/` et exécute-le avec `python check_env.py` :

```python
"""Vérifie que l'environnement du Module 1 est correctement installé."""
import sys
from importlib import import_module

PAQUETS = ["numpy", "pandas", "matplotlib", "seaborn", "sklearn"]

def verifier():
    ok = True
    v = sys.version_info
    print(f"Python {v.major}.{v.minor}.{v.micro}")
    if (v.major, v.minor) < (3, 11):
        print("❌ Python 3.11 ou supérieur recommandé")
        ok = False
    for nom in PAQUETS:
        try:
            module = import_module(nom)
            print(f"✅ {nom:<12} {getattr(module, '__version__', '?')}")
        except ImportError:
            print(f"❌ {nom:<12} introuvable → pip install {nom}")
            ok = False
    print("\n✅ Environnement prêt !" if ok else "\n⚠️ Corrige les points ci-dessus.")
    return ok

if __name__ == "__main__":
    verifier()
```

> 🔍 Ne t'inquiète pas si tu ne comprends pas encore chaque ligne (`import_module`, `getattr`, `if __name__ == ...`) : tu les rencontreras au chapitre 1.1. Le but est d'obtenir un environnement fonctionnel.

---

## 🛠️ Dépannage : les 8 problèmes les plus fréquents

| Symptôme | Cause probable | Solution |
|---|---|---|
| `python : commande introuvable` (ou « n'est pas reconnu ») | Python absent du `PATH` ou installé sous le nom `python3` | Essaie `python3` / `py` ; sous Windows, réinstalle en cochant *Add to PATH* |
| `ModuleNotFoundError: No module named 'numpy'` | Bibliothèque non installée **dans cet environnement** | Active le `venv`, puis `pip install numpy` |
| Le paquet est installé mais VS Code ne le voit pas | Mauvais interpréteur sélectionné | *Python: Select Interpreter* → choisir celui du `venv` |
| `pip : commande introuvable` | `venv` non activé | Active le `venv` ou utilise `python -m pip install ...` |
| PowerShell refuse `Activate.ps1` | Politique d'exécution | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| `externally-managed-environment` (Linux/macOS récents) | Tu installes dans le Python du système | Utilise un `venv` (c'est la bonne pratique) |
| Le notebook ne trouve pas mes bibliothèques | Le noyau Jupyter n'est pas celui du `venv` | `pip install ipykernel` dans le `venv`, puis sélectionne le noyau dans VS Code |
| Caractères bizarres (`Ã©`) | Mauvais encodage | Toujours écrire/lire en UTF-8 (voir 1.1.5) |

**Réflexe de débutant → réflexe d'ingénieur :** face à une erreur, ne panique pas ; **lis le message en entier, en commençant par la dernière ligne**, et copie-la dans un moteur de recherche. Tu apprendras à lire un *traceback* précisément au chapitre 1.1.7.

---

### 🧠 Quiz de fin de Chapitre 1.0

1. **Quelle commande affiche le dossier dans lequel tu te trouves ?**
   <details><summary>Réponse</summary>`pwd`.</details>
2. **Chemin absolu ou relatif : `../data/train.csv` ?**
   <details><summary>Réponse</summary>Relatif : il part du dossier courant et remonte d'un niveau (`..`).</details>
3. **Quelle est la différence entre un script et un notebook ?**
   <details><summary>Réponse</summary>Un script s'exécute d'un bloc, de haut en bas. Un notebook garde un état en mémoire entre cellules exécutées dans l'ordre choisi par l'utilisateur, ce qui peut cacher des dépendances d'ordre.</details>
4. **À quoi sert un environnement virtuel ?**
   <details><summary>Réponse</summary>Isoler les dépendances (bibliothèques et versions) de chaque projet pour éviter les conflits et garantir la reproductibilité.</details>
5. **Que modifie réellement la commande d'activation d'un `venv` ?**
   <details><summary>Réponse</summary>Le `PATH` du terminal : `python` et `pip` pointent alors vers ceux du `venv`.</details>
6. **Quelle commande crée un `requirements.txt` à partir de l'environnement courant, et laquelle le réinstalle ?**
   <details><summary>Réponse</summary>`pip freeze > requirements.txt` puis `pip install -r requirements.txt`.</details>
7. **Vrai ou faux : on peut versionner le dossier `venv/` pour partager l'environnement.**
   <details><summary>Réponse</summary>Faux. Il est lourd et spécifique à la machine ; on partage `requirements.txt`.</details>
8. **Tu obtiens `ModuleNotFoundError: No module named 'pandas'` alors que tu l'as installé hier. Cite deux causes possibles.**
   <details><summary>Réponse</summary>Le `venv` n'est pas activé (ou pas sélectionné dans VS Code/Jupyter), ou Pandas a été installé dans un autre environnement.</details>

---

### 🎯 MINI-PROJET 1.0 — Ton atelier prêt à l'emploi

1. Crée le dossier `formation-ia/`, son `venv`, et active-le.
2. Installe `numpy pandas matplotlib seaborn scikit-learn jupyter`.
3. Exécute `check_env.py` : tu dois voir « ✅ Environnement prêt ! ».
4. Crée un notebook `bienvenue.ipynb` avec une cellule Markdown (ton nom, ton objectif de reconversion) et une cellule de code `print("Prêt pour le Module 1")`.
5. Génère `requirements.txt`.

**Critères de réussite :** `check_env.py` affiche uniquement des ✅ ; le notebook s'exécute après *Restart & Run All* ; `requirements.txt` existe.

---

**✅ Checklist du chapitre 1.0**
- [ ] Je navigue au terminal (`cd`, `ls`, `mkdir`, `pwd`)
- [ ] Je sais créer, activer et désactiver un `venv`
- [ ] J'installe des paquets avec `pip` et je génère un `requirements.txt`
- [ ] Je lance un notebook et je sais pourquoi *Restart & Run All* est important
- [ ] Mon `check_env.py` est au vert

---

# 📘 CHAPITRE 1.1 — PYTHON : FONDATIONS ABSOLUES

**Durée : 3,5 semaines**

> 🎯 **Objectifs du chapitre.** Écrire des programmes Python corrects et lisibles : manipuler les types de base et les structures de données, contrôler le flux d'exécution, écrire des fonctions, lire/écrire des fichiers, modéliser avec des classes, gérer les erreurs, organiser du code en modules et traiter de gros volumes avec des générateurs.

---

## Pourquoi Python pour l'IA ?

Python est devenu **la langue commune de l'IA** pour plusieurs raisons :

- **Lisibilité** : le code Python ressemble à du pseudo-code, facile à lire et à écrire.
- **Écosystème** : NumPy, Pandas, Scikit-learn, PyTorch, TensorFlow, Hugging Face… tout l'outillage IA est en Python.
- **Communauté** : la plus grande communauté scientifique et IA au monde (donc des réponses à presque toutes tes questions).
- **Interactivité** : les notebooks permettent d'explorer et de visualiser rapidement.

> **Philosophie Python (« The Zen of Python »)** : *« Readability counts »* — le code est lu bien plus souvent qu'il n'est écrit. Tape `import this` dans un REPL pour lire les 19 principes.

**Nuance honnête.** Python est un langage *lent* en lui-même. Si l'IA en Python est rapide, c'est que les calculs lourds sont délégués à des bibliothèques écrites en C/C++/CUDA (NumPy, PyTorch…). Python joue le rôle de **chef d'orchestre** : c'est pourquoi tu apprendras à écrire du code « vectorisé » (chapitre 1.2) plutôt que des boucles.

---

## SEMAINE 1 — Les Bases du Langage

### 1.1.0 — Ton premier programme

> 🎯 **Objectif.** Écrire, exécuter et lire un programme minimal ; comprendre l'indentation et les commentaires.

```python
# Ceci est un commentaire : Python l'ignore. Il explique le POURQUOI du code.
print("Bonjour, monde de l'IA !")      # print() affiche un texte à l'écran

prenom = "Nasreddine"                    # on range une valeur dans une variable
print("Bienvenue,", prenom)              # print accepte plusieurs valeurs
```

Pour interagir avec l'utilisateur, on utilise `input()`, qui renvoie **toujours une chaîne de caractères** (même si l'utilisateur tape un nombre) :
```python
age_texte = input("Quel est ton âge ? ")   # l'utilisateur tape 28 → age_texte vaut "28" (str !)
age = int(age_texte)                        # conversion explicite en entier
print(f"Dans 10 ans, tu auras {age + 10} ans.")
```

### L'indentation : en Python, elle fait partie de la syntaxe

Là où d'autres langages utilisent des accolades `{ }`, Python utilise les **espaces en début de ligne** (4 par convention) pour délimiter un bloc :

```python
note = 14
if note >= 10:
    print("Admis")          # ← ce bloc est dans le 'if' (4 espaces)
    print("Bravo")          # ← toujours dans le 'if'
print("Fin du programme")   # ← hors du 'if' : s'exécute toujours
```

Une indentation incohérente provoque une `IndentationError`. Configure ton éditeur pour insérer 4 espaces quand tu appuies sur `Tab` (c'est le réglage par défaut de VS Code).

### Bien écrire du code : PEP 8 (l'essentiel)

**PEP 8** est le guide de style officiel. Les cinq règles à retenir dès maintenant :

1. Noms de variables et fonctions en `snake_case` (`nombre_de_mots`), classes en `CamelCase` (`ModeleIA`), constantes en `MAJUSCULES` (`TAUX_MAX`).
2. 4 espaces par niveau d'indentation, jamais de tabulations mélangées.
3. Lignes de 79 à 100 caractères maximum.
4. Des noms **explicites** : `score_moyen` plutôt que `sm`.
5. Un commentaire explique le *pourquoi*, pas le *quoi* (`x = x + 1  # ajoute 1` est inutile).

> 🏋️ **Pratique immédiate 1.1.0**
> Écris un programme qui affiche « Bonjour », suivi de ton prénom, puis calcule et affiche le nombre de secondes dans une journée (en utilisant des variables nommées, pas un nombre « magique » écrit directement).
>
> <details><summary>Solution</summary>
>
> ```python
> prenom = "Nasreddine"
> heures_par_jour = 24
> minutes_par_heure = 60
> secondes_par_minute = 60
> secondes_par_jour = heures_par_jour * minutes_par_heure * secondes_par_minute
> print("Bonjour", prenom)
> print("Secondes dans une journée :", secondes_par_jour)   # 86400
> ```
> </details>

---

### 1.1.1 — Variables et Types de Données

> 🎯 **Objectif.** Comprendre ce qu'est vraiment une variable en Python, connaître les types de base, savoir convertir, calculer et formater du texte.

#### 💡 Intuition : des étiquettes, pas des boîtes

Dans beaucoup de langages, une variable est une **boîte** qui contient une valeur. En Python, c'est une **étiquette** collée sur un objet qui existe en mémoire :

```text
age = 28            [étiquette 'age'] ──────────► [objet entier : 28]
age_copie = age     [étiquette 'age_copie'] ────►  (le même objet)
age = 29            [étiquette 'age'] ──────────► [objet entier : 29]     (nouvel objet ; 'age_copie' pointe toujours vers 28)
```

**Typage dynamique.** Contrairement à C++ ou Java (typage statique, où l'on écrit `int age = 28;`), Python déduit le type de l'objet lors de l'assignation. C'est plus rapide à écrire ; le prix est qu'une erreur de type n'est détectée qu'à l'exécution — d'où l'intérêt des *type hints* (voir 1.1.4).

```python
# Les types de base
nom = "Nasreddine"        # str   → chaîne de caractères
age = 28                  # int   → entier (taille illimitée en Python)
taille = 1.78             # float → nombre décimal
est_etudiant = True       # bool  → booléen (True / False)
rien = None               # NoneType → « absence de valeur »

print(type(nom))          # <class 'str'>
print(type(age))          # <class 'int'>
print(type(taille))       # <class 'float'>
print(type(rien))         # <class 'NoneType'>
```

#### 🔍 Sous le capot : `id()`, `is` et `==`

`id(objet)` renvoie l'identité (l'adresse) d'un objet. `==` compare les **valeurs**, `is` compare les **identités** (est-ce *exactement le même objet* ?) :

```python
a = [1, 2, 3]
b = a                # b est une 2e étiquette sur LE MÊME objet
c = [1, 2, 3]        # c est un autre objet de même contenu

print(a == c)        # True  → mêmes valeurs
print(a is c)        # False → objets distincts
print(a is b)        # True  → même objet
print(id(a) == id(b))  # True
```

Règle : utilise `==` pour comparer des valeurs ; réserve `is` à `is None` / `is not None`.

#### Mutabilité : ce qu'on peut modifier « sur place »

Les types `int`, `float`, `str`, `bool`, `tuple` sont **immuables** : on ne peut pas les modifier ; toute opération crée un **nouvel** objet. Les listes, dictionnaires et ensembles sont **mutables** : on les modifie sur place (voir 1.1.2).

```python
texte = "IA"
# texte[0] = "M"     # ← TypeError : 'str' object does not support item assignment
texte = "M" + texte[1:]   # on crée une NOUVELLE chaîne et on déplace l'étiquette
print(texte)               # "MA"
```

#### Conversions de type (casting)

```python
age_str = str(28)          # int → str : "28"
taille_int = int(1.78)     # float → int : 1 (TRONQUE, n'arrondit pas)
print(int("42") + 1)       # str → int : 43
print(float("3.14") * 2)   # str → float : 6.28

print(bool("Faux"))        # True  ! toute chaîne non vide est vraie
print(bool(""))            # False (chaîne vide)
print(bool(0), bool(0.0), bool([]), bool(None))   # False False False False
```

```python
# int("abc")    → ValueError : la conversion n'est possible que si le texte représente un nombre
# int("3.9")    → ValueError aussi : il faut faire int(float("3.9"))
print(int(float("3.9")))   # 3
```

#### Opérations de base

```python
a, b = 10, 3
print(a + b)    # 13      addition
print(a - b)    # 7       soustraction
print(a * b)    # 30      multiplication
print(a / b)    # 3.3333333333333335   division réelle (toujours un float)
print(a // b)   # 3       division entière (quotient)
print(a % b)    # 1       modulo (reste)
print(a ** b)   # 1000    puissance (10³)

# Comparaisons → renvoient True ou False
print(a > b, a == b, a != b, a >= b)    # True False True True
```

**Priorité des opérateurs** (comme en mathématiques) : `**` avant `* / // %` avant `+ -`. Dans le doute, ajoute des parenthèses : `(2 + 3) * 4` est plus lisible que de deviner.

#### ⚠️ Piège : la précision des nombres décimaux

Les ordinateurs stockent les flottants en binaire ; certaines décimales (comme 0,1) n'ont pas de représentation exacte :

```python
import math

print(0.1 + 0.2)                       # 0.30000000000000004
print(0.1 + 0.2 == 0.3)                # False !
print(math.isclose(0.1 + 0.2, 0.3))    # True → comparer des flottants avec une tolérance
```

**Règle en IA :** ne compare jamais deux flottants avec `==` ; utilise `math.isclose` (ou `np.isclose`, chapitre 1.2). Tu retrouveras ce phénomène en Deep Learning (float32 vs float64).

#### Les chaînes de caractères en détail

Une chaîne est une **séquence immuable** de caractères, indexée à partir de 0.

```python
phrase = "L'intelligence artificielle est fascinante"

print(len(phrase))       # 42   (longueur, espaces compris)
print(phrase[0])         # 'L'  (indexation depuis 0)
print(phrase[-1])        # 'e'  (index négatif : depuis la fin)

# Slicing [début:fin:pas] — la fin est EXCLUE
print(phrase[0:14])      # "L'intelligence"
print(phrase[15:])       # "artificielle est fascinante"
print(phrase[:14])       # "L'intelligence"
print(phrase[::-1][:10]) # "etnanicsaf"  (chaîne inversée, 10 premiers caractères)
```

```python
texte = "  bonjour le monde  "
print(texte.strip())                       # "bonjour le monde"   (retire les espaces aux bords)
print(texte.upper())                       # "  BONJOUR LE MONDE  "
print(texte.replace("monde", "monde IA"))  # "  bonjour le monde IA  "
print("monde" in texte)                    # True (test d'inclusion)
mots = texte.strip().split()               # ['bonjour', 'le', 'monde']
print(" - ".join(mots))                    # "bonjour - le - monde"  (l'inverse de split)
```

#### f-strings : formater du texte proprement

Une **f-string** (préfixe `f`) insère des valeurs dans le texte avec `{ }`, et un **spécificateur de format** après `:` contrôle l'affichage :

```python
nom, score = "Claude", 0.9523
print(f"Le modèle {nom} a obtenu {score:.2%}")   # Le modèle Claude a obtenu 95.23%
print(f"Score : {score:.4f}")                    # Score : 0.9523
print(f"Paramètres : {7_000_000_000:,}")         # Paramètres : 7,000,000,000
print(f"|{nom:>10}|{nom:<10}|{nom:^10}|")        # |    Claude|Claude    |  Claude  |
print(f"{42:05d}")                               # 00042   (zéros de remplissage)
x = 3
print(f"{x = }")                                 # x = 3   (très pratique pour déboguer)
```

> 🏋️ **Pratique immédiate 1.1.1**
> **(a)** Prédis le résultat de chaque expression *avant* de l'exécuter : `int(3.9)`, `bool("False")`, `str(42) + "1"`, `type(5 / 2)`, `7 // 2`, `-7 // 2`, `2 ** 3 ** 2`, `"ab" * 3`.
> **(b)** Affiche le nombre `1234567.891` sous la forme `1,234,567.89 €` avec une f-string.
>
> <details><summary>Solution</summary>
>
> ```python
> print(int(3.9))          # 3       (tronque)
> print(bool("False"))     # True    (chaîne non vide)
> print(str(42) + "1")     # "421"   (concaténation de chaînes)
> print(type(5 / 2))       # <class 'float'>  (/ donne toujours un float)
> print(7 // 2)            # 3
> print(-7 // 2)           # -4      (division entière = arrondi vers le BAS, pas vers zéro)
> print(2 ** 3 ** 2)       # 512     (** s'évalue de droite à gauche : 2 ** 9)
> print("ab" * 3)          # "ababab"
> print(f"{1234567.891:,.2f} €")   # 1,234,567.89 €
> ```
> </details>

✅ **Je sais** : expliquer « variable = étiquette », distinguer mutable/immuable, `==`/`is`, convertir des types, éviter `==` sur des flottants, formater avec une f-string.

---

### 1.1.2 — Structures de Données

> 🎯 **Objectif.** Choisir la bonne structure (liste, dictionnaire, tuple, ensemble) pour un problème donné, et comprendre les pièges de la mutabilité.

Les structures de données sont les **conteneurs** dans lesquels on range les données. Bien les choisir conditionne la lisibilité *et* la performance.

**Comparatif : quand utiliser quoi ?**

| Structure | Ordonnée ? | Mutable ? | Doublons ? | Cas d'usage typique | Recherche d'un élément |
|---|---|---|---|---|---|
| **list** `[]` | Oui | Oui | Oui | Collection ordonnée qui évolue | **O(n)** |
| **dict** `{}` | Oui (ordre d'insertion, depuis Python 3.7) | Oui | Clés uniques | Associer une clé à une valeur (config, comptage) | **O(1)** |
| **tuple** `()` | Oui | **Non** | Oui | Données fixes (coordonnées, retour multiple) | O(n) |
| **set** `{}` | Non | Oui | **Non** | Éliminer les doublons, tester l'appartenance | **O(1)** |

#### 💡 Intuition : que signifient O(1) et O(n) ?

Cette notation décrit **comment le temps de recherche évolue quand les données grossissent**.

- **O(n)** — *comme chercher un nom dans un annuaire non trié* : il faut lire les entrées une à une ; avec 10× plus de données, c'est en moyenne 10× plus long.
- **O(1)** — *comme ouvrir un dictionnaire à la bonne page grâce à un index* : le temps ne dépend (quasiment) pas de la taille. Dictionnaires et ensembles utilisent une **table de hachage** : la clé est transformée en un « numéro de case » qui donne un accès direct.

```python
import timeit

donnees_liste = list(range(100_000))
donnees_set = set(donnees_liste)

t_liste = timeit.timeit("99_999 in donnees_liste", globals=globals(), number=200)
t_set = timeit.timeit("99_999 in donnees_set", globals=globals(), number=200)
print(f"liste : {t_liste:.4f} s   |   set : {t_set:.6f} s")
# Typiquement, le set est des milliers de fois plus rapide. Les valeurs exactes dépendent de ta machine.
```

#### Les Listes — séquences ordonnées et modifiables

```python
fruits = ["pomme", "banane", "cerise"]
mixte = [1, "texte", 3.14, True, None]     # Python accepte des types mélangés

print(fruits[0], fruits[-1], fruits[1:])   # pomme cerise ['banane', 'cerise']

fruits.append("mangue")        # ajoute à la fin
fruits.insert(1, "fraise")     # insère à l'index 1
fruits.remove("banane")        # supprime par VALEUR (la 1re occurrence)
dernier = fruits.pop()         # supprime et retourne le dernier (pop(0) : le premier)
fruits.sort()                  # trie SUR PLACE et renvoie None !
print(fruits, dernier)         # ['cerise', 'fraise', 'pomme'] mangue

print(len(fruits), "pomme" in fruits, fruits.index("cerise"))   # 3 True 0

liste1, liste2 = [1, 2, 3], [4, 5, 6]
print(liste1 + liste2)         # [1, 2, 3, 4, 5, 6]   concaténation
print(liste1 * 2)              # [1, 2, 3, 1, 2, 3]   répétition
```

**⚠️ Piège 1 — `.sort()` vs `sorted()`.** `liste.sort()` modifie la liste et renvoie `None` ; `sorted(liste)` renvoie une **nouvelle** liste triée et laisse l'original intact.

```python
notes = [12, 8, 15]
mauvais = notes.sort()          # ← erreur classique : mauvais vaut None !
print(mauvais)                  # None
notes = [12, 8, 15]
print(sorted(notes), notes)     # [8, 12, 15] [12, 8, 15]
```

**⚠️ Piège 2 — Les références : copier une liste.** Assigner une liste à une autre variable ne la copie pas : les deux étiquettes désignent la même liste.

```python
a = [1, 2, 3]
b = a               # b est une 2e étiquette sur la MÊME liste
b.append(4)
print(a)            # [1, 2, 3, 4] ← 'a' a « changé » !

c = a.copy()        # copie superficielle (aussi : list(a) ou a[:])
c.append(5)
print(a, c)         # [1, 2, 3, 4] [1, 2, 3, 4, 5]
```

**Copie superficielle (shallow) vs profonde (deep).** `.copy()` copie la liste *externe* mais pas les objets mutables qu'elle contient :

```python
import copy

matrice = [[1, 2], [3, 4]]
superficielle = matrice.copy()
profonde = copy.deepcopy(matrice)

matrice[0][0] = 99
print(superficielle)   # [[99, 2], [3, 4]]  ← la sous-liste est partagée !
print(profonde)        # [[1, 2], [3, 4]]   ← indépendante
```

**List comprehension** — une syntaxe compacte pour construire une liste :

```python
# Façon classique
carres = []
for n in range(10):
    carres.append(n ** 2)

# Façon pythonique : [expression for élément in itérable if condition]
carres = [n ** 2 for n in range(10)]
print(carres)                                   # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

pairs = [n for n in range(20) if n % 2 == 0]    # avec condition
print(pairs)                                    # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

mots = ["intelligence", "artificielle", "python"]
print([mot.upper() for mot in mots])            # ['INTELLIGENCE', 'ARTIFICIELLE', 'PYTHON']

scores = [0.85, 0.92, 0.73, 0.95, 0.68]
print([s for s in scores if s > 0.8])           # [0.85, 0.92, 0.95]

# Compréhension imbriquée : lire de gauche à droite comme des boucles for imbriquées
matrice = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
aplatie = [element for ligne in matrice for element in ligne]
print(aplatie)                                  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

> 💡 Une compréhension est plus lisible qu'une boucle *tant qu'elle reste courte*. Si tu as besoin de plus d'une condition et d'une transformation complexe, une vraie boucle est préférable.

#### Les Dictionnaires — paires clé : valeur

**💡 Intuition.** Un dictionnaire, c'est un **carnet d'adresses** : on retrouve une information via une *clé* (le nom) plutôt que par sa position. Les clés doivent être **immuables** (str, int, tuple…) et uniques.

```python
modele = {
    "nom": "GPT-4",
    "contexte_max": 128_000,            # tokens
    "open_source": False,
    "performances": [0.87, 0.92, 0.95],   # une liste peut être une valeur
}

print(modele["nom"])                       # GPT-4
print(modele.get("auteur", "inconnu"))     # inconnu  (valeur par défaut si la clé est absente)
# modele["auteur"]                         # ← KeyError si la clé n'existe pas

modele["version"] = "v1.0"                 # ajouter
modele["contexte_max"] = 200_000           # modifier
del modele["open_source"]                  # supprimer

for cle, valeur in modele.items():         # parcourir clés ET valeurs
    print(f"{cle} = {valeur}")
print("nom" in modele)                     # True (teste les CLÉS)

# Dict comprehension
scores = {"Alice": 85, "Bob": 92, "Charlie": 78, "Diana": 95}
print({nom: s for nom, s in scores.items() if s >= 90})     # {'Bob': 92, 'Diana': 95}
```

**Dictionnaires imbriqués (JSON-like)** — c'est ainsi que sont structurées les réponses d'API et les fichiers de configuration :

```python
config = {"modele": {"nom": "mistral-7b", "params": {"temperature": 0.7, "max_tokens": 512}}}
print(config["modele"]["params"]["temperature"])   # 0.7
```

#### Les Tuples — séquences ordonnées et IMMUABLES

```python
point = (3.14, 2.71)
rgb = (255, 128, 0)

# Déballage (unpacking) — très courant
x, y = point
r, g, b = rgb
premier, *reste = [10, 20, 30, 40]     # * récupère « tout le reste »
print(premier, reste)                   # 10 [20, 30, 40]

# Échange de valeurs sans variable temporaire
x, y = y, x

# Retour multiple d'une fonction : Python renvoie en réalité UN tuple
def analyser_texte(texte):
    return len(texte.split()), len(texte)

nb_mots, nb_caracteres = analyser_texte("Bonjour le monde")
print(nb_mots, nb_caracteres)          # 3 16
```

**Pourquoi un tuple plutôt qu'une liste ?** Il exprime une intention (« cette donnée ne doit pas changer »), il est légèrement plus économe, et il peut servir de **clé de dictionnaire** (une liste, non). Exemple : `distances = {(48.85, 2.35): "Paris"}`.

#### Les Ensembles (sets) — valeurs uniques

```python
langages = {"Python", "Python", "Java", "JavaScript", "Python"}
print(len(langages))     # 3 — les doublons disparaissent

a, b = {1, 2, 3, 4, 5}, {3, 4, 5, 6, 7}
print(a & b)             # {3, 4, 5}                intersection
print(a | b)             # {1, 2, 3, 4, 5, 6, 7}    union
print(a - b)             # {1, 2}                   différence
print(a ^ b)             # {1, 2, 6, 7}             différence symétrique

labels = ["chien", "chat", "chien", "oiseau", "chat", "chien"]
print(sorted(set(labels)))     # ['chat', 'chien', 'oiseau']  → valeurs uniques (les classes)
```

⚠️ `{}` crée un **dictionnaire vide**, pas un ensemble vide : pour un set vide, écris `set()`.

#### 🌳 Quelle structure choisir ?

```text
Ai-je besoin d'associer une clé à une valeur ?  ──oui──► dict
        │non
Les éléments doivent-ils être uniques / test d'appartenance rapide ? ──oui──► set
        │non
Les données doivent-elles rester figées ? ──oui──► tuple
        │non
        └────────────────────────────────────────────────► list
```

> 🏋️ **Pratique immédiate 1.1.2**
> **(a)** À partir de `scores = {"Alice": 85, "Bob": 92}`, construis par une dict comprehension le dictionnaire inversé `{85: "Alice", 92: "Bob"}`.
> **(b)** Retire les doublons de `[3, 1, 3, 2, 1]` **en conservant l'ordre d'apparition** (indice : `dict.fromkeys`).
> **(c)** Prédis puis vérifie : `x = [1, 2]; y = x; y += [3]; print(x)`.
>
> <details><summary>Solution</summary>
>
> ```python
> scores = {"Alice": 85, "Bob": 92}
> print({score: nom for nom, score in scores.items()})     # {85: 'Alice', 92: 'Bob'}
>
> print(list(dict.fromkeys([3, 1, 3, 2, 1])))              # [3, 1, 2] — un set perdrait l'ordre
>
> x = [1, 2]; y = x; y += [3]
> print(x)    # [1, 2, 3] — += sur une liste modifie l'objet SUR PLACE, et x le désigne aussi
> ```
> </details>

✅ **Je sais** : choisir une structure, expliquer O(1) vs O(n), copier correctement (superficiel/profond), écrire une compréhension.

---

### 1.1.3 — Contrôle du Flux

> 🎯 **Objectif.** Faire prendre des décisions à un programme (`if`) et répéter des actions (`for`, `while`) sans se tromper de boucle.

#### Valeurs « truthy » et « falsy »

Toute valeur peut être évaluée comme vraie ou fausse dans une condition.

- **Falsy** : `False`, `None`, `0`, `0.0`, `""`, `[]`, `{}`, `set()`, `()`.
- **Truthy** : tout le reste (`"texte"`, `[1]`, `42`, `-1`).

```python
ma_liste = []
if ma_liste:                     # plus pythonique que « if len(ma_liste) > 0 »
    print("Il y a des éléments")
else:
    print("Liste vide")          # ← affiché
```

⚠️ Attention à la confusion classique : `if x:` est faux pour `x = 0`, ce qui peut être un cas légitime. Si 0 est valide, écris explicitement `if x is not None:`.

#### Conditions `if / elif / else`

```python
score = 87.5

if score >= 90:
    mention = "Très bien"
elif score >= 80:          # évalué seulement si les conditions précédentes sont fausses
    mention = "Bien"
elif score >= 70:
    mention = "Assez bien"
else:
    mention = "Insuffisant"
print(f"Score : {score} → Mention : {mention}")   # Score : 87.5 → Mention : Bien
```

**Opérateurs logiques** `and`, `or`, `not`, et comparaisons chaînées :

```python
age, diplome = 25, True
if age >= 18 and diplome:
    print("Éligible")
print(18 <= age < 30)                    # True — comparaison chaînée, comme en maths

statut = "adulte" if age >= 18 else "mineur"    # condition ternaire (une seule ligne)
```

**Court-circuit.** `A and B` n'évalue `B` que si `A` est vrai ; `A or B` n'évalue `B` que si `A` est faux. Utile pour éviter une erreur :

```python
liste = []
if liste and liste[0] > 5:      # liste[0] n'est PAS évalué si liste est vide → pas d'IndexError
    print("Premier élément grand")
valeur = None
nom_affiche = valeur or "anonyme"     # 'or' renvoie le premier opérande truthy
print(nom_affiche)                    # anonyme
```

**Le `match / case` (Python 3.10+)** — un « aiguillage » lisible pour de nombreux cas :

```python
def decrire(commande):
    match commande:
        case "start":
            return "démarrage"
        case "stop" | "quit":
            return "arrêt"
        case _:
            return "commande inconnue"

print(decrire("quit"))     # arrêt
```

#### Boucles : répéter des actions

**Le concept d'itérable.** La boucle `for` de Python parcourt directement les **éléments** d'un *itérable* (liste, chaîne, dictionnaire, `range`, fichier…) — pas besoin de gérer un compteur à la main.

```python
modeles = ["GPT-4", "Claude", "Gemini", "Mistral"]
for modele in modeles:
    print(f"Modèle : {modele}")

for i, modele in enumerate(modeles, start=1):     # enumerate : index + élément
    print(f"{i}. {modele}")

for i in range(5):            # 0, 1, 2, 3, 4          (range(fin), fin exclue)
    pass
print(list(range(2, 10)))     # [2, 3, 4, 5, 6, 7, 8, 9]
print(list(range(0, 10, 2)))  # [0, 2, 4, 6, 8]         (range(début, fin, pas))

noms, notes = ["Alice", "Bob", "Charlie"], [92, 85, 78]
for nom, note in zip(noms, notes):      # zip : parcourir plusieurs listes en parallèle
    print(f"{nom} : {note}/100")
```

**La boucle `while`** répète *tant qu'une condition est vraie*. On l'utilise quand on ne sait pas à l'avance combien de tours seront nécessaires (attendre une saisie valide, converger vers un seuil…).

```python
tentatives, maximum = 0, 3
while tentatives < maximum:
    print(f"Tentative {tentatives + 1}")
    tentatives += 1          # ⚠️ oublier cette ligne = boucle infinie
```

⚠️ **Boucle infinie :** si la condition ne devient jamais fausse, le programme ne s'arrête pas. Dans le terminal, interromps-le avec `Ctrl+C`.

**`break`, `continue` et le `else` des boucles**

```python
for i in range(100):
    if i == 5:
        break                 # sort immédiatement de la boucle
    print(i, end=" ")         # 0 1 2 3 4
print()

for i in range(10):
    if i % 2 == 0:
        continue              # saute à l'itération suivante
    print(i, end=" ")         # 1 3 5 7 9
print()

# 'else' d'une boucle : s'exécute si la boucle s'est terminée SANS break
for n in [4, 6, 8]:
    if n % 2 == 1:
        print("impair trouvé")
        break
else:
    print("Tous pairs")       # affiché ici
```

**Boucles imbriquées** : une boucle dans une boucle (utile pour parcourir une grille). Le nombre de tours se **multiplie** : deux boucles de 1 000 itérations = 1 000 000 d'opérations. C'est une des raisons pour lesquelles on évite les boucles Python sur de grands tableaux (chapitre 1.2).

```python
for ligne in range(1, 4):
    print(" ".join(str(ligne * colonne) for colonne in range(1, 4)))
# 1 2 3
# 2 4 6
# 3 6 9
```

> 🏋️ **Pratique immédiate 1.1.3**
> **(a)** Avec une boucle `while` et `break`, trouve le premier multiple de 7 strictement supérieur à 50.
> **(b)** FizzBuzz : pour les nombres de 1 à 15, affiche « Fizz » si multiple de 3, « Buzz » si multiple de 5, « FizzBuzz » si les deux, sinon le nombre.
>
> <details><summary>Solution</summary>
>
> ```python
> i = 51
> while True:
>     if i % 7 == 0:
>         print(i)          # 56
>         break
>     i += 1
>
> for n in range(1, 16):
>     if n % 15 == 0:       # à tester EN PREMIER (sinon FizzBuzz n'est jamais atteint)
>         print("FizzBuzz")
>     elif n % 3 == 0:
>         print("Fizz")
>     elif n % 5 == 0:
>         print("Buzz")
>     else:
>         print(n)
> ```
> </details>

✅ **Je sais** : écrire une condition, utiliser truthy/falsy et le court-circuit, choisir `for` ou `while`, utiliser `break`/`continue`.

---

### 1.1.4 — Fonctions

> 🎯 **Objectif.** Écrire des fonctions claires, comprendre la portée des variables, utiliser les arguments par défaut/variables et les décorateurs, et vérifier son code avec `assert`.

#### 💡 Intuition

Une fonction est une **recette nommée** : tu lui donnes des ingrédients (les *paramètres*), elle exécute des étapes et te rend un plat (la *valeur de retour*). On écrit une fonction pour **ne pas se répéter** (principe DRY : *Don't Repeat Yourself*) et pour donner un nom à une idée.

```python
def saluer(nom: str) -> str:
    """Retourne un message de bienvenue.

    Args:
        nom: Le prénom de la personne.

    Returns:
        Le message formaté.
    """
    return f"Bonjour, {nom} ! Bienvenue dans la formation IA."

resultat = saluer("Nasreddine")
print(resultat)
```

Anatomie : `def` + nom + `(paramètres)` + `:` puis un bloc indenté. La **docstring** (texte entre triples guillemets) documente la fonction ; `help(saluer)` l'affiche. Les **type hints** (`: str`, `-> str`) **n'imposent rien à l'exécution** mais aident l'éditeur et les collègues.

**`return` vs `print`.** `print` *affiche* ; `return` *renvoie une valeur* que le reste du programme peut réutiliser. Une fonction sans `return` renvoie `None`.

```python
def double_print(x):
    print(x * 2)          # affiche, mais ne renvoie rien

def double_return(x):
    return x * 2          # renvoie une valeur réutilisable

y = double_print(4)       # affiche 8
print(y)                  # None
z = double_return(4) + 1
print(z)                  # 9
```

#### Paramètres par défaut, arguments nommés, `*args`, `**kwargs`

```python
def creer_modele(nom, parametres=7_000_000_000, open_source=True):
    return {"nom": nom, "parametres": parametres, "open_source": open_source}

m1 = creer_modele("Mistral")                                            # valeurs par défaut
m2 = creer_modele("GPT-4", parametres=1_700_000_000_000, open_source=False)
m3 = creer_modele(nom="LLaMA", open_source=True, parametres=70_000_000_000)   # ordre libre si nommés
print(m1)

def additionner(*nombres):        # *args : nombre variable d'arguments positionnels (reçus dans un tuple)
    return sum(nombres)

print(additionner(1, 2), additionner(1, 2, 3, 4, 5))    # 3 15

def configurer(**options):        # **kwargs : arguments nommés (reçus dans un dictionnaire)
    for cle, valeur in options.items():
        print(f"  {cle}: {valeur}")

configurer(temperature=0.7, max_tokens=1000, stream=True)
```

**⚠️ Piège majeur : l'argument par défaut mutable.** La valeur par défaut est créée **une seule fois**, à la définition de la fonction, pas à chaque appel :

```python
def ajouter_mauvais(element, liste=[]):      # ❌ la même liste est réutilisée à chaque appel
    liste.append(element)
    return liste

print(ajouter_mauvais(1))   # [1]
print(ajouter_mauvais(2))   # [1, 2]   ← surprise !

def ajouter_bon(element, liste=None):        # ✅ idiome standard
    if liste is None:
        liste = []
    liste.append(element)
    return liste

print(ajouter_bon(1), ajouter_bon(2))   # [1] [2]
```

#### Portée des variables : la règle LEGB

Quand Python rencontre un nom, il le cherche dans cet ordre : **L**ocal (dans la fonction) → **E**nclosing (fonction englobante) → **G**lobal (le fichier) → **B**uilt-in (`len`, `print`…).

```python
x = "global"

def f():
    x = "local"          # crée une NOUVELLE variable locale : ne modifie pas le x global
    return x

print(f(), x)            # local global

compteur = 0
def incrementer():
    global compteur      # on déclare explicitement vouloir modifier le global (à éviter)
    compteur += 1

incrementer(); incrementer()
print(compteur)          # 2
```

> 💡 **Bonne pratique :** évite `global`. Passe des paramètres et renvoie des résultats : une fonction qui ne dépend que de ses arguments est plus facile à tester.

**Closures et `nonlocal`.** Une fonction définie *dans* une autre « se souvient » des variables de la fonction englobante :

```python
def creer_compteur():
    total = 0
    def compter():
        nonlocal total        # modifier une variable de la fonction englobante
        total += 1
        return total
    return compter            # on RENVOIE la fonction (elle est un objet comme un autre)

c = creer_compteur()
print(c(), c(), c())          # 1 2 3
```

**Fonctions « citoyens de première classe ».** Une fonction est un objet : on peut l'assigner à une variable, la passer en argument, la renvoyer (comme ci-dessus). C'est ce qui rend possibles `sorted(key=...)`, `map`, et les décorateurs.

#### Fonctions lambda, `map`, `filter`, `sorted`

Une **lambda** est une fonction anonyme d'une seule expression :

```python
doubler = lambda x: x * 2      # équivalent à def doubler(x): return x * 2
print(doubler(4))              # 8

modeles = [
    {"nom": "GPT-4", "score": 0.92},
    {"nom": "Mistral", "score": 0.87},
    {"nom": "Claude", "score": 0.94},
]
# Cas d'usage typique : le critère de tri (key)
for m in sorted(modeles, key=lambda m: m["score"], reverse=True):
    print(f"{m['nom']}: {m['score']}")     # Claude, GPT-4, Mistral

nombres = list(range(1, 11))
print(list(map(lambda x: x ** 2, nombres)))           # [1, 4, 9, ..., 100]
print(list(filter(lambda x: x % 2 == 0, nombres)))    # [2, 4, 6, 8, 10]
```

En pratique, une **compréhension** (`[x**2 for x in nombres]`) est souvent plus lisible que `map`/`filter` avec lambda.

#### Récursivité (et mémoïsation) 🔸

Une fonction **récursive** s'appelle elle-même. Elle a besoin d'un **cas de base** (qui arrête la récursion) et d'un **cas récursif** (qui se rapproche du cas de base).

```python
from functools import lru_cache

def factorielle(n):
    if n <= 1:                    # cas de base
        return 1
    return n * factorielle(n - 1)   # cas récursif

@lru_cache(maxsize=None)          # mémoïsation : retient les résultats déjà calculés
def fibonacci(n):
    return n if n < 2 else fibonacci(n - 1) + fibonacci(n - 2)

print(factorielle(5), fibonacci(50))    # 120 12586269025
```

Sans le cache, `fibonacci(50)` recalculerait les mêmes sous-problèmes des milliards de fois. Python limite aussi la profondeur de récursion (~1000 appels).

#### Décorateurs : ajouter un comportement à une fonction

Un décorateur est une fonction qui **prend une fonction et en renvoie une version enrichie**. Construisons-en un pas à pas.

```python
import time
from functools import wraps

def chronometre(fonction):
    @wraps(fonction)                         # conserve le nom et la docstring de la fonction d'origine
    def wrapper(*args, **kwargs):            # accepte n'importe quels arguments
        debut = time.perf_counter()
        resultat = fonction(*args, **kwargs) # appelle la vraie fonction
        duree = time.perf_counter() - debut
        print(f"[{fonction.__name__}] exécutée en {duree:.3f}s")
        return resultat
    return wrapper

@chronometre                  # ← équivaut à : entrainement_lent = chronometre(entrainement_lent)
def entrainement_lent():
    time.sleep(0.2)
    return "Modèle entraîné"

print(entrainement_lent())
```

En IA, on rencontre les décorateurs partout : `@torch.no_grad()`, `@app.get("/")` (FastAPI, chapitre 1.7), `@lru_cache`, `@property`, `@dataclass`.

#### Vérifier son code avec `assert`

`assert condition, "message"` lève une `AssertionError` si la condition est fausse. C'est la forme la plus simple de **test** :

```python
def filtre_longueur(textes: list[str], longueur_min: int) -> list[str]:
    """Garde les chaînes strictement plus longues que longueur_min."""
    return [t for t in textes if len(t) > longueur_min]

assert filtre_longueur(["a", "abc", "abcd"], 2) == ["abc", "abcd"]
assert filtre_longueur([], 3) == []
print("✅ Tous les tests passent")
```

> 🏋️ **Pratique immédiate 1.1.4**
> **(a)** Écris `moyenne(nombres)` qui renvoie la moyenne d'une liste et lève `ValueError` si la liste est vide. Teste-la avec deux `assert`.
> **(b)** Écris un décorateur `@compter_appels` qui compte combien de fois une fonction est appelée (attribut `wrapper.nb_appels`).
>
> <details><summary>Solution</summary>
>
> ```python
> from functools import wraps
>
> def moyenne(nombres):
>     if not nombres:
>         raise ValueError("La liste ne peut pas être vide")
>     return sum(nombres) / len(nombres)
>
> assert moyenne([2, 4, 6]) == 4
> assert moyenne([5]) == 5
>
> def compter_appels(fonction):
>     @wraps(fonction)
>     def wrapper(*args, **kwargs):
>         wrapper.nb_appels += 1
>         return fonction(*args, **kwargs)
>     wrapper.nb_appels = 0
>     return wrapper
>
> @compter_appels
> def dire_bonjour():
>     return "bonjour"
>
> dire_bonjour(); dire_bonjour()
> print(dire_bonjour.nb_appels)    # 2
> ```
> </details>

✅ **Je sais** : écrire une fonction documentée, distinguer `return`/`print`, éviter l'argument mutable par défaut, expliquer LEGB, écrire un décorateur simple, tester avec `assert`.

---

### 1.1.5 — Gestion des Fichiers

> 🎯 **Objectif.** Lire et écrire des fichiers texte, CSV, JSON et JSONL de façon sûre (encodage, fermeture) et manipuler des chemins avec `pathlib`.

La data science commence toujours par lire des fichiers.

#### Le gestionnaire de contexte `with`

Quand on ouvre un fichier, il faut le **fermer** pour libérer la ressource et s'assurer que les données sont bien écrites. Le bloc `with` s'en charge **automatiquement, même si une erreur survient** dans le bloc.

#### Les encodages

Un fichier texte est une suite d'octets ; l'**encodage** dit comment les traduire en caractères. **Spécifie toujours `encoding="utf-8"`** : sinon Python utilise l'encodage par défaut du système (souvent `cp1252` sous Windows) et tu obtiens des `UnicodeDecodeError` ou des caractères déformés (`Ã©` au lieu de `é`).

**Modes d'ouverture** : `"r"` lire (défaut) · `"w"` écrire (**écrase** le fichier !) · `"a"` ajouter à la fin · `"x"` créer (erreur si existe) · ajouter `"b"` pour le binaire (`"rb"`, `"wb"`).

```python
# Écrire (crée ou ÉCRASE le fichier)
with open("donnees.txt", "w", encoding="utf-8") as f:
    f.write("Ligne 1 : Introduction à l'IA\n")
    f.write("Ligne 2 : Python pour la data science\n")

# Ajouter à la fin
with open("donnees.txt", "a", encoding="utf-8") as f:
    f.write("Ligne 3 : Machine Learning\n")

# Lire tout le fichier d'un coup (attention aux gros fichiers)
with open("donnees.txt", "r", encoding="utf-8") as f:
    contenu = f.read()
print(contenu)

# Lire ligne par ligne : économe en mémoire, le fichier est un itérable
with open("donnees.txt", "r", encoding="utf-8") as f:
    for ligne in f:
        print(ligne.strip())      # strip() retire le '\n' final
```

#### CSV : des tableaux en texte

Un **CSV** (*Comma-Separated Values*) stocke un tableau : une ligne par enregistrement, des colonnes séparées par un délimiteur. ⚠️ Le délimiteur varie (`,` ou `;` — courant dans les exports français) et un champ qui contient le délimiteur est entouré de guillemets.

```python
import csv

donnees = [
    ["nom", "score", "niveau"],
    ["Alice", 92, "avancé"],
    ["Bob", 78, "intermédiaire"],
    ["Charlie", 65, "débutant"],
]

# newline="" est requis par le module csv pour éviter des lignes vides sous Windows
with open("etudiants.csv", "w", newline="", encoding="utf-8") as f:
    csv.writer(f).writerows(donnees)

with open("etudiants.csv", "r", encoding="utf-8") as f:
    for ligne in csv.DictReader(f):           # chaque ligne devient un dict {colonne: valeur}
        print(f"{ligne['nom']}: {ligne['score']} pts")   # ⚠️ 'score' est une chaîne : "92"
```

⚠️ Un CSV ne stocke que du **texte** : `"92"` n'est pas le nombre 92 ; c'est à toi de convertir (`int(ligne["score"])`). Pandas (chapitre 1.3) le fait pour toi.

#### JSON : le format universel des échanges

**JSON** (*JavaScript Object Notation*) représente des données structurées avec des dictionnaires, listes, chaînes, nombres, booléens et `null`. C'est le format des API, des fichiers de configuration et de la plupart des jeux de données de LLM.

| Python | JSON |
|---|---|
| `dict` | objet `{}` |
| `list`, `tuple` | tableau `[]` |
| `str` | chaîne |
| `int`, `float` | nombre |
| `True` / `False` / `None` | `true` / `false` / `null` |

```python
import json

modele_info = {
    "nom": "Mistral-7B",
    "parametres": 7_000_000_000,
    "langues": ["français", "anglais", "espagnol"],
    "config": {"temperature": 0.7, "max_tokens": 4096},
}

with open("modele.json", "w", encoding="utf-8") as f:
    json.dump(modele_info, f, indent=2, ensure_ascii=False)    # ensure_ascii=False conserve les accents

with open("modele.json", "r", encoding="utf-8") as f:
    data = json.load(f)
print(data["nom"], data["config"])

# Chaîne ↔ objet (s = string) : loads / dumps
dico = json.loads('{"cle": "valeur", "nombre": 42}')     # str → dict
texte = json.dumps(dico)                                  # dict → str
print(dico, texte)
```

**⚠️ Limites :** JSON ne sait pas sérialiser les dates, les ensembles ni les tableaux NumPy (`TypeError: Object of type ... is not JSON serializable`). Il faut les convertir (`date.isoformat()`, `list(ensemble)`, `array.tolist()`).

**JSONL (JSON Lines) : un objet JSON par ligne.** C'est le format standard des jeux de données d'entraînement de LLM : on peut le lire ligne par ligne sans tout charger en mémoire (lien avec les générateurs, 1.1.9).

```python
exemples = [
    {"prompt": "Capitale de la France ?", "reponse": "Paris"},
    {"prompt": "2 + 2 ?", "reponse": "4"},
]
with open("dataset.jsonl", "w", encoding="utf-8") as f:
    for ex in exemples:
        f.write(json.dumps(ex, ensure_ascii=False) + "\n")

with open("dataset.jsonl", "r", encoding="utf-8") as f:
    relus = [json.loads(ligne) for ligne in f]
print(relus[0]["reponse"])     # Paris
```

#### `pathlib` : manipuler les chemins proprement

`pathlib.Path` remplace avantageusement la concaténation de chaînes et `os.path` : il gère les différences Windows/macOS/Linux.

```python
from pathlib import Path

chemin = Path("data") / "dataset.csv"        # l'opérateur / assemble les morceaux
print(chemin.name, chemin.stem, chemin.suffix, chemin.parent)   # dataset.csv dataset .csv data

chemin.parent.mkdir(parents=True, exist_ok=True)    # crée le dossier s'il n'existe pas
chemin.write_text("a,b\n1,2\n", encoding="utf-8")   # écrit un petit fichier en une ligne
print(chemin.read_text(encoding="utf-8"))
print(chemin.exists(), chemin.is_file())             # True True

for fichier in Path("data").glob("*.csv"):           # lister les fichiers correspondant à un motif
    print("trouvé :", fichier)
```

**🔸 Sérialiser un modèle : `pickle` et son danger.** `pickle` enregistre presque n'importe quel objet Python (utilisé pour les modèles scikit-learn). Mais **charger un fichier pickle exécute du code** : n'ouvre jamais un `.pkl` dont tu ne connais pas la source. Nous verrons `joblib` et des alternatives plus sûres aux chapitres 1.5 et 1.7.

> 🏋️ **Pratique immédiate 1.1.5**
> **(a)** Avec `pathlib`, vérifie si `config.json` existe ; sinon, crée-le avec le contenu `{}`.
> **(b)** Écris un dictionnaire contenant une clé `"date"` valant `datetime.date.today()` dans un JSON : que se passe-t-il ? Corrige.
>
> <details><summary>Solution</summary>
>
> ```python
> from pathlib import Path
> import json, datetime
>
> p = Path("config.json")
> if not p.exists():
>     p.write_text("{}", encoding="utf-8")
>
> d = {"date": datetime.date.today()}
> # json.dumps(d)   → TypeError : Object of type date is not JSON serializable
> print(json.dumps({"date": d["date"].isoformat()}))    # on convertit la date en texte ISO
> ```
> </details>

✅ **Je sais** : ouvrir un fichier avec `with` et `encoding="utf-8"`, lire/écrire CSV, JSON, JSONL, utiliser `pathlib`.

---

## SEMAINE 2 — Programmation Orientée Objet

### 1.1.6 — Classes et Objets

> 🎯 **Objectif.** Comprendre pourquoi et comment regrouper des données et des comportements dans une classe ; lire et écrire une classe avec `__init__`, méthodes, propriétés, méthodes spéciales, héritage et composition.

La POO est **indispensable** pour comprendre Scikit-learn, PyTorch, Hugging Face et presque toutes les bibliothèques IA : un modèle est un objet, un jeu de données est un objet, un optimiseur est un objet.

#### 💡 Intuition : du désordre à l'organisation

Sans classes, on représente un modèle par des variables ou un dictionnaire, et les fonctions qui l'utilisent sont éparpillées :

```python
# Sans classe : tout est « libre », rien ne garantit la cohérence
modele = {"nom": "Mistral", "precision": 0.0, "est_entraine": False}

def entrainer(m):
    m["precision"] = 0.9
    m["est_entraine"] = True

entrainer(modele)
modele["precison"] = 0.5        # ← faute de frappe : Python crée une nouvelle clé sans rien dire !
```

Une **classe** est un **moule** qui regroupe :
- des **attributs** (les données) : `nom`, `precision`…
- des **méthodes** (les comportements) : `entrainer()`, `predire()`…

Un **objet** (ou **instance**) est une pièce fabriquée à partir du moule. Le moule est unique, on peut fabriquer autant d'objets qu'on veut, chacun avec ses propres valeurs.

```text
Classe  Chien                       Objets (instances)
┌──────────────────────┐            ┌────────────────┐  ┌────────────────┐
│ attributs : nom, âge │  ───────►  │ rex  (nom=Rex) │  │ mia (nom=Mia)  │
│ méthodes  : aboyer() │            └────────────────┘  └────────────────┘
└──────────────────────┘
```

#### Premier exemple, pas à pas

```python
class Chien:
    """Un chien très simple."""

    def __init__(self, nom, age):     # constructeur : appelé automatiquement à la création
        self.nom = nom                # attribut d'instance : propre à CET objet
        self.age = age

    def aboyer(self):                 # méthode : une fonction qui appartient à la classe
        return f"{self.nom} dit : Wouf !"

rex = Chien("Rex", 3)                 # création d'une instance → Python appelle __init__("Rex", 3)
mia = Chien("Mia", 5)
print(rex.aboyer())                   # Rex dit : Wouf !
print(mia.nom, mia.age)               # Mia 5
```

**Qu'est-ce que `self` ?** C'est l'objet sur lequel la méthode est appelée. Quand tu écris `rex.aboyer()`, Python exécute en réalité `Chien.aboyer(rex)` : `self` reçoit `rex`. C'est pourquoi **chaque méthode d'instance prend `self` en premier paramètre** et pourquoi on écrit `self.nom` pour lire l'attribut de *cet* objet.

**Attribut de classe vs attribut d'instance.** Un attribut défini dans le corps de la classe (hors `__init__`) est **partagé** par toutes les instances ; un attribut `self.x` est propre à chaque instance.

```python
class Compteur:
    total_crees = 0                   # attribut de CLASSE (partagé)

    def __init__(self, nom):
        self.nom = nom                # attribut d'INSTANCE
        Compteur.total_crees += 1

a, b = Compteur("a"), Compteur("b")
print(Compteur.total_crees)           # 2
```

#### Encapsulation : une convention, pas une interdiction

Python n'a pas de vrais attributs « privés ». La convention est de préfixer d'un underscore (`self._poids`) pour dire : « usage interne, ne touche pas directement ». Pour contrôler l'accès, on utilise **`@property`** : elle permet de lire un attribut comme un champ tout en exécutant du code (validation, calcul).

```python
class Precision:
    def __init__(self, valeur=0.0):
        self.valeur = valeur              # passe par le setter ci-dessous

    @property
    def valeur(self):                     # lecture : p.valeur
        return self._valeur

    @valeur.setter
    def valeur(self, v):                  # écriture : p.valeur = 0.9
        if not 0 <= v <= 1:
            raise ValueError(f"La précision doit être entre 0 et 1 (reçu : {v})")
        self._valeur = v

    @property
    def en_pourcentage(self):             # propriété calculée, en lecture seule
        return f"{self._valeur:.1%}"

p = Precision(0.87)
print(p.en_pourcentage)                   # 87.0%
try:
    p.valeur = 1.5
except ValueError as e:
    print("Refusé :", e)
```

#### Méthodes spéciales (« dunder methods »)

Les méthodes entourées de doubles underscores (`__init__`, `__str__`, `__len__`…) permettent à ton objet de **s'intégrer à la syntaxe de Python** : `print(obj)`, `len(obj)`, `obj1 + obj2`, `obj[0]`, `obj1 == obj2`…

```python
class Vecteur:
    """Vecteur mathématique simple (préfigure les tableaux NumPy)."""

    def __init__(self, *composantes):
        self.composantes = list(composantes)

    def __repr__(self):                   # représentation « développeur » (dans le REPL, listes…)
        return f"Vecteur({', '.join(map(str, self.composantes))})"

    def __len__(self):                    # len(v)
        return len(self.composantes)

    def __getitem__(self, i):             # v[i]
        return self.composantes[i]

    def __eq__(self, autre):              # v1 == v2
        return self.composantes == autre.composantes

    def __add__(self, autre):             # v1 + v2
        if len(self) != len(autre):
            raise ValueError("Dimensions différentes")
        return Vecteur(*(a + b for a, b in zip(self.composantes, autre.composantes)))

    def __mul__(self, k):                 # v * 3  (multiplication par un scalaire)
        return Vecteur(*(k * a for a in self.composantes))

    def produit_scalaire(self, autre):
        return sum(a * b for a, b in zip(self.composantes, autre.composantes))

u, v = Vecteur(1, 2, 3), Vecteur(4, 5, 6)
print(u + v, u * 2, len(u), u[1])         # Vecteur(5, 7, 9) Vecteur(2, 4, 6) 3 2
print(u.produit_scalaire(v))              # 32  (1×4 + 2×5 + 3×6)
print(u == Vecteur(1, 2, 3))              # True
```

`__str__` (affichage « utilisateur », pour `print`) et `__repr__` (affichage « développeur », sans ambiguïté) sont les deux plus utiles. Si `__str__` est absent, Python utilise `__repr__`.

#### `@dataclass` : moins de code pour les classes de données

Quand une classe sert surtout à **transporter des données**, `@dataclass` génère automatiquement `__init__`, `__repr__` et `__eq__` :

```python
from dataclasses import dataclass, field

@dataclass
class Experience:
    nom: str
    learning_rate: float = 0.01
    epochs: int = 10
    scores: list[float] = field(default_factory=list)   # défaut mutable : toujours via field(...)

exp = Experience("test-1", epochs=5)
exp.scores.append(0.91)
print(exp)                 # Experience(nom='test-1', learning_rate=0.01, epochs=5, scores=[0.91])
```

#### Un exemple complet : `ModeleIA`

```python
class ModeleIA:
    """Représente un modèle d'IA (simulation pédagogique)."""

    nombre_modeles = 0                       # attribut de classe

    def __init__(self, nom, nb_parametres, precision=0.0):
        self.nom = nom
        self.nb_parametres = nb_parametres
        self.precision = precision
        self.est_entraine = False
        self.historique = []                 # attribut d'instance mutable : créé DANS __init__
        ModeleIA.nombre_modeles += 1

    def entrainer(self, donnees, epochs=5):
        """Simule l'entraînement : la précision se rapproche progressivement de 0,99."""
        print(f"🚀 Entraînement de {self.nom} sur {len(donnees)} exemples...")
        for epoch in range(epochs):
            self.precision += 0.05 * (0.99 - self.precision)
            self.historique.append(round(self.precision, 4))
            print(f"  Époque {epoch + 1}/{epochs} : précision = {self.precision:.4f}")
        self.est_entraine = True

    def predire(self, texte):
        if not self.est_entraine:
            raise RuntimeError(f"Le modèle {self.nom} n'est pas encore entraîné !")
        return f"[{self.nom}] '{texte}' → Positif (confiance : {self.precision:.1%})"

    def __str__(self):
        return f"{self.nom} ({self.taille_lisible(self.nb_parametres)}, précision {self.precision:.1%})"

    @classmethod
    def compter(cls):                        # méthode de classe : reçoit la classe (cls), pas l'instance
        return f"Modèles créés : {cls.nombre_modeles}"

    @staticmethod
    def taille_lisible(nb):                  # méthode statique : n'utilise ni self ni cls
        if nb >= 1_000_000_000:
            return f"{nb / 1_000_000_000:.1f}B"
        if nb >= 1_000_000:
            return f"{nb / 1_000_000:.1f}M"
        return f"{nb:,}"

mistral = ModeleIA("Mistral-7B", 7_000_000_000)
mistral.entrainer(list(range(1000)), epochs=3)
print(mistral.predire("Ce film est magnifique !"))
print(mistral, "|", ModeleIA.compter())
```

**Différence entre les trois types de méthodes :**

| Décorateur | Premier paramètre | Accède à… | Usage |
|---|---|---|---|
| *(aucun)* | `self` | l'instance | comportement d'un objet |
| `@classmethod` | `cls` | la classe | constructeurs alternatifs, compteurs |
| `@staticmethod` | *(aucun)* | rien | fonction utilitaire rattachée à la classe |

#### Héritage : spécialiser une classe

L'**héritage** exprime une relation **« est un »** : un LLM *est un* modèle d'IA. La classe fille récupère tout ce que fait la classe mère et peut le compléter ou le remplacer.

```python
class LLM(ModeleIA):
    """Large Language Model : spécialisation de ModeleIA."""

    def __init__(self, nom, nb_parametres, contexte_max):
        super().__init__(nom, nb_parametres)     # 1) initialise la partie « ModeleIA »
        self.contexte_max = contexte_max         # 2) ajoute ce qui est propre aux LLM

    def generer(self, prompt, max_tokens=50):
        if not self.est_entraine:
            raise RuntimeError("Modèle non entraîné")
        return f"[{self.nom}] {prompt} ... (texte généré)"

    def __str__(self):                            # redéfinition (override) + appel à la version parente
        return super().__str__() + f", contexte {self.contexte_max:,} tokens"

llm = LLM("Petit-LLM", 1_000_000_000, 8_192)
llm.entrainer([1, 2, 3], epochs=2)
print(llm)
print(isinstance(llm, LLM), isinstance(llm, ModeleIA))    # True True
```

`super()` désigne la classe mère : sans lui, `__init__` de la mère ne serait pas exécuté et les attributs hérités n'existeraient pas.

**Polymorphisme et duck typing.** Des objets de classes différentes qui offrent la **même méthode** peuvent être utilisés de façon interchangeable : *« si ça marche comme un canard et que ça cancane comme un canard, c'est un canard »*. C'est l'idée derrière l'API `fit/predict` de Scikit-learn : tout objet qui a ces méthodes peut jouer le rôle de modèle.

#### Composition : « a un » plutôt que « est un »

L'héritage n'est pas toujours le bon outil. Un **réseau de neurones contient** des couches ; il n'*est pas* une couche. On parle de **composition** :

```python
class Couche:
    def __init__(self, nom, nb_neurones):
        self.nom, self.nb_neurones = nom, nb_neurones

class Reseau:
    def __init__(self, couches):
        self.couches = couches                  # un Reseau CONTIENT des Couche

    def nb_parametres(self):
        return sum(a.nb_neurones * b.nb_neurones + b.nb_neurones      # poids + biais
                   for a, b in zip(self.couches, self.couches[1:]))

reseau = Reseau([Couche("entrée", 4), Couche("cachée", 8), Couche("sortie", 2)])
print(reseau.nb_parametres())     # (4×8+8) + (8×2+2) = 40 + 18 = 58
```

> **Règle pratique :** préfère la composition à l'héritage, sauf quand la relation « est un » est évidente. Beaucoup de code compliqué vient d'héritages trop profonds.

#### 🌉 Pont vers Scikit-learn : écrire ton propre estimateur

Voici un modèle minimal respectant la convention `fit` / `predict` / `score` — celle que tu utiliseras au chapitre 1.5 :

```python
from collections import Counter

class ClassifieurMajoritaire:
    """Baseline : prédit toujours la classe la plus fréquente du jeu d'entraînement."""

    def fit(self, X, y):
        self.classe_majoritaire_ = Counter(y).most_common(1)[0][0]   # « _ » final : appris pendant fit
        return self                                                   # permet le chaînage

    def predict(self, X):
        return [self.classe_majoritaire_ for _ in X]

    def score(self, X, y):
        pred = self.predict(X)
        return sum(p == v for p, v in zip(pred, y)) / len(y)

modele = ClassifieurMajoritaire().fit([[0], [1], [2], [3]], ["A", "A", "A", "B"])
print(modele.predict([[9], [8]]), modele.score([[0], [1]], ["A", "B"]))   # ['A', 'A'] 0.5
```

Un tel « baseline » est très utile en ML : un vrai modèle doit *au minimum* faire mieux que lui.

> 🏋️ **Pratique immédiate 1.1.6**
> **(a)** Crée une classe `Rectangle(largeur, hauteur)` avec une propriété `aire`, une méthode `perimetre()` et un `__str__`.
> **(b)** Crée une classe `Carre` qui **hérite** de `Rectangle` (un seul paramètre `cote`).
> **(c)** Ajoute `__eq__` à `Rectangle` pour que deux rectangles de mêmes dimensions soient égaux.
>
> <details><summary>Solution</summary>
>
> ```python
> class Rectangle:
>     def __init__(self, largeur, hauteur):
>         self.largeur, self.hauteur = largeur, hauteur
>
>     @property
>     def aire(self):
>         return self.largeur * self.hauteur
>
>     def perimetre(self):
>         return 2 * (self.largeur + self.hauteur)
>
>     def __str__(self):
>         return f"Rectangle({self.largeur}×{self.hauteur})"
>
>     def __eq__(self, autre):
>         return (self.largeur, self.hauteur) == (autre.largeur, autre.hauteur)
>
> class Carre(Rectangle):
>     def __init__(self, cote):
>         super().__init__(cote, cote)
>
> c = Carre(3)
> print(c, c.aire, c.perimetre())          # Rectangle(3×3) 9 12
> print(c == Rectangle(3, 3))              # True
> ```
> </details>

✅ **Je sais** : créer une classe, expliquer `self`, distinguer attribut de classe/d'instance, utiliser `@property`, `__str__`, `__eq__`, `@dataclass`, hériter avec `super()`, choisir composition ou héritage.

---

## SEMAINE 3 — Python Avancé pour la Data Science

### 1.1.7 — Gestion des Erreurs (Exceptions)

> 🎯 **Objectif.** Lire un message d'erreur, prévoir et gérer les erreurs avec `try/except`, lever ses propres exceptions et déboguer méthodiquement.

#### 💡 Intuition

Un programme rencontre inévitablement des imprévus : fichier absent, division par zéro, entrée invalide, réseau coupé. Une **exception** est un signal d'alarme qui **interrompt le déroulement normal** et remonte la pile d'appels jusqu'à ce que quelqu'un la traite (`except`) — sinon le programme s'arrête avec un *traceback*.

#### Lire un traceback (compétence de survie n°1)

```text
Traceback (most recent call last):
  File "analyse.py", line 12, in <module>          ← 1) l'appel de plus haut niveau
    resultat = moyenne_scores(donnees)
  File "analyse.py", line 5, in moyenne_scores    ← 2) la fonction appelée
    return total / len(scores)
ZeroDivisionError: division by zero                 ← 3) LE TYPE et le MESSAGE de l'erreur
```

**Méthode : lis de bas en haut.**
1. **Dernière ligne** : le *type* d'erreur et son message → *que s'est-il passé ?*
2. **La ligne juste au-dessus** : le fichier, le numéro de ligne et l'instruction fautive → *où ?*
3. **Les lignes précédentes** : la chaîne d'appels → *comment en est-on arrivé là ?*

| Erreur | Signification typique |
|---|---|
| `SyntaxError` / `IndentationError` | code mal écrit ; ne s'exécute même pas |
| `NameError` | variable/fonction non définie (faute de frappe ? oubli d'`import` ?) |
| `TypeError` | opération sur un mauvais type (`"a" + 1`) ou mauvais nombre d'arguments |
| `ValueError` | bon type, mauvaise valeur (`int("abc")`) |
| `IndexError` | index hors des limites d'une séquence |
| `KeyError` | clé absente d'un dictionnaire |
| `AttributeError` | l'objet n'a pas cet attribut/méthode (`None.append`) |
| `FileNotFoundError` | chemin incorrect (vérifie `pwd` !) |
| `ZeroDivisionError` | division par zéro |
| `ModuleNotFoundError` | bibliothèque non installée dans cet environnement |

#### La hiérarchie des exceptions

Toutes les exceptions sont des **objets** qui héritent d'une classe commune :

```text
BaseException
 ├── KeyboardInterrupt          (Ctrl+C)
 ├── SystemExit
 └── Exception                  ← ce que l'on capture en général
      ├── ValueError
      ├── TypeError
      ├── LookupError ── IndexError, KeyError
      ├── ArithmeticError ── ZeroDivisionError
      └── OSError ── FileNotFoundError, PermissionError
```

**Ne jamais écrire un `except:` nu** : il capturerait même `KeyboardInterrupt` (impossible d'arrêter le script avec Ctrl+C) et masquerait de vrais bugs. Capture le type **le plus précis possible**.

#### `try / except / else / finally`

```python
def diviser(a, b):
    try:
        resultat = a / b                      # code qui PEUT échouer
    except ZeroDivisionError:
        print("❌ Division par zéro !")
        return None
    except TypeError as e:                    # 'as e' donne accès à l'objet exception
        print(f"❌ Erreur de type : {e}")
        return None
    else:
        print("✓ Aucun problème")             # s'exécute UNIQUEMENT si le try s'est bien passé
        return resultat
    finally:
        print("✓ Terminé")                    # s'exécute TOUJOURS (nettoyage : fermer un fichier…)

print(diviser(10, 2))
print(diviser(10, 0))
print(diviser(10, "a"))
```

**Principe : « demander pardon plutôt que la permission » (EAFP).** En Python, on tente l'opération et on gère l'échec, plutôt que de tester toutes les conditions à l'avance. Mais **garde le bloc `try` le plus court possible** : n'y mets que l'instruction qui peut échouer.

#### Lever ses propres exceptions

```python
class ScoreInvalideError(ValueError):
    """Score hors de l'intervalle autorisé."""

def valider_precision(precision):
    if not 0 <= precision <= 1:
        raise ScoreInvalideError(f"La précision doit être entre 0 et 1. Reçu : {precision}")
    return precision

try:
    valider_precision(1.5)
except ScoreInvalideError as e:
    print(f"Valeur invalide : {e}")
```

Créer sa propre exception (en héritant d'une exception existante) rend les erreurs **explicites** pour les utilisateurs de ton code.

**Enchaîner les exceptions : `raise ... from`.** Pour traduire une erreur technique en erreur « métier » sans perdre la cause :

```python
import json

def charger_config(texte):
    try:
        return json.loads(texte)
    except json.JSONDecodeError as e:
        raise ValueError("Configuration illisible : JSON invalide") from e

try:
    charger_config("{pas du json")
except ValueError as e:
    print(e, "| cause :", type(e.__cause__).__name__)
```

#### `logging` plutôt que `print` pour suivre un programme

`print` est parfait pour apprendre, mais un vrai programme utilise le module `logging` : niveaux (DEBUG, INFO, WARNING, ERROR), horodatage, écriture vers un fichier, et possibilité de tout désactiver sans modifier le code.

```python
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s", force=True)
journal = logging.getLogger("entrainement")

journal.info("Début de l'entraînement")
journal.warning("Le jeu de validation est très petit (12 exemples)")
try:
    1 / 0
except ZeroDivisionError:
    journal.exception("Une erreur est survenue")     # affiche aussi le traceback
```

#### Déboguer sans `print` partout : `breakpoint()` et le débogueur VS Code

`breakpoint()` suspend l'exécution et ouvre une console interactive (`pdb`) à cet endroit : tu peux inspecter les variables (`p variable`), avancer ligne à ligne (`n`), entrer dans une fonction (`s`), continuer (`c`), quitter (`q`). Dans VS Code, clique à gauche du numéro de ligne pour poser un **point d'arrêt** rouge, puis lance *Run → Start Debugging* (F5) : le panneau de gauche affiche toutes les variables.
```python
def moyenne_par_classe(scores):
    total = 0
    for s in scores:
        breakpoint()        # ← l'exécution s'arrête ici ; tape « p s » puis « c » pour continuer
        total += s
    return total / len(scores)
```

**Méthode de débogage en 5 étapes :** (1) lire le traceback de bas en haut ; (2) reproduire l'erreur avec le plus petit exemple possible ; (3) formuler une hypothèse ; (4) la vérifier (breakpoint, `print(type(x), x)`) ; (5) corriger *et* ajouter un test pour que l'erreur ne revienne pas.

> 🏋️ **Pratique immédiate 1.1.7**
> Écris `lire_entier(texte)` qui convertit une chaîne en entier ; si la conversion échoue, elle renvoie `None` **sans planter**. Puis écris `charger_json(chemin)` qui renvoie le contenu d'un fichier JSON ou `{}` si le fichier n'existe pas.
>
> <details><summary>Solution</summary>
>
> ```python
> import json
> from pathlib import Path
>
> def lire_entier(texte):
>     try:
>         return int(texte)
>     except ValueError:
>         return None
>
> def charger_json(chemin):
>     try:
>         return json.loads(Path(chemin).read_text(encoding="utf-8"))
>     except FileNotFoundError:
>         return {}
>
> print(lire_entier("42"), lire_entier("abc"), charger_json("inexistant.json"))   # 42 None {}
> ```
> </details>

✅ **Je sais** : lire un traceback de bas en haut, capturer précisément une exception, utiliser `else`/`finally`, lever et créer des exceptions, utiliser `logging` et `breakpoint()`.

---

### 1.1.8 — Modules et Packages

> 🎯 **Objectif.** Organiser son code en modules, comprendre `import`, utiliser la bibliothèque standard et écrire un petit programme en ligne de commande.

#### 💡 Intuition

Un **module** est un simple fichier `.py` ; un **package** est un dossier de modules. Plutôt que d'écrire 2 000 lignes dans un seul fichier, on découpe en modules cohérents : la lecture, les tests et la réutilisation deviennent faciles. `import` permet de charger le code d'un autre fichier ou d'une bibliothèque.

```python
import math                          # importer tout le module : on écrit math.sqrt(...)
print(math.pi, math.sqrt(16), math.log(100, 10))

import numpy as np                   # alias : conventions universelles en data science
import pandas as pd
import matplotlib.pyplot as plt

from math import pi, sqrt            # importer des noms précis
from collections import Counter, defaultdict, deque
```

**⚠️ Évite `from module import *`** : il pollue l'espace de noms et rend impossible de savoir d'où vient chaque nom.

#### Créer ton propre module et ton propre package

Arborescence typique :

```text
mon_projet/
├── main.py
└── mlkit/                 ← un package : un dossier avec __init__.py
    ├── __init__.py        (peut être vide ; marque le dossier comme package)
    ├── stats.py
    └── io_utils.py
```

```python
# mlkit/stats.py
def moyenne(valeurs):
    return sum(valeurs) / len(valeurs)

if __name__ == "__main__":       # exécuté SEULEMENT si on lance « python stats.py » directement
    print(moyenne([1, 2, 3]))    # test rapide, ignoré quand le fichier est importé
```
```python
# main.py
from mlkit.stats import moyenne          # import absolu depuis la racine du projet
print(moyenne([10, 20, 30]))
# À l'intérieur du package, on peut aussi écrire : from .stats import moyenne  (import relatif)
```

**`if __name__ == "__main__":`** — quand un fichier est *lancé*, Python met `__name__` à `"__main__"` ; quand il est *importé*, `__name__` vaut le nom du module. Cette ligne sépare donc « ce qui s'exécute en lançant le fichier » de « ce qui est réutilisable par import ».

**`pip` et `requirements.txt`** (rappel du chapitre 1.0) installent des packages tiers depuis PyPI.

#### Tour de la bibliothèque standard (« batteries included »)

Python fournit de nombreux modules prêts à l'emploi. Les plus utiles pour l'IA :

```python
from collections import Counter, defaultdict, deque

# Counter : compter des occurrences
texte = "le chat mange le poisson et le chien mange l'os"
print(Counter(texte.split()).most_common(3))     # [('le', 3), ('mange', 2), ('chat', 1)]

# defaultdict : dictionnaire qui crée automatiquement une valeur par défaut
groupes = defaultdict(list)
for nom, groupe in [("Alice", "IA"), ("Bob", "ML"), ("Charlie", "IA"), ("Diana", "ML")]:
    groupes[groupe].append(nom)
print(dict(groupes))              # {'IA': ['Alice', 'Charlie'], 'ML': ['Bob', 'Diana']}

# deque : file à double entrée (ajout/retrait rapide aux deux bouts) — ex. fenêtre glissante
fenetre = deque(maxlen=3)
for x in [1, 2, 3, 4, 5]:
    fenetre.append(x)
print(list(fenetre))              # [3, 4, 5]
```

```python
import itertools, random, statistics, datetime, re

# itertools : combinatoire et itération avancée
print(list(itertools.combinations(["A", "B", "C"], 2)))     # [('A','B'), ('A','C'), ('B','C')]
print(list(itertools.product([0.1, 0.01], [16, 32])))       # grille d'hyperparamètres !
print(list(itertools.islice(itertools.count(10, 5), 4)))    # [10, 15, 20, 25]

# random : hasard reproductible grâce à la graine (seed)
random.seed(42)
print(random.randint(1, 100), random.choice(["a", "b", "c"]))
liste = list(range(10)); random.shuffle(liste)               # mélange sur place

# statistics : statistiques de base
print(statistics.mean([2, 4, 6]), statistics.median([1, 3, 10]), round(statistics.stdev([2, 4, 4, 4, 5, 5, 7, 9]), 3))

# datetime : dates et durées
aujourdhui = datetime.date(2026, 9, 30)
print(aujourdhui.isoformat(), (datetime.date(2026, 12, 25) - aujourdhui).days, "jours avant Noël")

# re : expressions régulières (motifs de texte)
print(re.findall(r"\d+", "Version 3.11, publiée en 2022"))    # ['3', '11', '2022']
print(re.sub(r"\s+", " ", "trop    d'espaces   ici"))          # "trop d'espaces ici"
```

Expressions régulières : un **motif** décrit un ensemble de textes (`\d` = un chiffre, `+` = une ou plusieurs fois, `\s` = un espace, `[a-z]` = une lettre minuscule). C'est un outil puissant pour nettoyer du texte ; nous n'en voyons ici que les bases.

#### 🔸 Un programme en ligne de commande avec `argparse`

Pour qu'un script accepte des paramètres au lancement (`python entrainer.py --epochs 20`), on utilise `argparse` :

```python
import argparse

def construire_parseur():
    p = argparse.ArgumentParser(description="Entraîne un modèle (simulation)")
    p.add_argument("--epochs", type=int, default=10, help="nombre d'époques")
    p.add_argument("--lr", type=float, default=0.01, help="learning rate")
    p.add_argument("--verbose", action="store_true", help="affichage détaillé")
    return p

# En vrai script : args = construire_parseur().parse_args()
# Ici, on simule la ligne « python entrainer.py --epochs 20 --verbose » :
args = construire_parseur().parse_args(["--epochs", "20", "--verbose"])
print(args.epochs, args.lr, args.verbose)     # 20 0.01 True
```

> 🏋️ **Pratique immédiate 1.1.8**
> **(a)** Avec `itertools.product`, génère toutes les combinaisons de `learning_rate ∈ {0.1, 0.01}` et `batch_size ∈ {16, 32, 64}` et affiche leur nombre.
> **(b)** Avec `re`, extrais toutes les adresses e-mail de `"Contacts : alice@mail.fr et bob@exemple.com"`.
>
> <details><summary>Solution</summary>
>
> ```python
> import itertools, re
> grille = list(itertools.product([0.1, 0.01], [16, 32, 64]))
> print(len(grille), grille[:2])       # 6 [(0.1, 16), (0.1, 32)]
>
> texte = "Contacts : alice@mail.fr et bob@exemple.com"
> print(re.findall(r"[\w.]+@[\w.]+\.\w+", texte))    # ['alice@mail.fr', 'bob@exemple.com']
> ```
> </details>

✅ **Je sais** : importer un module, créer un package, utiliser `if __name__ == "__main__"`, exploiter `collections`, `itertools`, `random`, `re`, `argparse`.

---

### 1.1.9 — Itérateurs et Générateurs

> 🎯 **Objectif.** Comprendre comment fonctionne une boucle `for`, distinguer évaluation immédiate et paresseuse, et écrire des générateurs pour traiter des données plus grandes que la mémoire.

#### 💡 Intuition : la distribution des photocopies vs le distributeur

Une **liste** est comme une pile de 1 000 photocopies déjà faites : tout occupe la table. Un **générateur** est un distributeur qui fabrique **une copie à la demande** : la table reste presque vide. Quand un jeu de données fait 100 Go et ta mémoire 16 Go, c'est la seule solution.

#### Le protocole d'itération

Un **itérable** (liste, chaîne, dict, fichier…) sait fournir un **itérateur** via `iter()`. L'itérateur produit les valeurs **une par une** avec `next()` et lève `StopIteration` quand il n'y en a plus. La boucle `for` fait tout cela automatiquement :

```python
liste = [10, 20, 30]
it = iter(liste)          # on obtient un itérateur
print(next(it))           # 10
print(next(it))           # 20
print(next(it))           # 30
# next(it)                # ← lève StopIteration : c'est ce signal qui arrête la boucle for
```

On peut créer son propre itérateur en implémentant `__iter__` et `__next__` :

```python
class Compte:
    """Compte de 1 à n, une valeur à la fois."""
    def __init__(self, n):
        self.n, self.courant = n, 0
    def __iter__(self):
        return self
    def __next__(self):
        if self.courant >= self.n:
            raise StopIteration
        self.courant += 1
        return self.courant

print(list(Compte(4)))    # [1, 2, 3, 4]
```

#### Évaluation immédiate (eager) vs paresseuse (lazy)

Écrire une classe pour chaque itérateur est lourd. Le mot-clé **`yield`** transforme une fonction en **générateur** : elle *se met en pause* à chaque `yield` et reprend là où elle s'était arrêtée.

```python
def compter_jusqua(n):
    i = 1
    while i <= n:
        yield i           # produit la valeur, puis SUSPEND la fonction
        i += 1

gen = compter_jusqua(3)
print(next(gen), next(gen), next(gen))    # 1 2 3
print(list(compter_jusqua(5)))            # [1, 2, 3, 4, 5]
```

**Mesurons la mémoire :**

```python
import sys

liste_carres = [n ** 2 for n in range(1_000_000)]     # eager : 1 million de valeurs en mémoire
gen_carres = (n ** 2 for n in range(1_000_000))       # lazy : generator expression (parenthèses)

print(f"liste      : {sys.getsizeof(liste_carres) / 1e6:.1f} Mo")     # ≈ 8 Mo
print(f"générateur : {sys.getsizeof(gen_carres)} octets")            # ≈ 200 octets, quelle que soit la taille
print(sum(gen_carres))     # somme calculée sans jamais stocker la liste
```

**⚠️ Un générateur s'épuise** : on ne peut le parcourir qu'**une fois**.

```python
g = (x for x in range(3))
print(list(g), list(g))    # [0, 1, 2] []   ← la 2e fois, il est vide
```

#### Cas d'usage IA : charger des données par lots (*batches*)

En entraînement, on ne passe pas tout le jeu de données d'un coup au modèle : on le découpe en **lots** (batchs). Les `DataLoader` de PyTorch font exactement cela.

```python
import random

def batches(donnees, taille_batch, melanger=True, graine=0):
    """Génère des lots de données sans copier tout le jeu de données."""
    indices = list(range(len(donnees)))
    if melanger:
        random.Random(graine).shuffle(indices)      # mélange reproductible
    for debut in range(0, len(indices), taille_batch):
        yield [donnees[i] for i in indices[debut:debut + taille_batch]]

dataset = list(range(100))
for numero, lot in enumerate(batches(dataset, taille_batch=32), start=1):
    print(f"Lot {numero} : {len(lot)} exemples")     # 32, 32, 32, 4
```

**Chaîner des générateurs = un pipeline.** Chaque étape traite une valeur à la fois, sans jamais stocker l'ensemble :

```python
def lire_lignes(chemin):
    with open(chemin, encoding="utf-8") as f:
        for ligne in f:
            yield ligne.rstrip("\n")

def non_vides(lignes):
    return (l for l in lignes if l.strip())

def en_minuscules(lignes):
    return (l.lower() for l in lignes)

with open("gros_fichier.txt", "w", encoding="utf-8") as f:
    f.write("Bonjour\n\nLe MONDE\n\nIA\n")

pipeline = en_minuscules(non_vides(lire_lignes("gros_fichier.txt")))
print(list(pipeline))          # ['bonjour', 'le monde', 'ia']
```

`itertools.islice(generateur, 5)` permet de n'en prendre que les 5 premiers éléments :

```python
import itertools
print(list(itertools.islice(compter_jusqua(10**9), 5)))   # [1, 2, 3, 4, 5] — sans calculer le milliard !
```

> 🏋️ **Pratique immédiate 1.1.9**
> **(a)** Écris un générateur `fibonacci()` **infini** qui produit 0, 1, 1, 2, 3, 5… puis affiche les 10 premières valeurs avec `islice`.
> **(b)** Explique pourquoi `sum(x * x for x in range(10**7))` consomme très peu de mémoire alors que `sum([x * x for x in range(10**7)])` en consomme beaucoup.
>
> <details><summary>Solution</summary>
>
> ```python
> import itertools
>
> def fibonacci():
>     a, b = 0, 1
>     while True:              # boucle infinie : OK car le générateur est paresseux
>         yield a
>         a, b = b, a + b
>
> print(list(itertools.islice(fibonacci(), 10)))   # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
> ```
> (b) La version avec `[...]` construit d'abord une liste de 10 millions d'éléments en mémoire ; la version avec `(...)` (sans crochets) calcule et consomme les valeurs une à une.
> </details>

✅ **Je sais** : expliquer itérable/itérateur, écrire un générateur avec `yield`, expliquer lazy vs eager, construire un pipeline de générateurs, écrire un batcher.

---

### 1.1.10 — Qualité du code : tests, types et formatage 🔸

> 🎯 **Objectif.** Adopter dès maintenant trois réflexes professionnels : tester, typer, formater.

**1) Tester avec `pytest`.** Un test est une petite fonction qui vérifie qu'un comportement est correct. `pytest` (à installer : `pip install pytest`) découvre automatiquement les fichiers `test_*.py` et les fonctions `test_*`.
```python
# test_stats.py
import pytest
from mlkit.stats import moyenne

def test_moyenne_simple():
    assert moyenne([2, 4, 6]) == 4

def test_moyenne_liste_vide():
    with pytest.raises(ValueError):       # on vérifie qu'une erreur ATTENDUE est bien levée
        moyenne([])
```

```bash
pytest -v          # lance tous les tests et affiche un rapport
```

Les tests te protègent des régressions : quand tu modifies du code, ils te disent immédiatement si tu as cassé quelque chose.

**2) Les annotations de type** (`typing`, version légère). Elles documentent les entrées/sorties et permettent à l'éditeur de détecter des erreurs :

```python
def moyenne_ponderee(valeurs: list[float], poids: list[float] | None = None) -> float:
    """`poids` est optionnel : `list[float] | None` signifie « une liste OU None »."""
    if poids is None:
        poids = [1.0] * len(valeurs)
    return sum(v * p for v, p in zip(valeurs, poids)) / sum(poids)

config: dict[str, float] = {"lr": 0.01, "dropout": 0.5}
print(moyenne_ponderee([10.0, 20.0], [1.0, 3.0]))    # 17.5
```

**3) Formater automatiquement.** Des outils comme **`ruff`** (`pip install ruff` → `ruff format .` et `ruff check .`) ou **`black`** appliquent PEP 8 à ta place et repèrent les erreurs courantes. Configure-les une fois dans VS Code ; tes relectures de code y gagneront beaucoup.

---

## 🏋️ EXERCICES — CHAPITRE 1.1

### Exercice 1.1.A — Statistiques à la main ⭐⭐

Écris une fonction `statistiques(nombres)` qui retourne un dictionnaire contenant : la moyenne, la médiane, le min, le max et l'écart-type (population). **N'utilise pas NumPy.** Lève `ValueError` si la liste est vide.
```python
def statistiques(nombres):
    # Ta solution ici
    pass

print(statistiques([85, 92, 78, 95, 68, 87, 74, 91]))
# Attendu : moyenne 83.75, médiane 86.0, min 68, max 95, écart-type ≈ 8.9
```

<details><summary>Solution commentée</summary>

```python
def statistiques(nombres):
    """Calcule les statistiques descriptives d'une liste de nombres."""
    if not nombres:
        raise ValueError("La liste ne peut pas être vide")

    n = len(nombres)
    moyenne = sum(nombres) / n

    tries = sorted(nombres)                       # médiane : trier puis prendre le milieu
    if n % 2 == 0:
        mediane = (tries[n // 2 - 1] + tries[n // 2]) / 2
    else:
        mediane = tries[n // 2]

    # Écart-type de POPULATION : racine de la moyenne des carrés des écarts à la moyenne.
    # (Pour un ÉCHANTILLON, on divise par n - 1 ; NumPy divise par n par défaut, cf. chapitre 1.2.)
    variance = sum((x - moyenne) ** 2 for x in nombres) / n

    return {
        "n": n,
        "moyenne": round(moyenne, 4),
        "médiane": mediane,
        "min": min(nombres),
        "max": max(nombres),
        "étendue": max(nombres) - min(nombres),
        "écart_type": round(variance ** 0.5, 4),
    }

for cle, val in statistiques([85, 92, 78, 95, 68, 87, 74, 91]).items():
    print(f"  {cle}: {val}")
```
</details>

### Exercice 1.1.B — Analyseur de texte ⭐⭐

Écris une classe `AnalyseurTexte` qui prend un texte et fournit : le nombre de mots, les 5 mots les plus fréquents (hors mots vides), le nombre de phrases et un score de « lisibilité » approximatif (mots par phrase).

<details><summary>Solution commentée</summary>

```python
import re
from collections import Counter

class AnalyseurTexte:
    MOTS_VIDES = {"le", "la", "les", "un", "une", "des", "de", "du", "et", "en",
                  "à", "au", "est", "que", "qui", "l", "d", "dans", "nous"}

    def __init__(self, texte):
        self.texte = texte
        self.mots = self._tokeniser()

    def _tokeniser(self):
        """Découpe en mots : suites de lettres (accents compris)."""
        return re.findall(r"[^\W\d_]+", self.texte.lower())

    def nb_mots(self):
        return len(self.mots)

    def mots_frequents(self, n=5):
        utiles = [m for m in self.mots if m not in self.MOTS_VIDES]
        return Counter(utiles).most_common(n)

    def nb_phrases(self):
        morceaux = re.split(r"[.!?]+", self.texte.strip())
        return len([p for p in morceaux if p.strip()])

    def mots_par_phrase(self):
        nb_p = self.nb_phrases()
        return round(self.nb_mots() / nb_p, 1) if nb_p else 0.0

    def rapport(self):
        print("═" * 40)
        print(f"  Mots          : {self.nb_mots()}")
        print(f"  Phrases       : {self.nb_phrases()}")
        print(f"  Mots/phrase   : {self.mots_par_phrase()}")
        for mot, nb in self.mots_frequents():
            print(f"    - {mot}: {nb} fois")
        print("═" * 40)

texte_test = """
L'intelligence artificielle révolutionne notre monde. Les modèles de langage
comme GPT et Claude transforment la façon dont nous travaillons. L'IA générative
permet de créer du texte, des images et du code automatiquement. Cette révolution
technologique ouvre de nouvelles possibilités dans tous les domaines.
"""
AnalyseurTexte(texte_test).rapport()
```
</details>

### Exercice 1.1.C — Exceptions et tracebacks ⭐

Ce script plante si le chemin est invalide. Modifie-le pour gérer l'erreur avec un `try/except` **précis** et afficher un message clair. Ensuite, diagnostique les trois tracebacks ci-dessous (quel type d'erreur ? quelle cause probable ?).
```python
def charger_config(chemin):
    with open(chemin, "r") as f:
        return f.read()

charger_config("nexiste_pas.json")     # → FileNotFoundError
```

```text
(1)  TypeError: can only concatenate str (not "int") to str
(2)  KeyError: 'learning_rate'
(3)  AttributeError: 'NoneType' object has no attribute 'append'
```

<details><summary>Solution</summary>

```python
def charger_config(chemin):
    try:
        with open(chemin, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print(f"❌ Fichier introuvable : {chemin}. Vérifie le chemin (pwd) et le nom.")
        return None

print(charger_config("nexiste_pas.json"))
```
Diagnostics : **(1)** on additionne un texte et un entier (`"age : " + 28`) → utiliser une f-string ou `str()` ; **(2)** on lit une clé absente du dictionnaire → `dict.get("learning_rate", 0.01)` ou vérifier l'orthographe ; **(3)** une variable vaut `None`, typiquement parce qu'on a écrit `ma_liste = ma_liste.sort()` ou qu'une fonction n'a pas de `return`.
</details>

### Exercice 1.1.D — Du texte au JSONL ⭐⭐

Écris une fonction `texte_vers_jsonl(texte, chemin)` qui découpe un texte en phrases et écrit un fichier JSONL où chaque ligne est `{"id": n, "phrase": "...", "nb_mots": k}`. Écris ensuite `relire_jsonl(chemin)` qui renvoie un **générateur** de dictionnaires.

<details><summary>Solution</summary>

```python
import json, re

def texte_vers_jsonl(texte, chemin):
    phrases = [p.strip() for p in re.split(r"[.!?]+", texte) if p.strip()]
    with open(chemin, "w", encoding="utf-8") as f:
        for i, phrase in enumerate(phrases, start=1):
            ligne = {"id": i, "phrase": phrase, "nb_mots": len(phrase.split())}
            f.write(json.dumps(ligne, ensure_ascii=False) + "\n")
    return len(phrases)

def relire_jsonl(chemin):
    with open(chemin, encoding="utf-8") as f:
        for ligne in f:
            yield json.loads(ligne)

n = texte_vers_jsonl("L'IA progresse. Python est populaire ! Et toi ?", "phrases.jsonl")
print(n, [d["nb_mots"] for d in relire_jsonl("phrases.jsonl")])    # 3 [3, 3, 3]
```
</details>

### Exercice 1.1.E — Compte bancaire (POO + exceptions) ⭐⭐

Écris une classe `CompteBancaire` (titulaire, solde initial ≥ 0) avec les méthodes `deposer(montant)`, `retirer(montant)` (lève `SoldeInsuffisantError` si le solde est insuffisant, `ValueError` si le montant est ≤ 0), un `__str__`, et un historique des opérations.

<details><summary>Solution</summary>

```python
class SoldeInsuffisantError(Exception):
    """Le retrait dépasse le solde disponible."""

class CompteBancaire:
    def __init__(self, titulaire, solde=0.0):
        if solde < 0:
            raise ValueError("Le solde initial ne peut pas être négatif")
        self.titulaire = titulaire
        self._solde = solde
        self.historique = []

    @property
    def solde(self):
        return self._solde

    def deposer(self, montant):
        if montant <= 0:
            raise ValueError("Le montant doit être strictement positif")
        self._solde += montant
        self.historique.append(("dépôt", montant))

    def retirer(self, montant):
        if montant <= 0:
            raise ValueError("Le montant doit être strictement positif")
        if montant > self._solde:
            raise SoldeInsuffisantError(f"Solde {self._solde:.2f} < retrait {montant:.2f}")
        self._solde -= montant
        self.historique.append(("retrait", montant))

    def __str__(self):
        return f"Compte de {self.titulaire} : {self._solde:.2f} €"

c = CompteBancaire("Aïcha", 100)
c.deposer(50)
try:
    c.retirer(500)
except SoldeInsuffisantError as e:
    print("Refusé :", e)
print(c, c.historique)     # Compte de Aïcha : 150.00 € [('dépôt', 50)]
```
</details>

### Exercice 1.1.F — Pipeline de générateurs ⭐⭐⭐

Crée un fichier de 10 000 lignes `id;score` (scores entre 0 et 100 aléatoires reproductibles). Sans jamais charger tout le fichier en mémoire, calcule : (1) la moyenne des scores supérieurs à 50, (2) le nombre de lignes invalides (score non numérique) si tu en insères volontairement quelques-unes.

<details><summary>Solution</summary>

```python
import random

rng = random.Random(42)
with open("scores.csv", "w", encoding="utf-8") as f:
    for i in range(10_000):
        score = "N/A" if i % 1000 == 0 else str(rng.randint(0, 100))   # 10 lignes invalides
        f.write(f"{i};{score}\n")

def lire(chemin):
    with open(chemin, encoding="utf-8") as f:
        for ligne in f:
            yield ligne.strip().split(";")

def scores_valides(lignes, invalides):
    for identifiant, score in lignes:
        try:
            yield float(score)
        except ValueError:
            invalides.append(identifiant)        # on note l'erreur sans arrêter le traitement

invalides = []
bons = [s for s in scores_valides(lire("scores.csv"), invalides) if s > 50]
print(f"Moyenne des scores > 50 : {sum(bons) / len(bons):.2f} | lignes invalides : {len(invalides)}")
```
</details>

---

### 🧠 Quiz de fin de Chapitre 1.1 (20 questions)

> Réponds sans regarder le cours, puis vérifie. Objectif : 16/20.

1. **Vrai ou faux : en Python, `int`, `str` et `tuple` sont mutables.**
   <details><summary>Réponse</summary>Faux : ils sont immuables. Toute « modification » crée un nouvel objet.</details>
2. **Que valent `bool("False")`, `bool("")` et `bool([])` ?**
   <details><summary>Réponse</summary>`True` (chaîne non vide), `False`, `False`.</details>
3. **Pourquoi `0.1 + 0.2 == 0.3` est-il faux ? Que faire ?**
   <details><summary>Réponse</summary>Les flottants sont stockés en binaire avec une précision finie. On compare avec une tolérance : `math.isclose(...)`.</details>
4. **Quelle est la différence entre `==` et `is` ?**
   <details><summary>Réponse</summary>`==` compare les valeurs ; `is` teste si deux étiquettes désignent le même objet.</details>
5. **Après `a = [1, 2]; b = a; b.append(3)`, que vaut `a` ? Comment obtenir une vraie copie ?**
   <details><summary>Réponse</summary>`[1, 2, 3]` (même objet). Copie : `a.copy()` ; pour des listes imbriquées, `copy.deepcopy(a)`.</details>
6. **Quelle structure permet une recherche en O(1) ? Pourquoi ?**
   <details><summary>Réponse</summary>Le dictionnaire et l'ensemble : ils utilisent une table de hachage qui donne un accès direct.</details>
7. **Que renvoie `liste.sort()` ?**
   <details><summary>Réponse</summary>`None` : elle trie sur place. `sorted(liste)` renvoie une nouvelle liste.</details>
8. **Que produit `[x**2 for x in range(5) if x % 2 == 0]` ?**
   <details><summary>Réponse</summary>`[0, 4, 16]`.</details>
9. **À quoi sert le `else` d'une boucle `for` ?**
   <details><summary>Réponse</summary>Il s'exécute si la boucle se termine sans avoir rencontré de `break`.</details>
10. **Pourquoi `def f(x, liste=[])` est-il dangereux ? Quel est l'idiome correct ?**
    <details><summary>Réponse</summary>La liste par défaut est créée une seule fois et partagée entre les appels. Idiome : `liste=None` puis `if liste is None: liste = []`.</details>
11. **Que signifie LEGB ?**
    <details><summary>Réponse</summary>L'ordre de recherche des noms : Local, Enclosing, Global, Built-in.</details>
12. **Quelle est la différence entre `return` et `print` ?**
    <details><summary>Réponse</summary>`print` affiche ; `return` renvoie une valeur réutilisable. Sans `return`, une fonction renvoie `None`.</details>
13. **Pourquoi utiliser `with open(...)` et préciser `encoding="utf-8"` ?**
    <details><summary>Réponse</summary>`with` garantit la fermeture du fichier même en cas d'erreur ; l'encodage explicite évite les erreurs d'accents selon le système.</details>
14. **Que représente `self` ?**
    <details><summary>Réponse</summary>L'instance sur laquelle la méthode est appelée (`obj.methode()` ≡ `Classe.methode(obj)`).</details>
15. **Quelle méthode spéciale permet d'utiliser `len()` sur ton objet ?**
    <details><summary>Réponse</summary>`__len__(self)`.</details>
16. **Héritage ou composition : un réseau de neurones et ses couches ?**
    <details><summary>Réponse</summary>Composition (« a des » couches). L'héritage exprime « est un ».</details>
17. **Pourquoi ne faut-il pas écrire `except:` sans type ?**
    <details><summary>Réponse</summary>Il attrape aussi `KeyboardInterrupt`/`SystemExit` et masque les vrais bugs. On capture le type le plus précis.</details>
18. **Dans quel ordre lit-on un traceback ?**
    <details><summary>Réponse</summary>De bas en haut : type/message de l'erreur, puis ligne fautive, puis chaîne d'appels.</details>
19. **Que fait `yield` ? Quel est l'avantage d'un générateur ?**
    <details><summary>Réponse</summary>Il produit une valeur et suspend la fonction. Le générateur calcule à la demande : mémoire quasi constante, utile pour de gros jeux de données.</details>
20. **À quoi sert `if __name__ == "__main__":` ?**
    <details><summary>Réponse</summary>À exécuter du code seulement quand le fichier est lancé directement, pas quand il est importé.</details>

---

### 🎯 MINI-PROJET 1.1 — Système de suivi de formation IA

> **Objectif.** Modéliser une petite application avec plusieurs classes, la persister en JSON (sauvegarde **et** chargement), gérer proprement les erreurs et fournir des tests.
>
> **Cahier des charges :**
> - `Module` (id, titre, durée en semaines) ; `Etudiant` (nom, modules complétés avec score/date, notes) ; `Formation` (modules + étudiants).
> - Exceptions personnalisées : `ScoreInvalideError`, `ModuleInconnuError`.
> - `Formation.sauvegarder(chemin)` **et** `Formation.charger(chemin)` (méthode de classe).
> - Un rapport de progression lisible, avec une barre de progression.
> - Des tests (fonctions `test_...` à lancer avec `pytest`).
>
> **Ce projet est réutilisé dans le chapitre 1.6 (publication sur GitHub) et comme premier jalon du projet global.**

<details><summary>Solution de référence (script complet)</summary>

```python
import json
import datetime
from pathlib import Path


class ScoreInvalideError(ValueError):
    """Le score doit être compris entre 0 et 100."""


class ModuleInconnuError(KeyError):
    """Le module demandé n'existe pas dans la formation."""


class Module:
    def __init__(self, id, titre, duree_semaines, prerequis=None):
        self.id = id
        self.titre = titre
        self.duree_semaines = duree_semaines
        self.prerequis = prerequis or []

    def __str__(self):
        return f"Module {self.id} : {self.titre} ({self.duree_semaines} semaines)"

    def to_dict(self):
        return {"titre": self.titre, "duree": self.duree_semaines, "prerequis": self.prerequis}

    @classmethod
    def from_dict(cls, id, data):
        return cls(id, data["titre"], data["duree"], data.get("prerequis"))


class Etudiant:
    def __init__(self, nom, date_debut=None):
        self.nom = nom
        self.date_debut = date_debut or datetime.date.today().isoformat()
        self.modules_completes = {}          # {module_id: {"score": ..., "date": ...}}
        self.notes = []

    def completer_module(self, module_id, score):
        if not 0 <= score <= 100:
            raise ScoreInvalideError(f"Score {score} hors de [0, 100]")
        self.modules_completes[module_id] = {
            "score": score,
            "date": datetime.date.today().isoformat(),
        }

    def moyenne(self):
        if not self.modules_completes:
            return 0.0
        scores = [m["score"] for m in self.modules_completes.values()]
        return round(sum(scores) / len(scores), 1)

    def ajouter_note(self, texte):
        self.notes.append({"texte": texte, "date": datetime.date.today().isoformat()})

    def to_dict(self):
        return {"nom": self.nom, "date_debut": self.date_debut,
                "modules_completes": self.modules_completes, "notes": self.notes}

    @classmethod
    def from_dict(cls, data):
        e = cls(data["nom"], data["date_debut"])
        e.modules_completes = data["modules_completes"]
        e.notes = data["notes"]
        return e


class Formation:
    def __init__(self, titre):
        self.titre = titre
        self.modules = {}
        self.etudiants = {}

    def ajouter_module(self, module):
        self.modules[module.id] = module

    def inscrire(self, etudiant):
        self.etudiants[etudiant.nom] = etudiant

    def valider(self, nom_etudiant, module_id, score):
        """Enregistre un résultat en vérifiant que le module existe."""
        if module_id not in self.modules:
            raise ModuleInconnuError(f"Module inconnu : {module_id}")
        self.etudiants[nom_etudiant].completer_module(module_id, score)

    def sauvegarder(self, chemin="formation.json"):
        data = {
            "titre": self.titre,
            "modules": {i: m.to_dict() for i, m in self.modules.items()},
            "etudiants": {n: e.to_dict() for n, e in self.etudiants.items()},
        }
        Path(chemin).write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")

    @classmethod
    def charger(cls, chemin="formation.json"):
        data = json.loads(Path(chemin).read_text(encoding="utf-8"))
        formation = cls(data["titre"])
        for id, m in data["modules"].items():
            formation.ajouter_module(Module.from_dict(id, m))
        for e in data["etudiants"].values():
            formation.inscrire(Etudiant.from_dict(e))
        return formation

    def rapport(self):
        print(f"\n{'═' * 50}\n  {self.titre.upper()}\n{'═' * 50}")
        for e in self.etudiants.values():
            progression = len(e.modules_completes) / max(len(self.modules), 1)
            pleins = int(progression * 20)
            barre = "█" * pleins + "░" * (20 - pleins)
            print(f"\n  👤 {e.nom}   (début : {e.date_debut})")
            print(f"  📊 [{barre}] {progression:.0%}   ⭐ moyenne : {e.moyenne()}/100")
            for mod_id, info in e.modules_completes.items():
                titre = self.modules[mod_id].titre if mod_id in self.modules else "Module inconnu"
                medaille = "🥇" if info["score"] >= 90 else "🥈" if info["score"] >= 75 else "🥉"
                print(f"     {medaille} {titre} : {info['score']}/100")
        print("═" * 50)


# --- Utilisation ---
formation = Formation("Formation IA — De zéro à ingénieur")
for m in [Module("M1", "Python & Outils", 13), Module("M2", "Mathématiques pour l'IA", 8, ["M1"]),
          Module("M3", "Machine Learning", 6, ["M1", "M2"])]:
    formation.ajouter_module(m)

alice, bob = Etudiant("Alice"), Etudiant("Bob")
formation.inscrire(alice); formation.inscrire(bob)
formation.valider("Alice", "M1", 87)
formation.valider("Alice", "M2", 79)
formation.valider("Bob", "M1", 95)
alice.ajouter_note("Revoir les probabilités")

try:
    formation.valider("Bob", "M9", 50)
except ModuleInconnuError as e:
    print("Refusé :", e)

formation.sauvegarder("formation.json")
relue = Formation.charger("formation.json")        # aller-retour : sauvegarde → chargement
relue.rapport()
```

**Tests à ajouter dans `test_formation.py` (à lancer avec `pytest`) :**
```python
import pytest
# from formation import Etudiant, Formation, Module, ScoreInvalideError, ModuleInconnuError

def test_score_invalide():
    with pytest.raises(ScoreInvalideError):
        Etudiant("X").completer_module("M1", 120)

def test_moyenne():
    e = Etudiant("X")
    e.completer_module("M1", 80); e.completer_module("M2", 100)
    assert e.moyenne() == 90.0

def test_aller_retour_json(tmp_path):
    f = Formation("Test"); f.ajouter_module(Module("M1", "Python", 3))
    e = Etudiant("Zoé"); f.inscrire(e); f.valider("Zoé", "M1", 88)
    f.sauvegarder(tmp_path / "f.json")
    assert Formation.charger(tmp_path / "f.json").etudiants["Zoé"].moyenne() == 88.0
```
</details>

**Pistes d'amélioration (🔸) :** vérifier les prérequis avant de valider un module ; ajouter un export CSV du rapport ; ajouter une option `--nom` en ligne de commande avec `argparse`.

---

**✅ Checklist du chapitre 1.1**
- [ ] Je peux expliquer « une variable est une étiquette » et la différence mutable/immuable
- [ ] Je choisis la bonne structure de données et j'évite les pièges de copie
- [ ] J'écris des fonctions documentées, testées, sans argument mutable par défaut
- [ ] Je lis/écris CSV, JSON et JSONL avec `with` et UTF-8
- [ ] J'écris une classe avec propriétés, méthodes spéciales, héritage/composition
- [ ] Je lis un traceback, capture les bonnes exceptions et sais déboguer
- [ ] J'organise mon code en modules et j'utilise la bibliothèque standard
- [ ] J'écris des générateurs pour traiter des données volumineuses
- [ ] Mon mini-projet 1.1 tourne et ses tests passent

---

# 📘 CHAPITRE 1.2 — NUMPY : LE CALCUL VECTORIEL

**Durée : 1,5 semaine**

> 🎯 **Objectifs du chapitre.** Comprendre pourquoi NumPy est la fondation de tout l'écosystème IA ; créer, indexer et transformer des tableaux ; raisonner avec les axes, les formes (*shapes*) et le broadcasting ; écrire du code **vectorisé** au lieu de boucles ; et implémenter par toi-même des briques de base du ML (softmax, similarité cosinus, k-NN).
>
> **Périmètre :** ce chapitre enseigne l'*usage* de NumPy. Les démonstrations mathématiques (valeurs propres, décompositions…) appartiennent au Module 2.

---

## 1.2.0 — Pourquoi NumPy ?

### 💡 Intuition : vecteurs, matrices, tenseurs

Toute donnée en IA finit par devenir des **nombres rangés dans des tableaux** :

```text
Scalaire      Vecteur           Matrice                Tenseur (3D)
   5        [1, 2, 3]        [[1, 2, 3],            une pile de matrices :
                              [4, 5, 6]]            ex. un lot d'images
 0 axe       1 axe            2 axes                 (lot, hauteur, largeur)
 shape ()    shape (3,)       shape (2, 3)           3 axes ou plus
```

- Une **image en niveaux de gris** est une matrice (hauteur × largeur) de pixels.
- Un **jeu de données tabulaire** est une matrice (échantillons × caractéristiques).
- Un **mot** (embedding) est un vecteur de quelques centaines de nombres.
- Un **lot d'images couleur** est un tenseur (lot × hauteur × largeur × 3 canaux).

NumPy (*Numerical Python*) fournit le type **`ndarray`** (tableau à N dimensions) et des opérations rapides dessus. Scikit-learn, Pandas, Matplotlib, PyTorch et TensorFlow s'appuient tous sur lui ou copient son interface.

### Pourquoi une liste Python ne suffit pas

| | Liste Python | `ndarray` NumPy |
|---|---|---|
| Contenu | types **mélangés** (chaque élément est un objet complet) | **un seul type** (`dtype`), valeurs brutes |
| Mémoire | éparpillée, avec un surcoût par objet | **bloc contigu** compact |
| Calcul | boucle Python (interprétée, lente) | boucle en C optimisé (**vectorisation**) |

### 🔍 Sous le capot : la vectorisation

**Vectoriser**, c'est écrire `a + b` sur des tableaux entiers au lieu d'une boucle `for` sur chaque élément. NumPy exécute alors la boucle **en C**, sur une mémoire contiguë, souvent avec des instructions SIMD du processeur. Résultat : typiquement **10 à 100 fois plus rapide**.

```python
import timeit
import numpy as np

n = 1_000_000
liste_a, liste_b = list(range(n)), list(range(n))
arr_a, arr_b = np.arange(n), np.arange(n)

def somme_python():
    return [x + y for x, y in zip(liste_a, liste_b)]

def somme_numpy():
    return arr_a + arr_b

t_py = min(timeit.repeat(somme_python, number=3, repeat=3)) / 3
t_np = min(timeit.repeat(somme_numpy, number=3, repeat=3)) / 3
print(f"Python : {t_py * 1000:.1f} ms   |   NumPy : {t_np * 1000:.2f} ms   |   ×{t_py / t_np:.0f} plus rapide")
# Les valeurs exactes dépendent de ta machine ; l'ordre de grandeur (×10 à ×100) est ce qui compte.
```

> 💡 On utilise `timeit.repeat` et on garde le **minimum** : c'est la mesure la moins perturbée par les autres programmes de la machine.

**Règle d'or du chapitre : si tu écris une boucle `for` sur les éléments d'un tableau NumPy, demande-toi s'il existe une opération vectorisée.**

---

## 1.2.1 — Création et propriétés des tableaux

> 🎯 **Objectif.** Créer des tableaux de toutes formes, lire leurs propriétés, comprendre le `dtype`, les axes, et la différence entre *vue* et *copie*.

```python
import numpy as np

# À partir de listes Python
v = np.array([1, 2, 3, 4, 5])                    # vecteur
m = np.array([[1, 2, 3], [4, 5, 6]])             # matrice 2×3
t = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])   # tenseur 2×2×2

# Propriétés essentielles
print("shape :", m.shape)     # (2, 3)  → 2 lignes, 3 colonnes
print("ndim  :", m.ndim)      # 2       → nombre d'axes
print("size  :", m.size)      # 6       → nombre total d'éléments
print("dtype :", m.dtype)     # int64   → type des éléments
```

**Les fabriques de tableaux** (génération sans écrire les valeurs à la main) :

```python
print(np.zeros((2, 3)))          # matrice de zéros — initialisation classique
print(np.ones((2, 2)))           # matrice de uns
print(np.full((2, 2), 7))        # remplie d'une valeur
print(np.eye(3))                 # matrice identité 3×3
print(np.arange(0, 10, 2))       # [0 2 4 6 8]  → comme range(), fin exclue
print(np.linspace(0, 1, 5))      # [0. 0.25 0.5 0.75 1.]  → 5 points équidistants, fin INCLUSE
print(np.zeros_like(m))          # même forme que m, rempli de zéros
```

⚠️ `arange(début, fin, pas)` **exclut** la fin et peut produire des erreurs d'arrondi avec des pas décimaux ; `linspace(début, fin, n)` **inclut** la fin et fixe le *nombre* de points. Pour un pas décimal, préfère `linspace`.

### Le `dtype` : le type des éléments

Tous les éléments d'un tableau ont **le même type**. Les principaux : `int32`, `int64`, `float32`, `float64`, `bool`, `uint8` (entier non signé 0–255, typique des pixels d'images).

```python
a = np.array([1, 2, 3])                       # int64 par défaut
b = np.array([1.5, 2.5, 3.5], dtype=np.float32)
print(a.dtype, b.dtype)                        # int64 float32
print(np.array([1, 2.5, 3]).dtype)             # float64 : NumPy « promeut » vers le type le plus général
print(a.astype(np.float64).dtype)              # conversion explicite → copie du tableau

# ⚠️ Débordement d'entiers : les entiers NumPy ont une taille fixe !
pixels = np.array([200, 250], dtype=np.uint8)
print(pixels + 100)                            # [44 94]  → 300 « déborde » et repart de 0 (modulo 256)
print(pixels.astype(np.int32) + 100)           # [300 350] ✅ on change de type AVANT le calcul
```

**En IA**, le choix du dtype est un compromis : `float32` (précision suffisante, deux fois moins de mémoire) est la norme en Deep Learning ; `float64` est la valeur par défaut de NumPy pour les calculs scientifiques.

### Les axes : la notion qui trompe tout le monde

Une matrice de forme `(3, 4)` a **deux axes** : l'axe 0 (les lignes, vertical) et l'axe 1 (les colonnes, horizontal). Quand une fonction accepte `axis=`, elle **agrège (réduit) l'axe indiqué — cet axe disparaît du résultat**.

```text
          axe 1 →
        col0 col1 col2 col3
axe 0  ┌────┬────┬────┬────┐
  ↓    │ 1  │ 2  │ 3  │ 4  │  ligne 0
       │ 5  │ 6  │ 7  │ 8  │  ligne 1
       │ 9  │ 10 │ 11 │ 12 │  ligne 2
       └────┴────┴────┴────┘

sum(axis=0) : on « écrase » les lignes  → une valeur PAR COLONNE : [15 18 21 24]   shape (4,)
sum(axis=1) : on « écrase » les colonnes → une valeur PAR LIGNE   : [10 26 42]      shape (3,)
```

```python
M = np.arange(1, 13).reshape(3, 4)
print(M.sum(axis=0), M.sum(axis=1), M.sum())    # [15 18 21 24] [10 26 42] 78
```

**Moyen mnémotechnique :** la shape est `(3, 4)`. Réduire `axis=0` supprime le « 3 » → il reste `(4,)`. Réduire `axis=1` supprime le « 4 » → il reste `(3,)`.

### Vue ou copie ? Un piège de mémoire

Beaucoup d'opérations NumPy renvoient une **vue** : un tableau qui **partage la même mémoire** que l'original. Modifier la vue modifie l'original !

```python
original = np.array([10, 20, 30, 40, 50])

vue = original[1:4]              # un slice → VUE (aucune copie, très économe)
vue[0] = 999
print(original)                  # [ 10 999  30  40  50]  ← l'original a changé !
print(np.shares_memory(original, vue))     # True

copie = original[1:4].copy()     # copie explicite → mémoire indépendante
copie[0] = -1
print(original[1], np.shares_memory(original, copie))     # 999 False
```

| Opération | Résultat |
|---|---|
| Slicing `a[1:4]`, `a.T`, `a.reshape(...)` (le plus souvent) | **vue** |
| Indexation par masque `a[a > 3]` ou par liste d'indices `a[[0, 2]]` (*fancy indexing*) | **copie** |
| `a.copy()`, `a.astype(...)` | **copie** |

> 🏋️ **Pratique immédiate 1.2.1**
> **(a)** Crée une matrice 4×3 contenant les entiers de 1 à 12. Prédis, puis vérifie, `sum(axis=0)`, `sum(axis=1)` et leurs shapes.
> **(b)** Crée `a = np.arange(6)`, puis `b = a[::2]`. Modifie `b[0]`. Que devient `a` ? Comment l'éviter ?
>
> <details><summary>Solution</summary>
>
> ```python
> M = np.arange(1, 13).reshape(4, 3)
> print(M.sum(axis=0), M.sum(axis=0).shape)    # [22 26 30] (3,)  → une somme par colonne
> print(M.sum(axis=1), M.sum(axis=1).shape)    # [ 6 15 24 33] (4,)  → une somme par ligne
>
> a = np.arange(6)
> b = a[::2]           # un slice avec pas est encore une VUE
> b[0] = 100
> print(a)             # [100   1   2   3   4   5]  → a a changé ; utiliser a[::2].copy() pour l'éviter
> ```
> </details>

✅ **Je sais** : lire `shape`/`dtype`, créer des tableaux, expliquer `axis`, distinguer vue et copie, éviter le débordement d'entiers.

---

## 1.2.2 — Indexation, slicing et masques

> 🎯 **Objectif.** Sélectionner exactement les données voulues : éléments, tranches, lignes/colonnes, valeurs satisfaisant une condition.

```python
import numpy as np

M = np.array([[10, 11, 12, 13],
              [20, 21, 22, 23],
              [30, 31, 32, 33]])

print(M[0, 2])        # 12          → ligne 0, colonne 2 (notation [ligne, colonne])
print(M[-1, -1])      # 33          → dernière ligne, dernière colonne
print(M[1])           # [20 21 22 23]   → ligne 1 entière
print(M[:, 1])        # [11 21 31]      → colonne 1 entière (« : » = tout l'axe)
print(M[0:2, 1:3])    # [[11 12] [21 22]]  → sous-matrice (lignes 0-1, colonnes 1-2)
print(M[::2, ::2])    # [[10 12] [30 32]]  → une ligne/colonne sur deux
```

### Le masque booléen : filtrer avec une condition

Une comparaison sur un tableau produit un **tableau de booléens** (le *masque*) ; utiliser ce masque comme indice ne garde que les éléments `True`. C'est l'outil de filtrage n°1 en data science.

```python
scores = np.array([85, 92, 45, 78, 96, 55, 88, 72, 34, 91])

masque = scores >= 80
print(masque)                 # [ True  True False False  True False  True False False  True]
print(scores[masque])         # [85 92 96 88 91]
print(scores[scores < 50])    # [45 34]

# Combiner des conditions : & (ET), | (OU), ~ (NON) — avec des PARENTHÈSES obligatoires
print(scores[(scores >= 60) & (scores < 90)])        # [85 78 88 72]
print(scores[(scores < 40) | (scores > 95)])         # [96 34]

print((scores >= 80).sum(), (scores >= 80).mean())   # 5 0.5  → True = 1 : compter et proportion !
```

⚠️ **Piège :** on écrit `&`, `|`, `~` (opérateurs *élément par élément*), pas `and`, `or`, `not`. Et les parenthèses sont indispensables à cause de la priorité des opérateurs : `scores >= 60 & scores < 90` provoque une erreur.

**Modifier via un masque** (écrêtage, remplacement de valeurs aberrantes) :

```python
donnees = np.array([3.2, -1.0, 5.5, -7.3, 2.1])
donnees[donnees < 0] = 0          # remplace tous les négatifs par 0
print(donnees)                    # [3.2 0.  5.5 0.  2.1]
```

### `np.where`, `argsort`, `argmax`, `unique`

```python
scores = np.array([85, 92, 45, 78, 96])

# np.where(condition, si_vrai, si_faux) : « if/else » vectorisé
print(np.where(scores >= 60, "admis", "refusé"))    # ['admis' 'admis' 'refusé' 'admis' 'admis']
# np.where(condition) seul : renvoie les POSITIONS où la condition est vraie
print(np.where(scores > 80))                        # (array([0, 1, 4]),)

print(scores.argmax(), scores.argmin())             # 4 2    → index du max / du min
ordre = np.argsort(scores)                          # indices qui trieraient le tableau
print(ordre, scores[ordre])                         # [2 3 0 1 4] [45 78 85 92 96]
print(np.argsort(scores)[::-1][:3])                 # [4 1 0]  → indices des 3 meilleurs scores

labels = np.array(["chat", "chien", "chat", "oiseau", "chien", "chat"])
valeurs, comptes = np.unique(labels, return_counts=True)
print(dict(zip(valeurs, comptes)))                  # {'chat': 3, 'chien': 2, 'oiseau': 1}
```

**Fancy indexing** : indexer avec une **liste ou un tableau d'indices** (renvoie une copie) :

```python
mots = np.array(["a", "b", "c", "d", "e"])
print(mots[[4, 0, 2]])            # ['e' 'a' 'c']
```

> 🏋️ **Pratique immédiate 1.2.2**
> Soit `temp = np.array([21.5, 19.0, 25.3, 30.1, 15.2, 27.8, 22.0])`.
> **(a)** Combien de jours dépassent 25 °C ? **(b)** Quelle est la température moyenne des jours *inférieurs ou égaux* à 25 °C ? **(c)** Remplace les valeurs supérieures à 28 par 28. **(d)** Donne les indices des 2 jours les plus chauds.
>
> <details><summary>Solution</summary>
>
> ```python
> temp = np.array([21.5, 19.0, 25.3, 30.1, 15.2, 27.8, 22.0])
> print((temp > 25).sum())                     # 3
> print(temp[temp <= 25].mean())               # 19.425
> temp_ecretee = np.where(temp > 28, 28, temp) # ou : np.minimum(temp, 28)
> print(temp_ecretee)                          # [21.5 19.  25.3 28.  15.2 27.8 22. ]
> print(np.argsort(temp)[::-1][:2])            # [3 5]
> ```
> </details>

✅ **Je sais** : indexer/slicer en 2D, filtrer avec un masque (`&`, `|`, `~`), utiliser `where`, `argsort`, `argmax`, `unique`.

---

## 1.2.3 — Opérations vectorisées et agrégations

> 🎯 **Objectif.** Calculer sur des tableaux entiers sans boucle, distinguer produit terme à terme et produit matriciel, maîtriser les agrégations par axe.

### Opérations terme à terme

```python
a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])

print(a + b, a * b)          # [11 22 33 44] [ 10  40  90 160]  ← terme à terme (pas de produit matriciel !)
print(a ** 2, np.sqrt(a))    # [ 1  4  9 16] [1.  1.41421356 1.73205081 2.  ]
print(a * 10)                # [10 20 30 40]   ← un scalaire s'applique à tous les éléments (broadcasting)
print(np.exp(a), np.log(a))  # fonctions mathématiques appliquées à chaque élément
```

### Statistiques et agrégations

```python
donnees = np.array([[85, 90, 78],      # étudiant 1 : 3 notes
                    [92, 88, 95],      # étudiant 2
                    [70, 65, 80],      # étudiant 3
                    [88, 92, 90]])     # étudiant 4

print(donnees.mean())                  # 84.4166...    moyenne globale
print(donnees.mean(axis=0))            # [83.75 83.75 85.75]  moyenne de chaque MATIÈRE (par colonne)
print(donnees.mean(axis=1))            # [84.33 91.67 71.67 90.  ]  moyenne de chaque ÉTUDIANT (par ligne)
print(donnees.max(axis=1), donnees.argmax(axis=1))   # meilleure note par étudiant et sa position
print(donnees.std(axis=0))             # écart-type par colonne (ddof=0 : écart-type de POPULATION)
print(np.median(donnees), np.percentile(donnees, [25, 75]))
print(np.cumsum([1, 2, 3, 4]))         # [ 1  3  6 10]   somme cumulée
```

⚠️ **`std` et `ddof`.** Par défaut NumPy divise par *n* (écart-type de la population, `ddof=0`). Pour l'estimateur d'un *échantillon* (division par *n−1*), écris `std(ddof=1)`. Pandas, lui, utilise `ddof=1` par défaut : c'est une source classique de petites différences entre les deux bibliothèques.

**`keepdims=True`** conserve l'axe réduit avec une taille 1 : indispensable pour enchaîner avec du broadcasting (section suivante).

```python
print(donnees.sum(axis=1).shape)                   # (4,)
print(donnees.sum(axis=1, keepdims=True).shape)    # (4, 1)
```

### Produit terme à terme vs produit matriciel

C'est **la** confusion la plus fréquente :

```python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print(A * B)        # produit TERME À TERME (Hadamard) : [[ 5 12] [21 32]]
print(A @ B)        # produit MATRICIEL                 : [[19 22] [43 50]]
```

**Le produit matriciel pas à pas** : l'élément (i, j) de `A @ B` est le **produit scalaire de la ligne i de A par la colonne j de B**.

```text
A @ B [0,0] = (ligne 0 de A) · (colonne 0 de B) = 1×5 + 2×7 = 19
A @ B [0,1] = (ligne 0 de A) · (colonne 1 de B) = 1×6 + 2×8 = 22
```

**Règle des dimensions :** `(m, n) @ (n, p) → (m, p)`. Les dimensions « du milieu » doivent être égales. C'est l'erreur `shapes not aligned` que tu rencontreras souvent.

```python
X = np.ones((5, 3))        # 5 échantillons, 3 caractéristiques
w = np.array([0.5, -1.0, 2.0])
print((X @ w).shape)       # (5,)  → une prédiction linéaire par échantillon : c'est le cœur d'un neurone !
# X @ X                    # ← ValueError : (5,3) @ (5,3) : 3 ≠ 5
```

### Deux fonctions de ML écrites en NumPy

**1) Softmax** — transforme des scores bruts (*logits*) en probabilités qui somment à 1 :
`softmax(z)ᵢ = exp(zᵢ) / Σⱼ exp(zⱼ)`

```python
def softmax_naif(z):
    e = np.exp(z)
    return e / e.sum()

def softmax(z):
    """Version stable : soustraire le max ne change pas le résultat mais évite le débordement."""
    e = np.exp(z - z.max())
    return e / e.sum()

z = np.array([2.0, 1.0, 0.1])
print(softmax(z).round(3), softmax(z).sum())          # [0.659 0.242 0.099] 1.0

grands = np.array([1000.0, 1001.0, 1002.0])
with np.errstate(over="ignore", invalid="ignore"):    # on masque les avertissements pour la démonstration
    print(softmax_naif(grands))                        # [nan nan nan]  ← exp(1000) = inf !
print(softmax(grands).round(3))                        # [0.09  0.245 0.665]  ✅
```

**2) Similarité cosinus** — mesure si deux vecteurs pointent dans la même direction (valeur entre −1 et 1) ; c'est **la** mesure de proximité entre *embeddings* de textes (Module 5).
`cos(u, v) = (u · v) / (‖u‖ × ‖v‖)`

```python
def cosinus(u, v):
    return (u @ v) / (np.linalg.norm(u) * np.linalg.norm(v))

roi, reine, pomme = np.array([0.9, 0.8, 0.1]), np.array([0.85, 0.9, 0.05]), np.array([0.1, 0.05, 0.95])
print(round(cosinus(roi, reine), 3), round(cosinus(roi, pomme), 3))    # 0.995 0.195
```

> 🏋️ **Pratique immédiate 1.2.3**
> **(a)** Pour `M = np.array([[1., 2.], [3., 4.], [5., 6.]])`, calcule la moyenne de chaque colonne puis de chaque ligne. **(b)** Que donne `M @ M.T` ? Quelle est sa shape ? **(c)** Pourquoi `M @ M` échoue-t-il ?
>
> <details><summary>Solution</summary>
>
> ```python
> M = np.array([[1., 2.], [3., 4.], [5., 6.]])
> print(M.mean(axis=0), M.mean(axis=1))       # [3. 4.] [1.5 3.5 5.5]
> print((M @ M.T).shape)                      # (3, 3) : (3,2) @ (2,3)
> # M @ M : (3,2) @ (3,2) → la dimension du milieu (2 et 3) ne correspond pas
> ```
> </details>

✅ **Je sais** : calculer sans boucle, utiliser `axis` et `keepdims`, distinguer `*` et `@`, écrire softmax stable et similarité cosinus.

---

## 1.2.4 — Le Broadcasting

> 🎯 **Objectif.** Comprendre comment NumPy combine des tableaux de formes différentes, prédire si une opération réussira, et normaliser des données par colonne ou par ligne.

### 💡 Intuition

Le broadcasting permet de calculer entre un tableau et un autre plus petit **sans les dupliquer en mémoire** : NumPy « étire virtuellement » le petit tableau. Exemple : soustraire la moyenne de chaque colonne d'une matrice.

### Les règles (à lire de droite à gauche)

NumPy compare les *shapes* **en partant de la droite**. Deux dimensions sont compatibles si :
1. elles sont **égales**, ou
2. l'une d'elles vaut **1** (elle est alors étirée), ou
3. l'une des shapes est plus courte (on lui ajoute virtuellement des 1 à **gauche**).

```text
Cas 1 : (3, 4) + (4,)      → (4,) devient (1, 4) → étiré en (3, 4)          ✅ résultat (3, 4)
Cas 2 : (3, 4) + (3, 1)    → la colonne (3,1) est étirée sur 4 colonnes      ✅ résultat (3, 4)
Cas 3 : (3, 1) + (1, 4)    → les deux sont étirés                            ✅ résultat (3, 4)
Cas 4 : (3, 4) + (3,)      → (3,) devient (1, 3) ; 3 ≠ 4                     ❌ ValueError
Cas 5 : (2, 3) + (3, 2)    → 3 ≠ 2 et aucun n'est 1                          ❌ ValueError
```

```python
M = np.arange(12).reshape(3, 4)          # shape (3, 4)
ligne = np.array([100, 200, 300, 400])   # shape (4,)
colonne = np.array([[1], [2], [3]])      # shape (3, 1)

print(M + ligne)          # Cas 1 : ajoute `ligne` à CHAQUE ligne de M
print(M + colonne)        # Cas 2 : ajoute `colonne` à CHAQUE colonne de M
print((colonne + np.array([[10, 20, 30, 40]])).shape)   # Cas 3 : (3, 1) + (1, 4) → (3, 4)

try:
    M + np.array([1, 2, 3])              # Cas 4 : (3, 4) + (3,)
except ValueError as e:
    print("Erreur :", e)                 # operands could not be broadcast together...
```

**Correction du cas 4 :** si on voulait ajouter une valeur *par ligne*, il faut transformer `(3,)` en `(3, 1)` avec `np.newaxis` (ou `reshape(-1, 1)`) : `M + np.array([1, 2, 3])[:, np.newaxis]`.

### Application : normaliser (standardiser) des données

**Standardiser** une colonne = soustraire sa moyenne et diviser par son écart-type, pour que toutes les caractéristiques aient une échelle comparable. La plupart des modèles de ML en ont besoin (chapitre 1.5).

```python
rng = np.random.default_rng(0)
X = rng.normal(loc=[50, 1000, 0.5], scale=[10, 300, 0.1], size=(200, 3))   # 3 features d'échelles très différentes

moyennes = X.mean(axis=0)                # shape (3,) → une moyenne par colonne
ecarts = X.std(axis=0)                   # shape (3,)
X_std = (X - moyennes) / ecarts          # broadcasting : (200,3) - (3,) puis / (3,)

print(X_std.mean(axis=0).round(6))       # [0. 0. 0.]
print(X_std.std(axis=0).round(6))        # [1. 1. 1.]
```

**Normaliser par ligne** (chaque échantillon a une norme 1 — utile pour les embeddings) demande `keepdims` :

```python
normes = np.linalg.norm(X, axis=1, keepdims=True)    # shape (200, 1)  ← keepdims est essentiel ici
X_unit = X / normes                                   # (200,3) / (200,1) → OK
print(np.linalg.norm(X_unit, axis=1)[:3])             # [1. 1. 1.]
# Sans keepdims, `normes` serait de shape (200,) et (200,3) / (200,) lèverait une erreur.
```

> 🏋️ **Pratique immédiate 1.2.4**
> **(a)** Prédis la shape de `np.ones((5, 1, 3)) + np.ones((4, 1))`. **(b)** Une matrice `X` de shape `(100, 4)` contient des notes ; centre chaque **ligne** (retire la moyenne de la ligne à chaque élément).
>
> <details><summary>Solution</summary>
>
> ```python
> print((np.ones((5, 1, 3)) + np.ones((4, 1))).shape)     # (5, 4, 3)
> # Alignement à droite : (5,1,3) vs (1,4,1) → 5 | 4 | 3
>
> X = np.random.default_rng(1).normal(size=(100, 4))
> X_centre = X - X.mean(axis=1, keepdims=True)
> print(np.allclose(X_centre.mean(axis=1), 0))            # True
> ```
> </details>

✅ **Je sais** : appliquer les règles du broadcasting, prédire les erreurs, utiliser `keepdims`/`newaxis`, standardiser par colonne ou par ligne.

---

## 1.2.5 — Algèbre linéaire avec NumPy (usage)

> 🎯 **Objectif.** Savoir *appeler* les outils d'algèbre linéaire de NumPy. Leur théorie est traitée en profondeur dans le **Module 2** : ici, on retient quoi utiliser et quand.

```python
A = np.array([[2., 1.], [1., 3.]])
b = np.array([5., 10.])

print(A.T)                          # transposée
print(np.linalg.det(A))             # déterminant : ≈ 5.0 (arrondi flottant)
print(np.linalg.inv(A))             # inverse (à éviter en pratique, voir ci-dessous)
print(np.trace(A), np.linalg.norm(b))    # trace, norme euclidienne

# Résoudre A x = b : préférer solve() à inv(A) @ b (plus rapide et numériquement plus stable)
x = np.linalg.solve(A, b)
print(x, np.allclose(A @ x, b))     # [1. 3.] True

# Valeurs propres / vecteurs propres (pour les matrices symétriques : eigh)
valeurs, vecteurs = np.linalg.eigh(A)
print(valeurs.round(3))             # [1.382 3.618]
```

**Moindres carrés — `lstsq`.** Quand le système n'a pas de solution exacte (plus d'équations que d'inconnues, comme en régression), on cherche la solution qui **minimise l'erreur quadratique** : c'est la **régression linéaire**.

```python
rng = np.random.default_rng(42)
x_data = np.linspace(0, 10, 50)
y_data = 3.0 * x_data + 5.0 + rng.normal(0, 1.0, 50)      # vraie droite : y = 3x + 5, avec du bruit

X_design = np.column_stack([x_data, np.ones_like(x_data)])   # colonne de x + colonne de 1 (pour l'ordonnée à l'origine)
(pente, ordonnee), *_ = np.linalg.lstsq(X_design, y_data, rcond=None)
print(f"pente ≈ {pente:.2f}, ordonnée ≈ {ordonnee:.2f}")      # proche de 3 et 5
```

**Règle pratique :** ne calcule presque jamais une inverse explicitement. Utilise `solve` pour un système carré, `lstsq` pour une régression.

---

## 1.2.6 — Manipulation de formes

> 🎯 **Objectif.** Transformer la forme d'un tableau (aplatir, transposer, empiler, découper) sans changer les données — opérations omniprésentes en Deep Learning.

```python
a = np.arange(12)                        # [0 1 2 ... 11]

print(a.reshape(3, 4))                   # 3 lignes, 4 colonnes
print(a.reshape(2, 3, 2).shape)          # (2, 3, 2)
print(a.reshape(-1, 6).shape)            # (2, 6)  → « -1 » = « déduis cette dimension pour moi »
print(a.reshape(3, 4).flatten().shape)   # (12,)  → aplatit (renvoie une COPIE) ; ravel() renvoie une vue si possible

M = np.arange(6).reshape(2, 3)
print(M.T)                               # transposée : lignes ↔ colonnes  (shape (3, 2))
```

**Ordre des éléments : C vs F.** Par défaut (`order="C"`), NumPy remplit **ligne par ligne**. Avec `order="F"` (comme Fortran/MATLAB), **colonne par colonne** :

```python
print(np.arange(6).reshape(2, 3))                 # [[0 1 2] [3 4 5]]
print(np.arange(6).reshape(2, 3, order="F"))      # [[0 2 4] [1 3 5]]
```

**Empiler et concaténer :**

```python
a, b = np.array([[1, 2], [3, 4]]), np.array([[5, 6], [7, 8]])

print(np.concatenate([a, b], axis=0).shape)      # (4, 2) : on ajoute des LIGNES (le long de l'axe existant 0)
print(np.concatenate([a, b], axis=1).shape)      # (2, 4) : on ajoute des COLONNES
print(np.stack([a, b]).shape)                    # (2, 2, 2) : crée un NOUVEL axe (une pile de matrices)
print(np.vstack([a, b]).shape, np.hstack([a, b]).shape)     # (4, 2) (2, 4)

haut, bas = np.split(np.arange(6).reshape(6, 1), 2)   # découper en 2 parts égales
print(haut.ravel(), bas.ravel())                       # [0 1 2] [3 4 5]
```

**Cas d'usage :** une image de 28×28 pixels est **aplatie** en un vecteur de 784 valeurs pour un réseau dense ; un lot de 32 images 28×28 a la shape `(32, 28, 28)`, aplati en `(32, 784)` avec `.reshape(32, -1)`.

**Ajouter/retirer un axe de taille 1 :**

```python
v = np.array([1, 2, 3])                  # shape (3,)
print(v[:, np.newaxis].shape)            # (3, 1)  → vecteur colonne
print(v[np.newaxis, :].shape)            # (1, 3)  → vecteur ligne
print(np.squeeze(v[:, np.newaxis]).shape)   # (3,) → supprime les axes de taille 1
```

⚠️ **Piège : le vecteur `(n,)` n'est ni une ligne ni une colonne.** C'est la source de nombreuses erreurs de shape (`(n,)` vs `(n, 1)`) : dans le doute, affiche `.shape`.

---

## 1.2.7 — Nombres aléatoires et reproductibilité

> 🎯 **Objectif.** Générer des données aléatoires **reproductibles** : indispensable pour comparer des expériences.

Un ordinateur ne produit pas un vrai hasard mais une suite **pseudo-aléatoire** déterminée par une **graine** (*seed*). Même graine → même suite, ce qui rend les expériences reproductibles.

**API moderne : `np.random.default_rng(graine)`** (recommandée ; l'ancienne `np.random.seed(...)` fonctionne encore mais est considérée comme *legacy*).

```python
rng = np.random.default_rng(42)              # générateur avec une graine

print(rng.random(3))                         # 3 nombres uniformes dans [0, 1)
print(rng.integers(0, 10, size=5))           # entiers dans [0, 10)
print(rng.normal(loc=0, scale=1, size=(2, 3)))   # loi normale : moyenne 0, écart-type 1
print(rng.choice(["a", "b", "c"], size=5))   # tirage avec remise
print(rng.permutation(5))                    # permutation aléatoire de [0..4]

# Reproductibilité : deux générateurs de même graine produisent la même suite
print(np.array_equal(np.random.default_rng(7).random(5), np.random.default_rng(7).random(5)))   # True
```

**Application : séparer un jeu de données en entraînement / test à la main.**

```python
def separer_train_test(X, y, taille_test=0.2, graine=42):
    rng = np.random.default_rng(graine)
    indices = rng.permutation(len(X))                 # mélange des indices
    n_test = int(len(X) * taille_test)
    idx_test, idx_train = indices[:n_test], indices[n_test:]
    return X[idx_train], X[idx_test], y[idx_train], y[idx_test]

X = np.arange(20).reshape(10, 2)
y = np.arange(10)
X_train, X_test, y_train, y_test = separer_train_test(X, y)
print(X_train.shape, X_test.shape)    # (8, 2) (2, 2)
```

En pratique, tu utiliseras `train_test_split` de Scikit-learn (chapitre 1.5), mais tu sais maintenant ce qu'il fait.

---

## 1.2.8 — Compléments utiles

```python
# Sauvegarder / charger des tableaux
A = np.arange(6).reshape(2, 3)
np.save("tableau.npy", A)                   # format binaire NumPy (rapide, exact)
print(np.load("tableau.npy").shape)         # (2, 3)
np.savetxt("tableau.csv", A, delimiter=",", fmt="%d")     # texte lisible

# Valeurs manquantes : np.nan (un flottant spécial « pas un nombre »)
x = np.array([1.0, np.nan, 3.0])
print(x.mean(), np.nanmean(x))              # nan 2.0   → les fonctions nan* ignorent les nan
print(np.isnan(x))                          # [False  True False]

# Comparer des flottants avec tolérance
print(np.isclose(0.1 + 0.2, 0.3), np.allclose([1.0, 2.0], [1.0 + 1e-9, 2.0]))   # True True
```

---

## 🏋️ EXERCICES — CHAPITRE 1.2

### Exercice 1.2.A — Vectoriser trois boucles ⭐

Réécris chacune de ces boucles en une seule expression NumPy :

```python
import numpy as np

x = np.linspace(-3, 3, 7)

# (1) Carrés des éléments positifs, 0 ailleurs
res1 = []
for v in x:
    res1.append(v ** 2 if v > 0 else 0)

# (2) Distance euclidienne entre deux vecteurs
a, b = np.array([1., 2., 3.]), np.array([4., 6., 8.])
somme = 0
for i in range(len(a)):
    somme += (a[i] - b[i]) ** 2
dist = somme ** 0.5

# (3) Nombre d'éléments de x compris entre -1 et 1 (inclus)
compteur = 0
for v in x:
    if -1 <= v <= 1:
        compteur += 1
```

<details><summary>Solution</summary>

```python
res1 = np.where(x > 0, x ** 2, 0)
dist = np.linalg.norm(a - b)             # ou np.sqrt(((a - b) ** 2).sum())
compteur = ((x >= -1) & (x <= 1)).sum()
print(res1, dist, compteur)              # [0. 0. 0. 0. 1. 4. 9.] 7.07... 3
```
</details>

### Exercice 1.2.B — Standardisation à la main ⭐⭐

Écris `standardiser(X)` qui renvoie `(X_std, moyennes, ecarts)`. Puis `appliquer_standardisation(X_nouveau, moyennes, ecarts)` qui applique **les mêmes** moyennes et écarts à de nouvelles données. Explique pourquoi les statistiques doivent être calculées sur l'entraînement uniquement (nous y reviendrons au chapitre 1.5 avec la *fuite de données*).

<details><summary>Solution</summary>

```python
def standardiser(X):
    moyennes, ecarts = X.mean(axis=0), X.std(axis=0)
    ecarts = np.where(ecarts == 0, 1.0, ecarts)      # évite la division par 0 pour une colonne constante
    return (X - moyennes) / ecarts, moyennes, ecarts

def appliquer_standardisation(X_nouveau, moyennes, ecarts):
    return (X_nouveau - moyennes) / ecarts

rng = np.random.default_rng(0)
X_train, X_test = rng.normal(10, 3, (100, 2)), rng.normal(10, 3, (20, 2))
X_train_std, m, s = standardiser(X_train)
X_test_std = appliquer_standardisation(X_test, m, s)
print(X_train_std.mean(axis=0).round(6), X_test_std.mean(axis=0).round(2))
```
Les statistiques viennent de l'entraînement seul : les données de test représentent des données **futures inconnues**. Utiliser leurs statistiques laisserait fuiter de l'information du test vers le modèle.
</details>

### Exercice 1.2.C — k plus proches voisins *from scratch* ⭐⭐⭐

Sans Scikit-learn, écris `knn_predire(X_train, y_train, X_test, k)` en **broadcasting** (pas de boucle sur les échantillons de test). Teste-le sur deux nuages de points gaussiens.

<details><summary>Solution commentée</summary>

```python
import numpy as np

def knn_predire(X_train, y_train, X_test, k=5):
    # (n_test, 1, d) - (1, n_train, d) → (n_test, n_train, d) : toutes les différences d'un coup
    diff = X_test[:, np.newaxis, :] - X_train[np.newaxis, :, :]
    distances = np.sqrt((diff ** 2).sum(axis=2))          # (n_test, n_train)
    voisins = np.argsort(distances, axis=1)[:, :k]        # indices des k plus proches, par ligne
    votes = y_train[voisins]                              # (n_test, k) : étiquettes des voisins
    return (votes.mean(axis=1) > 0.5).astype(int)         # vote majoritaire (classes 0/1)

rng = np.random.default_rng(0)
X0 = rng.normal([0, 0], 1.0, (100, 2)); X1 = rng.normal([3, 3], 1.0, (100, 2))
X = np.vstack([X0, X1]); y = np.array([0] * 100 + [1] * 100)
idx = rng.permutation(200); X, y = X[idx], y[idx]

pred = knn_predire(X[:150], y[:150], X[150:], k=5)
print(f"Précision : {(pred == y[150:]).mean():.2%}")      # ≈ 95 % ou plus
```

`(n_test, n_train, d)` peut être volumineux : pour de très grands jeux de données on traite par blocs. Scikit-learn utilise des structures plus efficaces (arbres KD).
</details>

### Exercice 1.2.D — Régression linéaire multi-variables ⭐⭐

Génère `X` de shape `(200, 3)` et `y = X @ [2, -1, 0.5] + 4 + bruit`. Retrouve les coefficients **et** l'intercept avec `np.linalg.lstsq`. Calcule ensuite le R² à la main : `R² = 1 − Σ(y − ŷ)² / Σ(y − ȳ)²`.

<details><summary>Solution</summary>

```python
rng = np.random.default_rng(3)
X = rng.normal(size=(200, 3))
y = X @ np.array([2.0, -1.0, 0.5]) + 4.0 + rng.normal(0, 0.3, 200)

X_b = np.column_stack([X, np.ones(len(X))])          # ajoute la colonne de 1 (intercept)
theta, *_ = np.linalg.lstsq(X_b, y, rcond=None)
print(theta.round(2))                                # ≈ [ 2. -1.  0.5  4. ]

y_hat = X_b @ theta
r2 = 1 - ((y - y_hat) ** 2).sum() / ((y - y.mean()) ** 2).sum()
print(f"R² = {r2:.3f}")                              # proche de 0.98
```
</details>

---

### 🧠 Quiz de fin de Chapitre 1.2 (15 questions)

1. **Pourquoi un tableau NumPy est-il plus rapide qu'une liste pour calculer ?**
   <details><summary>Réponse</summary>Type unique, mémoire contiguë et boucle exécutée en C (vectorisation) au lieu d'une boucle Python interprétée.</details>
2. **Quelle est la shape de `np.zeros((3, 4)).sum(axis=0)` ?**
   <details><summary>Réponse</summary>`(4,)` : l'axe 0 disparaît, on obtient une somme par colonne.</details>
3. **Que donne `np.array([200], dtype=np.uint8) + 100` ?**
   <details><summary>Réponse</summary>`[44]` : débordement (300 mod 256). On convertit en `int32` avant de calculer.</details>
4. **`a[1:4]` renvoie-t-il une vue ou une copie ? Et `a[a > 2]` ?**
   <details><summary>Réponse</summary>Slice → vue ; masque booléen → copie.</details>
5. **Pourquoi `(x > 1) & (x < 5)` et pas `(x > 1) and (x < 5)` ?**
   <details><summary>Réponse</summary>`and` exige un booléen unique et lève une erreur sur un tableau ; `&` opère élément par élément (avec parenthèses à cause de la priorité).</details>
6. **Quelle différence entre `A * B` et `A @ B` ?**
   <details><summary>Réponse</summary>`*` : terme à terme ; `@` : produit matriciel.</details>
7. **Quelles shapes rendent `(m, n) @ (p, q)` valide ?**
   <details><summary>Réponse</summary>`n == p` ; le résultat est `(m, q)`.</details>
8. **`(3, 4) + (3,)` fonctionne-t-il ? Pourquoi ?**
   <details><summary>Réponse</summary>Non : alignement à droite, 4 ≠ 3. Il faudrait `(3, 1)`.</details>
9. **Quel est le rôle de `keepdims=True` ?**
   <details><summary>Réponse</summary>Conserver l'axe réduit avec taille 1, pour permettre le broadcasting avec le tableau d'origine.</details>
10. **Pourquoi soustraire `z.max()` dans softmax ?**
    <details><summary>Réponse</summary>Pour éviter le débordement de `exp` sans changer le résultat.</details>
11. **Que mesure la similarité cosinus ?**
    <details><summary>Réponse</summary>L'angle entre deux vecteurs (direction commune), de −1 à 1, indépendamment de leurs normes.</details>
12. **Que signifie `-1` dans `reshape(-1, 6)` ?**
    <details><summary>Réponse</summary>NumPy déduit cette dimension à partir du nombre total d'éléments.</details>
13. **Pourquoi utiliser `default_rng(seed)` ?**
    <details><summary>Réponse</summary>Pour obtenir des résultats aléatoires reproductibles avec l'API moderne.</details>
14. **Pourquoi préférer `np.linalg.solve` à `inv(A) @ b` ?**
    <details><summary>Réponse</summary>Plus rapide et numériquement plus stable.</details>
15. **Quelle est la valeur par défaut de `ddof` dans `np.std` et son équivalent Pandas ?**
    <details><summary>Réponse</summary>NumPy : 0 (population) ; Pandas : 1 (échantillon).</details>

---

### 🎯 MINI-PROJET 1.2 — Un moteur de recherche sémantique en NumPy

> **Objectif.** Implémenter le cœur d'un moteur de recherche par *embeddings* : un corpus de documents représentés par des vecteurs, une requête, et le classement des documents par similarité cosinus. Comparer une implémentation avec boucle et une implémentation vectorisée.
>
> **Cahier des charges :**
> 1. Génère 10 000 « documents » de 64 dimensions, répartis en 5 thèmes (chaque thème = un centre + du bruit).
> 2. Écris `top_k_boucle(requete, docs, k)` (boucle Python) et `top_k_vectorise(requete, docs, k)` (une seule multiplication matricielle après normalisation).
> 3. Vérifie que les deux renvoient les mêmes indices et mesure le gain de vitesse.
> 4. Vérifie que les résultats de la requête appartiennent bien au thème de la requête.

<details><summary>Solution de référence</summary>

```python
import time
import numpy as np

rng = np.random.default_rng(0)
n_docs, dim, n_themes = 10_000, 64, 5

centres = rng.normal(size=(n_themes, dim))
themes = rng.integers(0, n_themes, size=n_docs)
docs = centres[themes] + 0.8 * rng.normal(size=(n_docs, dim))      # chaque doc = centre du thème + bruit

def top_k_boucle(requete, docs, k=5):
    scores = []
    for d in docs:                                                 # une boucle Python sur 10 000 documents
        scores.append(d @ requete / (np.linalg.norm(d) * np.linalg.norm(requete)))
    return np.argsort(scores)[::-1][:k]

def normaliser(M):
    return M / np.linalg.norm(M, axis=-1, keepdims=True)

docs_norm = normaliser(docs)                                       # normalisation faite UNE fois

def top_k_vectorise(requete_norm, docs_norm, k=5):
    scores = docs_norm @ requete_norm                              # (10000, 64) @ (64,) → (10000,)
    return np.argsort(scores)[::-1][:k]

theme_requete = 3
requete = centres[theme_requete] + 0.8 * rng.normal(size=dim)
requete_norm = normaliser(requete)

t0 = time.perf_counter(); r1 = top_k_boucle(requete, docs, 5); t_boucle = time.perf_counter() - t0
t0 = time.perf_counter(); r2 = top_k_vectorise(requete_norm, docs_norm, 5); t_vec = time.perf_counter() - t0

print("Mêmes résultats :", np.array_equal(r1, r2))
print(f"Boucle : {t_boucle * 1000:.1f} ms | vectorisé : {t_vec * 1000:.2f} ms")
print("Thèmes des 5 résultats :", themes[r2], "| thème de la requête :", theme_requete)
```
</details>

**Pistes d'amélioration (🔸) :** utiliser `np.argpartition` (plus rapide que `argsort` complet pour un top-k) ; comparer la similarité cosinus à la distance euclidienne ; traiter 100 requêtes à la fois avec une seule multiplication matricielle `(100, 64) @ (64, 10000)`.

---

**✅ Checklist du chapitre 1.2**
- [ ] J'explique pourquoi la vectorisation est rapide et je l'utilise à la place des boucles
- [ ] Je lis les shapes, dtypes et axes sans hésiter
- [ ] Je distingue vue et copie, `*` et `@`
- [ ] Je filtre avec des masques et j'utilise `where`, `argsort`, `unique`
- [ ] Je prédis si un broadcasting réussira et je standardise par colonne ou par ligne
- [ ] Je génère des données reproductibles avec `default_rng`
- [ ] Mon mini-projet 1.2 renvoie les mêmes résultats en boucle et en vectorisé

---

# 📘 CHAPITRE 1.3 — PANDAS : LA MANIPULATION DE DONNÉES

**Durée : 1,5 semaine**

> 🎯 **Objectifs du chapitre.** Charger, inspecter, sélectionner, nettoyer, transformer, agréger et fusionner des données tabulaires avec Pandas ; adopter une démarche d'**exploration** (EDA) systématique ; éviter les pièges classiques (copies, valeurs manquantes, fuite de données, boucles lentes).

---

## 1.3.0 — Pourquoi Pandas ? Les deux structures de base

### 💡 Intuition

Un ingénieur IA passe **60 à 80 % de son temps sur les données** : les récupérer, les comprendre, les nettoyer. Pandas est l'outil de référence pour cela. Il ajoute à NumPy des **étiquettes** : des noms de colonnes et un index de lignes. Là où NumPy manipule des nombres anonymes (`X[:, 2]`), Pandas manipule des données lisibles (`df["age"]`).

```text
        Series (une colonne)          DataFrame (un tableau)
 index ┌──────┐                 index ┌──────┬─────┬────────┐
  0    │ 22.0 │                  0    │ Alice│ 28  │ Paris  │   ← une ligne = un enregistrement
  1    │ 38.0 │                  1    │ Bob  │ 35  │ Lyon   │
  2    │ NaN  │                  2    │ Cara │ NaN │ Paris  │
       └──────┘                       └──────┴─────┴────────┘
                                       nom   age   ville      ← une colonne = une variable (Series)
```

- **`Series`** : un tableau 1D **étiqueté** (un type unique, un index).
- **`DataFrame`** : un tableau 2D dont **chaque colonne est une Series**, avec son propre type.
- **`Index`** : les étiquettes des lignes (par défaut 0, 1, 2…) ; elles ne sont **pas** des positions.

### La démarche d'exploration (EDA)

L'**analyse exploratoire des données** (*Exploratory Data Analysis*) est la première étape de tout projet. Devant un nouveau jeu de données, pose-toi ces **10 questions** :

1. Combien de lignes et de colonnes ? (`shape`)
2. Que représente une ligne ? Quelle est la **variable cible** (si on veut prédire quelque chose) ?
3. Quel est le type de chaque colonne ? Est-il cohérent (un âge stocké en texte ?) (`dtypes`)
4. Combien de valeurs manquantes par colonne ? (`isna().sum()`)
5. Y a-t-il des doublons ? (`duplicated().sum()`)
6. Quelle est la distribution de chaque variable numérique ? (`describe()`, histogramme)
7. Quelles sont les valeurs de chaque variable catégorielle ? (`value_counts()`)
8. Y a-t-il des valeurs aberrantes ou impossibles (âge de 999, prix négatif) ?
9. Quelles variables semblent liées entre elles ou à la cible ? (`groupby`, corrélations)
10. Les données sont-elles **représentatives** du problème ? (biais de collecte)

Tu appliqueras cette liste au cas pratique 1.3.7 et à ton projet global.

---

## 1.3.1 — Créer et charger des données

> 🎯 **Objectif.** Créer un DataFrame, lire un CSV avec les bonnes options, et faire un premier diagnostic en 5 lignes.

```python
import pandas as pd
import numpy as np

# Depuis un dictionnaire : clé = nom de colonne, valeur = liste des valeurs
df = pd.DataFrame({
    "nom": ["Alice", "Bob", "Charlie", "Diana", "Ethan"],
    "age": [28, 35, 22, 41, 31],
    "ville": ["Paris", "Lyon", "Paris", "Marseille", "Lyon"],
    "salaire": [52000, 61000, 38000, 75000, 58000],
    "poste": ["DS", "ML Eng", "Analyste", "Manager", "DS"],
})
print(df)
```

**Lire un fichier CSV.** Dans ce cours on crée d'abord des exemples avec `io.StringIO` (un « faux fichier » en mémoire), ce qui évite tout téléchargement. Le code est identique avec un vrai chemin de fichier.

```python
from io import StringIO

contenu_csv = """id;nom;prix;date
1;Clavier;49,90;2025-01-15
2;Souris;19,90;2025-02-03
3;Écran;189,00;2025-02-20
"""

# Un CSV « à la française » : séparateur ; et virgule décimale
produits = pd.read_csv(StringIO(contenu_csv), sep=";", decimal=",", parse_dates=["date"])
print(produits.dtypes)            # prix : float64 ✅ (avec decimal="," ; sinon ce serait du texte)
```

**Les options de `read_csv` à connaître :**

| Option | Rôle | Exemple |
|---|---|---|
| `sep` | séparateur de colonnes | `sep=";"` |
| `decimal` | séparateur décimal | `decimal=","` |
| `encoding` | encodage du fichier | `encoding="utf-8"` (ou `"latin-1"`) |
| `usecols` | ne lire que certaines colonnes | `usecols=["nom", "age"]` |
| `dtype` | forcer des types | `dtype={"id": str}` |
| `parse_dates` | convertir en dates | `parse_dates=["date"]` |
| `na_values` | textes à traiter comme « manquant » | `na_values=["N/A", "-", "?"]` |
| `nrows` / `chunksize` | lire une partie / par blocs (gros fichiers) | `nrows=1000` |
| `index_col` | colonne utilisée comme index | `index_col="id"` |

Symétriquement : `df.to_csv("fichier.csv", index=False)` écrit un CSV ; `pd.read_json`, `pd.read_excel`, `pd.read_parquet` existent aussi.

### Le premier diagnostic en 5 lignes

```python
print(df.shape)              # (5, 5) → 5 lignes, 5 colonnes
print(df.head(3))            # 3 premières lignes ; df.tail() pour les dernières
df.info()                    # types, nombre de valeurs non nulles, mémoire (⚠️ affiche directement : ne pas faire print(df.info()))
print(df.describe())         # statistiques des colonnes numériques (count, mean, std, min, quartiles, max)
print(df["ville"].value_counts())     # fréquence de chaque valeur d'une colonne
```

> ⚠️ `df.info()` **affiche** son résultat et renvoie `None` : écrire `print(df.info())` affiche donc un `None` parasite.

`describe()` est ton premier détecteur d'anomalies : un `min` de −5 pour un âge, un `max` de 999, un `count` inférieur au nombre de lignes (des valeurs manquantes).

> 🏋️ **Pratique immédiate 1.3.1**
> Crée un CSV en mémoire avec 4 lignes `nom,score` dont un score manquant écrit `N/A`. Lis-le en indiquant à Pandas que `N/A` est une valeur manquante, puis affiche le nombre de valeurs manquantes.
>
> <details><summary>Solution</summary>
>
> ```python
> csv_test = "nom,score\nAlice,12\nBob,N/A\nCara,17\nDan,9\n"
> t = pd.read_csv(StringIO(csv_test), na_values=["N/A"])
> print(t["score"].isna().sum())     # 1
> print(t.dtypes)                    # score : float64 (à cause du NaN)
> ```
> </details>

✅ **Je sais** : créer/lire un DataFrame, choisir les bonnes options de `read_csv`, dérouler `shape`/`head`/`info`/`describe`/`value_counts`.

---

## 1.3.2 — Sélection et filtrage

> 🎯 **Objectif.** Sélectionner des colonnes, des lignes par étiquette (`loc`) ou par position (`iloc`), et filtrer avec des conditions.

```python
print(df["nom"])                 # une colonne → Series
print(df[["nom", "salaire"]])    # plusieurs colonnes → DataFrame (double crochet !)
```

### `loc` (par étiquette) et `iloc` (par position)

| | Sélectionne par | Bornes du slice | Exemple |
|---|---|---|---|
| **`loc`** | **étiquettes** (noms de lignes/colonnes) | **fin incluse** | `df.loc[0:2, "nom":"ville"]` |
| **`iloc`** | **positions** (entiers, comme NumPy) | fin exclue | `df.iloc[0:2, 0:3]` |

```python
print(df.loc[1])                          # la ligne d'index 1 (étiquette)
print(df.loc[0:2, ["nom", "age"]])        # lignes 0, 1, 2 (fin INCLUSE) — colonnes nom et age
print(df.iloc[0:2, 0:2])                  # lignes 0 et 1 seulement, colonnes 0 et 1
print(df.at[1, "nom"], df.iat[1, 0])      # accès à UNE cellule (rapide) : Bob Bob
```

⚠️ **Piège classique :** après un filtrage ou un tri, l'index n'est plus 0, 1, 2… : `loc[0]` cherche l'étiquette 0 (qui peut ne plus exister), `iloc[0]` prend la première ligne **actuelle**. Utilise `reset_index(drop=True)` pour renuméroter.

### Filtrer avec des conditions (masques booléens)

Comme avec NumPy, on utilise `&`, `|`, `~` avec des parenthèses :

```python
print(df[df["age"] > 30])                                          # une condition
print(df[(df["ville"] == "Paris") & (df["salaire"] > 40000)])      # ET
print(df[(df["poste"] == "DS") | (df["age"] < 25)])                # OU
print(df[~(df["ville"] == "Paris")])                               # NON

print(df[df["ville"].isin(["Paris", "Lyon"])])                     # appartient à une liste
print(df[df["age"].between(25, 35)])                               # entre deux bornes (incluses)
print(df[df["nom"].str.startswith("A")])                           # méthodes sur les chaînes
print(df.query("age > 30 and ville == 'Lyon'"))                    # syntaxe alternative lisible
```

**Trier :**

```python
print(df.sort_values("salaire", ascending=False).head(3))          # 3 plus gros salaires
print(df.sort_values(["ville", "age"], ascending=[True, False]))   # tri sur plusieurs colonnes
print(df.nlargest(2, "salaire"))                                   # raccourci pour le top-n
```

> 🏋️ **Pratique immédiate 1.3.2**
> Avec `df` : **(a)** les noms des personnes de Lyon gagnant plus de 55 000 ; **(b)** la ligne du salaire maximal ; **(c)** le nombre de personnes par ville.
>
> <details><summary>Solution</summary>
>
> ```python
> print(df.loc[(df["ville"] == "Lyon") & (df["salaire"] > 55000), "nom"].tolist())   # ['Bob', 'Ethan']
> print(df.loc[df["salaire"].idxmax()])                                                # Diana
> print(df["ville"].value_counts())                                                    # Paris 2, Lyon 2, Marseille 1
> ```
> </details>

✅ **Je sais** : sélectionner colonnes/lignes avec `loc`/`iloc`, filtrer avec `&`/`|`/`~`, `isin`, `between`, `query`, trier.

---

## 1.3.3 — Modifier un DataFrame et éviter les copies piégeuses

> 🎯 **Objectif.** Ajouter/supprimer/renommer des colonnes, modifier des valeurs sans mauvaise surprise de copie.

```python
df2 = df.copy()                                    # travailler sur une copie explicite pour ne pas altérer l'original

df2["salaire_k"] = df2["salaire"] / 1000           # nouvelle colonne calculée (vectorisé)
df2["senior"] = df2["age"] >= 35                   # colonne booléenne
df2["tranche"] = np.where(df2["age"] < 30, "junior", "confirmé")   # if/else vectorisé
df2 = df2.rename(columns={"salaire": "salaire_annuel"})
df2 = df2.drop(columns=["salaire_k"])              # supprimer une colonne (drop renvoie un NOUVEAU DataFrame)
print(df2.head(2))

df2.loc[df2["poste"] == "Analyste", "poste"] = "Data Analyst"     # modifier des valeurs conditionnellement
```

Beaucoup de méthodes Pandas **renvoient un nouveau DataFrame** au lieu de modifier l'existant : il faut réassigner (`df2 = df2.drop(...)`). Évite le paramètre `inplace=True` : il n'apporte pas de gain réel et sera sans doute déprécié.

### Le piège : `SettingWithCopyWarning` et le Copy-on-Write

Quand tu extrais un sous-ensemble puis le modifies, s'agit-il d'une **vue** de l'original ou d'une **copie** ? Historiquement, Pandas ne le garantissait pas et affichait un `SettingWithCopyWarning` :

```python
# Le schéma dangereux (chaîné) : df[df["age"] > 30]["salaire"] = 0    ← ne modifie PAS df de façon fiable !

# ✅ Deux façons sûres :
df2.loc[df2["age"] > 30, "salaire_annuel"] = 0              # 1) modifier directement avec loc
jeunes = df2[df2["age"] < 30].copy()                        # 2) extraire puis .copy() explicite
jeunes["bonus"] = 1000                                      #    → on peut modifier sans risque
```

**Depuis Pandas 3.0**, le mode **Copy-on-Write** est le comportement par défaut : toute extraction se comporte comme une copie indépendante, et le `SettingWithCopyWarning` disparaît. Mais tu utiliseras peut-être Pandas 2.x sur d'autres projets : **adopte dès maintenant les deux bonnes pratiques** — `loc[masque, colonne] = valeur` pour modifier, `.copy()` pour dériver un nouveau tableau.

> 🏋️ **Pratique immédiate 1.3.3**
> Ajoute à une copie de `df` une colonne `salaire_net` (75 % du salaire), puis une colonne `categorie` valant `"haut"` si `salaire_net > 40000`, sinon `"standard"`. Renomme `nom` en `prenom`.
>
> <details><summary>Solution</summary>
>
> ```python
> d = df.copy()
> d["salaire_net"] = d["salaire"] * 0.75
> d["categorie"] = np.where(d["salaire_net"] > 40000, "haut", "standard")
> d = d.rename(columns={"nom": "prenom"})
> print(d[["prenom", "salaire_net", "categorie"]])
> ```
> </details>

---

## 1.3.4 — Nettoyage des données (data cleaning)

> 🎯 **Objectif.** Traiter méthodiquement valeurs manquantes, doublons, types incorrects, valeurs aberrantes, dates et texte.

Les données réelles sont **sales**. Un modèle entraîné sur des données mal nettoyées produit des résultats mal fondés : *« garbage in, garbage out »*.

### Les valeurs manquantes

**💡 Intuition : pourquoi manque-t-il des valeurs ?** Cela compte pour choisir quoi faire :
- **Manquantes au hasard** : un capteur en panne, une case oubliée. Les supprimer ou les imputer est peu risqué.
- **Manquantes pour une raison liée à la donnée** : les personnes à haut revenu ne déclarent pas leur salaire. Imputer naïvement **biaise** l'analyse.
- **Manquantes par construction** : « conjoint » vide pour une personne célibataire — ce n'est pas un manque mais une information.

**Toujours se demander** : *pourquoi ces valeurs manquent-elles ?* avant de décider.

```python
import numpy as np, pandas as pd

d = pd.DataFrame({
    "nom": ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Alice"],
    "age": [28, np.nan, 22, 41, np.nan, 28],
    "salaire": [52000, 61000, np.nan, 75000, 58000, 52000],
    "ville": ["Paris", "Lyon", None, "Marseille", "Lyon", "Paris"],
})

print(d.isna().sum())                          # nombre de manquants par colonne
print((d.isna().mean() * 100).round(1))        # pourcentage de manquants par colonne

# Stratégie 1 : supprimer
print(d.dropna().shape)                        # supprime toute ligne qui contient au moins un manquant
print(d.dropna(subset=["salaire"]).shape)      # seulement si `salaire` est manquant

# Stratégie 2 : imputer (remplacer)
d["age"] = d["age"].fillna(d["age"].median())                        # médiane : robuste aux extrêmes
d["ville"] = d["ville"].fillna("Inconnue")                            # constante explicite
d["salaire"] = d["salaire"].fillna(d.groupby("ville")["salaire"].transform("median"))   # médiane PAR groupe
print(d)
```

**Quelle valeur d'imputation ?** Moyenne (sensible aux valeurs extrêmes), **médiane** (robuste, souvent préférable), mode (le plus fréquent, pour les catégories), constante (« Inconnue »), valeur précédente (`.ffill()` pour des séries temporelles).

> ⚠️ **Avertissement majeur — la fuite de données (*data leakage*).** Si tu calcules la médiane d'imputation sur **tout** le jeu de données avant de séparer entraînement/test, le test « voit » de l'information de l'entraînement (et inversement) et tes scores seront trop optimistes. En ML, **on impute (et on normalise) toujours après le split, avec des statistiques calculées sur l'entraînement seul**. Nous le démontrons chiffres à l'appui au chapitre 1.5, où le `Pipeline` de Scikit-learn résout ce problème proprement.

### Les doublons

```python
print(d.duplicated().sum())                   # nombre de lignes identiques à une ligne précédente
d = d.drop_duplicates()                       # garde la première occurrence
d = d.drop_duplicates(subset=["nom"], keep="first")     # doublons sur une colonne clé
```

### Corriger les types

```python
brut = pd.DataFrame({"prix": ["12,50", "8,00", "N/A", "15,20"], "quantite": ["3", "2", "5", "x"]})

brut["prix"] = pd.to_numeric(brut["prix"].str.replace(",", ".", regex=False), errors="coerce")
brut["quantite"] = pd.to_numeric(brut["quantite"], errors="coerce")     # "x" devient NaN au lieu de planter
print(brut.dtypes)                            # float64, float64

# Colonne à peu de valeurs distinctes : le type category économise de la mémoire
brut["type"] = pd.Series(["A", "B", "A", "B"]).astype("category")
```

`errors="coerce"` transforme ce qui n'est pas convertible en `NaN` : pratique, mais **compte ensuite les NaN créés** pour ne pas perdre d'information sans le savoir.

### Texte sale et dates

```python
villes = pd.Series(["  Paris", "paris ", "PARIS", "Lyon", "lyon.", "Marseille"])
propre = villes.str.strip().str.lower().str.replace(".", "", regex=False).str.title()
print(propre.tolist())                        # ['Paris', 'Paris', 'Paris', 'Lyon', 'Lyon', 'Marseille']

dates = pd.Series(["15/01/2025", "03/02/2025", "pas une date"])
dates = pd.to_datetime(dates, format="%d/%m/%Y", errors="coerce")     # NaT (Not a Time) pour l'invalide
print(dates.dt.year.tolist(), dates.dt.month.tolist(), dates.dt.day_name().tolist())
print(propre.str.contains("Par").sum(), propre.str.len().tolist())    # autres méthodes .str
```

Les accesseurs **`.str`** (texte) et **`.dt`** (dates) appliquent une opération à toute la colonne, sans boucle.

### Les valeurs aberrantes (outliers)

Une valeur aberrante est très éloignée des autres : une vraie valeur exceptionnelle, ou une erreur (âge de 999). **Détecte-la, puis décide** (corriger, supprimer, ou conserver) en fonction du contexte.

**Méthode IQR.** L'**écart interquartile** est `IQR = Q3 − Q1` (l'étendue des 50 % centraux). On juge aberrante toute valeur en dehors de `[Q1 − 1,5×IQR ; Q3 + 1,5×IQR]` (c'est la règle des « moustaches » d'un boxplot).

**Méthode z-score.** `z = (x − moyenne) / écart-type` mesure à combien d'écarts-types une valeur se trouve de la moyenne ; on signale souvent |z| > 3. Attention : moyenne et écart-type étant eux-mêmes influencés par les extrêmes, la méthode IQR est plus robuste.

```python
ages = pd.Series([22, 25, 27, 29, 30, 31, 33, 35, 38, 999])

q1, q3 = ages.quantile(0.25), ages.quantile(0.75)
iqr = q3 - q1
borne_basse, borne_haute = q1 - 1.5 * iqr, q3 + 1.5 * iqr
print(f"Bornes : [{borne_basse:.1f}, {borne_haute:.1f}]")
print("Aberrantes (IQR) :", ages[(ages < borne_basse) | (ages > borne_haute)].tolist())      # [999]

z = (ages - ages.mean()) / ages.std()
print("Aberrantes (|z|>2.5) :", ages[z.abs() > 2.5].tolist())          # [999]
ages_ecretees = ages.clip(lower=borne_basse, upper=borne_haute)        # « winsorisation » : ramener aux bornes
```

> 🏋️ **Pratique immédiate 1.3.4**
> Voici une colonne `pd.Series(["12", " 15 ", "abc", "20", None])`. Convertis-la en nombres (en gardant `NaN` quand c'est impossible), compte les valeurs invalides et impute-les avec la médiane.
>
> <details><summary>Solution</summary>
>
> ```python
> s = pd.Series(["12", " 15 ", "abc", "20", None])
> n = pd.to_numeric(s.str.strip(), errors="coerce")
> print(n.isna().sum())                    # 2 valeurs invalides (« abc » et None)
> print(n.fillna(n.median()).tolist())     # [12.0, 15.0, 15.0, 20.0, 15.0]
> ```
> </details>

✅ **Je sais** : diagnostiquer et traiter manquants, doublons, types, texte, dates et outliers ; je connais le risque de fuite de données.

---

## 1.3.5 — Transformations et agrégations

> 🎯 **Objectif.** Appliquer des calculs colonne par colonne de la façon la plus rapide, puis résumer par groupes avec `groupby`, `pivot_table` et `crosstab`.

### Appliquer une fonction : la hiérarchie des performances

Du plus rapide au plus lent :

1. **Opérations vectorisées** : `df["prix"] * 1.2`, `np.where(...)`, `.str`, `.dt` → *à utiliser en priorité*.
2. **`.map()` / `.replace()`** sur une Series : pour des correspondances (dictionnaire).
3. **`.apply()`** avec une fonction Python : quand aucune opération vectorisée n'existe.
4. **`iterrows()`** (boucle sur les lignes) : **à éviter** — extrêmement lent.

```python
import time
grand = pd.DataFrame({"x": np.arange(200_000)})

t = time.perf_counter(); r1 = grand["x"] * 2 + 1; t1 = time.perf_counter() - t                    # vectorisé
t = time.perf_counter(); r2 = grand["x"].apply(lambda v: v * 2 + 1); t2 = time.perf_counter() - t  # apply
t = time.perf_counter(); r3 = [row["x"] * 2 + 1 for _, row in grand.iterrows()]; t3 = time.perf_counter() - t   # iterrows
print(f"vectorisé {t1 * 1000:.1f} ms | apply {t2 * 1000:.0f} ms | iterrows {t3 * 1000:.0f} ms")
# Ordre de grandeur habituel : vectorisé ≪ apply ≪ iterrows (facteurs de ×100 à ×1000)
```

```python
salaires = pd.Series([38000, 52000, 75000])
print(salaires.map(lambda s: "haut" if s > 60000 else "standard").tolist())
print(pd.Series(["FR", "DE", "FR"]).map({"FR": "France", "DE": "Allemagne"}).tolist())   # dictionnaire de correspondance
```

### `groupby` : la logique « découper – appliquer – combiner »

**💡 Intuition.** `groupby` fait trois étapes : **(1) découper** le tableau en groupes selon les valeurs d'une colonne, **(2) appliquer** un calcul à chaque groupe, **(3) combiner** les résultats en un nouveau tableau.

```text
   df                    split                apply (mean)        combine
 ville  salaire        Paris: 52, 38          Paris:  45          ville     salaire
 Paris    52     ──►   Lyon:  61, 58   ──►    Lyon:   59.5   ──►  Lyon       59.5
 Lyon     61           Marseille: 75          Marseille: 75        Marseille  75
 Paris    38                                                       Paris      45
 ...
```

```python
print(df.groupby("ville")["salaire"].mean())                       # salaire moyen par ville
print(df.groupby("poste")["age"].agg(["count", "mean", "min", "max"]))        # plusieurs agrégations

resume = df.groupby("ville").agg(                                  # « named aggregation » : noms de colonnes clairs
    effectif=("nom", "count"),
    salaire_moyen=("salaire", "mean"),
    age_max=("age", "max"),
)
print(resume)
```

**`agg` réduit, `transform` conserve la taille.** `agg` renvoie une ligne par groupe ; `transform` renvoie **une valeur par ligne d'origine** (par exemple pour comparer chaque salaire à la moyenne de sa ville) :

```python
d3 = df.copy()
d3["salaire_moyen_ville"] = d3.groupby("ville")["salaire"].transform("mean")
d3["ecart_a_la_moyenne_ville"] = d3["salaire"] - d3["salaire_moyen_ville"]
print(d3[["nom", "ville", "salaire", "ecart_a_la_moyenne_ville"]])
```

### Tableaux croisés : `pivot_table` et `crosstab`

```python
print(df.pivot_table(values="salaire", index="ville", columns="poste", aggfunc="mean", fill_value=0))
print(pd.crosstab(df["ville"], df["poste"]))                        # comptage croisé de deux variables
print(pd.crosstab(df["ville"], df["poste"], normalize="index").round(2))   # proportions par ligne
```

### Découper une variable numérique en classes

```python
d3["tranche_age"] = pd.cut(d3["age"], bins=[0, 25, 35, 100], labels=["≤25", "26-35", ">35"])   # bornes que TU choisis
d3["quartile_salaire"] = pd.qcut(d3["salaire"], q=4, labels=["Q1", "Q2", "Q3", "Q4"])          # effectifs égaux
print(d3[["nom", "tranche_age", "quartile_salaire"]])
print(d3["tranche_age"].value_counts().sort_index())
```

> 🏋️ **Pratique immédiate 1.3.5**
> **(a)** Calcule le salaire médian par poste. **(b)** Ajoute une colonne `rang_salaire_ville` donnant le rang du salaire de chaque personne au sein de sa ville (indice : `groupby(...).rank(...)`). **(c)** Quelle est la part de chaque poste dans chaque ville (`crosstab` normalisé) ?
>
> <details><summary>Solution</summary>
>
> ```python
> print(df.groupby("poste")["salaire"].median())
> d4 = df.copy()
> d4["rang_salaire_ville"] = d4.groupby("ville")["salaire"].rank(ascending=False)
> print(d4[["nom", "ville", "rang_salaire_ville"]])
> print(pd.crosstab(df["ville"], df["poste"], normalize="index"))
> ```
> </details>

✅ **Je sais** : préférer le vectorisé à `apply`/`iterrows`, utiliser `groupby` (`agg`, `transform`), `pivot_table`, `crosstab`, `cut`/`qcut`.

---

## 1.3.6 — Fusionner des tables

> 🎯 **Objectif.** Combiner plusieurs sources de données avec `merge` et `concat`, choisir le bon type de jointure et vérifier le résultat.

En pratique, les données sont **réparties sur plusieurs tables** (clients, commandes, produits). Une **jointure** (*join*) relie deux tables via une **clé commune**.

```python
clients = pd.DataFrame({"client_id": [1, 2, 3, 4], "nom": ["Alice", "Bob", "Charlie", "Diana"], "ville": ["Paris", "Lyon", "Paris", "Nice"]})
commandes = pd.DataFrame({"commande_id": [101, 102, 103, 104, 105], "client_id": [1, 1, 2, 5, 3], "montant": [50, 30, 120, 80, 45]})
```

```text
INNER : uniquement les clés présentes des DEUX côtés          A ∩ B
LEFT  : toutes les lignes de gauche + correspondances à droite  A (+ B où il existe)
RIGHT : toutes les lignes de droite + correspondances à gauche  B (+ A où il existe)
OUTER : toutes les lignes des deux côtés                        A ∪ B
```

```python
print(pd.merge(clients, commandes, on="client_id", how="inner"))   # clients 1, 2, 3 (Diana sans commande, client 5 inconnu : exclus)
print(pd.merge(clients, commandes, on="client_id", how="left"))    # tous les clients : Diana a des NaN
print(pd.merge(clients, commandes, on="client_id", how="outer", indicator=True))   # `_merge` : d'où vient chaque ligne ?
```

**Bonnes pratiques :**
- **`indicator=True`** ajoute la colonne `_merge` (`both`, `left_only`, `right_only`) : c'est le moyen le plus simple de repérer des clés orphelines.
- **`validate="one_to_many"`** (ou `"one_to_one"`, `"many_to_one"`) fait échouer la jointure si la relation attendue est violée.
- Vérifie **toujours** le nombre de lignes avant/après.

⚠️ **Piège n°1 : la jointure many-to-many.** Si la clé est dupliquée des deux côtés, chaque combinaison est produite : le nombre de lignes **explose** silencieusement.

```python
a = pd.DataFrame({"cle": [1, 1], "x": ["a1", "a2"]})
b = pd.DataFrame({"cle": [1, 1, 1], "y": ["b1", "b2", "b3"]})
print(len(pd.merge(a, b, on="cle")))                    # 6 lignes (2 × 3) !
try:
    pd.merge(a, b, on="cle", validate="one_to_many")    # lève une erreur : la clé de gauche n'est pas unique
except Exception as e:
    print(type(e).__name__)                              # MergeError
```

**Agréger avant de fusionner**, puis **concaténer** (empiler des tables de même structure) :

```python
total_par_client = commandes.groupby("client_id", as_index=False)["montant"].sum().rename(columns={"montant": "total"})
print(clients.merge(total_par_client, on="client_id", how="left").fillna({"total": 0}))

jan = pd.DataFrame({"mois": ["jan"], "ventes": [100]})
fev = pd.DataFrame({"mois": ["fev"], "ventes": [120]})
print(pd.concat([jan, fev], ignore_index=True))          # empile les lignes (axis=0 par défaut)
```

> 🏋️ **Pratique immédiate 1.3.6**
> Avec `clients` et `commandes` : **(a)** liste les commandes dont le client est **inconnu** (absent de `clients`) ; **(b)** liste les clients qui n'ont **jamais commandé**.
>
> <details><summary>Solution</summary>
>
> ```python
> m = pd.merge(clients, commandes, on="client_id", how="outer", indicator=True)
> print(m.loc[m["_merge"] == "right_only", ["commande_id", "client_id"]])    # commande 104 (client 5)
> print(m.loc[m["_merge"] == "left_only", "nom"].tolist())                   # ['Diana']
> ```
> </details>

✅ **Je sais** : choisir inner/left/right/outer, détecter les orphelins avec `indicator`, éviter l'explosion many-to-many avec `validate`, utiliser `concat`.

---

## 1.3.7 — Cas pratique guidé : analyse du Titanic

> 🎯 **Objectif.** Dérouler l'EDA complète (les 10 questions de 1.3.0) sur un jeu de données réel et en tirer des conclusions **argumentées**.

Le jeu de données **Titanic** (891 passagers) est le « Hello World » de l'analyse de données : pour chaque passager, on sait s'il a survécu (`survived`), sa classe (`pclass`), son sexe, son âge, ses proches à bord (`sibsp`, `parch`), le tarif payé (`fare`) et le port d'embarquement (`embarked`).

**Chargement avec repli hors ligne.** `seaborn.load_dataset("titanic")` télécharge le fichier réel (connexion Internet requise). La fonction ci-dessous essaie cela d'abord ; **si tu es hors ligne, elle génère une version simulée qui reproduit les mêmes proportions générales**, de sorte que tout le code fonctionne dans les deux cas.

```python
def titanic_simule(graine=42, n=891):
    """Version simulée du Titanic dont les taux de survie imitent ceux des données réelles."""
    rng = np.random.default_rng(graine)
    pclass = rng.choice([1, 2, 3], size=n, p=[0.242, 0.207, 0.551])
    p_femme = np.select([pclass == 1, pclass == 2], [0.44, 0.41], default=0.29)
    sex = np.where(rng.random(n) < p_femme, "female", "male")
    p_surv = {("female", 1): .97, ("female", 2): .92, ("female", 3): .50,
              ("male", 1): .37, ("male", 2): .16, ("male", 3): .14}
    proba = np.array([p_surv[(s, c)] for s, c in zip(sex, pclass)])
    survived = (rng.random(n) < proba).astype(int)
    age = np.clip(rng.normal(np.select([pclass == 1, pclass == 2], [38, 30], default=25), 13), 0.5, 80).round(0)
    age[rng.random(n) < np.where(pclass == 3, 0.26, 0.12)] = np.nan          # âges manquants, plus fréquents en 3e classe
    fare = np.round(rng.lognormal(np.select([pclass == 1, pclass == 2], [4.1, 2.7], default=2.1), 0.6), 2)
    embarked = rng.choice(["S", "C", "Q"], size=n, p=[0.72, 0.19, 0.09])
    return pd.DataFrame({"survived": survived, "pclass": pclass, "sex": sex, "age": age,
                         "sibsp": rng.poisson(0.5, n), "parch": rng.poisson(0.4, n),
                         "fare": fare, "embarked": embarked})

def charger_titanic():
    try:
        import seaborn as sns
        colonnes = ["survived", "pclass", "sex", "age", "sibsp", "parch", "fare", "embarked"]
        return sns.load_dataset("titanic")[colonnes], "réel (seaborn)"
    except Exception:                      # pas d'Internet, dépôt inaccessible…
        return titanic_simule(), "simulé (hors ligne)"

titanic, source = charger_titanic()
print("Source :", source, "| shape :", titanic.shape)
```

### Étapes 1 à 5 — Inspecter

```python
print(titanic.head())
titanic.info()
print(titanic.isna().sum())                 # `age` : nombreux manquants ; `embarked` : quasi complet
print(titanic.duplicated().sum(), "doublons")
print(titanic.describe().round(1))          # âge min/max plausibles ? tarif max très élevé → distribution étirée
```

### Étapes 6 à 8 — Distributions

```python
print(titanic["survived"].value_counts(normalize=True).round(3))      # taux de survie global : ≈ 38 % (données réelles) ; ≈ 40 % sur la version simulée
print(titanic["sex"].value_counts(normalize=True).round(2))
print(titanic["pclass"].value_counts().sort_index())                  # classe 3 : la majorité
print(titanic["fare"].describe().round(1))                             # moyenne ≫ médiane : distribution asymétrique
```

### Étape 9 — Relations avec la cible (`survived`)

```python
print(titanic.groupby("sex")["survived"].mean().round(2))              # femmes ≫ hommes
print(titanic.groupby("pclass")["survived"].mean().round(2))           # 1re classe ≫ 3e
print(titanic.pivot_table(values="survived", index="sex", columns="pclass", aggfunc="mean").round(2))

titanic["tranche_age"] = pd.cut(titanic["age"], [0, 12, 18, 35, 60, 100], labels=["enfant", "ado", "jeune adulte", "adulte", "senior"])
print(titanic.groupby("tranche_age", observed=True)["survived"].agg(["mean", "count"]).round(2))
```

### Étape 10 — Interpréter avec honnêteté

Ce que les données montrent : **les femmes et les passagers de première classe ont survécu bien plus souvent** (« les femmes et les enfants d'abord », et l'accès aux canots selon le pont). Ce qu'elles **ne prouvent pas** : une *corrélation* n'est pas une *causalité*, et sexe et classe sont eux-mêmes liés ; enfin, les 891 passagers de ce jeu de données ne sont qu'un échantillon des passagers embarqués. Un bon analyste écrit toujours ses **limites** à côté de ses conclusions.

> 🏋️ **Pratique immédiate 1.3.7**
> Réponds avec Pandas : **(a)** l'âge médian par classe ; **(b)** le taux de survie des passagers **seuls** (`sibsp + parch == 0`) comparé à ceux voyageant en famille ; **(c)** le nombre de valeurs manquantes d'âge par classe. Que remarques-tu ?
>
> <details><summary>Solution</summary>
>
> ```python
> print(titanic.groupby("pclass")["age"].median())
> titanic["seul"] = (titanic["sibsp"] + titanic["parch"]) == 0
> print(titanic.groupby("seul")["survived"].mean().round(2))
> print(titanic["age"].isna().groupby(titanic["pclass"]).sum())    # plus de manquants en 3e classe : les manquants ne sont PAS au hasard
> ```
> </details>

---

## 1.3.8 — Compléments 🔸

### Séries temporelles : `resample` et `rolling`

```python
idx = pd.date_range("2025-01-01", periods=90, freq="D")
ventes = pd.Series(np.random.default_rng(0).integers(50, 150, size=90), index=idx)

print(ventes.resample("MS").sum())                     # somme par mois (MS = début de mois)
print(ventes.rolling(window=7).mean().dropna().head(3))   # moyenne glissante sur 7 jours : lisse le bruit
```

### Gros fichiers : lire par morceaux et surveiller la mémoire

```python
grand_csv = "x\n" + "\n".join(str(i) for i in range(10_000))
total = 0
for morceau in pd.read_csv(StringIO(grand_csv), chunksize=2_500):     # un DataFrame de 2 500 lignes à la fois
    total += morceau["x"].sum()                                        # cousin des générateurs (1.1.9)
print(total)                                                           # 49995000

d5 = pd.DataFrame({"pays": ["France"] * 5000 + ["Italie"] * 5000})
print(d5.memory_usage(deep=True).sum(), d5["pays"].astype("category").memory_usage(deep=True))    # le type category divise fortement la mémoire
```

---

## 🏋️ EXERCICES — CHAPITRE 1.3

### Exercice 1.3.A — Analyse des ventes ⭐⭐

Crée un DataFrame de 100 ventes (produit ∈ {Laptop, Phone, Tablet, Écouteurs}, région ∈ {Nord, Sud, Est, Ouest}, quantité 1–10, prix unitaire dépendant du produit, dates sur 6 mois). Réponds à : (1) chiffre d'affaires total par produit ; (2) meilleure région par mois ; (3) produit le plus vendu en quantité ; (4) évolution mensuelle du chiffre d'affaires.

<details><summary>Solution commentée</summary>

```python
rng = np.random.default_rng(42)
n = 100
produits = ["Laptop", "Phone", "Tablet", "Écouteurs"]
prix_base = {"Laptop": 1200, "Phone": 800, "Tablet": 500, "Écouteurs": 150}

ventes = pd.DataFrame({
    "date": pd.to_datetime("2025-01-01") + pd.to_timedelta(rng.integers(0, 180, n), unit="D"),
    "produit": rng.choice(produits, n),
    "region": rng.choice(["Nord", "Sud", "Est", "Ouest"], n),
    "quantite": rng.integers(1, 11, n),
})
ventes["prix_unitaire"] = ventes["produit"].map(prix_base)
ventes["ca"] = ventes["quantite"] * ventes["prix_unitaire"]
ventes["mois"] = ventes["date"].dt.to_period("M").astype(str)

print(ventes.groupby("produit")["ca"].sum().sort_values(ascending=False))                     # (1)
ca_region_mois = ventes.groupby(["mois", "region"])["ca"].sum().reset_index()
print(ca_region_mois.loc[ca_region_mois.groupby("mois")["ca"].idxmax()])                       # (2)
print(ventes.groupby("produit")["quantite"].sum().idxmax())                                    # (3)
print(ventes.groupby("mois")["ca"].sum())                                                      # (4)
```
</details>

### Exercice 1.3.B — Nettoyage guidé ⭐⭐

Le DataFrame ci-dessous est volontairement sale. Nettoie-le : espaces/casse des villes, âges non numériques ou impossibles (< 0 ou > 100), doublons, salaire au format « 45 000 € ».

```python
sale = pd.DataFrame({
    "nom": ["Alice", "bob ", "CHARLIE", "Alice", "Diana"],
    "ville": ["paris", " Lyon", "PARIS ", "paris", "Nice"],
    "age": ["28", "-5", "abc", "28", "41"],
    "salaire": ["45 000 €", "61000", "38 000 €", "45 000 €", None],
})
```

<details><summary>Solution</summary>

```python
p = sale.copy()
p["nom"] = p["nom"].str.strip().str.title()
p["ville"] = p["ville"].str.strip().str.title()
p["age"] = pd.to_numeric(p["age"], errors="coerce")
p.loc[(p["age"] < 0) | (p["age"] > 100), "age"] = np.nan
p["salaire"] = pd.to_numeric(p["salaire"].str.replace(r"[^\d]", "", regex=True), errors="coerce")
p = p.drop_duplicates()
print(p)          # Bob : âge -5 → NaN ; Charlie : « abc » → NaN ; le doublon Alice a disparu
```
</details>

### Exercice 1.3.C — Jointures ⭐⭐

Avec `clients` et `commandes` (1.3.6), construis un tableau `client | nb_commandes | total | panier_moyen` incluant les clients sans commande (0). Puis liste les commandes orphelines.

<details><summary>Solution</summary>

```python
agg = commandes.groupby("client_id").agg(nb_commandes=("commande_id", "count"), total=("montant", "sum"), panier_moyen=("montant", "mean")).reset_index()
res = clients.merge(agg, on="client_id", how="left").fillna({"nb_commandes": 0, "total": 0, "panier_moyen": 0})
print(res)
print(commandes[~commandes["client_id"].isin(clients["client_id"])])       # commande 104
```
</details>

### Exercice 1.3.D — Vectorisation mesurée ⭐⭐

Sur un DataFrame de 500 000 lignes avec une colonne `x` aléatoire, calcule `y = 1 si x > 0,5 sinon 0` de trois façons (`np.where`, `apply`, boucle `iterrows` sur 20 000 lignes seulement) et compare les temps.

<details><summary>Solution</summary>

```python
import time
d = pd.DataFrame({"x": np.random.default_rng(0).random(500_000)})
t = time.perf_counter(); y1 = np.where(d["x"] > 0.5, 1, 0); tv = time.perf_counter() - t
t = time.perf_counter(); y2 = d["x"].apply(lambda v: 1 if v > 0.5 else 0); ta = time.perf_counter() - t
petit = d.head(20_000)
t = time.perf_counter(); y3 = [1 if r["x"] > 0.5 else 0 for _, r in petit.iterrows()]; ti = time.perf_counter() - t
print(f"where {tv * 1000:.1f} ms | apply {ta * 1000:.0f} ms | iterrows (20 000 lignes seulement !) {ti * 1000:.0f} ms")
```
</details>

### Exercice 1.3.E — Détecter les valeurs aberrantes ⭐⭐

Écris `rapport_outliers(df)` qui, pour chaque colonne numérique, renvoie le nombre de valeurs hors des bornes IQR et le pourcentage correspondant.

<details><summary>Solution</summary>

```python
def rapport_outliers(df):
    lignes = []
    for col in df.select_dtypes(include="number").columns:
        s = df[col].dropna()
        q1, q3 = s.quantile([0.25, 0.75])
        iqr = q3 - q1
        n_out = ((s < q1 - 1.5 * iqr) | (s > q3 + 1.5 * iqr)).sum()
        lignes.append({"colonne": col, "n_outliers": int(n_out), "pourcentage": round(100 * n_out / len(s), 1)})
    return pd.DataFrame(lignes)

print(rapport_outliers(titanic))       # `fare` et `sibsp` ont plusieurs valeurs extrêmes
```
</details>

---

### 🧠 Quiz de fin de Chapitre 1.3 (15 questions)

1. **Quelle est la différence entre une `Series` et un `DataFrame` ?**
   <details><summary>Réponse</summary>Une Series est une colonne étiquetée (1D) ; un DataFrame est un tableau 2D dont chaque colonne est une Series.</details>
2. **`loc[0:2]` et `iloc[0:2]` : combien de lignes chacun renvoie-t-il ?**
   <details><summary>Réponse</summary>`loc` : 3 lignes (fin incluse, étiquettes 0, 1, 2) ; `iloc` : 2 lignes (fin exclue).</details>
3. **Pourquoi `print(df.info())` affiche-t-il `None` ?**
   <details><summary>Réponse</summary>`info()` affiche lui-même son résultat et renvoie `None`.</details>
4. **Comment combiner deux conditions de filtrage ?**
   <details><summary>Réponse</summary>Avec `&` / `|` / `~` et des parenthèses autour de chaque condition (pas `and`/`or`).</details>
5. **Pourquoi utiliser `.copy()` et `loc[masque, col] = v` ?**
   <details><summary>Réponse</summary>Pour éviter les ambiguïtés vue/copie (`SettingWithCopyWarning` en Pandas 2.x) ; en Pandas 3, le Copy-on-Write rend les extractions indépendantes.</details>
6. **Cite trois raisons possibles pour lesquelles des valeurs sont manquantes et leur impact sur le traitement.**
   <details><summary>Réponse</summary>Au hasard (imputer/supprimer peu risqué), liées à la donnée elle-même (l'imputation naïve biaise), manquantes par construction (c'est une information).</details>
7. **Pourquoi la médiane est-elle souvent préférée à la moyenne pour imputer ?**
   <details><summary>Réponse</summary>Elle est robuste aux valeurs extrêmes.</details>
8. **Qu'est-ce que la fuite de données (*data leakage*) lors de l'imputation ?**
   <details><summary>Réponse</summary>Calculer les statistiques sur tout le jeu (test compris) avant le split : le test influence l'entraînement, les scores sont trop optimistes.</details>
9. **Comment fonctionne la détection d'outliers par IQR ?**
   <details><summary>Réponse</summary>Sont aberrantes les valeurs hors de [Q1 − 1,5·IQR ; Q3 + 1,5·IQR].</details>
10. **Classe du plus rapide au plus lent : `iterrows`, `apply`, opération vectorisée.**
    <details><summary>Réponse</summary>Vectorisée ≻ `apply` ≻ `iterrows`.</details>
11. **Quelle est la différence entre `agg` et `transform` dans un `groupby` ?**
    <details><summary>Réponse</summary>`agg` renvoie une ligne par groupe ; `transform` renvoie une valeur par ligne d'origine.</details>
12. **Quelle différence entre `pd.cut` et `pd.qcut` ?**
    <details><summary>Réponse</summary>`cut` : bornes choisies ; `qcut` : classes d'effectifs égaux (quantiles).</details>
13. **Que fait une jointure `left` ? Que révèle `indicator=True` ?**
    <details><summary>Réponse</summary>Garde toutes les lignes de gauche ; `_merge` indique l'origine de chaque ligne (`both`, `left_only`, `right_only`).</details>
14. **Qu'est-ce qu'une jointure many-to-many et comment s'en protéger ?**
    <details><summary>Réponse</summary>La clé est dupliquée des deux côtés : le nombre de lignes explose. Protection : `validate=` et contrôle des tailles.</details>
15. **Pourquoi ne peut-on pas conclure à une causalité à partir d'une corrélation observée sur le Titanic ?**
    <details><summary>Réponse</summary>Des variables confondantes (sexe, classe…) sont liées entre elles ; l'observation ne prouve pas un effet causal.</details>

---

### 🎯 MINI-PROJET 1.3 — Rapport de qualité des données

> **Objectif.** Nettoyer un fichier CSV « sale » et produire un **rapport de qualité** montrant l'état des données avant/après.
>
> **Le fichier** (à enregistrer sous `clients_sale.csv`, ou à lire directement avec `StringIO`) :

```python
CSV_SALE = """id;nom;email;age;ville;montant;date_inscription
1;alice martin;alice@mail.fr;28;Paris;1 250,50;2024-03-15
2;BOB DURAND;bob@mail;35;lyon ;980,00;15/04/2024
3;Charlie Petit;charlie@mail.fr;999;Paris;N/A;2024-05-02
4;alice martin;alice@mail.fr;28;Paris;1 250,50;2024-03-15
5;Diana Roy;diana@mail.fr;-3;MARSEILLE;2 300,00;2024-06-30
6;Ethan Blanc;;41;Nice;-50,00;2024-07-01
7;Fanny Noir;fanny@mail.fr;29;Lille;750,25;pas de date
"""
```

> **À produire :**
> 1. Un DataFrame propre : noms en `Title Case`, villes normalisées, âges valides (sinon `NaN`), montants numériques positifs (sinon `NaN`), dates en `datetime` (deux formats à gérer), e-mails valides (contiennent `@` et un point après), doublons supprimés.
> 2. Un **rapport** (dictionnaire ou DataFrame) : nombre de lignes avant/après, manquants par colonne avant/après, nombre de corrections par type de problème.
> 3. Un export `clients_propre.csv`.

<details><summary>Solution de référence</summary>

```python
from io import StringIO

brut = pd.read_csv(StringIO(CSV_SALE), sep=";", dtype=str)          # tout en texte : on contrôle chaque conversion
rapport = {"lignes_avant": len(brut), "manquants_avant": int(brut.isna().sum().sum())}

d = brut.copy()
d["nom"] = d["nom"].str.strip().str.title()
d["ville"] = d["ville"].str.strip().str.title()

d["age"] = pd.to_numeric(d["age"], errors="coerce")
mask_age = (d["age"] < 0) | (d["age"] > 100)
rapport["ages_invalides"] = int(mask_age.sum())
d.loc[mask_age, "age"] = np.nan

d["montant"] = pd.to_numeric(d["montant"].str.replace(r"[\s\u202f]", "", regex=True).str.replace(",", ".", regex=False), errors="coerce")
mask_montant = d["montant"] < 0
rapport["montants_negatifs"] = int(mask_montant.sum())
d.loc[mask_montant, "montant"] = np.nan

# Deux formats de dates : on essaie chacun puis on combine
iso = pd.to_datetime(d["date_inscription"], format="%Y-%m-%d", errors="coerce")
fr = pd.to_datetime(d["date_inscription"], format="%d/%m/%Y", errors="coerce")
d["date_inscription"] = iso.fillna(fr)
rapport["dates_invalides"] = int(d["date_inscription"].isna().sum())

valide = d["email"].fillna("").str.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
rapport["emails_invalides"] = int((~valide & d["email"].notna()).sum())
d.loc[~valide, "email"] = np.nan

avant_dedup = len(d)
d = d.drop_duplicates(subset=["nom", "email", "age", "ville", "montant"], keep="first")
rapport["doublons_supprimes"] = avant_dedup - len(d)

rapport["lignes_apres"] = len(d)
rapport["manquants_apres"] = int(d.isna().sum().sum())
d.to_csv("clients_propre.csv", index=False)

print(pd.Series(rapport))
print(d)
```
</details>

**Critères de réussite :** aucune valeur impossible ne subsiste ; chaque correction est comptabilisée ; le rapport est lisible par un collaborateur non technique.

---

**✅ Checklist du chapitre 1.3**
- [ ] Je déroule les 10 questions de l'EDA sur un nouveau jeu de données
- [ ] Je sélectionne et filtre avec `loc`, `iloc`, `&`/`|`/`~`
- [ ] Je modifie sans piège de copie
- [ ] Je traite manquants, doublons, types, texte, dates, outliers — et je connais le risque de fuite
- [ ] Je résume avec `groupby`, `pivot_table`, `crosstab`
- [ ] Je fusionne des tables et je vérifie le résultat (`indicator`, `validate`)
- [ ] Mon mini-projet 1.3 produit un CSV propre et un rapport de qualité

---

# 📘 CHAPITRE 1.4 — MATPLOTLIB & SEABORN : LA VISUALISATION

**Durée : 1 semaine**

> 🎯 **Objectifs du chapitre.** Choisir le graphique adapté à une question, construire des figures lisibles avec Matplotlib et Seaborn, **lire** ce que montre chaque type de graphique, éviter les visualisations trompeuses, et visualiser l'entraînement d'un modèle.

---

## 1.4.0 — Principes : visualiser pour comprendre (et pour convaincre honnêtement)

### 💡 Intuition

Un tableau de 10 000 lignes est illisible ; un bon graphique révèle en une seconde une tendance, une anomalie, un groupe. La visualisation sert à **explorer** (toi, pendant l'EDA) puis à **communiquer** (les autres, dans un rapport). Dans les deux cas, **commence toujours par la question**, puis choisis le graphique.

### Quel graphique pour quelle question ?

| Question | Graphique | Outil |
|---|---|---|
| Comment **évolue** une valeur dans le temps ? | Courbe (*line plot*) | `plt.plot`, `sns.lineplot` |
| Comment est **distribuée** une variable numérique ? | Histogramme, boxplot, violon | `hist`, `sns.histplot`, `boxplot` |
| Deux variables numériques sont-elles **liées** ? | Nuage de points (*scatter*) | `scatter`, `sns.scatterplot` |
| Comment **comparer** des catégories ? | Diagramme en barres | `bar`, `sns.barplot`, `countplot` |
| Comment se **répartissent** des effectifs ? | Barres (les camemberts sont déconseillés) | `bar` |
| Quelles variables sont **corrélées** ? | Carte de chaleur (*heatmap*) | `sns.heatmap` |
| Comment **comparer une distribution entre groupes** ? | Boxplots / violons côte à côte | `sns.boxplot(x=groupe, y=valeur)` |

### Anatomie d'une figure Matplotlib

```text
Figure  (la « fenêtre » ou la feuille entière)
 └── Axes  (une zone de tracé : c'est CE QUE TU UTILISES pour dessiner)
      ├── titre (set_title)
      ├── axe x  (label, graduations)   axe y (label, graduations)
      ├── les données tracées (lignes, points, barres…)
      └── légende, grille, annotations
```

**Deux styles d'écriture** existent :
- **`pyplot`** (implicite) : `plt.plot(...)`, `plt.title(...)` — rapide pour un graphique simple.
- **Orienté objet** (explicite) : `fig, ax = plt.subplots()` puis `ax.plot(...)`, `ax.set_title(...)` — **à privilégier** dès qu'il y a plusieurs graphiques ou que tu veux du contrôle.

### Règles pour un graphique honnête et lisible

1. **Un titre** qui énonce le message, des **axes étiquetés avec unités**.
2. **Axe des barres = toujours à partir de 0** (une barre tronquée exagère les écarts).
3. **Pas trop de séries** (au-delà de 5-6 couleurs, le graphique devient illisible).
4. **Couleurs accessibles** : environ 8 % des hommes ont une déficience de perception des couleurs (daltonisme). Évite d'opposer rouge/vert uniquement ; utilise des palettes adaptées (`"viridis"`, `"colorblind"`) et varie aussi les marqueurs/styles.
5. **Ne pas surcharger** : chaque élément doit servir le message.

```python
import matplotlib
matplotlib.use("Agg")                     # mode sans fenêtre (utile dans un script/serveur) ; dans Jupyter, retire cette ligne
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# Exemple de graphique TROMPEUR vs HONNÊTE : mêmes données, deux échelles
valeurs = [98.2, 98.6, 98.9]
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(8, 3))
ax1.bar(["A", "B", "C"], valeurs); ax1.set_ylim(98, 99);  ax1.set_title("Axe tronqué : C « explose »")
ax2.bar(["A", "B", "C"], valeurs); ax2.set_ylim(0, 100);  ax2.set_title("Axe à partir de 0 : écarts réels")
plt.tight_layout()
plt.savefig("trompeur_vs_honnete.png", dpi=100)
plt.close(fig)
```

> 🏋️ **Pratique immédiate 1.4.0**
> Pour chacune des questions suivantes, nomme le graphique adapté : (a) « Les ventes ont-elles augmenté sur 12 mois ? » (b) « Les gens plus âgés paient-ils des billets plus chers ? » (c) « Quelle est la répartition des salaires ? » (d) « Quelle région vend le plus ? »
>
> <details><summary>Solution</summary>
> (a) courbe ; (b) nuage de points ; (c) histogramme (ou boxplot) ; (d) diagramme en barres.
> </details>

---

## 1.4.1 — Matplotlib : les graphiques fondamentaux

> 🎯 **Objectif.** Tracer courbes, nuages, barres, histogrammes, boxplots et cartes de chaleur ; combiner plusieurs graphiques ; sauvegarder une figure.

### Courbe

```python
x = np.linspace(0, 2 * np.pi, 200)

fig, ax = plt.subplots(figsize=(8, 4))                        # figsize : largeur × hauteur en pouces
ax.plot(x, np.sin(x), label="sin(x)", color="tab:blue", linewidth=2)
ax.plot(x, np.cos(x), label="cos(x)", color="tab:orange", linestyle="--")
ax.set_title("Fonctions trigonométriques")
ax.set_xlabel("x (radians)")
ax.set_ylabel("Valeur")
ax.legend()                                                   # affiche les labels déclarés ci-dessus
ax.grid(alpha=0.3)
fig.savefig("courbes.png", dpi=150, bbox_inches="tight")      # sauvegarder AVANT show() ; dpi = résolution
plt.close(fig)
# Dans un script : plt.show() ouvre la fenêtre. Dans Jupyter, la figure s'affiche automatiquement.
```

**Que lire ?** La tendance (monte/descend), les cycles, les ruptures. Une courbe suppose que l'ordre des points a un sens (le temps, typiquement).

### Nuage de points (*scatter*)

```python
rng = np.random.default_rng(42)
surface = rng.uniform(20, 150, 100)
prix = 3000 * surface + rng.normal(0, 40_000, 100)

fig, ax = plt.subplots(figsize=(6, 4))
ax.scatter(surface, prix, alpha=0.6, s=30, edgecolors="none")      # alpha : transparence pour les points qui se chevauchent
ax.set_xlabel("Surface (m²)"); ax.set_ylabel("Prix (€)"); ax.set_title("Prix vs surface")
plt.close(fig)
```

**Que lire ?** La **forme** du nuage : une montée régulière indique une relation positive ; un nuage sans direction, pas de relation linéaire ; des groupes séparés, des sous-populations ; des points isolés, des valeurs aberrantes.

### Barres

```python
categories = ["Python", "R", "Java", "C++"]
utilisateurs = [1200, 400, 650, 300]

fig, ax = plt.subplots(figsize=(6, 4))
barres = ax.bar(categories, utilisateurs, color="tab:green")
ax.bar_label(barres)                                   # affiche la valeur au-dessus de chaque barre
ax.set_ylabel("Utilisateurs (milliers)"); ax.set_title("Popularité des langages")
ax.set_ylim(0)                                         # l'axe démarre à 0
plt.close(fig)
```

**Pourquoi éviter le camembert ?** L'œil compare mal des angles et des surfaces ; des barres alignées rendent les écarts évidents. Garde le camembert pour 2-3 parts très différentes, au plus.

### Histogramme : la distribution d'une variable

**💡 Intuition.** On découpe l'intervalle des valeurs en *classes* (**bins**) de même largeur et on compte combien de valeurs tombent dans chacune. La **hauteur** d'une barre = l'effectif de la classe.

```python
notes = np.random.default_rng(0).normal(loc=12, scale=3, size=500).clip(0, 20)

fig, axes = plt.subplots(1, 2, figsize=(10, 3.5), sharey=True)
axes[0].hist(notes, bins=5, edgecolor="white");   axes[0].set_title("bins=5 : trop grossier")
axes[1].hist(notes, bins=30, edgecolor="white");  axes[1].set_title("bins=30 : forme lisible")
axes[1].axvline(notes.mean(), color="red", linestyle="--", label=f"moyenne = {notes.mean():.1f}")
axes[1].legend()
plt.close(fig)
```

**Que lire ?** La **forme** : symétrique (en cloche), asymétrique (une longue « queue » d'un côté), plusieurs bosses (plusieurs populations mélangées). Le **nombre de classes** change l'impression : trop peu cache la forme, trop génère du bruit.

### Boxplot (boîte à moustaches)

**Anatomie :** la boîte va de **Q1 à Q3** (50 % des données), le trait central est la **médiane**, les moustaches s'étendent jusqu'à 1,5 × IQR, et les points au-delà sont des **outliers** (les mêmes bornes qu'au chapitre 1.3.4).

```python
groupes = {"A": rng.normal(10, 2, 100), "B": rng.normal(12, 3, 100), "C": np.concatenate([rng.normal(11, 1.5, 95), [25, 27, 30, 2, 1]])}

fig, ax = plt.subplots(figsize=(6, 4))
ax.boxplot(list(groupes.values()))
ax.set_xticks([1, 2, 3], labels=list(groupes.keys()))         # étiquettes des boîtes (API stable selon les versions)
ax.set_title("Comparer des distributions")
plt.close(fig)
```

**Que lire ?** La position de la médiane, la largeur de la boîte (dispersion), l'asymétrie, les points aberrants. Idéal pour **comparer plusieurs groupes** côte à côte.

### Carte de chaleur (*heatmap*) et corrélation

```python
df_num = pd.DataFrame(rng.normal(size=(200, 4)), columns=["a", "b", "c", "d"])
df_num["e"] = df_num["a"] * 0.9 + rng.normal(0, 0.3, 200)       # `e` est fortement liée à `a`
corr = df_num.corr()                                             # matrice de corrélation de Pearson (valeurs de −1 à 1)

fig, ax = plt.subplots(figsize=(5, 4))
im = ax.imshow(corr, cmap="coolwarm", vmin=-1, vmax=1)
ax.set_xticks(range(len(corr.columns)), labels=corr.columns)
ax.set_yticks(range(len(corr.columns)), labels=corr.columns)
fig.colorbar(im, ax=ax, label="corrélation")
plt.close(fig)
print(corr.round(2).loc["a", "e"])       # ≈ 0.95
```

**Que lire ?** Le coefficient de corrélation de Pearson mesure une relation **linéaire** entre deux variables : proche de 1 (elles montent ensemble), de −1 (l'une monte quand l'autre baisse), de 0 (pas de relation *linéaire*).

> ⚠️ **Corrélation ≠ causalité.** Les ventes de glaces et les noyades sont corrélées : c'est l'été qui cause les deux. Et une corrélation de 0 n'exclut pas une relation non linéaire (une parabole, par exemple). **Regarde toujours le nuage de points** derrière un coefficient.

### Plusieurs graphiques : `subplots` (un « tableau de bord »)

```python
fig, axes = plt.subplots(2, 2, figsize=(10, 7))
axes[0, 0].plot(x, np.sin(x));                        axes[0, 0].set_title("Courbe")
axes[0, 1].scatter(surface, prix, s=15, alpha=0.6);   axes[0, 1].set_title("Nuage")
axes[1, 0].bar(categories, utilisateurs);             axes[1, 0].set_title("Barres")
axes[1, 1].hist(notes, bins=20);                      axes[1, 1].set_title("Histogramme")
fig.suptitle("Tableau de bord", fontsize=14)
fig.tight_layout()                                    # évite que titres et étiquettes se chevauchent
fig.savefig("dashboard.png", dpi=120)
plt.close(fig)
```

**Annoter un point important :**

```python
fig, ax = plt.subplots()
ax.plot(x, np.sin(x))
ax.annotate("maximum", xy=(np.pi / 2, 1), xytext=(3, 0.85), arrowprops={"arrowstyle": "->"})
plt.close(fig)
```

> 🏋️ **Pratique immédiate 1.4.1**
> Génère 300 tailles (loi normale moyenne 170, écart-type 10). Trace (a) un histogramme à 20 classes avec une ligne verticale à la médiane, (b) un boxplot horizontal du même échantillon (`vert=False`, argument historique ; selon ta version Matplotlib il peut être remplacé par `orientation="horizontal"`). Décris en une phrase ce que montrent les deux.
>
> <details><summary>Solution</summary>
>
> ```python
> tailles = np.random.default_rng(1).normal(170, 10, 300)
> fig, (a, b) = plt.subplots(1, 2, figsize=(10, 3.5))
> a.hist(tailles, bins=20, edgecolor="white"); a.axvline(np.median(tailles), color="red", linestyle="--")
> a.set_title("Histogramme"); a.set_xlabel("Taille (cm)")
> b.boxplot(tailles); b.set_title("Boxplot"); b.set_ylabel("Taille (cm)")
> plt.close(fig)
> # Les deux montrent une distribution symétrique centrée vers 170 cm, avec très peu de valeurs extrêmes.
> ```
> </details>

✅ **Je sais** : tracer les 6 graphiques fondamentaux avec l'API objet, lire un histogramme/boxplot/heatmap, éviter les axes trompeurs, sauvegarder une figure.

---

## 1.4.2 — Seaborn : les graphiques statistiques en quelques lignes

> 🎯 **Objectif.** Utiliser Seaborn pour produire rapidement des graphiques statistiques élégants directement à partir d'un DataFrame.

Seaborn est construit **au-dessus** de Matplotlib : plus concis, meilleurs styles par défaut, et il comprend les DataFrames Pandas. On lui passe le DataFrame (`data=`) et les **noms de colonnes** (`x=`, `y=`, `hue=`).

### Le format « tidy »

Seaborn attend des données **ordonnées** (*tidy*) : **une variable par colonne, une observation par ligne**. Pour comparer trois groupes, on n'a pas trois colonnes `groupe_A`, `groupe_B`, `groupe_C` : on a **une colonne `groupe`** et **une colonne `valeur`**. Cette structure permet `hue="groupe"`.

```python
import seaborn as sns
from sklearn.datasets import load_iris

sns.set_theme(style="whitegrid", palette="colorblind")         # style et palette accessibles

iris = load_iris(as_frame=True)                                # jeu de données fourni avec scikit-learn (aucun téléchargement)
fleurs = iris.frame.rename(columns={
    "sepal length (cm)": "sepale_long", "sepal width (cm)": "sepale_larg",
    "petal length (cm)": "petale_long", "petal width (cm)": "petale_larg"})
fleurs["espece"] = fleurs["target"].map(dict(enumerate(iris.target_names)))     # 0,1,2 → setosa, versicolor, virginica
print(fleurs.head(3))
```

### Distributions

```python
fig, axes = plt.subplots(1, 3, figsize=(14, 4))

sns.histplot(data=fleurs, x="petale_long", hue="espece", bins=20, ax=axes[0])       # histogrammes superposés par groupe
axes[0].set_title("Histogramme par espèce")

sns.kdeplot(data=fleurs, x="petale_long", hue="espece", fill=True, ax=axes[1])      # densité lissée
axes[1].set_title("Densité (KDE)")

sns.violinplot(data=fleurs, x="espece", y="petale_long", hue="espece", legend=False, ax=axes[2])   # boxplot + densité
axes[2].set_title("Violons")
fig.tight_layout(); fig.savefig("distributions.png", dpi=100); plt.close(fig)
```

**KDE** (*Kernel Density Estimation*) : une version **lissée** de l'histogramme (une courbe de densité). **Que lire ?** Les trois espèces ont des longueurs de pétales très différentes : *setosa* est nettement séparée des deux autres, qui se chevauchent un peu.

### Comparer des catégories et relations

```python
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

sns.boxplot(data=fleurs, x="espece", y="petale_long", hue="espece", legend=False, ax=axes[0])
sns.scatterplot(data=fleurs, x="petale_long", y="petale_larg", hue="espece", style="espece", ax=axes[1])
sns.countplot(data=fleurs, x="espece", hue="espece", legend=False, ax=axes[2])       # nombre d'observations par catégorie
axes[2].set_title("Effectifs : classes équilibrées ?")
fig.tight_layout(); fig.savefig("categories.png", dpi=100); plt.close(fig)
```

**Toujours vérifier l'équilibre des classes** (`countplot`) avant de modéliser : nous verrons au chapitre 1.5 pourquoi un déséquilibre change tout.

### Corrélations

```python
fig, ax = plt.subplots(figsize=(5.5, 4.5))
cols_num = ["sepale_long", "sepale_larg", "petale_long", "petale_larg"]
sns.heatmap(fleurs[cols_num].corr(), annot=True, fmt=".2f", cmap="coolwarm", vmin=-1, vmax=1, square=True, ax=ax)
ax.set_title("Corrélations")
fig.tight_layout(); fig.savefig("correlations.png", dpi=100); plt.close(fig)
```

### Axes-level vs figure-level : comprendre pour éviter les surprises

| Famille | Exemples | Se comporte comme… | Dessine dans… |
|---|---|---|---|
| **Axes-level** | `histplot`, `boxplot`, `scatterplot`, `heatmap`, `countplot` | une fonction Matplotlib | **un `Axes` existant** (`ax=`) |
| **Figure-level** | `pairplot`, `relplot`, `catplot`, `displot` | crée **sa propre figure** (grille de graphiques) | sa propre `FacetGrid` (pas de `ax=`) |

```python
g = sns.pairplot(fleurs[cols_num + ["espece"]], hue="espece", corner=True)       # toutes les paires de variables d'un coup
g.figure.savefig("pairplot.png", dpi=80)
plt.close(g.figure)
```

`pairplot` est l'outil de l'EDA rapide : il montre les distributions (diagonale) et chaque relation deux à deux. Attention à ne pas l'utiliser avec 30 colonnes (900 graphiques).

> 🏋️ **Pratique immédiate 1.4.2**
> Sur `fleurs`, trace : (a) un nuage `sepale_long` × `sepale_larg` coloré par espèce ; (b) un boxplot de `sepale_larg` par espèce. Laquelle des deux variables sépare le mieux les espèces : `sepale_larg` ou `petale_long` ? Justifie avec les graphiques.
>
> <details><summary>Solution</summary>
>
> ```python
> fig, (a, b) = plt.subplots(1, 2, figsize=(10, 4))
> sns.scatterplot(data=fleurs, x="sepale_long", y="sepale_larg", hue="espece", ax=a)
> sns.boxplot(data=fleurs, x="espece", y="sepale_larg", hue="espece", legend=False, ax=b)
> plt.close(fig)
> # `petale_long` sépare beaucoup mieux : ses boîtes par espèce ne se chevauchent presque pas,
> # alors que celles de `sepale_larg` se recouvrent fortement.
> ```
> </details>

✅ **Je sais** : utiliser le format tidy, `hue`, produire histogramme/KDE/boxplot/violon/scatter/heatmap/pairplot avec Seaborn, distinguer axes-level et figure-level.

---

## 1.4.3 — Visualiser l'entraînement d'un modèle : les courbes d'apprentissage

> 🎯 **Objectif.** Savoir lire la courbe de perte (*loss*) d'un entraînement et y reconnaître sous-apprentissage et sur-apprentissage.

Lorsqu'on entraîne un modèle de façon itérative, on suit à chaque **époque** (un passage complet sur les données d'entraînement) deux valeurs : la **perte** (*loss*, l'erreur que le modèle cherche à minimiser) sur l'**entraînement** et sur un jeu de **validation** (des données que le modèle n'utilise pas pour apprendre).

```python
epochs = np.arange(1, 51)
rng = np.random.default_rng(0)

loss_train_bon = 2.0 * np.exp(-epochs / 12) + 0.15 + rng.normal(0, 0.01, 50)
loss_val_bon = 2.0 * np.exp(-epochs / 12) + 0.25 + rng.normal(0, 0.02, 50)

loss_train_surappr = 2.0 * np.exp(-epochs / 8) + 0.02 + rng.normal(0, 0.01, 50)
loss_val_surappr = 1.0 * np.exp(-epochs / 6) + 0.45 + np.maximum(0, (epochs - 15)) * 0.012 + rng.normal(0, 0.02, 50)

fig, axes = plt.subplots(1, 2, figsize=(11, 4), sharey=True)
axes[0].plot(epochs, loss_train_bon, label="entraînement"); axes[0].plot(epochs, loss_val_bon, label="validation")
axes[0].set_title("Apprentissage sain"); axes[0].set_xlabel("Époque"); axes[0].set_ylabel("Perte"); axes[0].legend()

axes[1].plot(epochs, loss_train_surappr, label="entraînement"); axes[1].plot(epochs, loss_val_surappr, label="validation")
axes[1].axvline(loss_val_surappr.argmin() + 1, color="gray", linestyle=":", label="meilleur moment pour s'arrêter")
axes[1].set_title("Sur-apprentissage"); axes[1].set_xlabel("Époque"); axes[1].legend()
fig.tight_layout(); fig.savefig("courbes_apprentissage.png", dpi=100); plt.close(fig)
print("Époque optimale :", loss_val_surappr.argmin() + 1)
```

**Comment lire ces courbes :**

| Ce que tu vois | Diagnostic | Que faire ? |
|---|---|---|
| Les deux courbes baissent ensemble puis se stabilisent, écart faible | Apprentissage sain | Continuer / arrêter à la stabilisation |
| Les deux courbes restent **hautes** | **Sous-apprentissage** : le modèle est trop simple ou mal réglé | Modèle plus riche, plus d'époques, meilleures variables |
| Perte d'entraînement **très basse**, perte de validation qui **remonte** | **Sur-apprentissage** : le modèle « apprend par cœur » | Plus de données, régularisation, arrêt précoce (*early stopping*) |

Ces diagnostics reviendront au chapitre 1.5. Les autres graphiques d'évaluation d'un modèle — **matrice de confusion, courbe ROC, importance des variables** — sont présentés dans le chapitre 1.5, juste après avoir défini les métriques qu'ils illustrent.

---

## 🏋️ EXERCICES — CHAPITRE 1.4

### Exercice 1.4.A — Reproduire un graphique ⭐

Reproduis exactement ce graphique : une courbe verte pointillée de `y = x²` pour `x ∈ [-3, 3]`, le titre « Parabole », les axes étiquetés, une grille légère, et un point rouge annoté « minimum » en (0, 0).

<details><summary>Solution</summary>

```python
x = np.linspace(-3, 3, 200)
fig, ax = plt.subplots(figsize=(5, 4))
ax.plot(x, x ** 2, color="green", linestyle=":", linewidth=2)
ax.scatter([0], [0], color="red", zorder=3)
ax.annotate("minimum", xy=(0, 0), xytext=(1, 2), arrowprops={"arrowstyle": "->"})
ax.set_title("Parabole"); ax.set_xlabel("x"); ax.set_ylabel("y = x²"); ax.grid(alpha=0.3)
plt.close(fig)
```
</details>

### Exercice 1.4.B — Corriger un mauvais graphique ⭐⭐

Ce graphique cumule quatre défauts. Liste-les puis corrige-le.

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.bar(["A", "B", "C", "D", "E", "F", "G", "H"], [95.1, 95.4, 95.3, 95.6, 95.2, 95.8, 95.5, 95.7],
       color=["red", "green", "red", "green", "red", "green", "red", "green"])
ax.set_ylim(95, 96)
plt.close(fig)
```

<details><summary>Solution</summary>

Défauts : (1) axe tronqué à 95–96, qui exagère des écarts minuscules ; (2) aucun titre ; (3) aucun label d'axe ni unité ; (4) alternance rouge/vert sans signification (et illisible pour un daltonien).

```python
fig, ax = plt.subplots(figsize=(7, 4))
barres = ax.bar(list("ABCDEFGH"), [95.1, 95.4, 95.3, 95.6, 95.2, 95.8, 95.5, 95.7], color="tab:blue")
ax.bar_label(barres, fmt="%.1f")
ax.set_ylim(0, 100)
ax.set_title("Précision des modèles A à H : des performances très proches")
ax.set_xlabel("Modèle"); ax.set_ylabel("Précision (%)")
plt.close(fig)
```
</details>

### Exercice 1.4.C — Dashboard d'analyse ⭐⭐⭐

À partir du DataFrame `ventes` de l'exercice 1.3.A, construis un dashboard 2×2 : CA par mois (courbe), CA par produit (barres), répartition des quantités (histogramme), CA par région (boxplot Seaborn). Sauvegarde-le en PNG.

<details><summary>Solution</summary>

```python
rng = np.random.default_rng(42)
n = 100
prix_base = {"Laptop": 1200, "Phone": 800, "Tablet": 500, "Écouteurs": 150}
ventes = pd.DataFrame({
    "date": pd.to_datetime("2025-01-01") + pd.to_timedelta(rng.integers(0, 180, n), unit="D"),
    "produit": rng.choice(list(prix_base), n), "region": rng.choice(["Nord", "Sud", "Est", "Ouest"], n),
    "quantite": rng.integers(1, 11, n)})
ventes["ca"] = ventes["quantite"] * ventes["produit"].map(prix_base)
ventes["mois"] = ventes["date"].dt.to_period("M").astype(str)

fig, axes = plt.subplots(2, 2, figsize=(12, 8))
ventes.groupby("mois")["ca"].sum().plot(ax=axes[0, 0], marker="o", title="CA mensuel")
ventes.groupby("produit")["ca"].sum().sort_values().plot.barh(ax=axes[0, 1], title="CA par produit")
axes[1, 0].hist(ventes["quantite"], bins=10, edgecolor="white"); axes[1, 0].set_title("Quantités par vente")
sns.boxplot(data=ventes, x="region", y="ca", hue="region", legend=False, ax=axes[1, 1]); axes[1, 1].set_title("CA par région")
fig.suptitle("Dashboard des ventes", fontsize=14); fig.tight_layout()
fig.savefig("dashboard_ventes.png", dpi=110); plt.close(fig)
```
</details>

---

### 🧠 Quiz de fin de Chapitre 1.4 (12 questions)

1. **Quel graphique pour montrer l'évolution d'une valeur dans le temps ?**
   <details><summary>Réponse</summary>Une courbe.</details>
2. **Quelle différence entre `Figure` et `Axes` ?**
   <details><summary>Réponse</summary>La Figure est la feuille entière ; un Axes est une zone de tracé qui contient les données et les axes.</details>
3. **Pourquoi un diagramme en barres doit-il commencer à 0 ?**
   <details><summary>Réponse</summary>La longueur de la barre représente la valeur : un axe tronqué exagère visuellement les écarts.</details>
4. **Que montre la boîte d'un boxplot ? et les points au-delà des moustaches ?**
   <details><summary>Réponse</summary>La boîte : de Q1 à Q3 avec la médiane au centre ; les points : des outliers (au-delà de 1,5 × IQR).</details>
5. **Comment le nombre de *bins* influence-t-il un histogramme ?**
   <details><summary>Réponse</summary>Trop peu cache la forme de la distribution, trop crée du bruit.</details>
6. **Un coefficient de corrélation de 0 prouve-t-il l'absence de relation ?**
   <details><summary>Réponse</summary>Non : seulement l'absence de relation *linéaire*. Il faut regarder le nuage de points.</details>
7. **Que signifie le format « tidy » ?**
   <details><summary>Réponse</summary>Une variable par colonne, une observation par ligne.</details>
8. **Quelle différence entre `sns.boxplot` et `sns.pairplot` ?**
   <details><summary>Réponse</summary>`boxplot` est axes-level (dessine dans un Axes) ; `pairplot` est figure-level (crée sa propre grille de graphiques).</details>
9. **Pourquoi écrire `plt.savefig(...)` avant `plt.show()` ?**
   <details><summary>Réponse</summary>Après `show()`, la figure peut être fermée/vidée ; on sauvegarde donc avant.</details>
10. **Sur une courbe d'apprentissage, que signifie une perte de validation qui remonte alors que la perte d'entraînement baisse ?**
    <details><summary>Réponse</summary>Du sur-apprentissage.</details>
11. **Que signifie une perte d'entraînement et de validation toutes deux élevées ?**
    <details><summary>Réponse</summary>Du sous-apprentissage : le modèle est trop simple ou insuffisamment entraîné.</details>
12. **Pourquoi utiliser une palette adaptée au daltonisme ?**
    <details><summary>Réponse</summary>Pour que le graphique reste lisible par les personnes qui distinguent mal certaines couleurs (rouge/vert notamment).</details>

---

### 🎯 MINI-PROJET 1.4 — Un générateur de rapport EDA automatique

> **Objectif.** Écrire une fonction `rapport_eda(df, cible=None, fichier="rapport_eda.png")` qui, pour **n'importe quel DataFrame**, produit une planche de graphiques résumant les données.
>
> **Cahier des charges :**
> 1. Détecte automatiquement les colonnes numériques et catégorielles.
> 2. Trace un histogramme par colonne numérique (max 6), un `countplot`/barres par colonne catégorielle (max 3) et, s'il y a au moins deux colonnes numériques, une heatmap de corrélation.
> 3. Si `cible` est donnée, colore les histogrammes par cible.
> 4. Affiche en titre le nombre de lignes et de manquants ; sauvegarde le PNG et renvoie le nom du fichier.
> 5. La fonction ne doit pas planter sur un DataFrame vide de colonnes d'un type donné.
>
> Teste-la sur `fleurs` (iris) puis sur un autre jeu de données (par exemple le Titanic du chapitre 1.3).

<details><summary>Solution de référence</summary>

```python
import math

def rapport_eda(df, cible=None, fichier="rapport_eda.png", max_num=6, max_cat=3):
    num = [c for c in df.select_dtypes(include="number").columns if c != cible][:max_num]
    cat = [c for c in df.select_dtypes(exclude="number").columns if c != cible][:max_cat]
    n_graphes = len(num) + len(cat) + (1 if len(num) >= 2 else 0)
    if n_graphes == 0:
        raise ValueError("Aucune colonne exploitable")

    colonnes = 3
    lignes = math.ceil(n_graphes / colonnes)
    fig, axes = plt.subplots(lignes, colonnes, figsize=(5 * colonnes, 3.5 * lignes), squeeze=False)
    axes_plats = list(axes.ravel())

    for col in num:
        ax = axes_plats.pop(0)
        if cible is not None and df[cible].nunique() <= 10:
            sns.histplot(data=df, x=col, hue=cible, ax=ax, bins=20)
        else:
            sns.histplot(data=df, x=col, ax=ax, bins=20)
        ax.set_title(col)
    for col in cat:
        ax = axes_plats.pop(0)
        top = df[col].value_counts().head(8)
        ax.bar(top.index.astype(str), top.values); ax.set_title(col); ax.tick_params(axis="x", rotation=45)
    if len(num) >= 2:
        ax = axes_plats.pop(0)
        sns.heatmap(df[num].corr(), annot=True, fmt=".2f", cmap="coolwarm", vmin=-1, vmax=1, ax=ax, cbar=False)
        ax.set_title("Corrélations")
    for ax in axes_plats:                      # masque les cases vides
        ax.set_visible(False)

    fig.suptitle(f"{len(df)} lignes × {df.shape[1]} colonnes — {int(df.isna().sum().sum())} valeurs manquantes", fontsize=13)
    fig.tight_layout()
    fig.savefig(fichier, dpi=100)
    plt.close(fig)
    return fichier

print(rapport_eda(fleurs, cible="espece", fichier="eda_iris.png"))
demo = pd.DataFrame({"x": rng.normal(size=50), "groupe": rng.choice(["a", "b"], 50)})
print(rapport_eda(demo, fichier="eda_demo.png"))
```
</details>

**Pistes d'amélioration (🔸) :** remplacer les histogrammes par des KDE ; ajouter un tableau des valeurs manquantes par colonne ; exporter le rapport en HTML.

---

**✅ Checklist du chapitre 1.4**
- [ ] Je choisis le graphique selon la question posée
- [ ] Je construis des figures avec `fig, ax = plt.subplots()`
- [ ] Je sais **lire** un histogramme, un boxplot, une heatmap, un nuage de points
- [ ] Je repère et corrige un graphique trompeur (axe tronqué, couleurs, surcharge)
- [ ] J'utilise Seaborn avec des données *tidy* et `hue`
- [ ] Je diagnostique sous-/sur-apprentissage sur une courbe d'apprentissage
- [ ] Mon mini-projet `rapport_eda` fonctionne sur deux jeux de données

---

# 📘 CHAPITRE 1.5 — SCIKIT-LEARN : PREMIER CONTACT AVEC LE MACHINE LEARNING

**Durée : 2 semaines**

> 🎯 **Objectifs du chapitre.** Comprendre les concepts de base du ML (apprentissage supervisé, jeu d'entraînement/test, sur-apprentissage) ; utiliser l'API unifiée de Scikit-learn ; **choisir et interpréter** les métriques d'évaluation ; valider un modèle correctement (validation croisée, **sans fuite de données**) ; construire un `Pipeline` de prétraitement ; régler des hyperparamètres ; sauvegarder un modèle.
>
> **Périmètre.** Ce chapitre t'apprend à **utiliser** des modèles avec rigueur. Le fonctionnement interne des algorithmes (descente de gradient, arbres, SVM…) est l'objet du **Module 3** ; les réseaux de neurones, du **Module 4**. Ici, on construit la **méthode** : c'est elle qui distingue un ingénieur d'un débutant.

---

## 1.5.0 — Le Machine Learning en 30 minutes

### 💡 Intuition

En programmation classique, tu écris des **règles** : « si le solde est négatif, alors envoyer une alerte ». En Machine Learning, tu donnes des **exemples** (données + réponses attendues) et l'algorithme **découvre lui-même les règles**.

```text
Programmation classique :   données + RÈGLES  ──►  réponses
Machine Learning        :   données + RÉPONSES ──►  RÈGLES (= le modèle)
```

### Le vocabulaire indispensable

| Terme | Définition | Exemple (prédire si un client quitte la banque) |
|---|---|---|
| **Échantillon** (*sample*) | une ligne du jeu de données | un client |
| **Caractéristiques** (*features*), notées **X** | les variables d'entrée | âge, ancienneté, nombre de produits |
| **Cible** (*target* / *label*), notée **y** | ce qu'on veut prédire | « parti » (1) ou « resté » (0) |
| **Modèle** | la fonction apprise qui transforme X en prédiction | une régression logistique |
| **Entraînement** (*fit*) | ajuster le modèle sur des exemples | `modele.fit(X_train, y_train)` |
| **Prédiction** (*predict*) | utiliser le modèle sur de nouvelles données | `modele.predict(X_nouveau)` |
| **Paramètres** | valeurs **apprises** par le modèle | les coefficients d'une régression |
| **Hyperparamètres** | réglages **choisis par toi avant** l'entraînement | profondeur d'un arbre, force de régularisation |

### Les grandes familles de problèmes

- **Apprentissage supervisé** : on dispose de la cible pour chaque exemple.
  - **Classification** : prédire une **catégorie** (spam / non-spam ; maligne / bénigne).
  - **Régression** : prédire un **nombre** (prix d'une maison ; température demain).
- **Apprentissage non supervisé** : pas de cible ; on cherche une **structure** (regrouper des clients similaires : *clustering*).
- Les réseaux de neurones, l'apprentissage par renforcement, etc. : Modules 4 à 7.

### Ce qui compte vraiment : la généralisation

Un modèle n'est pas bon parce qu'il réussit sur les données qu'il **a déjà vues** (il pourrait les avoir apprises par cœur), mais parce qu'il réussit sur des données **nouvelles**. D'où la règle fondamentale :

```text
Jeu de données complet
├── Entraînement (≈ 60-80 %)  → le modèle APPREND dessus
├── Validation  (via validation croisée) → on COMPARE et on RÈGLE les modèles dessus
└── Test (≈ 20 %)             → mis sous clé, utilisé UNE SEULE FOIS à la toute fin pour mesurer la performance finale
```

Et une deuxième règle : **toujours comparer à une *baseline*** (un modèle trivial, comme « toujours prédire la classe la plus fréquente »). Un modèle qui ne bat pas la baseline est inutile, même avec un score qui paraît élevé.

```python
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression, Ridge, LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier
from sklearn.dummy import DummyClassifier, DummyRegressor
from sklearn.metrics import (accuracy_score, precision_score, recall_score, f1_score, roc_auc_score,
                             confusion_matrix, ConfusionMatrixDisplay, RocCurveDisplay,
                             mean_absolute_error, mean_squared_error, r2_score, classification_report)
from sklearn.datasets import load_diabetes, load_breast_cancer
```

---

## 1.5.1 — L'API de Scikit-learn et la régression

> 🎯 **Objectif.** Maîtriser le schéma `fit` / `predict` / `transform` commun à tous les objets Scikit-learn, et évaluer une régression avec MAE, RMSE et R².

### L'API unifiée : trois types d'objets

| Type d'objet | Méthodes | Rôle | Exemples |
|---|---|---|---|
| **Estimateur** (*estimator*) | `fit(X, y)` | apprend à partir des données | tous |
| **Prédicteur** (*predictor*) | `predict(X)`, `score(X, y)` | prédit | `LinearRegression`, `RandomForestClassifier` |
| **Transformateur** (*transformer*) | `fit(X)`, `transform(X)`, `fit_transform(X)` | transforme les données | `StandardScaler`, `OneHotEncoder`, `SimpleImputer` |

Le schéma est **toujours le même**, quel que soit l'algorithme : c'est ce qui rend Scikit-learn si agréable (et rappelle la classe `ClassifieurMajoritaire` écrite au chapitre 1.1.6). Conventions : `X` est un tableau 2D `(n_échantillons, n_caractéristiques)`, `y` un vecteur 1D ; les attributs appris se terminent par un underscore (`coef_`, `intercept_`).

### Premier modèle : prédire l'évolution d'une maladie (régression)

Le jeu de données **diabetes** (fourni avec Scikit-learn, 442 patients, 10 caractéristiques cliniques standardisées) a pour cible un indice d'évolution de la maladie un an après.

```python
donnees = load_diabetes(as_frame=True)
X, y = donnees.data, donnees.target
print(X.shape, y.shape)                      # (442, 10) (442,)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(len(X_train), len(X_test))             # 353 89
```

`random_state=42` fixe la graine du mélange : **même découpage à chaque exécution** (reproductibilité). `test_size=0.2` réserve 20 % pour le test.

```python
baseline = DummyRegressor(strategy="mean").fit(X_train, y_train)          # prédit toujours la moyenne de y_train
modele = LinearRegression().fit(X_train, y_train)

for nom, m in [("baseline (moyenne)", baseline), ("régression linéaire", modele)]:
    y_pred = m.predict(X_test)
    print(f"{nom:<22} MAE={mean_absolute_error(y_test, y_pred):6.1f}  "
          f"RMSE={mean_squared_error(y_test, y_pred) ** 0.5:6.1f}  R²={r2_score(y_test, y_pred):5.2f}")

print("Coefficients appris :", dict(zip(X.columns, modele.coef_.round(0).tolist())))
```

### Les métriques de régression expliquées

Soient `yᵢ` les vraies valeurs, `ŷᵢ` les prédictions, `ȳ` la moyenne des vraies valeurs, `n` le nombre d'échantillons.

| Métrique | Formule | Interprétation |
|---|---|---|
| **MAE** (erreur absolue moyenne) | `(1/n) Σ |yᵢ − ŷᵢ|` | l'erreur **typique**, dans l'unité de la cible ; facile à expliquer |
| **RMSE** (racine de l'erreur quadratique moyenne) | `√[(1/n) Σ (yᵢ − ŷᵢ)²]` | comme la MAE mais **pénalise plus les grosses erreurs** (elles sont élevées au carré) |
| **R²** (coefficient de détermination) | `1 − Σ(yᵢ − ŷᵢ)² / Σ(yᵢ − ȳ)²` | part de la **variance expliquée** : 1 = parfait, 0 = pas mieux que prédire la moyenne, **négatif = pire que la moyenne** |

**Vérifions à la main sur 5 points :**

```python
y_vrai = np.array([3.0, 5.0, 2.5, 7.0, 4.5])
y_hat = np.array([2.5, 5.0, 3.0, 8.0, 4.0])

mae = np.abs(y_vrai - y_hat).mean()
rmse = np.sqrt(((y_vrai - y_hat) ** 2).mean())
r2 = 1 - ((y_vrai - y_hat) ** 2).sum() / ((y_vrai - y_vrai.mean()) ** 2).sum()
print(mae, round(rmse, 3), round(r2, 3))
print(np.isclose(mae, mean_absolute_error(y_vrai, y_hat)), np.isclose(r2, r2_score(y_vrai, y_hat)))   # True True
```

**Lecture du résultat diabetes :** la baseline obtient un R² proche de 0 (par construction : elle prédit la moyenne) ; la régression linéaire explique environ 45 % de la variance. C'est **mieux que la baseline**, mais cela reste modeste : le modèle ne prédit pas parfaitement, et c'est normal — l'évolution d'une maladie dépend de nombreux facteurs absents des données.

> 🏋️ **Pratique immédiate 1.5.1**
> **(a)** Entraîne un `Ridge(alpha=1.0)` (une régression linéaire « régularisée ») sur le même découpage et compare son R² à celui de `LinearRegression`. **(b)** Ta MAE est-elle exprimée dans l'unité de la cible ? **(c)** Un collègue annonce « R² = 0,45 : le modèle se trompe de 55 % du temps ». A-t-il raison ?
>
> <details><summary>Solution</summary>
>
> ```python
> ridge = Ridge(alpha=1.0).fit(X_train, y_train)
> print(round(r2_score(y_test, ridge.predict(X_test)), 3))
> ```
> (b) Oui : la MAE est l'erreur moyenne dans l'unité de la cible (ici des points d'indice). (c) Non : le R² n'est pas un pourcentage de « bonnes prédictions ». Il mesure la part de la **variance** de la cible expliquée par le modèle.
> </details>

✅ **Je sais** : appliquer `fit`/`predict`, distinguer estimateur/transformateur, calculer et interpréter MAE, RMSE, R², comparer à une baseline.

---

## 1.5.2 — Classification et métriques d'évaluation

> 🎯 **Objectif.** Entraîner des classifieurs, comprendre **pourquoi l'accuracy seule peut mentir**, et maîtriser matrice de confusion, précision, rappel, F1 et AUC.

### Un jeu de données réel : le diagnostic du cancer du sein

**breast_cancer** (569 tumeurs, 30 mesures issues d'images de biopsies). On définit la **classe positive = tumeur maligne** (le cas qu'on veut détecter).

```python
cancer = load_breast_cancer(as_frame=True)
Xc = cancer.data
yc = (cancer.target == 0).astype(int)        # dans le jeu d'origine, 0 = maligne ; on inverse : 1 = maligne (classe positive)
print(Xc.shape, yc.mean().round(3))          # (569, 30) 0.373  → 37 % de tumeurs malignes

Xc_train, Xc_test, yc_train, yc_test = train_test_split(Xc, yc, test_size=0.2, stratify=yc, random_state=42)
```

`stratify=yc` impose que les proportions de classes soient **les mêmes** dans l'entraînement et le test : indispensable quand une classe est rare.

### La matrice de confusion : la base de toutes les métriques

Pour un problème binaire, on croise la réalité et la prédiction :

```text
                          PRÉDIT
                     négatif      positif
RÉEL   négatif  │   VN (TN)    │   FP    │   FP = « fausse alerte »
       positif  │   FN         │   VP (TP)│   FN = « cas manqué »
```

- **VP** (vrai positif) : maligne, prédite maligne ✅
- **VN** (vrai négatif) : bénigne, prédite bénigne ✅
- **FP** (faux positif) : bénigne, prédite maligne → *fausse alerte* (examens inutiles)
- **FN** (faux négatif) : maligne, prédite bénigne → **cas manqué** (potentiellement grave)

### Les métriques, construites à partir de la matrice

| Métrique | Formule | Question à laquelle elle répond |
|---|---|---|
| **Accuracy** | `(VP + VN) / total` | « Quelle proportion de prédictions sont justes ? » |
| **Précision** | `VP / (VP + FP)` | « Quand je prédis *positif*, quelle proportion l'est vraiment ? » |
| **Rappel** (*recall*, sensibilité) | `VP / (VP + FN)` | « Parmi les vrais positifs, quelle proportion ai-je retrouvée ? » |
| **F1** | `2 · précision · rappel / (précision + rappel)` | compromis (moyenne harmonique) entre précision et rappel |

**Calcul à la main.** Sur 100 patients, un modèle produit : VP = 8, FP = 2, FN = 4, VN = 86.

```python
VP, FP, FN, VN = 8, 2, 4, 86
accuracy = (VP + VN) / (VP + FP + FN + VN)
precision = VP / (VP + FP)
rappel = VP / (VP + FN)
f1 = 2 * precision * rappel / (precision + rappel)
print(f"accuracy={accuracy:.2f}  précision={precision:.2f}  rappel={rappel:.2f}  F1={f1:.2f}")
# accuracy=0.94  précision=0.80  rappel=0.67  F1=0.73
```

**Lecture :** 94 % d'accuracy paraît excellent, mais le modèle **manque un tiers des cas positifs** (rappel 0,67). Quelle métrique privilégier dépend du **coût des erreurs** :

| Contexte | Erreur la plus coûteuse | Métrique à privilégier |
|---|---|---|
| Dépistage d'une maladie grave | FN (un malade non détecté) | **Rappel** |
| Filtre anti-spam | FP (un vrai mail perdu) | **Précision** |
| Détection de fraude | les deux comptent | **F1** / courbes précision-rappel |

### Le paradoxe de l'accuracy : quand 90 % ne veut rien dire

Reprenons le problème « prédire le départ d'un client » (*churn*), où seuls **≈ 9 %** des clients partent. Voici un générateur de données simulées que nous réutiliserons jusqu'à la fin du chapitre :

```python
def generer_churn(n=5000, graine=42):
    """Données simulées de clients d'une banque (≈ 9 % de départs), avec quelques valeurs manquantes."""
    rng = np.random.default_rng(graine)
    age = np.clip(rng.normal(40, 12, n), 18, 80).round()
    anciennete = np.clip(rng.normal(5, 3, n), 0, 20).round()
    nb_produits = rng.choice([1, 2, 3, 4], size=n, p=[0.5, 0.42, 0.06, 0.02])
    solde = np.round(rng.lognormal(10.0, 0.9, n), 2)
    membre_actif = rng.choice([0, 1], size=n)
    carte_credit = rng.choice([0, 1], size=n, p=[0.3, 0.7])
    pays = rng.choice(["France", "Allemagne", "Espagne"], size=n, p=[0.5, 0.25, 0.25])

    logit = (-2.6 + 0.05 * (age - 40) - 0.1 * anciennete - 1.2 * membre_actif + 1.6 * (nb_produits >= 3)
             + 1.0 * (pays == "Allemagne") + 0.25 * np.log1p(solde / 1000) - 0.3 * carte_credit)
    churn = (rng.random(n) < 1 / (1 + np.exp(-logit))).astype(int)

    df = pd.DataFrame({"age": age, "anciennete": anciennete, "nb_produits": nb_produits, "solde": solde,
                       "membre_actif": membre_actif, "carte_credit": carte_credit, "pays": pays, "churn": churn})
    df.loc[rng.random(n) < 0.05, "solde"] = np.nan        # valeurs manquantes à traiter
    df.loc[rng.random(n) < 0.03, "age"] = np.nan
    return df

churn = generer_churn()
print(churn["churn"].mean().round(3), churn.isna().sum()[["age", "solde"]].to_dict())     # ≈ 0.092
```

```python
X_ch, y_ch = churn.drop(columns="churn"), churn["churn"]
Xch_train, Xch_test, ych_train, ych_test = train_test_split(X_ch, y_ch, test_size=0.2, stratify=y_ch, random_state=42)

dummy = DummyClassifier(strategy="most_frequent").fit(Xch_train, ych_train)     # prédit toujours « reste »
pred = dummy.predict(Xch_test)
print(f"accuracy = {accuracy_score(ych_test, pred):.3f}  rappel = {recall_score(ych_test, pred):.3f}")
# accuracy ≈ 0.908 — rappel = 0.0 : il ne détecte AUCUN client qui part !
```

**Un modèle qui ne fait rien obtient ≈ 91 % d'accuracy.** Sur des classes déséquilibrées, l'accuracy est trompeuse : il faut regarder précision, rappel, F1 et AUC, et toujours comparer à cette baseline.

### Entraîner de vrais classifieurs (sur le cancer)

```python
modeles = {
    "Régression logistique": make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)),
    "k-NN (k=5)": make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5)),
    "Arbre de décision": DecisionTreeClassifier(max_depth=4, random_state=42),
    "Forêt aléatoire": RandomForestClassifier(n_estimators=200, random_state=42),
}

print(f"{'Modèle':<24}{'Accuracy':>9}{'Précision':>10}{'Rappel':>8}{'F1':>7}{'AUC':>7}")
for nom, m in modeles.items():
    m.fit(Xc_train, yc_train)
    p = m.predict(Xc_test)
    proba = m.predict_proba(Xc_test)[:, 1]                 # probabilité de la classe positive
    print(f"{nom:<24}{accuracy_score(yc_test, p):9.3f}{precision_score(yc_test, p):10.3f}"
          f"{recall_score(yc_test, p):8.3f}{f1_score(yc_test, p):7.3f}{roc_auc_score(yc_test, proba):7.3f}")

print(classification_report(yc_test, modeles["Régression logistique"].predict(Xc_test), target_names=["bénigne", "maligne"]))
```

*Les `make_pipeline(StandardScaler(), …)` seront expliqués en 1.5.4 : pour l'instant, retiens que « standardiser puis modéliser » se fait en un seul objet.*

### Probabilités et seuil de décision

Un classifieur renvoie d'abord une **probabilité** ; `predict` applique un **seuil** (0,5 par défaut). **Le seuil est un levier** : l'abaisser détecte plus de positifs (rappel ↑) au prix de plus de fausses alertes (précision ↓).

```python
logreg = modeles["Régression logistique"]
proba_test = logreg.predict_proba(Xc_test)[:, 1]
for seuil in [0.5, 0.2, 0.05]:
    p = (proba_test >= seuil).astype(int)
    print(f"seuil={seuil:<5} précision={precision_score(yc_test, p):.3f}  rappel={recall_score(yc_test, p):.3f}")
```

### Matrice de confusion et courbe ROC (visualisations d'évaluation)

```python
fig, axes = plt.subplots(1, 2, figsize=(11, 4.5))
ConfusionMatrixDisplay.from_estimator(logreg, Xc_test, yc_test, display_labels=["bénigne", "maligne"], cmap="Blues", ax=axes[0])
axes[0].set_title("Matrice de confusion")

for nom in ["Régression logistique", "Arbre de décision", "Forêt aléatoire"]:
    RocCurveDisplay.from_estimator(modeles[nom], Xc_test, yc_test, name=nom, ax=axes[1])
axes[1].plot([0, 1], [0, 1], "k--", label="hasard")
axes[1].set_title("Courbes ROC"); axes[1].legend()
fig.tight_layout(); fig.savefig("evaluation_cancer.png", dpi=100); plt.close(fig)
```

**La courbe ROC, expliquée.** Pour *chaque seuil possible*, on calcule le **taux de vrais positifs** (= rappel) et le **taux de faux positifs** (`FP / (FP + VN)`), et on trace l'un en fonction de l'autre. Un modèle au hasard suit la diagonale ; un modèle parfait épouse le coin supérieur gauche. L'**AUC** (*Area Under the Curve*, l'aire sous la courbe) résume tout en un nombre : 0,5 = hasard, 1,0 = parfait. **Interprétation probabiliste :** l'AUC est la probabilité qu'un exemple positif pris au hasard reçoive un score plus élevé qu'un exemple négatif pris au hasard. Elle est **indépendante du seuil**, ce qui la rend utile pour comparer des modèles.

### Comprendre un peu chaque modèle (intuition uniquement)

- **Régression logistique** : malgré son nom, un **classifieur**. Calcule une somme pondérée des caractéristiques puis la transforme en probabilité (fonction sigmoïde). Simple, rapide, interprétable.
- **k plus proches voisins (k-NN)** : pour prédire, regarde les *k* exemples d'entraînement les plus proches et vote. Aucune « vraie » phase d'apprentissage ; sensible à l'échelle des variables.
- **Arbre de décision** : une suite de questions oui/non (« rayon moyen > 15 ? »). Très lisible, mais a tendance à **sur-apprendre**.
- **Forêt aléatoire** : beaucoup d'arbres entraînés sur des échantillons différents, dont on moyenne les votes → plus stable et plus performant qu'un arbre seul.

> 🏋️ **Pratique immédiate 1.5.2**
> **(a)** Sur le churn, entraîne une régression logistique **sans rien d'autre** sur les seules colonnes `age`, `anciennete`, `nb_produits`, `membre_actif` (supprime les lignes avec NaN de `age` pour l'instant), évalue accuracy/rappel/AUC sur le test. **(b)** L'accuracy est-elle meilleure que la baseline ? Et l'AUC ? Que conclus-tu ?
>
> <details><summary>Solution</summary>
>
> ```python
> cols = ["age", "anciennete", "nb_produits", "membre_actif"]
> tr = Xch_train.join(ych_train).dropna(subset=cols)
> te = Xch_test.join(ych_test).dropna(subset=cols)
> m = LogisticRegression(max_iter=1000).fit(tr[cols], tr["churn"])
> p = m.predict(te[cols])
> print(accuracy_score(te["churn"], p), recall_score(te["churn"], p), roc_auc_score(te["churn"], m.predict_proba(te[cols])[:, 1]))
> ```
> (b) L'accuracy est quasi identique à la baseline (≈ 0,90) : elle ne dit rien. L'AUC (nettement > 0,5) montre que le modèle **classe** bien mieux que le hasard, même si le seuil par défaut 0,5 ne détecte presque aucun départ. C'est typique des classes déséquilibrées.
> </details>

✅ **Je sais** : construire une matrice de confusion, calculer/interpréter accuracy, précision, rappel, F1, AUC, expliquer le paradoxe de l'accuracy, choisir une métrique selon le coût des erreurs, jouer sur le seuil.

---

## 1.5.3 — Valider correctement : split, validation croisée et fuite de données

> 🎯 **Objectif.** Estimer honnêtement la performance future d'un modèle, et comprendre pourquoi une erreur de méthode peut produire des scores faux mais flatteurs.

### Le problème d'une seule découpe

Un seul `train_test_split` donne **un** score qui dépend du hasard du découpage. La **validation croisée** (*cross-validation*, CV) répète l'évaluation sur plusieurs découpages :

```text
k = 5 plis (folds) — chaque pli sert une fois de validation
 Pli 1 : [VALID][train][train][train][train]  → score 1
 Pli 2 : [train][VALID][train][train][train]  → score 2
 Pli 3 : [train][train][VALID][train][train]  → score 3
 Pli 4 : [train][train][train][VALID][train]  → score 4
 Pli 5 : [train][train][train][train][VALID]  → score 5
                                   moyenne ± écart-type = estimation plus fiable
```

```python
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)    # « Stratified » : mêmes proportions de classes dans chaque pli
scores = cross_val_score(make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)),
                         Xc_train, yc_train, cv=cv, scoring="roc_auc")
print(scores.round(3), f"→ AUC = {scores.mean():.3f} ± {scores.std():.3f}")
```

L'**écart-type** des scores donne une idée de l'incertitude : deux modèles dont les moyennes diffèrent de moins que cet écart-type ne sont pas réellement distinguables.

### Les trois jeux de données, et la règle d'or

| Jeu | Rôle | Combien de fois l'utilise-t-on ? |
|---|---|---|
| **Entraînement** | ajuster les paramètres du modèle | autant que nécessaire |
| **Validation** (plis de la CV) | comparer les modèles, régler les hyperparamètres | autant que nécessaire |
| **Test** | mesure finale, non biaisée | **UNE seule fois**, à la toute fin |

> ⚠️ **Si tu regardes le score de test pour choisir entre plusieurs modèles, le test devient un jeu de validation déguisé** : ta mesure finale est alors optimiste, sans que tu puisses le savoir. C'est une forme de fuite particulièrement fréquente.

### La fuite de données (*data leakage*) : démonstration chiffrée

Il y a **fuite** quand une information du jeu de validation/test a influencé l'entraînement. Expérience : on génère des données **de pur bruit** (aucun signal !) — aucun modèle ne devrait faire mieux que le hasard (≈ 50 %).

```python
from sklearn.feature_selection import SelectKBest, f_classif

rng = np.random.default_rng(0)
X_bruit = rng.normal(size=(100, 1000))        # 100 échantillons, 1000 variables de pur bruit
y_bruit = rng.integers(0, 2, size=100)        # cible aléatoire

# ❌ MÉTHODE FAUTIVE : on sélectionne les 20 « meilleures » variables sur TOUTES les données, PUIS on valide
X_selectionne = SelectKBest(f_classif, k=20).fit_transform(X_bruit, y_bruit)
score_fautif = cross_val_score(LogisticRegression(), X_selectionne, y_bruit, cv=5).mean()

# ✅ MÉTHODE CORRECTE : la sélection est DANS le pipeline, donc refaite sur chaque pli d'entraînement uniquement
pipeline = make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())
score_correct = cross_val_score(pipeline, X_bruit, y_bruit, cv=5).mean()

print(f"Méthode fautive : {score_fautif:.2f}   |   méthode correcte : {score_correct:.2f}")
# Fautive ≈ 0.88 (!), correcte ≈ 0.5-0.6 (le hasard)
```

La méthode fautive « découvre » 88 % de précision **sur du bruit** : la sélection de variables a déjà vu les étiquettes des plis de validation. **Règle absolue : toute étape qui apprend quelque chose des données (imputation, standardisation, sélection de variables, encodage…) doit être apprise sur l'entraînement uniquement.** Le `Pipeline` (section 1.5.4) garantit cela automatiquement.

**Autres fuites classiques :** une variable qui contient la réponse sous une autre forme (« date de résiliation » pour prédire la résiliation) ; des doublons présents à la fois dans l'entraînement et le test ; mélanger aléatoirement des données temporelles (on prédit le passé avec l'avenir).

> 🏋️ **Pratique immédiate 1.5.3**
> Ce code est-il correct ? Explique pourquoi, puis corrige-le.
> ```python
> scaler = StandardScaler().fit(X)              # X = tout le jeu de données
> X_train, X_test, y_train, y_test = train_test_split(scaler.transform(X), y, random_state=0)
> ```
>
> <details><summary>Solution</summary>
> Non : le `scaler` calcule la moyenne et l'écart-type sur **toutes** les données, test compris ; le test influence donc le prétraitement (fuite, même légère). Correction : séparer d'abord, puis `scaler.fit(X_train)` et `scaler.transform` sur train **et** test — ou, mieux, mettre le scaler dans un `Pipeline`.
>
> ```python
> X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
> modele = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(X_train, y_train)
> ```
> </details>

✅ **Je sais** : utiliser la validation croisée stratifiée, expliquer la règle « le test ne sert qu'une fois », reconnaître et éviter la fuite de données.

---

## 1.5.4 — Prétraitement et `Pipeline`

> 🎯 **Objectif.** Préparer des données mixtes (numériques + catégorielles + manquantes) de façon **reproductible et sans fuite**, avec `ColumnTransformer` et `Pipeline`.

### Pourquoi prétraiter ?

| Modèle | Sensible à l'échelle des variables ? | Standardisation nécessaire ? |
|---|---|---|
| Régression linéaire / logistique, SVM, k-NN, réseaux de neurones | **Oui** | **Oui** (ou fortement recommandée) |
| Arbres, forêts, gradient boosting | Non | Non |

**Démonstration avec k-NN** (qui calcule des distances) : une variable d'échelle 1000 écrase une variable d'échelle 1 dans le calcul de distance.

```python
from sklearn.preprocessing import MinMaxScaler

knn_brut = KNeighborsClassifier().fit(Xc_train, yc_train)
knn_std = make_pipeline(StandardScaler(), KNeighborsClassifier()).fit(Xc_train, yc_train)
print(f"k-NN sans standardisation : {knn_brut.score(Xc_test, yc_test):.3f} | avec : {knn_std.score(Xc_test, yc_test):.3f}")
```

**Standardisation** (`StandardScaler`) : `(x − moyenne) / écart-type` → moyenne 0, écart-type 1 (vue en NumPy, 1.2.4). **Mise à l'échelle min-max** (`MinMaxScaler`) : ramène dans [0, 1]. *Avec un modèle sensible à l'échelle, on ajuste (`fit`) toujours le scaler sur le train uniquement.*

### Encoder les variables catégorielles

Un modèle ne comprend que des nombres. Deux stratégies principales :

| Encodage | Principe | Quand l'utiliser |
|---|---|---|
| **One-hot** | une colonne 0/1 par catégorie (`pays_France`, `pays_Allemagne`…) | catégories **sans ordre** (pays, couleur) |
| **Ordinal** | un entier par catégorie, selon un ordre (`petit` < `moyen` < `grand`) | catégories **ordonnées** |

⚠️ **Encoder « France=0, Allemagne=1, Espagne=2 » en entiers** suggérerait au modèle que l'Espagne est « deux fois plus » que l'Allemagne : absurde pour des catégories sans ordre. D'où le one-hot. Utilise `handle_unknown="ignore"` pour qu'une catégorie absente de l'entraînement ne fasse pas planter l'inférence.

### Le `ColumnTransformer` : un traitement par type de colonne

```python
colonnes_num = ["age", "anciennete", "nb_produits", "solde", "membre_actif", "carte_credit"]
colonnes_cat = ["pays"]

pretraitement = ColumnTransformer([
    ("num", Pipeline([
        ("imputation", SimpleImputer(strategy="median")),      # 1) remplace les NaN par la médiane (apprise sur le train)
        ("standardisation", StandardScaler()),                  # 2) centre-réduit
    ]), colonnes_num),
    ("cat", OneHotEncoder(handle_unknown="ignore"), colonnes_cat),       # one-hot pour le pays
])

modele_churn = Pipeline([
    ("pretraitement", pretraitement),
    ("classifieur", LogisticRegression(max_iter=1000)),
])

modele_churn.fit(Xch_train, ych_train)        # UN seul appel : imputation + échelle + encodage + modèle
pred = modele_churn.predict(Xch_test)
proba = modele_churn.predict_proba(Xch_test)[:, 1]
print(f"AUC = {roc_auc_score(ych_test, proba):.3f}")
```

### Ce que garantit un `Pipeline`

1. **Zéro fuite** : dans `cross_val_score(pipeline, X, y)`, chaque étape est ré-apprise **sur chaque pli d'entraînement uniquement**.
2. **Un seul objet** à sauvegarder, à déployer (chapitre 1.7) : on ne risque plus d'oublier le scaler en production.
3. **Code lisible** : le prétraitement et le modèle forment une seule unité.

```python
# Ouvrir le pipeline : que vaut chaque étape après l'entraînement ?
print(modele_churn.named_steps["pretraitement"].get_feature_names_out())
coef = modele_churn.named_steps["classifieur"].coef_[0]
noms = modele_churn.named_steps["pretraitement"].get_feature_names_out()
print(pd.Series(coef, index=noms).sort_values().round(2))       # > 0 : augmente le risque de départ ; < 0 : le réduit
```

*Lecture (variables standardisées, donc comparables) :* un coefficient positif augmente la probabilité de départ, un coefficient négatif la diminue ; plus il est grand en valeur absolue, plus la variable pèse dans la décision du modèle.

> 🏋️ **Pratique immédiate 1.5.4**
> **(a)** Remplace la régression logistique par une forêt aléatoire dans `modele_churn` : est-ce que la standardisation gêne ? **(b)** Compare les deux modèles en validation croisée (5 plis, AUC) **sur l'entraînement uniquement**.
>
> <details><summary>Solution</summary>
>
> ```python
> from sklearn.base import clone
> rf = clone(modele_churn).set_params(classifieur=RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1))
> cv = StratifiedKFold(5, shuffle=True, random_state=42)
> for nom, m in [("logistique", modele_churn), ("forêt", rf)]:
>     s = cross_val_score(m, Xch_train, ych_train, cv=cv, scoring="roc_auc")
>     print(f"{nom:<11} AUC = {s.mean():.3f} ± {s.std():.3f}")
> ```
> La standardisation ne gêne pas une forêt (elle y est simplement inutile). Sur ces données, le modèle linéaire fait au moins aussi bien que la forêt : un modèle plus complexe n'est pas automatiquement meilleur.
> </details>

✅ **Je sais** : standardiser, encoder (one-hot/ordinal), imputer, assembler un `ColumnTransformer` + `Pipeline`, lire les coefficients d'un modèle linéaire.

---

## 1.5.5 — Sur-apprentissage, sous-apprentissage et réglage des hyperparamètres

> 🎯 **Objectif.** Diagnostiquer le compromis biais/variance, régler des hyperparamètres avec `GridSearchCV`, et éviter de sur-apprendre… la validation elle-même.

### 💡 Intuition : l'étudiant et les annales

- **Sous-apprentissage** (*underfitting*) : l'étudiant n'a presque rien retenu ; il échoue aux annales **et** à l'examen. Modèle trop simple.
- **Sur-apprentissage** (*overfitting*) : l'étudiant a appris les annales **par cœur** ; il réussit parfaitement les annales mais échoue à l'examen (questions nouvelles). Modèle trop complexe qui a mémorisé le bruit.
- **Bon apprentissage** : il a compris les principes ; il réussit les deux.

```text
  erreur
    │ \                         ╱   ← erreur de VALIDATION : baisse puis remonte
    │  \_______    ____________╱
    │          \__╱
    │ \                           ← erreur d'ENTRAÎNEMENT : baisse toujours
    │  \________
    └───────────────────────────► complexité du modèle
      sous-apprentissage │ OK │ sur-apprentissage
```

### Mesurer : la courbe de validation

On fait varier un hyperparamètre de **complexité** (la profondeur maximale d'un arbre) et on compare les scores sur l'entraînement et en validation croisée :

```python
from sklearn.model_selection import validation_curve

profondeurs = np.arange(1, 16)
scores_train, scores_val = validation_curve(
    DecisionTreeClassifier(random_state=42), Xc_train, yc_train,
    param_name="max_depth", param_range=profondeurs, cv=5, scoring="accuracy")

fig, ax = plt.subplots(figsize=(7, 4))
ax.plot(profondeurs, scores_train.mean(axis=1), "o-", label="entraînement")
ax.plot(profondeurs, scores_val.mean(axis=1), "s-", label="validation croisée")
ax.set_xlabel("Profondeur maximale de l'arbre"); ax.set_ylabel("Accuracy"); ax.legend()
ax.set_title("Sur-apprentissage : l'entraînement atteint 100 %, la validation stagne")
fig.tight_layout(); fig.savefig("courbe_validation.png", dpi=100); plt.close(fig)

print("Score train à profondeur 15 :", scores_train.mean(axis=1)[-1].round(3))          # 1.0 : appris par cœur
print("Meilleure profondeur en validation :", profondeurs[scores_val.mean(axis=1).argmax()])
```

**Lecture :** l'arbre profond atteint 100 % sur l'entraînement (il a mémorisé) mais **pas** en validation. Le meilleur compromis se situe à une profondeur modérée.

**Remèdes au sur-apprentissage :** plus de données · modèle plus simple · **régularisation** (pénaliser la complexité : paramètre `C` de la régression logistique — *plus `C` est petit, plus la régularisation est forte* ; `alpha` de Ridge) · arrêt précoce (Deep Learning) · validation croisée pour choisir la complexité.

### `GridSearchCV` : chercher les meilleurs hyperparamètres

La recherche par grille essaie **toutes les combinaisons** d'une grille, évalue chacune en validation croisée, garde la meilleure.

```python
from sklearn.model_selection import GridSearchCV

pipeline = Pipeline([("scaler", StandardScaler()), ("clf", LogisticRegression(max_iter=2000))])
grille = {"clf__C": [0.001, 0.01, 0.1, 1, 10, 100]}          # nom_de_l'étape__nom_du_paramètre

recherche = GridSearchCV(pipeline, grille, cv=5, scoring="roc_auc")
recherche.fit(Xc_train, yc_train)                              # n'utilise QUE l'entraînement
print("Meilleur C :", recherche.best_params_, "| AUC (validation croisée) :", round(recherche.best_score_, 4))
print(pd.DataFrame(recherche.cv_results_)[["param_clf__C", "mean_test_score", "std_test_score"]].round(4))

# Le test n'est touché QU'UNE FOIS, avec le modèle final :
print("AUC test :", round(roc_auc_score(yc_test, recherche.predict_proba(Xc_test)[:, 1]), 4))
```

`GridSearchCV` **ré-entraîne** ensuite le meilleur modèle sur tout l'entraînement (`refit=True` par défaut) : l'objet `recherche` se comporte comme un modèle final.

**`RandomizedSearchCV`** tire au hasard `n_iter` combinaisons : indispensable quand la grille est énorme (5 hyperparamètres × 10 valeurs = 100 000 combinaisons × 5 plis…). Même interface.

⚠️ **Le piège subtil : sur-apprendre la validation.** Plus tu essaies de combinaisons, plus l'une d'elles sera « bonne par chance ». Le score `best_score_` est donc légèrement optimiste ; c'est **pourquoi le jeu de test, intact, est indispensable**.

> 🏋️ **Pratique immédiate 1.5.5**
> Sur le churn, règle `max_depth` (`[2, 4, 6, 10, None]`) et `min_samples_leaf` (`[1, 10, 50]`) d'un `DecisionTreeClassifier` avec `GridSearchCV` (5 plis, AUC) **sur l'entraînement**. Combien de modèles sont entraînés au total ? Quelle combinaison gagne ?
>
> <details><summary>Solution</summary>
>
> ```python
> pipe_arbre = Pipeline([("pre", pretraitement), ("clf", DecisionTreeClassifier(random_state=42))])
> g = GridSearchCV(pipe_arbre, {"clf__max_depth": [2, 4, 6, 10, None], "clf__min_samples_leaf": [1, 10, 50]}, cv=5, scoring="roc_auc")
> g.fit(Xch_train, ych_train)
> print(g.best_params_, round(g.best_score_, 3))
> print("Modèles entraînés :", 5 * 3 * 5)     # 15 combinaisons × 5 plis = 75 (+1 ré-entraînement final)
> ```
> Les arbres profonds sans contrainte (`min_samples_leaf=1`) sur-apprennent ; la contrainte de feuille minimale les régularise.
> </details>

✅ **Je sais** : lire une courbe de validation, distinguer sous- et sur-apprentissage, régulariser, utiliser `GridSearchCV`, expliquer pourquoi le test ne sert qu'une fois.

---

## 1.5.6 — Forêts, boosting, importance des variables, sauvegarde

> 🎯 **Objectif.** Comprendre l'idée des méthodes d'ensemble, interpréter l'importance des variables, sauvegarder un modèle, et garder un regard éthique sur les variables utilisées.

### Les méthodes d'ensemble : l'union fait la force (intuition)

- **Forêt aléatoire** (*bagging*) : on entraîne **beaucoup d'arbres indépendants**, chacun sur un échantillon différent des données et des variables, puis on **moyenne/vote**. Les erreurs individuelles, indépendantes, se compensent : moins de variance, moins de sur-apprentissage qu'un arbre seul.
- **Gradient boosting** : on entraîne des arbres **l'un après l'autre**, chacun **corrigeant les erreurs des précédents**. Souvent les plus performants sur données tabulaires (`HistGradientBoostingClassifier` de Scikit-learn ; XGBoost/LightGBM en dehors). Davantage de réglages, plus de risque de sur-apprentissage.

Le détail des algorithmes est traité au Module 3.

### Importance des variables par permutation

**Idée :** pour mesurer l'utilité d'une variable, on **mélange aléatoirement ses valeurs** dans le jeu d'évaluation et on regarde **de combien la performance chute**. Si le score s'effondre, le modèle dépendait de cette variable ; s'il ne bouge pas, elle lui était inutile. Contrairement à l'importance « native » des forêts, elle s'applique à **n'importe quel modèle** et s'évalue sur des données non vues.

```python
from sklearn.inspection import permutation_importance

forêt = Pipeline([("pre", pretraitement), ("clf", RandomForestClassifier(n_estimators=200, min_samples_leaf=20, random_state=42, n_jobs=-1))])
forêt.fit(Xch_train, ych_train)

resultat = permutation_importance(forêt, Xch_test, ych_test, scoring="roc_auc", n_repeats=10, random_state=42)
importances = pd.Series(resultat.importances_mean, index=Xch_test.columns).sort_values(ascending=True)
print(importances.round(3))

fig, ax = plt.subplots(figsize=(6, 3.5))
importances.plot.barh(ax=ax); ax.set_xlabel("Baisse d'AUC quand la variable est mélangée")
fig.tight_layout(); fig.savefig("importance_permutation.png", dpi=100); plt.close(fig)
```

⚠️ **Importance ≠ causalité.** Une variable importante pour *prédire* n'est pas nécessairement une *cause*. Et des variables très corrélées se partagent l'importance.

### Sauvegarder et recharger un modèle : `joblib`

```python
import joblib

joblib.dump(modele_churn, "modele_churn.joblib")              # sauvegarde le PIPELINE entier (prétraitement + modèle)
charge = joblib.load("modele_churn.joblib")
nouveau_client = pd.DataFrame([{"age": 52, "anciennete": 2, "nb_produits": 3, "solde": 80_000.0,
                                "membre_actif": 0, "carte_credit": 1, "pays": "Allemagne"}])
print("Probabilité de départ :", round(charge.predict_proba(nouveau_client)[0, 1], 3))
```

⚠️ **Sécurité :** `joblib` (comme `pickle`) peut exécuter du code à la lecture. **Ne charge jamais un fichier de modèle dont tu ne connais pas la source.** Autre limite : le fichier n'est compatible qu'avec des versions proches de Scikit-learn ; note la version dans ton `requirements.txt` (chapitre 1.0).

### Éthique : les variables sensibles

Le jeu de données churn contient `pays` ; un jeu de données réel contient souvent le genre, l'âge, l'origine… **Un modèle entraîné sur ces variables peut discriminer**, même sans intention : refuser un crédit ou cibler des offres différemment selon le genre ou le pays. Questions à se poser **avant** d'inclure une variable : est-elle légitime pour cette décision ? Est-elle la trace d'une variable sensible (un code postal peut refléter l'origine) ? Les performances sont-elles équivalentes selon les sous-groupes ? Le règlement européen sur l'IA et le RGPD encadrent ces usages. Nous approfondirons l'équité (*fairness*) dans un module ultérieur ; retiens dès maintenant que **l'évaluation d'un modèle ne se limite pas à un score global**.

---

## 1.5.7 — Aperçu : l'apprentissage non supervisé avec K-Means 🔸

*(Optionnel : approfondi au Module 3.)* Sans cible, on cherche des **groupes** (*clusters*) de points similaires. **K-Means** place `k` centres et assigne chaque point au plus proche, puis déplace les centres, en répétant jusqu'à stabilisation.

```python
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs

points, _ = make_blobs(n_samples=300, centers=3, cluster_std=1.0, random_state=42)    # 3 nuages de points (on ignore les vraies étiquettes)
inerties = []
for k in range(1, 8):
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(points)
    inerties.append(km.inertia_)                   # somme des distances² aux centres : plus elle est basse, plus les groupes sont compacts
print(np.round(inerties, 0))                       # la baisse ralentit fortement après k=3 : c'est la « méthode du coude »
```

---

## 🏋️ EXERCICES — CHAPITRE 1.5

### Exercice 1.5.A — Régression complète ⭐⭐

Sur `diabetes`, compare en validation croisée 5 plis (R²) : `DummyRegressor`, `LinearRegression`, `Ridge(alpha=1)`. Puis évalue **uniquement le meilleur** une fois sur le test. Justifie ton choix.

<details><summary>Solution</summary>

```python
from sklearn.model_selection import KFold
cv = KFold(5, shuffle=True, random_state=42)
candidats = {"baseline": DummyRegressor(), "linéaire": LinearRegression(), "ridge": Ridge(alpha=1.0)}
moyennes = {}
for nom, m in candidats.items():
    s = cross_val_score(m, X_train, y_train, cv=cv, scoring="r2")
    moyennes[nom] = s.mean(); print(f"{nom:<10} R² = {s.mean():.3f} ± {s.std():.3f}")
meilleur = max(moyennes, key=moyennes.get)
final = candidats[meilleur].fit(X_train, y_train)
print("Modèle retenu :", meilleur, "| R² test :", round(r2_score(y_test, final.predict(X_test)), 3))
```
On choisit **sur la validation croisée** et on n'utilise le test qu'une fois pour le modèle retenu. Ici la régression linéaire l'emporte nettement : `Ridge(alpha=1)` est trop régularisé pour ces données déjà standardisées (un `alpha` plus petit ferait mieux). Quand deux modèles diffèrent de moins que leur écart-type, on préfère le plus simple.
</details>

### Exercice 1.5.B — Métriques à la main ⭐⭐

Un modèle de détection de fraude a produit : VP = 30, FP = 70, FN = 10, VN = 9 890. Calcule accuracy, précision, rappel, F1 à la main, puis vérifie avec Scikit-learn en reconstruisant les vecteurs `y_vrai` / `y_pred`. Commente : le modèle est-il « bon à 99 % » ?

<details><summary>Solution</summary>

```python
VP, FP, FN, VN = 30, 70, 10, 9890
acc = (VP + VN) / (VP + FP + FN + VN); prec = VP / (VP + FP); rap = VP / (VP + FN); f1 = 2 * prec * rap / (prec + rap)
print(round(acc, 4), round(prec, 3), round(rap, 3), round(f1, 3))        # 0.992 0.3 0.75 0.429

y_vrai = np.array([1] * VP + [0] * FP + [1] * FN + [0] * VN)
y_pred = np.array([1] * VP + [1] * FP + [0] * FN + [0] * VN)
print(round(accuracy_score(y_vrai, y_pred), 4), round(precision_score(y_vrai, y_pred), 3), round(recall_score(y_vrai, y_pred), 3))
```
L'accuracy de 99,2 % est écrasée par la classe majoritaire (la fraude est rare : 40 cas sur 10 000). Seulement **30 % des alertes sont de vraies fraudes** (précision) : 7 alertes sur 10 sont de fausses alarmes. Le rappel de 75 % est correct. Le jugement dépend du coût : enquêter sur une fausse alerte vs laisser passer une fraude.
</details>

### Exercice 1.5.C — Trouver et corriger les fuites ⭐⭐

Ce code annonce un score excellent. Trouve **trois** problèmes de méthode et réécris-le correctement.

```python
X_std = StandardScaler().fit_transform(X_ch[["age", "anciennete", "solde"]].fillna(X_ch[["age", "anciennete", "solde"]].mean()))
scores = {}
for c in [0.01, 1, 100]:
    m = LogisticRegression(C=c, max_iter=1000).fit(X_std[:4000], y_ch[:4000])
    scores[c] = m.score(X_std[4000:], y_ch[4000:])           # on regarde le test
meilleur_c = max(scores, key=scores.get)
print("Meilleur C :", meilleur_c, "score test :", scores[meilleur_c])
```

<details><summary>Solution</summary>

Problèmes : **(1)** imputation par la moyenne et standardisation calculées sur **tout** le jeu (fuite) ; **(2)** le **test** sert à **choisir `C`** (fuite de sélection : le score est optimiste) ; **(3)** la mesure est l'**accuracy** sur un jeu déséquilibré (≈ 90 % sans rien apprendre), et le découpage n'est ni mélangé ni stratifié (il suppose des données en ordre aléatoire).

```python
cols = ["age", "anciennete", "solde"]
Xtr, Xte, ytr, yte = train_test_split(X_ch[cols], y_ch, test_size=0.2, stratify=y_ch, random_state=42)
pipe = Pipeline([("imp", SimpleImputer(strategy="median")), ("sc", StandardScaler()), ("clf", LogisticRegression(max_iter=1000))])
g = GridSearchCV(pipe, {"clf__C": [0.01, 1, 100]}, cv=5, scoring="roc_auc").fit(Xtr, ytr)     # choix sur la validation croisée
print(g.best_params_, round(roc_auc_score(yte, g.predict_proba(Xte)[:, 1]), 3))                # test évalué UNE fois
```
</details>

### Exercice 1.5.D — Comparer des modèles proprement ⭐⭐⭐

Compare en validation croisée (AUC, 5 plis stratifiés, sur l'entraînement) quatre modèles sur le churn, avec le **même** prétraitement : régression logistique, régression logistique équilibrée (`class_weight="balanced"`), forêt aléatoire, `HistGradientBoostingClassifier`. Affiche un tableau moyenne ± écart-type, puis explique lequel choisir.

<details><summary>Solution</summary>

```python
cv = StratifiedKFold(5, shuffle=True, random_state=42)
candidats = {
    "logistique": LogisticRegression(max_iter=1000),
    "logistique équilibrée": LogisticRegression(max_iter=1000, class_weight="balanced"),
    "forêt": RandomForestClassifier(n_estimators=200, min_samples_leaf=20, random_state=42, n_jobs=-1),
    "boosting": HistGradientBoostingClassifier(random_state=42),
}
for nom, clf in candidats.items():
    p = Pipeline([("pre", pretraitement), ("clf", clf)])
    s = cross_val_score(p, Xch_train, ych_train, cv=cv, scoring="roc_auc")
    print(f"{nom:<24} AUC = {s.mean():.3f} ± {s.std():.3f}")
```
Ces données simulées contiennent surtout des relations simples : les modèles simples y rivalisent avec les complexes (le boosting sur-apprend légèrement). On retient le plus simple dont le score n'est pas significativement (à l'écart-type près) dépassé. `class_weight="balanced"` ne change presque pas l'AUC (qui ne dépend pas du seuil) mais déplace le compromis précision/rappel.
</details>

---

### 🧠 Quiz de fin de Chapitre 1.5 (15 questions)

1. **Quelle différence entre un paramètre et un hyperparamètre ?**
   <details><summary>Réponse</summary>Un paramètre est appris par le modèle (coefficients) ; un hyperparamètre est choisi avant l'entraînement (profondeur, `C`).</details>
2. **Pourquoi toujours comparer à une baseline ?**
   <details><summary>Réponse</summary>Pour savoir si le modèle apporte quelque chose : un score élevé peut être atteint par un modèle trivial (classes déséquilibrées).</details>
3. **Un modèle qui prédit toujours « pas de fraude » a 99,5 % d'accuracy. Qu'en pensez-vous ?**
   <details><summary>Réponse</summary>Il est inutile : rappel = 0. L'accuracy est trompeuse quand les classes sont déséquilibrées.</details>
4. **Définis précision et rappel.**
   <details><summary>Réponse</summary>Précision = VP/(VP+FP) : part des alertes qui sont justes. Rappel = VP/(VP+FN) : part des vrais positifs retrouvés.</details>
5. **Dépistage d'une maladie grave : précision ou rappel ?**
   <details><summary>Réponse</summary>Le rappel : manquer un malade (FN) est l'erreur la plus coûteuse.</details>
6. **Que représente une AUC de 0,5 ? de 1,0 ?**
   <details><summary>Réponse</summary>0,5 : classement au hasard ; 1,0 : séparation parfaite des classes.</details>
7. **Que fait abaisser le seuil de décision ?**
   <details><summary>Réponse</summary>Plus de positifs détectés (rappel ↑) mais plus de fausses alertes (précision ↓).</details>
8. **Pourquoi `stratify=y` dans `train_test_split` ?**
   <details><summary>Réponse</summary>Pour conserver les mêmes proportions de classes dans les deux jeux.</details>
9. **Quel est l'avantage de la validation croisée sur une seule découpe ?**
   <details><summary>Réponse</summary>Une estimation plus fiable (moyenne ± écart-type) moins dépendante du hasard du découpage.</details>
10. **Donne un exemple de fuite de données.**
    <details><summary>Réponse</summary>Standardiser ou imputer sur tout le jeu avant le split ; sélectionner des variables avant la validation ; choisir le modèle sur le test.</details>
11. **Pourquoi un `Pipeline` protège-t-il de la fuite ?**
    <details><summary>Réponse</summary>Dans la validation croisée, chaque étape est ré-apprise sur chaque pli d'entraînement uniquement.</details>
12. **Quels modèles exigent une standardisation ? lesquels non ?**
    <details><summary>Réponse</summary>Oui : régressions, SVM, k-NN, réseaux. Non : arbres, forêts, boosting.</details>
13. **Pourquoi ne pas encoder un pays en 0/1/2 pour une régression ?**
    <details><summary>Réponse</summary>Cela imposerait un ordre et des distances artificiels ; on utilise le one-hot.</details>
14. **Entraînement 99 %, validation 70 % : diagnostic et remèdes ?**
    <details><summary>Réponse</summary>Sur-apprentissage ; plus de données, modèle plus simple, régularisation.</details>
15. **Pourquoi le jeu de test ne doit-il servir qu'une fois ?**
    <details><summary>Réponse</summary>Chaque consultation influence tes choix ; après plusieurs usages, il devient un jeu de validation et la mesure finale est optimiste.</details>

---

### 🎯 MINI-PROJET 1.5 — Prédire le départ des clients (churn)

> **Contexte.** Une banque veut identifier les clients susceptibles de partir pour leur proposer une offre de fidélisation. Contacter un client coûte du temps ; en rater un coûte cher.
>
> **Cahier des charges :**
> 1. Charger `generer_churn()`, explorer (taux de départ, manquants, distributions) — réutilise tes outils 1.3/1.4.
> 2. Séparer **train / test** (stratifié, `random_state=42`) ; **ne plus toucher au test** avant l'étape 7.
> 3. Établir la **baseline** (`DummyClassifier`) et montrer son accuracy/rappel.
> 4. Construire un `Pipeline` (imputation, standardisation, one-hot) et comparer **au moins 3 modèles** en validation croisée stratifiée sur le **train**, avec l'**AUC** et le **F1**.
> 5. Régler les hyperparamètres du meilleur modèle avec `GridSearchCV`.
> 6. Choisir un **seuil de décision** justifié (par exemple : viser un rappel ≥ 60 % en acceptant une précision plus basse), **sans utiliser le test** (utilise des prédictions issues de la validation croisée : `cross_val_predict`).
> 7. Évaluer le modèle final **une seule fois** sur le test : matrice de confusion, précision, rappel, F1, AUC ; comparer à la baseline.
> 8. Calculer l'importance des variables par permutation et rédiger 5 lignes d'interprétation **avec ses limites**.
> 9. Sauvegarder le pipeline complet (`churn_model.joblib`) — il servira au chapitre 1.7.

<details><summary>Solution de référence</summary>

```python
from sklearn.model_selection import cross_val_predict
from sklearn.metrics import precision_recall_curve

churn = generer_churn()
print(churn["churn"].mean().round(3), churn.isna().mean().round(3)[["age", "solde"]].to_dict())       # 2) split
X, y = churn.drop(columns="churn"), churn["churn"]
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# 3) baseline
base = DummyClassifier(strategy="most_frequent").fit(X_tr, y_tr)
print("baseline : accuracy", round(accuracy_score(y_te, base.predict(X_te)), 3), "| rappel", recall_score(y_te, base.predict(X_te)))

# 4) comparaison en validation croisée (train uniquement)
cv = StratifiedKFold(5, shuffle=True, random_state=42)
candidats = {"logistique": LogisticRegression(max_iter=1000),
             "forêt": RandomForestClassifier(n_estimators=200, min_samples_leaf=20, random_state=42, n_jobs=-1),
             "boosting": HistGradientBoostingClassifier(random_state=42)}
for nom, clf in candidats.items():
    p = Pipeline([("pre", pretraitement), ("clf", clf)])
    auc = cross_val_score(p, X_tr, y_tr, cv=cv, scoring="roc_auc")
    f1 = cross_val_score(p, X_tr, y_tr, cv=cv, scoring="f1")
    print(f"{nom:<11} AUC {auc.mean():.3f} ± {auc.std():.3f} | F1 (seuil 0,5) {f1.mean():.3f}")

# 5) réglage (ici la régression logistique, souvent suffisante)
pipe = Pipeline([("pre", pretraitement), ("clf", LogisticRegression(max_iter=2000))])
g = GridSearchCV(pipe, {"clf__C": [0.01, 0.1, 1, 10]}, cv=cv, scoring="roc_auc").fit(X_tr, y_tr)
print("Meilleur C :", g.best_params_, round(g.best_score_, 3))
modele_final = g.best_estimator_

# 6) seuil choisi SANS le test : probabilités « hors pli » sur le train
proba_cv = cross_val_predict(modele_final, X_tr, y_tr, cv=cv, method="predict_proba")[:, 1]
prec, rap, seuils = precision_recall_curve(y_tr, proba_cv)
candidats_seuil = seuils[rap[:-1] >= 0.60]
seuil = candidats_seuil.max()                               # le seuil le plus élevé qui garantit un rappel ≥ 60 %
print("Seuil retenu :", round(seuil, 3))

# 7) évaluation finale, UNE fois
proba_te = modele_final.predict_proba(X_te)[:, 1]
pred_te = (proba_te >= seuil).astype(int)
print(confusion_matrix(y_te, pred_te))
print(f"précision={precision_score(y_te, pred_te):.3f}  rappel={recall_score(y_te, pred_te):.3f}  "
      f"F1={f1_score(y_te, pred_te):.3f}  AUC={roc_auc_score(y_te, proba_te):.3f}")

# 8) importance par permutation
imp = permutation_importance(modele_final, X_te, y_te, scoring="roc_auc", n_repeats=10, random_state=42)
print(pd.Series(imp.importances_mean, index=X_te.columns).sort_values(ascending=False).round(3))

# 9) sauvegarde
joblib.dump(modele_final, "churn_model.joblib")
print("Modèle sauvegardé :", joblib.load("churn_model.joblib").predict_proba(X_te.head(2))[:, 1].round(3))
```

**Grille d'évaluation (sur 20) :** baseline présente et commentée (2) · aucune fuite : pipeline + choix sur la validation croisée (5) · métriques adaptées au déséquilibre, pas seulement l'accuracy (3) · réglage des hyperparamètres (2) · seuil justifié sans toucher au test (3) · test utilisé une seule fois (2) · interprétation avec limites et point d'éthique (2) · modèle sauvegardé (1).
</details>

---

**✅ Checklist du chapitre 1.5**
- [ ] Je distingue supervisé/non supervisé, classification/régression, paramètre/hyperparamètre
- [ ] J'utilise `fit`/`predict`/`transform` et je compare toujours à une baseline
- [ ] J'explique et calcule matrice de confusion, précision, rappel, F1, AUC
- [ ] Je choisis la métrique selon le coût des erreurs et je sais jouer sur le seuil
- [ ] Je valide par validation croisée stratifiée et n'utilise le test qu'une fois
- [ ] Je reconnais et évite la fuite de données grâce aux `Pipeline`
- [ ] Je construis un `ColumnTransformer` (imputation, échelle, one-hot)
- [ ] Je diagnostique sous-/sur-apprentissage et règle avec `GridSearchCV`
- [ ] Je sauvegarde un pipeline avec `joblib` et je connais les limites de sécurité et d'éthique

---

# 📘 CHAPITRE 1.6 — GIT & GITHUB : VERSIONNER SON TRAVAIL

**Durée : 0,5 semaine**

> 🎯 **Objectifs du chapitre.** Comprendre le modèle mental de Git (répertoire de travail, index, dépôt, distant) ; enregistrer l'historique d'un projet ; annuler une erreur sans panique ; travailler avec des branches ; **résoudre un conflit de fusion** ; publier sur GitHub et collaborer via une *Pull Request* ; ne jamais publier un secret.

---

## 1.6.0 — Pourquoi versionner ? Le modèle mental de Git

### 💡 Intuition

Tu as sûrement déjà vu cela :

```text
rapport.docx
rapport_v2.docx
rapport_v2_final.docx
rapport_v2_final_CORRIGE.docx
rapport_v2_final_CORRIGE_vraiment_final.docx
```

**Git** est un système de **contrôle de version** : il garde l'historique complet de ton projet, te permet de revenir à n'importe quel état passé, d'essayer une idée sans risque (une *branche*), et de collaborer sans écraser le travail des autres. C'est l'outil n°1 du développement logiciel et de l'IA.

**Git ≠ GitHub.** Git est un programme installé **sur ta machine** (il fonctionne sans Internet). **GitHub** est un **service en ligne** qui héberge des dépôts Git, pour les sauvegarder, les partager et collaborer. (Alternatives : GitLab, Bitbucket.)

### Les quatre zones de Git

```text
  Répertoire de          Zone d'index            Dépôt local          Dépôt distant
  travail                (staging area)          (historique)         (GitHub)
  ┌────────────┐  add    ┌────────────┐ commit  ┌────────────┐ push  ┌────────────┐
  │ tes fichiers│ ─────► │ ce qui sera │ ─────► │ commits     │ ────► │ copie en    │
  │ (modifiés)  │        │ commité     │        │ .git/       │ ◄──── │ ligne       │
  └────────────┘ ◄─ restore └──────────┘        └────────────┘ pull  └────────────┘
```

- **Répertoire de travail** : les fichiers tels que tu les vois et les modifies.
- **Index** (*staging area*) : la « salle d'embarquement » : tu y mets les modifications que tu veux inclure dans le prochain commit.
- **Dépôt local** : le dossier caché `.git/`, qui contient tout l'historique.
- **Dépôt distant** (*remote*) : une copie hébergée (GitHub), que tu synchronises avec `push` et `pull`.

### Qu'est-ce qu'un commit ?

Un **commit** est un **instantané** (*snapshot*) de tout ton projet à un instant donné, avec :
- un **identifiant unique** (un *hash* comme `42454a7`),
- un **message** qui explique le changement,
- un **auteur** et une **date**,
- un **pointeur vers le commit parent** (ce qui forme une chaîne : l'historique).

```text
 42454a7 ◄── f6224f4 ◄── 89ae9e9          Chaque commit pointe vers son parent.
 (premier)    (objectif)   (HEAD → main)    HEAD = « tu es ici » (le commit actuellement extrait).
```

Le **`.git/`** à la racine du projet contient tout : **ne le supprime ni ne le modifie à la main**. Une **branche** n'est qu'un simple pointeur (une étiquette) vers un commit.

---

## 1.6.1 — Installation et configuration

**Installer Git** : [git-scm.com](https://git-scm.com/downloads) (Windows : *Git for Windows*, qui fournit aussi *Git Bash*) ; macOS : `xcode-select --install` ou `brew install git` ; Linux : `sudo apt install git`.

```bash
git --version                                   # ex. git version 2.43.0

# Configuration unique (à faire une fois par machine)
git config --global user.name "Prénom Nom"
git config --global user.email "ton.email@exemple.com"      # l'e-mail de ton compte GitHub
git config --global init.defaultBranch main                  # nom de la branche principale
git config --global core.editor "code --wait"                # (optionnel) VS Code comme éditeur
git config --global --list                                   # vérifier
```

> Le nom et l'e-mail sont **inscrits dans chaque commit** : ils servent à identifier l'auteur.

---

## 1.6.2 — Le cycle de base : `init`, `status`, `add`, `commit`, `log`, `diff`

> 🎯 **Objectif.** Créer un dépôt et enregistrer des modifications, avec un rythme : *modifier → vérifier → ajouter → commiter*.

```bash
mkdir mon-projet-ia && cd mon-projet-ia
git init                                   # crée le dossier caché .git/ : le dossier devient un dépôt

echo "# Mon projet IA" > README.md
git status                                 # « Untracked files: README.md » : Git voit le fichier mais ne le suit pas encore

git add README.md                          # met le fichier dans l'index (git add . pour tout ajouter)
git commit -m "docs: ajoute le README"     # enregistre l'instantané, avec un message
```

**Le rythme quotidien :**

```bash
# 1) tu modifies des fichiers...
echo "Objectif : apprendre Python" >> README.md

git status              # Quels fichiers ont changé ? Lesquels sont dans l'index ?
git diff                # Que contiennent exactement mes modifications (ligne par ligne) ?
git add README.md       # Je choisis ce que j'inclus dans le prochain commit
git commit -m "docs: ajoute l'objectif"
git log --oneline       # historique compact : un commit par ligne
```

```text
f6224f4 docs: ajoute l'objectif
42454a7 docs: ajoute le README
```

**Commandes de consultation à connaître :**

| Commande | Rôle |
|---|---|
| `git status` | état courant (à taper **très souvent**) |
| `git diff` | modifications non encore ajoutées à l'index |
| `git diff --staged` | modifications dans l'index (ce qui sera commité) |
| `git log --oneline --graph --all` | historique compact, avec le dessin des branches |
| `git show <hash>` | détail d'un commit (message + modifications) |

### Écrire de bons messages de commit

Un message dit **pourquoi/quoi** en une ligne (≤ 72 caractères), à l'impératif ou au présent. La convention **Conventional Commits** préfixe chaque message par un type :

| Préfixe | Usage | Exemple |
|---|---|---|
| `feat:` | nouvelle fonctionnalité | `feat: ajoute la sauvegarde JSON` |
| `fix:` | correction de bug | `fix: corrige la division par zéro` |
| `docs:` | documentation | `docs: complète le README` |
| `test:` | tests | `test: ajoute les tests de Formation` |
| `refactor:` | réécriture sans changer le comportement | `refactor: simplifie calcul de moyenne` |
| `chore:` | maintenance (dépendances, config) | `chore: ajoute .gitignore` |

**Bonnes pratiques :** des **petits commits** qui font **une seule chose** ; un message précis (« fix: bug » est inutile) ; jamais de commit du type « modifications diverses ».

> 🏋️ **Pratique immédiate 1.6.2**
> Crée un dépôt `test-git`, ajoute un fichier `notes.txt` avec une ligne, commite ; modifie le fichier, regarde `git diff`, commite une seconde fois. Combien de commits `git log --oneline` affiche-t-il ? Que montre `git show` pour le dernier ?
>
> <details><summary>Solution</summary>
>
> ```bash
> mkdir test-git && cd test-git && git init
> echo "ligne 1" > notes.txt && git add notes.txt && git commit -m "docs: crée les notes"
> echo "ligne 2" >> notes.txt && git diff
> git commit -am "docs: ajoute la ligne 2"     # -a : ajoute les fichiers DÉJÀ suivis modifiés (inutile pour un nouveau fichier)
> git log --oneline                             # 2 commits
> git show                                      # le dernier commit : message + ajout de « ligne 2 »
> ```
> </details>

✅ **Je sais** : créer un dépôt, suivre `modifier → status → diff → add → commit`, lire `log`, écrire un message clair.

---

## 1.6.3 — Annuler, corriger, revenir en arrière

> 🎯 **Objectif.** Savoir réagir calmement à chaque type d'erreur. Git permet presque toujours de rattraper une erreur **tant qu'elle est commitée**.

| Situation | Commande | Effet |
|---|---|---|
| J'ai modifié un fichier et je veux **annuler** mes changements non commités | `git restore fichier` | ⚠️ **destructif** : les modifications non commitées sont **perdues** |
| J'ai fait `git add` par erreur et je veux **retirer de l'index** | `git restore --staged fichier` | le fichier reste modifié, mais n'est plus dans l'index |
| Je veux **corriger le dernier commit** (message, oubli d'un fichier) — *non encore poussé* | `git commit --amend` | remplace le dernier commit |
| Je veux **annuler un commit déjà poussé/partagé** | `git revert <hash>` | crée un **nouveau commit** qui défait l'ancien (historique préservé) ✅ sûr |
| Je veux **revenir en arrière en réécrivant l'historique** — *local uniquement* | `git reset --hard <hash>` | ⚠️ **dangereux** : supprime des commits et les modifications non commitées |
| Je veux **regarder un ancien état** sans rien changer | `git switch --detach <hash>` puis `git switch main` | navigation temporaire |
| Je dois **changer de branche mais mon travail n'est pas prêt** | `git stash` puis `git stash pop` | met les modifications de côté |

```bash
echo "erreur" >> README.md
git restore README.md               # annule : le fichier retrouve son état du dernier commit

git revert --no-edit HEAD           # défait le dernier commit en ajoutant un commit d'annulation
git log --oneline                   # Revert "docs: ..." apparaît en haut : l'historique reste honnête
```

**La règle d'or de la sécurité :** `revert` est **sûr** (il ajoute de l'histoire) ; `reset --hard` et `push --force` **réécrivent l'histoire** et peuvent détruire du travail (le tien ou celui de collègues). **Ne réécris jamais un historique déjà partagé.**

### Le filet de sécurité : `git reflog`

Même après un `reset --hard` malheureux, Git garde pendant un certain temps la trace de où pointait `HEAD` :

```bash
git reflog                     # liste des positions récentes de HEAD
git reset --hard HEAD@{2}      # revenir à l'une d'elles (à utiliser en connaissance de cause)
```

> 🏋️ **Pratique immédiate 1.6.3**
> Dans `test-git` : (a) ajoute une ligne à `notes.txt` **sans l'ajouter** et annule-la ; (b) ajoute une ligne, fais `git add`, puis retire-la de l'index sans perdre la ligne ; (c) commite une ligne erronée et annule ce commit avec `revert`.
>
> <details><summary>Solution</summary>
>
> ```bash
> echo "a" >> notes.txt && git restore notes.txt                        # (a)
> echo "b" >> notes.txt && git add notes.txt && git restore --staged notes.txt   # (b) la ligne « b » reste dans le fichier
> git restore notes.txt                                                 # (on nettoie)
> echo "erreur" >> notes.txt && git commit -am "docs: ligne erronée"
> git revert --no-edit HEAD                                             # (c)
> ```
> </details>

---

## 1.6.4 — `.gitignore`, secrets et fichiers lourds

> 🎯 **Objectif.** Décider ce qui **ne doit pas** être versionné ; savoir quoi faire si un secret a été commité.

Git ne doit suivre que ce qui **fait partie du projet** et peut être recréé : pas ton `venv`, pas tes clés d'API, pas tes données brutes volumineuses, pas les fichiers générés. Le fichier **`.gitignore`** (à la racine) liste les motifs à ignorer :

```gitignore
# Environnement virtuel
venv/
.venv/

# Fichiers Python générés
__pycache__/
*.pyc
.pytest_cache/
.ipynb_checkpoints/

# Secrets : JAMAIS dans Git
.env
*.key
secrets.json

# Données volumineuses et modèles
data/raw/
*.csv
*.parquet
*.joblib
*.pt

# Fichiers de l'éditeur / du système
.vscode/
.DS_Store
```

**Ordre important :** crée et commite le `.gitignore` **avant** d'ajouter les autres fichiers. Git n'ignore **que** les fichiers non encore suivis.

### Les secrets : clés d'API, mots de passe

Une clé d'API poussée sur GitHub public est **compromise en quelques minutes** (des robots scannent en continu). La bonne pratique :

1. Mets les secrets dans un fichier **`.env`** (ignoré par Git) ;
2. Commite un fichier **`.env.example`** avec des valeurs factices, pour documenter les variables attendues ;
3. Lis-les dans le code avec `os.environ` (ou `python-dotenv`).

```python
import os

cle_api = os.environ.get("OPENAI_API_KEY")         # jamais écrite en dur dans le code
if cle_api is None:
    print("⚠️ Variable OPENAI_API_KEY absente : copie .env.example vers .env et renseigne-la")
```

### 🚨 « J'ai commité un secret ! » — que faire

1. **Révoque/régénère immédiatement la clé** chez le fournisseur. C'est l'étape n°1 : supprimer le fichier de Git **ne suffit pas**, le secret reste dans l'historique et dans les copies.
2. Retire le fichier du suivi : `git rm --cached .env`, ajoute `.env` au `.gitignore`, commite.
3. Pour effacer le secret de tout l'historique (si nécessaire), utilise un outil dédié (`git filter-repo`, BFG) ; puis `push --force` (en prévenant l'équipe).

```bash
git rm --cached .env          # arrête de SUIVRE le fichier (il reste sur ton disque)
echo ".env" >> .gitignore
git commit -am "chore: retire .env du suivi"
```

### Notebooks et gros fichiers

- Les `.ipynb` sont du JSON qui contient aussi les **sorties** (et des images) : les diffs sont illisibles. Vide les sorties avant de commiter (Kernel → *Clear All Outputs*) ou utilise l'outil `nbstripout`.
- Git est conçu pour du **texte** : les gros fichiers binaires (datasets, poids de modèles de plusieurs Mo) alourdissent le dépôt *pour toujours*. Pour cela, on utilise **Git LFS** ou **DVC** (versionnement de données) — à connaître, vu plus tard dans le cursus.

---

## 1.6.5 — Les branches

> 🎯 **Objectif.** Travailler sur une idée sans toucher à la version stable, puis l'intégrer.

### 💡 Intuition

Une **branche** est une **ligne de développement parallèle**. La branche `main` contient la version stable ; pour une nouvelle fonctionnalité, tu crées une branche, tu y travailles en toute sécurité, puis tu la **fusionne** (*merge*) dans `main` quand elle est prête.

```text
           ┌── C4 ── C5      (branche « feature/export »)
 C1 ── C2 ── C3              (main)
```

```bash
git branch                          # liste les branches (* = branche courante)
git switch -c feature/export        # crée ET se place sur la branche (ancien : git checkout -b)
# ... tu modifies, tu commites autant que nécessaire ...
git switch main                     # retour sur main
git merge feature/export            # intègre la branche dans main
git branch -d feature/export        # supprime la branche (devenue inutile)
```

### Deux types de fusion

**1) Fast-forward** — `main` n'a **pas bougé** depuis la création de la branche : Git avance simplement le pointeur `main`. Aucun nouveau commit.

```text
Avant :   C1 ── C2 (main)                    Après : C1 ── C2 ── C3 ── C4 (main, feature)
                   └── C3 ── C4 (feature)
```

**2) Fusion à trois voies** (*three-way merge*) — `main` **et** la branche ont chacune avancé : Git compare les deux pointes et leur ancêtre commun, puis crée un **commit de fusion** à deux parents.

```text
Avant :   C1 ── C2 ── C5 (main)             Après :  C1 ── C2 ── C5 ── M (main)
                └── C3 ── C4 (feature)                      └── C3 ── C4 ─┘
```

Si les deux côtés ont modifié des **parties différentes** des fichiers, la fusion est **automatique**. Si elles ont modifié **les mêmes lignes**, il y a un **conflit**.

---

## 1.6.6 — Les conflits de fusion : les provoquer pour ne plus les craindre

> 🎯 **Objectif.** Résoudre un conflit calmement : c'est une situation **normale**, pas une erreur.

Un **conflit** survient quand Git ne peut pas décider seul quelle version garder. Il s'arrête, marque les zones en cause dans le fichier, et te demande de trancher.

**Exercice guidé : provoquons-en un volontairement.** Dans ton dépôt (avec un `README.md` dont la 2ᵉ ligne est `Objectif : apprendre Python`, commitée sur `main`) :

```bash
# 1) Branche A : on change la 2e ligne
git switch -c branche-a
sed -i 's/Objectif : apprendre Python/Objectif : devenir ingénieur IA/' README.md      # (macOS : sed -i '' ... ; ou édite à la main)
git commit -am "docs: objectif version A"

# 2) Retour sur main, branche B : on change la MÊME ligne autrement
git switch main
git switch -c branche-b
sed -i 's/Objectif : apprendre Python/Objectif : maîtriser le ML/' README.md
git commit -am "docs: objectif version B"

# 3) Première fusion : main n'a pas bougé → FAST-FORWARD, aucun conflit
git switch main
git merge branche-a                 # « Fast-forward »

# 4) Deuxième fusion : main a maintenant avancé ET branche-b modifie la même ligne → CONFLIT
git merge branche-b
```

```text
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

**`git status`** indique `both modified: README.md` (en abrégé `UU`). Ouvre le fichier : Git y a écrit des **marqueurs de conflit** :

```text
# Mon projet IA
<<<<<<< HEAD
Objectif : devenir ingénieur IA
=======
Objectif : maîtriser le ML
>>>>>>> branche-b
```

- Entre `<<<<<<< HEAD` et `=======` : **ta version** (la branche courante, `main`).
- Entre `=======` et `>>>>>>> branche-b` : **la version entrante**.

**Résolution en 4 étapes :**

1. **Édite** le fichier : garde l'une des versions, l'autre, ou **combine-les**, puis **supprime les trois lignes de marqueurs** (`<<<<<<<`, `=======`, `>>>>>>>`).
2. Le fichier doit contenir le texte final voulu, par exemple : `Objectif : devenir ingénieur IA et maîtriser le ML`.
3. `git add README.md` (tu signales « c'est résolu »).
4. `git commit` (Git propose déjà un message de fusion) — la fusion est terminée.

```bash
git add README.md
git commit -m "merge: combine les deux objectifs"
git log --oneline --graph --all          # on voit les deux branches réunies par le commit de fusion
```

**Pour abandonner** la fusion et revenir à l'état d'avant : `git merge --abort`.

**Éviter les conflits :** des branches **courtes**, des commits fréquents, des fichiers de petite taille, et récupérer régulièrement les changements de `main` (`git pull`) dans sa branche. VS Code propose des boutons *Accept Current / Accept Incoming / Accept Both* au-dessus de chaque zone en conflit.

> 🏋️ **Pratique immédiate 1.6.6**
> Reproduis l'exercice ci-dessus dans un dépôt neuf, mais cette fois résous le conflit en **combinant** les deux objectifs sur une seule ligne. Vérifie avec `git log --oneline --graph --all`. Quel est le nombre de parents du commit de fusion ?
>
> <details><summary>Solution</summary>
> Après résolution : `git add README.md && git commit`. Le commit de fusion a **2 parents** (visible avec `git show --summary HEAD` : ligne `Merge: abc1234 def5678`).
> </details>

✅ **Je sais** : créer/fusionner des branches, distinguer fast-forward et fusion à trois voies, lire les marqueurs de conflit, résoudre et finaliser une fusion, annuler avec `--abort`.

---

## 1.6.7 — GitHub : sauvegarder, partager, collaborer

> 🎯 **Objectif.** Publier ton dépôt sur GitHub, le synchroniser, et contribuer via une *Pull Request*.

### Mettre en place la connexion

1. Crée un compte sur [github.com](https://github.com).
2. **Authentification** (GitHub n'accepte plus le mot de passe pour pousser du code). Deux options :
   - **Clé SSH** (recommandée) : `ssh-keygen -t ed25519 -C "ton.email@exemple.com"`, puis copie le contenu de `~/.ssh/id_ed25519.pub` dans *GitHub → Settings → SSH and GPG keys*. Test : `ssh -T git@github.com`.
   - **HTTPS + jeton d'accès personnel** (*Personal Access Token*), ou l'outil **GitHub CLI** : `gh auth login`.
3. Sur GitHub, crée un **nouveau dépôt** vide (sans README, pour éviter un conflit initial).

### Publier un dépôt existant

```bash
git remote add origin git@github.com:TON-PSEUDO/mon-projet-ia.git    # « origin » : le nom conventionnel du dépôt distant
git branch -M main                                                     # s'assure que la branche s'appelle main
git push -u origin main                                                # envoie main ; -u mémorise le lien pour les prochains push
git remote -v                                                          # vérifie l'adresse du distant
```

**Récupérer un dépôt existant :** `git clone git@github.com:utilisateur/depot.git`.

### Synchroniser : `fetch`, `pull`, `push`

| Commande | Effet |
|---|---|
| `git push` | envoie tes nouveaux commits vers GitHub |
| `git fetch` | **télécharge** les nouveautés du distant **sans** toucher à tes fichiers |
| `git pull` | `fetch` **+** `merge` : télécharge puis intègre dans ta branche |
| `git pull --rebase` | comme `pull`, mais rejoue tes commits *par-dessus* ceux du distant (historique linéaire) |

**Un `push` rejeté** (« rejected — fetch first ») signifie que le distant contient des commits que tu n'as pas : fais `git pull`, résous les éventuels conflits, puis `git push`.

### Le workflow collaboratif : la Pull Request

Dans une équipe, on ne pousse **pas** directement sur `main`. Le flux standard :

```text
1. git switch -c feat/export-csv       ← je crée une branche
2. (je code, je commite)
3. git push -u origin feat/export-csv  ← je publie MA branche
4. Sur GitHub : « Compare & pull request » ← je propose mes changements
5. Un collègue RELIT le code (commentaires, demandes de modifications)
6. Les tests automatiques passent ✅ (CI, vus plus tard)
7. « Merge pull request »              ← la branche est intégrée dans main
8. git switch main && git pull         ← je mets à jour mon dépôt local
```

La **relecture de code** (*code review*) est une compétence professionnelle majeure : lis les modifications ligne par ligne, pose des questions, propose des améliorations **avec bienveillance**.

### Autres éléments GitHub à connaître

- **README.md** : la vitrine du projet (objectif, installation, exemple d'utilisation). C'est la première chose que voit un recruteur.
- **Issues** : suivre bugs et idées. **Fork** : copier le dépôt d'un autre sous ton compte pour proposer une contribution.
- **Tags et releases** : marquer une version. `git tag -a v0.1 -m "première version"` puis `git push origin v0.1`.
- **Licence** : un dépôt sans licence n'est pas réutilisable légalement par défaut (MIT est courante).

**Ton profil GitHub est un portfolio.** Des dépôts propres, documentés, avec un historique de commits clair, valent autant qu'une ligne sur un CV.

---

## 1.6.8 — Aide-mémoire Git

```bash
# Démarrer
git init | git clone <url>
# Cycle quotidien
git status | git diff | git add <fichier> | git commit -m "type: message" | git log --oneline --graph --all
# Annuler
git restore <f> | git restore --staged <f> | git commit --amend | git revert <hash> | git stash / git stash pop
# Branches
git switch -c <nom> | git switch <nom> | git merge <nom> | git branch -d <nom>
# Distant
git remote add origin <url> | git push -u origin <branche> | git pull | git fetch
```

---

## 🏋️ EXERCICES — CHAPITRE 1.6

### Exercice 1.6.A — Workflow solo complet ⭐

Crée un dépôt `formation-ia`, avec un `.gitignore` (venv, `__pycache__`, `.env`, `*.csv`), un `README.md` et un script `hello.py`. Fais au moins **4 commits** avec des messages conventionnels. Affiche l'historique et vérifie qu'un fichier `.env` créé ensuite n'apparaît **pas** dans `git status`.

<details><summary>Solution</summary>

```bash
mkdir formation-ia && cd formation-ia && git init
printf "venv/\n__pycache__/\n.env\n*.csv\n" > .gitignore
git add .gitignore && git commit -m "chore: ajoute .gitignore"
echo "# Formation IA" > README.md && git add README.md && git commit -m "docs: ajoute le README"
echo 'print("Bonjour")' > hello.py && git add hello.py && git commit -m "feat: ajoute hello.py"
echo 'print("Bonjour, IA")' > hello.py && git commit -am "fix: corrige le message"
echo "CLE=secret" > .env
git status            # .env n'apparaît pas : il est ignoré
git log --oneline
```
</details>

### Exercice 1.6.B — Conflit à résoudre ⭐⭐

Provoque un conflit comme en 1.6.6, mais sur **un fichier Python** : deux branches modifient la même ligne `TAUX = 0.1` (l'une en `0.2`, l'autre en `0.05`). Résous-le en choisissant `0.05` et en ajoutant un commentaire explicatif.

<details><summary>Solution</summary>

```bash
echo "TAUX = 0.1" > config.py && git add config.py && git commit -m "feat: ajoute config"
git switch -c taux-haut && echo "TAUX = 0.2" > config.py && git commit -am "feat: taux 0.2"
git switch main && git switch -c taux-bas && echo "TAUX = 0.05" > config.py && git commit -am "feat: taux 0.05"
git switch main && git merge taux-haut        # fast-forward
git merge taux-bas                            # CONFLIT
# édite config.py pour qu'il ne contienne que :
#   TAUX = 0.05   # choisi après discussion : plus prudent
git add config.py && git commit -m "merge: retient le taux 0.05"
```
</details>

### Exercice 1.6.C — Sauvetage : 5 situations ⭐⭐

Pour chaque situation, donne la commande la plus adaptée (et sûre).

1. Tu as modifié `data.py` et veux annuler toutes tes modifications non commitées.
2. Tu as fait `git add .` et réalises que tu ne veux pas inclure `notes.txt`.
3. Tu viens de commiter avec une faute dans le message (pas encore poussé).
4. Un commit défectueux est déjà sur `main` sur GitHub ; tes collègues l'ont récupéré.
5. Tu as commité `.env` (qui contient une clé d'API) mais pas encore poussé.

<details><summary>Solution</summary>

1. `git restore data.py` (⚠️ destructif).
2. `git restore --staged notes.txt`.
3. `git commit --amend -m "message corrigé"`.
4. `git revert <hash>` puis `git push` (jamais `reset --hard` + `push --force` sur un historique partagé).
5. Comme elle n'a pas été poussée, le risque est limité : `git rm --cached .env`, ajoute `.env` au `.gitignore`, puis `git commit --amend` pour retirer le fichier du dernier commit. **Et par précaution, régénère la clé.**
</details>

---

### 🧠 Quiz de fin de Chapitre 1.6 (12 questions)

1. **Quelle est la différence entre Git et GitHub ?**
   <details><summary>Réponse</summary>Git est l'outil de versionnement local ; GitHub est un service en ligne qui héberge des dépôts Git.</details>
2. **Cite les quatre zones de Git.**
   <details><summary>Réponse</summary>Répertoire de travail, index (staging), dépôt local, dépôt distant.</details>
3. **Qu'est-ce qu'un commit ?**
   <details><summary>Réponse</summary>Un instantané du projet avec un identifiant unique, un message, un auteur, une date et un pointeur vers son parent.</details>
4. **À quoi sert `git add` ? Pourquoi existe-t-il une zone d'index ?**
   <details><summary>Réponse</summary>À choisir ce qui ira dans le prochain commit, pour faire des commits cohérents et ciblés.</details>
5. **Que signifie HEAD ?**
   <details><summary>Réponse</summary>Le commit (ou la branche) actuellement extrait : « tu es ici ».</details>
6. **Quelle différence entre `git revert` et `git reset --hard` ?**
   <details><summary>Réponse</summary>`revert` ajoute un commit d'annulation (historique préservé, sûr) ; `reset --hard` réécrit l'historique et supprime des modifications (dangereux sur un historique partagé).</details>
7. **Que fait `.gitignore` ? Ignore-t-il un fichier déjà suivi ?**
   <details><summary>Réponse</summary>Il liste les fichiers non suivis à ignorer. Non : un fichier déjà suivi doit d'abord être retiré avec `git rm --cached`.</details>
8. **Tu as poussé une clé d'API sur GitHub. Première action ?**
   <details><summary>Réponse</summary>Révoquer/régénérer la clé ; supprimer le fichier ne suffit pas car le secret reste dans l'historique.</details>
9. **Fast-forward vs fusion à trois voies ?**
   <details><summary>Réponse</summary>Fast-forward : la branche cible n'a pas bougé, simple avancement du pointeur. Trois voies : les deux ont avancé, Git crée un commit de fusion.</details>
10. **Que signifient les marqueurs `<<<<<<<`, `=======`, `>>>>>>>` ?**
    <details><summary>Réponse</summary>Ils délimitent la version de la branche courante et la version entrante en conflit ; il faut les supprimer après résolution.</details>
11. **Que fait `git pull` ?**
    <details><summary>Réponse</summary>`git fetch` suivi d'un `git merge` : télécharge et intègre les commits du distant.</details>
12. **Pourquoi passer par une Pull Request plutôt que pousser sur `main` ?**
    <details><summary>Réponse</summary>Pour permettre la relecture, les tests automatiques et la discussion avant d'intégrer les changements.</details>

---

### 🎯 MINI-PROJET 1.6 — Publier ton projet sur GitHub comme un pro

> **Objectif.** Publier le **Mini-projet 1.1** (système de suivi de formation) sur GitHub avec un historique propre et une Pull Request relue.
>
> **Cahier des charges :**
> 1. Dépôt `formation-tracker` avec la structure : `formation.py`, `test_formation.py`, `requirements.txt`, `.gitignore`, `.env.example`, `README.md`.
> 2. Un `README.md` qui contient : description, installation (`venv`, `pip install -r requirements.txt`), exemple d'utilisation, comment lancer les tests, licence.
> 3. **Au moins 5 commits** aux messages conventionnels, chacun faisant une seule chose.
> 4. Une branche `feat/export-csv` qui ajoute une fonction d'export CSV, fusionnée via une **Pull Request** (demande à un pair/relecteur de commenter, ou relis-la toi-même en tant que revue).
> 5. Un **tag `v0.1`** poussé sur GitHub.
> 6. Aucun secret ni `venv/` dans l'historique.
>
> **Critères de réussite :** `git log --oneline` est lisible ; le README permet à un inconnu de lancer le projet en 5 minutes ; la PR contient une description claire.

---

**✅ Checklist du chapitre 1.6**
- [ ] Je décris les quatre zones de Git et ce qu'est un commit
- [ ] J'enchaîne `status → diff → add → commit` avec de bons messages
- [ ] Je sais annuler selon la situation (`restore`, `amend`, `revert`) et je me méfie de `reset --hard`
- [ ] Mon `.gitignore` exclut venv, secrets et gros fichiers ; je sais réagir à un secret commité
- [ ] Je crée, fusionne et supprime des branches ; je résous un conflit
- [ ] Je publie sur GitHub, je `pull`/`push`, je propose une Pull Request
- [ ] Mon mini-projet 1.6 est publié avec README, PR et tag

---

# 📘 CHAPITRE 1.7 — DOCKER : ENCAPSULER SON ENVIRONNEMENT (ET SERVIR UN MODÈLE PAR API)

**Durée : 1 semaine**

> 🎯 **Objectifs du chapitre.** Comprendre comment une application communique via une **API web** ; exposer un modèle de Machine Learning avec **FastAPI** ; comprendre ce que sont une **image** et un **conteneur** ; écrire un `Dockerfile`, le construire et l'exécuter ; orchestrer plusieurs services avec **Docker Compose** ; gérer proprement les variables d'environnement et les secrets.
>
> **Fil rouge :** on reprend le modèle de churn du chapitre 1.5 pour en faire un **service prêt à déployer**, qui tourne à l'identique sur ton ordinateur, celui d'un collègue ou un serveur.

---

## 1.7.0 — Comprendre une API web

> 🎯 **Objectif.** Savoir ce qu'est une API, lire une requête et une réponse HTTP, et appeler un service avec `curl` ou Python.

### 💡 Intuition : le restaurant

Un **modèle entraîné** dans un notebook n'est utile qu'à toi. Pour que d'autres programmes (un site web, une application mobile) l'utilisent, on le met derrière une **API** (*Application Programming Interface*). Image du restaurant : le **client** (un programme) passe commande au **serveur** (l'API) via un **menu** fixe (les *endpoints*) ; la **cuisine** (le modèle) reste invisible. Personne n'a besoin de savoir comment la cuisine fonctionne.

Les API web utilisent le protocole **HTTP** : le client envoie une **requête**, le serveur renvoie une **réponse**.

```text
CLIENT                                             SERVEUR (API)
   │  ── requête ─────────────────────────────►   │
   │  POST /predict HTTP/1.1                       │
   │  Content-Type: application/json               │
   │  {"age": 52, "pays": "Allemagne", ...}        │
   │                                               │
   │  ◄──────────────────────────── réponse ──    │
   │  HTTP/1.1 200 OK                              │
   │  {"probabilite_depart": 0.64}                 │
```

### Les éléments d'une requête

| Élément | Rôle | Exemples |
|---|---|---|
| **URL / endpoint** | l'adresse de la ressource | `http://localhost:8000/predict` (`localhost` = ta propre machine ; `8000` = le **port**) |
| **Méthode** | l'intention | `GET` (lire), `POST` (envoyer des données/créer), `PUT`/`PATCH` (modifier), `DELETE` (supprimer) |
| **En-têtes** (*headers*) | métadonnées | `Content-Type: application/json` |
| **Corps** (*body*) | les données envoyées | un objet JSON (vu en 1.1.5) |

### Les codes de statut de la réponse

| Code | Signification | Exemple |
|---|---|---|
| **200** | OK | la prédiction a réussi |
| **201** | créé | une ressource a été créée |
| **400 / 422** | requête invalide / données incorrectes | un champ manquant ou de mauvais type |
| **404** | introuvable | endpoint inexistant |
| **500** | erreur du serveur | bug dans le code serveur |

Règle mnémotechnique : **2xx** = succès ; **4xx** = *la faute du client* ; **5xx** = *la faute du serveur*.

### Une mini-API en 25 lignes (pour voir ce qui se passe)

Sans aucune bibliothèque externe, on peut créer un serveur HTTP local et l'interroger. Exécute ce bloc :

```python
import json
import threading
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer

class MiniAPI(BaseHTTPRequestHandler):
    def _repondre(self, code, contenu):
        corps = json.dumps(contenu).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(corps)))
        self.end_headers()
        self.wfile.write(corps)

    def do_GET(self):                                   # appelé pour une requête GET
        if self.path == "/health":
            self._repondre(200, {"status": "ok"})
        else:
            self._repondre(404, {"erreur": "route inconnue"})

    def do_POST(self):                                  # appelé pour une requête POST
        if self.path == "/double":
            taille = int(self.headers["Content-Length"])
            donnees = json.loads(self.rfile.read(taille))
            self._repondre(200, {"resultat": donnees["x"] * 2})
        else:
            self._repondre(404, {"erreur": "route inconnue"})

    def log_message(self, *args):                       # silence les logs du serveur
        pass

serveur = HTTPServer(("127.0.0.1", 0), MiniAPI)        # port 0 : le système choisit un port libre
port = serveur.server_address[1]
threading.Thread(target=serveur.serve_forever, daemon=True).start()
base = f"http://127.0.0.1:{port}"

# --- Côté CLIENT ---
reponse = urllib.request.urlopen(f"{base}/health")                          # GET
print(reponse.status, json.loads(reponse.read()))                          # 200 {'status': 'ok'}

requete = urllib.request.Request(f"{base}/double", data=json.dumps({"x": 21}).encode("utf-8"),
                                 headers={"Content-Type": "application/json"}, method="POST")
reponse = urllib.request.urlopen(requete)                                   # POST avec un corps JSON
print(reponse.status, json.loads(reponse.read()))                          # 200 {'resultat': 42}

try:
    urllib.request.urlopen(f"{base}/inconnu")
except urllib.error.HTTPError as e:
    print("Erreur", e.code)                                                 # Erreur 404

serveur.shutdown()
```

En pratique, on n'écrit pas un serveur à la main : on utilise un *framework* comme **FastAPI**. Pour interroger une API depuis le terminal, on utilise **`curl`** :

```bash
curl http://localhost:8000/health
curl -X POST http://localhost:8000/predict -H "Content-Type: application/json" -d '{"age": 52, "anciennete": 2, "nb_produits": 3, "solde": 80000, "membre_actif": 0, "carte_credit": 1, "pays": "Allemagne"}'
```

> 🏋️ **Pratique immédiate 1.7.0**
> **(a)** Modifie la mini-API pour ajouter un endpoint `GET /bonjour` qui renvoie `{"message": "Bonjour"}`. **(b)** Que renvoie-t-elle pour `POST /health` ? Quel code de statut serait le plus adapté ?
>
> <details><summary>Solution</summary>
> (a) Dans `do_GET`, ajoute `elif self.path == "/bonjour": self._repondre(200, {"message": "Bonjour"})`. (b) Notre code renvoie 404 car `do_POST` ne connaît pas `/health`. Le code le plus adapté serait **405 Method Not Allowed** (la route existe mais pas pour cette méthode).
> </details>

✅ **Je sais** : expliquer requête/réponse HTTP, méthodes GET/POST, codes de statut, endpoint, JSON ; appeler une API avec `curl` ou Python.

---

## 1.7.1 — Servir le modèle de churn avec FastAPI

> 🎯 **Objectif.** Transformer le pipeline du chapitre 1.5 en service web, **en local d'abord** (sans Docker). Docker n'a de sens que si l'application fonctionne déjà hors conteneur.

**FastAPI** est un framework Python moderne : il génère automatiquement une **documentation interactive** (`/docs`) et **valide les données entrantes** grâce aux annotations de type (via *Pydantic*). **`uvicorn`** est le serveur qui fait tourner l'application.

```bash
pip install fastapi uvicorn
```

### Structure du projet

```text
churn-api/
├── churn_data.py        # générateur de données (repris du chapitre 1.5)
├── train.py             # entraîne le pipeline et écrit churn_model.joblib
├── app.py               # l'API FastAPI
├── requirements.txt
├── .env.example
├── .gitignore
├── .dockerignore
├── Dockerfile
└── docker-compose.yml
```

**`churn_data.py`** — le générateur du chapitre 1.5, dans son propre module (*pour ne pas dupliquer de code*) :

```python
# churn_data.py
import numpy as np
import pandas as pd


def generer_churn(n=5000, graine=42):
    """Données simulées de clients d'une banque (≈ 9 % de départs), avec quelques valeurs manquantes."""
    rng = np.random.default_rng(graine)
    age = np.clip(rng.normal(40, 12, n), 18, 80).round()
    anciennete = np.clip(rng.normal(5, 3, n), 0, 20).round()
    nb_produits = rng.choice([1, 2, 3, 4], size=n, p=[0.5, 0.42, 0.06, 0.02])
    solde = np.round(rng.lognormal(10.0, 0.9, n), 2)
    membre_actif = rng.choice([0, 1], size=n)
    carte_credit = rng.choice([0, 1], size=n, p=[0.3, 0.7])
    pays = rng.choice(["France", "Allemagne", "Espagne"], size=n, p=[0.5, 0.25, 0.25])

    logit = (-2.6 + 0.05 * (age - 40) - 0.1 * anciennete - 1.2 * membre_actif + 1.6 * (nb_produits >= 3)
             + 1.0 * (pays == "Allemagne") + 0.25 * np.log1p(solde / 1000) - 0.3 * carte_credit)
    churn = (rng.random(n) < 1 / (1 + np.exp(-logit))).astype(int)

    df = pd.DataFrame({"age": age, "anciennete": anciennete, "nb_produits": nb_produits, "solde": solde,
                       "membre_actif": membre_actif, "carte_credit": carte_credit, "pays": pays, "churn": churn})
    df.loc[rng.random(n) < 0.05, "solde"] = np.nan
    df.loc[rng.random(n) < 0.03, "age"] = np.nan
    return df
```

**`train.py`** — entraîne et sauvegarde le pipeline (comme dans le mini-projet 1.5) :

```python
# train.py
import joblib
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

from churn_data import generer_churn

COLONNES_NUM = ["age", "anciennete", "nb_produits", "solde", "membre_actif", "carte_credit"]
COLONNES_CAT = ["pays"]


def entrainer(chemin_sortie="churn_model.joblib"):
    df = generer_churn()
    X, y = df.drop(columns="churn"), df["churn"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

    pretraitement = ColumnTransformer([
        ("num", Pipeline([("imputation", SimpleImputer(strategy="median")), ("echelle", StandardScaler())]), COLONNES_NUM),
        ("cat", OneHotEncoder(handle_unknown="ignore"), COLONNES_CAT),
    ])
    modele = Pipeline([("pretraitement", pretraitement), ("classifieur", LogisticRegression(C=0.1, max_iter=2000))])
    modele.fit(X_train, y_train)

    auc = roc_auc_score(y_test, modele.predict_proba(X_test)[:, 1])
    print(f"AUC sur le test : {auc:.3f}")
    joblib.dump(modele, chemin_sortie)
    print(f"Modèle sauvegardé dans {chemin_sortie}")
    return modele


if __name__ == "__main__":
    entrainer()
```

**`app.py`** — l'API :
```python
# app.py
import os
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Literal

import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel, Field

CHEMIN_MODELE = Path(os.environ.get("MODEL_PATH", "churn_model.joblib"))
SEUIL = float(os.environ.get("SEUIL", "0.12"))          # seuil de décision réglable SANS modifier le code

ressources = {}                                          # le modèle est chargé UNE fois au démarrage


@asynccontextmanager
async def lifespan(app: FastAPI):
    ressources["modele"] = joblib.load(CHEMIN_MODELE)    # exécuté au démarrage du serveur
    yield
    ressources.clear()                                   # exécuté à l'arrêt


app = FastAPI(title="API de prédiction du churn", version="0.1.0", lifespan=lifespan)


class Client(BaseModel):
    """Les données d'un client. FastAPI rejette automatiquement (code 422) toute requête invalide."""
    age: float = Field(ge=18, le=100)
    anciennete: float = Field(ge=0, le=60)
    nb_produits: int = Field(ge=1, le=10)
    solde: float = Field(ge=0)
    membre_actif: int = Field(ge=0, le=1)
    carte_credit: int = Field(ge=0, le=1)
    pays: Literal["France", "Allemagne", "Espagne"]


class Prediction(BaseModel):
    probabilite_depart: float
    depart_predit: bool
    seuil: float


@app.get("/health")
def health():
    """Sert aux vérifications automatiques (Docker, orchestrateurs) : le service est-il vivant ?"""
    return {"status": "ok", "modele_charge": "modele" in ressources}


@app.post("/predict", response_model=Prediction)
def predict(client: Client):
    X = pd.DataFrame([client.model_dump()])              # un DataFrame d'une ligne, colonnes = noms attendus par le pipeline
    proba = float(ressources["modele"].predict_proba(X)[0, 1])
    return Prediction(probabilite_depart=round(proba, 4), depart_predit=proba >= SEUIL, seuil=SEUIL)
```

### Lancer et tester en local

```bash
python train.py                               # produit churn_model.joblib
uvicorn app:app --reload                      # démarre le serveur sur http://127.0.0.1:8000 (--reload : redémarre à chaque modification)
```

- Ouvre **http://127.0.0.1:8000/docs** : une interface interactive générée automatiquement te permet d'essayer l'API depuis le navigateur.
- Essaye d'envoyer `"age": 5` : FastAPI répond **422** avec un message précis — la validation vient de la classe `Client`, sans une ligne de code en plus.

```bash
curl http://127.0.0.1:8000/health
# {"status":"ok","modele_charge":true}
```

> ⚠️ **Sécurité du modèle.** `joblib.load` exécute du code : ne charge que des fichiers produits par toi. Et **ne charge jamais le modèle dans chaque requête** (lent) : on le charge une fois, dans `lifespan`.

### 🔍 Sous le capot : tester la logique sans serveur

La partie « prédiction » ne dépend pas de FastAPI : on peut la vérifier directement en Python.

```python
import pandas as pd
from train import entrainer

modele = entrainer("churn_model_test.joblib")
client = {"age": 52, "anciennete": 2, "nb_produits": 3, "solde": 80_000.0, "membre_actif": 0, "carte_credit": 1, "pays": "Allemagne"}
proba = float(modele.predict_proba(pd.DataFrame([client]))[0, 1])
print(f"Probabilité de départ : {proba:.3f}")
```

> 🏋️ **Pratique immédiate 1.7.1**
> Ajoute un endpoint `POST /predict_batch` qui reçoit une **liste** de clients (`list[Client]`) et renvoie la liste des probabilités. Quel avantage présente-t-il par rapport à des appels répétés à `/predict` ?
>
> <details><summary>Solution</summary>
>
> ```python
> @app.post("/predict_batch")
> def predict_batch(clients: list[Client]):
>     X = pd.DataFrame([c.model_dump() for c in clients])
>     probas = ressources["modele"].predict_proba(X)[:, 1]
>     return {"probabilites": [round(float(p), 4) for p in probas]}
> ```
> Avantage : **un seul aller-retour réseau** et une prédiction vectorisée sur tout le lot (beaucoup plus efficace que N requêtes).
> </details>

---

## 1.7.2 — Le problème que Docker résout

### 💡 Intuition : « Ça marche sur ma machine ! »

Tu as un projet qui tourne chez toi. Un collègue l'installe : *« erreur de version de Python »*, *« bibliothèque manquante »*, *« ça ne marche pas sous Windows »*. Un serveur de production a encore un autre système. Le `requirements.txt` fixe les bibliothèques, mais pas **Python lui-même**, ni le système d'exploitation, ni les bibliothèques système.

**Docker** emballe ton application **avec tout son environnement** (système minimal, Python, bibliothèques, code) dans une unité portable, qui s'exécute **de façon identique partout**. Comme un conteneur maritime : la marchandise est standardisée, peu importe le bateau ou le port.

### Conteneurs vs machines virtuelles

```text
 Machine virtuelle                          Conteneurs
 ┌────────┐ ┌────────┐ ┌────────┐           ┌────────┐ ┌────────┐ ┌────────┐
 │  App A │ │  App B │ │  App C │           │  App A │ │  App B │ │  App C │
 │ libs   │ │ libs   │ │ libs   │           │ libs   │ │ libs   │ │ libs   │
 │ OS inv.│ │ OS inv.│ │ OS inv.│           └────────┘ └────────┘ └────────┘
 └────────┘ └────────┘ └────────┘           ┌─────────────────────────────┐
 ┌─────────────────────────────┐            │        Moteur Docker        │
 │        Hyperviseur          │            ├─────────────────────────────┤
 ├─────────────────────────────┤            │   Système d'exploitation    │
 │  Système d'exploitation hôte│            └─────────────────────────────┘
 └─────────────────────────────┘
 lourd (Go), démarrage en minutes           léger (Mo), démarrage en secondes
```

Une VM embarque un **système d'exploitation complet** ; un conteneur **partage le noyau de l'hôte** et n'embarque que ce qui lui est propre : plus léger, plus rapide.

### Le vocabulaire

| Terme | Définition | Analogie |
|---|---|---|
| **Image** | un modèle **en lecture seule** contenant tout ce qu'il faut pour exécuter l'application | la recette + tous les ingrédients, figés |
| **Conteneur** | une **instance en cours d'exécution** d'une image | un plat préparé à partir de la recette |
| **Dockerfile** | le fichier texte qui **décrit comment construire** une image | la recette écrite |
| **Registre** (*registry*) | un dépôt d'images (**Docker Hub** est le principal) | une bibliothèque de recettes |
| **Volume** | un espace de stockage **persistant** partagé avec l'hôte | un carnet qui survit au plat |
| **Port mapping** | relie un port de ta machine à un port du conteneur | une porte sur la façade |

---

## 1.7.3 — Installation et premiers pas

**Installer :** [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows, macOS ; sous Windows il s'appuie sur WSL 2) ou Docker Engine sur Linux. Vérifie :

```bash
docker --version
docker run hello-world          # télécharge une minuscule image de test et l'exécute
```

**Premiers pas : utiliser une image existante.** Tu peux lancer un Python complet, dans un environnement propre, sans l'installer :

```bash
docker run -it --rm python:3.12-slim          # ouvre un REPL Python DANS un conteneur
# >>> import sys; print(sys.version)
# >>> exit()
```

- `-it` : mode **interactif** (tu tapes dedans) ; `--rm` : **supprime** le conteneur à la sortie (évite d'accumuler des conteneurs morts).
- `python:3.12-slim` : `nom:tag`. Le **tag** désigne une variante/version ; `slim` = version allégée. **Évite `latest`** (sa signification change dans le temps : non reproductible).

**Les commandes de tous les jours :**

| Commande | Rôle |
|---|---|
| `docker images` | liste les images locales |
| `docker ps` / `docker ps -a` | conteneurs en cours / tous |
| `docker run ...` | crée et démarre un conteneur |
| `docker stop <id>` / `docker rm <id>` | arrête / supprime un conteneur |
| `docker logs <id>` (`-f` : suivre) | affiche la sortie du conteneur |
| `docker exec -it <id> bash` | ouvre un terminal dans un conteneur en marche |
| `docker rmi <image>` | supprime une image |

**Options de `docker run` à connaître :** `-d` (détaché, en arrière-plan) · `-p 8000:8000` (port hôte : port conteneur) · `-e VARIABLE=valeur` (variable d'environnement) · `-v chemin_hôte:chemin_conteneur` (volume) · `--name mon_nom`.

> 🏋️ **Pratique immédiate 1.7.3**
> Lance un conteneur `python:3.12-slim` qui exécute la commande `python -c "print(2 + 2)"` puis se supprime. Puis lance `nginx` en arrière-plan sur le port 8080 et vérifie avec `curl`.
>
> <details><summary>Solution</summary>
>
> ```bash
> docker run --rm python:3.12-slim python -c "print(2 + 2)"      # affiche 4
> docker run -d --rm --name test-nginx -p 8080:80 nginx:stable
> curl http://localhost:8080                                     # page d'accueil de nginx
> docker stop test-nginx                                         # --rm supprime le conteneur à l'arrêt
> ```
> </details>

---

## 1.7.4 — Le Dockerfile : décrire son image

> 🎯 **Objectif.** Écrire un `Dockerfile` instruction par instruction et comprendre **le cache des couches**.

Un `Dockerfile` est une suite d'instructions. **Chaque instruction crée une couche** (*layer*) de l'image ; Docker **met en cache** les couches : si une instruction et tout ce qui la précède n'ont pas changé, il réutilise la couche sans la reconstruire.

```dockerfile
# 1) Image de base : un Linux minimal avec Python 3.12
FROM python:3.12-slim

# 2) Variables d'environnement utiles pour Python en conteneur
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# 3) Dossier de travail dans le conteneur (créé s'il n'existe pas)
WORKDIR /app

# 4) D'ABORD les dépendances (elles changent rarement) → couche mise en cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5) ENSUITE le code (il change souvent)
COPY churn_data.py train.py app.py ./

# 6) On entraîne le modèle PENDANT la construction de l'image (reproductible, pas de fichier binaire dans Git)
RUN python train.py

# 7) Sécurité : ne pas exécuter l'application en administrateur (root)
RUN useradd --create-home appuser && chown -R appuser /app
USER appuser

# 8) Documentation du port écouté (n'ouvre pas le port : c'est -p qui le fait)
EXPOSE 8000

# 9) Vérification automatique de santé
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"

# 10) La commande lancée au démarrage du conteneur
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

| Instruction | Rôle |
|---|---|
| `FROM` | l'image de départ (toujours la première) |
| `WORKDIR` | le dossier courant pour les instructions suivantes |
| `COPY` | copie des fichiers de ton projet vers l'image |
| `RUN` | exécute une commande **pendant la construction** (installer, entraîner) |
| `ENV` | définit une variable d'environnement |
| `USER` | l'utilisateur qui exécute la suite |
| `EXPOSE` | documente le port |
| `CMD` | la commande **au démarrage du conteneur** (une seule par Dockerfile) |

### Pourquoi l'ordre des instructions est crucial

On copie d'abord `requirements.txt` et on installe, **puis** on copie le code. Ainsi, quand tu ne modifies que `app.py`, Docker réutilise la couche (longue) d'installation des dépendances : la reconstruction prend **2 secondes au lieu de 2 minutes**. Si on copiait tout le projet d'abord, chaque modification de code invaliderait l'installation.

### `--host 0.0.0.0` : un détail qui piège tout le monde

Dans le conteneur, `uvicorn` doit écouter sur **`0.0.0.0`** (toutes les interfaces). Avec `127.0.0.1` (la valeur par défaut), il n'accepterait que les connexions venant **de l'intérieur du conteneur** : ton navigateur ne pourrait jamais l'atteindre, même avec `-p`.

### Le fichier `.dockerignore`

Comme `.gitignore`, il liste ce qu'on **n'envoie pas** à Docker lors du build (plus rapide, et évite d'embarquer des secrets ou des fichiers inutiles) :

```text
venv/
.venv/
__pycache__/
*.pyc
.git/
.env
*.joblib
.pytest_cache/
.ipynb_checkpoints/
```

### Construire et lancer

```bash
docker build -t churn-api:0.1 .                       # construit l'image depuis le Dockerfile du dossier courant ; -t : nom:tag
docker run -d --name churn -p 8000:8000 churn-api:0.1  # démarre le conteneur ; port 8000 de ta machine → port 8000 du conteneur
docker ps                                              # la colonne STATUS indique « healthy » quand le healthcheck réussit
curl http://localhost:8000/health
docker logs churn                                      # les logs de l'application
docker stop churn && docker rm churn
```

**Le fichier `requirements.txt` du projet** (les versions de l'ML sont à **fixer** à celles avec lesquelles tu as entraîné : `pip freeze` te les donne, car un modèle sauvegardé n'est garanti compatible que pour des versions proches) :

```text
numpy==<version de ton environnement>
pandas==<version de ton environnement>
scikit-learn==<version de ton environnement>
joblib==<version de ton environnement>
fastapi
uvicorn
```

### Bonnes pratiques

1. **Image de base légère et versionnée** (`python:3.12-slim`, jamais `latest`).
2. **Dépendances avant le code** (cache).
3. **`--no-cache-dir`** avec `pip` (image plus petite).
4. **Ne pas tourner en `root`** (instruction `USER`).
5. **Jamais de secrets dans l'image** : ni dans le `Dockerfile`, ni copiés (`.dockerignore` : `.env`). Une image est partageable ; ses couches gardent l'historique.
6. **Un conteneur = un processus principal.**
7. **Un conteneur est éphémère** : tout ce qui est écrit dans son système de fichiers disparaît avec lui (sauf si on utilise un volume).

> 🏋️ **Pratique immédiate 1.7.4**
> On modifie uniquement `app.py` puis on relance `docker build`. Quelles étapes seront rejouées, lesquelles viendront du cache ? Dans quel cas l'installation des dépendances sera-t-elle refaite ?
>
> <details><summary>Solution</summary>
> Les couches jusqu'à `RUN pip install` viennent du cache (rien n'a changé avant). À partir de `COPY churn_data.py train.py app.py ./`, tout est rejoué (code modifié), y compris `RUN python train.py`. L'installation des dépendances est refaite uniquement si `requirements.txt` (ou l'image de base) change.
> </details>

✅ **Je sais** : expliquer image/conteneur, écrire un Dockerfile pour une API, expliquer le cache des couches, construire et lancer un conteneur avec port mapping.

---

## 1.7.5 — Données, variables d'environnement et secrets

### Volumes : faire persister des données

Le système de fichiers d'un conteneur disparaît avec lui. Pour **conserver** des données (une base de données, des résultats) ou **partager** un dossier de ton ordinateur :

```bash
# Monter le dossier ./resultats de ta machine sur /app/resultats dans le conteneur
docker run --rm -v "$(pwd)/resultats:/app/resultats" churn-api:0.1 python -c "open('/app/resultats/test.txt','w').write('ok')"
ls resultats/                                        # test.txt existe sur TA machine
```

### Variables d'environnement : configurer sans reconstruire

Notre `app.py` lit `SEUIL` et `MODEL_PATH` dans l'environnement. On peut donc changer le comportement **sans toucher à l'image** :

```bash
docker run -d --name churn -p 8000:8000 -e SEUIL=0.30 churn-api:0.1
docker run -d --name churn2 -p 8001:8000 --env-file .env churn-api:0.1      # plusieurs variables depuis un fichier
```

Fichier **`.env.example`** (commité, valeurs factices/par défaut) ; le vrai **`.env`** est dans `.gitignore` et `.dockerignore` (cohérent avec le chapitre 1.6.4) :

```text
SEUIL=0.12
MODEL_PATH=churn_model.joblib
```

**Règle :** configuration et secrets **dans l'environnement**, pas dans le code ni dans l'image.

---

## 1.7.6 — Docker Compose : plusieurs services, une seule commande

> 🎯 **Objectif.** Décrire une application à plusieurs conteneurs dans **un fichier YAML** et la lancer avec `docker compose up`.

Dès qu'une application comporte plusieurs services (API, base de données, interface…), lancer chaque `docker run` à la main devient ingérable. **Docker Compose** décrit tout dans un fichier `docker-compose.yml` (ou `compose.yaml`). *La commande moderne est `docker compose` (sans tiret) ; l'ancienne `docker-compose` est obsolète, et la clé `version:` en tête du fichier n'est plus nécessaire.*

**Exemple : l'API + un petit client qui l'appelle.** Les deux services sont sur un **réseau interne** créé par Compose, et se joignent **par leur nom de service** (`http://api:8000`), pas par `localhost`.

```yaml
# docker-compose.yml
services:
  api:
    build: .                              # construit l'image depuis le Dockerfile du dossier
    image: churn-api:0.1
    ports:
      - "8000:8000"                       # hôte:conteneur
    env_file:
      - .env                              # configuration depuis le fichier .env
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"]
      interval: 15s
      timeout: 3s
      retries: 3
      start_period: 10s
    restart: unless-stopped               # redémarre automatiquement en cas de plantage

  client:
    image: python:3.12-slim
    depends_on:
      api:
        condition: service_healthy        # attend que l'API soit « healthy »
    volumes:
      - ./client.py:/client.py:ro         # monte le script en lecture seule
    command: python /client.py
```

Le script **`client.py`** (qui n'utilise que la bibliothèque standard) :

```python
# client.py
import json
import urllib.request

client = {"age": 52, "anciennete": 2, "nb_produits": 3, "solde": 80000, "membre_actif": 0, "carte_credit": 1, "pays": "Allemagne"}
requete = urllib.request.Request("http://api:8000/predict", data=json.dumps(client).encode("utf-8"),
                                 headers={"Content-Type": "application/json"}, method="POST")
with urllib.request.urlopen(requete) as reponse:
    print(json.loads(reponse.read()))
```

```bash
docker compose up --build           # construit et démarre tout (au premier plan)
docker compose up -d                # en arrière-plan
docker compose ps                   # état des services
docker compose logs -f api          # suivre les logs d'un service
docker compose down                 # arrête et supprime conteneurs et réseau
```

**Ajouter une base de données plus tard :** son service aurait ses identifiants dans `.env` (`POSTGRES_PASSWORD=${POSTGRES_PASSWORD}` dans le YAML, la vraie valeur dans `.env`), jamais en clair dans `docker-compose.yml` — ce fichier est versionné.

---

## 1.7.7 — Nettoyage, GPU et dépannage

**Nettoyage** (les images et conteneurs s'accumulent et occupent des gigaoctets) :

```bash
docker system df                     # espace utilisé
docker container prune               # supprime les conteneurs arrêtés
docker image prune                   # supprime les images « dangling » (sans nom)
docker system prune -a               # ⚠️ supprime TOUT ce qui n'est pas utilisé : à faire en connaissance de cause
```

**GPU (à connaître pour le Deep Learning).** Pour utiliser une carte graphique NVIDIA dans un conteneur, il faut installer le **NVIDIA Container Toolkit** sur l'hôte, puis lancer avec `docker run --gpus all ...` et partir d'une image de base qui contient CUDA (par exemple une image officielle PyTorch ou NVIDIA). Cela s'utilisera aux Modules 4 et suivants.

**Dépannage :**

| Symptôme | Cause probable | Solution |
|---|---|---|
| `Cannot connect to the Docker daemon` | Docker Desktop n'est pas lancé | Démarre Docker Desktop |
| `port is already allocated` | le port hôte est déjà utilisé | change le mapping (`-p 8001:8000`) ou arrête l'autre programme |
| `curl` : connexion refusée alors que le conteneur tourne | l'application écoute sur `127.0.0.1` dans le conteneur | lance `uvicorn` avec `--host 0.0.0.0` |
| `No module named ...` dans le conteneur | dépendance absente de `requirements.txt` | ajoute-la et reconstruis |
| `COPY failed: file not found` | fichier hors du contexte de build ou exclu par `.dockerignore` | vérifie le chemin et `.dockerignore` |
| Le modèle ne se charge pas (`InconsistentVersionWarning`, erreurs de désérialisation) | versions de scikit-learn différentes entre entraînement et service | fixe les mêmes versions dans `requirements.txt` |
| L'image est énorme | image de base complète, pas de `--no-cache-dir` | utilise `-slim`, nettoie les caches |
| Le conteneur s'arrête immédiatement | la commande principale se termine ou plante | `docker logs <id>` |

---

## 🏋️ EXERCICES — CHAPITRE 1.7

### Exercice 1.7.A — Utiliser une image existante ⭐

(1) Lance un conteneur `python:3.12-slim` interactif et affiche la version de Python. (2) Lance `redis:7` en arrière-plan, liste-le avec `docker ps`, lis ses logs puis arrête-le.

<details><summary>Solution</summary>

```bash
docker run -it --rm python:3.12-slim python -c "import sys; print(sys.version)"
docker run -d --rm --name mon-redis redis:7
docker ps
docker logs mon-redis
docker stop mon-redis
```
</details>

### Exercice 1.7.B — Dockeriser un script ⭐⭐

Écris un script `stats.py` qui lit un entier `n` via une variable d'environnement `N` (défaut 10), génère `n` nombres aléatoires (graine 0) et affiche leur moyenne. Écris son `Dockerfile` (sans dépendance externe), construis l'image et exécute-la avec `N=1000`.

<details><summary>Solution</summary>

```python
# stats.py
import os
import random

n = int(os.environ.get("N", "10"))
rng = random.Random(0)
valeurs = [rng.random() for _ in range(n)]
print(f"n={n}  moyenne={sum(valeurs) / n:.4f}")
```

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY stats.py .
CMD ["python", "stats.py"]
```

```bash
docker build -t stats:1 .
docker run --rm stats:1                    # n=10
docker run --rm -e N=1000 stats:1          # n=1000
```
</details>

### Exercice 1.7.C — Dockeriser l'API du modèle ⭐⭐⭐

Avec les fichiers de 1.7.1 : construis l'image, lance le conteneur, envoie une requête `POST /predict` avec `curl`, puis relance le conteneur avec `-e SEUIL=0.5` et compare le champ `depart_predit` pour un même client. Que constates-tu ?

<details><summary>Solution</summary>

```bash
docker build -t churn-api:0.1 .
docker run -d --name churn -p 8000:8000 churn-api:0.1
curl -X POST http://localhost:8000/predict -H "Content-Type: application/json" \
  -d '{"age":52,"anciennete":2,"nb_produits":3,"solde":80000,"membre_actif":0,"carte_credit":1,"pays":"Allemagne"}'
docker rm -f churn
docker run -d --name churn -p 8000:8000 -e SEUIL=0.5 churn-api:0.1
# Même probabilité_depart, mais depart_predit peut changer : le seuil est un paramètre de décision (1.5.2)
```
On change le comportement métier **sans reconstruire l'image**, grâce à la variable d'environnement.
</details>

---

### 🧠 Quiz de fin de Chapitre 1.7 (12 questions)

1. **Que signifie le code HTTP 422 ? Et 404 ? Et 500 ?**
   <details><summary>Réponse</summary>422 : données de la requête invalides (faute du client) ; 404 : ressource introuvable ; 500 : erreur côté serveur.</details>
2. **Quelle différence entre `GET` et `POST` ?**
   <details><summary>Réponse</summary>`GET` lit une ressource ; `POST` envoie des données (corps) pour déclencher un traitement ou une création.</details>
3. **Pourquoi charger le modèle au démarrage plutôt qu'à chaque requête ?**
   <details><summary>Réponse</summary>Le chargement est coûteux ; le faire une seule fois garde chaque requête rapide.</details>
4. **Quelle différence entre une image et un conteneur ?**
   <details><summary>Réponse</summary>L'image est un modèle figé ; le conteneur est une instance en cours d'exécution de cette image.</details>
5. **Conteneur vs machine virtuelle ?**
   <details><summary>Réponse</summary>Un conteneur partage le noyau de l'hôte (léger, démarrage rapide) ; une VM embarque un système d'exploitation complet.</details>
6. **Pourquoi copier `requirements.txt` avant le code dans le Dockerfile ?**
   <details><summary>Réponse</summary>Pour tirer parti du cache : l'installation des dépendances n'est refaite que si `requirements.txt` change.</details>
7. **À quoi sert `-p 8000:8000` ?**
   <details><summary>Réponse</summary>Relier le port 8000 de la machine hôte au port 8000 du conteneur.</details>
8. **Pourquoi `--host 0.0.0.0` dans le conteneur ?**
   <details><summary>Réponse</summary>Pour accepter les connexions venant de l'extérieur du conteneur ; `127.0.0.1` n'accepterait que l'intérieur.</details>
9. **Les données écrites dans un conteneur persistent-elles après sa suppression ?**
   <details><summary>Réponse</summary>Non, sauf si elles sont dans un volume monté.</details>
10. **Où mettre les secrets ? Où ne jamais les mettre ?**
    <details><summary>Réponse</summary>Dans l'environnement (`.env` non versionné, variables d'environnement). Jamais dans le code, le Dockerfile, l'image ou Git.</details>
11. **À quoi sert Docker Compose ?**
    <details><summary>Réponse</summary>Décrire et lancer une application multi-conteneurs avec un seul fichier et une seule commande.</details>
12. **Pourquoi fixer les versions de scikit-learn dans `requirements.txt` pour un modèle sauvegardé ?**
    <details><summary>Réponse</summary>Un modèle sérialisé n'est garanti compatible qu'avec des versions proches de la bibliothèque qui l'a produit.</details>

---

### 🎯 MINI-PROJET 1.7 — Conteneuriser le modèle de churn

> **Objectif.** Livrer un service de prédiction qui démarre avec **une seule commande** sur n'importe quelle machine.
>
> **Cahier des charges :**
> 1. Reprends le pipeline de ton mini-projet 1.5 (ou celui de `train.py`) et organise le dépôt comme en 1.7.1.
> 2. Ajoute un endpoint `GET /health` et `POST /predict` validés par Pydantic, plus `POST /predict_batch`.
> 3. Écris un `Dockerfile` respectant les bonnes pratiques (image `-slim` versionnée, cache, utilisateur non-root, healthcheck).
> 4. Écris `.dockerignore`, `.env.example` (le vrai `.env` est ignoré) et `docker-compose.yml`.
> 5. Complète le `README.md` : comment construire, lancer, tester avec `curl`, configurer `SEUIL`.
> 6. Vérifie : `docker compose up --build` → `curl /health` renvoie `modele_charge: true` → une prédiction fonctionne → une requête invalide renvoie 422.
>
> **Critères de réussite :** un inconnu qui clone ton dépôt peut lancer le service en suivant le README, sans installer Python ni les bibliothèques.

---

**✅ Checklist du chapitre 1.7**
- [ ] J'explique requête/réponse HTTP, méthodes, codes de statut
- [ ] J'expose un modèle avec FastAPI (validation, `lifespan`, `/health`) et je le teste en local
- [ ] Je distingue image et conteneur, conteneur et VM
- [ ] Je sais écrire un Dockerfile et j'explique le cache des couches
- [ ] Je construis, lance, inspecte (`logs`, `exec`) et arrête un conteneur
- [ ] Je configure via variables d'environnement et je garde les secrets hors de Git et de l'image
- [ ] Je décris un multi-services avec `docker compose`
- [ ] Mon mini-projet 1.7 démarre avec une seule commande

---

# 🏆 PROJET GLOBAL DU MODULE 1 — « DE LA DONNÉE BRUTE À L'API CONTENEURISÉE »

**Durée : 1,5 semaine** · **Livrable : un dépôt GitHub, une image Docker, un README**

> **Objectif.** Synthétiser **toutes** les compétences du module dans un seul projet de portfolio : tu pars d'un fichier de données brut et tu livres un **service de prédiction** qui démarre avec une seule commande, avec un historique Git propre.
>
> **Sujet : prédire la survie d'un passager du Titanic.** Le jeu de données est petit, connu de tous les recruteurs, et contient tous les problèmes d'un vrai projet : valeurs manquantes, variables catégorielles, déséquilibre modéré, risque de fuite, choix de métrique. Il n'est qu'un **prétexte** : la méthode est celle que tu appliqueras à tout projet.

---

## Le cahier des charges en un coup d'œil

```text
            ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌──────────┐   ┌───────────┐   ┌────────────┐
 données ──►│ Jalon 1 │──►│ Jalon 2 │──►│ Jalon 3 │──►│ Jalon 4  │──►│  Jalon 5  │──►│  Jalon 6   │──► service
 brutes     │ Package │   │ NumPy   │   │ Pandas  │   │ Visual.  │   │ Scikit-   │   │ Git + API  │    prédiction
            │ + tests │   │ à la    │   │ nettoy. │   │ rapport  │   │ learn     │   │ + Docker   │
            │         │   │ main    │   │ + EDA   │   │ commenté │   │ pipeline  │   │            │
            └─────────┘   └─────────┘   └─────────┘   └──────────┘   └───────────┘   └────────────┘
   1.0 / 1.1           1.2           1.3            1.4            1.5              1.6 / 1.7
```

**Règle de travail : un seul dépôt Git, dès le jalon 1.** Chaque jalon = une ou plusieurs branches et des commits conventionnels (`feat:`, `fix:`, `test:`, `docs:`…), fusionnés dans `main`.

### Structure cible du dépôt

```text
titanic-ml/
├── README.md
├── requirements.txt
├── .gitignore  ·  .dockerignore  ·  .env.example
├── mlkit/                       # ton package Python
│   ├── __init__.py
│   ├── donnees.py               # chargement, exceptions, générateur de lots      (jalon 1)
│   ├── numerique.py             # split, standardisation, k-NN à la main          (jalon 2)
│   └── nettoyage.py             # nettoyage + rapport de qualité                  (jalon 3)
├── tests/
│   ├── test_donnees.py  ·  test_numerique.py  ·  test_nettoyage.py
├── rapport_visuel.py            # 6 graphiques commentés                          (jalon 4)
├── train.py                     # pipeline, validation croisée, sauvegarde        (jalon 5)
├── app.py                       # API FastAPI                                     (jalon 6)
├── Dockerfile  ·  docker-compose.yml                                              (jalon 6)
└── notebooks/exploration.ipynb  # (optionnel) explorations, sorties effacées
```

---

## Jalon 1 — Le package Python `mlkit` (chapitres 1.0 et 1.1)

**À réaliser :**
1. Environnement virtuel, dépôt Git, `.gitignore`, structure ci-dessus.
2. `mlkit/donnees.py` :
   - une **exception personnalisée** `DonneesInvalidesError` ;
   - `charger_titanic()` : tente `seaborn.load_dataset("titanic")`, et sinon utilise la version simulée du chapitre 1.3.7 (*copie-la dans ton module*) ; vérifie que les colonnes attendues sont présentes (sinon lève `DonneesInvalidesError`) ;
   - un **générateur** `lots(df, taille, graine=0)` qui produit des sous-tableaux mélangés (chapitre 1.1.9).
3. Des **tests pytest** : chargement OK ; colonne manquante → exception ; somme des tailles des lots = nombre de lignes.

**Critères de validation :** `pytest` passe ; aucun chemin en dur ; toutes les fonctions ont une docstring et des annotations de type.

<details><summary>Squelette de départ (à compléter)</summary>
```python
# mlkit/donnees.py
import random
import pandas as pd

COLONNES_ATTENDUES = ["survived", "pclass", "sex", "age", "sibsp", "parch", "fare", "embarked"]


class DonneesInvalidesError(ValueError):
    """Le jeu de données ne respecte pas le format attendu."""


def charger_titanic() -> pd.DataFrame:
    """Charge le Titanic (réel si possible, simulé hors ligne) et vérifie les colonnes."""
    ...


def lots(df: pd.DataFrame, taille: int, graine: int = 0):
    """Générateur : produit des sous-DataFrames de `taille` lignes, dans un ordre mélangé reproductible."""
    ...
```

```python
# tests/test_donnees.py
import pytest
from mlkit.donnees import charger_titanic, lots, DonneesInvalidesError

def test_chargement_colonnes():
    df = charger_titanic()
    assert {"survived", "sex", "age"} <= set(df.columns)

def test_lots_couvrent_tout():
    df = charger_titanic()
    assert sum(len(lot) for lot in lots(df, 100)) == len(df)
```
</details>

---

## Jalon 2 — NumPy à la main (chapitre 1.2)

**À réaliser** (`mlkit/numerique.py`, **avec NumPy uniquement**, pas de scikit-learn) :
1. `separer_train_test(X, y, taille_test, graine)` avec `default_rng` ; version **stratifiée** en bonus.
2. `standardiser(X)` et `appliquer_standardisation(X, moyennes, ecarts)` (attention à la division par zéro).
3. `knn_predire(X_train, y_train, X_test, k)` par **broadcasting**, sans boucle sur les échantillons de test.
4. Sur les colonnes numériques (`age` imputé par la médiane *calculée sur le train*, `fare`, `pclass`, `sibsp`, `parch`), calcule la **précision** de ton k-NN et compare à la baseline « classe majoritaire ».

**Critères de validation :** tests sur de petits tableaux à résultat connu ; ta standardisation donne moyenne 0 / écart-type 1 **sur le train** ; aucune boucle Python sur les lignes ; ton k-NN bat la baseline.

---

## Jalon 3 — Nettoyage et EDA avec Pandas (chapitre 1.3)

**À réaliser** (`mlkit/nettoyage.py`) :
1. `rapport_qualite(df)` : pour chaque colonne, type, % de manquants, nombre de valeurs distinctes, nombre d'outliers (IQR) ; renvoie un DataFrame.
2. `nettoyer(df)` : supprime les doublons, corrige les types, normalise les textes ; **n'impute pas** les valeurs manquantes ici (l'imputation se fera dans le `Pipeline` du jalon 5, pour éviter la fuite) — **explique ce choix dans le README**.
3. Une feature engineering justifiée : `taille_famille = sibsp + parch + 1`, `seul`.
4. Réponds par écrit, avec des chiffres, aux **10 questions de l'EDA** (chapitre 1.3.0).

**Critères de validation :** le rapport avant/après est reproductible ; tu distingues clairement ce qui est nettoyage (sans danger) et ce qui relève de l'apprentissage (à faire dans le `Pipeline`).

---

## Jalon 4 — Le rapport visuel (chapitre 1.4)

**À réaliser** (`rapport_visuel.py`) : une planche de **6 graphiques** sauvegardée en PNG, **chacun avec un titre-message et une phrase d'interprétation** dans le README :
1. taux de survie par sexe et par classe (barres, axe à partir de 0) ;
2. distribution de l'âge par survie (histogramme ou violon) ;
3. distribution du tarif (et pourquoi une échelle logarithmique peut aider) ;
4. heatmap de corrélation des variables numériques ;
5. valeurs manquantes par colonne ;
6. équilibre des classes de la cible.

**Critères de validation :** axes étiquetés avec unités ; palette accessible ; aucun graphique trompeur ; chaque graphique répond à une question explicitée.

---

## Jalon 5 — Modélisation avec Scikit-learn (chapitre 1.5)

**À réaliser** (`train.py`) :
1. Séparation train/test **stratifiée** ; le test n'est utilisé **qu'une fois**.
2. **Baseline** (`DummyClassifier`) ; au moins **3 modèles** comparés en validation croisée stratifiée (AUC + F1) dans un **`Pipeline`** complet (imputation, échelle, one-hot).
3. `GridSearchCV` sur le meilleur modèle.
4. Évaluation finale sur le test : matrice de confusion, précision, rappel, F1, AUC ; **un paragraphe** qui justifie la métrique et le seuil choisis.
5. Importance par permutation et **section « limites et éthique »** dans le README (variables sensibles : sexe, classe ; biais de collecte ; ce que le modèle ne dit pas).
6. Sauvegarde du pipeline avec `joblib` ; `random_state` fixés partout.

**Critères de validation :** zéro fuite (tu sais expliquer pourquoi) ; le modèle bat la baseline en AUC ; métriques cohérentes avec le README.

<details><summary>Solution de référence du jalon 5 (le cœur de `train.py`)</summary>

```python
import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.dummy import DummyClassifier
from sklearn.ensemble import HistGradientBoostingClassifier, RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.inspection import permutation_importance
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, f1_score, precision_score, recall_score, roc_auc_score
from sklearn.model_selection import GridSearchCV, StratifiedKFold, cross_val_score, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

# `charger_titanic()` vient de ton package mlkit ; ici on utilise la fonction de 1.3.7
titanic, source = charger_titanic()
titanic["taille_famille"] = titanic["sibsp"] + titanic["parch"] + 1

NUM = ["age", "fare", "pclass", "sibsp", "parch", "taille_famille"]
CAT = ["sex", "embarked"]
X, y = titanic[NUM + CAT], titanic["survived"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

pretraitement = ColumnTransformer([
    ("num", Pipeline([("imp", SimpleImputer(strategy="median")), ("sc", StandardScaler())]), NUM),
    ("cat", Pipeline([("imp", SimpleImputer(strategy="most_frequent")), ("oh", OneHotEncoder(handle_unknown="ignore"))]), CAT),
])

cv = StratifiedKFold(5, shuffle=True, random_state=42)
candidats = {
    "baseline": DummyClassifier(strategy="most_frequent"),
    "logistique": LogisticRegression(max_iter=2000),
    "forêt": RandomForestClassifier(n_estimators=300, min_samples_leaf=3, random_state=42, n_jobs=-1),
    "boosting": HistGradientBoostingClassifier(random_state=42),
}
scores = {}
for nom, clf in candidats.items():
    pipe = Pipeline([("pre", pretraitement), ("clf", clf)])
    auc = cross_val_score(pipe, X_train, y_train, cv=cv, scoring="roc_auc")
    scores[nom] = auc.mean()
    print(f"{nom:<11} AUC CV = {auc.mean():.3f} ± {auc.std():.3f}")

# Réglage du meilleur modèle non trivial
meilleur = max((k for k in scores if k != "baseline"), key=scores.get)
print("Modèle retenu :", meilleur)
grilles = {"logistique": {"clf__C": [0.1, 1, 10]},
           "forêt": {"clf__min_samples_leaf": [1, 3, 10], "clf__max_depth": [None, 6, 10]},
           "boosting": {"clf__learning_rate": [0.05, 0.1], "clf__max_depth": [None, 3]}}
recherche = GridSearchCV(Pipeline([("pre", pretraitement), ("clf", candidats[meilleur])]), grilles[meilleur], cv=cv, scoring="roc_auc")
recherche.fit(X_train, y_train)
modele = recherche.best_estimator_

# Évaluation finale : UNE seule fois
proba = modele.predict_proba(X_test)[:, 1]
pred = (proba >= 0.5).astype(int)
print(confusion_matrix(y_test, pred))
print(f"précision={precision_score(y_test, pred):.3f} rappel={recall_score(y_test, pred):.3f} F1={f1_score(y_test, pred):.3f} AUC={roc_auc_score(y_test, proba):.3f}")

imp = permutation_importance(modele, X_test, y_test, scoring="roc_auc", n_repeats=10, random_state=42)
print(pd.Series(imp.importances_mean, index=X_test.columns).sort_values(ascending=False).round(3))
joblib.dump(modele, "titanic_model.joblib")
```
</details>

---

## Jalon 6 — Git, API et Docker (chapitres 1.6 et 1.7)

**À réaliser :**
1. **`app.py`** (FastAPI) : `GET /health`, `POST /predict` (validation Pydantic des champs : `pclass ∈ {1,2,3}`, `sex ∈ {male, female}`, `age`, `fare`, `sibsp`, `parch`, `embarked ∈ {S, C, Q}`), réponse avec probabilité et décision ; modèle chargé dans `lifespan` ; seuil configurable par variable d'environnement.
2. **`Dockerfile`** (image `-slim` versionnée, dépendances avant le code, entraînement à la construction ou copie du modèle, utilisateur non-root, healthcheck), **`.dockerignore`**, **`docker-compose.yml`**, **`.env.example`**.
3. **Workflow Git :** au moins **une branche par jalon**, des **Pull Requests** (relues par toi-même ou un pair), 15 commits conventionnels ou plus, tag `v1.0`.
4. **`README.md` professionnel :** contexte, installation (venv **et** Docker), structure, commandes `curl` d'exemple, résultats (tableau de métriques), limites et éthique, licence.

**Critères de validation :** `docker compose up --build` démarre le service ; `/health` indique `modele_charge: true` ; une requête invalide renvoie 422 ; aucun secret dans l'historique Git.

---

## 🧮 Grille d'évaluation (sur 100)

| Critère | Points |
|---|---|
| **Jalon 1 — Package, tests, code propre** (docstrings, type hints, exceptions, PEP 8) | 12 |
| **Jalon 2 — NumPy** (vectorisation, broadcasting, pas de fuite dans la standardisation, k-NN correct) | 12 |
| **Jalon 3 — Pandas** (rapport de qualité, nettoyage justifié, EDA répondue avec des chiffres) | 12 |
| **Jalon 4 — Visualisation** (6 graphiques lisibles, honnêtes, commentés) | 10 |
| **Jalon 5 — ML** (baseline, validation croisée, pipeline sans fuite, métriques justifiées, test utilisé une fois) | 20 |
| **Jalon 6 — API + Docker** (API validée, Dockerfile soigné, compose, configuration par environnement) | 14 |
| **Git/GitHub** (commits conventionnels, branches, PR, tag, aucun secret) | 10 |
| **README et communication** (clair, reproductible, limites et éthique) | 10 |
| **Total** | **100** |

**Barème indicatif :** ≥ 85 excellent (prêt pour le portfolio) · 70–84 solide · 50–69 à consolider (reviens sur les chapitres des jalons faibles) · < 50 reprends le projet jalon par jalon.

## 🚀 Extensions « niveau avancé » (optionnelles, +10 points maximum)

- Un **workflow GitHub Actions** qui lance `pytest` à chaque Pull Request (intégration continue).
- Un endpoint `POST /predict_batch` et un test d'API automatisé.
- Un tableau de bord Seaborn exporté en HTML.
- Une **carte de modèle** (*model card*) : usage prévu, données, performances par sous-groupe (sexe, classe), limites.
- Une comparaison de ton k-NN du jalon 2 avec `KNeighborsClassifier` de Scikit-learn (mêmes résultats ?).

---

# 🧠 QUIZ FINAL DU MODULE 1 (40 questions)

> **Consigne :** réponds d'abord sans regarder les chapitres, puis vérifie. **Seuil de réussite : 32/40.** Pour chaque erreur, relis la section indiquée.

### Chapitre 1.0 — Démarrer

1. **Pourquoi utiliser un environnement virtuel ?**
   <details><summary>Réponse</summary>Isoler les dépendances de chaque projet pour éviter les conflits et garantir la reproductibilité (1.0.5).</details>
2. **Que modifie l'activation d'un `venv` ?**
   <details><summary>Réponse</summary>Le `PATH` : `python` et `pip` pointent vers ceux du `venv`.</details>
3. **Pourquoi « Restart Kernel & Run All » avant de partager un notebook ?**
   <details><summary>Réponse</summary>Pour vérifier qu'il s'exécute de haut en bas, sans dépendre d'un état caché laissé par des cellules exécutées dans le désordre.</details>
4. **Comment recréer l'environnement d'un projet sur une autre machine ?**
   <details><summary>Réponse</summary>`pip freeze > requirements.txt` puis, ailleurs, `pip install -r requirements.txt` dans un nouveau `venv`.</details>
5. **`ModuleNotFoundError` alors que le paquet est installé : causes probables ?**
   <details><summary>Réponse</summary>`venv` non activé ou non sélectionné (VS Code/Jupyter), paquet installé dans un autre environnement.</details>

### Chapitre 1.1 — Python

6. **Que valent `bool([])`, `bool("0")`, `bool(0.0)` ?**
   <details><summary>Réponse</summary>`False`, `True` (chaîne non vide), `False`.</details>
7. **Pourquoi `a = [1]; b = a; b.append(2)` modifie-t-il aussi `a` ?**
   <details><summary>Réponse</summary>Une variable est une étiquette : `a` et `b` désignent le même objet mutable.</details>
8. **Quelle structure pour tester l'appartenance rapidement sur 1 million d'éléments ?**
   <details><summary>Réponse</summary>Un `set` (ou un `dict`) : recherche en O(1), contre O(n) pour une liste.</details>
9. **Pourquoi `def f(x, l=[])` est-il un piège ?**
   <details><summary>Réponse</summary>La valeur par défaut est créée une seule fois et partagée entre les appels. Idiome : `l=None`.</details>
10. **Différence entre `return` et `print` ?**
    <details><summary>Réponse</summary>`print` affiche ; `return` renvoie une valeur réutilisable (sinon `None`).</details>
11. **À quoi sert `with open(..., encoding="utf-8")` ?**
    <details><summary>Réponse</summary>Fermer le fichier automatiquement, même en cas d'erreur, et éviter les problèmes d'accents.</details>
12. **Héritage ou composition : un `Reseau` contenant des `Couche` ?**
    <details><summary>Réponse</summary>Composition (« a des ») ; l'héritage exprime « est un ».</details>
13. **Comment lit-on un traceback ?**
    <details><summary>Réponse</summary>De bas en haut : type/message, ligne fautive, puis chaîne d'appels.</details>
14. **Quel est l'avantage d'un générateur sur une liste ?**
    <details><summary>Réponse</summary>Calcul paresseux : mémoire quasi constante, utile pour des données plus grandes que la RAM.</details>

### Chapitre 1.2 — NumPy

15. **Pourquoi NumPy est-il plus rapide qu'une boucle Python ?**
    <details><summary>Réponse</summary>Type unique, mémoire contiguë, boucle exécutée en C (vectorisation).</details>
16. **Shape de `np.ones((3, 4)).sum(axis=1)` ?**
    <details><summary>Réponse</summary>`(3,)` : l'axe 1 disparaît (une somme par ligne).</details>
17. **`a[1:3]` est-il une vue ou une copie ? Et `a[a > 0]` ?**
    <details><summary>Réponse</summary>Slice : vue. Masque booléen : copie.</details>
18. **`(5, 3) + (5,)` fonctionne-t-il ?**
    <details><summary>Réponse</summary>Non (alignement à droite : 3 ≠ 5). Il faudrait `(5, 1)`.</details>
19. **Pourquoi utiliser `default_rng(42)` ?**
    <details><summary>Réponse</summary>Aléatoire reproductible avec l'API moderne.</details>

### Chapitre 1.3 — Pandas

20. **`loc[0:2]` vs `iloc[0:2]` : combien de lignes ?**
    <details><summary>Réponse</summary>`loc` : 3 (fin incluse) ; `iloc` : 2 (fin exclue).</details>
21. **Pourquoi la médiane est-elle souvent préférée à la moyenne pour imputer ?**
    <details><summary>Réponse</summary>Elle est robuste aux valeurs extrêmes.</details>
22. **Qu'est-ce que la fuite de données lors du nettoyage ?**
    <details><summary>Réponse</summary>Calculer des statistiques (médiane, moyenne) sur tout le jeu avant le split : le test influence l'entraînement.</details>
23. **`agg` vs `transform` dans un `groupby` ?**
    <details><summary>Réponse</summary>`agg` : une ligne par groupe ; `transform` : une valeur par ligne d'origine.</details>
24. **Comment détecter des clés orphelines après un `merge` ?**
    <details><summary>Réponse</summary>`indicator=True` (colonne `_merge`) et contrôle du nombre de lignes ; `validate=` pour imposer la relation.</details>

### Chapitre 1.4 — Visualisation

25. **Quel graphique pour comparer la distribution d'une variable entre plusieurs groupes ?**
    <details><summary>Réponse</summary>Des boxplots ou violons côte à côte.</details>
26. **Pourquoi l'axe d'un diagramme en barres doit-il commencer à 0 ?**
    <details><summary>Réponse</summary>La longueur représente la valeur : un axe tronqué exagère les écarts.</details>
27. **Un coefficient de corrélation de 0,05 prouve-t-il l'absence de relation ?**
    <details><summary>Réponse</summary>Non : seulement l'absence de relation *linéaire* ; on regarde le nuage de points.</details>
28. **Perte d'entraînement faible et perte de validation qui remonte : diagnostic ?**
    <details><summary>Réponse</summary>Sur-apprentissage.</details>

### Chapitre 1.5 — Scikit-learn

29. **Paramètre vs hyperparamètre ?**
    <details><summary>Réponse</summary>Paramètre : appris par le modèle. Hyperparamètre : choisi avant l'entraînement.</details>
30. **Un modèle prédit toujours la classe majoritaire (95 %) : pourquoi est-ce un problème ?**
    <details><summary>Réponse</summary>Accuracy de 95 % mais rappel nul : l'accuracy est trompeuse sur classes déséquilibrées.</details>
31. **Définis précision et rappel.**
    <details><summary>Réponse</summary>Précision = VP/(VP+FP) ; rappel = VP/(VP+FN).</details>
32. **Que mesure l'AUC ?**
    <details><summary>Réponse</summary>La capacité à classer les positifs au-dessus des négatifs, indépendamment du seuil (0,5 = hasard, 1 = parfait).</details>
33. **Pourquoi le test ne doit-il servir qu'une fois ?**
    <details><summary>Réponse</summary>Chaque usage influence tes choix ; sinon il devient un jeu de validation et l'estimation finale est optimiste.</details>
34. **Pourquoi un `Pipeline` protège-t-il de la fuite ?**
    <details><summary>Réponse</summary>Chaque étape est ré-apprise sur l'entraînement de chaque pli uniquement.</details>

### Chapitre 1.6 — Git

35. **Différence entre `git revert` et `git reset --hard` ?**
    <details><summary>Réponse</summary>`revert` ajoute un commit d'annulation (sûr) ; `reset --hard` réécrit l'historique (dangereux).</details>
36. **Tu as poussé une clé d'API. Que fais-tu en premier ?**
    <details><summary>Réponse</summary>La révoquer/régénérer ; supprimer le fichier ne suffit pas.</details>
37. **Qu'est-ce qu'un conflit de fusion et comment le résoudre ?**
    <details><summary>Réponse</summary>Deux branches ont modifié les mêmes lignes : éditer le fichier, supprimer les marqueurs, `git add`, `git commit`.</details>

### Chapitre 1.7 — Docker et API

38. **Image vs conteneur ?**
    <details><summary>Réponse</summary>Image : modèle figé. Conteneur : instance en cours d'exécution.</details>
39. **Pourquoi copier `requirements.txt` avant le code dans le Dockerfile ?**
    <details><summary>Réponse</summary>Pour profiter du cache des couches : les dépendances ne sont réinstallées que si `requirements.txt` change.</details>
40. **Où placer les secrets et la configuration d'un service conteneurisé ?**
    <details><summary>Réponse</summary>Dans l'environnement (`.env` non versionné, `-e`, `env_file`), jamais dans le code, l'image ou Git.</details>

---

# 📖 GLOSSAIRE DU MODULE 1

| Terme | Définition courte |
|---|---|
| **Accuracy** | proportion de prédictions correctes (trompeuse si les classes sont déséquilibrées) |
| **Agrégation** | résumé de plusieurs valeurs en une (somme, moyenne…) |
| **API** | interface permettant à un programme d'en appeler un autre (souvent via HTTP) |
| **AUC** | aire sous la courbe ROC ; qualité du classement des positifs, sans seuil |
| **Axis** (NumPy) | dimension le long de laquelle on opère ; l'axe indiqué disparaît d'une agrégation |
| **Baseline** | modèle trivial de référence que tout vrai modèle doit battre |
| **Biais (éthique)** | traitement défavorable de certains groupes, souvent hérité des données |
| **Branche** (Git) | ligne de développement parallèle (un pointeur vers un commit) |
| **Broadcasting** | règle qui étire virtuellement un tableau pour l'opérer avec un autre de forme différente |
| **Classe** (POO) | moule décrivant des attributs et des méthodes |
| **Classification** | prédire une catégorie |
| **Commit** | instantané du projet dans l'historique Git |
| **Conflit** (Git) | deux modifications des mêmes lignes qu'il faut arbitrer à la main |
| **Conteneur** | instance en cours d'exécution d'une image Docker |
| **Copy-on-Write** | mécanisme de Pandas 3 : toute extraction se comporte comme une copie indépendante |
| **Corrélation** | lien statistique entre deux variables (≠ causalité) |
| **Décorateur** | fonction qui enrichit une autre fonction (`@nom`) |
| **Dockerfile** | fichier décrivant comment construire une image |
| **DataFrame** | tableau 2D étiqueté de Pandas |
| **dtype** | type des éléments d'un tableau NumPy |
| **EDA** | analyse exploratoire des données |
| **Endpoint** | adresse d'une API associée à une fonctionnalité |
| **Époque** | un passage complet sur les données d'entraînement |
| **Estimateur** | objet Scikit-learn qui apprend via `fit` |
| **Exception** | signal d'erreur propagé jusqu'à un `except` |
| **F1** | moyenne harmonique de la précision et du rappel |
| **Feature** | caractéristique (variable d'entrée) |
| **Fuite de données** | information du test/validation qui influence l'entraînement |
| **Générateur** | fonction `yield` qui produit des valeurs à la demande |
| **Hyperparamètre** | réglage choisi avant l'entraînement |
| **Image** (Docker) | modèle figé en lecture seule d'un environnement d'exécution |
| **Immuable** | qu'on ne peut pas modifier sur place (`int`, `str`, `tuple`) |
| **Index** (Pandas) | étiquettes des lignes |
| **JSON / JSONL** | format texte structuré / un objet JSON par ligne |
| **Jointure** (*merge*) | association de deux tables via une clé |
| **Label / cible** | la variable à prédire (`y`) |
| **Matrice de confusion** | tableau croisant classes réelles et prédites (VP, FP, FN, VN) |
| **Masque booléen** | tableau `True/False` servant à filtrer |
| **Module / package** | fichier `.py` / dossier de modules |
| **Mutable** | qu'on peut modifier sur place (`list`, `dict`, `set`) |
| **ndarray** | tableau N-dimensionnel de NumPy |
| **Outlier** | valeur aberrante, très éloignée des autres |
| **Overfitting** | sur-apprentissage : le modèle mémorise le bruit |
| **Paramètre** | valeur apprise par le modèle |
| **Pipeline** | enchaînement prétraitement + modèle en un seul objet |
| **Précision** | part des prédictions positives qui sont justes |
| **Pull Request** | proposition de fusion d'une branche, soumise à relecture |
| **Rappel** | part des vrais positifs retrouvés |
| **Régression** | prédire un nombre |
| **Régularisation** | pénalisation de la complexité pour limiter le sur-apprentissage |
| **Reproductibilité** | obtenir le même résultat avec le même code et les mêmes données |
| **ROC (courbe)** | rappel en fonction du taux de faux positifs, pour tous les seuils |
| **Seed / graine** | valeur initiale d'un générateur pseudo-aléatoire |
| **Seuil** | probabilité au-delà de laquelle on prédit la classe positive |
| **Series** | colonne étiquetée de Pandas |
| **Shape** | dimensions d'un tableau, par exemple `(3, 4)` |
| **Staging area** (index) | zone où l'on prépare le prochain commit |
| **Tidy** | une variable par colonne, une observation par ligne |
| **Vectorisation** | opération sur tableaux entiers, sans boucle Python |
| **Vue / copie** | tableau partageant la mémoire de l'original / indépendant |
| **Underfitting** | sous-apprentissage : le modèle est trop simple |
| **Validation croisée** | évaluation répétée sur plusieurs découpages |
| **Volume** (Docker) | stockage persistant lié à un conteneur |

---

# 🧾 AIDE-MÉMOIRE

### Python
```python
[f(x) for x in xs if cond]  {k: v for k, v in d.items()}  sorted(xs, key=lambda x: x[1])
with open(p, encoding="utf-8") as f: ...      try: ... except TypePrecis as e: ... else: ... finally: ...
def f(a, b=None, *args, **kwargs): ...        class A(B): def __init__(self): super().__init__()
yield valeur        from pathlib import Path        if __name__ == "__main__": ...
```

### NumPy
```python
np.array, zeros, ones, arange, linspace, eye   a.shape, a.ndim, a.dtype     a.reshape(-1, k), a.T, np.newaxis
a[mask], a[[i, j]], np.where(cond, x, y)       a.sum(axis=0), a.mean(axis=1, keepdims=True)
a @ b (matriciel) vs a * b (terme à terme)     np.linalg.solve / lstsq / norm     rng = np.random.default_rng(0)
```

### Pandas
```python
pd.read_csv(p, sep=";", decimal=",", parse_dates=[...], na_values=[...])     df.head/info/describe/shape/dtypes
df[cond], df.loc[lignes, cols], df.iloc[i, j], df.query("a > 1")            df.isna().sum(), df.fillna(v), df.dropna(), df.drop_duplicates()
pd.to_numeric(s, errors="coerce"), pd.to_datetime(s), s.str.strip().str.lower(), s.dt.year
df.groupby("c").agg(nom=("col", "mean")), .transform("mean"), df.pivot_table(...), pd.crosstab(a, b)
pd.merge(a, b, on="cle", how="left", indicator=True, validate="one_to_many"), pd.concat([a, b], ignore_index=True)
```

### Scikit-learn
```python
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
pipe = Pipeline([("pre", ColumnTransformer([...])), ("clf", Modele())]); pipe.fit(X_tr, y_tr)
cross_val_score(pipe, X_tr, y_tr, cv=StratifiedKFold(5, shuffle=True, random_state=42), scoring="roc_auc")
GridSearchCV(pipe, {"clf__C": [...]}, cv=5, scoring="roc_auc").fit(X_tr, y_tr)
joblib.dump(pipe, "m.joblib") ; joblib.load("m.joblib")
```

### Git
```bash
git init | clone | status | diff | add | commit -m "type: msg" | log --oneline --graph --all
git restore f | restore --staged f | commit --amend | revert <h> | stash / stash pop
git switch -c b | switch b | merge b | branch -d b | remote add origin URL | push -u origin main | pull
```

### Docker
```bash
docker build -t nom:tag .            docker run -d --name c -p 8000:8000 -e VAR=x --env-file .env nom:tag
docker ps | logs -f c | exec -it c bash | stop c | rm c | images | system prune
docker compose up --build | up -d | ps | logs -f svc | down
```

---

# ⚠️ ERREURS FRÉQUENTES : LE TOP 15

| # | Erreur | Conséquence | Bonne pratique |
|---|---|---|---|
| 1 | Oublier d'activer le `venv` | bibliothèques globales, conflits | vérifier `(venv)` avant `pip install` |
| 2 | Copier une liste avec `b = a` | modifications « fantômes » | `.copy()` / `deepcopy` |
| 3 | Argument par défaut mutable | état partagé entre appels | `None` puis création dans la fonction |
| 4 | `except:` nu | masque des bugs, bloque Ctrl+C | capturer le type précis |
| 5 | Oublier `encoding="utf-8"` | accents déformés | toujours le préciser |
| 6 | Boucle Python sur un tableau NumPy/Pandas | code 100× plus lent | vectoriser |
| 7 | Confondre `*` et `@`, `(n,)` et `(n, 1)` | résultats faux ou erreurs de shape | afficher `.shape` |
| 8 | Modifier une vue NumPy sans le savoir | données d'origine altérées | `.copy()` |
| 9 | Imputer/standardiser avant le split | fuite de données | `Pipeline` |
| 10 | Juger sur l'accuracy (classes déséquilibrées) | modèle inutile jugé « excellent » | baseline + précision/rappel/F1/AUC |
| 11 | Choisir le modèle sur le test | score optimiste | validation croisée ; test une seule fois |
| 12 | Axe tronqué, couleurs rouge/vert seules | graphique trompeur | axe à 0, palette accessible |
| 13 | Commiter un secret, `venv/` ou un gros fichier | fuite de sécurité, dépôt alourdi | `.gitignore` *avant* le premier commit |
| 14 | `reset --hard` / `push --force` sur un historique partagé | travail détruit | `revert` |
| 15 | Serveur sur `127.0.0.1` dans un conteneur | service injoignable | `--host 0.0.0.0` |

---

# 🎓 CONCLUSION ET TRANSITION VERS LE MODULE 2

Tu disposes maintenant de la **boîte à outils complète** de l'ingénieur IA débutant, et surtout d'une **méthode** :

| Tu sais désormais… | Grâce à |
|---|---|
| Configurer un environnement reproductible | 1.0 |
| Écrire du Python structuré, testé, lisible | 1.1 |
| Calculer efficacement sur des tableaux | 1.2 |
| Charger, nettoyer, explorer des données | 1.3 |
| Visualiser honnêtement | 1.4 |
| Entraîner, évaluer, valider un modèle sans tricher | 1.5 |
| Versionner et collaborer | 1.6 |
| Livrer un modèle sous forme de service conteneurisé | 1.7 |

**Avant de passer au Module 2 (Mathématiques pour l'IA), vérifie que tu peux répondre « oui » à :**

- [ ] Je lis un `shape` et j'explique un `axis` sans hésiter (base de l'algèbre linéaire).
- [ ] Je sais écrire une fonction vectorisée en NumPy (base du calcul de gradients).
- [ ] Je sais expliquer pourquoi un score est biaisé quand il y a fuite (base de la rigueur statistique).
- [ ] Mon projet global est publié sur GitHub et démarre avec `docker compose up`.
- [ ] J'ai obtenu au moins 32/40 au quiz final.

> **Ce qui t'attend ensuite.** Dans le Module 2, tu donneras un sens mathématique à ce que tu viens d'utiliser : les **vecteurs et matrices** derrière NumPy, les **dérivées et gradients** derrière l'entraînement, les **probabilités et statistiques** derrière les métriques et la validation. Tu retrouveras ici : la similarité cosinus, le produit matriciel, la régression par moindres carrés, la sigmoïde, l'écart-type et la standardisation.

**Ressources pour aller plus loin (🔸) :** la documentation officielle de Python, NumPy, Pandas, Scikit-learn et FastAPI (les *User Guides* sont d'excellents cours) ; le livre *Python for Data Analysis* (W. McKinney) ; le guide « Pro Git » (gratuit en ligne) ; la documentation « Get started » de Docker.

---

**🎉 FIN DU MODULE 1 — Bravo ! Passe au Module 2 quand ta checklist est au vert.**
