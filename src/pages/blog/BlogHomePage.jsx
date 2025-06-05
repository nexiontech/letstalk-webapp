import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  TextField,
  InputAdornment,
  Pagination,
} from '@mui/material';
import {
  Search as SearchIcon,
  CalendarToday,
  Person,
} from '@mui/icons-material';
import AdSenseAd from '../../components/AdSenseAd';
import SEOHelmet from '../../components/SEOHelmet';

const BlogHomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const postsPerPage = 6;

  // Blog posts data - memoized to prevent unnecessary re-renders
  const blogPosts = useMemo(
    () => [
      {
        id: 1,
        title: "Let's Talk: Revolutionizing Municipal Services in South Africa",
        excerpt:
          'Discover how digital transformation is changing the way South African citizens interact with their local government services through innovative technology solutions.',
        content: '/blog/revolutionizing-municipal-services',
        category: 'Municipal Services',
        author: "Let's Talk Team",
        date: '2025-06-06',
        image: '/images/blog/municipal-services-hero.jpg',
        tags: [
          'municipal services',
          'digital transformation',
          'south africa',
          'government technology',
        ],
        readTime: '8 min read',
      },
      {
        id: 2,
        title:
          "Learning from Bela Bela Municipality's Digital Innovation Success",
        excerpt:
          'An in-depth look at how Bela Bela Municipality pioneered digital customer service solutions and what other municipalities can learn from their success.',
        content: '/blog/bela-bela-municipality-success',
        category: 'Community Stories',
        author: 'Municipal Technology Expert',
        date: '2025-06-05',
        image: '/images/blog/bela-bela-success.jpg',
        tags: [
          'bela bela',
          'municipal innovation',
          'case study',
          'digital government',
        ],
        readTime: '10 min read',
      },
      {
        id: 3,
        title: 'Complete Guide to Digital Municipal Service Access in 2025',
        excerpt:
          'Everything South African citizens need to know about accessing municipal services online, from bill payments to service issue reporting.',
        content: '/blog/digital-municipal-service-guide',
        category: 'Government Guides',
        author: 'Service Delivery Specialist',
        date: '2025-06-04',
        image: '/images/blog/digital-services-guide.jpg',
        tags: [
          'municipal services',
          'online payments',
          'service delivery',
          'citizen guide',
        ],
        readTime: '12 min read',
      },
      {
        id: 4,
        title:
          'How Technology is Transforming Local Government in South Africa',
        excerpt:
          'Explore the technological revolution happening in South African municipalities and its impact on service delivery and citizen engagement.',
        content: '/blog/technology-transforming-local-government',
        category: 'Municipal Services',
        author: 'Government Technology Analyst',
        date: '2025-06-03',
        image: '/images/blog/tech-transformation.jpg',
        tags: [
          'local government',
          'technology',
          'transformation',
          'public sector',
        ],
        readTime: '9 min read',
      },
      {
        id: 5,
        title:
          'Success Stories: Communities Embracing Digital Municipal Services',
        excerpt:
          'Real stories from South African communities that have successfully adopted digital municipal services and improved their quality of life.',
        content: '/blog/communities-embracing-digital-services',
        category: 'Community Stories',
        author: 'Community Engagement Manager',
        date: '2025-06-02',
        image: '/images/blog/community-success.jpg',
        tags: [
          'community',
          'success stories',
          'digital adoption',
          'municipal services',
        ],
        readTime: '7 min read',
      },
    ],
    []
  );

  useEffect(() => {
    const filtered = blogPosts.filter(
      post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, blogPosts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const getCategoryColor = category => {
    const colors = {
      'Municipal Services': 'primary',
      'Government Guides': 'secondary',
      'Community Stories': 'success',
      'News Updates': 'info',
    };
    return colors[category] || 'default';
  };

  return (
    <>
      <SEOHelmet
        title="Municipal Services Blog | Let's Talk South Africa"
        description="Stay informed about municipal services, government technology, and digital transformation in South African local government. Expert insights and community stories."
        keywords="municipal services blog, south african government, digital transformation, local government technology, municipal innovation"
        canonicalUrl="https://letstalkbi.co.za/blog"
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Municipal Services Blog
          </Typography>
          <Typography
            variant="h2"
            component="p"
            color="text.secondary"
            sx={{ fontSize: '1.2rem', maxWidth: '800px', mx: 'auto' }}
          >
            Expert insights on South African municipal services, digital
            government transformation, and community success stories from across
            the nation.
          </Typography>
        </Box>

        {/* Header Ad */}
        <Box sx={{ mb: 4 }}>
          <AdSenseAd
            slot="6544714660"
            format="auto"
            style={{ display: 'block', textAlign: 'center', minHeight: '90px' }}
            minContentLength={300}
          />
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search blog posts about municipal services, government guides, or community stories..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: '600px', mx: 'auto', display: 'block' }}
          />
        </Box>

        {/* Blog Posts Grid */}
        <Grid container spacing={4}>
          {currentPosts.map((post, index) => (
            <Grid item xs={12} md={6} lg={4} key={post.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent
                  sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={post.category}
                      color={getCategoryColor(post.category)}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  </Box>

                  <Typography
                    variant="h3"
                    component="h2"
                    gutterBottom
                    sx={{ fontSize: '1.25rem', lineHeight: 1.3 }}
                  >
                    <Link
                      to={post.content}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      {post.title}
                    </Link>
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, flexGrow: 1 }}
                  >
                    {post.excerpt}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mt: 'auto',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Person fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {post.author}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarToday fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(post.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="caption" color="primary" sx={{ mt: 1 }}>
                    {post.readTime}
                  </Typography>
                </CardContent>
              </Card>

              {/* In-content Ad after every 2nd post */}
              {(index + 1) % 2 === 0 && (
                <Box sx={{ mt: 4 }}>
                  <AdSenseAd
                    slot="4214673608"
                    format="auto"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      minHeight: '250px',
                    }}
                    minContentLength={200}
                  />
                </Box>
              )}
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => setCurrentPage(value)}
              color="primary"
              size="large"
            />
          </Box>
        )}

        {/* Footer Ad */}
        <Box sx={{ mt: 6 }}>
          <AdSenseAd
            slot="2059283552"
            format="auto"
            style={{ display: 'block', textAlign: 'center', minHeight: '90px' }}
            minContentLength={300}
          />
        </Box>

        {/* No Results Message */}
        {filteredPosts.length === 0 && searchTerm && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h4" gutterBottom>
              No blog posts found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try searching for different keywords related to municipal
              services, government guides, or community stories.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default BlogHomePage;
