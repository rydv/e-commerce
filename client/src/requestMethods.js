import axios from "axios";

const BASE_URL = "http://localhost:5001/api/";
const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzgzZThlNjFlOTc2Y2MyNTdhODNkNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTQ3MDIwOSwiZXhwIjoxNjgxNzI5NDA5fQ.TDlY1JlFmCUuaY9dki_CKzIEvUfXwu_1n5CmFL3ZUk0"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
})