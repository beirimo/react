import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Card, CardBody, CardFooter,InputGroup, Form, Button} from 'react-bootstrap'
import ModalBook from './ModalBook';
const BookSearch = () => {
  const [count, setCount] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('라이온킹');
  const [books, setBooks] = useState([]);
  const callAPI = async() => {
    const url=`https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=12&page=${page}`;
    const config ={
      headers: {"Authorization":"KakaoAK d1634623cd9a815bb4ce8af7168be659"}
    };
    
    const res= await axios(url, config);
    console.log(res);
    setBooks(res.data.documents);
    setCount(res.data.meta.pageable_count);
    setIsEnd(res.data.meta.is_end);
  }
  
  useEffect(()=>{
      callAPI();
  }, [page]);
  const onSubmit = (e) => {
      e.preventDefault();
      if(query===""){
        alert("검색어를 입력하세요");
      }else{
         callAPI();
        setPage(1);
        
        
      }
  }

  return (
    <div className='my-5 BookSearch'>
        <h1 className='text-center'>도서검색</h1>
        <Row className='mb-2'>
          <Col xs={8} md={6} lg={4}>
          <form onSubmit={onSubmit}>
              <InputGroup>
                <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)} placeholder='검색어'/>
                <Button type='submit'>검색</Button>
              </InputGroup>
          </form>
          </Col>
          <Col>
              <div>검색수: {count}권</div>
          </Col>

        </Row>
        <Row className='mb-2'>
          {books.map((book, index)=>
            <Col xs={6} md={4} lg={2} className='mb-2'key={index}>
              <Card>
                  <CardBody>
                     
                      <ModalBook book={book}/>
                  </CardBody>
                  <CardFooter>
                    <div className='ellipsis' style={{fontSize:'12px'}}>{book.title}</div>
                  </CardFooter>
                </Card>  
            </Col>
          )}

        </Row>
        {count > 12 &&
        <div className='text-center'>
            <Button onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
            <span  className='mx-3'>{page}</span>
            <Button onClick={()=>setPage(page+1)} disabled={isEnd}>다음</Button>
        </div>
        }
    </div>
  );
}

export default BookSearch