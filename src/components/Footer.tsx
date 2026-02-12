import { Mountain, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F5F1E8] text-[#3D3226]">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="space-y-5">
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
              <a
                href="#"
                className="hover:text-[#8B6F47] transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-[#8B6F47] transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'Our Tours', 'Volunteer Programs', 'Blog', 'Testimonials', 'FAQs'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[#5C5346] hover:text-[#3D3226] hover:underline underline-offset-4 transition-all duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-base font-semibold mb-5">Resources</h3>
            <ul className="space-y-3">
              {[
                'Travel Guide',
                'Safety Guidelines',
                'Packing List',
                'Booking Policy',
                'Privacy Policy',
                'Terms & Conditions'
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[#5C5346] hover:text-[#3D3226] hover:underline underline-offset-4 transition-all duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get in Touch */}
          <div>
            <h3 className="text-base font-semibold mb-5">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-[#5C5346]">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                 Heritage Himalaya Trails<br/>Tsangspa House,<br/>
                  Near GurudwaraSingh Sabha, 
                  Nawshar, <br/>
                 Leh 194101, Ladakh, India
                </span>
              </li>
              <li className="flex gap-3 text-sm text-[#5C5346]">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+9771234567890" className="hover:text-[#3D3226] transition-colors duration-200">
                  +9419218013 / 9622992881
                </a>
              </li>
              <li className="flex gap-3 text-sm text-[#5C5346]">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:info.hhtrails@gmail.com" className="hover:text-[#3D3226] transition-colors duration-200">
                 info.hhtrails@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-[#D4C9B5]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#5C5346]">
            <p>© 2025 Himalayan Trails. All rights reserved.</p>
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
