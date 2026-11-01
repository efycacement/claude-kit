# UbiPharm Togo — Concept de refonte du site web

Proposition de refonte de [togo.ubipharm.com/fr](https://togo.ubipharm.com/fr), réalisée par **Gombo Studio**.
Maquette fonctionnelle, responsive, en HTML / CSS / JavaScript pur (aucune dépendance, aucun framework).

> ⚠️ Document de travail : maquette non officielle. Les textes reprennent le contenu public
> d'UbiPharm Togo et doivent être validés par le client avant mise en ligne.

---

## 1. Voir la maquette

Ouvrir `index.html` dans un navigateur (double-clic) — tout fonctionne en local.
Captures avant / après dans le dossier [`apercu/`](apercu/).

| Page | Fichier | Contenu |
|---|---|---|
| Accueil | `index.html` | Hero, chiffres clés, services, à propos, commander, espaces, annuaire, actualités, CTA |
| Annuaire | `pharmacies.html` | Recherche instantanée, filtres pays / région, appel & itinéraire en 1 clic |
| Contact | `contact.html` | Formulaire intelligent, téléphones cliquables, horaires du jour, itinéraire |
| Carrières | `carrieres.html` | Valeurs, familles de métiers, offres + annonces officines, candidature spontanée |

---

## 2. Diagnostic du site actuel

| Problème constaté | Impact |
|---|---|
| Page d'accueil quasi vide : un titre, un bouton, 3 photos de banque d'images | Aucune proposition de valeur, le visiteur ne sait pas quoi faire |
| Rubrique **Actualités vide** mise en avant sur la page d'accueil | Image d'un site abandonné |
| **Aucune coordonnée visible** (adresse, téléphones, horaires) hors du formulaire | Les pharmaciens doivent chercher ailleurs (annuaires tiers) |
| Annuaire : **40 pages** à feuilleter, sans recherche instantanée ni bouton d'appel | Inutilisable sur mobile |
| Formulaire de contact avec captcha artisanal (« combien de lettres dans UBIPHARM ? ») et noms de personnes dans la liste des services | Peu professionnel, données à maintenir |
| Encodage ISO-8859-1 cassé (« d?approvisionnement », « demploi ») | Fautes visibles |
| Pas de meta description, balise Google Tag Manager mal configurée (identifiant `UA-…`) | Référencement Google et statistiques inexploitables |
| Code daté (jQuery, Modernizr, conditions Internet Explorer 7/8) | Lenteur, maintenance difficile |
| Aucun parcours « Devenir client » | Pas de génération de nouveaux comptes officines |

## 3. Ce que la refonte apporte

**Message & conversion**
- Une promesse claire dès l'écran d'accueil : *« Le médicament au bon endroit, au bon moment »*.
- 2 actions principales visibles partout : **Espace client / Passer commande** et **Trouver une pharmacie**.
- Chiffres clés vérifiables : 788 officines dans l'annuaire, 5 pays, +25 ans du Groupe, 700 M FCFA de capital.
- Mise en avant de l'atout différenciant : **un grossiste détenu par les pharmaciens**.
- Parcours « Commander en 3 étapes » + carte « Service commandes » avec les 4 lignes cliquables.
- Bandeau **« Devenir client »** relié au formulaire (objet pré-rempli).

**Utilité au quotidien**
- Statut **Ouvert / Fermé en temps réel** (heure de Lomé) dans la barre supérieure.
- Annuaire : recherche instantanée (nom, quartier, ville, pharmacien, sans tenir compte des accents), filtres par pays et région, boutons **Appeler** et **Itinéraire Google Maps**, lien partageable (`pharmacies.html?q=Agoè`).
- Contact : tous les numéros cliquables, horaires avec le jour courant surligné, itinéraire GPS vers l'entrepôt.

**Qualité technique**
- 100 % responsive (mobile d'abord : menu plein écran, boutons larges).
- Accessibilité : contrastes AA, navigation clavier, lien d'évitement, libellés de formulaire, respect de `prefers-reduced-motion`.
- SEO : titres et descriptions par page, Open Graph, données structurées `Organization` (adresse, téléphones).
- Légèreté : ~0 dépendance, une seule police web, icônes SVG intégrées.

## 4. Charte graphique

| Rôle | Couleur |
|---|---|
| Bleu marine (fond, titres) | `#0B1846` / `#17348B` |
| Vert UbiPharm (actions) | `#8FB824` — texte vert accessible `#4F7A0C` |
| Cyan (accents) | `#3BB4DF` — texte cyan accessible `#0E7FA8` |

Couleurs reprises du site actuel, modernisées. Police : **Plus Jakarta Sans** (Google Fonts).
Toutes les variables sont dans `assets/css/styles.css` (bloc `:root`).

## 5. Pour passer en production

1. **Logo officiel** : remplacer le logo provisoire (bloc `.brand` dans l'en-tête et le pied de page, `assets/img/favicon.svg`).
2. **Photos & vidéo** : les emplacements visuels de la section « À propos » sont prévus pour un **reportage photo/vidéo** de la plateforme logistique et des équipes (tournage Gombo Studio).
3. **Annuaire** : brancher `assets/js/pharmacies.js` sur la base des 788 officines (aujourd'hui : échantillon de 28 fiches issues de l'annuaire public), ajouter la carte interactive.
4. **Formulaires** : relier contact et candidature à une adresse e-mail ou un CRM (aujourd'hui : message de confirmation de démonstration).
5. **Version anglaise** : le sélecteur FR / EN est en place, les textes sont à traduire.
6. **Actualités** : prévoir un petit CMS (ou WordPress headless) pour publier régulièrement — un site avec des actualités à jour inspire confiance aux laboratoires et aux officines.
7. **Pages légales** : mentions légales, politique de confidentialité, plan du site.
8. Mesure d'audience : corriger la configuration Google Tag Manager / GA4.

## 6. Arborescence

```
ubipharm-togo-refonte/
├── index.html          Accueil
├── pharmacies.html     Annuaire des pharmacies
├── contact.html        Contact
├── carrieres.html      Carrières
├── assets/
│   ├── css/styles.css  Design system + styles
│   ├── js/main.js      Menu, statut ouvert/fermé, animations, formulaires
│   ├── js/pharmacies.js Données d'exemple + recherche de l'annuaire
│   └── img/favicon.svg
└── apercu/             Captures avant / après
```

## Sources des informations

Contenu public de [togo.ubipharm.com](https://togo.ubipharm.com/fr) (présentation, annuaire, contact)
et fiche [Go Africa Online](https://www.goafricaonline.com/tg/29143-ubipharm-grossistes-pharmaceutiques-lome-togo)
(adresse, téléphones, horaires). Nombre d'officines : 40 pages de l'annuaire actuel (39 × 20 + 8 = 788).
