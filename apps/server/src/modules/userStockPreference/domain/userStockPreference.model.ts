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
export class UserStockPreference {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  chartSettings?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.userStockPreferences)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  stockId: string

  @ManyToOne(() => Stock, parent => parent.userStockPreferences)
  @JoinColumn({ name: 'stockId' })
  stock?: Stock

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
