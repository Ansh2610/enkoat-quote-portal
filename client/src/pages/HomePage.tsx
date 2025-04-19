import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to EnKoat Quote Portal
          </Typography>
          <Typography variant="body1" paragraph>
            This portal allows contractors to submit project quotes and visualize performance data for 
            EnKoat's IntelliKoat™ system.
          </Typography>
          <Typography variant="body1" paragraph>
            Use the quote submission form to provide details about your roofing project and view 
            analytics on the dashboard to understand trends and performance metrics.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              component={RouterLink} 
              to="/quote"
              size="large"
            >
              Submit a Quote
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              component={RouterLink} 
              to="/dashboard"
              size="large"
            >
              View Dashboard
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage;