import axios from 'axios';
import React, { useEffect, useState } from 'react'
import{Row, Col, InputGroup, Form, Card, Button, ModalBody } from 'react-bootstrap'
import ModalBook from './ModalBook';

const BookSearch = () => {
    const [loading, setLoding] = useState(false);
    const [total, setTotal] =useState(0);
    const [last, setLast] = useState(false);
    const [page, setPage] = useState(1);
    const [query, setQuery]= useState('query')
    const [books, setBooks] = useState([])
    const callAPI = async() => {
        const url=`https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=12&page=${page}`;
        const config={
            headers:{"Authorization":"KakaoAK d1634623cd9a815bb4ce8af7168be659"}    
        }
            const res=await axios.get(url, config);
            console.log(res.data);
            setBooks(res.data.documents);   //배열데이터
            setLast(res.data.meta.is_end);  //마지막페이지 f12 console보고 알게 된 것임 
            setTotal(res.data.meta.pageable_count); //검색수
    };

    useEffect(()=>{
        callAPI();
    }, [page]);

    const onSubmit =(e) =>{
        e.preventDefault();
        if(query === ""){
            alert("검색어를 입력하세요")
        }else{
                callAPI();
        }
    }
    if(loading) return <div className='my-5 text-center'></div>
  return (
    <div className='my-5 bookSearch'>
        <h1 className='text-center'>도서검색</h1>
        <Row>
            <Col xs={8} md={6} lg={4}>
                <form onSubmit={onSubmit}>
                    <InputGroup>
                            <Form.Control onChange={(e)=>setQuery(e.target.value)}   //외워  키보드를 누를때마다 'change'이벤트가 일어남
                            value={query} placeholder='검색어'/>
                            <Button type="submit">검색</Button>
                            <span className='mb-2 ms-3'>검색수: {total}권</span>
                    </InputGroup>

                </form>
            </Col>
            <Col>
                <div className='mt-2'>검색수:{total}권</div>
            </Col>
        </Row>
        <Row>
            {books.map(book=>
                <Col xc={6} md={4} lg={2} className='mb-3'>
                    <Card>
                        <Card.Body>
                           
                            <ModalBook book={book}/>
                        </Card.Body>
                        <Card.Footer>
                            <div className='ellipsis'>{book.title}</div>
                        </Card.Footer>
                   </Card>
                </Col>
            )}
        </Row>
        {total >12 &&  
        //
        <div className='text-center'>
            <Button onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
            <span className='mx-3'>{page}</span>
            <Button onClick={()=>setPage(page+1)} disabled={last}>다음</Button>
        </div>
}
    </div>
  )
}
export default BookSearch 