// pages/api/wiki.js

export const GET = async (req,res) => {
   console.log("api/wiki/route.js GET");
    //const pageTitle = req.query.pageTitle;
    const test = "alaska"
    //console.log(pageTitle);
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=${test}&format=json`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const pageId = Object.keys(data.query.pages)[0];
      const introParagraph = data.query.pages[pageId].extract;

  

      return new Response(JSON.stringify(introParagraph), { status: 200 })

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
  