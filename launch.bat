@echo off
title Axiom — 个人外脑系统
cd /d "%~dp0"

echo.
echo   Axiom — 个人外脑系统
echo   ======================
echo.

REM 检查 Flask 是否已在运行
curl -s -o NUL http://127.0.0.1:5000/health 2>NUL
if %errorlevel% equ 0 (
    echo   [OK] 后端已运行
    goto :open
)

echo   [..] 启动后端服务...
start "Axiom Backend" /B cmd /c "cd /d %~dp0 && python -m flask run --host=127.0.0.1 --port=5000 > logs\server.log 2>&1"

REM 等待后端就绪
:wait
timeout /t 1 /nobreak >NUL
curl -s -o NUL http://127.0.0.1:5000/health 2>NUL
if %errorlevel% neq 0 goto :wait

echo   [OK] 后端就绪
:open
echo   [>>] 打开浏览器...
start "" "http://127.0.0.1:5000/app"
echo.
echo   已启动。关闭此窗口不会停止后端。
echo.
timeout /t 3 >NUL
exit
