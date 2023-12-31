import axios from "axios";
import { format } from "date-fns";

export function authenticate(auth_token) {
    localStorage.setItem("user", auth_token);
}

export function isAuthenticated() {
    return localStorage.getItem("user") !== null;
}

export async function retrieveUser() {
    if (!isAuthenticated()) {
        return null;
    }

    try {
        const response = await axios.get("http://localhost/api/profile");
        return response.data;
    } catch (error) {
        console.error(error);

        if(error.response?.status === 401) {
            logout();
            return null;
        }


        throw new Error("Trouble fetching logged in user profile.")
    }
}

export function logout() {
    localStorage.removeItem("user");
}

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  export function formControlDateFormat(date) {
    return format(date, "yyyy-MM-dd'T'hh:mm")
  }