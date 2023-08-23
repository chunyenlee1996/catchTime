<template>
  <div class="IndexContainer">
    <div class="icon">
      <div class="topLeft" />
      <div class="bottomRight" />
      <img src="../assets/white_catchTime.svg" class="q-mr-xs logo" />
      <div class="slogan text-center">享受每個快門的瞬間</div>
      <div class="slogan2 text-center">Emotionally Immersed</div>
    </div>
  <div class="bottomsBox">
    <div class="bottom">
      <!-- <div class="topLeft_btn" />
      <div class="bottomRight_btn" /> -->
      <q-btn class="routerBtn" flat  label="發現" to="/ImagePage" />
    </div>
    <div class="bottom" >
      <!-- <div class="topLeft_btn" />
      <div class="bottomRight_btn" /> -->
      <q-btn class="routerBtn" flat  label="論壇" to="/PTTPage" />
    </div>
    <div class="bottom">
      <!-- <div class="topLeft_btn" />
      <div class="bottomRight_btn" /> -->
      <q-btn class="routerBtn" flat  label="活動" to="/ActivityPage" />
    </div>
  </div>
</div>
</template>
<style scoped>
.IndexContainer{
  width: 400px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.229);
}
.icon {
  width: 300px;
  height: 300px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 30%;
  left: 50%;
  /* background-color: rgba(255, 255, 255, 0.229); */
  z-index: 2;
}

.topLeft_btn {
  position: relative;
  width: 15px;
  height: 5px;
  top: 0;
  left: 0;
  background-color: #fff;
}
.topLeft_btn::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 15px;
  top: 0;
  left: 0;
  background-color: #fff;
}

.bottomRight_btn {
  position: absolute;
  width: 15px;
  height: 5px;
  bottom: 0;
  right: 0;
  background-color: #fff;
}

.bottomRight_btn::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 15px;
  bottom: 0;
  right: 0;
  background-color: #fff;
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
.bottomsBox{
  width: 100%;
  height: 7%;
  position: absolute;
  top: 70%;
  display: flex;
  justify-content: space-around;
}
.bottom{
  width: 25%;
  height: 100%;
  /* background-color: #333; */
  position: relative;
}
.routerBtn{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* display: block; */
  width: 100%;
  height: 100%;
  font-size: 15px;
  color: #fff;
  border-bottom: 1px solid #fff;
}
</style>
