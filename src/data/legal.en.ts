import type { LegalDocuments } from './legal';

const projectIssues = 'https://github.com/redreamality/openfront-intel/issues';
const newIssue = 'https://github.com/redreamality/openfront-intel/issues/new';
const upstreamIssues = 'https://github.com/openfrontio/OpenFrontIO/issues';

export const enLegalDocuments: LegalDocuments = {
  privacy: {
    title: 'Privacy Policy',
    description: 'How OpenFront Intel uses analytics, cookies, hosting data, and privacy choices.',
    eyebrow: 'PRIVACY',
    lead: 'A plain-language account of what this static community site processes and why.',
    updatedLabel: 'Last updated',
    updatedDate: '25 July 2026',
    relatedHeading: 'Related information',
    backHome: 'Back to home',
    sections: [
      {
        heading: 'Scope and operator',
        paragraphs: [
          'OpenFront Intel is an independent, community-maintained reference site for OpenFront.io. The maintainers of the OpenFront Intel project operate this website; it is not an official OpenFront.io service.',
          'This policy covers visits to this website. Links to OpenFront.io, GitHub, Google, and other services lead to sites with their own privacy practices.',
        ],
      },
      {
        heading: 'Information processed when you visit',
        paragraphs: [
          'The site has no user accounts, comments, checkout, or first-party contact form, and its static pages do not maintain a visitor-profile database.',
        ],
        bullets: [
          'Hosting and delivery data: GitHub Pages and network providers may process an IP address, requested URL, date and time, browser or user-agent data, referrer, and security logs needed to deliver and protect the site.',
          'Google Analytics: only after you choose “Allow analytics”, the site loads the Google tag for measurement ID G-7R6FVF17YG. Google may then receive page URLs, referrers, browser and device characteristics, language, approximate location derived from the connection, and interaction or performance events. We do not intentionally send names, email addresses, OpenFront accounts, or message contents to Analytics.',
          'Information you publish on GitHub: if you open an issue, comment, or contribution, GitHub processes that information and the content is normally public.',
        ],
      },
      {
        heading: 'Cookies, analytics, and future advertising',
        paragraphs: [
          'Google Analytics may use cookies such as _ga after analytics consent is granted. Choosing “Essential only” prevents the Analytics tag from loading. You can reopen Cookie settings from the footer, change the choice, or clear site storage; either option leaves all editorial content available.',
          'At the date shown above, OpenFront Intel offers optional Google Analytics but does not serve Google AdSense advertisements. If AdSense is enabled later, Google and its advertising partners may place or read cookies, use web beacons or similar technologies, and process local storage, device identifiers, IP addresses, approximate location, page context, and ad interaction data to deliver ads, limit frequency, measure performance, prevent fraud, or personalize advertising. Where required, advertising choices will be handled by a Google-certified consent management platform before ad code is enabled.',
        ],
        links: [
          {
            href: 'https://policies.google.com/privacy',
            label: 'Google Privacy Policy',
            description: 'How Google processes data across Analytics and advertising services.',
          },
          {
            href: 'https://policies.google.com/technologies/partner-sites',
            label: 'How Google uses information from sites or apps that use its services',
            description: 'Google’s explanation of cookies, identifiers, IP addresses, and related data processing on partner sites.',
          },
          {
            href: 'https://tools.google.com/dlpage/gaoptout',
            label: 'Google Analytics opt-out add-on',
            description: 'A browser add-on provided by Google to prevent Analytics measurement.',
          },
          {
            href: 'https://support.google.com/My-Ad-Center-Help/answer/12155764',
            label: 'Google ad privacy controls',
            description: 'Controls and explanations that apply if advertising is introduced.',
          },
        ],
      },
      {
        heading: 'Purposes and legal grounds',
        bullets: [
          'Deliver and secure the site, diagnose abuse, and keep it available.',
          'Understand aggregate readership, popular pages, devices, and performance so the reference material can be improved.',
          'Respond to corrections, privacy requests, and contributions submitted through GitHub.',
        ],
        paragraphs: [
          'Site delivery and security rely on the legitimate need to operate the service. Optional Analytics measurement is activated only after an affirmative visitor choice, regardless of region.',
        ],
      },
      {
        heading: 'Service providers, disclosure, and transfers',
        paragraphs: [
          'GitHub provides repository and Pages hosting, and Google provides Analytics. These providers process data under their own terms and may handle it in countries outside your own using the safeguards they describe. Public issue content can also be read and indexed by others.',
          'OpenFront Intel does not sell visitor personal information. Information may be disclosed when required by law, to protect the site and its users, or during a change in project operation, subject to applicable safeguards.',
        ],
        links: [
          {
            href: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
            label: 'GitHub General Privacy Statement',
          },
          {
            href: 'https://business.safety.google/adsprocessorterms/',
            label: 'Google Ads Data Processing Terms',
          },
        ],
      },
      {
        heading: 'Retention',
        paragraphs: [
          'This static site does not keep an account or contact-form database. GitHub retains hosting logs and public repository activity according to its policies. Google Analytics user-level event retention is controlled by the Analytics property settings and Google terms; because that setting is administered outside this public repository, its current configured period can be requested through the contact channel below. Aggregate reports may remain after user-level data expires.',
          'Public issues and contribution history may remain visible until edited or removed under GitHub and project procedures. Maintainers aim not to retain identifiable information longer than needed for the purposes described here or legal obligations.',
        ],
      },
      {
        heading: 'Your choices and rights',
        bullets: [
          'Use any consent control presented on the site, and change browser settings to block or delete cookies and site storage.',
          'Use the Google Analytics opt-out add-on or privacy-protecting browser tools.',
          'Subject to applicable law, ask for access, correction, deletion, restriction, portability, or objection, and withdraw consent without affecting earlier lawful processing.',
          'Complain to the data-protection authority available in your country or region.',
        ],
        paragraphs: [
          'Submit a privacy request through the project issue tracker. GitHub issues are public: do not include identity documents, precise addresses, account credentials, or other sensitive information. Provide only enough detail to arrange the request; reasonable verification may be required before acting on data connected to a person.',
        ],
        links: [
          {
            href: newIssue,
            label: 'Submit a privacy request',
            description: 'Open a public GitHub issue without including sensitive personal data.',
          },
        ],
      },
      {
        heading: 'Children and policy changes',
        paragraphs: [
          'This reference site is intended for a general gaming audience and is not designed to collect personal information from children. If you believe a child has disclosed personal information in a project issue, report it so the maintainers can review removal options.',
          'This policy may change when the site, providers, or legal requirements change. The date at the top will be revised, and material changes will be made visible on this page or through the project repository.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'For questions about this policy or the handling of site data, contact the OpenFront Intel maintainers through the project issue tracker. This is the only published project contact channel; no private email address or individual operator identity is claimed here.',
        ],
        links: [{ href: projectIssues, label: 'OpenFront Intel issue tracker' }],
      },
    ],
  },
  contact: {
    title: 'Contact',
    description: 'How to contact the OpenFront Intel maintainers about corrections, privacy, and contributions.',
    eyebrow: 'CONTACT',
    lead: 'Use the public project tracker so reports stay verifiable and actionable.',
    updatedLabel: 'Last updated',
    updatedDate: '13 July 2026',
    relatedHeading: 'Before contacting us',
    backHome: 'Back to home',
    sections: [
      {
        heading: 'Project contact channel',
        paragraphs: [
          'OpenFront Intel is maintained through its GitHub project. Use the issue tracker for factual corrections, broken pages, accessibility problems, translation fixes, source questions, privacy requests, and proposals for new guides.',
          'The tracker is public and is not a confidential support inbox. Do not post passwords, identity documents, precise addresses, private game data, or other sensitive personal information. The project does not publish a maintainer name, postal address, telephone number, or private email address, so none is invented on this page.',
        ],
        links: [
          { href: newIssue, label: 'Open a new OpenFront Intel issue' },
          { href: projectIssues, label: 'View existing issues' },
        ],
      },
      {
        heading: 'What makes a useful report',
        bullets: [
          'Include the exact page URL and the language version affected.',
          'Quote the disputed sentence or value and explain the expected result.',
          'Link the relevant OpenFrontIO file, commit, release, or reproducible in-game evidence when available.',
          'For a display or accessibility problem, include browser, device or viewport, and clear reproduction steps. Remove personal information from screenshots.',
          'Search existing issues first to avoid splitting the same investigation across multiple reports.',
        ],
      },
      {
        heading: 'Privacy and rights requests',
        paragraphs: [
          'Use a minimal public issue to identify the request and ask the maintainers how to proceed. Do not publish sensitive verification material. State which right or concern applies, which OpenFront Intel or GitHub interaction is involved, and an approximate date. The maintainers may need reasonable verification and will handle the request under applicable law.',
          'Because Analytics data is generally pseudonymous and not keyed to a site account, the project may not be able to connect an Analytics record to a named person. Browser and Google opt-out controls remain the fastest way to stop future measurement.',
        ],
        links: [{ href: newIssue, label: 'Start a privacy request' }],
      },
      {
        heading: 'Editorial corrections and contributions',
        paragraphs: [
          'Corrections are checked against the strongest available source. A confirmed error may result in a content edit, data re-extraction, translation update, or a note explaining uncertainty. Contributions should be original or properly licensed and should identify their sources.',
          'The project is community maintained and does not promise a fixed response time. A lack of immediate response does not mean a report has been rejected.',
        ],
      },
      {
        heading: 'Official game support is separate',
        paragraphs: [
          'OpenFront Intel is an independent reference site. It cannot recover OpenFront.io accounts, moderate games, reverse bans, investigate official server incidents, or speak for the game developers. Send game bugs and official project questions to OpenFrontIO instead.',
        ],
        links: [{ href: upstreamIssues, label: 'OpenFrontIO official issue tracker' }],
      },
    ],
  },
  editorialPolicy: {
    title: 'Editorial Policy',
    description: 'How OpenFront Intel researches, verifies, translates, updates, and corrects its content.',
    eyebrow: 'EDITORIAL POLICY',
    lead: 'Source-backed game data, clearly separated from interpretation and advice.',
    updatedLabel: 'Last updated',
    updatedDate: '13 July 2026',
    relatedHeading: 'Accountability',
    backHome: 'Back to home',
    sections: [
      {
        heading: 'Mission and independence',
        paragraphs: [
          'OpenFront Intel helps players understand OpenFront.io through searchable data, explanations, comparisons, and practical strategy. It is a community-maintained publication and is not operated, approved, or endorsed by OpenFront.io or the OpenFrontIO contributors.',
          'Coverage decisions are based on usefulness, verifiability, and player impact. Neither access to the game project nor a future advertising relationship buys favorable treatment or suppresses a correction.',
        ],
      },
      {
        heading: 'Source hierarchy',
        bullets: [
          'Primary authority: the official OpenFrontIO source code, preferably at a named version or commit, for mechanics, formulas, units, structures, and map inventory.',
          'Release notes: the substantive body of an official GitHub Release. Placeholder or test-release text such as “TEST” is not turned into invented patch notes.',
          'First-hand checks: reproducible observations in the current game client, used to explain behavior or flag a source-versus-runtime discrepancy.',
          'Secondary material: community discussions, videos, or guides may suggest questions but are identified as secondary and are not allowed to override stronger evidence without explanation.',
        ],
        links: [
          { href: 'https://github.com/openfrontio/OpenFrontIO', label: 'Official OpenFrontIO source repository' },
          { href: 'https://github.com/openfrontio/OpenFrontIO/releases', label: 'Official OpenFrontIO releases' },
        ],
      },
      {
        heading: 'Data extraction and added value',
        paragraphs: [
          'Structured game data in src/data is generated from a local OpenFrontIO source snapshot by scripts/extract-game-data.mjs rather than hand-edited. The extraction metadata records the upstream version and generation time. Generated values can still be stale or incomplete if the source snapshot or extractor lags behind the live game.',
          'A copied value is not the finished editorial product. Pages should add context: what the number controls, how values compare, the assumptions behind a formula, practical consequences, version limits, and links to the relevant source where practical. Facts, calculations, inferences, and strategic opinions should be distinguishable from one another.',
        ],
      },
      {
        heading: 'Writing, review, and versioning',
        bullets: [
          'State the applicable game version or last verification date when a rule can change between releases.',
          'Test formulas and worked examples, keep units consistent, and avoid presenting rounded estimates as exact source values.',
          'Use specific source paths, commits, releases, or reproducible steps where practical instead of relying on unattributed claims.',
          'Revisit high-impact pages after upstream releases and visibly qualify content that has not yet been checked against the newest version.',
          'Do not publish a translation until terminology, links, numerical values, and meaning have been checked for that language version.',
        ],
      },
      {
        heading: 'Automation, translation, and responsibility',
        paragraphs: [
          'Automated extraction, analysis, drafting, and translation tools may assist the project. Their output is not treated as an authority by itself. The maintainers remain responsible for the published page and should verify factual claims against cited primary sources, review translations in context, and disclose material uncertainty.',
          'The five language versions aim to communicate the same facts, but wording and examples may be adapted for clarity. If translations conflict, the primary source—not an English page by default—decides the factual question.',
        ],
      },
      {
        heading: 'Corrections policy',
        paragraphs: [
          'Anyone can report an error through the OpenFront Intel issue tracker. A useful correction identifies the page, disputed text or value, applicable game version, and supporting source. Maintainers review the evidence, reproduce the issue where possible, then correct the page or document why no change was made.',
          'Material corrections should update the page date or carry a short note where practical. Small spelling and formatting fixes may be made silently. Generated-data errors are fixed in the extractor or source snapshot rather than by manually editing generated JSON.',
        ],
        links: [{ href: newIssue, label: 'Report a content error' }],
      },
      {
        heading: 'Licensing, attribution, and monetization',
        paragraphs: [
          'Quoted or derived material is attributed and used under its applicable licence. Contributors must not submit plagiarized text, unlicensed images, or fabricated evidence. OpenFront Intel content follows the licence stated by the site unless an item says otherwise.',
          'The site does not currently serve Google AdSense ads. If advertising, sponsorship, affiliate links, or provided review access is introduced, it will be disclosed and kept separate from source selection and conclusions. Advertising placement does not change the correction standard.',
        ],
      },
    ],
  },
};
