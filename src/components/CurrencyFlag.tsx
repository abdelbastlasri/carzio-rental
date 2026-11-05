import type { CurrencyCode } from '../lib/currency';

interface CurrencyFlagProps {
  code: CurrencyCode;
  className?: string;
}

const STAR_PATH =
  'M0 -1.45 L0.34 -0.468 L1.378 -0.445 L0.588 0.18 L0.852 1.174 L0 0.725 L-0.852 1.174 L-0.588 0.18 L-1.378 -0.445 L-0.34 -0.468 Z';
const EU_STAR =
  'M0 -2.2 L0.517 -0.712 L2.093 -0.677 L0.89 0.271 L1.293 1.777 L0 1.1 L-1.293 1.777 L-0.89 0.271 L-2.093 -0.677 L-0.517 -0.712 Z';

export default function CurrencyFlag({ code, className = 'h-4 w-6' }: CurrencyFlagProps) {
  const common = className + ' shrink-0 rounded-[3px] ring-1 ring-white/20';

  if (code === 'MAD') {
    return (
      <svg
        viewBox="0 0 60 40"
        className={common}
        aria-hidden="true"
        focusable="false"
        role="img"
      >
        <rect width="60" height="40" rx="3" fill="#c1272d" />
        <polygon
          points="30,10 32.23,16.93 39.51,16.91 33.62,21.17 35.88,28.09 30,23.8 24.12,28.09 26.38,21.17 20.49,16.91 27.77,16.93"
          fill="none"
          stroke="#006233"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (code === 'EUR') {
    const starTransforms = [
      [30, 9],
      [35.5, 10.47],
      [39.53, 14.5],
      [41, 20],
      [39.53, 25.5],
      [35.5, 29.53],
      [30, 31],
      [24.5, 29.53],
      [20.47, 25.5],
      [19, 20],
      [20.47, 14.5],
      [24.5, 10.47],
    ];
    return (
      <svg viewBox="0 0 60 40" className={common} aria-hidden="true" focusable="false" role="img">
        <rect width="60" height="40" rx="3" fill="#003399" />
        {starTransforms.map(([x, y], index) => (
          <path
            key={index}
            transform={`translate(${x} ${y})`}
            d={EU_STAR}
            fill="#ffcc00"
          />
        ))}
      </svg>
    );
  }

  if (code === 'USD') {
    return (
      <svg viewBox="0 0 60 40" className={common} aria-hidden="true" focusable="false" role="img">
        <rect width="60" height="40" rx="3" fill="#fff" />
        {[0, 2, 4, 6, 8, 10, 12].map((stripe) => (
          <rect key={stripe} y={(40 / 13) * stripe} width="60" height={40 / 13} fill="#b22234" />
        ))}
        <rect width="24" height={(40 / 13) * 7} fill="#3c3b6e" />
        {Array.from({ length: 9 }, (_, row) => {
          const y = 2.2 + row * 2.15;
          const count = row % 2 === 0 ? 6 : 5;
          const start = row % 2 === 0 ? 2.6 : 4.5;
          return Array.from({ length: count }, (_, col) => (
            <path
              key={`${row}-${col}`}
              transform={`translate(${start + col * 3.85} ${y}) scale(0.82)`}
              d={STAR_PATH}
              fill="#fff"
            />
          ));
        })}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 40" className={common} aria-hidden="true" focusable="false" role="img">
      <rect width="60" height="40" rx="3" fill="#012169" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#ffffff" strokeWidth="10" strokeLinecap="butt" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#c8102e" strokeWidth="4.2" strokeLinecap="butt" />
      <path d="M30 0 V40 M0 20 H60" stroke="#ffffff" strokeWidth="15" strokeLinecap="butt" />
      <path d="M30 0 V40 M0 20 H60" stroke="#c8102e" strokeWidth="9" strokeLinecap="butt" />
    </svg>
  );
}
