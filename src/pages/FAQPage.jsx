import React from 'react';
import { Container, Typography, Box, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQPage = () => {
  const faqs = [
    {
      question: 'How do I report a service issue?',
      answer: 'You can report a service issue by logging into your account and navigating to the "Report Issue" page. Fill out the form with details about the issue you are experiencing.'
    },
    {
      question: 'How can I track the status of my reported issue?',
      answer: 'You can track the status of your reported issues in the "Service Issues" section of your dashboard. Each issue will show its current status and any updates.'
    },
    {
      question: 'What is the Community Hub?',
      answer: 'The Community Hub is a space where citizens can connect, share information, and discuss local issues. It helps build community engagement and facilitates communication between citizens.'
    },
    {
      question: 'How do I access government services?',
      answer: 'You can access information about government services through the "Government Services" section. This provides details about various services and how to access them.'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Frequently Asked Questions
        </Typography>
        <Box sx={{ my: 4 }}>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default FAQPage;
