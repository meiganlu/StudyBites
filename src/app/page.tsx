// src/app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-[#232323] bg-[radial-gradient(ellipse_at_top,#C4C3E3_0%,#F7F3E8_100%)]">
    {/* // <div className="min-h-screen bg-gradient-to-radial from-[#eff5d8] to-[#ffffff]"> */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl text-[#000000] mb-6">
              Find Your Perfect Study Spot
            </h1>
            <p className="text-lg text-[#5A5A5A] mb-8">
              Get recommendations tailored to your study needs.
              Discover libraries, cafes, and quiet spaces near you.
            </p>
          </div>

          <div className="flex-1 mt-10 md:mt-16 lg:mt-10">
            <div className="grid grid-cols-2 gap-4">
              <FeatureCard 
                title="Libraries"
                description="Quiet spaces with free WiFi and plenty of seating"
                icon="📚"
              />
              <FeatureCard 
                title="Cafes"
                description="Coffee shops perfect for productive work sessions"
                icon="☕"
              />
              <FeatureCard 
                title="Study Rooms"
                description="Dedicated spaces for focused learning"
                icon="🎯"
              />
              <FeatureCard 
                title="Reviews"
                description="Real feedback from fellow students"
                icon="⭐"
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
    <div className="bg-white/50 backdrop-blur-md border-b border-white/20 shadow-lg z-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg mb-2 text-[#595959]">{title}</h3>
      <p className="text-[#717171] text-sm">{description}</p>
    </div>
  );
}