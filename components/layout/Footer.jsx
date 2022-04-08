import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="inner-width">
        &copy; Built w/ NextJS {new Date().getFullYear()} - Data Provided by:{' '}
        <Link href={`https://www.coingecko.com/en/api`}>
          <a target="_blank">Coingecko</a>
        </Link>
      </div>
    </footer>
  );
}
