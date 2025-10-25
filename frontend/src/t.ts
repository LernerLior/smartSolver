const API = 'https://crudcrud.com/api/ff85e1da5af94605a9834c97a0e73f19';

export async function http<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) msg += ` - ${data.error}`;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  // 204 sem corpo
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
