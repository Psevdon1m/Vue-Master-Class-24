<script setup lang="ts">
const open = defineModel<boolean>('open', { required: true })

const handleSubmit = (data: any) => {
  console.log(data)
}
</script>

<template>
  <Sheet v-model:open="open">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new task</SheetTitle>
      </SheetHeader>
      <FormKit type="form" :actions="false" @submit="handleSubmit">
        <FormKit type="text" name="title" label="Title" />
        <FormKit type="textarea" name="description" label="Description" />
        <FormKit type="date" name="due_date" label="Due date" />
        <FormKit type="submit" class="w-full">Create</FormKit>
      </FormKit>
    </SheetContent>
  </Sheet>
</template>
