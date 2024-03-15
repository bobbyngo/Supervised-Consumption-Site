


import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { NavBar } from './Component/NavBar';
// import { QuestionForm } from './Component/QuestionForm';
import { Login, NewPassword, PasswordReset, Registration} from './Pages/Authentication';
import { ClientIntakeForm, IncidentReportForm, ReferralForm, QuestionForm, ClientForm } from './Pages/Forms';
import './App.css';


function App() {
	return (
		<div>
			{/* <NavBar /> */}
			<BrowserRouter>
				<Routes path='/' element={<Login />}>
					<Route path='Login' element={<Login />} />
					<Route path='PasswordReset' element={<PasswordReset />} />
					<Route path='NewPassword' element={<NewPassword />} />
					<Route path='Registration' element={<Registration />} />
					<Route path='ClientIntakeForm' element={<ClientIntakeForm />} />
					<Route path='IncidentReportForm' element={<IncidentReportForm />} />
					<Route path='ReferralForm' element={<ReferralForm />} />
					{/* <Route path='CreateForm' element={<CreateForm />} /> */}
					<Route path='QuestionForm' element={<QuestionForm />} />
					<Route path='ClientForm' element={<ClientForm />} />
				</Routes>
			</BrowserRouter>
			<div id='footer'>&copy; COPYRIGHT 2024 SCS GROUP PROJECT, INC </div> 
		</div>
	);
}

export default App;