import Sandbox from "../Sandbox";

import {it, describe, expect} from "vitest"

import {screen,render} from "@testing-library/react"

import userEvent from "@testing-library/user-event";

import { getFormElements } from "../__tests__/Form.test";

const mockData = [
  { email: "test@example.com", rating: '4', text: "Great Product!"},
  { email: "user@example.com", rating: '5', text: "Excellent Service"}
]

describe("Testing Sandbox component",()=>{
    it("should render app title",()=>{
        render(<Sandbox/>)
        expect(screen.getByRole("heading",{name: "Reviews App"})).toBeInTheDocument()
    })
    it("add a new review when form is submitted",async()=>{
        const user = userEvent.setup()
        render(<Sandbox/>)
        const {emailEle, dropDownEle, textAreaEle, buttonEle} = getFormElements()
        await user.type(emailEle,"test@example.com")
        await user.selectOptions(dropDownEle,'5');
        await user.type(textAreaEle,"short short short !!!!!")
        await user.click(buttonEle)

        expect(screen.getByText("test@example.com")).toBeInTheDocument()
        expect(screen.getByText("short short short !!!!!")).toBeInTheDocument()
        const stars = '⭐'.repeat(5)
        expect(screen.getByText(stars)).toBeInTheDocument()
    })
    it("add a new review when form is submitted - alternative",async()=>{
        const user = userEvent.setup()
        render(<Sandbox/>)
        expect(screen.queryByRole("article")).not.toBeInTheDocument()
        const {emailEle, dropDownEle, textAreaEle, buttonEle} = getFormElements()
        await user.type(emailEle,"test@example.com")
        await user.selectOptions(dropDownEle,'5');
        await user.type(textAreaEle,"short short short !!!!!")
        await user.click(buttonEle)

        expect(screen.getAllByRole("article")).toHaveLength(1)
    })
})