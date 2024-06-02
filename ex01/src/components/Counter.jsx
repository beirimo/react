import React, { useState } from 'react'
import {Button, Card, CardBody} from 'react-bootstrap'
const Counter = () => {
    const [count, setCount] = useState(100);
    const style={

        fontSize :'25px',
        color:'red'

    }

  return (
    <Card className='m-5'>
        <Card.Header>
            <h1>카운터</h1>
         </Card.Header>
         <Card.Body>
        <Button onClick={()=>setCount(count-1)} variant='success'>감소</Button>
        <span className='mx-3' style={style}>{count}</span>
        {/* 스타일 주려면 중괄호 두번 */}
        <Button onClick={()=>setCount(count+1)}>증가</Button>
        <hr/>
        </Card.Body>
        </Card>
   
  )
}

export default Counter