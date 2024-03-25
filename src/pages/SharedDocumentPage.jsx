import NavBar from "../components/NavBar";
import {Container} from "@mui/material";
import ViewDocument from "./ViewDocument";
import {useParams} from "react-router-dom";
import SharedDocument from "./SharedDocument";

const SharedDocumentPage = () => {

    const link = useParams();

    return(
        <div>
            <Container maxWidth={"xl"}>
                <SharedDocument link={link}/>
            </Container>
        </div>
    )
}

export default SharedDocumentPage;
