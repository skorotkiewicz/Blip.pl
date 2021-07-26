import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div>
      <h1>Zarejestruj się</h1>

      <Form
        submitText="Zarejestruj się"
        schema={Signup}
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("name")) {
              return { name: "Ta nazwa użytkownika jest już zajęta" }
            } else if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              return { email: "Ten e-mail jest już używany" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="name" label="Login" placeholder="Login" />
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Hasło" placeholder="Hasło" type="password" />
      </Form>
    </div>
  )
}

export default SignupForm
