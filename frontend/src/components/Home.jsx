import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    "Data Analysis", "SQL", "Python", "Tableau", "Power BI", "Excel", 
    "Forecasting", "Predictive Models", "ETL", "Machine Learning"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1650327034581-1711a15a5430?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzfGVufDB8fHxibHVlfDE3NTMwNjE0NTh8MA&ixlib=rb-4.1.0&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-6 text-center text-background">
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-background">
              Aagam Shah
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-cream-100">
              Data Analytics Professional
            </p>
            <p className="text-lg md:text-xl mb-8 text-cream-200 max-w-3xl mx-auto leading-relaxed">
              Detail-oriented analyst with 5+ years of experience in data analysis, 
              BI, SQL, sales operations, and data modeling. Transforming complex data 
              into insights that drive revenue and operational decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                to="/experience" 
                className="bg-background text-foreground px-8 py-4 rounded-full font-semibold hover:bg-muted transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View My Work
              </Link>
              <Link 
                to="/contact" 
                className="border-2 border-background text-background px-8 py-4 rounded-full font-semibold hover:bg-background hover:text-foreground transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get In Touch
              </Link>
            </div>

            <div className="flex justify-center space-x-6">
              <a 
                href="https://www.linkedin.com/in/aagam-n-shah" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background hover:text-cream-300 transform hover:scale-110 transition-all duration-300"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="mailto:snaagam@gmail.com"
                className="text-background hover:text-cream-300 transform hover:scale-110 transition-all duration-300"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636C.732 21.002 0 20.27 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.910 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Core Skills</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expertise across data analytics, business intelligence, and sales operations
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <span 
                key={skill}
                className={`bg-muted border border-border text-foreground px-6 py-3 rounded-full font-medium hover:bg-accent hover:border-foreground/20 transform hover:scale-105 transition-all duration-300 cursor-default ${
                  isVisible ? "animate-fade-in" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-foreground">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center text-background">
            <div className="transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-xl">Years Experience</div>
            </div>
            <div className="transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-xl">Projects Completed</div>
            </div>
            <div className="transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold mb-2">15%</div>
              <div className="text-xl">Average Revenue Improvement</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Data Into Insights?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how my data analytics expertise can drive your business forward.
          </p>
          <Link 
            to="/contact" 
            className="bg-foreground text-background px-10 py-4 rounded-full font-semibold hover:bg-foreground/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
          >
            Start the Conversation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;