import { motion } from 'motion/react';
import { MessageCircle, FileText, Smile, BarChart3, Settings as SettingsIcon } from 'lucide-react';
import svgPaths from "../imports/svg-yf3nbfz6ej";
import joyRepoTitle from "../assets/joyrepo.png";

//overall repo page, showing calendar and emotion cards, with nav bar at the bottom to switch between pages

function Component2() {
  return (
    <div className="absolute bottom-[-0.1px] h-[35.78px] left-0 right-[0.27%]" data-name="4底部横条">
      <div className="-translate-x-1/2 absolute bg-black bottom-[8.2px] h-[5.262px] left-[calc(50%-0.32px)] rounded-[105.235px] w-[141.015px]" data-name="Home Indicator" />
    </div>
  );
}


function Frame1({ onNavigateTheorem, onNavigateCard, onNavigateHome }: { onNavigateTheorem: () => void; onNavigateCard: () => void; onNavigateHome: () => void }) {
  return (
    <div className="absolute content-stretch flex gap-[38.047px] items-end left-[54.63px] top-[14.68px]">
      <div className="relative shrink-0">
        <MessageCircle className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </div>
      <button
        onClick={onNavigateTheorem}
        className="relative shrink-0 transition-transform hover:scale-110 active:scale-95"
      >
        <FileText className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <button
        onClick={onNavigateCard}
        className="relative shrink-0 transition-transform hover:scale-110 active:scale-95"
      >
        <Smile className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </button>
      <button
        onClick={onNavigateHome}
        className="relative shrink-0 transition-transform hover:scale-110 active:scale-95"
      >
        <BarChart3 className="w-6 h-6 text-[#FEB05D]" strokeWidth={1.5} />
      </button>
      <div className="relative shrink-0">
        <SettingsIcon className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
      </div>
    </div>
  );
}

function Component1({ onNavigateTheorem, onNavigateCard, onNavigateHome }: { onNavigateTheorem: () => void; onNavigateCard: () => void; onNavigateHome: () => void }) {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[84.797px] left-[-1.63px] top-[766.43px] w-[393px]" data-name="标签栏">
      <Component2 />
      <Frame1 onNavigateTheorem={onNavigateTheorem} onNavigateCard={onNavigateCard} onNavigateHome={onNavigateHome} />
    </div>
  );
}

interface RepositoryPageProps {
  onNavigateTheorem: () => void;
  onNavigateCard: () => void;
  onNavigateHome: () => void;
  onNavigateChat: () => void;
}

export default function RepositoryPage({ onNavigateTheorem, onNavigateCard, onNavigateHome, onNavigateChat }: RepositoryPageProps) {
  const emotions = [
    { name: 'Gym', color: '#AB86F6', percentage: '9%', top: 74, left: 34 },
    { name: 'Watermelon', color: '#FFA2A2', percentage: '3%', top: 71, left: 111 },
    { name: 'Calm', color: '#FFC16C', percentage: '3%', top: 94, left: 204 },
    { name: 'Mint', color: '#A9D66A', percentage: '2%', top: 157, left: 282 }
  ];

  return (
    <div className="bg-white relative h-[852px] w-[393px] overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute left-[114px] top-[50px] w-[180px]"
      >
        <img
          alt="JOYREPO"
          className="h-[32px] w-full object-contain"
          src={joyRepoTitle}
        />
        <div className="flex gap-2 justify-center mt-2">
          <div className="h-[1.5px] w-0 bg-black" />
          <div className="h-[1.5px] w-0 bg-black" />
        </div>
      </motion.div>

      {/* Calendar Grid */}
      <div className="absolute left-[34px] top-[170px] right-[34px]">
        <div className="flex justify-between text-[10px] font-['Istok_Web:Regular',sans-serif] text-[#888] mb-2">
          {['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
        
        {/* Calendar Grid - 7 rows × 53 columns */}
        <div className="grid grid-cols-[repeat(53,1fr)] gap-[2px]">
          {[...Array(7 * 53)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-[1px] ${
                i === 0 ? 'bg-[#A9D66A]' : 'bg-[#eee]'
              }`}
            />
          ))}
        </div>
        
        <p className="text-[9px] font-['Itim:Regular',sans-serif] text-[#888] text-right mt-2">
          1 Happiness in 2026
        </p>
      </div>

      {/* Emotion Cards */}
      <div className="absolute left-[32px] right-[32px] top-[340px] space-y-[20px]">
        {/* Card 1 - Feb 6th */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-[#f5f5f5] rounded-[12px] p-[16px] relative"
        >
          <p className="text-right text-[12px] font-['Itim:Regular',sans-serif] text-[#888] mb-2">
            Feb 6th, 2026
          </p>
          <div className="flex items-center justify-between gap-[12px]">
            {emotions.map((emotion, idx) => (
              <div key={idx} className="flex flex-col items-center relative">
                <div
                  className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
                  style={{ backgroundColor: emotion.color }}
                >
                  <span className="text-[24px]">😊</span>
                </div>
                <p className="text-[10px] font-['Itim:Regular',sans-serif] text-black mt-1">
                  {emotion.name}
                </p>
                <p className="text-[8px] font-['Istok_Web:Bold',sans-serif] text-[#666]">
                  {emotion.percentage}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] font-['Itim:Regular',sans-serif] text-black mt-3">
            Watermelon
          </p>
        </motion.div>

        {/* Card 2 - Feb 7th */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-[#f5f5f5] rounded-[12px] p-[16px] relative"
        >
          <p className="text-right text-[12px] font-['Itim:Regular',sans-serif] text-[#888] mb-2">
            Feb 7th, 2026
          </p>
          <div className="flex items-center justify-between gap-[12px]">
            {emotions.map((emotion, idx) => (
              <div key={idx} className="flex flex-col items-center relative opacity-50">
                <div
                  className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
                  style={{ backgroundColor: emotion.color }}
                >
                  <span className="text-[24px]">😊</span>
                </div>
                <p className="text-[10px] font-['Itim:Regular',sans-serif] text-black mt-1">
                  {emotion.name}
                </p>
                <p className="text-[8px] font-['Istok_Web:Bold',sans-serif] text-[#666]">
                  {emotion.percentage}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] font-['Itim:Regular',sans-serif] text-black mt-3">
            Watermelon
          </p>
        </motion.div>
      </div>

      <Component1 
        onNavigateTheorem={onNavigateTheorem} 
        onNavigateCard={onNavigateCard} 
        onNavigateHome={onNavigateHome}
      />
    </div>
  );
}
