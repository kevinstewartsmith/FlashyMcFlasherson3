import { connectToDB } from "@utils/database";
import FlashCardsCollection from "@models/FlashCardsCollection";
import FlashCard from "@models/FlashCard";

export const GET = async (request, { params }) => {
    try {

        await connectToDB();
        console.log("fetching: " + params.id);
        const flashCards = await FlashCard.find({collectionID: params.id})
        if (!flashCards) return new Response("Flashcards Not Found", { status: 404 });

        
        console.log(flashCards);
        console.log(flashCards.length);

        return new Response(JSON.stringify(flashCards), { status: 200 })
    } catch (error) {
        console.log("api/collection/[id]/flashcards.js error: " + error);
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

// export const DELETE = async (request, { params }) => {
//     try {

//         await connectToDB();
//         console.log("fetching: " + params.id);
//         const flashCard = await FlashCard.find({flashCardID: params.id})
//         if (!flashCard) return new Response("Flashcards Not Found", { status: 404 });

        
//         console.log(flashCard);
//         console.log(flashCard.length);

//         return new Response(JSON.stringify(flashCard), { status: 200 })
//     } catch (error) {
//         console.log("DELETE api/collection/[id]/flashcards.js error: " + error);
//         return new Response("Failed to fetch all prompts", { status: 500 })
//     }
//}