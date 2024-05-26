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

import { Stock } from '../../../modules/stock/domain'

@Entity()
export class AiInsight {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  insightText: string

  @Column({})
  predictionDate: string

  @Column({})
  stockId: string

  @ManyToOne(() => Stock, parent => parent.aiInsights)
  @JoinColumn({ name: 'stockId' })
  stock?: Stock

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
