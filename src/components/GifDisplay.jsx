export const GifDisplay = ({ type, phase, src }) => (
  <div id={`${type}GifContainer`} className="fade-in">
    <img src={src} alt={`fin ${type}`} />
  </div>
);