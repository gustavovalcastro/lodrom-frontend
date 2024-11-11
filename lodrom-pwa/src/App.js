// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import StarterPage from './pages/starterPage';
import AboutPage from './pages/aboutPage';
import LoginPage from './pages/loginPage';
import ForgotPasswordPage from './pages/forgotPasswordPage';
import RegisterPage from './pages/registerPage';
import HomePage from './pages/homePage';
import HistoryPage from './pages/historyPage';
import NotesPage from './pages/Notes/notesPage';
import CreateNotePage from './pages/Notes/createNotePage';
import EditNotePage from './pages/Notes/editNotePages';
import DoorControlPage from './pages/Door Control/doorControlPage';
import CreatePINPage from './pages/Config/Pin Control/createPinPage';
import EditPINPage from './pages/Config/Pin Control/editPinPage';
import InsertPINPage from './pages/Door Control/insertPinPage';
import AccountDataPage from './pages/Config/Account/accountDataPage';
import PasswordRestorePage from './pages/Config/Account/passwordRestorePage'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<StarterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/historico" element={<HistoryPage />} />
            <Route path="/recados-cadastrados" element={<NotesPage />} />
            <Route path="/cadastrar-recado" element={<CreateNotePage />} />
            <Route path="/editar-recado/:id" element={<EditNotePage />} />
            <Route path="/controle-portao" element={<DoorControlPage />} />
            <Route path="/criar-pin" element={<CreatePINPage />} />
            <Route path="/editar-pin" element={<EditPINPage />} />
            <Route path="/inserir-pin" element={<InsertPINPage />} />
            <Route path="/dados-conta" element={<AccountDataPage />} />
            <Route path="/redefinir-senha" element={<PasswordRestorePage />} />

            {/* Outras rotas */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
