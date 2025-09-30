import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Skills from '../Skills'

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Code: () => <div data-testid="code-icon">Code</div>,
  Server: () => <div data-testid="server-icon">Server</div>,
  Database: () => <div data-testid="database-icon">Database</div>,
  Cloud: () => <div data-testid="cloud-icon">Cloud</div>,
  GitBranch: () => <div data-testid="gitbranch-icon">GitBranch</div>,
  Smartphone: () => <div data-testid="smartphone-icon">Smartphone</div>,
}))

describe('Skills Component', () => {
  it('renders the section heading', () => {
    render(<Skills />)
    expect(screen.getByRole('heading', { name: 'Skills & Expertise' })).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<Skills />)
    expect(screen.getByText(/A comprehensive overview of my technical skills/)).toBeInTheDocument()
  })

  it('renders all skill categories', () => {
    render(<Skills />)
    
    expect(screen.getByText('Frontend Development')).toBeInTheDocument()
    expect(screen.getByText('Backend Development')).toBeInTheDocument()
    expect(screen.getByText('Database & Storage')).toBeInTheDocument()
    expect(screen.getByText('DevOps & Cloud')).toBeInTheDocument()
    expect(screen.getByText('Tools & Workflow')).toBeInTheDocument()
    expect(screen.getByText('Mobile & Cross-Platform')).toBeInTheDocument()
  })

  it('renders skill items with proficiency levels', () => {
    render(<Skills />)
    
    // Frontend skills
    expect(screen.getByText('React/Next.js')).toBeInTheDocument()
    expect(screen.getAllByText('95%').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getAllByText('90%').length).toBeGreaterThanOrEqual(1)
    
    // Backend skills
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getAllByText('88%').length).toBeGreaterThanOrEqual(1)
    
    // Database skills
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
    expect(screen.getByText('MongoDB')).toBeInTheDocument()
  })

  it('renders category icons', () => {
    render(<Skills />)
    
    expect(screen.getByTestId('code-icon')).toBeInTheDocument()
    expect(screen.getByTestId('server-icon')).toBeInTheDocument()
    expect(screen.getByTestId('database-icon')).toBeInTheDocument()
    expect(screen.getByTestId('cloud-icon')).toBeInTheDocument()
    expect(screen.getByTestId('gitbranch-icon')).toBeInTheDocument()
    expect(screen.getByTestId('smartphone-icon')).toBeInTheDocument()
  })

  it('renders the experience summary section', () => {
    render(<Skills />)
    
    expect(screen.getByText('5+')).toBeInTheDocument()
    expect(screen.getByText('Years Experience')).toBeInTheDocument()
    expect(screen.getByText('50+')).toBeInTheDocument()
    expect(screen.getByText('Projects Completed')).toBeInTheDocument()
    expect(screen.getByText('30+')).toBeInTheDocument()
    expect(screen.getByText('Technologies Used')).toBeInTheDocument()
    expect(screen.getByText('24/7')).toBeInTheDocument()
    expect(screen.getByText('Learning Mode')).toBeInTheDocument()
  })

  it('renders progress bars for skills', () => {
    const { container } = render(<Skills />)
    
    // Check for progress bar containers
    const progressBars = container.querySelectorAll('.bg-slate-700')
    expect(progressBars.length).toBeGreaterThan(0)
    
    // Check for progress fill elements
    const progressFills = container.querySelectorAll('.bg-gradient-to-r.from-cyan-500.to-purple-500')
    expect(progressFills.length).toBeGreaterThan(0)
  })

  it('has proper semantic structure', () => {
    const { container } = render(<Skills />)
    
    const section = container.querySelector('section#skills')
    expect(section).toBeInTheDocument()
    
    const mainHeading = screen.getByRole('heading', { name: 'Skills & Expertise' })
    expect(mainHeading.tagName).toBe('H2')
    
    const categoryHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(categoryHeadings).toHaveLength(6)
  })

  it('renders with proper responsive classes', () => {
    const { container } = render(<Skills />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('min-h-screen', 'py-16', 'sm:py-20', 'relative')
    
    const grid = container.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2.xl\\:grid-cols-3')
    expect(grid).toBeInTheDocument()
  })

  it('contains skill categories with multiple skills', () => {
    render(<Skills />)
    
    // Check that each category has multiple skills
    expect(screen.getAllByText(/React/)).toHaveLength(2) // React in Frontend and React Native in Mobile
    expect(screen.getByText('HTML5/CSS3')).toBeInTheDocument()
    expect(screen.getByText('Express.js')).toBeInTheDocument()
    expect(screen.getByText('Redis')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
    expect(screen.getByText('Git/GitHub')).toBeInTheDocument()
    expect(screen.getByText('Flutter')).toBeInTheDocument()
  })

  it('displays skill proficiency percentages correctly', () => {
    render(<Skills />)
    
    // Test various proficiency levels
    expect(screen.getAllByText('98%').length).toBeGreaterThanOrEqual(1) // HTML5/CSS3 and VS Code
    expect(screen.getAllByText('92%').length).toBeGreaterThanOrEqual(1) // Tailwind CSS and REST APIs
    expect(screen.getAllByText('85%').length).toBeGreaterThanOrEqual(1) // Multiple skills
    expect(screen.getAllByText('75%').length).toBeGreaterThanOrEqual(1) // Multiple skills
  })
})