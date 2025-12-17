type Props = {
  title: string;
  description: string;
  icon: string;
  level: "Mudah" | "Sedang" | "Sulit";
  onClick: () => void;
};

export default function MissionCard({ title, description, icon, level, onClick }: Props) {
  const badgeClass =
    level === "Mudah" ? "badge-easy" : level === "Sedang" ? "badge-medium" : "badge-hard";
  
  const levelEmoji = level === "Mudah" ? "🌱" : level === "Sedang" ? "⚡" : "🔥";

  return (
    <div className="mission-card p-4 md:p-5 flex flex-col min-h-[220px] group cursor-pointer" onClick={onClick}>
      {/* Header with icon and badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300" aria-hidden>
            {icon}
          </span>
        </div>
        <span className={`badge ${badgeClass} text-[10px] md:text-xs`}>
          {levelEmoji} {level}
        </span>
      </div>

      {/* Content */}
      <div className="mt-4 flex-1">
        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">{description}</p>
      </div>

      {/* CTA Button */}
      <button 
        type="button" 
        className="mt-4 w-full btn-gradient rounded-xl py-3 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all"
      >
        <span>Mulai Misi</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </button>
    </div>
  );
}
