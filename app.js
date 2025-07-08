const translations = {
  en: { greeting: "Welcome, Hope,<br><span>Let’s grow today.</span>", modules: ["📁 Career Zone", "💔 Emotional Zone", "🏥 SmartQ Access", "🤖 Dual Mode AI", "💼 Digital Hustle Hub", "🤝 Partner Zone"] },
  ha: { greeting: "Barka da zuwa, Hope,<br><span>Muje mu girma yau.</span>", modules: ["📁 Yankin Aiki", "💔 Yankin Ji", "🏥 SmartQ Shiga", "🤖 Dual Mode AI", "💼 Hustle Hub", "🤝 Yankin Abokai"] },
  ig: { greeting: "Nnọọ, Hope,<br><span>Ka taa ka mụta taa.</span>", modules: ["📁 Ogige Ọrụ", "💔 Ogige Ememe", "🏥 SmartQ Ncheta", "🤖 Dual Mode AI", "💼 Hustle Hub", "🤝 Ogige Mmekọ"] },
  yo: { greeting: "Kaabo, Hope,<br><span>Ẹ jẹ́ ká dàgbà lónìí.</span>", modules: ["📁 Ẹka Iṣẹ", "💔 Ẹka Ẹ̀mí", "🏥 SmartQ Ibiṣé", "🤖 Dual Mode AI", "💼 Ibiṣé Onírọrùn", "🤝 Ẹgbẹ Alábàápàdé"] },
  sw: { greeting: "Karibu, Hope,<br><span>Tukue leo.</span>", modules: ["📁 Eneo la Kazi", "💔 Eneo la Hisia", "🏥 Ufikiaji wa SmartQ", "🤖 Dual Mode AI", "💼 Hubu la Hustle", "🤝 Eneo la Washirika"] },
  fr: { greeting: "Bienvenue, Hope,<br><span>Grandissons aujourd’hui.</span>", modules: ["📁 Zone Carrière", "💔 Zone Émotionnelle", "🏥 Accès SmartQ", "🤖 Mode IA Double", "💼 Centre de Hustle", "🤝 Zone Partenaires"] },
  ar: { greeting: "مرحبًا، هوب<br><span>لننمو اليوم.</span>", modules: ["📁 منطقة الوظائف", "💔 منطقة المشاعر", "🏥 وصول SmartQ", "🤖 نمط AI المزدوج", "💼 مركز الأعمال", "🤝 منطقة الشركاء"] },
  zu: { greeting: "Siyakwamukela, Hope,<br><span>Ake sikhule namuhla.</span>", modules: ["📁 Indawo Yomsebenzi", "💔 Indawo Yemizwa", "🏥 Ukufinyelela kwe-SmartQ", "🤖 I-AI Enemodi Eningi", "💼 I-Hustle Hub", "🤝 Indawo Yozakwethu"] }
};

const languageSelect = document.getElementById('language');
const greeting = document.querySelector('.greeting');
const moduleCards = document.querySelectorAll('.card');

languageSelect.addEventListener('change', e => {
  const lang = e.target.value;
  const data = translations[lang];
  greeting.innerHTML = data.greeting;
  moduleCards.forEach((card, i) => card.innerHTML = data.modules[i]);
});

const basePrompts = [
  "Suggest 3 remote job roles for a beginner who speaks {lang} and is based in Africa.",
  "I'm feeling overwhelmed by family pressure and unsure of my next step. Help me reflect and stay strong.",
  "Help me plan appointments for the week: NIN, hospital, and bank.",
  "Create a career plan for a university graduate with no job experience in tech.",
  "Suggest a best-selling eBook topic I can write and sell online.",
  "Write a short referral pitch for MVP LifeLine that I can post on WhatsApp or Facebook."
];

moduleCards.forEach((card, i) => {
  card.addEventListener('click', () => {
    const lang = languageSelect.value;
    const prompt = basePrompts[i].replace("{lang}", lang);
    askGPT(prompt);
  });
});

async function askGPT(promptText) {
  try {
    const response = await fetch("/.netlify/functions/gptHandler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptText })
    });

    const data = await response.json();
    alert("GPT Suggestion:\n\n" + (data.reply || "No response received."));
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Check your internet or GPT handler.");
  }
}