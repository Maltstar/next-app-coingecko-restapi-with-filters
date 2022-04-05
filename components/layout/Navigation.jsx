import React from 'react';
import Link from 'next/link';
export default function Navigation() {
  return (
    <nav className="site-navigation">
      <Link href="/">
        <a>Startseite</a>
      </Link>
      <Link href="/paginated">
        <a>Gridansicht</a>
      </Link>
    </nav>
  );
}
