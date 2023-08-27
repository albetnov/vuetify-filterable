import { ref } from 'vue'

export default function useDisclosure() {
  const isMenuOpen = ref(false)

  const handleOnSave = () => {
    isMenuOpen.value = false
  }

  return {
    isMenuOpen,
    handleOnSave
  }
}
