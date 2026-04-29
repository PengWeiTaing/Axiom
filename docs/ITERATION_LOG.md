# Iteration Log

这份文档只记录迭代，不讲完整架构。

## 2026-04-21

- 以 VPS 上 `/opt/axiom` 的项目快照作为当前状态基线
- 确认当前后端已经存在最小链路
- 确认核心实现集中在 `core/receiver.py`

## 2026-04-26

- 确认 `deep-research-report.md` 作为 Axiom 的长期目标来源
- 补了 `scripts/backup_axiom.py`
- 补了基础备份说明和恢复边界
- 清理了历史运行日志、本地备份 zip、`__pycache__`
- 按新的分类重构文档体系：
  - AI context
  - Human context
  - Long-term goal
  - Short-term goal
  - Project intro
  - Iteration log
  - DeepWiki
- 重写 `core/receiver.py` 为 v0.1 稳定基底
- `/add` 增加唯一文件名、临时文件写入、入库失败清理
- `/recent` 和 `/search` 统一分页边界与 JSON 错误格式
- 新增 `/health`
- `core/init_db.py` 改为复用 receiver 的建表逻辑
- 新增 `scripts/check_consistency.py`
- 新增 `scripts/smoke_test_receiver.py`
- 新增 `requirements.txt`
- 重写 DeepWiki 生成脚本，把 Wiki 改成 8 页结构化阅读入口
- 新增 `.env.example` 和 `deploy/axiom-receiver.service`
- README 和 DeepWiki 补充 VPS systemd 运行闭环
- receiver 支持 `AXIOM_LOG_PATH`，VPS 可写入 `/opt/axiom/logs/receiver.log`

## 2026-04-29

- 将 `pengweitai.me` 和 `www.pengweitai.me` 接入 VPS 上的 Axiom receiver
- 在 VPS 上配置 Nginx 反向代理，公网只暴露 `80/443`
- 使用 Let's Encrypt 为主域名签发 HTTPS 证书
- 将 receiver 改为只监听 `127.0.0.1:5000`
- 将运行 key 从默认值切换为 `axiomnb`
- 用 iPhone 快捷指令完成一次真实 `/add` 写入
- VPS 一致性检查通过：`db_file_count=1`，`inbox_file_count=1`
- 生成真实备份 `/opt/axiom/backup/axiom_backup_20260429_041507.zip`
- 完成一次备份恢复演练：将备份解压到 `/tmp` 后再次跑一致性检查并通过
- 新增 `deploy/axiom-backup.service` 和 `deploy/axiom-backup.timer`
- VPS 已启用每日自动备份，当前保留最近 14 份备份
- 手动触发 `axiom-backup.service` 成功，生成 `/opt/axiom/backup/axiom_backup_20260429_041835.zip`
- 新增 `/upload` 图片上传接口，支持 `file` 或 `image` 表单字段
- 图片上传沿用 `data/inbox` 文件落盘和 SQLite `items` 索引
- 一致性检查从只检查 txt 扩展为检查 inbox 下所有入库文件
- `.env.example` 新增 `AXIOM_MAX_UPLOAD_BYTES` 上传大小上限示例
- 本地和 VPS 冒烟测试均覆盖图片上传
- 新增 `/file/<id>` 文件取回接口，可按 item id 取回文本或图片文件
- `/file/<id>` 增加 key 校验和路径边界检查，限制只能访问 `AXIOM_ROOT` 下的文件
- VPS 已部署 `/file/<id>`，真实文本 `id=4` 和真实图片 `id=5` 均可通过 HTTPS 取回
- VPS 生产一致性检查通过：`db_file_count=2`，`inbox_file_count=2`
- 所有 item 返回增加 `file_url`，指向对应的 `/file/<id>`
- 新增 `/item/<id>` 元数据接口，真实图片 `id=5` 已通过 HTTPS 验证
- `/recent` 和 `/search` 支持 `type=text` / `type=image` 过滤
- VPS 已验证类型过滤：文本、图片和图片范围搜索均可正常返回
- 新增 `/stats` 统计接口，返回总数、按类型计数、按来源计数和首末写入时间
- VPS 已验证 `/stats`：当前生产库共 2 条，`text=1`，`image=1`
- 新增 `/archive/<id>` 归档接口，将文件从 inbox 移入 archive 并更新 `items.file_path`
- item 返回增加 `storage` 字段，用于区分 `inbox`、`archive` 等存储位置
- 一致性检查扩展到 `data/archive`，可同时发现 inbox 和 archive 的孤立文件
- VPS 已验证归档：文本 `id=4` 进入 archive 后仍可通过 `/file/4` 取回
- `/recent` 和 `/search` 支持 `storage=inbox` / `storage=archive` 过滤
- VPS 已验证存储区过滤：inbox 只返回未归档图片，archive 只返回已归档文本
- `/recent` 和 `/search` 支持 `source` 过滤
- VPS 已验证来源过滤：`source=ios_shortcut` 返回真实数据，缺失来源返回空列表
- `/stats` 增加 `by_storage`，可查看 inbox 与 archive 的文件分布
- VPS 已验证 `by_storage`：当前生产库 `inbox=1`，`archive=1`
- receiver systemd 服务从 Flask 开发服务器切换为 `gunicorn`
- VPS 已验证 `gunicorn` 仅监听 `127.0.0.1:5000`，公网仍只暴露 Nginx 的 `80/443`
- 归档后生成真实备份 `/opt/axiom/backup/axiom_backup_20260429_060457.zip`
- 已验证归档后备份可恢复：恢复目录中 `inbox=1`，`archive=1`，一致性检查通过
- 新增 `/restore/<id>` 恢复接口，可将 archive 中的文件移回 inbox 并更新 `items.file_path`
- `/restore/<id>` 对已在 inbox 的条目返回 `already restored`
- 本地与 VPS 冒烟测试均覆盖 `archive -> restore -> file/item/recent/search/stats` 闭环
- VPS 已验证真实文本 `id=4` 从 archive 恢复到 inbox，并可继续通过 `/file/4` 与 `/item/4` 访问
- VPS 当前存储分布更新为 `inbox=2`、`archive=0`
- VPS 生产一致性检查通过：`db_file_count=2`，`inbox_file_count=2`，`archive_file_count=0`
- `/recent` 与 `/search` 新增 `created_from` / `created_to` 时间范围过滤，支持 ISO 时间与 `YYYY-MM-DD`
- 时间范围过滤统一基于现有 `created_at` 字段，不新增表结构
- 非法时间范围返回 `400 invalid_created_range`
- 本地与 VPS 冒烟测试均覆盖时间过滤与非法区间校验
- VPS 已验证真实数据的时间窗口查询：可分别按 `created_to=2026-04-29T04:12:13+00:00` 与 `created_from=2026-04-29T05:27:01+00:00` 命中单条记录
- 新增 `scripts/export_items_markdown.py`，可按时间窗口、type、storage、source 导出 Markdown
- 导出脚本默认按时间正序输出，适合作为日回顾或周回顾的人工阅读底稿
- 导出脚本支持 `--output` 写入文件，也可直接输出到终端
- 本地已验证按 `created_from` 导出临时数据窗口
- VPS 已验证真实导出：`/opt/axiom` 当前 2 条数据可完整导出，且 `created_from=2026-04-29T05:27:01+00:00` 可只导出图片 `id=5`
- 新增 `scripts/build_review_markdown.py`，可直接生成日回顾与周回顾 Markdown 底稿
- 回顾脚本支持 `--window day|week`、`--date`、`--utc-offset`，并沿用现有 type、storage、source、limit 过滤
- 周回顾当前定义为“以指定日期结尾的最近 7 个自然日”
- 回顾脚本会按本地日期分组展示条目，并附带每日计数
- 本地已验证跨两天数据的 weekly review 分组与时区换算
- VPS 已验证真实 daily review 与 weekly review 输出，当前生产数据均落在 `2026-04-29` 分组下
- `.gitignore` 新增 `data/reviews/*`，避免把运行期回顾产物提交到仓库
- 新增 `scripts/save_review_snapshot.py`，可将 daily / weekly review 直接保存到 `data/reviews`
- 默认落盘路径为 `data/reviews/daily/<year>/<date>.md` 与 `data/reviews/weekly/<year>/<date>.md`
- 保存脚本默认不覆盖已有文件，需显式加 `--force` 才会重写
- 本地已验证 review snapshot 的默认落盘路径与重复写入拦截
- VPS 已真实生成 `/opt/axiom/data/reviews/daily/2026/2026-04-29.md` 与 `/opt/axiom/data/reviews/weekly/2026/2026-04-29.md`
- `build_review_markdown.py` 与 `save_review_snapshot.py` 新增 `--days-offset`
- 可通过 `--date 2026-04-30 --days-offset -1` 这类组合显式生成“昨天”的回顾
- days-offset 会同时影响时间窗口计算与默认输出文件名
- 本地已验证 offset 后锚点会落到 `2026-04-29`，且保存路径同步变为 `2026-04-29.md`
- VPS 已验证 `--days-offset -1` 可生成昨天的 daily review，并成功写入 `/tmp/axiom_daily_yesterday.md`
- 新增 `deploy/axiom-daily-review.service` / `.timer`
- 新增 `deploy/axiom-weekly-review.service` / `.timer`
- daily timer 使用 `--window day --days-offset -1`，计划在每天 `16:10 UTC` 运行，对应北京时间次日 `00:10`
- weekly timer 使用 `--window week --days-offset -1`，计划在每周日 `16:20 UTC` 运行，对应北京时间周一 `00:20`
- VPS 已启用 `axiom-daily-review.timer` 与 `axiom-weekly-review.timer`
- 手动触发 service 后，VPS 已生成 `2026-04-28` 的 daily / weekly 快照文件，当前因生产数据尚无该窗口内容，所以结果为空底稿
