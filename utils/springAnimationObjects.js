import { useSpring } from "react-spring";

export const studioDrawerAnimationObj = (open, galleryOpen, developerModeOn) => {
     const animation = {
        width: open ? 390 : 390,
        transform: open ?  "translateX(60px)" :  "translateX(-440px)",
        height: galleryOpen ? "calc(100vh - 235px)" : "calc(100vh - 50px)",
        backgroundColor: developerModeOn ? "yellow" : "white",
        config: { duration: 275 }
     }
       
    
    return animation
}

export const navOptionAnimationObj = (open, galleryOpen, developerModeOn) => {
   const animation = {
      from: {
         height: "calc(100vh - 70px)",
         backgroundColor:developerModeOn? "yellow": "white",
         margin: 20,   
      },
      to: {
            height: galleryOpen ? "calc(100vh - 270px)" : "calc(100vh - 90px)",
            config: { duration: 1000 }
      }
   }
   return animation
}

export const studioPreviewAnimationObj = (open, galleryOpen, developerModeOn) => {
   const animation = {
      from: {
         width: "calc(100vw - 65px)",
         marginLeft: 65,
         height: "calc(100vh - 50px)",
         backgroundColor: "light-pink",
     },
     to: {
         width: open ? "calc(100vw - 450px)" : "calc(100vw - 65px)",
         marginLeft: open ? 450 : 65,
         height: galleryOpen ? "calc(100vh - 235px)" : "calc(100vh - 50px)",
         backgroundColor: developerModeOn ? "yellow" : "lightgrey",
         borderWidth: 0,
         borderColor: developerModeOn ? "orange" : "lightgrey",
         config: { duration: 1000 }
     },
   }
   return animation
}

export const photoGalleryAnimationObj = (galleryOpen, developerModeOn) => {
   const animation = {
      from: {
           marginTop:20, 
           backgroundColor: developerModeOn ? "yellow" : "white", 
           overflow: "auto",
           height: "calc(100vh - 200px)", 
      },
      to: {
          marginTop:20, 
          backgroundColor: developerModeOn ? "yellow" : "white", 
          overflow: "auto",
          height: galleryOpen? "calc(100vh - 380px)": "calc(100vh - 200px)", 
          config: { duration: 1000 }
      },
  }
   return animation
}

export const studioGalleryAnimationObj = ( galleryOpen ) => {
   const animation = {
      from: {
          transform:  "translateY(50px)"
      },
      to: { 
          transform: galleryOpen ?  "translateY(0px)" :  "translateY(50px)",
          config: { duration: 200 }
      },
   }
   return animation
}

export const drawerContainerAnimationObj = (developerModeOn, shrinkDrawerContainer) => {
   const animation = {
      from: {
         height: "calc(100vh - 50px)",
         backgroundColor: developerModeOn ? "pink" : "white",
      },
      to: {
         height: shrinkDrawerContainer ? "calc(100vh - 250px)" : "calc(100vh - 50px)",
         config: { duration: 1000 }
      }
   }
   return animation
};