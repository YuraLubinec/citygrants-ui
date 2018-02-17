export class Comment{
    id       :String;
    userId   :String;
    userName :String;
    text     :String;
    date     :Date;

    constructor(id:String, userId:String, userName:String, text:String, date:Date){
        this.id       = id;
        this.userId   = userId;
        this.userName = userName;
        this.text     = text;
        this.date     = date;
    }
}