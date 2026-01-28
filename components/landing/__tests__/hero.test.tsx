import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '../hero'

describe('Hero Component', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Governed AI systems for businesses that can\'t afford guesswork'
    )
  })

  it('renders the subheading', () => {
    render(<Hero />)
    expect(screen.getByText(/We design and install auditable AI workflows/)).toBeInTheDocument()
  })

  it('renders primary CTA button', () => {
    render(<Hero />)
    const ctaButton = screen.getByRole('link', { name: 'Book a Strategy Call' })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveAttribute('href', '#contact')
  })

  it('renders secondary CTA button', () => {
    render(<Hero />)
    const secondaryButton = screen.getByRole('link', { name: 'See How It Works' })
    expect(secondaryButton).toBeInTheDocument()
    expect(secondaryButton).toHaveAttribute('href', '#process')
  })

  it('has correct accessibility attributes', () => {
    const { container } = render(<Hero />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })
})
