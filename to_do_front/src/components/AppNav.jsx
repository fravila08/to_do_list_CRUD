import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';


const AppNav =({user})=>{
    function signOut(){
      event.preventDefault()
      axios.post('/sign_out').then((respone)=>{
        window.location.href=""
      })
    }

    return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="">My Tasks</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              
                {user?
                <Nav className="me-auto">
                  <Button onClick={signOut}>Sign Out</Button>
                </Nav>
                :
                <Nav className="me-auto">
                  <Nav.Link href="/#/signup">Sign Up</Nav.Link>
                  <Nav.Link href="/#/signin">Sign In</Nav.Link>
                </Nav>
                }
              
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default AppNav;