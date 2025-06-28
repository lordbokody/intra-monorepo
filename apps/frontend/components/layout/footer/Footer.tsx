
/**
 * Footer komponens
 */
export default function Footer() {

    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
                        <h2 className="text-2xl font-bold">Your Brand</h2>
                        <p className="mt-2 text-sm">Your tagline or description here.</p>
                    </div>

                    <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
                        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                        <ul>
                            <li><a href="#" className="text-sm hover:text-gray-400">Home</a></li>
                            <li><a href="#" className="text-sm hover:text-gray-400">About Us</a></li>
                            <li><a href="#" className="text-sm hover:text-gray-400">Services</a></li>
                            <li><a href="#" className="text-sm hover:text-gray-400">Contact</a></li>
                        </ul>
                    </div>

                    <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
                        <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-xl text-gray-300 hover:text-white">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-xl text-gray-300 hover:text-white">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-xl text-gray-300 hover:text-white">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>


    );
}
