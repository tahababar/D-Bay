//in next.js, we make env.local instead of just env

import "bootstrap/dist/css/bootstrap.min.css"
import Nav from "../components/Nav";
import Head from "next/head";//we import public css file like this
//to display error or success registration messages, we will
//use npm i react-toastify 
//also for more design features and icons, lets use npm i antd @ant-design/icons
//Nav and all other componentswillbe importedhere
//next.js recognizes import so we dont need require()
//!important is used in background-color..it is a bootstrap tag that we use to override background-color 
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import {UserProvider} from '../context';

//userProvider will add context state globally to be used whereever we want
function MyApp({Component,pageProps}){
    return(
        <UserProvider>
        <Head>
            <link rel="stylesheet" href="/css/styles.css"/>
        </Head>
        <Nav /> 
        <ToastContainer position="top-center"/>
        <Component {...pageProps} />
        </UserProvider>
    );
} //next.js  function

export default MyApp;

//_app.js file in pages, isreadby next.js
//this is the filewhere we will import bootstrapand other things

//whenever we make any changes in _app.js,file
//wewillneed to restart server using npm run dev

//publicfolderin nextjs is for storing static resource files