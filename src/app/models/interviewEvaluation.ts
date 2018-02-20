export class InterviewEvaluation{

    juryMemberId  :string;
    juryMemberName:string;
    evaluation    :Number;

    constructor(juryMemberId :string, juryMemberName:string, evaluation:Number){
        this.juryMemberId   = juryMemberId;
        this.juryMemberName = juryMemberName;
        this.evaluation     = evaluation;
    }
}