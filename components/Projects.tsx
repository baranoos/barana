"use client";

const projects = [
  {
    title: "Mirror Mirror",
    description: "Portfolio website met dynamische content, projectshowcase en professionele presentatie van mijn developer journey.",
    seed: "mirrormirror",
    url: "https://mirror-mirror-barans-projects-ada00622.vercel.app/",
    image: "/Mirror.png"
  },
  {
    title: "Criminal Minds Blog",
    description: "Dynamisch blogplatform over misdaadzaken met categoriefilters, zoekfunctionaliteit en donker thema design.",
    seed: "criminalmindsblog",
    url: "https://criminalmindblog.free.nf",
    image: "/Criminalmind.png"
  },
  {
    title: "Brandweer Website",
    description: "Responsive website voor lokale brandweer met noodmeldingen, dienst-info en community engagement tools.",
    seed: "brandweerwebsite",
    url: "#",
    image: "/brandweer.png"
  },
  {
    title: "Flaared Bedrijfswebsite",
    description: "Demo bedrijfswebsite ontwikkeld tijdens mijn opleiding bij Scalda met professionele diensten, projectshowcase en modern design.",
    seed: "flaaredbusiness",
    url: "https://flaared.com",
    image: "/flaared.png"
  },
  {
    title: "Bank Applicatie",
    description: "Backend bankapplicatie met TypeScript voor accountbeheer en transacties via terminal interface.",
    seed: "bankapp",
    url: "https://github.com/-repo-bank-app",
    image: "/typebank.jpg"
  },
  {
    title: "LED Lamp Engineering",
    description: "Design van energiezuinige LED-lampen met innovatieve schakelingen en duurzame functionaliteit.",
    seed: "ledlamp",
    url: "#",
    image: "/led.jpg"
  },
  {
    title: "AI Robot Planner",
    description: "AI-gedreven planningstool met voorspellende algoritmes en real-time updates voor optimale productiviteit.",
    seed: "airobotplanner",
    url: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12" style={{ animation: 'slideUpFade 0.8s ease-out both' }}>
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
            return (
            <button
              key={index}
              className="relative overflow-hidden cursor-pointer group bg-gray-100 h-64"
              style={{ 
                animation: `slideUpFade 0.8s ease-out ${0.2 + index * 0.1}s both`
              }}
              onClick={() => window.open(project.url, '_blank')}
              aria-label={`Open ${project.title} project`}
            >
              <img
                src={imageSrc}
                alt={project.title}
                width={600}
                height={400}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-[clamp(1rem,4vw,1.5rem)] sm:text-[clamp(1.2rem,4vw,1.8rem)] font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 mt-1 line-clamp-2">{project.description}</p>
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