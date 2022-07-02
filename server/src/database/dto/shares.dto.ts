import { Optional } from "sequelize/types";

export type createSharesDto = {
    shareDate: string;
}

export type updateSharesDto = Optional<createSharesDto, "shareDate">