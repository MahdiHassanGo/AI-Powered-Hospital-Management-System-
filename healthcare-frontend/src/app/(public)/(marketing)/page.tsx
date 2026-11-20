import ChatWidget from "@/components/modules/chat/chat-widget";
import DepartmentsSection from "@/components/modules/homepage/DepartmentsSection";
import FeaturedDoctors from "@/components/modules/homepage/FeaturedDoctors";
import Hero from "@/components/modules/homepage/Hero";
import HowItWorksSection from "@/components/modules/homepage/HowItWorksSection";

export default function HomePage() {
  return (
    <div className="bg-white">
      <Hero />
      <DepartmentsSection />
      <FeaturedDoctors />
      <HowItWorksSection />
      <ChatWidget />
    </div>
  );
}
