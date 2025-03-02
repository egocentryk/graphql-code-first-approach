<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Project description

Code-first approach to creating GraphQL APIs with [Nest](https://github.com/nestjs/nest). It contains GraphQL concepts, tips & tricks, and
patterns to create your own enterprise-grade GraphQL APIs.

## Project setup

```bash
$ pnpm install
```

## Docker

```bash
$ docker-compose up -d
```

-d flag stands for detached mode: run containers in the background

## GraphQL operation types

### Queries

```graphql
{
  coffees {
    id
    name
    brand
    flavors {
      id
      name
    }
    createdAt
  }
}

query ($coffeeId: ID!) {
  coffee(id: $coffeeId) {
    id
    name
    brand
    flavors {
      name
    }
    createdAt
  }
}

{
  drinks {
    ... on Tea {
      name
    }
    ... on Coffee {
      name
      brand
    }
  }
}
```

### Mutations

```graphql
mutation {
  createCoffee(
    createCoffeeInput: {
      name: "Caramel Coffee"
      brand: "Jacobs"
      flavors: ["carameal", "sweat", "creamy"]
      type: AMERICANO
    }
  ) {
    id
    name
    brand
    flavors {
      name
    }
    createdAt
  }
}

mutation {
  updateCoffee(
    id: 1
    updateCoffeeInput: { name: "Cappuccino", flavors: ["milky"] }
  ) {
    name
    flavors {
      name
    }
  }
}

mutation {
  removeCoffee(id: 1) {
    name
  }
}
```

### Subscription

```graphql
subscription {
  coffeeAdded {
    id
    name
    brand
  }
}
```

## Deployment

Check out [Mau](https://mau.nestjs.com), Nest official platform for deploying NestJS applications on AWS.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
