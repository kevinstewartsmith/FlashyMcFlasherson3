import FlashCardsCollections from "@models/FlashCardsCollection";
import { connectToDB } from "@utils/database";


export const PATCH = async (request) => {

//12/13/2023 Below is not the path request, just some copied code from another route


    //const { userId, prompt, tag } = await request.json();
    const { userId, name, description } = await request.json();
    console.log("name NEW ROUTE: " + name);
    console.log("description NEW ROUTE: " + description);
    try {
        await connectToDB();
        const newCollection = new FlashCardsCollections({
            creator: userId,
            name, 
            description 
        });

        await newCollection.save();
        console.log("Made it past save");
        return new Response(JSON.stringify(newCollection), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}