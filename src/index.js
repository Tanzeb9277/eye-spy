import { addListener, addSelector, timerCycle, } from './clickHandler';
import './style.css';

function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML =`  <div class="header">

    <div class="top">
      <h2>Find The Following Images</h2>
      <div id="timer" class="timer">00:01</div>
    </div>

      <div class="chars">
        <div class="char-cards">
          <img src="https://upload.wikimedia.org/wikipedia/en/0/0a/Flappy_Bird_icon.png" alt="Flappy Bird">
          <h3>Flappy Bird</h3>
          <div class="status not-found" id="flappyBird">
           Found
        </div>
      </div>
      <div class="char-cards">
        <img src="https://cdnb.artstation.com/p/assets/covers/images/045/154/127/large/thibaut-granet-thibaut-granet-template-artstation-jinx.jpg?1642036430" alt="Jinx">
        <h3>Jinx</h3>
        <div class="status not-found" id="jinx">
          Not found
      </div>
    </div>
    <div class="char-cards">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" alt="Python">
      <h3>Python Logo</h3>
      <div class="status not-found" id="pythonLogo">
        Not found
    </div>
  </div>
  <div class="char-cards">
    <img src="https://media.istockphoto.com/vectors/owl-predatory-forest-bird-sketch-hand-drawing-black-and-white-vector-id1145844667?k=20&m=1145844667&s=612x612&w=0&h=fQV3SuSZ11r2d5KILlTKtasVTio3My7ckLPO6GMlLB4=" alt="Owl">
    <h3>Owl</h3>
    <div class="status not-found" id="owl">
      Not found
  </div>
</div>
    
      
    
    </div>
  
  </div>

  <div class="img-container" id='container'>
    <img src="https://i.redd.it/lnmh7c4kelr81.png" usemap="#image-map" id="game-img">
    <ul id="menu" class=" hidden absolute ">
      <li class="options" data-char="flappyBird">Flappy Bird</li>
      <li class="options" data-char="jinx">Jinx</li>
      <li class="options" data-char="pythonLogo">Python Logo</li>
      <li class="options" data-char="owl">Owl</li>
    </ul>
    <div id="target" class=" absolute hidden"></div>
  </div>
  <div id="leaderboard" class="leaderboard">
    <h2>Leaderboard</h2>
    <div class="item">
      <h3>First</h3>
      <h3>0:01:04</h3>
    </div>
  </div>`;
  
    return element;
  }
  
  document.body.appendChild(component());

  window.addEventListener('DOMContentLoaded', (_event) => {
    timerCycle();
  });
    addListener();
    addSelector();   
