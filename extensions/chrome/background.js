// Axiom Chrome Extension — Background Service Worker

const AXIOM_BASE = "https://pengweitai.me";

// Create context menu on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-to-axiom",
    title: "保存到 Axiom",
    contexts: ["page", "selection", "link", "image"]
  });
  chrome.contextMenus.create({
    id: "save-selection-to-axiom",
    title: "保存选中文字到 Axiom",
    contexts: ["selection"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const key = await getKey();
  if (!key) {
    chrome.action.openPopup();
    return;
  }

  let text = "";
  if (info.menuItemId === "save-to-axiom") {
    if (info.selectionText) {
      text = info.selectionText;
    } else if (info.linkUrl) {
      text = `${info.linkUrl}`;
    } else {
      text = `${tab.title}\n${tab.url}`;
    }
  } else if (info.menuItemId === "save-selection-to-axiom") {
    text = info.selectionText;
  }

  if (text) {
    await fetch(`${AXIOM_BASE}/add?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, source: "chrome_extension" })
    });
  }
});

// Handle keyboard shortcut (Ctrl+Shift+S)
chrome.commands?.onCommand?.addListener(async (command) => {
  if (command === "save-current-page") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const key = await getKey();
    if (tab && key) {
      await fetch(`${AXIOM_BASE}/add?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `${tab.title}\n${tab.url}`, source: "chrome_extension" })
      });
    }
  }
});

async function getKey() {
  const result = await chrome.storage.local.get("axiomKey");
  return result.axiomKey || "";
}
