import {screen, render, logRoles} from "@testing-library/react"
import Sandbox from "./Sandbox"
import userEvent from "@testing-library/user-event"
import {it,describe, expect} from "vitest"

const formElements = ()=>({
    emailIp: screen.getByRole("textbox",{name: "Email address"}),
    passwordIp: screen.getByLabelText("Password"),
    confirmPasswordIp: screen.getByLabelText(/confirm password/i),
    buttonEle: screen.getByText("Submit")
})

describe("Form testing",()=>{
    beforeEach(()=>{
        const {container} = render(<Sandbox/>)
        logRoles(container)
    })
    it("Should have fields which are empty",()=>{
        const {emailIp,passwordIp,confirmPasswordIp} = formElements()
        expect(emailIp).toBeInTheDocument()
        expect(emailIp).toHaveValue('')

        expect(passwordIp).toBeInTheDocument()
        expect(passwordIp).toHaveValue('')

        expect(confirmPasswordIp).toBeInTheDocument()
        expect(confirmPasswordIp).toHaveValue('')

    })

    it("Should be able to provide inputs to fields",async()=>{
        const {emailIp,passwordIp,confirmPasswordIp} = formElements()
        const user = userEvent
        await user.type(emailIp,"test@test.com")
        expect(emailIp).toHaveValue('test@test.com')

        
        await user.type(passwordIp,"secret")
        expect(passwordIp).toHaveValue("secret")

        
        await user.type(confirmPasswordIp,"secret")
        expect(confirmPasswordIp).toHaveValue('secret')
    })

    it("Should show email error if email not valid",async()=>{
        const user = userEvent.setup()

        const {emailIp,buttonEle} = formElements()
        expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument()

        await user.type(emailIp,"hi")
        await user.click(buttonEle)

        expect(screen.queryByText(/invalid email/i)).toBeInTheDocument()
    })

    it("Should show password error if password < 5 characters",async()=>{
        const user = userEvent.setup()

        const {emailIp, passwordIp,buttonEle} = formElements()
        expect(screen.queryByText(/Password must be at least 5 characters/i)).not.toBeInTheDocument()
        await user.type(emailIp,"test@test.com")
        await user.type(passwordIp,"hi")
        await user.click(buttonEle)
        expect(screen.queryByText("Password must be at least 5 characters")).toBeInTheDocument()
    })

    it("Should show error if passwords do not match",async()=>{
        const user = userEvent.setup()

        const {emailIp, passwordIp,buttonEle,confirmPasswordIp} = formElements()
        expect(screen.queryByText(/Password must be at least 5 characters/i)).not.toBeInTheDocument()
        await user.type(emailIp,"test@test.com")
        await user.type(passwordIp,"secret")
        await user.type(confirmPasswordIp,"secre")
        await user.click(buttonEle)
        expect(screen.queryByText("Passwords do not match")).toBeInTheDocument()
    })

})