import NavBar from "../components/NavBar";
import {Container} from "@mui/material";
import CreateDocumentForm from "../components/CreateDocumentForm";


const CreateDocumentPage = () => {

    return(
        <div>
            <NavBar/>
            <Container maxWidth={"xl"}>
                <CreateDocumentForm/>
            </Container>
        </div>
    )
}

export default CreateDocumentPage;