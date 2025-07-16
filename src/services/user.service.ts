import { IUserRepository } from "../repositories/user.repository";

export interface IUserService {
  getUserById(id: number): Promise<{ phoneNumber: string }>;

  updateUser(
    id: number,
    data: { email?: string }
  ): Promise<{ phoneNumber: string; email?: string }>;
}

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getUserById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");

    return {
      phoneNumber: user.phoneNumber,
    };
  }

  async updateUser(id: number, data: { email?: string }) {
    const updatedUser = await this.userRepository.updateUser(id, data);
    return {
      phoneNumber: updatedUser.phoneNumber,
    };
  }
}
