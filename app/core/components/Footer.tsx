import React, { useState } from "react"
import Version from "version"

const Footer = () => {
  const [more, setMore] = useState(false)
  return (
    <div id="footer" className="clearfix">
      Copyright © 2013 GG Network S.A.
      <br />
      Copyright © 2021 ITunix Service
      <br />
      {/* <p style={{ marginTop: 10 }}>
        To jest prywatny projekt, <br />
        jeżeli chcesz wesprzeć autora wyślij{" "}
        <a href="https://paypal.me/modinfo" target="_blank" rel="noreferrer">
          złotówkę
        </a>
        .
      </p> */}
      <p style={{ marginTop: 10 }}>
        <p>
          Znalazłeś błąd? Napisz wiadomość do ^blipdev
          <br />
          <code>&gt;blipdev znaleziony błąd</code>
        </p>
      </p>
      <p
        style={{
          marginTop: 10,
          padding: 5,
        }}
      >
        <strong>
          <em>Szybka pomoc</em>
        </strong>
        <p>
          Aby napisać do kogoś wiadomość: <br />
          <code>&gt;nick wiadomosc</code>
        </p>
        <p>
          Aby wysłać prywatną wiadomość do osoby: <br />
          <code>&gt;&gt;nick wiadomosc</code>
        </p>
      </p>
      <p style={{ marginTop: 20 }}>
        Aktualna wersja: <strong>{<Version />}</strong>
      </p>
      <p style={{ marginTop: 20 }}>
        <span
          onClick={() => {
            setMore(!more)
          }}
        >
          {more ? (
            <span style={{ textDecoration: "underline" }}>Ukryj info dla geeków</span>
          ) : (
            <span style={{ textDecoration: "underline" }}>Pokaż info dla geeków</span>
          )}
        </span>

        {more && (
          <p>
            <ul>
              <li>
                Projekt został zbudowany za pomocą{" "}
                <a href="https://blitzjs.com/" target="_blank" rel="noreferrer">
                  Blitz.js
                </a>
              </li>
              <li>
                Baza danych to Postgres z wykorzystaniem{" "}
                <a href="https://prisma.io/" target="_blank" rel="noreferrer">
                  Prisma
                </a>
              </li>
              <li>
                Hostowane na{" "}
                <a href="https://heroku.com/" target="_blank" rel="noreferrer">
                  Heroku
                </a>
              </li>
            </ul>
          </p>
        )}
      </p>
    </div>
  )
}

export default Footer
