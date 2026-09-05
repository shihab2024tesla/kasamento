import { mockApi } from "./mockApi";

const TOKEN_KEY = "kasamento.auth.token";
const USER_KEY = "kasamento.auth.user";

function readFrom(storage) {
  const token = storage.getItem(TOKEN_KEY);
  const rawUser = storage.getItem(USER_KEY);
  if (!token || !rawUser) return null;

  try {
    return { token, user: JSON.parse(rawUser) };
  } catch {
    return null;
  }
}

function clearFrom(storage) {
  storage.removeItem(TOKEN_KEY);
  storage.removeItem(USER_KEY);
}

/**
 * Reads the persisted session synchronously. "Remember me" sessions live in
 * localStorage (survive browser restarts); sessions without it live in
 * sessionStorage (cleared when the tab closes).
 */
function readPersistedSession() {
  return readFrom(window.localStorage) ?? readFrom(window.sessionStorage);
}

export const authService = {
  async login(identifier, password, rememberMe) {
    const { token, user } = await mockApi.login(identifier, password);

    const storage = rememberMe ? window.localStorage : window.sessionStorage;
    const other = rememberMe ? window.sessionStorage : window.localStorage;

    clearFrom(other);
    storage.setItem(TOKEN_KEY, token);
    storage.setItem(USER_KEY, JSON.stringify(user));

    return user;
  },

  async logout() {
    await mockApi.logout();
    clearFrom(window.localStorage);
    clearFrom(window.sessionStorage);
  },

  async getCurrentUser() {
    const session = readPersistedSession();
    return session?.user ?? null;
  },

  isAuthenticated() {
    return readPersistedSession() !== null;
  },
};
