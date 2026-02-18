const DEFAULT_BLOCKLIST = [
  'fuck',
  'shit',
  'bitch',
  'asshole',
  'bastard',
  'damn',
  'slut',
  'whore',
  'dick',
  'pussy',
  'nigger',
  'faggot'
];

type ModerationResult = {
  isClean: boolean;
  reason: string;
  source: 'openai' | 'local';
};

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const runLocalModeration = (text: string): ModerationResult => {
  const normalized = normalize(text);

  for (const term of DEFAULT_BLOCKLIST) {
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    if (regex.test(normalized)) {
      return {
        isClean: false,
        reason: `Blocked term detected: ${term}`,
        source: 'local'
      };
    }
  }

  return {
    isClean: true,
    reason: 'No blocked terms detected by local filter.',
    source: 'local'
  };
};

const parseAiResult = (content: string): { isClean: boolean; reason: string } | null => {
  try {
    const cleaned = content.trim().replace(/^```json\s*/i, '').replace(/```$/, '').trim();
    const parsed = JSON.parse(cleaned);
    if (typeof parsed?.is_clean === 'boolean') {
      return {
        isClean: parsed.is_clean,
        reason: String(parsed.reason || '')
      };
    }
    if (typeof parsed?.isClean === 'boolean') {
      return {
        isClean: parsed.isClean,
        reason: String(parsed.reason || '')
      };
    }
    return null;
  } catch {
    return null;
  }
};

const runAiModeration = async (text: string): Promise<ModerationResult | null> => {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) return null;

  const model = Deno.env.get('OPENAI_MODERATION_MODEL') || 'gpt-4o-mini';
  const prompt = [
    'You are a strict youth-safe content moderator.',
    'Determine if the text contains profanity, hate speech, sexual explicitness, or harassment.',
    'Return ONLY valid JSON in this exact shape:',
    '{"is_clean": true|false, "reason": "short explanation"}'
  ].join(' ');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: text }
      ]
    })
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`OpenAI moderation failed (${response.status}): ${errText}`);
  }

  const json = await response.json();
  const content = json?.choices?.[0]?.message?.content;
  if (!content || typeof content !== 'string') {
    throw new Error('OpenAI moderation returned an unexpected response payload.');
  }

  const parsed = parseAiResult(content);
  if (!parsed) {
    throw new Error('Could not parse OpenAI moderation JSON output.');
  }

  return {
    isClean: parsed.isClean,
    reason: parsed.reason || (parsed.isClean ? 'Approved by AI moderation.' : 'Rejected by AI moderation.'),
    source: 'openai'
  };
};

export const moderateStoryText = async (text: string): Promise<ModerationResult> => {
  try {
    const aiResult = await runAiModeration(text);
    if (aiResult) {
      return aiResult;
    }
  } catch (error) {
    console.error('AI moderation unavailable, falling back to local moderation:', error);
  }

  return runLocalModeration(text);
};
