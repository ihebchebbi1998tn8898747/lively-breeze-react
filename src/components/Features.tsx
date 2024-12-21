import { Rocket, Shield, Zap } from "lucide-react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const features = [
    {
      title: "Lightning Fast",
      description: "Built with performance in mind for the best user experience",
      Icon: Zap,
    },
    {
      title: "Secure",
      description: "Enterprise-grade security to protect your data",
      Icon: Shield,
    },
    {
      title: "Scalable",
      description: "Grows with your needs, from startup to enterprise",
      Icon: Rocket,
    },
  ];

  return (
    <div className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;