<#
  火山杯答辩演示 — 一键启动

  用法（在仓库根目录）：
      pwsh -File scripts\start_firecup_demo.ps1

  上一轮服务还开着时加 -ReplaceRunning；端口被别的程序占用时用 -Port 5050 换一个。

  只想跑离线精品场景时什么都不用配。要演示真实扣子生成，先设好：
      $env:COZE_API_TOKEN = '<只有 run 权限的 PAT>'
      $env:COZE_WORKFLOW_ID = '<已发布的 v2 工作流 ID>'
  再运行本脚本；令牌只留在当前进程里，不写入仓库。
#>

[CmdletBinding()]
param(
    [int]$Port = 5000,
    [switch]$NoBrowser,
    # 端口已被上一轮演示占用时，加这个开关自动停掉那个 python 实例。
    [switch]$ReplaceRunning
)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot

Write-Host ''
Write-Host '  Axiom 学习白板 — 火山杯演示' -ForegroundColor Cyan
Write-Host "  仓库：$repoRoot"
Write-Host ''

# 1) 检查端口占用。
#    Windows 不会阻止第二个进程绑定同一端口。两个实例并存时请求被随机分流，
#    旧代码会冒充新代码答错——现场最难查的一类故障，所以这里先挡住。
$stale = @()
try {
    $stale = @(Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction Stop |
        Select-Object -ExpandProperty OwningProcess -Unique)
} catch {
    # 没有监听者时 Get-NetTCPConnection 直接报错，这是正常路径。
}

$blocked = $false
foreach ($processId in $stale) {
    $proc = Get-Process -Id $processId -ErrorAction SilentlyContinue
    if (-not $proc) { continue }

    if ($ReplaceRunning -and $proc.ProcessName -eq 'python') {
        Write-Host "  [-] 停止上一轮演示实例：PID $processId" -ForegroundColor Yellow
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
        continue
    }

    $blocked = $true
    Write-Host "  [x] 端口 $Port 已被占用：PID $processId ($($proc.ProcessName))" -ForegroundColor Red
    if ($proc.ProcessName -eq 'python') {
        Write-Host '      这多半是上一轮没关掉的演示服务。加 -ReplaceRunning 可自动停掉它：' -ForegroundColor Yellow
        Write-Host "      pwsh -File scripts\start_firecup_demo.ps1 -ReplaceRunning" -ForegroundColor Yellow
    } else {
        Write-Host '      这不是本项目的进程，脚本不会去动它。' -ForegroundColor Yellow
        Write-Host "      换个端口即可：pwsh -File scripts\start_firecup_demo.ps1 -Port 5050" -ForegroundColor Yellow
    }
}

if ($blocked) { exit 1 }

# 2) 演示所需环境变量。
$env:AXIOM_ROOT = $repoRoot
$env:AXIOM_PORT = "$Port"
$env:AXIOM_HOST = '127.0.0.1'          # 只监听本机，答辩现场不对外暴露
if (-not $env:AXIOM_SECRET_KEY) { $env:AXIOM_SECRET_KEY = 'demo-key' }
$env:AXIOM_FIRECUP_LOCAL_JOBS = '1'    # 单进程补齐比赛前端要用的 /jobs 端点

if ($env:COZE_API_TOKEN -and $env:COZE_WORKFLOW_ID) {
    if (-not $env:COZE_TIMEOUT_SECONDS) { $env:COZE_TIMEOUT_SECONDS = '300' }
    Write-Host '  [+] 扣子工作流已配置：可以演示真实生成' -ForegroundColor Green
    Write-Host '      注意：真实生成要 1-3 分钟，且未在白板里写入 Axiom key 时不会调用扣子'
} else {
    Write-Host '  [i] 未配置扣子工作流：本次只走离线精品场景' -ForegroundColor DarkGray
    Write-Host '      离线可稳定命中的两条主题见下方提示'
}
Write-Host ''

# 3) 启动服务。
Write-Host '  [*] 正在启动后端…'
$server = Start-Process -FilePath 'python' -ArgumentList '-m', 'core.receiver' `
    -WorkingDirectory $repoRoot -PassThru -NoNewWindow

# 4) 等健康检查通过再开浏览器，避免白屏。
$healthUrl = "http://127.0.0.1:$Port/health"
$ready = $false
foreach ($attempt in 1..40) {
    Start-Sleep -Milliseconds 500
    if ($server.HasExited) { break }
    try {
        $res = Invoke-RestMethod -Uri $healthUrl -TimeoutSec 2 -ErrorAction Stop
        if ($res.ok) { $ready = $true; break }
    } catch { }
}

if (-not $ready) {
    Write-Host '  [x] 后端没有就绪，请查看上面的错误输出' -ForegroundColor Red
    if (-not $server.HasExited) { Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue }
    exit 1
}

$boardUrl = "http://127.0.0.1:$Port/board"
Write-Host "  [+] 就绪：$boardUrl" -ForegroundColor Green
Write-Host ''
Write-Host '  离线可稳定命中的演示主题（逐字输入最稳）：' -ForegroundColor Cyan
Write-Host '    · 为什么定积分能算面积'
Write-Host '    · 拉格朗日乘数法为什么要求梯度平行'
Write-Host ''
Write-Host '  停止服务：在本窗口按 Ctrl+C' -ForegroundColor DarkGray
Write-Host ''

if (-not $NoBrowser) { Start-Process $boardUrl }

try {
    Wait-Process -Id $server.Id
} finally {
    if (-not $server.HasExited) { Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue }
}
