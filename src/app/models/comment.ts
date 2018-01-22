export class Comment{
    userId   :String;
    userName :String;
    text     :String;
    date     :Date;

    constructor(userId:String, userName:String, text:String, date:Date){
        this.userId   = userId;
        this.userName = userName;
        this.text     = text;
        this.date     = date;
    }
}