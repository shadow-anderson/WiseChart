import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from '../../../modules/user/domain'

import { Stock } from '../../../modules/stock/domain'

@Entity()
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  criteria: string

  @Column({})
  notificationMethod: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.alerts)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  stockId: string

  @ManyToOne(() => Stock, parent => parent.alerts)
  @JoinColumn({ name: 'stockId' })
  stock?: Stock

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
