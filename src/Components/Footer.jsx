import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Ashish Nath ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
