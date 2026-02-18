import fs from 'node:fs';

const checks = [];

const mustContain = [
  {
    file: 'src/lib/app-params.js',
    needles: [
      'VITE_BASE44_APP_ID',
      'VITE_BASE44_FUNCTIONS_VERSION',
      'VITE_BASE44_APP_BASE_URL'
    ]
  },
  {
    file: 'src/api/base44Client.js',
    needles: ['functionsVersion', 'appBaseUrl', 'createClient']
  },
  {
    file: 'src/components/story/StorySubmitForm.jsx',
    needles: ["base44.functions.invoke('submitStory'"]
  },
  {
    file: 'functions/submitStory.ts',
    needles: ['Deno.serve', "status: 'approved'"]
  },
  {
    file: 'functions/submitStoryWithMedia.ts',
    needles: ['Deno.serve', "status: 'approved'"]
  }
];

for (const { file, needles } of mustContain) {
  if (!fs.existsSync(file)) {
    checks.push({ ok: false, message: `${file} does not exist` });
    continue;
  }

  const content = fs.readFileSync(file, 'utf8');
  for (const needle of needles) {
    checks.push({
      ok: content.includes(needle),
      message: `${file} contains \`${needle}\``
    });
  }
}

const failed = checks.filter((check) => !check.ok);
for (const check of checks) {
  console.log(`${check.ok ? '✅' : '❌'} ${check.message}`);
}

if (failed.length > 0) {
  process.exitCode = 1;
}
