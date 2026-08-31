# 🎓 FORMATION IA — MODULE 9
# Déploiement & MLOps
### Faire passer un modèle du notebook à une application fiable en production

> **Professeur :** Dr. IA — Formation Complète  
> **Durée estimée :** 7 semaines (1–2h par jour)  
> **Prérequis :** Module 1 (Docker, Git), Module 3 (Machine Learning), Module 6 (Quantification)

---

## 🧭 COMMENT LIRE CE MODULE

Jusqu'ici, tes modèles ont vécu dans des notebooks ou des scripts que **toi seul** exécutes. Ce module répond à une question différente : comment faire en sorte qu'un modèle serve **des milliers d'utilisateurs réels**, de façon fiable, rapide, traçable, et qui continue de bien fonctionner **des mois après son déploiement**, alors que le monde (et les données) continuent d'évoluer ?

**La structure de chaque chapitre reste identique aux modules précédents :**

```
1. 📖 EXPLICATION — toutes les notions, en langage simple et avec des analogies,
                     AVANT tout code
2. 💻 MISE EN PRATIQUE — le code qui implémente ce que tu viens de comprendre
3. 🏋️ EXERCICES — 4 exercices corrigés pour ancrer la compréhension
```

**Un rappel important :** ce module ne t'apprend aucun nouvel algorithme d'IA — il t'apprend à **entourer** tes modèles existants (Modules 3 à 8) d'une infrastructure fiable. C'est souvent cette infrastructure, plus que le modèle lui-même, qui détermine si un projet IA survit en production ou échoue silencieusement quelques semaines après son lancement.

---

## 📋 PLAN DU MODULE 9

| Chapitre | Sujet | Durée estimée |
|---|---|---|
| **9.1** | Servir un Modèle avec une API : FastAPI en Profondeur | 1.5 semaine |
| **9.2** | Conteneuriser et Déployer en Production | 1 semaine |
| **9.3** | MLOps : Tracker les Expériences et Versionner | 1.5 semaine |
| **9.4** | CI/CD pour les Systèmes IA | 1 semaine |
| **9.5** | Monitoring et Détection de Dérive (Drift) | 1.5 semaine |
| **9.6** | Scaling et Optimisation pour la Production | 0.5 semaine |

---

---

# 📘 CHAPITRE 9.1 — SERVIR UN MODÈLE AVEC UNE API
## FastAPI en Profondeur

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### Pourquoi un Modèle Entraîné ne Suffit Pas

**🔑 Intuition**

Rappelle-toi tous les modèles que tu as entraînés depuis le Module 3 : ils existaient dans un notebook, ou un script Python que **toi seul** exécutais, sur ta propre machine. Un modèle aussi excellent soit-il n'a **aucune valeur pratique** tant qu'aucun utilisateur, aucune application, aucun autre système ne peut lui envoyer une donnée et recevoir une prédiction en retour, de façon fiable et à la demande.

**Une API (Application Programming Interface, déjà rencontrée au Module 6, chapitre 6.2) est le pont** entre ton modèle entraîné et le monde extérieur : elle expose ton modèle sous forme d'un service accessible via de simples requêtes HTTP, que n'importe quelle application (un site web, une app mobile, un autre service) peut appeler, sans avoir besoin de connaître Python, ni les détails internes de ton modèle.

```
🔑 Sans API :
   Modèle entraîné → fichier .pkl sur ton disque → INUTILISABLE
   par quiconque d'autre que toi, sur ta propre machine

🔑 Avec API :
   Modèle entraîné → exposé via une API → n'importe quelle
   application peut envoyer une requête et recevoir une prédiction
```

---

### FastAPI et Pydantic : Pourquoi Valider les Données est Crucial

**🔑 Intuition — rappel du Module 1, chapitre 1.7**

Tu as déjà rencontré FastAPI au Module 1, dans le contexte de Docker. Ce chapitre approfondit son usage pour servir des modèles IA en particulier. Le composant central à bien comprendre est **Pydantic** : une bibliothèque qui définit précisément la **structure attendue** des données entrantes et sortantes.

**🔑 Pourquoi cette validation est-elle si importante pour un modèle IA ?**

Rappelle-toi le Module 3 : un modèle entraîné s'attend à recevoir des données dans un format **très précis** (le même nombre de variables, dans le même ordre, avec les mêmes types, que pendant l'entraînement). Si un utilisateur externe envoie une donnée mal formée (un texte à la place d'un nombre, une variable manquante), le modèle peut soit planter avec une erreur peu claire, soit pire, produire une prédiction **silencieusement fausse** sans jamais signaler le problème.

```
🔑 Sans validation Pydantic :
   Requête malformée → le code tente quand même de l'utiliser
   → erreur cryptique, ou pire, prédiction silencieusement fausse

🔑 Avec validation Pydantic :
   Requête malformée → REJETÉE IMMÉDIATEMENT avec un message
   d'erreur clair, AVANT même d'atteindre le code du modèle
```

**💡 Le principe à retenir :** Pydantic agit comme un **garde-fou** à l'entrée de ton API, garantissant que seules des données correctement structurées atteignent ton modèle — exactement le même esprit de prévention que la validation des données du Module 3 (rappel : vérifier les types, les valeurs manquantes, avant tout entraînement), mais appliquée ici à chaque requête individuelle en production.

---

### Charger le Modèle au Démarrage, pas à Chaque Requête

**🔑 Intuition — une erreur de performance très fréquente chez les débutants**

Charger un modèle depuis le disque (surtout un grand modèle de Deep Learning, Module 4) peut prendre plusieurs secondes, voire plus. Une erreur classique consiste à charger le modèle **à l'intérieur** de la fonction qui traite chaque requête — ce qui rechargerait entièrement le modèle à **chaque appel de l'API**, ajoutant une latence énorme et totalement inutile à chaque requête.

```
🔑 MAUVAISE pratique (rappel : ne jamais faire ça) :
   
   @app.post("/predire")
   def predire(donnees):
       modele = charger_modele()   # ❌ recharge le modèle À CHAQUE requête !
       return modele.predict(donnees)

🔑 BONNE pratique :
   
   modele = charger_modele()   # ✅ chargé UNE SEULE FOIS, au démarrage de l'API
   
   @app.post("/predire")
   def predire(donnees):
       return modele.predict(donnees)   # réutilise le modèle déjà en mémoire
```

**💡 Pourquoi cette distinction est cruciale en production :** avec des milliers de requêtes par jour, recharger le modèle à chaque fois transformerait une API censée répondre en quelques millisecondes en un service anormalement lent, potentiellement inutilisable — une différence de performance de plusieurs ordres de grandeur, pour un simple changement d'organisation du code.

---

### L'Endpoint /health : un Petit Détail aux Grandes Conséquences

**🔑 Intuition**

Un endpoint `/health` (ou `/healthcheck`) est une route simple qui répond juste "je fonctionne correctement", sans effectuer de véritable prédiction. Il peut sembler anodin, mais il est **indispensable en production** : les systèmes d'infrastructure (load balancers, orchestrateurs comme Kubernetes, systèmes de monitoring, approfondis aux Chapitres 9.2 et 9.5) interrogent régulièrement cet endpoint pour vérifier que ton service est toujours "vivant" et opérationnel — s'il ne répond pas, l'infrastructure peut automatiquement redémarrer le service, ou cesser de lui envoyer du trafic jusqu'à ce qu'il se rétablisse.

---

## 💻 MISE EN PRATIQUE

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import pickle
import numpy as np
import time

app = FastAPI(title="API de Prédiction de Churn", version="1.0.0")

# ─────────────────────────────────────────────
# 1. CHARGER LE MODÈLE AU DÉMARRAGE (rappel : jamais dans la fonction de requête)
# ─────────────────────────────────────────────

modele = None

@app.on_event("startup")
async def charger_modele():
    global modele
    debut = time.time()
    with open("modele_churn.pkl", "rb") as f:
        modele = pickle.load(f)
    print(f"✅ Modèle chargé en {time.time()-debut:.2f}s (UNE SEULE FOIS, au démarrage)")

# ─────────────────────────────────────────────
# 2. VALIDATION PYDANTIC — rappel : garde-fou avant le modèle
# ─────────────────────────────────────────────

class DonneesClient(BaseModel):
    age: float = Field(..., ge=18, le=100, description="Âge du client")
    anciennete: float = Field(..., ge=0, le=50)
    solde: float = Field(..., ge=0)
    nb_produits: int = Field(..., ge=1, le=10)

class PredictionResultat(BaseModel):
    probabilite_churn: float
    risque: str
    temps_traitement_ms: float

# ─────────────────────────────────────────────
# 3. ENDPOINT /health — rappel : indispensable en production
# ─────────────────────────────────────────────

@app.get("/health")
async def health_check():
    return {"status": "ok", "modele_charge": modele is not None}

# ─────────────────────────────────────────────
# 4. ENDPOINT DE PRÉDICTION
# ─────────────────────────────────────────────

@app.post("/predire", response_model=PredictionResultat)
async def predire(donnees: DonneesClient):
    if modele is None:
        raise HTTPException(status_code=503, detail="Modèle non disponible")
    
    debut = time.time()
    X = np.array([[donnees.age, donnees.anciennete, donnees.solde, donnees.nb_produits]])
    proba = float(modele.predict_proba(X)[0, 1])
    duree_ms = (time.time() - debut) * 1000
    
    risque = "ÉLEVÉ" if proba > 0.6 else ("MODÉRÉ" if proba > 0.3 else "FAIBLE")
    
    return PredictionResultat(
        probabilite_churn=round(proba, 4),
        risque=risque,
        temps_traitement_ms=round(duree_ms, 2)
    )

# Lancer : uvicorn main:app --reload
# Tester la validation Pydantic :
# curl -X POST .../predire -d '{"age": "abc", ...}'  → rejeté immédiatement, erreur claire
```

---

## 🏋️ EXERCICES — CHAPITRE 9.1

### Exercice 9.1.A — Identifier l'erreur de performance

Dans le code suivant, identifie l'erreur de performance présente, et corrige-la en te basant sur ce chapitre.

```python
@app.post("/predire")
def predire(donnees: DonneesClient):
    with open("modele.pkl", "rb") as f:
        modele = pickle.load(f)
    return modele.predict([[donnees.age]])
```

<details>
<summary>👉 Solution</summary>

**Erreur identifiée :** le modèle est rechargé depuis le disque à **chaque appel** de l'endpoint `/predire`, au lieu d'être chargé une seule fois au démarrage de l'API — exactement l'erreur décrite dans ce chapitre.

**Correction :**
```python
modele = None

@app.on_event("startup")
async def charger_modele():
    global modele
    with open("modele.pkl", "rb") as f:
        modele = pickle.load(f)

@app.post("/predire")
def predire(donnees: DonneesClient):
    return modele.predict([[donnees.age]])   # réutilise le modèle déjà en mémoire
```
</details>

### Exercice 9.1.B — Pourquoi Pydantic rejette une requête

Un utilisateur envoie `{"age": 150, "anciennete": 5, "solde": 1000, "nb_produits": 2}` au endpoint du code de ce chapitre. Que se passe-t-il, et pourquoi ?

<details>
<summary>👉 Solution</summary>

La requête sera **rejetée automatiquement par Pydantic**, avant même d'atteindre le code de prédiction, car le champ `age` est contraint par `Field(..., ge=18, le=100)` — c'est-à-dire une valeur comprise entre 18 et 100 inclus. Une valeur de 150 dépasse cette borne maximale (`le=100`), donc Pydantic renverra automatiquement une erreur de validation claire (typiquement un code HTTP 422), sans jamais transmettre cette donnée invalide au modèle — exactement le rôle de garde-fou décrit dans ce chapitre, évitant qu'une donnée aberrante ne produise une prédiction silencieusement peu fiable.
</details>

### Exercice 9.1.C — Le rôle de l'endpoint /health

Explique pourquoi un système d'infrastructure automatisé aurait besoin d'interroger régulièrement un endpoint `/health`, plutôt que de simplement supposer que le service fonctionne correctement.

<details>
<summary>👉 Solution</symmary>

Un service en production peut tomber en panne pour de nombreuses raisons (crash de l'application, manque de mémoire, erreur non gérée) sans qu'aucune alerte explicite ne soit immédiatement visible depuis l'extérieur. En interrogeant régulièrement un endpoint `/health` léger et rapide, un système d'infrastructure (load balancer, orchestrateur) peut détecter automatiquement et rapidement qu'un service ne répond plus normalement, et réagir en conséquence (cesser de lui envoyer du trafic, tenter un redémarrage automatique) — sans cette vérification active et régulière, une panne pourrait passer inaperçue pendant une longue période, laissant les utilisateurs recevoir des erreurs sans qu'aucune action corrective automatique ne soit déclenchée.
</details>

### Exercice 9.1.D — Concevoir un modèle Pydantic

En t'inspirant du chapitre, écris un modèle Pydantic `DonneesImage` pour une API de classification d'images qui reçoit une URL d'image (chaîne de caractères, obligatoire) et un seuil de confiance minimal optionnel (nombre entre 0 et 1, valeur par défaut 0.5).

<details>
<summary>👉 Solution</summary>

```python
from pydantic import BaseModel, Field
from typing import Optional

class DonneesImage(BaseModel):
    url_image: str = Field(..., description="URL de l'image à classifier")
    seuil_confiance: Optional[float] = Field(0.5, ge=0, le=1,
                                              description="Seuil minimal de confiance")
```

Le `...` (Ellipsis) sur `url_image` indique qu'il s'agit d'un champ **obligatoire**, sans valeur par défaut ; `seuil_confiance` a une valeur par défaut de `0.5` et est contraint entre 0 et 1 via `ge`/`le`, exactement comme les contraintes déjà vues dans le code de ce chapitre pour le champ `age`.
</details>

---

---

# 📘 CHAPITRE 9.2 — CONTENEURISER ET DÉPLOYER EN PRODUCTION

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Rappel : Pourquoi Docker, Appliqué au Déploiement IA

Rappelle-toi le Module 1, chapitre 1.7 : Docker garantit qu'une application fonctionne **de façon identique**, quel que soit l'environnement où elle s'exécute. Pour un modèle IA, cette garantie est particulièrement précieuse : les bibliothèques de Deep Learning (PyTorch, Module 4) et leurs dépendances (versions de CUDA pour le GPU, notamment) sont notoirement sensibles aux incompatibilités de versions — un modèle qui fonctionne parfaitement sur ta machine peut échouer silencieusement, ou produire des résultats subtilement différents, sur un serveur avec des versions légèrement différentes.

```
🔑 Rappel du problème classique (Module 1) :
   "Ça marche sur ma machine" → mais pas sur le serveur de production

🔑 Pour l'IA spécifiquement, ce problème est amplifié par :
   - Les versions précises de CUDA/GPU nécessaires
   - Les tailles importantes des modèles et dépendances (PyTorch, Module 4)
   - Les comportements parfois non-déterministes selon le matériel
```

---

### Le Compromis Facilité / Scalabilité / Coût des Plateformes de Déploiement

**🔑 Intuition — rappel enrichi du tableau du fichier de base**

Rappelle-toi le Module 6, chapitre 6.1 : choisir une solution technique implique toujours des compromis selon le contexte. Le choix d'une plateforme de déploiement suit exactement la même logique.

```
🔑 Plateformes SIMPLES, pour du PROTOTYPAGE rapide :
   Hugging Face Spaces, Render (offres gratuites limitées)
   → Idéal pour démontrer un projet, un portfolio (Module 0),
     mais des limitations de ressources et de scalabilité

🔑 Plateformes INTERMÉDIAIRES, bon compromis :
   Railway, Google Cloud Run
   → Facilité de déploiement encore élevée, avec une meilleure
     scalabilité, coûts progressifs selon l'usage réel

🔑 Plateformes AVANCÉES, contrôle total :
   AWS EC2/ECS
   → Excellente scalabilité et contrôle total de l'infrastructure,
     mais complexité de configuration nettement plus élevée,
     nécessitant une expertise DevOps plus poussée

🔑 Plateformes SPÉCIALISÉES GPU :
   Modal, Replicate
   → Optimisées spécifiquement pour l'inférence de modèles lourds
     nécessitant un GPU (rappel Module 4, 6), avec une facturation
     à l'usage précise (payer uniquement pour le calcul GPU réellement utilisé)
```

**💡 Comment choisir en pratique ?** Exactement la même démarche que le Module 6, chapitre 6.1 : identifier tes contraintes réelles (budget, compétences DevOps disponibles, volume de trafic attendu, besoin de GPU) avant de choisir, plutôt que de choisir par réflexe la solution la plus populaire ou la plus puissante.

---

### Scaling Horizontal vs Vertical

**🔑 Intuition — deux façons différentes de gérer plus de trafic**

Quand une API reçoit plus de trafic qu'elle ne peut en gérer, deux stratégies fondamentalement différentes permettent d'augmenter sa capacité :

```
🔑 SCALING VERTICAL (scale up) :
   → Donner plus de ressources à LA MÊME machine (plus de CPU,
     plus de RAM, un GPU plus puissant)
   → Analogie : remplacer un employé par un employé plus rapide
   → Limite : il existe toujours un plafond matériel maximal
     disponible, et un coût qui augmente souvent de façon non-linéaire

🔑 SCALING HORIZONTAL (scale out) :
   → Ajouter PLUSIEURS instances IDENTIQUES de ton service,
     qui se partagent le trafic entrant
   → Analogie : embaucher plusieurs employés supplémentaires,
     travaillant en parallèle sur des tâches similaires
   → Avantage : capacité quasiment illimitée (ajouter autant
     d'instances que nécessaire), et meilleure résilience
     (si une instance tombe en panne, les autres continuent de servir)
```

**💡 Pourquoi le scaling horizontal est généralement préféré en production moderne :** il offre une meilleure résilience (pas de "point unique de défaillance") et une flexibilité de coût plus fine (ajouter/retirer des instances selon la demande réelle du moment) — c'est exactement ce que permettent les conteneurs Docker (Module 1) : facilement dupliqués et lancés en parallèle sur plusieurs machines.

---

### Le Load Balancer : Répartir le Trafic entre Plusieurs Instances

**🔑 Intuition**

Avec du scaling horizontal (plusieurs instances identiques de ton API), il faut un mécanisme pour décider **à quelle instance précise** envoyer chaque nouvelle requête entrante. Le **load balancer** (répartiteur de charge) agit comme un standard téléphonique intelligent : il reçoit toutes les requêtes entrantes, et les distribue entre les différentes instances disponibles, généralement en tentant d'équilibrer la charge de travail entre elles, et en redirigeant automatiquement le trafic loin d'une instance qui répondrait négativement à son endpoint `/health` (rappel Chapitre 9.1).

---

## 💻 MISE EN PRATIQUE

```dockerfile
# ─────────────────────────────────────────────
# 1. DOCKERFILE OPTIMISÉ POUR UN MODÈLE IA EN PRODUCTION (rappel Module 1)
# ─────────────────────────────────────────────

FROM python:3.11-slim

WORKDIR /app

# Installer les dépendances D'ABORD (rappel Module 1 : cache des layers Docker)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le modèle et le code ensuite
COPY modele_churn.pkl .
COPY main.py .

EXPOSE 8000

# Healthcheck DIRECTEMENT dans le Dockerfile (rappel Chapitre 9.1)
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:8000/health || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# ─────────────────────────────────────────────
# 2. DOCKER COMPOSE — SCALING HORIZONTAL SIMULÉ EN LOCAL
# ─────────────────────────────────────────────

version: "3.9"

services:
  api:
    build: .
    deploy:
      replicas: 3   # 3 INSTANCES IDENTIQUES — scaling horizontal (rappel ce chapitre)
    ports:
      - "8000-8002:8000"

  # Load balancer simple avec Nginx
  loadbalancer:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - api
```

```nginx
# nginx.conf — configuration minimale de répartition de charge
events {}
http {
    upstream api_instances {
        server api:8000;   # Docker Compose distribue automatiquement
                             # entre les 3 replicas définies ci-dessus
    }
    server {
        listen 80;
        location / {
            proxy_pass http://api_instances;
        }
        location /health {
            proxy_pass http://api_instances/health;
        }
    }
}
```

```bash
# ─────────────────────────────────────────────
# 3. DÉPLOIEMENT SUR GOOGLE CLOUD RUN (scaling horizontal automatique managé)
# ─────────────────────────────────────────────

gcloud run deploy api-churn \
    --image gcr.io/mon-projet/api-churn:latest \
    --platform managed \
    --region europe-west1 \
    --min-instances 1 \
    --max-instances 10 \
    --cpu 2 \
    --memory 2Gi

# Cloud Run gère AUTOMATIQUEMENT le scaling horizontal : de 1 à 10
# instances selon le trafic réel, sans configuration manuelle de load balancer
```

---

## 🏋️ EXERCICES — CHAPITRE 9.2

### Exercice 9.2.A — Vertical ou Horizontal ?

Pour chacun des scénarios suivants, indique s'il s'agit de scaling vertical ou horizontal :

1. Passer d'un serveur avec 4 Go de RAM à un serveur avec 32 Go de RAM
2. Passer de 2 instances de l'API à 8 instances de l'API, avec un load balancer les répartissant

<details>
<summary>👉 Solution</summary>

```
1. SCALING VERTICAL — on augmente les ressources d'UNE SEULE machine
   (plus de RAM sur le même serveur)

2. SCALING HORIZONTAL — on multiplie le nombre d'INSTANCES identiques
   du service (de 2 à 8), qui se partagent le trafic via un load balancer
```
</details>

### Exercice 9.2.B — Choisir une plateforme de déploiement

Pour chacun des scénarios suivants, recommande une catégorie de plateforme parmi celles présentées dans ce chapitre :

1. Un étudiant veut présenter son projet de fin de formation IA dans son portfolio (Module 0)
2. Une startup en forte croissance a besoin d'ajuster rapidement ses ressources GPU pour l'inférence d'un LLM fine-tuné (Module 5)

<details>
<summary>👉 Solution</summary>

```
1. PLATEFORME SIMPLE (Hugging Face Spaces) — usage de démonstration/
   portfolio, sans besoin de scalabilité importante, où la gratuité
   et la simplicité de mise en ligne priment

2. PLATEFORME SPÉCIALISÉE GPU (Modal, Replicate) — besoin spécifique
   d'inférence GPU pour un LLM, avec une facturation à l'usage précise,
   adaptée à une charge de travail variable et une croissance rapide
```
</details>

### Exercice 9.2.C — Pourquoi le scaling horizontal améliore la résilience

Explique pourquoi le scaling horizontal offre une meilleure résilience face aux pannes que le scaling vertical, en te basant sur l'intuition de ce chapitre.

<details>
<summary>👉 Solution</summary>

Avec le scaling vertical, l'application tourne sur **une seule machine** — si cette machine tombe en panne (crash matériel, erreur logicielle critique), le service entier devient indisponible, sans aucune alternative immédiate ("point unique de défaillance"). Avec le scaling horizontal, l'application tourne sur **plusieurs instances indépendantes** ; si une instance tombe en panne, le load balancer (rappel ce chapitre) peut automatiquement rediriger le trafic vers les instances restantes qui continuent de fonctionner normalement, en s'appuyant notamment sur l'endpoint `/health` (rappel Chapitre 9.1) pour détecter l'instance défaillante — le service global reste donc disponible, même en cas de défaillance partielle.
</details>

### Exercice 9.2.D — Le rôle du HEALTHCHECK dans le Dockerfile

Explique le lien entre l'instruction `HEALTHCHECK` du Dockerfile de ce chapitre et l'endpoint `/health` créé au Chapitre 9.1.

<details>
<summary>👉 Solution</summary>

L'instruction `HEALTHCHECK` du Dockerfile configure Docker pour appeler **automatiquement et régulièrement** (ici toutes les 30 secondes) l'endpoint `/health` créé au Chapitre 9.1, depuis l'intérieur même du conteneur. Si cet appel échoue (le endpoint ne répond pas correctement), Docker marque le conteneur comme "unhealthy" (non sain) — une information que l'infrastructure de déploiement (load balancer, orchestrateur) peut alors utiliser pour cesser d'envoyer du trafic vers ce conteneur spécifique, ou déclencher son redémarrage automatique, exactement le mécanisme de détection de panne décrit à l'exercice 9.1.C, mais maintenant intégré directement dans la configuration du conteneur Docker lui-même.
</details>

---

---

# 📘 CHAPITRE 9.3 — MLOPS : TRACKER LES EXPÉRIENCES ET VERSIONNER

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### Le Problème Sans MLOps : Perdre la Trace de ses Expériences

**🔑 Intuition — un scénario douloureusement familier**

Rappelle-toi le Module 3, chapitre 3.1 : entraîner un bon modèle implique de tester **plusieurs algorithmes, plusieurs hyperparamètres**, en comparant leurs performances. Sans outillage adapté, ce processus devient rapidement chaotique :

```
🔑 Scénario sans MLOps, très fréquent en pratique :

"Le modèle que j'ai entraîné mardi dernier avait un excellent score,
mais je ne me souviens plus exactement quels hyperparamètres j'avais
utilisés, ni sur quelle version exacte des données... et le fichier
du modèle a été écrasé par un entraînement plus récent, moins bon."
```

**MLOps (Machine Learning Operations)** est l'ensemble des pratiques et outils qui appliquent les principes du DevOps (déjà évoqués implicitement au Module 1 avec Git et Docker) spécifiquement au cycle de vie des modèles IA — garantissant traçabilité, reproductibilité, et fiabilité, du premier entraînement jusqu'au déploiement en production.

---

### Le Tracking d'Expériences avec MLflow

**🔑 Intuition — rappel direct du Module 3**

Rappelle-toi le Module 3, chapitre 3.1 : comparer plusieurs modèles nécessite de connaître, pour chacun, ses hyperparamètres et ses métriques de performance (validation croisée). **MLflow automatise et centralise cet enregistrement**, pour chaque "run" (chaque entraînement individuel) :

```
🔑 Ce que MLflow enregistre automatiquement pour chaque run :

PARAMÈTRES  : les hyperparamètres utilisés (rappel Module 3 :
              n_estimators, max_depth, learning_rate...)
MÉTRIQUES   : les scores de performance obtenus (rappel Module 3,
              chapitre 3.6 : accuracy, F1, RMSE...)
ARTEFACTS   : les fichiers produits (le modèle entraîné lui-même,
              des graphiques, rappel Module 1 : matplotlib)
```

**💡 Pourquoi c'est précieux :** avec MLflow, chaque expérience est automatiquement archivée et comparable — plus besoin de se souvenir manuellement de quel entraînement a donné quel résultat ; une interface centralisée permet de trier, filtrer, et comparer visuellement des dizaines ou des centaines de runs différents, exactement comme un tableau de comparaison de modèles (rappel Module 3, section 1.5), mais automatisé et persistant.

---

### Le Versionning des Données avec DVC : pourquoi Git ne Suffit Pas

**🔑 Intuition — rappel du Module 1, chapitre 1.6 (.gitignore)**

Rappelle-toi le Module 1 : le fichier `.gitignore` exclut typiquement les données (souvent trop volumineuses) du versionning Git classique. Mais cela pose un problème : **si les données changent, comment savoir précisément quelle version des données a produit quel modèle ?**

**DVC (Data Version Control)** résout ce problème en appliquant à tes fichiers de données (potentiellement énormes) une logique similaire à celle de Git pour le code : il garde une trace de chaque version des données, sans pour autant stocker ces fichiers volumineux directement dans le dépôt Git (qui n'est pas conçu pour ça) — DVC stocke uniquement de petits fichiers de référence dans Git, pointant vers les vraies données stockées séparément (sur un espace de stockage cloud, par exemple).

```
🔑 Sans DVC : Git versionne le CODE, mais pas les DONNÉES
   → Impossible de savoir avec certitude quelle version exacte
     des données a été utilisée pour entraîner un modèle donné

🔑 Avec DVC : le CODE (via Git) ET les DONNÉES (via DVC) sont
   TOUS DEUX versionnés, de façon synchronisée et traçable
   → On peut revenir précisément à "l'état exact" (code + données)
     qui a produit un modèle spécifique, à n'importe quel moment
```

---

### Le Model Registry : Quel Modèle est Actuellement en Production ?

**🔑 Intuition**

Après avoir entraîné et comparé de nombreux modèles (via MLflow), il faut un mécanisme clair pour désigner **lequel de ces modèles est actuellement déployé en production**, et gérer sa transition d'un stade à un autre.

```
🔑 Les stades typiques d'un modèle dans un Model Registry :

STAGING     : le modèle est candidat, en cours de test avant
              un déploiement complet
PRODUCTION  : le modèle est ACTIVEMENT utilisé pour servir les
              utilisateurs réels
ARCHIVED    : un ancien modèle, retiré de la production, mais
              conservé pour référence ou pour un éventuel retour arrière
```

**💡 Pourquoi c'est important :** sans Model Registry clair, il devient facile de perdre le fil de "quel modèle exact tourne actuellement en production" — une confusion potentiellement grave si un problème survient et qu'il faut rapidement identifier (et éventuellement revenir à) la version précédente qui fonctionnait correctement.

---

### La Reproductibilité : rappel direct du Module 2

**🔑 Intuition**

Rappelle-toi le Module 2, chapitre 2.3.7 : fixer une **seed aléatoire** (`np.random.seed(42)`) garantit des résultats reproductibles. MLOps étend ce principe de reproductibilité à **l'ensemble du pipeline** : le code exact (Git), les données exactes (DVC), les hyperparamètres exacts (MLflow), et l'environnement d'exécution exact (Docker, Module 1) doivent tous être capturés ensemble, pour garantir qu'on puisse, des mois plus tard, **reproduire exactement** un résultat obtenu — une garantie essentielle non seulement pour le débogage, mais aussi pour des exigences réglementaires dans certains secteurs (santé, finance).

---

## 💻 MISE EN PRATIQUE

```python
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import train_test_split, cross_val_score
import numpy as np

# ─────────────────────────────────────────────
# 1. TRACKER PLUSIEURS EXPÉRIENCES AVEC MLFLOW (rappel Module 3 : comparer des modèles)
# ─────────────────────────────────────────────

mlflow.set_experiment("prediction_churn")

X, y = np.random.rand(1000, 5), np.random.randint(0, 2, 1000)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

configurations = [
    {"modele": RandomForestClassifier, "params": {"n_estimators": 50, "max_depth": 5}},
    {"modele": RandomForestClassifier, "params": {"n_estimators": 200, "max_depth": 10}},
    {"modele": GradientBoostingClassifier, "params": {"n_estimators": 100, "learning_rate": 0.1}},
]

for config in configurations:
    with mlflow.start_run():
        # PARAMÈTRES — rappel : hyperparamètres du Module 3
        mlflow.log_params(config["params"])
        mlflow.log_param("modele_type", config["modele"].__name__)
        
        modele = config["modele"](random_state=42, **config["params"])
        modele.fit(X_train, y_train)
        
        # MÉTRIQUES — rappel Module 3, chapitre 3.6
        accuracy = modele.score(X_test, y_test)
        cv_scores = cross_val_score(modele, X_train, y_train, cv=5)
        mlflow.log_metric("accuracy_test", accuracy)
        mlflow.log_metric("accuracy_cv_moyenne", cv_scores.mean())
        mlflow.log_metric("accuracy_cv_std", cv_scores.std())
        
        # ARTEFACT — le modèle lui-même, sauvegardé et traçable
        mlflow.sklearn.log_model(modele, "modele")
        
        print(f"Run terminé : {config['modele'].__name__}, accuracy={accuracy:.4f}")

# Lancer l'interface visuelle : mlflow ui
# → permet de comparer visuellement tous les runs, trier par métrique, etc.

# ─────────────────────────────────────────────
# 2. VERSIONNER LES DONNÉES AVEC DVC
# ─────────────────────────────────────────────

# En ligne de commande (bash) :
# dvc init
# dvc add data/dataset_clients.csv    # crée un petit fichier .dvc traçable par Git
# git add data/dataset_clients.csv.dvc .gitignore
# git commit -m "Ajout dataset clients v1"
# dvc push                             # envoie les vraies données vers le stockage distant

# ─────────────────────────────────────────────
# 3. MODEL REGISTRY — enregistrer et promouvoir un modèle
# ─────────────────────────────────────────────

from mlflow import MlflowClient

client = MlflowClient()

# Enregistrer le meilleur modèle trouvé dans le Model Registry
meilleur_run_id = "..." # identifié via mlflow ui, en comparant les runs
resultat_enregistrement = mlflow.register_model(
    f"runs:/{meilleur_run_id}/modele",
    "modele_churn_production"
)

# Faire évoluer son statut : STAGING → PRODUCTION
client.transition_model_version_stage(
    name="modele_churn_production",
    version=resultat_enregistrement.version,
    stage="Production"
)
print(f"✅ Modèle version {resultat_enregistrement.version} promu en PRODUCTION")
```

---

## 🏋️ EXERCICES — CHAPITRE 9.3

### Exercice 9.3.A — Diagnostiquer un problème sans MLOps

Une data scientist obtient un excellent modèle un vendredi, mais le lundi suivant, elle ne parvient plus à reproduire ce résultat avec ce qu'elle pense être les mêmes hyperparamètres. Identifie deux causes possibles à ce problème, en te référant aux notions de ce chapitre.

<details>
<summary>👉 Solution</summary>

```
1. ABSENCE DE TRACKING DES HYPERPARAMÈTRES (MLflow) — sans
   enregistrement systématique, il est facile de se tromper en
   tentant de se souvenir manuellement des hyperparamètres exacts
   utilisés vendredi, la mémoire humaine étant peu fiable pour ce
   niveau de détail

2. ABSENCE DE VERSIONNING DES DONNÉES (DVC) — si les données ont
   légèrement changé entre vendredi et lundi (nouvelles données
   ajoutées, corrections), même avec des hyperparamètres identiques,
   le résultat de l'entraînement pourrait différer, sans que la
   data scientist ne puisse le savoir sans un système de versionning
   des données
```
</details>

### Exercice 9.3.B — Rôles de MLflow et DVC

Pour chacun des besoins suivants, indique s'il relève de MLflow ou de DVC :

1. Comparer les scores de validation croisée de 15 configurations d'hyperparamètres différentes
2. Revenir précisément à la version des données telle qu'elle existait il y a 3 mois

<details>
<summary>👉 Solution</summary>

```
1. MLFLOW — le tracking des hyperparamètres et des métriques de
   performance de multiples runs est exactement son rôle central

2. DVC — le versionning et la restauration de versions précédentes
   des DONNÉES est exactement son rôle central, distinct du rôle
   de MLflow centré sur les expériences de modélisation
```
</details>

### Exercice 9.3.C — Les stades du Model Registry

Un nouveau modèle vient d'être entraîné et obtient de meilleures métriques que le modèle actuellement en production, mais n'a pas encore été testé en conditions réelles. Dans quel stade du Model Registry (rappel de ce chapitre) ce nouveau modèle devrait-il se trouver, et pourquoi pas directement en "Production" ?

<details>
<summary>👉 Solution</summary>

Ce nouveau modèle devrait se trouver au stade **STAGING**, pas directement en Production. Bien qu'il affiche de meilleures métriques sur les données de test utilisées pendant son développement (rappel Module 3, chapitre 3.1 : l'ensemble de test), cela ne garantit pas automatiquement qu'il se comportera aussi bien en conditions réelles de production, où les données peuvent différer subtilement (un sujet approfondi au Chapitre 9.5 sur le drift). Le stade STAGING permet de tester ce nouveau modèle dans des conditions plus proches de la production (parfois via des tests A/B, ou sur un sous-ensemble limité du trafic réel) avant de le promouvoir pleinement en Production, réduisant le risque de déployer un modèle qui, malgré de bonnes métriques sur papier, se comporterait mal une fois confronté à de véritables données de production.
</details>

### Exercice 9.3.D — Reproductibilité complète

En te basant sur ce chapitre, énumère les QUATRE éléments qui doivent tous être capturés ensemble pour garantir la reproductibilité complète d'un résultat de Machine Learning, des mois après son obtention initiale.

<details>
<summary>👉 Solution</summary>

```
1. LE CODE exact utilisé — versionné via Git (rappel Module 1,
   chapitre 1.6)

2. LES DONNÉES exactes utilisées — versionnées via DVC (ce chapitre)

3. LES HYPERPARAMÈTRES exacts utilisés — trackés via MLflow (ce chapitre)

4. L'ENVIRONNEMENT D'EXÉCUTION exact (versions des bibliothèques,
   système) — capturé via Docker (rappel Module 1, chapitre 1.7)
```

Ces quatre éléments réunis garantissent qu'on puisse recréer intégralement les conditions exactes ayant produit un résultat donné, une garantie essentielle pour le débogage à long terme et pour répondre à d'éventuelles exigences réglementaires strictes de traçabilité.
</details>

---

---

# 📘 CHAPITRE 9.4 — CI/CD POUR LES SYSTÈMES IA

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Rappel et Extension : l'Intégration et le Déploiement Continus

**🔑 Intuition**

CI/CD (Continuous Integration / Continuous Deployment) est une pratique issue du développement logiciel classique : **automatiser** les étapes de vérification (tests) et de mise en production d'un code, à chaque modification, plutôt que de le faire manuellement de façon ponctuelle et sujette à l'erreur humaine.

```
🔑 CI (Intégration Continue) : à chaque modification du code
   (rappel Module 1 : chaque commit Git), déclencher AUTOMATIQUEMENT
   une suite de tests, pour détecter les problèmes le plus tôt possible

🔑 CD (Déploiement Continu) : si tous les tests passent avec succès,
   déployer AUTOMATIQUEMENT la nouvelle version en production
   (ou en staging, rappel Chapitre 9.3, pour validation supplémentaire)
```

---

### Pourquoi le CI/CD pour l'IA est Différent du CI/CD Classique

**🔑 Intuition — au-delà des simples tests de code**

Un pipeline CI/CD pour une application logicielle classique teste principalement le **code** : "cette fonction retourne-t-elle le bon résultat pour ces entrées ?". Un pipeline CI/CD pour un système IA doit tester **trois dimensions supplémentaires**, spécifiques au Machine Learning :

```
🔑 TESTS DE CODE (classiques) :
   → Le code s'exécute-t-il sans erreur ? Les fonctions utilitaires
     produisent-elles les résultats attendus ?

🔑 TESTS DE DONNÉES (spécifique IA) :
   → Les nouvelles données respectent-elles le format et les
     contraintes attendues (rappel Module 3, chapitre 3.7 :
     nettoyage et validation des données) ?
   → Y a-t-il des valeurs manquantes inattendues, des types incorrects ?

🔑 TESTS DE MODÈLE (spécifique IA) :
   → Le modèle nouvellement entraîné atteint-il au moins un SEUIL DE
     PERFORMANCE MINIMAL acceptable (rappel Module 3, chapitre 3.6 :
     les métriques d'évaluation) avant d'être déployé ?
   → Le modèle ne régresse-t-il pas par rapport à la version
     actuellement en production ?
```

**💡 Le point clé à retenir :** un pipeline CI/CD purement "logiciel classique" pourrait laisser passer un modèle dont le CODE s'exécute parfaitement (aucune erreur technique), mais dont la QUALITÉ DES PRÉDICTIONS s'est dégradée — un risque spécifique et critique aux systèmes IA, qui nécessite ces vérifications supplémentaires dédiées à la performance du modèle lui-même, pas seulement à la validité technique du code.

---

### Un Pipeline CI/CD Typique pour un Projet ML

**🔑 Intuition**

```
🔑 Étapes typiques d'un pipeline CI/CD pour un projet ML :

1. DÉCLENCHEMENT : un nouveau commit est poussé sur le dépôt Git
2. TESTS DE CODE : exécuter les tests unitaires classiques du code
3. VALIDATION DES DONNÉES : vérifier la conformité des nouvelles
   données (rappel Module 3, chapitre 3.7)
4. RÉ-ENTRAÎNEMENT (si applicable) : entraîner le modèle sur les
   données actuelles, en trackant l'expérience (MLflow, Chapitre 9.3)
5. VALIDATION DU MODÈLE : comparer les métriques du nouveau modèle
   à un SEUIL MINIMAL et à la version actuellement en production
6. CONSTRUCTION DE L'IMAGE DOCKER : si toutes les étapes précédentes
   réussissent (rappel Module 1, chapitre 1.7)
7. DÉPLOIEMENT EN STAGING : déployer d'abord en environnement de
   test (rappel Chapitre 9.3 : le stade Staging)
8. DÉPLOIEMENT EN PRODUCTION : après validation finale (automatique
   ou avec une approbation humaine explicite pour les cas critiques)
```

---

## 💻 MISE EN PRATIQUE

```yaml
# ─────────────────────────────────────────────
# 1. PIPELINE CI/CD AVEC GITHUB ACTIONS (rappel Module 1 : GitHub)
# ─────────────────────────────────────────────

# Fichier : .github/workflows/ci-cd-ml.yml

name: CI/CD Pipeline ML

on:
  push:
    branches: [main]

jobs:
  tests-et-validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Installer les dépendances
        run: pip install -r requirements.txt
      
      # ÉTAPE 2 : Tests de code classiques
      - name: Tests unitaires du code
        run: pytest tests/test_code.py
      
      # ÉTAPE 3 : Validation des données
      - name: Valider le format des données
        run: python scripts/valider_donnees.py
      
      # ÉTAPE 4-5 : Ré-entraîner et valider le modèle
      - name: Entraîner et évaluer le modèle
        run: python scripts/entrainer_modele.py
      
      - name: Vérifier le seuil de performance minimal
        run: python scripts/tester_performance_modele.py
```

```python
# ─────────────────────────────────────────────
# 2. TEST DE PERFORMANCE DU MODÈLE — le garde-fou spécifique à l'IA
# ─────────────────────────────────────────────

import pytest
import mlflow
from sklearn.metrics import f1_score

SEUIL_MINIMAL_F1 = 0.75   # rappel Module 3, chapitre 3.6 : seuil de qualité acceptable

def test_performance_minimale():
    """Empêche le déploiement d'un modèle sous le seuil de qualité acceptable."""
    modele = mlflow.sklearn.load_model("models:/modele_churn_production/latest")
    X_test, y_test = charger_donnees_test()
    
    y_pred = modele.predict(X_test)
    score_f1 = f1_score(y_test, y_pred)
    
    assert score_f1 >= SEUIL_MINIMAL_F1, (
        f"❌ ÉCHEC : F1-score de {score_f1:.3f} sous le seuil minimal "
        f"de {SEUIL_MINIMAL_F1} — DÉPLOIEMENT BLOQUÉ"
    )
    print(f"✅ Modèle validé : F1-score = {score_f1:.3f}")

def test_non_regression():
    """Empêche le déploiement d'un modèle moins bon que celui déjà en production."""
    modele_nouveau = charger_nouveau_modele()
    modele_production_actuel = mlflow.sklearn.load_model("models:/modele_churn_production/Production")
    X_test, y_test = charger_donnees_test()
    
    score_nouveau = f1_score(y_test, modele_nouveau.predict(X_test))
    score_actuel = f1_score(y_test, modele_production_actuel.predict(X_test))
    
    assert score_nouveau >= score_actuel - 0.02, (   # petite tolérance acceptable
        f"❌ RÉGRESSION DÉTECTÉE : nouveau modèle ({score_nouveau:.3f}) "
        f"moins bon que la production actuelle ({score_actuel:.3f})"
    )
    print(f"✅ Pas de régression : {score_nouveau:.3f} vs {score_actuel:.3f} (actuel)")

# ─────────────────────────────────────────────
# 3. VALIDATION DES DONNÉES — rappel Module 3, chapitre 3.7
# ─────────────────────────────────────────────

def valider_donnees(df):
    """Tests de données, exécutés avant tout ré-entraînement."""
    assert df.isnull().sum().sum() == 0, "❌ Valeurs manquantes détectées"
    assert (df["age"] >= 0).all() and (df["age"] <= 120).all(), "❌ Valeurs d'âge aberrantes"
    assert df["solde"].dtype in ["float64", "int64"], "❌ Type de donnée incorrect pour 'solde'"
    print("✅ Données validées avec succès")
```

---

## 🏋️ EXERCICES — CHAPITRE 9.4

### Exercice 9.4.A — Identifier le type de test

Pour chacune des vérifications suivantes, indique s'il s'agit d'un test de CODE, de DONNÉES, ou de MODÈLE (rappel des trois dimensions de ce chapitre) :

1. Vérifier qu'une fonction de prétraitement retourne bien un DataFrame avec les colonnes attendues
2. Vérifier que l'accuracy du modèle nouvellement entraîné dépasse 80%
3. Vérifier qu'aucune valeur négative n'apparaît dans la colonne "âge" du nouveau dataset

<details>
<summary>👉 Solution</summary>

```
1. TEST DE CODE — vérifie le comportement d'une fonction du code,
   indépendamment de la qualité des données ou du modèle

2. TEST DE MODÈLE — vérifie une métrique de performance du modèle
   (rappel Module 3, chapitre 3.6), spécifique à l'IA

3. TEST DE DONNÉES — vérifie la conformité et la cohérence des
   données elles-mêmes, avant tout entraînement
```
</details>

### Exercice 9.4.B — Pourquoi un seuil de performance minimal est un garde-fou essentiel

Explique ce qui pourrait se passer si un pipeline CI/CD pour l'IA ne vérifiait QUE les tests de code classiques, sans jamais tester la performance réelle du modèle avant déploiement.

<details>
<summary>👉 Solution</symmary>

Un modèle pourrait techniquement s'exécuter **sans aucune erreur de code** (toutes les fonctions retournent des résultats du bon type, aucune exception n'est levée), tout en produisant des prédictions de **très mauvaise qualité** — par exemple, à cause d'un bug subtil dans le prétraitement des données, ou d'un problème de surapprentissage sévère (rappel Module 3, chapitre 3.1) passé inaperçu. Sans un test explicite de la performance du modèle (comme `test_performance_minimale` dans le code de ce chapitre), ce modèle défaillant pourrait être déployé automatiquement en production, dégradant silencieusement l'expérience des utilisateurs réels, sans qu'aucune alerte n'ait été déclenchée pendant le pipeline CI/CD — exactement le risque spécifique aux systèmes IA évoqué dans ce chapitre, distinct des risques d'un pipeline CI/CD purement logiciel classique.
</details>

### Exercice 9.4.C — Le test de non-régression

Explique la différence entre le test `test_performance_minimale` et le test `test_non_regression` du code de ce chapitre, et pourquoi les deux sont utiles simultanément plutôt qu'un seul suffirait.

<details>
<summary>👉 Solution</summary>

```
test_performance_minimale : vérifie que le nouveau modèle dépasse
   un SEUIL ABSOLU fixe (ex: F1 ≥ 0.75), indépendamment de la
   performance du modèle actuellement en production

test_non_regression : vérifie que le nouveau modèle n'est PAS MOINS
   BON que le modèle actuellement en production, une comparaison
   RELATIVE plutôt qu'un seuil absolu fixe
```

Les deux sont complémentaires : un modèle pourrait dépasser le seuil minimal absolu (par exemple F1=0.80) tout en étant néanmoins **moins bon** que la version actuellement en production (qui atteignait peut-être F1=0.88) — sans le test de non-régression, on pourrait accepter un déploiement qui, bien qu'au-dessus du seuil minimal acceptable, constitue tout de même une dégradation par rapport à ce qui fonctionnait déjà bien. Inversement, le seuil minimal absolu protège contre le cas où le modèle en production actuel serait lui-même de mauvaise qualité (un nouveau modèle "pas pire" que ce mauvais modèle actuel resterait insuffisant sans ce garde-fou absolu).
</details>

### Exercice 9.4.D — Concevoir un test de validation de données

En t'inspirant de la fonction `valider_donnees` de ce chapitre, écris (en pseudo-code ou en Python) un test qui vérifie qu'une colonne "email" d'un nouveau dataset ne contient aucune valeur dupliquée, et qu'une colonne "prix" ne contient aucune valeur négative.

<details>
<summary>👉 Solution</summary>

```python
def valider_donnees_clients(df):
    assert df["email"].duplicated().sum() == 0, (
        f"❌ {df['email'].duplicated().sum()} emails dupliqués détectés"
    )
    assert (df["prix"] >= 0).all(), (
        f"❌ Valeurs de prix négatives détectées : "
        f"{(df['prix'] < 0).sum()} lignes concernées"
    )
    print("✅ Données clients validées avec succès")
```

Ce test suit exactement le même principe que `valider_donnees` du chapitre : des assertions explicites, avec des messages d'erreur clairs indiquant précisément ce qui a échoué, empêchant les données non conformes de progresser plus loin dans le pipeline CI/CD (par exemple, vers une étape de ré-entraînement du modèle sur des données potentiellement corrompues).
</details>

---

---

# 📘 CHAPITRE 9.5 — MONITORING ET DÉTECTION DE DÉRIVE (DRIFT)

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### Rappel Fondamental : la Validation du Module 3 n'est Valable qu'à un Instant T

**🔑 Intuition — le piège le plus dangereux du déploiement IA**

Rappelle-toi le Module 3, chapitre 3.1 : tu valides un modèle sur un ensemble de test, représentatif des données à un moment donné. **Mais le monde continue d'évoluer après ce déploiement** — les comportements des utilisateurs changent, de nouvelles tendances émergent, des événements externes (une crise économique, une nouvelle réglementation, une pandémie) modifient les patterns sous-jacents que le modèle avait appris. **Un modèle qui performait excellemment le jour de son déploiement peut se dégrader silencieusement au fil des mois**, sans qu'aucune erreur de code ne se déclenche jamais — le modèle continue de produire des prédictions, simplement de moins bonne qualité.

```
🔑 Le piège spécifique à l'IA (contrairement au logiciel classique) :

Un bug logiciel classique produit typiquement une ERREUR visible
(un crash, une exception).

Une DÉGRADATION DE MODÈLE ne produit généralement AUCUNE erreur
technique visible — le modèle continue de fonctionner "normalement",
tout en devenant progressivement moins fiable, silencieusement.
```

---

### Data Drift vs Concept Drift : Deux Phénomènes Distincts

**🔑 Intuition**

```
🔑 DATA DRIFT (dérive des données) :
   La DISTRIBUTION des données d'ENTRÉE change, mais la relation
   entre entrées et sorties reste la même.
   
   Exemple : un modèle de prédiction de churn bancaire, entraîné
   sur des clients dont l'âge moyen était de 35 ans, commence à
   recevoir des données de clients dont l'âge moyen est maintenant
   de 55 ans (l'entreprise a changé de segment de clientèle cible).
   Le modèle "voit" des données différentes de celles sur lesquelles
   il a appris.

🔑 CONCEPT DRIFT (dérive de concept) :
   La RELATION elle-même entre les entrées et la sortie change,
   même si la distribution des entrées reste similaire.
   
   Exemple : pendant une crise économique soudaine, le lien entre
   "ancienneté du client" et "probabilité de churn" pourrait
   s'inverser complètement — des clients auparavant très fidèles
   pourraient soudainement changer massivement de comportement,
   pour des raisons que le modèle n'a jamais observées pendant
   son entraînement.
```

```
🔑 Distinction visuelle simplifiée :

DATA DRIFT     : les INPUTS ont changé de forme/distribution
CONCEPT DRIFT  : la RELATION input→output a changé, même avec
                  des inputs similaires
```

---

### Comment Détecter le Data Drift Statistiquement — Rappel Direct du Module 2

**🔑 Intuition**

Comment savoir, concrètement, que la distribution des données change ? Rappelle-toi le Module 2, chapitre 2.3.4 : chaque variable numérique peut être résumée par sa **moyenne** et son **écart-type**. Une façon simple de détecter un data drift consiste à comparer ces statistiques entre les données d'entraînement originales et les nouvelles données de production, au fil du temps.

**🧮 Exemple calculé — détecter un data drift**

```
Données d'ENTRAÎNEMENT originales (variable "âge") :
Moyenne = 35 ans, Écart-type = 8 ans

Nouvelles données de PRODUCTION (mesurées 6 mois après déploiement) :
Moyenne = 52 ans, Écart-type = 9 ans

🔑 Analyse : la moyenne a augmenté de 17 ans — un changement
   massif de la population de clients par rapport aux données
   d'entraînement originales. C'est un signal FORT de DATA DRIFT.
```

**Des tests statistiques plus rigoureux** (comme le test de Kolmogorov-Smirnov, qui compare formellement deux distributions entières plutôt que seulement leur moyenne et écart-type) sont utilisés en pratique pour détecter des changements plus subtils, mais l'intuition reste directement la même : **comparer statistiquement les distributions "d'hier" et "d'aujourd'hui"** pour détecter un écart significatif.

---

### Surveiller les Métriques de Performance en Continu — Rappel du Module 3

**🔑 Intuition**

Au-delà de surveiller les données d'entrée (data drift), on peut aussi surveiller directement **la performance du modèle**, quand on dispose (parfois avec un certain délai) des vraies étiquettes réelles pour comparer aux prédictions — exactement les métriques du Module 3, chapitre 3.6 (accuracy, precision, recall, F1), mais calculées **en continu**, semaine après semaine, plutôt qu'une seule fois au moment du déploiement initial.

```
🔑 Exemple de suivi temporel :

Semaine 1  : F1-score = 0.85 (bon)
Semaine 8  : F1-score = 0.83 (stable)
Semaine 16 : F1-score = 0.71 (DÉGRADATION SIGNIFICATIVE — alerte)
```

**💡 Le défi pratique du monitoring de performance :** contrairement au data drift (observable immédiatement dès réception de nouvelles données), les vraies étiquettes réelles ne sont souvent disponibles qu'avec un **délai** (par exemple, on ne sait si un client a vraiment churné que plusieurs semaines après la prédiction). Le monitoring de la performance réelle est donc souvent **complémentaire** au monitoring du data drift (qui, lui, peut être détecté immédiatement), et non un substitut à celui-ci.

---

### L'Alerting : Réagir Automatiquement aux Signaux de Dérive

**🔑 Intuition**

Détecter un problème n'a de valeur que si quelqu'un (ou quelque chose) en est **informé rapidement**, pour agir en conséquence. Un système d'alerting définit des **seuils** (rappel Module 9.4 : les seuils de performance minimale) au-delà desquels une notification automatique est déclenchée — par email, message Slack, ou tout autre canal — permettant à une équipe de réagir (investiguer, ré-entraîner le modèle sur des données plus récentes, ou temporairement désactiver le modèle) avant que la dégradation ne devienne trop dommageable pour les utilisateurs réels.

---

## 💻 MISE EN PRATIQUE

```python
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

# ─────────────────────────────────────────────
# 1. DÉTECTER LE DATA DRIFT — retrouver notre calcul à la main
# ─────────────────────────────────────────────

np.random.seed(42)

# Données d'entraînement originales
donnees_entrainement = np.random.normal(35, 8, 1000)   # âge, moyenne=35, écart-type=8

# Nouvelles données de production, 6 mois plus tard (simulation d'un drift)
donnees_production = np.random.normal(52, 9, 500)      # moyenne a nettement dérivé

print(f"Entraînement : moyenne={donnees_entrainement.mean():.1f}, "
      f"écart-type={donnees_entrainement.std():.1f}")
print(f"Production   : moyenne={donnees_production.mean():.1f}, "
      f"écart-type={donnees_production.std():.1f}")

# ─────────────────────────────────────────────
# 2. TEST STATISTIQUE FORMEL — Kolmogorov-Smirnov
# ─────────────────────────────────────────────

statistique_ks, p_value = stats.ks_2samp(donnees_entrainement, donnees_production)

print(f"\nTest de Kolmogorov-Smirnov :")
print(f"  Statistique KS : {statistique_ks:.4f}")
print(f"  p-value        : {p_value:.6f}")

SEUIL_ALERTE = 0.05
if p_value < SEUIL_ALERTE:
    print(f"  🚨 DATA DRIFT DÉTECTÉ (p-value < {SEUIL_ALERTE}) — les distributions "
          f"sont statistiquement significativement différentes")
else:
    print(f"  ✅ Pas de drift statistiquement significatif détecté")

# ─────────────────────────────────────────────
# 3. VISUALISER LE DRIFT
# ─────────────────────────────────────────────

plt.figure(figsize=(10, 5))
plt.hist(donnees_entrainement, bins=30, alpha=0.6, label="Entraînement (original)", color="steelblue")
plt.hist(donnees_production, bins=30, alpha=0.6, label="Production (6 mois après)", color="tomato")
plt.axvline(donnees_entrainement.mean(), color="steelblue", linestyle="--")
plt.axvline(donnees_production.mean(), color="tomato", linestyle="--")
plt.xlabel("Âge"); plt.ylabel("Fréquence")
plt.title("Détection Visuelle de Data Drift")
plt.legend()
plt.show()

# ─────────────────────────────────────────────
# 4. SURVEILLER LA PERFORMANCE DANS LE TEMPS + ALERTING
# ─────────────────────────────────────────────

historique_f1_hebdomadaire = {
    "Semaine 1": 0.85, "Semaine 4": 0.84, "Semaine 8": 0.83,
    "Semaine 12": 0.78, "Semaine 16": 0.71
}

SEUIL_MINIMAL_PRODUCTION = 0.75

def verifier_performance_et_alerter(historique, seuil):
    for semaine, score in historique.items():
        if score < seuil:
            print(f"🚨 ALERTE — {semaine} : F1-score={score:.2f} SOUS le seuil "
                  f"de {seuil} → notification envoyée à l'équipe ML")
            # envoyer_notification_slack(...) — en pratique réelle
        else:
            print(f"✅ {semaine} : F1-score={score:.2f}, dans les normes")

verifier_performance_et_alerter(historique_f1_hebdomadaire, SEUIL_MINIMAL_PRODUCTION)

plt.figure(figsize=(9, 5))
semaines = list(historique_f1_hebdomadaire.keys())
scores = list(historique_f1_hebdomadaire.values())
plt.plot(semaines, scores, "bo-")
plt.axhline(SEUIL_MINIMAL_PRODUCTION, color="red", linestyle="--", label="Seuil minimal")
plt.ylabel("F1-score"); plt.title("Suivi de la Performance en Production")
plt.legend(); plt.xticks(rotation=30)
plt.show()
```

---

## 🏋️ EXERCICES — CHAPITRE 9.5

### Exercice 9.5.A — Data Drift ou Concept Drift ?

Pour chacun des scénarios suivants, indique s'il s'agit de Data Drift ou de Concept Drift :

1. Un modèle de recommandation de produits, entraîné avant une période de fêtes, reçoit soudainement des visiteurs dont le profil d'achat est très différent (achats de cadeaux plutôt que d'usage personnel), mais dont l'âge et la localisation restent similaires aux données d'entraînement
2. Un modèle de détection de fraude bancaire voit apparaître un nouveau type de fraude, jamais observé pendant l'entraînement, qui utilise des patterns de transaction très différents de ceux appris auparavant
3. Une pandémie change radicalement le lien entre "fréquence d'achat en ligne" et "risque de défaut de paiement" — des clients auparavant fiables deviennent soudainement plus à risque

<details>
<summary>👉 Solution</summary>

```
1. DATA DRIFT — les caractéristiques observables des visiteurs
   (comportement d'achat) changent, mais on ne sait pas
   nécessairement si la RELATION entre profil et recommandation
   pertinente a elle-même changé

2. Cela pourrait relever des DEUX à la fois, mais principalement
   CONCEPT DRIFT — un nouveau TYPE de fraude signifie que la
   relation entre les caractéristiques d'une transaction et sa
   probabilité d'être frauduleuse a fondamentalement changé, le
   modèle n'ayant jamais appris à reconnaître ce nouveau pattern

3. CONCEPT DRIFT — la relation elle-même entre une variable
   (fréquence d'achat) et la cible (risque de défaut) s'est
   inversée ou modifiée, à cause d'un facteur externe (la pandémie)
   qui change fondamentalement le comportement, même pour des
   clients aux caractéristiques similaires à avant
```
</details>

### Exercice 9.5.B — Interpréter un test de Kolmogorov-Smirnov

Un test KS entre les données d'entraînement et les données de production actuelles donne une p-value de 0.42, avec un seuil d'alerte de 0.05. Que peux-tu en conclure, et quelle action (ou absence d'action) recommanderais-tu ?

<details>
<summary>👉 Solution</summary>

Une p-value de 0.42, bien supérieure au seuil d'alerte de 0.05, indique qu'on ne peut PAS rejeter l'hypothèse que les deux distributions (entraînement et production) sont similaires — autrement dit, **aucun data drift statistiquement significatif** n'est détecté à ce stade. **Aucune action corrective urgente** n'est nécessaire pour l'instant ; il convient néanmoins de continuer à surveiller régulièrement cette même statistique dans le temps (rappel de ce chapitre : le monitoring est un processus continu, pas une vérification ponctuelle unique), puisqu'un drift pourrait apparaître progressivement dans les semaines ou mois suivants.
</details>

### Exercice 9.5.C — Pourquoi le monitoring de performance est complémentaire au data drift

Explique pourquoi surveiller uniquement le data drift (sans jamais surveiller la performance réelle du modèle) pourrait manquer certains problèmes, en te référant à la distinction Data Drift / Concept Drift de ce chapitre.

<details>
<summary>👉 Solution</summary>

Le data drift détecte des changements dans la **distribution des données d'entrée**, mais un **concept drift** peut survenir même quand la distribution des entrées reste parfaitement stable — c'est précisément la relation entre entrées et sortie qui change (rappel : l'exemple de la pandémie modifiant le lien entre comportement d'achat et risque de défaut, exercice 9.5.A). Dans ce cas, une surveillance basée uniquement sur le data drift ne détecterait **aucun** problème (les données d'entrée semblent statistiquement similaires), alors que le modèle produit pourtant des prédictions de moins en moins fiables. Seule une surveillance directe de la **performance réelle** du modèle (via les vraies étiquettes, quand elles deviennent disponibles, rappel de ce chapitre) permettrait de détecter ce type spécifique de dégradation silencieuse, complétant ainsi la surveillance du data drift plutôt que de s'y substituer.
</details>

### Exercice 9.5.D — Concevoir une stratégie de monitoring complète

En t'inspirant de ce chapitre, décris (sans code) une stratégie de monitoring complète pour un modèle de détection de fraude bancaire déployé en production, couvrant à la fois le data drift et la performance réelle.

<details>
<summary>👉 Solution</summary>

*(Exemple de réponse)*

```
1. MONITORING DU DATA DRIFT (immédiat, en continu) :
   Comparer quotidiennement (ou hebdomadairement) les statistiques
   des variables d'entrée des nouvelles transactions (montants,
   fréquences, types de commerces) à celles des données
   d'entraînement originales, via un test statistique (Kolmogorov-
   Smirnov, ou plus simplement comparaison de moyenne/écart-type)

2. MONITORING DE LA PERFORMANCE RÉELLE (avec délai) :
   Une fois les vraies étiquettes de fraude/non-fraude confirmées
   (souvent après investigation manuelle des transactions suspectes,
   avec un certain délai), recalculer les métriques Precision/Recall/
   F1 (rappel Module 3, chapitre 3.6) sur ces transactions
   régulièrement, en les comparant au seuil minimal acceptable

3. ALERTING AUTOMATIQUE :
   Définir des seuils clairs pour les deux dimensions (drift
   statistiquement significatif OU métrique de performance sous
   le seuil minimal), déclenchant une notification automatique à
   l'équipe responsable dès qu'un seuil est franchi

4. ACTION CORRECTIVE :
   En cas d'alerte confirmée, envisager un ré-entraînement du modèle
   sur des données plus récentes (rappel Chapitre 9.3 et 9.4 :
   le pipeline CI/CD peut automatiser ce ré-entraînement et sa
   validation avant un nouveau déploiement)
```
</details>

---

---

# 📘 CHAPITRE 9.6 — SCALING ET OPTIMISATION POUR LA PRODUCTION

## Durée : 0.5 semaine

---

## 📖 EXPLICATION

### Latence vs Throughput : un Compromis Fondamental

**🔑 Intuition**

Deux mesures de performance différentes, souvent confondues, guident l'optimisation d'un système IA en production :

```
🔑 LATENCE : le temps que met UNE SEULE requête individuelle à
   obtenir sa réponse (ex: "150 millisecondes par prédiction")
   → Importante pour l'EXPÉRIENCE UTILISATEUR d'une requête isolée

🔑 THROUGHPUT (débit) : le nombre TOTAL de requêtes que le système
   peut traiter par unité de temps (ex: "1000 requêtes par seconde")
   → Important pour la CAPACITÉ GLOBALE du système à grande échelle
```

**💡 Le compromis souvent rencontré :** certaines techniques d'optimisation (comme le batching, ci-dessous) **améliorent le throughput global**, mais peuvent légèrement **augmenter la latence individuelle** de chaque requête prise isolément — un compromis à évaluer selon les priorités de l'application (un chatbot interactif privilégie généralement la latence faible ; un système de traitement massif de documents en arrière-plan privilégie généralement le throughput élevé).

---

### Le Batching des Requêtes pour l'Inférence

**🔑 Intuition — rappel direct du Module 2, chapitre 2.4.4**

Rappelle-toi le Module 2 : pendant l'**entraînement**, on regroupe les exemples en mini-batchs pour exploiter le parallélisme du GPU (rappel Module 0). Le même principe s'applique à l'**inférence** en production : plutôt que de traiter chaque requête individuellement, une par une, on peut **regrouper plusieurs requêtes arrivées presque simultanément** en un seul batch, et les traiter ensemble en une seule passe à travers le modèle — exploitant ainsi bien mieux le parallélisme matériel (GPU/CPU) qu'un traitement strictement séquentiel, requête par requête.

```
🔑 Sans batching : 100 requêtes → 100 passages séparés dans le modèle
   → sous-exploite le parallélisme du GPU, plus lent au total

🔑 Avec batching : 100 requêtes → regroupées en quelques batchs
   → 1 seul (ou quelques) passages dans le modèle, traitant
   plusieurs requêtes SIMULTANÉMENT → throughput global bien
   meilleur, au prix d'une légère latence supplémentaire pour
   chaque requête individuelle (le temps d'attendre que le batch
   se remplisse avant traitement)
```

---

### Le Caching des Réponses

**🔑 Intuition**

Si plusieurs utilisateurs différents posent **exactement la même question** à ton système (ou si un même utilisateur répète une requête identique), recalculer entièrement la réponse à chaque fois est un gaspillage de ressources. Le **caching** stocke temporairement les résultats de requêtes déjà traitées, pour les **réutiliser instantanément** si une requête identique se représente, plutôt que de refaire tout le calcul (potentiellement coûteux, notamment pour un LLM, rappel Module 6, chapitre 6.2, facturé au token) depuis le début.

```
🔑 Sans cache : chaque requête, même identique à une précédente,
   déclenche un nouveau calcul complet (coûteux en temps ET en argent
   pour une API payante)

🔑 Avec cache : une requête déjà vue récemment retourne INSTANTANÉMENT
   le résultat déjà calculé, sans nouveau calcul
```

---

### Architecture de Production pour les LLMs — Rappel du Module 6

**🔑 Intuition**

Rappelle-toi le Module 6 : le choix entre une API cloud (chapitre 6.2) et un modèle local avec Ollama (chapitre 6.3) implique déjà un compromis latence/coût/contrôle. En production, ce choix se combine avec les techniques de ce chapitre : le **batching** de requêtes multiples vers un modèle local, la **quantification** (rappel Module 6, chapitre 6.3) pour réduire la latence d'inférence, et le **caching** de réponses fréquentes, forment ensemble une architecture d'inférence optimisée, adaptée au volume et au type de trafic réellement attendu.

---

## 💻 MISE EN PRATIQUE

```python
import time
import hashlib
from functools import lru_cache
import numpy as np

# ─────────────────────────────────────────────
# 1. COMPARER LATENCE INDIVIDUELLE vs THROUGHPUT AVEC/SANS BATCHING
# ─────────────────────────────────────────────

def predire_un_par_un(modele, requetes):
    """Sans batching : chaque requête traitée séparément."""
    debut = time.time()
    resultats = [modele.predict(np.array([r])) for r in requetes]
    duree = time.time() - debut
    return resultats, duree

def predire_par_batch(modele, requetes, taille_batch=32):
    """Avec batching : requêtes regroupées avant traitement."""
    debut = time.time()
    resultats = []
    for i in range(0, len(requetes), taille_batch):
        batch = np.array(requetes[i:i+taille_batch])
        resultats.extend(modele.predict(batch))
    duree = time.time() - debut
    return resultats, duree

# Simulation avec un modèle factice
class ModeleFactice:
    def predict(self, X):
        time.sleep(0.001 * len(X) ** 0.5)   # simule un gain d'efficacité par batch
        return np.random.rand(len(X))

modele = ModeleFactice()
requetes_test = [np.random.rand(5) for _ in range(200)]

_, duree_individuelle = predire_un_par_un(modele, requetes_test)
_, duree_batch = predire_par_batch(modele, requetes_test, taille_batch=32)

print(f"Sans batching : {duree_individuelle*1000:.1f} ms pour 200 requêtes")
print(f"Avec batching : {duree_batch*1000:.1f} ms pour 200 requêtes")
print(f"Gain de throughput : {duree_individuelle/duree_batch:.1f}x plus rapide")

# ─────────────────────────────────────────────
# 2. CACHING DES RÉPONSES — rappel : éviter de recalculer l'identique
# ─────────────────────────────────────────────

cache_reponses = {}

def predire_avec_cache(question, modele_llm_simule):
    cle_cache = hashlib.md5(question.encode()).hexdigest()
    
    if cle_cache in cache_reponses:
        print(f"✅ CACHE HIT — réponse instantanée pour : '{question[:30]}...'")
        return cache_reponses[cle_cache]
    
    print(f"⏳ CACHE MISS — calcul complet pour : '{question[:30]}...'")
    time.sleep(0.5)   # simule la latence d'un appel LLM réel (rappel Module 6)
    reponse = f"Réponse générée pour : {question}"
    
    cache_reponses[cle_cache] = reponse
    return reponse

# Première requête : CACHE MISS (calcul complet)
predire_avec_cache("Quelle est la garantie du produit XYZ ?", None)
# Requête IDENTIQUE : CACHE HIT (instantané)
predire_avec_cache("Quelle est la garantie du produit XYZ ?", None)

# ─────────────────────────────────────────────
# 3. DÉCORATEUR lru_cache — approche native Python simple
# ─────────────────────────────────────────────

@lru_cache(maxsize=1000)
def prediction_simple(x):
    time.sleep(0.1)   # simule un calcul coûteux
    return x ** 2

debut = time.time()
prediction_simple(5)               # premier appel : calcul complet
duree_premier_appel = time.time() - debut

debut = time.time()
prediction_simple(5)               # appel identique : instantané via cache
duree_deuxieme_appel = time.time() - debut

print(f"\nPremier appel  : {duree_premier_appel*1000:.1f} ms")
print(f"Deuxième appel (caché) : {duree_deuxieme_appel*1000:.1f} ms")
```

---

## 🏋️ EXERCICES — CHAPITRE 9.6

### Exercice 9.6.A — Latence ou Throughput ?

Pour chacun des scénarios suivants, indique si la priorité principale est la latence ou le throughput :

1. Un chatbot d'assistance client en temps réel, où chaque utilisateur attend sa réponse
2. Un système qui traite chaque nuit des millions de documents pour en extraire des résumés, sans utilisateur en attente immédiate

<details>
<summary>👉 Solution</summary>

```
1. LATENCE — l'utilisateur attend activement sa réponse en temps
   réel, une latence élevée dégraderait directement son expérience,
   même si le système ne traite qu'une requête à la fois

2. THROUGHPUT — aucun utilisateur n'attend un résultat immédiat, la
   priorité est de traiter le MAXIMUM de documents possible pendant
   la fenêtre de traitement nocturne, même si chaque document
   individuel met un peu plus de temps grâce au batching (rappel ce
   chapitre)
```
</details>

### Exercice 9.6.B — Le compromis du batching

Explique pourquoi le batching améliore le throughput global mais peut légèrement dégrader la latence d'une requête individuelle, en te basant sur l'intuition de ce chapitre.

<details>
<summary>👉 Solution</summary>

Le batching regroupe plusieurs requêtes avant de les traiter ensemble en une seule passe à travers le modèle, exploitant mieux le parallélisme matériel — ce qui améliore le THROUGHPUT global (plus de requêtes traitées au total, par unité de temps). Cependant, une requête individuelle arrivée en premier doit parfois **attendre** que le batch se remplisse suffisamment (ou qu'un délai maximal d'attente soit atteint) avant d'être effectivement traitée, plutôt que d'être traitée immédiatement et isolément — cette attente ajoute une LATENCE supplémentaire pour cette requête précise, comparée à un traitement immédiat sans regroupement. C'est exactement le compromis latence/throughput énoncé au début de ce chapitre.
</details>

### Exercice 9.6.C — Quand le caching n'est pas utile

Explique pourquoi le caching de réponses, tel que présenté dans ce chapitre, serait probablement peu utile pour une application qui génère des réponses créatives avec une température élevée (rappel Module 5, chapitre 5.4 ; Module 6, chapitre 6.2).

<details>
<summary>👉 Solution</summary>

Rappelle-toi le Module 5, chapitre 5.4 et le Module 6, chapitre 6.2 : une température élevée introduit volontairement de la **variabilité** dans les réponses générées — poser exactement la même question deux fois produirait, avec une température élevée, des réponses probablement **différentes** à chaque fois (c'est précisément l'objectif recherché pour une application créative). Le caching repose sur l'hypothèse qu'une requête identique doit produire une réponse identique et réutilisable — une hypothèse qui n'est plus valide dans ce contexte, puisque la réponse "correcte" et attendue change intentionnellement à chaque appel. Mettre en cache une seule réponse générée avec une température élevée, et la resservir systématiquement à chaque requête identique suivante, annulerait justement l'effet de variabilité créative recherché par cette configuration.
</details>

### Exercice 9.6.D — Concevoir une architecture d'inférence optimisée

En combinant les notions de ce chapitre et du Module 6, décris (sans code) une architecture d'inférence optimisée pour un chatbot de support client à fort volume, utilisant un LLM open-source hébergé localement.

<details>
<summary>👉 Solution</summary>

*(Exemple de réponse)*

```
1. QUANTIFICATION (rappel Module 6, chapitre 6.3) : utiliser une
   version quantifiée du LLM (par exemple INT8 ou INT4) pour réduire
   la latence d'inférence et l'empreinte mémoire nécessaire

2. BATCHING (ce chapitre) : regrouper les requêtes arrivant dans une
   fenêtre de temps courte (par exemple 50-100 millisecondes) pour
   les traiter ensemble, améliorant le throughput global du serveur
   d'inférence local

3. CACHING (ce chapitre) : mettre en cache les réponses aux questions
   FRÉQUENTES et FACTUELLES (comme "Quelle est votre politique de
   retour ?"), générées avec une température basse pour la
   cohérence — MAIS ne pas mettre en cache les échanges plus
   personnalisés ou conversationnels, où chaque contexte utilisateur diffère

4. SCALING HORIZONTAL (rappel Chapitre 9.2) : déployer plusieurs
   instances du serveur d'inférence local derrière un load balancer,
   pour absorber les pics de trafic au-delà de la capacité d'une
   seule instance
```
</details>

---

---

# ✅ QUIZ DE VALIDATION — MODULE 9

> Réponds sans regarder le cours. Objectif : 16/20 minimum avant de passer au module suivant.

**1.** Pourquoi un modèle entraîné n'a-t-il aucune valeur pratique sans être exposé via une API ?
**2.** À quoi sert Pydantic dans une API FastAPI servant un modèle IA ?
**3.** Quelle erreur de performance classique faut-il éviter concernant le chargement du modèle ?
**4.** À quoi sert un endpoint `/health` ?
**5.** Quelle est la différence entre scaling vertical et scaling horizontal ?
**6.** Pourquoi le scaling horizontal offre-t-il une meilleure résilience ?
**7.** Quel est le rôle d'un load balancer ?
**8.** Que trace MLflow pour chaque expérience d'entraînement ?
**9.** Pourquoi Git seul ne suffit-il pas pour versionner les données d'un projet ML ?
**10.** Quels sont les trois stades typiques d'un Model Registry ?
**11.** Quels sont les quatre éléments nécessaires à la reproductibilité complète d'un résultat ML ?
**12.** En quoi le CI/CD pour l'IA diffère-t-il du CI/CD logiciel classique ?
**13.** Quelle est la différence entre un test de performance minimale et un test de non-régression ?
**14.** Pourquoi la dégradation d'un modèle en production ne produit-elle généralement aucune erreur technique visible ?
**15.** Quelle est la différence entre Data Drift et Concept Drift ?
**16.** Comment peut-on détecter statistiquement un data drift ?
**17.** Pourquoi le monitoring de la performance réelle est-il complémentaire au monitoring du data drift ?
**18.** Quelle est la différence entre latence et throughput ?
**19.** Pourquoi le batching améliore-t-il le throughput au prix d'une latence légèrement supérieure ?
**20.** Pourquoi le caching de réponses est-il peu utile pour une application avec une température élevée ?

---

### 📝 Corrigé

**1.** Parce qu'un modèle isolé dans un fichier ou un notebook n'est accessible qu'à celui qui l'exécute directement ; une API le rend accessible à n'importe quelle application externe, sans connaissance des détails internes du modèle.
**2.** Pydantic valide automatiquement la structure et les contraintes des données entrantes, rejetant les requêtes malformées avant qu'elles n'atteignent le code du modèle, évitant des erreurs cryptiques ou des prédictions silencieusement fausses.
**3.** Charger le modèle à l'intérieur de la fonction traitant chaque requête, plutôt qu'une seule fois au démarrage de l'application — ce qui ajouterait une latence énorme et inutile à chaque appel.
**4.** À permettre aux systèmes d'infrastructure (load balancers, orchestrateurs) de vérifier régulièrement que le service est opérationnel, et de réagir automatiquement (redémarrage, retrait du trafic) s'il ne répond plus correctement.
**5.** Le scaling vertical augmente les ressources d'une seule machine ; le scaling horizontal ajoute plusieurs instances identiques du service, qui se partagent le trafic.
**6.** Parce qu'avec plusieurs instances indépendantes, la panne d'une seule instance n'interrompt pas le service entier, contrairement au scaling vertical où toute l'application repose sur une seule machine.
**7.** Il répartit le trafic entrant entre les différentes instances disponibles d'un service, en redirigeant automatiquement le trafic loin des instances défaillantes.
**8.** Les hyperparamètres utilisés (paramètres), les scores de performance obtenus (métriques), et les fichiers produits comme le modèle entraîné (artefacts).
**9.** Parce que Git n'est pas conçu pour stocker efficacement de gros fichiers de données ; DVC permet de versionner les données séparément tout en gardant une référence traçable dans Git.
**10.** Staging (candidat en test), Production (activement utilisé), et Archived (retiré mais conservé pour référence).
**11.** Le code (Git), les données (DVC), les hyperparamètres (MLflow), et l'environnement d'exécution (Docker).
**12.** Il ajoute des tests spécifiques aux données (conformité, valeurs manquantes) et au modèle (seuil de performance minimal, non-régression), en plus des tests de code classiques.
**13.** Le test de performance minimale vérifie qu'un seuil absolu fixe est dépassé ; le test de non-régression vérifie que le nouveau modèle n'est pas moins bon que la version actuellement en production, une comparaison relative.
**14.** Parce que le modèle continue de s'exécuter sans erreur technique et de produire des prédictions ; seule leur qualité se dégrade progressivement, un phénomène invisible sans surveillance active dédiée.
**15.** Le Data Drift concerne un changement dans la distribution des données d'entrée ; le Concept Drift concerne un changement dans la relation elle-même entre les entrées et la sortie, même si les entrées restent similaires.
**16.** En comparant les statistiques descriptives (moyenne, écart-type) ou via des tests statistiques formels (comme Kolmogorov-Smirnov) entre les données d'entraînement originales et les nouvelles données de production.
**17.** Parce qu'un concept drift peut survenir même sans changement détectable dans la distribution des données d'entrée ; seul le suivi direct de la performance réelle peut détecter ce type spécifique de dégradation.
**18.** La latence est le temps de réponse d'une seule requête individuelle ; le throughput est le nombre total de requêtes traitées par unité de temps.
**19.** Parce qu'une requête peut devoir attendre que le batch se remplisse avant d'être traitée, ajoutant une attente, mais ce regroupement permet ensuite de traiter plusieurs requêtes simultanément, améliorant l'efficacité globale du système.
**20.** Parce qu'une température élevée introduit intentionnellement de la variabilité dans les réponses générées ; mettre en cache et resservir systématiquement une seule réponse annulerait cet effet de créativité recherché.

---

---

# 🎯 PROJET DE SYNTHÈSE DU MODULE 9
## Un Pipeline de Production Complet — de l'API au Monitoring

**🔑 Pourquoi ce projet réunit tout le module**

Ce projet assemble chaque chapitre en un seul système cohérent : une API validée (9.1), conteneurisée avec scaling horizontal (9.2), un modèle tracké et versionné (9.3), protégé par un pipeline CI/CD (9.4), surveillé pour la dérive (9.5), et optimisé pour la production (9.6).

```python
# ─────────────────────────────────────────────
# ÉTAPE 1 (9.1) : API avec validation Pydantic et chargement au démarrage
# ─────────────────────────────────────────────

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import mlflow
import numpy as np
from functools import lru_cache
from scipy import stats

app = FastAPI(title="Pipeline de Production Complet")
modele = None
donnees_entrainement_reference = None   # rappel 9.5 : pour la détection de drift

@app.on_event("startup")
async def demarrage():
    global modele, donnees_entrainement_reference
    # ÉTAPE 2 (9.3) : charger le modèle depuis le Model Registry (stade Production)
    modele = mlflow.sklearn.load_model("models:/modele_churn_production/Production")
    donnees_entrainement_reference = np.load("stats_entrainement.npy")
    print("✅ Modèle chargé depuis le Model Registry (stade Production)")

class DonneesClient(BaseModel):
    age: float = Field(..., ge=18, le=100)
    anciennete: float = Field(..., ge=0, le=50)
    solde: float = Field(..., ge=0)

@app.get("/health")
async def health():
    return {"status": "ok", "modele_charge": modele is not None}

# ─────────────────────────────────────────────
# ÉTAPE 3 (9.6) : caching des prédictions identiques
# ─────────────────────────────────────────────

@lru_cache(maxsize=1000)
def predire_avec_cache(age, anciennete, solde):
    return float(modele.predict_proba(np.array([[age, anciennete, solde]]))[0, 1])

@app.post("/predire")
async def predire(donnees: DonneesClient):
    if modele is None:
        raise HTTPException(status_code=503, detail="Modèle non disponible")
    
    proba = predire_avec_cache(donnees.age, donnees.anciennete, donnees.solde)
    
    # ÉTAPE 4 (9.5) : surveiller le data drift à chaque requête
    _, p_value = stats.ks_2samp(donnees_entrainement_reference, [donnees.age])
    if p_value < 0.01:
        print(f"⚠️  Signal de drift potentiel sur l'âge (p-value={p_value:.4f})")
    
    return {"probabilite_churn": round(proba, 4)}
```

```yaml
# ─────────────────────────────────────────────
# ÉTAPE 5 (9.2) : conteneurisation avec scaling horizontal
# ─────────────────────────────────────────────
# docker-compose.yml
services:
  api:
    build: .
    deploy:
      replicas: 3   # scaling horizontal, rappel 9.2
```

```yaml
# ─────────────────────────────────────────────
# ÉTAPE 6 (9.4) : pipeline CI/CD avec garde-fous avant déploiement
# ─────────────────────────────────────────────
# .github/workflows/deploy.yml
jobs:
  valider-et-deployer:
    steps:
      - name: Tests de code
        run: pytest tests/
      - name: Valider les données
        run: python valider_donnees.py
      - name: Vérifier seuil de performance minimal (rappel 9.4)
        run: pytest tests/test_performance_minimale.py
      - name: Vérifier non-régression vs production actuelle
        run: pytest tests/test_non_regression.py
      - name: Construire et déployer si tout est validé
        run: docker build -t api-churn . && gcloud run deploy ...
```

| Étape du projet | Chapitre mobilisé |
|---|---|
| Validation Pydantic, chargement au démarrage, `/health` | 9.1 |
| `docker-compose` avec `replicas: 3` | 9.2 — Scaling horizontal |
| `mlflow.sklearn.load_model(".../Production")` | 9.3 — Model Registry |
| Pipeline CI/CD avec tests de performance et non-régression | 9.4 |
| `stats.ks_2samp` à chaque requête | 9.5 — Détection de drift |
| `@lru_cache` sur les prédictions | 9.6 — Caching |

**Retiens ceci :** aucun de ces éléments pris isolément ne garantit un système fiable — c'est leur **combinaison** qui transforme un modèle entraîné dans un notebook (Module 3) en un service que des milliers d'utilisateurs peuvent utiliser en toute confiance, mois après mois, malgré un monde en perpétuel changement.

---

---

# 📊 RÉCAPITULATIF DU MODULE 9

## Ce que tu as maîtrisé

| Compétence | Notion clé | Niveau attendu |
|---|---|---|
| Exposer un modèle via une API | FastAPI, Pydantic, chargement au démarrage | ⭐⭐⭐⭐⭐ |
| Déployer à grande échelle | Docker, scaling horizontal/vertical, load balancing | ⭐⭐⭐⭐☆ |
| Tracker et versionner rigoureusement | MLflow, DVC, Model Registry | ⭐⭐⭐⭐☆ |
| Automatiser la validation avant déploiement | CI/CD, tests de données/modèle | ⭐⭐⭐⭐☆ |
| Détecter la dégradation silencieuse | Data drift, concept drift, alerting | ⭐⭐⭐⭐⭐ |
| Optimiser pour la production réelle | Latence/throughput, batching, caching | ⭐⭐⭐☆☆ |

## Prochaine étape

Selon le plan de la formation, le module suivant est le **Module 10 — Cursus Ingénieur IA**, qui synthétise l'ensemble du parcours (Modules 1 à 9) en une feuille de route professionnelle complète : compétences recherchées, métiers accessibles, certifications, et projets de portfolio.

---

## ⚠️ ERREURS FRÉQUENTES DU MODULE 9

| Erreur | Conséquence | Solution |
|---|---|---|
| Charger le modèle à chaque requête | Latence énorme et inutile | Toujours charger au démarrage de l'application |
| Absence de validation Pydantic stricte | Données malformées atteignant le modèle, prédictions peu fiables | Définir des contraintes précises sur chaque champ d'entrée |
| Aucun tracking d'expériences | Impossible de reproduire ou comparer les résultats passés | Utiliser MLflow systématiquement, dès le premier entraînement |
| Déployer sans seuil de performance minimal | Un modèle défaillant peut passer en production sans alerte | Toujours intégrer des tests de performance dans le pipeline CI/CD |
| Aucun monitoring post-déploiement | Dégradation silencieuse non détectée pendant des mois | Mettre en place un suivi du data drift ET de la performance réelle |
| Mettre en cache des réponses à température élevée | Perte de la variabilité créative recherchée | Réserver le caching aux réponses factuelles et déterministes |
| Négliger le seuil `max_iterations` ou les limites de ressources | Coûts et latence incontrôlés à grande échelle | Toujours définir des limites explicites avant le déploiement |

---

*Module 9 terminé ✅ — Durée totale : 7 semaines*  
*Formation IA Complète — Module suivant : Module 10 — Cursus Ingénieur IA*
