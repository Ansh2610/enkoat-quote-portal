import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200]
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' '}
          <Link color="inherit" href="https://enkoat.com/">
            EnKoat
          </Link>
          {' | IntelliKoat™ Quote Portal'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;