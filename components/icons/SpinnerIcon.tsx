
import React from 'react';

export const SpinnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="animate-spin"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v3m0 12v3m9-9h-3M6 12H3m16.5-6.5L18 7M6 18l1.5-1.5M18 17l-1.5-1.5M6 6l1.5 1.5"
    />
  </svg>
);
