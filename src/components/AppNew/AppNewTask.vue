<script setup lang="ts">
import type { CreateNewTask } from '@/types/CreateNewForm'
import { createTaskQuery, profilesQuery, projectsQuery } from '@/utils/supaQueries'
const open = defineModel<boolean>('open', { required: true })

type SelectOptions = {
  label: string
  value: number | string
}

const selectOptions = ref({
  projects: [] as SelectOptions[],
  profiles: [] as SelectOptions[],
})

const { profile } = storeToRefs(useAuthStore())

const getProjectsOptions = async () => {
  const { data: allProjects } = await projectsQuery

  if (!allProjects) return

  allProjects.forEach((project) => {
    selectOptions.value.projects.push({
      label: project.name,
      value: project.id,
    })
  })
}

const getProfilesOptions = async () => {
  const { data: allProfiles } = await profilesQuery

  if (!allProfiles) return

  allProfiles.forEach((profile) => {
    selectOptions.value.profiles.push({ label: profile.full_name, value: profile.id })
  })
}

const getOptions = async () => {
  console.log('getOptions')
  await Promise.all([getProjectsOptions(), getProfilesOptions()])
}

getOptions()

const handleSubmit = async (data: CreateNewTask) => {
  const task = {
    ...data,
    collaborators: [profile.value?.id],
  }

  const { error } = await createTaskQuery(task)

  if (error) {
    console.error(error)
  }
  open.value = false
}
</script>

<template>
  <Sheet v-model:open="open">
    <SheetContent class="p-8">
      <SheetHeader class="ml-[-16px]">
        <SheetTitle>Create new task</SheetTitle>
      </SheetHeader>
      <FormKit
        type="form"
        @submit="handleSubmit"
        submit-label="Create task"
        :config="{ validationVisibility: 'submit' }"
      >
        <FormKit
          type="text"
          name="name"
          label="Name"
          id="name"
          placeholder="My new task"
          validation="required|length:1,255"
        />
        <FormKit
          type="select"
          name="profile_id"
          id="profile_id"
          label="User"
          placeholder="Select a user"
          :options="selectOptions.profiles"
          validation="required"
        />
        <FormKit
          type="select"
          name="project_id"
          label="Project"
          id="project_id"
          placeholder="Select a project"
          :options="selectOptions.projects"
          validation="required"
        />
        <FormKit
          type="textarea"
          name="description"
          label="Description"
          id="description"
          placeholder="Task description"
          validation=" required | length:0,500"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>
