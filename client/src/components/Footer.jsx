import { Link } from 'react-router-dom';

// Import your social media icons
import { FaFacebook, FaXTwitter, FaInstagram } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-4 md:mb-0 border-r-2">
            <h3 className="text-lg font-bold mb-2">Company</h3>
            <ul className="list-none">
              <li><Link to="/" className="text-gray-500 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-white">About</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-white">Contact</Link></li>
              <li><Link to="/sign-in" className="text-gray-500 hover:text-white">Sign In</Link></li>
              <li><Link to="/sign-up" className="text-gray-500 hover:text-white">Sign Up</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0 border-r-2">
            <h3 className="text-lg font-bold mb-2">Social Media</h3>
            <ul className="list-none">
              <li>
                <a href="#" className="flex items-center text-gray-500 hover:text-white">
                  <FaFacebook className="w-4 h-4 mr-2" /> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-500 hover:text-white">
                  <FaXTwitter className="w-4 h-4 mr-2" /> X (Formally Twitter)
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-500 hover:text-white">
                  <FaInstagram className="w-4 h-4 mr-2" /> Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Legal</h3>
            <ul className="list-none">
              <li><Link to="/terms" className="text-gray-500 hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-500 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center mt-6">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Zigo Real Estate Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
