import { BlitzPage, Link, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ChangePassword } from "app/auth/validations"
import changePassword from "app/auth/mutations/changePassword"
import Header from "app/core/components/Header"

const ChangePasswordPage: BlitzPage = () => {
  const [changePasswordMutation, { isSuccess }] = useMutation(changePassword)

  return (
    <div>
      <div id="full" className="full-container-high">
        <div id="main" className="clearfix">
          <Header />

          <div id="content" className="foreign-dashboard">
            <div className="c">
              <div>
                <h1>Zmień swoje hasło</h1>

                {isSuccess ? (
                  <div>
                    <h2>Zmiana hasła powiodła się</h2>
                    <p>
                      wróc do <Link href={`/dashboard`}>dashboard</Link>
                    </p>
                  </div>
                ) : (
                  <Form
                    submitText="Zmień hasło"
                    schema={ChangePassword}
                    initialValues={{
                      currentPassword: "",
                      newPassword: "",
                      passwordConfirmation: "",
                    }}
                    onSubmit={async (values) => {
                      try {
                        await changePasswordMutation(values)
                      } catch (error) {
                        if (error.name === "ChangePasswordError") {
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
                    <LabeledTextField
                      name="currentPassword"
                      label="Aktualne hasło"
                      type="password"
                    />
                    <LabeledTextField name="newPassword" label="Nowe hasło" type="password" />
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

ChangePasswordPage.authenticate = true
ChangePasswordPage.getLayout = (page) => <Layout title="Zmień swoje hasło">{page}</Layout>

export default ChangePasswordPage
