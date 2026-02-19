# 🏥 Health Intelligence Platform

<div align="center">

![Health Intel Banner](https://img.shields.io/badge/Health-Intelligence-blue?style=for-the-badge&logo=healthcare&logoColor=white)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

**AI-Powered Health Surveillance System for India**

*Real-time disease predictions, interactive mapping, and intelligent health insights powered by Perplexity AI*

[🚀 Live Demo](#) • [📖 Documentation](#features) • [🤝 Contributing](CONTRIBUTING.md)

</div>

---

## ✨ Features

### 🗺️ Interactive Disease Mapping
- **Real-time State Selection**: Click on any Indian state to view detailed health data
- **Visual Risk Indicators**: Color-coded states showing High, Medium, and Low risk levels
- **Responsive Design**: Fully scrollable and adjustable map interface
- **28+ States Coverage**: Comprehensive data for all Indian states and union territories

### 🤖 AI-Powered Chatbot
- **Perplexity AI Integration**: Get real-time health insights from live web data
- **Natural Language Processing**: Ask questions in plain English
- **Context-Aware Responses**: Chatbot understands your selected state for localized information
- **Multi-Topic Support**: Health queries, disease information, prevention tips, and general questions

### 📊 Comprehensive Health Analytics
- **Disease Predictions**: AI-driven forecasts for disease outbreaks
- **Risk Assessment**: Detailed analysis of transmission rates and risk levels
- **Symptom Database**: Extensive symptom information for various diseases
- **Prevention Guidelines**: Evidence-based precautionary measures

### 📈 Data Visualization
- **Interactive Charts**: Bar charts, pie charts, and trend analysis
- **Historical Trends**: 6-month disease pattern visualization
- **Case Distribution**: Visual representation of disease prevalence
- **Export Functionality**: Download health reports as CSV files

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **TanStack Query** - Powerful data fetching
- **Recharts** - Responsive chart library

### Backend
- **Express.js** - Fast, minimalist web framework
- **TypeScript** - End-to-end type safety
- **Drizzle ORM** - Type-safe database toolkit
- **Perplexity AI** - Advanced AI language model
- **CSV Parser** - Efficient data processing

### Development Tools
- **ESLint** - Code quality enforcement
- **Prettier** - Code formatting
- **tsx** - TypeScript execution
- **dotenv** - Environment variable management

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Perplexity API key ([Get one here](https://www.perplexity.ai/))

### Installation

```bash
# Clone the repository
git clone https://github.com/venkat-karthik/health-intel.git
cd health-intel

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Add your PERPLEXITY_API_KEY to .env

# Start development server
npm run dev
```

Visit **http://localhost:5000** to see the application running! 🎉

---

## 📁 Project Structure

```
health-intel/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── chat/     # AI chatbot components
│   │   │   ├── health/   # Health data displays
│   │   │   ├── map/      # Interactive map components
│   │   │   └── ui/       # shadcn/ui components
│   │   ├── pages/        # Route pages
│   │   ├── lib/          # Utility functions
│   │   └── hooks/        # Custom React hooks
│   └── index.html        # Entry HTML file
├── server/                # Backend Express application
│   ├── ai-service.ts     # Perplexity AI integration
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data storage layer
│   ├── health_data.csv   # Health dataset
│   └── index.ts          # Server entry point
├── shared/               # Shared types and schemas
│   └── schema.ts         # TypeScript type definitions
└── README.md            # You are here!
```

---

## 🎯 Key Features Explained

### 1. Real-Time Disease Tracking
The platform aggregates health data from multiple sources and provides up-to-date information on disease prevalence across Indian states.

### 2. AI-Powered Insights
Using Perplexity AI's advanced language model, the chatbot can:
- Answer health-related questions with current web data
- Provide region-specific health recommendations
- Explain disease symptoms and prevention methods
- Offer general health guidance

### 3. Interactive Visualization
- **State-wise Heat Maps**: Visual representation of disease risk levels
- **Trend Analysis**: Historical data showing disease patterns over time
- **Comparative Charts**: Compare disease prevalence across regions

### 4. Data Export & Reporting
Generate comprehensive health reports for:
- Government health officials
- Medical researchers
- Public health awareness campaigns

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Perplexity AI Configuration
PERPLEXITY_API_KEY=your_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/predict` | POST | Get health predictions for a region |
| `/api/chat` | POST | Send message to AI chatbot |
| `/api/regions` | GET | List all available regions |
| `/api/ai-insights` | POST | Get AI-generated disease insights |
| `/api/refresh-data` | POST | Refresh health data |

---

## 📊 Data Sources

The platform uses:
- **CSV Database**: Curated health data for 28+ Indian states
- **Perplexity AI**: Real-time web intelligence for current health trends
- **WHO Guidelines**: Evidence-based health recommendations
- **ICMR Data**: Indian Council of Medical Research statistics

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Perplexity AI** for providing advanced AI capabilities
- **shadcn/ui** for beautiful, accessible components
- **Indian Health Authorities** for public health data
- **Open Source Community** for amazing tools and libraries

---

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/venkat-karthik/health-intel/issues)
- **Discussions**: [GitHub Discussions](https://github.com/venkat-karthik/health-intel/discussions)
- **Email**: support@healthintel.ai

---

<div align="center">

**Made with ❤️ for a healthier India**

⭐ Star this repo if you find it helpful!

</div>
