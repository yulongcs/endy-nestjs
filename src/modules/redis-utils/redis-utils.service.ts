import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisUtilsService {
  public client: Redis;
  constructor (
    private redisService: RedisService
  ) { }

  onModuleInit(): void {
    this.getClient();
  }

  public getClient(): void {
    this.client = this.redisService.getClient();
  }

  /**
   * 设置redis存储
   * @param key 
   * @param value 
   * @param second 
   */
  public async set(key: string, value: { [propsName: string]: any } | string, second?: number): Promise<void> {
    value = JSON.stringify(value);
    // 如果没有传递时间就默认时间
    if (!second) {
      await this.client.setex(key, 24 * 60 * 60, value); // 秒为单位
    } else {
      await this.client.set(key, value, 'EX', second);
    }
  }

  /**
   * 获取redis存储
   * @param key 
   */
  public async get(key: string): Promise<any> {
    const data = await this.client.get(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  /**
   * 根据key删除redis缓存数据
   * @param key 
   */
  public async del(key: string): Promise<any> {
    await this.client.del(key);
  }

  /**
   * 清空redis的缓存
   */
  public async flushall(): Promise<any> {
    await this.client.flushall();
  }

}
