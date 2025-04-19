import { Container, Typography, Box } from '@mui/material';
import QuoteForm from '../components/QuoteForm';
import { Quote } from '../types';

const QuoteFormPage = () => {
  const handleQuoteSuccess = (quote: Quote) => {
    console.log('Quote submitted successfully:', quote);
    // Could add additional success handling here
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