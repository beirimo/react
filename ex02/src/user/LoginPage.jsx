import React, { useState } from 'react'
import { Row, Col, Form, InputGroup, Button, Card } from 'react-bootstrap'
import { app } from '../../firebaseinit';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navi = useNavigate();
    const auth = getAuth(app);
    const [form, setForm] = useState({
        email:'red@test.com',
        pass: '12341234'
    });

    const {email,pass} = form;
    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }
        const onSubmit = (e) => {
            e.preventDefault();
            if(email==='' || pass===''){
                alert(" 이메일과 패스워드를 입력하세요");
                return;
            }
            //로그인체크
           // alert(`${email}\n${pass}`);
           signInWithEmailAndPassword(auth, email, pass)
           .then(success=>{
                alert('성공')
                sessionStorage.setItemItem('email', email);
                sessionStorage.setItem('uid', success.user.uid);
                navi('/');
           })
           .catch(erro=>{
                alert('비밀번호가 일치하지 않습니다');
           })
        }

  return (
        <div className='my=-5 userLogin'>
            <Row className='justify-content-center'>
                <Col xs={8} md={6} lg={4}>
                    <Card>
                        <Card.Header><h3 className='text-center'>로그인</h3></Card.Header>
                        <Card.Body>
                            <form  onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                    <InputGroup.Text className='title justify-content-center'>아이디</InputGroup.Text>
                                    <Form.Control name="email" value={email} onChange={onChangeForm} placeholder='이메일'/>
                                </InputGroup>
                                <InputGroup className='mb-3'>
                                    <InputGroup.Text className='title justify-content-center' >비밀번호</InputGroup.Text>
                                    <Form.Control name='pass'></Form.Control>
                                   
                                    
                                </InputGroup>
                                <Button className='w-100' type="submit">로그인</Button>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
  )
}

export default LoginPage