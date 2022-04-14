# Projet-Web

Lien vers heruko:  https://donneesconnect.herokuapp.com/



## Parser un contenu d'une page web Scraping avec puppeteer
### Le prix de la consommation d'eau annuelle par ville
#### Pour y acceder tapez la route : localhost:3000/PrixEau/

Pour cette source, la méthode du scraping a été adoptée. A l’aide de Node.js nous avons utilisé son package « Puppeteer », pour automatiser l’extraction d’information d’une page web, en l’occurrence le prix de la facture estimée pour 120m3/an. Le lien de la page se trouve ci-dessous.
(https://www.fournisseurs-electricite.com/eau/prix-commune)

##   Téléchargement d'un jeu de données 
#### Consommation mensuelle brute de gaz des grandes Métropoles françaises (zone GRTgaz + Teréga)

Ce jeu de données présente les estimations mensuelles des consommations de gaz (KWh PCS 0°C) des métropoles françaises.
Cette  donnée est disponible sur le site data.gouv (https://www.data.gouv.fr/fr/datasets/consommation-mensuelle-brute-de-gaz-des-grandes-metropoles-francaises-zone-grtgaz-terega/)
Pour le code: Nous avons crée une boucle "for" afin de traverser toutes la base de données. Pour chaque "i" correspondant à une ville donnée, il va rassembler toutes les informations atrayant à la ville donnée. Ces données sont sommées afin d'obtenir la somme de la consommation totale. En parallèles, une variable "n" compte le nombre de fois que l'on a trouvé le "i" c'est à dire la ville. Puis pour obtenir une moyenne annuel, il a suffit de diviser la somme obtenue précèdemment par notre n. Le tout est ajouté au json.


##  Récupération des données avec une requête  API
#### Prix de la consommation de carburant par ville
Via le lien ci-dessous, sur l'onglet API, nous avons récupérer un certains nombre de lignes concernant les variables dont nous avions besoin tel que commune, population, code postale etc. On les a enregistrer, puis integrer dans le code. Par la suite toujours avec Node.js, nous avons utilisé le package axios pour lire une API.
https://public.opendatasoft.com/explore/dataset/prix-des-carburants-j-1/table/




## Trouver un lien pour croiser les données 

### Objectif

Avec ces données, l’objectif est de permettre à un utilisateur de connaitre les informations énoncées ci-dessus en renseignant le nom d'une ville qu’il souhaite. 

# Contrainte & Perspective

On veut grâce au nom des villes présentes dans chaque tables réaliser une jointure des trois tables. Cependant les villes n'ont pas les mêmes formats (majuscule/minuscule etc...). Nos tables ne diposent pas forcément du même nombre de villes.

#Résulats & Sortie
Le nom de la ville est renseigné dans le localhost. Renvoi un fichier json contenant les informations carburants (différents type de carburant et leurs prix), informations de la consommations d'eaux() et de gaz() 

