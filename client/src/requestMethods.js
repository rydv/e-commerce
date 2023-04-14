import axios from "axios";

const BASE_URL = "http://localhost:5001/api/";
const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzgzZThlNjFlOTc2Y2MyNTdhODNkNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTQ2NjExNCwiZXhwIjoxNjgxNzI1MzE0fQ.Ld8kVMvo9eBOYqorGgpTM8qa5zzLbug6jkTSWOhKIn8"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
})