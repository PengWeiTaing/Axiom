#!/usr/bin/env bash
#
# 火山杯白板 — VPS 一键重建（Debian / Ubuntu）
#
# 用法（在 VPS 上以 root 或 sudo 执行）：
#     sudo bash bootstrap_firecup_vps.sh your-domain.example
#
# 脚本会交互式询问扣子令牌，输入不回显、不进入 shell 历史。
# 它是幂等的：重复执行只会更新代码与配置，不删除已有证书或数据。
#
set -euo pipefail

DOMAIN="${1:-}"
REPO_URL="${AXIOM_REPO_URL:-https://github.com/PengWeiTaing/Axiom.git}"
BRANCH="${AXIOM_BRANCH:-codex/learning-board-v1}"
APP_DIR=/opt/axiom
ENV_DIR=/etc/axiom
ENV_FILE="$ENV_DIR/firecup.env"

if [[ -z "$DOMAIN" ]]; then
    echo "用法: sudo bash $0 <域名>   例如: sudo bash $0 axiom.example.com" >&2
    exit 1
fi
if [[ $EUID -ne 0 ]]; then
    echo "请用 root 或 sudo 执行" >&2
    exit 1
fi

step() { printf '\n\033[36m==> %s\033[0m\n' "$*"; }
warn() { printf '\033[33m    [!] %s\033[0m\n' "$*"; }
ok()   { printf '\033[32m    [+] %s\033[0m\n' "$*"; }

if ! command -v apt-get >/dev/null 2>&1; then
    echo "本脚本按 Debian / Ubuntu 编写，但这台机器上没有 apt-get。" >&2
    echo "系统信息：$(. /etc/os-release 2>/dev/null && echo "$PRETTY_NAME" || uname -a)" >&2
    echo "请把上面这行发回，换成对应发行版的包管理器再跑。" >&2
    exit 1
fi

# ---------------------------------------------------------------- 1. DNS 预检
step "1/8 检查 $DOMAIN 是否解析到这台机器"
SERVER_IP="$(curl -fsS --max-time 10 https://api.ipify.org || echo '')"
DOMAIN_IP="$(getent hosts "$DOMAIN" | awk '{print $1}' | head -n1 || echo '')"
echo "    本机公网 IP : ${SERVER_IP:-未知}"
echo "    域名解析到  : ${DOMAIN_IP:-未解析}"
if [[ -n "$SERVER_IP" && -n "$DOMAIN_IP" && "$SERVER_IP" != "$DOMAIN_IP" ]]; then
    warn "域名没有指向这台机器。证书签发会失败——先去 DNS 面板改 A 记录，等生效后再跑本脚本。"
    warn "如果只是想先把服务装好，可以继续；最后一步申请证书会跳过。"
    read -r -p "    继续吗？[y/N] " cont
    [[ "$cont" == "y" || "$cont" == "Y" ]] || exit 1
elif [[ -z "$DOMAIN_IP" ]]; then
    warn "域名当前没有解析记录，后面的证书步骤会跳过。"
fi

# ------------------------------------------------------------ 2. 系统依赖
step "2/8 安装系统依赖"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq git python3 python3-venv python3-pip nginx curl >/dev/null
ok "git / python3 / nginx 就绪"

# ------------------------------------------------------------ 3. 拉取代码
step "3/8 部署代码到 $APP_DIR（分支 $BRANCH）"
if [[ -d "$APP_DIR/.git" ]]; then
    git -C "$APP_DIR" remote set-url origin "$REPO_URL"
    git -C "$APP_DIR" fetch --depth 1 origin "$BRANCH"
    git -C "$APP_DIR" checkout -B "$BRANCH" "origin/$BRANCH"
    ok "已更新到最新提交"
else
    mkdir -p "$APP_DIR"
    git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
    ok "已克隆仓库"
fi

if [[ ! -f "$APP_DIR/core/static/board/index.html" ]]; then
    echo "    [x] 仓库里没有前端构建产物 core/static/board/index.html" >&2
    echo "        这个分支应当已包含构建结果，请确认分支名是否正确。" >&2
    exit 1
fi
ok "前端构建产物已随仓库提供，无需在服务器上装 Node"

# ------------------------------------------------------------ 4. Python 环境
step "4/8 建立 Python 虚拟环境"
if [[ ! -x "$APP_DIR/.venv/bin/python" ]]; then
    python3 -m venv "$APP_DIR/.venv"
fi
"$APP_DIR/.venv/bin/pip" install --quiet --upgrade pip
"$APP_DIR/.venv/bin/pip" install --quiet -r "$APP_DIR/requirements.txt"
ok "依赖安装完成（含 gunicorn）"

# ------------------------------------------------------------ 5. 机密配置
step "5/8 写入 $ENV_FILE"
mkdir -p "$ENV_DIR"
chmod 700 "$ENV_DIR"

EXISTING_TOKEN=""
EXISTING_WORKFLOW=""
if [[ -f "$ENV_FILE" ]]; then
    EXISTING_TOKEN="$(grep -oP '^COZE_API_TOKEN=\K.*' "$ENV_FILE" || true)"
    EXISTING_WORKFLOW="$(grep -oP '^COZE_WORKFLOW_ID=\K.*' "$ENV_FILE" || true)"
fi

if [[ -n "$EXISTING_TOKEN" ]]; then
    read -r -p "    已存在扣子令牌，保留它吗？[Y/n] " keep
    [[ "$keep" == "n" || "$keep" == "N" ]] && EXISTING_TOKEN=""
fi

COZE_TOKEN="$EXISTING_TOKEN"
if [[ -z "$COZE_TOKEN" ]]; then
    # -s 不回显，令牌不会出现在屏幕或 shell 历史里
    read -r -s -p "    粘贴扣子 PAT（只需 workflow run 权限）: " COZE_TOKEN
    echo
fi

COZE_WORKFLOW="$EXISTING_WORKFLOW"
read -r -p "    扣子工作流 ID [${EXISTING_WORKFLOW:-必填}]: " input_workflow
[[ -n "$input_workflow" ]] && COZE_WORKFLOW="$input_workflow"

if [[ -z "$COZE_TOKEN" || -z "$COZE_WORKFLOW" ]]; then
    warn "令牌或工作流 ID 为空：服务仍会启动，但只能返回离线场景。"
fi

umask 077
cat > "$ENV_FILE" <<EOF
# 火山杯生成网关配置 — 由 bootstrap_firecup_vps.sh 生成
COZE_API_TOKEN=$COZE_TOKEN
COZE_WORKFLOW_ID=$COZE_WORKFLOW
COZE_API_BASE=https://api.coze.cn
COZE_TIMEOUT_SECONDS=300

# 前端与网关同源部署，这里就是站点自己的 Origin。不要写 * 或带路径。
FIRECUP_ALLOWED_ORIGINS=https://$DOMAIN
FIRECUP_WORKFLOW_REVISION=v0.0.7

FIRECUP_JOB_TTL_SECONDS=1800
FIRECUP_JOB_MAX_ENTRIES=128
FIRECUP_JOB_QUEUE_MAX_ENTRIES=8
EOF
chmod 600 "$ENV_FILE"
ok "配置已写入（权限 600，令牌不进仓库）"

# ------------------------------------------------------------ 6. systemd
step "6/8 注册 systemd 服务"
install -m 644 "$APP_DIR/deploy/axiom-firecup-gateway.service" \
    /etc/systemd/system/axiom-firecup-gateway.service
systemctl daemon-reload
systemctl enable --quiet axiom-firecup-gateway
systemctl restart axiom-firecup-gateway
sleep 3

if ! systemctl is-active --quiet axiom-firecup-gateway; then
    echo "    [x] 网关启动失败，最近日志：" >&2
    journalctl -u axiom-firecup-gateway -n 30 --no-pager >&2
    exit 1
fi
HEALTH="$(curl -fsS --max-time 5 http://127.0.0.1:5010/health || echo '')"
ok "网关已运行：$HEALTH"

# ------------------------------------------------------------ 7. Nginx
step "7/8 配置 Nginx"
install -m 644 "$APP_DIR/deploy/nginx/axiom-firecup-limit.conf" \
    /etc/nginx/conf.d/axiom-firecup-limit.conf
mkdir -p /etc/nginx/snippets
install -m 644 "$APP_DIR/deploy/nginx/axiom-firecup-location.inc" \
    /etc/nginx/snippets/axiom-firecup-location.inc

cat > /etc/nginx/sites-available/axiom-firecup <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN;

    # certbot 续期用；其余一律跳 HTTPS（证书装好后此 server 由 certbot 改写）
    location /.well-known/acme-challenge/ { root /var/www/html; }
    location / { return 301 https://\$host\$request_uri; }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $DOMAIN;

    # 证书路径由 certbot 在第 8 步接管；未签发时本 server 不会生效。
    ssl_certificate     /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;

    root $APP_DIR/core/static;

    # 打开即是白板：/ 与 /board 都返回同一个入口页
    location = / { try_files /board/index.html =404; }
    location = /board { try_files /board/index.html =404; }

    # 构建产物按 vite 的 base 路径 /static/board/ 提供
    location /static/board/ {
        alias $APP_DIR/core/static/board/;
        try_files \$uri \$uri/ =404;
        expires 1h;
    }

    # 生成接口反代到 127.0.0.1:5010，含分级限流
    include /etc/nginx/snippets/axiom-firecup-location.inc;

    location = /health {
        proxy_pass http://127.0.0.1:5010;
        proxy_set_header Host \$host;
    }
}
EOF

ln -sf /etc/nginx/sites-available/axiom-firecup /etc/nginx/sites-enabled/axiom-firecup
rm -f /etc/nginx/sites-enabled/default

# 证书还没签发时 443 的 server 会让 nginx -t 失败，先只留 80 把 certbot 跑通
if [[ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]]; then
    warn "还没有证书，先以 HTTP 模式启动 Nginx"
    sed -i '/listen 443 ssl http2;/,$d' /etc/nginx/sites-available/axiom-firecup
    echo '}' >> /etc/nginx/sites-available/axiom-firecup
fi

nginx -t
systemctl reload nginx
ok "Nginx 已加载"

# ------------------------------------------------------------ 8. HTTPS
step "8/8 申请 HTTPS 证书"
if [[ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]]; then
    ok "证书已存在，跳过签发"
    systemctl reload nginx
elif [[ -z "$DOMAIN_IP" || ( -n "$SERVER_IP" && "$SERVER_IP" != "$DOMAIN_IP" ) ]]; then
    warn "域名未指向本机，跳过签发。改好 DNS 后执行："
    warn "  certbot --nginx -d $DOMAIN"
else
    apt-get install -y -qq certbot python3-certbot-nginx >/dev/null
    certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos \
        --register-unsafely-without-email --redirect
    ok "证书签发完成"
fi

# ---------------------------------------------------------------- 完成
printf '\n\033[32m部署完成\033[0m\n'
echo "  白板地址 : https://$DOMAIN/board"
echo "  健康检查 : curl https://$DOMAIN/health"
echo "  网关日志 : journalctl -u axiom-firecup-gateway -f"
echo "  重启网关 : systemctl restart axiom-firecup-gateway"
echo
echo "  /health 里 workflow_configured=true 才表示扣子已接通。"
echo "  改了令牌或工作流 ID 后要执行：systemctl restart axiom-firecup-gateway"
echo
