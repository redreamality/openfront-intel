import type { LegalDocuments } from './legal';

const projectIssues = 'https://github.com/redreamality/openfront-intel/issues';
const newIssue = 'https://github.com/redreamality/openfront-intel/issues/new';
const upstreamIssues = 'https://github.com/openfrontio/OpenFrontIO/issues';

export const deLegalDocuments: LegalDocuments = {
  privacy: {
    title: 'Datenschutzerklärung',
    description: 'Wie OpenFront Intel Analysedienste, Cookies, Hostingdaten und Datenschutzoptionen handhabt.',
    eyebrow: 'DATENSCHUTZ',
    lead: 'Eine verständliche Erklärung, welche Daten diese statische Community-Seite verarbeitet und warum.',
    updatedLabel: 'Zuletzt aktualisiert',
    updatedDate: '25. Juli 2026',
    relatedHeading: 'Weitere Informationen',
    backHome: 'Zurück zur Startseite',
    sections: [
      {
        heading: 'Geltungsbereich und Betreiber',
        paragraphs: [
          'OpenFront Intel ist eine unabhängige, von der Community gepflegte Informationsseite zu OpenFront.io. Betrieben wird diese Website von den Verantwortlichen des OpenFront-Intel-Projekts; sie ist kein offizieller Dienst von OpenFront.io.',
          'Diese Erklärung gilt für Besuche auf dieser Website. Für verlinkte Angebote von OpenFront.io, GitHub, Google und anderen Anbietern gelten deren eigene Datenschutzbestimmungen.',
        ],
      },
      {
        heading: 'Beim Besuch verarbeitete Informationen',
        paragraphs: [
          'Die Website bietet keine Benutzerkonten, Kommentare, Bezahlvorgänge oder eigenen Kontaktformulare. Die statischen Seiten führen keine eigene Datenbank mit Besucherprofilen.',
        ],
        bullets: [
          'Hosting- und Auslieferungsdaten: GitHub Pages und Netzwerkanbieter können IP-Adresse, angeforderte URL, Datum und Uhrzeit, Browser- beziehungsweise User-Agent-Angaben, Referrer und Sicherheitsprotokolle verarbeiten, soweit dies zur Auslieferung und Absicherung der Website nötig ist.',
          'Google Analytics: Die Website lädt das Google-Tag mit der Mess-ID G-7R6FVF17YG erst nach Ihrer Auswahl „Analytics erlauben“. Google kann dann besuchte URLs, Referrer, Browser- und Geräteeigenschaften, Sprache, einen ungefähren Standort sowie Interaktions- oder Leistungsereignisse erhalten. Namen, E-Mail-Adressen, OpenFront-Konten oder Nachrichteninhalte werden von uns nicht absichtlich an Analytics übermittelt.',
          'Auf GitHub veröffentlichte Angaben: Wer ein Issue, einen Kommentar oder einen Beitrag einstellt, übermittelt diese Informationen an GitHub; der Inhalt ist üblicherweise öffentlich.',
        ],
      },
      {
        heading: 'Cookies, Reichweitenmessung und künftige Werbung',
        paragraphs: [
          'Nach der Einwilligung kann Google Analytics Cookies wie _ga verwenden. „Nur erforderlich“ verhindert das Laden des Analytics-Tags. Die Auswahl kann jederzeit über die Cookie-Einstellungen im Footer geändert werden, ohne den Zugriff auf Inhalte einzuschränken.',
          'Zum oben genannten Stand bietet OpenFront Intel Google Analytics optional an, zeigt jedoch keine Google-AdSense-Anzeigen. Wird AdSense später aktiviert, können Google und seine Werbepartner Cookies setzen oder lesen, Web-Beacons oder ähnliche Technologien einsetzen und lokalen Speicher, Gerätekennungen, IP-Adressen, einen ungefähren Standort, Seitenkontext sowie Anzeigeninteraktionen verarbeiten, um Anzeigen auszuliefern, ihre Häufigkeit zu begrenzen, Leistung zu messen, Betrug zu verhindern oder Werbung zu personalisieren. Soweit erforderlich, werden Werbeentscheidungen über eine von Google zertifizierte Consent-Management-Plattform erfasst, bevor Werbecode aktiviert wird.',
        ],
        links: [
          {
            href: 'https://policies.google.com/privacy?hl=de',
            label: 'Datenschutzerklärung von Google',
            description: 'Datenverarbeitung durch Google bei Analytics und Werbediensten.',
          },
          {
            href: 'https://policies.google.com/technologies/partner-sites?hl=de',
            label: 'Wie Google Informationen von Websites oder Apps verwendet, die seine Dienste nutzen',
            description: 'Googles Erklärung zu Cookies, Kennungen, IP-Adressen und verwandter Datenverarbeitung auf Partnerseiten.',
          },
          {
            href: 'https://tools.google.com/dlpage/gaoptout?hl=de',
            label: 'Browser-Add-on zur Deaktivierung von Google Analytics',
            description: 'Von Google bereitgestellte Möglichkeit, Analytics-Messungen zu unterbinden.',
          },
          {
            href: 'https://support.google.com/My-Ad-Center-Help/answer/12155764?hl=de',
            label: 'Google-Einstellungen zum Datenschutz bei Werbung',
          },
        ],
      },
      {
        heading: 'Zwecke und Rechtsgrundlagen',
        bullets: [
          'Website ausliefern und schützen, Missbrauch untersuchen und Verfügbarkeit erhalten.',
          'Gesamtreichweite, beliebte Seiten, Geräte und Leistung verstehen, um die Inhalte zu verbessern.',
          'Über GitHub eingereichte Korrekturen, Datenschutzanfragen und Beiträge bearbeiten.',
        ],
        paragraphs: [
          'Auslieferung und Sicherheit beruhen auf dem berechtigten Erfordernis, den Dienst zu betreiben. Optionale Analytics-Messung wird unabhängig von der Region erst nach einer ausdrücklichen Auswahl des Besuchers aktiviert.',
        ],
      },
      {
        heading: 'Dienstleister, Offenlegung und Übermittlungen',
        paragraphs: [
          'GitHub stellt Repository und Pages-Hosting bereit, Google den Analytics-Dienst. Beide Anbieter verarbeiten Daten nach ihren eigenen Bedingungen und können sie mit den dort beschriebenen Schutzmechanismen außerhalb Ihres Landes verarbeiten. Öffentliche Issue-Inhalte können außerdem von Dritten gelesen und indexiert werden.',
          'OpenFront Intel verkauft keine personenbezogenen Besucherdaten. Eine Offenlegung kann erfolgen, wenn sie gesetzlich vorgeschrieben ist, dem Schutz der Website und ihrer Nutzer dient oder der Projektbetrieb wechselt, jeweils unter den anwendbaren Schutzvorkehrungen.',
        ],
        links: [
          {
            href: 'https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement',
            label: 'Allgemeine Datenschutzerklärung von GitHub',
          },
          {
            href: 'https://business.safety.google/adsprocessorterms/',
            label: 'Google-Bedingungen zur Verarbeitung von Werbedaten',
          },
        ],
      },
      {
        heading: 'Speicherdauer',
        paragraphs: [
          'Diese statische Website unterhält keine Konto- oder Kontaktformulardatenbank. GitHub bewahrt Hostingprotokolle und öffentliche Repository-Aktivitäten nach seinen Richtlinien auf. Die Aufbewahrung nutzerbezogener Ereignisdaten in Google Analytics richtet sich nach der Property-Einstellung und den Google-Bedingungen. Da diese Einstellung außerhalb des öffentlichen Repositorys verwaltet wird, kann die aktuell konfigurierte Dauer über den unten genannten Kontaktweg erfragt werden. Zusammengefasste Berichte können nach Ablauf nutzerbezogener Daten bestehen bleiben.',
          'Öffentliche Issues und Beitragshistorien können sichtbar bleiben, bis sie nach den Verfahren von GitHub und Projekt geändert oder entfernt werden. Die Verantwortlichen wollen identifizierbare Informationen nicht länger aufbewahren, als es für die genannten Zwecke oder gesetzliche Pflichten erforderlich ist.',
        ],
      },
      {
        heading: 'Ihre Wahlmöglichkeiten und Rechte',
        bullets: [
          'Nutzen Sie die auf der Website angebotenen Einwilligungssteuerungen und blockieren oder löschen Sie Cookies und Website-Speicher in Ihrem Browser.',
          'Verwenden Sie das Google-Analytics-Deaktivierungs-Add-on oder datenschutzfreundliche Browserwerkzeuge.',
          'Verlangen Sie nach Maßgabe des anwendbaren Rechts Auskunft, Berichtigung, Löschung, Einschränkung oder Übertragbarkeit, legen Sie Widerspruch ein oder widerrufen Sie eine Einwilligung, ohne die Rechtmäßigkeit der vorherigen Verarbeitung zu berühren.',
          'Beschweren Sie sich bei der für Ihr Land oder Ihre Region zuständigen Datenschutzaufsichtsbehörde.',
        ],
        paragraphs: [
          'Stellen Sie eine Datenschutzanfrage über den Issue-Tracker des Projekts. GitHub-Issues sind öffentlich: Veröffentlichen Sie keine Ausweisdokumente, genauen Anschriften, Zugangsdaten oder sonstigen sensiblen Informationen. Teilen Sie nur so viel mit, wie zur Organisation der Anfrage nötig ist; vor Maßnahmen zu personenbezogenen Daten kann eine angemessene Identitätsprüfung erforderlich sein.',
        ],
        links: [
          {
            href: newIssue,
            label: 'Datenschutzanfrage stellen',
            description: 'Öffentliches GitHub-Issue ohne sensible personenbezogene Daten eröffnen.',
          },
        ],
      },
      {
        heading: 'Kinder und Änderungen',
        paragraphs: [
          'Diese Informationsseite richtet sich an ein allgemeines Spielepublikum und ist nicht darauf ausgelegt, personenbezogene Daten von Kindern zu erheben. Wenn ein Kind in einem Projekt-Issue persönliche Angaben veröffentlicht haben könnte, melden Sie dies bitte, damit Entfernungsmöglichkeiten geprüft werden können.',
          'Diese Erklärung kann bei Änderungen an Website, Dienstleistern oder Rechtslage angepasst werden. Das Datum oben wird aktualisiert; wesentliche Änderungen werden auf dieser Seite oder im Projekt-Repository kenntlich gemacht.',
        ],
      },
      {
        heading: 'Kontakt',
        paragraphs: [
          'Fragen zu dieser Erklärung oder zur Verarbeitung von Websitedaten richten Sie über den Issue-Tracker an die Verantwortlichen von OpenFront Intel. Dies ist der einzige veröffentlichte Kontaktweg des Projekts; eine private E-Mail-Adresse oder die Identität einer einzelnen Betreiberperson wird hier nicht erfunden.',
        ],
        links: [{ href: projectIssues, label: 'Issue-Tracker von OpenFront Intel' }],
      },
    ],
  },
  contact: {
    title: 'Kontakt',
    description: 'Kontakt zu OpenFront Intel für Korrekturen, Datenschutzanfragen und Beiträge.',
    eyebrow: 'KONTAKT',
    lead: 'Nutzen Sie den öffentlichen Projekt-Tracker, damit Hinweise prüfbar und nachvollziehbar bleiben.',
    updatedLabel: 'Zuletzt aktualisiert',
    updatedDate: '13. Juli 2026',
    relatedHeading: 'Vor der Kontaktaufnahme',
    backHome: 'Zurück zur Startseite',
    sections: [
      {
        heading: 'Kontaktweg des Projekts',
        paragraphs: [
          'OpenFront Intel wird über sein GitHub-Projekt gepflegt. Der Issue-Tracker ist für sachliche Korrekturen, defekte Seiten, Barrierefreiheitsprobleme, Übersetzungsfehler, Quellenfragen, Datenschutzanfragen und Vorschläge für neue Guides vorgesehen.',
          'Der Tracker ist öffentlich und kein vertrauliches Supportpostfach. Veröffentlichen Sie keine Passwörter, Ausweisdokumente, genauen Anschriften, privaten Spieldaten oder sonstigen sensiblen Informationen. Das Projekt nennt keinen Namen, keine Postanschrift, Telefonnummer oder private E-Mail-Adresse eines Verantwortlichen; auf dieser Seite werden solche Angaben daher nicht erfunden.',
        ],
        links: [
          { href: newIssue, label: 'Neues OpenFront-Intel-Issue eröffnen' },
          { href: projectIssues, label: 'Bestehende Issues ansehen' },
        ],
      },
      {
        heading: 'Was einen hilfreichen Hinweis ausmacht',
        bullets: [
          'Geben Sie die genaue Seiten-URL und die betroffene Sprachversion an.',
          'Zitieren Sie die beanstandete Aussage oder Zahl und beschreiben Sie das erwartete Ergebnis.',
          'Verlinken Sie nach Möglichkeit die relevante OpenFrontIO-Datei, den Commit, die Release oder reproduzierbare Belege aus dem Spiel.',
          'Nennen Sie bei Darstellungs- oder Barrierefreiheitsfehlern Browser, Gerät beziehungsweise Viewport und klare Reproduktionsschritte. Entfernen Sie personenbezogene Daten aus Screenshots.',
          'Suchen Sie zuerst nach vorhandenen Issues, damit dieselbe Untersuchung nicht aufgeteilt wird.',
        ],
      },
      {
        heading: 'Datenschutz- und Betroffenenanfragen',
        paragraphs: [
          'Eröffnen Sie ein möglichst knappes öffentliches Issue, um die Anfrage zu benennen und das weitere Vorgehen zu erfragen. Stellen Sie keine sensiblen Prüfunterlagen öffentlich ein. Nennen Sie das betroffene Recht oder Anliegen, die zugehörige OpenFront-Intel- oder GitHub-Interaktion und einen ungefähren Zeitraum. Eine angemessene Prüfung kann erforderlich sein; die Bearbeitung richtet sich nach dem anwendbaren Recht.',
          'Analytics-Daten sind üblicherweise pseudonym und keinem Websitekonto zugeordnet. Deshalb kann das Projekt einen Analytics-Datensatz möglicherweise keiner namentlich bekannten Person zuweisen. Browser- und Google-Deaktivierungsoptionen sind der schnellste Weg, künftige Messungen zu unterbinden.',
        ],
        links: [{ href: newIssue, label: 'Datenschutzanfrage beginnen' }],
      },
      {
        heading: 'Redaktionelle Korrekturen und Beiträge',
        paragraphs: [
          'Korrekturen werden anhand der stärksten verfügbaren Quelle geprüft. Ein bestätigter Fehler kann zu einer Textänderung, erneuten Datenextraktion, Übersetzungskorrektur oder einem Hinweis auf verbleibende Unsicherheit führen. Beiträge müssen originär oder ordnungsgemäß lizenziert sein und ihre Quellen nennen.',
          'Das Projekt wird von der Community gepflegt und verspricht keine feste Antwortzeit. Eine ausbleibende sofortige Antwort bedeutet nicht, dass ein Hinweis abgelehnt wurde.',
        ],
      },
      {
        heading: 'Offizieller Spielsupport ist getrennt',
        paragraphs: [
          'OpenFront Intel ist eine unabhängige Informationsseite. Sie kann keine OpenFront.io-Konten wiederherstellen, Spiele moderieren, Sperren aufheben, Vorfälle auf offiziellen Servern untersuchen oder für die Entwickler sprechen. Spielfehler und offizielle Projektfragen gehören zu OpenFrontIO.',
        ],
        links: [{ href: upstreamIssues, label: 'Offizieller Issue-Tracker von OpenFrontIO' }],
      },
    ],
  },
  editorialPolicy: {
    title: 'Redaktionsrichtlinie',
    description: 'Wie OpenFront Intel Inhalte recherchiert, prüft, übersetzt, aktualisiert und korrigiert.',
    eyebrow: 'REDAKTIONSRICHTLINIE',
    lead: 'Spielinformationen mit nachvollziehbaren Quellen, getrennt von Einordnung und Empfehlungen.',
    updatedLabel: 'Zuletzt aktualisiert',
    updatedDate: '13. Juli 2026',
    relatedHeading: 'Verantwortlichkeit',
    backHome: 'Zurück zur Startseite',
    sections: [
      {
        heading: 'Auftrag und Unabhängigkeit',
        paragraphs: [
          'OpenFront Intel hilft Spielern, OpenFront.io mit durchsuchbaren Daten, Erklärungen, Vergleichen und praktischen Strategien zu verstehen. Die Community-Publikation wird weder von OpenFront.io noch von den OpenFrontIO-Mitwirkenden betrieben, genehmigt oder unterstützt.',
          'Themen werden nach Nutzen, Prüfbarkeit und Bedeutung für Spieler ausgewählt. Weder der Zugang zum Spielprojekt noch eine künftige Werbebeziehung erkauft positive Berichterstattung oder verhindert eine Korrektur.',
        ],
      },
      {
        heading: 'Quellenhierarchie',
        bullets: [
          'Primärquelle: der offizielle OpenFrontIO-Quellcode, möglichst mit Version oder Commit, für Mechaniken, Formeln, Einheiten, Gebäude und Kartenbestand.',
          'Versionshinweise: der inhaltlich aussagekräftige Text einer offiziellen GitHub-Release. Platzhalter oder Test-Releases wie „TEST“ werden nicht zu erfundenen Patchnotes ausgebaut.',
          'Eigene Prüfung: reproduzierbare Beobachtungen im aktuellen Spielclient, um Verhalten zu erklären oder Abweichungen zwischen Quelle und Laufzeit zu kennzeichnen.',
          'Sekundärmaterial: Community-Diskussionen, Videos und Guides können Fragen anregen, werden aber als sekundär bezeichnet und überschreiben stärkere Belege nicht ohne Begründung.',
        ],
        links: [
          { href: 'https://github.com/openfrontio/OpenFrontIO', label: 'Offizielles OpenFrontIO-Repository' },
          { href: 'https://github.com/openfrontio/OpenFrontIO/releases', label: 'Offizielle OpenFrontIO-Releases' },
        ],
      },
      {
        heading: 'Datenextraktion und eigener Mehrwert',
        paragraphs: [
          'Strukturierte Spieldaten in src/data werden durch scripts/extract-game-data.mjs aus einem lokalen OpenFrontIO-Quellstand erzeugt und nicht manuell bearbeitet. Die Metadaten nennen Upstream-Version und Erzeugungszeit. Liegen Quellstand oder Extraktor hinter dem Live-Spiel, können auch generierte Werte veraltet oder unvollständig sein.',
          'Ein kopierter Wert ist noch kein redaktionelles Ergebnis. Seiten sollen erklären, was er steuert, wie er sich vergleichen lässt, welche Annahmen eine Formel nutzt, welche praktischen Folgen und Versionsgrenzen gelten und wo die Quelle liegt. Fakten, Berechnungen, Schlussfolgerungen und strategische Meinungen sollen unterscheidbar bleiben.',
        ],
      },
      {
        heading: 'Schreiben, Prüfen und Versionieren',
        bullets: [
          'Bei veränderlichen Regeln die geltende Spielversion oder das letzte Prüfdatum nennen.',
          'Formeln und Beispiele testen, Einheiten einheitlich verwenden und gerundete Schätzungen nicht als exakte Quellwerte ausgeben.',
          'Wo möglich konkrete Quellpfade, Commits, Releases oder reproduzierbare Schritte statt unbelegter Behauptungen verwenden.',
          'Wichtige Seiten nach Upstream-Releases erneut prüfen und Inhalte, die noch nicht zur neuesten Version passen, sichtbar einschränken.',
          'Vor Veröffentlichung jeder Übersetzung Terminologie, Links, Zahlen und Bedeutung in der Zielsprache prüfen.',
        ],
      },
      {
        heading: 'Automatisierung, Übersetzung und Verantwortung',
        paragraphs: [
          'Werkzeuge für automatische Extraktion, Analyse, Schreibhilfe und Übersetzung können das Projekt unterstützen. Ihre Ausgabe ist für sich keine Autorität. Die Verantwortlichen bleiben für die veröffentlichte Seite zuständig, prüfen Tatsachen anhand zitierter Primärquellen, betrachten Übersetzungen im Kontext und kennzeichnen erhebliche Unsicherheit.',
          'Die fünf Sprachfassungen sollen dieselben Fakten vermitteln, dürfen Formulierungen und Beispiele aber anpassen. Bei Widersprüchen entscheidet die Primärquelle über die Sache – nicht automatisch die englische Seite.',
        ],
      },
      {
        heading: 'Korrekturverfahren',
        paragraphs: [
          'Fehler können über den OpenFront-Intel-Issue-Tracker gemeldet werden. Ein hilfreicher Hinweis nennt Seite, beanstandeten Text oder Wert, Spielversion und Beleg. Die Verantwortlichen prüfen die Quelle, reproduzieren den Sachverhalt soweit möglich und korrigieren die Seite oder dokumentieren, weshalb keine Änderung erfolgt.',
          'Wesentliche Korrekturen sollen nach Möglichkeit das Seitendatum aktualisieren oder kurz vermerkt werden. Kleine Rechtschreib- und Formatkorrekturen können still erfolgen. Fehler in generierten Daten werden im Extraktor oder Quellstand behoben, nicht durch manuelle Änderung des erzeugten JSON.',
        ],
        links: [{ href: newIssue, label: 'Inhaltlichen Fehler melden' }],
      },
      {
        heading: 'Lizenzen, Quellenangaben und Monetarisierung',
        paragraphs: [
          'Zitierte oder abgeleitete Inhalte werden entsprechend ihrer Lizenz gekennzeichnet. Plagiate, nicht lizenzierte Bilder und erfundene Belege sind unzulässig. Inhalte von OpenFront Intel folgen der auf der Website genannten Lizenz, sofern nichts anderes angegeben ist.',
          'Die Website zeigt derzeit keine Google-AdSense-Werbung. Werden Werbung, Sponsoring, Affiliate-Links oder bereitgestellter Testzugang eingeführt, werden sie offengelegt und von Quellenauswahl und Schlussfolgerungen getrennt. Werbung ändert den Korrekturmaßstab nicht.',
        ],
      },
    ],
  },
};
