export function autoFocusout(el, focusoustListener){
  const focusinListener = (e) => e.stopPropagation()  

  setTimeout(()=>{
    el.addEventListener('click', focusinListener)
    window.addEventListener('click', focusoustListener)
  })

  return {    
    destroy(){
      el.removeEventListener('click', focusinListener)
      window.removeEventListener('click', focusoustListener)
    }
  }
}