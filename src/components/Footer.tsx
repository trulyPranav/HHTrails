import { Mountain, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const quickLinks = [
    { label: "About Us", path: "/about" },
    { label: "Our Tours", path: "/tours" },
    { label: "Volunteer Programs", path: "/tours/08d1d67e-b2a7-4809-9645-3bb82023954f" },
    { label: "Blog", path: "/blog" }
  ];

  return (
    <footer className="bg-[#F5F1E8] text-[#3D3226]">
      <style>{`
        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            text-align: center !important;
            gap: 8px !important;
          }
          .footer-brand-col {
            max-width: 100% !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
          .footer-brand-col {
            grid-column: span 2 !important;
          }
        }
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
          }}
        >

          {/* Column 1: Brand */}
          <div className="footer-brand-col space-y-5">
            <div className="flex items-start">
              <img
                src="/hht_final_logo_send.svg"
                alt="Heritage Himalaya Trails"
                className="h-20 w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed text-[#5C5346]">
              Discover the heart of the Himalayas through meaningful travel experiences
              that connect you with culture, nature, and tradition.
            </p>

            <div className="flex gap-4 pt-2">
              <a href="https://www.instagram.com/heritage.himalaya.trails?igsh=MWFma2wyN3pxcmlqdA==" className="hover:text-[#8B6F47] transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@heritagehimalaya?si=x1IISEH2eVxEBLOX" className="hover:text-[#8B6F47] transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-[#5C5346] hover:text-[#3D3226] hover:underline underline-offset-4 transition-all duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>  
          {/* Column 3: Resources */}
          <div>
            <h3 className="text-base font-semibold mb-5">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/pdf/heritage_himalaya_tips_and_guidelines.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#5C5346] hover:text-[#3D3226] hover:underline underline-offset-4 transition-all duration-200"
                >
                  Tips & Guidelines
                </a>
              </li>

              <li>
                <a
                  href="/pdf/heritage_himalaya_booking_policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#5C5346] hover:text-[#3D3226] hover:underline underline-offset-4 transition-all duration-200"
                >
                  Booking Policy
                </a>
              </li>

              <li>
                <a
                  href="/pdf/heritage_himalaya_privacy_policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#5C5346] hover:text-[#3D3226] hover:underline underline-offset-4 transition-all duration-200"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="/pdf/heritage_himalaya_terms_conditions.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#5C5346] hover:text-[#3D3226] hover:underline underline-offset-4 transition-all duration-200"
                >
                  Terms & Conditions
                </a>
              </li>

            </ul>
          </div>

          {/* Column 4: Get in Touch */}
          <div>
            <h3 className="text-base font-semibold mb-5">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-[#5C5346]">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  Heritage Himalaya Trails<br />
                  Tsangspa House,<br />
                  Near Gurudwara Singh Sabha,<br />
                  Nawshar,<br />
                  Leh 194101, Ladakh, India
                </span>
              </li>

              <li className="flex gap-3 text-sm text-[#5C5346]">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+919622992881" className="hover:text-[#3D3226] transition-colors duration-200">
                  +9419218013 / 9622992881
                </a>
              </li>

              <li className="flex gap-3 text-sm text-[#5C5346]">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:heritagetrails.ladakh@gmail.com" className="hover:text-[#3D3226] transition-colors duration-200">
                  heritagetrails.ladakh@gmail.com

                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-[#D4C9B5]">
          <div className="footer-bottom flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#5C5346]">
            <p>© 2025 Heritage Himalayan Trails. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Crafted with passion for mountain lovers
              <Mountain className="w-4 h-4" />
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}