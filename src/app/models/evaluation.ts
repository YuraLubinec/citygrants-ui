export class Evaluation{

    juryMemberId        :String;
    juryMemberLogin     :String;
    juryMemberFullName  :String;
    evalActual          :Number;
    evalIntelligibility :Number;
    evalCompetence      :Number;
    evalStability       :Number;
    evalEfficiency      :Number;
    evalInnovation      :Number;
    evalAttracting      :Number;
    evalParticipation   :Number;

    constructor(
        juryMemberId?        :String, 
        juryMemberLogin?     :String,
        juryMemberFullName?  :String,
        evalIntelligibility? :Number,
        evalActual?          :Number,
        evalCompetence?      :Number,
        evalStability?       :Number,
        evalEfficiency?      :Number,
        evalInnovation?      :Number,
        evalEvalAttracting?  :Number,
        evalParticipation?   :Number){

        this.juryMemberId        = juryMemberId;
        this.juryMemberLogin     = juryMemberLogin;
        juryMemberFullName       = juryMemberFullName
        this.evalActual          = evalActual;
        this.evalIntelligibility = evalIntelligibility;
        this.evalCompetence      = evalCompetence;
        this.evalStability       = evalStability;
        this.evalEfficiency      = evalStability;
        this.evalInnovation      = evalInnovation;
        this.evalAttracting      = evalEvalAttracting;
        this.evalParticipation   = evalParticipation;
    }
}