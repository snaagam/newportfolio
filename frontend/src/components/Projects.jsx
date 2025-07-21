import React, { useEffect, useState } from "react";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects = [
    {
      id: 1,
      title: "A.I.D.A (AI-Driven Analytics Assistant)",
      period: "Jan. 2025 – May 2025",
      description: "Built a Slack-based LLM tool that automated report generation with 95%+ accuracy, revolutionizing how business intelligence is delivered to stakeholders.",
      achievements: [
        "Built a Slack-based LLM tool with 95%+ accuracy that automated report generation, saving ~16 analyst hours weekly.",
        "Supported 10+ business intelligence use cases across marketing, sales, and operations teams.",
        "Integrated with existing data infrastructure to provide real-time insights.",
        "Reduced manual report generation time by 85% across the organization."
      ],
      technologies: ["Python", "LLM", "Slack API", "SQL", "Machine Learning", "Natural Language Processing"],
      category: "AI/ML",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      impact: {
        timeSaved: "16 hours/week",
        accuracy: "95%+",
        teamsSupported: "10+"
      }
    },
    {
      id: 2,
      title: "Sales Forecasting & Inventory Optimization",
      period: "Jun. 2024 – Aug. 2024",
      description: "Developed comprehensive forecasting models and optimization algorithms that significantly improved demand planning and reduced inventory costs.",
      achievements: [
        "Built SQL + Power BI models with 15% higher forecast accuracy and improved demand planning.",
        "Automated replenishment workflows to reduce inventory overstock by 18%.",
        "Created dynamic pricing models based on seasonal trends and market conditions.",
        "Implemented automated alerts for inventory threshold management."
      ],
      technologies: ["SQL", "Power BI", "Python", "Statistical Modeling", "Forecasting", "Excel VBA"],
      category: "Business Intelligence",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      impact: {
        accuracyImprovement: "15%",
        overstockReduction: "18%",
        costSavings: "$50K+"
      }
    },
    {
      id: 3,
      title: "Donor Segmentation & Campaign Analytics",
      period: "Feb. 2025 – May 2025",
      description: "Created sophisticated donor analysis system that transformed how a non-profit organization approaches fundraising and campaign management.",
      achievements: [
        "Implemented Python and SQL-based donor segmentation increasing marketing conversion by 15%.",
        "Built comprehensive Power BI dashboards for campaign performance tracking.",
        "Improved transparency in donation tracking by 75% through enhanced reporting.",
        "Developed predictive models to identify high-value donor prospects."
      ],
      technologies: ["Python", "SQL", "Power BI", "Predictive Modeling", "CRM Integration", "Statistical Analysis"],
      category: "Data Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      impact: {
        conversionIncrease: "15%",
        transparencyImprovement: "75%",
        campaignEfficiency: "40%"
      }
    },
    {
      id: 4,
      title: "Multi-Company BI Standardization",
      period: "Jan. 2023 – Jun. 2023",
      description: "Led cross-regional initiative to standardize business intelligence reporting across multiple product teams and geographical locations.",
      achievements: [
        "Standardized BI reports across 10+ projects improving data consistency.",
        "Reduced reporting lag time by 50% through process optimization.",
        "Created reusable dashboard templates and data modeling standards.",
        "Trained team members on best practices for data visualization and reporting."
      ],
      technologies: ["SAP", "Power BI", "SQL", "ETL", "Data Modeling", "Agile"],
      category: "Process Optimization",
      image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800",
      impact: {
        projectsStandardized: "10+",
        lagReduction: "50%",
        teamEfficiency: "35%"
      }
    }
  ];

  const categories = ["All", "AI/ML", "Business Intelligence", "Data Analytics", "Process Optimization"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className={`text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Relevant Projects</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Showcase of impactful projects that demonstrate my expertise in data analytics, 
              AI/ML implementation, and business intelligence solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 bg-white sticky top-16 z-40 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex justify-center space-x-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {project.period}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {Object.entries(project.impact).map(([key, value]) => (
                      <div key={key} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-blue-600">{value}</div>
                        <div className="text-xs text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  {selectedProject.category}
                </span>
                <span className="text-gray-600">{selectedProject.period}</span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedProject.title}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{selectedProject.description}</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Achievements</h3>
              <div className="space-y-3 mb-6">
                {selectedProject.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p className="text-gray-700 leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {selectedProject.technologies.map((tech) => (
                  <span key={tech} className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Impact Metrics</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(selectedProject.impact).map(([key, value]) => (
                  <div key={key} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{value}</div>
                    <div className="text-sm text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Interested in Similar Results?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how these proven methodologies can be applied to your organization's challenges.
          </p>
          <a 
            href="/contact" 
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
          >
            Discuss Your Project
          </a>
        </div>
      </section>
    </div>
  );
};

export default Projects;