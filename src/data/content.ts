export interface ContentItem {
  id: string;
  title: string;
  submitter: string;
  contentType: 'Article' | 'Podcast' | 'Video';
  difficultyLevel: '初级' | '进阶' | '高级';
  url: string;
  summary: string;
  submittedAt: string;
  tags: string[];
}

export const mockContent: ContentItem[] = [
  // 文章/博客 - 基础
  {
    id: '1',
    title: 'What Is ChatGPT Doing and Why Does It Work?',
    submitter: 'Stephen Wolfram',
    contentType: 'Article',
    difficultyLevel: '初级',
    url: 'https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/',
    summary: '著名科学家Stephen Wolfram用非常直观和易于理解的方式，从第一性原理出发解释了像ChatGPT这样的大语言模型其核心工作原理。这篇文章几乎没有复杂的数学公式，是理解LLM内部机制的最佳入门读物。',
    submittedAt: '2024-01-15T10:30:00Z',
    tags: ['ChatGPT', '大语言模型', '第一性原理', '入门', 'Stephen Wolfram']
  },
  
  // 文章/博客 - 进阶
  {
    id: '2',
    title: 'The Illustrated Transformer',
    submitter: 'Jay Alammar',
    contentType: 'Article',
    difficultyLevel: '进阶',
    url: 'https://jalammar.github.io/illustrated-transformer/',
    summary: 'Jay Alammar用大量精美的图示，一步步拆解了Transformer模型的内部结构和"自注意力"机制。这篇文章是理解所有现代大语言模型（如GPT、BERT）基础架构的最经典、最直观的入门材料。',
    submittedAt: '2024-01-14T14:20:00Z',
    tags: ['Transformer', '自注意力', 'GPT', 'BERT', '架构解析', '图解']
  },
  
  {
    id: '3',
    title: 'Attention Is All You Need',
    submitter: 'Ashish Vaswani, et al.',
    contentType: 'Article',
    difficultyLevel: '进阶',
    url: 'https://arxiv.org/abs/1706.03762',
    summary: '这篇论文是Transformer模型的开山之作，是整个大语言模型时代的基石。虽然是学术论文，但对于进阶者来说，阅读并理解其核心思想是必不可少的一步。',
    submittedAt: '2024-01-13T09:15:00Z',
    tags: ['Transformer', 'Attention', '学术论文', 'Google Research', '开创性研究']
  },
  
  // 播客 - AI与行业洞察
  {
    id: '4',
    title: '屠龙之术 - Vol.64 40页PPT记录2025年中AI行业共识',
    submitter: '庄明浩 ROI',
    contentType: 'Podcast',
    difficultyLevel: '进阶',
    url: 'https://www.xiaoyuzhoufm.com/episode/684fb4d62a38b4d979df0846',
    summary: '这是主播庄明浩 ROI 的一期单口。他分享了自己花大量时间制作的一份40页PPT，核心是梳理在2025年6月这个时间点，他对当前AI行业的"共识"是怎样的。内容会依次聊到：技术（推理、Agent、开源）、产品（交互、运营）、资本（加速、并购）等等和他自己的一些思考。',
    submittedAt: '2024-01-15T10:30:00Z',
    tags: ['AI行业', '技术趋势', 'Agent', '开源', '投资', '行业共识']
  },
  
  {
    id: '5',
    title: '十字路口Crossing - 首个投资交易 Agent Bobby 上线，第一时间和 Vakee 聊 Bobby 的诞生过程以及生活中的投资机会',
    submitter: '十字路口Crossing',
    contentType: 'Podcast',
    difficultyLevel: '进阶',
    url: 'https://www.xiaoyuzhoufm.com/episode/685805084abe6e29cb68ce17',
    summary: '新加坡金融科技公司 RockFlow 刚刚发布了全球首个金融交易 AI Agent——Bobby。我们第一时间邀请到了 RockFlow 的创始人 Vakee Lai，来和我们一起聊聊 Bobby 的诞生过程，以及 Vakee 对于普通人如何在生活中发现投资机会的思考。',
    submittedAt: '2024-01-14T14:20:00Z',
    tags: ['AI Agent', '金融科技', '投资', 'RockFlow', 'Bobby', '交易']
  },
  
  {
    id: '6',
    title: '42章经 - 世界加速分化下，我们的机会在哪里？ | 对谈绿洲资本合伙人张津剑',
    submitter: '42章经',
    contentType: 'Podcast',
    difficultyLevel: '进阶',
    url: 'https://www.xiaoyuzhoufm.com/episode/683cdd6c38dcc57c641216cb',
    summary: '本期我们请到了绿洲资本的合伙人张津剑，他会分享关于"投资中的频率与频谱"的思考，以及关于 AI 的一场"感知革命"的观点，最终回归到每个人该如何重建"注意力"这个话题。',
    submittedAt: '2024-01-13T09:15:00Z',
    tags: ['AI投资', '感知革命', '注意力', '绿洲资本', '投资思考', '张津剑']
  },
  
  // 播客 - 创业与个人成长
  {
    id: '7',
    title: '三五环 - No.196 对谈玉伯：告别大厂，我在 AI 荒野里「养小孩」',
    submitter: '三五环',
    contentType: 'Podcast',
    difficultyLevel: '进阶',
    url: 'https://www.xiaoyuzhoufm.com/episode/68598b1b2a38b4d979294357',
    summary: '本期节目的嘉宾是玉伯。他曾是蚂蚁集团研究员，后带领团队创办了语雀，不久前刚卸任飞书产品副总裁，目前在 AI 领域创业。在这期节目里，玉伯坦诚地分享了他创业半年来的感受，为什么他会把做从 0 到 1 的 AI 产品比作"养小孩"？他如何看待 AI 产品定义和找 PMF 的挑战？',
    submittedAt: '2024-01-12T16:45:00Z',
    tags: ['AI创业', '玉伯', '语雀', '飞书', '产品开发', 'PMF']
  },
  
  {
    id: '8',
    title: 'The Wanderers 流浪者 - 44.AI时代，牛马能躺平吗？(首次露脸)',
    submitter: 'The Wanderers 流浪者',
    contentType: 'Podcast',
    difficultyLevel: '初级',
    url: 'https://www.xiaoyuzhoufm.com/episode/684702b56dbe9284e79f22d5',
    summary: '本期为首次露脸的视频播客。本期节目我们和新朋友浩哥、星辰一起聊了聊最近很火的 AI 话题，希望能帮助大家缓解一些技术焦虑。',
    submittedAt: '2024-01-11T11:30:00Z',
    tags: ['AI时代', '技术焦虑', '个人成长', '视频播客', '躺平思考']
  },
  
  {
    id: '9',
    title: '晚点聊 - 120: 科创板后再访Insta360刘靖康：这何尝不是一种极限运动！',
    submitter: '晚点聊',
    contentType: 'Podcast',
    difficultyLevel: '进阶',
    url: 'https://www.xiaoyuzhoufm.com/episode/684b3febcdecf72d4cb70f82',
    summary: '影石Insta360成功登陆科创板一年后，我们再次和它的创始人刘靖康进行了一次深度交流。本期节目，你将听到，影石的战略如何从"猎人策略"演变为"包围式差异化"进攻？刘靖康本人在产品、组织和个人成长上有哪些最新思考？',
    submittedAt: '2024-01-10T08:00:00Z',
    tags: ['Insta360', '刘靖康', '科创板', '产品策略', '创业思考', '极限运动']
  },
  
  // 视频 - 基础
  {
    id: '10',
    title: 'Deep Dive into LLMs like ChatGPT',
    submitter: 'AI Education Channel',
    contentType: 'Video',
    difficultyLevel: '初级',
    url: 'https://www.youtube.com/watch?v=7xTGNNLPyMI&t=1s',
    summary: '本视频深入浅出地讲解了大型语言模型（如ChatGPT）的核心工作原理，旨在帮助观众理解其背后的技术基础和架构。适合希望对LLM技术有宏观和概念性认识的初学者。',
    submittedAt: '2024-01-16T13:22:00Z',
    tags: ['LLM深度解析', 'ChatGPT原理', '技术基础', '架构解析', '初学者友好']
  },
  
  {
    id: '11',
    title: 'How I use LLM',
    submitter: 'Productivity Tech',
    contentType: 'Video',
    difficultyLevel: '初级',
    url: 'https://www.youtube.com/watch?v=EWvNQjAaOHw',
    summary: '本视频侧重于实际应用，分享了使用大型语言模型的实用技巧和工作流程。内容主要展示如何将LLM作为强大的生产力工具，以提升日常工作和学习的效率。',
    submittedAt: '2024-01-08T15:10:00Z',
    tags: ['LLM应用', '生产力工具', '工作流程', '实用技巧', '效率提升']
  }
];

export const mockComments = {
  '1': [
    {
      id: 'c1',
      author: '李明',
      content: 'Stephen Wolfram的这篇文章真的写得太好了！作为一个非技术背景的人，我终于理解了ChatGPT的工作原理。特别是关于神经网络训练的部分，解释得非常清晰。',
      timestamp: '2024-01-15T12:00:00Z'
    },
    {
      id: 'c2',
      author: '王小芳',
      content: '这篇文章的视觉化解释太棒了。之前看了很多技术文档都云里雾里，这篇让我对Transformer有了直观的理解。强烈推荐给所有想了解AI的朋友！',
      timestamp: '2024-01-15T14:30:00Z'
    }
  ],
  '2': [
    {
      id: 'c3',
      author: '张工程师',
      content: 'Jay Alammar的图解系列一直都是经典！这篇Transformer的解析帮我在面试中答出了关键问题。图示和动画让复杂的attention机制变得容易理解。',
      timestamp: '2024-01-14T16:45:00Z'
    },
    {
      id: 'c4',
      author: '陈研究生',
      content: '正在写毕业论文，这篇文章提供了很好的Transformer架构理解。特别是multi-head attention的部分，比教科书讲得还清楚。',
      timestamp: '2024-01-14T18:20:00Z'
    }
  ],
  '3': [
    {
      id: 'c5',
      author: '林教授',
      content: '这篇开创性的论文改变了整个NLP领域。虽然数学公式较多，但核心思想revolutionary。建议结合Jay Alammar的图解文章一起阅读，效果更佳。',
      timestamp: '2024-01-13T11:30:00Z'
    }
  ],
  '4': [
    {
      id: 'c6',
      author: 'AI从业者',
      content: '庄明浩这期40页PPT的总结真的很全面！对2025年AI行业的梳理很到位，从技术到产品到资本都有涉及。特别是对Agent技术发展的分析很有见地。',
      timestamp: '2024-01-15T20:15:00Z'
    }
  ],
  '5': [
    {
      id: 'c7',
      author: '金融科技爱好者',
      content: 'Bobby这个AI Agent真的很有意思！作为全球首个金融交易Agent，确实开创了新的领域。Vakee分享的投资机会思考也很实用。',
      timestamp: '2024-01-14T13:45:00Z'
    }
  ],
  '7': [
    {
      id: 'c8',
      author: '创业者',
      content: '玉伯的分享很真诚！从蚂蚁到语雀再到飞书，现在又投身AI创业，他的经历和思考对我们这些想在AI领域创业的人很有启发。',
      timestamp: '2024-01-12T16:30:00Z'
    }
  ],
  '10': [
    {
      id: 'c9',
      author: '技术新手',
      content: '这个视频太棒了！终于明白了LLM是怎么生成文本的。讲解很清晰，没有太多专业术语，适合我这种刚开始学习AI的人。',
      timestamp: '2024-01-09T16:30:00Z'
    }
  ],
  '11': [
    {
      id: 'c10',
      author: '效率达人',
      content: '视频中的LLM使用技巧很实用！已经开始在我的日常工作中应用，确实提高了不少效率。特别是那个prompt优化的部分，很有启发。',
      timestamp: '2024-01-08T19:20:00Z'
    }
  ]
}; 