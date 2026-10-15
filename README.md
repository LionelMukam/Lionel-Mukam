# Simplo Store — boutique électronique luxe noir & doré

Site vitrine responsive en HTML, CSS et JavaScript, prêt à publier avec GitHub Pages.

## Fonctionnalités incluses
- Design noir et doré, adapté aux mobiles et ordinateurs
- Catalogue de démonstration en FCFA
- Recherche et filtres par catégorie
- Panier avec ajout/retrait de quantités et total calculé dans le navigateur
- Préparation d'une commande dans WhatsApp
- Aucun framework ni étape de compilation nécessaire

## Avant publication

### 1. Configurer WhatsApp
Dans `script.js`, remplacez :
```js
const WHATSAPP_NUMBER = "237000000000";
```
par votre numéro WhatsApp au format international, uniquement des chiffres (exemple fictif : `2376XXXXXXXX`, sans le `+`).

### 2. Modifier les produits et prix
Dans `script.js`, modifiez le tableau `products`. Les produits et prix fournis sont des exemples. Les montants sont des nombres en FCFA.

### 3. Personnaliser la marque
Le nom Simplo Store et le style noir et doré sont déjà intégrés. Vous pouvez changer les couleurs au début de `styles.css`.

## Publier sur GitHub Pages
1. Créez un dépôt sur https://github.com.
2. Téléversez `index.html`, `styles.css`, `script.js`, `README.md` et `.nojekyll` à la racine du dépôt.
3. Ouvrez **Settings → Pages**.
4. Sous **Build and deployment**, choisissez **Deploy from a branch**, la branche `main` et le dossier `/ (root)`.
5. Enregistrez et attendez que GitHub affiche l'URL du site.

## Limites importantes
Cette version est un site statique (front-end) :
- **Panier :** il fonctionne dans la page mais ne se synchronise pas entre appareils et n'est pas sauvegardé durablement.
- **WhatsApp :** le site prépare un message de commande ; l'utilisateur doit l'envoyer dans WhatsApp. Ce n'est pas un paiement ni une commande automatiquement enregistrée.
- **Stock et prix :** aucun stock réel, compte client ou administration n'est connecté. Le client doit confirmer la disponibilité et le prix final.
- **Paiement en ligne :** non inclus. Pour accepter des paiements, intégrer un prestataire adapté au pays et un backend sécurisé.
- **Sécurité :** ne jamais stocker des secrets, mots de passe ou clés privées dans les fichiers JavaScript publics.

Pour un paiement, une gestion de stock ou un tableau de bord administrateur, il faudra un backend/API et une base de données, ou un service e-commerce approprié.


### Configuration Simplo Store
- WhatsApp configuré : `+237 655 331 025`.
- Adresse affichée : Avenue Kennedy.
- Les prix sont indiqués « Prix à confirmer » car les petits tableaux des captures ne permettent pas de lire chaque montant sans risque d’erreur. Les commandes WhatsApp demandent le tarif exact selon le modèle et la capacité.
