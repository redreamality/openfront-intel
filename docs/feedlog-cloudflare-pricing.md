# Feedlog 的 Cloudflare 计费评估

> 核验日期：2026-07-27。金额均为美元，未含税。本文只计算 Cloudflare Workers、Hyperdrive 与 R2；域名和实际 PostgreSQL/MySQL 数据库费用不在内。

## 结论

- 低流量 Feedlog 可以先用 **Workers Free + Hyperdrive Free + R2 Standard 免费层**，Cloudflare 侧预计为 **$0/月**。
- **Hyperdrive 和 R2 都不要求 Workers Paid**。Hyperdrive 同时包含在 Free/Paid Workers 计划中；R2 需单独完成 R2 subscription checkout，但官方说明可从包含月度免费用量的免费层开始，没有固定 $5 月费。
- 需要更宽裕的 Worker CPU、或不接受 Hyperdrive 每日 100,000 条数据库语句的硬上限时，再升级 **Workers Paid，最低 $5/账户/月**。
- Hyperdrive 是现有数据库的连接池、查询缓存和加速层，**不是数据库托管服务**。不用 AWS 没问题，但仍需另备一个可公网连接的 PostgreSQL/MySQL 兼容数据库并承担其费用。

## 官方价格表

| 产品 | 免费额度 | 付费门槛与超额价格 | 必须 Workers Paid？ |
| --- | --- | --- | --- |
| Workers | 100,000 个动态请求/日；每次调用最多 10 ms CPU；静态资源请求免费且无限 | Paid 最低 $5/账户/月，含 10M 请求/月和 30M CPU-ms/月；超额 $0.30/百万请求、$0.02/百万 CPU-ms；不收 duration、带宽或 egress 费。Free 超限不会自动按量收费，而是受限/失败 | 否；默认就是 Free |
| Hyperdrive | 100,000 条数据库语句/日，00:00 UTC 重置；SELECT、写入和 DDL 都计数 | Free 超限后后续操作报错，无超额单价；Workers Paid 下查询数量 Unlimited。连接池、查询缓存和 egress 均不另收费 | 否；Free 和 Paid 都包含。只有要取消每日查询硬上限时才需 Paid |
| R2 Standard | 10 GB-month/月；1M Class A/月；10M Class B/月；公网 egress 免费 | 超额存储 $0.015/GB-month；Class A $4.50/百万；Class B $0.36/百万。付费用量按官方计费单位向上取整 | 否；需单独开通 R2 subscription，但包含免费月度用量 |
| R2 Infrequent Access | 无免费层 | 存储 $0.01/GB-month；Class A $9/百万；Class B $0.90/百万；读取处理 $0.01/GB；最短存储 30 天；egress 免费 | 否，但不适合低流量 Feedlog 的小对象起步场景 |

来源（均访问于 2026-07-27）：

- Cloudflare Workers Pricing（页面标注 Last updated 2026-07-07）：<https://developers.cloudflare.com/workers/platform/pricing/>
- Cloudflare Hyperdrive Pricing（页面标注 Last updated 2026-06-18）：<https://developers.cloudflare.com/hyperdrive/platform/pricing/>
- Cloudflare Hyperdrive Get started（说明其连接到 existing databases）：<https://developers.cloudflare.com/hyperdrive/get-started/>
- Cloudflare R2 Pricing（页面标注 Last updated 2026-05-28）：<https://developers.cloudflare.com/r2/pricing/>
- Cloudflare R2 Get started（说明需 R2 subscription、包含免费月度用量并按月计费）：<https://developers.cloudflare.com/r2/get-started/>

## 低流量 Feedlog 月成本模型

假设每月 10,000 个动态 API 请求、每请求平均 3 条 SQL（约 1,000 条/日）、R2 存放 1 GB 附件并发生 100 次上传与 1,000 次读取，且 Worker 每次 CPU 不超过 10 ms、R2 使用 Standard：

| 项目 | 估算用量 | 月费 |
| --- | ---: | ---: |
| Workers Free | 10,000 请求/月，远低于 100,000/日 | $0 |
| Hyperdrive Free | 约 1,000 条语句/日，远低于 100,000/日 | $0 |
| R2 Standard | 1 GB、100 A、1,000 B，均在免费层内 | $0 |
| **Cloudflare 小计** |  | **$0/月** |

若升级 Workers Paid，以上用量仍在 Paid 内含额度中，因此 Cloudflare 小计约为 **$5/月**；R2 和 Hyperdrive 不会再增加费用。实际数据库托管费需单独加入。

## 部署建议

1. 起步使用 Workers Free、Hyperdrive Free、R2 Standard，预计 Cloudflare 账单为 $0。
2. 监控 Worker CPU 和 Hyperdrive 每日语句数。Free Hyperdrive 超限是中断服务，不是产生小额超额账单，因此应设置告警。
3. Worker 经常接近 10 ms CPU 上限，或 Hyperdrive 接近 100,000 条/日时，再升级 Workers Paid，并按 $5/月作为最低预算。
4. 不要把 Hyperdrive 当作数据库预算；选择非 AWS 的 PostgreSQL/MySQL 提供方时，另做价格、备份、区域和连接数评估。
