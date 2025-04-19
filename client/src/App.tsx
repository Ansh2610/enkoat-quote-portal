import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import QuoteFormPage from './pages/QuoteFormPage';
import DashboardPage from './pages/DashboardPage';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // EnKoat blue (you can change this to match EnKoat's brand)
    },
    secondary: {
      main: '#4caf50', // Green for energy efficiency theme
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container component="main" sx={{ py: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quote" element={<QuoteFormPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;