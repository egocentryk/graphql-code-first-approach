import { Field, InputType } from '@nestjs/graphql'
import { MinLength } from 'class-validator'
import { CoffeeType } from '../../common/enums/coffee-type.enum'

@InputType()
export class CreateCoffeeInput {
  @MinLength(3)
  @Field(() => String, { description: 'A new coffee name' })
  name: string
  brand: string
  flavors: string[]
  type: CoffeeType
}
