/**
 * Pinaka Celestial Bow Motif (Vector graphic)
 * Inspired by the divine bow of Lord Shiva — precision, balance, and focused power.
 */
export default function PinakaBow({ className = 'h-6 w-auto text-pinaka-saffron' }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Taut outer celestial arc */}
      <path
        d="M 5 20 C 35 2, 85 2, 115 20"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Inner reinforcing spine */}
      <path
        d="M 12 21 C 40 7, 80 7, 108 21"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.6"
        strokeLinecap="round"
      />
      {/* Bowstring */}
      <line
        x1="5"
        y1="20"
        x2="115"
        y2="20"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
        strokeOpacity="0.4"
      />
      {/* Central Arrow rest / Axis */}
      <circle cx="60" cy="20" r="2.5" fill="currentColor" />
      <line x1="60" y1="9" x2="60" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Arrowhead tip pointing down towards target */}
      <path d="M 57 31 L 60 36 L 63 31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bow nocks */}
      <circle cx="5" cy="20" r="1.5" fill="currentColor" />
      <circle cx="115" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}
