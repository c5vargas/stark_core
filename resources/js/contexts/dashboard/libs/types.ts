export interface SimpleStatsType {
	title: string,
	amount: number,
	duration: Duration,
	avg: number,
}

export enum Duration {
	Daily,
	Weekly,
	Monthly,
	Yearly
}