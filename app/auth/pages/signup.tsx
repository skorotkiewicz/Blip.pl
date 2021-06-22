import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import Header from "app/core/components/Header"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <div id="full" className="full-container-high">
        <div id="main" className="clearfix">
          <Header />
          <div id="content" className="foreign-dashboard">
            <div className="c">
              <SignupForm onSuccess={() => router.push("/dashboard")} />
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

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Zarejestruj się">{page}</Layout>

export default SignupPage
