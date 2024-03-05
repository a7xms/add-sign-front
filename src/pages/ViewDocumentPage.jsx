import NavBar from "../components/NavBar";
import {Container} from "@mui/material";
import ViewDocument from "./ViewDocument";
import {useParams} from "react-router-dom";

const ViewDocumentPage = () => {

    const id = useParams();

    return(
        <div>
            <NavBar/>
            <Container maxWidth={"xl"}>
                <ViewDocument id={id}/>
            </Container>
        </div>
    )
}

export default ViewDocumentPage;
