import React, { useEffect, useState } from 'react';
import { Row, Col, Form, InputGroup, Card, Table } from 'react-bootstrap';
import axios from 'axios';
import '../../index.css';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const SearchPage = () => {
  const [loadings, setLoadings] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [size, setSize] = useState(5);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('리액트');
  const [books, setBooks] = useState([]);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 1000);
  };

  const callAPI = async () => {
    setLoading(true);
    const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${query}`;
    const config = {
      headers: { Authorization: 'KakaoAK 54b6688221dead45827042df7e297c2d' },
    };
    try {
      const res = await axios.get(url, config);
      console.log(res.data);
      const documents = res.data.documents;
      setBooks(documents.map((book) => book && { ...book, checked: false }));
      setIsEnd(res.data.meta.is_end);
      setTotal(res.data.meta.pageable_count);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    callAPI();
  }, [page]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (query === '') {
      alert('검색어를 입력하세요!!');
      return;
    }
    setPage(1);
    callAPI();
  };

  const onInsert =async(book) => {
	if(!window.confirm(`"${book.title}" 도서를 등록하실래요?`)) return;
	//console.log(".......dd")
	//도서등록
	const data={...book, authors:book.authors.join(',')};
	const res=await axios.post('/books/insert',data);
	if(res.data.result===1){
		alert("도서등록완료");
	}else{
		alert("이미 등록된 도서입니다.");
	}
  }

  return (
    <>
      <div className="text-center">
        <h1>하이!@ 검색을해보자 무슨책을 보고싶니?</h1>
        <Row className="mb-2">
          <Col xs={6} md={4} lg={3} className="text-end">
            <Card>
              <Form onSubmit={onSubmit}>
                <InputGroup>
                  <Form.Control
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="검색어를 입력하세요"
                  />
                </InputGroup>
              </Form>
            </Card>
          </Col>
          <Col className="mb-3">검색수: {total}건</Col>
          <Col>
            <Button variant="primary">선택도서저장</Button>
          </Col>
        </Row>
        <Table striped bordered hover className="align-middle">
          <thead>
            <tr>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>isbn</td>
              <td>title</td>
              <td>contents</td>
              <td>
                가격<br></br>(할인가)
              </td>
              <td>publisher</td>
              <td>author</td>
              <td>판매여부</td>
              <td>등록</td>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.isbn}>
                <td>
                  <input type="checkbox"></input>
                </td>
                <td>{book.isbn}</td>
                <td className="text-center">
                  <img
                    src={book.thumbnail || 'http://via.placeholder.com/120x170'}
                    width="100px"
                    alt={book.title}
                  />
                  {book.title}
                </td>
                <td>{book.contents}</td>
                <td>
                  {book.price}
                  <br></br>({book.sale_price})원
                </td>
                <td>{book.publisher}</td>
                <td>{book.authors}</td>
                <td>{book.status}</td>
                <td>
                  <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    // loading={loadings[1]}
                    onClick={() => onInsert(book)}>등록!</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="text-center">
        <Button>이전</Button>
        <span>page</span>
        <Button>다음</Button>
      </div>
    </>
  );
};

export default SearchPage;
