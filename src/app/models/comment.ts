export class Comment{
    userId   :String;
    userName :String;
    text     :String;

    constructor(userId:String, userName:String, text:String){
        this.userId   = userId;
        this.userName = userName;
        this.text     = text;
    }
}