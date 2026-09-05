/**
 * Simulated backend. No real network calls are made — every method returns a
 * Promise with an artificial delay so the rest of the app can be written
 * exactly as it would against a real API.
 */

const randomDelay = (min = 500, max = 1000) =>
  new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min));

function makeToken() {
  return `mock.${Date.now().toString(36)}.${Math.random().toString(36).slice(2)}`;
}

function displayNameFromIdentifier(identifier) {
  const namePart = identifier.includes("@") ? identifier.split("@")[0] : identifier;
  return namePart
    .replace(/[._-]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ") || "Guest";
}

const VALID_USERNAME = "kasamento";
const VALID_PASSWORD = "kasamento101";

export const mockApi = {
  /**
   * Only accepts the fixed demo credentials (case-insensitive). Rejects if
   * either field is blank or the credentials don't match.
   */
  async login(identifier, password) {
    await randomDelay();

    if (!identifier?.trim() || !password?.trim()) {
      throw new Error("Please enter both your username and password.");
    }

    if (identifier.trim().toLowerCase() !== VALID_USERNAME || password.trim().toLowerCase() !== VALID_PASSWORD) {
      throw new Error("Invalid username or password.");
    }

    return {
      token: makeToken(),
      user: {
        id: makeToken(),
        identifier: identifier.trim(),
        name: displayNameFromIdentifier(identifier.trim()),
      },
    };
  },

  async logout() {
    await randomDelay(200, 400);
    return { success: true };
  },
};
