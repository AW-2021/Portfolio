interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const Globe = ({
  size = 48,
  strokeWidth = 1.5,
  className = "text-dark",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
  >
    {/* Main circle */}
    <circle
      cx="24"
      cy="24"
      r="20"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      fill="none"
    />

    {/* Horizontal ellipse */}
    <ellipse
      cx="24"
      cy="24"
      rx="20"
      ry="6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      fill="none"
    />

    {/* Vertical ellipse */}
    <ellipse
      cx="24"
      cy="24"
      rx="8"
      ry="20"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      fill="none"
    />
  </svg>
);

const OverlappingSquares = ({
  size = 48,
  strokeWidth = 1.5,
  className = "text-dark",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
  >
    {/* Four overlapping squares flipped along y-axis */}
    <rect
      x="27"
      y="5"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      fill="none"
    />

    <rect
      x="19"
      y="13"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      fill="none"
    />

    <rect
      x="13"
      y="19"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      fill="none"
    />

    <rect
      x="5"
      y="27"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      fill="none"
    />
  </svg>
);

const LoadingSpinner = ({
  size = 48,
  strokeWidth = 1.5,
  className = "text-dark",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
  >
    {/* Sharp-edged dashes in circle formation with varying thickness starting from 12:00 */}
    <g transform="translate(24, 24)">
      {[...Array(12)].map((_, i) => {
        // Start from 12:00 (top, -90 degrees) and go clockwise
        const angle = ((i * 30 - 90) * Math.PI) / 180;
        const x1 = Math.cos(angle) * 10;
        const y1 = Math.sin(angle) * 10;
        const x2 = Math.cos(angle) * 18;
        const y2 = Math.sin(angle) * 18;
        // Progressive thickness from thin to thick
        const thickness = strokeWidth * (0.3 + (i / 11) * 1.7);

        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth={thickness}
            strokeLinecap="square"
          />
        );
      })}
    </g>
  </svg>
);

const SquareInCircle = ({
  size = 48,
  strokeWidth = 1.5,
  className = "text-dark",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
  >
    {/* Outer circle */}
    <circle
      cx="24"
      cy="24"
      r="20"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      fill="none"
    />

    {/* Inner square */}
    <rect
      x="10"
      y="10"
      width="28"
      height="28"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      fill="none"
    />
  </svg>
);

export { Globe, OverlappingSquares, LoadingSpinner, SquareInCircle };
