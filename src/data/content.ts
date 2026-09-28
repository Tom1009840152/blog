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
  introduction: ArticleMeta;
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
    introduction: {
      id: 'model-foundations-introduction',
      title: '篇章引言：理解生成模型的基础地图',
      sourceFile: 'posts/domain-introductions/model-foundations.html',
      tags: ['模型基础', '生成模型', '模型机制']
    },
    sections: [
      {
        id: 'model-training',
        title: '模型训练',
        description: '理解预训练与微调阶段的数据工程、规模规律与质量控制。',
        articles: [
          { id: 'llm-training-data-preparation', title: '大模型训练的数据准备', sourceFile: 'posts/training/llm-training-data-preparation.html', tags: ['LLM', '模型训练', '数据工程', 'Scaling Law'] },
          { id: 'llm-fine-tuning', title: '大模型微调：全参数微调与高效参数微调', sourceFile: 'posts/training/llm-fine-tuning.html', tags: ['LLM', '模型微调', 'LoRA', '模型评估'] }
        ]
      },
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
    title: '视觉创作',
    englishTitle: 'Visual Creation',
    description: '从美学与摄影语言出发，学习描述、生成和迭代图像与视频。',
    accent: '#f0a574',
    introduction: {
      id: 'aesthetic-foundations-introduction',
      title: '篇章引言：从视觉判断走向生成影像',
      sourceFile: 'posts/domain-introductions/aesthetic-foundations.html',
      tags: ['视觉创作', '视觉语言', '生成影像']
    },
    sections: [
      {
        id: 'visual-language',
        title: '美学与摄影',
        description: '从镜头与画面语言开始训练视觉判断。',
        articles: [
          { id: 'visual-aesthetics', title: '画面语言：用视觉说话', sourceFile: 'posts/aesthetics/visual-aesthetics.html', tags: ['美学', '摄影', '构图', '视觉语言'] },
          { id: 'lighting-language', title: '光线的语言：方向、软硬、光比与色温', sourceFile: 'posts/aesthetics/lighting-language.html', tags: ['美学', '摄影', '光线', '布光'] },
          { id: 'color-foundations', title: '色彩基础：颜色为什么会改变画面情绪', sourceFile: 'posts/aesthetics/color-foundations.html', tags: ['美学', '色彩', '视觉心理', '配色'] },
          { id: 'advanced-composition', title: '构图进阶：视觉重心、留白与视线流动', sourceFile: 'posts/aesthetics/advanced-composition.html', tags: ['美学', '构图', '视觉重心', '视线流动'] },
          { id: 'lens-space-perspective', title: '镜头与空间：焦段、距离和透视', sourceFile: 'posts/aesthetics/lens-space-perspective.html', tags: ['美学', '摄影', '焦段', '透视'] }
        ]
      },
      {
        id: 'directing-foundations',
        title: '导演思维',
        description: '从人物目标、场景关系与观众信息出发，用调度、镜头和剪辑组织时间与叙事。',
        articles: [
          { id: 'directing-mindset', title: '导演思维入门：决定观众看见什么、何时看见', sourceFile: 'posts/directing/directing-mindset.html', tags: ['导演思维', '视点', '信息设计', '视听策略'] },
          { id: 'scene-analysis', title: '场景拆解：人物目标、冲突、节拍与信息变化', sourceFile: 'posts/directing/scene-analysis.html', tags: ['场景分析', '人物目标', '冲突', '节拍'] },
          { id: 'mise-en-scene-blocking', title: '场面调度：人物、摄影机与空间如何共同叙事', sourceFile: 'posts/directing/mise-en-scene-blocking.html', tags: ['场面调度', '空间', '人物动作', '摄影机'] },
          { id: 'shot-design-storyboarding', title: '镜头设计与分镜：把场景变成可执行的镜头序列', sourceFile: 'posts/directing/shot-design-storyboarding.html', tags: ['镜头设计', '分镜', '镜头表', '覆盖'] },
          { id: 'editing-thinking', title: '剪辑思维：连续性、节奏、切点与蒙太奇', sourceFile: 'posts/directing/editing-thinking.html', tags: ['剪辑', '连续性', '节奏', '蒙太奇'] }
        ]
      },
      {
        id: 'generative-visual-language',
        title: '生成影像语言',
        description: '把视觉意图拆成可观察、可生成、可验证的描述与约束。',
        articles: [
          { id: 'intent-to-prompt', title: '从视觉意图到提示词：生成影像的描述语法', sourceFile: 'posts/generative-visual-language/intent-to-prompt.html', tags: ['提示词', '生成影像', '视觉语言', '创作方法'] },
          { id: 'dynamic-image-language', title: '动态影像语言：运镜、调度、节奏与连续性', sourceFile: 'posts/generative-visual-language/dynamic-image-language.html', tags: ['动态影像', '运镜', '场面调度', '连续性'] },
          { id: 'style-medium-material', title: '风格、媒介与材质：生成模型常用视觉词汇', sourceFile: 'posts/generative-visual-language/style-medium-material.html', tags: ['视觉词汇', '艺术媒介', '材质', '风格'] }
        ]
      },
      {
        id: 'image-model-tutorials',
        title: '图片模型教程',
        description: '把视觉意图转化为可生成、可编辑、可迭代的图片工作流。',
        articles: [
          { id: 'gpt-image2-tutorial', title: 'GPT Image 2 使用教程', sourceFile: 'posts/tutorial/gpt-image2-tutorial.html', tags: ['GPT Image 2', '图片生成', '使用教程'] },
          { id: 'nano-banana2-tutorial', title: 'Nano Banana 2 使用教程', sourceFile: 'posts/tutorial/nano-banana2-tutorial.html', tags: ['Nano Banana 2', '图片生成', '使用教程'] },
          { id: 'midjourney-tutorial', title: 'Midjourney 使用教程', sourceFile: 'posts/tutorial/midjourney-tutorial.html', tags: ['Midjourney', '图片生成', '使用教程'] }
        ]
      },
      {
        id: 'video-model-tutorials',
        title: '视频模型教程',
        description: '围绕参考素材、时间轴、运镜与一致性组织视频生成流程。',
        articles: [
          { id: 'seedance2-tutorial', title: 'Seedance 2.0 使用教程', sourceFile: 'posts/tutorial/seedance2-tutorial.html', tags: ['Seedance 2.0', '视频生成', '使用教程'] },
          { id: 'seedance25-tutorial', title: 'Seedance 2.5 使用教程', sourceFile: 'posts/tutorial/seedance25-tutorial.html', tags: ['Seedance 2.5', '视频生成', '使用教程'] }
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
    introduction: {
      id: 'development-foundations-introduction',
      title: '篇章引言：理解软件如何被构建与协作',
      sourceFile: 'posts/domain-introductions/development-foundations.html',
      tags: ['开发基础', '工程协作', '工程基础']
    },
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
    description: '把模型能力转化为可评估、可维护的 AI 系统与业务流程。',
    accent: '#c7a1ee',
    introduction: {
      id: 'application-practice-introduction',
      title: '篇章引言：把模型能力转化为业务系统',
      sourceFile: 'posts/domain-introductions/application-practice.html',
      tags: ['应用实践', 'AI 系统', '工程落地']
    },
    sections: [
      {
        id: 'llm-applications',
        title: 'LLM 应用',
        description: '从 Agent、评测体系到大模型推荐系统实践。',
        articles: [
          { id: 'ai-agent-intro', title: 'AI Agent 概念入门', sourceFile: 'posts/llm/ai-agent-intro.html', tags: ['AI', 'Agent', 'LLM'] },
          { id: 'agent-evaluation', title: '测评1：Agent 开发中的评测体系', sourceFile: 'posts/llm/agent-evaluation.html', tags: ['AI', 'Agent', '评测'] },
          { id: 'agent-evaluation2', title: '测评2：多模态评测集构建实战', sourceFile: 'posts/llm/agent-evaluation2.html', tags: ['AI', 'Agent', '多模态'] },
          { id: 'llm-recommender-systems', title: '大模型与推荐系统：LLM + RS 与 LLM as RS', sourceFile: 'posts/llm/llm-recommender-systems.html', tags: ['LLM', '推荐系统', '生成式推荐'] }
        ]
      },
      {
        id: 'real-world-cases',
        title: '真实案例',
        description: '从真实业务约束出发，复盘 AI 系统的落地路径与工程取舍。',
        articles: [
          { id: 'ctrip-customer-service-ai', title: '携程客服 AI 转型：传统机器人与 LLM 的协同', sourceFile: 'posts/cases/ctrip-customer-service-ai.html', tags: ['客服 AI', 'LLM', '知识治理'] },
          { id: 'llm-data-analysis', title: 'LLM 与数据分析：从写 SQL 到可信问数', sourceFile: 'posts/cases/llm-data-analysis.html', tags: ['LLM', '数据分析', 'Text-to-SQL', '数据治理'] }
        ]
      }
    ]
  },
  {
    id: 'ecommerce-business',
    index: '05',
    title: '电商业务',
    englishTitle: 'E-commerce Business',
    description: '面向新人建立电商业务全景，理解中国本土与跨境电商的交易、经营和履约链路。',
    accent: '#d98c5f',
    introduction: {
      id: 'ecommerce-business-introduction',
      title: '篇章引言：电商业务的基础地图',
      sourceFile: 'posts/domain-introductions/ecommerce-business.html',
      tags: ['电商基础', '中国本土电商', '跨境电商']
    },
    sections: [
      {
        id: 'ecommerce-foundations',
        title: '电商基础',
        description: '从商品、流量、交易、履约和复购理解电商的基本经营链路。',
        articles: [
          {
            id: 'ecommerce-business-basics',
            title: '电商基础（一）：商品、流量、交易、履约与复购',
            sourceFile: 'posts/ecommerce/ecommerce-business-basics.html',
            tags: ['电商基础', '交易链路', '经营指标', '新人入门']
          },
          {
            id: 'product-category-spu-sku',
            title: '电商基础（二）：商品、类目、SPU 与 SKU',
            sourceFile: 'posts/ecommerce/product-category-spu-sku.html',
            tags: ['电商基础', '商品建模', 'SPU/SKU', '商品数据']
          },
          {
            id: 'traffic-conversion-funnel',
            title: '电商基础（三）：流量、转化漏斗与用户决策',
            sourceFile: 'posts/ecommerce/traffic-conversion-funnel.html',
            tags: ['电商基础', '流量分析', '转化漏斗', '用户决策']
          },
          {
            id: 'pricing-promotions-orders-payments',
            title: '电商基础（四）：价格、促销、订单与支付',
            sourceFile: 'posts/ecommerce/pricing-promotions-orders-payments.html',
            tags: ['电商基础', '价格与促销', '订单系统', '支付']
          },
          {
            id: 'inventory-warehousing-logistics-aftersales',
            title: '电商基础（五）：库存、仓储、物流与售后',
            sourceFile: 'posts/ecommerce/inventory-warehousing-logistics-aftersales.html',
            tags: ['电商基础', '库存管理', '仓储物流', '售后']
          },
          {
            id: 'gmv-revenue-gross-profit-analysis',
            title: '电商基础（六）：GMV、收入、毛利与经营分析',
            sourceFile: 'posts/ecommerce/gmv-revenue-gross-profit-analysis.html',
            tags: ['电商基础', 'GMV', '毛利分析', '经营指标']
          }
        ]
      },
      {
        id: 'domestic-ecommerce',
        title: '中国本土电商',
        description: '理解平台电商、内容电商、即时零售与私域经营的差异。',
        articles: [
          {
            id: 'china-ecommerce-platform-models',
            title: '中国本土电商（一）：从淘宝到抖音，理解平台电商的主要模式',
            sourceFile: 'posts/ecommerce/china-ecommerce-platform-models.html',
            tags: ['中国本土电商', '平台电商', '内容电商', '即时零售']
          }
        ]
      },
      {
        id: 'cross-border-ecommerce',
        title: '跨境电商',
        description: '围绕市场选择、平台与独立站、跨境履约、支付和合规建立基础认知。',
        articles: []
      }
    ]
  },
  {
    id: 'other',
    index: '06',
    title: '其他',
    englishTitle: 'Observations',
    description: '在技术地图之外，持续观察产业、商业与长期变化。',
    accent: '#e0c775',
    introduction: {
      id: 'other-introduction',
      title: '篇章引言：在技术之外观察长期变化',
      sourceFile: 'posts/domain-introductions/other.html',
      tags: ['产业观察', '商业分析', '长期变化']
    },
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
