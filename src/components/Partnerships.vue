<template>
  <section id="partnerships" class="solo">
    <h2>We’re looking forward to getting to know you!</h2>
    <div class="narrow-form">
      <h3>What’s your name?</h3>
      <input type="text" v-model="contact.first_name" placeholder="First" />
      <input type="text" v-model="contact.last_name" placeholder="Last" />
      <h3>What’s your email?</h3>
      <input type="text" v-model="contact.email" placeholder="example@gmail.com" />
      <h3>What’s your phone number?</h3>
      <input type="text" v-model="contact.phone" placeholder="xxx.xxx.xxxx" />
      <h3>What’s your role?</h3>
      <input type="text" v-model="contact.role" placeholder="ex. Marketing Director" />
      <h3>What’s your company website?</h3>
      <input type="text" v-model="contact.website" placeholder="ex: www.baa.org " />
      <h3>Optional*: Tell us what kind of partnership you’re interested in</h3>
      <textarea v-model="contact.body"></textarea>
      <button style="margin-top: 40px;" @click="submit">Send</button>
    </div>
  </section>
</template>

<script>
// TODO This component ignores the query params in the links on the contact
// page. Either remove those params, or do something with them here.

import rp from '../rp'

export default {
  name: 'rp-partnerships',
  data () {
    return {
      contact: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        role: '',
        website: '',
        body: ''
      }
    }
  },
  methods: {
    submit () {
      rp.post('contacts', this.contact)
      // TODO display a confirmation message
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
#partnerships.solo {
  text-align: left;
}
#partnerships input {
  width: 100%;
  padding: 11px;
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
}
#partnerships button {
  width: 100%;
  padding: 11px;
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
}
#partnerships textarea {
  width: 100%;
  display: block;
  min-height: 175px;
}
#partnerships h3 {
  color: #abaeb7;
  font-size: 18px;
  font-weight: 500;
  line-height: 25px;
  margin: 20px 0 10px 0;
}
.narrow-form {
  max-width: 300px;
  margin: 14px auto 14px auto;
}
</style>
