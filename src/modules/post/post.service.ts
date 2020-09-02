import { Injectable } from '@nestjs/common';

type Post = {
  id: number,
  title: string,
  content: string,
};

const postList = [
  {
    id: 0,
    title: '帖子一',
    content: '内容一',
  },
  {
    id: 1,
    title: '帖子二',
    content: '内容二',
  },
];


@Injectable()
export class PostService {
  async list(): Promise<Post[]> {
    return postList;
  }

  async detail(id: number) {
    return postList.find(item => item.id === id);
  }

  async add(post: Post) {
    postList.push(post);
    return true;
  }

  async update(post: Post) {
    postList.forEach(item => {
      if(item.id === post.id) {
        item.title = post.title;
        item.content = post.content;
      }
    });
    return true;
  }

  async delete(id: number) {
    const index = postList.findIndex(item => item.id === id);
    postList.splice(index,1);
    return true;
  }
}
