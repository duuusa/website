import type { Locale } from "./config";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  home: {
    logoAlt: string;
    name: string;
    location: string;
    bio: string[];
    links: {
      resume: string;
      linkedin: string;
    };
  };
  thanks: {
    metaTitle: string;
    metaDescription: string;
    found: string;
    title: string;
    intro: string;
    stackTitle: string;
    stack: { label: string; value: string }[];
    credits: {
      title: string;
      items: { name: string; note: string }[];
    }[];
    backHome: string;
    linkedin: string;
    resume: string;
    logoTip: string;
  };
};

const en: Dictionary = {
  meta: {
    title: "Clément Duvivier",
    description:
      "Clément Duvivier — Product Owner at Dipeeo, developer, designer, and photographer based in Paris, France.",
    keywords: [
      "Clément Duvivier",
      "Product Owner",
      "Paris",
      "product management",
      "developer",
      "designer",
      "photographer",
    ],
  },
  home: {
    logoAlt: "Clément Duvivier signature logo",
    name: "Clément Duvivier",
    location: "Paris, France",
    bio: [
      "I have always been fascinated by computer science. I started with web development, and through my first experiences discovered a passion for product. I completed my studies with a Master’s in Product Management at HETIC, graduating at the end of 2025.",
      "I am currently Product Owner at Dipeeo, a freelance developer & designer, and an amateur photographer.",
    ],
    links: {
      resume: "Resume",
      linkedin: "LinkedIn",
    },
  },
  thanks: {
    metaTitle: "Thanks — Clément Duvivier",
    metaDescription: "Credits and notes about this website.",
    found: "You found the secret page.",
    title: "Thanks",
    intro:
      "A small corner of the internet — made slowly, mostly by hand, and deployed from Paris.",
    stackTitle: "Stack",
    stack: [
      { label: "Framework", value: "Next.js 16" },
      { label: "UI", value: "React 19" },
      { label: "Styling", value: "Tailwind CSS 4" },
      { label: "Language", value: "TypeScript" },
      { label: "Hosting", value: "Vercel" },
      { label: "Analytics", value: "Vercel Speed Insights" },
    ],
    credits: [
      {
        title: "Design inspiration",
        items: [
          {
            name: "Emmanuel Hong",
            note: "Minimal, editorial personal site.",
          },
        ],
      },
      {
        title: "Built by",
        items: [
          {
            name: "Clément Duvivier",
            note: "Design, code, and content.",
          },
        ],
      },
    ],
    backHome: "← Back home",
    linkedin: "LinkedIn",
    resume: "Resume",
    logoTip: "Tip: you got here by clicking the logo five times.",
  },
};

const fr: Dictionary = {
  meta: {
    title: "Clément Duvivier",
    description:
      "Clément Duvivier — Product Owner chez Dipeeo, développeur, designer et photographe amateur, basé à Paris.",
    keywords: [
      "Clément Duvivier",
      "Product Owner",
      "Paris",
      "product management",
      "développeur",
      "designer",
      "photographe",
    ],
  },
  home: {
    logoAlt: "Logo signature de Clément Duvivier",
    name: "Clément Duvivier",
    location: "Paris, France",
    bio: [
      "J’ai toujours été fasciné par l’informatique en général. J’ai commencé mes études par du développement web et c’est au cours de mes premières expériences que je me suis découvert une passion pour le monde du produit. J’ai donc terminé mon parcours scolaire par un Master en Product Management à HETIC pour lequel j’ai obtenu mon diplôme en fin d’année 2025.",
      "Actuellement Product Owner chez Dipeeo, développeur & designer freelance mais aussi photographe amateur..",
    ],
    links: {
      resume: "CV",
      linkedin: "LinkedIn",
    },
  },
  thanks: {
    metaTitle: "Thanks — Clément Duvivier",
    metaDescription: "Crédits et notes sur ce site.",
    found: "Vous avez trouvé la page secrète.",
    title: "Thanks",
    intro:
      "Un petit coin d’internet — fait lentement, presque entièrement à la main, et publié depuis Paris.",
    stackTitle: "Stack",
    stack: [
      { label: "Framework", value: "Next.js 16" },
      { label: "UI", value: "React 19" },
      { label: "Styles", value: "Tailwind CSS 4" },
      { label: "Langage", value: "TypeScript" },
      { label: "Hébergement", value: "Vercel" },
      { label: "Analytics", value: "Vercel Speed Insights" },
    ],
    credits: [
      {
        title: "Inspiration design",
        items: [
          {
            name: "Emmanuel Hong",
            note: "Site personnel minimal et éditorial.",
          },
        ],
      },
      {
        title: "Réalisé par",
        items: [
          {
            name: "Clément Duvivier",
            note: "Design, code et contenu.",
          },
        ],
      },
    ],
    backHome: "← Retour",
    linkedin: "LinkedIn",
    resume: "CV",
    logoTip: "Astuce : vous êtes arrivé ici en cliquant 5 fois sur le logo.",
  },
};

const ja: Dictionary = {
  meta: {
    title: "Clément Duvivier",
    description:
      "Clément Duvivier — パリを拠点とする Dipeeo のプロダクトオーナー、開発者、デザイナー、写真家。",
    keywords: [
      "Clément Duvivier",
      "プロダクトオーナー",
      "パリ",
      "プロダクトマネジメント",
      "開発者",
      "デザイナー",
      "写真家",
    ],
  },
  home: {
    logoAlt: "Clément Duvivier のサイン風ロゴ",
    name: "Clément Duvivier",
    location: "Paris, France",
    bio: [
      "私はもともとコンピュータサイエンス全般に強い関心を持っていました。ウェブ開発から学びを始め、最初の経験を通じてプロダクトの世界への情熱を見つけました。HETIC でプロダクトマネジメントの修士号を取得し、2025年末に卒業しました。",
      "現在は Dipeeo のプロダクトオーナーとして働きながら、フリーランスの開発者・デザイナー、そしてアマチュア写真家でもあります。",
    ],
    links: {
      resume: "履歴書",
      linkedin: "LinkedIn",
    },
  },
  thanks: {
    metaTitle: "Thanks — Clément Duvivier",
    metaDescription: "このウェブサイトに関するクレジットとメモ。",
    found: "秘密のページを見つけました。",
    title: "Thanks",
    intro:
      "インターネットの小さな一角 — ゆっくりと、ほとんど手作りで、パリから公開しています。",
    stackTitle: "スタック",
    stack: [
      { label: "フレームワーク", value: "Next.js 16" },
      { label: "UI", value: "React 19" },
      { label: "スタイリング", value: "Tailwind CSS 4" },
      { label: "言語", value: "TypeScript" },
      { label: "ホスティング", value: "Vercel" },
      { label: "分析", value: "Vercel Speed Insights" },
    ],
    credits: [
      {
        title: "デザインの参考",
        items: [
          {
            name: "Emmanuel Hong",
            note: "ミニマルで編集的な個人サイト。",
          },
        ],
      },
      {
        title: "制作",
        items: [
          {
            name: "Clément Duvivier",
            note: "デザイン、コード、コンテンツ。",
          },
        ],
      },
    ],
    backHome: "← ホームへ",
    linkedin: "LinkedIn",
    resume: "履歴書",
    logoTip: "ヒント：ロゴを5回クリックするとここに来られます。",
  },
};

const zh: Dictionary = {
  meta: {
    title: "Clément Duvivier",
    description:
      "Clément Duvivier — 现居巴黎，Dipeeo 产品负责人、开发者、设计师与摄影爱好者。",
    keywords: [
      "Clément Duvivier",
      "产品负责人",
      "巴黎",
      "产品管理",
      "开发者",
      "设计师",
      "摄影师",
    ],
  },
  home: {
    logoAlt: "Clément Duvivier 签名风格标志",
    name: "Clément Duvivier",
    location: "Paris, France",
    bio: [
      "我一直对计算机科学充满兴趣。我从 Web 开发开始学习，并在早期经历中发现了自己对产品世界的热情。我在 HETIC 完成了产品管理硕士课程，并于 2025 年底毕业。",
      "我目前是 Dipeeo 的产品负责人，同时也是自由职业开发者与设计师，以及业余摄影师。",
    ],
    links: {
      resume: "简历",
      linkedin: "LinkedIn",
    },
  },
  thanks: {
    metaTitle: "Thanks — Clément Duvivier",
    metaDescription: "关于本网站的致谢与说明。",
    found: "你找到了隐藏页面。",
    title: "Thanks",
    intro: "互联网中的一小块角落——慢慢制作，几乎全手工，从巴黎发布。",
    stackTitle: "技术栈",
    stack: [
      { label: "框架", value: "Next.js 16" },
      { label: "UI", value: "React 19" },
      { label: "样式", value: "Tailwind CSS 4" },
      { label: "语言", value: "TypeScript" },
      { label: "托管", value: "Vercel" },
      { label: "分析", value: "Vercel Speed Insights" },
    ],
    credits: [
      {
        title: "设计灵感",
        items: [
          {
            name: "Emmanuel Hong",
            note: "极简、编辑风格的个人网站。",
          },
        ],
      },
      {
        title: "制作",
        items: [
          {
            name: "Clément Duvivier",
            note: "设计、代码与内容。",
          },
        ],
      },
    ],
    backHome: "← 返回首页",
    linkedin: "LinkedIn",
    resume: "简历",
    logoTip: "提示：连续点击标志 5 次即可到达此页。",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, fr, ja, zh };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
