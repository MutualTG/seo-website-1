#!/bin/bash

# SEO Agent 定时任务配置脚本
#
# 功能：
# - 配置cron定时任务
# - 每天自动运行SEO优化
# - 每周运行完整分析
#
# 使用方法：
#   chmod +x setup-cron.sh
#   ./setup-cron.sh

set -e

# 配置
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="/var/log/seo-agent"
CRON_LOG="$LOG_DIR/cron.log"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

echo_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

echo_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为root用户
check_root() {
    if [ "$EUID" -ne 0 ]; then
        echo_warn "建议以root用户运行以确保cron权限"
    fi
}

# 创建日志目录
setup_log_dir() {
    echo_info "创建日志目录..."
    mkdir -p "$LOG_DIR"
    chmod 755 "$LOG_DIR"
    echo_info "日志目录: $LOG_DIR"
}

# 安装依赖
install_dependencies() {
    echo_info "检查依赖..."

    # 检查 ts-node
    if ! command -v ts-node &> /dev/null; then
        echo_info "安装 ts-node..."
        npm install -g ts-node typescript
    fi

    # 检查 sshpass
    if ! command -v sshpass &> /dev/null; then
        echo_info "安装 sshpass..."
        if command -v apt-get &> /dev/null; then
            apt-get update && apt-get install -y sshpass
        elif command -v yum &> /dev/null; then
            yum install -y sshpass
        else
            echo_warn "请手动安装 sshpass"
        fi
    fi
}

# 创建运行脚本
create_run_script() {
    echo_info "创建运行脚本..."

    cat > "$SCRIPT_DIR/run-seo-agent.sh" << 'EOF'
#!/bin/bash

# SEO Agent 运行脚本
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"
LOG_FILE="/var/log/seo-agent/run-$(date +%Y%m%d).log"

# 设置环境变量
export NODE_ENV=production
export DATABASE_URL="postgresql://postgres:Onetg17888$@db.bsuvzqihxbgoclfvgbhx.supabase.co:5432/postgres"

# 进入项目目录
cd "$PROJECT_DIR"

# 记录开始时间
echo "========================================" >> "$LOG_FILE"
echo "开始时间: $(date)" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"

# 运行SEO Agent
npx ts-node "$SCRIPT_DIR/auto-seo-agent.ts" "$@" >> "$LOG_FILE" 2>&1

# 记录结束时间
echo "结束时间: $(date)" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
EOF

    chmod +x "$SCRIPT_DIR/run-seo-agent.sh"
    echo_info "运行脚本已创建: $SCRIPT_DIR/run-seo-agent.sh"
}

# 配置cron任务
setup_cron() {
    echo_info "配置cron定时任务..."

    # 备份现有crontab
    crontab -l > /tmp/crontab_backup 2>/dev/null || true

    # 移除旧的SEO Agent任务
    grep -v "run-seo-agent.sh" /tmp/crontab_backup > /tmp/crontab_new 2>/dev/null || true

    # 添加新任务
    cat >> /tmp/crontab_new << EOF

# ========================================
# SEO Agent 定时任务
# ========================================

# 每天凌晨3点运行文章生成 (generate 10篇)
0 3 * * * $SCRIPT_DIR/run-seo-agent.sh generate 10

# 每周日凌晨2点运行完整流程 (分析+生成+部署)
0 2 * * 0 $SCRIPT_DIR/run-seo-agent.sh full

# 每天上午9点检查并部署
0 9 * * * $SCRIPT_DIR/run-seo-agent.sh deploy

EOF

    # 应用新的crontab
    crontab /tmp/crontab_new

    echo_info "Cron任务已配置"
    echo ""
    echo "当前cron任务列表:"
    crontab -l | grep -A 100 "SEO Agent"
}

# 显示手动运行方法
show_manual_commands() {
    echo ""
    echo "=========================================="
    echo "手动运行命令"
    echo "=========================================="
    echo ""
    echo "完整流程 (分析+生成+部署):"
    echo "  $SCRIPT_DIR/run-seo-agent.sh full"
    echo ""
    echo "仅分析竞争对手:"
    echo "  $SCRIPT_DIR/run-seo-agent.sh analyze"
    echo ""
    echo "仅生成文章 (指定数量):"
    echo "  $SCRIPT_DIR/run-seo-agent.sh generate 20"
    echo ""
    echo "仅部署到VPS:"
    echo "  $SCRIPT_DIR/run-seo-agent.sh deploy"
    echo ""
    echo "查看日志:"
    echo "  tail -f /var/log/seo-agent/run-*.log"
    echo ""
}

# 测试运行
test_run() {
    echo ""
    read -p "是否立即测试运行? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo_info "运行测试..."
        "$SCRIPT_DIR/run-seo-agent.sh" help
        echo_info "测试完成"
    fi
}

# 主函数
main() {
    echo "=========================================="
    echo "SEO Agent 定时任务配置"
    echo "=========================================="
    echo ""

    check_root
    setup_log_dir
    install_dependencies
    create_run_script
    setup_cron
    show_manual_commands
    test_run

    echo ""
    echo_info "配置完成!"
}

# 运行
main
