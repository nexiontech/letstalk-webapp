import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Chip,
  Avatar,
  Divider,
  Button,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  CalendarToday,
  Person,
  AccessTime,
  ArrowBack,
  Share,
  Facebook,
  Twitter,
  LinkedIn,
} from '@mui/icons-material';
import AdSenseAd from '../../components/AdSenseAd';
import SEOHelmet from '../../components/SEOHelmet';
import { FeaturedImage, ContentImage } from '../../components/BlogImages';

const BlogPostPage = () => {
  const { slug } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [contentSections, setContentSections] = useState([]);

  // Split content into sections for ad insertion
  useEffect(() => {
    const post = getBlogPost(slug);
    if (post && post.content) {
      // Split content by h2 tags for strategic ad placement
      const sections = post.content.split('<h2>').filter(section => section.trim());
      setContentSections(sections);
    }
  }, [slug]);

  // Blog post data - will be moved to a separate data file or API
  const getBlogPost = slug => {
    const posts = {
      'revolutionizing-municipal-services': {
        id: 1,
        title: "Let's Talk: Revolutionizing Municipal Services in South Africa",
        excerpt:
          'Discover how digital transformation is changing the way South African citizens interact with their local government services through innovative technology solutions.',
        category: 'Municipal Services',
        author: "Let's Talk Team",
        authorAvatar: '/images/authors/letstalk-team.jpg',
        date: '2025-06-06',
        image: '/images/blog/municipal-services-hero.jpg',
        tags: [
          'municipal services',
          'digital transformation',
          'south africa',
          'government technology',
        ],
        readTime: '8 min read',
        content: `
          <p>South Africa's municipal landscape is undergoing a revolutionary transformation. As we move deeper into the digital age, local governments across the nation are embracing technology to improve service delivery, enhance citizen engagement, and create more efficient administrative processes.</p>

          <h2>The Digital Revolution in Local Government</h2>
          <p>The traditional model of municipal service delivery – long queues, paper-based processes, and limited communication channels – is rapidly becoming obsolete. Modern South African citizens expect the same level of digital convenience from their local government that they receive from private sector services.</p>

          <p>Let's Talk represents the forefront of this transformation, providing a comprehensive platform that bridges the gap between citizens and their municipal services. Our innovative approach combines user-friendly design with robust functionality to create an ecosystem where government services are accessible, transparent, and efficient.</p>

          <h2>Key Features Driving Change</h2>
          <h3>Real-Time Service Issue Reporting</h3>
          <p>Citizens can now report municipal issues such as water outages, road damage, or waste collection problems directly through their mobile devices. GPS integration ensures precise location data, while real-time tracking keeps residents informed about resolution progress.</p>

          <h3>Digital Payment Solutions</h3>
          <p>Gone are the days of standing in long queues to pay municipal bills. Our secure online payment system allows residents to settle utilities, rates, and service fees from the comfort of their homes, with instant confirmation and digital receipts.</p>

          <h3>Community Engagement Hub</h3>
          <p>The platform facilitates direct communication between citizens and municipal officials, creating transparency and accountability in local government operations. Community forums enable residents to discuss local issues and collaborate on solutions.</p>

          <h2>Impact on Service Delivery</h2>
          <p>The implementation of digital municipal services has shown remarkable improvements in service delivery metrics across participating municipalities:</p>
          <ul>
            <li>Average issue resolution time reduced by 40%</li>
            <li>Citizen satisfaction scores increased by 65%</li>
            <li>Administrative costs decreased by 30%</li>
            <li>Service accessibility improved for rural communities</li>
          </ul>

          <h2>Success Stories from the Field</h2>
          <p>Municipalities that have embraced digital transformation are seeing tangible benefits. Bela Bela Municipality, an early adopter of digital customer service solutions, has become a model for other local governments. Their success demonstrates that with the right technology and commitment, municipal services can be transformed to meet modern citizen expectations.</p>

          <h2>The Future of Municipal Services</h2>
          <p>As we look toward the future, the potential for further innovation in municipal services is enormous. Artificial intelligence, machine learning, and IoT technologies will continue to enhance service delivery, predict maintenance needs, and improve resource allocation.</p>

          <p>The Let's Talk platform is designed to evolve with these technological advances, ensuring that South African municipalities remain at the forefront of digital government innovation.</p>

          <h2>Getting Started with Digital Municipal Services</h2>
          <p>For citizens ready to embrace the digital transformation of municipal services, getting started is simple. The Let's Talk platform offers intuitive navigation, comprehensive support resources, and a user-friendly interface designed specifically for South African users.</p>

          <p>Whether you're reporting a service issue, paying bills, or engaging with your community, the platform provides a seamless experience that puts citizen needs first.</p>

          <h2>Conclusion</h2>
          <p>The revolution in South African municipal services is not just about technology – it's about creating better communities, improving quality of life, and building stronger connections between citizens and their local government. As more municipalities adopt digital solutions, we're moving toward a future where efficient, transparent, and accessible government services are the norm rather than the exception.</p>

          <p>Join the revolution. Experience the future of municipal services with Let's Talk.</p>
        `,
      },
    };
    return posts[slug];
  };

  const post = getBlogPost(slug);

  if (!post) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Blog post not found
        </Typography>
        <Button component={Link} to="/blog" startIcon={<ArrowBack />}>
          Back to Blog
        </Button>
      </Container>
    );
  }

  const getCategoryColor = category => {
    const colors = {
      'Municipal Services': 'primary',
      'Government Guides': 'secondary',
      'Community Stories': 'success',
      'News Updates': 'info',
    };
    return colors[category] || 'default';
  };

  const shareUrl = `https://letstalkbi.co.za/blog/${slug}`;
  const shareTitle = post.title;

  // Enhanced Ad Components for Maximum Revenue
  const HeaderAd = () => (
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <AdSenseAd
        slot="6544714660"
        format={isMobile ? "auto" : "leaderboard"}
        style={{
          display: 'block',
          textAlign: 'center',
          minHeight: isMobile ? '50px' : '90px',
          maxWidth: '100%'
        }}
        minContentLength={400}
      />
    </Box>
  );

  const InContentAd = ({ index }) => (
    <Box sx={{ my: 4, textAlign: 'center' }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
        Advertisement
      </Typography>
      <AdSenseAd
        slot="4214673608"
        format="auto"
        style={{
          display: 'block',
          textAlign: 'center',
          minHeight: '250px',
          maxWidth: '100%',
          margin: '0 auto'
        }}
        minContentLength={400}
      />
    </Box>
  );

  const SidebarAd = ({ type = 'skyscraper' }) => (
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
        Advertisement
      </Typography>
      <AdSenseAd
        slot="2059283552"
        format="auto"
        style={{
          display: 'block',
          textAlign: 'center',
          minHeight: type === 'skyscraper' ? '600px' : '250px',
          maxWidth: '100%'
        }}
        minContentLength={300}
      />
    </Box>
  );

  const MobileAd = () => (
    <Box sx={{ my: 3, textAlign: 'center', display: { xs: 'block', md: 'none' } }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
        Advertisement
      </Typography>
      <AdSenseAd
        slot="6544714660"
        format="auto"
        style={{
          display: 'block',
          textAlign: 'center',
          minHeight: '50px',
          maxWidth: '320px',
          margin: '0 auto'
        }}
        minContentLength={200}
      />
    </Box>
  );

  const FooterAd = () => (
    <Box sx={{ mt: 6, textAlign: 'center' }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
        Advertisement
      </Typography>
      <AdSenseAd
        slot="6544714660"
        format={isMobile ? "auto" : "leaderboard"}
        style={{
          display: 'block',
          textAlign: 'center',
          minHeight: isMobile ? '50px' : '90px',
          maxWidth: '100%'
        }}
        minContentLength={400}
      />
    </Box>
  );

  return (
    <>
      <SEOHelmet
        title={`${post.title} | Let's Talk Blog`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        canonicalUrl={shareUrl}
        ogType="article"
        ogImage={post.image}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          author: {
            '@type': 'Person',
            name: post.author,
          },
          publisher: {
            '@type': 'Organization',
            name: "Let's Talk",
            logo: {
              '@type': 'ImageObject',
              url: 'https://letstalkbi.co.za/logo.png',
            },
          },
          datePublished: post.date,
          dateModified: post.date,
        }}
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Back Button */}
        <Button
          component={Link}
          to="/blog"
          startIcon={<ArrowBack />}
          sx={{ mb: 3 }}
        >
          Back to Blog
        </Button>

        {/* Header Ad - Maximum Revenue Placement */}
        <HeaderAd />

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            <article>
              {/* Post Header */}
              <Box sx={{ mb: 4 }}>
                <Chip
                  label={post.category}
                  color={getCategoryColor(post.category)}
                  sx={{ mb: 2 }}
                />

                <Typography
                  variant="h1"
                  component="h1"
                  gutterBottom
                  sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
                >
                  {post.title}
                </Typography>

                <Typography
                  variant="h2"
                  component="p"
                  color="text.secondary"
                  sx={{ fontSize: '1.2rem', mb: 3 }}
                >
                  {post.excerpt}
                </Typography>

                {/* Author and Meta Info */}
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}
                >
                  <Avatar src={post.authorAvatar} alt={post.author} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {post.author}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <CalendarToday fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(post.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <AccessTime fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {post.readTime}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Featured Image */}
                <FeaturedImage slug={slug} />
              </Box>

              {/* Enhanced Post Content with Strategic Ad Placement */}
              <Box sx={{ position: 'relative' }}>
                {/* First content section */}
                <Box
                  sx={{
                    '& h2': {
                      fontSize: '1.75rem',
                      fontWeight: 'bold',
                      mt: 4,
                      mb: 2,
                      color: 'primary.main',
                    },
                    '& h3': {
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      mt: 3,
                      mb: 2,
                    },
                    '& p': {
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      mb: 2,
                    },
                    '& ul': {
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      mb: 2,
                      pl: 3,
                    },
                    '& li': {
                      mb: 1,
                    },
                  }}
                >
                  {/* Split content for strategic ad insertion */}
                  <div dangerouslySetInnerHTML={{ __html: post.content.split('<h2>')[0] }} />

                  {/* First Content Image */}
                  <ContentImage slug={slug} index={0} />

                  {/* First In-Content Ad after introduction */}
                  <InContentAd index={1} />

                  {/* Middle content sections with ads */}
                  {post.content.split('<h2>').slice(1, 3).map((section, index) => (
                    <div key={index}>
                      <div dangerouslySetInnerHTML={{ __html: `<h2>${section}` }} />
                      {index === 0 && <ContentImage slug={slug} index={1} />}
                      {index === 1 && <InContentAd index={2} />}
                      {index === 1 && <ContentImage slug={slug} index={2} />}
                    </div>
                  ))}

                  {/* Mobile Ad for better mobile revenue */}
                  <MobileAd />

                  {/* Remaining content */}
                  {post.content.split('<h2>').slice(3).map((section, index) => (
                    <div key={index + 3}>
                      <div dangerouslySetInnerHTML={{ __html: `<h2>${section}` }} />
                    </div>
                  ))}
                </Box>
              </Box>

              {/* Tags */}
              <Box sx={{ mt: 4, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Tags
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {post.tags.map(tag => (
                    <Chip
                      key={tag}
                      label={tag}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Share Buttons */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Share this article
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Facebook />}
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Twitter />}
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<LinkedIn />}
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Button>
                </Box>
              </Box>
            </article>
          </Grid>

          {/* Enhanced Sidebar with Maximum Ad Revenue */}
          <Grid item xs={12} lg={4}>
            {/* Primary Sidebar Ad - Skyscraper */}
            <SidebarAd type="skyscraper" />

            {/* Secondary Sidebar Ad - Rectangle */}
            <SidebarAd type="rectangle" />

            {/* Related Articles */}
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Related Articles
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Link
                    to="/blog/bela-bela-municipality-success"
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ '&:hover': { textDecoration: 'underline' } }}
                    >
                      Learning from Bela Bela Municipality's Digital Innovation
                      Success
                    </Typography>
                  </Link>
                  <Link
                    to="/blog/digital-municipal-service-guide"
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ '&:hover': { textDecoration: 'underline' } }}
                    >
                      Complete Guide to Digital Municipal Service Access in 2025
                    </Typography>
                  </Link>
                  <Link
                    to="/blog/technology-transforming-local-government"
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ '&:hover': { textDecoration: 'underline' } }}
                    >
                      How Technology is Transforming Local Government in South
                      Africa
                    </Typography>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Footer Ad - Maximum Revenue Placement */}
        <FooterAd />
      </Container>
    </>
  );
};

export default BlogPostPage;
