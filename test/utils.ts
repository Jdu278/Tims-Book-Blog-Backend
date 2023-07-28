import { Role } from '../src/auth/models/roles.model';
import { CreateAdminDto } from '../src/users/dto/create-user.dto';

export const userAdmin: CreateAdminDto = {
  email: 'test@example.com',
  password: '$2b$10$4KXr.qChGtoo5b8aYQNuH.L5cWLDIXz/N2ollt5vttSSquHD9Ng2C', //password = test123
  firstName: 'Maria',
  lastName: 'Galland',
  role: Role.ADMIN,
};

export const userLogin = {
  ...userAdmin,
  password: 'test123',
};

export const userCustomer = {
  email: 'test@customer.com',
  password: 'test123',
  firstName: 'Maria',
  lastName: 'Galland',
};
