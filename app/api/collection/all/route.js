//Fetches all collections from all users
import { connectToDB } from "@utils/database";
import FlashCardsCollection from "@models/FlashCardsCollection";


export const GET = async (request) => {
    try {
        await connectToDB()
        
        const collections = await FlashCardsCollection.find({}).populate('creator')
        
        return new Response(JSON.stringify(collections), { status: 200 })
    } catch (error) {
        console.log("api/all/route.js error: " + error);
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 