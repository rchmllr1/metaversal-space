interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', glow = false, hover = true }: GlassCardProps) {
  return (
    <div
      className={`glass ${glow ? 'glow-cyan' : ''} ${hover ? 'hover:glow-cyan' : ''} p-6 ${className}`}
    >
      {children}
    </div>
  );
}
