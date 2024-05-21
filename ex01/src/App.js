import './App.css';
import BookSearch from './components2/BookSearch';
import { Container } from 'react-bootstrap';
const App = ()  => {

  return (
    <div className='my-5'>
      <Container>
        <BookSearch/>
      </Container>
    </div>
  );
} 

export default App;
