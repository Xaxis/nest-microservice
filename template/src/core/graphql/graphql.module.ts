import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
    imports: [
        GraphQLModule.forRoot({
            driver: 'graphql-schema',
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            playground: true,
            debug: process.env.NODE_ENV !== 'production'
        }),
    ],
})
export class GraphqlModule {}