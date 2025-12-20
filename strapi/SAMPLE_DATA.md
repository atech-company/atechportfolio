# Sample Data Guide for Strapi

This guide provides sample data you can use to populate your Strapi CMS for testing.

## Home Page

### Hero Section
- **Title**: "Building Digital Excellence"
- **Subtitle**: "We craft premium software solutions that transform businesses and delight users. Experience the future of digital innovation."
- **CTA Text**: "Start Your Project"
- **CTA Link**: "/contact"

### CTA Section
- **Title**: "Ready to Start Your Project?"
- **Description**: "Let's work together to bring your vision to life. Get in touch and let's discuss how we can help."
- **CTA Text**: "Get Started"
- **CTA Link**: "/contact"

## Services

### 1. Web Development
- **Title**: "Web Development"
- **Slug**: "web-development"
- **Description**: "Modern, responsive web applications built with cutting-edge technologies for optimal performance and user experience."
- **Icon**: "web"

### 2. Mobile Apps
- **Title**: "Mobile Apps"
- **Slug**: "mobile-apps"
- **Description**: "Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android."
- **Icon**: "mobile"

### 3. API Development
- **Title**: "API Development"
- **Slug**: "api-development"
- **Description**: "Robust, scalable REST and GraphQL APIs designed for performance, security, and maintainability."
- **Icon**: "code"

### 4. Cloud Solutions
- **Title**: "Cloud Solutions"
- **Slug**: "cloud-solutions"
- **Description**: "Cloud infrastructure and deployment strategies to scale your applications efficiently and securely."
- **Icon**: "database"

### 5. Performance Optimization
- **Title**: "Performance Optimization"
- **Slug**: "performance-optimization"
- **Description**: "Speed up your applications with advanced optimization techniques and best practices."
- **Icon**: "performance"

### 6. Security & Compliance
- **Title**: "Security & Compliance"
- **Slug**: "security-compliance"
- **Description**: "Enterprise-grade security measures and compliance solutions to protect your data and users."
- **Icon**: "security"

## Projects

### Sample Project 1
- **Title**: "E-Commerce Platform"
- **Slug**: "ecommerce-platform"
- **Description**: "A modern e-commerce platform built with Next.js and Strapi, featuring real-time inventory management and seamless payment integration."
- **Featured**: true
- **Tech Stack**: ["Next.js", "Strapi", "PostgreSQL", "Stripe", "Tailwind CSS"]
- **Project URL**: "https://example.com"
- **GitHub URL**: "https://github.com/example"

### Sample Project 2
- **Title**: "SaaS Dashboard"
- **Slug**: "saas-dashboard"
- **Description**: "A comprehensive SaaS dashboard with analytics, user management, and subscription handling."
- **Featured**: true
- **Tech Stack**: ["React", "Node.js", "MongoDB", "Chart.js"]
- **Project URL**: "https://example.com"
- **GitHub URL**: "https://github.com/example"

### Sample Project 3
- **Title**: "Mobile Banking App"
- **Slug**: "mobile-banking-app"
- **Description**: "A secure mobile banking application with biometric authentication and real-time transaction updates."
- **Featured**: true
- **Tech Stack**: ["React Native", "Node.js", "PostgreSQL", "AWS"]
- **Project URL**: "https://example.com"

## Testimonials

### Testimonial 1
- **Name**: "John Smith"
- **Role**: "CEO"
- **Company**: "TechCorp"
- **Content**: "ATECH delivered an exceptional product that exceeded our expectations. Their team is professional, responsive, and truly understands modern web development."
- **Rating**: 5

### Testimonial 2
- **Name**: "Sarah Johnson"
- **Role**: "CTO"
- **Company**: "StartupXYZ"
- **Content**: "Working with ATECH was a game-changer for our business. They transformed our vision into a beautiful, functional application."
- **Rating**: 5

### Testimonial 3
- **Name**: "Michael Chen"
- **Role**: "Product Manager"
- **Company**: "InnovateLabs"
- **Content**: "The quality of work from ATECH is outstanding. They're not just developers, they're true partners in our success."
- **Rating**: 5

## Team Members

### Team Member 1
- **Name**: "Alex Thompson"
- **Role**: "Lead Developer"
- **Bio**: "Full-stack developer with 10+ years of experience building scalable web applications."
- **Social Links**:
  - LinkedIn: "https://linkedin.com/in/alexthompson"
  - GitHub: "https://github.com/alexthompson"
  - Twitter: "https://twitter.com/alexthompson"

### Team Member 2
- **Name**: "Emily Rodriguez"
- **Role**: "UI/UX Designer"
- **Bio**: "Creative designer passionate about creating beautiful, user-friendly interfaces."
- **Social Links**:
  - LinkedIn: "https://linkedin.com/in/emilyrodriguez"
  - Dribbble: "https://dribbble.com/emilyrodriguez"

### Team Member 3
- **Name**: "David Kim"
- **Role**: "DevOps Engineer"
- **Bio**: "Infrastructure specialist focused on cloud solutions and automation."
- **Social Links**:
  - LinkedIn: "https://linkedin.com/in/davidkim"
  - GitHub: "https://github.com/davidkim"

## Blog Posts

### Blog Post 1
- **Title**: "Getting Started with Next.js 14"
- **Slug**: "getting-started-with-nextjs-14"
- **Excerpt**: "Learn how to build modern web applications with Next.js 14 and its new App Router."
- **Content**: "Next.js 14 introduces exciting new features... [Full article content]"
- **Published At**: Current date
- **Category**: "Development"
- **Tags**: ["Next.js", "React", "Web Development"]

### Blog Post 2
- **Title**: "Best Practices for API Design"
- **Slug**: "best-practices-for-api-design"
- **Excerpt**: "Discover the key principles for designing robust and scalable APIs."
- **Content**: "API design is crucial for building maintainable applications... [Full article content]"
- **Published At**: Current date
- **Category**: "Backend"
- **Tags**: ["API", "Backend", "Best Practices"]

### Blog Post 3
- **Title**: "Modern UI Design Trends 2024"
- **Slug**: "modern-ui-design-trends-2024"
- **Excerpt**: "Explore the latest UI design trends shaping the web in 2024."
- **Content**: "Design trends evolve rapidly... [Full article content]"
- **Published At**: Current date
- **Category**: "Design"
- **Tags**: ["UI", "Design", "Trends"]

## Global Settings

- **Site Name**: "ATECH"
- **Social Links**:
  - Facebook: "https://facebook.com/atech"
  - Twitter: "https://twitter.com/atech"
  - LinkedIn: "https://linkedin.com/company/atech"
  - GitHub: "https://github.com/atech"
- **SEO Defaults**:
  - **Meta Title**: "ATECH - Premium Software Development Agency"
  - **Meta Description**: "ATECH is a premium software development agency specializing in modern web applications, mobile apps, and digital solutions."

## Tips for Adding Content

1. **Images**: Upload high-quality images (at least 1200px width for featured images)
2. **Slugs**: Use lowercase, hyphenated slugs (e.g., "web-development")
3. **Descriptions**: Write compelling, SEO-friendly descriptions
4. **Tech Stack**: Use consistent naming (e.g., "Next.js" not "nextjs")
5. **Dates**: Use realistic published dates for blog posts
6. **Ratings**: Use 4-5 stars for testimonials (realistic but positive)

## Bulk Import (Optional)

For large amounts of data, consider:
- Using Strapi's Import/Export plugin
- Creating a migration script
- Using the Strapi API to programmatically create content

---

Remember to publish all content after creating it in Strapi!

