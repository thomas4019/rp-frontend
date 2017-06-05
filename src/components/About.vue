<template>
  <section id="about" class="solo-noborder row" v-once>
    <div id="team-menu" class="col-sm-3" style="padding: 5px 5px 40px 5px; text-align: right;">
      <router-link class="active" to="/about">About us</router-link>
      <router-link to="/team">Meet the team</router-link>
    </div>
    <div class="hidden-xs divider2 col-sm-1">
    </div>
    <div id="about-body" class="col-sm-8" style="padding: 0px 40px 40px 40px;">
      <h1>About Us</h1>
      <div style="margin-bottom: 10px; text-align: center;">“Everything you ever wanted to know about yourself you can learn in 26.2 miles.”</div>
      <div style="float: right; margin: 0px 75px 20px 0px;">-Lori Culnane</div>
      <p class="story" style="margin-top: 70px;">Welcome to Racepass.</p>
      <p class="story">Our team met at Google while solving some interesting problems. One problem we kept running into (no pun intended) is why the endurance races we love are so complicated to sign up for and more importantly, why they’re so expensive. We feel that the simplistic nature of the sport isn’t reflected in the race industry, so we decided to do something about it.</p>
      <p class="story">As avid runners, we set out to create a product that actually encourages you to run more races without breaking the bank. Racepass has over 5,000 races and simplifies the discovery and registration process. Whether you’re an elite runner or just getting started, our flat fee/unlimited model removes any barriers (or excuses) to lace up, try new races and set a new PR.</p>
      <p class="story">More importantly, we wanted a product that reflected the community aspect of the sport. That’s why we added the ability to form teams with your social circles and compete on leaderboards. In our experience, running races with friends is just a lot more fun.</p>
      <p class="story">All in all, we’re glad you’re here and share our passion for the sport. We’re working hard to make running more accessible, but Racepass is just getting off the ground, and we’ve got a long way to go. We’ll need as much help and feedback to get this right, but like the old adage says; it’s not a sprint, its a marathon ;)</p>
      <div id="signatures">
        <img src="/static/imgs/signatures/chase.png" />
        <img src="/static/imgs/signatures/tom.png" />
        <img src="/static/imgs/signatures/thomas.png" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'rp-about'
}
</script>

<style scoped>
#about-body {
  font-size: 14px;
  font-weight: 900;
  line-height: 19px;
  color: #d8d8d8;
}
#team-menu a {
  font-size: 16px;
  font-weight: 900;
  line-height: 22px;
  color: #d8d8d8;
  display: block;
  margin-bottom: 20px;
  white-space: nowrap;
  margin-right: 35px;
}
#team-menu a.router-link-active {
  color: #0dffae;
}
#about-body h1 {
  margin-bottom: 20px;
}
#about-body p.story {
  color: #f7f7f7;
}
#signatures img {
  margin-top: 20px;
  margin-right: 30px;
}
.divider2 {
  border-right: 1px solid #979797;
  height: 640px;
  width: 1px;
}
@media screen and (max-width: 800px) {
  .divider2 {
    display: none;
  }
}
</style>
