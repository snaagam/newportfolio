import React, { useEffect, useState } from "react";

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const experiences = [
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
    {
      title: "Sales Analyst",
      company: "Harvest Table Culinary Group",
      location: "Worcester, MA",
      period: "Aug. 2024 – May 2025",
      achievements: [
        "Created SQL-driven dashboards to track performance metrics across sales and inventory for 50+ SKUs.",
        "Built predictive models and sales forecasts that improved seasonal pricing strategy and drove 15% revenue growth.",
        "Automated BI workflows in Tableau and Excel to streamline weekly sales planning.",
        "Led cost-benefit analysis of underperforming items, saving $20K annually."
      ]
    },
    {
      title: "Financial Analyst",
      company: "RnD Technosoft",
      location: "Vapi, India",
      period: "Jul. 2023 – Dec. 2023",
      achievements: [
        "Built Snowflake + SQL pipelines to automate data ingestion and modeling for sales and finance teams.",
        "Created Power BI dashboards to support revenue operations and reduce manual reports by 50%.",
        "Wrote functional specs and led sprint planning for CRM and marketing analytics projects.",
        "Applied statistical controls to validate sales KPIs and improve forecasting accuracy."
      ]
    },
    {
      title: "Data Analyst",
      company: "Tata Consultancy Services",
      location: "Mumbai, India",
      period: "Jan. 2023 – Jun. 2023",
      achievements: [
        "Automated SAP ETL workflows to clean and process large volumes of sales data, cutting manual effort by 60%.",
        "Supported dashboard development across 10+ projects by improving data accuracy and modeling standards.",
        "Collaborated with cross-regional product teams to standardize BI reports and align KPIs.",
        "Participated in Agile sprints to enhance CRM analytics, streamline workflows, and reduce reporting lag."
      ]
    },
    {
      title: "Business Data Analyst",
      company: "Darshan Trading (Private Distributor)",
      location: "Vapi, India",
      period: "Jan. 2020 – Dec. 2023",
      achievements: [
        "Analyzed sales data across 2,000+ SKUs to recover ₹5L in working capital.",
        "Designed Excel dashboards to monitor sales trends, forecasting, and inventory KPIs.",
        "Improved sales process accuracy by collaborating with cross-functional teams on workflow changes.",
        "Supported B2B sales ops with reporting systems that reduced dead stock by 25%."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-muted">
        <div className="container mx-auto px-6">
          <div className={`text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <h1 className="text-5xl font-bold text-foreground mb-6">Professional Experience</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              5+ years of driving business value through data analytics, business intelligence, 
              and strategic insights across various industries and organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-border hidden md:block"></div>
            
            {experiences.map((exp, index) => (
              <div key={index} className={`relative mb-12 ${
                index % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2 md:text-right"
              }`}>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-foreground rounded-full border-4 border-background shadow-lg hidden md:block z-10"></div>
                
                <div className={`bg-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 transform hover:scale-105 border border-border ${
                  index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={index % 2 === 0 ? "" : "md:text-right"}>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{exp.title}</h3>
                      <div className="text-foreground font-semibold text-lg mb-1">{exp.company}</div>
                      <div className="text-muted-foreground text-sm flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        {exp.location}
                      </div>
                    </div>
                    <div className="bg-muted text-foreground px-4 py-2 rounded-full text-sm font-medium">
                      {exp.period}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start">
                        <svg className="w-5 h-5 text-foreground mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <p className="text-muted-foreground leading-relaxed">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Gained */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Key Skills Developed
            </h2>
            <p className="text-xl text-muted-foreground">
              Technologies and methodologies mastered through hands-on experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-foreground rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-background" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h2v2H7V7zm4 0h2v2h-2V7zm4 0h2v2h-2V7zM7 11h2v2H7v-2zm4 0h6v2h-6v-2zM7 15h2v2H7v-2zm4 0h6v2h-6v-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Data Analysis & BI</h3>
              <p className="text-muted-foreground">Power BI, Tableau, SQL, Python, Excel, Snowflake</p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-foreground rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-background" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Automation & ETL</h3>
              <p className="text-muted-foreground">Workflow Automation, ETL Pipelines, Data Modeling</p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-foreground rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-background" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Business Impact</h3>
              <p className="text-muted-foreground">Revenue Growth, Cost Reduction, Process Improvement</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-background mb-6">
            Ready to Leverage This Experience?
          </h2>
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how my proven track record can contribute to your organization's success.
          </p>
          <a 
            href="/contact" 
            className="bg-background text-foreground px-8 py-4 rounded-full font-semibold hover:bg-background/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default Experience;