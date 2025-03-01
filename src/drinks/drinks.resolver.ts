import { Query, Resolver } from '@nestjs/graphql'
import { Coffee } from '../coffees/entities/coffee.entity'
import { DrinksResultUnion } from '../common/unions/drinks-result.union'
import { Tea } from '../teas/entities/tea.entity'

@Resolver()
export class DrinksResolver {
  @Query(() => [DrinksResultUnion], { name: 'drinks' })
  async findAll(): Promise<(typeof DrinksResultUnion)[]> {
    const coffee = new Coffee()

    coffee.id = 1
    coffee.name = 'Cappuccino'
    coffee.brand = 'Nestle'

    const tea = new Tea()

    tea.name = 'Green Tea'

    return [coffee, tea]
  }
}
