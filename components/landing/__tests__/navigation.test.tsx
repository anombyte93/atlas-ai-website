import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Navigation } from '../navigation'

describe('Navigation Component', () => {
  beforeEach(() => {
    // Mock window.matchMedia for responsive tests
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  it('renders Atlas AI logo', () => {
    render(<Navigation />)
    const logo = screen.getByAltText('Atlas AI')
    expect(logo).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Navigation />)
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Governance' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Case Studies' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Process' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('renders Get Started button', () => {
    render(<Navigation />)
    const getStartedButton = screen.getByRole('link', { name: 'Get Started' })
    expect(getStartedButton).toBeInTheDocument()
    expect(getStartedButton).toHaveAttribute('href', '#contact')
  })

  it('toggles mobile menu when hamburger button is clicked', async () => {
    render(<Navigation />)

    // Find hamburger menu button
    const menuButton = screen.getByRole('button', { name: /toggle navigation/i })
    expect(menuButton).toBeInTheDocument()

    // Initially mobile menu should not be visible
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()

    // Click to open
    fireEvent.click(menuButton)
    await waitFor(() => {
      expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument()
    })

    // Click to close
    fireEvent.click(menuButton)
    await waitFor(() => {
      expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()
    })
  })

  it('closes mobile menu when a link is clicked', async () => {
    render(<Navigation />)

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /toggle navigation/i })
    fireEvent.click(menuButton)

    await waitFor(() => {
      expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument()
    })

    // Click a link
    const servicesLink = screen.getAllByRole('link', { name: 'Services' })[1] // Mobile version
    fireEvent.click(servicesLink)

    await waitFor(() => {
      expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()
    })
  })

  it('has correct accessibility attributes', () => {
    const { container } = render(<Navigation />)
    const nav = container.querySelector('nav')
    expect(nav).toBeInTheDocument()
  })

  it('has aria-label on mobile menu toggle', () => {
    render(<Navigation />)
    const menuButton = screen.getByRole('button', { name: /toggle navigation/i })
    expect(menuButton).toHaveAttribute('aria-label')
  })
})
