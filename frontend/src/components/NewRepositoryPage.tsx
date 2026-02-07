import { useState, useEffect } from 'react';
import { MessageCircle, FileText, Smile, BarChart3, Settings } from 'lucide-react';
import HeatmapVector from '../imports/Vector';
import JoyrepoTitle from '../imports/Joyrepo';
import { cardsApi } from '../api';
import type { JoyCard } from '../types';

// Circular puzzle piece component
interface PuzzlePieceProps {
  color: string;
  label: string;
  percentage: string;
}

function CircularPuzzlePiece({ color, label, percentage }: PuzzlePieceProps) {
  return (
    <div className="flex flex-col items-center gap-1">
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
      <div className="text-center">
        <p className="font-['Istok_Web:Bold',sans-serif] text-[10px] text-black">{label}</p>
        <p className="font-['Istok_Web:Regular',sans-serif] text-[8px] text-black">{percentage}</p>
      </div>
    </div>
  );
}

// Formula Card Component
interface FormulaCardProps {
  date: string;
}

function FormulaCard({ date }: FormulaCardProps) {
  return (
    <div className="bg-white rounded-[16px] shadow-[0px_2px_8px_rgba(0,0,0,0.1)] p-5 mb-4 mx-4 relative">
      <p className="absolute top-3 right-4 font-['Istok_Web:Regular',sans-serif] text-[11px] text-[#999]">{date}</p>
      
      <div className="flex justify-between items-start mt-6 px-2">
        <CircularPuzzlePiece color="#8B9EFF" label="Scene" percentage="36%" />
        <CircularPuzzlePiece color="#FFB3C1" label="Driver" percentage="36%" />
        <CircularPuzzlePiece color="#FFB366" label="People" percentage="10%" />
        <CircularPuzzlePiece color="#B8E986" label="Senses" percentage="36%" />
        <CircularPuzzlePiece color="#D4D4D4" label="Trigger" percentage="12%" />
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
      <p className="font-['Istok_Web:Regular',sans-serif] text-[8px] text-right text-black mt-1">
        1 Happiness in 2026
      </p>
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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-[84px] flex items-center justify-around px-8 z-50">
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

// Scroll indicator on the right
function ScrollIndicator() {
  return (
    <div className="fixed right-1 top-1/2 -translate-y-1/2 w-[6px] h-[80px] bg-gray-300 rounded-full z-40">
      <div className="w-full h-[30px] bg-gray-500 rounded-full" />
    </div>
  );
}

interface NewRepositoryPageProps {
  onNavigateChat: () => void;
  onNavigateTheorem: () => void;
  onNavigateHome: () => void;
}

export default function NewRepositoryPage({ onNavigateChat, onNavigateTheorem, onNavigateHome }: NewRepositoryPageProps) {
  const [activeTab, setActiveTab] = useState<'formula' | 'theorem'>('formula');
  const [cards, setCards] = useState<JoyCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 获取卡片列表
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await cardsApi.getCards(0, 20);
        setCards(response.cards);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="relative w-[393px] h-[852px] bg-[#f5f5f5] rounded-[40px] overflow-hidden shadow-2xl">
      {/* Main content area with white background and rounded corners */}
      <div className="absolute inset-4 bg-white rounded-[32px] overflow-hidden">
        
        {/* Header Area - Fixed */}
        <div className="fixed top-4 left-4 right-4 bg-white z-20 pt-6 pb-4 rounded-t-[32px]">
          {/* JOYREPO Title with imported component */}
          <div className="h-[48.921px] w-[173.67px] mx-auto mb-4 relative">
            <JoyrepoTitle />
          </div>

          {/* Tab Buttons */}
          <div className="flex justify-center gap-4 px-8 mb-4">
            <button
              onClick={() => setActiveTab('formula')}
              className={`px-6 py-2 rounded-full text-[14px] font-['Istok_Web:Regular',sans-serif] transition-colors ${
                activeTab === 'formula' 
                  ? 'bg-[#e8e8e8] text-black' 
                  : 'bg-[#d4d4d4] text-gray-600'
              }`}
            >
              Formula
            </button>
            <button
              onClick={() => setActiveTab('theorem')}
              className={`px-6 py-2 rounded-full text-[14px] font-['Istok_Web:Regular',sans-serif] transition-colors ${
                activeTab === 'theorem' 
                  ? 'bg-[#e8e8e8] text-black' 
                  : 'bg-[#d4d4d4] text-gray-600'
              }`}
            >
              Theorem
            </button>
          </div>

          {/* Heatmap below tabs */}
          <Heatmap />
        </div>

        {/* Content Area - Scrollable */}
        <div className="absolute top-[310px] left-0 right-0 bottom-[84px] overflow-y-auto">
          {/* Formula Tab Content */}
          {activeTab === 'formula' && (
            <div className="pt-4 pb-6">
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <p className="font-['Istok_Web:Regular',sans-serif] text-[14px] text-[#999]">Loading cards...</p>
                </div>
              ) : cards.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                  <p className="font-['Istok_Web:Regular',sans-serif] text-[14px] text-[#999]">No joy cards yet. Start chatting to create your first one!</p>
                </div>
              ) : (
                cards.map((card) => (
                  <FormulaCard 
                    key={card.id} 
                    date={new Date(card.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  />
                ))
              )}
            </div>
          )}

          {/* Theorem Tab Content */}
          {activeTab === 'theorem' && (
            <div className="flex items-center justify-center h-full">
              <p className="font-['Istok_Web:Regular',sans-serif] text-[16px] text-[#999]">
                Theorem view coming soon...
              </p>
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />

        {/* Bottom Navigation */}
        <BottomNav 
          onNavigateChat={onNavigateChat} 
          onNavigateTheorem={onNavigateTheorem} 
          onNavigateHome={onNavigateHome} 
        />
      </div>
    </div>
  );
}
