import { prisma } from "../src/shared/lib/prisma";

async function main() {
	// Teachers
	await prisma.teacher.createMany({
		data: [
			{ name: "Иван", surname: "Иванов", patronymic: "Иванович" },
			{ name: "Мария", surname: "Петрова", patronymic: "Сергеевна" },
			{ name: "Алексей", surname: "Сидоров", patronymic: "Павлович" },
			{ name: "Ольга", surname: "Смирнова", patronymic: "Игоревна" },
			{ name: "Дмитрий", surname: "Кузнецов", patronymic: "Алексеевич" },
			{ name: "Елена", surname: "Попова", patronymic: "Владимировна" },
			{ name: "Сергей", surname: "Васильев", patronymic: "Петрович" },
			{ name: "Анна", surname: "Новикова", patronymic: "Андреевна" },
			{ name: "Андрей", surname: "Морозов", patronymic: "Сергеевич" },
			{ name: "Татьяна", surname: "Соколова", patronymic: "Михайловна" },
			{ name: "Виктор", surname: "Лебедев", patronymic: "Павлович" },
			{ name: "Наталья", surname: "Козлова", patronymic: "Олеговна" },
			{ name: "Павел", surname: "Новиков", patronymic: "Игоревич" },
			{ name: "Ирина", surname: "Соловьёва", patronymic: "Александровна" },
			{ name: "Юрий", surname: "Борисов", patronymic: "Викторович" },
			{ name: "Екатерина", surname: "Федорова", patronymic: "Олеговна" },
			{ name: "Максим", surname: "Михайлов", patronymic: "Дмитриевич" },
			{ name: "Людмила", surname: "Алексеева", patronymic: "Сергеевна" },
			{ name: "Роман", surname: "Григорьев", patronymic: "Романович" },
			{ name: "Валентина", surname: "Степанова", patronymic: "Петровна" },
			{ name: "Константин", surname: "Николаев", patronymic: "Владимирович" },
			{ name: "Алёна", surname: "Орлова", patronymic: "Игоревна" },
			{ name: "Галина", surname: "Макарова", patronymic: "Алексеевна" },
			{ name: "Игорь", surname: "Зайцев", patronymic: "Юрьевич" },
			{ name: "Вера", surname: "Антонова", patronymic: "Максимовна" },
			{ name: "Артём", surname: "Никифоров", patronymic: "Игоревич" },
			{ name: "Оксана", surname: "Беляева", patronymic: "Сергеевна" },
			{ name: "Владимир", surname: "Комаров", patronymic: "Петрович" },
			{ name: "Софья", surname: "Ершова", patronymic: "Ильинична" }
		]
	});

	// Subjects
	await prisma.subject.createMany({
		data: [
			{ name: "Разговоры о важном", shortName: "РАЗГ. О ВАЖНОМ" },
			{ name: "Русский язык", shortName: "РУС. ЯЗ." },
			{ name: "Литература", shortName: "ЛИТ" },
			{ name: "Математика", shortName: "МАТ" },
			{ name: "Английский язык", shortName: "АНГЛ. ЯЗ." },
			{ name: "Информатика", shortName: "ИНФ" },
			{ name: "История", shortName: "ИСТ" },
			{ name: "География", shortName: "ГЕО" },
			{ name: "Биология", shortName: "БИО" },
			{ name: "Физика", shortName: "ФИЗ" },
			{ name: "Химия", shortName: "ХИМ" },
			{ name: "Музыка", shortName: "МУЗ" },
			{ name: "Изобразительное искусство", shortName: "ИЗО" },
			{ name: "Труд", shortName: "ТРУД" },
			{ name: "Физическая культура", shortName: "ФК" },
			{ name: "Основы безопасности жизнедеятельности", shortName: "ОБЖ" },
			{ name: "Обществознание", shortName: "ОБЩ" },
			{ name: "Профориентация", shortName: "ПРОФ" },
			{ name: "Мировая художественная культура", shortName: "МХК" }
		]
	});

	// Rooms
	await prisma.room.createMany({
		data: (() => {
			const rooms: { name: string }[] = [];

			// Для каждого этажа (100, 200, 300) создаём по 20 кабинетов: 101–120, 201–220, 301–320
			for (let hundred = 1; hundred <= 3; hundred += 1) {
				for (let i = 1; i <= 20; i += 1) {
					const roomNumber = hundred * 100 + i;
					rooms.push({ name: roomNumber.toString() });
				}
			}
			return rooms;
		})()
	});

	// Classes
	await prisma.class.createMany({
		data: (() => {
			const classes: { grade: number; suffix: string }[] = [];

			for (let grade = 5; grade <= 11; grade += 1) {
				classes.push({ grade, suffix: "А" });
				classes.push({ grade, suffix: "Б" });
			}

			return classes;
		})()
	});

	// ClassGroups — две учебные группы 1гр и 2гр для каждого класса
	const allClasses = await prisma.class.findMany();
	await prisma.classGroup.createMany({
		data: allClasses.flatMap((cls) => [
			{ name: "1гр", classId: cls.id },
			{ name: "2гр", classId: cls.id }
		])
	});

	// CalendarWeek (1–7)
	await prisma.calendarWeek.createMany({
		data: [
			{ weekDay: 1, name: "Понедельник", shortName: "Пн" },
			{ weekDay: 2, name: "Вторник", shortName: "Вт" },
			{ weekDay: 3, name: "Среда", shortName: "Ср" },
			{ weekDay: 4, name: "Четверг", shortName: "Чт" },
			{ weekDay: 5, name: "Пятница", shortName: "Пт" },
			{ weekDay: 6, name: "Суббота", shortName: "Сб" },
			{ weekDay: 7, name: "Воскресенье", shortName: "Вс" }
		]
	});

	// LessonTimeslot (уроки по времени)
	await prisma.lessonTimeslot.createMany({
		data: (() => {
			const slots: {
				number: number;
				startTime: Date;
				endTime: Date;
			}[] = [];

			// 7 уроков, начиная с 9:00, каждый урок по 40 минут (начало в 00 минут каждого часа)
			for (let lessonNumber = 1; lessonNumber <= 7; lessonNumber += 1) {
				const startHour = 9 + (lessonNumber - 1);

				const startTime = new Date(Date.UTC(1970, 0, 1, startHour, 0, 0));
				const endTime = new Date(Date.UTC(1970, 0, 1, startHour, 40, 0));

				slots.push({
					number: lessonNumber,
					startTime,
					endTime
				});
			}

			return slots;
		})()
	});

	// CalendarHoliday — государственные праздники и каникулы РФ на 2025–2026 учебный год
	await (prisma as any).calendarHoliday.createMany({
		data: (() => {
			const days: { name: string; date: Date }[] = [];

			const addRange = (name: string, startUtc: Date, endUtcInclusive: Date) => {
				for (
					let d = new Date(startUtc);
					d.getTime() <= endUtcInclusive.getTime();
					d = new Date(d.getTime() + 24 * 60 * 60 * 1000)
				) {
					days.push({ name, date: new Date(d) });
				}
			};

			// Осенние каникулы: 27.10.2025–02.11.2025
			addRange("Осенние каникулы", new Date(Date.UTC(2025, 9, 27)), new Date(Date.UTC(2025, 10, 2)));

			// Праздник 4 ноября 2025 — День народного единства
			days.push({
				name: "День народного единства",
				date: new Date(Date.UTC(2025, 10, 4))
			});

			// Зимние каникулы: 29.12.2025–11.01.2026
			addRange("Зимние каникулы", new Date(Date.UTC(2025, 11, 31)), new Date(Date.UTC(2026, 0, 11)));

			// Новогодние праздники и Рождество: 01.01.2026–08.01.2026
			addRange(
				"Новогодние праздники и Рождество",
				new Date(Date.UTC(2026, 0, 1)),
				new Date(Date.UTC(2026, 0, 8))
			);

			// Праздник 23 февраля 2026 — День защитника Отечества
			days.push({
				name: "День защитника Отечества",
				date: new Date(Date.UTC(2026, 1, 23))
			});

			// Весенние каникулы: 23.03.2026–29.03.2026
			addRange("Весенние каникулы", new Date(Date.UTC(2026, 2, 30)), new Date(Date.UTC(2026, 3, 5)));

			// Праздник 8 марта 2026 — Международный женский день
			days.push({
				name: "Международный женский день",
				date: new Date(Date.UTC(2026, 2, 8))
			});

			// Праздник 1 мая 2026 — Праздник Весны и Труда
			days.push({
				name: "Праздник Весны и Труда",
				date: new Date(Date.UTC(2026, 4, 1))
			});

			// Праздник 9 мая 2026 — День Победы
			days.push({
				name: "День Победы (переносится с 9 мая)",
				date: new Date(Date.UTC(2026, 4, 11))
			});

			return days;
		})()
	});

	// LessonScheduleVersion
	const scheduleVersion = await prisma.lessonScheduleVersion.create({
		data: {
			name: "Базовое расписание",
			dateBegin: new Date(Date.UTC(2025, 8, 1)),
			dateEnd: new Date(Date.UTC(2026, 4, 25))
		}
	});

	// LessonSchedule — базовое недельное расписание, ориентировочно как в примере
	{
		const [classes, classGroups, subjects, teachers, timeslots, weeks] = await Promise.all([
			prisma.class.findMany({ orderBy: { grade: "asc" } }),
			prisma.classGroup.findMany(),
			prisma.subject.findMany(),
			prisma.teacher.findMany(),
			prisma.lessonTimeslot.findMany({ orderBy: { number: "asc" } }),
			prisma.calendarWeek.findMany({ where: { weekDay: { in: [1, 2, 3, 4, 5] } } })
		]);

		const subjectByShort = new Map(subjects.map((s) => [s.shortName, s]));

		// Распределяем специализации учителей (один предмет, кроме пар Рус+Лит и Ист+Общ)
		const t = teachers;
		const spec: Record<string, number[]> = {
			"РУС. ЯЗ.": [t[0]?.id, t[1]?.id],
			ЛИТ: [t[0]?.id, t[1]?.id],
			МАТ: [t[2]?.id, t[3]?.id],
			"АНГЛ. ЯЗ.": [t[4]?.id, t[5]?.id],
			ИНФ: [t[6]?.id, t[7]?.id],
			ИСТ: [t[8]?.id],
			ОБЩ: [t[8]?.id],
			ГЕО: [t[9]?.id],
			БИО: [t[10]?.id],
			ФИЗ: [t[11]?.id],
			ХИМ: [t[12]?.id],
			МУЗ: [t[13]?.id],
			ИЗО: [t[14]?.id],
			ТРУД: [t[15]?.id, t[16]?.id],
			ФК: [t[17]?.id, t[18]?.id],
			ОБЖ: [t[19]?.id],
			ПРОФ: [t[20]?.id],
			МХК: [t[21]?.id],
			"РАЗГ. О ВАЖНОМ": [t[22]?.id, t[23]?.id, t[24]?.id]
		};

		const groupsByClassId = new Map<number, { group1Id: number; group2Id: number }>();
		for (const g of classGroups) {
			const current =
				groupsByClassId.get(g.classId) ??
				({ group1Id: 0, group2Id: 0 } as { group1Id: number; group2Id: number });
			if (g.name === "1гр") current.group1Id = g.id;
			else if (g.name === "2гр") current.group2Id = g.id;
			groupsByClassId.set(g.classId, current);
		}

		const weekByNumber = new Map(weeks.map((w) => [w.weekDay, w]));
		const timeslotByNumber = new Map(timeslots.map((ts) => [ts.number, ts]));

		// Для класса и предмета один закреплённый учитель
		const teacherForClassAndSubject = new Map<string, number>();
		// Учитель не может вести два урока одновременно
		const busyKey = (weekId: number, timeslotId: number, teacherId: number) =>
			`${weekId}:${timeslotId}:${teacherId}`;
		const busy = new Set<string>();

		type LessonPlanCell = {
			weekDay: number;
			lessonNumber: number;
			subjectShort: string;
		};

		const lessonsData: {
			roomId: number;
			teacherId: number;
			classId: number | null;
			groupId: number | null;
			subjectId: number;
			lessonTimeslotId: number;
			lessonScheduleVersionId: number;
			calendarWeekId: number | null;
		}[] = [];

		const rooms = await prisma.room.findMany({ orderBy: { id: "asc" } });

		const splitSubjects = new Set<string>(["АНГЛ. ЯЗ.", "ТРУД", "ИНФ"]);

		const buildPlanForClass = (grade: number): LessonPlanCell[] => {
			// Упрощённый шаблон: 5 дней, 5 уроков в день
			const result: LessonPlanCell[] = [];

			const baseSubjectsJunior = [
				"РУС. ЯЗ.",
				"ЛИТ",
				"МАТ",
				"АНГЛ. ЯЗ.",
				"ИНФ",
				"ИСТ",
				"ГЕО",
				"БИО",
				"МУЗ",
				"ИЗО",
				"ТРУД",
				"ФК",
				"ОБЖ"
			];
			const baseSubjectsMiddle = [
				"РУС. ЯЗ.",
				"ЛИТ",
				"МАТ",
				"АНГЛ. ЯЗ.",
				"ИНФ",
				"ИСТ",
				"ОБЩ",
				"ГЕО",
				"БИО",
				"ФИЗ",
				"ХИМ",
				"МУЗ",
				"ИЗО",
				"ТРУД",
				"ФК",
				"ОБЖ",
				"ПРОФ"
			];
			const baseSubjectsSenior = [
				"РАЗГ. О ВАЖНОМ",
				"РУС. ЯЗ.",
				"ЛИТ",
				"МАТ",
				"АНГЛ. ЯЗ.",
				"ИНФ",
				"ИСТ",
				"ОБЩ",
				"ГЕО",
				"БИО",
				"ФИЗ",
				"ХИМ",
				"ФК",
				"ОБЖ",
				"ПРОФ",
				"МХК"
			];

			const base = grade <= 6 ? baseSubjectsJunior : grade <= 9 ? baseSubjectsMiddle : baseSubjectsSenior;

			for (let weekDay = 1; weekDay <= 5; weekDay += 1) {
				for (let lessonNumber = 1; lessonNumber <= 5; lessonNumber += 1) {
					const idx = (grade * 10 + weekDay * 5 + lessonNumber) % base.length;
					result.push({
						weekDay,
						lessonNumber,
						subjectShort: base[idx]
					});
				}
			}

			return result;
		};

		let roomIndex = 0;

		for (const cls of classes) {
			const groups = groupsByClassId.get(cls.id);
			if (!groups || !groups.group1Id || !groups.group2Id) continue;

			const plan = buildPlanForClass(cls.grade);

			for (const cell of plan) {
				const week = weekByNumber.get(cell.weekDay);
				const timeslot = timeslotByNumber.get(cell.lessonNumber);
				const subject = subjectByShort.get(cell.subjectShort);
				if (!week || !timeslot || !subject) continue;

				const specTeachers = (spec[cell.subjectShort] || []).filter(
					(id): id is number => typeof id === "number"
				);
				if (specTeachers.length === 0) continue;

				const isSplit = splitSubjects.has(cell.subjectShort);
				const targetGroups = isSplit ? [groups.group1Id, groups.group2Id] : [null];

				for (let gi = 0; gi < targetGroups.length; gi += 1) {
					const groupId = targetGroups[gi];
					const classIdForLesson = isSplit ? null : cls.id;
					const keyClassSub =
						cell.subjectShort === "АНГЛ. ЯЗ." || cell.subjectShort === "ТРУД" || cell.subjectShort === "ИНФ"
							? `${cls.id}:${subject.id}:grp${gi + 1}`
							: `${cls.id}:${subject.id}`;

					let teacherId = teacherForClassAndSubject.get(keyClassSub);

					if (!teacherId) {
						// выбираем учителя для пары (класс, предмет[, группа])
						const teacherIndex =
							(cls.id + subject.id + cell.weekDay + cell.lessonNumber + gi) % specTeachers.length;
						teacherId = specTeachers[teacherIndex];
						teacherForClassAndSubject.set(keyClassSub, teacherId);
					}

					// проверяем занятость учителя на это время
					let busyKeyValue = busyKey(week.id, timeslot.id, teacherId);
					if (busy.has(busyKeyValue)) {
						// пробуем другого учителя той же специализации
						const alternative = specTeachers.find((id) => !busy.has(busyKey(week.id, timeslot.id, id)));
						if (!alternative) continue;
						teacherId = alternative;
						busyKeyValue = busyKey(week.id, timeslot.id, teacherId);
						teacherForClassAndSubject.set(keyClassSub, teacherId);
					}

					busy.add(busyKeyValue);

					const room = rooms[roomIndex % rooms.length];
					roomIndex += 1;

					lessonsData.push({
						roomId: room.id,
						teacherId,
						classId: classIdForLesson,
						groupId,
						subjectId: subject.id,
						lessonTimeslotId: timeslot.id,
						lessonScheduleVersionId: scheduleVersion.id,
						calendarWeekId: week.id
					});
				}
			}
		}

		if (lessonsData.length > 0) {
			await prisma.lessonSchedule.createMany({
				data: lessonsData as any
			});
		}
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
