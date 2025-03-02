import { Injectable } from '@nestjs/common'
import { CreateCoffeeInput } from './dto/create-coffee.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Coffee } from './entities/coffee.entity'
import { Repository } from 'typeorm'
import { UserInputError } from '@nestjs/apollo'
import { UpdateCoffeeInput } from './dto/update-coffee.input'
import { Flavor } from './entities/flavor.entity'
import { PubSub } from 'graphql-subscriptions'

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly pubSub: PubSub,
  ) {}
  async findAll() {
    return this.coffeeRepository.find()
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({ where: { id } })

    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`)
    }

    return coffee
  }

  async create(createCoffeeInput: CreateCoffeeInput) {
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
    )

    const coffee = this.coffeeRepository.create({
      ...createCoffeeInput,
      flavors,
    })

    const newCoffeeEntity = await this.coffeeRepository.save(coffee)

    this.pubSub.publish('coffeeAdded', { coffeeAdded: newCoffeeEntity })
    return newCoffeeEntity
  }

  async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    const flavors =
      updateCoffeeInput.flavors &&
      (await Promise.all(
        updateCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
      ))

    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeInput,
      flavors,
    })

    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`)
    }

    return this.coffeeRepository.save(coffee)
  }

  async remove(id: number) {
    const coffee = await this.findOne(id)
    return this.coffeeRepository.remove(coffee)
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    })

    return existingFlavor || this.flavorRepository.create({ name })
  }
}
