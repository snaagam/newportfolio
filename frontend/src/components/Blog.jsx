import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/blog/posts`);
      setBlogPosts(response.data);
    } catch (error) {
      console.error("Error loading blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const openPost = async (postId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/blog/posts/${postId}`);
      setSelectedPost(response.data);
    } catch (error) {
      console.error("Error loading blog post:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTagColor = (index) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-purple-100 text-purple-800",
      "bg-green-100 text-green-800",
      "bg-orange-100 text-orange-800"
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className={`text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Insights, experiences, and best practices from the world of data analytics, 
              business intelligence, and digital transformation.
            </p>
          </div>
        </div>
      </section>

      {blogPosts.length === 0 ? (
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <div className="bg-white rounded-2xl p-12 shadow-lg max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Blog Coming Soon</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                I'm working on creating valuable content about data analytics, business intelligence, 
                and insights from my professional experience. Check back soon for new articles!
              </p>
              <a 
                href="/contact" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 inline-block"
              >
                Get Notified
              </a>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Post */}
          {blogPosts.length > 0 && (
            <section className="py-16">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Article</h2>
                <div className="max-w-4xl mx-auto">
                  <div 
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
                    onClick={() => openPost(blogPosts[0].id)}
                  >
                    <div className="relative h-64 md:h-96 overflow-hidden">
                      <img 
                        src={blogPosts[0].image} 
                        alt={blogPosts[0].title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-6 left-6">
                        <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-4 py-2 rounded-full font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <span>{formatDate(blogPosts[0].publish_date)}</span>
                        <span className="mx-2">•</span>
                        <span>{blogPosts[0].read_time}</span>
                        <span className="mx-2">•</span>
                        <span>{blogPosts[0].author}</span>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {blogPosts[0].title}
                      </h3>
                      
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {blogPosts[0].excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {blogPosts[0].tags.map((tag, index) => (
                          <span 
                            key={tag}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getTagColor(index)}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Other Posts */}
          {blogPosts.length > 1 && (
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">More Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {blogPosts.slice(1).map((post) => (
                    <div 
                      key={post.id}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105 cursor-pointer"
                      onClick={() => openPost(post.id)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <span>{formatDate(post.publish_date)}</span>
                          <span className="mx-2">•</span>
                          <span>{post.read_time}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span 
                              key={tag}
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getTagColor(index)}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Blog Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <span>{formatDate(selectedPost.publish_date)}</span>
                <span className="mx-2">•</span>
                <span>{selectedPost.read_time}</span>
                <span className="mx-2">•</span>
                <span>{selectedPost.author}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {selectedPost.title}
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag, index) => (
                  <span 
                    key={tag}
                    className={`px-3 py-2 rounded-full font-medium ${getTagColor(index)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Want to Discuss These Topics?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            I'm always open to conversations about data analytics, business intelligence, and technology trends.
          </p>
          <a 
            href="/contact" 
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
          >
            Start a Conversation
          </a>
        </div>
      </section>
    </div>
  );
};

export default Blog;