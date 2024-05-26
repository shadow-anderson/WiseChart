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
export class StockData {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  date: string

  @ColumnNumeric({ type: 'numeric' })
  openPrice: number

  @ColumnNumeric({ type: 'numeric' })
  closePrice: number

  @ColumnNumeric({ type: 'numeric' })
  highPrice: number

  @ColumnNumeric({ type: 'numeric' })
  lowPrice: number

  @Column({})
  volume: string

  @Column({})
  stockId: string

  @ManyToOne(() => Stock, parent => parent.stockDatas)
  @JoinColumn({ name: 'stockId' })
  stock?: Stock

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
