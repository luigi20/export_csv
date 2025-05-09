import {sql} from "./client.ts";
import {fakerPT_BR as faker} from "@faker-js/faker";

await sql`
  CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_in_cents INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )
`

await sql`TRUNCATE TABLE products`

for(const i of Array.from({length:20})){
  const productsTOInsert = Array.from({length:10000}).map(()=>{
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price_in_cents: faker.number.int({min:100,max:10000}),
    }
  })
  await sql`INSERT INTO products ${sql(productsTOInsert)}`
  console.log('Inserted 10k products')
}

await sql.end();