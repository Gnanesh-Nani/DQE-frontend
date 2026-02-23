# LLM Data Query Engine - Frontend

A modern React/TypeScript frontend for the LLM Data Query Engine. Convert natural language questions into SQL, visualize results with intelligent charts, and explore database schemas interactively.

## 🎯 What It Does

- **Natural Language Queries**: Write questions in plain English instead of SQL
- **Database Selection**: Seamlessly switch between multiple databases
- **Schema Explorer**: Browse tables and columns with an intuitive sidebar
- **Smart Visualizations**: Automatically generated charts (bar, line, pie) based on query results
- **SQL Transparency**: View the generated SQL for every query
- **Token Analysis**: See how much you're saving with TOON format compression
- **Real-time Results**: Fast feedback with loading states and error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Backend server running on `http://127.0.0.1:8000`

### Installation

1. **Navigate to frontend directory**
```bash
cd DQE-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

## 📚 Available Scripts

### Development
```bash
npm run dev
```
Starts Vite dev server with hot module replacement. Navigate to `http://localhost:5173`.

### Build
```bash
npm run build
```
Creates optimized production build in `dist/` folder.

### Preview Production Build
```bash
npm run preview
```
Locally preview the production build before deploying.

### Lint
```bash
npm run lint
```
Check code quality with ESLint.

## 🏗️ Project Structure

```
DQE-frontend/
├── src/
│   ├── pages/
│   │   └── Dashboard.tsx          # Main application page
│   │       └── Dashboard.css      # Dashboard styles
│   │
│   ├── components/
│   │   ├── DatabaseSelector.tsx   # Database dropdown
│   │   ├── SchemaViewer.tsx       # Table/column browser
│   │   ├── QueryInput.tsx         # Natural language input
│   │   ├── ResultsDisplay.tsx     # Results visualization
│   │   └── SimpleChart.tsx        # Chart renderer
│   │
│   ├── styles/
│   │   └── Dashboard.css          # Dashboard styles
│   │
│   ├── App.tsx                    # Root component
│   ├── App.css                    # Global app styles
│   ├── index.css                  # Base styles
│   ├── main.tsx                   # Entry point
│   └── assets/                    # Static assets
│
├── public/                        # Static files
├── index.html                     # HTML template
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript config
├── eslint.config.js               # ESLint rules
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 📋 Features

### 1. Database Management
- View all available MySQL databases
- Switch databases with dropdown selector
- Load schemas on database change
- Visual indication of current database

### 2. Schema Exploration
- Browse all tables in selected database
- View column names and types
- See column counts per table
- Expandable/collapsible table lists
- Primary key indicators

### 3. Natural Language Queries
- Type questions in plain English
- Multi-line query support
- Real-time submission feedback
- Loading states during query execution

### 4. Results Display
- **Charts**: Auto-generated visualizations
- **SQL**: View generated SQL query
- **Data**: Raw results in table format
- **Analysis**: Token usage and savings

### 5. Visual Design
- Clean white/gray theme
- Responsive layout
- Sidebar navigation
- Dark text on light background
- Professional typography

## 🔌 API Integration

### Backend Endpoints Used

**Get Databases**
```typescript
GET /databases
Response: { databases: string[] }
```

**Set Database**
```typescript
POST /set-database
Body: { database: string }
```

**Get Schemas**
```typescript
GET /all-schemas
Response: { schemas: Record<string, SchemaInfo> }
```

**Generate SQL & Execute**
```typescript
POST /generate-sql
Body: { query: string }
Response: { generated_sql, results, chart_suggestion, ... }
```

## 🎨 Styling

### Color Scheme
- **Primary Background**: White (#FFFFFF)
- **Secondary Background**: Light Gray (#F5F5F5)
- **Text**: Dark Gray (#333333)
- **Borders**: Light Gray (#DDDDDD)
- **Accents**: Blue (#0066CC)

### Layout
- **Sidebar Width**: 300px (collapsible)
- **Main Content**: Responsive
- **Max Width**: Full viewport
- **Padding**: 20px standard

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.2.0 | UI framework |
| `react-dom` | ^19.2.0 | DOM rendering |
| `recharts` | ^3.7.0 | Chart library |
| `typescript` | ~5.9.3 | Type checking |
| `vite` | ^7.2.4 | Build tool |

### Dev Dependencies
- ESLint for code linting
- TypeScript ESLint plugins
- React refresh plugin for HMR

## 🚀 Deployment

### Build for Production
```bash
npm run build
```
Creates optimized bundle in `dist/` folder.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Then drag dist/ folder to Netlify
```

### Environment Variables
Create `.env` file in frontend root:
```env
VITE_API_URL=http://your-backend-url:8000
```

Then use in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
```



## 📝 Example Queries to Try

```
"Show me the top 10 users by registration date"
"How many orders were placed in each month?"
"What is the average order value by region?"
"Display revenue trends over the last year"
"Show me the distribution of customer satisfaction scores"
```

## 📖 Documentation

- [Backend Documentation](../DQE-backend/README.md)
- [Setup Guide](../SETUP.md)
- [Quick Start](../QUICKSTART.md)
- [Implementation Summary](../IMPLEMENTATION_SUMMARY.md)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing`
2. Make changes and test
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing`
5. Create pull request

## 📄 License

[Your License Here]

## 🆘 Support

For issues or questions:
1. Check troubleshooting section
2. Review browser console for errors
3. Check backend logs
4. Create an issue with details

---

**Happy querying!** 🚀📊
