// Mock data for the portfolio website
export const mockData = {
  // Blog posts mock data
  blogPosts: [
    {
      id: 1,
      title: "The Future of Data Analytics: Trends to Watch in 2025",
      excerpt: "Exploring the latest trends in data analytics, from AI-powered insights to real-time processing and predictive modeling that will shape the industry.",
      content: `
        <p>The data analytics landscape is evolving rapidly, with several key trends emerging that will define how we handle and interpret data in 2025 and beyond.</p>
        
        <h3>AI-Powered Analytics</h3>
        <p>Artificial intelligence is revolutionizing how we approach data analysis. Machine learning algorithms can now identify patterns and insights that would take human analysts weeks to discover.</p>
        
        <h3>Real-Time Processing</h3>
        <p>The demand for real-time insights is growing exponentially. Organizations need to make decisions based on current data, not historical reports.</p>
        
        <h3>Predictive Modeling</h3>
        <p>Advanced predictive models are becoming more accessible, allowing businesses to forecast trends and make proactive decisions rather than reactive ones.</p>
      `,
      author: "Aagam Shah",
      publishDate: "2025-01-15",
      tags: ["Data Analytics", "AI", "Machine Learning", "Trends"],
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
    },
    {
      id: 2,
      title: "Building Effective BI Dashboards: A Practitioner's Guide",
      excerpt: "Learn how to create compelling business intelligence dashboards that drive decision-making and deliver measurable business value.",
      content: `
        <p>Creating effective BI dashboards is both an art and a science. Here's what I've learned from building dozens of dashboards across various industries.</p>
        
        <h3>Know Your Audience</h3>
        <p>The most important step is understanding who will use your dashboard and what decisions they need to make.</p>
        
        <h3>Keep It Simple</h3>
        <p>Resist the urge to include every metric. Focus on the key performance indicators that truly matter.</p>
        
        <h3>Design for Action</h3>
        <p>Every visualization should lead to a potential action. If it doesn't, consider removing it.</p>
      `,
      author: "Aagam Shah",
      publishDate: "2025-01-10",
      tags: ["BI", "Dashboards", "Data Visualization", "Best Practices"],
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
    },
    {
      id: 3,
      title: "SQL Optimization Techniques That Saved Me Hours",
      excerpt: "Discover practical SQL optimization strategies that can dramatically improve query performance and reduce processing time.",
      content: `
        <p>After years of working with complex datasets, I've discovered several SQL optimization techniques that have saved countless hours of processing time.</p>
        
        <h3>Index Strategy</h3>
        <p>Proper indexing can make the difference between a query that runs in seconds versus hours. Here's how to approach it systematically.</p>
        
        <h3>Query Structure</h3>
        <p>The way you structure your queries can have a massive impact on performance. Small changes can yield big results.</p>
        
        <h3>Data Types Matter</h3>
        <p>Choosing the right data types isn't just about storage - it affects query performance significantly.</p>
      `,
      author: "Aagam Shah",
      publishDate: "2025-01-05",
      tags: ["SQL", "Database", "Performance", "Optimization"],
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800"
    }
  ],

  // Contact form submissions (mock storage)
  contactSubmissions: [],

  // Experience data (already in components but can be centralized here if needed)
  experiences: [
    {
      title: "Treasure Analyst",
      company: "The Marcus Harris Foundation",
      location: "Worcester, MA",
      period: "Feb. 2025 – May 2025",
      achievements: [
        "Built Power BI dashboards to track donations and campaign performance, aligning team strategy and improving transparency by 75%.",
        "Used Python and SQL for donor segmentation and predictive modeling, boosting marketing conversion by 15%.",
        "Enhanced CRM system reporting through data quality checks and validation workflows.",
        "Defined data use cases and collaborated on database design to improve analytics roadmap."
      ]
    },
    // Add more experiences here...
  ]
};

// Helper functions for mock data operations
export const mockAPI = {
  // Blog operations
  getBlogPosts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.blogPosts);
      }, 500);
    });
  },

  getBlogPost: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = mockData.blogPosts.find(p => p.id === parseInt(id));
        if (post) {
          resolve(post);
        } else {
          reject(new Error('Post not found'));
        }
      }, 300);
    });
  },

  // Contact form submission
  submitContactForm: (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const submission = {
          ...formData,
          id: Date.now(),
          submittedAt: new Date().toISOString(),
          status: 'received'
        };
        mockData.contactSubmissions.push(submission);
        resolve(submission);
      }, 1000);
    });
  }
};