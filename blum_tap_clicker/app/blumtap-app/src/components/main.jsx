import React, { useState, useEffect } from 'react'
import { SendFill } from 'react-bootstrap-icons'
import { Command } from '@tauri-apps/api/shell'
import { invoke } from "@tauri-apps/api"

function Main({ token, setOutput, setShow }) {
	const [state, setState] = useState(false)
  const [isButtonLocked, setIsButtonLocked] = useState(false)
  const [scriptProcess, setScriptProcess] = useState(null)
  const blumtap = Command.sidecar('../bin/blumtap')

  const handleMessage = text => {
    setOutput(text)
    setShow(true)
  }

  const runScript = async () => {
    setScriptProcess(await blumtap.spawn())
  }

  const stopScript = async () => {
      if (scriptProcess) {
				scriptProcess.kill()
				.then(() => {
						setScriptProcess(null)
						handleMessage('Script has been stopped')
				})
				.catch(() => {
					handleMessage('Error stopping process')
				})
				invoke('close_script')
      } else {
				handleMessage('No script running')
			}
  }

	useEffect(() => {
		const btn = document.getElementById('toggleButton')
		blumtap.stdout.on('data', data => {
			handleMessage(data)
			if (data.includes('Run') || data.includes('Stop')) {
				btn.classList.toggle('active')
				setState(false)
				setScriptProcess(null)
			}
		})
		if (state && !token) {
			btn.classList.toggle('active')
			stopScript()
			setState(false)
		}
	}, [state, token])

	const runEvent = async () => {
		const btn = document.getElementById('toggleButton')
		if (token) {
			btn.classList.toggle('active')
			setState(!state)
			!state ? runScript() : stopScript()
		} else {
			if (!isButtonLocked) {
				const clickerText = document.getElementById('clickerState')
				btn.classList.toggle('inactive')
				clickerText.innerHTML = 'Пожалуйста, войдите в систему'
				clickerText.style = 'color: red'
				setIsButtonLocked(true)
				setTimeout(() => {
					btn.classList.toggle('inactive')
					clickerText.style = 'color: white'
					clickerText.innerHTML = 'Clicker отключен'
					setIsButtonLocked(false)
				}, 2000)
			}
		}
	}

	return (
		<div>
			<div className='div-help pt-2'>
				<p className='help-user'>Нажмите на кнопку, чтобы включить</p>
			</div>
			<div className='pt-2'>
				<div className='centralize-button-clicker'>
					<button
						id='toggleButton'
						className='button-start-clicker p-5'
						onClick={() => runEvent()}
					>
						<SendFill color='black' size={(65, 65)} />
					</button>
				</div>
				<div className='text-center pt-3'>
					{state ? (
						<p style={{ color: '#3de613' }}>
							Clicker включен
							<br />
							Нажмите на q дважды, чтобы выключить
						</p>
					) : (
						<p id='clickerState'>Clicker отключен</p>
					)}
				</div>
			</div>
			<div className='d-flex justify-content-center text-center fixed-bottom'>
				{token ? (
					<p className='p-5'>Ваш ID: {token}</p>
				) : (
					<p className='p-5'>Ваш ID: none-id</p>
				)}
			</div>
		</div>
	)
}

export default Main
