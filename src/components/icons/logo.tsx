export const Logo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      d="M0 6C0 2.68629 2.68629 0 6 0H26C29.3137 0 32 2.68629 32 6V26C32 29.3137 29.3137 32 26 32H6C2.68629 32 0 29.3137 0 26V6Z"
      fill="url(#pattern0_3_14)"
    />
    <defs>
      <pattern
        id="pattern0_3_14"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_3_14" transform="scale(0.005)" />
      </pattern>
      <image
        id="image0_3_14"
        width="200"
        height="200"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);
