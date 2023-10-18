import { useContext, useEffect } from 'react'
import { CollectionContext } from '../Contexts/CollectionContext';
import CreateCollection from './CreateCollection'
import CollectionFeed from './CollectionFeed'

const CollectionParent = () => {
  const { scrollPosition, updateScrollPosition } = useContext(CollectionContext);
  


  useEffect(() => {
    // Restore the scroll position on component mount
    window.scrollTo(0, scrollPosition);
  }, []);

  useEffect(() => {
    // Update the scroll position when it changes
    const handleScroll = () => {
      updateScrollPosition(window.pageYOffset);
      console.log("scrollPosition: " + scrollPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollPosition]);

  return (
    <div>
        <CreateCollection
          //onAdd={collectionChanged}
          inputType={"collection"}
          topPlaceholder={"Add Collection"}
          bottomPlaceholder={"Description (optional)"}
          topName={"title"}
          bottomName={"content"}
          //selectedCollection={selectedCollection}

        />
        <CollectionFeed  />
    </div>
  )
}

export default CollectionParent