import './RegisterView.css'

import { useState }  from 'react'
import { useNavigate } from 'react-router-dom';

import { register } from '../../services';

import Input from '../../Componentes/Input/Input';
import Button from '../../Componentes/Button/Button';
import Imagen from '../../assets/image/Imagenes/Darlin-01.png';

function RegisterView() {

  const navigate = useNavigate();

  const [users, setUsers] = useState({ userName: '', pasword: '' });
  const [handleAccessloader, setHandleAccessloader] = useState(false);
  const [userExist, setUserExist] = useState(null);

  const onChange = (e) => {
    const { value, name } = e.target;

    setUsers({
      ...users,
      [name]: value
    })
  }

  const handleSendFormulary = async (e) => {
    e.preventDefault();

    setHandleAccessloader(true);

    const res = await register(users.userName, users.pasword);

    if (res.message === 'User already exist') {

      setUserExist(true);
      setHandleAccessloader(false);

      setTimeout(() => {
        setUserExist(false);
      }, 3000);

      return;
      
    }

    handleAccessLogin();
  }

  const handleAccessLogin = () => {
    navigate('/login');
  }

  return (
    <div className='container-register'>
      <div className='container-top-register'>
        <div className='container-image-register' >
          <img className='image-register'
            alt='Logo'
            src={Imagen}
          />
        </div>

        <div className='container-log-out-register'>
          <button className='button-log-out-register'
            onClick={handleAccessLogin}>Login</button>
        </div>

      </div>

      <div className='sub-container-register'>
        <div className='container-title-register'>
          <h1 className='title-register'>Register Screen</h1>
        </div>

        <div className='container-input-register'>
          <form onSubmit={handleSendFormulary}>
            <Input
              required
              aboveInput='UserName'
              onChange={onChange}
              className
              name='userName'
              placeholder='UserName here'
              value={users.userName}
              type='email'
            />

            <Input
              required
              aboveInput='Pasword'
              onChange={onChange}
              className={true}
              name='pasword'
              placeholder='Pasword here'
              value={users.pasword}
              type='password'
            />

            

            {
              userExist
              && <p className='error-user-register'>
                This user already exists</p>
            }

            <div className='container-loader-register'>
              {handleAccessloader && <p className='loader'></p>}
            </div>

            <div className='container-button-register'>
              <Button
                type='submit'
                className={true}
                Text='Register'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default RegisterView;