import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            EnKoat Quote Portal
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/quote">
              Submit Quote
            </Button>
            <Button color="inherit" component={RouterLink} to="/dashboard">
              Dashboard
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;