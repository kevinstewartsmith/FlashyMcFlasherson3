// pages/api/wiki.js

import { env } from "eslint-config-next";

export const GET = async (req,res) => {
    console.log("api/search/photos.js GET");
    const body = await req.json();
    console.log(body);
    const {searchParams} = new URL(req.url);
    console.log(searchParams);
     //const pageTitle = req.query.pageTitle;
     const test = "alaska"
     const unsplashID = env.UNSPLASH_ID;
     //console.log(pageTitle);
     //const url = `https://api.unsplash.com/search/photos?client_id=lDmCcc5OFUPJY133A1a9r91wF7mtzk-4JuOEhdIE7-o&query=test`;
     const url = "https://api.unsplash.com/search/photos?client_id=lDmCcc5OFUPJY133A1a9r91wF7mtzk-4JuOEhdIE7-o&query=alaska"
     //const url = `https://api.unsplash.com/search/photos?client_id=lDmCcc5OFUPJY133A1a9r91wF7mtzk-4JuOEhdIE7-o`
     console.log("pizza time");
     console.log(req.url.query);
     //const {query} = new URL(req.url)
      //console.log(query);
   
     try {
       const response = await fetch(url);
       const data = await response.json();
       console.log(data);
       console.log(typeof data);
    //    const pageId = Object.keys(data.query.pages)[0];
    //    const introParagraph = data.query.pages[pageId].extract;
 
        const photo = data.results[0].urls.regular
 
    //    return new Response(JSON.stringify(introParagraph), { status: 200 })
        // res.statusCode = 200; 
        // return res.json(data);
        return new Response(JSON.stringify(data), { status: 200 })
        //return new Response(data, { status: 200 })
        //return photo
     } catch (error) {
       console.error('Error:', error);
       res.status(500).json({ error: 'An error occurred' });
     }
   }
   