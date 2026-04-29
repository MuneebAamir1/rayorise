"use client";

interface Props {
  baseColor: string;
  secondaryColor: string;
  accentColor: string;
  goldDetails: boolean;
  design: string;
}

export default function TrackSuitSVG({ baseColor, secondaryColor, accentColor, goldDetails, design }: Props) {
  const gold = "#C8102E";

  /* Design-specific stripe widths */
  const stripeW = design === "bold" ? 28 : design === "retro" ? 12 : design === "minimal" ? 0 : 18;
  const showStripes = design !== "minimal";
  const tripleStripe = design === "retro";

  return (
    <svg viewBox="0 0 360 820" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", maxHeight: 700 }}>
      <defs>
        {/* Subtle fabric texture filter */}
        <filter id="fabric">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
          <feBlend in="SourceGraphic" in2="gray" mode="multiply" result="blend" />
          <feComponentTransfer in="blend">
            <feFuncA type="linear" slope="0.05" />
          </feComponentTransfer>
          <feComposite in="SourceGraphic" operator="atop" />
        </filter>
        {/* Shadow for depth */}
        <filter id="dropShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.3" />
        </filter>
        {/* Gradient for zipper */}
        <linearGradient id="zipGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#888" />
          <stop offset="50%" stopColor="#bbb" />
          <stop offset="100%" stopColor="#888" />
        </linearGradient>
      </defs>

      <g filter="url(#dropShadow)">
        {/* ===== JACKET ===== */}
        <g>
          {/* Jacket body */}
          <path
            d="M 142,28 Q 180,12 218,28 L 255,52 L 272,140 L 280,370 L 268,382 Q 180,395 92,382 L 80,370 L 88,140 L 105,52 Z"
            fill={baseColor}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.5"
          />

          {/* Left sleeve */}
          <path
            d="M 105,52 L 42,78 L 22,90 L 28,260 L 42,268 L 78,258 L 88,140 Z"
            fill={baseColor}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.5"
          />

          {/* Right sleeve */}
          <path
            d="M 255,52 L 318,78 L 338,90 L 332,260 L 318,268 L 282,258 L 272,140 Z"
            fill={baseColor}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.5"
          />

          {/* Side panels / stripes on body */}
          {showStripes && (
            <>
              {/* Left body stripe */}
              <path
                d={`M ${88},140 L ${88 - stripeW},145 L ${80 - stripeW + 2},372 L ${80},370 L ${88},140`}
                fill={secondaryColor}
                opacity="0.92"
              />
              {/* Right body stripe */}
              <path
                d={`M ${272},140 L ${272 + stripeW},145 L ${280 + stripeW - 2},372 L ${280},370 L ${272},140`}
                fill={secondaryColor}
                opacity="0.92"
              />

              {/* Left sleeve stripe */}
              <path
                d={`M ${42},78 L ${42 - stripeW + 2},82 L ${28 - stripeW + 4},262 L ${28},260 L ${42},268 L ${42},78`}
                fill={secondaryColor}
                opacity="0.92"
              />
              {/* Right sleeve stripe */}
              <path
                d={`M ${318},78 L ${318 + stripeW - 2},82 L ${332 + stripeW - 4},262 L ${332},260 L ${318},268 L ${318},78`}
                fill={secondaryColor}
                opacity="0.92"
              />

              {/* Triple stripe accent lines (retro only) */}
              {tripleStripe && (
                <>
                  {/* Left body accent lines */}
                  <line x1="83" y1="142" x2="75" y2="374" stroke={accentColor} strokeWidth="1.5" opacity="0.8" />
                  <line x1="78" y1="144" x2="70" y2="375" stroke={accentColor} strokeWidth="1.5" opacity="0.8" />
                  {/* Right body accent lines */}
                  <line x1="277" y1="142" x2="285" y2="374" stroke={accentColor} strokeWidth="1.5" opacity="0.8" />
                  <line x1="282" y1="144" x2="290" y2="375" stroke={accentColor} strokeWidth="1.5" opacity="0.8" />
                </>
              )}
            </>
          )}

          {/* Accent lines along stripes */}
          {showStripes && !tripleStripe && (
            <>
              <line x1={88 - stripeW} y1="145" x2={80 - stripeW + 2} y2="372" stroke={accentColor} strokeWidth="2" opacity="0.75" />
              <line x1={272 + stripeW} y1="145" x2={280 + stripeW - 2} y2="372" stroke={accentColor} strokeWidth="2" opacity="0.75" />
              <line x1={42 - stripeW + 2} y1="82" x2={28 - stripeW + 4} y2="262" stroke={accentColor} strokeWidth="2" opacity="0.75" />
              <line x1={318 + stripeW - 2} y1="82" x2={332 + stripeW - 4} y2="262" stroke={accentColor} strokeWidth="2" opacity="0.75" />
            </>
          )}

          {/* Collar */}
          <path
            d="M 142,28 Q 150,22 160,30 L 170,50 L 180,55 L 190,50 L 200,30 Q 210,22 218,28 L 210,48 L 200,60 Q 180,68 160,60 L 150,48 Z"
            fill={baseColor}
            stroke={secondaryColor}
            strokeWidth="1"
            opacity="0.95"
          />

          {/* Zipper line */}
          <line x1="180" y1="55" x2="180" y2="390" stroke="url(#zipGrad)" strokeWidth="2" opacity="0.5" />

          {/* Zipper pull */}
          <rect x="177" y="55" width="6" height="10" rx="1" fill="#aaa" opacity="0.6" />

          {/* Cuff bands — left */}
          <rect x="28" y="255" width="52" height="14" rx="2" fill={baseColor} stroke={secondaryColor} strokeWidth="0.8" opacity="0.9" />
          {/* Cuff bands — right */}
          <rect x="280" y="255" width="52" height="14" rx="2" fill={baseColor} stroke={secondaryColor} strokeWidth="0.8" opacity="0.9" />

          {/* Hem band */}
          <path
            d="M 92,378 Q 180,392 268,378 L 268,388 Q 180,402 92,388 Z"
            fill={baseColor}
            stroke={secondaryColor}
            strokeWidth="0.8"
            opacity="0.9"
          />

          {/* Gold details */}
          {goldDetails && (
            <>
              {/* Zipper pull accent */}
              <rect x="178" y="56" width="4" height="8" rx="1" fill={gold} opacity="0.8" />
              {/* Collar tips */}
              <circle cx="148" cy="32" r="2" fill={gold} opacity="0.7" />
              <circle cx="212" cy="32" r="2" fill={gold} opacity="0.7" />
              {/* Cuff accents */}
              <line x1="30" y1="262" x2="78" y2="262" stroke={gold} strokeWidth="1" opacity="0.5" />
              <line x1="282" y1="262" x2="330" y2="262" stroke={gold} strokeWidth="1" opacity="0.5" />
              {/* Hem accent */}
              <path d="M 100,385 Q 180,397 260,385" stroke={gold} strokeWidth="1" fill="none" opacity="0.5" />
            </>
          )}
        </g>

        {/* ===== PANTS ===== */}
        <g>
          {/* Left leg */}
          <path
            d="M 95,400 L 92,405 L 100,410 L 104,550 L 110,700 L 118,755 L 162,755 L 170,700 L 178,550 L 180,420 L 180,400 Z"
            fill={baseColor}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.5"
          />

          {/* Right leg */}
          <path
            d="M 265,400 L 268,405 L 260,410 L 256,550 L 250,700 L 242,755 L 198,755 L 190,700 L 182,550 L 180,420 L 180,400 Z"
            fill={baseColor}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.5"
          />

          {/* Waistband */}
          <path
            d="M 90,398 Q 180,410 270,398 L 270,408 Q 180,420 90,408 Z"
            fill={baseColor}
            stroke={secondaryColor}
            strokeWidth="0.8"
            opacity="0.9"
          />

          {/* Left leg stripe */}
          {showStripes && (
            <path
              d={`M ${92},405 L ${92 - stripeW + 4},408 L ${110 - stripeW + 6},752 L ${118},755 L ${110},700 L ${104},550 L ${100},410 Z`}
              fill={secondaryColor}
              opacity="0.9"
            />
          )}

          {/* Right leg stripe */}
          {showStripes && (
            <path
              d={`M ${268},405 L ${268 + stripeW - 4},408 L ${250 + stripeW - 6},752 L ${242},755 L ${250},700 L ${256},550 L ${260},410 Z`}
              fill={secondaryColor}
              opacity="0.9"
            />
          )}

          {/* Pants accent lines */}
          {showStripes && !tripleStripe && (
            <>
              <line x1={92 - stripeW + 4} y1="408" x2={110 - stripeW + 6} y2="752" stroke={accentColor} strokeWidth="2" opacity="0.7" />
              <line x1={268 + stripeW - 4} y1="408" x2={250 + stripeW - 6} y2="752" stroke={accentColor} strokeWidth="2" opacity="0.7" />
            </>
          )}

          {/* Retro triple stripe on pants */}
          {tripleStripe && showStripes && (
            <>
              <line x1="87" y1="408" x2="105" y2="753" stroke={accentColor} strokeWidth="1.5" opacity="0.8" />
              <line x1="82" y1="410" x2="100" y2="754" stroke={accentColor} strokeWidth="1.5" opacity="0.8" />
              <line x1="273" y1="408" x2="255" y2="753" stroke={accentColor} strokeWidth="1.5" opacity="0.8" />
              <line x1="278" y1="410" x2="260" y2="754" stroke={accentColor} strokeWidth="1.5" opacity="0.8" />
            </>
          )}

          {/* Ankle cuffs */}
          <rect x="118" y="750" width="44" height="12" rx="2" fill={baseColor} stroke={secondaryColor} strokeWidth="0.8" opacity="0.9" />
          <rect x="198" y="750" width="44" height="12" rx="2" fill={baseColor} stroke={secondaryColor} strokeWidth="0.8" opacity="0.9" />

          {/* Gold details on pants */}
          {goldDetails && (
            <>
              {/* Waist accent */}
              <path d="M 100,404 Q 180,415 260,404" stroke={gold} strokeWidth="1" fill="none" opacity="0.5" />
              {/* Ankle accents */}
              <line x1="120" y1="757" x2="160" y2="757" stroke={gold} strokeWidth="1" opacity="0.5" />
              <line x1="200" y1="757" x2="240" y2="757" stroke={gold} strokeWidth="1" opacity="0.5" />
            </>
          )}
        </g>

        {/* Logo placement zones (invisible guides) */}
        <rect data-zone="chest" x="140" y="120" width="80" height="60" fill="transparent" />
        <rect data-zone="left-sleeve" x="35" y="120" width="50" height="50" fill="transparent" />
        <rect data-zone="right-sleeve" x="275" y="120" width="50" height="50" fill="transparent" />
        <rect data-zone="pants" x="140" y="450" width="80" height="60" fill="transparent" />
      </g>
    </svg>
  );
}
