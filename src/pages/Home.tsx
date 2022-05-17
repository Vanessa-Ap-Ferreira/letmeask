import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';
import googleImg from '../assets/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function Home() {
  const navigate = useNavigate();
  const { singInWithGoogle, user } = useAuth();

  async function handleCreateRoom() {  
    if(!user) {
      await singInWithGoogle()
    }  
    navigate('/room/new')
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie uma salas de Q&amp;A ao-vivo</strong>
        <p>Tire dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt="Logo Letmeask" />
          <button 
            onClick={handleCreateRoom}
            className="create-room"
          >
            <img src={googleImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className='separator'>Ou entre em uma sala</div>
          <form>
            <input 
              type='text' 
              placeholder='Digite o código da sala'
            />
            <Button type='submit'>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}