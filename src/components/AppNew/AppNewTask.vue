<script setup lang="ts">
const open = defineModel<boolean>('open', { required: true })

const handleSubmit = async (data: any) => {
  await new Promise((resolve) => setTimeout(() => resolve(console.log(data)), 2000))
  console.log(data)
}
</script>

<template>
  <Sheet v-model:open="open">
    <SheetContent class="p-8">
      <SheetHeader class="ml-[-16px]">
        <SheetTitle>Create new task</SheetTitle>
      </SheetHeader>
      <FormKit type="form" @submit="handleSubmit" submit-label="Create task">
        <FormKit type="text" name="name" label="Name" id="name" placeholder="My new task" />
        <FormKit
          type="select"
          name="for"
          id="for"
          label="For"
          placeholder="Select a user"
          :options="[{ label: 'Item name', value: 1 }]"
        />
        <FormKit
          type="textarea"
          name="description"
          label="Description"
          id="description"
          placeholder="Task description"
        />
        <FormKit
          type="select"
          name="Project"
          label="Project"
          id="project"
          placeholder="Select a project"
          :options="[{ label: 'Item name', value: 1 }]"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>
