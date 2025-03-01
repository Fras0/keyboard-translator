import { app, BrowserWindow, globalShortcut, Menu, Tray } from "electron";
import clipboard from "clipboardy";
import robot from "robotjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const qwertyToArabic: Record<string, string> = {
  q: "ض",
  w: "ص",
  e: "ث",
  r: "ق",
  t: "ف",
  y: "غ",
  u: "ع",
  i: "ه",
  o: "خ",
  p: "ح",
  "[": "ج",
  "{": "ج",
  "]": "د",
  "}": "د",
  a: "ش",
  s: "س",
  d: "ي",
  f: "ب",
  g: "ل",
  h: "ا",
  j: "ت",
  k: "ن",
  l: "م",
  ";": "ك",
  "'": "ط",
  z: "ئ",
  x: "ء",
  c: "ؤ",
  v: "ر",
  b: "لا",
  n: "ى",
  m: "ة",
  ",": "و",
  ".": "ز",
  "/": "ظ",
};

const arabicToQwerty = Object.fromEntries(
  Object.entries(qwertyToArabic).map(([k, v]) => [v, k])
);

function convertToEnglish(text: string) {
  return text
    .split("")
    .map((char) => arabicToQwerty[char] ?? char)
    .join("");
}
function convertToArabic(text: string) {
  return text
    .split("")
    .map((char) => qwertyToArabic[char] ?? char)
    .join("");
}

function convertClipboardText(type: "EN_TO_AR" | "AR_TO_EN"): void {
  let text: string = clipboard.readSync();

  if (!text) {
    console.log("Clipboard is empty");
    return;
  }
  let convertedText: string;

  if (type === "EN_TO_AR") {
    convertedText = convertToArabic(text);
  } else {
    text = text.toLowerCase();
    convertedText = convertToEnglish(text);
  }

  clipboard.writeSync(convertedText);

  const modifier = process.platform === "darwin" ? "command" : "control";
  robot.keyTap("v", [modifier]);
}

function copySelectedText(): void {
  const modifier = process.platform === "darwin" ? "command" : "control";
  robot.keyTap("c", [modifier]);
}

app.on("ready", () => {
  let mainWindow = new BrowserWindow({ show: false });
  app.dock?.hide();

  const isPackaged = app.isPackaged;

  const iconPath = isPackaged
    ? path.join(
        path.dirname(app.getPath("exe")),
        "resources",
        "assets",
        "keyboard.ico"
      )
    : path.join(__dirname, "assets", "keyboard.ico");

  let tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    { label: "Quit", click: () => app.quit() },
  ]);

  tray.setToolTip("Keyboard Translator");
  tray.setContextMenu(contextMenu);

  const ret1 = globalShortcut.register("CommandOrControl+Shift+E", () => {
    copySelectedText();
    setTimeout(() => convertClipboardText("AR_TO_EN"), 1000);
  });

  const ret2 = globalShortcut.register("CommandOrControl+Shift+A", () => {
    copySelectedText();
    setTimeout(() => convertClipboardText("EN_TO_AR"), 1000);
  });

  if (!ret1 || !ret2) console.error("Global shortcut registration failed.");
  else console.log("Shortcuts registered: Ctrl+Shift+E and Ctrl+Shift+A");
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
