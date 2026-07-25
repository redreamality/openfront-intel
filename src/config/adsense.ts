export const ADSENSE_PUBLISHER_ID = 'pub-4617864538353929';

export const getGoogleCmpScriptUrl = (publisherId = ADSENSE_PUBLISHER_ID) =>
  `https://fundingchoicesmessages.google.com/i/${publisherId}?ers=1`;
