# 🎯 React Quiz App

An interactive and dynamic quiz application built with **React + Vite**, offering:

- Random questions via the Open Trivia DB API
- Score tracking and history
- A countdown timer for each question
- Stylish UI with emoji feedback and animations

---

## 🚀 Features

✅ **Quiz functionality**:
- Multiple choice questions (MCQs)
- Timer countdown (30 seconds/question)
- Emoji feedback for correct ✅ / incorrect ❌ answers
- Instant transitions between questions
- Score tracking with persistent score history in `localStorage`
- “Time’s Up” screen if timer hits 0

✅ **Results**:
- Total score
- Score history list with the best score badge ⭐️
- “Restart Quiz” button to try again

---

## 🧠 Concepts Used

### ✅ React Fundamentals
- **JSX** for clean and expressive UI
- **Components & Props** to modularize `Quiz`, `Question`, and `AnswerButton`
- **State Management & Events** with `useState`
- **Side Effects** using `useEffect` (API calls, timers, localStorage)

### ✅ React Hooks
- `useState` for dynamic rendering and user interaction
- `useEffect` for timers, API data fetching, and localStorage management

### ✅ Styling
- Custom CSS with transitions, gradients, shadows, and hover effects
- Responsive and centered layout

---

## 📦 Tech Stack

- ⚛️ React (via [Vite](https://vitejs.dev))
- 🎨 Custom CSS
- 📡 Open Trivia DB API

---



