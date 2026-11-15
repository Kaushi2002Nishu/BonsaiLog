<div align="center">

# 🌳 BonsaiLog Studio

**A traditional bonsai care & styling journal for mobile and web.**

Track your trees, learn classical Japanese styles, and keep every watering and pruning routine on schedule.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Navigation](https://img.shields.io/badge/React_Navigation-6B52AE?style=for-the-badge&logo=react&logoColor=white)
![Platforms](https://img.shields.io/badge/Platforms-iOS%20%7C%20Android%20%7C%20Web-2C5E43?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-8C6239?style=for-the-badge)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#️-tech-stack)
- [Design System](#-design-system)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Roadmap](#️-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🌿 About the Project

**BonsaiLog Studio** is a cross-platform application built with **React Native** and **Expo** for bonsai enthusiasts of every level. It combines a species encyclopedia, a personal tree tracker, a care scheduler, and a guide to traditional Japanese styling forms in one calm, earthy interface.

All personal data is stored locally on-device, so your collection works offline and stays private.

---

## ✨ Features

| Feature | Description |
| :--- | :--- |
| 📂 **Species Directory** | Browse 21+ bonsai species, filterable by type (Indoor / Outdoor) and difficulty level, with optimized imagery and detailed care guides. |
| 🌱 **My Collection** | Log and monitor your own trees. Data is persisted locally using `AsyncStorage`. |
| 📅 **Care Schedule** | Keep up with watering, pruning, and general maintenance routines. |
| 🎋 **Styling Guide** | Learn classical Japanese forms such as *Chokkan* (Formal Upright), *Kengai* (Cascade), and *Bunjin* (Literati). |
| ✨ **Polished UI/UX** | Cohesive "Cream & Sage" theme, custom hover animations on web, and responsive feedback across platforms. |

---

## 📸 Screenshots

> Add screenshots to `assets/screenshots/` and update the paths below.

| Home | Directory | Collection |
| :---: | :---: | :---: |
| ![Home](assets/screenshots/home.png) | ![Directory](assets/screenshots/directory.png) | ![Collection](assets/screenshots/collection.png) |

| Schedule | Styling Guide |
| :---: | :---: |
| ![Schedule](assets/screenshots/schedule.png) | ![Guide](assets/screenshots/guide.png) |

---

## 🛠️ Tech Stack

- **Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Navigation:** [React Navigation](https://reactnavigation.org/) (Stack and Tab navigators)
- **Storage:** [`@react-native-async-storage/async-storage`](https://react-native-async-storage.github.io/async-storage/) for local collection persistence
- **Styling:** Custom `StyleSheet` with web hover-state support via `Platform.select`
- **Data:** Structured JSON metadata (`src/data/bonsai.json`)

---

## 🎨 Design System

The app uses a **Cream & Sage** earthy palette inspired by traditional bonsai aesthetics.

| Color Role | Hex Code | Usage |
| :--- | :--- | :--- |
| 🟢 **Dark Green** | `#2C5E43` / `#3B5E4B` | Primary headers, active states, buttons |
| 🌿 **Soft Sage** | `#D8E2DC` / `#E8EDE6` | Cards, banners, secondary accents |
| 🟤 **Warm Brown** | `#8C6239` / `#7A6B5D` | Subtitles, borders, text details |
| 🤍 **Cream / Off-White** | `#F7F4EF` / `#FFFFFF` | Backgrounds and surface cards |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (bundled with Node.js)
- [Expo Go](https://expo.dev/go) on your phone *(optional, for testing on a physical device)*

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Kaushi2002Nishu/BonsaiLog.git
   cd BonsaiLog
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Open the app**

   - Press **`w`** to open in your web browser
   - Press **`a`** / **`i`** to open in an Android emulator / iOS simulator
   - Or scan the QR code with **Expo Go** on your mobile device

---

## 📂 Project Structure

```text
BonsaiLog/
├── assets/                 # Optimized webp/jpg images and branding assets
├── src/
│   ├── components/         # Reusable UI components (HoverCard, LeafWatermark, etc.)
│   ├── data/               # Structured metadata (bonsai.json)
│   ├── navigation/         # App navigators and screen routing
│   └── screens/            # Home, Directory, Collection, Schedule, Guide
├── App.js                  # Application entry point
└── package.json            # Dependencies and project configuration
```

---

## 🗺️ Roadmap

- [ ] Push notifications for watering and pruning reminders
- [ ] Photo timeline for each tree in the collection
- [ ] Search and advanced filtering in the species directory
- [ ] Dark mode
- [ ] Cloud backup and sync

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 👤 Author

**Kaushi Nishu**
GitHub: [@Kaushi2002Nishu](https://github.com/Kaushi2002Nishu)

<div align="center">

*Made with 🌱 and patience, like any good bonsai.*

</div>