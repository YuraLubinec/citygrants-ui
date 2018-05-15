import {Budget} from './budget';
import {Description} from './description';
import {Evaluation} from './evaluation';
import {InterviewEvaluation} from './interviewEvaluation';

export class ProjectApplJury {
  id: String;
  budget: Budget;
  description: Description;
  evaluation: Evaluation;
  comments: Array<Comment>
  confirmed: boolean;
  interviewEvaluation: InterviewEvaluation;
  approvedToSecondStag: boolean;

  constructor(id: String, budget: Budget, description: Description, confirmed: boolean, evaluation: Evaluation, comments: Array<Comment>, interviewEvaluation: InterviewEvaluation, approvedToSecondStag: boolean) {
    this.id = id;
    this.budget = budget;
    this.description = description;
    this.evaluation = evaluation;
    this.comments = comments;
    this.confirmed = confirmed;
    this.interviewEvaluation = interviewEvaluation;
    this.approvedToSecondStag = approvedToSecondStag;
  }

}
