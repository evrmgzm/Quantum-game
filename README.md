# Quantum Game - A Logic Puzzle Game

Quantum Game is a captivating logic puzzle game built with React and Tailwind CSS. Players use clues and deduction to locate hidden particles on a grid, managing a limited energy supply. The game features a clean, responsive UI and multi-language support (English & Turkish).

---

## ✨ Features

-   **Engaging Puzzle Mechanics:** A challenging logic puzzle that is easy to learn but hard to master.
-   **Intuitive Controls:** A simple and effective Left-Click/Right-Click control scheme for observation and marking.
-   **Resource Management:** Players must strategically manage their "Energy" to observe new cells.
-   **Multi-Language Support:** Easily switch between English (EN) and Turkish (TR) with a dedicated button.
-   **Clean & Modern UI:** A responsive, minimalist interface built with Tailwind CSS.
-   **Component-Based Architecture:** The project is organized into reusable components for better maintainability.

---

## 🛠️ Tech Stack

-   **Frontend:** [React.js](https://reactjs.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`)
-   **Internationalization (i18n):** React Context API

---

## 📂 Project Structure

The project follows a clean and organized structure to separate concerns.

```
src
├── App.js                # Main application component
├── components
│   ├── GuideModal.jsx      # The modal window for game instructions
│   ├── LanguageSwitcher.jsx# The TR/EN language toggle button
│   ├── QuantumPuzzle.jsx     # The main game board and logic component
│   └── Status.jsx          # UI components for stats and messages
├── context
│   └── LanguageContext.jsx # Context and Provider for language management
└── i18n
    └── translations.js     # All TR and EN text strings
```

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your computer.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/particle-discovery.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd particle-discovery
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

### Running the Application

1.  **Start the development server:**
    ```sh
    npm start
    ```

2.  Open your browser and navigate to `http://localhost:3000` to see the application in action.

---

## 룰 How to Play

### The Goal

The objective is to find all **4 hidden particles** on the grid.

### Controls

-   **Left Click (Observe):** Click on an unobserved (gray) cell to spend **1 Energy** and reveal clues about its surroundings.
-   **Right Click (Mark):** Right-click on any cell to place or remove a marker (compass icon). This action **does not cost energy** and is used to track your guesses.

### Understanding the Clues

When you observe a cell, you will get one of two results:

1.  **A green dot:** Congratulations, you've found a particle!
2.  **A set of numbers:** This cell is empty, but it gives you vital clues:
    -   **Large Number:** The "Manhattan distance" (sum of horizontal and vertical steps) to the nearest particle.
    -   **Alignment:** The total number of other particles in the same row AND column.
    -   **Adjacency:** The total number of particles in the 8 immediately surrounding cells.

### Winning the Game

1.  Mark exactly 4 cells where you believe the particles are located.
2.  Once you have 4 cells marked, the **"Confirm Guess"** button will become active.
3.  Click it to submit your answer. If you are correct, you win! If not, you lose.

---
