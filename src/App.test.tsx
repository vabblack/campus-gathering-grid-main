import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

describe('App', () => {
  it('renders the main element', () => {
    render(<App />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})