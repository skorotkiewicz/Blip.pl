import { BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import Header from "app/core/components/Header"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <div>
      <div id="full" className="full-container-high">
        <div id="main" className="clearfix">
          <Header />

          <div id="content" className="foreign-dashboard">
            <div className="c">
              <div>
                <h1>Zapomniałeś hasła?</h1>

                {isSuccess ? (
                  <div>
                    <h2>Wniosek złożony</h2>
                    <p>
                      Jeśli Twój e-mail jest w naszym systemie, otrzymasz wkrótce instrukcje
                      dotyczące resetowania hasła.
                    </p>
                  </div>
                ) : (
                  <Form
                    submitText="Wyślij instrukcję resetowania hasła"
                    schema={ForgotPassword}
                    initialValues={{ email: "" }}
                    onSubmit={async (values) => {
                      try {
                        await forgotPasswordMutation(values)
                      } catch (error) {
                        return {
                          [FORM_ERROR]:
                            "Przepraszamy, wystąpił nieoczekiwany błąd. Proszę spróbować ponownie.",
                        }
                      }
                    }}
                  >
                    <LabeledTextField name="email" label="Email" placeholder="Email" />
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

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => <Layout title="Zapomniałeś hasła?">{page}</Layout>

export default ForgotPasswordPage
