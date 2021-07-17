import React from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';


export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState('');

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Connect</strong> to your friends, and family to send instant messages</p>
          <p><strong>Discover</strong> new people through your friends' friends</p>
          <p><strong>Share</strong> your videos, pictures and hobbies in one place</p>
        </section>

        <section className="formArea">
          <form className="box" action='/' onSubmit={(eventInfos) => {
            eventInfos.preventDefault();
              console.log('User: ', githubUser);
              fetch('https://alurakut.vercel.app/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({githubUser: githubUser})
              })
              .then(async (serverResponse) => {
                const reponseData = await serverResponse.json();
                const token = reponseData.token;
                nookies.set(null, 'USER_TOKEN', token, {
                  path: '/',
                  masAge: 86400 * 7
                })
                router.push('/')
              })
            }}>
            <p>
              Access now using your <strong>GitHub Account</strong>!
          </p>
            <input 
            placeholder="User" 
            value={githubUser} 
            onChange={(eventInfo) => {
              console.log(eventInfo.target.value);
              setGithubUser(eventInfo.target.value);
            }}/>
            <button type="submit">
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Are you not a member? <br />
              <a href="/login">
                <strong>
                  Register now
              </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">About o Orkut.br</a> - <a href="/">Security Center</a> - <a href="/">Privacy</a> - <a href="/">Terms</a> - <a href="/">Contacts</a>
          </p>
        </footer>
      </div>
    </main>
  )
} 