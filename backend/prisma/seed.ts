import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

    const user = await prisma.user.create({
      data: {
            username: 'michaelsoliveira',
            email: 'michaelsoliveira@gmail.com',
            password: await bcrypt.hash('secret', 10)
        },
    })

    console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })