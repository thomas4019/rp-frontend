<template>
  <modal classes="rp-modal" :adaptive="true" :height="500" :width="750" name="cancel">
    <button type="button" class="rp-modal-close" aria-label="Close" @click="$modal.hide('cancel')"><span aria-hidden="true">&times;</span></button>
      <h2>Let us know why you’re cancelling so we can make Racepass work better for you</h2>
      <div id="option-container">
        <button :class="{'hollow': cancellation_reason!=reason}" class="cancel-option" v-for="reason in cancellation_reasons" @click="select_cancellation(reason)">{{reason}}</button>
        <textarea v-model="cancellation_reason_other" v-if="cancellation_reason=='Other'" class="full writein" placeholder="Write us a sentence or two why you cancelled"></textarea>
        <button class="button full submit" @click="submit_cancellation()">Submit</button>
      </div>
  </modal>
</template>

<script>
export default {
  name: 'race-cancel',
  computed: {
    race () {
      return this.$store.state.selectedRace
    }
  },
  data () {
    return {
      cancellation_reason_other: '',
      cancellation_reason: '',
      cancellation_reasons: [
        'Lost motivation',
        'No friends or family racing',
        'Work / travel conflict',
        'Didn’t train enough',
        'Worried about racing injury',
        'Didn’t like previous race(s)',
        'I’ve suffered an illness / injury',
        'Bereavement',
        'Other',
      ]
    }
  },
  methods: {
    select_cancellation (reason) {
      this.cancellation_reason = reason
    },
    submit_cancellation () {
      this.$modal.hide('cancel')
      this.$store.dispatch('cancelRegistration', this.cancellation_reason)
      this.cancellation_reason = ''
    },
    show () {
      this.cancellation_reason = ''
      this.$modal.show('cancel')
    },
    registerForRace () {
      this.$state.commit('registerForRace', this.$store.state.selectedRace)
    }
  }
}
</script>

<style scoped>
  .rp-modal {
    padding: 40px;
    text-align: center;
  }
  #cancel-container {
    padding: 28px;
    background-color: rgb(36, 39, 42);
    min-height: 400px;
  }
  #cancel-container h1 {
    padding: 30px 113px 30px 113px;
  }
  #cancel-container .close {
    text-shadow: none;
    color: #9B9B9B;
    font-size: 14px;
    opacity: 1;
  }
  #option-container {
    margin: 20px auto;
    width: 400px;
    height: 350px;
    text-align: center;
  }
  .cancel-option {
    /*padding: 15px 9px 18px 8px;*/
    width: 125px;
    height: 54px;
    margin: 3px 4px;
    float: left;
  }
  #option-container .submit {
    margin: 50px 0px 50px 0px;
    height: 34px;
  }
  #option-container .writein {
    margin-top: 28px;
    border-radius: 8px;
    padding: 14px;
    color: black;
  }
</style>
