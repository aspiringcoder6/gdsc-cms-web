export default interface IUser {
    isLoggedIn: boolean;
    info: IUserInfo;
}

export interface IUserInfo {
    uid: string;
    photoURL: string | null;
    email: string;
    role: string;
    displayName: string | null;
}
