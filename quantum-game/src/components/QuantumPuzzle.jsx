import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FlaskConical, Compass, BookText, RefreshCw, Check, X, Eye, Sigma, Rows3, LayoutGrid } from 'lucide-react';
import { GuideModal } from './GuideModal';
import { StatDisplay, GameMessage } from './Status';
import LanguageSwitcher from './LanguageSwitcher';

const QuantumPuzzle = () => {
  const { t } = useLanguage();
  const [gridSize] = useState(6);
  const [particles, setParticles] = useState([]);
  const [observations, setObservations] = useState({});
  const [markedCells, setMarkedCells] = useState(new Set());
  const [energy, setEnergy] = useState(12);
  const [gameState, setGameState] = useState('playing');
  const [moves, setMoves] = useState(0);
  const [showGuide, setShowGuide] = useState(false);
  
  const PARTICLE_COUNT = 4;

  const initializeGame = useCallback(() => {
    const newParticles = [];
    while (newParticles.length < PARTICLE_COUNT) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      if (!newParticles.some(p => p.row === row && p.col === col)) {
        newParticles.push({ row, col });
      }
    }
    setParticles(newParticles);
    setObservations({});
    setMarkedCells(new Set());
    setEnergy(12);
    setGameState('playing');
    setMoves(0);
    setShowGuide(false);
  }, [gridSize]);

  useEffect(() => { initializeGame(); }, [initializeGame]);

  const calculateDistance = (r1, c1, r2, c2) => Math.abs(r1 - r2) + Math.abs(c1 - c2);
  const findClosestParticle = (row, col) => particles.reduce((minDist, p) => Math.min(minDist, calculateDistance(row, col, p.row, p.col)), Infinity);
  const countParticlesInRowCol = (row, col) => particles.filter(p => (p.row === row || p.col === col) && !(p.row === row && p.col === col)).length;
  const countAdjacentParticles = (row, col) => { let count = 0; for (let dr = -1; dr <= 1; dr++) { for (let dc = -1; dc <= 1; dc++) { if (dr === 0 && dc === 0) continue; if (particles.some(p => p.row === row + dr && p.col === col + dc)) { count++; } } } return count; };

  const handleCellClick = (row, col) => {
    const cellKey = `${row}-${col}`;
    if (gameState !== 'playing' || observations[cellKey] || energy <= 0) return;
    setObservations(prev => ({ ...prev, [cellKey]: { hasParticle: particles.some(p => p.row === row && p.col === col), closestDistance: findClosestParticle(row, col), rowColCount: countParticlesInRowCol(row, col), adjacentCount: countAdjacentParticles(row, col) } }));
    setEnergy(prev => prev - 1);
    setMoves(prev => prev + 1);
  };

  const handleRightClick = (e, row, col) => {
    e.preventDefault();
    if (gameState !== 'playing') return;
    const cellKey = `${row}-${col}`;
    const newMarkedCells = new Set(markedCells);
    newMarkedCells.has(cellKey) ? newMarkedCells.delete(cellKey) : newMarkedCells.add(cellKey);
    setMarkedCells(newMarkedCells);
  };

  const handleConfirmGuess = () => {
    if (gameState !== 'playing' || markedCells.size !== PARTICLE_COUNT) return;
    const correctMarks = Array.from(markedCells).filter(key => 
      particles.some(p => `${p.row}-${p.col}` === key)
    ).length;
    setGameState(correctMarks === PARTICLE_COUNT ? 'won' : 'lost');
  };

  const renderCell = (row, col) => {
    const cellKey = `${row}-${col}`;
    const observation = observations[cellKey];
    const isMarked = markedCells.has(cellKey);
    const isRevealed = gameState !== 'playing';
    const hasParticle = particles.some(p => p.row === row && p.col === col);
    let cellClasses = "relative flex items-center justify-center aspect-square rounded-md transition-all duration-300 ease-in-out shadow-inner ";
    if (isRevealed) {
      if (hasParticle && isMarked) cellClasses += "bg-emerald-200"; else if (hasParticle && !isMarked) cellClasses += "bg-amber-200 animate-pulse"; else if (!hasParticle && isMarked) cellClasses += "bg-rose-200"; else cellClasses += "bg-stone-100";
    } else {
      cellClasses += observation ? "bg-white cursor-pointer" : "bg-stone-200/70 hover:bg-stone-300/80 cursor-pointer";
    }
    return (
      <div key={cellKey} className={cellClasses} onClick={() => handleCellClick(row, col)} onContextMenu={(e) => handleRightClick(e, row, col)}>
        {observation && !isRevealed && (observation.hasParticle ? <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30"></div> : <div className="flex flex-col items-center justify-center text-stone-700 w-full h-full p-1"><span className="font-mono font-extrabold text-2xl leading-none">{observation.closestDistance}</span><div className="flex justify-around w-full text-xs text-stone-500 mt-1">{observation.rowColCount > 0 && <span className="flex items-center gap-0.5"><Rows3 size={10}/>{observation.rowColCount}</span>}{observation.adjacentCount > 0 && <span className="flex items-center gap-0.5"><LayoutGrid size={10}/>{observation.adjacentCount}</span>}</div></div>)}
        {isMarked && !isRevealed && <Compass className="text-rose-500" size={24} />}
        {isRevealed && hasParticle && <FlaskConical className={isMarked ? "text-emerald-700" : "text-amber-700"} size={28} />}
        {isRevealed && !hasParticle && isMarked && <span className="text-2xl font-bold text-rose-600">×</span>}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm mx-auto bg-white border border-stone-200/70 rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col gap-5">
        <header className="relative flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-semibold text-stone-800">{t('title')}</h1>
            <p className="text-stone-500 text-sm mt-1">{t('subtitle')}</p>
          </div>
          <button onClick={() => setShowGuide(true)} aria-label={t('btnGuide')} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-stone-500 hover:text-stone-800 transition-colors rounded-full hover:bg-stone-200/80"><BookText size={20} /></button>
        </header>
        <div className="flex justify-between items-center border-t border-b border-stone-200/80 py-3 text-stone-600">
            <StatDisplay icon={<Compass size={18} />} label={t('statMarked')} value={`${markedCells.size}/${PARTICLE_COUNT}`} />
            <StatDisplay icon={<Sigma size={18} />} label={t('statMoves')} value={moves} />
            <StatDisplay icon={<Eye size={18} />} label={t('statEnergy')} value={energy} />
        </div>
        <div className="relative bg-stone-100/80 p-2 rounded-xl shadow-inner">
            <div className={`grid grid-cols-6 gap-2 transition-all duration-300 ${gameState !== 'playing' ? 'blur-sm opacity-60' : ''}`}>{Array.from({ length: gridSize * gridSize }).map((_, i) => renderCell(Math.floor(i / gridSize), i % gridSize))}</div>
            {(gameState === 'won' || gameState === 'lost') && (
                <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                    <GameMessage 
                        text={gameState === 'won' ? t('winMessage') : t('lossMessage')} 
                        type={gameState} 
                    />
                </div>
            )}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={initializeGame} className="p-3 border border-stone-300 hover:bg-stone-200 text-stone-600 rounded-lg shadow-sm transition-all active:scale-95"><RefreshCw size={18} /></button>
          <button onClick={handleConfirmGuess} disabled={markedCells.size !== PARTICLE_COUNT || gameState !== 'playing'} className="flex-1 flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-900 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"><Check size={18} /> {t('btnConfirm')}</button>
          <LanguageSwitcher />
        </div>
      </div>
      {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}
    </div>
  );
};

export default QuantumPuzzle;