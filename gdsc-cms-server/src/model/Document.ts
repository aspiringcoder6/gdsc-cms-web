export default interface Document {
    id: string;
    uid: string;
    title: string;
    team: "developer" | "media" | "event-pr-hr";
    group: string;
    content: string;
    createdDate: Date;
}
