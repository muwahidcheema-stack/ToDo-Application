# Listable — A Modern React To-Do Application

**Listable** is a clean, minimal, and fully responsive To-Do application built with React, Vite, and styled dynamically using Tailwind CSS. It is designed with a mobile-first approach, offering seamless performance across all screen.

---

## 🚀 Features

*   **Task Management:** Add, edit, complete, and delete tasks instantly.
*   **Search & Filter:** Real-time search indexing and dedicated state filters ("All", "Active", "Completed").
*   **Local Storage Sync:** Automatically saves your tasks locally in the browser so they persist on refresh.
*   **Responsive UI/UX:** Flexbox-based layouts designed to prevent text overflows and adjust beautifully on small viewports.
*   **One-Click Clean:** A conditional "Clear Completed" action to quickly sweep finished tasks.

---

## 🛠️ Tech Stack

*   **Frontend Library:** React (Functional Components & Hooks)
*   **Build Tool / Bundler:** Vite
*   **Styling Engine:** Tailwind CSS
*   **State Persistence:** HTML5 Web Storage API (`localStorage`)

---
## Setup
  * 1. Clone the Repository
    ```text
    git clone https://github.com/muwahidcheema-stack/ToDo_application.git
    cd ToDo_application
    ```
  * 2. Install Dependencies
    ```text
    npm install
    ```

  * 3. Run Development Server
    ```text
    npm run dev
    ```
---
    
## 📂 Component Architecture

The codebase is highly modular, separating state controllers from stateless presentational UI blocks:

```text
src/
├── components/
│   ├── FilterButton.jsx   # Individual active category toggle button
│   ├── SearchBar.jsx      # Live-input keyphrase search field
│   ├── TodoCounter.jsx    # Numerical task metrics & "Clear Completed" wrapper
│   ├── TodoForm.jsx       # Custom text-entry input controller
│   ├── TodoItem.jsx       # List row supporting dynamic View / Edit conditional render states
│   └── TodoList.jsx       # Grid list mapper and empty-state controller
├── App.jsx                # Main orchestrator (Central State, Handlers, LocalStorage side-effects)
└── main.jsx               # Entry point
```
Once started, open your browser and navigate to the address shown in your terminal (usually http://localhost:5173/)

---
Built with ❤️ by Muwahid Cheema


