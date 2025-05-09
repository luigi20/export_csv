import postgres  from "postgres";

if(!process.env.DATABASE_URL){
  throw new Error('Credencial não existe')
}
export const sql = postgres(process.env.DATABASE_URL)