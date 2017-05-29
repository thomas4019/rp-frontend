<template>
<div id="registration" class="container">

  <modal :show.sync="ShowMedicalModal" >
    <div slot="modal-header" class="modal-header">
      <h4 class="modal-title">Modal title</h4>
    </div>
    <div slot="modal-body" class="modal-body">...</div>
  </modal>

  <h1 v-if="page != 1">One-time registration for all your races</h1>
  <form id="p2" name="p2" v-if="page == 2" data-parsley-validate="">
    <p>Filling out this form will unlock one-click registartion for any race on our platform. All we need are the required details races ask of partcipants and we can take care of registration from now on!</p>
    <h3>What's your name?</h3>
    <input required v-model="data.first_name" type="text" name="first" placeholder="First" />
    <input required v-model="data.last_name" type="text" name="last" placeholder="Last" />
    <h3>Where do you currently live?</h3>
    <div class="err" id="addr-error"></div>
    <div class="addr-box">
      <div class="addr-row">
        <input v-model="data.address.line1" data-parsley-errors-container="#addr-error" required type="text" id="address" name="address" placeholder="Address" />
        <input v-model="data.address.line2" data-parsley-errors-messages-disabled type="text" id="apt" name="apt" placeholder="Apt No." />
      </div>
      <div class="addr-row">
        <input v-model="data.address.city"  data-parsley-errors-messages-disabled required type="text" id="city" name="city" placeholder="City" />
        <input v-model="data.address.state" data-parsley-errors-messages-disabled required type="text" id="state" name="state" placeholder="State" />
        <input v-model="data.address.zip" data-parsley-errors-messages-disabled required type="text" id="zip" name="zip" placeholder="ZIP" />
      </div>
    </div>
    <h3>What's your date of birth?</h3>
    <input  v-model="data.date_of_birth" required type="text" name="date_of_birth" placeholder="MM/DD/YYYY" />
    <button type="submit" v-on:click="next()" class="next">Next</button>
  </form>
  <form id="p3" name="p3" v-if="page == 3">
    <h3>What's your gender?</h3>
    <div class="err" id="gender-error"></div>
    <ul class="radio-buttons">
      <li>
        <input data-parsley-errors-container="#gender-error" required type="radio" id="male" v-model="data.gender" name="gender" value="male" />
        <label for="male">Male</label>
      </li>
      <li>
        <input required type="radio" v-model="data.gender" id="female" name="gender" value="female" />
        <label for="female">Female</label>
      </li>
      <li>
        <input required type="radio" v-model="data.gender" id="other" name="gender" value="other" />
        <label for="other">Other</label>
      </li>
    </ul>
    <h3>What's your t-shirt size? Races love to give out free swag.</h3>
    <div class="err" id="tshirt-error"></div>
    <ul class="radio-buttons">
      <li>
        <input v-model="data.raceinfo.tshirt" data-parsley-errors-container="#tshirt-error" required type="radio" id="xsmall" value="xsmall" name="tshirt" />
        <label for="xsmall">Extra Small</label>
      </li>
      <li>
        <input v-model="data.raceinfo.tshirt" required type="radio" id="small" name="tshirt" value="small" />
        <label for="small">Small</label>
      </li>
      <li>
        <input v-model="data.raceinfo.tshirt" required type="radio" id="medium" name="tshirt" value="medium" />
        <label for="medium">Medium</label>
      </li>
      <li>
        <input v-model="data.raceinfo.tshirt" required type="radio" id="large" name="tshirt" value="large" />
        <label for="large">Large</label>
      </li>
      <li>
        <input v-model="data.raceinfo.tshirt" required type="radio" id="xlarge" name="tshirt" value="xlarge" />
        <label for="xlarge">Extra Large</label>
      </li>
    </ul>
    <h3>What category will you be racing in?</h3>
    <div class="err" id="category-error"></div>
    <ul class="radio-buttons radio-buttons-tall">
      <li>
        <input v-model="data.raceinfo.category" data-parsley-errors-container="#category-error" required type="radio" id="runner" name="category" value="runner/walker" />
        <label for="runner">Runner / Walker</label>
      </li>
      <li>
        <input v-model="data.raceinfo.category" required type="radio" id="wheelchair-open" name="category" value="wheelchair" />
        <label for="wheelchair-open">Wheelchair Open</label>
      </li>
      <li>
        <input v-model="data.raceinfo.category" required type="radio" id="quad" name="category" value="quad wheel chair" />
        <label for="quad">Quad Wheel Chair</label>
      </li>
      <li>
        <input v-model="data.raceinfo.category" required type="radio" id="hand-cycle" name="category" value="hand cycle" />
        <label for="hand-cycle">Hand Cycle</label>
      </li>
    </ul>
    <button type="submit" v-on:click="next()" class="next">Next</button>
  </form>
  <form id="p4" name="p4" v-if="page == 4">
    <h3>What number should races send updates and annoucements to?</h3>
    <input required type="tel" id="phone" name="phone" v-model="data.phone" placeholder="Phone Number" />
    <h3>Who is your emergency contact?</h3>
    <div class="err" id="emergency-error"></div>
    <div id="emergency-contact-box" class="addr-box">
      <div class="addr-row">
        <input data-parsley-errors-container="#emergency-error" required v-model="data.raceinfo.emergency_first_name" type="text" name="emergency_first_name" placeholder="First name" />
        <input data-parsley-errors-messages-disabled required v-model="data.raceinfo.emergency_last_name"type="text" name="emergency_last_name" placeholder="Last name" />
      </div>
      <div class="addr-row">
        <input data-parsley-errors-messages-disabled required v-model="data.raceinfo.emergency_relationship"type="tel" name="emergency_relationship" placeholder="Relationship" />
        <input id="emergency_phone" data-parsley-errors-messages-disabled required v-model="data.raceinfo.emergency_phone" type="tel" name="emergency_phone" placeholder="Phone Number" />
      </div>
    </div>

    <h3>Any medical conditions your race staff should know about?</h3>
    <div class="err" id="medical-error"></div>
    <ul class="radio-buttons" style="margin-bottom: 0px;">
      <li>
        <input ng-change="toggleMedical()" v-model="data.raceinfo.has_medical" data-parsley-errors-container="#medical-error" required type="radio" id="yes" name="medical" data-ng-value="true" />
        <label for="yes">Yes</label>
      </li>
      <li>
        <input ng-change="toggleMedical()" v-model="data.raceinfo.has_medical" required type="radio" id="no" name="medical" data-ng-value="false" />
        <label for="no">No</label>
      </li>
    </ul>
    <div><em data-toggle="modal" data-target="#medicalExplanationModal" style="cursor: pointer; padding: 5px;">Why we're asking</em></div>
    <button type="submit" v-on:click="next()" class="next">Save & Register</button>
  </form>
  <div class="dots-wrapper">
    <div class="dots" ng-class="{'dots-filled': page >= 1}"></div>
    <div class="dots" ng-class="{'dots-filled': page >= 2}"></div>
    <div class="dots" ng-class="{'dots-filled': page >= 3}"></div>
    <div class="dots" ng-class="{'dots-filled': page >= 4}"></div>
  </div>
</div>
</template>

<script>
import rp from '../rp'
import moment from 'moment'
import { modal } from 'vue-strap'
export default {
  name: 'user-edit',
  components: {
    modal
  },
  mounted: function () {
    var self = this
    this.page = 1
    if (localStorage.token) {
      this.page = 4
    } else {
      window.location = '/'
    }
    this.data = {
      address: {},
      raceinfo: {},
    }
    rp.get('user/me')
      .then(function (response) {
        self.data = response.data
        if (self.data.date_of_birth) {
          self.data.date_of_birth = moment(String(self.data.date_of_birth)).format('MM/DD/YYYY')
        }
      })
    this.next = function () {
      if (this.page === 1) {
        this.page++
        // $scope.$apply()
      } else {
        if (this.page === 4) {
          delete this.data.permissions
          var data = {
            $set: this.data,
            $unset: {'permissions': true}
          }
          rp.post('users/' + localStorage.uid + '/update', data)
            .then(function (result) {
              console.log(result)
              // $location.path('/')
              // window.location = '/app'
              // $scope.$apply()
            }, function (err) {
              console.error('error signing in')
              console.error(err)
            })
        } else {
          this.page++
        }
      }
    }.bind(this)
    this.toggleMedical = function () {
      if (this.data.raceinfo.has_medical) {
        // $('#medicalModal').modal('toggle')
      }
    }.bind(this)
  },
  data () {
    return {
      page: 1,
      data: {},
      ShowMedicalModal: false,
    }
  }
}
</script>

<style scoped>
#registration h1 {
	font-size: 24px;
}
#registration h3 {
	font-size: 18px;
	font-weight: 500;
	line-height: 25px;
	color: #ABAEB7;
	margin-bottom: 8px;
}
#registration input {
	margin-right: 10px;
	margin-bottom: 8px;
}
#registration {
	padding: 50px;
	background: #323237;
	border-radius: 6px;
	margin: 50px auto;
	max-width: 800px;
}
#registration .next {
	margin: 30px auto 10px auto;
	display: block;
	padding: 10px 40px 10px 40px;
}
#registration .dots-wrapper {
	margin: 30px auto 0px auto;
	width: 78px;
}
#registration .dots {
	display: inline-block;
	width: 8px;
	height: 8px;
	border-radius: 4px;
	margin-right: 8px;
	background-color: #9B9B9B;
}
#registration .dots-filled {
	background-color: #0DFFAE;
}
.close, .close:hover {
	font-size: 42px;
	color: #979797;
	border: none;
	text-shadow: none;
}

.addr-box {
	border-radius: 4px;
	background: #F7F7F7;
	max-width: 450px;
}
.addr-box input {
	margin: 0 !important;
	width: 0px;
	border-radius: 0px;
	background: transparent;
	min-width: 50px;
}
.addr-row {
	display: flex;
}
.addr-row:first-child {
	border-bottom: 1px solid #ABAEB7;
}
.addr-row input:not(:first-child) {
	border-left: 1px solid #ABAEB7;
}
#address {
	flex: 3;
}
#apt {
	flex: 1;
}
#city {
	flex: 2;
}
#state {
	flex: 1;
}
#zip {
	flex: 1;
}
#emergency-contact-box input {
	flex: 1;
}
</style>
