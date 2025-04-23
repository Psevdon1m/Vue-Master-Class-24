<script setup lang="ts">
const route = useRoute('/tasks/[id]')
const router = useRouter()
const { getTask, updateTask, deleteTask } = useTasksStore()
const { task } = storeToRefs(useTasksStore())

watch(
  () => task.value?.name,
  () => {
    usePageStore().pageData.title = `Task: ${task.value?.name}`
  },
)

await getTask(route.params.id as string)

const { getProfilesByIds } = useCollabs()
const collabs = task.value?.collaborators ? await getProfilesByIds(task.value?.collaborators) : []

const loading = ref(false)

const handleDeleteTask = async () => {
  loading.value = true
  await deleteTask()
  loading.value = false
  router.push({ name: '/tasks/' })
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <Table v-if="task">
      <TableRow>
        <TableHead> Name </TableHead>
        <AppInPlaceEditText v-model="task.name" @commit="updateTask" />
      </TableRow>
      <TableRow>
        <TableHead> Description </TableHead>
        <AppInPlaceEditTextArea v-model="task.description" @commit="updateTask" />
      </TableRow>
      <TableRow>
        <TableHead> Assignee </TableHead>
        <TableCell>Lorem ipsum</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Project </TableHead>
        <TableCell> {{ task.projects?.name }} </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Status </TableHead>
        <AppInPlaceEditStatus v-model="task.status" @commit="updateTask" />
      </TableRow>
      <TableRow>
        <TableHead> Collaborators </TableHead>
        <TableCell>
          <div class="flex">
            <Avatar
              class="-mr-4 border border-primary hover:scale-110 transition-transform"
              v-for="collaborator in collabs"
              :key="collaborator.id"
            >
              <RouterLink
                class="w-full h-full flex items-center justify-center"
                :to="{ name: '/users/[username]', params: { username: collaborator.username } }"
              >
                <AvatarImage :src="collaborator.avatar_url || ''" alt="" />
                <AvatarFallback> </AvatarFallback>
              </RouterLink>
            </Avatar>
          </div>
        </TableCell>
      </TableRow>
      <TableRow class="hover:bg-transparent">
        <TableHead class="align-top pt-4"> Comments </TableHead>

        <TableCell>
          Comments cards goes in here..

          <div class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md">
            <textarea
              placeholder="Add your comment.."
              class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
            >
            </textarea>
            <div class="flex justify-between mt-3">
              <Button> Comment </Button>
              <div class="flex gap-4">
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:paperclip"></iconify-icon>
                  <span class="sr-only">Attach file</span>
                </button>
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:image-up"></iconify-icon>

                  <span class="sr-only">Upload image</span>
                </button>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </Table>
    <Button @click="handleDeleteTask" variant="destructive" class="self-end mt-3 w-full max-w-40">
      <Transition name="scale" mode="out-in">
        <iconify-icon v-if="!loading" icon="lucide:trash" class="mr-1"></iconify-icon>
        <iconify-icon v-else icon="lucide:loader-circle" class="mr-1 animate-spin"></iconify-icon>
      </Transition>
      Delete task
    </Button>
  </div>
</template>
