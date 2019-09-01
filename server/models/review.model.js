
export class Review {

	constructor(reviewId,sessionId, mentorId,userId,score, userFullName, remark) {
		this.reviewId = reviewId;
		this.sessionId = sessionId;
		this.mentorId = mentorId;
		this.userId = userId;
		this.score = score;
		this.userFullName = userFullName;
		this.remark = remark;
	}
}
export let reviews =[];

