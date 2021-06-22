import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import Header from "app/core/components/Header"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div>
      <div id="full" className="full-container-high">
        <div id="main" className="clearfix">
          <Header />

          <div id="content" className="foreign-dashboard">
            <div className="c">
              <h1>Login</h1>

              <Form
                submitText="Login"
                schema={Login}
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values) => {
                  try {
                    await loginMutation(values)
                    props.onSuccess?.()
                  } catch (error) {
                    if (error instanceof AuthenticationError) {
                      return {
                        [FORM_ERROR]: "Przykro mi, te dane uwierzytelniające są nieprawidłowe.",
                      }
                    } else {
                      return {
                        [FORM_ERROR]:
                          "Przepraszamy, wystąpił nieoczekiwany błąd. Prosimy spróbować ponownie. - " +
                          error.toString(),
                      }
                    }
                  }
                }}
              >
                <LabeledTextField name="email" label="Email" placeholder="Email" />
                <LabeledTextField
                  name="password"
                  label="Hasło"
                  placeholder="Hasło"
                  type="password"
                />
                <div>
                  <Link href={Routes.ForgotPasswordPage()}>
                    <a>Zapomniałeś hasła?</a>
                  </Link>
                </div>
              </Form>

              <div style={{ marginTop: "1rem" }}>
                lub <Link href={Routes.SignupPage()}>zarejestruj się</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .c {
          padding: 10px;
          margin: 10px;
          background-color: #fff;
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}

export default LoginForm
