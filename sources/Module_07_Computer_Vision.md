# 🎓 FORMATION IA — MODULE 7
# Computer Vision
### Classification avancée, détection, segmentation, reconnaissance faciale et OCR

> **Professeur :** Dr. IA — Formation Complète  
> **Durée estimée :** 7 semaines (1–2h par jour)  
> **Prérequis :** Module 2 (Mathématiques), Module 4 (Deep Learning & CNN), Module 5 (Transformers)

---

## 🧭 COMMENT LIRE CE MODULE

Au Module 4, tu as appris les fondations des CNN — convolution, pooling, transfer learning — et tu as entraîné un classificateur d'images simple. Ce module va bien plus loin : il t'apprend à répondre à des questions que la simple classification ne peut pas résoudre — **"Où précisément se trouve cet objet ?"**, **"Quels pixels exacts appartiennent à quel objet ?"**, **"Est-ce que ce visage correspond à cette personne précise ?"**

**La structure de chaque chapitre reste identique aux modules précédents :**

```
1. 📖 EXPLICATION — toutes les notions, en langage simple et avec des analogies,
                     AVANT tout code
2. 💻 MISE EN PRATIQUE — le code qui implémente ce que tu viens de comprendre
3. 🏋️ EXERCICES — 4 exercices corrigés pour ancrer la compréhension
```

**Un rappel important :** chaque tâche de ce module reste construite sur les CNN du Module 4 — ce qui change, c'est **la façon dont on interprète et structure leur sortie** : un simple vecteur de probabilités pour la classification, mais des coordonnées, des masques pixel par pixel, ou des distances entre embeddings pour les tâches plus avancées de ce module.

---

## 📋 PLAN DU MODULE 7

| Chapitre | Sujet | Durée estimée |
|---|---|---|
| **7.1** | Classification Avancée : Architectures Modernes et Data Augmentation | 1 semaine |
| **7.2** | Détection d'Objets : Localiser et Classifier Simultanément | 1.5 semaine |
| **7.3** | Segmentation Sémantique et d'Instance | 1.5 semaine |
| **7.4** | Reconnaissance Faciale et Estimation de Pose | 1.5 semaine |
| **7.5** | OCR : Lire du Texte dans les Images | 1 semaine |
| **7.6** | Déployer un Système de Vision en Production | 0.5 semaine |

---

---

# 📘 CHAPITRE 7.1 — CLASSIFICATION AVANCÉE
## Architectures Modernes et Data Augmentation

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Rappel : les Limites du CNN Simple du Module 4

Rappelle-toi le Module 4, chapitre 4.4 : tu as construit un CNN simple (quelques couches de convolution empilées) pour classifier des images MNIST. Mais un CNN très profond (des dizaines, voire des centaines de couches) rencontre un problème surprenant : **au-delà d'une certaine profondeur, ajouter encore plus de couches dégrade parfois la performance**, plutôt que de l'améliorer — un phénomène contre-intuitif qui a longtemps limité la profondeur pratique des réseaux.

---

### ResNet : les Connexions Résiduelles, une Idée Simple et Révolutionnaire

**🔑 Intuition — le raccourci qui change tout**

Imagine que tu donnes des indications à quelqu'un pour se rendre d'un point A à un point B, à travers 50 intersections successives. Si chaque intersection a une petite chance de te faire prendre une mauvaise direction, l'erreur cumulée sur 50 intersections risque d'être énorme, et la personne pourrait finir complètement perdue. Maintenant, imagine que tu ajoutes, à chaque intersection, un **raccourci optionnel** qui permet de "sauter directement" à l'intersection suivante sans risque de se tromper, tout en gardant la possibilité de suivre l'itinéraire détaillé si celui-ci apporte une réelle amélioration.

**C'est exactement le principe des connexions résiduelles (residual connections) de ResNet** : au lieu de forcer chaque couche à apprendre une transformation complète de l'entrée, on lui demande d'apprendre uniquement la **différence** (le "résidu") par rapport à l'entrée, et on **ajoute directement l'entrée d'origine à la sortie** de la couche via une connexion "raccourci" (skip connection).

```
🔑 Couche classique (rappel Module 4) :
   sortie = f(entrée)

🔑 Couche résiduelle (ResNet) :
   sortie = f(entrée) + entrée
                         └── la connexion "raccourci" (skip connection)
```

**💡 Pourquoi ça résout le problème ?** Si une couche n'apporte rien d'utile pour une tâche donnée, elle peut simplement apprendre à produire `f(entrée) ≈ 0`, laissant l'information de l'entrée passer presque intacte grâce à l'addition directe. Le réseau peut ainsi être **beaucoup plus profond** (ResNet existe avec 50, 101, voire 152 couches) sans souffrir de la dégradation observée avec des CNN "classiques" trop profonds — et rappelle-toi le Module 2, chapitre 2.2.6 : la règle de la chaîne calcule le gradient en remontant couche par couche ; ces connexions raccourcies offrent un "chemin direct" pour que le gradient circule sans trop s'atténuer, atténuant ainsi le risque de gradient qui disparaît (un problème déjà rencontré avec les RNN au Module 4, chapitre 4.6, mais qui touche aussi les réseaux très profonds en général).

---

### EfficientNet : l'Art du Compromis entre Taille et Performance

**🔑 Intuition**

Pour améliorer un CNN, on peut jouer sur trois leviers : le rendre plus **profond** (plus de couches), plus **large** (plus de filtres par couche), ou lui donner des images en plus **haute résolution**. Historiquement, les chercheurs ajustaient ces trois leviers un peu au hasard ou séparément. **EfficientNet** propose une approche systématique : augmenter ces trois dimensions **simultanément, selon un ratio optimal et cohérent**, plutôt que d'en négliger certaines. Le résultat est une famille de modèles (EfficientNet-B0 à B7) offrant un excellent compromis entre nombre de paramètres, temps de calcul, et précision — souvent bien meilleur que des architectures plus anciennes de taille comparable.

---

### La Data Augmentation : Créer de la Diversité sans Nouvelles Données

**🔑 Intuition — rappel direct du Module 3, chapitre 3.1**

Rappelle-toi le compromis biais-variance du Module 3 : un modèle qui voit trop peu d'exemples différents risque de surapprendre (mémoriser les spécificités exactes de son jeu d'entraînement, plutôt que d'apprendre à généraliser). Pour les images, une solution particulièrement efficace consiste à **générer artificiellement de nouvelles variantes** de chaque image d'entraînement, par de légères transformations qui préservent son contenu essentiel.

```
🔑 Transformations courantes de Data Augmentation :

- Rotation légère (l'image reste reconnaissable, tournée de quelques degrés)
- Retournement horizontal (miroir gauche-droite)
- Recadrage aléatoire (zoomer sur une portion différente de l'image)
- Ajustement de la luminosité/contraste
- Léger bruit ou flou

🔑 Intuition : un chat reste un chat, qu'il soit légèrement tourné,
   pris sous un éclairage différent, ou recadré différemment. En
   exposant le modèle à ces variations artificielles, on l'entraîne
   à être ROBUSTE à ces changements, plutôt que de mémoriser une
   seule apparence exacte trop spécifique.
```

**💡 Le point crucial :** la Data Augmentation n'ajoute **aucune nouvelle information réelle** — elle force simplement le modèle à généraliser mieux à partir des données existantes, un peu comme la régularisation du Module 4, chapitre 4.3 (Dropout), mais appliquée directement aux données plutôt qu'à l'architecture du réseau.

---

## 💻 MISE EN PRATIQUE

```python
import torch
import torch.nn as nn
from torchvision import models, transforms
from torch.utils.data import DataLoader
import matplotlib.pyplot as plt
from PIL import Image

# ─────────────────────────────────────────────
# 1. CHARGER RESNET ET EFFICIENTNET PRÉ-ENTRAÎNÉS (rappel Module 4, Transfer Learning)
# ─────────────────────────────────────────────

resnet = models.resnet50(weights="IMAGENET1K_V2")
efficientnet = models.efficientnet_b0(weights="IMAGENET1K_V1")

print(f"ResNet50      : {sum(p.numel() for p in resnet.parameters()):,} paramètres")
print(f"EfficientNet-B0 : {sum(p.numel() for p in efficientnet.parameters()):,} paramètres")

# ─────────────────────────────────────────────
# 2. VISUALISER UNE CONNEXION RÉSIDUELLE (bloc simplifié)
# ─────────────────────────────────────────────

class BlocResiduel(nn.Module):
    """Version simplifiée d'un bloc ResNet."""
    def __init__(self, canaux):
        super().__init__()
        self.conv1 = nn.Conv2d(canaux, canaux, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(canaux)     # rappel Module 4, chapitre 4.3
        self.conv2 = nn.Conv2d(canaux, canaux, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(canaux)
        self.relu = nn.ReLU()
    
    def forward(self, x):
        identite = x                          # sauvegarder l'entrée d'origine
        sortie = self.relu(self.bn1(self.conv1(x)))
        sortie = self.bn2(self.conv2(sortie))
        sortie = sortie + identite            # LA CONNEXION RÉSIDUELLE — le cœur de ResNet
        return self.relu(sortie)

bloc = BlocResiduel(canaux=16)
entree_test = torch.rand(1, 16, 32, 32)
sortie_test = bloc(entree_test)
print(f"\nForme entrée : {entree_test.shape}, Forme sortie : {sortie_test.shape}")
print("(Grâce à la connexion résiduelle, l'information de l'entrée est préservée)")

# ─────────────────────────────────────────────
# 3. DATA AUGMENTATION — visualiser les transformations
# ─────────────────────────────────────────────

transformations_augmentation = transforms.Compose([
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.RandomRotation(degrees=15),
    transforms.ColorJitter(brightness=0.3, contrast=0.3),
    transforms.RandomResizedCrop(size=224, scale=(0.8, 1.0)),
])

image_originale = Image.open("chat_exemple.jpg")  # remplace par ton image

fig, axes = plt.subplots(1, 5, figsize=(15, 3))
axes[0].imshow(image_originale)
axes[0].set_title("Originale")
axes[0].axis("off")

for i in range(1, 5):
    image_augmentee = transformations_augmentation(image_originale)
    axes[i].imshow(image_augmentee)
    axes[i].set_title(f"Augmentation {i}")
    axes[i].axis("off")

plt.suptitle("Data Augmentation — Variantes Générées de la Même Image")
plt.tight_layout()
plt.show()

# ─────────────────────────────────────────────
# 4. PIPELINE COMPLET AVEC AUGMENTATION POUR L'ENTRAÎNEMENT
# ─────────────────────────────────────────────

transform_train = transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # rappel Module 4.5
])

# IMPORTANT : PAS d'augmentation sur les données de VALIDATION/TEST (rappel Module 3, chapitre 3.1)
transform_test = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

print("\n✅ Pipelines de transformation configurés (augmentation sur train uniquement)")
```

---

## 🏋️ EXERCICES — CHAPITRE 7.1

### Exercice 7.1.A — Comprendre la connexion résiduelle

Pour un bloc résiduel où `f(entrée) = 0` (la couche n'a rien appris d'utile), que produit exactement `sortie = f(entrée) + entrée` ? Explique pourquoi cette propriété est précieuse pour l'entraînement de réseaux très profonds.

<details>
<summary>👉 Solution</summary>

```
Si f(entrée) = 0, alors sortie = 0 + entrée = entrée

La sortie est EXACTEMENT égale à l'entrée — la couche devient
"transparente", laissant l'information passer sans la modifier.
```

Cette propriété est précieuse car elle donne au réseau la **possibilité** de "désactiver" une couche inutile sans nuire à la propagation de l'information (ni du signal en forward, ni du gradient en backward, rappel Module 2). Dans un réseau très profond sans connexions résiduelles, chaque couche est **forcée** de transformer son entrée, même si cette transformation dégrade l'information utile — les connexions résiduelles offrent une échappatoire, rendant les réseaux très profonds beaucoup plus faciles à entraîner efficacement.
</details>

### Exercice 7.1.B — Pourquoi ne pas augmenter les données de test ?

Explique pourquoi la Data Augmentation ne doit être appliquée qu'aux données d'ENTRAÎNEMENT, jamais aux données de validation ou de test, en te référant au Module 3, chapitre 3.1.

<details>
<summary>👉 Solution</summary>

L'objectif de l'ensemble de validation/test (Module 3, chapitre 3.1) est d'obtenir une estimation **honnête et représentative** de la performance du modèle sur des données réelles, telles qu'il les rencontrera en production. Appliquer une Data Augmentation aléatoire à ces ensembles introduirait une variabilité artificielle qui fausserait cette estimation — le modèle pourrait sembler soit meilleur, soit pire, selon les transformations aléatoires appliquées ce jour-là, plutôt que de refléter fidèlement sa vraie capacité de généralisation sur des données non modifiées. La Data Augmentation est un outil d'ENTRAÎNEMENT, destiné à enrichir artificiellement la diversité vue par le modèle pendant l'apprentissage — pas un outil d'évaluation.
</details>

### Exercice 7.1.C — ResNet ou EfficientNet ?

Pour chacun des scénarios suivants, indique s'il est plus pertinent de privilégier une architecture comme ResNet (profonde, bien établie) ou EfficientNet (optimisée pour le compromis taille/performance), en justifiant :

1. Une application mobile qui doit exécuter la classification directement sur le téléphone, avec des ressources de calcul limitées
2. Un projet de recherche où la performance maximale est recherchée, sans contrainte forte de ressources de calcul

<details>
<summary>👉 Solution</summary>

```
1. EFFICIENTNET — conçu spécifiquement pour un excellent compromis
   entre nombre de paramètres/calcul nécessaire et précision, un
   atout décisif pour un déploiement avec ressources limitées
   (rappel Chapitre 7.6 sur le déploiement, à venir)

2. RESNET (ou variantes plus grandes/récentes) — dans un contexte
   sans contrainte forte de ressources, on peut privilégier des
   architectures plus grandes et éprouvées, sans se soucier
   prioritairement de l'efficacité computationnelle
```
</details>

### Exercice 7.1.D — Choisir des transformations de Data Augmentation adaptées

Pour un dataset de classification de panneaux de signalisation routière, explique pourquoi une transformation de "retournement horizontal" (miroir gauche-droite) serait probablement une MAUVAISE idée, contrairement à un dataset de classification de races de chats.

<details>
<summary>👉 Solution</symmary>

Un panneau de signalisation routière retourné horizontalement peut changer complètement sa signification (par exemple, une flèche indiquant "tourner à droite" deviendrait, une fois retournée, une flèche indiquant "tourner à gauche") — cette transformation créerait donc des exemples d'entraînement **incorrects et trompeurs**, où l'image ne correspond plus à son label d'origine. À l'inverse, un chat retourné horizontalement reste parfaitement reconnaissable comme le même chat, dans une pose simplement inversée — le label "chat" (ou même sa race spécifique) reste parfaitement valide après cette transformation. Ce contraste illustre un principe important : **le choix des transformations de Data Augmentation doit toujours respecter la sémantique spécifique du problème traité**, et non être appliqué mécaniquement sans réflexion.
</details>

---

---

# 📘 CHAPITRE 7.2 — DÉTECTION D'OBJETS
## Localiser et Classifier Simultanément

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### Rappel : la Différence Fondamentale avec la Classification

Rappelle-toi le tableau du fichier de base de la formation : la **classification** (Chapitre 7.1) répond à "Qu'est-ce que c'est ?" pour une image entière. La **détection d'objets** répond à une question plus riche : "**Quels** objets sont présents, et **où précisément** se trouve chacun d'eux ?" — potentiellement plusieurs objets différents, à des positions différentes, dans une seule image.

---

### La Bounding Box : représenter une position dans l'image

**🔑 Intuition**

Une **bounding box** (boîte englobante) est simplement un rectangle qui délimite la position d'un objet détecté dans l'image, représenté par 4 nombres :

```
🔑 Représentation d'une bounding box (une convention parmi d'autres) :

(x_centre, y_centre, largeur, hauteur)
   OU
(x_min, y_min, x_max, y_max)  → coin supérieur gauche et coin inférieur droit
```

**💡 Le point clé :** un modèle de détection ne prédit donc pas uniquement une classe (rappel Module 3, chapitre 3.3 : classification), mais **simultanément** une classe ET ces 4 coordonnées numériques — c'est en réalité une combinaison de classification ET de régression (rappel Module 3, chapitre 3.2 : les 4 coordonnées sont des valeurs continues, prédites comme dans une régression), pour **chaque objet détecté** dans l'image.

---

### IoU (Intersection over Union) : mesurer la qualité d'une détection

**🔑 Intuition**

Comment évaluer si une bounding box prédite par le modèle est "bonne" ? On la compare à la bounding box réelle (le "ground truth", annoté par un humain), en mesurant leur **degré de recouvrement**.

```
🔑 Formule de l'IoU :

IoU = (Aire de l'INTERSECTION des deux boîtes) / (Aire de leur UNION)

IoU = 1.0  → les deux boîtes coïncident parfaitement
IoU = 0.0  → les deux boîtes ne se chevauchent pas du tout
```

**🧮 Exemple calculé à la main**

Imagine deux bounding boxes carrées simples :

```
Boîte réelle    : de (0,0) à (10,10)  → aire = 10×10 = 100
Boîte prédite   : de (5,5) à (15,15)  → aire = 10×10 = 100

Intersection : de (5,5) à (10,10) → aire = 5×5 = 25
Union : Aire_réelle + Aire_prédite - Intersection
      = 100 + 100 - 25 = 175

IoU = 25 / 175 ≈ 0.143
```

Un IoU de 0.143 est **faible** — les deux boîtes se chevauchent à peine, cette prédiction serait considérée comme une mauvaise détection dans la plupart des applications pratiques (un seuil typique pour considérer une détection "correcte" est souvent IoU ≥ 0.5).

**💡 Pourquoi l'IoU est-elle si utilisée ?** Elle offre une mesure unique, intuitive et normalisée (entre 0 et 1, rappel Module 2, chapitre 2.3.1 : comme une probabilité) pour comparer des boîtes, indépendamment de leur taille absolue — exactement le rôle que joue le F1-score (Module 3, chapitre 3.6) pour combiner precision et recall en classification.

---

### Non-Max Suppression (NMS) : éliminer les détections redondantes

**🔑 Intuition — le problème des détections en double**

Un modèle de détection ne produit généralement pas UNE SEULE bounding box par objet réel — il génère souvent **plusieurs boîtes candidates légèrement différentes** autour du même objet, chacune avec un score de confiance différent. Sans traitement, l'image finale afficherait plusieurs boîtes redondantes pour un seul et même objet — clairement indésirable.

```
🔑 Algorithme du Non-Max Suppression :

1. Garder la boîte candidate avec le SCORE de confiance le plus élevé
2. Calculer l'IoU entre cette boîte et TOUTES les autres boîtes candidates
3. SUPPRIMER toutes les boîtes dont l'IoU avec la boîte gardée dépasse
   un certain seuil (par exemple 0.5) — elles sont jugées "redondantes",
   détectant probablement le même objet
4. Répéter les étapes 1-3 parmi les boîtes RESTANTES, jusqu'à ce
   qu'il n'y ait plus de doublons
```

**💡 Pourquoi c'est nécessaire :** sans NMS, une seule voiture pourrait apparaître détectée par 5 boîtes légèrement différentes se chevauchant fortement — le NMS garantit qu'un seul objet réel corresponde, au final, à une seule détection propre.

---

### YOLO : la Détection "en Une Seule Passe"

**🔑 Intuition — l'approche "You Only Look Once"**

Historiquement, les premiers systèmes de détection performants (la famille R-CNN) fonctionnaient en **deux étapes distinctes** : d'abord proposer de nombreuses régions candidates susceptibles de contenir un objet, puis classifier chacune de ces régions séparément — un processus lent, avec plusieurs passages successifs dans le réseau.

**YOLO** ("You Only Look Once") révolutionne cette approche avec une idée radicalement plus simple et rapide : **une seule passe** du réseau à travers l'image entière suffit pour prédire simultanément TOUTES les bounding boxes et leurs classes associées. L'image est divisée en une grille, et pour chaque cellule de cette grille, le réseau prédit directement : "y a-t-il un objet ici, quelle est sa classe probable, et quelles sont approximativement les coordonnées de sa bounding box ?"

```
🔑 Principe simplifié de YOLO :

Image divisée en grille (ex: 13×13 cellules)
    ↓
Pour CHAQUE cellule, le réseau prédit SIMULTANÉMENT :
   - la probabilité qu'un objet soit centré dans cette cellule
   - les coordonnées de la bounding box associée (si un objet est présent)
   - la classe probable de cet objet
    ↓
Toutes ces prédictions sont générées EN UNE SEULE PASSE du réseau
    ↓
Non-Max Suppression pour éliminer les doublons
```

**💡 Le compromis vitesse/précision :** cette approche "une seule passe" rend YOLO **remarquablement rapide** (capable de traiter des dizaines d'images par seconde, permettant une détection en temps réel sur vidéo), au prix d'une précision légèrement inférieure aux meilleures approches en deux étapes sur certains cas complexes — un excellent compromis pour la plupart des applications réelles, notamment celles nécessitant du temps réel.

---

## 💻 MISE EN PRATIQUE

```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches

# ─────────────────────────────────────────────
# 1. CALCULER L'IoU — retrouver notre calcul à la main
# ─────────────────────────────────────────────

def calculer_iou(boite1, boite2):
    """boite = (x_min, y_min, x_max, y_max)"""
    x_min_inter = max(boite1[0], boite2[0])
    y_min_inter = max(boite1[1], boite2[1])
    x_max_inter = min(boite1[2], boite2[2])
    y_max_inter = min(boite1[3], boite2[3])
    
    aire_intersection = max(0, x_max_inter - x_min_inter) * max(0, y_max_inter - y_min_inter)
    
    aire_boite1 = (boite1[2] - boite1[0]) * (boite1[3] - boite1[1])
    aire_boite2 = (boite2[2] - boite2[0]) * (boite2[3] - boite2[1])
    aire_union = aire_boite1 + aire_boite2 - aire_intersection
    
    return aire_intersection / aire_union if aire_union > 0 else 0

boite_reelle = (0, 0, 10, 10)
boite_predite = (5, 5, 15, 15)
iou = calculer_iou(boite_reelle, boite_predite)
print(f"IoU calculé : {iou:.4f}")  # doit retrouver ≈0.143, notre calcul à la main !

# Visualiser
fig, ax = plt.subplots(figsize=(6, 6))
ax.add_patch(patches.Rectangle((0,0), 10, 10, fill=False, edgecolor="blue", linewidth=2, label="Réelle"))
ax.add_patch(patches.Rectangle((5,5), 10, 10, fill=False, edgecolor="red", linewidth=2, label="Prédite"))
ax.set_xlim(-2, 18); ax.set_ylim(-2, 18)
ax.legend(); ax.set_title(f"IoU = {iou:.3f}")
plt.gca().invert_yaxis()
plt.show()

# ─────────────────────────────────────────────
# 2. IMPLÉMENTER NON-MAX SUPPRESSION FROM SCRATCH
# ─────────────────────────────────────────────

def non_max_suppression(boites, scores, seuil_iou=0.5):
    """Élimine les détections redondantes selon l'algorithme du chapitre."""
    indices_tries = np.argsort(scores)[::-1]   # du score le plus élevé au plus faible
    boites_gardees = []
    
    while len(indices_tries) > 0:
        idx_meilleur = indices_tries[0]
        boites_gardees.append(idx_meilleur)
        
        if len(indices_tries) == 1:
            break
        
        # Calculer l'IoU entre la meilleure boîte et toutes les autres restantes
        ious = [calculer_iou(boites[idx_meilleur], boites[idx]) for idx in indices_tries[1:]]
        
        # Garder seulement les boîtes dont l'IoU est SOUS le seuil (pas redondantes)
        indices_a_garder = [i+1 for i, iou_val in enumerate(ious) if iou_val < seuil_iou]
        indices_tries = indices_tries[indices_a_garder]
    
    return boites_gardees

# Simuler 3 détections redondantes pour le même objet + 1 détection distincte
boites_candidates = [
    (10, 10, 50, 50),    # détection 1 de l'objet A
    (12, 12, 52, 52),    # détection 2 de l'objet A (très proche de la 1)
    (11, 9, 49, 51),     # détection 3 de l'objet A (très proche aussi)
    (100, 100, 140, 140) # objet B, complètement différent
]
scores_confiance = [0.9, 0.75, 0.6, 0.85]

indices_conserves = non_max_suppression(boites_candidates, scores_confiance, seuil_iou=0.5)
print(f"\nBoîtes conservées après NMS : {indices_conserves}")
print("(Les 3 détections redondantes de l'objet A devraient se réduire à 1 seule)")

# ─────────────────────────────────────────────
# 3. UTILISER YOLO AVEC ULTRALYTICS (rappel du fichier de base)
# ─────────────────────────────────────────────

from ultralytics import YOLO

modele_yolo = YOLO("yolov8n.pt")   # version nano, rapide

resultats = modele_yolo.predict(source="image_rue.jpg", conf=0.5)

for boite in resultats[0].boxes:
    classe = modele_yolo.names[int(boite.cls)]
    confiance = float(boite.conf)
    coords = boite.xyxy[0].tolist()
    print(f"Détecté : {classe} (confiance: {confiance:.2%}) à {coords}")

# Afficher l'image annotée
resultats[0].show()

# ─────────────────────────────────────────────
# 4. DÉTECTION EN TEMPS RÉEL SUR VIDÉO/WEBCAM
# ─────────────────────────────────────────────

# resultats_video = modele_yolo.predict(source=0, stream=True, show=True)
# for r in resultats_video:
#     pass  # chaque frame est traitée et affichée en temps réel
```

---

## 🏋️ EXERCICES — CHAPITRE 7.2

### Exercice 7.2.A — Calculer un IoU à la main

Boîte réelle : `(0, 0, 8, 8)`. Boîte prédite : `(4, 4, 12, 12)`. Calcule l'IoU à la main, étape par étape.

<details>
<summary>👉 Solution</summary>

```
Intersection : de (4,4) à (8,8)
Largeur intersection = 8-4 = 4, Hauteur intersection = 8-4 = 4
Aire intersection = 4×4 = 16

Aire boîte réelle = 8×8 = 64
Aire boîte prédite = 8×8 = 64

Union = 64 + 64 - 16 = 112

IoU = 16 / 112 ≈ 0.143
```

```python
print(calculer_iou((0,0,8,8), (4,4,12,12)))  # ≈ 0.143
```
</details>

### Exercice 7.2.B — Pourquoi le Non-Max Suppression est-il nécessaire ?

Explique, avec tes propres mots, ce qui se passerait visuellement sur une image si on affichait TOUTES les bounding boxes prédites par un modèle de détection, sans appliquer de Non-Max Suppression.

<details>
<summary>👉 Solution</summary>

Sans NMS, un seul objet réel dans l'image (par exemple, une voiture) serait probablement entouré de **plusieurs bounding boxes redondantes**, se chevauchant fortement, chacune avec un score de confiance légèrement différent — le modèle génère naturellement plusieurs "candidates" proches autour d'un même objet plutôt qu'une seule prédiction unique et propre. Visuellement, l'image finale afficherait un enchevêtrement confus de rectangles superposés autour de chaque objet réel, rendant le résultat difficile à interpréter et peu utilisable en pratique — c'est précisément pour éviter ce problème que le NMS élimine automatiquement ces doublons, ne conservant qu'une seule détection propre par objet réel.
</details>

### Exercice 7.2.C — Classification, Régression, ou les deux ?

Explique pourquoi la détection d'objets combine à la fois de la classification (Module 3, chapitre 3.3) et de la régression (Module 3, chapitre 3.2), en identifiant précisément quelle partie de la prédiction relève de chaque type.

<details>
<summary>👉 Solution</summary>

```
CLASSIFICATION : prédire la CATÉGORIE de l'objet détecté (chat, chien,
voiture...) — une variable discrète parmi un ensemble fini de classes,
exactement comme au Module 3, chapitre 3.3

RÉGRESSION : prédire les 4 COORDONNÉES numériques continues de la
bounding box (x_min, y_min, x_max, y_max, ou équivalent) — des
valeurs numériques continues, exactement comme une prédiction de
régression au Module 3, chapitre 3.2
```

Un modèle de détection d'objets doit donc optimiser simultanément DEUX fonctions de coût différentes (rappel Module 2, chapitre 2.4.1) : une fonction de coût de classification (souvent Cross-Entropy, rappel Module 4, chapitre 4.2) pour la catégorie, et une fonction de coût de régression (souvent MSE ou une variante) pour les coordonnées de la boîte — ces deux pertes sont généralement combinées (additionnées, parfois pondérées) en une seule fonction de coût globale à minimiser.
</details>

### Exercice 7.2.D — YOLO en une seule passe vs approches en deux étapes

Explique le principal compromis (avantage/inconvénient) de l'approche "une seule passe" de YOLO par rapport aux approches historiques en deux étapes (comme R-CNN).

<details>
<summary>👉 Solution</summary>

L'approche "une seule passe" de YOLO offre une **vitesse d'inférence considérablement plus élevée**, puisque toutes les prédictions (présence d'objet, classe, coordonnées) sont générées en un seul passage à travers le réseau, contrairement aux approches en deux étapes qui nécessitent d'abord de proposer des régions candidates, puis de les classifier séparément — un processus plus lent avec plusieurs passages successifs. Ce gain de vitesse a néanmoins un coût : YOLO peut être **légèrement moins précis** que les meilleures approches en deux étapes sur certains cas complexes (objets très petits, très proches les uns des autres, ou fortement superposés), car il dispose de moins d'étapes de raffinement successif de ses prédictions. Ce compromis vitesse/précision rend YOLO particulièrement adapté aux applications nécessitant du **temps réel** (vidéo en direct, systèmes embarqués), où la rapidité est souvent plus critique qu'un gain marginal de précision.
</details>

---

---

# 📘 CHAPITRE 7.3 — SEGMENTATION SÉMANTIQUE ET D'INSTANCE

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### Rappel et Progression : de la Boîte au Pixel

Rappelle-toi la progression naturelle des tâches de vision par ordinateur :

```
🔑 Classification (Chapitre 7.1)  : "C'est un chat" (1 label pour toute l'image)
🔑 Détection (Chapitre 7.2)        : "Il y a un chat À CETTE BOÎTE APPROXIMATIVE"
🔑 Segmentation (ce chapitre)       : "CES PIXELS EXACTS appartiennent au chat"
```

La segmentation pousse la précision spatiale à son maximum : au lieu d'un simple rectangle englobant approximatif, on détermine, **pixel par pixel**, quelle catégorie (ou quel objet précis) chaque pixel de l'image représente.

---

### Segmentation Sémantique vs Segmentation d'Instance

**🔑 Intuition — une distinction cruciale**

```
🔑 SEGMENTATION SÉMANTIQUE :
   Chaque pixel reçoit une CATÉGORIE, sans distinguer les objets
   individuels de la même catégorie.
   Exemple : dans une photo de rue avec 3 voitures, TOUS les pixels
   de voitures reçoivent l'étiquette "voiture" — impossible de savoir
   où commence et où finit chaque voiture individuellement.

🔑 SEGMENTATION D'INSTANCE :
   Chaque pixel reçoit à la fois une CATÉGORIE ET un IDENTIFIANT
   D'INSTANCE spécifique.
   Exemple : les 3 voitures de la même photo seraient distinguées
   comme "voiture #1", "voiture #2", "voiture #3", chacune avec
   son propre ensemble de pixels précisément délimité.
```

La segmentation d'instance combine donc les forces de la détection (Chapitre 7.2 : distinguer des objets individuels) et de la segmentation sémantique (précision au pixel près) — c'est la tâche la plus riche en information, mais aussi la plus complexe à réaliser.

---

### U-Net : l'Architecture Encoder-Decoder pour la Segmentation

**🔑 Intuition — rappel direct du Module 5 et du Module 6 !**

Rappelle-toi le Module 5, chapitre 5.3 : une architecture **Encoder-Decoder** comprend d'abord une entrée dans son intégralité (Encoder), puis génère une sortie structurée à partir de cette compréhension (Decoder). Rappelle-toi également le Module 6, chapitre 6.4 : l'architecture **U-Net** est précisément celle utilisée au cœur des modèles de diffusion pour prédire le bruit à retirer d'une image !

**U-Net applique ce même principe Encoder-Decoder à la tâche de segmentation :**

```
🔑 Architecture U-Net (nommée ainsi pour sa forme en "U") :

ENCODER (comme un CNN classique, Module 4, chapitre 4.4) :
   → Réduit progressivement la résolution spatiale de l'image
     (via des convolutions + pooling), tout en augmentant le
     nombre de canaux — extrait des caractéristiques de plus en
     plus abstraites, comme dans n'importe quel CNN

DECODER (l'inverse du processus) :
   → Ré-augmente PROGRESSIVEMENT la résolution spatiale (via des
     convolutions transposées, l'opération inverse du pooling),
     jusqu'à retrouver la résolution originale de l'image d'entrée
   → À CHAQUE étape, une "connexion en U" transmet directement
     des informations spatiales précises de l'Encoder (à la même
     résolution) vers le Decoder, préservant les détails fins
     perdus pendant la compression de l'Encoder
```

```
Image d'entrée (haute résolution)
    │ Encoder (compression progressive)
    ▼
Représentation compressée (basse résolution, riche en information sémantique)
    │ Decoder (décompression progressive)
    ▼
Masque de segmentation en SORTIE (même résolution que l'entrée !
                                    un label par PIXEL)
```

**💡 Pourquoi les connexions "en U" sont-elles cruciales ?** Sans elles, le Decoder devrait reconstruire une image en haute résolution **uniquement** à partir de la représentation très compressée produite par l'Encoder — une tâche très difficile, car beaucoup de détails spatiaux fins (les contours précis d'un objet, par exemple) sont naturellement perdus pendant la compression. Les connexions directes de l'Encoder vers le Decoder (à des résolutions correspondantes) permettent de **récupérer** ces détails fins perdus, produisant des masques de segmentation beaucoup plus précis.

---

### SAM (Segment Anything Model) : la Segmentation Universelle Moderne

**🔑 Intuition**

Les modèles de segmentation classiques (comme un U-Net entraîné spécifiquement) doivent être **entraînés sur des catégories prédéfinies** — un modèle entraîné pour segmenter des voitures ne saura pas segmenter des chats. **SAM** (Segment Anything Model, publié par Meta) représente une avancée majeure : entraîné sur des millions d'images et de masques, il peut segmenter **n'importe quel objet**, même totalement nouveau, à partir d'un simple indice minimal fourni par l'utilisateur (un point cliqué sur l'objet, ou une bounding box approximative) — un peu comme les LLMs (Module 5) qui généralisent à des tâches jamais explicitement vues pendant l'entraînement, grâce à l'immense échelle et diversité de leurs données d'entraînement.

---

## 💻 MISE EN PRATIQUE

```python
import torch
import torch.nn as nn
import matplotlib.pyplot as plt
import numpy as np

# ─────────────────────────────────────────────
# 1. IMPLÉMENTER UN U-NET SIMPLIFIÉ (rappel Module 4 : Conv2d, MaxPool2d)
# ─────────────────────────────────────────────

class BlocConvolution(nn.Module):
    """Un bloc de 2 convolutions, réutilisé dans l'Encoder et le Decoder."""
    def __init__(self, in_canaux, out_canaux):
        super().__init__()
        self.bloc = nn.Sequential(
            nn.Conv2d(in_canaux, out_canaux, 3, padding=1),
            nn.BatchNorm2d(out_canaux),   # rappel Module 4, chapitre 4.3
            nn.ReLU(inplace=True),
            nn.Conv2d(out_canaux, out_canaux, 3, padding=1),
            nn.BatchNorm2d(out_canaux),
            nn.ReLU(inplace=True),
        )
    def forward(self, x):
        return self.bloc(x)

class UNetSimplifie(nn.Module):
    def __init__(self, n_classes=2):
        super().__init__()
        # ENCODER
        self.enc1 = BlocConvolution(3, 64)
        self.enc2 = BlocConvolution(64, 128)
        self.pool = nn.MaxPool2d(2)
        
        # GOULOT D'ÉTRANGLEMENT (le point le plus "compressé")
        self.goulot = BlocConvolution(128, 256)
        
        # DECODER
        self.upconv2 = nn.ConvTranspose2d(256, 128, kernel_size=2, stride=2)
        self.dec2 = BlocConvolution(256, 128)   # 256 = 128 (upconv) + 128 (connexion en U)
        self.upconv1 = nn.ConvTranspose2d(128, 64, kernel_size=2, stride=2)
        self.dec1 = BlocConvolution(128, 64)    # 128 = 64 (upconv) + 64 (connexion en U)
        
        self.sortie_finale = nn.Conv2d(64, n_classes, kernel_size=1)
    
    def forward(self, x):
        # Encoder — on GARDE les sorties intermédiaires pour les connexions en U
        e1 = self.enc1(x)
        e2 = self.enc2(self.pool(e1))
        
        # Goulot d'étranglement
        g = self.goulot(self.pool(e2))
        
        # Decoder — CONNEXIONS EN U : concaténer avec les sorties de l'Encoder
        d2 = self.upconv2(g)
        d2 = torch.cat([d2, e2], dim=1)         # LA CONNEXION EN U — le cœur de U-Net
        d2 = self.dec2(d2)
        
        d1 = self.upconv1(d2)
        d1 = torch.cat([d1, e1], dim=1)         # LA CONNEXION EN U
        d1 = self.dec1(d1)
        
        return self.sortie_finale(d1)           # un score par classe, POUR CHAQUE PIXEL

modele_unet = UNetSimplifie(n_classes=2)   # ex: fond vs objet
image_test = torch.rand(1, 3, 128, 128)
masque_predit = modele_unet(image_test)

print(f"Forme de l'image d'entrée : {image_test.shape}")
print(f"Forme du masque prédit    : {masque_predit.shape}")
print("(Remarque : même résolution spatiale 128×128 en sortie qu'en entrée !")
print(" mais avec 2 canaux — un score par classe, pour chaque pixel)")

# ─────────────────────────────────────────────
# 2. VISUALISER UN MASQUE DE SEGMENTATION
# ─────────────────────────────────────────────

masque_final = torch.argmax(masque_predit, dim=1)[0]   # rappel Module 3 : classe la plus probable

fig, axes = plt.subplots(1, 2, figsize=(10, 5))
axes[0].imshow(image_test[0].permute(1, 2, 0))
axes[0].set_title("Image d'entrée")
axes[1].imshow(masque_final, cmap="viridis")
axes[1].set_title("Masque de Segmentation Prédit\n(1 label par pixel)")
plt.tight_layout()
plt.show()

# ─────────────────────────────────────────────
# 3. UTILISER SAM (SEGMENT ANYTHING MODEL)
# ─────────────────────────────────────────────

from segment_anything import sam_model_registry, SamPredictor

sam = sam_model_registry["vit_b"](checkpoint="sam_vit_b.pth")
predicteur = SamPredictor(sam)

import cv2
image = cv2.imread("photo_exemple.jpg")
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
predicteur.set_image(image)

# Segmenter à partir d'un simple point cliqué sur l'objet souhaité
point_indice = np.array([[300, 200]])   # coordonnées (x, y) sur l'objet à segmenter
label_point = np.array([1])              # 1 = point positif (appartient à l'objet)

masques, scores, _ = predicteur.predict(
    point_coords=point_indice,
    point_labels=label_point,
    multimask_output=True   # SAM propose plusieurs interprétations possibles
)

print(f"\n{len(masques)} masques proposés par SAM, scores : {np.round(scores, 3)}")
```

---

## 🏋️ EXERCICES — CHAPITRE 7.3

### Exercice 7.3.A — Sémantique ou Instance ?

Pour chacun des besoins suivants, indique s'il nécessite une segmentation sémantique ou une segmentation d'instance :

1. Déterminer la superficie totale occupée par de la végétation sur une image satellite (peu importe de distinguer chaque arbre individuellement)
2. Compter précisément le nombre de personnes présentes sur une photo de foule, en délimitant chacune séparément
3. Séparer, dans une image médicale, les pixels correspondant à "tissu sain" de ceux correspondant à "tumeur" (sans distinguer plusieurs tumeurs individuelles)

<details>
<summary>👉 Solution</summary>

```
1. SEGMENTATION SÉMANTIQUE — seule la catégorie globale "végétation"
   importe, sans besoin de distinguer chaque plante individuellement

2. SEGMENTATION D'INSTANCE — nécessite explicitement de distinguer
   chaque personne INDIVIDUELLEMENT pour pouvoir les compter séparément

3. SEGMENTATION SÉMANTIQUE — seules les catégories globales "tissu
   sain" vs "tumeur" importent ici, sans besoin de distinguer
   plusieurs tumeurs individuelles les unes des autres
```
</details>

### Exercice 7.3.B — Le rôle des connexions en U

Explique pourquoi, sans les connexions "en U" reliant l'Encoder au Decoder, un U-Net produirait probablement des masques de segmentation aux contours flous et imprécis, en te basant sur l'intuition de ce chapitre.

<details>
<summary>👉 Solution</summary>

Sans les connexions en U, le Decoder devrait reconstruire un masque de segmentation en haute résolution **uniquement** à partir de la représentation très compressée produite au goulot d'étranglement de l'Encoder — une représentation riche en information sémantique globale ("il y a un chat dans cette zone approximative") mais qui a naturellement perdu beaucoup de détails spatiaux fins pendant la compression progressive (les contours précis, les petites textures). Les connexions en U transmettent directement, depuis l'Encoder vers le Decoder, l'information spatiale précise capturée AVANT cette compression, à des résolutions correspondantes — permettant au Decoder de "récupérer" ces détails fins perdus et de produire des contours de segmentation beaucoup plus nets et précis, plutôt que des masques flous et approximatifs.
</details>

### Exercice 7.3.C — Nombre de canaux en sortie

Un U-Net est configuré pour segmenter une image en 5 catégories différentes (route, voiture, piéton, bâtiment, ciel). Combien de canaux devrait avoir la couche de sortie finale du réseau, et pourquoi (rappel Module 3, chapitre 3.3 : classification multi-classe) ?

<details>
<summary>👉 Solution</summary>

La couche de sortie finale devrait avoir **5 canaux**, un par catégorie possible — exactement comme une couche de sortie Softmax pour une classification multi-classe (Module 3, chapitre 3.3 ; Module 4, chapitre 4.2), mais appliquée ici **indépendamment à chaque pixel** de l'image plutôt qu'une seule fois pour l'image entière. Pour chaque pixel, ces 5 valeurs représentent les scores (ou probabilités, après Softmax) associés à chacune des 5 catégories possibles, et la catégorie finale attribuée à ce pixel correspond à celle ayant le score le plus élevé (rappel : `torch.argmax`, utilisé dans le code de ce chapitre).
</details>

### Exercice 7.3.D — SAM et la généralisation

Explique le parallèle établi dans ce chapitre entre SAM (Segment Anything Model) et les LLMs du Module 5, concernant leur capacité à généraliser à des tâches ou objets jamais explicitement vus pendant l'entraînement.

<details>
<summary>👉 Solution</symmary>

Les modèles de segmentation classiques sont entraînés sur un ensemble **fixe et limité** de catégories prédéfinies (par exemple, uniquement "voiture", "piéton", "route"), et ne peuvent segmenter correctement que ces catégories spécifiques — un peu comme un modèle de Machine Learning classique (Module 3) entraîné sur un jeu de données limité et spécifique. SAM, à l'inverse, a été entraîné sur une échelle et une diversité de données absolument massives (millions d'images et de masques), lui permettant de développer une compréhension suffisamment générale de "ce qu'est un objet cohérent dans une image" pour pouvoir segmenter **n'importe quel objet**, même totalement inédit, à partir d'un simple indice minimal — exactement le même phénomène de généralisation par l'échelle observé chez les LLMs (Module 5), qui développent des capacités de raisonnement général applicables à des tâches jamais explicitement vues, simplement grâce à l'immense échelle et diversité de leur corpus d'entraînement.
</details>

---

---

# 📘 CHAPITRE 7.4 — RECONNAISSANCE FACIALE ET ESTIMATION DE POSE

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### Rappel : Détection de Visage vs Reconnaissance de Visage — une Confusion Fréquente

**🔑 Intuition — deux tâches très différentes**

```
🔑 DÉTECTION de visage : "Y a-t-il un visage dans cette image, et où ?"
   → C'est un cas particulier de DÉTECTION D'OBJETS (Chapitre 7.2),
     où la seule "classe" recherchée est "visage"

🔑 RECONNAISSANCE de visage : "Ce visage détecté correspond-il à
   TELLE personne spécifique, parmi une base de personnes connues ?"
   → Une tâche fondamentalement DIFFÉRENTE, qui nécessite de
     comparer des visages entre eux, pas simplement de les localiser
```

Un système de reconnaissance faciale complet enchaîne donc typiquement ces deux étapes : d'abord **détecter** où se trouve un visage dans l'image (Chapitre 7.2), puis **reconnaître** à qui appartient ce visage détecté (ce chapitre).

---

### Les Embeddings de Visages : rappel direct du Module 5

**🔑 Intuition**

Rappelle-toi le Module 5, chapitre 5.2 : un embedding transforme une entrée complexe (un mot) en un vecteur numérique, où la **proximité dans l'espace vectoriel reflète la similarité sémantique**. La reconnaissance faciale applique exactement ce même principe aux visages : un réseau de neurones (typiquement un CNN, Module 4) transforme chaque visage en un **vecteur d'embedding**, généralement de 128 à 512 dimensions, avec la propriété remarquable suivante :

```
🔑 Propriété recherchée pour les embeddings de visages :

Deux photos DE LA MÊME PERSONNE (même sous des angles ou éclairages
différents) doivent produire des embeddings PROCHES dans l'espace
vectoriel (mesurable par la distance euclidienne ou la similarité
cosinus, rappel Module 2, chapitre 2.1.3).

Deux photos de PERSONNES DIFFÉRENTES doivent produire des embeddings
ÉLOIGNÉS.
```

**💡 Pourquoi cette approche par embedding, plutôt qu'une simple classification ?** Une classification classique (Module 3, chapitre 3.3) nécessiterait de connaître **à l'avance** toutes les personnes possibles à reconnaître (une classe fixe par personne) — totalement impraticable pour un système qui doit reconnaître de nouvelles personnes sans être ré-entraîné à chaque fois. Avec l'approche par embedding, on peut ajouter une **nouvelle personne** à reconnaître simplement en calculant l'embedding de quelques-unes de ses photos, sans jamais avoir besoin de ré-entraîner le réseau — le réseau a appris, une fois pour toutes, à produire de "bons" embeddings pour n'importe quel visage, connu ou non.

---

### Le Triplet Loss : Comment Entraîner un Réseau à Produire de Bons Embeddings

**🔑 Intuition — trois photos à la fois**

Comment entraîner un réseau pour qu'il produise cette propriété désirée (visages proches pour la même personne, éloignés pour des personnes différentes) ? La technique la plus utilisée s'appelle le **Triplet Loss**, et elle repose sur une idée élégante : entraîner le réseau avec des **triplets** de photos à chaque exemple :

```
🔑 Un triplet d'entraînement :

ANCRE (Anchor)    : une photo de référence d'une personne A
POSITIF (Positive) : une AUTRE photo de la MÊME personne A
NÉGATIF (Negative) : une photo d'une personne DIFFÉRENTE B
```

**L'objectif d'entraînement** : ajuster les poids du réseau pour que la distance entre l'embedding de l'Ancre et celui du Positif soit **petite**, tandis que la distance entre l'embedding de l'Ancre et celui du Négatif soit **grande** — idéalement, avec une marge de sécurité minimale entre les deux.

```
🔑 Formule intuitive du Triplet Loss :

Loss = max(0, distance(Ancre, Positif) - distance(Ancre, Négatif) + marge)

Si distance(Ancre, Positif) est déjà BEAUCOUP plus petite que
distance(Ancre, Négatif) (au moins de la marge), la perte est nulle
(le réseau a déjà bien réussi ce triplet, rien à corriger).

Sinon, la perte est POSITIVE, et le gradient (rappel Module 2)
pousse le réseau à rapprocher l'Ancre du Positif et à éloigner
l'Ancre du Négatif, pour ce triplet précis.
```

**💡 Pourquoi cette approche fonctionne-t-elle si bien ?** En répétant cet entraînement sur des millions de triplets différents, couvrant énormément de visages et de variations (angle, éclairage, expression), le réseau apprend progressivement une représentation générale et robuste — capable de bien fonctionner même sur des visages **jamais vus** pendant l'entraînement, exactement comme les embeddings de mots du Module 5 capturent des relations sémantiques généralisables au-delà des exemples précis vus pendant l'entraînement.

---

### L'Estimation de Pose : Prédire des Points-Clés (Keypoints)

**🔑 Intuition**

L'estimation de pose consiste à identifier automatiquement la position de **points-clés anatomiques précis** sur un corps (ou un visage) — par exemple, la position des épaules, des coudes, des genoux, ou pour un visage, la position des yeux, du nez, des coins de la bouche.

**🔑 Techniquement, comment le réseau prédit-il ces points ?** C'est, une fois encore, un problème de **régression** (rappel Module 3, chapitre 3.2) : pour chaque point-clé recherché (par exemple, "coude gauche"), le réseau prédit directement ses **coordonnées numériques** `(x, y)` dans l'image — exactement le même principe que la prédiction des coordonnées d'une bounding box en détection (Chapitre 7.2), mais appliqué à des points précis plutôt qu'à des rectangles englobants.

```
🔑 Sortie typique d'un modèle d'estimation de pose :

Pour CHAQUE point-clé recherché (ex: 17 points-clés du corps humain
dans une convention courante) :
   → coordonnée x
   → coordonnée y
   → un score de confiance (le point est-il visible/fiable ?)

Résultat total : 17 × 3 = 51 valeurs numériques prédites pour une
personne entière, résumant l'intégralité de sa posture
```

**💡 Applications concrètes :** l'analyse de mouvements sportifs, les filtres de réalité augmentée qui suivent le visage ou le corps en temps réel, l'analyse ergonomique de postures au travail, ou encore les interfaces de contrôle gestuel — toutes ces applications reposent sur cette capacité à traduire une image en un ensemble structuré de coordonnées anatomiques précises.

---

## 💻 MISE EN PRATIQUE

```python
import numpy as np
import torch
import torch.nn as nn
import matplotlib.pyplot as plt

# ─────────────────────────────────────────────
# 1. IMPLÉMENTER LE TRIPLET LOSS FROM SCRATCH
# ─────────────────────────────────────────────

def triplet_loss(embedding_ancre, embedding_positif, embedding_negatif, marge=0.5):
    """Implémente exactement la formule du chapitre."""
    distance_positive = torch.norm(embedding_ancre - embedding_positif, dim=-1)  # rappel Module 2
    distance_negative = torch.norm(embedding_ancre - embedding_negatif, dim=-1)
    perte = torch.clamp(distance_positive - distance_negative + marge, min=0)
    return perte.mean()

# Simulation : embeddings de 3 photos (dimension réduite pour l'exemple)
embedding_ancre = torch.tensor([[0.8, 0.6, 0.1]])      # Photo 1 de la personne A
embedding_positif = torch.tensor([[0.75, 0.65, 0.15]]) # Photo 2 de la MÊME personne A
embedding_negatif = torch.tensor([[0.1, 0.2, 0.9]])    # Photo d'une personne B différente

perte = triplet_loss(embedding_ancre, embedding_positif, embedding_negatif)
print(f"Triplet Loss : {perte.item():.4f}")
print("(Une perte proche de 0 confirme que ces embeddings sont déjà bien organisés :")
print(" l'Ancre est plus proche du Positif que du Négatif, avec une marge suffisante)")

# ─────────────────────────────────────────────
# 2. UTILISER FACE_RECOGNITION (bibliothèque basée sur ces principes)
# ─────────────────────────────────────────────

import face_recognition

image_connue = face_recognition.load_image_file("nasreddine_photo1.jpg")
encodage_connu = face_recognition.face_encodings(image_connue)[0]   # l'embedding, 128 dimensions

image_a_verifier = face_recognition.load_image_file("photo_inconnue.jpg")
encodages_a_verifier = face_recognition.face_encodings(image_a_verifier)

for encodage in encodages_a_verifier:
    # Comparer via une distance (rappel Module 2, chapitre 2.1.2 : la norme)
    distance = np.linalg.norm(encodage_connu - encodage)
    correspond = distance < 0.6   # seuil typique de décision
    print(f"Distance à la personne connue : {distance:.3f} → Correspond : {correspond}")

# ─────────────────────────────────────────────
# 3. ESTIMATION DE POSE AVEC MEDIAPIPE
# ─────────────────────────────────────────────

import mediapipe as mp
import cv2

mp_pose = mp.solutions.pose
detecteur_pose = mp_pose.Pose(static_image_mode=True)

image = cv2.imread("photo_sportif.jpg")
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
resultats_pose = detecteur_pose.process(image_rgb)

if resultats_pose.pose_landmarks:
    for i, point_cle in enumerate(resultats_pose.pose_landmarks.landmark):
        print(f"Point-clé {i}: x={point_cle.x:.3f}, y={point_cle.y:.3f}, "
              f"confiance={point_cle.visibility:.2%}")

# Visualiser les points-clés détectés
mp_drawing = mp.solutions.drawing_utils
image_annotee = image_rgb.copy()
mp_drawing.draw_landmarks(image_annotee, resultats_pose.pose_landmarks, mp_pose.POSE_CONNECTIONS)

plt.figure(figsize=(8, 10))
plt.imshow(image_annotee)
plt.title("Estimation de Pose — Points-Clés Détectés")
plt.axis("off")
plt.show()
```

---

## 🏋️ EXERCICES — CHAPITRE 7.4

### Exercice 7.4.A — Détection vs Reconnaissance de visage

Un système affiche "Visage détecté à la position (120, 80)" puis, séparément, "Ce visage correspond à 87% à Nasreddine". Identifie quelle partie du système relève de la détection de visage, et laquelle relève de la reconnaissance de visage.

<details>
<summary>👉 Solution</summary>

```
"Visage détecté à la position (120, 80)" → DÉTECTION de visage
(cas particulier de détection d'objets, Chapitre 7.2 : localiser
OÙ se trouve un visage dans l'image, sans identifier À QUI il appartient)

"Ce visage correspond à 87% à Nasreddine" → RECONNAISSANCE de visage
(comparaison de l'embedding du visage détecté avec un embedding de
référence connu, pour déterminer l'identité de la personne)
```
</details>

### Exercice 7.4.B — Calculer un Triplet Loss à la main

Avec `marge = 0.3`, `distance(Ancre, Positif) = 0.2`, et `distance(Ancre, Négatif) = 0.6`, calcule le Triplet Loss à la main. Le réseau a-t-il encore besoin d'être ajusté pour ce triplet ?

<details>
<summary>👉 Solution</summary>

```
Loss = max(0, distance_positive - distance_negative + marge)
     = max(0, 0.2 - 0.6 + 0.3)
     = max(0, -0.1)
     = 0
```

La perte est **nulle** — le réseau a déjà correctement organisé ces embeddings pour ce triplet spécifique : la distance entre l'Ancre et le Positif (0.2) est bien inférieure à la distance entre l'Ancre et le Négatif (0.6), avec une marge de sécurité largement suffisante (0.4 de différence, supérieure à la marge exigée de 0.3). Aucun ajustement supplémentaire du gradient n'est nécessaire pour ce triplet précis — le réseau continuerait néanmoins à être entraîné sur d'autres triplets, potentiellement plus difficiles.
</details>

### Exercice 7.4.C — Pourquoi les embeddings plutôt que la classification classique ?

Explique pourquoi une approche de classification classique (Module 3, chapitre 3.3) serait mal adaptée pour un système de reconnaissance faciale destiné à une application grand public (comme déverrouiller un smartphone), en te référant à l'intuition de ce chapitre.

<details>
<summary>👉 Solution</summary>

Une approche de classification classique nécessiterait de définir, **avant l'entraînement**, un ensemble fixe de classes correspondant à chaque personne à reconnaître (une classe = une personne). Cela poserait un problème pratique majeur : chaque fois qu'un nouvel utilisateur souhaite enregistrer son visage sur son smartphone, il faudrait **ré-entraîner entièrement le modèle** pour ajouter cette nouvelle classe — totalement impraticable pour un déploiement à grande échelle avec des millions d'utilisateurs différents, chacun avec son propre visage à reconnaître. L'approche par embedding résout élégamment ce problème : le réseau, une fois entraîné (via le Triplet Loss) à produire de "bons" embeddings généralisables, peut reconnaître un **nouveau** visage simplement en calculant son embedding et en le comparant à celui déjà enregistré pour cet utilisateur — sans jamais avoir besoin d'être ré-entraîné pour chaque nouvel utilisateur.
</details>

### Exercice 7.4.D — Estimation de pose comme problème de régression

Explique pourquoi l'estimation de pose est un problème de RÉGRESSION plutôt que de classification, en te référant explicitement au Module 3, chapitre 3.2.

<details>
<summary>👉 Solution</summary>

L'estimation de pose prédit, pour chaque point-clé anatomique recherché, des **coordonnées numériques continues** `(x, y)` dans l'image — par exemple, "le coude gauche se trouve précisément aux coordonnées (245.7, 130.2)". Ces valeurs peuvent prendre n'importe quelle valeur numérique dans une plage continue, exactement comme prédire un prix de maison ou une température (Module 3, chapitre 3.2 : régression), plutôt que de choisir parmi un ensemble fini et discret de catégories (comme "chat" ou "chien" en classification, Module 3, chapitre 3.3). C'est cette nature continue de la sortie prédite (des coordonnées précises) qui classe l'estimation de pose dans la famille des problèmes de régression, même si elle est souvent combinée à une composante de classification (par exemple, prédire si un point-clé est visible ou non dans l'image).
</details>

---

---

# 📘 CHAPITRE 7.5 — OCR : LIRE DU TEXTE DANS LES IMAGES

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Le Pipeline OCR en Deux Étapes

**🔑 Intuition**

L'OCR (Optical Character Recognition — reconnaissance optique de caractères) transforme du texte présent dans une image (une photo de document, un panneau, une facture scannée) en texte numérique exploitable. Ce processus combine typiquement **deux étapes distinctes**, chacune s'appuyant sur des notions déjà vues dans ce module :

```
🔑 ÉTAPE 1 — DÉTECTION DE TEXTE :
   Localiser OÙ se trouvent des zones de texte dans l'image
   → Exactement un cas particulier de DÉTECTION D'OBJETS (Chapitre 7.2),
     où la "classe" recherchée est "présence de texte", produisant
     des bounding boxes autour de chaque ligne ou mot détecté

🔑 ÉTAPE 2 — RECONNAISSANCE DE CARACTÈRES :
   Pour CHAQUE zone de texte détectée à l'étape 1, identifier
   précisément QUELS caractères/mots elle contient
   → Un problème qui combine vision (Module 4) ET langage (Module 5) :
     l'image de chaque zone de texte est transformée en une séquence
     de caractères ou de tokens
```

---

### Le Pont entre Vision et Langage

**🔑 Intuition — pourquoi l'OCR moderne s'appuie aussi sur le Module 5**

Les systèmes OCR modernes ne se contentent pas de reconnaître des caractères isolés, indépendamment les uns des autres — ils exploitent également le **contexte linguistique** pour améliorer leur précision, exactement comme un LLM prédit un mot en tenant compte du contexte (Module 5, chapitre 5.4).

```
🔑 Exemple concret : si le système hésite entre lire "0" (zéro) ou
   "O" (la lettre), le contexte linguistique environnant peut lever
   l'ambiguïté — dans "le mot BONJOUR", la lettre "O" est bien plus
   probable qu'un chiffre "0" au milieu d'un mot reconnu, une
   information que le modèle peut exploiter pour corriger ses erreurs
   de reconnaissance visuelle pure.
```

**💡 L'OCR moderne combine ainsi typiquement :** une architecture de type CNN (Module 4) pour extraire les caractéristiques visuelles des caractères, souvent combinée à un composant séquentiel (rappel Module 4, chapitre 4.6 : RNN/LSTM, ou plus récemment des Transformers, Module 5) pour tenir compte du contexte et de l'ordre des caractères dans un mot ou une phrase, améliorant significativement la précision par rapport à une reconnaissance purement caractère par caractère et indépendante.

---

### Les Défis Spécifiques de l'OCR

**🔑 Intuition**

L'OCR reste une tâche difficile en pratique, à cause de nombreuses sources de variabilité :

```
🔑 Défis courants de l'OCR :

- ANGLE ET PERSPECTIVE : texte photographié de travers, incliné
- POLICES DE CARACTÈRES : immense diversité de styles typographiques
- QUALITÉ D'IMAGE : flou, faible résolution, mauvais éclairage
- ARRIÈRE-PLAN COMPLEXE : texte sur fond texturé ou peu contrasté
- ÉCRITURE MANUSCRITE : bien plus variable qu'un texte imprimé
- LANGUES ET CARACTÈRES SPÉCIAUX : accents, alphabets non-latins
```

**💡 Pourquoi la Data Augmentation (Chapitre 7.1) est particulièrement précieuse pour l'OCR :** entraîner un modèle OCR robuste nécessite typiquement de l'exposer à d'immenses variations artificielles (rotations, flous, changements de police simulés, variations de contraste) pour qu'il généralise bien aux innombrables conditions réelles qu'il rencontrera en production — exactement le principe déjà détaillé au Chapitre 7.1, appliqué ici à un domaine particulièrement exigeant en termes de robustesse.

---

## 💻 MISE EN PRATIQUE

```python
import easyocr
import pytesseract
from PIL import Image
import cv2
import matplotlib.pyplot as plt

# ─────────────────────────────────────────────
# 1. OCR AVEC EASYOCR (approche moderne, deep learning)
# ─────────────────────────────────────────────

lecteur = easyocr.Reader(["fr", "en"])   # spécifier les langues attendues

resultats = lecteur.readtext("document_scanne.jpg")

for (bbox, texte, confiance) in resultats:
    print(f"Texte détecté : '{texte}' (confiance: {confiance:.2%})")
    print(f"  Position (bounding box, rappel Chapitre 7.2) : {bbox}")

# ─────────────────────────────────────────────
# 2. VISUALISER LES DÉTECTIONS OCR
# ─────────────────────────────────────────────

image = cv2.imread("document_scanne.jpg")
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

for (bbox, texte, confiance) in resultats:
    if confiance > 0.5:
        points = [tuple(map(int, point)) for point in bbox]
        cv2.polylines(image, [np.array(points)], True, (0, 255, 0), 2)
        cv2.putText(image, texte, points[0], cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)

plt.figure(figsize=(12, 8))
plt.imshow(image)
plt.title("Détections OCR — Bounding Boxes et Texte Reconnu")
plt.axis("off")
plt.show()

# ─────────────────────────────────────────────
# 3. COMPARER AVEC TESSERACT (approche plus traditionnelle)
# ─────────────────────────────────────────────

image_pil = Image.open("document_scanne.jpg")
texte_tesseract = pytesseract.image_to_string(image_pil, lang="fra")
print(f"\nTexte extrait par Tesseract :\n{texte_tesseract}")

# ─────────────────────────────────────────────
# 4. PRÉTRAITEMENT D'IMAGE POUR AMÉLIORER LA PRÉCISION OCR
# ─────────────────────────────────────────────

def preparer_image_pour_ocr(chemin_image):
    """Applique des transformations classiques pour améliorer la lisibilité OCR."""
    image = cv2.imread(chemin_image)
    gris = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)               # niveaux de gris
    _, seuil = cv2.threshold(gris, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)  # binarisation
    debruite = cv2.medianBlur(seuil, 3)                            # réduction du bruit
    return debruite

image_preparee = preparer_image_pour_ocr("document_flou.jpg")
plt.imshow(image_preparee, cmap="gray")
plt.title("Image Prétraitée — Optimisée pour l'OCR")
plt.axis("off")
plt.show()

texte_apres_pretraitement = pytesseract.image_to_string(image_preparee, lang="fra")
print(f"\nTexte après prétraitement :\n{texte_apres_pretraitement}")
```

---

## 🏋️ EXERCICES — CHAPITRE 7.5

### Exercice 7.5.A — Identifier les deux étapes du pipeline OCR

Pour la phrase "Le système a d'abord identifié 3 zones rectangulaires contenant potentiellement du texte, puis a déterminé que la première contenait le mot 'FACTURE'", identifie quelle partie relève de l'étape 1 (détection de texte) et quelle partie relève de l'étape 2 (reconnaissance de caractères).

<details>
<summary>👉 Solution</summary>

```
"identifié 3 zones rectangulaires contenant potentiellement du texte"
→ ÉTAPE 1 : DÉTECTION DE TEXTE (localiser OÙ se trouve du texte,
   sans encore savoir ce qu'il contient précisément — exactement
   comme une détection d'objets, Chapitre 7.2, avec "texte" comme classe)

"déterminé que la première contenait le mot 'FACTURE'"
→ ÉTAPE 2 : RECONNAISSANCE DE CARACTÈRES (identifier précisément
   QUELS caractères/mots sont présents dans une zone déjà détectée)
```
</details>

### Exercice 7.5.B — Pourquoi le contexte linguistique aide l'OCR

Explique, avec tes propres mots, comment le contexte linguistique peut aider un système OCR à corriger une ambiguïté visuelle, en donnant un exemple différent de celui du chapitre (par exemple, la confusion entre "1" et "l" minuscule, ou "5" et "S").

<details>
<summary>👉 Solution</symmary>

*(Exemple de réponse)*

Si le système hésite entre lire "5ystème" ou "Système" (confusion visuelle possible entre le chiffre "5" et la lettre "S"), le contexte linguistique peut fortement pencher en faveur de "Système" : ce mot existe dans le vocabulaire de la langue française, tandis que "5ystème" n'a aucun sens linguistique. Un modèle OCR moderne qui intègre une composante de traitement du langage (rappel Module 5) peut exploiter cette information contextuelle — la probabilité qu'un mot reconnu soit un mot valide de la langue, voire cohérent avec les mots environnants — pour corriger cette ambiguïté visuelle purement locale, exactement comme un LLM utilise le contexte pour prédire le mot le plus probable (Module 5, chapitre 5.4), plutôt que de se fier uniquement à l'apparence isolée de chaque caractère.
</details>

### Exercice 7.5.C — Pourquoi la Data Augmentation est cruciale pour l'OCR

En te basant sur le Chapitre 7.1 et les défis de l'OCR présentés dans ce chapitre, propose 3 transformations de Data Augmentation particulièrement pertinentes pour entraîner un modèle OCR robuste, en justifiant chacune.

<details>
<summary>👉 Solution</summary>

```
1. ROTATION LÉGÈRE — simule des documents photographiés légèrement
   de travers ou mal alignés, un défi explicitement mentionné dans
   ce chapitre ("angle et perspective")

2. FLOU GAUSSIEN — simule des photos prises avec une mise au point
   imparfaite ou un léger mouvement, reproduisant le défi de
   "qualité d'image" mentionné dans ce chapitre

3. VARIATION DE CONTRASTE/LUMINOSITÉ — simule des conditions
   d'éclairage variées (documents photographiés dans des conditions
   lumineuses différentes), un facteur de variabilité réelle
   important pour la robustesse du modèle en conditions réelles
```

Ces transformations, appliquées uniquement sur les données d'ENTRAÎNEMENT (rappel Chapitre 7.1, exercice 7.1.B), permettent au modèle de généraliser à la grande variabilité de conditions réelles qu'il rencontrera en production, plutôt que de sur-apprendre sur des images parfaitement nettes et bien alignées qui ne représentent qu'un sous-ensemble idéal des cas réels.
</details>

### Exercice 7.5.D — Pourquoi prétraiter l'image avant l'OCR ?

Explique pourquoi le prétraitement d'image (binarisation, réduction du bruit) présenté dans la Mise en Pratique de ce chapitre peut significativement améliorer les résultats d'un OCR traditionnel comme Tesseract.

<details>
<summary>👉 Solution</summary>

Un système OCR traditionnel comme Tesseract repose fortement sur la détection de contours et de formes de caractères bien définis pour effectuer sa reconnaissance. Une image bruitée, faiblement contrastée, ou en couleurs complexes rend ces contours moins nets et plus difficiles à distinguer précisément du bruit environnant ou de l'arrière-plan. Le prétraitement (conversion en niveaux de gris pour simplifier l'information, binarisation pour créer un contraste net noir/blanc entre texte et fond, réduction du bruit pour éliminer les artéfacts parasites) simplifie considérablement la tâche de reconnaissance en présentant au système une image où les caractères se détachent nettement de leur environnement — améliorant significativement la précision, particulièrement pour les approches plus traditionnelles et moins robustes aux variations que les approches modernes basées sur le deep learning (comme EasyOCR, également présenté dans ce chapitre).
</details>

---

---

# 📘 CHAPITRE 7.6 — DÉPLOYER UN SYSTÈME DE VISION EN PRODUCTION

## Durée : 0.5 semaine

---

## 📖 EXPLICATION

### Le Compromis Vitesse vs Précision en Production

**🔑 Intuition — rappel direct du Chapitre 7.1 et du Chapitre 7.2**

Rappelle-toi le Chapitre 7.1 (EfficientNet) et le Chapitre 7.2 (YOLO "une seule passe") : le choix d'une architecture de vision par ordinateur en production implique presque toujours un compromis entre **vitesse d'inférence** et **précision**. Un modèle plus grand et plus précis est souvent aussi plus lent — un compromis à évaluer selon les contraintes réelles de l'application.

```
🔑 Application nécessitant du TEMPS RÉEL (vidéo en direct, systèmes
   embarqués, applications mobiles) :
   → Privilégier la VITESSE : modèles légers (YOLO nano, EfficientNet-B0,
     rappel Chapitre 7.1) et éventuellement la QUANTIFICATION
     (rappel Module 6, chapitre 6.3) pour réduire encore la charge de calcul

🔑 Application sans contrainte de temps réel (analyse d'images en
   batch, diagnostic médical où chaque seconde supplémentaire est
   acceptable pour un gain de précision) :
   → Privilégier la PRÉCISION : modèles plus grands et plus lents,
     éventuellement des ensembles de plusieurs modèles (rappel
     Module 3, chapitre 3.4)
```

---

### Le Tracking d'Objets : Suivre des Objets d'une Frame à l'Autre

**🔑 Intuition**

Sur une vidéo, appliquer une détection d'objets (Chapitre 7.2) **indépendamment** sur chaque frame présente une limite : le système ne "sait" pas que "la voiture détectée à la frame 10" est **la même voiture** que celle "détectée à la frame 11" — chaque frame est traitée isolément, sans continuité.

Le **tracking d'objets** résout ce problème en associant, entre frames successives, les détections qui correspondent probablement au même objet réel (en se basant sur leur position, leur trajectoire probable, et parfois leur apparence visuelle), attribuant à chaque objet suivi un **identifiant unique et persistant** à travers la vidéo entière.

```
🔑 Cas d'usage nécessitant le tracking :

- Compter le nombre de véhicules DISTINCTS passant sur une route
  (sans compter plusieurs fois le même véhicule sur des frames successives)
- Suivre la trajectoire d'une personne dans un magasin
- Analyser le comportement d'un joueur spécifique sur toute la durée
  d'un match sportif
```

---

## 💻 MISE EN PRATIQUE

```python
from ultralytics import YOLO
import cv2

# ─────────────────────────────────────────────
# 1. COMPARER LA VITESSE DE PLUSIEURS TAILLES DE YOLO
# ─────────────────────────────────────────────

import time

tailles_modeles = ["yolov8n.pt", "yolov8s.pt", "yolov8m.pt"]  # nano, small, medium

for taille in tailles_modeles:
    modele = YOLO(taille)
    debut = time.time()
    resultats = modele.predict(source="image_test.jpg", verbose=False)
    duree = time.time() - debut
    print(f"{taille} : {duree*1000:.1f} ms par image")

# ─────────────────────────────────────────────
# 2. TRACKING D'OBJETS AVEC YOLO (identifiants persistants)
# ─────────────────────────────────────────────

modele_tracking = YOLO("yolov8n.pt")

resultats_video = modele_tracking.track(
    source="video_circulation.mp4",
    persist=True,     # maintenir les identifiants d'objets entre les frames
    tracker="bytetrack.yaml"
)

vehicules_uniques_vus = set()
for frame_resultat in resultats_video:
    if frame_resultat.boxes.id is not None:
        for id_objet in frame_resultat.boxes.id.tolist():
            vehicules_uniques_vus.add(int(id_objet))

print(f"\nNombre TOTAL de véhicules DISTINCTS détectés sur la vidéo : {len(vehicules_uniques_vus)}")
print("(Grâce au tracking, chaque véhicule n'est compté qu'UNE SEULE FOIS,")
print(" même s'il apparaît sur des centaines de frames successives)")

# ─────────────────────────────────────────────
# 3. PIPELINE COMPLET : DÉTECTION + QUANTIFICATION (rappel Module 6.3)
# ─────────────────────────────────────────────

# Exporter le modèle en format optimisé pour un déploiement léger
modele_export = YOLO("yolov8n.pt")
modele_export.export(format="onnx", int8=True)   # quantification INT8, rappel Module 6, chapitre 6.3
print("\n✅ Modèle exporté et quantifié pour un déploiement optimisé (edge/mobile)")
```

---

## 🏋️ EXERCICES — CHAPITRE 7.6

### Exercice 7.6.A — Choisir le bon compromis vitesse/précision

Pour chacun des scénarios suivants, recommande de privilégier la vitesse ou la précision :

1. Un système de comptage de piétons en temps réel pour ajuster dynamiquement des feux de circulation
2. Un système d'analyse d'images satellites pour détecter des changements environnementaux, traité une fois par semaine en différé

<details>
<summary>👉 Solution</summary>

```
1. VITESSE — application en temps réel avec des décisions immédiates
   à prendre (ajuster les feux), un léger retard rendrait le système
   inutile ou dangereux ; privilégier un modèle léger (rappel
   Chapitre 7.1 : EfficientNet-B0, ou YOLO nano, Chapitre 7.2)

2. PRÉCISION — traitement en différé, sans contrainte de temps réel ;
   on peut se permettre des modèles plus lourds et précis, puisque
   chaque analyse dispose de tout le temps nécessaire (jusqu'à la
   semaine suivante) pour être complétée
```
</details>

### Exercice 7.6.B — Pourquoi le tracking est-il nécessaire ?

Explique pourquoi une simple détection d'objets frame par frame (sans tracking) donnerait un résultat incorrect si on cherchait à compter le nombre total de voitures distinctes passées sur une route en une journée.

<details>
<summary>👉 Solution</symmary>

Sans tracking, chaque frame de la vidéo est traitée de façon totalement **indépendante** — le système détecterait "une voiture" sur des centaines de frames successives pendant que cette même voiture traverse le champ de vision de la caméra, sans jamais savoir qu'il s'agit systématiquement du **même** véhicule d'une frame à l'autre. En sommant naïvement le nombre de détections sur toutes les frames, on obtiendrait un nombre absurdement gonflé, comptant potentiellement la même voiture des dizaines ou centaines de fois. Le tracking résout ce problème en attribuant un identifiant persistant à chaque objet suivi à travers les frames successives, permettant de compter correctement le nombre de véhicules **distincts**, en ne comptant chaque identifiant unique qu'une seule fois — exactement le principe illustré dans le code de ce chapitre avec l'ensemble `vehicules_uniques_vus`.
</details>

### Exercice 7.6.C — Combiner les techniques du module

Décris, en une chaîne d'étapes (sans code), comment tu combinerais la détection (Chapitre 7.2), le tracking (ce chapitre), et la quantification (rappel Module 6, chapitre 6.3) pour déployer un système de comptage de personnes en temps réel sur une caméra de sécurité embarquée avec des ressources de calcul limitées.

<details>
<summary>👉 Solution</summary>

```
1. QUANTIFICATION (Module 6, chapitre 6.3) : utiliser une version
   quantifiée (INT8) d'un modèle de détection léger, pour réduire
   la charge de calcul et permettre l'exécution sur du matériel
   embarqué aux ressources limitées

2. DÉTECTION (Chapitre 7.2) : appliquer ce modèle de détection
   léger et quantifié sur chaque frame de la caméra, pour identifier
   la présence et la position de personnes

3. TRACKING (ce chapitre) : associer les détections entre frames
   successives, attribuant un identifiant persistant à chaque
   personne suivie, pour éviter de compter plusieurs fois la même
   personne restant visible sur plusieurs frames consécutives

4. COMPTAGE FINAL : dénombrer les identifiants uniques observés
   sur une période donnée, exactement comme l'exemple de comptage
   de véhicules de la Mise en Pratique de ce chapitre, mais
   appliqué à des personnes plutôt qu'à des véhicules
```
</details>

### Exercice 7.6.D — Interpréter un test de vitesse

Un ingénieur teste 3 tailles de YOLO et obtient : nano=8ms, small=15ms, medium=35ms par image. Pour une application vidéo nécessitant un traitement fluide à 30 images par seconde (donc un budget d'environ 33ms par image), quelle(s) taille(s) de modèle seraient compatibles, et pourquoi ?

<details>
<summary>👉 Solution</summary>

```
Budget disponible : environ 33ms par image pour tenir 30 FPS

YOLO nano  (8ms)  → COMPATIBLE, largement dans le budget, laisse
                     même de la marge pour d'autres traitements
                     (tracking, affichage...)
YOLO small (15ms) → COMPATIBLE, reste bien dans le budget de 33ms
YOLO medium (35ms) → INCOMPATIBLE — dépasse légèrement le budget de
                      33ms, ce qui empêcherait de maintenir un flux
                      fluide à 30 images par seconde ; le système
                      "prendrait du retard" progressivement sur le
                      flux vidéo en temps réel
```

Ce calcul illustre concrètement le compromis vitesse/précision de ce chapitre : YOLO medium, probablement plus précis, doit être écarté ici non pas pour un manque de qualité, mais parce que la contrainte de temps réel (30 FPS) impose une limite stricte de vitesse que ce modèle ne respecte pas.
</details>

---

---

# ✅ QUIZ DE VALIDATION — MODULE 7

> Réponds sans regarder le cours. Objectif : 16/20 minimum avant de passer au module suivant.

**1.** Qu'est-ce qu'une connexion résiduelle (ResNet), et pourquoi facilite-t-elle l'entraînement de réseaux très profonds ?
**2.** Quel est le principe d'EfficientNet pour améliorer un CNN ?
**3.** Pourquoi la Data Augmentation ne doit-elle jamais être appliquée aux données de test ?
**4.** Quelle est la formule de l'IoU, et que mesure-t-elle ?
**5.** À quoi sert le Non-Max Suppression, et quelles sont ses étapes principales ?
**6.** Pourquoi la détection d'objets combine-t-elle classification ET régression ?
**7.** Quel est le principal avantage de l'approche "une seule passe" de YOLO ?
**8.** Quelle est la différence entre segmentation sémantique et segmentation d'instance ?
**9.** À quoi servent les connexions "en U" dans l'architecture U-Net ?
**10.** Pourquoi SAM (Segment Anything Model) peut-il segmenter des objets jamais vus pendant l'entraînement ?
**11.** Quelle est la différence entre détection de visage et reconnaissance de visage ?
**12.** Pourquoi utilise-t-on des embeddings plutôt qu'une classification classique pour la reconnaissance faciale ?
**13.** Explique le principe du Triplet Loss avec les termes Ancre, Positif, Négatif.
**14.** Pourquoi l'estimation de pose est-elle un problème de régression ?
**15.** Quelles sont les deux étapes principales du pipeline OCR ?
**16.** Pourquoi le contexte linguistique peut-il améliorer la précision d'un système OCR ?
**17.** Quel type de prétraitement d'image peut améliorer les résultats d'un OCR traditionnel ?
**18.** Quel compromis fondamental guide le choix d'une architecture de vision en production ?
**19.** Pourquoi le tracking d'objets est-il nécessaire pour compter des objets distincts sur une vidéo ?
**20.** Cite un exemple de lien direct entre une notion de ce module et une notion apprise dans un module précédent.

---

### 📝 Corrigé

**1.** Une connexion résiduelle ajoute directement l'entrée d'une couche à sa sortie (`sortie = f(entrée) + entrée`), permettant à la couche de devenir "transparente" si elle n'apporte rien d'utile, et offrant un chemin direct pour la circulation du gradient, atténuant le risque de dégradation observé dans les réseaux très profonds classiques.
**2.** Augmenter simultanément, selon un ratio optimal cohérent, la profondeur, la largeur, et la résolution d'entrée du réseau, plutôt que d'ajuster ces leviers séparément et arbitrairement.
**3.** Parce qu'elle introduirait une variabilité artificielle faussant l'estimation honnête de la performance réelle du modèle sur des données non modifiées, l'objectif de l'ensemble de test étant de refléter fidèlement la capacité de généralisation du modèle.
**4.** IoU = Aire de l'intersection / Aire de l'union de deux bounding boxes ; elle mesure le degré de recouvrement entre une boîte prédite et une boîte réelle.
**5.** Le NMS élimine les détections redondantes en gardant la boîte au score de confiance le plus élevé, en supprimant toutes les boîtes dont l'IoU avec elle dépasse un seuil donné, et en répétant ce processus parmi les boîtes restantes.
**6.** Parce qu'elle doit prédire à la fois une catégorie discrète (classification) pour l'objet détecté, et des coordonnées numériques continues (régression) pour délimiter sa bounding box.
**7.** Une vitesse d'inférence considérablement plus élevée, puisque toutes les prédictions sont générées en un seul passage à travers le réseau, permettant un traitement en temps réel.
**8.** La segmentation sémantique attribue une catégorie à chaque pixel sans distinguer les objets individuels de la même catégorie ; la segmentation d'instance distingue en plus chaque objet individuel avec un identifiant propre.
**9.** Elles transmettent directement des informations spatiales précises de l'Encoder vers le Decoder, à des résolutions correspondantes, permettant de récupérer les détails fins perdus pendant la compression progressive de l'Encoder.
**10.** Parce qu'il a été entraîné sur une échelle et une diversité de données massives, développant une compréhension suffisamment générale de ce qu'est un objet cohérent pour généraliser à des objets inédits, à partir d'un simple indice minimal.
**11.** La détection localise où se trouve un visage dans une image (un cas particulier de détection d'objets) ; la reconnaissance détermine à quelle personne spécifique ce visage détecté correspond.
**12.** Parce qu'une classification classique nécessiterait de connaître à l'avance toutes les personnes possibles et de ré-entraîner le modèle pour chaque nouvelle personne, ce qui est impraticable à grande échelle ; l'approche par embedding permet de reconnaître de nouvelles personnes sans ré-entraînement.
**13.** L'Ancre est une photo de référence d'une personne, le Positif est une autre photo de la même personne, le Négatif est une photo d'une personne différente ; l'entraînement rapproche l'embedding de l'Ancre de celui du Positif, et l'éloigne de celui du Négatif.
**14.** Parce qu'elle prédit des coordonnées numériques continues pour chaque point-clé anatomique, exactement comme une prédiction de valeur continue en régression, plutôt qu'une catégorie discrète parmi un ensemble fini.
**15.** La détection de texte (localiser les zones contenant du texte) et la reconnaissance de caractères (identifier précisément quels caractères/mots ces zones contiennent).
**16.** Parce qu'il permet de lever des ambiguïtés visuelles locales (par exemple entre des caractères qui se ressemblent) en s'appuyant sur la probabilité qu'un mot reconnu soit valide dans la langue, ou cohérent avec son contexte.
**17.** La binarisation (conversion en noir et blanc net), la conversion en niveaux de gris, et la réduction du bruit, qui simplifient et clarifient les contours des caractères à reconnaître.
**18.** Le compromis entre vitesse d'inférence et précision, à évaluer selon les contraintes réelles de l'application (temps réel ou non, ressources de calcul disponibles).
**19.** Parce que sans tracking, chaque frame est traitée indépendamment, et le même objet réel serait détecté (et potentiellement compté) plusieurs fois sur des frames successives, sans qu'aucun mécanisme ne permette de savoir qu'il s'agit du même objet d'une frame à l'autre.
**20.** Réponses multiples possibles — par exemple : U-Net (Chapitre 7.3) réutilise l'architecture Encoder-Decoder déjà vue avec les Transformers (Module 5) et déjà rencontrée dans les modèles de diffusion (Module 6) ; ou les embeddings de visages (Chapitre 7.4) réutilisent directement le principe des embeddings de mots (Module 5, chapitre 5.2).

---

---

# 📊 RÉCAPITULATIF DU MODULE 7

## Ce que tu as maîtrisé

| Compétence | Notion clé | Niveau attendu |
|---|---|---|
| Améliorer un CNN classique | ResNet, EfficientNet, Data Augmentation | ⭐⭐⭐⭐☆ |
| Localiser des objets dans une image | Bounding box, IoU, Non-Max Suppression, YOLO | ⭐⭐⭐⭐⭐ |
| Segmenter au pixel près | U-Net, sémantique vs instance, SAM | ⭐⭐⭐⭐☆ |
| Identifier des personnes et des postures | Embeddings de visages, Triplet Loss, estimation de pose | ⭐⭐⭐⭐☆ |
| Extraire du texte d'une image | Pipeline OCR, prétraitement, contexte linguistique | ⭐⭐⭐☆☆ |
| Déployer un système de vision réel | Compromis vitesse/précision, tracking d'objets | ⭐⭐⭐☆☆ |

## Prochaine étape

Selon le plan de la formation, le module suivant est le **Module 8 — Agents IA & Systèmes RAG**, qui s'appuiera directement sur le Function Calling (Module 6, chapitre 6.2) pour construire des systèmes IA capables de raisonner, d'utiliser des outils de façon autonome, et d'exploiter des bases de connaissances externes.

---

## ⚠️ ERREURS FRÉQUENTES DU MODULE 7

| Erreur | Conséquence | Solution |
|---|---|---|
| Appliquer la Data Augmentation aux données de test | Estimation de performance faussée | Réserver la Data Augmentation exclusivement à l'entraînement |
| Choisir des transformations d'augmentation qui changent la sémantique | Exemples d'entraînement incorrects (ex: panneaux retournés) | Toujours vérifier que chaque transformation préserve le sens réel du label |
| Confondre détection et segmentation | Choix d'architecture inadapté au besoin réel | Bien distinguer : boîte approximative (détection) vs pixel exact (segmentation) |
| Oublier le Non-Max Suppression | Détections redondantes multiples pour un même objet | Toujours appliquer le NMS après une détection brute |
| Utiliser une classification classique pour la reconnaissance faciale à grande échelle | Nécessité de ré-entraîner à chaque nouvel utilisateur | Utiliser une approche par embeddings et distance (Triplet Loss) |
| Négliger le tracking pour du comptage sur vidéo | Comptage erroné (même objet compté plusieurs fois) | Toujours utiliser un tracker pour attribuer des identifiants persistants |
| Choisir un modèle trop lourd pour une contrainte de temps réel | Latence excessive, flux vidéo qui prend du retard | Vérifier le budget de temps disponible (ex: 33ms pour 30 FPS) avant de choisir |

---

*Module 7 terminé ✅ — Durée totale : 7 semaines*  
*Formation IA Complète — Module suivant : Module 8 — Agents IA & Systèmes RAG*
