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
  {
    id: '1',
    title: '企业级大语言模型的未来发展',
    submitter: '陈莎拉',
    contentType: 'Article',
    difficultyLevel: '进阶',
    url: 'https://example.com/future-llms',
    summary: '深入分析大语言模型如何从客户服务自动化到代码生成等方面改变企业工作流程。文章探讨了实施策略、成本效益分析以及组织采用LLM技术时面临的潜在挑战。',
    submittedAt: '2024-01-15T10:30:00Z',
    tags: ['企业AI', '大语言模型', '商业策略']
  },
  {
    id: '2',
    title: '使用Claude API构建AI驱动的应用程序',
    submitter: '罗德里格斯',
    contentType: 'Video',
    difficultyLevel: '初级',
    url: 'https://example.com/claude-api-tutorial',
    summary: '一个全面的45分钟教程，演示如何将Claude API集成到现代Web应用程序中。涵盖身份验证、提示工程最佳实践、流式响应和错误处理，并提供实用的代码示例。',
    submittedAt: '2024-01-14T14:20:00Z',
    tags: ['Claude API', '开发教程', '入门指南']
  },
  {
    id: '3',
    title: 'AI伦理辩论：与行业领袖的对话',
    submitter: '玛雅·帕特尔博士',
    contentType: 'Podcast',
    difficultyLevel: '高级',
    url: 'https://example.com/ai-ethics-podcast',
    summary: '邀请知名AI研究人员和伦理学家就人工智能的负责任发展进行深度讨论。主题包括偏见缓解、透明度要求以及AI系统对社会的影响。',
    submittedAt: '2024-01-13T09:15:00Z',
    tags: ['AI伦理', '行业洞察', '负责任AI']
  },
  {
    id: '4',
    title: '提示工程大师班：高级技术详解',
    submitter: '金乔丹',
    contentType: 'Article',
    difficultyLevel: '高级',
    url: 'https://example.com/prompt-engineering-guide',
    summary: '掌握提示工程艺术，学习获得AI模型更好结果的高级技术。涵盖思维链提示、少样本学习、基于角色的提示以及系统化提示优化策略。',
    submittedAt: '2024-01-12T16:45:00Z',
    tags: ['提示工程', 'AI优化', '最佳实践']
  },
  {
    id: '5',
    title: '医疗保健中的AI：革命性突破',
    submitter: '艾米丽·沃森博士',
    contentType: 'Video',
    difficultyLevel: '进阶',
    url: 'https://example.com/ai-healthcare-breakthroughs',
    summary: '探索AI驱动的医疗保健解决方案的最新突破，从诊断成像改进到药物发现加速。包括医疗专业人士访谈和显示可测量患者结果的真实案例研究。',
    submittedAt: '2024-01-11T11:30:00Z',
    tags: ['医疗AI', '医学创新', '案例研究']
  },
  {
    id: '6',
    title: '2024年AI研究现状报告',
    submitter: '研究团队',
    contentType: 'Podcast',
    difficultyLevel: '进阶',
    url: 'https://example.com/ai-research-2024',
    summary: '年度回顾播客，涵盖2024年最重要的AI研究发展。讨论突破性论文、新兴趋势以及对人工智能研究和发展未来方向的预测。',
    submittedAt: '2024-01-10T08:00:00Z',
    tags: ['AI研究', '年度回顾', '发展趋势']
  },
  {
    id: '7',
    title: '向量数据库：现代AI应用的骨干',
    submitter: '技术解决方案公司',
    contentType: 'Article',
    difficultyLevel: '高级',
    url: 'https://example.com/vector-databases-guide',
    summary: '理解向量数据库及其在AI应用中的关键作用。涵盖嵌入存储、相似性搜索、性能优化，以及Pinecone和Weaviate等流行向量数据库解决方案的实用实施指南。',
    submittedAt: '2024-01-09T13:22:00Z',
    tags: ['向量数据库', 'AI基础设施', '技术指南']
  },
  {
    id: '8',
    title: '无代码AI：机器学习的民主化',
    submitter: '张丽莎',
    contentType: 'Video',
    difficultyLevel: '初级',
    url: 'https://example.com/no-code-ai-platforms',
    summary: '发现无代码AI平台如何让非技术用户也能使用机器学习。回顾流行工具，演示工作流创建，并展示无需传统编程即可构建的真实商业应用。',
    submittedAt: '2024-01-08T15:10:00Z',
    tags: ['无代码AI', '易用性', '商业工具']
  }
];

export const mockComments = {
  '1': [
    {
      id: 'c1',
      author: '迈克尔·布朗',
      content: '关于企业实施的见解很棒！我们公司目前正在试点类似的解决方案。',
      timestamp: '2024-01-15T12:00:00Z'
    },
    {
      id: 'c2',
      author: '刘詹妮弗',
      content: '成本效益分析部分特别有用。希望能看到更多真实世界的案例研究。',
      timestamp: '2024-01-15T14:30:00Z'
    }
  ],
  '2': [
    {
      id: 'c3',
      author: '大卫·威尔逊',
      content: '出色的教程！流式响应示例为我节省了几个小时的调试时间。',
      timestamp: '2024-01-14T16:45:00Z'
    },
    {
      id: 'c4',
      author: '安娜·施密特',
      content: '解释清晰，代码示例结构良好。对于Claude API新手开发者来说非常完美。',
      timestamp: '2024-01-14T18:20:00Z'
    }
  ],
  '3': [
    {
      id: 'c5',
      author: '罗伯特·泰勒教授',
      content: '关于AI伦理的重要讨论。他们讨论的透明度框架应该成为行业标准。',
      timestamp: '2024-01-13T11:30:00Z'
    }
  ]
}; 