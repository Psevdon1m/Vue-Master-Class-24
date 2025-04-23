<script setup lang="ts">
const router = useRouter()
const emit = defineEmits<{
  (e: 'open-task-sheet'): void
}>()
const links = [
  {
    to: '/',
    icon: 'lucide:house',
    title: 'Dashboard',
  },
  {
    to: '/projects',
    icon: 'lucide:building-2',
    title: 'Projects',
  },
  {
    to: '/tasks',
    icon: 'lucide:badge-check',
    title: 'My Tasks',
  },
]

const accountLinks = [
  {
    to: '/profile',
    icon: 'lucide:user',
    title: 'Profile',
  },
  {
    to: '/settings',
    icon: 'lucide:settings',
    title: 'Settings',
  },
  {
    icon: 'lucide:log-out',
    title: 'Sign out',
  },
]

const handleLogout = async (title: string) => {
  if (title === 'Sign out') {
    const { logout } = await import('@/utils/supaAuth')
    let success = await logout()
    if (success) {
      router.push('/login')
    }
  }
}
</script>

<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 lg:w-52 w-16 transition-[width]"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" class="w-8 h-8">
            <iconify-icon icon="lucide:plus"></iconify-icon>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="$emit('open-task-sheet')">Task</DropdownMenuItem>
          <DropdownMenuItem>Project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SidebarLinks :links="links" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SidebarLinks :links="accountLinks" @logout="handleLogout" />
      </div>
    </nav>
  </aside>
</template>
