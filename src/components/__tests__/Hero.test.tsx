import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../../test/test-utils'
import Hero from '../Hero'


// Mock scrollIntoView
const mockScrollIntoView = vi.fn()
Element.prototype.scrollIntoView = mockScrollIntoView

describe('Hero Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the main heading', () => {
    render(<Hero />)
    expect(screen.getByText(/Hello, I'm/)).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<Hero />)
    expect(screen.getByText(/Full-stack developer passionate about creating beautiful/)).toBeInTheDocument()
    expect(screen.getByText(/functional web experiences with modern technologies/)).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: 'View Projects' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Download CV' })).toBeInTheDocument()
  })

  it('renders technology badges', () => {
    render(<Hero />)
    expect(screen.getByText('HTML')).toBeInTheDocument()
    expect(screen.getByText('CSS')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('scrolls to projects section when "View Projects" is clicked', () => {
    // Mock getElementById
    const mockElement = { scrollIntoView: mockScrollIntoView }
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as unknown as HTMLElement)

    render(<Hero />)
    const viewProjectsButton = screen.getByRole('button', { name: 'View Projects' })
    
    fireEvent.click(viewProjectsButton)
    
    expect(document.getElementById).toHaveBeenCalledWith('projects')
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('downloads CV when "Download CV" is clicked', () => {
    const { container } = render(<Hero />)
    const downloadButton = screen.getByRole('button', { name: 'Download CV' })
    
    expect(downloadButton).toBeInTheDocument()
    expect(container).toContainElement(downloadButton)
  })

  it('scrolls to about section when scroll indicator is clicked', () => {
    const { container } = render(<Hero />)
    // Find all buttons and get the last one (scroll indicator)
    const buttons = screen.getAllByRole('button')
    const scrollIndicator = buttons[buttons.length - 1]
    
    expect(scrollIndicator).toBeInTheDocument()
    expect(container).toContainElement(scrollIndicator)
  })

  it('has proper semantic structure', () => {
    const { container } = render(<Hero />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(container).toContainElement(heading)
  })
})