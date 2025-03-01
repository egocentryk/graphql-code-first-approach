import { Query, Resolver } from '@nestjs/graphql'
import { Coffee } from 'src/coffees/entities/coffee.entity'
import { Drink } from 'src/common/interfaces/drink.interface'
import { Tea } from 'src/teas/entities/tea.entity'

@Resolver()
export class DrinksResolver {
  @Query(() => [Drink], { name: 'drinks' })
  async findAll(): Promise<Drink[]> {
    const coffee = new Coffee()

    coffee.id = 1
    coffee.name = 'Cappuccino'
    coffee.brand = 'Nestle'

    const tea = new Tea()

    tea.name = 'Green Tea'

    return [coffee, tea]
  }
}
