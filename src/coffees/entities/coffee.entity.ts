import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Coffee {
  id: string
  name: string
  brand: string
  flavors: string[]
}
