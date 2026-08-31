# 🎓 FORMATION IA — MODULE 6
# IA Générative
### APIs des grands modèles, génération d'images, prompting avancé et automatisation

> **Professeur :** Dr. IA — Formation Complète  
> **Durée estimée :** 7 semaines (1–2h par jour)  
> **Prérequis :** Module 2 (Mathématiques), Module 4 (Deep Learning), Module 5 (NLP & LLMs)

---

## 🧭 COMMENT LIRE CE MODULE

Ce module te fait passer de "comprendre comment fonctionne un Transformer" (Module 5) à "utiliser concrètement, tous les jours, l'écosystème complet de l'IA générative" — les APIs de ChatGPT et Claude, les modèles qui tournent sur ta propre machine, la génération d'images, et l'art de bien formuler tes instructions.

**La structure de chaque chapitre reste identique aux modules précédents :**

```
1. 📖 EXPLICATION — toutes les notions, en langage simple et avec des analogies,
                     AVANT tout code
2. 💻 MISE EN PRATIQUE — le code qui implémente ce que tu viens de comprendre
3. 🏋️ EXERCICES — 4 exercices corrigés pour ancrer la compréhension
```

**Un rappel important :** ce module est volontairement plus **pratique et orienté outils** que les précédents — mais chaque outil que tu vas utiliser (APIs, Ollama, génération d'images) repose directement sur les mécanismes que tu as déjà compris en profondeur (attention, embeddings, softmax, température, gradient). Tu ne découvres pas une nouvelle boîte noire : tu apprends à **piloter** ce que tu sais déjà construire.

---

## 📋 PLAN DU MODULE 6

| Chapitre | Sujet | Durée estimée |
|---|---|---|
| **6.1** | Panorama des Grands Modèles de Langage | 0.5 semaine |
| **6.2** | Utiliser les APIs des LLMs (OpenAI, Anthropic) | 1.5 semaine |
| **6.3** | LLMs en Local avec Ollama | 1 semaine |
| **6.4** | Génération d'Images : les Modèles de Diffusion | 1.5 semaine |
| **6.5** | Le Prompting Avancé | 1.5 semaine |
| **6.6** | IA No-Code vs IA avec Code, et Automatisation | 1 semaine |

---

---

# 📘 CHAPITRE 6.1 — PANORAMA DES GRANDS MODÈLES DE LANGAGE

## Durée : 0.5 semaine

---

## 📖 EXPLICATION

### Rappel : tous les LLMs partagent la même architecture de base

Rappelle-toi le Module 5, chapitre 5.3 : GPT-4, Claude, Gemini, Mistral et LLaMA sont **tous** des architectures Transformer Decoder-only, entraînées avec le même principe fondamental (prédire le prochain token, Chapitre 5.5), et affinées avec des variantes de RLHF (Chapitre 5.5). Ce qui les différencie n'est donc pas leur mécanisme fondamental, mais des choix précis : la quantité et la qualité des données d'entraînement, la taille du modèle (nombre de paramètres), les techniques d'alignement spécifiques, et surtout, **leur mode de mise à disposition**.

---

### Modèles Propriétaires vs Modèles Open-Source : implications concrètes

**🔑 Intuition**

```
🔑 MODÈLES PROPRIÉTAIRES (GPT-4o, Claude, Gemini) :
   → Accessibles uniquement via une API payante (Chapitre 6.2)
   → Les poids du modèle (rappel Module 2 : les millions de
     paramètres appris) restent secrets, hébergés par l'entreprise
   → Souvent les modèles les plus performants sur les benchmarks
   → Aucun contrôle sur l'infrastructure, dépendance à un fournisseur

🔑 MODÈLES OPEN-SOURCE (LLaMA, Mistral, Qwen) :
   → Les poids sont publiquement téléchargeables
   → Peuvent tourner sur ton propre matériel (Chapitre 6.3) ou être
     fine-tunés librement (rappel Module 5, chapitre 5.5 : LoRA/QLoRA)
   → Contrôle total : confidentialité des données, pas de dépendance
     à un fournisseur externe
   → Nécessitent des ressources de calcul propres (GPU) pour un usage
     à grande échelle
```

**💡 Le compromis fondamental à retenir :** un modèle propriétaire t'offre généralement la meilleure performance "clé en main", sans effort d'infrastructure, mais avec une dépendance externe et des coûts récurrents à l'usage. Un modèle open-source t'offre le contrôle et la confidentialité, mais demande davantage d'expertise technique et de ressources matérielles à gérer toi-même.

---

### Comment Choisir un Modèle selon le Cas d'Usage

**🔑 Intuition**

Il n'existe pas de "meilleur modèle" universel — le bon choix dépend entièrement du contexte :

```
🔑 Besoin de la MEILLEURE performance possible, budget flexible
   → Modèle propriétaire de pointe (GPT-4o, Claude Opus)

🔑 Données sensibles/confidentielles qui ne doivent JAMAIS quitter
   ton infrastructure (santé, juridique, secret industriel)
   → Modèle open-source hébergé localement (Chapitre 6.3)

🔑 Application à très grande échelle, coût par requête critique
   → Modèle plus petit et économique (rappel Module 5 : un modèle
     avec moins de paramètres coûte moins cher en inférence)

🔑 Besoin de personnalisation profonde sur un domaine spécifique
   → Modèle open-source fine-tuné avec LoRA/QLoRA (Module 5, 5.5)
```

---

## 💻 MISE EN PRATIQUE

```python
# ─────────────────────────────────────────────
# COMPARER PLUSIEURS MODÈLES SUR UNE MÊME TÂCHE (à titre d'illustration)
# ─────────────────────────────────────────────

import time

# Simuler une grille de décision structurée (utile en pratique professionnelle)
criteres_decision = {
    "Confidentialité des données critiques": {
        "poids": 0.3,
        "scores": {"GPT-4o": 2, "Claude": 2, "Mistral (local)": 5, "LLaMA (local)": 5}
    },
    "Performance sur raisonnement complexe": {
        "poids": 0.3,
        "scores": {"GPT-4o": 5, "Claude": 5, "Mistral (local)": 3, "LLaMA (local)": 3}
    },
    "Coût à grande échelle": {
        "poids": 0.2,
        "scores": {"GPT-4o": 2, "Claude": 2, "Mistral (local)": 5, "LLaMA (local)": 5}
    },
    "Facilité de mise en œuvre": {
        "poids": 0.2,
        "scores": {"GPT-4o": 5, "Claude": 5, "Mistral (local)": 2, "LLaMA (local)": 2}
    },
}

modeles = ["GPT-4o", "Claude", "Mistral (local)", "LLaMA (local)"]
scores_finaux = {m: 0 for m in modeles}

for critere, info in criteres_decision.items():
    for modele in modeles:
        scores_finaux[modele] += info["poids"] * info["scores"][modele]

print("Score pondéré par modèle (sur 5) :")
for modele, score in sorted(scores_finaux.items(), key=lambda x: -x[1]):
    print(f"  {modele:20s} : {score:.2f}")
```

---

## 🏋️ EXERCICES — CHAPITRE 6.1

### Exercice 6.1.A — Propriétaire ou Open-Source ?

Pour chacun des scénarios suivants, recommande un modèle propriétaire ou open-source, en justifiant :

1. Une startup développe un chatbot grand public et veut la meilleure qualité de réponse possible, sans équipe d'infrastructure dédiée
2. Un hôpital veut analyser des dossiers médicaux sensibles avec un LLM, sans jamais transmettre ces données à un tiers
3. Une entreprise traite 10 millions de requêtes par jour et le coût par requête est un facteur décisif

<details>
<summary>👉 Solution</summary>

```
1. MODÈLE PROPRIÉTAIRE — pas d'équipe d'infrastructure dédiée, besoin
   de la meilleure qualité "clé en main" sans effort de déploiement ;
   les APIs propriétaires (Chapitre 6.2) sont idéales ici

2. MODÈLE OPEN-SOURCE hébergé localement — la confidentialité des
   données médicales est un impératif absolu, aucune donnée sensible
   ne doit transiter par une API externe ; un modèle local (Chapitre 6.3)
   garantit ce contrôle total

3. MODÈLE OPEN-SOURCE (ou propriétaire économique) — à 10 millions
   de requêtes par jour, le coût par requête devient déterminant ;
   un modèle open-source hébergé en propre, ou un modèle propriétaire
   plus petit/économique, réduirait significativement les coûts
   récurrents comparé à un modèle de pointe payant à l'usage
```
</details>

### Exercice 6.1.B — Rappel du Module 5 appliqué

Explique pourquoi, malgré leurs noms et fournisseurs différents, GPT-4, Claude et Mistral partagent tous fondamentalement le même mécanisme de génération de texte au niveau technique, en te référant au Module 5.

<details>
<summary>👉 Solution</summary>

Tous ces modèles sont des architectures Transformer Decoder-only (Module 5, chapitre 5.3), entraînés selon le même principe de pré-entraînement (prédire le prochain token, chapitre 5.5), et génèrent leur texte via le même processus de génération autorégressive token par token (chapitre 5.4), en utilisant le mécanisme d'attention pour construire des représentations contextuelles (chapitre 5.3). Les différences entre ces modèles résident dans les choix spécifiques de données d'entraînement, de taille, d'alignement (RLHF, chapitre 5.5), et de mise à disposition — pas dans le mécanisme fondamental sous-jacent, qui reste le même pour tous.
</details>

### Exercice 6.1.C — Compromis performance/confidentialité

Explique en une phrase le compromis fondamental entre un modèle propriétaire de pointe et un modèle open-source hébergé localement.

<details>
<summary>👉 Solution</summary>

Un modèle propriétaire de pointe offre généralement la meilleure performance "clé en main" sans effort d'infrastructure, mais implique une dépendance externe, des coûts récurrents à l'usage, et un transfert des données vers un tiers ; un modèle open-source hébergé localement offre un contrôle total sur la confidentialité des données et l'infrastructure, mais nécessite davantage d'expertise technique et de ressources matérielles propres à gérer.
</details>

### Exercice 6.1.D — Grille de décision pondérée

En reprenant la logique de la Mise en Pratique de ce chapitre, si le critère "Confidentialité des données critiques" recevait un poids de 0.6 (au lieu de 0.3) et que les autres poids étaient réduits proportionnellement, quel type de modèle serait probablement favorisé, et pourquoi ?

<details>
<summary>👉 Solution</summary>

Un poids de 0.6 sur la confidentialité favoriserait fortement les modèles hébergés localement (Mistral local, LLaMA local dans l'exemple), qui obtiennent le score maximal (5/5) sur ce critère, contre seulement 2/5 pour les modèles propriétaires. Même si ces modèles obtiennent des scores plus faibles sur d'autres critères (comme la performance sur le raisonnement complexe), le poids dominant accordé à la confidentialité ferait pencher la décision finale en leur faveur — illustrant concrètement comment la pondération des critères, et non uniquement la performance brute, doit guider un choix de modèle en contexte professionnel réel.
</details>

---

---

# 📘 CHAPITRE 6.2 — UTILISER LES APIS DES LLMS (OPENAI, ANTHROPIC)

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### Le Principe d'une API de LLM

**🔑 Intuition**

Une API (Application Programming Interface) de LLM fonctionne comme un **guichet automatique** : tu envoies une requête structurée (ton message, tes instructions), le serveur distant exécute le modèle (tous les mécanismes du Module 5 : tokenisation, attention, génération autorégressive), et te renvoie la réponse générée — sans que tu aies besoin d'héberger toi-même le modèle, ni de posséder le matériel GPU nécessaire pour le faire tourner.

---

### La Structure d'une Requête : Messages et Rôles

**🔑 Intuition**

Une conversation avec un LLM via API n'est pas un simple "texte brut" — elle est structurée sous forme d'une **liste de messages**, chacun associé à un **rôle** :

```
🔑 Rôle "system"    : les instructions générales données au modèle,
                       définissant son comportement, sa personnalité,
                       ses contraintes (invisible à l'utilisateur final)
🔑 Rôle "user"       : les messages envoyés par l'utilisateur
🔑 Rôle "assistant"  : les réponses précédemment générées par le modèle
```

**💡 Pourquoi structurer ainsi la conversation ?** Rappelle-toi le Module 5, chapitre 5.4 : la génération autorégressive dépend de **tout** le contexte précédent. En envoyant l'historique complet de la conversation (tous les messages user/assistant précédents) à chaque nouvelle requête, le modèle peut "se souvenir" du fil de la discussion — **le modèle lui-même n'a aucune mémoire persistante entre deux appels API distincts** ; c'est l'application cliente qui doit renvoyer tout l'historique à chaque fois pour simuler cette continuité.

```
🔑 Point crucial souvent mal compris :
   Le LLM ne "se souvient" de rien entre deux appels API séparés.
   Chaque requête est traitée de façon totalement indépendante.
   La "mémoire" d'une conversation n'existe QUE parce que l'application
   renvoie systématiquement tout l'historique des messages précédents
   à chaque nouvel appel.
```

---

### Les Paramètres de Génération : Rappel Direct du Module 5

Tu connais déjà, en profondeur, la signification technique de ces paramètres (Module 5, chapitre 5.4) :

```
🔑 temperature   : contrôle le caractère déterministe/créatif de la
                    génération (rappel : modifie la distribution de
                    probabilité avant sélection du token)
🔑 max_tokens    : limite le nombre de tokens générés dans la réponse
                    (rappel Module 5, chapitre 5.1 : coût facturé au token)
🔑 top_p         : Nucleus Sampling, limite dynamiquement les candidats
                    considérés à chaque étape de génération
```

**💡 Ce qui change en pratique via une API :** ces paramètres, que tu as vus s'appliquer directement dans le code du Chapitre 5.4, sont désormais simplement des **arguments** de ta requête API — le mécanisme sous-jacent reste rigoureusement identique.

---

### Le Streaming : recevoir la réponse token par token

**🔑 Intuition**

Rappelle-toi le Module 5, chapitre 5.4 : un LLM génère sa réponse **token par token**, de façon séquentielle. Sans streaming, l'application attend que **la totalité** de la réponse soit générée avant de te l'afficher d'un coup — ce qui peut sembler long pour une réponse détaillée. Avec le **streaming**, chaque token est transmis et affiché **dès qu'il est généré**, produisant cet effet familier de texte qui "s'écrit progressivement" à l'écran, comme tu l'observes avec ChatGPT ou Claude.

---

### La Vision Multimodale : traiter du texte ET des images

**🔑 Intuition**

Certains LLMs modernes (GPT-4o, Claude) peuvent traiter des **images** en plus du texte, dans une seule requête. Techniquement, l'image est convertie en une représentation vectorielle (rappel Module 4, chapitre 4.4 : un CNN, ou une architecture Transformer adaptée à l'image), puis ces représentations sont intégrées dans le même espace que les embeddings de texte (rappel Module 5, chapitre 5.2), permettant au mécanisme d'attention (Module 5, chapitre 5.3) de "raisonner" conjointement sur le texte et l'image envoyés.

---

### Function Calling / Tool Use : donner des "capacités" à un LLM

**🔑 Intuition — le LLM comme "cerveau" avec des "mains"**

Un LLM seul ne peut que **générer du texte** — il ne peut pas consulter la météo en temps réel, exécuter du code, ou interroger une base de données. Le **Function Calling** (ou Tool Use) permet de décrire au modèle un ensemble d'**outils disponibles** (des fonctions, avec leur nom, leur description, leurs paramètres attendus), et de lui laisser **décider lui-même** quand et comment les utiliser pour répondre à une requête.

```
🔑 Principe du Function Calling :

1. Tu décris au modèle les outils disponibles (ex: "get_weather(ville)")
2. L'utilisateur pose une question ("Quel temps fait-il à Paris ?")
3. Le modèle, plutôt que de générer une réponse directe, génère un
   APPEL DE FONCTION structuré : get_weather(ville="Paris")
4. TON application exécute réellement cette fonction (le modèle ne
   l'exécute JAMAIS lui-même, il se contente de la "demander")
5. Le résultat de la fonction est renvoyé au modèle, qui formule
   alors sa réponse finale en langage naturel, informée par ce résultat
```

**💡 Pourquoi c'est fondamental :** c'est exactement ce mécanisme qui, en étant systématisé et enchaîné, donne naissance aux **agents IA** (Module 0, approfondis dans un module ultérieur) — des systèmes capables d'utiliser des outils, de raisonner sur les résultats, et d'agir de façon autonome.

---

## 💻 MISE EN PRATIQUE

```python
from openai import OpenAI
import anthropic

# ─────────────────────────────────────────────
# 1. REQUÊTE SIMPLE — OpenAI
# ─────────────────────────────────────────────

client_openai = OpenAI(api_key="sk-...")

reponse = client_openai.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "Tu es un professeur de mathématiques bienveillant."},
        {"role": "user", "content": "Explique-moi la dérivée en une phrase simple."}
    ],
    temperature=0.7,      # rappel Module 5, chapitre 5.4
    max_tokens=150
)
print(reponse.choices[0].message.content)

# ─────────────────────────────────────────────
# 2. GÉRER L'HISTORIQUE DE CONVERSATION MANUELLEMENT
# ─────────────────────────────────────────────

historique = [
    {"role": "system", "content": "Tu es un assistant concis."},
]

def envoyer_message(message_utilisateur):
    historique.append({"role": "user", "content": message_utilisateur})
    reponse = client_openai.chat.completions.create(
        model="gpt-4o", messages=historique, temperature=0.5
    )
    reponse_texte = reponse.choices[0].message.content
    historique.append({"role": "assistant", "content": reponse_texte})
    return reponse_texte

print(envoyer_message("Mon prénom est Nasreddine."))
print(envoyer_message("Quel est mon prénom ?"))   # le modèle "se souvient" via l'historique renvoyé

# ─────────────────────────────────────────────
# 3. STREAMING
# ─────────────────────────────────────────────

with client_openai.chat.completions.stream(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Raconte une courte histoire sur l'IA."}]
) as stream:
    for evenement in stream:
        if evenement.type == "content.delta":
            print(evenement.delta, end="", flush=True)  # affiché token par token

# ─────────────────────────────────────────────
# 4. ANTHROPIC (CLAUDE) — structure très similaire
# ─────────────────────────────────────────────

client_anthropic = anthropic.Anthropic(api_key="sk-ant-...")

message = client_anthropic.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    system="Tu es un expert en code Python.",
    messages=[{"role": "user", "content": "Explique la récursivité avec un exemple."}]
)
print(message.content[0].text)

# ─────────────────────────────────────────────
# 5. VISION — analyser une image
# ─────────────────────────────────────────────

reponse_vision = client_openai.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Que vois-tu sur cette image ?"},
            {"type": "image_url", "image_url": {"url": "https://exemple.com/image.jpg"}}
        ]
    }]
)
print(reponse_vision.choices[0].message.content)

# ─────────────────────────────────────────────
# 6. FUNCTION CALLING — donner des outils au modèle
# ─────────────────────────────────────────────

def get_weather(ville):
    """Fonction fictive simulant un appel météo réel."""
    return f"Il fait 18°C et ensoleillé à {ville}."

outils_disponibles = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Obtient la météo actuelle pour une ville donnée",
        "parameters": {
            "type": "object",
            "properties": {"ville": {"type": "string", "description": "Le nom de la ville"}},
            "required": ["ville"]
        }
    }
}]

reponse_fonction = client_openai.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Quel temps fait-il à Marseille ?"}],
    tools=outils_disponibles
)

appel = reponse_fonction.choices[0].message.tool_calls[0]
print(f"Le modèle demande à appeler : {appel.function.name}({appel.function.arguments})")

# TON application exécute réellement la fonction
import json
arguments = json.loads(appel.function.arguments)
resultat_fonction = get_weather(**arguments)
print(f"Résultat de la fonction : {resultat_fonction}")
# Ce résultat serait ensuite renvoyé au modèle pour formuler sa réponse finale
```

---

## 🏋️ EXERCICES — CHAPITRE 6.2

### Exercice 6.2.A — Comprendre l'absence de mémoire native

Un développeur constate que son chatbot "oublie" systématiquement le prénom de l'utilisateur dès le message suivant, alors qu'il l'avait pourtant mentionné juste avant. Explique la cause probable de ce bug, en te référant à ce chapitre.

<details>
<summary>👉 Solution</summary>

La cause la plus probable est que le développeur **n'envoie pas l'historique complet de la conversation** à chaque nouvel appel API — il envoie probablement uniquement le dernier message de l'utilisateur, sans les messages précédents. Rappelle-toi ce chapitre : le LLM ne possède **aucune mémoire persistante** entre deux appels API distincts ; c'est entièrement la responsabilité de l'application cliente de renvoyer systématiquement tout l'historique pertinent (comme dans l'exemple de code de ce chapitre avec la liste `historique`) pour que le modèle puisse "se souvenir" d'informations mentionnées précédemment.
</details>

### Exercice 6.2.B — Choisir les bons paramètres

Pour chacun des cas d'usage suivants, recommande des valeurs approximatives de `temperature` (rappel Module 5, chapitre 5.4) :

1. Un assistant qui génère des résumés de rapports financiers, où l'exactitude est critique
2. Un outil d'aide à l'écriture créative pour des scénarios de films
3. Un chatbot de support client répondant à des questions factuelles sur un produit

<details>
<summary>👉 Solution</summary>

```
1. Température BASSE (ex: 0.1-0.3) — l'exactitude et la cohérence
   priment, on veut minimiser la variabilité et le risque
   d'hallucination sur des données financières sensibles

2. Température ÉLEVÉE (ex: 0.9-1.2) — la créativité et l'originalité
   sont explicitement recherchées pour un usage créatif

3. Température BASSE à MODÉRÉE (ex: 0.2-0.5) — les réponses factuelles
   sur un produit doivent rester cohérentes et fiables, sans variation
   créative superflue qui pourrait introduire des erreurs
```
</details>

### Exercice 6.2.C — Tracer le cycle du Function Calling

Remets dans le bon ordre les étapes suivantes du Function Calling, décrit dans ce chapitre :

```
A. Le modèle formule sa réponse finale en langage naturel
B. L'application exécute réellement la fonction demandée
C. Le modèle génère un appel de fonction structuré (pas une réponse directe)
D. L'utilisateur pose une question nécessitant un outil externe
E. Le résultat de la fonction est renvoyé au modèle
```

<details>
<summary>👉 Solution</summary>

```
Ordre correct : D → C → B → E → A

D. L'utilisateur pose une question nécessitant un outil externe
C. Le modèle génère un appel de fonction structuré (pas une réponse directe)
B. L'application exécute réellement la fonction demandée (le modèle
   ne l'exécute JAMAIS lui-même)
E. Le résultat de la fonction est renvoyé au modèle
A. Le modèle formule sa réponse finale en langage naturel, informée
   par ce résultat
```
</details>

### Exercice 6.2.D — Streaming ou réponse complète ?

Pour chacun des cas d'usage suivants, indique s'il est préférable d'utiliser le streaming ou d'attendre la réponse complète :

1. Une interface de chat conversationnelle affichée à l'utilisateur en temps réel
2. Un script d'analyse automatisée qui traite ensuite programmatiquement la réponse complète du modèle (par exemple, pour l'extraire dans un format JSON)

<details>
<summary>👉 Solution</summary>

```
1. STREAMING — améliore significativement l'expérience utilisateur
   perçue, en affichant la réponse progressivement plutôt que de
   faire attendre l'utilisateur devant un écran figé jusqu'à la fin
   de la génération complète

2. RÉPONSE COMPLÈTE (sans streaming) — un script automatisé qui doit
   traiter/parser la réponse entière (par exemple, extraire un objet
   JSON structuré) a besoin de la réponse complète et cohérente avant
   de pouvoir la traiter correctement ; le streaming n'apporte ici
   aucun bénéfice et complexifie inutilement le code
```
</details>

---

---

# 📘 CHAPITRE 6.3 — LLMS EN LOCAL AVEC OLLAMA

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Pourquoi Faire Tourner un LLM Localement ?

**🔑 Intuition**

Rappelle-toi le Chapitre 6.1 : les modèles open-source peuvent être exécutés directement sur ta propre machine, sans passer par une API externe. **Trois raisons principales motivent ce choix :**

```
🔑 CONFIDENTIALITÉ : aucune donnée ne quitte ta machine — un
   avantage décisif pour des données sensibles (Chapitre 6.1)

🔑 COÛT : après l'investissement matériel initial (ou avec du
   matériel déjà possédé), l'utilisation devient GRATUITE, sans
   facturation à l'usage (contrairement aux APIs propriétaires)

🔑 LATENCE ET DISPONIBILITÉ : pas de dépendance à une connexion
   internet ni aux limites de débit (rate limits) d'un fournisseur
   externe
```

**⚠️ Le compromis inévitable :** faire tourner localement un modèle aussi performant que GPT-4 nécessiterait un matériel absolument hors de portée pour un usage individuel (rappel Module 0 : ces modèles comptent des centaines de milliards de paramètres). En pratique, les modèles utilisés localement sont généralement plus petits (7B à 70B paramètres) et donc légèrement moins capables sur des tâches très complexes — un compromis performance/contrôle à évaluer selon le besoin réel.

---

### La Quantification : rendre les grands modèles accessibles localement

**🔑 Intuition — rappel direct du Module 5, chapitre 5.5 (QLoRA)**

Rappelle-toi le Module 2, chapitre 2.1.1 : les poids d'un réseau sont normalement stockés en `float32` (32 bits) ou `float16` (16 bits) — rappelle-toi aussi le Module 5, chapitre 5.5 : QLoRA réduit cette précision à seulement 4 bits pour économiser drastiquement la mémoire pendant le Fine-Tuning. **La quantification appliquée à l'inférence (l'utilisation d'un modèle déjà entraîné) suit exactement le même principe.**

```
🔑 Précision FP32 (32 bits par poids) : la plus précise, la plus lourde
🔑 Précision FP16 (16 bits par poids) : 2× moins de mémoire, précision suffisante en général
🔑 Précision INT8 (8 bits par poids)  : 4× moins de mémoire que FP32
🔑 Précision INT4 (4 bits par poids)  : 8× moins de mémoire que FP32 !
```

**🧮 Exemple concret** : un modèle de 7 milliards de paramètres (7B), stocké en `float32`, nécessiterait environ `7 × 10⁹ × 4 octets = 28 Go` de mémoire — hors de portée pour la plupart des ordinateurs personnels. Le même modèle, quantifié en INT4, ne nécessiterait plus qu'environ `7 × 10⁹ × 0.5 octet = 3.5 Go` — parfaitement exécutable sur un ordinateur portable grand public !

**💡 Le compromis de la quantification :** réduire la précision des poids introduit une légère perte de qualité dans les réponses du modèle (une approximation moins précise de ses poids originaux), mais cette dégradation reste souvent minime en pratique par rapport au gain massif en accessibilité — c'est ce compromis qui rend possible l'exécution de LLMs performants sur du matériel grand public.

---

### Comment Ollama Simplifie le Déploiement Local

**🔑 Intuition**

Faire tourner manuellement un LLM localement implique normalement de gérer soi-même le téléchargement des poids du modèle, la quantification, le chargement en mémoire, et une interface pour interagir avec lui — un processus technique non-trivial. **Ollama automatise entièrement cette chaîne** : une seule commande (`ollama pull <modèle>`) télécharge un modèle déjà quantifié et prêt à l'emploi, et `ollama run <modèle>` le lance immédiatement, avec une API locale compatible avec les mêmes patterns que les APIs cloud du Chapitre 6.2.

---

## 💻 MISE EN PRATIQUE

```bash
# ─────────────────────────────────────────────
# 1. INSTALLATION ET TÉLÉCHARGEMENT DE MODÈLES
# ─────────────────────────────────────────────

# Installation (macOS/Linux)
curl -fsSL https://ollama.ai/install.sh | sh

# Télécharger différents modèles quantifiés
ollama pull mistral       # ~4 Go, modèle 7B quantifié
ollama pull llama3.2      # Meta LLaMA 3.2
ollama pull phi3          # Microsoft Phi-3, plus léger encore

# Lancer une conversation interactive directement dans le terminal
ollama run mistral
```

```python
# ─────────────────────────────────────────────
# 2. UTILISER OLLAMA DEPUIS PYTHON — API locale
# ─────────────────────────────────────────────

import ollama

reponse = ollama.chat(
    model="mistral",
    messages=[{"role": "user", "content": "Explique les réseaux de neurones en 3 phrases."}]
)
print(reponse["message"]["content"])

# ─────────────────────────────────────────────
# 3. STRUCTURE IDENTIQUE AU CHAPITRE 6.2 — historique, streaming
# ─────────────────────────────────────────────

historique_local = [
    {"role": "system", "content": "Tu es un assistant technique concis."}
]

def envoyer_message_local(message):
    historique_local.append({"role": "user", "content": message})
    reponse = ollama.chat(model="mistral", messages=historique_local)
    reponse_texte = reponse["message"]["content"]
    historique_local.append({"role": "assistant", "content": reponse_texte})
    return reponse_texte

print(envoyer_message_local("Qu'est-ce qu'un gradient ?"))

# Streaming avec Ollama — même principe qu'au Chapitre 6.2
for morceau in ollama.chat(model="mistral",
                            messages=[{"role": "user", "content": "Raconte une blague sur l'IA"}],
                            stream=True):
    print(morceau["message"]["content"], end="", flush=True)

# ─────────────────────────────────────────────
# 4. COMPARER LA TAILLE MÉMOIRE THÉORIQUE SELON LA QUANTIFICATION
# ─────────────────────────────────────────────

def taille_memoire_go(nb_parametres_milliards, bits_par_poids):
    octets_par_poids = bits_par_poids / 8
    taille_octets = nb_parametres_milliards * 1e9 * octets_par_poids
    return taille_octets / 1e9  # conversion en Go

modele_taille = 7  # milliards de paramètres
for precision, bits in [("FP32", 32), ("FP16", 16), ("INT8", 8), ("INT4", 4)]:
    taille = taille_memoire_go(modele_taille, bits)
    print(f"Modèle {modele_taille}B en {precision} : {taille:.1f} Go")
```

---

## 🏋️ EXERCICES — CHAPITRE 6.3

### Exercice 6.3.A — Calculer la mémoire nécessaire

Un modèle de 13 milliards de paramètres est disponible en FP16 (16 bits) et en INT4 (4 bits). Calcule la mémoire nécessaire pour chaque version, et détermine laquelle pourrait tourner sur un ordinateur portable disposant de 8 Go de RAM disponible.

<details>
<summary>👉 Solution</summary>

```
FP16 : 13 × 10⁹ × (16/8) octets = 13 × 10⁹ × 2 = 26 × 10⁹ octets = 26 Go
INT4 : 13 × 10⁹ × (4/8) octets = 13 × 10⁹ × 0.5 = 6.5 × 10⁹ octets = 6.5 Go

Seule la version INT4 (6.5 Go) pourrait tourner sur un ordinateur
disposant de 8 Go de RAM disponible — la version FP16 (26 Go) est
totalement hors de portée pour cette configuration. C'est exactement
pour cette raison que la quantification est indispensable pour
l'exécution locale de modèles de cette taille.
```
</details>

### Exercice 6.3.B — Local ou API cloud ?

Pour chacun des scénarios suivants, recommande d'utiliser un modèle local (Ollama) ou une API cloud (Chapitre 6.2), en justifiant :

1. Un développeur teste rapidement des prototypes d'application IA, sans budget dédié
2. Une entreprise a besoin d'une disponibilité garantie à 99.99% et d'une performance maximale pour un produit en production à grande échelle
3. Un chercheur travaille sur des données médicales confidentielles qui ne peuvent légalement pas quitter son infrastructure

<details>
<summary>👉 Solution</summary>

```
1. LOCAL (Ollama) — prototypage rapide sans coûts récurrents,
   idéal pour tester des idées sans engager de budget API

2. API CLOUD — garantie de disponibilité et de performance à cette
   échelle nécessite l'infrastructure massive d'un fournisseur cloud
   spécialisé, difficile à égaler avec une infrastructure locale

3. LOCAL (Ollama ou équivalent) — contrainte légale/réglementaire de
   confidentialité des données médicales, exactement le cas d'usage
   prioritaire pour l'exécution locale évoqué au Chapitre 6.1
```
</details>

### Exercice 6.3.C — Le compromis de la quantification

Explique en une phrase pourquoi la quantification introduit une perte de qualité, mais pourquoi ce compromis reste souvent avantageux en pratique.

<details>
<summary>👉 Solution</summary>

La quantification réduit la précision numérique de chaque poids du modèle (par exemple, de 32 bits à seulement 4 bits), ce qui introduit nécessairement une approximation moins fine par rapport aux poids originaux appris pendant l'entraînement ; mais en pratique, cette perte de qualité reste souvent minime, tandis que le gain en accessibilité est massif (un modèle autrement injouable sur du matériel grand public devient utilisable), rendant ce compromis très avantageux dans la grande majorité des cas d'usage.
</details>

### Exercice 6.3.D — Comparer les architectures API

En comparant le code du Chapitre 6.2 (API OpenAI) et de ce chapitre (Ollama local), identifie deux points communs dans la structure du code, et explique pourquoi cette similarité est un avantage pratique.

<details>
<summary>👉 Solution</summary>

```
Points communs :
1. Les deux utilisent une LISTE DE MESSAGES avec des rôles
   (system, user, assistant) — exactement la même structure
2. Les deux permettent le STREAMING de la réponse token par token

Avantage pratique : cette similarité de structure permet à un
développeur de PASSER FACILEMENT d'une API cloud à un modèle local
(ou inversement) sans devoir réécrire toute la logique applicative —
seule la ligne d'initialisation du client change, le reste du code
(gestion de l'historique, streaming, paramètres) reste quasiment
identique. C'est un avantage précieux pour tester différentes
solutions ou pour concevoir une application capable de basculer
entre plusieurs fournisseurs selon les besoins.
```
</details>

---

---

# 📘 CHAPITRE 6.4 — GÉNÉRATION D'IMAGES : LES MODÈLES DE DIFFUSION

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### L'Intuition Fondamentale : Apprendre à "Débruiter" une Image

**🔑 Intuition — l'analogie de la sculpture de glace qui fond**

Imagine une sculpture de glace magnifique qui, placée au soleil, fond progressivement, étape par étape, jusqu'à devenir une simple flaque d'eau informe. Ce processus de "destruction progressive" (de la sculpture nette vers le chaos total) est **facile à observer et à simuler** — on sait exactement comment la glace fond.

**Le processus inverse — reconstruire la sculpture précise à partir de la flaque d'eau — semble, lui, impossible.** C'est pourtant exactement le pari des **modèles de diffusion** : entraîner un réseau de neurones à apprendre ce processus inverse, étape par étape, pour un phénomène analogue mais appliqué aux images — non pas la fonte, mais l'ajout progressif de **bruit aléatoire**.

---

### Le Processus Forward : Ajouter du Bruit Progressivement

**🔑 Intuition**

Le "processus forward" (facile à définir, comme la fonte de la glace) consiste à prendre une image nette, et à lui ajouter, **étape par étape**, une petite quantité de bruit aléatoire (rappel Module 2, chapitre 2.3.3 : un bruit tiré d'une loi normale). Après suffisamment d'étapes (souvent plusieurs centaines), l'image devient **indiscernable d'un bruit purement aléatoire** — toute l'information visuelle originale a été détruite.

```
Image nette → +bruit → +bruit → +bruit → ... → Bruit pur (aucune info visuelle)
   (étape 0)   (étape 1) (étape 2)          (étape T, ex: T=1000)
```

**💡 Pourquoi ce processus forward est-il "facile" ?** Parce qu'il ne nécessite **aucun apprentissage** — c'est une simple formule mathématique fixe (ajouter du bruit gaussien selon un calendrier prédéfini), directement calculable, sans réseau de neurones.

---

### Le Processus Reverse : Apprendre à Débruiter, Étape par Étape

**🔑 Intuition — le cœur de l'entraînement**

Le vrai défi (et l'objet de l'apprentissage) est le processus **inverse** : partir d'une image bruitée, et prédire **quel bruit précis a été ajouté** à cette étape, pour pouvoir le soustraire et se rapprocher un peu de l'image originale. Un réseau de neurones (typiquement une architecture U-Net, basée sur les CNN du Module 4, chapitre 4.4) est entraîné pour cette tâche précise.

```
🔑 Objectif d'entraînement du réseau de diffusion :

Entrée  : une image bruitée à l'étape t (+ l'information de l'étape t elle-même)
Sortie  : une PRÉDICTION du bruit exact qui a été ajouté à cette étape

Fonction de coût (rappel Module 2, chapitre 2.4.1) : MSE entre le bruit
   RÉELLEMENT ajouté (qu'on connaît, puisque c'est NOUS qui l'avons
   ajouté pendant le processus forward) et le bruit PRÉDIT par le réseau
```

**💡 Le point clé : c'est un problème d'apprentissage supervisé classique !** Rappelle-toi le Module 3 : on connaît la "vraie réponse" (le bruit qu'on a nous-mêmes ajouté), donc on peut calculer une erreur, un gradient (Module 2), et entraîner le réseau par descente de gradient — exactement le même principe que tous les modèles vus jusqu'ici, appliqué à cette tâche spécifique de prédiction de bruit.

**Une fois ce réseau bien entraîné**, on peut l'utiliser pour générer une **toute nouvelle image** : on part d'un bruit purement aléatoire, et on demande au réseau de prédire (et de soustraire) le bruit, étape par étape, en remontant progressivement de "bruit pur" vers une image de plus en plus nette et cohérente.

```
Bruit pur → [réseau prédit le bruit] → un peu moins bruité → ... → Image finale nette
```

---

### Comment le Texte Guide-t-il la Génération ? Le Rôle de l'Attention

**🔑 Intuition — rappel direct du Module 5**

Comment un modèle comme Stable Diffusion transforme-t-il le prompt textuel "*un chat astronaute sur la lune, style peinture à l'huile*" en une image cohérente avec cette description ? La réponse mobilise directement ce que tu as appris au Module 5 !

```
🔑 Le processus de "text-to-image" :

1. Le prompt textuel est transformé en TOKENS (Module 5, chapitre 5.1)
2. Ces tokens sont convertis en EMBEDDINGS (Module 5, chapitre 5.2),
   généralement via un modèle spécialisé (comme CLIP) entraîné à
   relier texte et image dans un espace vectoriel commun
3. À CHAQUE étape du processus de débruitage, le réseau U-Net utilise
   un mécanisme de CROSS-ATTENTION (une variante de l'attention du
   Module 5, chapitre 5.3) pour "consulter" ces embeddings de texte,
   et orienter sa prédiction de débruitage dans la direction décrite
   par le prompt
```

**💡 Le point crucial :** à chaque étape du débruitage, le réseau ne se contente pas de "deviner" une image plausible au hasard — il utilise l'attention pour vérifier, à chaque étape, que l'image en cours de formation reste bien alignée avec la description textuelle fournie, orientant progressivement le bruit vers une image qui "correspond" au prompt.

---

### Les Paramètres Clés de la Génération d'Images

**🔑 Intuition**

```
🔑 num_inference_steps (nombre d'étapes de débruitage) :
   → Plus d'étapes = généralement plus de détails et de qualité,
     mais plus lent à générer (rappel : chaque étape est un passage
     complet à travers le réseau U-Net)

🔑 guidance_scale (force de fidélité au prompt) :
   → Contrôle à quel point le modèle doit "suivre strictement" le
     prompt textuel versus se laisser guider par son propre "instinct"
     visuel appris ; une valeur élevée force une fidélité plus stricte
     au texte, au risque parfois de moins de créativité/cohérence visuelle

🔑 negative_prompt (prompt négatif) :
   → Décrit explicitement ce qu'on NE VEUT PAS voir dans l'image
     (ex: "flou, mauvaise qualité, déformé"), guidant le processus
     de débruitage à l'écart de ces caractéristiques indésirables
```

---

## 💻 MISE EN PRATIQUE

```python
from diffusers import StableDiffusionPipeline
import torch
import matplotlib.pyplot as plt

# ─────────────────────────────────────────────
# 1. CHARGER UN MODÈLE DE DIFFUSION PRÉ-ENTRAÎNÉ
# ─────────────────────────────────────────────

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16   # rappel Chapitre 6.3 : quantification pour économiser la mémoire
).to("cuda")

# ─────────────────────────────────────────────
# 2. GÉNÉRER UNE IMAGE — les paramètres expliqués dans ce chapitre
# ─────────────────────────────────────────────

image = pipe(
    prompt="Un paysage montagneux au coucher de soleil, style peinture à l'huile, très détaillé",
    negative_prompt="flou, mauvaise qualité, distorsion",
    num_inference_steps=30,     # rappel : plus d'étapes = plus de détails, plus lent
    guidance_scale=7.5           # rappel : fidélité au prompt
).images[0]

image.save("paysage_genere.png")

# ─────────────────────────────────────────────
# 3. VISUALISER L'EFFET DU NOMBRE D'ÉTAPES DE DÉBRUITAGE
# ─────────────────────────────────────────────

fig, axes = plt.subplots(1, 4, figsize=(16, 4))
for ax, n_steps in zip(axes, [5, 15, 30, 50]):
    image_test = pipe(
        prompt="Un chat astronaute sur la lune",
        num_inference_steps=n_steps,
        guidance_scale=7.5
    ).images[0]
    ax.imshow(image_test)
    ax.set_title(f"{n_steps} étapes")
    ax.axis("off")
plt.suptitle("Effet du Nombre d'Étapes de Débruitage sur la Qualité")
plt.tight_layout()
plt.show()

# ─────────────────────────────────────────────
# 4. VISUALISER L'EFFET DU GUIDANCE SCALE
# ─────────────────────────────────────────────

fig, axes = plt.subplots(1, 3, figsize=(13, 5))
for ax, guidance in zip(axes, [2.0, 7.5, 15.0]):
    image_test = pipe(
        prompt="Un dragon rouge crachant du feu, style fantastique",
        num_inference_steps=30,
        guidance_scale=guidance
    ).images[0]
    ax.imshow(image_test)
    ax.set_title(f"Guidance Scale = {guidance}")
    ax.axis("off")
plt.suptitle("Effet du Guidance Scale sur la Fidélité au Prompt")
plt.tight_layout()
plt.show()

# ─────────────────────────────────────────────
# 5. SIMULER LE PROCESSUS FORWARD (ajout progressif de bruit)
# ─────────────────────────────────────────────

import numpy as np
from PIL import Image

def ajouter_bruit_progressif(image_array, niveau_bruit):
    """Simule le processus FORWARD : ajouter du bruit gaussien (rappel Module 2)."""
    bruit = np.random.normal(0, niveau_bruit, image_array.shape)
    image_bruitee = np.clip(image_array + bruit, 0, 1)
    return image_bruitee

image_originale = np.array(Image.open("paysage_genere.png").convert("RGB")) / 255.0

fig, axes = plt.subplots(1, 5, figsize=(18, 4))
niveaux = [0, 0.1, 0.3, 0.6, 1.0]
for ax, niveau in zip(axes, niveaux):
    img_bruitee = ajouter_bruit_progressif(image_originale, niveau)
    ax.imshow(img_bruitee)
    ax.set_title(f"Bruit = {niveau}")
    ax.axis("off")
plt.suptitle("Processus FORWARD Simulé — de l'Image Nette au Bruit Pur")
plt.tight_layout()
plt.show()
```

---

## 🏋️ EXERCICES — CHAPITRE 6.4

### Exercice 6.4.A — Forward ou Reverse ?

Pour chacune des descriptions suivantes, indique s'il s'agit du processus Forward ou du processus Reverse d'un modèle de diffusion :

1. Un réseau de neurones prédit le bruit ajouté à une image pour pouvoir le soustraire
2. Une formule mathématique fixe ajoute progressivement du bruit gaussien à une image nette
3. On part d'un bruit purement aléatoire pour générer progressivement une image cohérente

<details>
<summary>👉 Solution</summary>

```
1. REVERSE — c'est le réseau de neurones ENTRAÎNÉ qui prédit le bruit
   à retirer, la tâche d'apprentissage centrale de ce chapitre

2. FORWARD — processus fixe, ne nécessitant AUCUN apprentissage,
   simple ajout de bruit selon une formule prédéfinie

3. REVERSE — c'est précisément le processus utilisé pour GÉNÉRER une
   nouvelle image à partir de bruit pur, en utilisant le réseau
   entraîné à chaque étape
```
</details>

### Exercice 6.4.B — Pourquoi c'est un apprentissage supervisé classique

Explique pourquoi l'entraînement d'un modèle de diffusion peut être qualifié d'apprentissage SUPERVISÉ (rappel Module 3), en identifiant précisément ce qui joue le rôle de "l'entrée" et ce qui joue le rôle du "label/vraie réponse".

<details>
<summary>👉 Solution</summary>

C'est un apprentissage supervisé car on connaît la "vraie réponse" à chaque exemple d'entraînement : l'ENTRÉE est l'image bruitée à une étape donnée (produite par le processus forward, qu'on contrôle nous-mêmes), et le LABEL (la vraie réponse à prédire) est exactement le bruit qu'on a nous-mêmes ajouté à cette étape précise — puisque c'est nous qui l'avons généré pendant le processus forward, on le connaît avec certitude. Le réseau est alors entraîné, exactement comme au Module 4, à minimiser l'écart (MSE, rappel Module 2, chapitre 2.4.1) entre le bruit qu'il prédit et ce bruit réel connu — un cycle d'entraînement classique de prédiction, calcul d'erreur, et descente de gradient (Module 2, 2.4.2).
</details>

### Exercice 6.4.C — Effet des paramètres de génération

Un utilisateur génère une image avec `guidance_scale=1.0` et se plaint que l'image ne ressemble presque pas à son prompt textuel. Quel ajustement de paramètre recommanderais-tu, et pourquoi, en te basant sur ce chapitre ?

<details>
<summary>👉 Solution</summary>

Recommandation : **augmenter significativement le `guidance_scale`** (par exemple, vers une valeur autour de 7.5 à 12, des valeurs typiques en pratique). Rappelle-toi ce chapitre : le guidance_scale contrôle à quel point le modèle doit suivre strictement le prompt textuel plutôt que de se fier davantage à son propre "instinct" visuel appris. Une valeur très basse (comme 1.0) laisse le modèle beaucoup plus libre de s'éloigner de la description textuelle fournie, ce qui explique le faible alignement observé par l'utilisateur avec son prompt.
</details>

### Exercice 6.4.D — Le rôle de l'attention dans le text-to-image

Explique en une ou deux phrases comment le mécanisme d'attention du Module 5 (chapitre 5.3) est réutilisé dans un modèle de diffusion text-to-image comme Stable Diffusion.

<details>
<summary>👉 Solution</summary>

Le mécanisme de Cross-Attention, une variante du mécanisme d'attention du Module 5, permet au réseau U-Net de "consulter", à chaque étape du processus de débruitage, les embeddings du prompt textuel (obtenus en transformant le texte en tokens puis en embeddings, comme au Module 5, chapitres 5.1-5.2), afin d'orienter sa prédiction du bruit à retirer dans une direction cohérente avec la description fournie — exactement comme l'attention permettait à un mot de "consulter" les autres mots d'une phrase pour construire une représentation contextuelle (Module 5, chapitre 5.3), ici c'est l'image en cours de formation qui "consulte" le texte à chaque étape de sa construction progressive.
</details>

---

---

# 📘 CHAPITRE 6.5 — LE PROMPTING AVANCÉ

## Durée : 1.5 semaine

---

## 📖 EXPLICATION

### Rappel : le Prompting comme Interface avec un LLM

Rappelle-toi le Module 0 et le Module 5, chapitre 5.4 : un LLM génère sa réponse en fonction de **tout le contexte fourni** — le prompt n'est donc pas une simple "question", mais un véritable **levier de contrôle** sur le comportement du modèle. Ce chapitre approfondit les techniques qui exploitent au mieux ce levier.

---

### Zero-Shot vs Few-Shot : donner ou non des exemples

**🔑 Intuition**

Le **Zero-Shot Prompting** consiste à demander directement une tâche au modèle, sans lui fournir d'exemple de ce qu'on attend précisément — on compte sur ses capacités générales, acquises pendant le pré-entraînement (Module 5, chapitre 5.5), pour comprendre et exécuter correctement la demande.

Le **Few-Shot Prompting** consiste à fournir, dans le prompt lui-même, **quelques exemples** du type de réponse attendue, avant de poser la vraie question. C'est une forme d'apprentissage "à la volée" — le modèle ne modifie **aucun** de ses poids (contrairement au Fine-Tuning, Module 5, chapitre 5.5), mais s'appuie sur les exemples fournis dans le contexte immédiat pour mieux calibrer sa réponse.

```
🔑 Zero-Shot :
"Traduis ce texte en anglais : 'Bonjour le monde'"

🔑 Few-Shot (avec 2 exemples avant la vraie question) :
"Traduis ces textes en anglais :
FR: Bonjour → EN: Hello
FR: Merci → EN: Thank you
FR: Bonjour le monde → EN: ?"
```

**💡 Pourquoi le Few-Shot fonctionne-t-il, techniquement ?** Rappelle-toi le Module 5, chapitre 5.4 : la génération autorégressive dépend de **tout** le contexte précédent. En montrant des exemples de "bonnes réponses" dans ce contexte, on influence directement la distribution de probabilité que le modèle calcule pour le prochain token — le rendant plus susceptible de "suivre le pattern" démontré par les exemples.

---

### Chain-of-Thought : Pourquoi "Penser à Voix Haute" Améliore les Résultats

**🔑 Intuition — un lien direct et fascinant avec le Module 5**

Voici l'une des découvertes les plus intéressantes du prompting moderne : demander à un modèle de **détailler son raisonnement étape par étape**, plutôt que de donner directement sa réponse finale, améliore significativement la qualité des réponses sur des problèmes complexes (mathématiques, logique).

**Pourquoi ce phénomène se produit-il ? La réponse est directement liée à la génération autorégressive (Module 5, chapitre 5.4) !**

```
🔑 Explication technique :

Chaque token généré par le modèle DEVIENT PARTIE DU CONTEXTE pour
la génération du token suivant. Si le modèle "réfléchit à voix haute"
avant de donner sa réponse finale, chaque étape de raisonnement
intermédiaire enrichit le contexte disponible pour calculer la suite
— un peu comme un humain qui pose ses calculs sur papier avant de
donner un résultat final, plutôt que de tout calculer "de tête".

Sans Chain-of-Thought : le modèle doit produire directement la bonne
réponse en un seul "saut", sans étapes intermédiaires à s'appuyer.

Avec Chain-of-Thought : chaque étape de raisonnement générée sert de
"tremplin contextuel" pour affiner progressivement vers la bonne
réponse finale.
```

```
🔑 Exemple de prompt Chain-of-Thought :

"Résous ce problème étape par étape :
Un magasin vend des pommes à 2€/kg. Sophie achète 3.5kg de pommes
et paie avec un billet de 20€. Combien de monnaie reçoit-elle ?

Réfléchis étape par étape avant de donner la réponse finale."
```

---

### System Prompts : définir le rôle et le cadre du modèle

Rappelle-toi le Chapitre 6.2 : le rôle "system" définit un cadre général, invisible à l'utilisateur, qui influence **toute** la conversation. Un bon system prompt précise typiquement : le rôle/la personnalité du modèle, les contraintes à respecter, le format de réponse attendu, et le ton à adopter.

---

### Structured Output : forcer une réponse dans un format précis

**🔑 Intuition**

Pour des applications qui doivent **traiter automatiquement** la réponse d'un LLM (par exemple, extraire des données pour les insérer dans une base de données), une réponse en texte libre est difficile à parser de façon fiable. Le **Structured Output** (souvent via un "JSON mode") force le modèle à générer sa réponse **strictement** dans un format structuré prédéfini (typiquement JSON), rendant le traitement programmatique de la réponse beaucoup plus fiable.

```
🔑 Exemple de prompt pour Structured Output :

"Analyse ce commentaire client et réponds UNIQUEMENT en JSON avec
cette structure exacte :
{
  'sentiment': 'positif' | 'negatif' | 'neutre',
  'score_confiance': nombre entre 0 et 1,
  'sujets_mentionnes': [liste de chaînes de caractères]
}"
```

---

### Techniques Avancées Complémentaires

**Role Prompting** : demander au modèle d'adopter une "persona" spécifique ("Tu es un expert en droit fiscal français avec 20 ans d'expérience...") oriente son style de réponse et le type de connaissances qu'il mobilise préférentiellement.

**Self-Consistency** : générer **plusieurs réponses indépendantes** à la même question (en utilisant une température non-nulle, rappel Module 5, chapitre 5.4, pour obtenir des variations), puis retenir la réponse la plus fréquente parmi ces multiples générations — une technique qui exploite la variabilité du Sampling pour améliorer la fiabilité globale, un peu comme la "sagesse des foules" évoquée pour les méthodes d'ensemble au Module 3, chapitre 3.4, mais appliquée ici à plusieurs générations d'un même modèle plutôt qu'à plusieurs modèles distincts.

---

## 💻 MISE EN PRATIQUE

```python
from openai import OpenAI
import json
from collections import Counter

client = OpenAI(api_key="sk-...")

# ─────────────────────────────────────────────
# 1. ZERO-SHOT vs FEW-SHOT — comparaison directe
# ─────────────────────────────────────────────

prompt_zero_shot = "Classifie ce commentaire comme positif, négatif ou neutre : 'Le produit est correct, sans plus.'"

prompt_few_shot = """Classifie le sentiment de ces commentaires :
Commentaire: "J'adore ce produit, il est parfait !" → Sentiment: positif
Commentaire: "Vraiment déçu, ne fonctionne pas." → Sentiment: negatif
Commentaire: "Le produit est correct, sans plus." → Sentiment: ?"""

for nom, prompt in [("Zero-Shot", prompt_zero_shot), ("Few-Shot", prompt_few_shot)]:
    reponse = client.chat.completions.create(
        model="gpt-4o", messages=[{"role": "user", "content": prompt}], temperature=0
    )
    print(f"{nom} : {reponse.choices[0].message.content}")

# ─────────────────────────────────────────────
# 2. CHAIN-OF-THOUGHT — comparaison avec/sans raisonnement explicite
# ─────────────────────────────────────────────

probleme = "Un magasin vend des pommes à 2€/kg. Sophie achète 3.5kg et paie avec un billet de 20€. Combien de monnaie reçoit-elle ?"

prompt_direct = f"{probleme} Réponds directement avec juste le nombre."
prompt_cot = f"{probleme} Réfléchis étape par étape avant de donner la réponse finale."

for nom, prompt in [("Sans Chain-of-Thought", prompt_direct), ("Avec Chain-of-Thought", prompt_cot)]:
    reponse = client.chat.completions.create(
        model="gpt-4o", messages=[{"role": "user", "content": prompt}], temperature=0
    )
    print(f"\n{nom} :\n{reponse.choices[0].message.content}")

# ─────────────────────────────────────────────
# 3. STRUCTURED OUTPUT — forcer une réponse en JSON
# ─────────────────────────────────────────────

prompt_json = """Analyse ce commentaire et réponds UNIQUEMENT en JSON valide, sans texte
additionnel, avec cette structure exacte :
{"sentiment": "positif|negatif|neutre", "score_confiance": nombre entre 0 et 1, "sujets": [liste]}

Commentaire : "La livraison a été rapide mais l'emballage était abîmé."
"""

reponse_json = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": prompt_json}],
    response_format={"type": "json_object"},   # force explicitement le format JSON
    temperature=0
)

resultat = json.loads(reponse_json.choices[0].message.content)
print(f"\nRésultat structuré : {resultat}")
print(f"Sentiment extrait : {resultat['sentiment']}")   # directement utilisable en code !

# ─────────────────────────────────────────────
# 4. SELF-CONSISTENCY — plusieurs générations, on garde la majorité
# ─────────────────────────────────────────────

def self_consistency(prompt, n_generations=5, temperature=0.7):
    reponses = []
    for _ in range(n_generations):
        reponse = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=temperature   # rappel Module 5 : nécessaire pour obtenir de la variabilité
        )
        reponses.append(reponse.choices[0].message.content.strip())
    
    compteur = Counter(reponses)
    reponse_majoritaire, nb_occurrences = compteur.most_common(1)[0]
    print(f"Réponses obtenues : {reponses}")
    print(f"Réponse majoritaire ({nb_occurrences}/{n_generations}) : {reponse_majoritaire}")
    return reponse_majoritaire

self_consistency("Combien font 17 × 24 ? Réponds juste avec le nombre.", n_generations=5)
```

---

## 🏋️ EXERCICES — CHAPITRE 6.5

### Exercice 6.5.A — Zero-Shot ou Few-Shot ?

Pour chacun des scénarios suivants, recommande Zero-Shot ou Few-Shot Prompting, en justifiant :

1. Demander un résumé simple d'un article, une tâche générale bien connue du modèle
2. Demander au modèle de suivre un format d'extraction de données très spécifique et inhabituel, propre à ton entreprise
3. Poser une question factuelle simple ("Quelle est la capitale de l'Australie ?")

<details>
<summary>👉 Solution</summary>

```
1. ZERO-SHOT suffit — le résumé de texte est une tâche générale
   très bien maîtrisée par la plupart des LLMs modernes, sans besoin
   d'exemples spécifiques pour bien orienter la réponse

2. FEW-SHOT recommandé — un format d'extraction spécifique et
   inhabituel bénéficie grandement d'exemples concrets montrant
   exactement la structure attendue, que le modèle ne pourrait pas
   deviner uniquement à partir d'une description textuelle

3. ZERO-SHOT suffit — une question factuelle simple ne nécessite
   aucun exemple préalable pour orienter la réponse
```
</details>

### Exercice 6.5.B — Expliquer le mécanisme du Chain-of-Thought

Explique avec tes propres mots, en te référant explicitement au Module 5, chapitre 5.4, pourquoi demander à un modèle de "réfléchir étape par étape" améliore ses performances sur des problèmes de calcul complexes.

<details>
<summary>👉 Solution</summary>

Rappelle-toi le Module 5 : la génération autorégressive produit chaque nouveau token en se basant sur **tout** le contexte précédent, y compris les tokens déjà générés par le modèle lui-même. Sans Chain-of-Thought, le modèle doit produire directement la réponse finale correcte "d'un seul coup", sans étapes intermédiaires sur lesquelles s'appuyer — un exercice difficile pour des calculs à plusieurs étapes. Avec Chain-of-Thought, chaque étape de raisonnement générée (par exemple, "d'abord je calcule le coût total : 3.5 × 2 = 7€") devient elle-même partie du contexte disponible pour générer l'étape suivante, permettant au modèle de "décomposer" le problème complexe en une série de sous-étapes plus simples, chacune s'appuyant explicitement sur les résultats intermédiaires précédemment générés — un peu comme un humain qui pose ses calculs sur papier plutôt que de tout calculer "de tête" en une seule fois.
</details>

### Exercice 6.5.C — Concevoir un prompt Structured Output

Écris un prompt qui force un modèle à extraire, en JSON, le nom d'une entreprise, le montant, et la date d'une facture décrite en texte libre, en t'inspirant de la structure présentée dans ce chapitre.

<details>
<summary>👉 Solution</summary>

*(Exemple de réponse — plusieurs formulations correctes sont possibles)*

```
Extrais les informations de cette facture et réponds UNIQUEMENT en
JSON valide, sans aucun texte additionnel, avec cette structure exacte :
{
  "entreprise": "nom de l'entreprise",
  "montant": nombre (montant total en euros, sans symbole),
  "date": "date au format AAAA-MM-JJ"
}

Facture : "Facture émise par TechCorp SARL, le 15 mars 2026, pour un
montant total de 1250€."
```

Cette structure explicite (avec les types attendus précisés entre parenthèses, et un format de date normalisé) réduit fortement le risque que le modèle produise une sortie mal formée ou incohérente, facilitant le traitement automatisé de la réponse par le code applicatif.
</details>

### Exercice 6.5.D — Self-Consistency et température

Explique pourquoi la technique de Self-Consistency nécessite obligatoirement une température non-nulle (rappel Module 5, chapitre 5.4), et ce qui se passerait si on l'utilisait avec `temperature=0`.

<details>
<summary>👉 Solution</summary>

Self-Consistency repose sur le principe de générer **plusieurs réponses différentes** à la même question, pour ensuite identifier la réponse la plus fréquente parmi ces générations. Rappelle-toi le Module 5, chapitre 5.4 : avec `temperature=0` (équivalent à une approche Greedy, déterministe), le modèle produirait **systématiquement exactement la même réponse** à chaque appel, pour un même prompt — il n'y aurait alors aucune variabilité entre les générations, rendant la technique de Self-Consistency totalement inutile (on obtiendrait n copies identiques de la même réponse, sans aucune information supplémentaire par rapport à un seul appel). Une température non-nulle est indispensable pour introduire la variabilité nécessaire entre les différentes générations, permettant ensuite d'identifier une véritable tendance majoritaire parmi des réponses réellement diverses.
</details>

---

---

# 📘 CHAPITRE 6.6 — IA NO-CODE VS IA AVEC CODE, ET AUTOMATISATION

## Durée : 1 semaine

---

## 📖 EXPLICATION

### Le Spectre No-Code / Avec Code

**🔑 Intuition**

Les outils d'automatisation IA se situent sur un spectre, entre des plateformes visuelles ("no-code", comme Zapier, Make, n8n) et le développement direct en code (comme tu l'as pratiqué tout au long de ce module avec Python et les APIs).

```
🔑 OUTILS NO-CODE (Zapier, Make, n8n) :
   → Interface visuelle par glisser-déposer, "blocs" à connecter
   → Rapide à mettre en place, accessible sans compétence de
     programmation
   → Flexibilité limitée : bloqué par ce que la plateforme propose
     nativement
   → Souvent des coûts d'abonnement récurrents

🔑 DÉVELOPPEMENT AVEC CODE (Python, les APIs de ce module) :
   → Flexibilité totale : n'importe quelle logique peut être implémentée
   → Nécessite des compétences techniques (exactement ce que cette
     formation t'enseigne depuis le Module 1 !)
   → Coût de développement initial plus élevé, mais souvent plus
     économique à long terme et à grande échelle
   → Contrôle total sur la sécurité, la performance, et l'intégration
     avec des systèmes existants
```

**💡 Comment choisir ?** Les outils no-code excellent pour du **prototypage rapide** et des automatisations simples et ponctuelles (connecter deux services existants, par exemple "quand je reçois un email, résume-le et envoie-moi une notification"). Le développement en code devient nécessaire dès que la logique se complexifie, que la performance ou le contrôle deviennent critiques, ou que le volume d'utilisation justifie l'investissement initial.

---

### L'Automatisation avec l'IA : au-delà d'un simple appel

**🔑 Intuition**

Rappelle-toi le Chapitre 6.2 : le Function Calling permet à un LLM de "demander" l'exécution d'outils externes. **L'automatisation avec l'IA généralise cette idée** : au lieu d'un unique appel isolé à un LLM, on construit des **chaînes d'étapes**, où la sortie d'une étape (potentiellement un appel LLM) devient l'entrée de la suivante, orchestrant ainsi des workflows complets et sophistiqués.

```
🔑 Exemple de chaîne d'automatisation :

1. Un nouvel email arrive (déclencheur)
2. Un appel LLM résume le contenu de l'email (Chapitre 6.2)
3. Un second appel LLM classifie l'urgence du message (rappel Module 3 : classification)
4. Selon la classification, une action différente est déclenchée
   (notification immédiate si urgent, archivage automatique sinon)
```

**💡 Vers les Agents IA :** cette idée de chaîner plusieurs étapes, avec potentiellement des décisions conditionnelles prises par un LLM lui-même (plutôt que par une logique de code fixe), constitue exactement le principe fondateur des **agents IA** (Module 0), un sujet approfondi dans un module ultérieur de cette formation, qui s'appuiera directement sur le Function Calling (Chapitre 6.2) et les systèmes RAG.

---

## 💻 MISE EN PRATIQUE

```python
from openai import OpenAI
import json

client = OpenAI(api_key="sk-...")

# ─────────────────────────────────────────────
# 1. UNE CHAÎNE D'AUTOMATISATION SIMPLE AVEC CODE
# ─────────────────────────────────────────────

def resumer_texte(texte):
    """Étape 1 : résumer un texte long."""
    reponse = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": f"Résume ce texte en 2 phrases : {texte}"}],
        temperature=0.3
    )
    return reponse.choices[0].message.content

def classifier_urgence(resume):
    """Étape 2 : classifier l'urgence du résumé (rappel Module 3 : classification)."""
    prompt = f"""Classifie l'urgence de ce message en UNIQUEMENT un mot parmi :
    URGENT, NORMAL, FAIBLE

    Message : {resume}"""
    reponse = client.chat.completions.create(
        model="gpt-4o", messages=[{"role": "user", "content": prompt}], temperature=0
    )
    return reponse.choices[0].message.content.strip()

def workflow_email(texte_email):
    """La CHAÎNE COMPLÈTE — sortie d'une étape devient entrée de la suivante."""
    print("📧 Email reçu, traitement en cours...")
    
    resume = resumer_texte(texte_email)
    print(f"  📝 Résumé : {resume}")
    
    urgence = classifier_urgence(resume)
    print(f"  🚦 Urgence : {urgence}")
    
    if urgence == "URGENT":
        print("  🔔 ACTION : Notification immédiate envoyée !")
    elif urgence == "NORMAL":
        print("  📥 ACTION : Ajouté à la liste de tâches du jour")
    else:
        print("  🗄️  ACTION : Archivé automatiquement")
    
    return {"resume": resume, "urgence": urgence}

# Test du workflow complet
email_exemple = """
Bonjour, notre serveur de production est en panne depuis 10 minutes,
tous les clients sont impactés. Merci d'intervenir immédiatement.
"""
resultat = workflow_email(email_exemple)

# ─────────────────────────────────────────────
# 2. COMPARER LA COMPLEXITÉ : CODE vs "PSEUDO NO-CODE"
# ─────────────────────────────────────────────

print("\n" + "="*50)
print("STRUCTURE D'UN WORKFLOW NO-CODE ÉQUIVALENT (représentation)")
print("="*50)

configuration_no_code = {
    "declencheur": "Nouvel email reçu",
    "etapes": [
        {"type": "IA", "action": "Résumer le texte", "modele": "gpt-4o"},
        {"type": "IA", "action": "Classifier urgence", "modele": "gpt-4o"},
        {"type": "condition", "si": "urgence == URGENT", "alors": "Notifier immédiatement",
         "sinon": "Archiver"}
    ]
}
print(json.dumps(configuration_no_code, indent=2, ensure_ascii=False))
print("\n💡 Sur une plateforme no-code comme n8n ou Make, cette même logique")
print("   serait représentée visuellement par des blocs connectés entre eux,")
print("   sans écrire une seule ligne de code Python.")
```

---

## 🏋️ EXERCICES — CHAPITRE 6.6

### Exercice 6.6.A — No-Code ou Code ?

Pour chacun des scénarios suivants, recommande une approche no-code ou du développement avec code, en justifiant :

1. Une petite entreprise veut automatiser rapidement l'envoi d'un message Slack chaque fois qu'un nouveau formulaire est soumis
2. Une entreprise tech développe un produit SaaS complexe avec une logique métier très spécifique, destiné à des dizaines de milliers d'utilisateurs
3. Un utilisateur non-technique veut connecter son calendrier à un assistant IA basique, sans compétence de programmation

<details>
<summary>👉 Solution</summary>

```
1. NO-CODE — automatisation simple, connexion entre deux services
   existants (formulaire → Slack), exactement le cas d'usage typique
   des plateformes no-code, rapide à mettre en place

2. DÉVELOPPEMENT AVEC CODE — logique métier complexe et spécifique,
   échelle importante (dizaines de milliers d'utilisateurs) justifiant
   l'investissement de développement pour un contrôle total et une
   performance optimisée à long terme

3. NO-CODE — utilisateur sans compétence de programmation, besoin
   simple, exactement le public cible des outils no-code
```
</details>

### Exercice 6.6.B — Identifier une chaîne d'automatisation

En reprenant la logique du workflow email de ce chapitre, décris (sans écrire de code) une chaîne d'automatisation à 3 étapes pour un système qui traite automatiquement les avis clients laissés sur un site e-commerce.

<details>
<summary>👉 Solution</summary>

*(Exemple de réponse — plusieurs chaînes raisonnables sont possibles)*

```
1. Un nouvel avis client est publié (déclencheur)

2. Étape 1 (LLM) : classifier le SENTIMENT de l'avis (positif/négatif/neutre)
   — rappel Module 3, chapitre 3.3 : classification

3. Étape 2 (LLM) : si l'avis est négatif, EXTRAIRE le problème
   spécifique mentionné (ex: "livraison", "qualité produit", "prix")
   — rappel Module 5, chapitre 5.6 : NER ou classification par catégorie

4. Étape 3 (logique conditionnelle) : selon la catégorie de problème
   identifiée, router automatiquement l'avis vers l'équipe compétente
   (logistique, qualité, ou service commercial) pour un suivi manuel
```

Chaque étape de cette chaîne illustre le principe central de ce chapitre : la sortie d'une étape (la classification du sentiment) devient l'entrée conditionnant l'étape suivante (l'extraction du problème, puis le routage final).
</details>

### Exercice 6.6.C — Function Calling et automatisation

Explique le lien entre le Function Calling présenté au Chapitre 6.2 et le concept d'automatisation présenté dans ce chapitre.

<details>
<summary>👉 Solution</summary>

Le Function Calling (Chapitre 6.2) permet à un LLM de "demander" l'exécution d'une action externe spécifique (par exemple, consulter une météo, interroger une base de données) plutôt que de se limiter à générer du texte. L'automatisation, telle que présentée dans ce chapitre, généralise et systématise ce principe : au lieu d'un unique appel isolé, on enchaîne plusieurs de ces interactions (potentiellement avec du Function Calling à chaque étape) dans un workflow structuré, où chaque étape peut déclencher des actions réelles et transmettre son résultat à l'étape suivante — le Function Calling constitue ainsi la brique technique fondamentale qui rend possible des automatisations sophistiquées, où le LLM ne se contente plus de répondre, mais participe activement à l'exécution d'un processus métier complet.
</details>

### Exercice 6.6.D — Limites du no-code

Décris un scénario concret où une plateforme no-code atteindrait ses limites, nécessitant de basculer vers du développement en code, en te basant sur les limites évoquées dans ce chapitre.

<details>
<summary>👉 Solution</summary>

*(Exemple de réponse)*

Une entreprise utilise initialement une plateforme no-code pour automatiser le tri de tickets de support client par catégorie. Cela fonctionne bien tant que la logique reste simple. Mais l'entreprise souhaite ensuite ajouter une logique métier très spécifique : croiser la catégorie du ticket avec l'historique complet du client dans sa base de données interne propriétaire, appliquer un scoring de priorité complexe basé sur plusieurs règles métier imbriquées, puis déclencher des actions différenciées selon des combinaisons précises de critères. Cette complexité dépasse ce que les blocs visuels prédéfinis d'une plateforme no-code peuvent naturellement exprimer, et la plateforme pourrait aussi ne pas s'intégrer nativement avec la base de données propriétaire de l'entreprise — un développement en code (comme celui pratiqué dans ce module avec les APIs et Python) devient alors nécessaire pour implémenter cette logique sur-mesure et cette intégration spécifique.
</details>

---

---

# ✅ QUIZ DE VALIDATION — MODULE 6

> Réponds sans regarder le cours. Objectif : 16/20 minimum avant de passer au module suivant.

**1.** Quelle est la différence fondamentale entre un modèle propriétaire et un modèle open-source ?
**2.** Pourquoi un LLM "n'a-t-il aucune mémoire" entre deux appels API distincts ?
**3.** À quoi sert le paramètre `temperature` dans une requête API, et sur quel mécanisme du Module 5 repose-t-il ?
**4.** Décris les 5 étapes du cycle du Function Calling.
**5.** Qu'est-ce que la quantification, et pourquoi est-elle nécessaire pour l'exécution locale de LLMs ?
**6.** Calcule approximativement la mémoire nécessaire pour un modèle de 3 milliards de paramètres en INT8.
**7.** Quel est le principal avantage d'Ollama par rapport à une gestion manuelle d'un LLM local ?
**8.** Quelle est la différence entre le processus Forward et le processus Reverse d'un modèle de diffusion ?
**9.** Pourquoi l'entraînement d'un modèle de diffusion est-il un exemple d'apprentissage supervisé ?
**10.** Comment le texte guide-t-il la génération d'image dans un modèle comme Stable Diffusion ?
**11.** Quel est l'effet du `guidance_scale` sur une génération d'image ?
**12.** Quelle est la différence entre Zero-Shot et Few-Shot Prompting ?
**13.** Pourquoi le Chain-of-Thought améliore-t-il les performances sur des problèmes complexes, techniquement ?
**14.** À quoi sert le Structured Output (JSON mode) ?
**15.** Pourquoi la technique de Self-Consistency nécessite-t-elle une température non-nulle ?
**16.** Quelle est la différence principale entre un outil no-code et le développement en code pour l'automatisation IA ?
**17.** Comment une chaîne d'automatisation utilise-t-elle la sortie d'une étape ?
**18.** Quel lien existe-t-il entre le Function Calling et les Agents IA ?
**19.** Dans quel contexte privilégierait-on un modèle local plutôt qu'une API cloud ?
**20.** Pourquoi dit-on que ce Module 6 "réutilise" les mécanismes des Modules 2, 4 et 5 plutôt que d'introduire de nouvelles mathématiques ?

---

### 📝 Corrigé

**1.** Un modèle propriétaire est accessible uniquement via API payante avec des poids secrets ; un modèle open-source a ses poids publiquement disponibles, pouvant être exécutés localement ou fine-tunés librement.
**2.** Parce que chaque requête API est traitée de façon totalement indépendante — c'est l'application cliente qui doit renvoyer tout l'historique de la conversation à chaque nouvel appel pour simuler une continuité de mémoire.
**3.** Il contrôle le caractère déterministe ou créatif de la génération, en modifiant la distribution de probabilité sur le prochain token calculée via softmax (Module 5, chapitre 5.4) avant la sélection effective du token.
**4.** (1) L'utilisateur pose une question nécessitant un outil, (2) le modèle génère un appel de fonction structuré, (3) l'application exécute réellement la fonction, (4) le résultat est renvoyé au modèle, (5) le modèle formule sa réponse finale en langage naturel.
**5.** La quantification réduit la précision numérique des poids d'un modèle (par exemple de 32 à 4 bits), réduisant drastiquement l'empreinte mémoire nécessaire, ce qui rend possible l'exécution de grands modèles sur du matériel grand public.
**6.** 3 × 10⁹ × (8/8) octets = 3 × 10⁹ octets = 3 Go.
**7.** Ollama automatise entièrement le téléchargement de modèles déjà quantifiés, leur chargement, et fournit une API locale simple, évitant à l'utilisateur de gérer manuellement chacune de ces étapes techniques.
**8.** Le processus Forward ajoute progressivement du bruit à une image nette selon une formule fixe (ne nécessitant aucun apprentissage) ; le processus Reverse utilise un réseau de neurones entraîné pour prédire et retirer ce bruit étape par étape, permettant de générer une nouvelle image à partir de bruit pur.
**9.** Parce qu'on connaît la "vraie réponse" (le label) à chaque exemple d'entraînement : c'est exactement le bruit qu'on a nous-mêmes ajouté pendant le processus forward, ce qui permet de calculer une erreur (MSE) entre le bruit réel et le bruit prédit par le réseau, et d'entraîner ce dernier par descente de gradient.
**10.** Via un mécanisme de Cross-Attention (une variante de l'attention du Module 5), le réseau consulte, à chaque étape du débruitage, les embeddings du prompt textuel pour orienter sa prédiction dans une direction cohérente avec la description fournie.
**11.** Il contrôle à quel point le modèle doit suivre strictement le prompt textuel plutôt que de se fier à son propre "instinct" visuel ; une valeur élevée force une fidélité plus stricte au texte.
**12.** Zero-Shot demande directement une tâche sans exemple préalable ; Few-Shot fournit quelques exemples de la réponse attendue dans le prompt lui-même, sans modifier les poids du modèle.
**13.** Parce que chaque étape de raisonnement générée devient partie du contexte disponible pour la génération de l'étape suivante (rappel : génération autorégressive, Module 5), permettant au modèle de décomposer un problème complexe en sous-étapes plus simples, chacune s'appuyant sur les résultats intermédiaires précédents.
**14.** Il force le modèle à générer sa réponse dans un format structuré précis (typiquement JSON), facilitant le traitement automatisé et fiable de cette réponse par du code applicatif.
**15.** Parce qu'avec une température nulle (approche Greedy déterministe), le modèle produirait systématiquement exactement la même réponse à chaque appel, rendant impossible l'identification d'une tendance majoritaire parmi des générations qui seraient toutes identiques.
**16.** Un outil no-code offre une interface visuelle rapide à mettre en place mais avec une flexibilité limitée ; le développement en code offre une flexibilité totale mais nécessite des compétences techniques et un investissement initial plus important.
**17.** La sortie d'une étape (par exemple, un résumé généré par un LLM) devient l'entrée de l'étape suivante (par exemple, la classification de ce résumé), formant une chaîne où chaque étape s'appuie sur le résultat de la précédente.
**18.** Le Function Calling constitue la brique technique fondamentale permettant à un LLM de déclencher des actions externes ; en systématisant et enchaînant ce mécanisme, avec des décisions prises par le LLM lui-même, on obtient les Agents IA.
**19.** Quand la confidentialité des données est critique, quand on veut éviter les coûts récurrents à l'usage, ou quand on a besoin d'une disponibilité indépendante d'une connexion internet et de l'infrastructure d'un fournisseur externe.
**20.** Parce que les mécanismes fondamentaux (attention, embeddings, softmax, distributions de probabilité, gradient, CNN via U-Net) ont déjà été appris en profondeur dans les modules précédents ; ce module se concentre sur leur application pratique à travers de nouveaux outils (APIs, Ollama, diffusion, prompting) plutôt que sur de nouvelles fondations mathématiques.

---

---

# 📊 RÉCAPITULATIF DU MODULE 6

## Ce que tu as maîtrisé

| Compétence | Notion clé | Niveau attendu |
|---|---|---|
| Choisir le bon modèle selon le contexte | Propriétaire vs Open-source | ⭐⭐⭐⭐☆ |
| Interagir avec les LLMs via API | Messages, rôles, streaming, function calling | ⭐⭐⭐⭐⭐ |
| Déployer des LLMs localement | Quantification, Ollama | ⭐⭐⭐⭐☆ |
| Comprendre la génération d'images | Modèles de diffusion, cross-attention | ⭐⭐⭐⭐☆ |
| Optimiser ses instructions aux LLMs | Few-shot, Chain-of-Thought, Structured Output | ⭐⭐⭐⭐⭐ |
| Automatiser des workflows avec l'IA | No-code vs code, chaînes d'étapes | ⭐⭐⭐☆☆ |

## Prochaine étape

Tu as désormais toutes les briques fondamentales pour comprendre et utiliser l'IA générative moderne, du mécanisme le plus fin (attention, gradient) jusqu'à l'usage pratique quotidien (APIs, prompting, automatisation). Les modules suivants de cette formation approfondiront la **création de modèles et d'applications IA complètes** — chatbots, agents autonomes, systèmes RAG — en s'appuyant directement sur tout ce que tu as appris jusqu'ici.

---

## ⚠️ ERREURS FRÉQUENTES DU MODULE 6

| Erreur | Conséquence | Solution |
|---|---|---|
| Ne pas renvoyer l'historique complet à chaque appel API | Le modèle semble "oublier" le contexte de la conversation | Toujours accumuler et renvoyer tous les messages précédents |
| Utiliser une température élevée pour des tâches factuelles | Réponses incohérentes ou inventées (hallucinations accrues) | Adapter la température au type de tâche (basse pour la précision) |
| Négliger la quantification pour l'exécution locale | Erreurs "out of memory", modèle injouable sur le matériel disponible | Utiliser des versions quantifiées (via Ollama) adaptées à sa RAM/VRAM disponible |
| Utiliser un guidance_scale trop bas en génération d'image | Image peu fidèle au prompt textuel fourni | Augmenter le guidance_scale vers des valeurs typiques (7.5-12) |
| Demander une réponse directe sur un problème complexe | Erreurs de raisonnement, réponse peu fiable | Utiliser le Chain-of-Thought pour les tâches nécessitant plusieurs étapes de raisonnement |
| Utiliser Self-Consistency avec température=0 | Techniques inutile, toutes les générations sont identiques | Toujours utiliser une température non-nulle pour cette technique |
| Choisir systématiquement le développement en code par réflexe | Perte de temps sur des automatisations simples qui auraient pu être no-code | Évaluer d'abord la complexité réelle du besoin avant de choisir l'approche |

---

*Module 6 terminé ✅ — Durée totale : 7 semaines*  
*Formation IA Complète — Module suivant à définir avec l'apprenant*
