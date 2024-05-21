import { Timestamp } from "firebase/firestore";

export interface Todo {
    title: string,
    description?: string,
    dueDate: Timestamp,
    attachment: string,
    id: string
}