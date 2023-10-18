import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const collections = await FlashCardsCollections.find({}).populate('creator')

        return new Response(JSON.stringify(collections), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch allcollections", { status: 500 })
    }
} 