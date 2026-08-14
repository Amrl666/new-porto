/**
 * The #fm-rough SVG turbulence filter used to roughen the
 * stamps ("Confirmed", "Wanted", "Case Closed"). Rendered once,
 * globally; referenced via [filter:url(#fm-rough)].
 */
export default function RoughFilter() {
  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
      <filter id="fm-rough" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="turbulence" baseFrequency="0.035 0.06" numOctaves="2" seed="7" result="t" />
        <feDisplacementMap in="SourceGraphic" in2="t" scale="7" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
