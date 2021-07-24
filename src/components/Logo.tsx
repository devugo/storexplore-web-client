const Logo = () => {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <rect
          x="5.38136"
          y="16.3223"
          width="50"
          height="50"
          rx="10"
          transform="rotate(-15 5.38136 16.3223)"
          fill="white"
        />
        <path
          d="M47 21H25V27.5H31L36 37.25H31.25L31.5 47H40C40 47 38.5 35.5 40 27.5C41.5 19.5 47 27.5 47 27.5V21Z"
          fill="url(#paint0_linear)"
        />
        <circle cx="44.5" cy="43.5" r="3.15" fill="white" stroke="#C9F7F5" strokeWidth="0.7" />
        <circle cx="44.5" cy="43.5" r="1.5" fill="#1BC5BD" />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0.381363"
          y="0.381378"
          width="71.2372"
          height="71.2372"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2.5" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear"
          x1="36"
          y1="21"
          x2="36"
          y2="47"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.499215" stopColor="#191970" />
          <stop offset="1" stopColor="#006FD6" stopOpacity="0.75" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export default Logo;
