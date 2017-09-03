<template>
<div class="row justify-content-center no-gutters">
    <div class="col-12 col-sm-8 col-md-8 col-lg-6">
    <section>
      <div class="container">
        <div class="row">
          <div class="col">
            <h1>Racepass helps runners find the best endurance races</h1>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-7" >
            <h2>Find more races here than anywhere else</h2>
            <p>With more than 20,000 listings and counting, Racepass has the most 
                extensive directory of endurance races online. As a team of former 
                Googlers, we’ve set out to make race search easier than ever.</p>
          </div>
          <div class="col-12 col-md-5" style="text-align:center">
            <img src="/static/imgs/map.png" style="width: 180px;">
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-5" style="text-align:center">
            <img src="/static/imgs/icons/runners/justice.png" style="width: 130px">
          </div>
          <div class="col-12 col-md-7" style="text-align:right">
            <h2>Unbiased search results</h2>
            <p>We don’t rely on registration for revenue, so we don’t limit the 
                races you can find based on which races use our registration tools.</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-7">
            <h2>Get all the details you need in one spot, from any device</h2>
            <p>For the first time, you’ll be able to use any device to research 
                your races - from start times & interactive course maps to 
                amenities and expo details.</p>
          </div>
          <div class="col-12 col-md-5" style="text-align:center">
            <img src="/static/imgs/icons/runners/phone.png" style="width: 130px">
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-5" style="text-align:center">
          <img src="/static/imgs/icons/runners/runners.png" style="width: 130px">
          </div>
          <div class="col-12 col-md-7" style="text-align:right">
            <h2>For runners, by runners</h2>
            <p>Race profiles are written and updated by the running community. 
            As a runner, you can update event details & put any event on the map. 
            If you’ve finished a race, you can write reviews and help the community 
            support the best races.</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-8 col-md-6" style="text-align:center">
          <button class="large" style="width:100%; margin-bottom: 20px;">Create free account</button>
          <p style="font-weight: 900">Have additional questions? Check out our <em><router-link to="/runner-faq">Runner FAQ</router-link></em></p>
        </div>
      </div>
      </div>
    </section>
  </div>
</div>
</template>

<script>
export default {
  name: 'rp-runners',
}
</script>

