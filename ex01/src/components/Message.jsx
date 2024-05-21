import React, { useState } from 'react'
import {Row, Col, Button} from 'react-bootstrap'
const Message = () => {
    const [message, setMessage] = useState('');
    const [textColor, setTextColor]= useState('blue');
    //
  return (
    <>
        <Row className='my-5'>
            <Col>
                <h1 style={{color:textColor}}>{message}</h1>
                <Button onClick={()=>setMessage('안녕하세요!')} className='mx-3'>입장</Button>
                <Button onClick={()=>setMessage('안녕히가세요!')}>퇴장</Button>
                <Button onClick={()=>setMessage('아항!')} className='mx-3'>오 ?</Button>
                <br/>
                <Button onClick={() =>setTextColor('red')} className='m-3'>빨강</Button>
                <Button onClick={() =>setTextColor('blue')} className='m-3'>파랑</Button>
                <Button onClick={() =>setTextColor('skyblue')} className='m-3'>하늘</Button>
                <Button onClick={() =>setTextColor('green')} className='m-3'>초록</Button>
                
            </Col>
        </Row>
    </>
    
  )
}

export default Message