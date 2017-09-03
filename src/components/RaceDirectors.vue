<template>
<div class="row justify-content-center no-gutters">
    <div class="col-12 col-sm-8 col-md-8 col-lg-6">
    <section>
      <div class="container">
        <div class="row">
          <div class="col">
            <h1>Racepass helps race directors 
            increase visibility & registration 
            for their events</h1>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-7" >
            <h2>Claim your events</h2>
            <p>Use our search engine to find your race events. 
              Once you’ve visited your race profiles, click “Claim 
              this race”. We’ll verify that you’re the race diector 
              and we’ll give you authority over the details on your 
              page, access to analytics and much more.</p>
          </div>
          <div class="col-12 col-md-5" style="text-align:center">
            <img src="/static/imgs/flat_map.png" style="width: 130px;">
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-5" style="text-align:center">
            <img src="/static/imgs/stopwatch_ticks.png" style="width: 130px">
          </div>
          <div class="col-12 col-md-7" style="text-align:right">
            <h2>Update your details</h2>
            <p>After you’ve claimed your race listing, you can 
              make sure all of the details are accurate and up 
              to date. By giving runners more rich info about 
              your race, such as your course map, start times 
              and expo details, you’ll increase your odds of 
              acquiring new registrants.</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-7">
            <h2>Acquire new registrants</h2>
            <p> Since every runners is looking to sign up for 
              races on our platform, your marketing investment 
              can generate a much stronger ROI with Racepass. 
              If you’re interested in advertising, please email 
              us at partners@racepass.com. </p>
          </div>
          <div class="col-12 col-md-5" style="text-align:center">
            <img src="/static/imgs/megaphone.png" style="width: 130px">
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-5" style="text-align:center">
          <img src="/static/imgs/growth.png" style="width: 130px">
          </div>
          <div class="col-12 col-md-7" style="text-align:right">
            <h2>Increase registration</h2>
            <p> Since every runner is looking to sign up for races on our 
              platform, your marketing investment can get you more registrants
               at a lower cost with Racepass. If you’re interested in 
               advertising, please email us at <em>partners@racepass.com</em>. </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-8 col-md-6" style="text-align:center">
          <button class="large" style="width:100%; margin-bottom: 20px;">Claim my race events</button>
          <p style="font-weight: 900">Have additional questions? Check out our <em><router-link to="/race-directors-faq">Race Director FAQ</router-link></em></p>
        </div>
      </div>
      </div>
    </section>
  </div>
</div>
</template>

<script>
export default {
  name: 'rp-race-directors',
}
</script>

