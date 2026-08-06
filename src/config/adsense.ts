export const ADSENSE_PUBLISHER_ID = 'pub-4617864538353929';

export const getAdSenseScriptUrl = (publisherId = ADSENSE_PUBLISHER_ID) =>
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${publisherId}`;

export const getGoogleCmpScriptUrl = (publisherId = ADSENSE_PUBLISHER_ID) =>
  `https://fundingchoicesmessages.google.com/i/${publisherId}?ers=1`;
