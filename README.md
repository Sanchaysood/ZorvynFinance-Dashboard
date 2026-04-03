# Zorvyn Finance Dashboard

A clean, modern finance dashboard built with React and Vite. Track income, expenses, and understand your spending patterns at a glance.

Live Demo: [Visit Zorvyn](https://zorvyn-finance-dashboard.vercel.app)

## Features

- Dashboard Overview with summary cards (Balance, Income, Expenses)
- Balance trend chart and spending breakdown by category
- Add, edit, and delete transactions (Admin mode)
- Filter and search transactions in real-time
- Dark mode and light mode themes
- Export transactions as CSV or JSON
- Role-based access (Admin / Viewer)
- Responsive design for mobile, tablet, and desktop
- All data persisted locally in browser

## Tech Stack

- React 18.2
- Vite 5.0 (build tool)
- Tailwind CSS 3.3 (styling)
- Recharts 2.10 (charts)
- Framer Motion (animations)
- Context API (state management)

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## How to Use

**Add Transactions:** Switch to Admin mode, click "+ Add Transaction", fill details, and save.

**Filter & Search:** Use buttons to filter by type, search by category/amount, and sort by date.

**View Insights:** Summary cards show your financial overview. Charts display trends and spending breakdown.

**Export Data:** Click Export button and choose CSV or JSON format.

**Change Theme:** Click sun/moon icon in navbar to toggle dark mode.

## Project Structure

```
src/
├── components/        9 UI components
├── context/          State management
├── hooks/            Custom hooks
├── data/             Mock transaction data
├── utils/            Helper functions
├── pages/            Page layouts
└── App.jsx           Root component
```

## Data Storage

Everything is stored in browser's localStorage:
- All transactions
- Theme preference (light/dark)
- User role (Admin/Viewer)

## Browser Support

Chrome, Firefox, Safari, Edge (latest versions)

## Deployment on Vercel

1. Push code to GitHub
2. Go to https://vercel.com and sign up
3. Click "Import Project" and select your GitHub repo
4. Vercel auto-detects React + Vite configuration
5. Click "Deploy" and wait 1-2 minutes

Your app will be live at: `https://your-project-name.vercel.app`

## License

This project is open source and available for personal and educational use.
