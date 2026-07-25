import type { LegalDocuments } from './legal';

const projectIssues = 'https://github.com/redreamality/openfront-intel/issues';
const newIssue = 'https://github.com/redreamality/openfront-intel/issues/new';
const upstreamIssues = 'https://github.com/openfrontio/OpenFrontIO/issues';

export const nlLegalDocuments: LegalDocuments = {
  privacy: {
    title: 'Privacybeleid',
    description: 'Hoe OpenFront Intel analytics, cookies, hostinggegevens en privacykeuzes behandelt.',
    eyebrow: 'PRIVACY',
    lead: 'Een duidelijke uitleg van welke gegevens deze statische communitysite verwerkt en waarom.',
    updatedLabel: 'Laatst bijgewerkt',
    updatedDate: '25 juli 2026',
    relatedHeading: 'Gerelateerde informatie',
    backHome: 'Terug naar home',
    sections: [
      {
        heading: 'Reikwijdte en beheerder',
        paragraphs: [
          'OpenFront Intel is een onafhankelijke, door de community onderhouden informatiesite over OpenFront.io. De beheerders van het OpenFront Intel-project exploiteren deze website; het is geen officiële dienst van OpenFront.io.',
          'Dit beleid geldt voor bezoeken aan deze website. Links naar OpenFront.io, GitHub, Google en andere diensten leiden naar websites met een eigen privacybeleid.',
        ],
      },
      {
        heading: 'Informatie die bij een bezoek wordt verwerkt',
        paragraphs: [
          'De site heeft geen gebruikersaccounts, reacties, betalingen of eigen contactformulier. De statische pagina’s houden geen eigen database met bezoekersprofielen bij.',
        ],
        bullets: [
          'Hosting- en aflevergegevens: GitHub Pages en netwerkproviders kunnen een IP-adres, aangevraagde URL, datum en tijd, browser- of User-Agent-gegevens, verwijzende pagina en beveiligingslogboeken verwerken om de site af te leveren en te beveiligen.',
          'Google Analytics: de site laadt de Google-tag met metings-ID G-7R6FVF17YG pas nadat u “Analytics toestaan” kiest. Google kan dan bezochte URL’s, verwijzers, browser- en apparaatkenmerken, taal, een globale locatie en interactie- of prestatiegebeurtenissen ontvangen. Wij sturen niet bewust namen, e-mailadressen, OpenFront-accounts of berichtinhoud naar Analytics.',
          'Informatie die u op GitHub plaatst: wanneer u een issue, reactie of bijdrage publiceert, verwerkt GitHub die informatie en is de inhoud doorgaans openbaar.',
        ],
      },
      {
        heading: 'Cookies, bezoekersmeting en toekomstige advertenties',
        paragraphs: [
          'Na toestemming kan Google Analytics cookies zoals _ga gebruiken. “Alleen essentieel” voorkomt dat de Analytics-tag wordt geladen. U kunt de keuze via Cookie-instellingen in de footer wijzigen zonder toegang tot inhoud te verliezen.',
          'Op de datum hierboven biedt OpenFront Intel Google Analytics optioneel aan, maar toont het geen Google AdSense-advertenties. Als AdSense later wordt ingeschakeld, kunnen Google en zijn advertentiepartners cookies plaatsen of lezen, webbakens of vergelijkbare technologieën gebruiken en lokale opslag, apparaat-ID’s, IP-adressen, een benaderde locatie, paginacontext en advertentie-interacties verwerken om advertenties te tonen, de frequentie te beperken, prestaties te meten, fraude te voorkomen of advertenties te personaliseren. Waar dit verplicht is, worden advertentiekeuzes via een door Google gecertificeerd toestemmingsbeheerplatform verzameld voordat advertentiecode wordt ingeschakeld.',
        ],
        links: [
          {
            href: 'https://policies.google.com/privacy?hl=nl',
            label: 'Privacybeleid van Google',
            description: 'Hoe Google gegevens verwerkt in Analytics en advertentiediensten.',
          },
          {
            href: 'https://policies.google.com/technologies/partner-sites?hl=nl',
            label: 'Hoe Google informatie gebruikt van sites of apps die zijn diensten gebruiken',
            description: 'Google legt uit hoe cookies, identificatoren, IP-adressen en verwante gegevens op partnersites worden verwerkt.',
          },
          {
            href: 'https://tools.google.com/dlpage/gaoptout?hl=nl',
            label: 'Browser-add-on om Google Analytics te deactiveren',
            description: 'Een hulpmiddel van Google om Analytics-metingen te voorkomen.',
          },
          {
            href: 'https://support.google.com/My-Ad-Center-Help/answer/12155764?hl=nl',
            label: 'Privacyinstellingen voor Google-advertenties',
          },
        ],
      },
      {
        heading: 'Doeleinden en rechtsgronden',
        bullets: [
          'De site afleveren en beveiligen, misbruik onderzoeken en de beschikbaarheid bewaken.',
          'Inzicht krijgen in het totale bereik, populaire pagina’s, apparaten en prestaties om de informatie te verbeteren.',
          'Correcties, privacyverzoeken en bijdragen behandelen die via GitHub zijn ingediend.',
        ],
        paragraphs: [
          'Aflevering en beveiliging berusten op de gerechtvaardigde noodzaak om de dienst te beheren. Optionele Analytics-metingen worden, ongeacht de regio, pas na een uitdrukkelijke keuze van de bezoeker geactiveerd.',
        ],
      },
      {
        heading: 'Dienstverleners, verstrekking en doorgifte',
        paragraphs: [
          'GitHub levert de repository en Pages-hosting; Google levert Analytics. Deze aanbieders verwerken gegevens volgens hun eigen voorwaarden en kunnen gegevens buiten uw land verwerken met de waarborgen die zij beschrijven. Openbare issues kunnen bovendien door anderen worden gelezen en geïndexeerd.',
          'OpenFront Intel verkoopt geen persoonsgegevens van bezoekers. Informatie kan worden verstrekt wanneer de wet dit vereist, om de site en gebruikers te beschermen, of bij een wijziging in het projectbeheer, telkens met de toepasselijke waarborgen.',
        ],
        links: [
          {
            href: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
            label: 'Algemene privacyverklaring van GitHub',
          },
          {
            href: 'https://business.safety.google/adsprocessorterms/',
            label: 'Voorwaarden van Google voor advertentiegegevensverwerking',
          },
        ],
      },
      {
        heading: 'Bewaartermijnen',
        paragraphs: [
          'Deze statische site bewaart geen database met accounts of contactformulieren. GitHub bewaart hostinglogboeken en openbare repositoryactiviteit volgens zijn beleid. De bewaartermijn voor gebeurtenissen op gebruikersniveau in Google Analytics wordt bepaald door de property-instelling en de voorwaarden van Google. Omdat die instelling buiten deze openbare repository wordt beheerd, kan de actuele ingestelde termijn via het onderstaande contactkanaal worden opgevraagd. Samengevoegde rapporten kunnen blijven bestaan nadat gegevens op gebruikersniveau zijn verlopen.',
          'Openbare issues en bijdragegeschiedenis kunnen zichtbaar blijven totdat ze volgens de procedures van GitHub en het project worden gewijzigd of verwijderd. De beheerders streven ernaar identificeerbare informatie niet langer te bewaren dan nodig is voor de beschreven doelen of wettelijke verplichtingen.',
        ],
      },
      {
        heading: 'Uw keuzes en rechten',
        bullets: [
          'Gebruik toestemmingsinstellingen die op de site worden aangeboden en stel uw browser in om cookies en siteopslag te blokkeren of wissen.',
          'Gebruik de opt-out-add-on van Google Analytics of privacybeschermende browserhulpmiddelen.',
          'Vraag, voor zover het toepasselijke recht dit toestaat, om inzage, correctie, verwijdering, beperking of overdraagbaarheid, maak bezwaar of trek toestemming in zonder de rechtmatigheid van eerdere verwerking aan te tasten.',
          'Dien een klacht in bij de gegevensbeschermingsautoriteit die voor uw land of regio bevoegd is.',
        ],
        paragraphs: [
          'Dien een privacyverzoek in via de issue-tracker van het project. GitHub-issues zijn openbaar: plaats geen identiteitsdocumenten, exacte adressen, accountgegevens of andere gevoelige informatie. Deel alleen genoeg om de verdere afhandeling te organiseren; vóór actie op persoonsgegevens kan een redelijke verificatie nodig zijn.',
        ],
        links: [
          {
            href: newIssue,
            label: 'Een privacyverzoek indienen',
            description: 'Open een openbaar GitHub-issue zonder gevoelige persoonsgegevens.',
          },
        ],
      },
      {
        heading: 'Kinderen en beleidswijzigingen',
        paragraphs: [
          'Deze informatiesite is bedoeld voor een algemeen gamepubliek en is niet ontworpen om persoonsgegevens van kinderen te verzamelen. Meld het als u denkt dat een kind persoonlijke informatie in een projectissue heeft geplaatst, zodat de beheerders verwijderingsmogelijkheden kunnen beoordelen.',
          'Dit beleid kan wijzigen als de site, dienstverleners of wetgeving veranderen. De datum bovenaan wordt aangepast; belangrijke wijzigingen worden op deze pagina of in de projectrepository zichtbaar gemaakt.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Neem voor vragen over dit beleid of de verwerking van sitegegevens via de issue-tracker contact op met de beheerders van OpenFront Intel. Dit is het enige gepubliceerde contactkanaal van het project; hier wordt geen privé-e-mailadres of identiteit van een individuele beheerder verzonnen.',
        ],
        links: [{ href: projectIssues, label: 'Issue-tracker van OpenFront Intel' }],
      },
    ],
  },
  contact: {
    title: 'Contact',
    description: 'Contact opnemen met OpenFront Intel over correcties, privacy en bijdragen.',
    eyebrow: 'CONTACT',
    lead: 'Gebruik de openbare projecttracker zodat meldingen controleerbaar en uitvoerbaar blijven.',
    updatedLabel: 'Laatst bijgewerkt',
    updatedDate: '13 juli 2026',
    relatedHeading: 'Lees dit vóór u contact opneemt',
    backHome: 'Terug naar home',
    sections: [
      {
        heading: 'Contactkanaal van het project',
        paragraphs: [
          'OpenFront Intel wordt via het GitHub-project onderhouden. Gebruik de issue-tracker voor feitelijke correcties, kapotte pagina’s, toegankelijkheidsproblemen, vertaalcorrecties, bronvragen, privacyverzoeken en voorstellen voor nieuwe gidsen.',
          'De tracker is openbaar en geen vertrouwelijke helpdesk. Plaats geen wachtwoorden, identiteitsdocumenten, exacte adressen, privéspelgegevens of andere gevoelige persoonsgegevens. Het project publiceert geen naam, postadres, telefoonnummer of privé-e-mailadres van een beheerder; op deze pagina worden die gegevens daarom niet verzonnen.',
        ],
        links: [
          { href: newIssue, label: 'Een nieuw OpenFront Intel-issue openen' },
          { href: projectIssues, label: 'Bestaande issues bekijken' },
        ],
      },
      {
        heading: 'Wat een melding bruikbaar maakt',
        bullets: [
          'Vermeld de exacte pagina-URL en de taalversie waarop de melding betrekking heeft.',
          'Citeer de betwiste zin of waarde en leg uit wat het verwachte resultaat is.',
          'Link waar mogelijk naar het relevante OpenFrontIO-bestand, de commit, Release of reproduceerbaar bewijs uit de game.',
          'Vermeld bij een weergave- of toegankelijkheidsprobleem browser, apparaat of viewport en duidelijke reproductiestappen. Verwijder persoonsgegevens uit screenshots.',
          'Zoek eerst in bestaande issues om te voorkomen dat hetzelfde onderzoek wordt opgesplitst.',
        ],
      },
      {
        heading: 'Privacy- en rechtenverzoeken',
        paragraphs: [
          'Open een zo beknopt mogelijk openbaar issue om het verzoek te benoemen en te vragen hoe u verdergaat. Plaats geen gevoelig verificatiemateriaal. Vermeld welk recht of probleem speelt, welke interactie met OpenFront Intel of GitHub erbij hoort en een globale datum. Redelijke verificatie kan nodig zijn; het verzoek wordt volgens het toepasselijke recht behandeld.',
          'Analytics-gegevens zijn doorgaans pseudoniem en niet aan een siteaccount gekoppeld. Daardoor kan het project mogelijk geen Analytics-record aan een genoemde persoon verbinden. Browserinstellingen en Google-opt-out zijn de snelste manier om toekomstige metingen te stoppen.',
        ],
        links: [{ href: newIssue, label: 'Een privacyverzoek starten' }],
      },
      {
        heading: 'Redactionele correcties en bijdragen',
        paragraphs: [
          'Correcties worden aan de sterkste beschikbare bron getoetst. Een bevestigde fout kan leiden tot een inhoudswijziging, nieuwe data-extractie, vertaalcorrectie of toelichting op onzekerheid. Bijdragen moeten origineel of correct gelicentieerd zijn en hun bronnen noemen.',
          'Het project wordt door de community onderhouden en belooft geen vaste reactietijd. Geen onmiddellijke reactie betekent niet dat een melding is afgewezen.',
        ],
      },
      {
        heading: 'Officiële gameondersteuning staat los hiervan',
        paragraphs: [
          'OpenFront Intel is een onafhankelijke informatiesite. Het kan geen OpenFront.io-accounts herstellen, spellen modereren, bans terugdraaien, incidenten op officiële servers onderzoeken of namens ontwikkelaars spreken. Meld gamebugs en officiële projectvragen bij OpenFrontIO.',
        ],
        links: [{ href: upstreamIssues, label: 'Officiële issue-tracker van OpenFrontIO' }],
      },
    ],
  },
  editorialPolicy: {
    title: 'Redactioneel beleid',
    description: 'Hoe OpenFront Intel inhoud onderzoekt, controleert, vertaalt, bijwerkt en corrigeert.',
    eyebrow: 'REDACTIONEEL BELEID',
    lead: 'Gamegegevens met herleidbare bronnen, duidelijk gescheiden van interpretatie en advies.',
    updatedLabel: 'Laatst bijgewerkt',
    updatedDate: '13 juli 2026',
    relatedHeading: 'Verantwoording',
    backHome: 'Terug naar home',
    sections: [
      {
        heading: 'Missie en onafhankelijkheid',
        paragraphs: [
          'OpenFront Intel helpt spelers OpenFront.io te begrijpen met doorzoekbare gegevens, uitleg, vergelijkingen en praktische strategie. Deze communitypublicatie wordt niet beheerd, goedgekeurd of onderschreven door OpenFront.io of de bijdragers aan OpenFrontIO.',
          'Onderwerpen worden gekozen op bruikbaarheid, controleerbaarheid en impact voor spelers. Toegang tot het gameproject of een toekomstige advertentierelatie koopt geen gunstige behandeling en houdt geen correctie tegen.',
        ],
      },
      {
        heading: 'Bronnenhiërarchie',
        bullets: [
          'Primaire autoriteit: de officiële OpenFrontIO-broncode, bij voorkeur gekoppeld aan een versie of commit, voor mechanieken, formules, eenheden, gebouwen en kaarten.',
          'Release notes: de inhoudelijke tekst van een officiële GitHub Release. Tijdelijke of test-release-tekst zoals “TEST” wordt niet tot verzonnen patch notes uitgewerkt.',
          'Eigen controles: reproduceerbare waarnemingen in de actuele gameclient om gedrag uit te leggen of een verschil tussen broncode en runtime te markeren.',
          'Secundair materiaal: communitydiscussies, video’s en gidsen kunnen onderzoeksvragen opleveren, maar worden als secundair aangeduid en vervangen sterker bewijs niet zonder uitleg.',
        ],
        links: [
          { href: 'https://github.com/openfrontio/OpenFrontIO', label: 'Officiële OpenFrontIO-bronrepository' },
          { href: 'https://github.com/openfrontio/OpenFrontIO/releases', label: 'Officiële OpenFrontIO-releases' },
        ],
      },
      {
        heading: 'Data-extractie en toegevoegde waarde',
        paragraphs: [
          'Gestructureerde gamegegevens in src/data worden met scripts/extract-game-data.mjs uit een lokale OpenFrontIO-bronsnapshot gegenereerd en niet met de hand aangepast. De metadata noemt de upstreamversie en generatietijd. Waarden kunnen toch verouderd of onvolledig zijn als de snapshot of extractor achterloopt op de live game.',
          'Een gekopieerde waarde is nog geen redactioneel eindproduct. Pagina’s horen uit te leggen wat de waarde bepaalt, hoe waarden zich verhouden, welke aannames een formule gebruikt, wat de praktische gevolgen en versielimieten zijn en waar de relevante bron staat. Feiten, berekeningen, gevolgtrekkingen en strategische meningen moeten van elkaar te onderscheiden zijn.',
        ],
      },
      {
        heading: 'Schrijven, controleren en versiebeheer',
        bullets: [
          'Noem de toepasselijke gameversie of laatste controledatum wanneer een regel tussen releases kan wijzigen.',
          'Test formules en voorbeelden, gebruik consistente eenheden en presenteer afgeronde schattingen niet als exacte bronwaarden.',
          'Gebruik waar mogelijk concrete bronpaden, commits, Releases of reproduceerbare stappen in plaats van claims zonder bron.',
          'Controleer belangrijke pagina’s opnieuw na upstreamreleases en markeer zichtbaar welke inhoud nog niet tegen de nieuwste versie is getoetst.',
          'Controleer vóór publicatie van elke vertaling terminologie, links, getallen en betekenis in de doeltaal.',
        ],
      },
      {
        heading: 'Automatisering, vertaling en verantwoordelijkheid',
        paragraphs: [
          'Hulpmiddelen voor automatische extractie, analyse, schrijfondersteuning en vertaling kunnen het project ondersteunen. Hun uitvoer geldt niet vanzelf als autoriteit. De beheerders blijven verantwoordelijk voor de gepubliceerde pagina, controleren feitelijke claims aan de hand van genoemde primaire bronnen, beoordelen vertalingen in context en vermelden belangrijke onzekerheid.',
          'De vijf taalversies streven naar dezelfde feiten, maar formulering en voorbeelden mogen voor de duidelijkheid worden aangepast. Bij een conflict beslist de primaire bron over de feitelijke vraag, niet automatisch de Engelse pagina.',
        ],
      },
      {
        heading: 'Correctiebeleid',
        paragraphs: [
          'Iedereen kan via de issue-tracker van OpenFront Intel een fout melden. Een bruikbare correctie noemt de pagina, betwiste tekst of waarde, gameversie en onderbouwende bron. De beheerders beoordelen het bewijs, reproduceren het probleem waar mogelijk en corrigeren de pagina of leggen uit waarom geen wijziging volgt.',
          'Een wezenlijke correctie hoort waar mogelijk de paginadatum bij te werken of een korte notitie te krijgen. Kleine spelling- en opmaakwijzigingen kunnen stil worden uitgevoerd. Fouten in gegenereerde data worden in de extractor of bronsnapshot hersteld, nooit door gegenereerde JSON handmatig te wijzigen.',
        ],
        links: [{ href: newIssue, label: 'Een inhoudsfout melden' }],
      },
      {
        heading: 'Licenties, bronvermelding en inkomsten',
        paragraphs: [
          'Geciteerd of afgeleid materiaal wordt volgens de toepasselijke licentie toegeschreven. Geplagieerde tekst, afbeeldingen zonder licentie en verzonnen bewijs zijn niet toegestaan. Inhoud van OpenFront Intel volgt de op de site genoemde licentie, tenzij bij een onderdeel anders staat.',
          'De site toont momenteel geen Google AdSense-advertenties. Als advertenties, sponsoring, affiliatelinks of verstrekte reviewtoegang worden ingevoerd, worden die vermeld en gescheiden gehouden van bronselectie en conclusies. Advertentieplaatsing verandert de correctienorm niet.',
        ],
      },
    ],
  },
};
