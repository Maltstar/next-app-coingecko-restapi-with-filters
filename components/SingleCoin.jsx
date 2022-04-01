import { useState } from 'react';
import React from 'react';

export default function SingleCoin({ name, price, logo_url }) {
  const [showText, setShowText] = useState(false);
  return (
    <div>
      <article class="news-item">
        <h3 class="news-item__title">
          <a href="">{name}</a>
        </h3>
        <button onClick={() => setShowText((current) => !current)}>
          {showText ? 'Hide' : 'Show'}
        </button>
        {showText && (
          <div class="news-item__content">
            <img class="news-item__image" src={logo_url} alt="" />
            <p class="news-item__description">{price}</p>
          </div>
        )}
      </article>
    </div>
  );
}
