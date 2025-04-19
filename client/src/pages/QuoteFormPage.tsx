import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Alert } from '@mui/material';
import QuoteForm from '../components/QuoteForm';
import { Quote } from '../types';

const QuoteFormPage = () => {
  const navigate = useNavigate();

  const handleQuoteSuccess = (quote: Quote) => {
    console.log('Quote submitted successfully:', quote);
    // Navigate to the dashboard after successful submission
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000); // Wait 2 seconds to show the success message before redirecting
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Submit a Quote
        </Typography>
        <Typography variant="body1" paragraph>
          Please fill out the form below to submit your roofing project quote.
        </Typography>
        
        <QuoteForm onSuccess={handleQuoteSuccess} />
      </Box>
    </Container>
  );
};

export default QuoteFormPage;