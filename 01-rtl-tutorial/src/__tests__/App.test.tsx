import {render,screen} from "@testing-library/react"

import {it,describe,expect} from "vitest"

import App from "../App"

describe("Tests on App component",()=>{
  beforeEach(()=>{
    render(<App/>)
    screen.debug()
  })

  it("should contain a heading",()=>{
    const heading = screen.getByRole("heading")
    expect(heading).toBeInTheDocument()
  })

  it("should contain a heading with expected text",()=>{
    const heading = screen.getByRole("heading")
    expect(heading).toHaveTextContent("React Testing Library")
  })

  it("should contain a paragraph",()=>{
    const paragraph = screen.getByRole("paragraph")
    expect(paragraph).toBeInTheDocument()
  })

  it("should contain a paragraph with expected text",()=>{
    const paragraph = screen.getByRole("paragraph")
    expect(paragraph).toHaveTextContent("React Testing Library and Vitest work together to provide a robust testing environment.")
  })

})