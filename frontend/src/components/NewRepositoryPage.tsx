import { useState, useEffect, useMemo } from 'react';
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
  size?: number;
}

function CircularPuzzlePiece({ color, label, percentage, charImage, size = 60 }: PuzzlePieceProps) {
  return (
    <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
      <div className="flex items-center justify-center" style={{ height: `${size}px` }}>
        {charImage ? (
          <img
            src={charImage}
            alt={label}
            className="object-contain"
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        ) : (
          <div
            className="w-[50px] h-[50px] rounded-full border-2 border-black relative"
            style={{ backgroundColor: color }}
          >
            <div
              className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-[12px] h-[12px] rounded-full border-2 border-black bg-white"
            />
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
  summary?: string;
  scene?: string;
  people?: string;
  event?: string;
  trigger?: string;
  sensation?: string;
  onClick?: () => void;
}

// Stem matching: two words share a stem if their common prefix is >= 70% of the
// shorter word and at least 4 chars (e.g. "anticipated" ↔ "anticipation").
function sharesStem(a: string, b: string): boolean {
  const minLen = Math.min(a.length, b.length);
  if (minLen < 4) return false;
  const required = Math.max(4, Math.floor(minLen * 0.7));
  for (let i = 0; i < required; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// Keyword highlighting: find 1-2 words from summary that overlap with factor texts,
// scored by overlap + word rarity (length). Highlight with the factor's color.
const STOP_WORDS = new Set([
  'the','a','an','is','was','were','are','be','been','being','have','has','had',
  'do','does','did','will','would','could','should','may','might','can','to',
  'of','in','for','on','with','at','by','from','as','into','through','during',
  'before','after','and','but','or','nor','not','so','yet','both','either',
  'neither','each','every','all','any','few','more','most','other','some','no',
  'only','own','same','than','too','very','just','because','if','when','where',
  'how','what','which','who','whom','this','that','these','those','i','me','my',
  'we','our','you','your','he','him','his','she','her','it','its','they','them',
  'their','about','up','out','also','really','like','much','even','finding',
  'good','still','perfectly','might','after','worrying',
]);

interface FactorEntry { text?: string; color: string }

function findHighlightWords(
  summary: string,
  factors: FactorEntry[],
): Map<string, string> {
  const summaryWords = summary.toLowerCase().match(/\b[a-z']+\b/g) || [];
  const candidates: { word: string; color: string; score: number }[] = [];
  const seen = new Set<string>();

  // Pass 1: exact + stem match against factor texts
  for (const { text, color } of factors) {
    if (!text) continue;
    const factorWords = text.toLowerCase().match(/\b[a-z']+\b/g) || [];
    for (const w of summaryWords) {
      if (STOP_WORDS.has(w) || w.length < 3 || seen.has(w)) continue;
      const matched = factorWords.some(
        (fw) => fw === w || sharesStem(fw, w),
      );
      if (matched) {
        seen.add(w);
        candidates.push({ word: w, color, score: w.length + 5 });
      }
    }
  }

  // Pass 2: if fewer than 2, pick rare summary words and try to match them
  // to the best factor via stem, otherwise assign the first factor color
  if (candidates.length < 2) {
    const wordSet = new Map<string, number>();
    for (const w of summaryWords) {
      if (!STOP_WORDS.has(w) && w.length >= 4 && !seen.has(w)) {
        wordSet.set(w, (wordSet.get(w) || 0) + 1);
      }
    }
    const sorted = [...wordSet.entries()].sort(
      (a, b) => b[0].length - a[0].length || a[1] - b[1],
    );
    for (const [word] of sorted) {
      if (candidates.length >= 2) break;
      // Try to find a factor this word relates to via stem
      let bestColor = factors[0]?.color || '#999';
      for (const { text, color } of factors) {
        if (!text) continue;
        const fws = text.toLowerCase().match(/\b[a-z']+\b/g) || [];
        if (fws.some((fw) => sharesStem(fw, word))) {
          bestColor = color;
          break;
        }
      }
      candidates.push({ word, color: bestColor, score: word.length });
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  const result = new Map<string, string>();
  for (const { word, color } of candidates.slice(0, 2)) {
    result.set(word, color);
  }
  return result;
}

// Compute per-factor highlight hit counts to drive character sizing
function getFactorHitCounts(
  highlights: Map<string, string>,
  factorColors: string[],
): number[] {
  const counts = factorColors.map(() => 0);
  for (const color of highlights.values()) {
    const idx = factorColors.indexOf(color);
    if (idx !== -1) counts[idx]++;
  }
  return counts;
}

function HighlightedSummary({
  summary,
  highlights,
}: {
  summary: string;
  highlights: Map<string, string>;
}) {
  if (highlights.size === 0) return <>{summary}</>;

  // Build regex matching any highlighted word (whole-word, case-insensitive)
  const pattern = [...highlights.keys()]
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');

  const parts = summary.split(regex);
  return (
    <>
      {parts.map((part, i) => {
        const color = highlights.get(part.toLowerCase());
        if (color) {
          return (
            <span
              key={i}
              className="font-semibold rounded-sm px-[3px] py-[1px] not-italic"
              style={{ backgroundColor: `${color}40`, color: '#444' }}
            >
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

const FACTOR_COLORS = {
  scene: '#8B9EFF',   // blue
  event: '#B197FC',   // purple
  people: '#FFB3C1',  // pink
  senses: '#B8E986',  // green
  drive: '#FFB366',   // orange
};

const BASE_SIZE = 52;
const HIGHLIGHT_BUMP = 9;

function FormulaCard({ date, summary, scene, people, event, trigger, sensation, onClick }: FormulaCardProps) {
  // sensation → Senses (green), trigger → Drive (gray)
  const factorDefs = useMemo(() => [
    { text: scene, color: FACTOR_COLORS.scene },
    { text: event, color: FACTOR_COLORS.event },
    { text: people, color: FACTOR_COLORS.people },
    { text: sensation, color: FACTOR_COLORS.senses },
    { text: trigger, color: FACTOR_COLORS.drive },
  ], [scene, event, people, trigger, sensation]);

  const highlights = useMemo(() => {
    if (!summary) return new Map<string, string>();
    return findHighlightWords(summary, factorDefs);
  }, [summary, factorDefs]);

  const sizes = useMemo(() => {
    const colors = factorDefs.map((f) => f.color);
    const hits = getFactorHitCounts(highlights, colors);
    return hits.map((h) => BASE_SIZE + h * HIGHLIGHT_BUMP);
  }, [highlights, factorDefs]);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[16px] shadow-[0px_2px_8px_rgba(0,0,0,0.1)] p-5 mb-4 mx-4 relative cursor-pointer hover:shadow-[0px_4px_12px_rgba(0,0,0,0.15)] transition-shadow"
    >
      <p className="text-right font-['Istok_Web:Regular',sans-serif] text-[11px] text-[#999] mb-1">{date}</p>

      <div className="flex justify-between items-end px-1">
        <CircularPuzzlePiece color={FACTOR_COLORS.scene} label="Scene" percentage="" charImage={char10} size={sizes[0]} />
        <CircularPuzzlePiece color={FACTOR_COLORS.event} label="Event" percentage="" charImage={char5} size={sizes[1]} />
        <CircularPuzzlePiece color={FACTOR_COLORS.people} label="People" percentage="" charImage={char8} size={sizes[2]} />
        <CircularPuzzlePiece color={FACTOR_COLORS.senses} label="Senses" percentage="" charImage={char7} size={sizes[3]} />
        <CircularPuzzlePiece color={FACTOR_COLORS.drive} label="Drive" percentage="" charImage={char6} size={sizes[4]} />
      </div>

      {summary && (
        <div className="mt-4 mx-1 border-t border-gray-100" style={{ paddingTop: '11px' }}>
          <p className="text-[11px] text-[#888] leading-[1.6] line-clamp-3 italic">
            <HighlightedSummary summary={summary} highlights={highlights} />
          </p>
        </div>
      )}
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
            ) : cards.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <p className="font-['Istok_Web:Regular',sans-serif] text-[14px] text-[#999]">No new joy cards yet. Start chatting to create your first one!</p>
              </div>
            ) : (
              cards.map((card) => (
                <FormulaCard
                  key={card.id}
                  date={new Date(card.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  summary={card.card_summary}
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
