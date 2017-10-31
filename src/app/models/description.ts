export class Description {

    name: string;
    requestedBudget: string;
    organizationName: string;
    theme: string;
    requiredTime: string;
    coordinatorName: string;
    coordinatorPhone: string;
    coordinatorEmail: string;
    projectMembers: string;
    expirienceDescription: string;
    address: string;
    webaddress: string;
    goal: string;
    actuality: string;
    fullDescription: string;
    targetGroup: string;
    expectedResults: string;
    requiredPermissions: string;
    partners: string;

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