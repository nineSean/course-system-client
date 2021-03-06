export * from './useDownRefresh'
export * from './useLoadMore'

export function extractNumber(str: string): number{
  return parseFloat(str.replace(/\D*(\d*\.\d*).*/, (_, p1) => {
    return p1
  }))
}

export function downRefresh(callback: Function, container: HTMLElement) {
  let startY: number
  let currentY: number
  let scrollTop: number
  const startTop = container.offsetTop
  const onTouchmove = throttle(_onTouchmove)
  container.addEventListener('touchstart', onTouchstart)

  function onTouchstart(e: TouchEvent){
    startY = e.touches[0].pageY
    const untriggeredHeight = container.children[0].getBoundingClientRect().bottom
    if (startY < untriggeredHeight) return
    container.addEventListener('touchmove', onTouchmove)
    container.addEventListener('touchend', _onTouchend)
  }

  function _onTouchmove(e: TouchEvent) {
    currentY = e.touches[0].pageY
    scrollTop = container.scrollTop
    const deltaY = currentY - startY
    if (scrollTop > 0 || deltaY < 0) {
      container.removeEventListener('touchmove', onTouchmove)
      container.removeEventListener('touchend', _onTouchend)
      return
    }
    container.style.top = startTop + deltaY + 'px'
  }

  function _onTouchend(e: TouchEvent) {
    currentY = e.changedTouches[0].pageY
    if (currentY - startY > 10) {
      callback()
    }
    _back()
    container.removeEventListener('touchmove', onTouchmove)
    container.removeEventListener('touchend', _onTouchend)
  }

  function _back() {
    const currentTop = container.offsetTop
    if (currentTop - startTop >= 1) {
      container.style.top = (currentTop - 15) + 'px'
      requestAnimationFrame(_back)
    } else {
      container.style.top = startTop + 'px'
    }
  }
  return onTouchstart
}

export function upLoadMore(callback: Function, container: HTMLElement, threshold = 20){
  const onScroll = debounce(loadMore)
  const height = container.clientHeight
  function loadMore(e: Event) {
    const scrollTop = container.scrollTop
    const scrollHeight = container.scrollHeight
    if (scrollHeight - (scrollTop + height) < threshold) {
      callback()
    }
  }
  container.addEventListener('scroll', onScroll)
  return onScroll
}

export function debounce(fn: Function, ms = 100) {
  let timeId: any
  return function(){
    clearTimeout(timeId)
    timeId = setTimeout(fn.bind(this, arguments), ms)
  }
}

export function throttle(fn: Function, ms: number = 20) {
  let isThrottled = false
  let savedThis: any
  let savedArgs: any
  return function wrapper() {
    if (isThrottled) {
      savedThis = this
      savedArgs = arguments
      return
    }
    isThrottled = true
    setTimeout(() => {
      isThrottled = false
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedThis = null
        savedArgs = null
      }
    }, ms)
    fn.apply(this, arguments)
  }
}