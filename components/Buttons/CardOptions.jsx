import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Grid from "@mui/material/Grid";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { PropaneSharp } from "@mui/icons-material";
import DeleteDialog from "../Dialogs/DeleteDialog";
import EditFlashCardDialog from "../Dialogs/EditFlashCardDialog";

function CardOptions(props) {
    function handleFlashcardData(data) {
        props.handleFlashcardData(data)
    }
    return (
        <div className="card-options">

            <Grid
                container
                //rowSpacing={1}
                spacing={3}
                //columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justify="space-evenly"
                alignItems="center"
            >
                {/* <Grid item padding={2} xs={4} >
                    <Zoom in={true} >
                        <Fab color="primary" aria-label="add" onClick={props.editFlashCard}>
                            <EditIcon sx={{color:"primary"}} /> 
                        </Fab>
                    </Zoom>
                </Grid>
                <Grid item padding={2} xs={4} >
                    <Zoom in={true}>
                        <Fab color="primary" aria-label="add" onClick={props.deleteFlashCard}>
                            <DeleteOutlinedIcon sx={{color:"primary"}} className="delete-button" /> 
                        </Fab>
                    </Zoom>
                </Grid> */}
                <Grid item padding={1} xs={4} >
                    <EditFlashCardDialog
                        front={props.front}
                        back={props.back}
                        handleFlashcardData={handleFlashcardData}
                        updateClicked={props.updateClicked}
                    />
                </Grid>
                <Grid item padding={1} xs={4} >
                    <DeleteDialog
                        front={props.front}
                        back={props.back} 
                        deleteFlashCard={props.deleteFlashCard}
                    />
                </Grid>

                
            </Grid>    
        </div>
    )
}

export default CardOptions;