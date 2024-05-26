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

import { StockData } from '../../../modules/stockData/domain'

import { UserStockPreference } from '../../../modules/userStockPreference/domain'

import { Alert } from '../../../modules/alert/domain'

import { AiInsight } from '../../../modules/aiInsight/domain'

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  symbol: string

  @Column({})
  name: string

  @Column({ nullable: true })
  sector?: string

  @Column({ nullable: true })
  industry?: string

  @OneToMany(() => StockData, child => child.stock)
  stockDatas?: StockData[]

  @OneToMany(() => UserStockPreference, child => child.stock)
  userStockPreferences?: UserStockPreference[]

  @OneToMany(() => Alert, child => child.stock)
  alerts?: Alert[]

  @OneToMany(() => AiInsight, child => child.stock)
  aiInsights?: AiInsight[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
