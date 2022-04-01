import { useState } from 'react';
export default function NewsItem({ title, description, urlToImage }) {
  const [showText, setShowText] = useState(false);

  return (
    <div>
      <article class="news-item">
        <h3 class="news-item__title">
          <a href="">{title}</a>
        </h3>
        <button onClick={() => setShowText((current) => !current)}>
          {showText ? 'Hide' : 'Show'}
        </button>
        {showText && (
          <div class="news-item__content">
            <img class="news-item__image" src={urlToImage} alt="" />
            <p class="news-item__description">{description}</p>
          </div>
        )}
      </article>
    </div>
  );
}

/*
Mit Hilfe des useToggle-Hooks, den wir in der
Custom Hooks-Übung geschrieben haben, soll der Content-Bereich
ein- und ausgeblendet werden, der Text im Button soll entsprechend
wechseln. Anfangs soll der Content eingeklappt sein.
Das Bild nur anzeigen, wenn eine Bildquelle vorhanden
ist. Das alt-Attribut kann leer bleiben, weil es im Datensatz leider
nicht enthalten ist.
 
  <article class="news-item">
<h3 class="news-item__title">
  <a href="">Titel</a>
</h3>
<button>
 Weniger anzeigen / Mehr anzeigen
</button>
<div class="news-item__content">
<img class="news-item__image" src="" alt="" />
<p class="news-item__description">Nachrichtentext</p>
</div>
</article> */
