cat > /mnt/user-data/outputs/FRONTEND_README_FULL.md << 'EOF'
# Content Optimizer AI - Frontend 🎨

A professional React-based frontend application for displaying and comparing original articles with their AI-optimized versions. Features a modern, responsive UI with article browsing, filtering, and side-by-side comparison views.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![React Router](https://img.shields.io/badge/React_Router-6.20.1-red)
![Axios](https://img.shields.io/badge/Axios-1.6.2-green)

---

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Components Overview](#components-overview)
- [Pages Overview](#pages-overview)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Responsive Design](#responsive-design)
- [Testing](#testing)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### 🏠 Home Page
- **Article Grid Layout** - Display articles in a responsive grid
- **Smart Filtering** - Filter by All, Original Only, or Optimized Only
- **Pagination** - Navigate through multiple pages of articles
- **Article Cards** - Beautiful cards showing title, author, date, excerpt, and metadata
- **Loading States** - Smooth loading animations
- **Error Handling** - Graceful error messages with retry functionality
- **Empty States** - Helpful messages when no articles are available

### 📄 Article Detail Page
- **Full Content Display** - Read complete articles with proper formatting
- **Rich Metadata** - Author, publish date, reading time, word count
- **References Section** - View cited sources (for optimized articles)
- **Related Articles** - Quick links to original/optimized versions
- **Source Links** - Direct links to original article sources
- **Back Navigation** - Easy navigation back to previous page

### 🔄 Comparison Page
- **Side-by-Side View** - Compare original and optimized articles
- **Status Indicators** - Visual badges showing optimization status
- **Improvement Metrics** - See word count changes and enhancements
- **Pending Placeholders** - Clear indication of articles awaiting optimization
- **Direct Links** - Quick access to both article versions

### 🎨 UI/UX Features
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Modern Styling** - Professional design with smooth animations
- **Accessibility** - Semantic HTML and keyboard navigation
- **Fast Performance** - Optimized React components
- **Intuitive Navigation** - Clear, user-friendly interface

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Check version: `node --version`

- **npm** (comes with Node.js) or **yarn**
  - Check version: `npm --version`

- **Backend API** running on `http://localhost:5000`
  - See backend documentation for setup

---

## 🚀 Installation

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

This installs:
- `react` - Core React library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `axios` - HTTP client for API calls
- `react-scripts` - Build tools

### Step 3: Verify Installation

```bash
ls -la node_modules
```

You should see a `node_modules/` directory.

---

## ⚙️ Configuration

### Environment Variables

The `.env` file contains:

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000/api

# Port for development server
PORT=3000
```

### Customizing Configuration

**Change backend API URL:**
```env
REACT_APP_API_URL=https://api.yourserver.com/api
```

**Change frontend port:**
```env
PORT=3001
```

**Note:** Restart server after changing environment variables.

---

## 🏃 Running the Application

### Start Development Server

```bash
npm start
```

Or with yarn:
```bash
yarn start
```

The app will:
- Start on `http://localhost:3000`
- Open in your browser automatically
- Watch for changes and reload

**Expected Output:**
```
Compiled successfully!

You can now view content-optimizer-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.x:3000
```

### Stop the Server

Press `Ctrl + C` in terminal.

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── ArticleCard.js     # Article card component
│   │   └── ArticleCard.css    # Card styles
│   ├── pages/
│   │   ├── HomePage.js        # Home page with article grid
│   │   ├── HomePage.css
│   │   ├── ArticleDetailPage.js   # Single article view
│   │   ├── ArticleDetailPage.css
│   │   ├── ComparisonPage.js  # Comparison view
│   │   └── ComparisonPage.css
│   ├── services/
│   │   └── api.js             # Backend API integration
│   ├── App.js                 # Main app component
│   ├── App.css                # Global app styles
│   ├── index.js               # Entry point
│   └── index.css              # Root styles
├── .env                       # Environment variables
├── .gitignore
├── package.json               # Dependencies
└── README.md
```

---

## 🧩 Components Overview

### ArticleCard Component

**Location:** `src/components/ArticleCard.js`

**Purpose:** Reusable card for displaying article previews

**Props:**
- `article` (object) - Article data from API

**Features:**
- Title, author, date, excerpt
- Metadata (word count, reading time)
- Original/Optimized badge
- Action buttons
- Hover effects

**Usage:**
```jsx
import ArticleCard from './components/ArticleCard';

<ArticleCard article={articleData} />
```

---

## 📄 Pages Overview

### 1. HomePage (`/`)

**Features:**
- Article grid layout
- Filter buttons
- Pagination
- Loading/error states

**State:**
- `articles` - Article array
- `loading` - Loading state
- `filter` - Current filter
- `currentPage` - Page number

### 2. ArticleDetailPage (`/article/:id`)

**Features:**
- Full article content
- Rich metadata
- References section
- Related articles
- Source links

**State:**
- `article` - Single article
- `loading` - Loading state
- `error` - Error message

### 3. ComparisonPage (`/comparison`)

**Features:**
- Side-by-side comparison
- Status indicators
- Improvement metrics
- Pending placeholders
