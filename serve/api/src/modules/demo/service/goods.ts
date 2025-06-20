import { DemoGoodsEntity } from './../entity/goods';
import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

/**
 * 商品示例
 */
@Provide()
export class DemoGoodsService extends BaseService {
  @InjectEntityModel(DemoGoodsEntity)
  demoGoodsEntity: Repository<DemoGoodsEntity>;

  @Inject()
  ctx;

  /**
   * 执行sql分页
   */
  async sqlPage(query) {
    await this.demoGoodsEntity.save({
      id: 1,
      title: '标题',
      price: 99.0,
      description: '商品描述',
      mainImage: '',
    });
    return this.sqlRenderPage(
      'select * from demo_goods ORDER BY id ASC',
      query,
      false
    );
  }

  /**
   * 执行entity分页
   */
  async entityPage(query) {
    const find = this.demoGoodsEntity.createQueryBuilder();
    return this.entityRenderPage(find, query);
  }
}
