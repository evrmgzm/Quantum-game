import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, MousePointerClick, Rows3, LayoutGrid, Compass } from 'lucide-react';

export const GuideModal = ({ onClose }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-stone-200" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-stone-500 hover:text-stone-800 transition-colors p-1 rounded-full hover:bg-stone-200/80"><X size={20} /></button>
        <div className="space-y-4">
          <h3 className="font-serif font-semibold text-stone-800 text-xl">{t('guideTitle')}</h3>
          <ul className="space-y-3">
            <GuideItem icon={<MousePointerClick size={16} />} text={t('guideLine1')} />
            <GuideItem icon={<Compass size={16} className="text-rose-500" />} text={t('guideLine2')} />
            <GuideItem icon={<div className="font-mono font-bold text-xl">2</div>} text={t('guideDistance')} />
            <GuideItem icon={<Rows3 size={14} />} text={t('guideRowCol')} />
            <GuideItem icon={<LayoutGrid size={14} />} text={t('guideAdjacent')} />
          </ul>
        </div>
      </div>
    </div>
  );
};

const GuideItem = ({ icon, text }) => (
  <li className="flex items-start gap-4 text-stone-700">
    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-stone-200/70 rounded-md mt-0.5">{icon}</div>
    <p className="flex-1 text-[15px]" dangerouslySetInnerHTML={{ __html: text }} />
  </li>
);