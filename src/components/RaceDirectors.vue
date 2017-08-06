<template>
  <div>
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
          <div class="col-12 col-md-6">
            <h2>Claim your events</h2>
            <p>Use our search engine to find your race events. 
              Once you’ve visited your race profiles, click “Claim 
              this race”. We’ll verify that you’re the race diector 
              and we’ll give you authority over the details on your 
              page, access to analytics and much more.</p>
          </div>
          <div class="col-12 col-md-6">
          { { image } }
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6">
          { { image } }
          </div>
          <div class="col-12 col-md-6">
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
          <div class="col-12 col-md-6">
            <h2>Acquire new regisrants</h2>
            <p> Since every runners is looking to sign up for 
              races on our platform, your marketing investment 
              can generate a much stronger ROI with Racepass. 
              If you’re interested in advertising, please email 
              us at partners@racepass.com. </p>
          </div>
          <div class="col-12 col-md-6">
          { { image } }
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
      <div class="row justify-content-center">
        <div class="col-12" style="text-align:center">
          <button class="hollow">Claim my race events</button>
        </div>
      </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'rp-race-directors',
  components: {
    'rp-question': () => import('@/components/Question')
  }
}
</script>

<style scoped>
.container {
  max-width: 1000px !important;
}
</style>
