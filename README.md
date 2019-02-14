# react-redux-plateforme-formation
React/Redux/NodeJS/Express/Mongoose

--------- PLATEFORME PEDAGOGIQUE ----------------

Objectif : 
Création d'une plateforme permettant de créer des séquences pédagogiques à destination de ces élèves.

Etat actuel : 
- Vue enseignant
- Possibilité de créer des ressources pédagogiques de type :
  -> QCM : Questionnaires à choix multiples
  -> QCU : Questionnaires à choix unique
 
 A venir :
 1. Possibilité de créer des séquences pédagogiques.
 2. Ajout de ressources de type "file" (image, vidéo,...)
 3. Création de nouveaux moteurs de création de ressources ("Associer", "Remettre dans l'ordre"...).
 4. Vue apprenant
 
 ------------------------------------------------------------------------------------------------------
 INSTALLATION : 
 
 1. Cloner ou télécharger le projet
 2.Dans le dossier back:
  -> lancer la commande "npm install" pour installer tous les packages
  -> créer un dossier config à la racine du dossier : 
      ! Y ajouter un fichier "keys.js"
      ! Dans le fichier keys.js mettre :
          module.exports = {
              mongoURI: "mongodb://votre-base-de-donnees-mongo",
              secret: 'Votre phrase secrète',
              api: 'http://localhost:5001/api/'
          }
  -> lancer la commande "npm run dev" pour lancer le serveur
 3. Dans le dossier front:
  -> lancer "npm install" pour installer tous les packages
  -> npm start pour lancer l'application
  
  -----------------------------------------------------------------------------------------------------
 LANCEMENT DE L'APPLICATION :
 
Une fois votre application lancée vous arriverez sur une page de login. 
Cliquer sur "S'enregistrer" pour créer un nouvel utilisateur. 
Une fois l'utilisateur créé connectez vous pour accéder aux fonctionnalités de la plateforme.
Bonne visite.
 
 
 

