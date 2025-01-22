import Image from 'next/image';

export default function Home() {
  return (
    <div className="h-full flex items-center">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="text-center max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl text-[#2C4A3E] mb-6">
              Find Your <span className="italic">Perfect</span> Study Spot
            </h1>
            <p className="text-lg text-[#515D5A]">
              Discover local spots near you specific to your study needs.
            </p>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard 
                title="Libraries"
                description="Quiet spaces with free WiFi and plenty of seating"
                icon="/icons/book.png"
              />
              <FeatureCard 
                title="Cafés"
                description="Coffee shops perfect for productive work sessions"
                icon="/icons/coffee.png"
              />
              <FeatureCard 
                title="Study Rooms"
                description="Dedicated spaces for focused learning"
                icon="/icons/notebook.png"
              />
              {/* <FeatureCard 
                title="Reviews"
                description="Real feedback from fellow students"
                icon="/icons/review.png"
              /> */}
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
    <div className="relative group">
      <div className="absolute inset-0 bg-sage-200 rounded-xl transition-all duration-300 group-hover:blur-sm"></div>
      <div className="relative bg-[#CACFBA] hover:bg-[#D2D7C2] p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-[#E5E7DC] rounded-full">
            <Image 
              src={icon} 
              alt={title}
              width={24} 
              height={24}
              className="w-6 h-6"
            />
          </div>
        </div>
        <h3 className="font-semibold text-[#2C4A3E] text-lg text-center mb-3">
          {title}
        </h3>
        <p className="text-[#515D5A] text-center text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}