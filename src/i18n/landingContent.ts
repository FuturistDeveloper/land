import type { SupportedLanguage } from '@/config/appConfig';

export type LandingContent = {
  header: {
    navItems: { label: string; target: string }[];
    ctaLabel: string;
    navigationAriaLabel: string;
    scrollLeftLabel: string;
    scrollRightLabel: string;
  };
  hero: {
    title: { lead: string; accent: string };
    subtitle: string;
    cardChip: string;
    cardTitle: string;
    cardLines: { accent: string; text: string }[];
    ctaLabel: string;
  };
  connection: {
    titleLines: string[];
    titleAccent: string;
    subtitle: string;
    nodes: { id: 'knowledge' | 'processes' | 'people'; label: string }[];
    typingContent: string;
    responseContent: string;
  };
  capabilities: {
    title: string;
    cards: {
      title: string;
      description: string;
      chips?: string[];
      footer: string;
      background: string;
      compact?: boolean;
    }[];
  };
  showcase: {
    title: string;
    subtitle: string;
    imageAlt: string;
    chatMessages: { role: 'user' | 'bot'; text: string }[];
    cards: { badge: string; badgeColor: string; question: string; response: string }[];
  };
  insideCompany: {
    title: string;
    subtitle: string;
    cards: { icon: 'reach' | 'integrations'; title: string; description: string }[];
  };
  technology: {
    headline: { lead: string; accent: string };
    cards: {
      universalInput: { title: string; description: string };
      semanticChunks: { title: string; description: string };
      core: { title: string; description: string };
      livingKnowledge: { title: string; description: string };
      unlimitedContext: { title: string; description: string };
    };
  };
  security: {
    title: string;
    subtitle: string;
    cards: { id: string; title: string; description: string; accent?: boolean }[];
  };
  intelligence: {
    title: { lead: string; accent: string; tail: string };
    subtitle: string;
    buttons: { demo: string; contact: string };
    features: { title: string; description: string; icon: 'fast-launch' | 'agile-adaptation' | 'constant-growth' }[];
  };
  footer: {
    taglinePrimary: string;
    taglineSecondary: string;
    navColumns: { title: string; links: string[] }[];
    contactLinks: { icon: 'link' | 'mail'; label: string; href: string; external?: boolean }[];
    location: string;
    legal: { notice: string; rights: string };
  };
  widget: {
    welcomeMessage: string;
    botName: string;
    buttonLabel: string;
    placeholder: string;
    quickReplies: string[];
    hideHintsText: string;
    showHintsText: string;
  };
};

export const landingContent: Record<SupportedLanguage, LandingContent> = {
  ru: {
    header: {
      navItems: [
        { label: 'Возможности', target: '#capabilities' },
        { label: 'Как это выглядит', target: '#showcase' },
        { label: 'Информация', target: '#technology' },
        { label: 'Безопасность', target: '#security' },
      ],
      ctaLabel: 'Начать',
      navigationAriaLabel: 'Главное меню',
      scrollLeftLabel: 'Прокрутить меню влево',
      scrollRightLabel: 'Прокрутить меню вправо',
    },
    hero: {
      title: { lead: 'Корпоративный', accent: 'интеллект' },
      subtitle: 'Один чат, чтобы понимать, управлять и развивать бизнес',
      cardChip: 'Futurist OS Chat',
      cardTitle: 'Я — корпоративный мозг твоей компании.',
      cardLines: [
        { accent: 'Я живу', text: 'в мессенджерах, на сайте и внутри твоих систем.' },
        { accent: 'Я соединяю', text: 'сотрудников, процессы и знания в единый поток.' },
        { accent: 'Я помогаю', text: 'людям работать быстрее, понимать глубже и действовать точнее.' },
      ],
      ctaLabel: 'Начать диалог',
    },
    connection: {
      titleLines: ['Связываю то,', 'что раньше работало'],
      titleAccent: 'по отдельности',
      subtitle: 'Большинство компаний тонут в сообщениях, задачах и файлах',
      nodes: [
        { id: 'knowledge', label: 'Знания' },
        { id: 'processes', label: 'Процессы' },
        { id: 'people', label: 'Люди' },
      ],
      typingContent: 'Я создаю пространство, где всё соединено',
      responseContent: 'Всё, что нужно — задать вопрос, всё остальное — я сделаю сам',
    },
    capabilities: {
      title: 'Что я умею',
      cards: [
        {
          title: 'Я управляю задачами и встречами',
          description:
            'Речь, переписки и созвоны превращаются в структурированные решения, задачи и дедлайны. Протоколы создаются автоматически. Статусы обновляются сами.',
          chips: ['«Сформируй протокол утренней встречи»', '«Создай задачи из этого аудио»', '«Кто задерживает проект X?»', '«Покажи статус по задачам маркетинга»', '«Напомни deadline по проекту»'],
          footer: 'OS превращает разговоры в управление.',
          background: 'linear-gradient(140deg, #05060b 0%, #091b40 55%, #061025 100%)',
        },
        {
          title: 'Я показываю картину бизнеса',
          description:
            'OS собирает данные из задач, встреч, чатов, документов и запросов — и превращает их в живую управленческую панель: фокус, риски и тенденции.',
          chips: ['«Что сейчас тормозит компанию?»', '«Какие процессы влияют на выручку?»', '«Покажи риски по проекту X»', '«Какие договоры задерживаются?»', '«Где отдел падает по эффективности?»'],
          footer: 'OS превращает поток информации в управленческие решения. Руководитель не собирает — он видит.',
          background: 'linear-gradient(140deg, #05060b 0%, #0f2548 55%, #091328 100%)',
        },
        {
          title: 'Я знаю и объясняю',
          description:
            'Вся база знаний, инструкции, регламенты и процессы — доступны по смыслу. Не нужно искать, спрашивать или помнить.',
          chips: ['«Где регламент по отпуску?»', '«Как оформить командировку?»', '«Покажи onboarding по отделу маркетинга»', '«Какой документ нужно для оформления визы?»', '«Что прописано в SLA с клиентом X?»'],
          footer: 'OS превращает знание в инструмент.',
          background: 'linear-gradient(140deg, #05060b 0%, #08173b 55%, #061027 100%)',
          compact: true,
        },
        {
          title: 'Я оформляю запросы сотрудников',
          description:
            'Заявления, отпуска, больничные, справки, удалёнка — всё оформляется через чат. Без HR, бланков и Excel.',
          chips: ['«Хочу отпуск с 5 по 12 декабря»', '«Оформи больничный»', '«Мне нужно заявление на удалёнку завтра»', '«Запроси командировку в Абу-Даби на 2 дня»', '«Мне нужен аванс»'],
          footer: 'OS делает всё автоматически — человек просто живёт.',
          background: 'linear-gradient(140deg, #05070e 0%, #0b1d45 55%, #08122f 100%)',
        },
      ],
    },
    showcase: {
      title: 'Как это выглядит',
      subtitle: 'Futurist OS Chat понимает задачи, контекст и помогает действовать быстрее.',
      imageAlt: 'Диалог с Futurist OS Chat',
      chatMessages: [
        {
          role: 'user',
          text: 'Я только что пришёл в компанию. С чего начать?',
        },
        {
          role: 'bot',
          text: 'Привет! Я Futurist OS Chat.\nПокажу твой onboarding и ключевые процессы.',
        },
        {
          role: 'user',
          text: 'Мне нужно понять, как оформить отпуск и командировку.',
        },
        {
          role: 'bot',
          text: 'Вот регламенты по отпуску и командировкам.\nХочешь, соберу чек‑лист под твою роль?',
        },
        {
          role: 'user',
          text: 'Да, сделай, пожалуйста.',
        },
        {
          role: 'bot',
          text: 'Готово. Я также буду напоминать о важных задачах и встречах.',
        },
      ],
      cards: [
        { badge: 'Маркетолог', badgeColor: '#029740', question: 'Где медиаплан за октябрь?', response: 'Вот он. Добавить в отчет?' },
        { badge: 'HR', badgeColor: '#029740', question: 'Проведи опрос вовлечённости', response: 'Сделано. Результат — 8.4' },
        { badge: 'Новый сотрудник', badgeColor: '#ff5833', question: 'Я только что пришёл', response: 'Добро пожаловать! Начнём?' },
      ],
    },
    insideCompany: {
      title: 'Внутри вашей компании',
      subtitle: 'Каждый отдел. Каждая система. Один интерфейс.',
      cards: [
        {
          icon: 'reach',
          title: 'Где угодно',
          description: 'Веб-версия, Telegram, WhatsApp, Slack, Microsoft Teams — я там, где работают люди.',
        },
        {
          icon: 'integrations',
          title: 'С чем угодно',
          description: 'API-интеграции для автоматизации, аналитики и связи со всеми вашими системами.',
        },
      ],
    },
    technology: {
      headline: {
        lead: 'Превращаем информацию в язык,',
        accent: 'понятный искусственному интеллекту',
      },
      cards: {
        universalInput: {
          title: 'Универсальный ввод',
          description:
            'Текст, аудио, видео — всё преобразуется в единый формат данных. Система автоматически распознаёт контекст, участников и темы.',
        },
        semanticChunks: {
          title: 'Разбиение на смысловые блоки',
          description:
            'Контент делится на чанки — структурированные единицы информации. Каждый чанк получает метаданные: смысл, источник, приоритет и связь с другими.',
        },
        core: {
          title: 'Технология Futurist OS',
          description: 'которая переводит текст, аудио и видео в структурированные данные с метаданными и контекстом.',
        },
        livingKnowledge: {
          title: 'Живое корпоративное знание',
          description:
            'Всё, что создаёт компания — документы, звонки, переписки — становится частью единой базы знаний, доступной через AI.',
        },
        unlimitedContext: {
          title: 'Контекст без ограничений',
          description:
            'Модуль сохраняет связи между блоками, поэтому AI анализирует большие объёмы данных без ограничений контекстного окна. Он видит всю картину.',
        },
      },
    },
    security: {
      title: 'Безопасность',
      subtitle: 'Futurist OS может работать полностью автономно. Все данные и модели размещаются внутри корпоративной инфраструктуры.',
      cards: [
        {
          id: '01',
          title: 'Локальное развёртывание',
          description: 'Система устанавливается на серверах компании и функционирует без подключения к внешним облакам',
          accent: true,
        },
        {
          id: '02',
          title: 'Контроль доступа',
          description: 'Администратор управляет уровнями прав — по отделам, проектам и ролям сотрудников.',
        },
        {
          id: '03',
          title: 'Собственные модели',
          description: 'Поддерживается установка внутренних языковых моделей, включая отечественные и кастомные решения',
        },
        {
          id: '04',
          title: 'Интеграция в среду компании',
          description: 'Futurist OS адаптируется под корпоративные стандарты безопасности и работает в закрытых сетях',
        },
      ],
    },
    intelligence: {
      title: { lead: 'Познакомьтесь', accent: 'с интеллектом', tail: 'вашей компании' },
      subtitle: 'Интерфейс, который соединяет людей, данные и процессы.',
      buttons: { demo: 'Запустить демо', contact: 'Связаться с нами' },
      features: [
        {
          title: 'Быстрый запуск',
          description: 'Интеграция за 14 дней. Без обучения и сложных настроек.',
          icon: 'fast-launch',
        },
        {
          title: 'Гибкая адаптация',
          description: 'Подстраивается под ваши процессы и инструменты.',
          icon: 'agile-adaptation',
        },
        {
          title: 'Постоянное развитие',
          description: 'Новые функции и улучшения — каждый месяц.',
          icon: 'constant-growth',
        },
      ],
    },
    footer: {
      taglinePrimary: 'Превращаем разрозненные системы в единый разум компании.',
      taglineSecondary: 'Новый слой сознания для вашего бизнеса.',
      navColumns: [
        {
          title: 'Продукт',
          links: ['Возможности', 'Для кого', 'Экосистема', 'Безопасность'],
        },
        {
          title: 'Компания',
          links: ['О нас', 'Карьера', 'Блог', 'Контакты'],
        },
      ],
      contactLinks: [
        {
          icon: 'link',
          label: 'futuristos.ai',
          href: 'https://futuristos.ai',
          external: true,
        },
        {
          icon: 'mail',
          label: 'hello@futuristos.ai',
          href: 'mailto:hello@futuristos.ai',
        },
      ],
      location: 'Dubai, United Arab Emirates',
      legal: {
        notice: '© 2025 Futurist OS',
        rights: 'Все права защищены',
      },
    },
    widget: {
      welcomeMessage: 'Привет! 👋 Опишите задачу — покажу, как Futurist OS решит её.',
      botName: 'AI Assist',
      buttonLabel: 'OS',
      placeholder: 'Напишите сообщение...',
      quickReplies: ['Как начать?', 'Цены', 'Поддержка', 'Демо', 'Контакты'],
      hideHintsText: 'Скрыть подсказки',
      showHintsText: 'Показать подсказки',
    },
  },
  en: {
    header: {
      navItems: [
        { label: 'Capabilities', target: '#capabilities' },
        { label: 'Product Tour', target: '#showcase' },
        { label: 'Technology', target: '#technology' },
        { label: 'Security', target: '#security' },
      ],
      ctaLabel: 'Get Started',
      navigationAriaLabel: 'Primary navigation',
      scrollLeftLabel: 'Scroll navigation left',
      scrollRightLabel: 'Scroll navigation right',
    },
    hero: {
      title: { lead: 'Corporate', accent: 'intelligence' },
      subtitle: 'One chat to understand, manage, and grow the business',
      cardChip: 'Futurist OS Chat',
      cardTitle: "I'm the corporate brain of your company.",
      cardLines: [
        { accent: 'I live', text: 'inside messengers, the website, and your internal systems.' },
        { accent: 'I connect', text: 'people, processes, and knowledge into a single flow.' },
        { accent: 'I help', text: 'teams work faster, understand deeper, and act with precision.' },
      ],
      ctaLabel: 'Start the conversation',
    },
    connection: {
      titleLines: ['I connect what used to work', 'as separate silos'],
      titleAccent: 'into one space',
      subtitle: 'Most companies drown in chats, tasks, and files',
      nodes: [
        { id: 'knowledge', label: 'Knowledge' },
        { id: 'processes', label: 'Processes' },
        { id: 'people', label: 'People' },
      ],
      typingContent: 'I build a space where everything is linked',
      responseContent: 'All you do is ask — I take care of the rest',
    },
    capabilities: {
      title: 'What I deliver',
      cards: [
        {
          title: 'I manage tasks and meetings',
          description:
            'Speech, chats, and calls turn into structured decisions, tasks, and deadlines. Minutes are created automatically. Statuses update themselves.',
          chips: ['“Generate morning meeting minutes”', '“Create tasks from this audio”', '“Who is delaying project X?”', '“Show status on marketing tasks”', '“Remind me of the project deadline”'],
          footer: 'OS turns conversations into management.',
          background: 'linear-gradient(140deg, #05060b 0%, #091b40 55%, #061025 100%)',
        },
        {
          title: 'I show the business picture',
          description:
            'OS gathers data from tasks, meetings, chats, documents, and requests — and turns them into a live management dashboard: focus, risks, and trends.',
          chips: ['“What is slowing down the company now?”', '“Which processes affect revenue?”', '“Show risks for project X”', '“Which contracts are delayed?”', '“Where is the department losing efficiency?”'],
          footer: "OS turns information flow into management decisions. The leader doesn't gather — they see.",
          background: 'linear-gradient(140deg, #05060b 0%, #0f2548 55%, #091328 100%)',
        },
        {
          title: 'I know and explain',
          description:
            'All knowledge base, instructions, regulations, and processes are available by meaning. No need to search, ask, or remember.',
          chips: ['“Where is the vacation policy?”', '“How to arrange a business trip?”', '“Show marketing department onboarding”', '“What document is needed for visa application?”', '“What is stated in the SLA with client X?”'],
          footer: 'OS turns knowledge into a tool.',
          background: 'linear-gradient(140deg, #05060b 0%, #08173b 55%, #061027 100%)',
          compact: true,
        },
        {
          title: 'I handle employee requests',
          description:
            'Applications, vacations, sick leaves, certificates, remote work — everything is processed via chat. No HR, forms, or Excel.',
          chips: ['“I want vacation from Dec 5 to 12”', '“Process sick leave”', '“I need a remote work application for tomorrow”', '“Request a business trip to Abu Dhabi for 2 days”', '“I need an advance payment”'],
          footer: 'OS does everything automatically — people just live.',
          background: 'linear-gradient(140deg, #05070e 0%, #0b1d45 55%, #08122f 100%)',
        },
      ],
    },
    showcase: {
      title: 'What it looks like',
      subtitle: 'Futurist OS Chat understands the task, context, and next action.',
      imageAlt: 'Conversation with Futurist OS Chat',
      chatMessages: [
        {
          role: 'user',
          text: "It's my first day at the company. Where do I start?",
        },
        {
          role: 'bot',
          text: "Hi! I'm Futurist OS Chat.\nI'll walk you through onboarding and key processes.",
        },
        {
          role: 'user',
          text: 'I need to understand how to request vacation and business trips.',
        },
        {
          role: 'bot',
          text: 'Here are the policies for vacation and travel.\nWant me to build a checklist for your role?',
        },
        {
          role: 'user',
          text: 'Yes, please.',
        },
        {
          role: 'bot',
          text: "Done. I'll also keep you on top of important tasks and meetings.",
        },
      ],
      cards: [
        {
          badge: 'Marketing lead',
          badgeColor: '#029740',
          question: 'Where is the October media plan?',
          response: 'Here it is. Add it to the report?',
        },
        {
          badge: 'HR',
          badgeColor: '#029740',
          question: 'Run an engagement survey',
          response: 'Done. Score — 8.4',
        },
        {
          badge: 'New hire',
          badgeColor: '#ff5833',
          question: "It's my first day",
          response: 'Welcome aboard! Ready to start?',
        },
      ],
    },
    insideCompany: {
      title: 'Inside your company',
      subtitle: 'Every department. Every system. One interface.',
      cards: [
        {
          icon: 'reach',
          title: 'Anywhere',
          description: 'Web, Telegram, WhatsApp, Slack, Microsoft Teams—I live where your people work.',
        },
        {
          icon: 'integrations',
          title: 'With anything',
          description: 'API integrations for automation, analytics, and deep links to every system you use.',
        },
      ],
    },
    technology: {
      headline: {
        lead: 'We turn information into a language',
        accent: 'that AI understands instantly',
      },
      cards: {
        universalInput: {
          title: 'Universal input',
          description:
            'Text, audio, video—everything becomes a unified data format. The system auto-detects context, stakeholders, and topics.',
        },
        semanticChunks: {
          title: 'Semantic chunking',
          description:
            'Content splits into structured chunks. Each chunk gets metadata: meaning, source, priority, and links to others.',
        },
        core: {
          title: 'Futurist OS core tech',
          description: 'It converts text, audio, and video into structured data enriched with metadata and context.',
        },
        livingKnowledge: {
          title: 'Living corporate knowledge',
          description:
            'Everything the company creates—docs, calls, chats—joins one knowledge base reachable through AI.',
        },
        unlimitedContext: {
          title: 'Unlimited context',
          description:
            'The module preserves links between chunks, so AI reads huge volumes without context-window limits. It sees the whole picture.',
        },
      },
    },
    security: {
      title: 'Security',
      subtitle:
        'Futurist OS can run completely autonomously. All data and models live inside your corporate infrastructure.',
      cards: [
        {
          id: '01',
          title: 'Local deployment',
          description: 'Install on your servers and operate with zero external cloud connections.',
          accent: true,
        },
        {
          id: '02',
          title: 'Access control',
          description: 'Admins define granular permissions by department, project, and employee role.',
        },
        {
          id: '03',
          title: 'Bring your models',
          description: 'Install internal LLMs, domestic engines, or fully custom models.',
        },
        {
          id: '04',
          title: 'Embedded in your environment',
          description: 'Futurist OS adapts to corporate security standards and runs inside closed networks.',
        },
      ],
    },
    intelligence: {
      title: { lead: 'Meet the intelligence', accent: 'behind', tail: 'your company' },
      subtitle: 'An interface that unites people, data, and processes.',
      buttons: { demo: 'Launch the demo', contact: 'Talk to us' },
      features: [
        {
          title: 'Fast launch',
          description: 'Deployment in 14 days. No heavy training or complex setup.',
          icon: 'fast-launch',
        },
        {
          title: 'Adaptive fit',
          description: 'Shapes itself around your processes and tool stack.',
          icon: 'agile-adaptation',
        },
        {
          title: 'Constant evolution',
          description: 'New features and improvements drop every month.',
          icon: 'constant-growth',
        },
      ],
    },
    footer: {
      taglinePrimary: 'We turn fragmented systems into a single corporate mind.',
      taglineSecondary: 'A new layer of awareness for your business.',
      navColumns: [
        {
          title: 'Product',
          links: ['Capabilities', 'Who we serve', 'Ecosystem', 'Security'],
        },
        {
          title: 'Company',
          links: ['About', 'Careers', 'Blog', 'Contacts'],
        },
      ],
      contactLinks: [
        {
          icon: 'link',
          label: 'futuristos.ai',
          href: 'https://futuristos.ai',
          external: true,
        },
        {
          icon: 'mail',
          label: 'hello@futuristos.ai',
          href: 'mailto:hello@futuristos.ai',
        },
      ],
      location: 'Dubai, United Arab Emirates',
      legal: {
        notice: '© 2025 Futurist OS',
        rights: 'All rights reserved',
      },
    },
    widget: {
      welcomeMessage: "Hi there! 👋 Tell me what you're working on — I'll show how Futurist OS solves it.",
      botName: 'AI Assist',
      buttonLabel: 'OS',
      placeholder: 'Type your message...',
      quickReplies: ['How to start?', 'Pricing', 'Support', 'Book a demo', 'Contact us'],
      hideHintsText: 'Hide hints',
      showHintsText: 'Show hints',
    },
  },
};

