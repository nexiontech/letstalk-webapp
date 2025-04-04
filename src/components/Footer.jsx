import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: '#00933C',
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
  width: '100%',
  color: '#FFFFFF',
}));

const ColumnTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: '#FFFFFF',
  fontSize: '1.2rem',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(1),
  color: '#FFFFFF',
  textDecoration: 'none',
  fontSize: '0.9rem',
  '&:hover': {
    color: '#E3B800',
  },
}));

const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={2.4}>
            <ColumnTitle variant="h3">
              Saya Setona Inovations
            </ColumnTitle>
            <Box>
              <FooterLink component={RouterLink} to="#">
                41 Juta Street, Braamfontein
              </FooterLink>
              <FooterLink component={RouterLink} to="#">
                Address 2
              </FooterLink>
              <FooterLink component={RouterLink} to="#">
                Address 3
              </FooterLink>
              <FooterLink href="mailto:info@saya-setona.co.za">
                info@saya-setona.co.za
              </FooterLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <ColumnTitle variant="h3">
              Products
            </ColumnTitle>
            <Box>
              <FooterLink component={RouterLink} to="#">
                Our offering
              </FooterLink>
              <FooterLink component={RouterLink} to="#">
                Government Services
              </FooterLink>
              <FooterLink component={RouterLink} to="#">
                Service Issues
              </FooterLink>
              <FooterLink component={RouterLink} to="#">
                Community Hub
              </FooterLink>
              <FooterLink component={RouterLink} to="#">
                Ask Naledi
              </FooterLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <ColumnTitle variant="h3">
              Company
            </ColumnTitle>
            <Box>
              <FooterLink component={RouterLink} to="#">
                Blog
              </FooterLink>
              <FooterLink component={RouterLink} to="#">
                Newsroom
              </FooterLink>
              <FooterLink component={RouterLink} to="#">
                Press Releases
              </FooterLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <ColumnTitle variant="h3">
              Partners
            </ColumnTitle>
            <Box>
              <FooterLink component={RouterLink} to="#">
                Dell
              </FooterLink>
              <FooterLink component={RouterLink} to="#">
                United Nations
              </FooterLink>
              <FooterLink component={RouterLink} to="#">
                IBM
              </FooterLink>
              <FooterLink component={RouterLink} to="#">
                Amazon Web Services
              </FooterLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <ColumnTitle variant="h3">
              Let's Talk
            </ColumnTitle>
            <Box>
              <FooterLink component={RouterLink} to="/contact">
                Contact
              </FooterLink>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </StyledFooter>
  );
};

export default Footer;

