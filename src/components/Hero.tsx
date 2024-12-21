import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] text-white px-4">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Your Amazing App
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Build something incredible with modern web technologies
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="group hover:scale-105 transition-transform duration-200"
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default Hero;