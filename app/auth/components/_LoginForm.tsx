import { AuthenticationError, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <Form
      id="login-form-form"
      submitImage={`/images/login.png`}
      schema={Login}
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        try {
          await loginMutation(values)
          props.onSuccess?.()
        } catch (error) {
          if (error instanceof AuthenticationError) {
            return { [FORM_ERROR]: "Przykro mi, te dane uwierzytelniające są nieprawidłowe." }
          } else {
            return {
              [FORM_ERROR]:
                "Przepraszamy, wystąpił nieoczekiwany błąd. Proszę spróbować ponownie. - " +
                error.toString(),
            }
          }
        }
      }}
    >
      <fieldset>
        <ul>
          <li>
            <label htmlFor="login-input">
              <strong>e-mail:</strong>
            </label>
            <LabeledTextField id="login-input" name="email" label="" placeholder="e-mail" />
          </li>
          <li>
            <label htmlFor="logging_in_user_password">
              <strong>hasło:</strong>
            </label>
            <LabeledTextField
              id="logging_in_user_password"
              name="password"
              label=""
              placeholder="hasło"
              type="password"
            />
          </li>
        </ul>
      </fieldset>

      {/* <div>
        <Link href={Routes.ForgotPasswordPage()}>
          <a>Forgot your password?</a>
        </Link>
      </div> */}
    </Form>
  )
}

export default LoginForm
