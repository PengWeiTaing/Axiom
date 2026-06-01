/// Axiom Desktop — Tauri v2 shell wrapping the Vite + Vue 3 frontend.
///
/// Automatically starts the Flask backend on launch and stops it on exit.

use std::process::{Child, Command};
use std::sync::Mutex;
use tauri::Manager;

struct Backend(Mutex<Option<Child>>);

impl Drop for Backend {
    fn drop(&mut self) {
        if let Ok(mut guard) = self.0.lock() {
            if let Some(ref mut child) = *guard {
                let _ = child.kill();
            }
        }
    }
}

fn start_flask() -> Option<Child> {
    let project_root = std::env::current_dir().ok()?;
    let python = if cfg!(windows) { "python" } else { "python3" };

    let child = Command::new(python)
        .args(["-c", &format!(
            "import os, sys; os.chdir(r'{}'); sys.path.insert(0, '.'); \
             os.environ.setdefault('AXIOM_ROOT', r'{}'); \
             os.environ.setdefault('AXIOM_SECRET_KEY', 'axiomnb'); \
             from core._common import app, init_app_storage; \
             init_app_storage(); \
             from core.routes.core import register_routes as rc; \
             from core.routes.boards import register_routes as rb; \
             rc(app); rb(app); \
             from flask import send_file; from pathlib import Path; \
             @app.route('/board', defaults={{'_subpath': ''}}, strict_slashes=False); \
             @app.route('/board/<path:_subpath>', strict_slashes=False); \
             def _bs(_subpath): \
                 fp = Path(app.static_folder).resolve() / 'v2' / 'board' / 'index.html'; \
                 return send_file(str(fp), mimetype='text/html') if fp.exists() else ('not built', 404); \
             app.run(host='127.0.0.1', port=5000, debug=False)",
            project_root.display(), project_root.display()
        )])
        .stdout(std::process::Stdio::null())
        .stderr(std::process::Stdio::null())
        .spawn()
        .ok()?;

    Some(child)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let backend = Backend(Mutex::new(start_flask()));

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .setup(move |app| {
            // wait for Flask to be ready
            let handle = app.handle().clone();
            std::thread::spawn(move || {
                for _ in 0..30 {
                    if ureq::get("http://127.0.0.1:5000/health").call().is_ok() {
                        handle.emit("backend-ready", ()).ok();
                        break;
                    }
                    std::thread::sleep(std::time::Duration::from_millis(500));
                }
            });
            Ok(())
        })
        .manage(backend)
        .run(tauri::generate_context!())
        .expect("error while running Axiom desktop app");
}
