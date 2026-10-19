import List from "../List";

import {it, describe, expect} from "vitest"

import {screen,render} from "@testing-library/react"

const mockData = [
  { email: "test@example.com", rating: '4', text: "Great Product!"},
  { email: "user@example.com", rating: '5', text: "Excellent Service"}
]

describe("Testing List Component",()=>{
  it("Should contain a heading",()=>{
    render(<List reviews={[]}/>)
    expect(screen.getByRole("heading",{level: 2, name: /Review/i})).toBeInTheDocument()
  })

  it("Should renders reviews correctly when provided",()=>{
    render(<List reviews={mockData}/>)
    mockData.map(review=>{
      expect(screen.getByText(review.email)).toBeInTheDocument()
      expect(screen.getByText(review.text)).toBeInTheDocument()
      const stars = '⭐'.repeat(+review.rating)
      expect(screen.getByText(stars)).toBeInTheDocument()
    })
  })

  it("Should display - No reviews yet when reviews array is empty",()=>{
    render(<List reviews={[]}/>)
    expect(screen.getByText("No reviews yet")).toBeInTheDocument()
  })

})