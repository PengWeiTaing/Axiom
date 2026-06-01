/// Axiom Desktop — Tauri v2 shell wrapping the Vite + Vue 3 frontend.
///
/// Currently no custom Rust commands; plugins handle shell, dialog, filesystem,
/// and HTTP access. Custom IPC commands can be added here later.

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .run(tauri::generate_context!())
        .expect("error while running Axiom desktop app");
}
