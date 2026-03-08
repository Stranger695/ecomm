import { Link } from 'react-router-dom';
import { Package, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-12 pb-6 md:pt-16 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 md:mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 md:mb-6">
              <Package className="w-6 h-6 md:w-8 md:h-8 text-accent" />
              <span className="text-xl md:text-2xl font-bold tracking-tight">Nexus</span>
            </Link>
            <p className="text-gray-400 mb-4 md:mb-6 text-xs md:text-sm leading-relaxed">
              Your premium destination for modern lifestyle products. We deliver quality, speed, and exceptional customer service.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Quick Links</h3>
            <ul className="space-y-2 md:space-y-4 text-xs md:text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-accent transition-colors">Shop All</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link to="/track-order" className="hover:text-accent transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Customer Service</h3>
            <ul className="space-y-2 md:space-y-4 text-xs md:text-sm text-gray-400">
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link to="/returns" className="hover:text-accent transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Contact Us</h3>
            <ul className="space-y-2 md:space-y-4 text-xs md:text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-accent shrink-0" />
                <span>123 Commerce Blvd, Tech City, TC 10100</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-accent shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-accent shrink-0" />
                <span>support@nexus.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-gray-500">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Nexus E-Commerce. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {/* Payment Icons Mock */}
            <div className="h-6 w-10 md:h-8 md:w-12 bg-white/10 rounded flex items-center justify-center text-[10px] md:text-xs font-bold">VISA</div>
            <div className="h-6 w-10 md:h-8 md:w-12 bg-white/10 rounded flex items-center justify-center text-[10px] md:text-xs font-bold">MC</div>
            <div className="h-6 w-10 md:h-8 md:w-12 bg-white/10 rounded flex items-center justify-center text-[10px] md:text-xs font-bold">AMEX</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
