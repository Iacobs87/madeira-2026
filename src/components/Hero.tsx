/** Decorative Madeira landscape: ocean, terraced green slopes, peaks above the clouds. */
export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 320" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c2c42" />
          <stop offset="0.6" stopColor="#164f75" />
          <stop offset="1" stopColor="#2b7fb4" />
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d6694" />
          <stop offset="1" stopColor="#0c2c42" />
        </linearGradient>
      </defs>
      <rect width="800" height="320" fill="url(#sky)" />
      <circle cx="640" cy="96" r="26" fill="#f9c9a6" opacity="0.85" />
      <path d="M210 210 L330 92 L372 130 L430 70 L520 168 L600 120 L720 210Z" fill="#113d5b" />
      <path d="M0 230 C90 180 160 150 240 160 C320 170 360 120 440 128 C530 138 600 190 800 200 V320 H0Z" fill="#1b3f29" />
      <path d="M0 252 C120 220 220 200 330 214 C450 230 560 206 800 236 V320 H0Z" fill="#2f6b45" />
      <path d="M40 262 h90 M60 252 h80 M300 236 h70 M320 226 h60 M560 242 h80 M580 232 h60" stroke="#3f8a57" strokeWidth="3" strokeLinecap="round" />
      <path d="M130 168 C190 158 250 172 300 160 C360 150 420 162 470 152" stroke="#eaefec" strokeWidth="9" strokeLinecap="round" opacity="0.35" fill="none" />
      <path d="M0 280 C140 268 260 292 400 280 C540 268 660 292 800 280 V320 H0Z" fill="url(#sea)" />
      <path d="M60 296 q20 -6 40 0 M300 304 q20 -6 40 0 M560 296 q20 -6 40 0" stroke="#a9d1ea" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
  );
}
