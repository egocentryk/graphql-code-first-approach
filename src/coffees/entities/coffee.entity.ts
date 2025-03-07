import { Field, ID, ObjectType } from '@nestjs/graphql'
import { loggerMiddleware } from '../../common/middleware/logger.middleware'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Flavor } from './flavor.entity'
import { Drink } from '../../common/interfaces/drink.interface'
import { CoffeeType } from '../../common/enums/coffee-type.enum'

@Entity()
@ObjectType({ description: 'Coffee model', implements: () => Drink })
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number

  @Field({ middleware: [loggerMiddleware] })
  @Column()
  name: string

  @Column()
  brand: string

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, {
    cascade: true,
  })
  flavors?: Flavor[]

  @CreateDateColumn()
  createdAt?: Date

  @Column({ nullable: true })
  type: CoffeeType
}
