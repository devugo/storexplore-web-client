const LogoWhite = ({ width, height }: { width: number; height: number }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 0H0V6.5H6L11 16.25H6.25L6.5 26H15C15 26 13.5 14.5 15 6.5C16.5 -1.5 22 6.5 22 6.5V0Z"
        fill="url(#paint0_linear)"
      />
      <circle cx="19.5" cy="22.5" r="3.15" fill="white" stroke="#9BC3EB" strokeWidth="0.7" />
      <circle cx="19.5" cy="22.5" r="1.5" fill="#DFDFFE" />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="11"
          y1="0"
          x2="11"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.499215" stopColor="#DFDFFE" />
          <stop offset="1" stopColor="#7CB6EC" stopOpacity="0.75" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export default LogoWhite;
