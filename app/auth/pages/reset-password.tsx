import { BlitzPage, useRouterQuery, Link, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ResetPassword } from "app/auth/validations"
import resetPassword from "app/auth/mutations/resetPassword"
import Header from "app/core/components/Header"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <div>
      <div id="full" className="full-container-high">
        <div id="main" className="clearfix">
          <Header />

          <div id="content" className="foreign-dashboard">
            <div className="c">
              <div>
                <h1>Ustaw nowe hasło</h1>

                {isSuccess ? (
                  <div>
                    <h2>Pomyślne zresetowanie hasła</h2>
                    <p>
                      wróć do <Link href={Routes.Home()}>homepage</Link>
                    </p>
                  </div>
                ) : (
                  <Form
                    submitText="Resetuj hasło"
                    schema={ResetPassword}
                    initialValues={{
                      password: "",
                      passwordConfirmation: "",
                      token: query.token as string,
                    }}
                    onSubmit={async (values) => {
                      try {
                        await resetPasswordMutation(values)
                      } catch (error) {
                        if (error.name === "ResetPasswordError") {
                          return {
                            [FORM_ERROR]: error.message,
                          }
                        } else {
                          return {
                            [FORM_ERROR]:
                              "Przepraszamy, wystąpił nieoczekiwany błąd. Proszę spróbować ponownie.",
                          }
                        }
                      }
                    }}
                  >
                    <LabeledTextField name="password" label="Nowe hasło" type="password" />
                    <LabeledTextField
                      name="passwordConfirmation"
                      label="Potwierdź nowe hasło"
                      type="password"
                    />
                  </Form>
                )}
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

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => <Layout title="Zresetuj swoje hasło">{page}</Layout>

export default ResetPasswordPage
