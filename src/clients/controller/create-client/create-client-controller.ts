import { Request, Response } from "express";
import * as yup from "yup";
import createClientSchemaValidator from "./create-client-schema-validator";
import CreateClientDTO from "../../dto/create-client-dto";
import { EmailAlreadyUsedError } from "../../errors/client-error";
import CreateClientUseCase from "../../usecase/create-client-usecase";

export default class CreateClientController {
  constructor(private createClientUseCase: CreateClientUseCase) {}

  private buildCreateClientDTO(req: Request): CreateClientDTO {
    const { body } = req;

    const validBody = createClientSchemaValidator.validateSync(body, {
      abortEarly: false,
    });

    const createClientDTO = new CreateClientDTO();
    Object.assign(createClientDTO, validBody);

    return createClientDTO;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const createClientDTO = this.buildCreateClientDTO(req);

      await this.createClientUseCase.create(createClientDTO);

      res.sendStatus(201);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        //the correct is send json detailed errors only development
        res.status(400).json(error.errors);
      } else if (error instanceof EmailAlreadyUsedError) {
        res.status(400).json(error.message);
      } else {
        res.sendStatus(500);
      }
    }
  }
}
