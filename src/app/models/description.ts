export class Description {

    private name: string;
    private requestedBudget: string;
    private organizationName: string;
    private theme: string;
    private requiredTime: string;
    private coordinatorName: string;
    private coordinatorPhone: string;
    private coordinatorEmail: string;
    private projectMembers: string;
    private expirienceDescription: string;
    private address: string;
    private webaddress: string;
    private goal: string;
    private actuality: string;
    private fullDescription: string;
    private targetGroup: string;
    private expectedResults: string;
    private requiredPermissions: string;
    private partners: string;

    constructor(name: string, requestedBudget: string, organizationName: string, coordinatorName: string, coordinatorPhone: string,
        coordinatorEmail: string, theme: string, requiredTime: string, projectMembers: string, expirienceDescription: string,
        address: string, webaddress: string, goal: string, actuality: string, fullDescription: string, targetGroup: string,
        expectedResults: string, requiredPermissions: string, partners: string
    ) {
        this.name = name;
        this.requestedBudget = requestedBudget;
        this.organizationName = organizationName;
        this.theme = theme;
        this.requiredTime = requiredTime;
        this.coordinatorName = coordinatorName;
        this.coordinatorPhone = coordinatorPhone;
        this.coordinatorEmail = coordinatorEmail;
        this.projectMembers = projectMembers;
        this.expirienceDescription = expirienceDescription;
        this.address = address;
        this.webaddress = webaddress;
        this.goal = goal;
        this.actuality = actuality;
        this.fullDescription = fullDescription;
        this.targetGroup = targetGroup;
        this.expectedResults = expectedResults;
        this.requiredPermissions = requiredPermissions;
        this.partners = partners;
    }

}