import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import StaticLinks from "app/core/components/StaticLinks"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <LoginForm
        onSuccess={() => {
          const next = router.query.next
            ? decodeURIComponent(router.query.next as string)
            : "/dashboard"
          router.push(next)
        }}
      />

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

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Zaloguj się">{page}</Layout>

export default LoginPage
