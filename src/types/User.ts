import {z} from "zod";
import {userSchema} from "@/schemas/users";

export type TUser = z.infer<typeof userSchema> & {
	createdAt?: Date;
	updatedAt?: Date;
};