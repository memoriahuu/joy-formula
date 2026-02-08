import { motion } from 'motion/react';
import svgPaths from "../imports/svg-jkcsv643nd";
import imgImage9 from "figma:asset/a442465baf4be4743588f4589afd2d541ab38494.png";
import joyFrameTitle from "../assets/joyframe.png";

// Import from the original design file for the colorful card page
function Frame19() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="absolute bg-white h-[173px] leading-[normal] left-[44px] not-italic overflow-clip rounded-bl-[18.095px] rounded-br-[18.095px] shadow-[3.619px_3.619px_18.095px_1.81px_rgba(191,172,89,0.25)] top-[590px] w-[404px] whitespace-pre-wrap"
    >
      <p className="absolute font-['Istok_Web:Bold',sans-serif] h-[24.429px] left-[25px] text-[#f90] text-[36.19px] top-[30px] w-[16.286px]">"</p>
      <p className="absolute font-['Istok_Web:Bold',sans-serif] h-[27.143px] left-[356px] text-[#f90] text-[36.19px] top-[93px] w-[22.619px]">"</p>
      <p className="-translate-x-1/2 absolute font-['Itim:Regular',sans-serif] left-[201.81px] text-[#3a3a3a] text-[18.095px] text-center top-[54px] w-[307.619px]">A quiet room, a golden beam, a heart at rest. Today, the light reminded me that I am enough.</p>
    </motion.div>
  );
}

function Frame21({ onNavigateChat }: { onNavigateChat: () => void }) {
  return (
    <motion.button
      onClick={onNavigateChat}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="absolute h-[88px] left-[85px] top-[745px] w-[326px] hover:scale-105 transition-transform"
    >
      <div className="absolute flex h-[88px] items-center justify-center left-0 top-0 w-[326px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[88px] relative w-[326px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 88">
              <path d={svgPaths.p222656f0} fill="var(--fill-0, #FFEDD8)" />
            </svg>
          </div>
        </div>
      </div>
      <p className="absolute font-['Itim:Regular',sans-serif] leading-[0] left-[25px] not-italic text-[#6a4206] text-[24px] top-[42px]">
        <span className="leading-[normal]">{`Start Your `}</span>
        <span className="leading-[normal] text-[#ed7300]">Happiness</span>
        <span className="leading-[normal]">{` Now!`}</span>
      </p>
    </motion.button>
  );
}

function Component2() {
  return (
    <div className="absolute bottom-[-0.13px] h-[43.883px] left-0 right-[0.27%]" data-name="4底部横条">
      <div className="-translate-x-1/2 absolute bg-black bottom-[10.21px] h-[6.453px] left-[calc(50%-1px)] rounded-[129.067px] w-[172.949px]" data-name="Home Indicator" />
    </div>
  );
}

function BarChart({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-[39.461px] relative shrink-0 w-[38px] transition-transform hover:scale-110 active:scale-95"
      data-name="Bar chart-2"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.9999 39.4615">
        <g id="Bar chart-2">
          <path 
            d={svgPaths.p21aa4380} 
            id="Icon" 
            stroke={isActive ? "var(--stroke-0, #FEB05D)" : "var(--stroke-0, #4B4B4B)"} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2.92307" 
          />
        </g>
      </svg>
    </button>
  );
}

function DirectionsWalk() {
  return (
    <div className="h-[34.8px] relative shrink-0 w-[39.526px] opacity-70" data-name="directions_walk">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.5259 34.8">
        <g id="directions_walk">
          <path d={svgPaths.p2286dff0} fill="var(--fill-0, #4B4B4B)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Info({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-[31px] relative shrink-0 w-[31.674px] transition-transform hover:scale-110 active:scale-95"
      data-name="Info"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.6739 31">
        <g id="Info">
          <path 
            d={svgPaths.p2bf97b00} 
            id="Icon" 
            stroke={isActive ? "var(--stroke-0, #FEB05D)" : "var(--stroke-0, #4B4B4B)"} 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2.69565" 
          />
        </g>
      </svg>
    </button>
  );
}

function Settings() {
  return (
    <div className="h-[30px] relative shrink-0 w-[30.652px] opacity-70" data-name="Settings">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.6522 30">
        <g clipPath="url(#clip0_1_1220)" id="Settings">
          <g id="Icon">
            <path d={svgPaths.p2be29800} stroke="var(--stroke-0, #4B4B4B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6087" />
            <path d={svgPaths.p3575c080} stroke="var(--stroke-0, #4B4B4B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6087" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_1220">
            <rect fill="white" height="30" width="30.6522" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame3({ onNavigateChat, onNavigateHome }: { onNavigateChat: () => void; onNavigateHome: () => void }) {
  return (
    <div className="absolute content-stretch flex gap-[47px] items-end left-[90px] top-[17px]">
      <div className="content-stretch flex flex-col h-[34px] items-center relative shrink-0 w-[35px]">
        <BarChart isActive={false} onClick={onNavigateHome} />
      </div>
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-[48px]">
        <DirectionsWalk />
      </div>
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-[40px]">
        <Info isActive={false} onClick={onNavigateChat} />
      </div>
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-[40px]">
        <Settings />
      </div>
    </div>
  );
}

function Component1({ onNavigateChat, onNavigateHome }: { onNavigateChat: () => void; onNavigateHome: () => void }) {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[104px] left-[-6px] top-[940px] w-[484px]" data-name="标签栏">
      <Component2 />
      <Frame3 onNavigateChat={onNavigateChat} onNavigateHome={onNavigateHome} />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute h-[14.058px] left-[38.68px] top-[26.11px] w-[9.065px]">
      <div className="absolute inset-[-10.75%_-16.67%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0878 17.0799">
          <g id="Frame 67">
            <path d="M1.5113 1.51098V6.54727" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="3.02177" />
            <path d="M10.5766 1.51089V6.54717" id="Vector 4" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="3.02177" />
            <path d={svgPaths.p886ef80} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="3.02177" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-[14.058px] relative w-[9.065px]">
      <div className="absolute inset-[-10.75%_-16.67%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0878 17.0799">
          <g id="Frame 68">
            <path d="M1.5113 1.51094V6.54722" id="Vector 3" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="3.02177" />
            <path d="M10.5766 1.51089V6.54717" id="Vector 4" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="3.02177" />
            <path d={svgPaths.p25a74380} id="Vector 5" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="3.02177" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute h-[59.952px] left-[85px] top-[47px] w-[322px]">
      <img
        alt="JOYFORMULA"
        className="absolute left-0 top-0 h-full w-full object-contain"
        src={joyFrameTitle}
      />
      <Frame5 />
      <div className="absolute flex h-[14.124px] items-center justify-center left-[128.61px] top-[24.17px] w-[9.168px]" style={{ "--transform-inner-width": "1184.65625", "--transform-inner-height": "154" } as React.CSSProperties}>
        <div className="flex-none rotate-[-179.58deg]">
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute font-['Instrument_Sans:Regular',sans-serif] font-normal h-[45.925px] left-[135px] text-black top-[173px] w-[34.019px]">
      <p className="absolute leading-[normal] left-0 text-[36.42px] top-[1.7px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        8
      </p>
      <p className="absolute font-['Instrument_Sans:SemiBold',sans-serif] font-semibold leading-[0] left-[18.71px] text-[0px] top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span className="leading-[normal] text-[21.012px]" style={{ fontVariationSettings: "'wdth' 100" }}>{` `}</span>
        <span className="leading-[normal] text-[9.813px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          °C
        </span>
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute h-[96.603px] left-[19px] top-[70px] w-[92.319px]">
      <div className="absolute inset-[0_-1.41%_-4.94%_-23.49%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 115.309 101.37">
          <g filter="url(#filter0_d_1_1207)" id="Frame 76">
            <path d={svgPaths.pf040500} fill="var(--fill-0, #5A7ACD)" id="Vector 10" />
            <g id="Group 6">
              <path d={svgPaths.p30c8cc80} id="Vector 11" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.72" />
              <path d={svgPaths.p1066de0} id="Vector 12" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.72" />
              <path d={svgPaths.p11c5bc80} id="Vector 13" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.72" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="104.404" id="filter0_d_1_1207" width="115.309" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1.3002" dy="7.80121" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_1207" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_1207" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="absolute bg-[#cad4ef] h-[160px] left-[44px] overflow-clip rounded-[24px] top-[227px] w-[152px] hover:scale-105 transition-transform cursor-pointer"
    >
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[17px] not-italic text-[#5a7acd] text-[24px] top-[10px] w-[66px] whitespace-pre-wrap">Scene</p>
      <p className="-translate-x-full absolute font-['Istok_Web:Bold',sans-serif] leading-[normal] left-[142px] not-italic text-[#5a7acd] text-[24px] text-right top-[78px] w-[66px] whitespace-pre-wrap">36%</p>
      <Frame10 />
    </motion.div>
  );
}

function Frame11() {
  return (
    <div className="h-[80.848px] relative w-[88.109px]">
      <div className="absolute inset-[0_-25.3%_-4.35%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 110.4 84.3681">
          <g filter="url(#filter0_d_1_1201)" id="Frame 77">
            <path d={svgPaths.p2ca2b070} fill="var(--fill-0, #FFA2A2)" id="Vector 18" />
            <path d={svgPaths.p17d3bc40} id="Vector 19" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.72" />
            <path d={svgPaths.p5769680} id="Vector 20" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.72" />
            <path d={svgPaths.p226b9d00} id="Vector 21" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.72" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="85.644" id="filter0_d_1_1201" width="110.4" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4.79619" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_1201" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_1201" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="absolute bg-[#ffcece] h-[160px] left-[208px] overflow-clip rounded-[24px] top-[227px] w-[104px] hover:scale-105 transition-transform cursor-pointer"
    >
      <p className="absolute font-['Istok_Web:Bold',sans-serif] leading-[normal] left-[50px] not-italic text-[#f98080] text-[24px] top-[62px]">10%</p>
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[23px] not-italic text-[#f98080] text-[24px] top-[30px]">People</p>
      <div className="absolute flex h-[82.184px] items-center justify-center left-[7px] top-[91px] w-[89.333px]" style={{ "--transform-inner-width": "1184.65625", "--transform-inner-height": "154" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-[-0.87deg]">
          <Frame11 />
        </div>
      </div>
    </motion.div>
  );
}

function Frame12() {
  return (
    <div className="h-[69.351px] relative w-[85.284px]">
      <div className="absolute inset-[0_0_-6.76%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85.2836 74.0374">
          <g filter="url(#filter0_d_1_1223)" id="Frame 77">
            <path d={svgPaths.p171f5380} fill="var(--fill-0, #5A9CB5)" id="Vector 14" />
            <path d={svgPaths.p2769dd00} id="Vector 15" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.72" />
            <path d={svgPaths.p2a238000} id="Vector 16" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.72" />
            <path d={svgPaths.p23306a80} id="Vector 17" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.72" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="74.0374" id="filter0_d_1_1223" width="85.2836" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4.68591" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_1223" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_1223" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="absolute bg-[#bdd3db] h-[160px] left-[324px] overflow-clip rounded-[24px] top-[227px] w-[123px] hover:scale-105 transition-transform cursor-pointer"
    >
      <p className="absolute font-['Istok_Web:Bold',sans-serif] leading-[normal] left-[68px] not-italic text-[#4190ae] text-[24px] top-[22px]">12%</p>
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[9px] not-italic text-[#4190ae] text-[24px] top-[67px]">Trigger</p>
      <div className="absolute flex h-[70.431px] items-center justify-center left-[38px] top-[91px] w-[86.159px]" style={{ "--transform-inner-width": "1184.65625", "--transform-inner-height": "154" } as React.CSSProperties}>
        <div className="flex-none rotate-[179.27deg]">
          <Frame12 />
        </div>
      </div>
    </motion.div>
  );
}

function Frame9() {
  return (
    <div className="absolute h-[111.801px] left-0 top-[61px] w-[96.25px]">
      <div className="absolute inset-[0_0_-6.75%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 96.2496 119.348">
          <g filter="url(#filter0_d_1_1195)" id="Frame 75">
            <path d={svgPaths.p13c58880} fill="var(--fill-0, #FEB05D)" id="Vector 6" />
            <path d={svgPaths.p24421b80} id="Vector 7" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.72" />
            <path d={svgPaths.p60e7e60} id="Vector 8" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.72" />
            <path d={svgPaths.p3b0e8080} id="Vector 9" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.72" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="119.348" id="filter0_d_1_1195" width="96.2496" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="7.54736" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_1195" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_1195" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="absolute bg-[#ffd6aa] h-[160px] left-[44px] overflow-clip rounded-[24px] top-[399px] w-[202px] hover:scale-105 transition-transform cursor-pointer"
    >
      <p className="absolute font-['Istok_Web:Bold',sans-serif] leading-[normal] left-[137px] not-italic text-[#ec871b] text-[24px] top-[118px]">36%</p>
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[110px] not-italic text-[#ec871b] text-[24px] top-[90px]">Senses</p>
      <Frame9 />
    </motion.div>
  );
}

function Frame13() {
  return (
    <div className="absolute h-[111.801px] left-[96px] top-[61px] w-[96.25px]">
      <div className="absolute inset-[0_0_-21.53%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 96.2496 135.868">
          <g filter="url(#filter0_d_1_1214)" id="Frame 75">
            <path d={svgPaths.p1c655a00} fill="var(--fill-0, #C197CF)" id="Vector 6" />
            <path d={svgPaths.pff44900} id="Vector 7" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.72" />
            <path d={svgPaths.p28b2a280} id="Vector 8" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.72" />
            <path d={svgPaths.p3f748de0} id="Vector 9" stroke="var(--stroke-0, #2B2A2A)" strokeLinecap="round" strokeWidth="1.72" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="135.868" id="filter0_d_1_1214" width="96.2496" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="7.54736" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_1214" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_1214" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.55, duration: 0.5 }}
      className="absolute bg-[#ddc6ed] h-[160px] left-[258px] overflow-clip rounded-[24px] top-[399px] w-[190px] hover:scale-105 transition-transform cursor-pointer"
    >
      <p className="absolute font-['Istok_Web:Bold',sans-serif] leading-[normal] left-[17px] not-italic text-[#8b679d] text-[24px] top-[13px]">36%</p>
      <p className="absolute font-['Istok_Web:Regular',sans-serif] leading-[normal] left-[17px] not-italic text-[#8b679d] text-[24px] top-[37px]">Drive</p>
      <Frame13 />
    </motion.div>
  );
}

interface CardPageProps {
  onNavigateChat: () => void;
  onNavigateHome: () => void;
}

export default function CardPage({ onNavigateChat, onNavigateHome }: CardPageProps) {
  return (
    <div className="relative h-[852px] w-[393px]" style={{ backgroundImage: "linear-gradient(rgba(90, 122, 205, 0.2) 19.712%, rgba(255, 162, 162, 0.2) 44.231%, rgba(90, 156, 181, 0.2) 75.962%, rgba(254, 176, 93, 0.2) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Frame7 />
      <div className="absolute h-[67px] left-[42px] top-[147px] w-[95px]">
        <div className="absolute h-[67px] left-0 top-0 w-[95px]" data-name="image 9">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage9} />
        </div>
      </div>
      <Frame14 />
      <p className="absolute font-['Itim:Regular',sans-serif] leading-[normal] left-[301px] not-italic text-black text-[14.476px] top-[168px]">Feb 6th, 2026</p>
      <p className="absolute font-['Itim:Regular',sans-serif] leading-[normal] left-[301px] not-italic text-[#7e7e7e] text-[11.581px] top-[189px] w-[125.391px]">This is your 96th JoyFormula.</p>
      
      <Frame15 />
      <Frame16 />
      <Frame17 />
      <Frame18 />
      <Frame24 />
      <Frame19 />
      <Frame21 onNavigateChat={onNavigateChat} />
      
      <Component1 onNavigateChat={onNavigateChat} onNavigateHome={onNavigateHome} />
    </div>
  );
}
