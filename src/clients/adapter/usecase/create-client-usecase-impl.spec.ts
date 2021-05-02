import StubEmailService from "../../../infra/email/adapter/stub-email-service";
import { EmailService } from "../../../infra/email/email-service";
import CreateClientDTO from "../../dto/create-client-dto";
import { EmailAlreadyUsedError } from "../../errors/client-error";
import ClientRepository from "../../repository/client-repository";
import CreateClientUseCaseImpl from "./create-client-usecase-impl";

describe('Create client usecase', () => {
    
    let clientRepository: ClientRepository;

    let emailService: EmailService;


    beforeAll(() => {
        emailService = new StubEmailService();
    });

    beforeEach(() => {
        clientRepository = {
            countByEmail: jest.fn(),
            save: jest.fn()
        };    
    });

    it ('should be create a client with success', async () => {

        (clientRepository.countByEmail as jest.Mock).mockReturnValueOnce(Promise.resolve(0));
        clientRepository.save = jest.fn().mockReturnValueOnce(Promise.resolve());
        const saveSpy = jest.spyOn(clientRepository, 'save');

        const createClientDTO = new CreateClientDTO();
        
        createClientDTO.birthday = new Date(1991, 4, 5);
        createClientDTO.email='john@doe.com';
        createClientDTO.name= 'John Doe';

        const createClientUseCase = new CreateClientUseCaseImpl(clientRepository, emailService);
        await createClientUseCase.create(createClientDTO);
        expect(saveSpy).toHaveBeenCalled();
    });

    it ('should not be create a client with e-mail already used', async () => {

        (clientRepository.countByEmail as jest.Mock).mockReturnValueOnce(Promise.resolve(1));
        
        const createClientDTO = new CreateClientDTO();
        
        createClientDTO.birthday = new Date(1991, 4, 5);
        createClientDTO.email='john@doe.com';
        createClientDTO.name= 'John Doe';

        const createClientUseCase = new CreateClientUseCaseImpl(clientRepository, emailService);
        expect(createClientUseCase.create(createClientDTO)).rejects.toThrow(new EmailAlreadyUsedError());
        
    });
})