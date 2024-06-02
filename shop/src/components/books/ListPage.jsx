import React, { useEffect, useState } from 'react';
import { Row, Col, InputGroup, Table, Form, Button } from 'react-bootstrap';
import '../../Paging.css';
import axios from 'axios';



const ListPage = () => {

    const [key, setKey] = useState('title');
    const [word, setWord] = useState('');
    const [loading, setLoading] = useState(false);
    const [chk, setChk] = useState(0);
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [count, setCount] = useState(0);

    const callAPI = async() => {
        setLoading(true);
        const url=`/books/list?page=${page}&size=${size}&key=${key}&word=${word}`;
        const res=await axios.get(url);
        const documents=res.data.documents;
    
        if(documents) {
          setBooks(documents.map(book=>book && {...book, checked:false}));
        }else{
          setBooks([]);
        }
        setCount(res.data.count);
        if(page > Math.ceil(res.data.count/size)) setPage(page-1);
        setLoading(false);
      }

    useEffect(()=>{
        callAPI();
    }, [page]);

	return (
		<div className="mt-3">
			<Row className="mb-1">
				<Col xs={6} md={4} lg={3}>
					<form>
						<InputGroup>
							<Form.Select>
								<option>제목</option>
								<option>저자</option>
								<option>출판사</option>
							</Form.Select>
							<Form.Control placeholder="검색어" />
							<Button type="submit">검색</Button>
						</InputGroup>
					</form>
				</Col>
				<Col className="mt-2">검색수: {count}건</Col>
				<Col className="text-end">
					<Button>선택도서삭제</Button>
				</Col>
			</Row>
			<Table striped bordered hover className="align middle">
				<thead>
					<td>isbn</td>
					<td>title</td>
					<td>contents</td>
					<td>
						가격<br></br>(할인가)
					</td>
					<td>publisher</td>
					<td>authors</td>
					<td>등록일</td>
					<td>삭제</td>
				</thead>
				<tbody>
                    {books.map(book=>
                    <tr key={book.bid}>
                    <td>{book.isbn}</td>
					<td>{book.title}</td>
					<td>{book.contents}</td>
					<td>
						{book.price}<br></br>({book.sale_price})
					</td>
					<td>{book.publisher}</td>
					<td>{book.author}</td>
					<td>{book.fmtdate}<br/>{book.fmtregdate}</td>
					<td className='text-center'><Button variant='danger'>삭제</Button></td>
                    </tr>
                    )}
				</tbody>
			</Table>
		</div>
	);
};

export default ListPage;
