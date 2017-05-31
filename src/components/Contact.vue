<template>
  <section class="solo" id="contact">
    <h1>Contact</h1>
    <p>Any questions? Check out our <router-link to="/faq">FAQ</router-link> or send us a note &amp; we’ll respond shortly<br />
      <a href="mailto:support@racepass.com">support@racepass.com</a>
    </p>
    <p>Feedback is a gift! Let us know your thoughts &amp; help shape the product<br />
      <a href="mailto:feedback@racepass.com">feedback@racepass.com</a>
    </p>
    <p>For partnership inquiries<br />
      <router-link to="/partnerships?type=race_director">Race directors</router-link><br />
      <router-link to="/partnerships?type=race_sponsor">Race sponsors</router-link><br />
      <router-link to="/partnerships?type=athletic_brand">Athletic brands</router-link><br />
    </p>
    <p>For press inquiries<br />
      <a href="mailto:press@racepass.com">press@racepass.com</a>
    </p>
  </section>
</template>

<script>
export default {
  name: 'rp-contact'
}
</script>

<style scoped>
#contact {
  text-align: center;
}
#contact a {
  color: #0dffae;
}
#contact p {
  max-width: 280px;
}
</style>
