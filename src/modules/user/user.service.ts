import { Injectable } from '@nestjs/common';

const userList = [
  {
    id: 0,
    name: '张三',
  },
  {
    id: 1,
    name: '李四',
  },
];

type User = {
  id: number,
  name: string,
};

@Injectable()
export class UserService {
  async list(): Promise<User[]> {
    return userList;
  }

  async detail(id: number) {
    return userList.find(item => item.id === id);
  }

  async add(user: User) {
    userList.push(user);
    return true;
  }

  async update(user: User) {
    userList.forEach(item => {
      if(item.id === user.id) {
        item.name = user.name;
      }
    });
    return true;
  }

  async delete(id: number) {
    const index = userList.findIndex(item => item.id === id);
    userList.splice(index,1);
    return true;
  }
}
