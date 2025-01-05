import zod from "zod"

const envSchema = zod.object({
    DATABASE_URL: zod.string().nonempty(),
    GOOGLE_CLIENT_ID: zod.string().nonempty(),
    GOOGLE_CLIENT_SECRET: zod.string().nonempty(),
    NEXTAUTH_URL: zod.string().nonempty(),
    NEXTAUTH_SECRET: zod.string().nonempty(),
}).passthrough();

declare global {
    namespace NodeJS {
        interface ProcessEnv extends zod.infer<typeof envSchema> {}
    }
}

export const env = envSchema.parse(process.env);