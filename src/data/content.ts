export type ArticleMeta = {
  id: string;
  title: string;
  sourceFile: string;
  tags: string[];
};

export type SectionMeta = {
  id: string;
  title: string;
  description: string;
  articles: ArticleMeta[];
};

export type DomainMeta = {
  id: string;
  index: string;
  title: string;
  englishTitle: string;
  description: string;
  accent: string;
  sections: SectionMeta[];
};

export const contentDomains: DomainMeta[] = [
  {
    id: 'model-foundations',
    index: '01',
    title: '模型基础',
    englishTitle: 'Model Foundations',
    description: '从图像到视频，理解生成模型如何组织噪声、序列、时间与世界。',
    accent: '#8fa8ff',
    sections: [
      {
        id: 'image-models',
        title: '图像模型',
        description: '从扩散与自回归两条技术路线理解图像生成。',
        articles: [
          { id: 'gpt-image2', title: '为什么 GPT Image 2 画面不够丝滑？', sourceFile: 'posts/image/gpt-image2.html', tags: ['AI', '图像生成', '自回归模型'] },
          { id: 'diffusion-model', title: '扩散模型是怎么“画画”的？', sourceFile: 'posts/image/diffusion-model.html', tags: ['AI', '图像生成', '扩散模型'] },
          { id: 'autoregressive-model', title: '自回归模型是怎么“写出”图像的？', sourceFile: 'posts/image/autoregressive-model.html', tags: ['AI', '图像生成', '自回归模型'] }
        ]
      },
      {
        id: 'video-models',
        title: '视频模型',
        description: '理解视频扩散、时序一致性与世界模型。',
        articles: [
          { id: 'video-generation', title: '视频生成模型：从扩散噪声到影视级画面', sourceFile: 'posts/video/video-generation.html', tags: ['AI', '视频生成', '扩散模型', 'DiT'] },
          { id: 'world-model', title: '世界模型：不只是“预测下一帧”', sourceFile: 'posts/video/world-model.html', tags: ['AI', '视频生成', '世界模型', '具身智能'] }
        ]
      }
    ]
  },
  {
    id: 'aesthetic-foundations',
    index: '02',
    title: '美学基础',
    englishTitle: 'Visual Aesthetics',
    description: '建立构图、光线、色彩与视觉叙事的基本判断。',
    accent: '#f0a574',
    sections: [
      {
        id: 'visual-language',
        title: '美学与摄影',
        description: '从镜头与画面语言开始训练视觉判断。',
        articles: [
          { id: 'visual-aesthetics', title: '画面语言：用视觉说话', sourceFile: 'posts/aesthetics/visual-aesthetics.html', tags: ['美学', '摄影', '构图', '视觉语言'] }
        ]
      }
    ]
  },
  {
    id: 'development-foundations',
    index: '03',
    title: '开发基础',
    englishTitle: 'Development',
    description: '补齐前端、工程工具、网络协议与协作语言的基础地图。',
    accent: '#75d4ba',
    sections: [
      {
        id: 'frontend-learning',
        title: '前端学习',
        description: '从网页结构开始理解前端开发。',
        articles: [
          { id: 'frontend-intro', title: '前端开发入门：从 Python 到网页的第一步', sourceFile: 'posts/frontend/frontend-intro.html', tags: ['前端开发', 'HTML', 'CSS', 'JavaScript'] }
        ]
      },
      {
        id: 'newcomer-practice',
        title: '新人操作实践',
        description: '工作中最先会遇到的协作工具与网络基础。',
        articles: [
          { id: 'git-info', title: 'Git 工作流：从零到第一个 PR', sourceFile: 'posts/git/git-info.html', tags: ['Git', '版本控制', '团队协作'] },
          { id: 'python-packaging-history', title: 'Python 包管理工具简史：从 distutils 到 uv', sourceFile: 'posts/git/python-packaging-history.html', tags: ['Python', '包管理', 'uv'] },
          { id: 'http-request-intro', title: 'HTTP 请求全解析', sourceFile: 'posts/git/http-request-intro.html', tags: ['HTTP', 'REST API', '请求头'] }
        ]
      },
      {
        id: 'internet-terms',
        title: '互联网术语入门',
        description: '读懂需求、角色与团队协作中的常见语言。',
        articles: [
          { id: 'greenman-001', title: '第〇篇：为什么要懂“黑话”？', sourceFile: 'posts/greenman/000.html', tags: ['职场', '术语', '沟通'] },
          { id: 'greenman-002', title: '第一篇：职场通用术语', sourceFile: 'posts/greenman/001.html', tags: ['职场', '通用术语', '沟通场景'] },
          { id: 'greenman-003', title: '第二篇：读懂一张需求文档', sourceFile: 'posts/greenman/002.html', tags: ['需求文档', '工作流程'] },
          { id: 'greenman-004', title: '第三篇：产品经理的专业语言', sourceFile: 'posts/greenman/003.html', tags: ['产品经理', 'PM', '用户研究'] },
          { id: 'greenman-005', title: '第四篇：项目经理的专业语言', sourceFile: 'posts/greenman/004.html', tags: ['项目管理', '协作', '排期'] },
          { id: 'greenman-006', title: '第五篇：前端工程师的专业语言', sourceFile: 'posts/greenman/005.html', tags: ['前端开发', '组件化', '浏览器'] },
          { id: 'greenman-007', title: '第六篇：后端工程师的专业语言', sourceFile: 'posts/greenman/006.html', tags: ['后端开发', '接口', '数据库'] },
          { id: 'greenman-008', title: '第七篇：数据与算法的专业语言', sourceFile: 'posts/greenman/007.html', tags: ['数据分析', '算法', '机器学习'] },
          { id: 'greenman-009', title: '第八篇：测试工程师的专业语言', sourceFile: 'posts/greenman/008.html', tags: ['测试', 'QA', '质量保证'] }
        ]
      }
    ]
  },
  {
    id: 'application-practice',
    index: '04',
    title: '应用实践',
    englishTitle: 'Applied Practice',
    description: '把模型能力变成 Agent、图像和视频生产工作流。',
    accent: '#c7a1ee',
    sections: [
      {
        id: 'llm-applications',
        title: 'LLM 应用',
        description: '从 Agent 概念到评测体系与多模态实践。',
        articles: [
          { id: 'ai-agent-intro', title: 'AI Agent 概念入门', sourceFile: 'posts/llm/ai-agent-intro.html', tags: ['AI', 'Agent', 'LLM'] },
          { id: 'agent-evaluation', title: '测评1：Agent 开发中的评测体系', sourceFile: 'posts/llm/agent-evaluation.html', tags: ['AI', 'Agent', '评测'] },
          { id: 'agent-evaluation2', title: '测评2：多模态评测集构建实战', sourceFile: 'posts/llm/agent-evaluation2.html', tags: ['AI', 'Agent', '多模态'] }
        ]
      },
      {
        id: 'model-tutorials',
        title: '图片 / 视频模型教程',
        description: '围绕主流生成模型建立可复用的创作方法。',
        articles: [
          { id: 'seedance2-tutorial', title: 'Seedance 2.0 使用教程', sourceFile: 'posts/tutorial/seedance2-tutorial.html', tags: ['Seedance 2.0', '视频生成', '使用教程'] },
          { id: 'seedance25-tutorial', title: 'Seedance 2.5 使用教程', sourceFile: 'posts/tutorial/seedance25-tutorial.html', tags: ['Seedance 2.5', '视频生成', '使用教程'] },
          { id: 'gpt-image2-tutorial', title: 'GPT Image 2 使用教程', sourceFile: 'posts/tutorial/gpt-image2-tutorial.html', tags: ['GPT Image 2', '图片生成', '使用教程'] },
          { id: 'nano-banana2-tutorial', title: 'Nano Banana 2 使用教程', sourceFile: 'posts/tutorial/nano-banana2-tutorial.html', tags: ['Nano Banana 2', '图片生成', '使用教程'] },
          { id: 'midjourney-tutorial', title: 'Midjourney 使用教程', sourceFile: 'posts/tutorial/midjourney-tutorial.html', tags: ['Midjourney', '图片生成', '使用教程'] }
        ]
      }
    ]
  },
  {
    id: 'other',
    index: '05',
    title: '其他',
    englishTitle: 'Observations',
    description: '在技术地图之外，持续观察产业、商业与长期变化。',
    accent: '#e0c775',
    sections: [
      {
        id: 'business-observation',
        title: '商业观察',
        description: '从企业与产业案例理解技术世界的另一面。',
        articles: [
          { id: 'national-memory-duo', title: '十年亏损三百亿，凭什么活成全球第四？', sourceFile: 'posts/business/national-memory-duo.html', tags: ['商业', '半导体', '存储'] }
        ]
      }
    ]
  }
];

export const allArticles = contentDomains.flatMap(domain =>
  domain.sections.flatMap(section =>
    section.articles.map(article => ({ article, section, domain }))
  )
);

export function getDomainArticles(domainId: string) {
  return allArticles.filter(item => item.domain.id === domainId);
}
