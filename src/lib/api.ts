const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function login(username?: string, password?: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function getWidgets() {
  const res = await fetch(`${API_BASE}/widgets`);
  if (!res.ok) throw new Error('Failed to fetch widgets');
  return res.json();
}

export async function putWidgets(widgets: unknown[]) {
  const res = await fetch(`${API_BASE}/widgets`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ widgets }),
  });
  if (!res.ok) throw new Error('Failed to save widgets');
  return res.json();
}
