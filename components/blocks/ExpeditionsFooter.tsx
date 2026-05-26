import Link from "next/link";

export function ExpeditionsFooter() {
  return (
    <footer className="expeditions-footer">
      <div className="footer-main">
        {/* Brand */}
        <div className="footer-brand">
          <Link href="/" className="footer-brand-logo">
            Big Sky <span>Atlas</span>
          </Link>
          <p className="footer-brand-tagline">
            Guided wilderness expeditions in the American West. No shortcuts.
          </p>
        </div>
        {/* Trails */}
        <div>
          <span className="footer-col-label">Trails</span>
          <ul className="footer-col-links">
            <li>
              <Link href="/expeditions#bighorn">Bighorn Sanctuary</Link>
            </li>
            <li>
              <Link href="/expeditions#beartooth">Beartooth Summits</Link>
            </li>
            <li>
              <Link href="/expeditions#teton">Teton Traverse</Link>
            </li>
          </ul>
        </div>
        {/* Company */}
        <div>
          <span className="footer-col-label">Company</span>
          <ul className="footer-col-links">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Our Guides</a>
            </li>
            <li>
              <a href="#">Field Notes</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <span className="footer-col-label">Contact</span>
          <ul className="footer-col-links">
            <li>
              <Link href="/contact">Book a Call</Link>
            </li>
            <li>
              <a href="mailto:hello@bigskyatlas.com">hello@bigskyatlas.com</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-coord-group">
          <span>43°28&apos;N</span>
          <span>·</span>
          <span>110°45&apos;W</span>
          <span className="city">Jackson, WY</span>
        </div>
        <span className="footer-copyright">
          © 2026 Big Sky Atlas. All rights reserved.
        </span>
        <div className="footer-legal-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
      <div className="footer-wordmark">
        <span>Big Sky Atlas</span>
      </div>
    </footer>
  );
}
