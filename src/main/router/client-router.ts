import { Router } from "express";
import ClientRepositoryImpl from "../../clients/adapter/repository/client-repository-impl";
import CreateClientUseCaseImpl from "../../clients/adapter/usecase/create-client-usecase-impl";
import CreateClientController from "../../clients/controller/create-client/create-client-controller";
import RealEmailService from "../../infra/email/adapter/stub-email-service";

const clientRouter = Router();

const emailService = new RealEmailService();
const clientRepository = new ClientRepositoryImpl();

const createClientController = new CreateClientController(
  new CreateClientUseCaseImpl(clientRepository, emailService)
);

clientRouter.post(
  "/",
  createClientController.handle.bind(createClientController)
);

export default clientRouter;
