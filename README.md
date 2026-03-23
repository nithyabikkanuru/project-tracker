# Project Tracker

A frontend **Project Management Tool** built using **React + TypeScript** that supports multiple views of tasks, custom drag-and-drop interactions, virtual scrolling for large datasets, and simulated collaboration indicators.

The application demonstrates frontend engineering concepts including state management, performance optimization, and UI interaction logic.

---

# Live Demo

Live Site:
https://helpful-brioche-cbb6bd.netlify.app

GitHub Repository:
https://github.com/nithyabikkanuru/project-tracker

---

# Features

### Kanban Board View

* Four columns: **To Do, In Progress, In Review, Done**
* Tasks displayed as draggable cards
* Drag tasks between columns to update status
* Task cards show:

  * Title
  * Assignee avatar (initials)
  * Priority badge
  * Due date
* Column task counts displayed
* Columns scroll independently

---

### List View

* Displays tasks in a table format
* Handles **500+ tasks efficiently**
* Implements **virtual scrolling**
* Only visible rows are rendered
* Provides smooth scrolling without performance issues

---

### Timeline View

* Tasks visualized across the current month
* Horizontal bars represent task duration
* Color-coded based on priority
* Today’s date highlighted
* Scrollable horizontal timeline

---

### Filters

Users can filter tasks by:

* Status
* Priority
* Assignee
* Due date range

Filters update instantly and **sync with the URL**, allowing shareable filtered views.

---

### Live Collaboration Indicators

The interface simulates multiple users viewing the board.

* Displays message:

  **“3 people viewing this board”**

* Simulated users move between tasks

* User avatars appear on active task cards

---

# Tech Stack

* **React**
* **TypeScript**
* **Vite**
* **Zustand** (state management)
* **Tailwind CSS**

---

# Setup Instructions

Clone the repository

```bash
git clone https://github.com/nithyabikkanuru/project-tracker.git
```

Navigate into the project

```bash
cd project-tracker
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Open in browser

```
http://localhost:8080
```

---

# Production Build

Create optimized production build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# State Management Decision

The application uses **Zustand** for state management.

Zustand provides a lightweight global store without requiring large boilerplate code. It allows different views (Kanban, List, Timeline) to share the same task data and filter state efficiently without prop drilling.

---

# Virtual Scrolling Implementation

The list view uses a custom virtual scrolling strategy to efficiently render large datasets. Instead of rendering all 500 tasks, the component calculates which rows are currently visible in the viewport based on scroll position. Only the visible rows and a small buffer are rendered. This significantly reduces DOM size and ensures smooth scrolling performance.

---

# Drag-and-Drop Implementation

Drag-and-drop functionality was implemented using **native HTML5 drag events** instead of external libraries.

When a card is dragged:

* A placeholder maintains the layout
* The dragged card follows the cursor
* Dropping into a column updates the task status
* Dropping outside valid areas returns the card to its original position

---

# Hardest UI Problem

The most challenging part of the project was implementing the custom drag-and-drop behavior while maintaining layout stability. When dragging a card, removing it from the column causes layout shifts. To prevent this, a placeholder element is inserted to preserve the original card height. This keeps the column structure stable while the dragged element moves across columns.

---

# Lighthouse Performance

The application achieves a **Lighthouse performance score of 98 on desktop**.

---

# Dataset

A seed generator creates **500 tasks** with randomized:

* titles
* assignees
* priorities
* statuses
* due dates

This dataset helps test performance and virtual scrolling behavior.

---

# Future Improvements

With more time the following improvements could be added:

* Real-time WebSocket collaboration instead of simulated users
* Improved mobile responsiveness
* Task editing and creation features
* Drag-and-drop reordering within columns

---

# Author

Nithya Bikkanuru
