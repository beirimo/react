
import './App.css';
import { Container  } from 'react-bootstrap';
import Header from './Header';
import Bottom from './Bottom';
import MenubarPage from './MenubarPage';


const App = () => {
  return (
    <Container>
      <Header/>
      <MenubarPage/>
      <Bottom/>
    </Container>
  );
}

export default App;
