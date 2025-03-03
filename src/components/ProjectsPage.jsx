import React, { useState, useEffect } from 'react';
import './styles/ProjectsPage.css';

const ProjectsPage = () => {
    const [activeProject, setActiveProject] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const projects = [
        {
            id: 1,
            title: "Gamenexplay",
            category: "Web Development",
            description: "A Fullstack website project to explore and play games for entertainment.",
            technologies: ["React", "Node.js", "MongoDB", "Express.js"],
            link: "gamenexplay.live"
        },
        {
            id: 2,
            title: "G.K Properties",
            category: "Web Development",
            description: "Track workouts, set goals, and monitor progress with this comprehensive fitness companion.",
            technologies: ["React", "Node.js", "MongoDB", "Express.js", "Github"],
            link: "gk-properties.onrender.com/"
        },
        {
            id: 3,
            title: "IT-Fest 2025",
            category: "Web Development",
            description: "Interactive dashboard that transforms complex data into actionable insights.",
            technologies: ["React", "Node.js", "MongoDB", "Express.js"],
            link: "gamenexplay.live"
        },
        {
            id: 4,
            title: "BCA-Department",
            category: "Web Development",
            description: "Centralized system for managing all smart devices in your home with voice commands.",
            technologies: ["HTML", "Javascript", "CSS", "Github"],
            link: "gamenexplay.live"
        }
    ];

    useEffect(() => {
        // Trigger entrance animations when component mounts
        setIsLoaded(true);
    }, []);

    return (
        <div className="projects-container">
            <div className={`header-section ${isLoaded ? 'loaded' : ''}`}>
                <div className="bg-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>
                <h1>My Projects</h1>
                <p>Explore my creative portfolio with innovative solutions</p>
            </div>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div
                        className={`project-card ${isLoaded ? 'loaded' : ''}`}
                        key={project.id}
                        style={{ animationDelay: `${index * 0.15}s` }}
                        onMouseEnter={() => setActiveProject(project.id)}
                        onMouseLeave={() => setActiveProject(null)}
                    >
                        <div className="project-content">
                            <div className="project-header">
                                <span className="project-category">{project.category}</span>
                                <h2>{project.title}</h2>
                            </div>

                            <p>{project.description}</p>

                            <div className="project-tech">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="tech-tag">{tech}</span>
                                ))}
                            </div>

                            <div className={`view-project ${activeProject === project.id ? 'active' : ''}`}>
                                <button onClick={() => window.location.href = project.link.startsWith("http") ? project.link : `https://${project.link}`}>
                                    View Details
                                </button>

                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="card-decoration">
                            <div className="dot dot-1"></div>
                            <div className="dot dot-2"></div>
                            <div className="dot dot-3"></div>
                            <div className="line line-1"></div>
                            <div className="line line-2"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Animated background elements */}
            <div className="floating-elements">
                <div className="float-element elem-1"></div>
                <div className="float-element elem-2"></div>
                <div className="float-element elem-3"></div>
                <div className="float-element elem-4"></div>
                <div className="float-element elem-5"></div>
            </div>
        </div>
    );
};

export default ProjectsPage;