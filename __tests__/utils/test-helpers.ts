import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

/**
 * Custom render function that includes any global providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  // Add any providers here (e.g., ThemeProvider, Router)
  return render(ui, options)
}

/**
 * Mock window.matchMedia for responsive tests
 */
export function mockMatchMedia(matches: boolean = false) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

/**
 * Mock IntersectionObserver for lazy loading tests
 */
export function mockIntersectionObserver() {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = null
    readonly rootMargin: string = ''
    readonly thresholds: ReadonlyArray<number> = []

    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords(): IntersectionObserverEntry[] { return [] }
    unobserve() {}
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })
}

/**
 * Wait for async updates to complete
 */
export async function waitForAsync() {
  return new Promise(resolve => setTimeout(resolve, 0))
}

/**
 * Mock next/router
 */
export function mockNextRouter() {
  vi.mock('next/router', () => ({
    useRouter() {
      return {
        route: '/',
        pathname: '/',
        query: {},
        asPath: '/',
        push: vi.fn(),
        pop: vi.fn(),
        reload: vi.fn(),
        back: vi.fn(),
        prefetch: vi.fn().mockResolvedValue(undefined),
        beforePopState: vi.fn(),
        events: {
          on: vi.fn(),
          off: vi.fn(),
          emit: vi.fn(),
        },
      }
    },
  }))
}

/**
 * Mock next/navigation
 */
export function mockNextNavigation() {
  vi.mock('next/navigation', () => ({
    useRouter() {
      return {
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
        pathname: '/',
        query: {},
        asPath: '/',
      }
    },
    usePathname() {
      return '/'
    },
    useSearchParams() {
      return new URLSearchParams()
    },
  }))
}
