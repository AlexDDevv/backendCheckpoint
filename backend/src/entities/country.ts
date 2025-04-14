import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType, InputType } from "type-graphql";

/**
 * Country represents a country entity in the system, with unique identifiers such as code, name, and emoji.
 *
 * Each country has a unique code (like "FR" for France), a name, an emoji representing the country,
 * and the continent it belongs to.
 *
 * This entity is used to store and retrieve country information in a structured and standardized way.
 */

@ObjectType()
@Entity({ name: "country" })
export class Country extends BaseEntity {
    /** Unique identifier for the country (auto-generated). */
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    /** Unique code of the country (e.g., "FR" for France). */
    @Field()
    @Column({ unique: true })
    code!: string;

    /** Unique name of the country (e.g., "France"). */
    @Field()
    @Column({ unique: true })
    name!: string;

    /** Unique emoji representing the country (e.g., 🇫🇷 for France). */
    @Field()
    @Column({ unique: true })
    emoji!: string;

    /** Continent the country belongs to (e.g., "Europe"). */
    @Field()
    @Column()
    continent!: string;
}

/**
 * Input type for creating a new Country.
 *
 * This class defines the structure of the data required to create a new country
 * through a GraphQL mutation. All fields are required and must be unique where specified.
 */
@InputType()
export class CreateCountryInput {
    /** Unique code of the country (e.g., "FR"). */
    @Field()
    @Column({ unique: true })
    code!: string;

    /** Unique name of the country (e.g., "France"). */
    @Field()
    @Column({ unique: true })
    name!: string;

    /** Unique emoji representing the country (e.g., 🇫🇷). */
    @Field()
    @Column({ unique: true })
    emoji!: string;

    /** Continent the country is part of (e.g., "Europe"). */
    @Field()
    @Column()
    continent!: string;
}
