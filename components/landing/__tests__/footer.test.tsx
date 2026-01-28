import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '../footer'

describe('Footer Component', () => {
  it('renders Atlas AI branding', () => {
    render(<Footer />)
    expect(screen.getByRole('heading', { name: 'Atlas AI' })).toBeInTheDocument()
  })

  it('renders company description', () => {
    render(<Footer />)
    expect(screen.getByText(/Governed AI systems for businesses/)).toBeInTheDocument()
  })

  it('renders quick links section', () => {
    render(<Footer />)
    expect(screen.getByRole('heading', { name: 'Quick Links' })).toBeInTheDocument()

    // Check all quick links are present
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Governance' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Case Studies' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Our Process' })).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<Footer />)
    expect(screen.getByRole('heading', { name: 'Get in Touch' })).toBeInTheDocument()

    const emailLink = screen.getByRole('link', { name: 'contact@atlas-ai.au' })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@atlas-ai.au')

    const phoneLink = screen.getByRole('link', { name: '+61 494 010 006' })
    expect(phoneLink).toBeInTheDocument()
    expect(phoneLink).toHaveAttribute('href', 'tel:+61494010006')
  })

  it('renders copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2025 Atlas AI/)).toBeInTheDocument()
    expect(screen.getByText(/Built in Australia/)).toBeInTheDocument()
  })

  it('has correct semantic structure', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })
})
