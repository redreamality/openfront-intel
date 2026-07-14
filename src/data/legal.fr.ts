import type { LegalDocuments } from './legal';

const projectIssues = 'https://github.com/redreamality/openfront-intel/issues';
const newIssue = 'https://github.com/redreamality/openfront-intel/issues/new';
const upstreamIssues = 'https://github.com/openfrontio/OpenFrontIO/issues';

export const frLegalDocuments: LegalDocuments = {
  privacy: {
    title: 'Politique de confidentialité',
    description: 'Utilisation des statistiques, cookies, données d’hébergement et choix de confidentialité par OpenFront Intel.',
    eyebrow: 'CONFIDENTIALITÉ',
    lead: 'Une explication claire des données traitées par ce site communautaire statique et de leur finalité.',
    updatedLabel: 'Dernière mise à jour',
    updatedDate: '13 juillet 2026',
    relatedHeading: 'Informations associées',
    backHome: 'Retour à l’accueil',
    sections: [
      {
        heading: 'Champ d’application et responsable',
        paragraphs: [
          'OpenFront Intel est un site de référence indépendant consacré à OpenFront.io et maintenu par la communauté. Le site est exploité par les responsables du projet OpenFront Intel ; il ne s’agit pas d’un service officiel d’OpenFront.io.',
          'Cette politique couvre les visites sur ce site. Les liens vers OpenFront.io, GitHub, Google et d’autres services renvoient vers des sites qui appliquent leurs propres règles de confidentialité.',
        ],
      },
      {
        heading: 'Informations traitées lors d’une visite',
        paragraphs: [
          'Le site ne propose ni compte utilisateur, ni commentaire, ni paiement, ni formulaire de contact interne. Ses pages statiques ne constituent pas une base de profils de visiteurs.',
        ],
        bullets: [
          'Données d’hébergement et de livraison : GitHub Pages et les fournisseurs réseau peuvent traiter l’adresse IP, l’URL demandée, la date et l’heure, le navigateur ou User-Agent, la page référente et des journaux de sécurité nécessaires à la livraison et à la protection du site.',
          'Google Analytics : le site ne charge la balise Google associée à l’identifiant G-7R6FVF17YG qu’après votre choix « Autoriser les statistiques ». Google peut alors recevoir les URL visitées, les référents, les caractéristiques du navigateur et de l’appareil, la langue, une zone approximative et des événements d’interaction ou de performance. Nous n’envoyons pas volontairement de nom, d’adresse e-mail, de compte OpenFront ni de contenu de message à Analytics.',
          'Informations publiées sur GitHub : lorsque vous ouvrez une issue, ajoutez un commentaire ou proposez une contribution, GitHub traite ces informations et leur contenu est normalement public.',
        ],
      },
      {
        heading: 'Cookies, mesure d’audience et publicité future',
        paragraphs: [
          'Après consentement, Google Analytics peut utiliser des cookies tels que _ga. Le choix « Essentiel uniquement » empêche le chargement de la balise. Les préférences peuvent être rouvertes depuis le pied de page sans limiter l’accès au contenu.',
          'À la date indiquée ci-dessus, OpenFront Intel propose Google Analytics en option mais ne diffuse pas de publicités Google AdSense. Si AdSense est activé ultérieurement, cette politique et les contrôles de consentement seront mis à jour avant la diffusion des annonces.',
        ],
        links: [
          {
            href: 'https://policies.google.com/privacy?hl=fr',
            label: 'Règles de confidentialité de Google',
            description: 'Traitement des données par Google dans Analytics et les services publicitaires.',
          },
          {
            href: 'https://tools.google.com/dlpage/gaoptout?hl=fr',
            label: 'Module de désactivation de Google Analytics',
            description: 'Extension fournie par Google pour empêcher la mesure Analytics.',
          },
          {
            href: 'https://support.google.com/My-Ad-Center-Help/answer/12155764?hl=fr',
            label: 'Contrôles de confidentialité publicitaire Google',
          },
        ],
      },
      {
        heading: 'Finalités et bases juridiques',
        bullets: [
          'Livrer et sécuriser le site, diagnostiquer les abus et maintenir sa disponibilité.',
          'Comprendre l’audience globale, les pages populaires, les appareils et les performances afin d’améliorer les ressources.',
          'Traiter les corrections, demandes de confidentialité et contributions reçues sur GitHub.',
        ],
        paragraphs: [
          'La livraison et la sécurité reposent sur le besoin légitime d’exploiter le service. La mesure Analytics facultative n’est activée qu’après un choix affirmatif du visiteur, quelle que soit sa région.',
        ],
      },
      {
        heading: 'Prestataires, communication et transferts',
        paragraphs: [
          'GitHub fournit le dépôt et l’hébergement Pages, tandis que Google fournit Analytics. Ces prestataires traitent les données selon leurs propres conditions et peuvent les transférer hors de votre pays avec les garanties qu’ils décrivent. Le contenu des issues publiques peut également être lu et indexé par des tiers.',
          'OpenFront Intel ne vend pas les informations personnelles des visiteurs. Des informations peuvent être communiquées si la loi l’exige, pour protéger le site et ses utilisateurs, ou en cas de changement dans l’exploitation du projet, avec les garanties applicables.',
        ],
        links: [
          {
            href: 'https://docs.github.com/fr/site-policy/privacy-policies/github-general-privacy-statement',
            label: 'Déclaration générale de confidentialité de GitHub',
          },
          {
            href: 'https://business.safety.google/adsprocessorterms/',
            label: 'Conditions Google relatives au traitement des données publicitaires',
          },
        ],
      },
      {
        heading: 'Durée de conservation',
        paragraphs: [
          'Ce site statique ne conserve aucune base de comptes ou de formulaires. GitHub conserve les journaux d’hébergement et l’activité publique du dépôt selon ses politiques. La conservation des événements au niveau utilisateur dans Google Analytics dépend des réglages de la propriété et des conditions de Google ; ce réglage étant administré hors du dépôt public, sa durée actuelle peut être demandée via le canal de contact ci-dessous. Des rapports agrégés peuvent subsister après expiration des données au niveau utilisateur.',
          'Les issues publiques et l’historique des contributions peuvent rester visibles jusqu’à leur modification ou suppression selon les procédures de GitHub et du projet. Les responsables cherchent à ne pas conserver d’informations identifiables au-delà de ce qui est nécessaire aux finalités décrites ou aux obligations légales.',
        ],
      },
      {
        heading: 'Vos choix et vos droits',
        bullets: [
          'Utilisez tout contrôle de consentement présenté sur le site et réglez votre navigateur pour bloquer ou supprimer les cookies et le stockage local.',
          'Utilisez le module de désactivation de Google Analytics ou des outils de navigation protecteurs de la vie privée.',
          'Sous réserve du droit applicable, demandez l’accès, la rectification, l’effacement, la limitation ou la portabilité, opposez-vous au traitement ou retirez votre consentement sans remettre en cause les traitements antérieurs licites.',
          'Saisissez l’autorité de protection des données compétente dans votre pays ou région.',
        ],
        paragraphs: [
          'Présentez votre demande via le suivi des issues du projet. Les issues GitHub sont publiques : ne publiez pas de pièce d’identité, d’adresse précise, d’identifiant de compte ni d’autre information sensible. Donnez uniquement les éléments nécessaires pour organiser la demande ; une vérification raisonnable peut être requise avant d’agir sur des données liées à une personne.',
        ],
        links: [
          {
            href: newIssue,
            label: 'Présenter une demande de confidentialité',
            description: 'Ouvrez une issue publique sans inclure de données personnelles sensibles.',
          },
        ],
      },
      {
        heading: 'Mineurs et évolution de la politique',
        paragraphs: [
          'Ce site de référence s’adresse à un public général de joueurs et n’est pas conçu pour recueillir les informations personnelles des enfants. Si vous pensez qu’un enfant a publié des données personnelles dans une issue, signalez-le afin que les responsables puissent étudier leur suppression.',
          'Cette politique peut évoluer avec le site, les prestataires ou la réglementation. La date en haut de page sera mise à jour et les changements importants seront signalés ici ou dans le dépôt du projet.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Pour toute question sur cette politique ou le traitement des données du site, contactez les responsables d’OpenFront Intel via le suivi des issues. Il s’agit du seul canal public annoncé par le projet ; aucun e-mail privé ni identité individuelle d’opérateur n’est inventé ici.',
        ],
        links: [{ href: projectIssues, label: 'Suivi des issues OpenFront Intel' }],
      },
    ],
  },
  contact: {
    title: 'Contact',
    description: 'Contacter les responsables d’OpenFront Intel pour une correction, une demande de confidentialité ou une contribution.',
    eyebrow: 'CONTACT',
    lead: 'Utilisez le suivi public du projet pour que chaque signalement reste vérifiable et exploitable.',
    updatedLabel: 'Dernière mise à jour',
    updatedDate: '13 juillet 2026',
    relatedHeading: 'Avant de nous contacter',
    backHome: 'Retour à l’accueil',
    sections: [
      {
        heading: 'Canal de contact du projet',
        paragraphs: [
          'OpenFront Intel est maintenu sur GitHub. Utilisez les issues pour les erreurs factuelles, liens cassés, problèmes d’accessibilité, corrections de traduction, questions sur les sources, demandes de confidentialité et propositions de nouveaux guides.',
          'Ce suivi est public et ne constitue pas une messagerie confidentielle. Ne publiez ni mot de passe, ni pièce d’identité, ni adresse précise, ni donnée de jeu privée, ni autre information personnelle sensible. Le projet ne publie aucun nom de responsable, adresse postale, numéro de téléphone ou e-mail privé ; cette page n’en invente donc aucun.',
        ],
        links: [
          { href: newIssue, label: 'Ouvrir une issue OpenFront Intel' },
          { href: projectIssues, label: 'Consulter les issues existantes' },
        ],
      },
      {
        heading: 'Rédiger un signalement utile',
        bullets: [
          'Indiquez l’URL exacte et la version linguistique concernée.',
          'Citez la phrase ou la valeur contestée et décrivez le résultat attendu.',
          'Ajoutez si possible le fichier, commit ou Release OpenFrontIO pertinent, ou une preuve reproductible dans le jeu.',
          'Pour un problème d’affichage ou d’accessibilité, précisez le navigateur, l’appareil ou la taille d’écran et les étapes de reproduction. Retirez les données personnelles des captures.',
          'Recherchez d’abord une issue existante afin de ne pas disperser la même enquête.',
        ],
      },
      {
        heading: 'Demandes de confidentialité et d’exercice des droits',
        paragraphs: [
          'Ouvrez une issue publique minimale pour identifier votre demande et demander comment poursuivre. Ne publiez aucun document sensible de vérification. Précisez le droit ou le problème concerné, l’interaction OpenFront Intel ou GitHub en cause et une date approximative. Une vérification raisonnable peut être nécessaire et la demande sera traitée selon le droit applicable.',
          'Les données Analytics sont généralement pseudonymes et ne correspondent à aucun compte du site ; le projet peut donc être incapable d’associer un enregistrement Analytics à une personne nommée. Les contrôles du navigateur et l’outil de désactivation Google sont le moyen le plus rapide de stopper les mesures futures.',
        ],
        links: [{ href: newIssue, label: 'Commencer une demande de confidentialité' }],
      },
      {
        heading: 'Corrections éditoriales et contributions',
        paragraphs: [
          'Les corrections sont vérifiées au moyen de la source la plus solide disponible. Une erreur confirmée peut conduire à modifier le contenu, relancer l’extraction, corriger une traduction ou documenter une incertitude. Les contributions doivent être originales ou correctement licenciées et citer leurs sources.',
          'Le projet est maintenu par la communauté et ne garantit aucun délai de réponse. Une absence de réponse immédiate ne signifie pas que le signalement a été rejeté.',
        ],
      },
      {
        heading: 'L’assistance officielle du jeu est distincte',
        paragraphs: [
          'OpenFront Intel est un site de référence indépendant. Il ne peut pas récupérer un compte OpenFront.io, modérer une partie, annuler une sanction, enquêter sur les serveurs officiels ni parler au nom des développeurs. Adressez les bugs du jeu et les questions officielles à OpenFrontIO.',
        ],
        links: [{ href: upstreamIssues, label: 'Suivi officiel des issues OpenFrontIO' }],
      },
    ],
  },
  editorialPolicy: {
    title: 'Politique éditoriale',
    description: 'Méthodes de recherche, vérification, traduction, mise à jour et correction d’OpenFront Intel.',
    eyebrow: 'POLITIQUE ÉDITORIALE',
    lead: 'Des données de jeu reliées à leurs sources, clairement séparées des interprétations et conseils.',
    updatedLabel: 'Dernière mise à jour',
    updatedDate: '13 juillet 2026',
    relatedHeading: 'Responsabilité',
    backHome: 'Retour à l’accueil',
    sections: [
      {
        heading: 'Mission et indépendance',
        paragraphs: [
          'OpenFront Intel aide les joueurs à comprendre OpenFront.io grâce à des données consultables, des explications, des comparaisons et des stratégies pratiques. Cette publication communautaire n’est ni exploitée, ni approuvée, ni cautionnée par OpenFront.io ou les contributeurs d’OpenFrontIO.',
          'Les sujets sont choisis pour leur utilité, leur vérifiabilité et leur impact sur les joueurs. Ni l’accès au projet du jeu ni une future relation publicitaire ne peut acheter un traitement favorable ou empêcher une correction.',
        ],
      },
      {
        heading: 'Hiérarchie des sources',
        bullets: [
          'Autorité primaire : le code source officiel d’OpenFrontIO, de préférence associé à une version ou un commit, pour les mécaniques, formules, unités, structures et cartes.',
          'Notes de version : le texte substantiel d’une Release GitHub officielle. Un texte de test ou de remplacement comme « TEST » ne devient jamais une note de patch inventée.',
          'Vérifications directes : observations reproductibles dans le client actuel, utilisées pour expliquer un comportement ou signaler une différence entre le code et l’exécution.',
          'Sources secondaires : discussions, vidéos et guides communautaires peuvent suggérer une enquête, mais sont identifiés comme secondaires et ne remplacent pas une preuve plus forte sans explication.',
        ],
        links: [
          { href: 'https://github.com/openfrontio/OpenFrontIO', label: 'Dépôt source officiel OpenFrontIO' },
          { href: 'https://github.com/openfrontio/OpenFrontIO/releases', label: 'Releases officielles OpenFrontIO' },
        ],
      },
      {
        heading: 'Extraction des données et valeur ajoutée',
        paragraphs: [
          'Les données structurées de src/data sont produites à partir d’un snapshot local du code OpenFrontIO par scripts/extract-game-data.mjs et ne sont pas modifiées à la main. Les métadonnées indiquent la version amont et la date de génération. Les valeurs peuvent néanmoins être obsolètes ou incomplètes si le snapshot ou l’extracteur est en retard sur le jeu en ligne.',
          'Recopier une valeur ne suffit pas à créer un article. Une page doit expliquer ce que la valeur contrôle, la comparer, exposer les hypothèses d’une formule, montrer ses conséquences pratiques, préciser ses limites de version et relier la source pertinente lorsque possible. Faits, calculs, déductions et opinions stratégiques doivent rester reconnaissables.',
        ],
      },
      {
        heading: 'Rédaction, vérification et versions',
        bullets: [
          'Indiquer la version du jeu ou la dernière date de vérification lorsqu’une règle peut changer.',
          'Tester les formules et exemples, conserver des unités cohérentes et ne pas présenter un arrondi comme une valeur exacte du code.',
          'Citer si possible un chemin source, un commit, une Release ou des étapes reproductibles plutôt qu’une affirmation sans attribution.',
          'Revoir les pages importantes après les versions amont et qualifier clairement celles qui ne sont pas encore vérifiées sur la dernière version.',
          'Avant chaque traduction, vérifier dans la langue cible la terminologie, les liens, les nombres et le sens.',
        ],
      },
      {
        heading: 'Automatisation, traduction et responsabilité',
        paragraphs: [
          'Des outils d’extraction, d’analyse, d’aide à la rédaction et de traduction peuvent assister le projet. Leur résultat ne constitue pas une autorité en soi. Les responsables restent comptables de la page publiée et doivent vérifier les faits dans les sources primaires citées, relire les traductions en contexte et signaler les incertitudes importantes.',
          'Les cinq versions linguistiques visent les mêmes faits, mais leur formulation et leurs exemples peuvent être adaptés. En cas de conflit, c’est la source primaire — et non l’anglais par défaut — qui tranche la question factuelle.',
        ],
      },
      {
        heading: 'Politique de correction',
        paragraphs: [
          'Toute personne peut signaler une erreur dans les issues OpenFront Intel. Un bon signalement identifie la page, le texte ou la valeur contestée, la version du jeu et la preuve. Les responsables étudient les sources, reproduisent si possible, puis corrigent la page ou expliquent l’absence de changement.',
          'Une correction importante doit, lorsque possible, mettre à jour la date de page ou ajouter une courte note. Les corrections typographiques peuvent rester silencieuses. Une erreur de donnée générée se corrige dans l’extracteur ou le snapshot, jamais par modification manuelle du JSON produit.',
        ],
        links: [{ href: newIssue, label: 'Signaler une erreur de contenu' }],
      },
      {
        heading: 'Licences, attribution et monétisation',
        paragraphs: [
          'Tout contenu cité ou dérivé est attribué selon sa licence. Les contributions plagiées, images non autorisées et preuves fabriquées sont refusées. Le contenu OpenFront Intel suit la licence annoncée par le site, sauf indication contraire.',
          'Le site ne diffuse actuellement aucune publicité Google AdSense. Si de la publicité, du sponsoring, des liens d’affiliation ou un accès fourni pour évaluation sont introduits, ils seront signalés et séparés de la sélection des sources et des conclusions. La publicité ne change pas les règles de correction.',
        ],
      },
    ],
  },
};
