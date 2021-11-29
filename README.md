This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Used Dependencies or Library

We are using here lots of library such as chakra-ui/react for styling the app along with peer dependencies @emotion/react @emotion/styled axios framer-motion and other libraries millify for making large number as a human readable aand nprogress for loading status and the main and interesting library we have react-horizontal-scrolling-menu and the last one is react-icons


## step-01
  * create Banner into index.html.
  * config image optimization in next.config.js

 ## step-02
   * create a folder utils 
   * create file fetchApi.js
   * fetch Api fetch url and return response.

 ## step-3
   * index.js --> create getStaticProps async function
   * call fetchApi function and pass api endpoint url with help of baseurl .
   * return props object has response of properties for sale and rent .
   
   Note : getStaticProps()  method returns props object used as a props for Home component in index.html

## step -4
   * set layout for the entire app
   * create Layout component inside components folder
   * create some Head , Box and any other things in Layout.

   Note : Head Component comes from 'next/head' is used to provider headers or meta for that page.

   * Whether here we are using ChakraUI . 
     as per chakraUI requirement we have to wrap our Component with the help of ChakraProvider in the MyApp component in _app.js.
   * first wrap Component in Layout and all are wrapped inside of ChakraProvider.

    
## step-05
   * next step to create Property Component inside components folder.
   * Similar we create Navbar and footer components.

   * at the end we just mount navbar and footer inside Layout Component. 

## step-06
   * create a search filter page
   * create search.js inside pages folder
   * use state variable to apply toggle for searchFilter Component.
   * create searchFilter Component inside components.

## step-07
   Note : "next/router"  provide router to get query or params of that page.

   * getServerSideProps({query}) where query comes from router.
   * fetch this query with fetchApi() returns a props object.
   * get props in Search component.

## step-08
   * create a routing based dynamic file [id].js inside property folder.
   *  [id].js files contain PropertyDetails component is used to diplay 
       property details page.
   * component contains all the details of property in props which gets  
     from getServerSideComponent() .

## step-09 
   * Create a ImageScrollbar component mounted in PropertyDetails Component
   * ImageScrollbar component contains props "data" comes from  
     PropertyDetails component .

## step-10 
   * Display Loading Status implement NProgess configure in MyApp  
     component inisde _app.js .      
