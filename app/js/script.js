
const ivan =  ["4", "6", "1", "5", "3", "4"];
const princess = ["6", "5", "2", "3", "4", "1"];
const roy = ["3", "1", "4", "5", "2", "6"];
const lilbigmc = ["2", "5", "1", "4", "3", "6"]
var newOrder1 = ["1", "2", "3", "4", "5", "6"];
var dragSrcElement = null;

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

function countInversions(array) {

  function mergeAndCountInversions(left, right) {
    let mergedArray = [];
    let count = 0;
    let i = 0;
    let j = 0;


    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        mergedArray.push(left[i]);
        i++;
      } else {
        mergedArray.push(right[j]);
        j++;
        count += left.length - i;
      }
    }


    while (i < left.length) {
      mergedArray.push(left[i]);
      i++;
    }


    while (j < right.length) {
      mergedArray.push(right[j]);
      j++;
    }

    return { mergedArray, count };
  }

  function mergeSortAndCount(array) {
    if (array.length <= 1) {
      return { sortedArray: array, count: 0 };
    }

    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    const { sortedArray: sortedLeft, count: leftCount } = mergeSortAndCount(
      left
    );
    const { sortedArray: sortedRight, count: rightCount } = mergeSortAndCount(
      right
    );

    const { mergedArray, count: splitCount } = mergeAndCountInversions(
      sortedLeft,
      sortedRight
    );

    return { sortedArray: mergedArray, count: leftCount + rightCount + splitCount };
  }

  const { count } = mergeSortAndCount(array);
  return count;
}

function consultar(){
console.log('New order:', newOrder1);


let raccoon1 = Math.abs(countInversions(princess) - countInversions(newOrder1))
let raccoon =Math.abs(countInversions(ivan) - countInversions(newOrder1))
let raccoon2 = Math.abs(countInversions(roy) - countInversions(newOrder1))
let raccoon3 = Math.abs(countInversions(lilbigmc) - countInversions(newOrder1))

console.log(raccoon,raccoon1,raccoon2,raccoon3)

const x = confereResposta(raccoon,raccoon1,raccoon2,raccoon3)

console.log(x);
document.getElementById("main").style.display = 'none'
document.getElementById("resposta").style.display = 'flex'
document.getElementById(x).style.display = 'block'
document.getElementById(x+"txt").style.display = 'block'
document.getElementById("voltar").style.display = 'block'
}

function confereResposta(raccoon,raccoon1,raccoon2,raccoon3){

if(raccoon < raccoon1 && raccoon < raccoon2 && raccoon < raccoon3) return "raccoon" 
else if(raccoon1 < raccoon && raccoon1 < raccoon2 && raccoon1 < raccoon3) return "raccoon1"
else if(raccoon2 < raccoon1 && raccoon2 < raccoon && raccoon2 < raccoon3) return "raccoon2"
else if(raccoon3 < raccoon1 && raccoon3 < raccoon && raccoon3 < raccoon2) return "raccoon3"
else if(raccoon == raccoon1 || raccoon == raccoon2 || raccoon == raccoon3) return "raccoon"
else if(raccoon1 == raccoon2 || raccoon1 == raccoon3) return "raccoon1"
else if(raccoon2 == raccoon3) return "raccoon2"

}
