import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/test-utils'
import Projects from '../Projects'


// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ExternalLink: () => <div data-testid="external-link-icon">External Link</div>,
  Github: () => <div data-testid="github-icon">Github</div>,
}))

describe('Projects Component', () => {
  it('renders the section heading', () => {
    render(<Projects />)
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<Projects />)
    expect(screen.getByText(/Here are some of my recent projects that showcase my skills and passion for development/)).toBeInTheDocument()
  })

  it('renders all project cards', () => {
    render(<Projects />)
    
    expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument()
    expect(screen.getByText('Task Management App')).toBeInTheDocument()
    expect(screen.getByText('Weather Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Portfolio Website')).toBeInTheDocument()
  })

  it('renders project descriptions', () => {
    render(<Projects />)
    
    expect(screen.getByText(/Full-stack e-commerce solution with React, Node.js, and Stripe integration/)).toBeInTheDocument()
    expect(screen.getByText(/Collaborative task management with real-time updates and team features/)).toBeInTheDocument()
    expect(screen.getByText(/Beautiful weather app with forecasts and interactive maps/)).toBeInTheDocument()
    expect(screen.getByText(/Interactive portfolio with Three.js animations and modern design/)).toBeInTheDocument()
  })

  it('renders technology tags for each project', () => {
    render(<Projects />)
    
    // E-Commerce Platform tags
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Node.js').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('MongoDB')).toBeInTheDocument()
    expect(screen.getByText('Stripe')).toBeInTheDocument()
    
    // Task Management App tags
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Socket.io')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
    
    // Weather Dashboard tags
    expect(screen.getByText('Vue.js')).toBeInTheDocument()
    expect(screen.getByText('Weather API')).toBeInTheDocument()
    expect(screen.getByText('Chart.js')).toBeInTheDocument()
    expect(screen.getAllByText('Tailwind').length).toBeGreaterThanOrEqual(1)
    
    // Portfolio Website tags
    expect(screen.getByText('Three.js')).toBeInTheDocument()
    expect(screen.getByText('Framer Motion')).toBeInTheDocument()
  })

  it('renders project images with proper alt text', () => {
    render(<Projects />)
    
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(4)
    
    expect(screen.getByAltText('E-Commerce Platform')).toBeInTheDocument()
    expect(screen.getByAltText('Task Management App')).toBeInTheDocument()
    expect(screen.getByAltText('Weather Dashboard')).toBeInTheDocument()
    expect(screen.getByAltText('Portfolio Website')).toBeInTheDocument()
  })

  it('renders GitHub and live demo links for each project', () => {
    render(<Projects />)
    
    const codeLinks = screen.getAllByText('Code')
    const liveLinks = screen.getAllByText('Live Demo')
    
    expect(codeLinks).toHaveLength(4)
    expect(liveLinks).toHaveLength(4)
    
    // Check that links have proper href attributes
    codeLinks.forEach(link => {
      expect(link.closest('a')).toHaveAttribute('href', '#')
    })
    
    liveLinks.forEach(link => {
      expect(link.closest('a')).toHaveAttribute('href', '#')
    })
  })

  it('renders proper icons for links', () => {
    render(<Projects />)
    
    const githubIcons = screen.getAllByTestId('github-icon')
    const externalLinkIcons = screen.getAllByTestId('external-link-icon')
    
    expect(githubIcons).toHaveLength(4)
    expect(externalLinkIcons).toHaveLength(4)
  })

  it('has proper semantic structure', () => {
    render(<Projects />)
    
    const section = screen.getByText('Projects').closest('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('id', 'projects')
    
    const mainHeading = screen.getByRole('heading', { name: 'Projects' })
    expect(mainHeading.tagName).toBe('H2')
    
    const projectHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(projectHeadings).toHaveLength(4)
  })

  it('renders with proper responsive classes', () => {
    render(<Projects />)
    
    const section = screen.getByText('Projects').closest('section')
    expect(section).toHaveClass('min-h-screen', 'py-16', 'sm:py-20', 'relative')
  })

  it('contains grid layout for projects', () => {
    render(<Projects />)
    
    // Find the projects grid container by looking for the container with grid classes
    const projectsSection = screen.getByText('Projects').closest('section')
    const gridContainer = projectsSection?.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2')
    expect(gridContainer).toBeInTheDocument()
  })
})