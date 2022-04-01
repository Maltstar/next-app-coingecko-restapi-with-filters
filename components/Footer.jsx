import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="inner-width">
        &copy; Built w/ NextJS {new Date().getFullYear()}
      </div>
    </footer>
  );
}
