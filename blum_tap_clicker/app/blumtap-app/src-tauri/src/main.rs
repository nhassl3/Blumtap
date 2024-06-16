#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;

#[tauri::command]
fn close_script() { 
    let process_name = "clicker.exe";
    let mut cmd = Command::new("taskkill"); // For windows systems ("pkill" - for UNIX)
    cmd.arg("/f"); // Forcible termination of the process
    cmd.arg("/IM").arg(process_name); // terminate process

    match cmd.output() {
        Ok(output) => {
            if output.status.success() {
                println!("Processes with name '{}' killed successfully.", process_name);
            } else {
                println!("Failed to kill processes with name '{}'.", process_name);
                if let Some(code) = output.status.code() {
                    println!("taskkill command exited with code {}.", code);
                }
            }
        },
        Err(e) => {
            println!("Error executing taskkill command: {}", e);
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![close_script])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

}
