import React, { useEffect, useState } from 'react'
import BlumDataService from './services/service'
import Cookies from 'js-cookie'
import { Routes, Route, Link } from 'react-router-dom'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CSSTransition } from 'react-transition-group'

import { Fingerprint, GearWideConnected } from 'react-bootstrap-icons'
import { Dropdown, Button, DropdownButton, Alert } from 'react-bootstrap'
import Login from './components/login'
import Register from './components/register'
import Main from './components/main'

function App() {
	const [user, setUser] = useState(null)
	const [token, setToken] = useState(null)
	const [output, setOutput] = useState('')
	const [show, setShow] = useState(false)
	const [password, setPassword] = useState('')

	useEffect(() => {
		const token = Cookies.get('token')
		const user = Cookies.get('user')
		if (token && user) {
			setToken(token)
			setUser(user)
		}
		if (show) {
			setTimeout(() => {
				setShow(false)
				setTimeout(() => setOutput(''), 500)
			}, 4000)
		}
	}, [show])

	async function login(user = null) {
		BlumDataService.login(user)
			.then(response => {
				setToken(response.data.token)
				setUser(user.username)
				Cookies.set('token', response.data.token, { expires: 2 })
				Cookies.set('user', user.username, { expires: 2 })
			})
			.catch(error => {
				console.error('ERROR_LOGIN', error)
			})
	}

	async function register(user = null) {
		BlumDataService.register(user)
			.then(response => {
				setToken(response.data.token)
				setPassword(response.data.password)
				setUser(user.username)
				Cookies.set('token', response.data.token, { expires: 2 })
				Cookies.set('user', user.username, { expires: 2 })
			})
			.catch(error => {
				console.error('ERROR_SIGNUP', error)
			})
	}

	async function logout() {
		setToken('')
		setUser('')
		setOutput('')
		Cookies.remove('token')
		Cookies.remove('user')
	}

	return (
		<div className='App'>
			<div className='p-2'>
				<h1 style={{ color: 'white' }}>
					<div>
						<Link
							to={'/'}
							style={{ color: 'white', textDecoration: 'none' }}
						>
							<Fingerprint className='me-1' color='white' /> blum tap
						</Link>
						<div className='div-btn-without-style'>
							<DropdownButton
								className='btn-without-style btn-without-caret'
								variant='link'
								title={<GearWideConnected size={30} color='white' />}
							>
								{user ? (
									<>
										<Dropdown.Item onClick={logout}>
											Log Out ({user})
										</Dropdown.Item>
									</>
								) : (
									<>
										<Dropdown.Item as={Link} to={'/login'} >
											Log In
										</Dropdown.Item>
										<Dropdown.Item as={Link} to={'/signup'} >
											Sign Up
										</Dropdown.Item>
									</>
								)}
							</DropdownButton>
						</div>
					</div>
				</h1>
				<CSSTransition in={show} timeout={500} classNames='alert' unmountOnExit>
					<div className='d-flex justify-content-center'>
						<Alert variant='success'>
							<Alert.Heading>Вывод:</Alert.Heading>
							<p>{output}</p>
						</Alert>
					</div>
				</CSSTransition>
				{password && (
					<div
						className='d-flex justify-content-center text-center help-user-p'
						style={{ height: '60px' }}
					>
						<Button
							variant='dark'
							onClick={() => {
								navigator.clipboard.writeText(password)
								setPassword('')
							}}
						>
							Ваш пароль: {password}
							<br />
							Кликните, чтобы скопировать
						</Button>
					</div>
				)}
			</div>
			<div className='container mt-4'>
				<Routes>
					<Route
						exact
						path='/'
						element={
							<Main
								token={token}
								setOutput={setOutput}
								setShow={setShow}
							/>
						}
					/>
					<Route path='/login' element={<Login login={login} />} />
					<Route path='/signup' element={<Register register={register} />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
