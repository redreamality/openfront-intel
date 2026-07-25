import type { LegalDocuments } from './legal';

const projectIssues = 'https://github.com/redreamality/openfront-intel/issues';
const newIssue = 'https://github.com/redreamality/openfront-intel/issues/new';
const upstreamIssues = 'https://github.com/openfrontio/OpenFrontIO/issues';

export const zhLegalDocuments: LegalDocuments = {
  privacy: {
    title: '隐私政策',
    description: 'OpenFront 情报站如何使用分析工具、Cookie、托管日志，以及访客可行使的隐私选择。',
    eyebrow: '隐私',
    lead: '用清晰的语言说明这个静态社区网站会处理哪些信息，以及为什么处理。',
    updatedLabel: '最后更新',
    updatedDate: '2026 年 7 月 25 日',
    relatedHeading: '相关信息',
    backHome: '返回首页',
    sections: [
      {
        heading: '适用范围与运营者',
        paragraphs: [
          'OpenFront 情报站是由社区维护、独立于 OpenFront.io 的资料站。本网站由 OpenFront Intel 项目维护者运营，并非 OpenFront.io 官方服务。',
          '本政策适用于访问本站的行为。前往 OpenFront.io、GitHub、Google 或其他外部服务后，将适用对应服务自己的隐私规则。',
        ],
      },
      {
        heading: '访问网站时处理的信息',
        paragraphs: [
          '本站没有用户账号、评论、结账流程或第一方联系表单；静态页面也不会建立本站自己的访客画像数据库。',
        ],
        bullets: [
          '托管与传输数据：GitHub Pages 及网络服务商可能处理 IP 地址、请求网址、日期和时间、浏览器或 User-Agent、来源页面以及安全日志，用于传输和保护网站。',
          'Google Analytics：只有在您选择“允许统计”后，本站才会加载衡量 ID 为 G-7R6FVF17YG 的 Google 代码。此后 Google 可能接收页面网址、来源页面、浏览器与设备特征、语言、由网络连接推断的大致地区，以及互动或性能事件。我们不会有意向 Analytics 发送姓名、邮箱、OpenFront 账号或消息内容。',
          '您在 GitHub 发布的信息：如果您创建 issue、发表评论或提交贡献，GitHub 会处理这些信息，而内容通常会公开显示。',
        ],
      },
      {
        heading: 'Cookie、网站分析与未来广告',
        paragraphs: [
          '同意统计后，Google Analytics 可能使用 _ga 等 Cookie。选择“仅必要功能”时，Analytics 代码不会加载。您可以随时从页脚重新打开 Cookie 设置、修改选择或清除站点存储；任何选择都不影响阅读内容。',
          '截至上方所示日期，本站仅提供可选的 Google Analytics，尚未展示 Google AdSense 广告。如果未来启用 AdSense，Google 及其广告合作伙伴可能放置或读取 Cookie、使用网络信标或类似技术，并处理本地存储、设备标识符、IP 地址、大致位置、页面上下文和广告互动数据，以投放广告、限制频次、衡量效果、防止欺诈或个性化广告。在法律要求的地区，广告代码启用前将由 Google 认证的同意管理平台收集广告选择。',
        ],
        links: [
          {
            href: 'https://policies.google.com/privacy?hl=zh-CN',
            label: 'Google 隐私权政策',
            description: '了解 Google 如何在 Analytics 和广告服务中处理数据。',
          },
          {
            href: 'https://policies.google.com/technologies/partner-sites?hl=zh-CN',
            label: 'Google 如何使用采用其服务的网站或应用提供的信息',
            description: '了解 Google 在合作伙伴网站上如何处理 Cookie、标识符、IP 地址及相关数据。',
          },
          {
            href: 'https://tools.google.com/dlpage/gaoptout?hl=zh-CN',
            label: 'Google Analytics 停用浏览器插件',
            description: 'Google 提供的 Analytics 衡量停用工具。',
          },
          {
            href: 'https://support.google.com/My-Ad-Center-Help/answer/12155764?hl=zh-Hans',
            label: 'Google 广告隐私控制',
            description: '未来若启用广告，可在此了解和调整相关控制。',
          },
        ],
      },
      {
        heading: '处理目的与法律依据',
        bullets: [
          '传输和保护网站、诊断滥用，并维持网站可用。',
          '了解整体访问量、热门页面、设备与性能，以改进资料内容和体验。',
          '处理通过 GitHub 提交的勘误、隐私请求和内容贡献。',
        ],
        paragraphs: [
          '网站传输和安全基于运营服务的正当需要。无论访客所在地区，可选的 Analytics 衡量都只会在访客作出明确同意后启用。',
        ],
      },
      {
        heading: '服务商、披露与跨境传输',
        paragraphs: [
          'GitHub 提供代码仓库与 Pages 托管，Google 提供 Analytics。服务商依据各自条款处理数据，也可能使用其声明的保护措施在您所在国家或地区之外处理数据。公开 issue 的内容还可能被其他人阅读和索引。',
          'OpenFront 情报站不会出售访客个人信息。法律要求、保护网站及用户，或项目运营主体发生变更时，可能在适用保障措施下披露必要信息。',
        ],
        links: [
          {
            href: 'https://docs.github.com/zh/site-policy/privacy-policies/github-general-privacy-statement',
            label: 'GitHub 一般隐私声明',
          },
          {
            href: 'https://business.safety.google/adsprocessorterms/',
            label: 'Google 广告数据处理条款',
          },
        ],
      },
      {
        heading: '保留期限',
        paragraphs: [
          '这个静态网站不保存账号或联系表单数据库。GitHub 按其政策保留托管日志和公开仓库活动。Google Analytics 的用户级事件保留期由 Analytics 媒体资源设置及 Google 条款控制；该设置位于公开仓库之外，因此可以通过下方联系渠道询问当前配置期限。用户级数据到期后，汇总报告仍可能继续保留。',
          '公开 issue 和贡献历史可能持续显示，直到依据 GitHub 与项目流程编辑或移除。项目维护者会尽量避免在超出本政策所述目的或法定义务所需期限后继续保留可识别信息。',
        ],
      },
      {
        heading: '您的选择与权利',
        bullets: [
          '使用网站提供的同意控制，并通过浏览器设置阻止或删除 Cookie 与网站存储。',
          '使用 Google Analytics 停用插件或具有隐私保护功能的浏览器工具。',
          '在适用法律规定的范围内，要求访问、更正、删除、限制或携带数据，提出反对，或撤回同意；撤回不影响此前处理的合法性。',
          '向您所在国家或地区有管辖权的数据保护机构投诉。',
        ],
        paragraphs: [
          '请通过项目 issue 跟踪器提出隐私请求。GitHub issue 是公开的：不要上传身份证件、精确住址、账号凭据或其他敏感信息。只需提供足以安排后续处理的说明；在处理与个人有关的数据前，项目维护者可能需要进行合理核验。',
        ],
        links: [
          {
            href: newIssue,
            label: '提交隐私请求',
            description: '创建公开 GitHub issue，切勿写入敏感个人信息。',
          },
        ],
      },
      {
        heading: '儿童与政策更新',
        paragraphs: [
          '本站面向一般游戏读者，不以收集儿童个人信息为目的。如果您认为儿童在项目 issue 中披露了个人信息，请及时报告，以便维护者评估移除方式。',
          '网站功能、服务商或法律要求变化时，本政策可能更新。页面顶部日期会随之调整；重大变更会在本页或项目仓库中明确展示。',
        ],
      },
      {
        heading: '联系方式',
        paragraphs: [
          '如对本政策或本站数据处理有疑问，请通过项目 issue 跟踪器联系 OpenFront Intel 维护者。这是项目目前唯一公开的联系渠道；本站不虚构私人邮箱，也不声称某位未公开身份的个人运营者。',
        ],
        links: [{ href: projectIssues, label: 'OpenFront Intel issue 跟踪器' }],
      },
    ],
  },
  contact: {
    title: '联系我们',
    description: '联系 OpenFront Intel 维护者提交勘误、隐私请求或内容贡献。',
    eyebrow: '联系',
    lead: '请使用公开的项目跟踪器，让报告保持可核验、可跟进。',
    updatedLabel: '最后更新',
    updatedDate: '2026 年 7 月 13 日',
    relatedHeading: '联系前请阅读',
    backHome: '返回首页',
    sections: [
      {
        heading: '项目联系渠道',
        paragraphs: [
          'OpenFront Intel 通过 GitHub 项目进行维护。事实勘误、坏链、无障碍问题、翻译修正、来源疑问、隐私请求以及新攻略建议，都可以提交到 issue 跟踪器。',
          '该跟踪器是公开空间，不是保密客服信箱。请勿发布密码、身份证件、精确住址、私人游戏数据或其他敏感个人信息。项目没有公开维护者姓名、通信地址、电话号码或私人邮箱，因此本页也不会虚构这些资料。',
        ],
        links: [
          { href: newIssue, label: '新建 OpenFront Intel issue' },
          { href: projectIssues, label: '查看已有 issue' },
        ],
      },
      {
        heading: '如何写出有效报告',
        bullets: [
          '提供准确的页面网址和受影响的语言版本。',
          '引用有疑问的句子或数值，并说明您认为正确的结果。',
          '如有可能，链接对应的 OpenFrontIO 文件、commit、Release 或可复现的游戏内证据。',
          '若是显示或无障碍问题，请写明浏览器、设备或视口和清晰的复现步骤，并从截图中移除个人信息。',
          '提交前搜索已有 issue，避免把同一项调查拆散。',
        ],
      },
      {
        heading: '隐私与权利请求',
        paragraphs: [
          '请先创建内容尽量少的公开 issue，说明请求类型，并询问维护者如何继续。不要公开敏感核验材料。请写明涉及哪项权利或疑虑、关联的 OpenFront Intel 或 GitHub 互动，以及大致日期。维护者可能需要合理核验，并会依据适用法律处理。',
          'Analytics 数据通常使用假名标识，且不与本站账号关联，因此项目未必能把某条 Analytics 记录对应到具名个人。浏览器控制和 Google 停用工具仍是停止未来衡量最快的方式。',
        ],
        links: [{ href: newIssue, label: '发起隐私请求' }],
      },
      {
        heading: '内容勘误与贡献',
        paragraphs: [
          '勘误会依据能够取得的最强证据核验。确认错误后，可能修改正文、重新抽取数据、更新翻译，或补充说明现有不确定性。贡献内容必须为原创或具有适当授权，并标明来源。',
          '本项目由社区维护，不承诺固定响应时限。没有立即回复并不代表报告已被拒绝。',
        ],
      },
      {
        heading: '官方游戏支持不在本站范围内',
        paragraphs: [
          'OpenFront Intel 是独立资料站，无法找回 OpenFront.io 账号、管理对局、撤销封禁、调查官方服务器事故，也不能代表游戏开发者发言。游戏 Bug 和官方项目问题请提交至 OpenFrontIO。',
        ],
        links: [{ href: upstreamIssues, label: 'OpenFrontIO 官方 issue 跟踪器' }],
      },
    ],
  },
  editorialPolicy: {
    title: '编辑政策',
    description: 'OpenFront Intel 如何研究、核验、翻译、更新并纠正网站内容。',
    eyebrow: '编辑政策',
    lead: '以可追溯来源为基础，并明确区分游戏事实、推导与战术建议。',
    updatedLabel: '最后更新',
    updatedDate: '2026 年 7 月 13 日',
    relatedHeading: '责任与透明度',
    backHome: '返回首页',
    sections: [
      {
        heading: '使命与独立性',
        paragraphs: [
          'OpenFront Intel 通过可搜索数据、机制解释、数值比较和实用策略，帮助玩家理解 OpenFront.io。本站由社区维护，不由 OpenFront.io 或 OpenFrontIO 贡献者运营，也未获得其官方批准或背书。',
          '选题依据是实用性、可核验性和对玩家的影响。无论与游戏项目的接触，还是未来可能存在的广告关系，都不能换取有利结论或压下勘误。',
        ],
      },
      {
        heading: '来源优先级',
        bullets: [
          '第一手权威来源：官方 OpenFrontIO 源码，机制、公式、单位、建筑和地图清单尽量对应到明确版本或 commit。',
          '版本笔记：仅以 GitHub 官方 Release 中有实质内容的正文为依据。“TEST”等测试版占位文字不得扩写成虚构的补丁说明。',
          '第一手测试：在当前游戏客户端中可复现的观察，用于解释行为或标记源码与实际运行不一致之处。',
          '第二手资料：社区讨论、视频或攻略可以提供调查线索，但应明确标为第二手来源；没有解释时，不得用它覆盖更强的证据。',
        ],
        links: [
          { href: 'https://github.com/openfrontio/OpenFrontIO', label: 'OpenFrontIO 官方源码仓库' },
          { href: 'https://github.com/openfrontio/OpenFrontIO/releases', label: 'OpenFrontIO 官方 Releases' },
        ],
      },
      {
        heading: '数据抽取与原创价值',
        paragraphs: [
          'src/data 中的结构化游戏数据由 scripts/extract-game-data.mjs 从本地 OpenFrontIO 源码快照生成，不进行手工修改；抽取元数据记录上游版本和生成时间。如果源码快照或抽取器落后于在线游戏，生成值仍可能过时或不完整。',
          '复制一个数值并不等于完成编辑工作。页面应补充这个数值控制什么、与其他值如何比较、公式使用哪些前提、对实战有何影响、适用哪些版本，并在可行时链接具体来源。事实、计算、推论和策略观点应当彼此可辨。',
        ],
      },
      {
        heading: '写作、审核与版本管理',
        bullets: [
          '容易随版本变化的规则，应标明适用游戏版本或最后核验日期。',
          '校验公式与计算示例，统一单位，不把四舍五入的估算写成源码精确值。',
          '可行时提供具体源码路径、commit、Release 或复现步骤，避免无出处断言。',
          '上游发布新版本后优先复查高影响页面；尚未按最新版验证的内容应明显注明限制。',
          '各语种发布前，都应核对术语、链接、数值与含义，而不是只确认句子读起来通顺。',
        ],
      },
      {
        heading: '自动化、翻译与责任',
        paragraphs: [
          '项目可能使用自动抽取、分析、写作辅助和机器翻译工具，但工具输出本身不构成权威来源。维护者仍需对发布页面负责：依据所引第一手来源核验事实，在语境中检查翻译，并披露重要的不确定性。',
          '五个语言版本以传达相同事实为目标，但可为清晰度调整措辞和例子。翻译发生冲突时，应回到第一手来源判断，而不是默认英文页面一定正确。',
        ],
      },
      {
        heading: '勘误流程',
        paragraphs: [
          '任何人都可以通过 OpenFront Intel issue 跟踪器报告错误。有效勘误应包含页面、争议文字或数值、适用游戏版本和支持来源。维护者会审查证据，并在可能时复现，然后修改页面或记录不修改的理由。',
          '重大修正应在可行时更新页面日期或附上简短说明；拼写和格式等小修可以不另行公告。生成数据的问题应在抽取脚本或源码快照中修复，不得直接手改生成的 JSON。',
        ],
        links: [{ href: newIssue, label: '报告内容错误' }],
      },
      {
        heading: '授权、署名与商业化',
        paragraphs: [
          '引用或改编材料应按其适用授权署名。贡献者不得提交抄袭文字、未经授权的图片或伪造证据。除单项另有说明外，本站内容遵循网站声明的授权。',
          '本站目前未展示 Google AdSense 广告。未来若引入广告、赞助、推广链接或获赠评测权限，都会进行披露，并与来源选择和编辑结论分开。广告位置不会改变勘误标准。',
        ],
      },
    ],
  },
};
