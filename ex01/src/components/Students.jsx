import React, { useState } from 'react'
import { Table } from 'react-bootstrap';

const Students = () => {
    const [students, setStudents] = useState([
        {no:100, name:'길동이', address:'인천 부평구 부평대로', phone:'010-2259-4034'},
        {no:101, name:'청이', address:'인천 부평구 부평대로', phone:'010-2040-4040'},
        {no:102, name:'감찬이', address:'인천 부평구 부평대로', phone:'010-2040-4050'},
        {no:103, name:'힣', address:'인천 부평구 부평대로', phone:'010-2020-4040'},

    ]);
  return (
    <div className='m-5'>
            잘 되는지 궁금한가
        <h1>학생목록</h1>
       
         thead와 tbody를 꼭 넣어야 해
         <br></br>
         느리지 않아서 넘흐 좋네
        <Table striped bordered hover>
        <thead>
                <tr>
            
                <td>학생번호</td>
                <td>학생이름</td>
                <td>학생주소</td>
                <td>학생전화</td>
                </tr>
                </thead>
                <tbody>
                    {students.map(s =>
                        <tr>
                                <td>{s.no}</td>
                                <td>{s.name}</td>
                                <td>{s.address}</td>
                                <td>{s.phone}</td>
                                

                        </tr>

                    )}

                </tbody>
        </Table>
       
    </div>
  )
}

export default Students