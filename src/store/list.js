import { writable } from "svelte/store";

const repoLists = JSON.parse(window.localStorage.getItem('lists')) || []

const _lists = writable(repoLists)
_lists.subscribe(($lists)=>{
  window.localStorage.setItem('lists', JSON.stringify($lists))
})

export const lists = {
  subscribe: _lists.subscribe,
  add(payload){
    const {title} = payload
    _lists.update(($lists)=>{
      $lists.push({
        id:'',
        title,
        cards: []
      })
      return $lists
    })
  }
}