import { LikesOutput } from "../../../database/models/Likes.model";
import { Like } from "../../interfaces/likes.interface";

export const toLike = (like: LikesOutput): Like => {
    return {
        EmployeeId: like.EmployeeId,
        PostId: like.PostId
    }
}