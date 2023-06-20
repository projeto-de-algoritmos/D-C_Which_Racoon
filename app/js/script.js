function handleDragStart(e) {
  dragSrcElement = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  this.classList.add('over');
}
 
function handleDragLeave(e) {
  this.classList.remove('over');
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcElement !== this) {
    dragSrcElement.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }


  var items = document.querySelectorAll('.sortableItem');
  var newOrder = Array.from(items).map(function(item) {
    return item.lastElementChild.id;
  });
  var x = 0
 

  newOrder.forEach( item =>{
    newOrder1[x] = item
    x++
  })
  return false;
}

function handleDragEnd(e) {
  var items = document.querySelectorAll('.sortableItem');
  items.forEach(function(item) {
    item.classList.remove('over');
  });
}

var items = document.querySelectorAll('.sortableItem');
items.forEach(function(item) {
  item.addEventListener('dragstart', handleDragStart, false);
  item.addEventListener('dragenter', handleDragEnter, false);
  item.addEventListener('dragover', handleDragOver, false);
  item.addEventListener('dragleave', handleDragLeave, false);
  item.addEventListener('drop', handleDrop, false);
  item.addEventListener('dragend', handleDragEnd, false);
});
