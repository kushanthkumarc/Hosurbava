import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HosurBava - Mobile Expert & Social Media Influencer</title>
        <meta name="description" content="HosurBava - Your trusted mobile expert and social media influencer. Premium mobile services, latest tech reviews, and authentic mobile accessories in Hosur." />
        <meta name="keywords" content="HosurBava, mobile shop, mobile repair, social media influencer, mobile accessories, tech reviews, Hosur" />
        
        {/* Favicon */}
        <link rel="icon" href="/static/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/static/favicon.ico" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="HosurBava - Mobile Expert & Social Media Influencer" />
        <meta property="og:description" content="Your trusted mobile expert and social media influencer in Hosur. Premium mobile services and authentic reviews." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/static/og-image.svg" />
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Custom CSS */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Tailwind Config */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    'poppins': ['Poppins', 'sans-serif']
                  },
                  colors: {
                    'brand': {
                      primary: '#1e40af',
                      secondary: '#3b82f6',
                      accent: '#f59e0b',
                      dark: '#1e293b',
                      light: '#f8fafc'
                    }
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body className="font-poppins bg-gray-50 text-gray-800 overflow-x-hidden">
        {children}
        
        {/* JavaScript */}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/script.js"></script>
      </body>
    </html>
  )
})
