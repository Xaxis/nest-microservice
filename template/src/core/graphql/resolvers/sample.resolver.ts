import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Sample')
export class SampleResolver {
    @Query(() => String)
    async hello() {
        return 'Hello World!';
    }
}