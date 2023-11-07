import * as z from "zod";

export const Request = z.object({
	id: z.number(),
	method: z.string(),
	path: z.string(),
	code: z.number(),
	request: z.string(),
	lambda: z.string(),
	response: z.string(),
	time: z.coerce.date(),
	duration: z.number(),
});
export type Request = z.infer<typeof Request>;

export const Requests = z.array(Request);
export type Requests = z.infer<typeof Requests>;
