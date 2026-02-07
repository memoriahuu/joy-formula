import { motion } from 'motion/react';
import svgPaths from "../imports/svg-yf3nbfz6ej";
import imgImage12 from "figma:asset/481ec9271992b35c78654813354c17a1bbe7b8b3.png";
import imgImage13 from "figma:asset/dcf8b305885a632a490f729fe314980e8742e12a.png";
import imgHappy19496721 from "figma:asset/d55f0c6f64187b2aff71cc2cc23da08b81665f02.png";

function Component2() {
  return (
    <div className="absolute bottom-[-0.1px] h-[20px] left-0 right-[0.27%]" data-name="4底部横条">
      <div className="-translate-x-1/2 absolute bg-black bottom-[2px] h-[4px] left-[calc(50%-0.32px)] rounded-full w-[120px]" data-name="Home Indicator" />
    </div>
  );
}

function BarChart({ isActive, onClick }: { isActive: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-[27.394px] relative shrink-0 w-[29.677px] transition-transform hover:scale-110 active:scale-95"
      data-name="Bar chart-2"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.6769 27.394">
        <g id="Bar chart-2">
          <path 
            d={svgPaths.p1b098100} 
            id="Icon" 
            stroke={isActive ? "var(--stroke-0, #FEB05D)" : "var(--stroke-0, #4B4B4B)"} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2.2243" 
          />
        </g>
      </svg>
    </button>
  );
}

function Settings() {
  return (
    <div className="h-[22.828px] relative shrink-0 w-[23.325px] opacity-70" data-name="Settings">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3246 22.8284">
        <g clipPath="url(#clip0_1_1399)" id="Settings">
          <g id="Icon">
            <path d={svgPaths.p1daa5200} stroke="var(--stroke-0, #4B4B4B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.98508" />
            <path d={svgPaths.p2aef6140} stroke="var(--stroke-0, #4B4B4B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.98508" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_1399">
            <rect fill="white" height="22.8284" width="23.3246" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame1({ onNavigateTheorem, onNavigateCard, onNavigateHome }: { onNavigateTheorem: () => void; onNavigateCard: () => void; onNavigateHome: () => void }) {
  return (
    <div className="absolute content-stretch flex gap-[38.047px] items-end left-[54.63px] top-[14.68px]">
      <div className="relative rounded-[3.044px] shrink-0 size-[27.394px] opacity-70" data-name="image 12">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[3.044px] size-full" src={imgImage12} />
      </div>
      <button
        onClick={onNavigateTheorem}
        className="relative rounded-[3.044px] shrink-0 size-[25.111px] transition-transform hover:scale-110 active:scale-95"
        data-name="image 13"
      >
        <img alt="Navigate to theorem" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage13} />
      </button>
      <button
        onClick={onNavigateCard}
        className="relative shrink-0 size-[27.394px] transition-transform hover:scale-110 active:scale-95 opacity-70"
        data-name="happy_1949672 1"
      >
        <img alt="Navigate to card" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHappy19496721} />
      </button>
      <BarChart isActive={true} onClick={onNavigateHome} />
      <Settings />
    </div>
  );
}

function Component1({ onNavigateTheorem, onNavigateCard, onNavigateHome }: { onNavigateTheorem: () => void; onNavigateCard: () => void; onNavigateHome: () => void }) {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[60px] left-[-1.63px] top-[790px] w-[394.631px]" data-name="标签栏">
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
        <p className="font-['Itim:Regular',sans-serif] text-[32px] text-black text-center">JOYREPO</p>
        <div className="flex gap-2 justify-center mt-2">
          <div className="h-[1.5px] w-0 bg-black" />
          <div className="h-[1.5px] w-0 bg-black" />
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="absolute left-[75px] top-[105px] flex gap-[20px]">
        <button className="bg-[#eee] rounded-[12px] px-[24px] py-[8px]">
          <p className="font-['Istok_Web:Regular',sans-serif] text-[16px] text-black">Formula</p>
        </button>
        <button className="bg-[#d0d0d0] rounded-[12px] px-[24px] py-[8px]">
          <p className="font-['Istok_Web:Regular',sans-serif] text-[16px] text-black">Thereom</p>
        </button>
      </div>

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
