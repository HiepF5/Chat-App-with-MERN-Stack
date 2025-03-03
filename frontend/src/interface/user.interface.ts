
export interface IUser {
    _id: string;
    fullName: string;
    username: string;
    gender: "male" | "female" | "other"; // Giới hạn giá trị cho gender
    profilePicture: string;
    __v: number;
}