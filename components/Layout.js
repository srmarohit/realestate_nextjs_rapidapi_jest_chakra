
/**
 * create Layout component to define layout for our web app
 */

import Head from 'next/head' ; // set headers of your html e.g meta
import {Box} from '@chakra-ui/react' ;
import Navbar from './Navbar';
import Footer from './Footer';



export default function Layout({children}) {
    return (
        <>
          <Head>
            <title>Real Estate</title>
          </Head>  
          <Box maxWidth='1280px' m='auto'>
            <header>
              <Navbar/>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer/>
            </footer>
          </Box>
        </>
    )
}

