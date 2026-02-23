import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // 查询所有用户
  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(Array.isArray(data) ? data : []);
  };

  // 创建用户
  const createUser = async () => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email })
    });
    await fetchUsers();
  };

  // 删除用户
  const deleteUser = async (id) => {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    await fetchUsers();
  };

  // 更新用户
  const updateUser = async () => {
    await fetch(`/api/users/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: editUsername, email: editEmail })
    });
    await fetchUsers();
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={fetchUsers} style={{marginLeft: '10px'}}>查询所有用户</button>
        <div style={{marginTop: '20px'}}>
          <input placeholder="用户名" value={username} onChange={e => setUsername(e.target.value)} />
          <input placeholder="邮箱" value={email} onChange={e => setEmail(e.target.value)} />
          <button onClick={createUser}>新增用户</button>
        </div>
        <div style={{marginTop: '20px'}}>
          <input placeholder="用户ID" value={editId} onChange={e => setEditId(e.target.value)} />
          <input placeholder="新用户名" value={editUsername} onChange={e => setEditUsername(e.target.value)} />
          <input placeholder="新邮箱" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
          <button onClick={updateUser}>更新用户</button>
        </div>
        <ul>
          {users.map(u => (
            <li key={u.id}>
              {u.username} ({u.email})
              <button onClick={() => deleteUser(u.id)} style={{marginLeft: '10px'}}>删除</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App
