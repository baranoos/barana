"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Mirror Mirror",
    description: "Mijn eerste portfolio website uit het eerste en begin tweede jaar van mijn studie. Hier moest ik alles in verwerken wat ik geleerd had en mijn verhaal vertellen.",
    seed: "mirrormirror",
    url: "https://mirror-mirror-barans-projects-ada00622.vercel.app/",
    image: "/Mirror.png"
  },
  {
    title: "Criminal Minds Blog",
    description: "Een blog die ik maakte met PHP en PHPMyAdmin met database. Als admin kan ik blogs toevoegen en bezoekers kunnen ze bekijken.",
    seed: "criminalmindsblog",
    url: "https://criminalmindblog.free.nf",
    image: "/Criminalmind.png"
  },
  {
    title: "Brandweer Website",
    description: "Een fictieve website die we voor school maakten voor Brandweer Koewacht. We moesten het hele team en de informatie erin verwerken.",
    seed: "brandweerwebsite",
    url: "https://brandweerman.vercel.app",
    image: "/brandweer.png"
  },
  {
    title: "Flaared Bedrijfswebsite",
    description: "Mijn eigen demo bedrijf voor school. Een simpel project waar ik verder niet zo veel mee gedaan heb.",
    seed: "flaaredbusiness",
    url: "https://flaared.com",
    image: "/flaared.png"
  },
  {
    title: "Bank Applicatie",
    description: "Een backend applicatie met TypeScript voor accountbeheer. Je kan accounts aanmaken, geld oversturen en transacties doen via de terminal in Visual Studio Code.",
    seed: "bankapp",
    url: "https://github.com/-repo-bank-app",
    image: "/image.png"
  },
  {
    title: "LED Lamp Engineering",
    description: "Een Arduino project waarbij we met energiezuinige LED lampen moesten werken en verschillende dingen ermee konden doen.",
    seed: "ledlamp",
    url: "#",
    image: "/arduino-led.jpg"
  },
  {
    title: "AI Robot Planner",
    description: "Een robot builder die stap voor stap uitlegt hoe je iets in elkaar zet. Met circuit diagrammen, prijzen en wat er nodig is. Kan ook AI images genereren met OpenAI.",
    seed: "airobotplanner",
    url: "https://ai-robot-planner-2x2e.vercel.app/",
    image: "/RoboSketch.png"
  }
];

export default function Projects() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="min-h-screen bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12" style={{ animation: isVisible ? 'slideUpFade 0.8s ease-out both' : 'none' }}>
          <h2 
            className="text-[clamp(2rem,6vw,4rem)] sm:text-[clamp(2.5rem,6vw,5rem)] md:text-[clamp(3rem,6vw,6rem)] lg:text-[clamp(3.5rem,6vw,7rem)] xl:text-[clamp(4rem,6vw,8rem)] font-black text-black"
            style={{ 
              fontFamily: 'Inter, sans-serif', 
              letterSpacing: '-0.08em' 
            }}
          >
            Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => {
            const imageSrc = project.image ?? `https://picsum.photos/600/400?seed=${project.seed}`;
            // Calculate row and column for staggered animation
            const row = Math.floor(index / 3);
            const col = index % 3;
            const delay = row * 0.5 + col * 0.2;
            return (
            <button
              key={index}
              className="relative overflow-hidden cursor-pointer group bg-gray-900 h-64"
              style={{ 
                animation: isVisible ? `slideUpFade 1.2s ease-out ${0.3 + delay}s both` : 'none'
              }}
              onClick={() => window.open(project.url, '_blank')}
              aria-label={`Open ${project.title} project`}
            >
              <img
                src={imageSrc}
                alt={project.title}
                width={600}
                height={400}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-50"
              />
              {/* Default overlay - shows truncated text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-[clamp(1rem,4vw,1.5rem)] sm:text-[clamp(1.2rem,4vw,1.8rem)] font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 mt-1 line-clamp-2">{project.description}</p>
              </div>
              {/* Hover overlay - shows full text */}
              <div className="absolute inset-0 p-4 sm:p-6 bg-black/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center">
                <h3 className="text-[clamp(1.2rem,4vw,2rem)] font-bold text-white mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">{project.description}</p>
              </div>
            </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
