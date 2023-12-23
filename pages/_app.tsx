
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from './components/Navbar'
import { AuthContextProvider } from '@/context/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <AuthContextProvider>
      <Navbar/>
            <Component {...pageProps} />
    </AuthContextProvider>
    
    
     
     ) 
}
