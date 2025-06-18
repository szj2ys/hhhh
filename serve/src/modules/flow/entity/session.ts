import {BaseEntity, transformerJson, transformerTime} from '../../base/entity/base';
import {Column, Entity, Index} from 'typeorm';

/**
 * 流程日志
 */
@Entity('flow_session')
export class FlowSessionEntity extends BaseEntity {
  @Index()
  @Column({comment: '用户ID'})
  userId: number;

  @Column({comment: '会话key'})
  sessionKey: string;

  @Column({
    comment: 'desc',
    type: 'json',
    transformer: transformerJson,
    nullable: true,
  })
  desc: any;

  @Column({
    comment: '消息记录的顺序',
    nullable: true,
  })
  index: number;

  @Column({
    comment: '[[isShow, isVoice, isEnd, isNew, isAnimation]]',
    nullable: true,
  })
  status: number;
}
