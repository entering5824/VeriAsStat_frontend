// Parallax scroll composable for smooth parallax effects
import { ref, onMounted, onUnmounted } from 'vue'

export interface ParallaxOptions {
  speed?: number // Parallax speed multiplier (0.1 - 1.0, lower = slower)
  direction?: 'up' | 'down' | 'left' | 'right'
  trigger?: HTMLElement | null
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = 'up' } = options

  const elementRef = ref<HTMLElement | null>(null)
  const offset = ref(0)

  const handleScroll = () => {
    if (!elementRef.value) return

    const rect = elementRef.value.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const elementTop = rect.top + scrollTop
    const windowHeight = window.innerHeight

    // Calculate parallax offset based on scroll position
    const scrolled = scrollTop - elementTop + windowHeight
    const parallaxOffset = scrolled * speed

    offset.value = parallaxOffset

    // Apply transform based on direction
    let transform = ''
    switch (direction) {
      case 'up':
        transform = `translateY(-${parallaxOffset}px)`
        break
      case 'down':
        transform = `translateY(${parallaxOffset}px)`
        break
      case 'left':
        transform = `translateX(-${parallaxOffset}px)`
        break
      case 'right':
        transform = `translateX(${parallaxOffset}px)`
        break
    }

    if (elementRef.value) {
      elementRef.value.style.transform = transform
      elementRef.value.style.willChange = 'transform'
    }
  }

  let rafId: number | null = null
  const smoothScroll = () => {
    handleScroll()
    rafId = requestAnimationFrame(smoothScroll)
  }

  onMounted(() => {
    smoothScroll()
  })

  onUnmounted(() => {
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
  })

  return {
    elementRef,
    offset
  }
}

// Intersection Observer for entrance animations
export function useIntersectionAnimation(threshold = 0.1) {
  const elementRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  onMounted(() => {
    if (!elementRef.value) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            // Add animation class
            entry.target.classList.add('glass-entrance')
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(elementRef.value)

    onUnmounted(() => {
      if (elementRef.value) {
        observer.unobserve(elementRef.value)
      }
    })
  })

  return {
    elementRef,
    isVisible
  }
}

// Mouse move parallax (for hover tilt effects)
export function useMouseParallax(sensitivity = 10) {
  const elementRef = ref<HTMLElement | null>(null)
  const position = ref({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent) => {
    if (!elementRef.value) return

    const rect = elementRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) / sensitivity
    const deltaY = (e.clientY - centerY) / sensitivity

    position.value = { x: deltaX, y: deltaY }

    elementRef.value.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`
  }

  const handleMouseLeave = () => {
    if (!elementRef.value) return
    elementRef.value.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
    position.value = { x: 0, y: 0 }
  }

  onMounted(() => {
    if (elementRef.value) {
      elementRef.value.addEventListener('mousemove', handleMouseMove)
      elementRef.value.addEventListener('mouseleave', handleMouseLeave)
    }
  })

  onUnmounted(() => {
    if (elementRef.value) {
      elementRef.value.removeEventListener('mousemove', handleMouseMove)
      elementRef.value.removeEventListener('mouseleave', handleMouseLeave)
    }
  })

  return {
    elementRef,
    position
  }
}
