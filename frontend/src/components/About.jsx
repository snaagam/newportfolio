import React, { useEffect, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const coreSkills = {
    "Data & Analytics": [
      "Data Analysis", "SQL", "Python", "Tableau", "Power BI", "Excel (Advanced)",
      "Forecasting", "Predictive Models", "ETL", "Automation", "Data Warehousing",
      "Data Visualization", "Data Modeling", "Data Manipulation", "Data Quality", "Database Design"
    ],
    "Sales & Operations": [
      "Sales Operations", "Revenue Operations", "Inventory Management", "CRM Systems",
      "Salesforce", "Performance Metrics", "Sales Forecasting", "Sales Processes", "Marketing", "B2B"
    ],
    "Product & Project": [
      "Business Intelligence", "BI Tools", "Use Case Design", "Workflow Automation",
      "Functional Requirements", "Strategic Planning", "Sprint Planning", "Scrum"
    ],
    "Communication": [
      "Stakeholder Management", "Analytical Thinking", "Communication Skills",
      "Presentation", "Attention to Detail", "Accuracy", "Problem Solving"
    ]
  };

  const education = [
    {
      degree: "M.S. in Data Analytics",
      school: "Clark University, Worcester, MA",
      gpa: "3.73 GPA",
      year: "May 2025"
    },
    {
      degree: "B.T. in Computer Science & Engineering",
      school: "CHARUSAT University, Changa, India",
      gpa: "3.6 GPA",
      year: "May 2023"
    }
  ];

  const certifications = [
    "Tableau Desktop Specialist",
    "Project Management Foundations (LinkedIn Learning)",
    "Data Analytics for Business Professionals",
    "AWS Educate Machine Learning Foundations"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-muted">
        <div className="container mx-auto px-6">
          <div className={`text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <h1 className="text-5xl font-bold text-foreground mb-6">About Me</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Detail-oriented analyst with 5+ years of experience in data analysis, BI, SQL, 
              sales operations, and data modeling. Known for building predictive models, 
              improving workflows, and translating complex data into insights that drive 
              revenue and operational decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Info */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Data-Driven Professional
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Based in Edison, NJ, I bring a unique blend of technical expertise and 
                business acumen to every project. My passion lies in uncovering insights 
                from complex datasets and transforming them into actionable strategies 
                that drive measurable business results.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Throughout my career, I've consistently delivered value by automating 
                workflows, building predictive models, and creating comprehensive BI 
                dashboards that empower stakeholders to make informed decisions.
              </p>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Edison, NJ
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  (984) 895-2475
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-foreground rounded-2xl p-8 text-background text-center shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-bold mb-2">5+</div>
                <div className="text-lg mb-4">Years of Experience</div>
                <div className="text-sm opacity-90">
                  Specialized in turning data into actionable business insights
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Core Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(coreSkills).map(([category, skills]) => (
              <div key={category} className="bg-background rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span 
                      key={skill}
                      className="bg-muted text-foreground px-3 py-1 rounded-full text-sm font-medium hover:bg-accent transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Education</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-muted rounded-xl p-6 border border-border hover:border-foreground/20 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-xl font-bold text-foreground mb-2">{edu.degree}</h3>
                <p className="text-foreground font-semibold mb-2">{edu.school}</p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{edu.gpa}</span>
                  <span>{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-background mb-12 text-center">
            Certifications & Training
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-background/10 backdrop-blur-md rounded-lg p-4 text-background hover:bg-background/20 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-background/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  <span className="font-medium">{cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;