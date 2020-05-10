import './App.css'
import React, { Component } from 'react'

const data = [
  { id: 1, name: "Desktops", parent: 3 },
  { id: 3, name: "Computers", parent: 8 },
  { id: 4, name: "Smartphones", parent: 6 },
  { id: 6, name: "Portables", parent: 3 },
  { id: 7, name: "Tablets", parent: 6 },
  { id: 8, name: "Electronics", parent: null },
  { id: 18, name: "Camping", parent: null },
  { id: 10, name: "TV", parent: 8 },
  { id: 20, name: '11 pol', parent: 7 },
  { id: 13, name: "Remotes", parent: 14 },
  { id: 14, name: "Accessories", parent: 10 }
]

export default function() {
  // pega a tag principal que irá receber o menu

  const tree = document.querySelector('div#tree')
  
  // recebe toda a arvore de elementos
  const menu = document.createElement('ul')  
  
  const firstLevel = data.filter(item => !item.parent)
  const getFirstLis = firstLevel.map(buildTree) // retorno novo array com li's
  getFirstLis.forEach(li => menu.append(li)) // adicionar li's ao menu  
  
  function buildTree(item) {

    // primeiro elemento
    const li = document.createElement('li')
    li.innerHTML = item.name
    
    const children = data.filter(child => child.parent === item.id)
    
    if(children.length > 0) {
      
      //adiciona um click para os parents
      li.addEventListener('click', event => {
        event.stopPropagation()
        event.target.classList.toggle('open')
      })
      
      // adiciona uma classe identificadora de que tem filhos
      li.classList.add('has-children')
      
      // constroi os filhos
      const subMenu = document.createElement('ul')
      children.map(buildTree).forEach(li => subMenu.append(li))
      li.append(subMenu)
    }
    
    // adicionar os elements ao menu
    return li
  }
  
  // adiciona o menu no HTML
  tree.append(menu)

  return null
}
  