import { Injectable } from '@nestjs/common'
import { CreateCoffeeInput } from './dto/create-coffee.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Coffee } from './entities/coffee.entity'
import { Repository } from 'typeorm'
import { UserInputError } from '@nestjs/apollo'

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
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
    const coffee = this.coffeeRepository.create(createCoffeeInput)
    return this.coffeeRepository.save(coffee)
  }
}
