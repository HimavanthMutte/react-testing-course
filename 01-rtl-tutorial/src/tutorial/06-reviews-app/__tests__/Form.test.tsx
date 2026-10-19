import Form from "../Form"

import {it,describe,expect} from "vitest"

import {screen,render} from "@testing-library/react"

import userEvent from "@testing-library/user-event"

const fakeSubmit = vi.fn()

const getFormElemets = () =>({
    emailEle: screen.getByRole("textbox",{name: "Email"}),
    dropDownEle: screen.getByRole("combobox",{name: "Rating"}),
    textAreaEle: screen.getByRole("textbox",{name: "Your Review"}),
    buttonEle: screen.getByRole("button",{name: "Submit Review"})
})

describe("Form Testing",()=>{
    it("renders form elements correctly",()=>{
        render(<Form onSubmit={fakeSubmit}/>)
        const {emailEle, dropDownEle, textAreaEle, buttonEle} = getFormElemets()

        expect(emailEle).toHaveValue("")
        expect(dropDownEle).toHaveValue("")
        expect(textAreaEle).toHaveValue("")
        expect(buttonEle).toHaveValue("")
        expect(fakeSubmit).not.toHaveBeenCalled()
    })

    it("Should display - Review must be at least 10 characters long - when short",async()=>{
        const user = userEvent.setup()
        render(<Form onSubmit={fakeSubmit}/>)
        const {emailEle, dropDownEle, textAreaEle, buttonEle} = getFormElemets()

        await user.type(emailEle,"test@example.com")
        await user.selectOptions(dropDownEle,'5');
        await user.type(textAreaEle,"short")
        await user.click(buttonEle)
        expect(screen.getByText("Review must be at least 10 characters long")).toBeInTheDocument()
        expect(fakeSubmit).not.toHaveBeenCalled()
    })

    it("Should Submit - no errors",async()=>{
        const user = userEvent.setup()
        render(<Form onSubmit={fakeSubmit}/>)
        const {emailEle, dropDownEle, textAreaEle, buttonEle} = getFormElemets()

        await user.type(emailEle,"test@example.com")
        await user.selectOptions(dropDownEle,'5');
        await user.type(textAreaEle,"blah! blah! blah!")
        await user.click(buttonEle)
        expect(screen.queryByText("Review must be at least 10 characters long")).not.toBeInTheDocument()
        expect(fakeSubmit).toHaveBeenCalled()
        expect(fakeSubmit).toHaveBeenCalledTimes(1)
    })
})