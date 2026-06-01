# 在桌面创建 Axiom 启动快捷方式
$ErrorActionPreference = "Stop"

$desktop = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktop "Axiom.lnk"
$targetPath = Join-Path $PSScriptRoot "..\launch.bat"
$iconPath = Join-Path $PSScriptRoot "..\core\static\icons\axiom-mark.svg"

Write-Host "桌面: $desktop"
Write-Host "目标: $targetPath"

$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut($shortcutPath)
$Shortcut.TargetPath = $targetPath
$Shortcut.WorkingDirectory = Split-Path $targetPath -Parent
$Shortcut.Description = "Axiom — 个人外脑系统"
$Shortcut.WindowStyle = 7  # Minimized

if (Test-Path $iconPath) {
    $Shortcut.IconLocation = $iconPath
}

$Shortcut.Save()
Write-Host "[OK] 快捷方式已创建: $shortcutPath"
Write-Host ""
Write-Host "双击桌面上的 'Axiom' 即可启动。"
