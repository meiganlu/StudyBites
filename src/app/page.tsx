import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Main heading section */}
          <div className="text-center max-w-5xl mb-24">
            <h1 className="text-3xl md:text-6xl text-[#292929]/90 mt-6 mb-6">
              Find Your <span className="italic">Perfect</span> Study Spot
            </h1>
            <p className="text-xl md:text-2xl text-[#292929]/80 max-w-2xl mx-auto font-light tracking-wide">
              Effortless access to your ideal study space.
            </p>
          </div>

          {/* Feature cards section with increased spacing */}
          <div className="w-full px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <FeatureCard 
                title="Find Local Libraries"
                description="Quiet spaces with free WiFi and plenty of seating"
                icon="/icons/book.png"
              />
              <FeatureCard 
                title="Discover New Cafés"
                description="Coffee shops perfect for productive work sessions"
                icon="/icons/coffee.png"
              />
              <FeatureCard 
                title="See Their Study Score"
                description="An evaluation based on noise, amenities, comfort, and ambience"
                icon="/icons/notebook.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { 
  title: string; 
  description: string; 
  icon: string;
}) {
  return (
    <div className="group">
      <div className="bg-white/40 hover:bg-white/50 p-8 rounded-2xl backdrop-blur-md
        transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1 
        border border-white/20">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white/20 rounded-full backdrop-blur-md
            transition-transform duration-500 group-hover:scale-110">
            <Image 
              src={icon} 
              alt={title}
              width={28} 
              height={28}
              className="w-7 h-7"
            />
          </div>
        </div>
        <h3 className="font-light text-[#292929] text-2xl text-center mb-4">
          {title}
        </h3>
        <p className="text-[#292929]/80 text-center text-lg leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}