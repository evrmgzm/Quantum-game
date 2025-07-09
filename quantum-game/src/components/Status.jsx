import React from 'react';
import { Check, X } from 'lucide-react';

export const StatDisplay = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 text-sm">
    {icon}
    <span className="font-medium">{label}</span>
    <span className="font-mono font-bold text-base text-stone-800">{value}</span>
  </div>
);

// DÜZELTİLDİ: Bu bileşen artık her koşulda hatasız çalışacak.
export const GameMessage = ({ text, type }) => {
  const styles = {
    won: { bg: 'bg-emerald-100/90', border: 'border-emerald-500', text: 'text-emerald-900', icon: <Check /> },
    lost: { bg: 'bg-rose-100/90', border: 'border-rose-500', text: 'text-rose-900', icon: <X /> },
  };

  // Hata önleme: Eğer 'type' geçerli değilse, bileşen hiçbir şey render etmez.
  const style = styles[type];
  if (!style) {
    return null;
  }

  return (
    <div className={`flex items-center gap-3 py-3 px-4 rounded-lg text-center font-medium ${style.bg} ${style.border} ${style.text} border-l-4 shadow-lg backdrop-blur-sm`}>
      {style.icon} <span className="flex-1">{text}</span>
    </div>
  );
};