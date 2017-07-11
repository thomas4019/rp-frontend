<template>
  <div>
    <section v-if="!paymentComplete" id="payment" v-bind:class="{ paymentComplete : paymentComplete }">
      <h2 style="margin-top: 0px">Let's get you up & running</h2>
      <div id="pane-container" class="row">
        <div id="right-pane" class="col-sm-6 push-sm-6">
          <select v-model="passType" v-on:change="update()" style="width: 100%">
            <option v-for="(value, name) in fancyNameToType" :value="value">{{name}} Pass</option>
          </select>
          <div v-if="passType=='freeTrial'" class="pass-body">
            <ul>
              <li>Search our inventory</li>
              <li>Try it out now</li>
            </ul>
          </div>
          <div v-if="passType=='3races'" class="pass-body">
            <div class="pass-count">3 Races</div>
            <p>26.2 • 13.1<br>
              10k • 5k • Fun Runs
            </p>
          </div>
          <div v-if="passType=='5races'" class="pass-body">
            <div class="pass-count">5 Races</div>
            <p>26.2 • 13.1<br>
              10k • 5k • Fun Runs
            </p>
          </div>
          <div v-if="passType=='12races'" class="pass-body">
            <div class="pass-count">12 Races</div>
            <p>26.2 • 13.1<br>
              10k • 5k • Fun Runs
            </p>
          </div>
          <div v-if="passType=='unlimited'" class="pass-body">
            <div class="pass-count">Unlimited Races</div>
            <p>26.2 • 13.1<br>
              10k • 5k • Fun Runs
            </p>
          </div>
          <div id="summary">
            <table>
              <tr>
                <td>12 Month Subscription</td>
                <td>${{baseCost}}<span v-if="finalCost > 0">&nbsp;+&nbsp;Tax</span></td>
              </tr>
              <tr v-if="promoApplied">
                <td><em>Promo</em></td>
                <td><em>-${{promoDiscount}}</em></td>
              </tr>
              <tr>
                <td>Pass valid through</td>
                <td>{{endDate}}</td>
              </tr>
              <tr v-if="promoApplied">
                <td>Final Cost</td>
                <td>${{finalCost}}<span v-if="finalCost > 0"> + Tax</span></td>
              </tr>
            </table>
          </div>
        </div>
        <div id="left-pane" class="col-sm-6 pull-sm-6">
          <form id="checkout-form">
            <div v-if="passType != 'freeTrial'">
            <div id="card-details">
              <div id="error-message"></div>
                <div id="payment-row-1">
                  <svg class="payment-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                  </svg>
                  <div class="hosted-field" id="card-number"></div>
                </div>
                <div id="payment-row-2">
                  <div class="half">
                    <svg class="payment-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                    </svg>
                    <div class="hosted-field" id="expiration-date"></div>
                  </div>
                  <div class="half" id="right-half">
                    <svg class="payment-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                    <div class="hosted-field" id="cvv"></div>
                  </div>
                </div>
              </div>
              <br>
              <p @click="togglePromo()">Use <em>promo code</em> or <em>gift card</em>
              <b v-if="promoOpen">⌵</b><b v-if="!promoOpen">></b>
              </p>
              <div v-if="promoOpen" id="promo-container">
                <input id="email" placeholder="Code" v-model="promoCodeField" />
                <button type="button" id="promo-apply" @click="applyPromo()">Apply</button>
              </div>
            </div>
            <input type="hidden" name="payment-method-nonce">
            <button v-if="passType == 'freeTrial'" id="free-submit" class="full" @click="skip(); $event.preventDefault()">
              <span v-if="!paymentComplete">Free! Create your profile</span>
              <span v-if="paymentComplete">
                (<i class="fa fa-check" aria-hidden="true"></i>)
              </span>
              <i v-if="purchaseInProgress" class="fa fa-spinner fa-spin fa-fw"></i>
              <span v-if="purchaseInProgress" class="sr-only">Processing...</span>
            </button>
            <button v-if="passType != 'freeTrial'" id="submit" type="submit" class="full" @click="purchase(); $event.preventDefault()" disabled>
              <span v-if="!paymentComplete">Pay ${{finalCost}}</span>
              <span v-if="paymentComplete">
                (<i class="fa fa-check" aria-hidden="true"></i>)
              </span>
              <i v-if="purchaseInProgress" class="fa fa-spinner fa-spin fa-fw"></i>
              <span v-if="purchaseInProgress" class="sr-only">Processing...</span>
            </button>
            <p id="footer-text">By purchasing, I agree to the Terms of Use & Privacy Policy. By purchasing, I understand my membership automatically renews at the annual subscription and I can cancel on site at any time.</p>
            <p v-if="passType!='freeTrial'">Or <em @click="skip()">skip payment</em> (try out the site first)</p>
          </form>
        </div>
      </div>
    </section>

    <section v-if="paymentComplete" id="payment-complete" class="solo">
      <h2>Payment Complete</h2>
      <p>Cool runnings! We’ve sent you an email with all of your payment details for your reference</p>
      <div class="bordered details">
        <table class="divided">
          <tr style="font-weight: 900;">
            <td colspan="2">
              {{passName}} Pass
            </td>
          </tr>
          <tr>
            <td>
              12 Month Subscription
              {{ start_date | moment("MM/DD/YYYY") }} - {{ end_date | moment("MM/DD/YYYY") }}
            </td>
            <td>
              ${{baseCost}}
            </td>
          </tr>
          <tr v-if="passType != 'freeTrial'">
            <td>
              Payment Method
            </td>
            <td>
              {{cardDetails.maskedNumber}}
            </td>
          </tr>
          <tr>
            <td>
              Total
            </td>
            <td>
              ${{finalCost}}
            </td>
          </tr>
          <tr>
            <td colspan="2">
              Order Confirmation Number<br>
              <em>{{transaction_id}}</em>
            </td>
          </tr>
        </table>
      </div>

      <!--transaction_id={{paymentc.details}}-->
      <router-link to="/app/profile" id="payment-leave">
        <button>
          Set up my profile & register for races
        </button>
      </router-link>

    </section>
  </div>
</template>

<script>
import rp from '../rp'
import toastr from 'toastr'
/* global braintree:true hostedFieldsInstance:true */

function includeJs (jsFilePath) {
  var js = document.createElement('script')
  js.type = 'text/javascript'
  js.src = jsFilePath
  document.body.appendChild(js)
}

function loadBraintreeIfNotLoaded () {
  // if (window.hostedFieldsInstance) {
  //  return
  // }

  rp.get('checkouts/new')
    .then(function (data) {
      loadBraintree(data.clientToken)
    })
}

function loadBraintree (authorization) {
  var submit = document.querySelector('button[type="submit"]')

  braintree.client.create({
    authorization: authorization
  }, function (clientErr, clientInstance) {
    if (clientErr) {
      // Handle error in client creation
      return
    }

    braintree.hostedFields.create({
      client: clientInstance,
      styles: {
        'input': {
          'font-size': '18px',
          'background-color': 'white',
        },
        'input::-webkit-input-placeholder': {
          'color': '#ABAEB7',
        },
        'input::-moz-placeholder': {
          'color': '#ABAEB7'
        },
        'input:-ms-input-placeholder': {
          'color': '#ABAEB7'
        },
        'input.invalid': {
          'color': 'red'
        },
        'input.valid': {
          'color': 'black'
        }
      },
      fields: {
        number: {
          selector: '#card-number',
          placeholder: 'Card Number'
        },
        cvv: {
          selector: '#cvv',
          placeholder: 'CVC'
        },
        expirationDate: {
          selector: '#expiration-date',
          placeholder: 'MM/YYYY'
        }
      }
    }, function (hostedFieldsErr, hfi) {
      if (hostedFieldsErr) {
        // Handle error in Hosted Fields creation
        return
      }
      window.hostedFieldsInstance = hfi

      submit.removeAttribute('disabled')
    })
  })
}

export default {
  name: 'payment',
  methods: {
    togglePromo () {
      this.promoOpen = !this.promoOpen
    },
    update () {
      this.baseCost = rp.passPrices[this.passType]
      this.finalCost = this.baseCost
      if (this.passType === 'freeTrial') {
        delete window.hostedFieldsInstance
      } else {
        loadBraintreeIfNotLoaded()
      }
    },
    applyPromo () {
      var code = this.promoCodeField.toUpperCase()
      rp.get('apply_promo?code=' + code)
        .then((codeDetails) => {
          this.promoApplied = true
          this.promoDiscount = codeDetails.value
          this.finalCost = this.baseCost - this.promoDiscount
          this.promoCode = this.promoCodeField
          if (codeDetails.race_credits) {
            toastr.success(codeDetails.race_credits + 'race credit' + (codeDetails.race_credits > 1 ? 's' : '') + ' has been added to your account.')
            this.skip()
          }
          if (codeDetails.message) {
            toastr.error(codeDetails.message || 'Error while attempting to apply promo code')
          }
        }, function (err) {
          toastr.error(err.message || 'Error while attempting to apply promo code')
        })
    },
    purchase () {
      this.purchaseInProgress = true

      hostedFieldsInstance.tokenize((tokenizeErr, payload) => {
        if (tokenizeErr) {
          // Handle error in Hosted Fields tokenization
          toastr.info(tokenizeErr.message)
          console.log(tokenizeErr)
          return
        }

        var paymentData = {
          passType: this.passType,
          payment_method_nonce: payload.nonce,
          promo: this.promoCode,
          base_cost: this.baseCost,
          final_cost: this.finalCost,
          start_date: this.start_date,
          end_date: this.end_date
        }
        rp.post('purchase', paymentData)
          .then((data) => {
            if (data.status === 'failure') {
              toastr.error('We ran into an issue while processing your card. Please try again and contact info@racepass.com if the issue continues. Thanks for your patience.')
              console.error(data)
            } else {
              delete paymentData.payment_method_nonce
                /* this.$ga.require('ecommerce')
              console.log(this.$ga)
              this.$ga('ecommerce:addTransaction', {
                'id': data.transaction_id,        // Transaction ID. Required.
                'affiliation': 'racepass',        // Affiliation or store name.
                'revenue': this.finalCost,        // Grand Total.
                'tax': '0'                        // Tax.
              })
              this.$ga('ecommerce:addItem', {
                'id': data.transaction_id,        // Transaction ID. Required.
                'name': this.passName,
                'sku': this.passType,
                'price': this.cost_per_event,
                'quantity': this.num_races,
              })
              this.ga('ecommerce:send') */
              this.cardDetails = data.cc
              this.transaction_id = data.transaction_id
              this.paymentComplete = true
            }
            this.purchaseInProgress = false
          }, function (data) {
            this.purchaseInProgress = false
            toastr.error('We ran into an issue while processing your card. Please try again and contact info@racepass.com if the issue continues. Thanks for your patience.')
            console.error(data)
          })
      })
    },
    skip () {
      if (localStorage.buyType === 'freeTrial') {
        localStorage.buyType = '3races'
      }
      var data = {
        $set: { 'paymentSkipped': true }
      }
      rp.post('users/' + this.$store.getters.getUserId + '/update', data)
          .then((result) => {
            this.$router.push('/app/profile')
          }, function (err) {
            console.error(err)
            console.error('error saving pamyent skip status')
          })
    }
  },
  mounted: function () {
    includeJs('https://js.braintreegateway.com/web/3.6.3/js/client.min.js')
    includeJs('https://js.braintreegateway.com/web/3.6.3/js/hosted-fields.min.js')
    loadBraintreeIfNotLoaded()
    if (localStorage.buyType === 'unlimited') {
      // If the person clicked "pro" previously, change the selection to the 12 races plan.
      localStorage.buyType = '12races'
    }
    this.passType = localStorage.buyType || '3races'
    this.passName = rp.passNames[this.passType]
    this.update()
  },
  data () {
    var nextYear = new Date()
    nextYear.setFullYear(nextYear.getFullYear() + 1)
    return {
      fancyNameToType: {
        'Free Trial': 'freeTrial',
        'Contender': '3races',
        'Athlete': '5races',
        'Pro': '12races',
        // Pro pass currently shouldn't show up in the dropdown
        // 'Pro': 'unlimited'
      },
      passType: '3races',
      passName: rp.passNames['3races'],
      email: window.localStorage.email || '',
      promoCode: '',
      endDate: (nextYear.getMonth() + 1) + '/' + (nextYear.getDate()) + '/' + nextYear.getFullYear(),
      promoCodeField: '',
      promoDiscount: 0,
      promoOpen: false,
      promoApplied: false,
      purchaseInProgress: false,
      paymentComplete: false,
      baseCost: 0,
      finalCost: 0,
      start_date: new Date(),
      end_date: new Date().setDate(new Date().getDate() + 365),
      cardDetails: {}
    }
  }
}
</script>

<style scoped>
#payment {
	background: #323237;
	border-radius: 6px;
	margin: 20px auto 20px auto;
	padding: 30px;
	max-width: 675px;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.25);
}
#pane-container {
	padding: 15px;
}
#left-pane {
	padding-left: 0px;
}
#right-pane {
	border: 1px solid white;
	border-radius: 5px;
}
#right-pane table {
	width: 100%;
}
#right-pane table tr td:last-child {
	text-align: end;
	width: 75px;
}

#card-details {
	background: #F7F7F7;
	color: black !important;
	border-radius: 6px;
}
#payment-row-1 {
	display: flex;
	padding: 5px;
}
#payment-row-2 {
	display: flex;
	border-top: 1px solid #323237;
	padding: 5px;
}
.hosted-field {
	height: 26px;
}
.payment-icon {
	display: inline-block;
	margin: 3px;
	width: 40px;
}
.half {
	flex: 1;
	display: flex;
}
#right-half {
	border-left: 1px solid #323237;
}

#email, #num_races {
	margin-bottom: 10px;
}
#promo-container {
	display: flex;
}
#promo-apply {
	margin-left: 5px;
	height: 40px;
	width: 100px;
}
#submit, #free-submit {
	margin: 10px 0;
	padding: 5px;
	font-size: 18px;
}
#footer-text {
	font-size: 12px;
}
#right-pane p {
	margin: 0px 0px 15px 0px;
}
#right-pane select {
	margin-top: 20px;
	background-color: #323237;
	color: #F7F7F7;
	font-size: 24px;
	height: 42px;
}
#right-pane .pass-body {
	padding: 15px;
	border-bottom: 1px solid white;
	/*border-top: 1px solid white;*/
	font-size: 20px;
}
#right-pane #summary {
	padding: 15px;
}

#payment.paymentComplete #submit {
	background: #0062FF;
	border: none;
}
#next {
	padding: 5px;
	font-size: 18px;
	display: none;
}
#payment.paymentComplete #next {
	display: inline-block;
}

#error-message {
	margin-top: 10px;
	color: #0DFFAE;
}

#payment em {
	cursor: pointer;
}


#payment-complete .details {
  max-width: 287.7px;
  margin: 5px auto 45px auto;
}
#payment-complete table tr td:first-child {
  text-align: start;
}
#payment-complete table tr td:nth-child(2) {
  text-align: end;
  width: 75px;
}
#payment-complete #payment-leave button {
  display: block;
  width: 287.95px;
  height: 48.59px;
  padding-top: 5px;
  margin: 45px auto 5px auto;
}
</style>
