import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
<button onClick={() => navigate('/')}>Back</button>
export default function hobbies() {
  return (
    <div style={{ color: 'white', padding: '2rem', background: '#111', height: '100vh' }}>
      <h2>My Resume</h2>
      <p>Education, experience, etc.</p>
    </div>
  );
}
