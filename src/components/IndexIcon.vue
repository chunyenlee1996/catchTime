<template>
  <div class="icon">
    <div class="topLeft" />
    <div class="bottomRight" />
    <img src="../assets/white_catchTime.svg" class="q-mr-xs logo" />
    <div class="slogan text-center">享受每個快門的瞬間</div>
    <div class="slogan2 text-center">Emotionally Immersed</div>
  </div>
</template>

<style>
.filter {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #41404065;
  z-index: 1;
}

.icon {
  width: 300px;
  height: 300px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 30%;
  left: 50%;
  background-color: rgba(255, 255, 255, 0.229);
  z-index: 2;
}

.topLeft {
  position: relative;
  width: 60px;
  height: 20px;
  top: 0;
  left: 0;
  background-color: #fff;
}

.topLeft::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 40px;
  top: 20px;
  left: 0;
  background-color: #fff;
}

.bottomRight {
  position: absolute;
  width: 60px;
  height: 20px;
  bottom: 0;
  right: 0;
  background-color: #fff;
}

.bottomRight::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 40px;
  bottom: 20px;
  right: 0;
  background-color: #fff;
}

.logo {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100px;
}

.slogan {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, 0);
  color: #fff;
}

.slogan2 {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, 0);
  color: #fff;
  font-family: 'En1';
  font-size: 33px;
  font-weight: 600;
}
</style>
