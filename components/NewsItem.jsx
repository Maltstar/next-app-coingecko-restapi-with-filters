import { useState } from 'react';
export default function NewsItem({ title, description, urlToImage }) {
  const [showText, setShowText] = useState(false);

  return (
    <div>
      <article className="news-item">
        <h3 className="news-item__title">
          <a href="">{title}</a>
        </h3>
        <button onClick={() => setShowText((current) => !current)}>
          {showText ? 'Hide' : 'Show'}
        </button>
        {showText && (
          <div className="news-item__content">
            <img className="news-item__image" src={urlToImage} alt="" />
            <p className="news-item__description">{description}</p>
          </div>
        )}
      </article>
    </div>
  );
}
