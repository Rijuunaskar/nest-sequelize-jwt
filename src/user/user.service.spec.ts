import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { LoginDto, RegisterDto } from './user.dto';
import { User } from '../../models/User.entity';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../models/Role.entity';
import * as bcrypt from 'bcrypt';

jest.mock('@nestjs/jwt');  // Mock JwtService
jest.mock('../../models/User.entity', () => ({
  User: {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    destroy: jest.fn()
  },

}));
jest.mock('bcrypt', () => {
  return {
    __esModule: true,
    ...jest.requireActual('bcrypt')
  };
});


describe('UserService', () => {
  let service: UserService;
  let mockUserCreate: jest.Mock = User.create as jest.Mock;
  let mockUserFindAll: jest.Mock = User.findAll as jest.Mock;
  let mockUserFindOne: jest.Mock = User.findOne as jest.Mock;
  let mockUserDestroy: jest.Mock = User.destroy as jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked_token'), // Mock the `sign` method
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should successfully register a user', async () => {
    const dto: RegisterDto = {
      name: 'testuser',
      email: 'testuser@example.com',
      role_id: 2,
      primary_mobile: 981201112,
      password: 'password123',
      confirm_password: 'password123',
    };

    const mockUserEntity = {
      ...dto,
      id: 1,
      password: 'hashedpassword',
    };
    mockUserCreate.mockResolvedValue(mockUserEntity);
    const result = await service.register(dto, {} as Request, {} as Response);

    expect(result.code).toBe(200);
    expect(result.success).toBe(true);
    expect(result.resp.name).toBe(dto.name);
    expect(mockUserCreate).toHaveBeenCalledWith(dto);
  });

  it('should return an error if passwords do not match', async () => {
    const dto: RegisterDto = {
      name: 'testuser',
      email: 'testuser@example.com',
      role_id: 2,
      primary_mobile: 981201112,
      password: 'password123',
      confirm_password: 'password12',
    };

    const result = await service.register(dto, {} as Request, {} as Response);

    expect(result.code).toBe(400);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Password not matched!');
  });

  it('should successfully fetch a list of users', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'testuser',
        email: 'testuser@example.com',
        role_id: 2,
        primary_mobile: 981201112,
      },
    ];

    const mockRoles = [
      {
        id: 2,
        name: 'admin',
      },
    ];

    mockUserFindAll.mockResolvedValue(mockUsers);
    Role.findAll = jest.fn().mockResolvedValue(mockRoles);
    const result = await service.list({} as Request, {} as Response);

    expect(result.code).toBe(200);
    expect(result.success).toBe(true);
    expect(result.data.length).toBe(1);
    expect(result.data[0].name).toBe(mockUsers[0].name);
    expect(result.data[0].email).toBe(mockUsers[0].email);
    expect(result.data[0].role_id).toBe(mockUsers[0].role_id);
    expect(result.data[0].primary_mobile).toBe(mockUsers[0].primary_mobile);
  });

  it('should return unathorized if wrong credential', async () => {
    const mockUsers = {
      id: 1,
      name: 'testuser',
      email: 'testuser@example.com',
      role_id: 2,
      primary_mobile: 981201112,
      password: 'hashed password'
    };
    const dto: LoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    mockUserFindOne.mockResolvedValue(mockUsers);
    const result = await service.login(dto, {} as Request, {} as Response);
    expect(result.code).toBe(401);
    expect(result.success).toBe(false);
  });

  it('should successfully login', async () => {
    const mockUsers = {
      id: 1,
      name: 'testuser',
      email: 'testuser@example.com',
      role_id: 2,
      primary_mobile: 981201112,
      password: 'hashed password'
    };
    const dto: LoginDto = {
      email: 'testuser@example.com',
      password: 'password123',
    };
    jest.spyOn(bcrypt,'compare').mockResolvedValue(true);
    mockUserFindOne.mockResolvedValue(mockUsers);
    const result = await service.login(dto, {} as Request, {} as Response);
    expect(result.code).toBe(200);
    expect(result.success).toBe(true);
  });

  it('Should return 400 if no params/query found', async () => {
    let req = {};
    req['params'] = { }
    jest.spyOn(bcrypt,'compare').mockResolvedValue(true);
    mockUserDestroy.mockResolvedValue(1);
    const result = await service.delete(req as Request, {} as Response);
    expect(result.code).toBe(400);
    expect(result.success).toBe(false);
  });

  it('Should delete the user', async () => {
    let req = {};
    req['params'] = {id:1 }
    jest.spyOn(bcrypt,'compare').mockResolvedValue(true);
    mockUserDestroy.mockResolvedValue(1);
    const result = await service.delete(req as Request, {} as Response);
    expect(result.code).toBe(200);
    expect(result.success).toBe(true);
  });
});