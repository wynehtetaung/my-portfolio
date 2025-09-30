import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../test/test-utils'
import App from '../App'

// Mock all child components to avoid complex animations and Three.js issues
vi.mock('../components/ThreeBackground', () => ({
  default: () => <div data-testid="three-background">Three Background</div>
}))

vi.mock('../components/Header', () => ({
  default: () => <header data-testid="header">Header</header>
}))

vi.mock('../components/Hero', () => ({
  default: () => <section data-testid="hero">Hero Section</section>
}))

vi.mock('../components/About', () => ({
  default: () => <section data-testid="about">About Section</section>
}))

vi.mock('../components/Skills', () => ({
  default: () => <section data-testid="skills">Skills Section</section>
}))

vi.mock('../components/Projects', () => ({
  default: () => <section data-testid="projects">Projects Section</section>
}))

vi.mock('../components/Contact', () => ({
  default: () => <section data-testid="contact">Contact Section</section>
}))

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('renders all main sections', () => {
    render(<App />)
    
    expect(screen.getByTestId('three-background')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getByTestId('about')).toBeInTheDocument()
    expect(screen.getByTestId('skills')).toBeInTheDocument()
    expect(screen.getByTestId('projects')).toBeInTheDocument()
    expect(screen.getByTestId('contact')).toBeInTheDocument()
  })

  it('renders the footer', () => {
    render(<App />)
    
    expect(screen.getByText(/© 2024 Developer Portfolio/)).toBeInTheDocument()
    expect(screen.getByText(/Built with React, Three.js & Tailwind CSS/)).toBeInTheDocument()
  })

  it('has proper page structure', () => {
    render(<App />)
    
    const mainElement = screen.getByRole('main')
    expect(mainElement).toBeInTheDocument()
    
    const footerElement = screen.getByRole('contentinfo') || screen.getByText(/© 2024 Developer Portfolio/).closest('footer')
    expect(footerElement).toBeInTheDocument()
  })

  it('has proper CSS classes for styling', () => {
    const { container } = render(<App />)
    
    const appDiv = container.firstChild as HTMLElement
    expect(appDiv).toHaveClass('min-h-screen', 'bg-slate-900', 'text-white', 'overflow-x-hidden')
  })

  it('renders sections in correct order', () => {
    render(<App />)
    
    const sections = [
      screen.getByTestId('hero'),
      screen.getByTestId('about'),
      screen.getByTestId('skills'),
      screen.getByTestId('projects'),
      screen.getByTestId('contact')
    ]
    
    // Check that sections appear in the correct order in the DOM
    sections.forEach((section, index) => {
      if (index > 0) {
        expect(section.compareDocumentPosition(sections[index - 1])).toBe(Node.DOCUMENT_POSITION_PRECEDING)
      }
    })
  })

  it('includes Three.js background component', () => {
    render(<App />)
    expect(screen.getByTestId('three-background')).toBeInTheDocument()
  })

  it('maintains proper z-index layering', () => {
    render(<App />)
    
    const footer = screen.getByText(/© 2024 Developer Portfolio/).closest('footer')
    expect(footer).toHaveClass('relative', 'z-10')
  })
})