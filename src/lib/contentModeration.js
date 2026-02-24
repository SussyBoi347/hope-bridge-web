const BANNED_TERMS = [
  'fuck', 'fucking', 'fucker',
  'shit', 'shitty',
  'bitch',
  'asshole',
  'motherfucker',
  'cunt',
  'nigger',
  'faggot',
  'slut',
  'whore',
  'dick',
  'pussy',
  'bastard'
];

const LEET_MAP = {
  '0': 'o',
  '1': 'i',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '7': 't',
  '@': 'a',
  '$': 's',
  '!': 'i'
};

const normalizeText = (input = '') =>
  input
    .toLowerCase()
    .split('')
    .map((char) => LEET_MAP[char] || char)
    .join('')
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const containsBannedTerm = (text) => {
  const normalized = ` ${normalizeText(text)} `;

  for (const term of BANNED_TERMS) {
    const token = ` ${term} `;
    if (normalized.includes(token)) {
      return term;
    }
  }

  return null;
};

export const moderateStoryText = ({ title = '', content = '' }) => {
  const combined = `${title} ${content}`.trim();
  const matchedTerm = containsBannedTerm(combined);

  if (!matchedTerm) {
    return { isClean: true, reason: null };
  }

  return {
    isClean: false,
    reason: `Your story could not be posted because it may contain inappropriate language.`
  };
};
