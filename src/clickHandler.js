import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { config } from "./config";
import { collection, doc, getDoc, addDoc, getDocs, getFirestore } from "firebase/firestore"; 

const firebaseConfig = {

  apiKey: config.apiKey,

  authDomain: config.authDomain,

  projectId: config.projectId,

  storageBucket: config.storageBucket,

  messagingSenderId: config.messagingSenderId,

  appId: config.appId,

  measurementId: config.measurementId

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const charRef = collection(db, "characters");
const analytics = getAnalytics(app);

let targetY;
let targetX;

let hr = 0;
let min = 0;
let sec = 0;
let stoptime = false;

const found = []

function addSelector(){
/*    for(let i = 0; i < options.length; i++){
        options[i].addEventListener("click", function(e){
          let selection = e.target.getAttribute("data-char");
          checkTarget(selection);
        })
      }*/
      $(document).on('click','.options',function(e){
        let selection = e.target.getAttribute("data-char");
          checkTarget(selection);
        });
}


async function checkTarget(selection){
  let docRef = doc(db, "characters", selection);
  let docSnap = await getDoc(docRef);
  let data = docSnap.data();


  if(targetX >= data.x1 && targetX <= data.x2 && targetY >= data.y1  && targetY <= data.y2 ){
    let selectionStatus = document.getElementById(selection);
    selectionStatus.innerText = "Found";
    selectionStatus.classList.add("found")
    selectionStatus.classList.remove("not-found")
    found.indexOf(selection) === -1 ? found.push(selection) : console.log("This item already exists");
    checkWin();

  }else{
    alert("Try Again")
  }
}

async function checkWin(){
  let time;
  if(found.length >= 4){
    stopTimer()
    time = timer.innerText;
    let name = prompt("Congrats you win. Enter Your Name");
    let leaderboard = document.getElementById('leaderboard');
    try {
      const docRef = await addDoc(collection(db, "leaderboard"), {
        name: name,
        time: time,
        
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    const querySnapshot = await getDocs(collection(db, "leaderboard"));
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      let item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML = `<h3>${data.name}</h3>
                        <h3>${data.time}</h3>`;
      leaderboard.append(item);

    });

    leaderboard.classList.add('active');
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  }
}

function addListener() {
   /* document.getElementById('container').onclick = function clickEvent(e) {
        // e = Mouse click event.
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top;  //y position within the element.
        targetX = x;
        targetY = y;
        console.log("Left? : " + x + " ; Top? : " + y + ".");
        // Set the position for menu
        menu.style.top = `${y}px`;
        menu.style.left = `${x}px`;
        target.style.top = `${y-10}px`;
        target.style.left = `${x-10}px`;
    
        // Show the menu
        menu.classList.toggle('hidden');
        menu.classList.toggle('menu');
        target.classList.toggle('hidden');
        target.classList.toggle('target');
    
      }*/
      $(document).on('click','#container',function(e){
          let menu = document.getElementById('menu');
          let target = document.getElementById('target');
          // e = Mouse click event.
          let rect = e.target.getBoundingClientRect();
          let x = e.clientX - rect.left; //x position within the element.
          let y = e.clientY - rect.top;  //y position within the element.

          console.log("Left? : " + x + " ; Top? : " + y + ".");
          // Set the position for menu
          menu.style.top = `${y}px`;
          menu.style.left = `${x}px`;
          target.style.top = `${y-10}px`;
          target.style.left = `${x-10}px`;
      
          // Show the menu
          menu.classList.toggle('hidden');
          menu.classList.toggle('menu');
          target.classList.toggle('hidden');
          target.classList.toggle('target');
        });
        $(document).on('click','#game-img',function(e){
          // e = Mouse click event.
          let rect = e.target.getBoundingClientRect();
          let x = e.clientX - rect.left; //x position within the element.
          let y = e.clientY - rect.top;  //y position within the element.
          console.log(x ,y)
          targetX = x;
          targetY = y;

        });


}




function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
  let timer = document.getElementById('timer');
    if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

    timer.innerHTML = hr + ':' + min + ':' + sec;

    setTimeout(timerCycle, 1000);
  }
}

export {addListener, addSelector, timerCycle,}