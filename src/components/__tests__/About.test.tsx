import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/test-utils'
import About from '../About'


// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Code: () => <div data-testid="code-icon">Code</div>,
  Database: () => <div data-testid="database-icon">Database</div>,
  Globe: () => <div data-testid="globe-icon">Globe</div>,
  Smartphone: () => <div data-testid="smartphone-icon">Smartphone</div>,
}))

describe('About Component', () => {
  it('renders the section heading', () => {
    render(<About />)
    expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<About />)
    expect(screen.getByText(/I'm a passionate developer with expertise in modern web technologies/)).toBeInTheDocument()
    expect(screen.getByText(/I love creating innovative solutions and bringing ideas to life through code/)).toBeInTheDocument()
  })

  it('renders all skill cards', () => {
    render(<About />)
    
    expect(screen.getByText('Frontend Development')).toBeInTheDocument()
    expect(screen.getByText('Backend Development')).toBeInTheDocument()
    expect(screen.getByText('Web Technologies')).toBeInTheDocument()
    expect(screen.getByText('Mobile Development')).toBeInTheDocument()
  })

  it('renders skill descriptions', () => {
    render(<About />)
    
    expect(screen.getByText('React, TypeScript, Tailwind CSS')).toBeInTheDocument()
    expect(screen.getByText('Node.js, Python, PostgreSQL')).toBeInTheDocument()
    expect(screen.getByText('HTML5, CSS3, JavaScript ES6+')).toBeInTheDocument()
    expect(screen.getByText('React Native, Flutter')).toBeInTheDocument()
  })

  it('renders skill icons', () => {
    render(<About />)
    
    expect(screen.getByTestId('code-icon')).toBeInTheDocument()
    expect(screen.getByTestId('database-icon')).toBeInTheDocument()
    expect(screen.getByTestId('globe-icon')).toBeInTheDocument()
    expect(screen.getByTestId('smartphone-icon')).toBeInTheDocument()
  })

  it('renders the journey section', () => {
    render(<About />)
    
    expect(screen.getByRole('heading', { name: 'My Journey' })).toBeInTheDocument()
    expect(screen.getByText(/With over 3 years of experience in web development/)).toBeInTheDocument()
    expect(screen.getByText(/I've worked on diverse projects ranging from small business websites to large-scale applications/)).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(<About />)
    
    const section = screen.getByText('About Me').closest('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('id', 'about')
    
    const mainHeading = screen.getByRole('heading', { name: 'About Me' })
    expect(mainHeading.tagName).toBe('H2')
    
    const journeyHeading = screen.getByRole('heading', { name: 'My Journey' })
    expect(journeyHeading.tagName).toBe('H3')
  })

  it('renders with proper responsive classes', () => {
    render(<About />)
    
    const section = screen.getByText('About Me').closest('section')
    expect(section).toHaveClass('min-h-screen', 'py-16', 'sm:py-20', 'relative')
  })

  it('contains grid layout for skills', () => {
    render(<About />)
    
    // Find the skills grid container by looking for the container with grid classes
    const aboutSection = screen.getByText('About Me').closest('section')
    const gridContainer = aboutSection?.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4')
    expect(gridContainer).toBeInTheDocument()
  })
})