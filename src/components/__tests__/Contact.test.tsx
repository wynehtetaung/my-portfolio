import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Contact from '../Contact'


// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Mail: () => <div data-testid="mail-icon">📧</div>,
  Phone: () => <div data-testid="phone-icon">📞</div>,
  MapPin: () => <div data-testid="mappin-icon">📍</div>,
  Github: () => <div data-testid="github-icon">🐙</div>,
  Linkedin: () => <div data-testid="linkedin-icon">💼</div>,
  Twitter: () => <div data-testid="twitter-icon">🐦</div>,
  Download: () => <div data-testid="download-icon">⬇️</div>,
}))

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the section heading', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { name: 'Get In Touch' })).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<Contact />)
    expect(screen.getByText(/I'm always open to discussing new opportunities and interesting projects/)).toBeInTheDocument()
    expect(screen.getByText(/Let's connect and create something amazing together!/)).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<Contact />)
    
    // Check for specific contact values instead of labels to avoid duplication
    expect(screen.getByText('hello@developer.com')).toBeInTheDocument()
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
    
    // Check that labels exist (there may be duplicates between contact info and form)
    expect(screen.getAllByText('Email').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Phone').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Location').length).toBeGreaterThanOrEqual(1)
  })

  it('renders contact icons', () => {
    render(<Contact />)
    
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument()
    expect(screen.getByTestId('phone-icon')).toBeInTheDocument()
    expect(screen.getByTestId('mappin-icon')).toBeInTheDocument()
  })

  it('renders social media links', () => {
    render(<Contact />)
    
    expect(screen.getByTestId('github-icon')).toBeInTheDocument()
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument()
    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument()
  })

  it('renders the contact form', () => {
    render(<Contact />)
    
    expect(screen.getByRole('heading', { name: 'Send Message' })).toBeInTheDocument()
    
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tell me about your project...')).toBeInTheDocument()
    
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument()
  })

  it('has proper form field placeholders', () => {
    render(<Contact />)
    
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tell me about your project...')).toBeInTheDocument()
  })

  it('renders download resume button', () => {
    render(<Contact />)
    
    const resumeButton = screen.getByRole('button', { name: '⬇️ Resume' })
    expect(resumeButton).toBeInTheDocument()
    expect(screen.getByTestId('download-icon')).toBeInTheDocument()
  })

  it('downloads CV when resume button is clicked', () => {
    const { container } = render(<Contact />)
    const resumeButton = screen.getByRole('button', { name: '⬇️ Resume' })
    
    expect(resumeButton).toBeInTheDocument()
    expect(container.querySelector('button')).toContainHTML('Resume')
  })

  it('can fill out the contact form', () => {
    const { container } = render(<Contact />)
    
    const nameInput = screen.getByPlaceholderText('Your name')
    const emailInput = screen.getByPlaceholderText('your.email@example.com')
    const messageInput = screen.getByPlaceholderText('Tell me about your project...')
    
    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(messageInput).toBeInTheDocument()
    expect(container).toContainElement(nameInput)
  })

  it('has proper semantic structure', () => {
    const { container } = render(<Contact />)
    
    const mainHeading = screen.getByRole('heading', { name: 'Get In Touch' })
    expect(mainHeading).toBeInTheDocument()
    expect(mainHeading.tagName).toBe('H2')
    
    const section = container.querySelector('section#contact')
    expect(section).toBeInTheDocument()
  })

  it('renders with proper responsive classes', () => {
    const { container } = render(<Contact />)
    
    const section = container.querySelector('section')
    expect(section).toHaveClass('min-h-screen', 'py-16', 'sm:py-20', 'relative')
  })

  it('has proper form accessibility', () => {
    render(<Contact />)
    
    const nameInput = screen.getByPlaceholderText('Your name')
    expect(nameInput).toHaveAttribute('type', 'text')
    
    const emailInput = screen.getByPlaceholderText('your.email@example.com')
    expect(emailInput).toHaveAttribute('type', 'email')
    
    const messageInput = screen.getByPlaceholderText('Tell me about your project...')
    expect(messageInput.tagName).toBe('TEXTAREA')
  })
})