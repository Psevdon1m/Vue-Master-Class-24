import { fakerEN_US as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

const seedProjects = async (numEntries = 10) => {
  const projects = []
  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)
    const row = {
      name,
      slug: name.toLocaleLowerCase().replace(/ /g, '-'),
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement(['in_progress', 'completed']),
      collaborators: [faker.helpers.arrayElement([1, 2, 3])],
    }

    projects.push(row)
  }

  const { data, error } = await supabase.from('projects').insert(projects).select('id')

  if (error) {
    console.error('Error seeding projects', error)
    return
  }

  console.log('Projects seeded')
  return data
}

const seedTasks = async (numEntries, projectIds) => {
  const tasks = []
  for (let i = 0; i < numEntries; i++) {
    tasks.push({
      name: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement(['in_progress', 'completed']),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectIds),
      collaborators: [faker.helpers.arrayElement([1, 2, 3])],
    })
  }

  const { data, error } = await supabase.from('tasks').insert(tasks).select('id')

  if (error) {
    console.error('Error seeding tasks', error)
    return
  }
  return data
}

const seedDatabase = async (numEntriesPerTable = 10) => {
  const projectIds = (await seedProjects(numEntriesPerTable)).map((project) => project.id)
  await seedTasks(numEntriesPerTable, projectIds)
}

const numEntriesPerTable = 10

await seedDatabase(numEntriesPerTable)
