import { Layout } from '@components/Layout'
import MainRoutes from '@components/Routes'

import { useApp } from '@features/app/use-app'

import { Preloader } from '@ui/main-preloader/Preloader'


export const App = () => {
  const isInit = useApp()
  return (
    <>
      {isInit ? (
        <Layout>
          <MainRoutes />
        </Layout>
      ) : (
        <Preloader />
      )}
    </>
  )
}