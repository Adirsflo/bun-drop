class localStorageManager {
  static getLocalStorage(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error getting local storage item:", error);
      return null;
    }
  }

  static setLocalStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting local storage item:", error);
    }
  }
}

export default localStorageManager;
