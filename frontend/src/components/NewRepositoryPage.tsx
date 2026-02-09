import { useState, useEffect } from 'react';
import { MessageCircle, FileText, Smile, BarChart3, Settings, X } from 'lucide-react';
import HeatmapVector from '../imports/Vector';
import JoyrepoTitle from '../imports/Joyrepo';
import { cardsApi } from '../api';
import { InlineJoyCard } from './InlineJoyCard';
import type { JoyCard, JoyCardData } from '../types';
import char5 from '../assets/formula characters/char5.svg';
import char10 from '../assets/formula characters/char10.png';
import char7 from '../assets/formula characters/char7.svg';
import char8 from '../assets/formula characters/char8.svg';
import char6 from '../assets/formula characters/char6.svg';

//repopage, showing calendar and emotion cards, with nav bar at the bottom to switch between pages
// Circular puzzle piece component
interface PuzzlePieceProps {
  color: string;
  label: string;
  percentage: string;
  charImage?: string;
}

function CircularPuzzlePiece({ color, label, percentage, charImage }: PuzzlePieceProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-[100px] h-[100px] flex items-center justify-center">
        {charImage ? (
          <img 
            src={charImage} 
            alt={label}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div 
            className="w-[50px] h-[50px] rounded-full border-2 border-black relative"
            style={{ backgroundColor: color }}
          >
            {/* Puzzle notch at top */}
            <div 
              className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-[12px] h-[12px] rounded-full border-2 border-black bg-white"
            />
            {/* Puzzle notch at bottom */}
            <div 
              className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-[12px] h-[12px] rounded-full"
              style={{ backgroundColor: color, border: '2px solid black' }}
            />
          </div>
        )}
      </div>
      <div className="text-center">
        <p className="font-['Istok_Web:Bold',sans-serif] text-[10px] text-black">{label}</p>
        {percentage && <p className="font-['Istok_Web:Regular',sans-serif] text-[8px] text-black">{percentage}</p>}
      </div>
    </div>
  );
}

// Formula Card Component
interface FormulaCardProps {
  date: string;
  scene?: string;
  people?: string;
  event?: string;
  trigger?: string;
  sensation?: string;
  onClick?: () => void;
}

function FormulaCard({ date, scene, people, event, trigger, sensation, onClick }: FormulaCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-[16px] shadow-[0px_2px_8px_rgba(0,0,0,0.1)] p-5 mb-4 mx-4 relative cursor-pointer hover:shadow-[0px_4px_12px_rgba(0,0,0,0.15)] transition-shadow"
    >
      <p className="absolute top-3 right-4 font-['Istok_Web:Regular',sans-serif] text-[11px] text-[#999]">{date}</p>
      
      <div className="flex justify-between items-start mt-6 px-2">
        <CircularPuzzlePiece color="#8B9EFF" label="Scene" percentage="" charImage={char10} />
        <CircularPuzzlePiece color="#FFB3C1" label="Drive" percentage="" charImage={char5} />
        <CircularPuzzlePiece color="#FFB366" label="People" percentage="" charImage={char8} />
        <CircularPuzzlePiece color="#B8E986" label="Senses" percentage="" charImage={char7} />
        <CircularPuzzlePiece color="#D4D4D4" label="Trigger" percentage="" charImage={char6} />
      </div>
    </div>
  );
}

// Heatmap component
function Heatmap() {
  return (
    <div className="w-[325px] mx-auto mb-4">
      <div className="relative w-full h-[115px]">
        <HeatmapVector />
      </div>
    </div>
  );
}

// Bottom Navigation Component
interface BottomNavProps {
  onNavigateChat: () => void;
  onNavigateTheorem: () => void;
  onNavigateHome: () => void;
}

function BottomNav({ onNavigateChat, onNavigateTheorem, onNavigateHome }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-[84px] flex items-center justify-around px-8 z-50">
      <button onClick={onNavigateChat} className="p-2 transition-transform hover:scale-110 active:scale-95">
        <MessageCircle className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <button onClick={onNavigateTheorem} className="p-2 transition-transform hover:scale-110 active:scale-95">
        <FileText className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <button onClick={onNavigateHome} className="p-2 transition-transform hover:scale-110 active:scale-95">
        <Smile className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <button className="p-2 transition-transform hover:scale-110 active:scale-95">
        <BarChart3 className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <button className="p-2 transition-transform hover:scale-110 active:scale-95">
        <Settings className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[140px] h-[5px] bg-black rounded-full" />
    </div>
  );
}


interface NewRepositoryPageProps {
  onNavigateChat: () => void;
  onNavigateTheorem: () => void;
  onNavigateHome: () => void;
}

export default function NewRepositoryPage({ onNavigateChat, onNavigateTheorem, onNavigateHome }: NewRepositoryPageProps) {
  const [cards, setCards] = useState<JoyCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<JoyCard | null>(null);
  const [visibleCardCount, setVisibleCardCount] = useState(0);

  // 获取卡片列表
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await cardsApi.getCards(0, 20);
        
        // 首次进入此页面时，记录初始卡片数
        if (!sessionStorage.getItem('repositoryInitialCardCount')) {
          sessionStorage.setItem('repositoryInitialCardCount', String(response.cards.length));
        }
        
        const initialCount = parseInt(sessionStorage.getItem('repositoryInitialCardCount') || '0', 10);
        const newCardCount = Math.max(response.cards.length - initialCount, 0);
        
        setCards(response.cards);
        setVisibleCardCount(newCardCount);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
    
    // 每 5 秒自动刷新一次卡片列表
    const interval = setInterval(fetchCards, 5000);
    
    // 组件卸载时清除定时器
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-[393px] h-[852px] bg-[#f5f5f5] overflow-hidden">
      {/* Main content area with white background */}
      <div className="absolute inset-4 bg-white overflow-hidden flex flex-col">
        
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          {/* Header Area - Part of scrollable content */}
          <div className="bg-white pt-6 pb-4">
            {/* JOYREPO Title with imported component */}
            <div className="h-[48.921px] w-[173.67px] mx-auto mb-4 relative">
              <JoyrepoTitle />
            </div>

            {/* Heatmap below tabs */}
            <Heatmap />
          </div>

          {/* Content Area - Scrollable with header */}
          <div className="pt-4 pb-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <p className="font-['Istok_Web:Regular',sans-serif] text-[14px] text-[#999]">Loading cards...</p>
              </div>
            ) : visibleCardCount === 0 ? (
              <div className="flex items-center justify-center h-32">
                <p className="font-['Istok_Web:Regular',sans-serif] text-[14px] text-[#999]">No new joy cards yet. Start chatting to create your first one!</p>
              </div>
            ) : (
              cards.slice(0, visibleCardCount).map((card) => (
                <FormulaCard 
                  key={card.id} 
                  date={new Date(card.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  scene={card.formula_scene}
                  people={card.formula_people}
                  event={card.formula_event}
                  trigger={card.formula_trigger}
                  sensation={card.formula_sensation}
                  onClick={() => setSelectedCard(card)}
                />
              ))
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav 
          onNavigateChat={onNavigateChat} 
          onNavigateTheorem={onNavigateTheorem} 
          onNavigateHome={onNavigateHome} 
        />
      </div>

      {/* Expanded Card Modal */}
      {selectedCard && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCard(null)}
        >
          <div 
            className="bg-white rounded-[20px] p-6 max-h-[90vh] overflow-y-auto"
            style={{ width: '320px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Display the full card content */}
            <InlineJoyCard 
              data={{
                summary: selectedCard.card_summary,
                formula: {
                  scene: selectedCard.formula_scene,
                  people: selectedCard.formula_people,
                  event: selectedCard.formula_event,
                  trigger: selectedCard.formula_trigger,
                  sensation: selectedCard.formula_sensation,
                }
              } as JoyCardData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
