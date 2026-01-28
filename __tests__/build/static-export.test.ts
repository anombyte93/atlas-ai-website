import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { execSync } from 'child_process'
import { existsSync, readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const OUT_DIR = join(process.cwd(), 'out')

describe('Static Site Generation', () => {
  beforeAll(() => {
    // Clean and rebuild
    if (existsSync(OUT_DIR)) {
      execSync(`rm -rf ${OUT_DIR}`)
    }
    execSync('npm run build', { stdio: 'inherit' })
  }, 120000)

  afterAll(() => {
    // Keep the out directory for inspection
  })

  it('generates out directory', () => {
    expect(existsSync(OUT_DIR)).toBe(true)
  })

  it('generates index.html', () => {
    const indexPath = join(OUT_DIR, 'index.html')
    expect(existsSync(indexPath)).toBe(true)

    const content = readFileSync(indexPath, 'utf-8')
    expect(content).toContain('Atlas AI')
    expect(content).toContain('Governed AI systems')
  })

  it('generates 404.html for static hosting', () => {
    const notFoundPath = join(OUT_DIR, '404.html')
    expect(existsSync(notFoundPath)).toBe(true)
  })

  it('includes critical CSS in HTML', () => {
    const indexPath = join(OUT_DIR, 'index.html')
    const content = readFileSync(indexPath, 'utf-8')
    // Next.js uses link tags for CSS in static export
    expect(content).toMatch(/<link[^>]*stylesheet[^>]*>/)
  })

  it('generates static assets', () => {
    const files = readdirSync(OUT_DIR)
    expect(files.some(f => f.endsWith('.html'))).toBe(true)
  })

  it('has no Next.js server dependencies in output', () => {
    const indexPath = join(OUT_DIR, 'index.html')
    const content = readFileSync(indexPath, 'utf-8')
    // Should not contain server-side markers
    expect(content).not.toContain('__NEXT_DATA__')
  })

  it('includes metadata in head', () => {
    const indexPath = join(OUT_DIR, 'index.html')
    const content = readFileSync(indexPath, 'utf-8')
    expect(content).toMatch(/<meta[^>]*name="description"/)
    expect(content).toMatch(/<title>/)
  })

  it('has proper charset and viewport', () => {
    const indexPath = join(OUT_DIR, 'index.html')
    const content = readFileSync(indexPath, 'utf-8')
    // Next.js uses charSet (camelCase) in React
    expect(content).toMatch(/charSet|charset/i)
    expect(content).toContain('viewport')
  })

  it('generates build with correct structure', () => {
    const files = readdirSync(OUT_DIR)
    // Should have at minimum index.html and 404.html
    expect(files).toContain('index.html')
    expect(files).toContain('404.html')
  })
})
