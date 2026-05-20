// Axiom Extension — Popup Logic

const BASE = "https://pengweitai.me";
let key = "";

const $ = (id) => document.getElementById(id);

// Init
chrome.storage.local.get("axiomKey", (result) => {
  key = result.axiomKey || "";
  if (key) {
    $("setup-view").style.display = "none";
    $("main-view").style.display = "";
    $("quick-input").focus();
  }
});

// Save key
$("save-key-btn").addEventListener("click", () => {
  key = $("key-input").value.trim();
  if (!key) return;
  chrome.storage.local.set({ axiomKey: key }, () => {
    $("setup-view").style.display = "none";
    $("main-view").style.display = "";
    $("quick-input").focus();
  });
});

$("key-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") $("save-key-btn").click();
});

// Send text to Axiom
async function sendToAxiom(text) {
  if (!key) { feedback("请先设置 key", "error"); return; }
  feedback("保存中...", "");
  try {
    const r = await fetch(`${BASE}/add?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, source: "edge_extension" }),
    });
    if (r.ok) { feedback("已保存", "ok"); $("quick-input").value = ""; }
    else { feedback("保存失败: " + r.status, "error"); }
  } catch (e) { feedback("网络错误", "error"); }
}

// Quick input
$("send-btn").addEventListener("click", () => {
  const text = $("quick-input").value.trim();
  if (text) sendToAxiom(text);
});

$("quick-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    const text = $("quick-input").value.trim();
    if (text) sendToAxiom(text);
  }
});

// Save current page
$("save-page-btn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) {
    const sel = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString().trim(),
    });
    const selected = sel?.[0]?.result || "";
    const text = selected || `${tab.title}\n${tab.url}`;
    sendToAxiom(text);
  }
});

// Fetch URL (Bilibili etc)
$("save-url-btn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab && key) {
    feedback("抓取中...", "");
    try {
      const r = await fetch(`${BASE}/fetch?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: tab.url }),
      });
      if (r.ok) {
        const d = await r.json();
        feedback(`已抓取: ${d.item?.original_name || tab.title}`, "ok");
      } else { feedback("抓取失败", "error"); }
    } catch (e) { feedback("网络错误", "error"); }
  }
});

function feedback(msg, cls) {
  const el = $("feedback");
  el.textContent = msg;
  el.className = "feedback feedback-" + cls;
}
