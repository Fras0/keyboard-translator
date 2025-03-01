# 📝 Keyboard Translator

A simple **Electron-based** tool that translates selected text between English and Arabic using global shortcuts.

## 🚀 Features

- 🖥️ **Works in Any Application** – Translate text without leaving your current app.
- ⌨️ **Global Shortcuts**
  - `Ctrl + Shift + E` → Convert Arabic to English
  - `Ctrl + Shift + A` → Convert English to Arabic
- 📌 **Runs in the System Tray** – Background process with an easy-close option.

# 🛠 Installation


### 📦 Install Dependencies

```sh
npm install
```

### Run in Development Mode

```sh
npm run start
```

### Build & Package the App

```sh
npm run build-release
```

This wil:

- Clean the `dist/` and `release-build/` folders
- Compile TypeScript (tsc)
- Package the app using electron-packager
- Copy assets into the final release build

### After running the script, the .exe file will be in:

```sh
release-build/keyboard-translator-win32-x64/
```
