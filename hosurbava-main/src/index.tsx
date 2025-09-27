import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { HomePage } from './components/HomePage'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Use JSX renderer
app.use(renderer)

// Home page
app.get('/', (c) => {
  return c.render(<HomePage />)
})

// API Routes for contact form
app.post('/api/contact', async (c) => {
  try {
    const { name, email, phone, message, service } = await c.req.json()
    
    // Here you would typically send email or save to database
    // For now, we'll just return a success response
    console.log('Contact form submission:', { name, email, phone, message, service })
    
    return c.json({ 
      success: true, 
      message: 'Thank you for your message! HosurBava will get back to you soon.' 
    })
  } catch (error) {
    return c.json({ 
      success: false, 
      message: 'Sorry, there was an error sending your message. Please try again.' 
    }, 500)
  }
})

// API route for mobile service inquiry
app.post('/api/service-inquiry', async (c) => {
  try {
    const { name, phone, device, issue, urgency } = await c.req.json()
    
    console.log('Service inquiry:', { name, phone, device, issue, urgency })
    
    return c.json({ 
      success: true, 
      message: 'Service request received! HosurBava will contact you within 24 hours.' 
    })
  } catch (error) {
    return c.json({ 
      success: false, 
      message: 'Sorry, there was an error processing your request. Please try again.' 
    }, 500)
  }
})

export default app
