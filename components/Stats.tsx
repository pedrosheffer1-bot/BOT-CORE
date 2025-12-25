import React, { useEffect, useState, useRef } from 'react';

const stats = [
  { label: "Usuários Ativos", value: 50, suffix: "k+" },
  { label: "Despesas Registradas", value: 1, suffix: "M+" },
  { label: "Avaliação Média", value: 4.9, suffix: "★", isFloat: true },
  { label: "Satisfação", value: 99, suffix: "%" },
];

const Counter: React.FC<{ end: number; duration?: number; isFloat?: boolean; suffix: string }> = ({ end, duration = 2000, isFloat = false, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function
      const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);
      
      const current = easeOutQuart(percentage) * end;
      setCount(current);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {isFloat ? count.toFixed(1) : Math.floor(count)}
      {suffix}
    </span>
  );
};

export const Stats: React.FC = () => {
  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                <Counter end={stat.value} suffix={stat.suffix} isFloat={stat.isFloat} />
              </div>
              <p className="text-sm md:text-base text-purple-400/80 uppercase tracking-wider font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};