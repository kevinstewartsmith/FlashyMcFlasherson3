"use client"
import { FlashCardContextProvider, FlashCardContext } from '@components/Contexts/FlashCardContext';
import FlashCardUIParent from '@components/FlashCardUI/FlashCardUIParent';
export default function Collection({ params }) {

    return (
            <FlashCardUIParent collectionID={ params.collectionID }/>
    )
}