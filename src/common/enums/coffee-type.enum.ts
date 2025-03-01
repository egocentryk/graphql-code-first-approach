import { registerEnumType } from '@nestjs/graphql'

export enum CoffeeType {
  ESPRESSO = 'Espresso',
  LATTE = 'Latte',
  MOCHA = 'Mocha',
  CAPPUCCINO = 'Cappuccino',
  AMERICANO = 'Americano',
  MACCHIATO = 'Macchiato',
}

registerEnumType(CoffeeType, {
  name: 'CoffeeType',
})
