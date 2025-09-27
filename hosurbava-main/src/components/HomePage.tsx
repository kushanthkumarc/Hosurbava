export function HomePage() {
  return (
    <>
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-10 w-auto logo-glow" src="/static/logo.svg" alt="HosurBava" />
              </div>

            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-900 hover:text-brand-primary px-3 py-2 text-sm font-medium">Home</a>
              <a href="#about" className="text-gray-900 hover:text-brand-primary px-3 py-2 text-sm font-medium">About</a>
              <a href="#services" className="text-gray-900 hover:text-brand-primary px-3 py-2 text-sm font-medium">Services</a>
              <a href="#social" className="text-gray-900 hover:text-brand-primary px-3 py-2 text-sm font-medium">Social Media</a>
              <a href="#contact" className="bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-secondary">Contact</a>
            </div>
            <div className="md:hidden flex items-center">
              <button id="mobile-menu-button" className="text-gray-900 hover:text-brand-primary">
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div id="mobile-menu" className="md:hidden hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-brand-primary">Home</a>
            <a href="#about" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-brand-primary">About</a>
            <a href="#services" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-brand-primary">Services</a>
            <a href="#social" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-brand-primary">Social Media</a>
            <a href="#contact" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-brand-primary">Contact</a>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Banner with Slideshow */}
      <section id="home" className="relative min-h-screen overflow-hidden">
        {/* Slideshow Container */}
        <div id="hero-slideshow" className="relative min-h-screen">
          
          {/* Slide 1 - Main Brand Introduction */}
          <div className="hero-slide active" data-slide="0">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-accent"></div>
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-10 min-h-screen flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-white animate-slide-in-left">
                    <div className="mb-6">
                      <span className="bg-brand-accent text-brand-dark px-4 py-2 rounded-full text-sm font-semibold animate-pulse-custom">
                        🔥 Trusted by 100K+ Followers
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-shadow">
                      Your Trusted
                      <span className="block text-brand-accent">Mobile Expert</span>
                      <span className="block text-2xl md:text-3xl font-medium">& Social Influencer</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100">
                      Premium mobile services, authentic reviews, and expert solutions in Hosur. 
                      Follow my journey and get the best mobile tech advice!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a href="#services" className="bg-brand-accent text-brand-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-colors inline-flex items-center btn-primary">
                        <i className="fas fa-mobile-alt mr-3"></i>
                        Explore Services
                      </a>
                      <a href="#social" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-brand-primary transition-colors inline-flex items-center">
                        <i className="fab fa-instagram mr-3"></i>
                        Follow Journey
                      </a>
                    </div>
                  </div>
                  <div className="relative animate-slide-in-right">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl card-hover">
                      <img src="/static/hosurbava-hero.svg" alt="HosurBava" className="w-full rounded-xl" />
                      <div className="mt-6 text-center">
                        <h3 className="text-xl font-bold text-brand-dark mb-2">HosurBava</h3>
                        <p className="text-gray-600 mb-4">Mobile Expert & Content Creator</p>
                        <div className="flex justify-center space-x-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-brand-primary counter">100K+</div>
                            <div className="text-sm text-gray-600">Followers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-brand-primary counter">5000+</div>
                            <div className="text-sm text-gray-600">Repairs Done</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-brand-primary counter">10+</div>
                            <div className="text-sm text-gray-600">Years Experience</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 - Mobile Repair Services */}
          <div className="hero-slide" data-slide="1">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600"></div>
            <div className="absolute inset-0 bg-black opacity-25"></div>
            <div className="relative z-10 min-h-screen flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-white">
                    <div className="mb-6">
                      <span className="bg-green-400 text-green-900 px-4 py-2 rounded-full text-sm font-semibold">
                        🔧 Expert Mobile Repairs
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-shadow">
                      Professional
                      <span className="block text-green-300">Mobile Repair</span>
                      <span className="block text-2xl md:text-3xl font-medium">Services in Hosur</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100">
                      Screen replacements, battery fixes, charging port repairs, and water damage recovery. 
                      All with genuine parts and warranty protection!
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center text-green-200">
                        <i className="fas fa-check-circle mr-3 text-green-400"></i>
                        <span>Genuine Parts Only</span>
                      </div>
                      <div className="flex items-center text-green-200">
                        <i className="fas fa-clock mr-3 text-green-400"></i>
                        <span>Same Day Service</span>
                      </div>
                      <div className="flex items-center text-green-200">
                        <i className="fas fa-shield-alt mr-3 text-green-400"></i>
                        <span>6 Month Warranty</span>
                      </div>
                      <div className="flex items-center text-green-200">
                        <i className="fas fa-rupee-sign mr-3 text-green-400"></i>
                        <span>Fair Pricing</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a href="#services" className="bg-green-400 text-green-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-300 transition-colors inline-flex items-center">
                        <i className="fas fa-tools mr-3"></i>
                        Get Repair Quote
                      </a>
                      <a href="https://wa.me/919342334005" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors inline-flex items-center">
                        <i className="fab fa-whatsapp mr-3"></i>
                        WhatsApp Now
                      </a>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl">
                      <div className="text-center mb-6">
                        <i className="fas fa-mobile-alt text-6xl text-brand-primary mb-4"></i>
                        <h3 className="text-2xl font-bold text-gray-800">Quick Repair Services</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <i className="fas fa-desktop text-brand-primary mr-3"></i>
                          <span className="font-medium">Screen Replacement - ₹2,000+</span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <i className="fas fa-battery-half text-brand-primary mr-3"></i>
                          <span className="font-medium">Battery Replacement - ₹1,500+</span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <i className="fas fa-plug text-brand-primary mr-3"></i>
                          <span className="font-medium">Charging Port - ₹800+</span>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <i className="fas fa-tint text-brand-primary mr-3"></i>
                          <span className="font-medium">Water Damage - ₹2,500+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 - Social Media Influencer */}
          <div className="hero-slide" data-slide="2">
            <div className="absolute inset-0 instagram-gradient"></div>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative z-10 min-h-screen flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-white">
                    <div className="mb-6">
                      <span className="bg-pink-400 text-pink-900 px-4 py-2 rounded-full text-sm font-semibold">
                        📱 Social Media Influencer
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-shadow">
                      Follow My
                      <span className="block text-pink-300">Tech Journey</span>
                      <span className="block text-2xl md:text-3xl font-medium">Across All Platforms</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-pink-100">
                      Daily tech content, honest mobile reviews, repair tutorials, and behind-the-scenes content. 
                      Join 20K+ followers for the latest mobile tech insights!
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                        <i className="fab fa-instagram text-3xl text-pink-300 mb-2"></i>
                        <div className="text-2xl font-bold">20K+</div>
                        <div className="text-sm">Instagram</div>
                      </div>
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                        <i className="fab fa-youtube text-3xl text-red-300 mb-2"></i>
                        <div className="text-2xl font-bold">20K+</div>
                        <div className="text-sm">YouTube</div>
                      </div>
                      <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                        <i className="fab fa-facebook text-3xl text-blue-300 mb-2"></i>
                        <div className="text-2xl font-bold">20K+</div>
                        <div className="text-sm">Facebook</div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a href="#social" className="bg-pink-400 text-pink-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-pink-300 transition-colors inline-flex items-center">
                        <i className="fab fa-instagram mr-3"></i>
                        Follow All Platforms
                      </a>
                      <a href="https://youtube.com/@hosurbava" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-pink-600 transition-colors inline-flex items-center">
                        <i className="fab fa-youtube mr-3"></i>
                        Subscribe Now
                      </a>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl">
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center mb-4">
                          <i className="fas fa-video text-3xl text-white"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">Latest Content</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                            <i className="fab fa-youtube text-white"></i>
                          </div>
                          <div>
                            <div className="font-medium text-sm">iPhone 15 vs Samsung S24</div>
                            <div className="text-xs text-gray-600">20K views • 2 days ago</div>
                          </div>
                        </div>
                        <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mr-3">
                            <i className="fab fa-instagram text-white"></i>
                          </div>
                          <div>
                            <div className="font-medium text-sm">Quick Phone Repair Tips</div>
                            <div className="text-xs text-gray-600">25K likes • 1 day ago</div>
                          </div>
                        </div>
                        <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                            <i className="fab fa-facebook text-white"></i>
                          </div>
                          <div>
                            <div className="font-medium text-sm">Best Budget Phones 2024</div>
                            <div className="text-xs text-gray-600">15K reactions • 3 days ago</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 4 - Premium Accessories */}
          <div className="hero-slide" data-slide="3">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500"></div>
            <div className="absolute inset-0 bg-black opacity-25"></div>
            <div className="relative z-10 min-h-screen flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-white">
                    <div className="mb-6">
                      <span className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold">
                        🛍️ Premium Accessories
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-shadow">
                      Authentic
                      <span className="block text-yellow-300">Mobile Accessories</span>
                      <span className="block text-2xl md:text-3xl font-medium">From Trusted Brands</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-orange-100">
                      Premium cases, fast chargers, wireless earphones, and screen protectors. 
                      All genuine products with warranty and competitive pricing!
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center text-yellow-200">
                        <i className="fas fa-certificate mr-3 text-yellow-400"></i>
                        <span>100% Authentic</span>
                      </div>
                      <div className="flex items-center text-yellow-200">
                        <i className="fas fa-shipping-fast mr-3 text-yellow-400"></i>
                        <span>Quick Delivery</span>
                      </div>
                      <div className="flex items-center text-yellow-200">
                        <i className="fas fa-exchange-alt mr-3 text-yellow-400"></i>
                        <span>Easy Returns</span>
                      </div>
                      <div className="flex items-center text-yellow-200">
                        <i className="fas fa-tags mr-3 text-yellow-400"></i>
                        <span>Best Prices</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a href="#services" className="bg-yellow-400 text-yellow-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center">
                        <i className="fas fa-shopping-bag mr-3"></i>
                        Shop Accessories
                      </a>
                      <a href="#contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors inline-flex items-center">
                        <i className="fas fa-phone mr-3"></i>
                        Check Availability
                      </a>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl">
                      <div className="text-center mb-6">
                        <i className="fas fa-shopping-bag text-6xl text-brand-primary mb-4"></i>
                        <h3 className="text-2xl font-bold text-gray-800">Popular Accessories</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <i className="fas fa-mobile-alt text-2xl text-brand-primary mb-2"></i>
                          <div className="font-medium text-sm">Premium Cases</div>
                          <div className="text-xs text-gray-600">₹299 onwards</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <i className="fas fa-charging-station text-2xl text-brand-primary mb-2"></i>
                          <div className="font-medium text-sm">Fast Chargers</div>
                          <div className="text-xs text-gray-600">₹599 onwards</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <i className="fas fa-headphones text-2xl text-brand-primary mb-2"></i>
                          <div className="font-medium text-sm">Earphones</div>
                          <div className="text-xs text-gray-600">₹899 onwards</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <i className="fas fa-shield-alt text-2xl text-brand-primary mb-2"></i>
                          <div className="font-medium text-sm">Screen Guards</div>
                          <div className="text-xs text-gray-600">₹199 onwards</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Slide Navigation */}
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div class="flex space-x-3">
            <button class="slide-dot active" data-slide="0" aria-label="Slide 1"></button>
            <button class="slide-dot" data-slide="1" aria-label="Slide 2"></button>
            <button class="slide-dot" data-slide="2" aria-label="Slide 3"></button>
            <button class="slide-dot" data-slide="3" aria-label="Slide 4"></button>
          </div>
        </div>

        {/* Slide Controls */}
        <button id="prev-slide" class="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all" aria-label="Previous slide">
          <i class="fas fa-chevron-left text-xl"></i>
        </button>
        <button id="next-slide" class="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all" aria-label="Next slide">
          <i class="fas fa-chevron-right text-xl"></i>
        </button>

      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">About HosurBava</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a passionate tech enthusiast to a trusted mobile expert and social media influencer, 
              HosurBava has been serving the Hosur community with authentic reviews and premium services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/static/about-image.svg" alt="HosurBava Story" className="w-full rounded-2xl shadow-lg" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-brand-dark mb-6">My Journey & Mission</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-brand-primary text-white p-3 rounded-full mr-4">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-dark mb-2">Mobile Expertise</h4>
                    <p className="text-gray-600">10+ years of hands-on experience in mobile repair, accessories, and the latest technology trends.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-brand-accent text-brand-dark p-3 rounded-full mr-4">
                    <i className="fas fa-video"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-dark mb-2">Content Creation</h4>
                    <p className="text-gray-600">Creating authentic, helpful content on social media to educate and entertain my growing community.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-brand-secondary text-white p-3 rounded-full mr-4">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-dark mb-2">Trust & Quality</h4>
                    <p className="text-gray-600">Building long-lasting relationships with customers through honest reviews and premium service quality.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-brand-light rounded-xl">
                <h4 className="font-bold text-brand-dark mb-3">Why Choose HosurBava?</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i>Authentic and unbiased reviews</li>
                  <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i>Premium quality repairs and accessories</li>
                  <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i>Transparent pricing with warranty</li>
                  <li className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-3"></i>Personal attention to each customer</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">Mobile Services & Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional mobile services with genuine parts, expert repairs, and premium accessories. 
              Your phone deserves the best care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mobile Repair */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-brand-primary text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <i className="fas fa-tools text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-4">Mobile Repair</h3>
              <p className="text-gray-600 mb-6">Expert repair services for all brands with genuine parts and warranty. Quick turnaround time guaranteed.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm"><i className="fas fa-check text-green-500 mr-2"></i>Screen replacement</li>
                <li className="flex items-center text-sm"><i className="fas fa-check text-green-500 mr-2"></i>Battery replacement</li>
                <li className="flex items-center text-sm"><i className="fas fa-check text-green-500 mr-2"></i>Charging port repair</li>
                <li className="flex items-center text-sm"><i className="fas fa-check text-green-500 mr-2"></i>Water damage repair</li>
              </ul>
              <button className="w-full bg-brand-primary text-white py-3 rounded-lg hover:bg-brand-secondary transition-colors">
                Get Quote
              </button>
            </div>

            {/* Mobile Accessories */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-brand-accent text-brand-dark p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <i className="fas fa-shopping-bag text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-4">Premium Accessories</h3>
              <p className="text-gray-600 mb-6">Authentic mobile accessories from trusted brands. Cases, chargers, earphones, and more.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm"><i className="fas fa-check text-green-500 mr-2"></i>Protective cases & covers</li>
                <li className="flex items-center text-sm"><i className="fas fa-check text-green-500 mr-2"></i>Fast chargers & cables</li>
                <li className="flex items-center text-sm"><i className="fas fa-check text-green-500 mr-2"></i>Wireless earphones</li>
                <li className="flex items-center text-sm"><i className="fas fa-check text-green-500 mr-2"></i>Screen protectors</li>
              </ul>
              <button className="w-full bg-brand-accent text-brand-dark py-3 rounded-lg hover:bg-yellow-500 transition-colors">
                Shop Now
              </button>
            </div>

            {/* Tech Consultation */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-brand-secondary text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <i className="fas fa-user-tie text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-4">Tech Consultation</h3>
              <p className="text-gray-600 mb-6">Personal tech advice, phone recommendations, and honest reviews to help you make the right choice.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm"><i className="fas fa-check text-green-500 mr-2"></i>Phone buying guide</li>
                <li className="flex items-center text-sm"><i className="fas fa-check text-green-500 mr-2"></i>Performance optimization</li>
                <li className="flex items-center text-sm"><i className="fas fa-check text-green-500 mr-2"></i>Software troubleshooting</li>
                <li className="flex items-center text-sm"><i className="fas fa-check text-green-500 mr-2"></i>Data recovery</li>
              </ul>
              <button className="w-full bg-brand-secondary text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
                Consult Now
              </button>
            </div>
          </div>

          {/* Service Features */}
          <div className="mt-16 bg-brand-primary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold text-center mb-8">Why Our Services Stand Out</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <i className="fas fa-medal text-3xl text-brand-accent mb-4"></i>
                <h4 className="font-semibold mb-2">Quality Guaranteed</h4>
                <p className="text-blue-100 text-sm">Only genuine parts with warranty</p>
              </div>
              <div>
                <i className="fas fa-clock text-3xl text-brand-accent mb-4"></i>
                <h4 className="font-semibold mb-2">Quick Service</h4>
                <p className="text-blue-100 text-sm">Most repairs done same day</p>
              </div>
              <div>
                <i className="fas fa-shield-alt text-3xl text-brand-accent mb-4"></i>
                <h4 className="font-semibold mb-2">Warranty Protected</h4>
                <p className="text-blue-100 text-sm">Up to 6 months warranty</p>
              </div>
              <div>
                <i className="fas fa-rupee-sign text-3xl text-brand-accent mb-4"></i>
                <h4 className="font-semibold mb-2">Fair Pricing</h4>
                <p className="text-blue-100 text-sm">Transparent, competitive rates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section id="social" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">Follow My Social Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest mobile tech trends, honest reviews, and behind-the-scenes content. 
              Join our growing community!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Instagram */}
            <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-1 rounded-2xl">
              <div className="bg-white p-8 rounded-2xl h-full">
                <div className="text-center">
                  <i className="fab fa-instagram text-5xl text-pink-500 mb-6"></i>
                  <h3 className="text-xl font-bold text-brand-dark mb-4">Instagram</h3>
                  <p className="text-gray-600 mb-6">Daily tech content, mobile reviews, and quick tips. Stories that educate and entertain!</p>
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-pink-500">20K+</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <a href="https://instagram.com/hosurbava" target="_blank" className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors inline-flex items-center">
                    <i className="fab fa-instagram mr-2"></i>
                    Follow @hosurbava
                  </a>
                </div>
              </div>
            </div>

            {/* YouTube */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-1 rounded-2xl">
              <div className="bg-white p-8 rounded-2xl h-full">
                <div className="text-center">
                  <i className="fab fa-youtube text-5xl text-red-500 mb-6"></i>
                  <h3 className="text-xl font-bold text-brand-dark mb-4">YouTube</h3>
                  <p className="text-gray-600 mb-6">In-depth mobile reviews, repair tutorials, and tech comparisons. Subscribe for detailed content!</p>
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-red-500">20K+</div>
                    <div className="text-sm text-gray-600">Subscribers</div>
                  </div>
                  <a href="https://youtube.com/@hosurbava" target="_blank" className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors inline-flex items-center">
                    <i className="fab fa-youtube mr-2"></i>
                    Subscribe Now
                  </a>
                </div>
              </div>
            </div>

            {/* Facebook */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-1 rounded-2xl">
              <div className="bg-white p-8 rounded-2xl h-full">
                <div className="text-center">
                  <i className="fab fa-facebook text-5xl text-blue-600 mb-6"></i>
                  <h3 className="text-xl font-bold text-brand-dark mb-4">Facebook</h3>
                  <p className="text-gray-600 mb-6">Community discussions, live sessions, and exclusive offers. Join the conversation!</p>
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-blue-600">20K+</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <a href="https://facebook.com/hosurbava" target="_blank" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center">
                    <i className="fab fa-facebook mr-2"></i>
                    Follow Page
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Content */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-brand-dark text-center mb-8">Latest Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl overflow-hidden">
                <img src="/static/video1.svg" alt="Latest Video" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h4 className="font-semibold text-brand-dark mb-2">iPhone 15 vs Samsung Galaxy S24</h4>
                  <p className="text-gray-600 text-sm mb-3">Complete comparison with real-world usage...</p>
                  <span className="text-brand-primary text-sm">2 days ago • 50K views</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl overflow-hidden">
                <img src="/static/video2.svg" alt="Latest Video" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h4 className="font-semibold text-brand-dark mb-2">Best Budget Phones Under ₹20,000</h4>
                  <p className="text-gray-600 text-sm mb-3">My top 5 picks with honest reviews...</p>
                  <span className="text-brand-primary text-sm">1 week ago • 75K views</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl overflow-hidden">
                <img src="/static/video3.svg" alt="Latest Video" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h4 className="font-semibold text-brand-dark mb-2">DIY Phone Repair Tips</h4>
                  <p className="text-gray-600 text-sm mb-3">Easy fixes you can do at home...</p>
                  <span className="text-brand-primary text-sm">2 weeks ago • 30K views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Need mobile repair, consultation, or just want to collaborate? 
              I'm here to help! Reach out through any channel below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-brand-primary p-3 rounded-full mr-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Mobile Shop HosurBava</h4>
                    <p className="text-gray-300">Opp to Mayura Bekari, Shoolagiri to Berikai Road, Athimugam, Tamil Nadu</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-brand-accent p-3 rounded-full mr-4">
                    <i className="fas fa-phone text-brand-dark"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Call / WhatsApp</h4>
                    <p className="text-gray-300">+91 93423 34005</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-brand-secondary p-3 rounded-full mr-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-gray-300">info@hosurbava.com</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-8 p-6 bg-brand-primary rounded-xl">
                <h4 className="font-bold mb-4">Business Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Saturday</span>
                    <span>9:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h4 className="font-bold mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <a href="https://instagram.com/hosurbava" className="bg-pink-500 p-3 rounded-full hover:bg-pink-600 transition-colors">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://youtube.com/@hosurbava" className="bg-red-500 p-3 rounded-full hover:bg-red-600 transition-colors">
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a href="https://facebook.com/hosurbava" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-colors">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="https://wa.me/919342334005" className="bg-green-500 p-3 rounded-full hover:bg-green-600 transition-colors">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white text-brand-dark p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Send Message</h3>
                
                <form id="contact-form" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>
                  
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                  
                  <select
                    name="service"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  >
                    <option value="">Select Service</option>
                    <option value="mobile-repair">Mobile Repair</option>
                    <option value="accessories">Mobile Accessories</option>
                    <option value="consultation">Tech Consultation</option>
                    <option value="collaboration">Business Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                  
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Your Message"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  ></textarea>
                  
                  <button
                    type="submit"
                    className="w-full bg-brand-primary text-white py-3 rounded-lg hover:bg-brand-secondary transition-colors font-semibold"
                  >
                    <i className="fas fa-paper-plane mr-2"></i>
                    Send Message
                  </button>
                </form>
                
                <div id="form-message" className="mt-4 hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <img className="h-10 w-auto mr-3 logo-glow" src="/static/logo.svg" alt="HosurBava" />
                <div>
                  <h3 className="text-xl font-bold text-white">HosurBava</h3>
                  <p className="text-sm text-gray-400">Mobile Expert & Influencer</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Your trusted mobile expert in Hosur. Providing premium services, authentic reviews, 
                and building a community of tech enthusiasts.
              </p>
              <div className="flex space-x-4">
                <a href="https://instagram.com/hosurbava" className="text-gray-400 hover:text-pink-500">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="https://youtube.com/@hosurbava" className="text-gray-400 hover:text-red-500">
                  <i className="fab fa-youtube text-xl"></i>
                </a>
                <a href="https://facebook.com/hosurbava" className="text-gray-400 hover:text-blue-500">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="https://wa.me/919342334005" className="text-gray-400 hover:text-green-500">
                  <i className="fab fa-whatsapp text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-brand-accent">Mobile Repair</a></li>
                <li><a href="#services" className="hover:text-brand-accent">Accessories</a></li>
                <li><a href="#services" className="hover:text-brand-accent">Tech Consultation</a></li>
                <li><a href="#services" className="hover:text-brand-accent">Reviews & Guides</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-brand-accent">About</a></li>
                <li><a href="#social" className="hover:text-brand-accent">Social Media</a></li>
                <li><a href="#contact" className="hover:text-brand-accent">Contact</a></li>
                <li><a href="#" className="hover:text-brand-accent">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 HosurBava. All rights reserved. | Designed with ❤️ for the mobile community
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}