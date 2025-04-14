import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country, CreateCountryInput } from "../entities/country";

/**
 * CountryResolver handles all GraphQL queries and mutations related to countries.
 *
 * It allows fetching all countries, querying countries by continent or code,
 * and creating new countries. This resolver facilitates interaction with the
 * Country entity through a structured API.
 */

@Resolver(Country)
export class CountryResolver {
    /**
     * Query to retrieve all countries stored in the system.
     *
     * @returns A Promise that resolves to an array of Country objects.
     */
    @Query(() => [Country])
    async countries(): Promise<Country[]> {
        const contries = await Country.find();
        return contries;
    }

    /**
     * Query to retrieve countries by their continent.
     *
     * @param continent - The name of the continent (e.g., "Europe").
     * @returns A Promise that resolves to an array of Country objects from the specified continent.
     */
    @Query(() => [Country])
    async countriesByContinent(
        @Arg("continent", () => String) continent: string
    ): Promise<Country[]> {
        const contries = await Country.find({ where: { continent } });
        return contries;
    }

    /**
     * Query to retrieve a single country by its unique code.
     *
     * @param code - The unique country code (e.g., "FR" for France).
     * @returns A Promise that resolves to the corresponding Country object, or null if not found.
     */
    @Query(() => Country, { nullable: true })
    async country(
        @Arg("code", () => String) code: string
    ): Promise<Country | null> {
        const country = await Country.findOne({ where: { code } });
        return country ?? null;
    }

    /**
     * Mutation to create a new country.
     *
     * @param data - The input data required to create a country, including code, name, emoji, and continent.
     * @returns A Promise that resolves to the newly created Country object.
     */
    @Mutation(() => Country)
    async createCountry(
        @Arg("data", () => CreateCountryInput) data: CreateCountryInput
    ): Promise<Country> {
        const newCountry = new Country();
        Object.assign(newCountry, data);

        await newCountry.save();
        return newCountry;
    }
}
