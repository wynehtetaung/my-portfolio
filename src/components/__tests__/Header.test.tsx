import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '../../test/test-utils'
import Header from '../Header'


describe('Header Component', () => {
  it('renders the portfolio title', () => {
    render(<Header />)
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
  })

  it('renders all navigation items on desktop', () => {
    render(<Header />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('shows mobile menu button on small screens', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button')
    expect(menuButton).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button')
    
    // Click to open menu
    fireEvent.click(menuButton)
    
    // Menu should be open - check for navigation items in mobile menu
    expect(screen.getAllByText('Home')).toHaveLength(2) // One in desktop nav, one in mobile menu
  })

  it('closes mobile menu when a navigation item is clicked', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button')
    
    // Open menu
    fireEvent.click(menuButton)
    
    // Click on a navigation item in mobile menu
    const mobileNavItems = screen.getAllByText('Home')
    fireEvent.click(mobileNavItems[1]) // Click the mobile menu item
    
    // Menu should close - only desktop nav item should remain
    expect(screen.getAllByText('Home')).toHaveLength(1)
  })

  it('has proper accessibility attributes', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('has correct navigation links', () => {
    render(<Header />)
    
    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveAttribute('href', '#home')
    
    const aboutLink = screen.getByRole('link', { name: 'About' })
    expect(aboutLink).toHaveAttribute('href', '#about')
    
    const skillsLink = screen.getByRole('link', { name: 'Skills' })
    expect(skillsLink).toHaveAttribute('href', '#skills')
    
    const projectsLink = screen.getByRole('link', { name: 'Projects' })
    expect(projectsLink).toHaveAttribute('href', '#projects')
    
    const contactLink = screen.getByRole('link', { name: 'Contact' })
    expect(contactLink).toHaveAttribute('href', '#contact')
  })
})