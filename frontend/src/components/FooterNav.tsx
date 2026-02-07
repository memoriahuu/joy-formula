import svgPaths from "../imports/svg-qxpfech87c";
import imgImage12 from "figma:asset/481ec9271992b35c78654813354c17a1bbe7b8b3.png";
import imgImage13 from "figma:asset/dcf8b305885a632a490f729fe314980e8742e12a.png";
import imgHappy19496721 from "figma:asset/d55f0c6f64187b2aff71cc2cc23da08b81665f02.png";

function Component2() {
  return (
    <div className="absolute bottom-[-0.13px] h-[43.883px] left-0 right-[0.27%]" data-name="4底部横条">
      <div className="-translate-x-1/2 absolute bg-black bottom-[10.21px] h-[6.453px] left-[calc(50%-1px)] rounded-[129.067px] w-[172.949px]" data-name="Home Indicator" />
    </div>
  );
}

function BarChart({ isActive }: { isActive: boolean }) {
  return (
    <div className="h-[39.461px] relative shrink-0 w-[38px]" data-name="Bar chart-2">
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
    </div>
  );
}

function DirectionsWalk() {
  return (
    <div className="h-[34.8px] relative shrink-0 w-[39.526px]" data-name="directions_walk">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.5259 34.8">
        <g id="directions_walk">
          <path d={svgPaths.p2286dff0} fill="var(--fill-0, #4B4B4B)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Info({ isActive }: { isActive: boolean }) {
  return (
    <div className="h-[31px] relative shrink-0 w-[31.674px]" data-name="Info">
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
    </div>
  );
}

function Settings() {
  return (
    <div className="h-[30px] relative shrink-0 w-[30.652px]" data-name="Settings">
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

interface FooterNavProps {
  activePage: 'chat' | 'home';
  onNavigateChat: () => void;
  onNavigateHome: () => void;
}

export default function FooterNav({ activePage, onNavigateChat, onNavigateHome }: FooterNavProps) {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[104px] left-[-6px] top-[940px] w-[484px]" data-name="标签栏">
      <Component2 />
      <div className="absolute content-stretch flex gap-[47px] items-end left-[90px] top-[17px]">
        {/* Bar Chart (Stats) - First icon */}
        <button
          onClick={onNavigateHome}
          className="content-stretch flex flex-col h-[34px] items-center relative shrink-0 w-[35px] transition-transform hover:scale-110 active:scale-95"
        >
          <BarChart isActive={activePage === 'home'} />
        </button>

        {/* Walk icon - Second */}
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[48px] opacity-70">
          <DirectionsWalk />
        </div>

        {/* Info/Chat icon - Third */}
        <button
          onClick={onNavigateChat}
          className="content-stretch flex flex-col items-center relative shrink-0 w-[40px] transition-transform hover:scale-110 active:scale-95"
        >
          <Info isActive={activePage === 'chat'} />
        </button>

        {/* Settings - Fourth */}
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-[40px] opacity-70">
          <Settings />
        </div>
      </div>
    </div>
  );
}
