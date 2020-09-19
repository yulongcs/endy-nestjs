import NodeSSO from 'node-sso';

class JWT {
  private nodeSSO: NodeSSO;
  constructor (secret: string) {
    this.nodeSSO = new NodeSSO(secret);
  }

  /**
   * 根据用户信息生成一个token
   * @param user 
   */
  public createToken(user: string | { [propsName: string]: any }): string {
    return this.nodeSSO.generateToken(user);
  }

  /**
   * 解析token返回token中的用户信息
   * @param token 
   */
  public decodeToken(token: string): string | null {
    return this.nodeSSO.decryptToken(token);
  }

}

export const jwt = new JWT(process.env.SECRET);