import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { CoffeesModule } from './coffees/coffees.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configSchema } from './config.schema'
import { CommonModule } from './common/common.module'
import { DateScalar } from './common/scalars/date.scalar'

interface OriginalError {
  message: string
}

@Module({
  imports: [
    CoffeesModule,
    CommonModule,
    ConfigModule.forRoot({
      validationSchema: configSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error) => {
        const originalError = error.extensions?.originalError as OriginalError

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
          }
        }

        return {
          message: originalError.message,
          code: error.extensions?.code,
        }
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT') || '5432', 10),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
