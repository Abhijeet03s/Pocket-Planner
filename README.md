# 🏦 PocketPlanner

PocketPlanner is a comprehensive expense tracking and budgeting application built with modern web technologies. It helps users manage their finances effectively through intuitive interfaces and powerful analytics.

## ✨ Key Features

### 💰 Smart Expense Tracking
- **Unified Dashboard**: View all expenses and budgets in one place
- **Category Management**: Organize expenses by customizable categories
- **Payment Mode Tracking**: Track expenses across different payment methods

### 📊 Financial Analytics
- **Budget Overview**: Compare monthly spending against set budgets
- **Category Analysis**: Visualize spending patterns through interactive pie charts
- **Monthly Comparisons**: Track spending trends over the last 6 months

### 💳 Budget Management
- **Monthly Budgets**: Set and track monthly spending limits
- **Visual Indicators**: Get real-time budget status with progress bars
- **Overspending Alerts**: Receive warnings when nearing or exceeding budget

### 📱 Modern UI/UX
- **Animated Interfaces**: Smooth transitions powered by Framer Motion
- **Dark Mode Support**: Coming soon

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Query (TanStack Query)
- Shadcn UI Components

### Backend
- PostgreSQL
- Prisma ORM
- NextAuth.js
- Supabase

### Development & Deployment
- Vercel
- Sharp (Image Optimization)
- ESLint

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm
- PostgreSQL database

### Installation

1. **Clone the repository**

   ```bash
      git clone https://github.com/yourusername/Pocket-Planner.git
   ```

2. **Install dependencies**

   ```bash
      npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file with:
   ```bash
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="your-secret"
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

4. **Start development server**

   ```bash
      npm run dev
   ```


## 📦 Database Management

### Initialize Prisma

```bash
npm run prisma:migrate
```
### Push schema changes

```bash
npm run prisma:db-push
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For support or inquiries:
- Email: abhijeetsharma476@gmail.com
