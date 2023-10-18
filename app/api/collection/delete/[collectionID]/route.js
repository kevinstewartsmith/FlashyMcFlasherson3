import FlashCardsCollection from "@models/FlashCardsCollection";
import { connectToDB } from "@utils/database";

export const DELETE = async (request, { params }) => {
    console.log("Delete method: " + params.collectionID);
    console.log("Delete method ");
    try {
        await connectToDB();
        console.log("yar connected");
        // Find the prompt by ID and remove it
        await FlashCardsCollection.findByIdAndRemove(params.collectionID);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};