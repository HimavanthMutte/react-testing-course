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

  it("should contain heading with expected text",()=>{
    const heading = screen.getByRole("heading")
    expect(heading).toHaveTextContent("React Testing Library")
  })



})