/* eslint-disable @next/next/no-img-element */
const Recommendations = () => {
  return (
    <div id="recommendations-box-container">
      <div id="recommendations-box-rounding-top">&nbsp;</div>
      <div id="recommendations">
        <h2>Polecamy:</h2>

        <ul>
          <li>
            <img alt="blipinfo - avatar" className="avatar" src="/images/blipinfo.jpg" />{" "}
            <a href="/blog/blipinfo">blipinfo</a>
          </li>
        </ul>
      </div>
      <div id="recommendations-box-rounding-bottom">&nbsp;</div>
    </div>
  )
}

export default Recommendations
