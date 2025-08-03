import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { hash, genSalt } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const seedData = JSON.parse(
    readFileSync("prisma/seed/data/data.json", "utf-8"),
  );

  await prisma.studentOnCourses.deleteMany({});
  await prisma.attendance.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.teacherProfile.deleteMany({});
  await prisma.user.deleteMany({});

  for (const user of seedData.users) {
    await prisma.user.create({
      data: {
        ...user,
        password: await hash(user.password, await genSalt(10)),
      },
    });
  }

  for (const profile of seedData.teacher_profiles) {
    await prisma.teacherProfile.create({
      data: profile,
    });
  }

  for (const course of seedData.courses) {
    await prisma.course.create({
      data: course,
    });
  }

  for (const lesson of seedData.lessons) {
    await prisma.lesson.create({
      data: lesson,
    });
  }

  for (const enrollment of seedData.student_on_courses) {
    await prisma.studentOnCourses.create({
      data: enrollment,
    });
  }

  for (const attendance of seedData.attendance) {
    await prisma.attendance.create({
      data: attendance,
    });
  }
}

main()
  .then(async () => {
    console.log("Seeding was successfully ended.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
