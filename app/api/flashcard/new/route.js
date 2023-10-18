import { connectToDB } from "@utils/database";
import FlashCardsCollection from "@models/FlashCardsCollection";
import FlashCard from "@models/FlashCard";

export const POST = async (request) => {
    //const { userId, prompt, tag } = await request.json();
    const { userId, front, back, collectionID } = await request.json();
    console.log(userId);
    console.log(front);
    console.log(back);
    console.log(collectionID);
    
    
    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingCollection = await FlashCardsCollection.findById(collectionID).populate('creator');

        if (!existingCollection) {
            return new Response("Collection not found", { status: 404 });
        }
        console.log(existingCollection._id);
        console.log(existingCollection.name);
        console.log(existingCollection.description);
        const newFlashCard = new FlashCard({
            creator: userId,
            front: front,
            back: back,
            collectionID
        })

        await newFlashCard.save();
        // const newCollection = new FlashCardsCollections({
        //     creator: userId,
        //     name, 
        //     description 
        // });

        // await newCollection.save();
        existingCollection.flashCards.push(newFlashCard);
        console.log("Made it past save");
        return new Response(JSON.stringify(newFlashCard), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}