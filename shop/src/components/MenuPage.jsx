import RouterPage from './RouterPage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const MenuPage = () => {
	const navi = useNavigate();
	const uid = sessionStorage.getItem('uid');
	const [user, setUser] = useState('');

	const callAPI = async () => {
		const url = `/users/read/${uid}`;
		const res = await axios.get(url);
		setUser(res.data);
	};

	useEffect(() => {
		if (uid) callAPI();
	}, [uid]);

	const onClickLogout = (e) => {
		e.preventDefault();
		if (window.confirm('정말로 로그아웃하실래요?')) {
			sessionStorage.clear();
			navi('/');
		}
	};

	return (
		<>
			<Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
				<Container>
					<Navbar.Brand href="/">HomePage</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						{/* Navbar.Collapse
Navbar.Collapse는 네비게이션 바의 항목들이
 모바일 화면 등에서 토글 버튼을 눌렀을 때 표시되도록 하는 컴포넌트입니다. 
 네비게이션 바의 항목을 감싸고 있으며, 화면 크기에 따라 항목들이 자동으로 숨겨지거나 
 나타나도록 합니다. */}
 {/* Navbar.Toggle
Navbar.Toggle는 모바일 화면에서 네비게이션 바를 열고 닫을 수 있는 버튼을 제공합니다. 이 버튼을 클릭하면 Navbar.Collapse에 감싸져 있는 항목들이 나타나거나 숨겨집니다.

사용 예시:
위의 예시와 동일하게 Navbar.Toggle는 Navbar.Collapse와 함께 사용됩니다.
Navbar.Brand
Navbar.Brand는 네비게이션 바에서 브랜드 로고나 이름을 표시하는 컴포넌트입니다. 보통 네비게이션 바의 가장 왼쪽에 위치하며, 브랜드를 나타내는 로고나 텍스트로 사용됩니다.

사용 예시:
jsx
코드 복사
<Navbar.Brand href="#home">Brand</Navbar.Brand> */}


						<Nav className="me-auto">
							{/* <Nav.Link href="#home"></Nav.Link> */}
							<NavDropdown title="도서관리" id="basic-nav-dropdown">
								<NavDropdown.Item  href="/">도서 홈페이지</NavDropdown.Item>
								<NavDropdown.Item href="/books/search">도서검색</NavDropdown.Item>
								<NavDropdown.Item href="/books/list">
									도서목록
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
							</NavDropdown>
							<NavDropdown title="고객관리" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
							</NavDropdown>
							<NavDropdown title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
							</NavDropdown>{' '}
							<NavDropdown title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
							</NavDropdown>
							<NavDropdown title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
								
							</NavDropdown>
						</Nav>
						{uid ? (
							<>
								<Nav>
									<Nav.Link href="/users/mypage" className="active me-3">
										<span className="ms-1">{user.uname}님</span>
									</Nav.Link>
								</Nav>
								<Nav>
									<Nav.Link href="#" onClick={onClickLogout}>
										로그아웃
									</Nav.Link>
								</Nav>
							</>
						) : (
							<Nav>
								<Nav.Link href="/users/login">로그인</Nav.Link>
							</Nav>
						)}
					</Navbar.Collapse>
				</Container>
				
			</Navbar>
			<RouterPage />
		</>
	);
};

export default MenuPage;
