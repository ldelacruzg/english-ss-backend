import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            id: 0,
            name: 'Master Teacher',
            role: 'teacher',
            username: 'mastertch',
            password: 'master123'
        }
    });

    const teacher = await prisma.teacher.create({
        data: {
            id: 0,
            userId: 0
        }
    });

    const masterclass = await prisma.class.create({
        data: {
            id: 0,
            name: 'General Course',
            teacherId: 0
        }
    });

    console.log(user, teacher, masterclass);
}

main().
    then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });