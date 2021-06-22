import React, { useState } from "react"

const AboutTop = () => {
  const [more, setMore] = useState(false)
  return (
    <div id="about">
      <div className="solid-box-rounding-top">&nbsp;</div>

      <div className="solid-box">
        <p>
          <span className="blip">Blip</span>
          <br />
          <strong>to blog, komunikator i chat w jednym</strong> <br />
          <a
            onClick={() => {
              setMore(!more)
            }}
            style={{ cursor: "pointer" }}
          >
            {!more ? "więcej" : "mniej"} &gt;&gt;
          </a>
        </p>

        {more && (
          <div id="info-more">
            <p>
              Gdziekolwiek jesteś, pisz o tym co robisz, wysyłaj zdjęcia i nagrywaj wiadomości
              głosowe.
            </p>

            <p>
              Bądź w ciągłym kontakcie ze swoimi znajomymi, blipując za pomocą przeglądarki
              internetowej, komunikatora (np. Gadu-Gadu) lub komórki. Załóż konto i dołącz do
              społeczności kilku tysięcy użytkowników Blipa!
            </p>

            <p className="more">
              <a href="/pages/register">Chcesz wiedzieć więcej?</a>
            </p>
          </div>
        )}

        <a className="register" href="/users/new">
          &nbsp;
        </a>
      </div>
      <div className="solid-box-rounding-bottom">&nbsp;</div>
    </div>
  )
}

export default AboutTop
